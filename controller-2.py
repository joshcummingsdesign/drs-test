user_input = "name; DROP TABLE users;"
User.objects.extra(order_by=[user_input])

