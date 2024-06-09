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
        // Implemente aqui a lógica para verificar as camadas ativadas
        const camadasAtivadas = []; // Suponha que você tenha uma lista de camadas ativadas
        
        // Verificar todas as camadas e capturar informações das camadas ativadas
        for (var layerName in camadas) {
            if (map.hasLayer(camadas[layerName])) {
                // Adicionar o nome da camada ativada ao array
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
            var nome_camada = camadasAtivadas[0]

            // Enviar os dados para a view Django usando fetch
            console.log('Dados enviados na solicitação:', JSON.stringify({
            nomeCamada: nome_camada
            }));

            return nome_camada;

        }
    }

    // Função para processar o clique no botão
    function processButtonClick() { 
        console.log('Entrou na função processButtonClick');  // Log adicional
        const nome_camada = verificarCamadasAtivadas();
        console.log('Nome da camada dentro da função click do botao:', nome_camada);  // Log adicional
        if (!nome_camada) { // verifica se o nome da camada não é falso, se for falso a execução é interrompida
            return;
        }
        
        // Enviar os dados para a view Django usando fetch
        fetchCSRFToken().then(csrfToken => {
            // Enviar os dados para a view Django usando fetch
            fetch('/abrir_tabela_atributos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({
                    nomeCamada: nome_camada
                })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na solicitação AJAX');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Resposta do servidor:', data);

                    // Verifique se há um erro retornado pelo servidor
                    if (data.error) {
                        // Se houver um erro, exiba-o para o usuário
                        alert(data.error); // Você pode usar uma caixa de diálogo ou um elemento na interface para exibir a mensagem de erro
                        return; // Pare a execução da função aqui para evitar erros adicionais
                    }

                    // Se não houver erro, exibir os dados da tabela de atributos
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
        
        // Limpar o conteúdo anterior
        container.innerHTML = '';
    
        // Criar a tabela
        const table = document.createElement('table');
        table.className = 'table table-striped'; // Adiciona classes Bootstrap para estilização (se desejado)
    
        // Criar o cabeçalho da tabela
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // Assumindo que a estrutura do data é uma lista de objetos
        const firstItem = data[0];
        const fields = Object.keys(firstItem.fields);
        fields.push('geometry'); // Adiciona a geometria como campo, se necessário
    
        fields.forEach(field => {
            const th = document.createElement('th');
            th.textContent = field;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        // Criar o corpo da tabela
        const tbody = document.createElement('tbody');
    
        data.forEach(item => {
            const row = document.createElement('tr');
            
            fields.forEach(field => {
                const td = document.createElement('td');
                if (field === 'geometry') {
                    td.textContent = JSON.stringify(item[field]);
                } else {
                    td.textContent = item.fields[field];
                }
                row.appendChild(td);
            });
    
            tbody.appendChild(row);
        });
    
        table.appendChild(tbody);
        container.appendChild(table);

        // Exibir o modal
        var tabelaAtributosModal = new bootstrap.Modal(document.getElementById('tabelaAtributosModal'));
        tabelaAtributosModal.show();
    }
    
    // Adicionar um ouvinte de eventos para o clique no botão
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

