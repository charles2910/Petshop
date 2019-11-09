async function navegarCompra(codigo){
    if(logged !== undefined && logged.admin){
        await AJAX_navegacao("../conteudos/att_produto.html","Cadastro de produto",()=>{
            let request = db_estoque.transaction("estoque").objectStore("estoque").get(codigo);
             request.onsuccess = function(event) {
                let produto = jsonToProduto(request.result);
                document.getElementById("nome").value = produto.nomeComercial;
                document.getElementById("marca").value = produto.marca;
                document.getElementById("categoria").value = produto.categoria;
                document.getElementById("departamento").value = produto.categoria;
                document.getElementById("preco").value = produto.preco;
                document.getElementById("preco_promo").value = produto.precoPromocional;
                document.getElementById("nome_comp").value = produto.nomeCompleto;
                document.getElementById("codigo").value = produto.codigo;
                document.getElementById("codigo").readOnly = true;
                document.getElementById("qtd").value = produto.qtdEstoque;
                document.getElementById("lote").value = produto.lote;
                document.getElementById("validade").value = produto.validade;
                document.getElementById("desc").value = produto.descricao;

            };
        });
    }else{
         AJAX_navegacao("../conteudos/compra.html","",()=>{
             let request = db_estoque.transaction("estoque").objectStore("estoque").get(codigo);
             request.onsuccess = function(event) {
                let produto = jsonToProduto(request.result);
                document.getElementById("tela_compra").innerHTML = produto.toCompraHtml();
                document.getElementById("nome_produto_compra").innerHTML = produto.nomeComercial;
                document.getElementById("nome_completo").innerHTML = produto.nomeCompleto;
            };
         });
    }
}

async function AJAX_navegacao(arquivo,pagina_atual,callback){
    let xhttp = new XMLHttpRequest();
    if(pagina_atual !== undefined){
        document.getElementById("pagina_atual").innerHTML = pagina_atual;
    }
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("janela_de_conteudo").innerHTML = this.responseText;
            if(callback !== undefined){
                callback();
            }
        }
    }
    xhttp.open("GET",arquivo);
    xhttp.send();
}

async function AJAX_listas(nome,tipo,banner,pagina,filtro,filtroMarca,filtroPreco,filtroTipo){
    let xhttp = new XMLHttpRequest();
    if(pagina_atual !== undefined){
        document.getElementById("pagina_atual").innerHTML = nome;
    }
    nome = nome.toLowerCase();
    xhttp.onreadystatechange = async function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("janela_de_conteudo").innerHTML = this.responseText;
            if(banner !== undefined){
                let result = await qtdPaginas(nome,tipo,filtro);
                carregarLista(nome,
                          tipo,
                          banner,
                          await carregaItens(nome,tipo,pagina,filtro),
                          result[0],filtroMarca,filtroPreco,filtroTipo,
                          result[1],
                          pagina);
            }else{
                filtro = () => {return true};
                let result = await qtdPaginas(nome,tipo,filtro);
                carregarLista(nome,
                          tipo,
                          escolheBanner(nome,tipo),
                          await carregaItens(nome,tipo,0,filtro),
                          result[0],[],[],[],
                          result[1],
                          0);
            }
        }
    }
    xhttp.open("GET","../conteudos/listas.html");
    xhttp.send();
}

function navaegacaoInterativa(id){
    let i=0;
    if(id !== undefined || id !== false){
        while(document.getElementById("li" + i )!== null){
            if("li" + i !== id){
                document.getElementById("li" + i ).setAttribute("onmouseover",
                    'document.getElementById("li" + '+i+' ).style.backgroundColor = "white"'
                );
                document.getElementById("li" + i ).setAttribute("onmouseout",
                    'document.getElementById("li" + '+i+' ).style.backgroundColor = "yellow"'
                );
                document.getElementById("li" + i ).style.backgroundColor = "yellow";
            }else{
                document.getElementById("li" + i).style.backgroundColor = "white";
                document.getElementById("li" + i ).setAttribute("onmouseout",
                    'document.getElementById("li" + '+i+' ).style.backgroundColor = "white"'
                );
            }
            i++
        }
    }
}

function escolheBanner(nome,tipo){
    if(tipo === "categoria"){
        if(nome === "cachorros"){
            return banners.cachorros;
        }else if( nome === "gatos"){
            return banners.gatos;
        }else if( nome === "roedores"){
            return banners.roedores;
        }else if( nome === "passáros"){
            return banners.passaros;
        }else if( nome === "peixes"){
            return banners.peixes;
        }
    }else if(tipo ==="departamento"){
        if(nome === "brinquedos"){
            return banners.brinquedos;
        }else if( nome === "saúde"){
            return banners.saude;
        }else if( nome === "alimentos"){
            return banners.alimentos;
        }else if( nome === "higiene"){
            return banners.higiene;
        }else if( nome === "acessórios"){
            return banners.acessorios;
        }
    }else{
        return banners.geral;
    }
}

async function qtdPaginas(nome,tipo,filtro){
    return new Promise( (resolve) => {
        let objectStore = db_estoque.transaction("estoque").objectStore("estoque");
        let i = 0;
        let index = objectStore.index(tipo);
        let marcas = [];
        index.openCursor(IDBKeyRange.only(nome)).onsuccess = (event)=>{
            let cursor = event.target.result;
            if(cursor){
                if(filtro(cursor.value)){
                    i++;
                }
                if(!marcas.includes(cursor.value.marca)){
                    marcas.push(cursor.value.marca);
                }
                cursor.continue();  
            }else{
                if(i%16 === 0){
                    qtdTotalPaginas = i/16;
                }else{
                    qtdTotalPaginas = ((i-(i%16))/16)+1;
                }
                qtdTotalPaginas--;
                resolve([qtdTotalPaginas,marcas]);
            }
        }
    });
}

async function carregaItens(nome,tipo,pag,filtro){
    return new Promise((resolve) => {
        let objectStore = db_estoque.transaction("estoque").objectStore("estoque");
        let i = 0;
        let cont = 0;
        let produtos = [];
        let index = objectStore.index(tipo);
        index.openCursor(nome).onsuccess = (event)=>{
            let cursor = event.target.result;
            if(cursor){
                if(filtro(cursor.value)){
                    if(cont >= (pag)*16){
                        produtos.push(jsonToProduto(cursor.value));
                        i++;
                    }
                    cont++;
                }
                if(i < 16){
                    cursor.continue();  
                }else{
                    resolve(produtos);
                }
            }else{
                
                resolve(produtos);
            }
        }
    });
}

function jsonToProduto(json){
    let temp = new Produto(json.nomeComercial,
                                            json.marca,
                                            json.categoria,
                                            json.departamento,
                                            json.preco,
                                            json.precoPromocional,
                                            json.nomeCompleto,
                                            json.codigo,
                                            json.qtdEstoque,
                                            json.lote,
                                            json.validade,
                                            json.descricao,
                                            json.promocao,
                                            json.imgPath,
                                            );
    return temp;
}