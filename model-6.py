order = request.GET.get('order_by')
allowed_order_fields = ['username', 'email']

if order in allowed_order_fields:
    users = User.objects.order_by(order)
else:
    users = User.objects.all()

