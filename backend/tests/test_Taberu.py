from django.test import TestCase
from django.urls import reverse_lazy

from Taberu.models import Taberu

# Create your tests here.

class TestTaberu(TestCase):

    fixtures = ["fixtures/Taberu.json","fixtures/user.json"]

    def setUp(self):
        # queryset発行-- Taberu.objects.all()
        self.Taberu_list = Taberu.objects.all()

    def test_top_page(self):
        res = self.client.get("/")
        self.assertEqual(res.status_code, 200)

    def test_Taberu_top(self):
        res = self.client.get("/Taberu/")
        self.assertEqual(res.status_code, 200)

    def test_Taberu_detail(self):
        for Taberu in self.Taberu_list:
            res = self.client.get(reverse_lazy("Taberu:detail", kwargs={"pk": Taberu.id}))
            self.assertEqual(res.status_code, 200)