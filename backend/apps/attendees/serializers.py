# Campaign Serializers
from rest_framework import serializers
from apps.attendees.models import Attendance, AttendanceConfirm

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'


class AttendanceConfirmSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceConfirm
        fields = '__all__'
