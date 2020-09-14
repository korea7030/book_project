from django.db import models
from accounts.models import *

from common import choice


class BookStore(models.Model):
    """
    Store Book information
    """
    user = models.ForeignKey(BookUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=300, verbose_name='book title')
    subtitle = models.CharField(max_length=500, verbose_name='book subtitle', null=True, blank=True)
    author = models.CharField(max_length=150, verbose_name='author', null=True, blank=True)
    translator = models.CharField(max_length=100, verbose_name='tranlator', null=True, blank=True)
    publisher = models.CharField(max_length=100, verbose_name='publisher', null=True, blank=True)
    publish = models.CharField(max_length=20, verbose_name='publish', null=True, blank=True)
    book_format = models.CharField(max_length=15, verbose_name='book_format',
                                   choices=choice.CHOICES_BOOK_FORMAT)
    pages = models.PositiveIntegerField(verbose_name='pages', default=0)
    ISBN = models.CharField(max_length=30, verbose_name='ISBN', null=True, blank=True)
    read_status = models.CharField(max_length=30, verbose_name='read status', default='10',
                                   choices=choice.CHOICES_READ_STATUS)
    rating = models.PositiveIntegerField(verbose_name='rating', default=0)
    tag = models.CharField(max_length=100, verbose_name='tag', null=True, blank=True)
    started_reading = models.DateField(null=True, blank=True)
    finished_reading = models.DateField(null=True, blank=True)
    book_image_uri = models.CharField(max_length=1000, verbose_name='book image uri', default='', null=True, blank=True)
    reg_date = models.DateTimeField(auto_now_add=True)
    mod_date = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'book_store'
        ordering = ('-reg_date',)


class BookTimeline(models.Model):
    """
    Book Timeline information
    """
    book = models.ForeignKey(BookStore, on_delete=models.CASCADE, verbose_name='book_store', null=True)
    started_date = models.DateField()
    started_time = models.TimeField()
    finished_time = models.TimeField()
    start_page = models.PositiveIntegerField(verbose_name='start_page', default=0)
    end_page = models.PositiveIntegerField(verbose_name='end_page', default=0)
    reg_date = models.DateTimeField(auto_now_add=True)
    mod_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'book_timeline'
        ordering = ('-reg_date',)


class BookNote(models.Model):
    """
    Book Note information
    """
    book = models.ForeignKey(BookStore, on_delete=models.CASCADE, verbose_name='book_store', null=True)
    note = models.TextField(default='')
    reg_date = models.DateTimeField(auto_now_add=True)
    mod_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'book_note'
