function iniciarSistema() {
  document.getElementById("app").innerHTML = `
    <h1>🐟 Alex Psicultor PRO</h1>
    <p>Bem-vindo, ${usuarioAtual.nome}</p>
    <button onclick="logout()">Sair</button>
  `;
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  location.reload();
}

verificarLogin();
