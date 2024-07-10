import urllib.request

def fetch_url(url):
  with urllib.request.urlopen(url) as response:
  return response.read()
