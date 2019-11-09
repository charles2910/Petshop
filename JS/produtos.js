class Lista{
    constructor(nome,tipo,banner,itens,qtdTotalPaginas,filtroMarca,filtroPreco,filtroTipo,marcas,pag){
    this.qtdTotalPaginas = qtdTotalPaginas;
    this.tipo = tipo;
    this.nome = nome;
    this.banner = banner;
    this.itens = itens;
    this.bannerPos = 0;
    this.filtroMarca = filtroMarca;
    this.filtroPreco = filtroPreco;
    this.filtroTipo = filtroTipo;
    this.marcas = marcas;
    this.pag = pag;
    }
}

let lista = new Lista();

function carregarLista(nome,tipo,banner,itens,qtdTotalPaginas,filtroMarca,filtroPreco,filtroTipo,marcas,pag){
    lista = new Lista(nome,tipo,banner,itens,qtdTotalPaginas,filtroMarca,filtroPreco,filtroTipo,marcas,pag);
    document.getElementById("anterior").disabled = true;
    addProdutoLinha();
    addProdutoBanner();
    configBotoes();
    carregaFiltros();
}

function addProdutoLinha(){
    for(let i =0; i <16;i++){
        if(lista.itens[i] === undefined){
            lista.itens.push(new Produto("null","null","null","null","null","null","null","null","null","null","null","null","null","../IMAGES/PRODUTOS/produto.png"));
        }
    }
    document.getElementById("linha1").innerHTML = bannerHtml(lista.itens.slice(0,4));
    document.getElementById("linha2").innerHTML = bannerHtml(lista.itens.slice(4,8));
    document.getElementById("linha3").innerHTML = bannerHtml(lista.itens.slice(8,12));
    document.getElementById("linha4").innerHTML = bannerHtml(lista.itens.slice(12));
}

function addProdutoBanner(){
    document.getElementById("banner_lista").innerHTML = bannerHtml(lista.banner.slice(lista.bannerPos,lista.bannerPos+4));
}

function bannerHtml(produtos){
    let txt = "";
    for(let i=0;i< produtos.length;i++){
        txt+= produtos[i].toProdutoHtml();
    }
    return txt;
}

function moverBanner(direcao){
    if(lista.bannerPos > 0){
        document.getElementById("anterior").disabled = false;
    }
    if((direcao<0 && lista.bannerPos > 0) || (lista.bannerPos <8 && direcao>0)){
        lista.bannerPos += direcao;
        addProdutoBanner();
    }
}

function configBotoes(){
    console.log(lista.qtdTotalPaginas);
    if(lista.qtdTotalPaginas < 6){
        for(let i = qtdTotalPaginas+2; i<7; i++){
            document.getElementById("btn_"+i).disabled = true;
            document.getElementById("btn_"+i).style.opacity = "0.3";
            document.getElementById("btn_"+i).style.cursor = "default";
        }
    }
    let btn1 = document.getElementById("btn_1");
    let btn2 = document.getElementById("btn_2");
    let btn3 = document.getElementById("btn_3");
    let btn4 = document.getElementById("btn_4");
    let btn5 = document.getElementById("btn_5");
    let btn6 = document.getElementById("btn_6");
    for(let i=1 ; i<7;i++){
        if(lista.pag > 2 && parseInt(btn6.textContent)<lista.qtdTotalPaginas+1){
            btn1.textContent = parseInt(btn1.textContent) + 1;
            btn2.textContent = parseInt(btn2.textContent) + 1;
            btn3.textContent = parseInt(btn3.textContent) + 1;
            btn4.textContent = parseInt(btn4.textContent) + 1;
            btn5.textContent = parseInt(btn5.textContent) + 1;
            btn6.textContent = parseInt(btn6.textContent) + 1;
        }
    }
    for(let i=1 ; i<7;i++){
        if(parseInt(document.getElementById("btn_"+i).textContent) === lista.pag+1){
            document.getElementById("btn_"+i).style.backgroundColor = "lightgray";
        }
    }
}

function irProFinal(){
    AJAX_listas(lista.nome,lista.tipo,lista.banner,lista.qtdTotalPaginas,filtroLista,lista.filtroMarca,lista.filtroPreco,lista.filtroTipo);
}

function irProInicio(){
    AJAX_listas(lista.nome,lista.tipo,lista.banner,0,filtroLista,lista.filtroMarca,lista.filtroPreco,lista.filtroTipo);
}

async function carregaFiltros(){
    for(let i=0;i<lista.marcas.length;i++){
        let newMarca = document.createElement("li");
        let marcaLink = document.createElement("a");
        newMarca.setAttribute("id",lista.marcas[i]);
        marcaLink.appendChild(document.createTextNode(lista.marcas[i]));
        marcaLink.setAttribute("href","#");
        marcaLink.setAttribute("onclick","aplicaFiltro(1,'"+lista.marcas[i]+"')");
        newMarca.appendChild(marcaLink);
        document.getElementById("filtro_marca").appendChild(newMarca);
    }
    let txt;
    if(lista.tipo === "categoria"){
        txt = '<li id="brinquedos" onclick="aplicaFiltro(2,\'brinquedos\')" ><a href="#">Brinquedos</a></li>';
        txt+= '<li id="higiene" onclick="aplicaFiltro(2,\'higiene\')" ><a  href="#">Higiene</a></li>';
        txt+= '<li id="saúde" onclick="aplicaFiltro(2,\'saúde\')" ><a href="#">Saúde</a></li>';
        txt+= '<li id="alimentos" onclick="aplicaFiltro(2,\'alimentos\')" ><a href="#">Alimentos</a></li>';
        txt+= '<li id="acessórios" onclick="aplicaFiltro(2,\'acessórios\')" ><a href="#">Acessórios</a></li>';
    }else{
        txt = '<li id="gatos" onclick="aplicaFiltro(2,\'gatos\')" ><a href="#">Gatos</a></li>';
        txt+= '<li id="cachorros" onclick="aplicaFiltro(2,\'cachorros\')" ><a href="#">Cachorros</a></li>';
        txt+= '<li id="roedores" onclick="aplicaFiltro(2,\'roedores\')" ><a href="#">Roedores</a></li>';
        txt+= '<li id="passáros" onclick="aplicaFiltro(2,\'passáros\')" ><a href="#">Passáros</a></li>';
        txt+= '<li id="peixes" onclick="aplicaFiltro(2,\'peixes\')" ><a href="#">Peixes</a></li>';
    }
    document.getElementById("filtro_tipo").innerHTML = txt;
    for(let i = 0; i < lista.filtroMarca.length; i++){
        document.getElementById(lista.filtroMarca[i]).style.fontWeight = "bold";
        document.getElementById(lista.filtroMarca[i]).style.color = "black";
    }
    for(let i = 0; i < lista.filtroTipo.length; i++){
        document.getElementById(lista.filtroTipo[i]).style.fontWeight = "bold";
        document.getElementById(lista.filtroTipo[i]).style.color = "black";
    }
    for(let i = 0; i < lista.filtroPreco.length; i+=2){
        document.getElementById("f"+lista.filtroPreco[i]).style.fontWeight = "bold";
        document.getElementById("f"+lista.filtroPreco[i]).style.color = "black";
    }
    
}

function aplicaFiltro(funcao,filtro1,filtro2){
    if(funcao === 1){
        lista.filtroMarca.push(filtro1);
    }else if(funcao === 2){
        lista.filtroTipo.push(filtro1);
        
    }else{
        lista.filtroPreco.push(filtro1);
        lista.filtroPreco.push(filtro2);
        console.log(lista.filtroPreco);
    }
    AJAX_listas(lista.nome,lista.tipo,lista.banner,0,filtroLista,lista.filtroMarca,lista.filtroPreco,lista.filtroTipo);
}

function mudarPagina(pagina){
    lista.pag = pagina -1;
    AJAX_listas(lista.nome,lista.tipo,lista.banner,lista.pag,filtroLista,lista.filtroMarca,lista.filtroPreco,lista.filtroTipo)
}

function filtroLista(produto){
    
    if(lista.filtroMarca.length !== 0){
        if(!lista.filtroMarca.includes(produto.marca)){
            return false;
        }
    }
    if(lista.filtroPreco.length !== 0){
        let cont = 0;
        for(let i =0; i<lista.filtroPreco.length;i+=2){
            if(produto.preco < lista.filtroPreco[i] || produto.preco > lista.filtroPreco[i+1]){
                cont++;
            }
        }
        if(cont === lista.filtroPreco.length/2){
            return false
        }
    }
    if(lista.filtroTipo.length !== 0){
        if(lista.tipo === "categoria"){
            if(!lista.filtroTipo.includes(produto.departamento)){
                return false;
            }
        }else{
            if(!lista.filtroTipo.includes(produto.categoria)){
                return false;
            }
        }
    }
    return true;
}

function limparFiltros(){
    lista.filtroMarca = [];
    lista.filtroTipo = [];
    lista.filtroPreco = [];
    AJAX_listas(lista.nome,lista.tipo);
}

function deletaProduto(){
    let codigo = document.getElementById("codigo").value;
    let request = db_estoque.transaction(["estoque"], "readwrite").objectStore("estoque").delete(codigo);
    request.onsuccess = function(event) {
        alert("Produto removido do estoque");
    };
}