let logged;

function login(email1, senha1){
    let email;
    let senha;
    if(email === undefined && senha === undefined){
        email = document.getElementById("email_login").value;
        senha = document.getElementById("psw_login").value;
    }else{
        email = email1;
        senha = senha1;
    }
    let transaction = db_clientes.transaction(["clientes"]);
    let objectStore = transaction.objectStore("clientes");
    let request = objectStore.get(email);
    request.onerror = (event)=>{
        window.alert("Email ou senha incorretos");
        return false;
    }
    request.onsuccess = (event) =>{
        if(request.result !== undefined){
            let user = request.result;
            if(user.senha === senha){
                if(user.admin === true){
                    logged = user;
                    document.getElementById("btn_login").innerText = "Admin";
                    addOpcoesAdmin();
                    popupLogin(false);
                    console.log(user);
                    return true;
                }else{
                    logged = user;
                    console.log(user);
                    document.getElementById("btn_login").innerText = "Perfil";
                    document.getElementById("btn_login").setAttribute('onclick',"AJAX_navegacao('../conteudos/perfil.html','Meu Perfil',carregaPerfil);navaegacaoInterativa(id)");
                    popupLogin(false);
                    return true;
                }
            }else{
                window.alert("Email ou senha incorretos");
                return false;
            }
        }else{
            window.alert("Email ou senha incorretos");
            return false;
        }
    }
}

function addOpcoesAdmin(){
    
    let newLiProduto = document.createElement("li");
    let newLiAdm = document.createElement("li");
    let produtoLink = document.createElement("a");
    let admLink = document.createElement("a");
    newLiAdm.setAttribute("id","li8");
    newLiProduto.setAttribute("id","li7");
    document.getElementById("btn_login").setAttribute('onclick',"AJAX_navegacao('../conteudos/perfil_admin.html','Perfil Adiministrador',carregaPerfil);navaegacaoInterativa(id)");
    document.getElementById("li6").setAttribute('onclick',"AJAX_navegacao('../conteudos/admin_servicos.html','Serviços');navaegacaoInterativa(id)");
    produtoLink.appendChild(document.createTextNode("Cadastrar produto"));
    admLink.appendChild(document.createTextNode("Cadastrar admin"));
    produtoLink.setAttribute("href","#");
    admLink.setAttribute("href","#");
    produtoLink.setAttribute("onclick","AJAX_navegacao('../conteudos/cadastro_produto.html','Cadastro de produto');navaegacaoInterativa(id)");
    admLink.setAttribute("onclick","AJAX_navegacao('../conteudos/cadastro_admin.html','Cadastro de adiministrador');navaegacaoInterativa(id)");
    newLiProduto.appendChild(produtoLink);
    newLiAdm.appendChild(admLink);
    document.getElementById("ul_navegacao").appendChild(newLiProduto);
    document.getElementById("ul_navegacao").appendChild(newLiAdm);
}

function carregaPerfil(){
    let request = db_clientes.transaction("clientes").objectStore("clientes").get(logged.email);
    request.onsuccess = function(event) {
        document.getElementById("nome_cliente").value = validaUndefined(request.result.nome);
        document.getElementById("ddd_cel").value = validaUndefined(request.result.celular[0] +request.result.celular[1]);
        document.getElementById("celular").value = validaUndefined(request.result.celular.slice(2));
        document.getElementById("nascimento").value = validaUndefined(request.result.nascimento);
        document.getElementById("senha1").value = validaUndefined(request.result.senha);
        document.getElementById("email").value = validaUndefined(request.result.email);
        document.getElementById("email").readOnly = true;
        document.getElementById("ddd_tel").value = validaUndefined(request.result.telefone[0]+request.result.telefone[1]);
        document.getElementById("telefone").value = validaUndefined(request.result.telefone.slice(2));
        document.getElementById("cpf").value = validaUndefined(request.result.cpf);
        document.getElementById("complemento").value = validaUndefined(request.result.endereco.complemento);
        document.getElementById("numero_casa").value = validaUndefined(request.result.endereco.numero);
        document.getElementById("cidade").value = validaUndefined(request.result.endereco.cidade);
        document.getElementById("rua").value = validaUndefined(request.result.endereco.rua);
        document.getElementById("cep").value =  validaUndefined(request.result.endereco.cep);
        document.getElementById("bairro").value = validaUndefined(request.result.endereco.bairro);
        document.getElementById("estado").value = validaUndefined(request.result.endereco.estado);
        if(!request.result.admin){
            document.getElementById("nome_cartao").value = validaUndefined(request.result.cartao.nome);
            document.getElementById("numero_cartao").value =  validaUndefined(request.result.cartao.numero);
            document.getElementById("validade_cartao").value = validaUndefined(request.result.cartao.validade);
            document.getElementById("cvv").value = validaUndefined(request.result.cartao.cvv);
        }
    }
}

function validaUndefined(valor){
    if(valor !== undefined){
        return valor;
    }
    else{
        return "";
    }
}