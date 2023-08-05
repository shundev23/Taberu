from django.views.generic import TemplateView
from Taberu.models import Taberu

class IndexTemplateView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['taberu_top'] = Taberu.objects.order_by('?')[0]
        context['taberu_list'] = Taberu.objects.order_by("-created")

        return context

