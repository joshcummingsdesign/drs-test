from django.http import HttpResponse

def vulnerable_view(request):
    user_input = request.GET.get('user_input', '')
    html_content = f"<html><body><h1>Vulnerable Page</h1><p>User Input: {user_input}</p></body></html>"
    return HttpResponse(html_content)
