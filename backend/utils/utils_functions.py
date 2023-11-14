import warnings
from datetime import datetime, timedelta
from urllib.parse import urlencode
from urllib.request import Request, urlopen

import django
from django.contrib.auth import get_permission_codename
from django.core.paginator import EmptyPage, InvalidPage, Paginator
from django.forms import EmailField, Textarea, URLField
from django.template import RequestContext
from django.template.response import TemplateResponse
from django.utils.translation import gettext as _

# import mezzanine
# from mezzanine.conf import settings
# from utils.deprecation import is_authenticated
# from utils.importing import import_dotted_path
# from utils.sites import has_site_permission
from account.models import  User
from django.db.models import Q

# from account.serializers import GroupSerializer


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from account.models import User
from account.serializers import UserSerializer



def get_current_user_campaigns( user):
    """
    Retrieve a list of campaigns for the current User
    if the user is Admin, SuperAdmin = get favorite
    if the user is Not Admin = get all related campaigns
    """
    if not user.is_staff:
        campaign_objects = Campaign.objects.filter(
            campaign_members__user=user
        ).distinct()  # Get campaign objects for the user
        serializer = CampaignSerializer(campaign_objects, many=True)
        return serializer.data
    else:
        # User is staff, get all campaigns
        all_campaigns = Campaign.objects.all()
        serializer = CampaignSerializer(all_campaigns, many=True)
        return serializer.data

