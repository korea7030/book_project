from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)
from common import choice


class UserManager(BaseUserManager):
    def _create_user(self, email, username, password, **extra_fields):
        if not email or not username:
            raise ValueError("required field")

        email = self.normalize_email(email)
        username = self.model.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, username, password, **extra_fields):
        if not email or not username:
            raise ValueError("required field")

        return self._create_user(email, username, password, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields['is_admin'] = True
        extra_fields['is_superuser'] = True
        return self._create_user(username, email, password=password, **extra_fields)


class BookUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='email address', unique=True)
    username = models.CharField(verbose_name='username', max_length=150)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    book_search_api = models.CharField(max_length=100, choices=choice.CHOICES_SEARCH_API, default='1')

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_admin
