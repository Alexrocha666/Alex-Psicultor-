// ===============================
// ALEX PSICULTOR - APP PRINCIPAL PROFISSIONAL
// ===============================

// Verifica sessão ao iniciar
document.addEventListener("DOMContentLoaded", () => {
    verificarSessao();
});

function verificarSessao() {
    let user = JSON.parse(localStorage.getItem("loggedUser"));

    if (!user) {
        renderLogin();
    } else {
        renderApp(user);
    }
}

// ===============================
// LOGIN E CADASTRO
// ===============================

function renderLogin() {
    document.getElementById("app").innerHTML = `
        <div class="login-container">
            <h2>Login</h2>
            <input id="email" placeholder="Email"><br>
            <input id="senha" type="password" placeholder="Senha"><br>
            <button onclick="fazerLogin()">Entrar</button>
            <hr>
            <h3>Criar Conta</h3>
            <input id="nomeCadastro" placeholder="Nome"><br>
            <input id="emailCadastro" placeholder="Email"><br>
            <input id="senhaCadastro" type="password" placeholder="Senha"><br>
            <button onclick="fazerCadastro()">Cadastrar</button>
        </div>
    `;
}

function fazerLogin() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    login(email, senha);
}

function fazerCadastro() {
    let nome = document.getElementById("nomeCadastro").value;
    let email = document.getElementById("emailCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;
    register(nome, email, senha);
}

// ===============================
// APP PRINCIPAL
// ===============================

function renderApp(user) {

    document.getElementById("app").innerHTML = `
        <div class="navbar">
            <h1>Alex Psicultor</h1>
            <div class="nav-buttons">
                <button onclick="renderTanques()">Tanques</button>
                <button onclick="renderVendas()">Vendas</button>
                <button onclick="renderRelatorios()">Relatórios</button>
                <button onclick="logout()">Sair</button>
            </div>
        </div>
        <div id="conteudo"></div>
    `;

    renderTanques();
}

function logout() {
    localStorage.removeItem("loggedUser");
    location.reload();
}
