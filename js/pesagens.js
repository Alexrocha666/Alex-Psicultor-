const Pesagens = {

  async adicionar(tanqueId) {

    const dataInput = prompt("Data da pesagem (ex: 21/02/2026)");
    const amostragem = prompt("Quantos peixes foram pesados?");
    const pesoMedio = prompt("Peso médio (g)?");

    if (!dataInput || !pesoMedio) return;

    const partes = dataInput.split("/");
    const dataFormatada = new Date(
      partes[2],
      partes[1] - 1,
      partes[0]
    );

    const tanque = await db.tanques.get(tanqueId);

    const pesagens = await db.pesagens
      .where("tanqueId")
      .equals(tanqueId)
      .toArray();

    pesagens.sort((a,b) => new Date(a.data) - new Date(b.data));

    let pesoAnterior = tanque.pesoInicial;

    if (pesagens.length > 0) {
      pesoAnterior = pesagens[pesagens.length - 1].pesoMedio;
    }

    const ganho = parseFloat(pesoMedio) - pesoAnterior;

    await db.pesagens.add({
      tanqueId,
      amostragem: parseInt(amostragem),
      pesoMedio: parseFloat(pesoMedio),
      ganho: ganho,
      data: dataFormatada
    });

    Tanques.render();
  },

  async editar(id) {

    const pesagem = await db.pesagens.get(id);

    const novoPeso = prompt("Novo peso médio (g):", pesagem.pesoMedio);
    if (!novoPeso) return;

    await db.pesagens.update(id, {
      pesoMedio: parseFloat(novoPeso)
    });

    Tanques.render();
  },

  async remover(id) {

    if (!confirm("Excluir esta pesagem?")) return;

    await db.pesagens.delete(id);

    Tanques.render();
  }

};
