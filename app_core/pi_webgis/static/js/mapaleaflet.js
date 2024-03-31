document.addEventListener('DOMContentLoaded', function () {
    
    //Cria o mapa leaflet
    var map;
    var coordinicio = [-15.761476545982422, -47.73670621074695];
    var zoominicio = 10;
    map = L.map('map').setView(coordinicio, zoominicio);

    //Criando mapas base
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{});        
    var baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {});
    var googlesat = L.tileLayer ('https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',{});
    var osm_nolabel = L.tileLayer.wms('http://ows.mundialis.de/services/service?',{
            layers: 'OSM-WMS-no-labels'
        }).addTo(map);
    var topowms = L.tileLayer.wms('http://ows.mundialis.de/services/service?',{
        layers: 'TOPO-WMS'
    });
        
    // Lê o arquivo GeoJSON gerado pela sua view e o adiciona ao mapa
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
                'Mapa basico': osm_nolabel,
                'Mapa OpenStreetMap': streetmap,
                'Google Satélite': googlesat,
                'Elevação': topowms,
                'Topográfico': baserelief
            };

            var camadas = {
                'Escolas públicas': escolasLayer,
                'Lotes existentes': lotes,
                'Regiões administrativas': rasLayer
            };

            L.control.layers(basemaps, camadas).addTo(map);
        });
});