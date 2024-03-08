user_input = request.GET.get('order_by')
allowed_order_fields = ['username', 'email']

if user_input in allowed_order_fields:
    users = User.objects.order_by(user_input)
else:
    users = User.objects.all()

