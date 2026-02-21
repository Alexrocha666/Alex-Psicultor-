const Pesagens = {

  async adicionar(tanqueId) {
    const peso = parseFloat(prompt("Digite o peso médio atual (g):"));
    if (!peso) return;

    await db.pesagens.add({
      tanqueId,
      data: new Date(),
      pesoMedio: peso
    });

    Tanques.render();
  },

  async listar(tanqueId) {
    return await db.pesagens
      .where("tanqueId")
      .equals(tanqueId)
      .toArray();
  }

};
