// busca_endereco.js

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var address = document.getElementById('address-input').value;
    fetch('/search_address/?address=' + encodeURIComponent(address))
        .then(response => response.json())
        .then(data => {
            if (data.latitude && data.longitude) {
                if (marker) {
                    map.removeLayer(marker);
                }
                var marker = L.marker([data.latitude, data.longitude]).addTo(map);
                marker.bindPopup(data.address).openPopup();
                map.setView([data.latitude, data.longitude], 13);
            } else {
                console.error('Erro:', data.error);
            }
        })
        .catch(error => console.error('Erro:', error));
});
