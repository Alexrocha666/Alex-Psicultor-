// ===============================
// ALEX PSICULTOR - TANQUES MODULE
// ===============================

function renderTanques() {

    const user = usuarioLogado;

    let html = `
        <div class="card">
            <h2>Cadastro de Tanques</h2>
            <input type="text" id="tanqueNome" placeholder="Nome do tanque">
            <input type="number" id="tanqueQtd" placeholder="Quantidade de peixes">
            <input type="number" id="tanquePeso" placeholder="Peso médio (kg)">
            <button class="btn-success" onclick="adicionarTanque()">Adicionar Tanque</button>
        </div>

        <div class="card">
            <h2>Lista de Tanques</h2>
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Peixes</th>
                    <th>Peso Médio</th>
                    <th>Ações</th>
                </tr>
    `;

    user.tanques.forEach((t, index) => {
        html += `
            <tr>
                <td>${t.nome}</td>
                <td>${t.quantidade}</td>
                <td>${t.peso}</td>
                <td>
                    <button class="btn-danger" onclick="excluirTanque(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });

    html += `</table></div>`;

    document.getElementById("conteudo").innerHTML = html;
}

function adicionarTanque() {

    const nome = document.getElementById("tanqueNome").value.trim();
    const quantidade = document.getElementById("tanqueQtd").value;
    const peso = document.getElementById("tanquePeso").value;

    if (!nome || !quantidade || !peso) {
        alert("Preencha todos os campos");
        return;
    }

    usuarioLogado.tanques.push({
        nome,
        quantidade,
        peso,
        data: new Date().toLocaleDateString()
    });

    atualizarUsuario(usuarioLogado);
    renderTanques();
}

function excluirTanque(index) {

    if (!confirm("Excluir este tanque?")) return;

    usuarioLogado.tanques.splice(index, 1);
    atualizarUsuario(usuarioLogado);
    renderTanques();
}
