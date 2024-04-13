"""
URL configuration for app_core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from pi_webgis.views import home, webgis
from pi_webgis.views import ViewEscolaspublicas_geojson, ViewRegiaoAdministrativa_geojson, busca_endereco

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name=''),
    path('webgis/',webgis, name='webgis'),
    path('escolas/', ViewEscolaspublicas_geojson, name='url_escolas'),
    path('ras/', ViewRegiaoAdministrativa_geojson, name='url_ras'),
    path('busca_endereco/', busca_endereco, name='busca_endereco'),
    #path('search_endereco/', search_endereco, name='search_endereco'),
    #path('lotes/', ViewLotesExistentes_geojson, name='url_lotes')
]

urlpatterns += staticfiles_urlpatterns()

