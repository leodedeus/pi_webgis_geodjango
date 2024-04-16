// Obtenha o token CSRF do cookie
function getCSRFToken() {
    const cookieValue = document.cookie.match(/csrftoken=([^ ;]+)/);
    return cookieValue ? cookieValue[1] : null;
}

// Adicionar um ouvinte de eventos para o clique no mapa
map.on('click', function(e) {
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
                // Lidar com a resposta do servidor conforme necessário
            })
            .catch(error => {
                console.error('Erro na solicitação AJAX nivel 2:', error);
            });

            // Se já encontrou uma camada habilitada, saia do loop
            break;
        }
    }
});

/*
// Função auxiliar para obter o valor de um cookie pelo nome
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Verificar se o cookie começa com o nome especificado
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                // Retornar o valor do cookie
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
*/
/*
// Função para enviar as coordenadas e o nome da camada para o servidor
function enviarCoordenadasENomeDaCamada(coordenadas, nomeCamada) {
    // Aqui você pode enviar as coordenadas e o nome da camada para o servidor
    // Usando AJAX, por exemplo, para processamento adicional ou identificação de feições
    $.ajax({
        url: '/identificar_camada/',
        type: 'POST',
        data: {
            'lat': coordenadas.lat,
            'lng': coordenadas.lng,
            'nome_camada': nomeCamada
        },
        success: function(response) {
            console.log('Resposta do servidor:', response);
            // Lidar com a resposta do servidor conforme necessário
        },
        error: function(error) {
            console.error('Erro na solicitação AJAX:', error);
        }
    });
}
*/