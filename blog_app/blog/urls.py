from django.urls import path
from .views import post_list, post_create, post_update

urlpatterns = [
    path('', post_list, name='post_list'),
    path('post/new/', post_create, name='post_create'),
    path('post/edit/<int:pk>/', post_update, name='post_update'),
]