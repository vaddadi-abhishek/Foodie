from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    first_name = None  # remove default field
    last_name = None   # remove default field
    is_staff = models.BooleanField(default=False)
    is_owner = models.BooleanField(default=False)  # add your custom field

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]  # email is required on creation

    def __str__(self):
        return self.username