from django.forms.models import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import (ListView, CreateView, DetailView, 
                                  UpdateView,DeleteView)
from django.urls import reverse, reverse_lazy

from django.contrib import messages

from .models import Taberu

class TaberuListView(ListView):
    model = Taberu

class TaberuCreateView(CreateView):
    model = Taberu
    fields = ["title","content","description"]
    success_url = reverse_lazy("taberu:index")

    def form_valid(self, form):
        messages.success(self.request, "更新しました。")
        return super().form_valid(form)
    
    def form_invalid(self, form):
        messages.error(self.request, "更新できませんでした。")
        return super().form_invalid(form)

class TaberuDetailView(DetailView):
    model = Taberu

    def delete(self, request, *args, **kwargs):
        messages.success(self.request, "削除しました。")
        return super().delete(request, *args, **kwargs)

class TaberuUpdateView(UpdateView):
    model = Taberu
    fields = ["title","content","description"]
    
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