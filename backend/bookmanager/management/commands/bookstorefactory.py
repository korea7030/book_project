from django.core.management.base import BaseCommand
from bookmanager.factory import *


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('--bookstores', default=100, type=int, help='The number of fake books to create.')

    def handle(self, *args, **options):
        for _ in range(options['bookstores']):
            with factory.Faker.override_default_locale('ko_KR'):
                BookStoreFactory.create()
