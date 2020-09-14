from django import forms
from django.contrib import admin
from django.utils.html import format_html

from .models import BookStore
import ast

MY_CHOICES = (
    ('msg1', 'Hello'),
    ('msg2', 'Hi'),
)

# Register your models here.
@admin.register(BookStore)
class BookStoreAdmin(admin.ModelAdmin):
    list_display = ('title', 'book_format', 'pages', 'started_reading', 'finished_reading')