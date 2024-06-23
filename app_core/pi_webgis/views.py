#import logging
import json
import requests
from django.shortcuts import render, redirect
from django.contrib import messages 
from django.http import JsonResponse
from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.core.serializers import serialize
from django.contrib.gis.geos import Point
#from django.contrib.gis.db.models.functions import Transform
#from django.contrib.gis.serializers import GeoJSONSerializer
#from django.contrib.gis.geos import GEOSGeometry
from pi_webgis.models import Escolaspublicas, Regiaoadministrativa, Loteexistente, Lagoslagoas, Sistemaviario, Sistemaferroviario, Hidrografia, TipoSolicitacao, SolicitacaoPopulacao
from pi_webgis.forms import SolicitacaoPopulacaoForm

# Create your views here.
def get_csrf_token(request):
   csrf_token = get_token(request)
   return JsonResponse({'csrf_token': csrf_token})

def home(request):
    return render(request, "home.html")

def webgis(request):
    return render(request, "webgis.html")

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
'''
def ViewLotesExistentes_geojson(request):
    lotes = Loteexistente.objects.all()
    geojson_lotes = serialize("geojson", lotes, geometry_field="geom", fields=["ct_ciu", "lt_ra", "lt_enderec", "ac_area_ct", "ct_origem",])
    geojson_lotes_data = json.loads(geojson_lotes)
    geojson_lotes_fixed = json.dumps(geojson_lotes_data, indent=None)
    return HttpResponse(geojson_lotes_fixed,content_type="application/json")
 

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

#esta view faz uma solicitação get para a api nominatim passando um endereço, e retorna um arquivo json como resposta
def busca_endereco(request):
    # Obtendo o endereço da query string da solicitação
    address = request.GET.get('address')
    
    # Verificando se foi fornecido um endereço
    if not address:
        return JsonResponse({'error': 'Endereço não fornecido na solicitação'}, status=400)

    # Construindo a URL para a API Nominatim com o endereço fornecido
    url = f"https://nominatim.openstreetmap.org/search?q={address}&format=json"
    
    # Fazendo uma requisição GET para a API Nominatim
    response = requests.get(url)
    
    # Verificando se a resposta foi bem-sucedida
    if response.status_code == 200:
        # Convertendo a resposta para JSON
        data = response.json()
        
        # Verificando se os dados estão presentes na resposta
        if data:
            # Obtendo as coordenadas e o nome do local a partir dos dados retornados
            location = data[0]
            latitude = float(location['lat'])
            longitude = float(location['lon'])
            endereco = location['name']
            enderecoCompleto = location['display_name']
            tipoLocal = location['type']
            boundingBox = location['boundingbox']
            
            # Retornando as coordenadas e o nome do local
            return JsonResponse({'latitude': latitude, 'longitude': longitude, 'endereco': endereco, 'enderecoCompleto': enderecoCompleto, 'tipoLocal': tipoLocal, 'boundingBox': boundingBox})
        else:
            # Se os dados estiverem vazios, retornar uma mensagem indicando que o endereço não foi localizado
            return JsonResponse({'error': 'Endereço não localizado'}, status=404)
    else:
        # Se a resposta não for bem-sucedida, retornar uma mensagem de erro na busca
        return JsonResponse({'error': 'Erro na busca'}, status=response.status_code)
    #para testar esse view, faça uma requisição no navegador para o endereço: http://localhost:8000/busca_endereco/?address=ceub taguatinga

def identificar_feicao(request):
   if request.method == 'POST':
       print('entrou no if request.method')

       # Decodifique os dados JSON do corpo da solicitação
       data = json.loads(request.body) #este item foi a alteração que resolveu para a view receber os dados do front
       print(data)

       lat = float(data.get('lat'))
       lng = float(data.get('lng'))
       nomeCamada = data.get('nomeCamada')
       print(lat, lng, nomeCamada)

       # Converta as coordenadas do clique para o sistema de coordenadas da camada no banco de dados
       ponto_clicado = Point(lng, lat, srid=4326)  # srid=4326 é o sistema de coordenadas lat/long
       # Verificar se o ponto foi criado corretamente
       if ponto_clicado:
       # Converter as coordenadas para o sistema de coordenadas da camada no banco de dados
           ponto_clicado.transform(31983)
           print(ponto_clicado)
       else:
           return JsonResponse({'error': 'Falha ao criar o ponto clicado'})

       if nomeCamada == 'Regiões Administrativas':
           print('camada consultada no banco: ', nomeCamada)
           # Realize a consulta espacial para encontrar a região administrativa que intersecta com o ponto clicado
           try:
               regiao_administrativa = Regiaoadministrativa.objects.filter(geom__intersects=ponto_clicado).first()
               print('resultado consulta no banco: ', regiao_administrativa)
               # Verifique se encontrou uma região administrativa
               if regiao_administrativa:
                   geojson_identify_ra = serialize("geojson", [regiao_administrativa], geometry_field="geom", fields=["ra_cira", "ra_nome", "ra_codigo"])
                   print(geojson_identify_ra)
                   # Retorne um HttpResponse com o GeoJSON da feição
                   return HttpResponse(geojson_identify_ra, content_type="application/json")                  
               else:
                   return JsonResponse({'error': 'Nenhuma região administrativa encontrada para as coordenadas fornecidas'})
           except Exception as e:
               return JsonResponse({'error': str(e)})
      
       elif nomeCamada == 'Lotes':
           print('camada consultada no banco: ', nomeCamada)
           # Realize a consulta espacial para encontrar o lote mais próximo ao ponto clicado
           try:
               #Loteexistente se refere a classe no arquivo models.py
               lote_existente = Loteexistente.objects.filter(geom__intersects=ponto_clicado).first()
               print('resultado consulta no banco: ', lote_existente)
               # Verifique se encontrou um lote
               if lote_existente:
                   geojson_identify_lote = serialize("geojson", [lote_existente], geometry_field="geom", fields=["ct_ciu", "lt_enderec", "lt_cep", "ac_area_ct", "ct_origem"])
                   print(geojson_identify_lote)
                   # Retorne um HttpResponse com o GeoJSON da feição
                   return HttpResponse(geojson_identify_lote, content_type="application/json")
               else:
                   return JsonResponse({'error': 'Nenhum lote encontrado para as coordenadas fornecidas'})
           except Exception as e:
               return JsonResponse({'error': str(e)})
          
       elif nomeCamada == 'Lago/Lagoas':
           print('camada consultada no banco: ', nomeCamada)
           # Realize a consulta espacial para encontrar o lote mais próximo ao ponto clicado
           try:
               #Loteexistente se refere a classe no arquivo models.py
               lago_lagoas = Lagoslagoas.objects.filter(geom__intersects=ponto_clicado).first()
               print('resultado consulta no banco: ', lago_lagoas)
               # Verifique se encontrou um lago
               if lago_lagoas:
                   geojson_identify_lago = serialize("geojson", [lago_lagoas], geometry_field="geom", fields=["name", "fclass"])
                   print(geojson_identify_lago)
                   # Retorne um HttpResponse com o GeoJSON da feição
                   return HttpResponse(geojson_identify_lago, content_type="application/json")
               else:
                   return JsonResponse({'error': 'Nenhum lago encontrado para as coordenadas fornecidas'})
           except Exception as e:
               return JsonResponse({'error': str(e)})
        
       elif nomeCamada == 'Escolas':
           print('camada consultada no banco: ', nomeCamada)
           ponto_buffer = ponto_clicado.buffer(10)#10 significa a distancia em unidades do sistema de coordenadas
           print('buffer gerado')
           # Realize a consulta espacial para encontrar a escola mais próximo ao ponto clicado
           try:
               #Loteexistente se refere a classe no arquivo models.py
               escolas = Escolaspublicas.objects.filter(geom__intersects=ponto_buffer).first()
               print('resultado consulta no banco: ',escolas)
               # Verifique se encontrou uma escola
               if escolas:
                   geojson_identify_escola = serialize("geojson", [escolas], geometry_field="geom", fields=["cod_entidade", "nome_escola", "endereco", "cep", "telefone"])
                   print(geojson_identify_escola)
                   # Retorne um HttpResponse com o GeoJSON da feição
                   return HttpResponse(geojson_identify_escola, content_type="application/json")
               else:
                   return JsonResponse({'error': 'Nenhuma escola encontrada para as coordenadas fornecidas'})
           except Exception as e:
               return JsonResponse({'error': str(e)})
        
       elif nomeCamada == 'Sistema Viário':
           print('camada consultada no banco: ', nomeCamada)
           ponto_buffer = ponto_clicado.buffer(10)#10 significa a distancia em unidades do sistema de coordenadas
           print('buffer gerado')
           # Realize a consulta espacial para encontrar a escola mais próximo ao ponto clicado
           try:
               #Loteexistente se refere a classe no arquivo models.py
               vias = Sistemaviario.objects.filter(geom__intersects=ponto_buffer).first()
               print('resultado consulta no banco: ',vias)
               # Verifique se encontrou uma via
               if vias:
                   geojson_identify_vias = serialize("geojson", [vias], geometry_field="geom", fields=["fclass", "name", "oneway", "maxspeed", "layer", "bridge", "tunnel"])
                   print(geojson_identify_vias)
                   # Retorne um HttpResponse com o GeoJSON da feição
                   return HttpResponse(geojson_identify_vias, content_type="application/json")
               else:
                   return JsonResponse({'error': 'Nenhuma via encontrada para as coordenadas fornecidas'})
           except Exception as e:
               return JsonResponse({'error': str(e)})
           
       elif nomeCamada == 'Sistema Ferroviário':
           print('camada consultada no banco: ', nomeCamada)
           ponto_buffer = ponto_clicado.buffer(10)#10 significa a distancia em unidades do sistema de coordenadas
           print('buffer gerado')
           # Realize a consulta espacial para encontrar a escola mais próximo ao ponto clicado
           try:
               #Loteexistente se refere a classe no arquivo models.py
               ferrovias = Sistemaferroviario.objects.filter(geom__intersects=ponto_buffer).first()
               print('resultado consulta no banco: ',ferrovias)
               # Verifique se encontrou uma ferrovia
               if ferrovias:
                   geojson_identify_ferrovias = serialize("geojson", [ferrovias], geometry_field="geom", fields=["fclass", "layer", "bridge", "tunnel"])
                   print(geojson_identify_ferrovias)
                   # Retorne um HttpResponse com o GeoJSON da feição
                   return HttpResponse(geojson_identify_ferrovias, content_type="application/json")
               else:
                   return JsonResponse({'error': 'Nenhuma ferrovia encontrado para as coordenadas fornecidas'})
           except Exception as e:
               return JsonResponse({'error': str(e)})
        
       elif nomeCamada == 'Hidrografia':
           print('camada consultada no banco: ', nomeCamada)
           ponto_buffer = ponto_clicado.buffer(10)#10 significa a distancia em unidades do sistema de coordenadas
           print('buffer gerado')
           # Realize a consulta espacial para encontrar a escola mais próximo ao ponto clicado
           try:
               #Loteexistente se refere a classe no arquivo models.py
               hidrografia = Hidrografia.objects.filter(geom__intersects=ponto_buffer).first()
               print('resultado consulta no banco: ',hidrografia)
               # Verifique se encontrou uma hidrografia
               if hidrografia:
                   geojson_identify_hidrografia = serialize("geojson", [hidrografia], geometry_field="geom", fields=["fclass", "width", "name"])
                   print(geojson_identify_hidrografia)
                   # Retorne um HttpResponse com o GeoJSON da feição
                   return HttpResponse(geojson_identify_hidrografia, content_type="application/json")
               else:
                   return JsonResponse({'error': 'Nenhuma hidrografia encontrada para as coordenadas fornecidas'})
           except Exception as e:
               return JsonResponse({'error': str(e)})
          
   else:
       return JsonResponse({'error': 'Método não permitido'})

def abrir_tabela_atributos(request):
   if request.method == 'POST':
       print('entrou no if request.method')

       try:
           data = json.loads(request.body)
           print('Dados recebidos:', data)

           nomeCamada = data.get('nomeCamada')
           print('Nome da camada recebida:', nomeCamada)

           if nomeCamada == 'Regiões Administrativas':
               print('camada consultada no banco: ', nomeCamada)
               regioes_administrativas = Regiaoadministrativa.objects.all()
               json_tb_regioes_administrativas = serialize("json", regioes_administrativas, fields=["id", "ra_cira", "ra_nome", "ra_codigo"])
               print(json_tb_regioes_administrativas)
               return HttpResponse(json_tb_regioes_administrativas, content_type="application/json")
           
           elif nomeCamada == 'Lotes':
               print('camada consultada no banco: ', nomeCamada)
               lote_existente = Loteexistente.objects.all()
               json_identify_lote = serialize("json", lote_existente, fields=["id", "ct_ciu", "lt_enderec", "lt_cep", "ac_area_ct", "ct_origem"])
               print(json_identify_lote)
               return HttpResponse(json_identify_lote, content_type="application/json")
           
           elif nomeCamada == 'Lago/Lagoas':
               print('camada consultada no banco: ', nomeCamada)
               lago_lagoas = Lagoslagoas.objects.all()
               json_identify_lago = serialize("json", lago_lagoas, fields=["id", "name", "fclass"])
               print(json_identify_lago)
               return HttpResponse(json_identify_lago, content_type="application/json")
           
           elif nomeCamada == 'Escolas':
               print('camada consultada no banco: ', nomeCamada)
               escolas = Escolaspublicas.objects.all()
               json_identify_escola = serialize("json", escolas, fields=["id", "cod_entidade", "nome_escola", "endereco", "cep", "telefone"])
               print(json_identify_escola)
               return HttpResponse(json_identify_escola, content_type="application/json")
           
           elif nomeCamada == 'Sistema Viário':
               print('camada consultada no banco: ', nomeCamada)
               vias = Sistemaviario.objects.all()
               json_identify_vias = serialize("json", vias, fields=["id", "fclass", "name", "oneway", "maxspeed", "layer", "bridge", "tunnel"])
               print(json_identify_vias)
               return HttpResponse(json_identify_vias, content_type="application/json")
           
           elif nomeCamada == 'Sistema Ferroviário':
               print('camada consultada no banco: ', nomeCamada)
               ferrovias = Sistemaferroviario.objects.all()
               json_identify_ferrovias = serialize("json", ferrovias, fields=["id", "fclass", "layer", "bridge", "tunnel"])
               print(json_identify_ferrovias)
               return HttpResponse(json_identify_ferrovias, content_type="application/json")
           
           elif nomeCamada == 'Hidrografia':
               print('camada consultada no banco: ', nomeCamada)
               hidrografia = Hidrografia.objects.all()
               json_identify_hidrografia = serialize("json", hidrografia, fields=["id", "fclass", "width", "name"])
               print(json_identify_hidrografia)
               return HttpResponse(json_identify_hidrografia, content_type="application/json")
           
           else:
               return JsonResponse({'error': 'Nome da camada não corresponde a nenhuma camada conhecida'})

       except json.JSONDecodeError:
           return JsonResponse({'error': 'Erro ao decodificar JSON'})
       except Exception as e:
           return JsonResponse({'error': str(e)})
   else:
       return JsonResponse({'error': 'Método não permitido'})

'''
def cadastra_solicitacao(request):
    #lat = request.GET.get('lat')
    #lng = request.GET.get('lng')
    #initial_data = {'lat': lat, 'lng': lng} if lat and lng else None
    #form = SolicitacaoPopulacaoForm(initial=initial_data)
    form = SolicitacaoPopulacaoForm()
    #tiposolicitacoes = TipoSolicitacao.objects.all()
    return render(request, 'cadastra_solicitacao.html', {'cadastra_solicitacao': form})
    #dentro das chaves {} tem um dicionário, onde o primeirto item é a chave e o segundo é o valor
    #a chave é usada para chamar o valor para ser mostrado em algum lugar.
'''
def cadastra_solicitacao(request):
    if request.method == 'POST':
        form = SolicitacaoPopulacaoForm(request.POST)
        print("Dados recebidos no POST:", request.POST)
        if form.is_valid():
            # Salvando os dados do formulário
            solicitacao = form.save(commit=False)
            
            # Obtendo as coordenadas do mapa
            latitude = request.POST.get('lat')
            longitude = request.POST.get('lng')

            if latitude and longitude: #os dados recebido por request são string, então precisam ser convertidos para float
                latitude = float(latitude)
                longitude = float(longitude)

                # Criar o ponto com o SRID WGS84
                ponto_clicado = Point(longitude, latitude, srid=4326)

                # Converter para o SRID do banco de dados (31983)
                ponto_clicado.transform(31983)
                print(ponto_clicado)

                # Atribuir o ponto transformado ao campo geom
                solicitacao.geom = ponto_clicado

                # Salvando no banco de dados
                solicitacao.save()

                # Mensagem de sucesso
                messages.success(request, 'Solicitação cadastrada com sucesso.')

                return redirect('url_webgis')  # Redirecionar para a página inicial após o cadastro
        else:
            print("Formulário inválido:", form.errors)
    else:
        form = SolicitacaoPopulacaoForm()
    
    return render(request, 'cadastra_solicitacao.html', {'cadastra_solicitacao': form})


'''
def abrir_tabela_atributos(request):
   if request.method == 'POST':
       print('entrou no if request.method')

       # Decodifique os dados JSON do corpo da solicitação
       data = json.loads(request.body) #este item foi a alteração que resolveu para a view receber os dados do front
       print(data)

       nomeCamada = data.get('nomeCamada')
       print(nomeCamada)

       if nomeCamada == 'Regiões Administrativas':
           print('camada consultada no banco: ', nomeCamada)
           # Realize a consulta espacial para encontrar a região administrativa que intersecta com o ponto clicado
           try:
                # Consulta todos os registros de Regiões Administrativas
                regioes_administrativas = Regiaoadministrativa.objects.all()

                # Serialize os registros para GeoJSON
                geojson_tb_regioes_administrativas = serialize("geojson", regioes_administrativas, geometry_field="geom", fields=["ra_cira", "ra_nome", "ra_codigo"])
                print(geojson_tb_regioes_administrativas)

                # Retorna os registros como JSON
                return HttpResponse(geojson_tb_regioes_administrativas, content_type="application/json")
           
           except Exception as e:
                return JsonResponse({'error': str(e)})
           
       elif nomeCamada == 'Lotes':
           print('camada consultada no banco: ', nomeCamada)
           # Realize a consulta para encontrar todos os registros da camada lotes
           try:
               #Loteexistente se refere a classe no arquivo models.py
               lote_existente = Loteexistente.objects.all()
               print('resultado consulta no banco: ', lote_existente)
               
               geojson_identify_lote = serialize("geojson", lote_existente, geometry_field="geom", fields=["ct_ciu", "lt_enderec", "lt_cep", "ac_area_ct", "ct_origem"])
               print(geojson_identify_lote)
               
               # Retorne um HttpResponse com o GeoJSON
               return HttpResponse(geojson_identify_lote, content_type="application/json")
           
           except Exception as e:
               return JsonResponse({'error': str(e)})
          
       elif nomeCamada == 'Lago/Lagoas':
           print('camada consultada no banco: ', nomeCamada)
           # Realize a consulta para retornar todos os registros da camada lago/lagoas
           try:
               #Loteexistente se refere a classe no arquivo models.py
               lago_lagoas = Lagoslagoas.objects.all()
               print('resultado consulta no banco: ', lago_lagoas)
               
               geojson_identify_lago = serialize("geojson", lago_lagoas, geometry_field="geom", fields=["name", "fclass"])
               print(geojson_identify_lago)
               
               return HttpResponse(geojson_identify_lago, content_type="application/json")
           
           except Exception as e:
               return JsonResponse({'error': str(e)})
        
       elif nomeCamada == 'Escolas':
           print('camada consultada no banco: ', nomeCamada)
           # Realize a consulta para retornar todos os registros da camada escolas
           try:
               #Loteexistente se refere a classe no arquivo models.py
               escolas = Escolaspublicas.objects.all()
               print('resultado consulta no banco: ',escolas)
               
               geojson_identify_escola = serialize("geojson", escolas, geometry_field="geom", fields=["cod_entidade", "nome_escola", "endereco", "cep", "telefone"])
               print(geojson_identify_escola)
               
               return HttpResponse(geojson_identify_escola, content_type="application/json")
           
           except Exception as e:
               return JsonResponse({'error': str(e)})
        
       elif nomeCamada == 'Sistema Viário':
           print('camada consultada no banco: ', nomeCamada)
           # Realize a consulta para retornar registros da camada sistema viário
           try:
               #Loteexistente se refere a classe no arquivo models.py
               vias = Sistemaviario.objects.all()
               print('resultado consulta no banco: ',vias)
               
               geojson_identify_vias = serialize("geojson", vias, geometry_field="geom", fields=["fclass", "name", "oneway", "maxspeed", "layer", "bridge", "tunnel"])
               print(geojson_identify_vias)
               
               return HttpResponse(geojson_identify_vias, content_type="application/json")
           
           except Exception as e:
               return JsonResponse({'error': str(e)})
           
       elif nomeCamada == 'Sistema Ferroviário':
           print('camada consultada no banco: ', nomeCamada)
           # Realize a consulta para retornar registros da camada sistema ferroviário
           try:
               #Loteexistente se refere a classe no arquivo models.py
               ferrovias = Sistemaferroviario.objects.all()
               print('resultado consulta no banco: ',ferrovias)
               
               geojson_identify_ferrovias = serialize("geojson", ferrovias, geometry_field="geom", fields=["fclass", "layer", "bridge", "tunnel"])
               print(geojson_identify_ferrovias)
               
               return HttpResponse(geojson_identify_ferrovias, content_type="application/json")
           
           except Exception as e:
               return JsonResponse({'error': str(e)})
        
       elif nomeCamada == 'Hidrografia':
           print('camada consultada no banco: ', nomeCamada)
           # Realize a consulta para retornar registros da camada hidrografia
           try:
               #Loteexistente se refere a classe no arquivo models.py
               hidrografia = Hidrografia.objects.all()
               print('resultado consulta no banco: ',hidrografia)
               
               geojson_identify_hidrografia = serialize("geojson", hidrografia, geometry_field="geom", fields=["fclass", "width", "name"])
               print(geojson_identify_hidrografia)
               
               return HttpResponse(geojson_identify_hidrografia, content_type="application/json")
           
           except Exception as e:
               return JsonResponse({'error': str(e)})
          
   else:
       return JsonResponse({'error': 'Método não permitido'})
'''