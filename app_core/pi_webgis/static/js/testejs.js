document.addEventListener('DOMContentLoaded', function () {
    // Cria o mapa Leaflet
    var map = L.map('map').setView([-15.8088136, -47.95301], 12);

    // Adiciona uma camada de base do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Define uma função para estilizar os pontos do GeoJSON
    function estiloPontos(feature) {
        return {
            radius: 6,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
    }

    // Lê o arquivo GeoJSON gerado pela sua view e o adiciona ao mapa
    fetch(escolasUrl)
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, estiloPontos);
                },
                onEachFeature: function (feature, layer) {
                    if (feature.properties && feature.properties.nome_escola) {
                        layer.bindPopup('<b>' + feature.properties.nome_escola + '</b><br>' + feature.properties.cod_entidade);
                    }
                }
            }).addTo(map);
        })
        .catch(error => {
            console.error('Erro ao carregar os dados do GeoJSON:', error);
        });
});
