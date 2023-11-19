import json

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.http import require_POST

from rest_framework import status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import Room, Message, RoomParticipant
from .serializers import MessageSerializer, RoomSerializer

from account.forms import AddUserForm, EditUserForm
from account.models import User
from account.serializers import UserSerializer


@require_POST
def create_room(request, uuid):
    name = request.POST.get('name', '')
    url = request.POST.get('url', '')

    Room.objects.create(uuid=uuid, client=name, url=url)

    return JsonResponse({'message': 'room created'})


class CreateRoom(APIView):
    def post(self, request, *args, **kwargs):
        data = request.data

        # Create a new UUID for the room
        uuid = data.get('uuid') or data['uuid']  # Add the UUID to the data

        data['uuid'] = str(uuid)  # Convert UUID to string if necessary

        serializer = RoomSerializer(data=data)
        if serializer.is_valid():
            room = serializer.save()

            # Add the current user as a participant
            RoomParticipant.objects.create(user=request.user, room=room)

            return Response({"data": serializer.data, "count": 0, "code": 200}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AddMessage(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetChatRooms(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        rooms = Room.objects.all()
        users = User.objects.all()

        # Serialize the data
        room_serializer = RoomSerializer(rooms, many=True)
        user_serializer = UserSerializer(users, many=True)

        # Prepare the response data
        response_data = {
            'rooms': room_serializer.data,
            'users': user_serializer.data
        }

        return Response(response_data, status=status.HTTP_200_OK)


class GetChatMessages(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id, format=None):
        messages = Message.objects.filter(room__id=id).order_by('created_at')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# class GetChatRooms(LoginRequiredMixin, ListView):
#     template_name = 'chat/admin.html'
#     context_object_name = 'rooms'

#     def get_queryset(self):
#         return Room.objects.all()

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['users'] = User.objects.filter(is_staff=True)
#         return context

@login_required
def admin(request):
    rooms = Room.objects.all()
    users = User.objects.filter(is_staff=True)

    return render(request, 'chat/admin.html', {
        'rooms': rooms,
        'users': users
    })


@login_required
def room(request, uuid):
    room = Room.objects.get(uuid=uuid)

    if room.status == Room.WAITING:
        room.status = Room.ACTIVE
        room.agent = request.user
        room.save()

    return render(request, 'chat/room.html', {
        'room': room
    })


@login_required
def delete_room(request, uuid):
    if request.user.has_perm('room.delete_room'):
        room = Room.objects.get(uuid=uuid)
        room.delete()
                
        messages.success(request, 'The room was deleted!')

        return redirect('/chat-admin/')
    else:
        messages.error(request, 'You don\'t have access to delete rooms!')

        return redirect('/chat-admin/')


# Backend User/Chat
# Backend Views
@login_required
def user_detail(request, uuid):
    user = User.objects.get(pk=uuid)
    rooms = user.rooms.all()

    return render(request, 'chat/user_detail.html', {
        'user': user,
        'rooms': rooms
    })


@login_required
def edit_user(request, uuid):
    if request.user.has_perm('user.edit_user'):
        user = User.objects.get(pk=uuid)

        if request.method == 'POST':
            form = EditUserForm(request.POST, instance=user)

            if form.is_valid():
                form.save()
                
                messages.success(request, 'The changes was saved!')

                return redirect('/chat-admin/')
        else:
            form = EditUserForm(instance=user)

        return render(request, 'chat/edit_user.html', {
            'user': user,
            'form': form
        })
    else:
        messages.error(request, 'You don\'t have access to edit users!')

        return redirect('/chat-admin/')


@login_required
def add_user(request):
    if request.user.has_perm('user.add_user'):
        if request.method == 'POST':
            form = AddUserForm(request.POST)

            if form.is_valid():
                user = form.save(commit=False)
                user.is_staff = True
                user.set_password(request.POST.get('password'))
                user.save()

                if user.role == User.MANAGER: 
                    group = Group.objects.get(name='Managers')
                    group.user_set.add(user)
                
                messages.success(request, 'The user was added!')

                return redirect('/chat-admin/')
        else:
            form = AddUserForm()

        return render(request, 'chat/add_user.html', {
            'form': form
        })
    else:
        messages.error(request, 'You don\'t have access to add users!')

        return redirect('/chat-admin/')