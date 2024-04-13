document.addEventListener('DOMContentLoaded', function () {
    
    //Cria o mapa leaflet
    var map;
    var coordinicio = [-15.761476545982422, -47.73670621074695];
    var zoominicio = 10;
    map = L.map('map').setView(coordinicio, zoominicio);

    //Criando mapas base
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{}).addTo(map);        
    var baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {});
    var googlesat = L.tileLayer ('https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',{});
    var osm_nolabel = L.tileLayer.wms('http://ows.mundialis.de/services/service?',{
            layers: 'OSM-WMS-no-labels'
        });
    var topowms = L.tileLayer.wms('http://ows.mundialis.de/services/service?',{
        layers: 'TOPO-WMS'
    });
    
    // Variável para armazenar a referência do marcador de local atual
    var marcadorEndereco;

    // Função para fazer a busca de endereço e adicionar marcador no mapa
    function buscarEndereco(endereco) {
        fetch('/busca_endereco/?address=' + encodeURIComponent(endereco))
            .then(response => response.json())
            .then(data => {
                if (data.latitude && data.longitude) {
                    // Remove o marcador anterior, se existir
                    if (marcadorEndereco) {
                        map.removeLayer(marcadorEndereco);
                    }

                    // Adiciona o novo marcador e popup
                    adicionarMarcadorEndereco(data.latitude, data.longitude, data.endereco, data.tipoLocal);
                
                    // Define o zoom do mapa para um nível específico
                    map.setZoom(17);

                    // Define o centro do mapa para as coordenadas do marcador
                    map.setView([data.latitude, data.longitude]);

                    // Atualiza a referência para o novo marcador
                    marcadorEndereco = marcador;
                } else {
                    console.error('Endereço não encontrado:', data.error);
                }
            })
            .catch(error => console.error('Erro:', error));
    }

    //função usada para criar o marcador de endereço
    function adicionarMarcadorEndereco(latitude, longitude, endereco, tipoLocal) {
        var popupContent = '<b>Endereço:</b> ' + endereco + '<br>';
        if (tipoLocal) {
            popupContent += '<b>Tipo:</b> ' + tipoLocal + '<br>';
        }
        marcadorEndereco = L.marker([latitude, longitude]).addTo(map);
        //marcadorEndereco.bindPopup(popupContent).openPopup();
        marcadorEndereco.bindPopup(popupContent).on('popupclose', function() {
            // Remove o marcador quando o popup é fechado
            map.removeLayer(marcadorEndereco);
        }).openPopup();
    }

    // Função para criar camada de escolas a partir de GeoJSON
    function criarCamadaEscolasGeojson(url) {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                var camadasGeojson = L.geoJSON(data, {
                    pointToLayer: function (feature, latlng) {
                        return L.circleMarker(latlng);
                    },
                    onEachFeature: function (feature, layer) {
                        if (feature.properties && feature.properties.nome_escola) {
                            layer.bindPopup('<b>' + feature.properties.nome_escola + '</b><br>' + feature.properties.cod_entidade);
                        }
                    }
                });
                return camadasGeojson;
            })
            .catch(error => {
                console.error('Erro ao carregar os dados do GeoJSON:', error);
            });
    }

    // Função para criar camada de regiões administrativas a partir de GeoJSON
    function criarCamadaRasGeojson(url) {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                var camadasGeojson = L.geoJSON(data, {
                    onEachFeature: function (feature, layer) {
                        if (feature.properties && feature.properties.ra_nome) {
                            layer.bindPopup('<b>' + feature.properties.ra_nome + '</b><br>' + feature.properties.ra_cira);
                        }
                    }
                });
                return camadasGeojson;
            })
            .catch(error => {
                console.error('Erro ao carregar os dados do GeoJSON:', error);
            });
    }

    //Camadas wms geoserver

    var lotes = L.tileLayer.wms('http://localhost:8080/geoserver/workspace_piwebgis_container/wms',{
            layers: 'workspace_piwebgis_container:feature_polygon_lote_existente',
            format: 'image/png',
            transparent: true,
            opacity: 0.7
        })//.addTo(map)
    
    //Criação do controlador para visualização das camadas
    Promise.all([
        criarCamadaEscolasGeojson(escolasUrl),
        criarCamadaRasGeojson(rasUrl)
    ]).then(function(camadasGeojson) {
            var escolasLayer = camadasGeojson[0];
            var rasLayer = camadasGeojson[1];
                
            var basemaps = {
                'Mapa Básico': osm_nolabel,
                'Mapa OpenStreetMap': streetmap,
                'Google Satélite': googlesat,
                'Elevação': topowms,
                'Relevo Sombreado': baserelief
            };

            var camadas = {
                'Escolas públicas': escolasLayer,
                'Lotes existentes': lotes,
                'Regiões administrativas': rasLayer
            };

            L.control.layers(basemaps, camadas).addTo(map);
        });
    
    // Adiciona um ouvinte de eventos para o formulário de busca de endereco
    document.getElementById('buscaendereco-form').addEventListener('submit', function(event) {
        event.preventDefault();
        var address = document.getElementById('address-input').value;
        buscarEndereco(address);
    });
    
});