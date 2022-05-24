const form = document.querySelector('#infos-prod');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;

//salvar no localstorage
const atualizarLocalStorage = (produtos) =>{localStorage.setItem('produtos', JSON.stringify(produtos))}

//recupera os produtos
const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('produtos')|| '[]')

const salvarProduto = (e) =>{
    e.preventDefault()
    //pegar os dados do formulário
    const descricao = form.descricao.value;
    const detalhamento = form.detalhamento.value;

    if(idx == 'novo'){
        const produtos = recuperarLocalStorage();
        produtos.push({id:produtos.length + 1, descricao, detalhamento});
        atualizarLocalStorage(produtos);
        form.reset();
    }else{
        let produto = {id: idx, descricao, detalhamento}
        atualizaProduto(idx, produto);
        preencherTabela();
        form.reset();
        idx = 'novo';
    }

}

const preencherTabela = () =>{
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const produto of produtos){ 
        tabela.innerHTML += `
        
        <tr>
            <th scope="row">${produto.id}</th>
            <td>${produto.descricao}</td>
            <td>${produto.detalhamento}</td>
            <td> <button class="button-apagar" onclick="removerProduto(${produto.id})">Apagar</button>
            <button class="button-editar" onclick="atualizarProduto(${produto.id})">Editar</button> </td>
        </tr>
        `    
    }
}

const removerProduto = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id)
    if(indexProduto < 0) return;
    produtos.splice(indexProduto, 1);
    atualizarLocalStorage(produtos);
    preencherTabela()

}

const atualizarProduto = (id)=>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id);
    form.descricao.value = produtos[indexProduto].descricao;
    form.detalhamento.value = produtos[indexProduto].detalhamento;
    idx = id;

}

const atualizaProduto = (id, produto) => {
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id);
    produtos[indexProduto] = produto;
    atualizarLocalStorage(produtos);
}



form === null || form === void 0 ? void 0 : form.addEventListener('submit', salvarProduto)
document.addEventListener('DOMContentLoaded', preencherTabela);

function sair() {
    sessionStorage.removeItem("Logado");
    setTimeout(function(){
        window.location.href = "login.html";
    }, 600)
}