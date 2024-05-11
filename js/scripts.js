// Função para carregar dados da query SQL
function fetchData(arq) {
    fetch(arq)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação HTTP: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Chama a função para criar a tabela com os dados retornados do PHP
            window.parametros = [];
            for (const key in data[0]) parametros.push(key);
            window.tabela = data;
            criarCampoSelect(parametros);
            criaCampoDimensao(tabela,2);
            buildTable(tabela,parametros,null);
            tabelaBD(tabela);            
        })
        .catch(error => {
            console.error('Erro durante a solicitação fetch:', error);
        });
}

// Função para criar a tabela HTML
function tabelaBD(data) {
    const tableContainer = document.getElementById('tablebd-container');
    const table = document.createElement('table');

    // Cria o cabeçalho da tabela
    const headerRow = table.insertRow(0);
    for (const key in data[0]) {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
    }

    // Preenche os dados na tabela
    for (const item of data) {
        const row = table.insertRow();
        for (const key in item) {
            const cell = row.insertCell();
            if(item[key] == null) cell.textContent = 'NULL';
            else cell.textContent = item[key];
        }
    }

    // Adiciona a tabela ao contêiner
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

// Função para criar a tabela HTML
function buildTable(dados,atributos,aux) {
    const tableContainer = document.getElementById('table-container');
    const table = document.createElement('table');

    const linha = [];
    const coluna = [];

    // Cria a primeira linha da tabela
    const headerRow = table.insertRow(0);
    const headerCell = document.createElement('th');
    headerCell.textContent = '';
    headerRow.appendChild(headerCell);
    for (const key of dados){
        if(!(coluna.includes(key[atributos[1]])) && key[atributos[1]] != null && key[atributos[2]] == aux){
            const headerCell = document.createElement('th');
            headerCell.textContent = key[atributos[1]];
            headerRow.appendChild(headerCell);
            coluna.push(key[atributos[1]]);
        }
    }
    const headerCell2 = document.createElement('th');
    headerCell2.textContent = 'TOTAL';
    headerRow.appendChild(headerCell2);
    coluna.push('TOTAL');

    // Cria a primeira coluna
    const row = [];
    let celula = [];
    for (const key of dados) {
        if(!(linha.includes(key[atributos[0]])) && key[atributos[0]] != null && key[atributos[2]] == aux){
            row[row.length] = table.insertRow();
            const cell = row[row.length-1].insertCell();
            cell.style.backgroundColor = '#263D63';
            cell.style.fontWeight = 'bold';
            cell.style.color = '#ffffff';
            cell.style.width = '30%';
            cell.textContent = key[atributos[0]];
            linha.push(key[atributos[0]]);
            
            for (const i in coluna) {
                celula[celula.length] = row[row.length-1].insertCell();
                celula[celula.length-1].textContent = '-';
            }
        }
    }
    row[row.length] = table.insertRow();
    const cell = row[row.length-1].insertCell();
    cell.style.backgroundColor = '#263D63';
    cell.style.fontWeight = 'bold';
    cell.style.color = '#ffffff';
    cell.style.width = '30%';
    cell.textContent = 'TOTAL';
    for (const i in coluna) {
        celula[celula.length] = row[row.length-1].insertCell();
        celula[celula.length-1].textContent = '-';
    }
    
    // Preenche a tabela
    for (const key of dados){
        const indexA = linha.indexOf(key[atributos[0]]);
        const indexB = coluna.indexOf(key[atributos[1]]);
        if(indexA != -1 && indexB != -1 && key[atributos[2]] == aux){
            celula[(indexA*coluna.length)+indexB].textContent = key[atributos[3]];
        }
        else if (indexA == -1 && indexB != -1 && key[atributos[2]] == aux){
            celula[((linha.length)*coluna.length)+indexB].textContent = key[atributos[3]];
        }
        else if (indexA != -1 && indexB == -1 && key[atributos[2]] == aux){
            celula[(indexA*coluna.length)+coluna.length-1].textContent = key[atributos[3]];
        }
        else if (indexA == -1 && indexB == -1 && key[atributos[2]] == aux){
            celula[((linha.length)*coluna.length)+coluna.length-1].textContent = key[atributos[3]];
        }
    }

    // Adiciona a tabela ao contêiner
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

// Função para criar e adicionar o campo select ao container
function criarCampoSelect(languagesList) {
    const languagesSelectx = document.getElementById("x");
    const languagesSelectz = document.getElementById("z");
    const languagesSelecty = document.getElementById("y");
  
    for (var language = 0; language < languagesList.length-1; language++){
        option = new Option(languagesList[language], language);
        languagesSelecty.options[language] = option;
    }
    for (var language = 0; language < languagesList.length-1; language++){
        option = new Option(languagesList[language], language);
        languagesSelectx.options[language] = option;
    }
    for (var language = 0; language < languagesList.length-1; language++){
        option = new Option(languagesList[language], language);
        languagesSelectz.options[language] = option;
    }
    languagesSelectx.value = 1;
    languagesSelecty.value = 0;
    languagesSelectz.value = 2;
}

function criaCampoDimensao(dados,atributo){
    const languagesSelecta = document.getElementById("a");
    const languageH = document.getElementById("texto");
    var coluna = [];
    var language = 0;

    // Removendo todas as opções
    while (languagesSelecta.firstChild) {
        languagesSelecta.removeChild(languagesSelecta.firstChild);
    }

    for (const key of dados){
        if(!(coluna.includes(key[parametros[atributo]])) && key[parametros[atributo]] != null){
            coluna.push(key[parametros[atributo]]);
            option = new Option(key[parametros[atributo]], key[parametros[atributo]]);
            languagesSelecta.options[language] = option;
            language++;
        }
    }
    option = new Option("TOTAL", "TOTAL");
    languagesSelecta.options[language] = option;
    languagesSelecta.value = "TOTAL";

    languageH.textContent = parametros[atributo];
}

function alterarTabela(){
    var field_x = document.getElementById("x");
    var field_y = document.getElementById("y");
    var field_z = document.getElementById("z"); 
    criaCampoDimensao(tabela, field_z.value);
    buildTable(tabela, [parametros[field_y.value]].concat([parametros[field_x.value]].concat([parametros[field_z.value]].concat(parametros[3]))), null);
}

//main

var registro = localStorage.getItem("storage");
var parse = JSON.parse(registro);
var obj = JSON.parse(parse);

fetchData('js/fetchdata.php?txtnome=' + obj.name);

var field_a = document.getElementById("a"); 
var field_x = document.getElementById("x");
var field_y = document.getElementById("y");
var field_z = document.getElementById("z"); 

field_a.addEventListener("change",function(){
    if(field_x.value == 0 && field_y.value == 1 && field_z.value == 2){
        if (field_a.value == "TOTAL") buildTable(tabela, [parametros[1]].concat([parametros[0]].concat([parametros[2]].concat(parametros[3]))), null);
        else buildTable(tabela, [parametros[1]].concat([parametros[0]].concat([parametros[2]].concat(parametros[3]))), field_a.value);
    }
    else if(field_x.value == 0 && field_y.value == 2 && field_z.value == 1){
        if (field_a.value == "TOTAL") buildTable(tabela, [parametros[2]].concat([parametros[0]].concat([parametros[1]].concat(parametros[3]))), null);
        else buildTable(tabela, [parametros[2]].concat([parametros[0]].concat([parametros[1]].concat(parametros[3]))), field_a.value);
    }
    else if(field_x.value == 1 && field_y.value == 0 && field_z.value == 2){
        if (field_a.value == "TOTAL") buildTable(tabela, [parametros[0]].concat([parametros[1]].concat([parametros[2]].concat(parametros[3]))), null);
        else buildTable(tabela, [parametros[0]].concat([parametros[1]].concat([parametros[2]].concat(parametros[3]))), field_a.value);
    }  
    else if(field_x.value == 1 && field_y.value == 2 && field_z.value == 0){
        if (field_a.value == "TOTAL") buildTable(tabela, [parametros[2]].concat([parametros[1]].concat([parametros[0]].concat(parametros[3]))), null);
        else buildTable(tabela, [parametros[2]].concat([parametros[1]].concat([parametros[0]].concat(parametros[3]))), field_a.value);
    } 
    else if(field_x.value == 2 && field_y.value == 0 && field_z.value == 1){
        if (field_a.value == "TOTAL") buildTable(tabela, [parametros[0]].concat([parametros[2]].concat([parametros[1]].concat(parametros[3]))), null);
        else buildTable(tabela, [parametros[0]].concat([parametros[2]].concat([parametros[1]].concat(parametros[3]))), field_a.value);
    }  
    else if(field_x.value == 2 && field_y.value == 1 && field_z.value == 0){
        if (field_a.value == "TOTAL") buildTable(tabela, [parametros[1]].concat([parametros[2]].concat([parametros[0]].concat(parametros[3]))), null);
        buildTable(tabela, [parametros[1]].concat([parametros[2]].concat([parametros[0]].concat(parametros[3]))), field_a.value);
    }   
});