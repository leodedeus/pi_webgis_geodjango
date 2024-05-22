//Cria o mapa leaflet
var map;
var coordinicio = [-15.761476545982422, -47.73670621074695];
var zoominicio = 10;
map = L.map('map').setView(coordinicio, zoominicio);

L.control.scale().addTo(map);

//Criando mapas base
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{});        
var baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {});
var googlesat = L.tileLayer ('https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',{});
var cartodb = L.tileLayer.wms('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',{}).addTo(map);
var topowms = L.tileLayer.wms('http://ows.mundialis.de/services/service?',{
    layers: 'TOPO-WMS'
});

//Criaçao das camadas do banco de dados
var lotes = L.tileLayer.wms('http://localhost:8080/geoserver/workspace_piwebgis_container/wms',{
            layers: 'workspace_piwebgis_container:feature_polygon_lote_existente',
            format: 'image/png',
            transparent: true,
            opacity: 0.7
        })//.addTo(map)

var escolas = L.tileLayer.wms('http://localhost:8080/geoserver/workspace_piwebgis_container/wms',{
            layers: 'workspace_piwebgis_container:feature_point_escola_publica',
            format: 'image/png',
            transparent: true,
            //opacity: 1.0
        });//.addTo(map)

var ras = L.tileLayer.wms('http://localhost:8080/geoserver/workspace_piwebgis_container/wms',{
            layers: 'workspace_piwebgis_container:feature_polygon_regioes_administrativas',
            format: 'image/png',
            transparent: true,
            //opacity: 1.0
        });//.addTo(map)

var rios = L.tileLayer.wms('http://localhost:8080/geoserver/workspace_piwebgis_container/wms',{
            layers: 'workspace_piwebgis_container:feature_line_hidrografia',
            format: 'image/png',
            transparent: true,
            //opacity: 1.0
        });//.addTo(map)

var vias = L.tileLayer.wms('http://localhost:8080/geoserver/workspace_piwebgis_container/wms',{
            layers: 'workspace_piwebgis_container:feature_line_sistema_viario',
            format: 'image/png',
            transparent: true,
            //opacity: 1.0
        });//.addTo(map)

var ferrovias = L.tileLayer.wms('http://localhost:8080/geoserver/workspace_piwebgis_container/wms',{
            layers: 'workspace_piwebgis_container:feature_line_sistema_ferroviario',
            format: 'image/png',
            transparent: true,
            //opacity: 1.0
        });//.addTo(map)

var lagos = L.tileLayer.wms('http://localhost:8080/geoserver/workspace_piwebgis_container/wms',{
            layers: 'workspace_piwebgis_container:feature_polygon_lagos_lagoas',
            format: 'image/png',
            transparent: true,
            //opacity: 1.0
        });//.addTo(map)

//Criação de variaveis para controlar a visualização das camadas
var basemaps = {
    'Mapa Básico': cartodb,
    'Mapa OpenStreetMap': streetmap,
    'Google Satélite': googlesat,
    'Elevação': topowms,
    'Relevo Sombreado': baserelief
};

var camadas = {
    'Escolas': escolas,
    'Lotes': lotes,
    'Regiões Administrativas': ras,
    'Sistema Viário':vias,
    'Sistema Ferroviário': ferrovias,
    'Hidrografia': rios,
    'Lago/Lagoas': lagos
    }

var controlLayers = L.control.layers(basemaps,camadas,{collapsed: false}).addTo(map);

// Função para ajustar a ordem das camadas quando uma sobreposição é adicionada
function ajustarOrdemCamadas() {
    // Verifique se a camada de escolas está ativada
    if (map.hasLayer(escolas)) {
        escolas.bringToFront();
    }
    // Verifique se a camada de lotes está ativada
    if (map.hasLayer(lotes)) {
        lotes.bringToFront();
        // Verifique se a camada de escolas está ativada
        if (map.hasLayer(escolas)) {
            escolas.bringToFront();
        }
    }
}

// Adicione um ouvinte de eventos para o evento overlayadd
map.on('overlayadd', ajustarOrdemCamadas);

//Adiciona um controlador leaflet para a ferramenta de medida
var measure = L.control.measure({}).addTo(map);
measure.remove()

// Imprime o objeto measure no console do navegador
console.log('Objeto measure:', measure);