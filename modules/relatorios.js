// ===============================
// ALEX PSICULTOR - RELATORIOS
// ===============================

function renderRelatorios() {

    let usuariosParaCalcular = [];

    if (usuarioLogado.tipo === "admin" && modoVisualizacao === "todos") {
        usuariosParaCalcular = obterUsuarios();
    } else {
        usuariosParaCalcular = [usuarioLogado];
    }

    let totalKg = 0;
    let faturamento = 0;
    let totalVendas = 0;

    usuariosParaCalcular.forEach(user => {
        user.vendas.forEach(v => {
            totalKg += Number(v.kg);
            faturamento += Number(v.total);
            totalVendas++;
        });
    });

    let html = `
        <div class="card">
            <h2>Relatório Financeiro</h2>
            <p><strong>Total de Vendas:</strong> ${totalVendas}</p>
            <p><strong>Total Kg Vendido:</strong> ${totalKg} kg</p>
            <p><strong>Faturamento Total:</strong> R$ ${faturamento.toFixed(2)}</p>
        </div>

        <div class="card">
            <button class="btn-primary" onclick="gerarBackupExcel(${usuarioLogado.tipo === 'admin' && modoVisualizacao === 'todos'})">
                Gerar Backup Excel
            </button>
        </div>
    `;

    document.getElementById("conteudo").innerHTML = html;
}
