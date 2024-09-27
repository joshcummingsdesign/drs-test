u_id = "1; DROP TABLE users;"
User.objects.extra(where=[f"id = {u_id}"])
