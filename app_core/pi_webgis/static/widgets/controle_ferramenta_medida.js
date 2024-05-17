document.addEventListener('DOMContentLoaded', function () {
    const btnControlaMedida = document.getElementById('btnMedida');
    let medidaAtiva = false;

    btnControlaMedida.addEventListener('click', function () {
        if (medidaAtiva) {
            measure.remove();
            btnControlaMedida.classList.remove('ativo');
        } else {
            measure.addTo(map);
            btnControlaMedida.classList.add('ativo');
        }
        medidaAtiva = !medidaAtiva;
    });
});
