from accounts.models import BookUser
from rest_framework import serializers
from django.contrib.auth import authenticate


class CreateUserSerializer(serializers.ModelSerializer):
    """
    register serializer
    """

    class Meta:
        model = BookUser
        fields = ('email', 'username', 'password')
        read_only_fields = ('is_staff', 'is_superuser', 'is_active')

    def create(self, validated_data):
        user = BookUser.objects.create_user(
            validated_data['email'], validated_data['username'], validated_data['password']
        )

        return user


class LoginUserSerializer(serializers.Serializer):
    """
    login serializer
    """
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Unable to log in with provided credentials.')


class UserSerializer(serializers.ModelSerializer):
    # book_search_api = serializers.CharField(source='get_book_search_api_display')
    
    class Meta:
        model = BookUser
        fields = ('pk', 'email', 'username', 'book_search_api')
