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

      const ganhoTotal = pesoAtual - t.pesoInicial;
      const metaPeso = t.metaPeso || 0;
      const faltaParaMeta = metaPeso - pesoAtual;
      const biomassaKg = (pesoAtual * t.quantidade) / 1000;

      const percentual = metaPeso > 0
        ? (pesoAtual / metaPeso) * 100
        : 0;

      let status = "⚠️ Ainda falta crescer";

      if (faltaParaMeta <= 0) {
        status = "🚀 Meta atingida";
      }

      html += `
      <div class="card">

        <h3>${t.nome}</h3>
        Espécie: ${t.especie}<br>
        Peixes: ${t.quantidade}

        <hr>

        <h4>📊 Situação Atual</h4>
        Peso Atual: ${pesoAtual.toFixed(0)} g<br>
        Ganho Total: ${ganhoTotal.toFixed(0)} g<br>
        Biomassa: ${biomassaKg.toFixed(1)} kg

        <div style="background:#1e3a5f;border-radius:10px;overflow:hidden;margin-top:8px;">
          <div style="
              width:${percentual}%;
              background:#4caf50;
              padding:6px;
              text-align:center;
              font-size:12px;
              color:white;">
            ${percentual.toFixed(0)}%
          </div>
        </div>

        <hr>

        <h4>🎯 Meta</h4>
        Meta Final: ${metaPeso} g<br>
        Falta: ${faltaParaMeta.toFixed(0)} g<br>
        Status: ${status}

        <hr>

        <h4>📅 Histórico</h4>
        <table style="width:100%;font-size:12px;">
          <tr>
            <th>Data</th>
            <th>Peso</th>
            <th>Ganho</th>
            <th>Ações</th>
          </tr>
          ${pesagens.map(p => `
            <tr>
              <td>${new Date(p.data).toLocaleDateString()}</td>
              <td>${p.pesoMedio.toFixed(0)} g</td>
              <td>${p.ganho.toFixed(0)} g</td>
              <td>
                <button onclick="Pesagens.editar(${p.id})">✏️</button>
                <button onclick="Pesagens.remover(${p.id})">🗑️</button>
              </td>
            </tr>
          `).join("")}
        </table>

        <br>

        <button onclick="Pesagens.adicionar(${t.id})">
          Registrar Pesagem
        </button>

        <button onclick="Tanques.remove(${t.id})">
          Excluir Tanque
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
      dataPovoamento: new Date()
    });

    Tanques.render();
  },

  async remove(id) {

    if (!confirm("Excluir tanque e histórico?")) return;

    await db.tanques.delete(id);
    await db.pesagens.where("tanqueId").equals(id).delete();

    Tanques.render();
  }

};
