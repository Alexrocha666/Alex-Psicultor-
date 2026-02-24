function iniciarSistema() {
  document.getElementById("app").innerHTML = `
    <h1>🐟 Alex Psicultor PRO</h1>
    <p>Bem-vindo, ${usuarioAtual.nome}</p>

    <button onclick="telaDashboard()">Dashboard</button>
    <button onclick="telaTanques()">Tanques</button>
    <button onclick="telaFinanceiro()">Financeiro</button>
    <button onclick="telaVendas()">Vendas</button>
    <button onclick="logout()">Sair</button>
    <hr>
  `;
}

verificarLogin();
