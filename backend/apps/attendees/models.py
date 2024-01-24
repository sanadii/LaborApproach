from django.db import models

# Create a choices tuple for the status options
STATUS_CHOICES = (
    (0, 'Unknown'),
    (1, 'Attended'),
    (2, 'Not Attended'),
)


# Model: Attendance
class Attendance(models.Model):
    name = models.CharField(max_length=100)
    koc_number = models.CharField(max_length=20)
    status = models.IntegerField(choices=STATUS_CHOICES, default=0)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'attendance'
        verbose_name = "Attendance"
        verbose_name_plural = "Attendances"
        default_permissions = []
        permissions  = [
            ("canViewAttendance", "Can View Attendance"),
            ("canAddAttendance", "Can Add Attendance"),
            ("canChangeAttendance", "Can Change Attendance"),
            ("canDeleteAttendance", "Can Delete Attendance"),
            ]
        
# Model: ConfirmAttendance
class AttendanceConfirm(models.Model):
    attendance = models.ForeignKey(Attendance, on_delete=models.CASCADE)
    mobile = models.CharField(max_length=20)
    status = models.IntegerField(choices=STATUS_CHOICES, default=0)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.attendance.name}'s Confirmation"

    class Meta:
        db_table = 'attendance_confirmation'
        verbose_name = "Attendance Confirmation"
        verbose_name_plural = "Attendance Confirmations"
        default_permissions = []
        permissions  = [
            ("canViewAttendanceConfirmation", "Can View Attendance Confirmation"),
            ("canAddAttendanceConfirmation", "Can Add Attendance Confirmation"),
            ("canChangeAttendanceConfirmation", "Can Change Attendance Confirmation"),
            ("canDeleteAttendanceConfirmation", "Can Delete Attendance Confirmation"),
            ]
        