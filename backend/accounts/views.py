from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views import View

from rest_framework import generics
from rest_framework import status
from rest_framework import views
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

from accounts.serializers import (
    CreateUserSerializer, UserSerializer, LoginUserSerializer
)
from accounts.models import BookUser

import json
from common import choice


class CreateUserAPIView(generics.CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token_data = Token.objects.create(user=user)

            return Response({
                'user': UserSerializer(user, context=self.get_serializer_context()).data,
                'token': token_data.key,
                'message': 'Create User'
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'user': None,
                'token': None,
                'message': 'Create Not User'
            }, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginUserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data

            token_data = Token.objects.create(user=user)

            return Response({
                'user': UserSerializer(user, context=self.get_serializer_context()).data,
                'token': token_data.key,
                'message': 'Login Success'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'user': None,
                'token': None,
                'message': 'Login Fail'
            }, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response({
            'message': 'Logout Success',
        }, status=status.HTTP_200_OK)


class UserAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        print(self.request.user)
        return self.request.user

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class UserChoiceView(View):
    def get(self, request):
        option_data = {
            'book_search_api': json.dumps(choice.CHOICES_SEARCH_API)
        }
        return JsonResponse(option_data)


class UserEmailValidateCheckView(View):
    def get(self, request):
        email = request.GET.get('email', None)
        result = {
            'msg': 'Email Address Available'
        }
        try:
            # duplicate email
            user = BookUser.objects.get(email=email)
            result['msg'] = 'Email Address Not Available'
            return JsonResponse(result)
        except BookUser.DoesNotExist:
            # not duplicate email
            return JsonResponse(result)
