# app.py
"""
Secure example showing how to avoid IDOR by enforcing object-level authorization.
This is a minimal Flask app intended for education; in production:
 - use a real DB (SQLAlchemy, Django ORM, etc.)
 - use real authentication (Flask-Login, JWT, OAuth, etc.)
 - add logging, rate-limiting, monitoring, and input validation
"""

from uuid import uuid4
from flask import Flask, jsonify, request, abort
from functools import wraps

app = Flask(__name__)

# --- Simulated "database" ---
# Each resource has an 'owner_id' showing who may access it.
USERS = {
    "alice": {"id": "alice", "display": "Alice"},
    "bob": {"id": "bob", "display": "Bob"},
}

# "Files" keyed by uuid string
FILES = {}

def make_file(owner_id, name, content):
    fid = str(uuid4())
    FILES[fid] = {"id": fid, "owner_id": owner_id, "name": name, "content": content}
    return FILES[fid]

# seed data
f1 = make_file("alice", "tax-2024.pdf", "Alice's tax PDF bytes (not real)")
f2 = make_file("bob", "photo.jpg", "Bob's photo bytes (not real)")

# --- Authentication simulation ---
# For demo: authenticate by passing header X-User: alice|bob
# In real apps: use secure sessions, tokens, Flask-Login, etc.
def get_current_user():
    uid = request.headers.get("X-User")
    if not uid:
        return None
    return USERS.get(uid)

def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        user = get_current_user()
        if user is None:
            abort(401, description="Authentication required")
        return f(*args, **kwargs)
    return wrapper

# --- Authorization helper ---
def assert_user_owns_resource(user, resource):
    """
    Raises 403 if user is not allowed to access resource.
    Centralize authorization checks so they are not accidentally skipped.
    """
    if resource["owner_id"] != user["id"]:
        abort(403, description="You do not have permission to access this resource")

# --- Routes ---
@app.route("/files/<file_id>", methods=["GET"])
@login_required
def download_file(file_id):
    """
    Secure pattern:
     1) Validate input (basic).
     2) Retrieve object from DB.
     3) Authorize current user against object before returning it.
    """
    user = get_current_user()
    # 1) Basic validation: file_id should be a UUID-looking string (quick guard)
    # (Don't rely on format for security — always check ownership.)
    if file_id not in FILES:
        abort(404, description="File not found")

    file_obj = FILES[file_id]

    # 3) Authorization check — MUST be done BEFORE returning or exposing sensitive fields
    assert_user_owns_resource(user, file_obj)

    # Return only authorized fields. Avoid leaking internal fields you don't need to show.
    return jsonify({
        "id": file_obj["id"],
        "name": file_obj["name"],
        "content": file_obj["content"],  # in real system, stream bytes or return signed URL
    })

@app.route("/files", methods=["POST"])
@login_required
def create_file():
    user = get_current_user()
    body = request.json or {}
    name = body.get("name")
    content = body.get("content", "")
    if not name:
        abort(400, "Missing file name")

    new = make_file(owner_id=user["id"], name=name, content=content)
    return jsonify({"id": new["id"], "name": new["name"]}), 201

# Simple index
@app.route("/")
def index():
    return jsonify({"note": "Demo app. Use X-User header to simulate user. Try GET /files/<id>."})

if __name__ == "__main__":
    # Run for manual testing: FLASK_APP=app.py flask run
    app.run(debug=True, port=5000)

