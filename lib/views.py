from django.views.generic import TemplateView
from Taberu.models import Taberu
from django.views import View
from django.http import JsonResponse

class IndexTemplateView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['taberu_list'] = Taberu.objects.order_by("-created")

        # テスト実行時、データベースにデータがないのでエラーハンドリング
        try:
            context['taberu_top'] = Taberu.objects.order_by('?')[0]
        except IndexError:
            context['Taberu_top'] = None

        return context

class IndexAPIView(View):
    def get(self, request, *args, **kwargs):
        # Taberuモデルの全レコードを作成日時の降順で取得し、それらの値を辞書のリストとして返す。
        taberu_list = list(Taberu.objects.order_by("-created").values())
        # Taberuモデルのレコードをランダムに1件取得
        taberu_top = list(Taberu.objects.order_by('?').values()[:1])
        # taberu_listとtaberu_topをキーとして持つ辞書をJSON形式で返しています。
        return JsonResponse({'taberu_list': taberu_list, 'taberu_top': taberu_top})