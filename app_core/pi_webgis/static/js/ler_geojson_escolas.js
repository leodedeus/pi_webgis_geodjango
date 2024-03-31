// Arquivo escolas_layer.js
/*
// Faça uma solicitação AJAX para obter o GeoJSON das escolas públicas
$.getJSON("{% url 'url_escolas' %}", function(data) {
    console.log(data)
    // Adicione o GeoJSON ao mapa Leaflet
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            // Crie um marcador para cada ponto
            return L.marker(latlng);
        },
        onEachFeature: function(feature, layer) {
            // Adicione informações adicionais para cada ponto, se necessário
            layer.bindPopup('<b>' + feature.properties.nome_escola + '</b><br>' + feature.properties.cod_entidade);
        }
    }).addTo(map);
});
*/
// Faça uma solicitação AJAX usando fetch para obter o GeoJSON das escolas públicas
/*
fetch(escolasUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar os dados do GeoJSON');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Adicione o GeoJSON ao mapa Leaflet
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        // Crie um marcador para cada ponto
        return L.marker(latlng);
      },
      onEachFeature: function(feature, layer) {
        // Adicione informações adicionais para cada ponto, se necessário
        layer.bindPopup('<b>' + feature.properties.nome_escola + '</b><br>' + feature.properties.cod_entidade);
      }
    }).addTo(map);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
*/

