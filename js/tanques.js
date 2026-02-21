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
        <input id="metaPeso" type="number" placeholder="Meta de peso (g)">
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

      let pesoAtual = t.pesoInicial;

      if (pesagens.length > 0) {
        pesoAtual = pesagens[pesagens.length - 1].pesoMedio;
      }

      const ganhoTotal = pesoAtual - t.pesoInicial;

      html += `
        <div class="card">
          <strong>${t.nome}</strong><br>
          Espécie: ${t.especie}<br>
          Peixes: ${t.quantidade}<br>
          Peso Atual: ${pesoAtual}g<br>
          Ganho Total: ${ganhoTotal}g<br>
          Meta: ${t.metaPeso}g<br><br>

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
    await db.tanques.delete(id);
    Tanques.render();
  }

};
