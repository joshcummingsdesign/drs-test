user_input = request.GET.get('username')
users = User.objects.filter(username=user_input)
