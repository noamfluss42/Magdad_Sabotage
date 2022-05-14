from django.conf.urls import url
from caseHandler import views
from django.views.decorators.csrf import csrf_exempt

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    url(r'^case/$',views.caseApi),
    url(r'^case/([0-9]+)$',views.caseApi),
    url(r'^exhibits/query/$', views.exhibitQuery),
    url(r'^exhibits/dwnld/$', views.exhibitDwnld),
    url(r'^exhibits', views.exhibitsApi),
    url(r'^exhibits/([0-9]+)$', views.exhibitsApi),
    url(r'^samples', views.samplesApi),
    url(r'^samples/([0-9]+)$', views.samplesApi),
    # url(r'^img/$', views.downloadFileParam),
    url(r'^img', views.downloadFile),
    url(r'^query', views.queryHandler)

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
