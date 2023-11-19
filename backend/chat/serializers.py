from rest_framework import serializers
from .models import Message, Room
from account.models import User

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class RoomSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()

    class Meta:
        model = Room
        fields = '__all__'  # Include all fields from the Room model

    def create(self, validated_data):
        user_id = validated_data.pop('createdBy', None)
        if user_id is not None:
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                raise serializers.ValidationError({"createdBy": "User not found"})
            validated_data['created_by'] = user

        return Room.objects.create(**validated_data)

    def get_created_by_name(self, obj):
        # This method returns the name of the user who created the room
        return obj.created_by.name if obj.created_by else None
