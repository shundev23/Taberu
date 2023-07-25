# Generated by Django 4.2.3 on 2023-07-25 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Taberu', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='taberu',
            options={'verbose_name': 'タベル', 'verbose_name_plural': 'タベル'},
        ),
        migrations.AddField(
            model_name='taberu',
            name='description',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='taberu',
            name='content',
            field=models.TextField(verbose_name='内容'),
        ),
        migrations.AlterField(
            model_name='taberu',
            name='title',
            field=models.CharField(max_length=200, verbose_name='タイトル'),
        ),
    ]
