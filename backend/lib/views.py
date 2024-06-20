from django.views.generic import TemplateView
from django.views import View
from django.http import JsonResponse

class IndexTemplateView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context