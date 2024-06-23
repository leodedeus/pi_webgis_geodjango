/*
document.addEventListener('DOMContentLoaded', function() {
    var btnService = document.getElementById('btnService');
    var mapClickEnabled = false;

    btnService.addEventListener('click', function() {
        console.log("btnService foi clicado");
        window.alert("Clique no mapa para marcar o local da solicitação");
        mapClickEnabled = true;
    });

    map.on('click', function(e) {
        if (mapClickEnabled) {
            var latlng = e.latlng;
            L.marker(latlng).addTo(map)
                .bindPopup('Localização da solicitação')
                .openPopup();

            // Preencher os campos de latitude e longitude no formulário
            document.getElementById('lat').value = latlng.lat;
            document.getElementById('lng').value = latlng.lng;

            // Abrir o modal
            $('#solicitacaoModal').modal('show');

            // Desativar o clique no mapa para evitar múltiplas marcações
            mapClickEnabled = false;
        }
    });
});
*/
document.addEventListener('DOMContentLoaded', function() {
    var btnService = document.getElementById('btnService');
    var mapClickEnabled = false;
    var latlng = null;

    btnService.addEventListener('click', function() {
        console.log("btnService foi clicado");
        window.alert("Clique no mapa para marcar o local da solicitação");
        mapClickEnabled = true;
    });

    map.on('click', function(e) {
        if (mapClickEnabled) {
            latlng = e.latlng;  // Armazena a latitude e longitude clicadas
            L.marker(latlng).addTo(map);
            console.log("Coordenadas da solicitação:", latlng);

            // Carregar o formulário na modal
            fetch('/cadastra_solicitacao/')
                .then(response => {
                    console.log("Resposta do fetch do formulário:", response.status);
                    if (!response.ok) {
                        throw new Error('Erro na resposta do servidor');
                    }
                    return response.text();
                })
                .then(html => {
                    // Inserir o formulário na modal-body
                    console.log("Carregando o formulário na modal.");
                    $('#solicitacaoModal .modal-body').html(html);
                    // Mostrar a modal
                    $('#solicitacaoModal').modal('show');

                    // Atualizar os campos hidden com as coordenadas capturadas
                    console.log("Atualizando campos hidden com coordenadas:", latlng);
                    document.getElementById('lat').value = latlng.lat;
                    document.getElementById('lng').value = latlng.lng;

                    // Adicionar listener para o envio do formulário
                    var form = document.getElementById('solicitacaoForm');
                    form.addEventListener('submit', function(event) {
                        event.preventDefault();  // Prevenir envio padrão do formulário

                        console.log('Formulário submetido');

                        // Obter dados do formulário
                        var formData = new FormData(form);
                        formData.append('latitude', latlng.lat);   // Usando o valor atualizado do campo lat
                        formData.append('longitude', latlng.lng);  // Usando o valor atualizado do campo lng

                        console.log('Dados do formulário antes do envio:', Object.fromEntries(formData.entries()));

                        fetch('/cadastra_solicitacao/', {
                            method: 'POST',
                            body: formData,
                        })
                        .then(response => {
                            console.log('Resposta do envio do formulário:', response.status);
                            if (response.ok) {
                                console.log('Solicitação enviada com sucesso');
                                $('#solicitacaoModal').modal('hide');
                                alert('Solicitação cadastrada com sucesso.'); // Exibe alerta de sucesso
                                location.reload();  // Recarregar a página para atualizar o mapa
                            } else {
                                console.error('Erro ao enviar solicitação:', response.statusText);
                            }
                        })
                        .catch(error => {
                            console.error('Erro ao enviar solicitação:', error);
                        });
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar o formulário:', error);
                });

            // Desativar o clique no mapa para evitar múltiplas marcações
            mapClickEnabled = false;
        }
    });
});







