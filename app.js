// ===============================
// ALEX PSICULTOR - APP PRINCIPAL
// ===============================

let modoVisualizacao = "individual";

function renderApp() {

    let seletorAdmin = "";

    if (usuarioLogado.tipo === "admin") {

        let opcoes = `<option value="individual">Meus Dados</option>
                      <option value="todos">Todos Usuários</option>`;

        seletorAdmin = `
            <select onchange="alterarModo(this.value)">
                ${opcoes}
            </select>
            <button class="btn-warning" onclick="criarUsuario()">Novo Usuário</button>
        `;
    }

    document.getElementById("app").innerHTML = `
        <div class="navbar">
            <h1>Alex Psicultor</h1>
            <div class="nav-buttons">
                ${seletorAdmin}
                <button class="btn-primary" onclick="renderTanques()">Tanques</button>
                <button class="btn-primary" onclick="renderVendas()">Vendas</button>
                <button class="btn-primary" onclick="renderRelatorios()">Relatórios</button>
                <button class="btn-danger" onclick="logout()">Sair</button>
            </div>
        </div>
        <div id="conteudo"></div>
    `;

    renderRelatorios();
}

function alterarModo(valor) {
    modoVisualizacao = valor;
    renderRelatorios();
}

// Inicialização
verificarSessao();
