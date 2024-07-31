from django.urls import path

from musaeid_chat.views import ChatAPI

urlpatterns = [
    path("chat/", ChatAPI.as_view()),
    path("chat/<uuid:chat_id>/", ChatAPI.as_view()),
]
