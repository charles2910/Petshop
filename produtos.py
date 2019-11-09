import json
import random

produtos = [];
categorias = ["cachorros","gatos","roedores","passáros","peixes"]
departamentos = ["brinquedos","saúde","alimentos","higiene","acessórios"]
arquivo = open("produtos.json","w")
marca = "a"
z = 0;
produto = "Produto";
arquivo.write('[\n')
txt = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos error omnis doloribus repellat tempora asperiores sit? "
for i in range(0,5):
    for j in range(0,5):
        arquivo = open(departamentos[j]+".json","a")
        for x in range(0,5):
            for  k in range(0,5):
                promo = ""
                if(random.randint(0,100) > 75):
                    promo = "true"
                else:
                    promo = "false"
                if(categorias[x] != "peixes"):
                    codigo = marca+str(z)+categorias[x][0]+departamentos[j][0]
                else:
                    codigo = marca+str(z)+"px"+departamentos[j][0]
                nome = produto + " " + str(z) + " " + departamentos[j] + " " + categorias[x] + " " + marca + str(random.randint(100,5000))+codigo
                arquivo.write('    {\n')
                arquivo.write('        "nomeComercial" :  "{}",\n'.format(produto + " " + str(z)))
                arquivo.write('        "marca" :  "Marca {}",\n'.format(marca))
                arquivo.write('        "categoria":  "{}",\n'.format(categorias[x]))
                arquivo.write('        "departamento" :  "{}",\n'.format(departamentos[j]))
                arquivo.write('        "preco" :  {},\n'.format(random.randint(2000,15000)/100.0))
                arquivo.write('        "precoPromocional" :  {},\n'.format((random.randint(10,150))/2.0))
                arquivo.write('        "nomeCompleto" :  "{}",\n'.format(nome))
                arquivo.write('        "codigo" :  "{}",\n'.format(codigo))
                arquivo.write('        "qtdEstoque" :  {},\n'.format(random.randint(1,50)))
                arquivo.write('        "lote" :  {},\n'.format(random.randint(100,5000)))
                arquivo.write('        "validade" :  "{}-{}-{}",\n'.format(random.randint(2020,2023),random.randint(1,12),random.randint(1,28)))
                arquivo.write('        "descricao" :  "{}",\n'.format(txt))
                arquivo.write('        "promocao" :  {},\n'.format(promo))
                arquivo.write('        "imgPath" :  "../IMAGES/PRODUTOS/produto.png"\n')
                arquivo.write('    },\n')
                z+=1
    marca = chr(ord(marca) + 1)
arquivo.write("]")