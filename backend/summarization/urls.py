from django.conf.urls import url, include
from . import views

app_name = 'summarization'

urlpatterns = [
    url(r'^api-auth/', include('rest_framework.urls'), name='summary-api'),
    url(r'^dashboard/status$', views.DashBoardBookStatusView.as_view(), name='dashboard-status'),
    url(r'^dashboard/format$', views.DashBoardBookFormatView.as_view(), name='dashboard-format'),
    url(r'^dashboard/recent$', views.DashBoardRecentBookView.as_view(), name='dashboard-recent'),
]