// Cria uma div para mostrar as coordenadas do mapa
var coordDIV = document.createElement('div');
coordDIV.id = 'mapCoordDIV'; // Define o ID da div como 'mapCoordDIV'
coordDIV.style.position = 'absolute'; // Define a posição da div como absoluta
coordDIV.style.bottom = '0'; // Define a distância entre o fundo da div e o fundo do contêiner pai como 0
coordDIV.style.left = '0'; // Define a distância entre a borda esquerda da div e a borda esquerda do contêiner pai como 0
coordDIV.style.zIndex = '900'; // Define a ordem de empilhamento da div como 900 (para garantir que ela esteja acima de outros elementos)
coordDIV.style.color = '#404040'; // Define a cor do texto dentro da div como cinza escuro
coordDIV.style.fontFamily = 'Arial'; // Define a família da fonte como Arial
coordDIV.style.fontSize = '9pt'; // Define o tamanho da fonte como 9 pontos
coordDIV.style.backgroundColor = '#fff'; // Define a cor de fundo da div como branco
coordDIV.style.border = '2px solid #777777'; // Adiciona uma borda de 2px sólida cinza para a div
coordDIV.style.paddingTop = '1px'; // Adiciona 1px de espaçamento acima do conteúdo da div
coordDIV.style.paddingBottom = '1px'; // Adiciona 1px de espaçamento abaixo do conteúdo da div
coordDIV.style.paddingLeft = '10px'; // Adiciona 10px de espaçamento à esquerda do conteúdo da div
coordDIV.style.paddingRight = '10px'; // Adiciona 10px de espaçamento à direita do conteúdo da div

document.getElementById('map').appendChild(coordDIV); // Adiciona a div ao elemento com o ID 'map'

// Cria um evento para capturar as coordenadas enquanto o mouse se move pelo mapa
map.on('mousemove', function(e){
    var lat = e.latlng.lat.toFixed(4); // Obtém a latitude do evento do mouse e arredonda para 4 casas decimais
    var long = e.latlng.lng.toFixed(4); // Obtém a longitude do evento do mouse e arredonda para 4 casas decimais
    // Define o conteúdo da div com as coordenadas LatLong atualizadas
    document.getElementById('mapCoordDIV').innerHTML = 'Coordenadas: <br> WGS84 - Lat: ' + lat + ' , Long: ' + long;
});

// Ajusta a posição da div de coordenadas
coordDIV.style.bottom = '2px'; // Define a distância entre o fundo da div e o fundo do contêiner pai como 2px
coordDIV.style.left = '120px'; // Define a distância entre a borda esquerda da div e a borda esquerda do contêiner pai como 120px

//-------------------------------------------------------------------------------------------------------------------------------------
// Criação do indicador de Norte

// Cria uma imagem
var imgNorte = document.createElement('img');
imgNorte.style.width = '50px';
imgNorte.style.height = '50px';

//criar uma nova div para colocar a indicação de norte
var indNorte = document.createElement('div')

// Definir estilos para a div de indicação de norte
indNorte.style.position = 'absolute'; // Define a posição da div como absoluta
indNorte.style.bottom = '150px'; // Define a distância entre o topo da div e o topo do contêiner pai como 10px
indNorte.style.left = '5px';
indNorte.style.zIndex = '1000';
indNorte.style.backgroundColor = '#fff';
indNorte.style.border = '2px solid #777777'; // Define a distância entre a borda esquerda da div e a borda esquerda do contêiner pai como 10px

// Define o caminho da imagem
imgNorte.src = '/static/assets/icones/norte.png';

// Adiciona a imagem dentro da div
indNorte.appendChild(imgNorte);

// Adiciona a div ao corpo do documento (ou a outro elemento desejado)
document.getElementById('map').parentNode.appendChild(indNorte);
