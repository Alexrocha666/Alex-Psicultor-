let usuarioAtual = null;

function salvar(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function carregar(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}

function verificarLogin() {
  let salvo = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (salvo && salvo.nome) {
    usuarioAtual = salvo;
    iniciarSistema();
  } else {
    telaLogin();
  }
}

function telaLogin() {
  document.getElementById("app").innerHTML = `
    <div class="container">
      <h1>🐟 Alex Piscicultura PRO</h1>
      <h2>Login</h2>
      <input type="text" id="nome" placeholder="Seu nome"><br>
      <button onclick="login()">Entrar</button>
    </div>
  `;
}

function login() {
  let nome = document.getElementById("nome").value;
  if (!nome) return alert("Digite seu nome");
  usuarioAtual = { nome };
  salvar("usuarioLogado", usuarioAtual);
  iniciarSistema();
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  location.reload();
}

function iniciarSistema() {
  document.getElementById("app").innerHTML = `
    <h1>🐟 Alex Piscicultura PRO</h1>
    <p>Bem-vindo, ${usuarioAtual.nome}</p>

    <button onclick="telaDashboard()">Dashboard</button>
    <button onclick="telaTanques()">Tanques</button>
    <button onclick="telaFinanceiro()">Financeiro</button>
    <button onclick="telaVendas()">Vendas</button>
    <button onclick="logout()">Sair</button>
    <hr>
    <div id="conteudo"></div>
  `;
}
