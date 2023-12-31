from typing import Any, Dict
from django.db.models.query import QuerySet
from django.forms.models import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import (ListView, CreateView, DetailView, 
                                  UpdateView,DeleteView)
from django.urls import reverse, reverse_lazy

from django.contrib import messages

from .models import Taberu
from comment.forms import CommentForm

class TaberuListView(ListView):
    model = Taberu

    def get_queryset(self):
        qs = Taberu.objects.all()
        keyword = self.request.GET.get("q")

        if(keyword):
            qs = qs.filter(title__contains=keyword)

        return qs

class TaberuCreateView(CreateView):
    model = Taberu
    fields = ["title","content","description","image",]
    success_url = reverse_lazy("taberu:index")

    def form_valid(self, form):
        messages.success(self.request, "更新しました。")
        return super().form_valid(form)
    
    def form_invalid(self, form):
        messages.error(self.request, "更新できませんでした。")
        return super().form_invalid(form)

class TaberuDetailView(DetailView):
    model = Taberu
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['CommentForm'] = CommentForm(initial={'Taberu': self.object})

        return context

    def delete(self, request, *args, **kwargs):
        messages.success(self.request, "削除しました。")
        return super().delete(request, *args, **kwargs)

class TaberuUpdateView(UpdateView):
    model = Taberu
    fields = ["title","content","description","image",]
    
    def get_success_url(self):
        pk = self.kwargs.get("pk")
        return reverse("taberu:detail",kwargs={"pk":pk})
    
    def form_valid(self, form):
        messages.success(self.request, "更新しました。")
        return super().form_valid(form)
    
    def form_invalid(self, form):
        messages.error(self.request, "更新できませんでした。")
        return super().form_invalid(form)

class TaberuDeleteView(DeleteView):
    model = Taberu
    success_url = reverse_lazy("taberu:index")