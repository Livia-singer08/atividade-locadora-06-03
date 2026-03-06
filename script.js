let filmes = JSON.parse(localStorage.getItem("filmes")) || [];
let editandoId = null;

document.addEventListener("DOMContentLoaded", () => {
    renderizarTabela();
    aplicarFiltro();
});

function abrirModal(){
    document.getElementById("modal").style.display = "block";
}

function fecharModal(){
    document.getElementById("modal").style.display = "none";
    limparCampos();
}

function salvarFilme() {

    const capa = document.getElementById("capa").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const ano = document.getElementById("ano").value.trim();
    const classificacao = document.getElementById("classificacao").value.trim();
    const produtora = document.getElementById("produtora").value.trim();

    if(!nome){
        alert("O nome do filme é obrigatório!");
        return;
    }

    if(editandoId){

        const filme = filmes.find(f => f.id === editandoId);

        filme.capa = capa;
        filme.nome = nome;
        filme.genero = genero;
        filme.ano = ano;
        filme.classificacao = classificacao;
        filme.produtora = produtora;

        editandoId = null;

    }else{

        const existe = filmes.find(f => f.nome === nome);

        if(existe){
            alert("Filme já cadastrado!");
            return;
        }

        const novoFilme = {
            id: Date.now(),
            capa,
            nome,
            genero,
            ano,
            classificacao,
            produtora
        };

        filmes.push(novoFilme);
    }

    atualizarLocalStorage();
    renderizarTabela();
    fecharModal();
}

function renderizarTabela(lista = filmes) {

    const tabela = document.getElementById("dados");
    tabela.innerHTML = "";

    lista.forEach(filme =>{

        tabela.innerHTML += `
        <tr>

            <td>
            <img src="${filme.capa}" width="70"
            onerror="this.src='https://via.placeholder.com/70x100'">
            </td>

            <td>${filme.nome}</td>
            <td>${filme.genero}</td>
            <td>${filme.ano}</td>
            <td>${filme.classificacao}</td>
            <td>${filme.produtora}</td>

            <td>
                <button onclick="editarFilme(${filme.id})">Editar</button>
                <button onclick="excluirFilme(${filme.id})">Excluir</button>
            </td>

        </tr>
        `;
    });
}

function excluirFilme(id){

    if(!confirm("Deseja realmente excluir o filme?")) return;

    filmes = filmes.filter(filme => filme.id !== id);

    atualizarLocalStorage();
    renderizarTabela();
}

function editarFilme(id){

    const filme = filmes.find(f => f.id === id);

    document.getElementById("capa").value = filme.capa;
    document.getElementById("nome").value = filme.nome;
    document.getElementById("genero").value = filme.genero;
    document.getElementById("ano").value = filme.ano;
    document.getElementById("classificacao").value = filme.classificacao;
    document.getElementById("produtora").value = filme.produtora;

    editandoId = id;

    abrirModal();
}

function aplicarFiltro(){

    const filtro = document.getElementById("filtroGenero");

    filtro.addEventListener("change", () => {

        const generoSelecionado = filtro.value;

        if(generoSelecionado === "todos"){
            renderizarTabela(filmes);
            return;
        }

        const filmesFiltrados = filmes.filter(filme =>
            filme.genero === generoSelecionado
        );

        renderizarTabela(filmesFiltrados);
    });
}

function atualizarLocalStorage(){
    localStorage.setItem("filmes", JSON.stringify(filmes));
}

function limparCampos(){

    document.getElementById("capa").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("classificacao").value = "";
    document.getElementById("produtora").value = "";
}