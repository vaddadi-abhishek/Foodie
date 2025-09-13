from rest_framework import serializers
from .models import CustomUser, UserToken
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from django.utils import timezone

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ("username", "email", "password", "password_confirm")

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError({"password": "Passwords don't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        user = CustomUser.objects.create_user(**validated_data, is_owner=False)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "is_owner")
        read_only_fields = ("email", "username")


# ✅ Override JWT serializer to use email
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username  # optional: add username to token
        return token

    def validate(self, attrs):
        # The parent class validates the user, and we get the user object
        attrs["username"] = attrs.get("email")
        data = super().validate(attrs)

        # Manually update the last_login field upon successful login
        self.user.last_login = timezone.now()
        self.user.save(update_fields=["last_login"])

        # Get the refresh token object
        refresh = self.get_token(self.user)

        # Save or update the refresh token in the database
        UserToken.objects.update_or_create(
            user=self.user,
            defaults={'token': str(refresh)}
        )

        return data