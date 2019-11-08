class Cliente{
    constructor(nome, email, celular,telefone,nascimento,cpf,senha,endereco,cartao,admin){
        this.nome = nome;
        this.email = email;
        this.celular = celular;
        this.telefone = telefone;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.admin = admin;
        this.senha = senha;
        this.endereco = endereco;
        this.cartao = cartao;
        this.pets;
        this.pedidos;
    }
    addPet(pet){
        this.pets.append(pet);
    }
    addPedido(pedido){
        this.pedidos.append(pedido);
    }
}

class Endereco{
    constructor(cep,rua,numero,bairro,complemento,estado,cidade){
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.complemento = complemento;
        this.estado = estado;
        this.cidade = cidade;
    }
}

class Pagamento{
    constructor(nome,numero,validade,cvv){
        this.nome = nome;
        this.numero = numero;
        this.validade = validade;
        this.cvv = cvv;
    }
}

class pet{
    constructor(nome,tipo,raca,idade,peso,sexo){
        this.nome = nome;
        this.tipo = tipo
        this.raca = raca;
        this.idade = idade;
        this.peso = peso;
        this.sexo = sexo;
        this.servicos;
    }
    addServicos(servico){
        this.servicos.append(servico);
    }
}

class servico{
    constructor(tipoAnimal,nomeAnimal,tipo,data,detalhes,preco){
        this.tipoAnimal = tipoAnimal;
        this.nomeAnimal = nomeAnimal;
        this.tipo = tipo;
        this.data = data;
        this.detalhes = detalhes;
        this.preco = preco;
    }
}

class Produto{
    constructor(nomeComercial,marca,categoria,departamento,preco,precoPromocional,nomeCompleto,codigo,qtdEstoque,lote,validade,descricao,promocao,img){
        this.nomeComercial = nomeComercial;
        this.marca = marca;
        this.categoria = categoria;
        this.departamento = departamento;
        this.preco = preco;
        this.precoPromocional = precoPromocional;
        this.nomeCompleto = nomeCompleto;
        this.codigo = codigo;
        this.qtdEstoque = qtdEstoque;
        this.lote = lote;
        this.validade = validade;
        this.descricao = descricao;
        this.promocao = promocao;
        this.imgPath = img;
    }

    toProdutoHtml(){
        let txt = '<div id="'+this.codigo+'" class="produto" onclick="navegarCompra('+this.codigo+')">';
        txt +=  '<img src="'+this.imgPath+'"/>';
        txt +=  '<h3>'+this.nome+'</h3>';
        if(this.promocao){
            txt +=  '<h6>De <del>'+this.preco+'</del> por</h6>';
            txt +=  '<h4>R$ '+(this.preco*((100-this.precoPromocional)/100))+'</h4>';
        }else{
            txt +=  '<h6>Por apenas:</h6>';
            txt +=  '<h4>R$ '+this.preco+'</h4>';
        }
        txt +=  '</div>';
        return txt;
    }

}

class Estoque{
    constructor(){
        this.acessorios = [];
        this.higiente = [];
        this.brinquedos = [];
        this.saude = [];
        this.alimentos = [];
    }
}

class pedido{
    constructor(imagem,nome,qtd,preco,entrega){
        this.imagem = imagem;
        this.nome = nome;
        this.qtd = qtd;
        this.preco = preco;
        this.entrega = entrega;
    }
}

class Carrinho{
    constructor() {
        this.produtos = [];
        this.valorTotal = 0.00;
        this.numProd = this.produtos.length;
    }
}
