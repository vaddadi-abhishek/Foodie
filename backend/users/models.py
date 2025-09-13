from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        if not username:
            raise ValueError("Username is required")
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, username, password, **extra_fields)


class CustomUser(AbstractUser):
    first_name = None  # remove default field
    last_name = None   # remove default field

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    
    is_staff = models.BooleanField(default=False)
    is_owner = models.BooleanField(default=False)  # add your custom field

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]  # email is required on creation

    def __str__(self):
        return self.username


class UserToken(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="refresh_token"
    )
    token = models.TextField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Token for {self.user.username}"