from django.conf.urls import url
from caseHandler import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^case/$',views.caseApi),
    url(r'^case/([0-9]+)$',views.caseApi),
    url(r'^getimg/(?P<username>\w{0,50})/$', views.downloadFile)

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
