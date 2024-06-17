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
