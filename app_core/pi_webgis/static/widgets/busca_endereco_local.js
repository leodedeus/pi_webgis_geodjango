// Variável para armazenar a referência do marcador de local atual
var marcadorEndereco;

// Função para fazer a busca de endereço e adicionar marcador no mapa
function buscarEndereco(endereco) {
    fetch('/busca_endereco/?address=' + encodeURIComponent(endereco))
        .then(response => response.json())
        .then(data => {
            if (data.latitude && data.longitude) {
                // Remove o marcador anterior, se existir
                if (marcadorEndereco) {
                    map.removeLayer(marcadorEndereco);
                }

                // Adiciona o novo marcador e popup
                adicionarMarcadorEndereco(data.latitude, data.longitude, data.endereco, data.tipoLocal);
            
                // Define o zoom do mapa para um nível específico
                map.setZoom(17);

                // Define o centro do mapa para as coordenadas do marcador
                map.setView([data.latitude, data.longitude]);

                // Atualiza a referência para o novo marcador
                //marcadorEndereco = marcadorEndereco;
            } else {
                console.error('Endereço não encontrado:', data.error);
            }
        })
        .catch(error => console.error('Erro:', error));
}

//função usada para criar o marcador de endereço
function adicionarMarcadorEndereco(latitude, longitude, endereco, tipoLocal) {
    var popupContent = '<b>Endereço:</b> ' + endereco + '<br>';
    if (tipoLocal) {
        popupContent += '<b>Tipo:</b> ' + tipoLocal + '<br>';
    }
    marcadorEndereco = L.marker([latitude, longitude]).addTo(map);
    //marcadorEndereco.bindPopup(popupContent).openPopup();
    marcadorEndereco.bindPopup(popupContent).on('popupclose', function() {
        // Remove o marcador quando o popup é fechado
        map.removeLayer(marcadorEndereco);
    }).openPopup();
}

// Adiciona um ouvinte de eventos para o formulário de busca de endereco
document.getElementById('buscaendereco-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var address = document.getElementById('address-input').value;
    buscarEndereco(address);
});
