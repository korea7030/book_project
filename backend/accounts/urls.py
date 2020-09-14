from django.conf.urls import url, include
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    url(r'^api-auth/', include('rest_framework.urls'), name='user-api'),
    url(r'^login/$', views.LoginAPIView.as_view(), name='login'),  # user login
    url(r'^user/$', views.UserAPIView.as_view(), name='user'),
    url(r'^user/(?P<pk>[0-9]+)/$', views.UserAPIView.as_view(), name='user_settings'),
    url(r'^logout/$', views.LogoutAPIView.as_view(), name='logout'),  # user logout
    url(r'^register/$', views.CreateUserAPIView.as_view(), name='registry'),  # user register
    url(r'^user/options/$', views.UserChoiceView.as_view(), name='user-optioon'), # user settings option
    url(r'^user/email/validate$', views.UserEmailValidateCheckView.as_view(), name='email-check'),
]
