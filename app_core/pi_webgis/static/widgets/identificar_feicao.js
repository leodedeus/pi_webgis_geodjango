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

            // Você pode chamar uma função para lidar com essas informações
            // lidarComCliqueNoMapa(coordenadas, nomeCamada);
            
            // Como exemplo, vamos enviar as coordenadas e o nome da camada para uma função
            //enviarCoordenadasENomeDaCamada(coordenadas, nomeCamada);

            // Se já encontrou uma camada habilitada, saia do loop
            break;
        }
    }
});
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