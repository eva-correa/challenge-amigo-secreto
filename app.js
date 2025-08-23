
let listaamigos=[];





// função que vai receber o nome dos amigos e armazenar em uma lista.
function adicionarAmigo(){
    let nome=  document.querySelector('input').value.trim();
    if ( nome == ""){ 
        alert("Por favor insira um nome válido!"); 
        return;
    } 
    if (listaamigos.includes (nome) == true){
         alert("O nome "+ nome +" já foi incluído.");     
    } else {
        listaamigos.push (nome);
        console.log (listaamigos);
    }
    mostrarAmigos();
    limparCampo();
    let botao = document.querySelector("button-container");
    botao.disabled = listaamigos.length < 2;
}

function sortearAmigo(){
    if (listaamigos.length < 2){
         alert("Insira no minimo dois nomes!");
         return;          
    }else {



    }

}

//função para mostrar os amigos inseridos no HTML.
function mostrarAmigos(){
    // Seleciona o elemento <ul> pelo ID
    const listaElemento = document.getElementById("listaAmigos");
    // Limpa a lista para não aparecer duplicado na página.
        listaElemento.innerHTML = "";
    // Percorre o array e adiciona cada item à lista
   listaamigos.forEach(itemTexto => {
        // 1. Cria um novo elemento de item de lista (<li>)
        const novoItem = document.createElement("li");
        // 2. Define o texto do item de lista
        novoItem.textContent = itemTexto;
        // 3. Adiciona o novo item à lista <ul>
        listaElemento.appendChild(novoItem);
     });
}


function limparCampo() {
    nome = document.querySelector('input');
    nome.value = '';
}

