from django.urls import path, include
from .views import *

from . import views

app_name = 'chat'


urlpatterns = [
    # Frontend
    path('chat/getChatRooms', GetChatRooms.as_view(), name="GetChatRooms"),
    path('chat/createRoom/<str:uuid>', CreateRoom.as_view(), name="CreateRoom"),

    # Channels
    path('chat/getChatChannels', GetChatChannels.as_view(), name='GetChatChannels'),
    path('chat/addNewChatChannel', AddNewChatChannel.as_view(), name='AddNewChatChannel'),
    path('chat/updateChatChannel', UpdateChatChannel.as_view(), name='UpdateChatChannel'),
    path('chat/deleteChatChannel', DeleteChatChannel.as_view(), name='DeleteChatChannel'),

    # ChatMessage
    path('chat/getChatMessages/<str:id>/', GetChatMessages.as_view(), name="GetChatMessages"),
    path('chat/addMessage/<str:id>', AddMessage.as_view(), name="CreateRoom"),

    path('api/create-room/<str:uuid>/', views.create_room, name='create-room'),
    path('chat-admin/', views.admin, name='admin'),
    path('chat-admin/add-user/', views.add_user, name='add_user'),
    path('chat-admin/users/<uuid:uuid>/', views.user_detail, name='user_detail'),
    path('chat-admin/users/<uuid:uuid>/edit/', views.edit_user, name='edit_user'),
    path('chat-admin/<str:uuid>/', views.room, name='room'),
    path('chat-admin/<str:uuid>/delete/', views.delete_room, name='delete_room'),

]