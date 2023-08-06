from django.db import models
from Taberu.models import Taberu

# Create your models here.

class Comment(models.Model):
    content = models.TextField()

    created = models.DateTimeField(auto_now_add=True)

    Taberu = models.ForeignKey(Taberu,on_delete=models.CASCADE,default=None,null=True)