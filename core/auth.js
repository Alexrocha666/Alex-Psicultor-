// ===============================
// ALEX PSICULTOR - AUTH CORE
// ===============================

let usuarioLogado = null;

// Salvar sessão
function salvarSessao(usuario) {
    sessionStorage.setItem("usuario_logado", usuario);
}

// Obter sessão
function obterSessao() {
    return sessionStorage.getItem("usuario_logado");
}

// Encerrar sessão
function logout() {
    sessionStorage.removeItem("usuario_logado");
    usuarioLogado = null;
    renderLogin();
}

// Fazer login
function login(usuario, senha) {
    const user = buscarUsuario(usuario);

    if (!user) {
        alert("Usuário não encontrado");
        return;
    }

    if (user.senha !== senha) {
        alert("Senha incorreta");
        return;
    }

    usuarioLogado = user;
    salvarSessao(user.usuario);
    renderApp();
}

// Verificar sessão ativa ao iniciar
function verificarSessao() {
    const usuarioSalvo = obterSessao();
    if (usuarioSalvo) {
        const user = buscarUsuario(usuarioSalvo);
        if (user) {
            usuarioLogado = user;
            renderApp();
            return;
        }
    }
    renderLogin();
}

// Tela de login
function renderLogin() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="card">
            <h2>Login - Alex Psicultor</h2>
            <input type="text" id="loginUsuario" placeholder="Usuário">
            <input type="password" id="loginSenha" placeholder="Senha">
            <button class="btn-primary" onclick="entrar()">Entrar</button>
        </div>
    `;
}

// Botão entrar
function entrar() {
    const usuario = document.getElementById("loginUsuario").value.trim();
    const senha = document.getElementById("loginSenha").value.trim();

    if (!usuario || !senha) {
        alert("Preencha todos os campos");
        return;
    }

    login(usuario, senha);
}

// Criar novo usuário (Admin)
function criarUsuario() {
    const nome = prompt("Nome do novo usuário:");
    if (!nome) return;

    const senha = prompt("Senha do novo usuário:");
    if (!senha) return;

    if (buscarUsuario(nome)) {
        alert("Usuário já existe");
        return;
    }

    const novoUsuario = {
        usuario: nome,
        senha: senha,
        tipo: "user",
        tanques: [],
        vendas: []
    };

    adicionarUsuario(novoUsuario);
    alert("Usuário criado com sucesso!");
    renderApp();
}

// Resetar senha (Admin)
function resetarSenha(nomeUsuario) {
    const novaSenha = prompt("Nova senha:");
    if (!novaSenha) return;

    const user = buscarUsuario(nomeUsuario);
    if (user) {
        user.senha = novaSenha;
        atualizarUsuario(user);
        alert("Senha atualizada!");
    }
}

// Excluir usuário (Admin)
function removerUsuario(nomeUsuario) {
    if (confirm("Deseja realmente excluir este usuário?")) {
        excluirUsuario(nomeUsuario);
        alert("Usuário removido!");
        renderApp();
    }
}
