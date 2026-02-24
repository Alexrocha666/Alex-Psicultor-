function telaVendas() {
  let vendas = usuarioAtual.fazenda.vendas;

  let html = `
    <h2>Vendas</h2>
    <input id="descricaoVenda" placeholder="Descrição">
    <input id="valorVenda" type="number" placeholder="Valor">
    <button onclick="addVenda()">Registrar</button>
    <hr>
  `;

  vendas.forEach((v, i) => {
    html += `
      <div class="card">
        ${v.descricao} - R$ ${v.valor}
        <button onclick="removerVenda(${i})">X</button>
      </div>
    `;
  });

  html += `<button onclick="iniciarSistema()">Voltar</button>`;

  document.getElementById("app").innerHTML = html;
}

function addVenda() {
  usuarioAtual.fazenda.vendas.push({
    descricao: descricaoVenda.value,
    valor: Number(valorVenda.value)
  });

  atualizarUsuarioGlobal(usuarioAtual);
  telaVendas();
}

function removerVenda(i) {
  usuarioAtual.fazenda.vendas.splice(i, 1);
  atualizarUsuarioGlobal(usuarioAtual);
  telaVendas();
}
