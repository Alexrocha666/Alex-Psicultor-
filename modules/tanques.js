function telaTanques() {
  let tanques = usuarioAtual.fazenda.tanques;

  let html = `
    <h2>Gestão de Tanques</h2>

    <input id="nomeTanque" placeholder="Nome">
    <input id="areaTanque" type="number" placeholder="Área m²">
    <input id="profundidadeTanque" type="number" placeholder="Profundidade m">
    <button onclick="adicionarTanque()">Adicionar</button>
    <hr>
  `;

  tanques.forEach((t, i) => {
    html += `
      <div class="card">
        <strong>${t.nome}</strong><br>
        Área: ${t.area} m²<br>
        Profundidade: ${t.profundidade} m<br>
        Volume: ${t.volume} m³<br>
        Peixes: ${t.quantidade || 0}<br>
        Peso Médio: ${t.pesoMedio || 0} kg<br>
        Biomassa: ${t.biomassa || 0} kg<br>
        <button onclick="removerTanque(${i})">Remover</button>
      </div>
    `;
  });

  html += `<button onclick="iniciarSistema()">Voltar</button>`;

  document.getElementById("app").innerHTML = html;
}

function adicionarTanque() {
  let nome = nomeTanque.value;
  let area = Number(areaTanque.value);
  let profundidade = Number(profundidadeTanque.value);

  if (!nome || !area || !profundidade) return alert("Preencha tudo");

  let volume = area * profundidade;

  usuarioAtual.fazenda.tanques.push({
    id: Date.now(),
    nome,
    area,
    profundidade,
    volume,
    quantidade: 0,
    pesoMedio: 0,
    biomassa: 0
  });

  atualizarUsuarioGlobal(usuarioAtual);
  telaTanques();
}

function removerTanque(i) {
  usuarioAtual.fazenda.tanques.splice(i, 1);
  atualizarUsuarioGlobal(usuarioAtual);
  telaTanques();
}
