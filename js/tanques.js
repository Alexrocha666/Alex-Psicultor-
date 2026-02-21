const Tanques = {

  async render() {
    const container = document.getElementById("tanquesContent");
    const lista = await db.tanques.toArray();

    let html = `
      <div class="card">
        <h2>Novo Tanque</h2>
        <input id="nome" placeholder="Nome do tanque">
        <input id="especie" placeholder="Espécie">
        <input id="quantidade" type="number" placeholder="Quantidade">
        <input id="pesoInicial" type="number" placeholder="Peso inicial (g)">
        <input id="metaPeso" type="number" placeholder="Meta de peso final (g)">
        <input id="mesesMeta" type="number" placeholder="Meta em quantos meses? (ex: 6)">
        <button onclick="Tanques.add()">Salvar Tanque</button>
      </div>
    `;

    if (lista.length === 0) {
      html += `<div class="card">Nenhum tanque cadastrado.</div>`;
      container.innerHTML = html;
      return;
    }

    for (let t of lista) {

      const pesagens = await db.pesagens
        .where("tanqueId")
        .equals(t.id)
        .toArray();

      let pesoAtual = t.pesoInicial || 0;

      if (pesagens.length > 0) {
        pesoAtual = pesagens[pesagens.length - 1].pesoMedio;
      }

      const hoje = new Date();
      const dataInicial = new Date(t.dataPovoamento);
      const diasPassados = (hoje - dataInicial) / (1000 * 60 * 60 * 24);
      const mesesPassados = diasPassados / 30;

      const ganhoTotal = pesoAtual - t.pesoInicial;
      const ganhoMensalAtual = mesesPassados > 0
        ? ganhoTotal / mesesPassados
        : 0;

      const metaPeso = t.metaPeso || 0;
      const mesesMeta = t.mesesMeta || 6; // padrão automático

      const faltaParaMeta = metaPeso - pesoAtual;
      const mesesRestantes = mesesMeta - mesesPassados;

      const necessarioPorMes = mesesRestantes > 0
        ? faltaParaMeta / mesesRestantes
        : 0;

      const biomassaKg = (pesoAtual * t.quantidade) / 1000;

      let status = "Dentro da média";

      if (ganhoMensalAtual < necessarioPorMes) {
        status = "⚠️ Crescimento abaixo da meta";
      } else if (ganhoMensalAtual > necessarioPorMes) {
        status = "🚀 Acima da meta";
      }

      html += `
        <div class="card">
          <strong>${t.nome}</strong><br>
          Espécie: ${t.especie}<br>
          Peixes: ${t.quantidade}<br><br>

          Peso Atual: ${pesoAtual.toFixed(2)} g<br>
          Ganho Total: ${ganhoTotal.toFixed(2)} g<br>
          Meta Final: ${metaPeso} g<br>
          Falta para Meta: ${faltaParaMeta.toFixed(2)} g<br><br>

          📅 Meses Passados: ${mesesPassados.toFixed(1)}<br>
          📈 Ganho Médio Mensal: ${ganhoMensalAtual.toFixed(2)} g<br>
          🎯 Necessário por Mês: ${necessarioPorMes.toFixed(2)} g<br><br>

          🐟 Biomassa Total: ${biomassaKg.toFixed(2)} kg<br>
          Status: ${status}<br><br>

          <button onclick="Pesagens.adicionar(${t.id})">
            Registrar Pesagem
          </button>

          <button onclick="Tanques.remove(${t.id})">
            Excluir
          </button>
        </div>
      `;
    }

    container.innerHTML = html;
  },

  async add() {
    const nome = document.getElementById("nome").value;
    const especie = document.getElementById("especie").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const pesoInicial = parseFloat(document.getElementById("pesoInicial").value);
    const metaPeso = parseFloat(document.getElementById("metaPeso").value);
    const mesesMeta = parseFloat(document.getElementById("mesesMeta").value) || 6;

    if (!nome || !especie || !quantidade || !pesoInicial || !metaPeso) {
      alert("Preencha todos os campos");
      return;
    }

    await db.tanques.add({
      nome,
      especie,
      quantidade,
      pesoInicial,
      metaPeso,
      mesesMeta,
      dataPovoamento: new Date()
    });

    Tanques.render();
  },

  async remove(id) {
    await db.tanques.delete(id);
    Tanques.render();
  }

};
