def get_user():
    user_id = request.args.get('id')

    # SQL Injection Vulnerability
    conn = get_db_connection()
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE id = {user_id}"
    cursor.execute(query)

    user = cursor.fetchone()
    conn.close()

    if user:
        return f"User: {user}"
    else:
        return "User not found"
