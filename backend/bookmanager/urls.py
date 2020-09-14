from django.conf.urls import url, include
from . import views

app_name = 'bookmanager'

urlpatterns = [
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^books/$', views.BookStoreList.as_view()),  # booklist, createbook
    url(r'^books/(?P<pk>[0-9]+)$', views.BookStoreDetail.as_view()),  # bookdetail, bookupdate, bookdelete
    url(r'^books/(?P<pk>[0-9]+)/timelines$', views.BookTimeLineList.as_view()),  # timelinelist, createtimeline
    url(
        r'^books/(?P<b_pk>[0-9]+)/timelines/(?P<pk>[0-9]+)$', views.BookTimeLineDetail.as_view()
    ),  # timelinedetail, timelineupate, timelinedelete
    url(r'^books/(?P<pk>[0-9]+)/notes$', views.BookNoteList.as_view()),
    url(r'^books/(?P<b_pk>[0-9]+)/notes/(?P<pk>[0-9]+)$', views.BookNoteDetail.as_view()),
    url(r'^books/choices$', views.BookChoiceView.as_view())
]
