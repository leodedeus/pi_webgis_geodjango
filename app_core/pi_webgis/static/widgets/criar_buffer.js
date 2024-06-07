document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente carregado e analisado'); // Adicione esta linha

    // Pega o modal
    const modal = document.getElementById("bufferModal");
    console.log('Modal:', modal); // Adicione esta linha

    // Pega o botão que abre o modal
    const btnBuffer = document.getElementById("btnBuffer");
    console.log('Botão Buffer:', btnBuffer); // Adicione esta linha

    // Pega o elemento <span> que fecha o modal
    const span = document.getElementsByClassName("close")[0];
    console.log('Elemento span para fechar:', span); // Adicione esta linha

    // Quando o usuário clicar no botão, abre o modal 
    btnBuffer.onclick = function() {
        console.log('Botão Buffer clicado'); // Adicione esta linha
        modal.style.display = "block";
    }

    // Quando o usuário clicar no <span> (x), fecha o modal
    span.onclick = function() {
        console.log('Span clicado para fechar o modal'); // Adicione esta linha
        modal.style.display = "none";
    }

    // Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
    window.onclick = function(event) {
        if (event.target == modal) {
            console.log('Clique fora do modal para fechar'); // Adicione esta linha
            modal.style.display = "none";
        }
    }

    // Adicionar lógica para os botões de aplicar e limpar buffer aqui
    document.getElementById('apply-buffer').addEventListener('click', () => {
        console.log('Aplicar Buffer clicado'); // Adicione esta linha
        // Lógica para aplicar buffer
    });

    document.getElementById('clear-buffer').addEventListener('click', () => {
        console.log('Limpar Buffer clicado'); // Adicione esta linha
        // Lógica para limpar buffer
    });
});


