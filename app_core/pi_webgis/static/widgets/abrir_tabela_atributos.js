document.addEventListener('DOMContentLoaded', function () {
    const btnTabelaAtributos = document.getElementById('btnTableFeatures');
    let clickHabilitado = false;

    // Função para obter o token CSRF do servidor
    function fetchCSRFToken() {
        return fetch('/get_csrf_token/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter o token CSRF');
                }
                return response.json();
            })
            .then(data => {
                if (data.csrf_token) {
                    return data.csrf_token;
                } else {
                    throw new Error('Token CSRF não recebido do servidor');
                }
            })
            .catch(error => {
                console.error('Erro ao obter o token CSRF:', error);
            });
    }

    // Função para verificar as camadas ativadas
    function verificarCamadasAtivadas() {
        const camadasAtivadas = [];
        
        for (var layerName in camadas) {
            if (map.hasLayer(camadas[layerName])) {
                camadasAtivadas.push(layerName);
            }
        }
        if (camadasAtivadas.length === 0) {
            console.log('Nenhuma camada ativada.');
            window.alert("Habilite uma camada para ver a tabela de atributos");
            return false;
        }
        
        if (camadasAtivadas.length > 1) {
            console.log('Mais de uma camada ativada');
            window.alert("Habilite apenas uma camada para ver a tabela de atributos");
            return false;
        }

        if (camadasAtivadas.length === 1) {
            console.log('Camada ativada:', camadasAtivadas[0]);
            return camadasAtivadas[0];
        }
    }

    // Função para processar o clique no botão
    function processButtonClick() {
        console.log('Entrou na função processButtonClick');
        const nome_camada = verificarCamadasAtivadas();
        console.log('Nome da camada dentro da função click do botão:', nome_camada);
        if (!nome_camada) {
            return;
        }

        fetchCSRFToken().then(csrfToken => {
            fetch('/abrir_tabela_atributos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ nomeCamada: nome_camada })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na solicitação AJAX');
                }
                return response.json();
            })
            .then(data => {
                console.log('Resposta do servidor:', data);

                if (data.error) {
                    alert(data.error);
                    return;
                }

                exibirTabelaAtributos(data);
            })
            .catch(error => {
                console.error('Erro na solicitação AJAX:', error);
            });
        });
    }

    // Função para exibir os dados da tabela de atributos em uma tabela HTML
    function exibirTabelaAtributos(data) {
        const container = document.getElementById('tabelaAtributosContainer');
        
        container.innerHTML = '';

        const table = document.createElement('table');
        table.className = 'table table-striped';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const fields = Object.keys(data[0].fields);
        fields.unshift('id'); // Adiciona o campo 'id' no início

        fields.forEach(field => {
            const th = document.createElement('th');
            th.textContent = field;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        data.forEach(item => {
            const row = document.createElement('tr');
            
            fields.forEach(field => {
                const td = document.createElement('td');
                if (field === 'id') {
                    td.textContent = item.pk; // Adiciona o valor do campo 'id'
                } else {
                    td.textContent = item.fields[field];
                }
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        container.appendChild(table);

        var tabelaAtributosModal = new bootstrap.Modal(document.getElementById('tabelaAtributosModal'));
        tabelaAtributosModal.show();
    }
    
    btnTabelaAtributos.addEventListener('click', function () {
        console.log('Botão btnTableFeatures ativado')
        clickHabilitado = !clickHabilitado;
        btnTabelaAtributos.classList.toggle('ativo', clickHabilitado);

        if (clickHabilitado) {
            console.log('Chamando função processButtonClick')
            processButtonClick();
        }
    });
});


