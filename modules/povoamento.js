
function povoarTanque(index) {
  let tanque = usuarioAtual.fazenda.tanques[index];

  let quantidade = Number(prompt("Quantidade de peixes"));
  let pesoMedio = Number(prompt("Peso médio inicial (kg)"));

  tanque.quantidade = quantidade;
  tanque.pesoMedio = pesoMedio;
  tanque.biomassa = quantidade * pesoMedio;

  atualizarUsuarioGlobal(usuarioAtual);
  telaTanques();
}
