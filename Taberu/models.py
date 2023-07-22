from django.db import models

# Create your models here.

class Taberu(models.Model):
    # タイトルの保存：200文字以内
    title = models.CharField(verbose_name="タイトル", max_length=200)
    # models.TextField: 内容を自動で保存
    content = models.TextField(verbose_name="内容")

    # 引数auto_now_add : 保存した時間を最初だけ自動で保存
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "タベル"
        verbose_name_plural = "タベル"
    
    def __str__(self):
        return self.title
    