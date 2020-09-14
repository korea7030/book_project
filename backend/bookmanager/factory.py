import factory
from faker import Faker
from .models import BookStore, BookTimeline, BookNote


class BookStoreFactory(factory.Factory):
    class Meta:
        model = BookStore

    title = Faker('ko_KR')
    subtitle = Faker('ko_KR')
    author = Faker('ko_KR')
    translator = Faker('ko_KR')
    publisher = Faker('ko_KR')
    publish = Faker('ko_KR')
    book_format = Faker('ko_KR')
    pages = Faker('ko_KR')
    ISBN = Faker('ko_KR')
    read_status = Faker('ko_KR')
    rating = Faker('ko_KR')
    tag = Faker('ko_KR')
    started_reading = Faker('ko_KR')
    finished_reading = Faker('ko_KR')
