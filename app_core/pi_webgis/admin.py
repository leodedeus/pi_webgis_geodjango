from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin
#from django.contrib.gis import admin
#from django.contrib.gis.admin import OSMGeoAdmin
from .models import Escolaspublicas, Loteexistente, Regiaoadministrativa, Hidrografia, Lagoslagoas, Sistemaviario, Sistemaferroviario, TipoSolicitacao, SolicitacaoPopulacao


# Register your models here.

class EscolaspublicasAdmin(LeafletGeoAdmin):
#class EscolaspublicasAdmin(admin.GISModelAdmin):
    list_display = ('cod_entidade', 'nome_escola')
    search_fields = ('cod_entidade', 'nome_escola')
    #list_filter = ('cod_entidade',)
    #fields = ('cod_entidade', 'nome_escola', 'geom')

class RegiaoadministrativaAdmin(LeafletGeoAdmin):
#class RegiaoadministrativaAdmin(admin.GISModelAdmin):
    list_display = ('ra_cira', 'ra_nome', 'ra_codigo')
    search_fields = ('ra_nome', 'ra_cira')

class LoteexistenteAdmin(LeafletGeoAdmin):
#class LoteexistenteAdmin(admin.GISModelAdmin):
    list_display = ('ct_ciu', 'lt_enderec')
    search_fields = ('ct_ciu', 'lt_enderec')

class HidrografiaAdmin(LeafletGeoAdmin):
#class LoteexistenteAdmin(admin.GISModelAdmin):
    list_display = ('osm_id', 'code','fclass', 'name')
    search_fields = ('osm_id', 'code','fclass', 'name')

class LagoslagonasAdmin(LeafletGeoAdmin):
#class LoteexistenteAdmin(admin.GISModelAdmin):
    list_display = ('osm_id', 'code','fclass', 'name')
    search_fields = ('osm_id', 'code','fclass', 'name')

class SistemaviarioAdmin(LeafletGeoAdmin):
#class LoteexistenteAdmin(admin.GISModelAdmin):
    list_display = ('osm_id', 'code','fclass', 'name')
    search_fields = ('osm_id', 'code','fclass', 'name')

class SistemaferroviarioAdmin(LeafletGeoAdmin):
#class LoteexistenteAdmin(admin.GISModelAdmin):
    list_display = ('osm_id', 'code','fclass', 'name')
    search_fields = ('osm_id', 'code','fclass', 'name')

class TipoSolicitacaoAdmin(LeafletGeoAdmin):
#class LoteexistenteAdmin(admin.GISModelAdmin):
    list_display = ('numsolicitacao', 'tiposolicitacao')
    search_fields = ('numsolicitacao', 'tiposolicitacao')

class SolicitacaoPopulacaoAdmin(LeafletGeoAdmin):
    list_display = ('tiposolicitacao', 'nomesolicitante', 'emailsolicitante', 'fonesolicitante')
    seach_fields = ('tiposolicitacao', 'nomesolicitante', 'emailsolicitante', 'fonesolicitante') 

admin.site.register(Loteexistente, LoteexistenteAdmin)
admin.site.register(Escolaspublicas, EscolaspublicasAdmin)
admin.site.register(Regiaoadministrativa, RegiaoadministrativaAdmin)
admin.site.register(Hidrografia, HidrografiaAdmin)
admin.site.register(Lagoslagoas, LagoslagonasAdmin)
admin.site.register(Sistemaviario, SistemaviarioAdmin)
admin.site.register(Sistemaferroviario, SistemaferroviarioAdmin)
admin.site.register(TipoSolicitacao, TipoSolicitacaoAdmin)
admin.site.register(SolicitacaoPopulacao, SolicitacaoPopulacaoAdmin)

    
