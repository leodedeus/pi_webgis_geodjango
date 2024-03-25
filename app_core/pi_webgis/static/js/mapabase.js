var map;

//Cria o mapa leaflet
var coordinicio = [-15.8088136,-47.95301];
var zoominicio = 12;
map = L.map('map').setView(coordinicio, zoominicio);

//Criando mapas base
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{}).addTo(map);        
var baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {});
var googlesat = L.tileLayer ('https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',{});

//Criaçao das camadas do banco de dados
var lotes = L.tileLayer.wms('http://192.168.0.48:8080/geoserver/pi_webgis/wms',{
            layers: 'pi_webgis:feature_polygon_lote_existente',
            format: 'image/png',
            transparent: true,
            //opacity: 0.7
        });//.addTo(map)

var escolas = L.tileLayer.wms('http://192.168.0.48:8080/geoserver/pi_webgis/wms',{
            layers: 'pi_webgis:feature_point_escola_publica',
            format: 'image/png',
            transparent: true,
            //opacity: 1.0
        });//.addTo(map)

var ras = L.tileLayer.wms('http://192.168.0.48:8080/geoserver/pi_webgis/wms',{
            layers: 'pi_webgis:feature_polygon_regioes_administrativas',
            format: 'image/png',
            transparent: true,
            //opacity: 1.0
        });//.addTo(map)

//Criação de variaveis para controlar a visualização das camadas
var basemaps = {
    'Base': streetmap,
    'Satélite': googlesat,
    'Topográfico': baserelief
    }

var camadas = {
    'Escolas': escolas,
    'Lotes': lotes,
    'Regiões Administrativas': ras
    }

L.control.layers(basemaps,camadas).addTo(map);