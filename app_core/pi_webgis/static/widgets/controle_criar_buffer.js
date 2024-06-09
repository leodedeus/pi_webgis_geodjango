document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente carregado e analisado');

    // Pega o botão que abre o controle de buffer
    const btnBuffer = document.getElementById("btnBuffer");

    // Variável para armazenar a instância do controle
    let bufferControl;

    // Quando o usuário clicar no botão, abre o controle de buffer
    btnBuffer.onclick = function() {
        if (!bufferControl) {
            bufferControl = L.control.bufferControl({ position: 'topright' }).addTo(map);
            btnBuffer.classList.add('ativo'); // Adiciona a classe ativo
        } else {
            map.removeControl(bufferControl);
            bufferControl = null;
            btnBuffer.classList.remove('ativo'); // Remove a classe ativo
        }
    }
});
