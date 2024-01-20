from django.views.generic import ( TemplateView, CreateView, DeleteView, UpdateView)
from django.urls import reverse, reverse_lazy
from django.contrib import messages

from django.contrib.auth.mixins import LoginRequiredMixin

from Taberu.models import Taberu
from Taberu.forms import TaberuForm

class StaffroomMixin(LoginRequiredMixin):
    login_url = reverse_lazy("login")

class StaffroomTemplateView(StaffroomMixin,TemplateView):
    template_name = "staffroom/index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        if self.request.user.is_authenticated:
            context["taberu_list"] = Taberu.objects.filter(user=self.request.user)
        else:
            context["taberu_list"] = None

        return context

class TaberuCreateView(StaffroomMixin,CreateView):
    model = Taberu
    form_class = TaberuForm
    success_url = reverse_lazy("Taberu:index")

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.POST.dict()
        data['user'] = user.id
        form = TaberuForm(data=data, files=request.FILES)

        if form.is_valid():
            return self.form_valid(form)
        else:
            return self.form_invalid(form)

    def form_valid(self, form):
        messages.success(self.request, "保存しました")
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, "保存できませんでした")
        return super().form_invalid(form)

class TaberuUpdateView(StaffroomMixin,UpdateView):
    model = Taberu
    fields = ["title", "content", "description", "image"]

    def get_success_url(self):
        pk = self.kwargs.get("pk")
        return reverse("Taberu:detail", kwargs={"pk": pk})

    def form_valid(self, form):
        messages.success(self.request, "更新しました")
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, "更新できませんでした")
        return super().form_invalid(form)

class TaberuDeleteView(StaffroomMixin,DeleteView):
    model = Taberu
    success_url = reverse_lazy("Taberu:index")

    def delete(self, request, *args, **kwargs):
        messages.success(self.request, "削除しました")
        return super().delete(request, *args, **kwargs)