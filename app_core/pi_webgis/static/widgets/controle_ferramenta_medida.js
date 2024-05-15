document.addEventListener('DOMContentLoaded', function () {
    const map = window.map;
    const btnToggleMedida = document.getElementById('btnToggleMedida');
    let medidaHabilitada = false;
    let medidaControl = null;

    // Adicionar um ouvinte de eventos para habilitar/desabilitar a função de medida
    btnToggleMedida.addEventListener('click', function () {
        medidaHabilitada = !medidaHabilitada;
        btnToggleMedida.classList.toggle('ativo', medidaHabilitada);

        if (medidaHabilitada) {
            if (!medidaControl) {
                inicializarControleMedida();
            } else {
                // Se o controle já estiver presente, remova-o do mapa
                map.removeControl(medidaControl);
                medidaControl = null;
            }
        } else {
            if (medidaControl) {
                // Se o controle estiver presente, remova-o do mapa
                map.removeControl(medidaControl);
                medidaControl = null;
            }
        }
    });

    // Inicializar o controle de medida
    function inicializarControleMedida() {
        medidaControl = L.control.measure({
            position: 'bottomright',
            title: 'Ferramenta de Medida',
            collapsed: true,
            color: '#FF0080',
        }).addTo(map);
    }
});
