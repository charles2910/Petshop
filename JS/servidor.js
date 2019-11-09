let db_clientes;
let db_estoque;
let db_sessao;
let banners = new Banner();

window.onload = () =>{
    console.log("carregada");
    let loadUsuario = false;
    let request = window.indexedDB.open("clientes",1);
    request.onsuccess = (event)=>{
        db_clientes = request.result;
        if(loadUsuario){
            let admin = new Cliente("admin","admin@admin.com","99999999999","99999999999","2000-01-01","99999999999","admin","","",true);
            let user = new Cliente("user","user@user.com","99999999999","99999999999","2000-01-01","99999999999","user","","",false);
            writeDbCliente(admin);
            writeDbCliente(user);
        }
    }
    request.onupgradeneeded= (event) =>{
        db_clientes = event.target.result;
        let objectStore = db_clientes.createObjectStore("clientes",{keyPath: "email"});
        objectStore.createIndex("email","email",{unique: true});
        loadUsuario = true;
    }
    let loadEstoque = false;

    let request2 = window.indexedDB.open("estoque",1);
    request2.onsuccess = async (event)=>{
        db_estoque = request2.result;
        if(loadEstoque){
            carregarProdutos();
        }
        await carregaBanners();
        AJAX_navegacao("../conteudos/principal.html","");
    }
    request2.onupgradeneeded = (event) =>{
        db_estoque = event.target.result;
        let objectStore = db_estoque.createObjectStore("estoque",{keyPath: "codigo"});
        objectStore.createIndex("codigo","codigo",{unique: true});
        objectStore.createIndex("categoria","categoria",{unique: false});
        objectStore.createIndex("departamento","departamento",{unique: false});
        loadEstoque = true;
    }

    let request3 = window.indexedDB.open("sessao",1);
    request3.onsuccess = (event)=>{
        db_sessao = request3.result;
    }
    request3.onupgradeneeded = (event) =>{
        db_sessao = event.target.result;
        let objectStore = db_sessao.createObjectStore("sessao",{keyPath: "email"});
        objectStore.createIndex("email","email",{unique: true});
    }
}

async function writeDbCliente(cliente){
    return await new Promise( (resolve) => {
        let transaction = db_clientes.transaction(["clientes"],"readwrite");
        let objectStore = transaction.objectStore("clientes");
        let request = objectStore.add(cliente);
        request.onsuccess = (event) =>{
            console.log("sucesso")
            resolve(true);
        }
        request.onerror = (event) =>{
            window.alert("Email já cadastrado");
            return false;
        }
    });
}

async function attDbCliente(cliente){
    return await new Promise( (resolve,reject) => {
        let transaction = db_clientes.transaction(["clientes"],"readwrite");
        let objectStore = transaction.objectStore("clientes");
        let request = objectStore.put(cliente);
        request.onsuccess = (event) =>{
            console.log("sucesso")
            resolve(true);
        }
        request.onerror = (event) =>{
            window.alert("Email já cadastrado");
            reject(false);
        }
    });
}

async function writeDbProduto(produto){
    return new Promise( (resolve,reject) => {
        let transaction = db_estoque.transaction(["estoque"],"readwrite");
        let objectStore = transaction.objectStore("estoque");
        let request = objectStore.add(produto);
        request.onsuccess = (event) =>{
            console.log("sucesso")
            resolve();
            return true;
        }
        request.onerror = (event) =>{
            window.alert("Código já cadastrado");
            reject();
            return false;
        }
    });
}

async function attDbProduto(produto){
    return new Promise( (resolve,reject) => {
        let transaction = db_estoque.transaction(["estoque"],"readwrite");
        let objectStore = transaction.objectStore("estoque");
        let request = objectStore.put(produto);
        request.onsuccess = (event) =>{
            console.log("sucesso")
            resolve();
            return true;
        }
        request.onerror = (event) =>{
            window.alert("Código já cadastrado");
            reject();
            return false;
        }
    });
}

function carregarProdutos(){
    let departamento = ["acessórios","alimentos","brinquedos","higiene","saúde"]
    for(let i = 0; i<5;i++){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = async function(){
            if(this.readyState == 4 && this.status == 200){
                let temp = JSON.parse(this.responseText);
                for(let j=0; j<temp.length;j++){
                    await writeDbProduto(temp[j]); 
                }
            }
        }
        xhttp.open("GET","../produtos/"+departamento[i]+".json");
        xhttp.send();
    }
}

async function carregaBanners(){
    return new Promise( (resolve)=> {
        let promocoes = [];
        let objectStore = db_estoque.transaction("estoque").objectStore("estoque");
        objectStore.openCursor().onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                if(cursor.value.promocao){
                    promocoes.push(jsonToProduto(cursor.value));
                }
                cursor.continue();
            }else{
                promocoes.sort(compare);
                for(let i = 0; i < promocoes.length; i++){
                    if(promocoes[i].departamento =="alimentos" &&  banners.alimentos.length <12){
                        banners.alimentos.push(promocoes[i]);
                    }else if(promocoes[i].departamento =="higiene" &&  banners.higiene.length <12){
                        banners.higiene.push(promocoes[i]);
                    }else if(promocoes[i].departamento =="acessórios" &&  banners.acessorios.length <12){
                        banners.acessorios.push(promocoes[i]);
                    }else if(promocoes[i].departamento =="brinquedos" &&  banners.brinquedos.length <12){
                        banners.brinquedos.push(promocoes[i]);
                    }else if(promocoes[i].departamento =="saúde" &&  banners.saude.length <12){
                        banners.saude.push(promocoes[i]);
                    }
                    if(promocoes[i].categoria =="cachorros" &&  banners.cachorros.length <12){
                        banners.cachorros.push(promocoes[i]);
                    }else if(promocoes[i].categoria =="gatos" &&  banners.gatos.length <12){
                        banners.gatos.push(promocoes[i]);
                    }else if(promocoes[i].categoria =="passáros" &&  banners.passaros.length <12){
                        banners.passaros.push(promocoes[i]);
                    }else if(promocoes[i].categoria =="peixes" &&  banners.peixes.length <12){
                        banners.peixes.push(promocoes[i]);
                    }else if(promocoes[i].categoria =="roedores" &&  banners.roedores.length <12){
                        banners.roedores.push(promocoes[i]);
                    }
                    if(banners.geral.length <15){
                        banners.geral.push(promocoes[i]);
                    }
                }
                resolve();
            }
        }
    });    
}

function compare(a,b){
    return b.precoPromocional-a.precoPromocional;
}

