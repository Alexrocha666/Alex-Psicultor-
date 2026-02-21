const Pesagens = {

  async adicionar(tanqueId) {

    const amostragem = prompt("Quantos peixes foram pesados?");
    const pesoMedio = prompt("Peso médio (g)?");

    if (!amostragem || !pesoMedio) return;

    const tanque = await db.tanques.get(tanqueId);

    const pesagens = await db.pesagens
      .where("tanqueId")
      .equals(tanqueId)
      .toArray();

    let pesoAnterior = tanque.pesoInicial;

    if (pesagens.length > 0) {
      pesoAnterior = pesagens[pesagens.length - 1].pesoMedio;
    }

    const ganho = pesoMedio - pesoAnterior;

    await db.pesagens.add({
      tanqueId,
      amostragem: parseInt(amostragem),
      pesoMedio: parseFloat(pesoMedio),
      ganho: ganho,
      data: new Date()
    });

    Tanques.render();
  }

};
