@app.route('/profile')
def profile():
    # User ID is passed directly in the URL as a query parameter
    user_id = int(request.args.get('user_id'))

    user = users.get(user_id)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404
