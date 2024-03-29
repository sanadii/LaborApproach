# Generated by Django 5.0 on 2024-01-23 07:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('koc_number', models.CharField(max_length=20)),
                ('status', models.IntegerField(choices=[(0, 'Unknown'), (1, 'Attended'), (2, 'Not Attended')], default=0)),
            ],
            options={
                'verbose_name': 'Attendance',
                'verbose_name_plural': 'Attendances',
                'db_table': 'attendance',
                'permissions': [('canViewAttendance', 'Can View Attendance'), ('canAddAttendance', 'Can Add Attendance'), ('canChangeAttendance', 'Can Change Attendance'), ('canDeleteAttendance', 'Can Delete Attendance')],
                'default_permissions': [],
            },
        ),
        migrations.CreateModel(
            name='AttendanceConfirm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mobile', models.CharField(max_length=20)),
                ('status', models.IntegerField(choices=[(0, 'Unknown'), (1, 'Attended'), (2, 'Not Attended')], default=0)),
                ('notes', models.TextField(blank=True, null=True)),
                ('attendance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='attendees.attendance')),
            ],
            options={
                'verbose_name': 'Attendance Confirmation',
                'verbose_name_plural': 'Attendance Confirmations',
                'db_table': 'attendance_confirmation',
                'permissions': [('canViewAttendanceConfirmation', 'Can View Attendance Confirmation'), ('canAddAttendanceConfirmation', 'Can Add Attendance Confirmation'), ('canChangeAttendanceConfirmation', 'Can Change Attendance Confirmation'), ('canDeleteAttendanceConfirmation', 'Can Delete Attendance Confirmation')],
                'default_permissions': [],
            },
        ),
    ]
