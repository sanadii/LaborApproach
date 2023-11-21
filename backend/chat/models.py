from django.db import models
from account.models import User

class StatusOptions(models.TextChoices):
    WAITING = 'waiting', 'Waiting'
    ACTIVE = 'active', 'Active'
    CLOSED = 'closed', 'Closed'


class Message(models.Model):
    """
    Model representing a chat message.
    """
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return f'Message from {self.created_by} on {self.created_at}'


class AbstractChatRoom(models.Model):
    """
    Abstract model representing common fields for a chat room or channel.
    """
    uuid = models.CharField(max_length=255, unique=True)
    url = models.URLField(blank=True, null=True)
    messages = models.ManyToManyField(Message, blank=True)
    status = models.CharField(max_length=20, choices=StatusOptions.choices, default=StatusOptions.WAITING)
    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='%(class)s_created_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True
        ordering = ('-created_at',)

    def __str__(self):
        return f'{self.__class__.__name__} - {self.uuid}'

class ChatRoom(AbstractChatRoom):
    """
    Model representing a chat room.
    """
    participants = models.ManyToManyField(
        User, through='ChatRoomParticipant', blank=True, related_name='participant_rooms')

    class Meta(AbstractChatRoom.Meta):
        db_table = 'chat_room'
        verbose_name = "Chat Room"
        verbose_name_plural = "Chat Rooms"

class ChatChannel(AbstractChatRoom):
    """
    Model representing a chat channel.
    """
    name = models.CharField(max_length=255)
    moderator = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,
        related_name='moderated_channels')

    participants = models.ManyToManyField(
        User, through='ChatChannelParticipant', blank=True, related_name='participant_chat_channels')

    class Meta(AbstractChatRoom.Meta):
        db_table = 'chat_channel'
        verbose_name = "Chat Channel"
        verbose_name_plural = "Chat Channels"


class ChatChannelParticipant(models.Model):
    """
    Model representing a participant in a chat channel.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    channel = models.ForeignKey(ChatChannel, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'channel'], name='unique_chat_channel_participant')
        ]
        db_table = 'chat_channel_participants'
        verbose_name = "Chat Channel Participant"
        verbose_name_plural = "Chat Channel Participants"


class ChatRoomParticipant(models.Model):
    """
    Model representing a participant in a chat room.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'chat_room_participant'
        verbose_name = "Chat Room Participant"
        verbose_name_plural = "Chat Room Participants"

        constraints = [
            models.UniqueConstraint(fields=['user', 'room'], name='unique_room_participant')
        ]
