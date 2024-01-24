from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from apps.attendees.models import Attendance, AttendanceConfirm
from apps.attendees.serializers import AttendanceSerializer, AttendanceConfirmSerializer
from rest_framework import generics
from rest_framework import status

class GetAttendee(APIView):
    def get(self, request):
        koc_number = request.GET.get('kocNumber', '').strip()
        mobile = request.GET.get('mobile', '').strip()

        if koc_number and mobile:
            try:
                attendance = Attendance.objects.get(koc_number=koc_number)
            except Attendance.DoesNotExist:
                raise NotFound(detail="رقم العضوية غير صحيح.", code=404)

            attendance_confirmation = AttendanceConfirm(
                attendance=attendance,
                mobile=mobile,
            )
            attendance_confirmation.save()

            # Get the saved item ID (EntryId)
            entry_id = attendance_confirmation.id

            # Serialize attendance data
            serialized_attendance = AttendanceSerializer(attendance).data

            # Add EntryId to the attendance data
            serialized_attendance["entry_id"] = entry_id

            response_data = {
                "data": serialized_attendance
            }

            return Response(response_data, status=status.HTTP_200_OK)

        return Response({"data": {"attendance": None}})


class UpdateAttendee(generics.UpdateAPIView):
    queryset = AttendanceConfirm.objects.all()
    serializer_class = AttendanceConfirmSerializer

class GetAttendees(generics.ListAPIView):
    queryset = AttendanceConfirm.objects.all()
    serializer_class = AttendanceConfirmSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = {"data": serializer.data}
        return Response(data)
