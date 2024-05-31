from django import forms

from .models import Taberu


class TaberuForm(forms.ModelForm):

    class Meta:
        model = Taberu
        fields = ["title", "content", "description", "image", "user", ]
        widgets = {
            "user": forms.HiddenInput()
        }