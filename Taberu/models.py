from django.db import models

# Create your models here.

class Taberu(models.Model):
    title = models.CharField(verbose_name="タイトル", max_length=200)
    content = models.TextField(verbose_name="内容")

    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "タベル"
        verbose_name_plural = "タベル"
    
    def __str__(self):
        return self.title
    