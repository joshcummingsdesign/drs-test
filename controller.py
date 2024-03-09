user_input = "1; DROP TABLE users;"
User.objects.extra(where=[f"id = {user_input}"])
