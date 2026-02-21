const Dashboard = {

  async render() {
    const container = document.getElementById("dashboardContent");

    const tanques = await db.tanques.toArray();
    const financeiro = await db.financeiro.toArray();

    const totalPeixes = tanques.reduce((acc,t)=>acc+t.quantidade,0);
    const entradas = financeiro.filter(f=>f.tipo==="entrada").reduce((a,b)=>a+b.valor,0);
    const saidas = financeiro.filter(f=>f.tipo==="saida").reduce((a,b)=>a+b.valor,0);
    const lucro = entradas - saidas;

    container.innerHTML = `
      <div class="card">
        <h2>Resumo Geral</h2>
        Tanques: ${tanques.length}<br>
        Total Peixes: ${totalPeixes}<br>
        Lucro: R$ ${lucro.toFixed(2)}
      </div>
    `;
  }

};
