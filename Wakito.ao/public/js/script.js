// divs produtos
let add_produtos = document.getElementById("add-produtos");
let update_produtos = document.getElementById("update-produtos");
let delete_produtos = document.getElementById("delete-produtos");
let get_produtos = document.getElementById("get-produtos");

// divs funcionarios
let add_funcionarios = document.getElementById("add-funcionarios");
let update_funcionarios = document.getElementById("update-funcionarios");
let delete_funcionarios = document.getElementById("delete-funcionarios");
let get_funcionarios = document.getElementById("get-funcionarios");

// divs facturas
let add_factura = document.getElementById("add-factura");
let update_factura = document.getElementById("update-factura");
let get_factura = document.getElementById("get-factura");

// div legislacao
let get_legislacao = document.getElementById("legislacao");

// divs home
let total_funcionarios = document.getElementById("total-funcionarios");
let dinheiro_mensal = document.getElementById("dinheiro-mensal");
let ultimas_facturas = document.getElementById("ultimas-facturas");

// all info-item
var info_nav = document.getElementsByClassName("info-nav");

// login infos
var sessao = { login: false, user: 'none', admin: false }

// para retornar tabelas nos get com .get e cada item como .get-item

//adicionar todas informações por aqui com append.child like

async function loginUser() {
    const username = document.getElementById('utilizador').value;
    const password = document.getElementById('password').value;
    const error = document.getElementById('error');


    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        console.log(result);

        if (result.success) {
            // Redirecionar para a página de sucesso ou painel do usuário
            sessao.login = true;
            sessao.user = username;
            console.log('Valor de login salvo no localStorage:', localStorage.getItem('login'));
            saveStorage();
            if (username == "wako") {
                sessao.admin = true;
                window.location.replace('/admin/home');
            } else {
                sessao.admin = false;
                window.location.replace('/user/home');
            }
        } else {
            error.textContent = result.message;
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
}

async function register() { // tem bugs
    // rota router.post('/register', UserController.register);

    var nome = document.getElementById("funcionario-nome").value;
    //var bi = document.getElementById("funcionario-bi").value;
    var pass = document.getElementById("funcionario-senha").value;
    //var morada = document.getElementById("funcionario-morada").value;
    //var telefone = document.getElementById("funcionario-telefone").value;
    var tipo = document.getElementById("funcionario-tipo").value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bi: bi, nome: nome, senha: pass, morada: morada, telefone: telefone })
    });

    const result = await response.json();
    const error = document.getElementById('error');
    console.log(result);
}

// function screen() {
//     if (sessao.login && sessao.user == "admin") {
//         if (currentPath.includes('admin/home.html')) {


//         } else if (currentPath.includes('admin/facturas.html')) {

//         } else if (currentPath.includes('admin/funcionario.html')) {

//         } else if (currentPath.includes('admin/legislacao.html')) {

//         } else if (currentPath.includes('admin/produtos.html')) {

//         }

//     } else if (sessao.login && sessao.user == "user") {
//         if (currentPath.includes('funcionario/home.html')) {

//         } else if (currentPath.includes('funcionario/facturas.html')) {

//         } else if (currentPath.includes('funcionario/legislacao.html')) {

//         } else if (currentPath.includes('funcionario/produtos.html')) {

//         }
//     }
// }

// document.addEventListener('DOMContentLoaded', function () {
//     const currentPath = window.location.pathname;
//     useStorage();


//     // Verifica qual página está aberta
//     if ((!currentPath.includes('login.html') && !sessao.login) || (currentPath.includes('/admin/') && sessao.user != "admin")
//         || (currentPath.includes('/funcionario/') && sessao.user != "funcionario")) {
//         console.log("Caminho inválido");
//         window.location.replace('/');
//     }
// });

function saveStorage() {
    localStorage.setItem('login', JSON.stringify(sessao.login));
    localStorage.setItem('user', JSON.stringify(sessao.user));
}

function useStorage() {
    sessao.login = JSON.parse(localStorage.getItem('login'));
    sessao.user = JSON.parse(localStorage.getItem('user'));
}