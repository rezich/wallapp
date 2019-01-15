from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from .views import current_user, UserViewSet, PostViewSet

urlpatterns = [
    path('auth/', obtain_jwt_token, name='auth'),
    path('current_user/', current_user, name='current_user'),
    path('users/', UserViewSet.as_view(), name='users'),
    path('posts/', PostViewSet.as_view(), name='posts'),
]
