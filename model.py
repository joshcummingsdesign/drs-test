from django.db.models import Count
from myapp.models import MyModel

queryset = MyModel.objects.annotate(num_comments=Count('comments')).extra(
    select={'total_likes': 'SELECT SUM(likes) FROM myapp_likes WHERE myapp_likes.post_id = myapp_mymodel.id'}
)

for obj in queryset:
    print(obj.num_comments, obj.total_likes)
