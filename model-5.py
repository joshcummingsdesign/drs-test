from django.shortcuts import render
from .models import User

def user_list(request):
    order_by = request.GET.get('order_by')  # Get the 'order_by' parameter from the request

    # Define the default ordering in case 'order_by' parameter is not provided or invalid
    default_ordering = 'username'

    # Define a list of fields that are allowed for sorting
    allowed_order_fields = ['username', 'email', 'date_joined']

    # Check if the 'order_by' parameter is valid and allowed
    if order_by in allowed_order_fields:
        # Use the valid 'order_by' parameter to sort the list of users
        users = User.objects.all().order_by(order_by)
    else:
        # Use the default ordering if the 'order_by' parameter is not provided or invalid
        users = User.objects.all().order_by(default_ordering)

    # Render the template with the sorted list of users
    return render(request, 'user_list.html', {'users': users})
