from rest_framework import serializers
from .models import Message  # Import your Message model

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'room', 'sender', 'message', 'created_at']
