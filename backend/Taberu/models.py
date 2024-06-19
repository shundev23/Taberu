from django.db import models
from django.contrib.auth.models import User
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

# Create your models here.

class Taberu(models.Model):
    title = models.CharField(verbose_name="タイトル", max_length=200)
    content = models.TextField(verbose_name="内容")

    description = models.TextField(blank=True, default="")

    image = models.ImageField(upload_to="images/uploaded/", default=None, null=True, blank=True)

    detail_main = ImageSpecField(
        source="image",
        processors=[ResizeToFill(640, 480)],
        format="jpeg",
        options={"quality": 80}
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "タベル"
        verbose_name_plural = "タベル"

    def __str__(self):
        return self.title
    
class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    atmosphere = models.CharField(max_length=255)
    taste = models.CharField(max_length=255)
    egg_texture = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    
    def __str__(self):
        return self.name