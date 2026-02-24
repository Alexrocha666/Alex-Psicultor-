function salvar(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

function carregar(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}

function atualizarUsuarioGlobal(usuarioAtual) {
  let usuarios = carregar("usuarios");
  let index = usuarios.findIndex(u => u.id === usuarioAtual.id);
  usuarios[index] = usuarioAtual;
  salvar("usuarios", usuarios);
  salvar("usuarioLogado", usuarioAtual);
}
