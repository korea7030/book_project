from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers
from django.db.models.query_utils import Q
from django.views import View
from django.db.models import Avg, Count, Sum, F
from django.db.models.fields import FloatField
from django.db.models.functions.comparison import Cast
from django.http.response import HttpResponse
from rest_framework import generics
from rest_framework import status
from bookmanager.serializers import BookStoreSerializer

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from bookmanager.models import BookStore


class DashBoardBookStatusView(View):
    def get(self, request):
        user_id = request.GET.get('user', None)
        result = {
            'Read': 0,
            'Reading': 0,
            'UnRead': 0
        }

        read_count = BookStore.objects.filter(Q(user__pk=user_id) & Q(read_status='30')).count()
        reading_count = BookStore.objects.filter(Q(user__pk=user_id) & Q(read_status='20')).count()
        unread_count = BookStore.objects.filter(Q(user__pk=user_id) & Q(read_status='10')).count()

        result['Read'] = read_count
        result['Reading'] = reading_count
        result['UnRead'] = unread_count

        return JsonResponse(result)


class DashBoardBookFormatView(View):
    def get(self, request):
        query = None
        user_id = request.GET.get('user', None)
        
        if user_id is None:
            return JsonResponse(None, safe=False)
        
        total_count = BookStore.objects.filter(user__pk=user_id).count()
        # categorical value sum, average
        # Cast Float value
        query = BookStore.objects.values('book_format').annotate(
            sum_format=Count('book_format')
            ).annotate(avg_format=Cast(F('sum_format'), FloatField()) / Cast(total_count, FloatField())
            ).values('book_format', 'sum_format', 'avg_format')

        print(list(query))
        
        return JsonResponse(list(query), safe=False)


class DashBoardRecentBookView(generics.ListAPIView):
    serializer_class = BookStoreSerializer
    queryset = BookStore.objects.all()
    
    def get(self, request):
        user_id = request.GET.get('user', None)

        if user_id is None:
            return Response(data=None, status=status.HTTP_404_NOT_FOUND)

        query = self.get_queryset()
        query = query.filter(user__pk=user_id).order_by('-started_reading')[:3]
        serializer = self.get_serializer(query, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)