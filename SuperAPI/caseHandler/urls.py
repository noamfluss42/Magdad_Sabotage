from django.conf.urls import url
from caseHandler import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
                  url(r'^case/$', views.caseApi),
                  url(r'^case/([0-9]+)$', views.caseApi),
                  url(r'^exhibits/$', views.exhibitsApi),
                  url(r'^exhibits/([0-9]+)$', views.exhibitsApi)

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
