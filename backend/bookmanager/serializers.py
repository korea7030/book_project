from rest_framework import serializers
from .models import BookStore, BookNote, BookTimeline
from django.core.exceptions import ObjectDoesNotExist

from common import choice


class BookStoreSerializer(serializers.ModelSerializer):
    """
    BookStore Serializer
     - 생성, 리스트 , 삭제, 상세
    """
    read_status = serializers.CharField(source='get_read_status_display')
    
    class Meta:
        model = BookStore
        fields = (
            'pk',
            'title',
            'subtitle',
            'author',
            'translator',
            'publisher',
            'publish',
            'book_format',
            'pages',
            'ISBN',
            'read_status',
            'rating',
            'tag',
            'started_reading',
            'finished_reading',
            'book_image_uri',
            'reg_date',
            'mod_date',
            'user')
    
    def create(self, validated_data):
        """
        create data
        :param validated_data:
        :return:
        """
        return BookStore.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        update data
        :param instance:
        :param validated_data:
        :return:
        """
        instance.title = validated_data.get('title', instance.title)
        instance.subtitle = validated_data.get('subtitle', instance.subtitle)
        instance.author = validated_data.get('author', instance.author)
        instance.publisher = validated_data.get('publisher', instance.publisher)
        instance.publish = validated_data.get('publish', instance.publish)
        instance.translator = validated_data.get('translator', instance.publisher)
        instance.book_format = validated_data.get('book_format', instance.book_format)
        instance.pages = validated_data.get('page', instance.pages)
        instance.read_status = validated_data.get('read_status', instance.read_status)
        instance.started_reading = validated_data.get('started_reading', instance.started_reading)
        instance.finished_reader = validated_data.get('finished_reading', instance.finished_reading)
        instance.save()
        return instance


class BookTimelineSerializer(serializers.ModelSerializer):
    """
    Book Timeline serializer
     - 생성, 리스트, 상세, 삭제
    """

    class Meta:
        model = BookTimeline
        fields = '__all__'

    def create(self, validated_data):
        return BookTimeline.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.book = validated_data('book', instance.book)
        instance.started_date = validated_data.get('started_date', instance.started_date)
        instance.started_time = validated_data.get('started_time', instance.started_time)
        instance.finished_time = validated_data.get('finished_time', instance.finished_time)
        instance.start_page = validated_data.get('start_page', instance.start_page)
        instance.end_page = validated_data.get('end_page', instance.end_page)
        instance.save()
        return instance


class BookNoteSerializer(serializers.ModelSerializer):
    """
    Book Note serializer
     - 상세, 삭제, 생성
    """

    class Meta:
        model = BookNote
        fields = '__all__'

    def create(self, validaed_data):
        return BookNote.objects.create(**validaed_data)

    def update(self, instance, validated_data):
        print('validate_data : ', validated_data)
        instance.note = validated_data.get('note', instance.note)
        instance.save()
        return instance
