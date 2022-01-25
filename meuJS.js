class Produto{
  constructor(){
       this.id = 1;
       this.arrProduto=[];
       this.editId = null;
  }

    //Salva os dados inseridos na lista.
    salvar(){ 
      let produto = this.lerDados();

    //Verificação edição e de campos:
    if(this.validacaoCampos(produto)){
      if(this.editId ==null){
         this.adicionar(produto);
      }  else{
        this.atualizar(this.editId ,produto);
      }
    }
       this.listaTabela();     //Depois da validação dos campos chama a função ListaTabela.
       this.cancelar();        //Chama a função cancelar.
   }

    //Limpa o Campo Produto, para não salvar os mesmos dados varias vezes.
    cancelar(){
      document.getElementById('produto').value = '';
      document.getElementById('btnhmtl').innerText ='Adicionar';
      this.editId = null;
   }

    //Adiciona o elemento no Array:
      adicionar(produto){
        this.arrProduto.push(produto);
        this.id++;
  }

    //Criação da tabela Dinâmica.
      listaTabela(){
        let tbody = document.getElementById('tbody');

        tbody.innerText ='';    //Para não duplicar na list.

        for(let i = 0; i < this.arrProduto.length;  i++ ){

           let tr = tbody.insertRow();
             //Criação das colunas 
             let td_id = tr.insertCell();
             let td_iten = tr.insertCell();
             let td_produto = tr.insertCell();
             let td_imagem = tr.insertCell();
             let td_acao = tr.insertCell();

             let produto = this.arrProduto[i];
             

            td_id.innerText = this.arrProduto[i].id;
            td_iten.innerText = this.arrProduto[i].iten;
            td_produto.innerText = this.arrProduto[i].nomeProduto;
            td_imagem.innerText = this.arrProduto[i].imagem;

            //Criação dos buttons Delet/Edit
            let btnEdit = document.createElement('button');
            let btnDelete = document.createElement('button');
            btnEdit.innerHTML = "Editar";
            btnDelete.innerHTML = "Deletar";
            td_acao.appendChild(btnEdit);
            td_acao.appendChild(btnDelete);

            //Ação dos botões
            btnDelete.setAttribute("onclick","produto.deletar("+produto.id+")");
            btnEdit.setAttribute("onclick","produto.editar("+JSON.stringify(this.arrProduto[i])+ ")");

            //Centralizar itens na lista
            td_id.classList.add('center');
            td_iten.classList.add('center');
            td_produto.classList.add('center');
            td_imagem.classList.add('center');
            td_acao.classList.add('center');
       }
  }

     //Leitura dos dados 
     lerDados(){
      let produto ={ }
      produto.id = this.id;
      produto.iten = document.getElementById('produto').value;
      produto.imagem =  this.getApi().email;
      produto.acao = this.acao;
      produto.nomeProduto =  this.getApi().name.first;
      return produto;
  }

     //Validação do Campo
     validacaoCampos(produto){
        let msg='';
     if(produto.iten == ''){
        msg += 'Informe o nome do Produto \n';
     }
     if(msg != ''){
         alert(msg);
         return false
         }
         return true;
  }

     deletar(id){
     //Validação para excluir
      if(confirm('Deseja deletar esse iten? ')){
         let tbody = document.getElementById('tbody');
     //Excluir
     for (let i = 0; i < this.arrProduto.length; i++) {
         if(this.arrProduto[i].id == id){
            this.arrProduto.splice(i,1);
             tbody.deleteRow(i);
         }
       }
      }
  }

    limparTudo(){
    this.arrProduto.splice(0, this.arrProduto.length);
    this.id =1;
    this.listaTabela();
  }

    atualizar(id , produto){
    for(let i = 0; i < this.arrProduto.length; i++){
        if(this.arrProduto[i].id == id){
          this.arrProduto[i].iten = produto.iten;
         }
      }
    }

    //Editar Produtos
    editar(dados){
    this.editId = dados.id;
    document.getElementById('produto').value = dados.iten;
    document.getElementById('btnhmtl').innerText = 'Atualizar';
  }
    //Consumindo API 
    getApi() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://randomuser.me/api/", false);
    request.send();
    let pessoas = JSON.parse(request.response);

    return pessoas.results[0];

}
}

var produto = new Produto();