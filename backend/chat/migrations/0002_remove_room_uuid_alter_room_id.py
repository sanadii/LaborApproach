# Generated by Django 4.2.1 on 2023-11-17 13:41

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):
    dependencies = [
        ("chat", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="room",
            name="uuid",
        ),
        migrations.AlterField(
            model_name="room",
            name="id",
            field=models.UUIDField(
                default=uuid.uuid4, editable=False, primary_key=True, serialize=False
            ),
        ),
    ]