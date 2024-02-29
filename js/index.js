selecionarUsuarios();
document.querySelector('#salvar').addEventListener('click',  () => {


    let nome = document.querySelector('#exampleInputName').value
    let genero = document.querySelector('input[name=gender]:checked').value
    let nascimento = document.querySelector('#exampleInputBirth').value
    let pais = document.querySelector('#exampleInputCountry').value
    let email = document.querySelector('#exampleInputEmail1').value
    let senha = document.querySelector('#exampleInputPassword1').value
    let foto = document.querySelector('#exampleInputFile').value
    let admin = document.querySelector('#exampleInputAdmin').checked
    
    if (admin == true) {
        admin = 'Sim'
    }
    else{
        admin = 'Não';
}


let json = {nome: nome, genero: genero, nascimento: nascimento, pais: pais, email: email, senha: senha, foto: foto, admin:admin};

addlinha(json);
inserir(json);

})

function addlinha(usuario){
    
    let tr = document.createElement('tr');
    
    tr.innerHTML = `
    <td><img src="../Aula JS Gerenciamento de Usuário/dist/img/avatar.png" alt="Imagem do Usuário" class="img-sm img-circle"></td>
    <td>${usuario.nome}</td>
    <td>${usuario.email}</td>
    <td>${usuario.admin}</td>
    <td>${new Date().toLocaleDateString()}</td>
    <td><button type="button" class="btn btn-primary btn-sm">Editar</button>
    <button type="button" class="btn btn-danger btn-sm btn-delete" data-toggle="modal" data-target="#modalExcluir">Excluir</button></td>
    `;
    document.querySelector('#table-users').appendChild(tr);

    atualizaContagem();
    addeventosbtn(tr);
}

function atualizaContagem(){
    let numUsuarios = 0;
    let numAdmin = 0;

    numUsuarios = document.querySelector('#table-users').children.length;
    document.querySelector('#number-users').innerHTML = numUsuarios;


[...document.querySelector('#table-users').children].forEach(tr =>{
    if (tr.children[3].innerHTML == 'Sim'){
        numAdmin = numAdmin + 1;
    }

    document.querySelector('#number-users-admin').children.length;
    document.querySelector('#number-users-admin').innerHTML = numAdmin;
})
}

function addeventosbtn(tr){
    tr.querySelector('.btn-delete').addEventListener('click', () => {
        document.querySelector('#confirmar-exclusao').addEventListener('click', () =>{
            tr.remove();
            atualizaContagem();
            $('#modalExcluir').modal('hide');
        })
    } )
}

function inserir(json){
    let usuarios = [];

    if (sessionStorage.getItem('usuarios')){
        usuarios = JSON.parse(sessionStorage.getItem('usuarios'))
    }
    
    usuarios.push(json);

    sessionStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function selecionarUsuarios(){
    let usuarios = [];

    if (sessionStorage.getItem('usuarios')){
        usuarios = JSON.parse(sessionStorage.getItem('usuarios'))
    }

    console.log(usuarios);

    usuarios.forEach(usuario => {
        addlinha(usuario);
    });

}

