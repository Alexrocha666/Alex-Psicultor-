function telaDashboard() {
  let tanques = usuarioAtual.fazenda.tanques;
  let financeiro = usuarioAtual.fazenda.financeiro;
  let vendas = usuarioAtual.fazenda.vendas;

  let totalInvestido = financeiro.reduce((acc, l) => acc + Number(l.valor), 0);
  let totalVendas = vendas.reduce((acc, v) => acc + Number(v.valor), 0);

  let biomassaTotal = 0;
  tanques.forEach(t => {
    if (t.biomassa) biomassaTotal += t.biomassa;
  });

  let lucro = totalVendas - totalInvestido;

  document.getElementById("app").innerHTML = `
    <h2>Dashboard</h2>

    <div class="card">
      <strong>Tanques:</strong> ${tanques.length}
    </div>

    <div class="card">
      <strong>Biomassa Total:</strong> ${biomassaTotal.toFixed(2)} kg
    </div>

    <div class="card">
      <strong>Total Investido:</strong> R$ ${totalInvestido.toFixed(2)}
    </div>

    <div class="card">
      <strong>Total Vendas:</strong> R$ ${totalVendas.toFixed(2)}
    </div>

    <div class="card">
      <strong>Lucro Estimado:</strong> R$ ${lucro.toFixed(2)}
    </div>

    <button onclick="iniciarSistema()">Voltar</button>
  `;
}
