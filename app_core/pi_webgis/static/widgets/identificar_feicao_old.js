// Obtenha o token CSRF do cookie
function getCSRFToken() {
    const cookieValue = document.cookie.match(/csrftoken=([^ ;]+)/);
    return cookieValue ? cookieValue[1] : null;
}

// Função para adicionar um popup à feição geométrica
function addPopupToFeature(feature) {
    var properties = feature.properties;
    var popupContent = "<b>Atributos:</b><br>";
    for (var key in properties) {
        popupContent += key + ": " + properties[key] + "<br>";
    }
    var layer = L.geoJSON(feature);
    layer.bindPopup(popupContent).on('popupclose', function() {
        map.removeLayer(layer);
    });
    layer.addTo(map).openPopup(); // Abre o popup imediatamente após adicionar o layer ao mapa
}

// Função para limpar as camadas adicionadas pelo usuário
function limparCamadas() {
    map.eachLayer(function (layer) {
        if (!layer._url) { // Remove apenas as camadas não relacionadas a um URL (ou seja, não é uma camada de azulejo)
            map.removeLayer(layer);
        }
    });
}

// Adicionar um ouvinte de eventos para o clique no mapa
map.on('click', function(e) {
    // Limpa as camadas existentes antes de adicionar uma nova
    limparCamadas();
    // Verificar se alguma camada está habilitada
    for (var layerName in camadas) {
        if (map.hasLayer(camadas[layerName])) {
            // Se uma camada estiver habilitada, recupere as coordenadas do clique e o nome da camada
            var coordenadas = e.latlng;
            var nomeCamada = layerName;

            // Faça algo com as coordenadas e o nome da camada
            console.log('Coordenadas do clique:', coordenadas);
            console.log('Camada habilitada:', nomeCamada);

            // Obter o token CSRF do cookie
            var csrfToken = getCSRFToken();
            console.log('Token CSRF:', csrfToken);

            // Enviar os dados para a view Django usando fetch
            console.log('Dados enviados na solicitação:', JSON.stringify({
                lat: coordenadas.lat,
                lng: coordenadas.lng,
                nome_camada: nomeCamada
            }));
            
            
            fetch('/identificar_feicao/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Inclua o token CSRF aqui
                },

                body: JSON.stringify({
                    lat: coordenadas.lat,
                    lng: coordenadas.lng,
                    nome_camada: nomeCamada
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na solicitação AJAX nivel 1');
                }
                return response.json();
            })
            .then(data => {
                console.log('Resposta do servidor:', data);
                console.log('Ainda não entrou no try');
            
                try {
                    console.log('Tentando criar a feição geométrica...');
            
                    // Verificar se data.features está definido e não é vazio
                    if (data.features && data.features.length > 0) {
                        var features = data.features;
            
                        console.log('GeoJSON:', features);
            
                        // Adicionar cada feição ao mapa como uma camada GeoJSON
                        features.forEach(feature => {
                            // Adicionar um popup à feição geométrica com os atributos
                            addPopupToFeature(feature);
                        });
                    } else {
                        throw new Error('GeoJSON retornado está vazio ou indefinido.');
                    }
                } catch (error) {
                    console.error('Erro ao criar a feição geométrica:', error);
                }
            })
            
            .catch(error => {
                console.error('Erro na solicitação AJAX nivel 2:', error);
            });

            // Se já encontrou uma camada habilitada, saia do loop
            break;
        }
    }
});