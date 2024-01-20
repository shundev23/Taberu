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

from rest_framework.views import APIView
from rest_framework.response import Response

class TestAPIView(APIView):
    def get(self, request, *args, **kwargs):
        data = {"message": "Hello from TestAPIView"}
        return Response(data)

    def post(self, request, *args, **kwargs):
        return Response({"status": "POST request received"})

class TaberuListView(ListView):
    model = Taberu

    def get_queryset(self):
        qs = Taberu.objects.all()
        keyword = self.request.GET.get("q")

        if(keyword):
            qs = qs.filter(title__contains=keyword)

        return qs

class TaberuDetailView(DetailView):
    model = Taberu

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['CommentForm'] = CommentForm(initial={'Taberu': self.object})

        return context

    def delete(self, request, *args, **kwargs):
        messages.success(self.request, "削除しました。")
        return super().delete(request, *args, **kwargs)