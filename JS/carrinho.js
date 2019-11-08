let carrinho = new Carrinho();
console.log("Abriu");

function attCarrinho() {
    carrinho.numProd = carrinho.produtos.length;
    if (carrinho === undefined || carrinho === null || carrinho.numProd === 0) {
        console.log("Carrinho vazio");
        return "Carrinho vazio";
    }

    carrinho.produtos.forEach(element => {
        carrinho.valorTotal += element.preco;
    });

    carrinho.numProd = carrinho.produtos.length;
};

function addCarrinho() {
    console.log("Entrou novo produto");
    let novoProduto = new Produto(null,null,null,null,null,null,null,null,null,null,null,null,null, null);
    novoProduto.nomeCompleto = document.getElementById("nome_produto_compra").innerHTML;
    novoProduto.preco = document.getElementById("preco_produto").innerHTML.replace("R$", "").replace(",", ".");
    novoProduto.preco = Number(novoProduto.preco);
    carrinho.produtos[carrinho.numProd] = novoProduto;
    attCarrinho();
}