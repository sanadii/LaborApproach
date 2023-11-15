from django.db import models

from account.models import User

class statusOptions(models.IntegerChoices):

    WAITING = 'waiting'
    ACTIVE = 'active'
    CLOSED = 'closed'

    CHOICES_STATUS = (
        (WAITING, 'Waiting'),
        (ACTIVE, 'Active'),
        (CLOSED, 'Closed'),
    )

class Room(models.Model):

    uuid = models.CharField(max_length=255)
    client = models.CharField(max_length=255)
    agent = models.ForeignKey(User, related_name='rooms', blank=True, null=True, on_delete=models.SET_NULL)
    # messages = models.ManyToManyField(Message, blank=True)
    url = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, choices=statusOptions.choices, default='WAITING')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)
    
    def __str__(self):
        return f'{self.client} - {self.uuid}'
    

# class RoomCampaign(models.Model):
#     uuid = models.CharField(max_length=255)
#     campaign = models.ForeignKey(User, related_name='rooms', blank=True, null=True, on_delete=models.SET_NULL)
#     # messages = models.ManyToManyField(Message, blank=True)
#     url = models.CharField(max_length=255, blank=True, null=True)
#     status = models.CharField(max_length=20, choices=statusOptions.choices, default='WAITING')
#     created_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         ordering = ('-created_at',)
    
#     def __str__(self):
#         return f'{self.client} - {self.uuid}'
    
# class RoomElection(models.Model):
#     uuid = models.CharField(max_length=255)
#     election = models.ForeignKey(User, related_name='rooms', blank=True, null=True, on_delete=models.SET_NULL)
#     # messages = models.ManyToManyField(Message, blank=True)
#     url = models.CharField(max_length=255, blank=True, null=True)
#     status = models.CharField(max_length=20, choices=statusOptions.choices, default='WAITING')
#     created_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         ordering = ('-created_at',)
    
#     def __str__(self):
#         return f'{self.client} - {self.uuid}'
   

class Message(models.Model):
    room = models.ForeignKey(Room, related_name='messages', on_delete=models.CASCADE)
    body = models.TextField()
    sent_by = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)

    class Meta:
        ordering = ('created_at',)
    
    def __str__(self):
        return f'{self.sent_by}'

