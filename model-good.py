def get_users(username):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", [username])
    return cursor.fetchall()
