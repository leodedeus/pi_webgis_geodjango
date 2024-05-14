/*
document.getElementById("btnMedida").addEventListener("click", function(event) {
    // Obter as dimensões da tela
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;

    // Definir as proporções em relação à largura e altura da tela
    var popupXPercentage = 0.5; // 50% da largura da tela
    var popupYPercentage = 0.5; // 50% da altura da tela

    // Calcular as coordenadas onde deseja abrir a janela popup
    var popupX = Math.round(screenWidth * popupXPercentage) + 492; // Subtrai metade da largura da janela
    var popupY = Math.round(screenHeight * popupYPercentage) - 318; // Subtrai metade da altura da janela

    // Abrir a janela popup nas coordenadas calculadas
    var popupWindowMedida = window.open("", "popupWindow", "left=" + popupX + ",top=" + popupY + ",width=400,height=200");

    // HTML para o conteúdo da janela popup
    var popupContentMedida = `
        <html>
        <head>
            <title>Ferramenta de Medida</title>
        </head>
        <body>
            <h3>Ferramenta de Medida</h3>
            <button id="btnCalcularArea">Calcular Área</button>
            <button id="btnMedirDistancia">Medir Distância</button>
        </body>
        </html>
    `;

    // Escrever o conteúdo na janela popup
    popupWindowMedida.document.write(popupContentMedida);
});
*/
document.getElementById("btnMedicao").addEventListener("click", function(event) {
    // Chame a função de medição fornecida pelo plugin Leaflet Measure
    L.control.measure({
        position: 'topright', // Posição da janela de medição
        collapsed: false, // Definir como false para manter a janela aberta por padrão
        color: '#FF0080', // Cor das linhas de medição
    }).addTo(map); // Adicionar à instância do mapa (substitua 'map' pelo seu próprio objeto de mapa)
});

/*
// Adicione um evento de clique ao botão "Medir Área" na janela de popup
document.getElementById("btnCalcularArea").addEventListener("click", function(event) {
    // Habilitar a ferramenta de desenho de polígono do Leaflet
    alert("Clique no mapa para gerar a área de medida")
    var drawControl = new L.Control.Draw({
        draw: {
            polygon: true,
            polyline: false,
            rectangle: false,
            circle: false,
            marker: false
        },
        edit: {
            featureGroup: drawnItems,
            remove: false
        }
    });
    map.addControl(drawControl);

    // Adicionar evento para capturar a conclusão do desenho do polígono
    map.on('draw:created', function(event) {
        var layer = event.layer;
        drawnItems.addLayer(layer);

        // Calcular a área do polígono
        var area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        var areaM2 = area.toFixed(2);
        var areaKm2 = (area / 1000000).toFixed(2);
        var areaHa = (area / 10000).toFixed(2);

        // Atualizar o conteúdo da janela de popup com os valores calculados
        var popupContent = `
            <html>
            <body>
                <h2>Área do Polígono</h2>
                <p>Área em metros quadrados: ${areaM2} m²</p>
                <p>Área em quilômetros quadrados: ${areaKm2} km²</p>
                <p>Área em hectares: ${areaHa} ha</p>
            </body>
            </html>
        `;
        layer.bindPopup(popupContent).openPopup();
    });
});
*/

