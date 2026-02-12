from django.db import connection

# A comment
def get_users(user):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE username = '%s'" % user)
    return cursor.fetchall()
