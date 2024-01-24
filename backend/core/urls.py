from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('', include('apps.account.urls')),
    path('admin/', admin.site.urls),


    # Apps
    path('attendees/', include('apps.attendees.urls')),

]
