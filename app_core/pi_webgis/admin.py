from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin
from django.contrib.gis import admin
from .models import Escolaspublicas, Loteexistente, Regiaoadministrativa
#from django.contrib.gis.admin import OSMGeoAdmin


# Register your models here.

class EscolaspublicasAdmin(LeafletGeoAdmin):
    list_display = ('cod_entidade', 'nome_escola')
    search_fields = ('cod_entidade', 'nome_escola')
    #list_filter = ('cod_entidade',)
    #fields = ('cod_entidade', 'nome_escola', 'geom')

class RegiaoadministrativaAdmin(LeafletGeoAdmin):
    list_display = ('ra_cira', 'ra_nome', 'ra_codigo')
    search_fields = ('ra_nome', 'ra_cira')

class LoteexistenteAdmin(LeafletGeoAdmin):
    list_display = ('ct_ciu', 'lt_enderec')
    search_fields = ('ct_ciu', 'lt_enderec')

admin.site.register(Loteexistente, LoteexistenteAdmin)
admin.site.register(Escolaspublicas, EscolaspublicasAdmin)
admin.site.register(Regiaoadministrativa, RegiaoadministrativaAdmin)
    
