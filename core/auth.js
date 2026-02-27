// ===============================
// SISTEMA DE AUTENTICAÇÃO PROFISSIONAL
// ===============================

const ADMIN_EMAIL = "admin@alexpsicultor.com";
const ADMIN_SENHA = "123456";

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

function register(nome, email, senha) {
    let users = getUsers();

    if (users.find(u => u.email === email)) {
        alert("Email já cadastrado!");
        return;
    }

    users.push({
        nome,
        email,
        senha,
        status: "pendente"
    });

    saveUsers(users);
    alert("Cadastro enviado! Aguarde aprovação.");
}

function login(email, senha) {

    // ADMIN
    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
        showAdminPanel();
        return;
    }

    let users = getUsers();
    let user = users.find(u => u.email === email && u.senha === senha);

    if (!user) {
        alert("Usuário ou senha inválidos!");
        return;
    }

    if (user.status !== "aprovado") {
        alert("Usuário ainda não aprovado!");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));
renderApp(user);
}

// ===============================
// PAINEL ADMIN
// ===============================

function showAdminPanel() {
    let users = getUsers();

    let pendentes = users.filter(u => u.status === "pendente");

    let html = `
        <h2>Painel Administrativo</h2>
        <h3>Usuários Pendentes</h3>
    `;

    pendentes.forEach((u, index) => {
        html += `
            <div style="margin-bottom:10px;">
                ${u.nome} - ${u.email}
                <button onclick="aprovar('${u.email}')">Aprovar</button>
                <button onclick="excluir('${u.email}')">Excluir</button>
            </div>
        `;
    });

    document.getElementById("app").innerHTML = html;
}

function aprovar(email) {
    let users = getUsers();
    let user = users.find(u => u.email === email);
    user.status = "aprovado";
    saveUsers(users);
    alert("Usuário aprovado!");
    showAdminPanel();
}

function excluir(email) {
    let users = getUsers().filter(u => u.email !== email);
    saveUsers(users);
    alert("Usuário excluído!");
    showAdminPanel();
}
