from django.shortcuts import render
from django.views.generic import ListView, CreateView

from .models import Taberu

class TaberuListView(ListView):
    model = Taberu

class TaberuCreateView(CreateView):
    model = Taberu
    fields = ["title","content","description"]
    success_url = "/"