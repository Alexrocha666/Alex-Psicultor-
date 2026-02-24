// ===============================
// ALEX PSICULTOR - VENDAS MODULE
// ===============================

function renderVendas() {

    const user = usuarioLogado;

    let opcoesTanques = "";
    user.tanques.forEach(t => {
        opcoesTanques += `<option value="${t.nome}">${t.nome}</option>`;
    });

    let html = `
        <div class="card">
            <h2>Registrar Venda</h2>
            <input type="text" id="vendaCliente" placeholder="Nome do cliente">
            <select id="vendaTanque">${opcoesTanques}</select>
            <input type="number" id="vendaKg" placeholder="Kg vendidos">
            <input type="number" id="vendaValorKg" placeholder="Valor por Kg">
            <button class="btn-success" onclick="adicionarVenda()">Registrar</button>
        </div>

        <div class="card">
            <h2>Lista de Vendas</h2>
            <table>
                <tr>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Tanque</th>
                    <th>Kg</th>
                    <th>Total</th>
                    <th>Ações</th>
                </tr>
    `;

    user.vendas.forEach((v, index) => {
        html += `
            <tr>
                <td>${v.data}</td>
                <td>${v.cliente}</td>
                <td>${v.tanque}</td>
                <td>${v.kg}</td>
                <td>R$ ${v.total}</td>
                <td>
                    <button class="btn-warning" onclick="gerarNotaPDF(${JSON.stringify(v).replace(/"/g, '&quot;')})">PDF</button>
                    <button class="btn-danger" onclick="excluirVenda(${index})">Excluir</button>
                </td>
            </tr>
        `;
    });

    html += `</table></div>`;

    document.getElementById("conteudo").innerHTML = html;
}

function adicionarVenda() {

    const cliente = document.getElementById("vendaCliente").value.trim();
    const tanque = document.getElementById("vendaTanque").value;
    const kg = Number(document.getElementById("vendaKg").value);
    const valorKg = Number(document.getElementById("vendaValorKg").value);

    if (!cliente || !tanque || !kg || !valorKg) {
        alert("Preencha todos os campos");
        return;
    }

    const total = kg * valorKg;

    const venda = {
        data: new Date().toLocaleDateString(),
        cliente,
        tanque,
        kg,
        valorKg,
        total
    };

    usuarioLogado.vendas.push(venda);

    atualizarUsuario(usuarioLogado);
    renderVendas();
}

function excluirVenda(index) {

    if (!confirm("Excluir esta venda?")) return;

    usuarioLogado.vendas.splice(index, 1);
    atualizarUsuario(usuarioLogado);
    renderVendas();
}
