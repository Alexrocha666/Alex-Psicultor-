let usuarioAtual = null;

function telaLogin() {
  document.getElementById("app").innerHTML = `
    <h2>Login</h2>
    <input id="email" placeholder="Email"><br>
    <input id="senha" type="password" placeholder="Senha"><br>
    <button onclick="login()">Entrar</button>
    <button onclick="telaCadastro()">Cadastrar</button>
  `;
}

function telaCadastro() {
  document.getElementById("app").innerHTML = `
    <h2>Criar Conta</h2>
    <input id="nome" placeholder="Nome"><br>
    <input id="email" placeholder="Email"><br>
    <input id="senha" type="password" placeholder="Senha"><br>
    <button onclick="cadastrar()">Criar</button>
  `;
}

function cadastrar() {
  let usuarios = carregar("usuarios");

  let novo = {
    id: Date.now(),
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    fazenda: {
      tanques: [],
      financeiro: [],
      vendas: []
    }
  };

  usuarios.push(novo);
  salvar("usuarios", usuarios);
  alert("Conta criada!");
  telaLogin();
}

function login() {
  let usuarios = carregar("usuarios");

  let user = usuarios.find(u =>
    u.email === email.value &&
    u.senha === senha.value
  );

  if (!user) {
    alert("Usuário não encontrado");
    return;
  }

  usuarioAtual = user;
  salvar("usuarioLogado", user);
  iniciarSistema();
}

function verificarLogin() {
  let salvo = carregar("usuarioLogado");

  if (salvo && salvo.nome) {
    usuarioAtual = salvo;
    iniciarSistema();
  } else {
    localStorage.removeItem("usuarioLogado");
    telaLogin();
  }
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  location.reload();
}
