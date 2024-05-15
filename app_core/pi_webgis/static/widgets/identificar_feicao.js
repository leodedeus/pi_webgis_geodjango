document.addEventListener('DOMContentLoaded', function () {
    const map = window.map;
    const btnIdentificarFeicao = document.getElementById('btnIdentify');
    let clickHabilitado = false;

    // Função para obter o token CSRF do servidor
    function fetchCSRFToken() {
        return fetch('/get_csrf_token/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter o token CSRF');
                }
                return response.json();
            })
            .then(data => {
                if (data.csrf_token) {
                    return data.csrf_token;
                } else {
                    throw new Error('Token CSRF não recebido do servidor');
                }
            })
            .catch(error => {
                console.error('Erro ao obter o token CSRF:', error);
            });
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
    
    // Função para processar o clique no mapa
    function processMapClick(e) {
        // Limpar as camadas existentes antes de adicionar uma nova
        limparCamadas();
    
        // Array para armazenar as informações das camadas ativadas
        var camadasAtivadas = [];
    
        // Verificar todas as camadas e capturar informações das camadas ativadas
        for (var layerName in camadas) {
            if (map.hasLayer(camadas[layerName])) {
                // Recuperar as coordenadas do clique e o nome da camada
                var coordenadas = e.latlng;
                // Adicionar o nome da camada ativada ao array
                camadasAtivadas.push(layerName);
            }
        }
    
        console.log('Coordenadas do clique:', coordenadas);
        console.log('Camada habilitada:', camadasAtivadas);
    
        // Se não houver camadas ativadas, saia da função
        if (camadasAtivadas.length === 0) {
            console.log('Nenhuma camada ativada.');
            window.alert("Habilite uma camada para ver informações da feição");
            return;
        }
    
        if (camadasAtivadas.length > 1) {
            console.log('Mais de uma camada ativada');
            window.alert("Habilite apenas uma camada para visualizar as informações");
            return;
        }
    
        if (camadasAtivadas.length === 1) {
            console.log('Apenas uma camada ativada');
            var nome_camada = camadasAtivadas[0]
            console.log('Camada ativada: ' + nome_camada)
    
    
            // Enviar os dados para a view Django usando fetch
            console.log('Dados enviados na solicitação:', JSON.stringify({
            lat: coordenadas.lat,
            lng: coordenadas.lng,
            nomeCamada: nome_camada
        }));
    
            // Enviar os dados para a view Django usando fetch
            fetchCSRFToken().then(csrfToken => {
                // Enviar os dados para a view Django usando fetch
                fetch('/identificar_feicao/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    body: JSON.stringify({
                        lat: coordenadas.lat,
                        lng: coordenadas.lng,
                        nomeCamada: nome_camada
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

                    // Verifique se há um erro retornado pelo servidor
                if (data.error) {
                    // Se houver um erro, exiba-o para o usuário
                    alert(data.error); // Você pode usar uma caixa de diálogo ou um elemento na interface para exibir a mensagem de erro
                    return; // Pare a execução da função aqui para evitar erros adicionais
                }
    
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
            });
        }
    }
    
    // Adicionar um ouvinte de eventos para o clique no mapa
    //map.on('click', processMapClick);

    btnIdentificarFeicao.addEventListener('click', function () {
        clickHabilitado = !clickHabilitado;
        btnIdentificarFeicao.classList.toggle('ativo', clickHabilitado);

        if (clickHabilitado) {
            map.on('click', processMapClick);
        } else {
            map.off('click', processMapClick);
        }
    });
});
