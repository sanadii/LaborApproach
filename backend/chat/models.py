from django.db import models

from account.models import User


class Message(models.Model):
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User, blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ('created_at',)

    def __str__(self):
        return f'{self.created_by}'


class Room(models.Model):
    WAITING = 'waiting'
    ACTIVE = 'active'
    CLOSED = 'closed'

    CHOICES_STATUS = (
        (WAITING, 'Waiting'),
        (ACTIVE, 'Active'),
        (CLOSED, 'Closed'),
    )

    uuid = models.CharField(max_length=255, unique=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    messages = models.ManyToManyField(Message, blank=True)
    status = models.CharField(max_length=20, choices=CHOICES_STATUS, default=WAITING)

    participants = models.ManyToManyField(
        User,
        through='RoomParticipant',
        blank=True,
        related_name='participant_rooms'  # And/or here
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='user_rooms'  # Add a related_name here
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return f'{self.client} - {self.uuid}'
    participants = models.ManyToManyField(
        User,
        through='RoomParticipant',
        blank=True,
        related_name='participant_rooms'  # And/or here
    )


class Channel(models.Model):
    WAITING = 'waiting'
    ACTIVE = 'active'
    CLOSED = 'closed'

    CHOICES_STATUS = (
        (WAITING, 'Waiting'),
        (ACTIVE, 'Active'),
        (CLOSED, 'Closed'),
    )

    uuid = models.CharField(max_length=255, unique=True)
    name = models.Charfield(max_length=255)
    url = models.CharField(max_length=255, blank=True, null=True)
    messages = models.ManyToManyField(Message, blank=True)
    
    participants = models.ManyToManyField(
        User,
        through='RoomParticipant',
        blank=True,
        related_name='participant_rooms'  # And/or here
    )


    status = models.CharField(max_length=20, choices=CHOICES_STATUS, default=WAITING)

    moderator = models.User(
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='user_rooms'  # Add a related_name here
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return f'{self.client} - {self.uuid}'
    participants = models.ManyToManyField(
        User,
        through='RoomParticipant',
        blank=True,
        related_name='participant_rooms'  # And/or here
    )


class RoomParticipant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'chat_room_participant'
        verbose_name = "Chat Room Participant"
        verbose_name_plural = "Chat Room Participants"
        default_permissions = []
