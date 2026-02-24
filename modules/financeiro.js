function telaFinanceiro() {
  let financeiro = usuarioAtual.fazenda.financeiro;

  let html = `
    <h2>Financeiro</h2>
    <input id="descricao" placeholder="Descrição">
    <input id="valor" type="number" placeholder="Valor">
    <button onclick="addLancamento()">Adicionar</button>
    <hr>
  `;

  financeiro.forEach((f, i) => {
    html += `
      <div class="card">
        ${f.descricao} - R$ ${f.valor}
        <button onclick="removerLancamento(${i})">X</button>
      </div>
    `;
  });

  html += `<button onclick="iniciarSistema()">Voltar</button>`;

  document.getElementById("app").innerHTML = html;
}

function addLancamento() {
  usuarioAtual.fazenda.financeiro.push({
    descricao: descricao.value,
    valor: Number(valor.value)
  });

  atualizarUsuarioGlobal(usuarioAtual);
  telaFinanceiro();
}

function removerLancamento(i) {
  usuarioAtual.fazenda.financeiro.splice(i, 1);
  atualizarUsuarioGlobal(usuarioAtual);
  telaFinanceiro();
}
