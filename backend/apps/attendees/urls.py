# Campaign Urls

from django.urls import path
from .views import *

app_name = "electors"

urlpatterns = [
    # path("getAllAttendees", GetAllAttendees.as_view(), name="GetAllAttendees"),
    path("getAttendee", GetAttendee.as_view(), name="GetAttendee"),
    path('updateAttendee/<int:pk>', UpdateAttendee.as_view(), name='UpdateAttendee'),
    path('getAttendees', GetAttendees.as_view(), name='GetAttendees'),

]