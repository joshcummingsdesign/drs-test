# vulnerable_app.py
# INTENTIONAL insecure code — do NOT use in production.
# Demonstrates building SQL with string formatting (SQL injection risk).

import sqlite3
from flask import Flask, request, g

app = Flask(__name__)
DATABASE = "example.db"

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DATABASE)
    return g.db

@app.teardown_appcontext
def close_db(exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()

@app.route("/user")
def get_user():
    # BAD: using user input directly inside an f-string to build SQL
    username = request.args.get("username", "")
    db = get_db()
    cur = db.cursor()

    # <-- Vulnerable line: user input concatenated into SQL string -->
    query = f"SELECT id, username, email FROM users WHERE username = '{username}';"
    cur.execute(query)
    row = cur.fetchone()
    if row:
        return {"id": row[0], "username": row[1], "email": row[2]}
    return {"error": "not found"}, 404

if __name__ == "__main__":
    # create a minimal table for demonstration (only run locally for testing)
    conn = sqlite3.connect(DATABASE)
    conn.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT)")
    conn.commit()
    conn.close()
    app.run(debug=True)

