from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import messages
from comment.forms import CommentForm


# Create your views here.

def comment_create(request):
    taberu_id = request.POST.get("Taberu")
    content = request.POST.get("content")

    data = {"content":content, "Taberu":taberu_id}

    form = CommentForm(data=data)

    if form.is_valid():
        form.save()
        messages.success(request,"コメントを投稿しました。")
    else:
        messages.error(request,"コメントが投稿できませんでした。")
    
    return redirect("Taberu:detail",pk=taberu_id)