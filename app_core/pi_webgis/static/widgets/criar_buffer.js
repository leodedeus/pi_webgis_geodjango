//neste código é definido uma nova classe to tipo L.Control
//para ser a janela com as opções de criação do buffer

L.Control.BufferControl = L.Control.extend({
    onAdd: function(map) {
        var containerBuffer = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        
        containerBuffer.innerHTML = `
            <div id="buffer-controls">
                <label for="buffer-distance">Criação de Buffer</label>
                <input type="number" id="buffer-distance" value="100">
                <label for="buffer-unit">Unidade de medida:</label>
                <select id="buffer-unit">
                    <option value="meters">Metros</option>
                    <option value="kilometers">Quilômetros</option>
                </select>
                <button id="apply-buffer">Aplicar Buffer</button>
                <button id="clear-buffer">Limpar Buffer</button>
            </div>
        `;

        L.DomEvent.disableClickPropagation(containerBuffer);
        
        const applyBufferBtn = containerBuffer.querySelector('#apply-buffer');
        const clearBufferBtn = containerBuffer.querySelector('#clear-buffer');
        
        let bufferLayer = null;
        
        applyBufferBtn.addEventListener('click', function() {
            const distance = parseFloat(document.getElementById('buffer-distance').value);
            const unit = document.getElementById('buffer-unit').value;

            // Alterar o cursor para uma seta e manter o botão na cor de hover
            map.getContainer().style.cursor = 'crosshair';
            applyBufferBtn.classList.add('active');

            map.once('click', function(e) {
                const latlng = e.latlng;

                let distanceInMeters = distance;
                if (unit === 'kilometers') {
                    distanceInMeters = distance * 1000;
                }

                if (bufferLayer) {
                    map.removeLayer(bufferLayer);
                }
                bufferLayer = L.circle(latlng, {
                    radius: distanceInMeters,
                    color: 'blue',
                    fillColor: '#30f',
                    fillOpacity: 0.5
                }).addTo(map);

                // Reverter o cursor e o estilo do botão
                map.getContainer().style.cursor = '';
                applyBufferBtn.classList.remove('active');
            });
        });

        clearBufferBtn.addEventListener('click', function() {
            if (bufferLayer) {
                map.removeLayer(bufferLayer);
                bufferLayer = null;
            }
        });

        return containerBuffer;
    },

    onRemove: function(map) {
        // Remove quaisquer efeitos se necessário
    }
});

L.control.bufferControl = function(opts) {
    return new L.Control.BufferControl(opts);
}


