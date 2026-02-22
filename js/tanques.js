alert("Tanques PRO carregado");
// ===============================
// ALEX PSICULTOR PRO - TANQUES PRO
// ===============================

let tanques = JSON.parse(localStorage.getItem("tanques")) || [];

function salvarTanques() {
    localStorage.setItem("tanques", JSON.stringify(tanques));
}

function mostrarTanques() {
    const area = document.getElementById("tanquesContent");
    area.innerHTML = "";

    if (tanques.length === 0) {
        area.innerHTML = `
            <button onclick="novoTanque()" class="btn-add">+ Novo Tanque</button>
            <p style="text-align:center;opacity:0.7;">Nenhum tanque cadastrado.</p>
        `;
        return;
    }

    tanques.forEach((tanque, index) => {

        let cor = "green";

        if (tanque.historico.length > 1) {
            const ultimo = tanque.historico[tanque.historico.length - 1].peso;
            const anterior = tanque.historico[tanque.historico.length - 2].peso;

            if (ultimo > anterior) {
                cor = "green";
            } else if (ultimo === anterior) {
                cor = "orange";
            } else {
                cor = "red";
            }
        }

        area.innerHTML += `
            <div class="card">
                <h3>${tanque.nome}</h3>
                <p>Peixes: ${tanque.peixes}</p>
                <p>Peso médio: ${tanque.peso} g</p>
                <p><strong>Observações:</strong> ${tanque.observacoes || "Nenhuma"}</p>

                <div style="background:#ddd;height:10px;border-radius:5px;">
                    <div style="width:${tanque.peso / 10}%;height:10px;background:${cor};border-radius:5px;"></div>
                </div>

                <br>

                <button onclick="adicionarSemana(${index})">Passagem Semanal</button>
                <button onclick="editarObservacao(${index})">Observação</button>
                <button onclick="verHistorico(${index})">Histórico</button>
                <button onclick="removerTanque(${index})" class="btn-delete">Excluir</button>
            </div>
        `;
    });

    area.innerHTML += `<button onclick="novoTanque()" class="btn-add">+ Novo Tanque</button>`;
}

function novoTanque() {
    const nome = prompt("Nome do tanque:");
    const peixes = parseInt(prompt("Quantidade de peixes:"));
    const peso = parseFloat(prompt("Peso médio inicial (g):"));

    if (!nome || !peixes || !peso) return;

    tanques.push({
        nome,
        peixes,
        peso,
        observacoes: "",
        historico: [
            {
                semana: 1,
                peso: peso,
                data: new Date().toLocaleDateString()
            }
        ]
    });

    salvarTanques();
    mostrarTanques();
}

function adicionarSemana(index) {
    const novoPeso = parseFloat(prompt("Novo peso médio (g):"));
    if (!novoPeso) return;

    const tanque = tanques[index];

    tanque.peso = novoPeso;

    tanque.historico.push({
        semana: tanque.historico.length + 1,
        peso: novoPeso,
        data: new Date().toLocaleDateString()
    });

    salvarTanques();
    mostrarTanques();
}

function editarObservacao(index) {
    const obs = prompt("Digite a observação:");
    tanques[index].observacoes = obs;
    salvarTanques();
    mostrarTanques();
}

function verHistorico(index) {
    const tanque = tanques[index];

    let texto = "Histórico:\n\n";

    tanque.historico.forEach(item => {
        texto += `Semana ${item.semana} - ${item.peso}g - ${item.data}\n`;
    });

    alert(texto);
}

function removerTanque(index) {
    if (confirm("Excluir tanque?")) {
        tanques.splice(index, 1);
        salvarTanques();
        mostrarTanques();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    mostrarTanques();
});
