let listaNomeAmigos = [];
const regexSemEspeciais = /[^a-zA-Z0-9]/;

// Seleciona os botões e o campo de entrada
const inputAmigo = document.getElementById('amigo');
const btnAdicionar = document.querySelector('.button-add');
const btnSortear = document.querySelector('.button-draw');
const btnReiniciar = document.querySelector('.button-restart'); 



// Funções para manipular a interface
function adicionarAmigo() {
    const nome = inputAmigo.value.trim();

    // 1. Valida se o campo está vazio
    if (nome === "") {
        alert("Por favor, insira um nome válido!");
        return;
    }

    // 2. Valida se o nome já existe na lista
    if (listaNomeAmigos.includes(nome)) {
        alert("O nome " + nome + " já foi incluído.");
        limparCampo();
        return;
    }

    // 3. Valida se o nome contém caracteres especiais
    if (regexSemEspeciais.test(nome)) {
        alert("O nome contém caracteres especiais!");
        limparCampo();
        return;
    }

    // Se todas as validações passarem, adiciona o nome
    listaNomeAmigos.push(nome);
    mostrarAmigos();
    limparCampo();
}
  

function sortearAmigo() {
    if (listaNomeAmigos.length < 2) {
        alert("Insira no mínimo dois nomes!");
        return;
    }

    const listaEmbaralhada = [...listaNomeAmigos];
    embaralhar(listaEmbaralhada);
    
    // Desabilita os botões de adicionar e sortear, e mostra o de reiniciar
    if (btnAdicionar) btnAdicionar.disabled = true;
    if (btnSortear) btnSortear.style.display = 'none';
    if (btnReiniciar) btnReiniciar.style.display = 'block';

    // Limpa a lista de amigos para mostrar o resultado do sorteio
    document.getElementById("listaAmigos").innerHTML = "";

    // Lógica para garantir que ninguém tire a si mesmo
    for (let i = 0; i < listaNomeAmigos.length; i++) {
        const sorteado = listaEmbaralhada[i];
        const amigo = listaNomeAmigos[i];
        
        if (sorteado === amigo) {
            if (i === listaNomeAmigos.length - 1) {
                const temp = listaEmbaralhada[i];
                listaEmbaralhada[i] = listaEmbaralhada[0];
                listaEmbaralhada[0] = temp;
            } else {
                const temp = listaEmbaralhada[i];
                listaEmbaralhada[i] = listaEmbaralhada[i + 1];
                listaEmbaralhada[i + 1] = temp;
            }
        }
    }
    
    mostrarSorteio(listaEmbaralhada);
}


function mostrarAmigos() {
    const listaElemento = document.getElementById("listaAmigos");
    if (!listaElemento) return;

    listaElemento.innerHTML = "";
    listaNomeAmigos.forEach(nome => {
        const novoItem = document.createElement("li");
        novoItem.textContent = nome;
        listaElemento.appendChild(novoItem);
    });
}

function mostrarSorteio(listaEmbaralhada) {
    const resultadoElemento = document.getElementById("resultado");
    if (!resultadoElemento) return;

    resultadoElemento.innerHTML = "";
    
    for (let i = 0; i < listaNomeAmigos.length; i++) {
        const amigo = listaNomeAmigos[i];
        const sorteado = listaEmbaralhada[i];
        const novoItem = document.createElement("li");
        novoItem.textContent = `${amigo} -> ${sorteado}`;
        resultadoElemento.appendChild(novoItem);
    }
}

function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
}

function limparCampo() {
    inputAmigo.value = '';
}

function reiniciar() {
    listaNomeAmigos = [];
    
    // Limpa as listas exibidas
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    
    // Habilita o botão de adicionar e esconde o de reiniciar
    if (btnAdicionar) btnAdicionar.disabled = false;
    if (btnSortear) {
        btnSortear.style.display = 'block';
        btnSortear.disabled = true; // Desabilita até adicionar novos nomes
    }
    if (btnReiniciar) btnReiniciar.style.display = 'none';
    
    limparCampo();
}

