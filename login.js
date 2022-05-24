document.querySelector('#logar').addEventListener('click', (e)=>{
    e.preventDefault();

    logar();
});

function logar(){
    let login = document.querySelector('#login');
    let senha = document.querySelector('#pass');

    //crio vetor
    let usuarios = [];
    
    //crio um objeto pra comparar com os dados do objeto que vem do localstorage
    let usuario = {
        login: '',
        senha: ''
    }

    //Pego os dados de usuários que tenho no meu localstorage
    usuarios = JSON.parse(localStorage.getItem('usuarios'));

    //Estou capturando o objeto que existe dentro do meu vetor
    usuarios.forEach(elemento=>{
        if(elemento.login === login.value && elemento.senha === senha.value){
            usuario = {
                email: elemento.login,
                senha: elemento.senha
            }
        }
    });

    //cria a sessão para o usuário validado
    if(usuario.email === login.value && usuario.senha === senha.value){
        sessionStorage.setItem('logado', usuario.email)
        window.location.href = "recados.html";
    }else{
        alert('Login ou senha inválidos');
    }

}