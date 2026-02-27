// ===============================
// MÓDULO TANQUES PROFISSIONAL
// ===============================

function renderTanques() {

    const tanques = storage.get("tanques") || [];

    document.getElementById("conteudo").innerHTML = `
        <h2>Controle de Tanques</h2>

        <div class="card">
            <input id="nomeTanque" placeholder="Nome do Tanque">
            <input id="especie" placeholder="Espécie do Peixe">
            <input type="date" id="dataPovoamento">
            <input type="number" id="quantidadeInicial" placeholder="Quantidade Inicial">
            <input type="number" id="pesoMedio" placeholder="Peso Médio Atual (g)">
            <input type="number" id="mortalidade" placeholder="Mortalidade">
            <textarea id="observacoes" placeholder="Observações"></textarea>
            <button class="btn-primary" onclick="salvarTanque()">Salvar Tanque</button>
        </div>

        <div id="listaTanques"></div>
    `;

    listarTanques();
}

function salvarTanque() {

    const nome = document.getElementById("nomeTanque").value;
    const especie = document.getElementById("especie").value;
    const data = document.getElementById("dataPovoamento").value;
    const quantidadeInicial = parseInt(document.getElementById("quantidadeInicial").value);
    const pesoMedio = parseFloat(document.getElementById("pesoMedio").value);
    const mortalidade = parseInt(document.getElementById("mortalidade").value) || 0;
    const observacoes = document.getElementById("observacoes").value;

    if (!nome || !quantidadeInicial || !pesoMedio) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    const quantidadeAtual = quantidadeInicial - mortalidade;
    const biomassa = (quantidadeAtual * pesoMedio) / 1000;

    const novoTanque = {
        id: Date.now(),
        usuario: usuarioLogado.email,
        nome,
        especie,
        data,
        quantidadeInicial,
        pesoMedio,
        mortalidade,
        quantidadeAtual,
        biomassa,
        observacoes
    };

    const tanques = storage.get("tanques") || [];
    tanques.push(novoTanque);
    storage.set("tanques", tanques);

    alert("Tanque salvo com sucesso!");
    renderTanques();
}

function listarTanques() {

    const tanques = storage.get("tanques") || [];

    let filtrados = tanques.filter(t =>
        modoVisualizacao === "todos" ||
        t.usuario === usuarioLogado.email
    );

    let html = "";

    filtrados.forEach(t => {

        html += `
            <div class="card">
                <h3>${t.nome}</h3>
                <p><strong>Espécie:</strong> ${t.especie}</p>
                <p><strong>Quantidade Atual:</strong> ${t.quantidadeAtual}</p>
                <p><strong>Peso Médio:</strong> ${t.pesoMedio} g</p>
                <p><strong>Biomassa:</strong> ${t.biomassa.toFixed(2)} kg</p>
                <p><strong>Mortalidade:</strong> ${t.mortalidade}</p>
                <button class="btn-danger" onclick="excluirTanque(${t.id})">Excluir</button>
            </div>
        `;
    });

    document.getElementById("listaTanques").innerHTML = html;
}

function excluirTanque(id) {

    let tanques = storage.get("tanques") || [];
    tanques = tanques.filter(t => t.id !== id);

    storage.set("tanques", tanques);

    renderTanques();
}
