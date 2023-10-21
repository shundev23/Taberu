from django.shortcuts import render
from django.views.generic import TemplateView
from Taberu.models import Taberu

class StaffroomTemplateView(TemplateView):
    template_name = "staffroom/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if self.request.user.is_authenticated:
            context["taberu_list"] = Taberu.objects.filter(user=self.request.user)
        else:
            context["taberu_list"] = None

        return context
    