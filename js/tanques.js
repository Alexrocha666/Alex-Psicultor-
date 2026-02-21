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
      container.innerHTML = html;
      return;
    }

    for (let t of lista) {

      const pesagens = await db.pesagens
        .where("tanqueId")
        .equals(t.id)
        .toArray();

      pesagens.sort((a,b) => new Date(a.data) - new Date(b.data));

      let pesoAtual = t.pesoInicial;
      if (pesagens.length > 0) {
        pesoAtual = pesagens[pesagens.length - 1].pesoMedio;
      }

      const hoje = new Date();
      const dataInicial = new Date(t.dataPovoamento);
      const diasPassados = (hoje - dataInicial) / (1000 * 60 * 60 * 24);
      const semanasPassadas = diasPassados / 7;
      const mesesPassados = diasPassados / 30;

      const ganhoTotal = pesoAtual - t.pesoInicial;

      const ganhoSemanalReal = semanasPassadas >= 1
        ? ganhoTotal / semanasPassadas
        : 0;

      const metaPeso = t.metaPeso || 0;
      const mesesMeta = t.mesesMeta || 6;

      const semanasMeta = mesesMeta * 4;
      const semanasRestantes = semanasMeta - semanasPassadas;

      const faltaParaMeta = metaPeso - pesoAtual;

      const necessarioPorSemana = semanasRestantes > 0
        ? faltaParaMeta / semanasRestantes
        : 0;

      const necessarioPorMes = mesesMeta > 0
        ? faltaParaMeta / (mesesMeta - mesesPassados)
        : 0;

      const biomassaKg = (pesoAtual * t.quantidade) / 1000;

      const percentual = metaPeso > 0
        ? (pesoAtual / metaPeso) * 100
        : 0;

      let status = "✅ Dentro da meta";

      if (ganhoSemanalReal < necessarioPorSemana) {
        status = "⚠️ Abaixo da meta";
      } else if (ganhoSemanalReal > necessarioPorSemana) {
        status = "🚀 Acima da meta";
      }

      html += `
      <div class="card">

        <h3>${t.nome}</h3>
        Espécie: ${t.especie} <br>
        Peixes: ${t.quantidade}

        <hr>

        <h4>📊 Situação Atual</h4>
        Peso Atual: ${pesoAtual.toFixed(2)} g<br>
        Ganho Total: ${ganhoTotal.toFixed(2)} g<br>
        Biomassa: ${biomassaKg.toFixed(2)} kg

        <div style="background:#1e3a5f;border-radius:10px;overflow:hidden;margin-top:8px;">
          <div style="
              width:${percentual}%;
              background:#4caf50;
              padding:6px;
              text-align:center;
              font-size:12px;
              color:white;">
            ${percentual.toFixed(1)}%
          </div>
        </div>

        <hr>

        <h4>🎯 Meta</h4>
        Meta Final: ${metaPeso} g<br>
        Falta: ${faltaParaMeta.toFixed(2)} g<br>
        Necessário / mês: ${necessarioPorMes.toFixed(2)} g<br>
        Necessário / semana: ${necessarioPorSemana.toFixed(2)} g

        <hr>

        <h4>📈 Desempenho</h4>
        Semanas passadas: ${semanasPassadas.toFixed(1)}<br>
        Ritmo atual / semana: ${ganhoSemanalReal.toFixed(2)} g<br>
        Status: ${status}

        <hr>

        <h4>📅 Histórico</h4>
        <table style="width:100%;font-size:12px;">
          <tr>
            <th>Data</th>
            <th>Peso</th>
            <th>Ganho</th>
          </tr>
          ${pesagens.map(p => `
            <tr>
              <td>${new Date(p.data).toLocaleDateString()}</td>
              <td>${p.pesoMedio} g</td>
              <td>${p.ganho.toFixed(2)} g</td>
            </tr>
          `).join("")}
        </table>

        <br>

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
    await db.pesagens.where("tanqueId").equals(id).delete();
    Tanques.render();
  }

};
