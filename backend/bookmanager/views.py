from django.views import View
from django.http import JsonResponse
from rest_framework import serializers

from rest_framework.response import Response
from rest_framework import generics
from rest_framework import filters
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import BookStore, BookTimeline, BookNote
from .serializers import (
    BookStoreSerializer,
    BookCreateUpdateSerializer,
    BookNoteSerializer,
    BookTimelineSerializer
)

from common import pagination
from common import choice

import json


class BookStoreList(generics.ListCreateAPIView):
    """
    List all BookStore, or create a new BookStore
    """
    serializer_class = BookStoreSerializer
    filter_backends = [filters.OrderingFilter]  # 정렬 filter
    # ordering_fields = ['reg_date', 'author', 'title']  # 등록일자, 저자, 책제목(url 뒤에 ?ordering=필드명)
    permission_classes = [IsAuthenticated, ]
    queryset = BookStore.objects.all()
    # pagination_class = pagination.CustomPagination

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # 검색어        
        query = self.request.query_params.get('query', None)
        search_category = self.request.query_params.get('search_category', None)
        # read_status = self.request.query_params.get('read_stats', None)

        filter_args = {}

        if search_category != '':
            if search_category == '1':
                filter_args['title__contains'] = query
            elif search_category == '2':
                filter_args['author__contains'] = query
            elif search_category == '3':
                filter_args['publisher__contains'] = query
        
        queryset = queryset.filter(**filter_args).order_by('-reg_date', 'started_reading', 'id')
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = BookCreateUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class BookStoreDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a BookStore instance.
    """
    queryset = BookStore.objects.all()
    serializer_class = BookStoreSerializer
    permission_classes = [IsAuthenticated, ]

    def get_object(self, pk):
        obj = BookStore.objects.get(pk=pk)
        return obj

    def get(self, request, pk, *args, **kwargs):
        instance = self.get_object(pk)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def put(self, request, pk, *args, **kwargs):
        book = self.get_object(pk)

        serializer = BookCreateUpdateSerializer(book, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        return self.destroy(self, request, *args, **kwargs)


class BookTimeLineList(generics.ListCreateAPIView):
    """
    List all BookStore, or create a new BookStore
    """
    serializer_class = BookTimelineSerializer
    permission_classes = [IsAuthenticated, ]
    # timeline 에서는 페이지당 5개씩 보이도록
    pagination_class = pagination.CustomPagination
    page_size = 5
    

    def get(self, request, *args, **kwargs):
        b_pk = self.kwargs['pk']  # book pk
        
        self.pagination_class.page_size = self.page_size
        try:
            book = BookStore.objects.get(pk=b_pk)
            timeline_queryset = book.booktimeline_set.all().order_by('started_date', 'started_time')
            page = self.paginate_queryset(timeline_queryset)

            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(timeline_queryset, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except BookStore.DoesNotExist:
            return Response(None, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class BookTimeLineDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    REtrieve, update or delete a BookStore instance.
    """

    queryset = BookTimeline.objects.prefetch_related('book')
    serializer_class = BookTimelineSerializer
    permission_classes = [IsAuthenticated, ]

    def get_object(self, *args, **kwargs):
        t_pk = self.kwargs['pk']
        return BookTimeline.objects.get(pk=t_pk)

    def get(self, request, *args, **kwargs):
        b_pk = kwargs['b_pk']  # book pk
        t_pk = kwargs['pk']

        try:
            book = BookStore.objects.get(pk=b_pk)
            try:
                time = book.booktimeline_set.get(pk=t_pk)
                serializer = self.get_serializer(time)

                return Response(serializer.data, status=status.HTTP_200_OK)
            except BookTimeline.DoesNotExist:
                return Response(None, status=status.HTTP_404_NOT_FOUND)
        except BookStore.DoesNotExist:
            return Response(None, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        instance = self.get_object(kwargs)

        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        return self.destroy(self, request, *args, **kwargs)


class BookNoteList(generics.ListCreateAPIView):
    serializer_class = BookNoteSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        b_pk = self.kwargs['pk']

        try:
            book = BookStore.objects.get(pk=b_pk)
            note_queryset = book.booknote_set.all()
            serializer = self.get_serializer(note_queryset, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except BookStore.DoesNotExist:
            return Response(None, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class BookNoteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookNote.objects.prefetch_related('book')
    serializer_class = BookNoteSerializer
    permission_classes = [IsAuthenticated, ]

    def get_object(self, *args, **kwargs):
        b_pk = self.kwargs['pk']
        return BookNote.objects.get(pk=b_pk)

    def get(self, request, *args, **kwargs):
        b_pk = kwargs['b_pk']
        n_pk = kwargs['pk']

        try:
            book = BookStore.objects.get(pk=b_pk)
            try:
                note = book.booknote_set.get(pk=n_pk)
                serializer = self.get_serializer(note)
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            except BookNote.DoesNotExist:
                return Response(None, status=status.HTTP_404_NOT_FOUND)
        except BookStore.DoesNotExist:
            return Response(None, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        instance = self.get_object(kwargs)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        return self.destroy(self, request, *args, **kwargs)


class BookChoiceView(View):
    def get(self, request):
        option_data = {
            'book_format': json.dumps(choice.CHOICES_BOOK_FORMAT)
        }
        return JsonResponse(option_data)