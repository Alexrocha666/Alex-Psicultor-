function iniciarSistema() {

  let nomeUsuario = usuarioAtual?.nome || "Produtor";

  document.getElementById("app").innerHTML = `
    <h1>🐟 Alex Psicultor PRO</h1>
    <p>Bem-vindo, ${nomeUsuario}</p>

    <button onclick="telaDashboard()">Dashboard</button>
    <button onclick="telaTanques()">Tanques</button>
    <button onclick="telaFinanceiro()">Financeiro</button>
    <button onclick="telaVendas()">Vendas</button>
    <button onclick="logout()">Sair</button>
    <hr>
  `;
}

verificarLogin();
function telaDashboard() {
  document.getElementById("app").innerHTML += `
    <h2>📊 Dashboard</h2>
    <p>Resumo geral da produção</p>
  `;
}

function telaTanques() {
  document.getElementById("app").innerHTML += `
    <h2>🐟 Gestão de Tanques</h2>
    <p>Aqui você vai cadastrar seus tanques</p>
  `;
}

function telaFinanceiro() {
  document.getElementById("app").innerHTML += `
    <h2>💰 Financeiro</h2>
    <p>Controle de custos e lucros</p>
  `;
}

function telaVendas() {
  document.getElementById("app").innerHTML += `
    <h2>🛒 Vendas</h2>
    <p>Registro de vendas de peixe</p>
  `;
}
