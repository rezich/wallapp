from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from .views import current_user, UserList, PostList

urlpatterns = [
    path('auth/', obtain_jwt_token, name='auth'),
    path('current_user/', current_user, name='current_user'),
    path('users/', UserList.as_view(), name='users'),
    path('posts/', PostList.as_view(), name='posts'),
]
