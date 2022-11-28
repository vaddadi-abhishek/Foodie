from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone


# Create your models here.
class CustomUserManager(BaseUserManager):
    def _create_user(self, full_name, gender, email, password, **extrafields):
        if not email:
            raise ValueError('Email must be provided')
        if not password:
            raise ValueError('Password must be provided')
        
        user = self.model(
            email = self.normalize_email(email),
            full_name = full_name,
            gender = 'None',
            **extrafields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_user(self, full_name, gender, email, password, **extra_fields):
        extra_fields.setdefault('is_staff',False)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_superuser',False)
        return self._create_user(full_name, gender, email, password, **extra_fields)
        
    def create_superuser(self, full_name, gender, email, password, **extra_fields):
        extra_fields.setdefault('is_staff',False)
        extra_fields.setdefault('is_active',True)
        extra_fields.setdefault('is_superuser',True)
        return self._create_user(full_name, gender, email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=6)
    email = models.CharField(unique=True,max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRE_FIELDS = ['full_name']

    class Meta:
        verbose_name: 'User'
        verbose_name_plural: 'Users'