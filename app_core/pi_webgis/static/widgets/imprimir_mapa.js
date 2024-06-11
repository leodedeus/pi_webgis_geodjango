document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente carregado e analisado');

    const btnImpressao = document.getElementById("btnImpressao");
    btnImpressao.onclick = function() {
        // Oculta os elementos que não deseja imprimir
        const elementosNaoImprimir = document.querySelectorAll('header, #buttonContainer-mapa, .modal, .rodape_mapa');
        elementosNaoImprimir.forEach(elemento => {
            elemento.style.display = 'none';
        });

        // Imprime a página
        window.print();

        // Restaura a exibição dos elementos após a impressão
        elementosNaoImprimir.forEach(elemento => {
            elemento.style.display = '';
        });
    }
});
