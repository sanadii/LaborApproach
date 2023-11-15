from django.contrib.auth.views import LoginView
from django.urls import path, include
from .views import *

from .forms import LoginForm

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'account'


urlpatterns = [
    path('login/', LoginView.as_view(template_name='account/login.html', form_class=LoginForm), name='login'),


    # ChatFusion
    # Users
    path("userLogin", UserLogin.as_view(), name="UserLogin"),
    path('account/getCurrentUser', GetCurrentUser.as_view(), name="GetCurrentUser"),

    # Users
    path("account/getUsers", GetUsers.as_view(), name="GetUsers"),
    path('account/addNewUser', AddNewUser.as_view(), name="AddNewUser"),
    path('account/updateUser/<int:id>/', UpdateUser.as_view(), name="UpdateUser"),
    path('account/deleteUser/<int:id>', DeleteUser.as_view(), name="DeleteUser"),
    path('account/changeUserPassword/<int:id>', ChangeUserPassword.as_view(), name="ChangeUserPassword"),

    # Tokens
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),


]
