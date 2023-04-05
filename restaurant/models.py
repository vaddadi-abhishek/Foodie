from django.db import models
from account.models import User

# Create your models here.
class registerRestaurant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    Mobile_Num = models.CharField(max_length=15)
    Restaurant_Name = models.CharField(max_length=30)
    Address = models.CharField(max_length=255)
    Located_State = models.CharField(max_length=40)
    Located_City = models.CharField(max_length=40)
    FSSAI_doc = models.FileField(upload_to='restaurantDocs/')
    Eat_House = models.FileField(upload_to='restaurantDocs/')
    GST = models.FileField(upload_to='restaurantDocs/')
    NOC = models.FileField(upload_to='restaurantDocs/')
    Restaurant_Imgs = models.ManyToManyField('UploadedFile')

    class Meta:
        db_table = 'Restaurant_Registration'

class UploadedFile(models.Model):
    restaurant = models.ForeignKey(registerRestaurant, on_delete=models.CASCADE)
    file = models.FileField(upload_to='uploads/')

    class Meta:
        db_table = 'RestaurantImgUploadHandle'
