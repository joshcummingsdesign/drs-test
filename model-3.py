user_input = request.GET.get('username')
if user_input:
    users = User.objects.filter(username=user_input)
else:
    users = User.objects.all()

