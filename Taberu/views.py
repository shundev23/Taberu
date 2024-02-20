from typing import Any, Dict
from django.db.models.query import QuerySet
from django.forms.models import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import (ListView, DetailView)
from django.urls import reverse, reverse_lazy

from django.contrib import messages

from .models import Taberu
from comment.forms import CommentForm

from rest_framework.generics import ListAPIView
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response

class TaberuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taberu
        fields = '__all__'


class TaberuListView(ListAPIView):
    model = Taberu
    queryset = Taberu.objects.all()
    serializer_class = TaberuSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        keyword = self.request.query_params.get('q', None)
        if(keyword is not None):
            queryset = queryset.filter(title__icontains=keyword)
        return queryset

class TaberuDetailView(DetailView):
    model = Taberu

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['CommentForm'] = CommentForm(initial={'Taberu': self.object})

        return context

    def delete(self, request, *args, **kwargs):
        messages.success(self.request, "削除しました。")
        return super().delete(request, *args, **kwargs)