#import logging
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.core.serializers import serialize
#from django.contrib.gis.serializers import GeoJSONSerializer
#from django.contrib.gis.geos import GEOSGeometry
from pi_webgis.models import Escolaspublicas, Regiaoadministrativa

# Create your views here.

def home(request):
    return render(request, "home.html")

'''
def ViewRegiaoadministrativa_geojson(request):
    features_ra = []
    ras = Regiaoadministrativa.objects.all()
    for item in ras:
        feature = {
            "type":"Feature",
            "geometry": item.geom.geojson,
            "properties": {
                "num_ra": item.ra_cira,
                "nome_ra": item.ra_nome,
            }
        }
        features_ra.append(feature)

    feature_collection_ra = {
        "type": "FeatureCollection",
        "features": features_ra
    }

    return JsonResponse(feature_collection_ra)
'''

def ViewEscolaspublicas_geojson(request):
    escolas = Escolaspublicas.objects.all() #executando um consulta no banco para retornar todos os registros da tabela regiao administrativa
    geojson_escolas = serialize("geojson", escolas, geometry_field="geom", fields=["cod_entidade", "nome_escola",])
    geojson_escolas_data = json.loads(geojson_escolas)
    geojson_escolas_fixed = json.dumps(geojson_escolas_data, indent=None)
    return HttpResponse(geojson_escolas_fixed, content_type="application/json")

def ViewRegiaoAdministrativa_geojson(request):
    ras = Regiaoadministrativa.objects.all()
    geojson_ras = serialize("geojson", ras, geometry_field="geom", fields=["ra_cira", "ra_nome",])
    geojson_ras_data = json.loads(geojson_ras)
    geojson_ras_fixed = json.dumps(geojson_ras_data, indent=None)
    return HttpResponse(geojson_ras_fixed, content_type="application/json")
    '''
    return render(
        request,
        'teste.html',
        {'ras': ras}
    )
    '''
    #geojson_data = serialize('geojson', regioes)
    #geojson_ras = json.loads(geojson_data)
    #return geojson_ras
    #serializer = GeoJSONSerializer()
    #geojson = serializer.serialize(regioes, geometry_field='geom', fields=('ra_cira','ra_nome',))
    #return JsonResponse(geojson, safe=False)