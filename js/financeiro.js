// ===============================
// ALEX PSICULTOR PRO - FINANCEIRO
// ===============================

let financeiro = JSON.parse(localStorage.getItem("financeiro")) || [];

// Salvar
function salvarFinanceiro() {
    localStorage.setItem("financeiro", JSON.stringify(financeiro));
}

// Mostrar lançamentos
function mostrarFinanceiro() {
    const area = document.getElementById("financeiroContent");
    area.innerHTML = "";

    if (financeiro.length === 0) {
        area.innerHTML = `
            <button onclick="novoLancamento()" class="btn-add">
                + Novo Lançamento
            </button>
            <p style="text-align:center;opacity:0.7;">Nenhum lançamento ainda.</p>
        `;
        return;
    }

    let totalEntradas = 0;
    let totalSaidas = 0;

    financeiro.forEach((item, index) => {

        if (item.tipo === "entrada") {
            totalEntradas += item.valor;
        } else {
            totalSaidas += item.valor;
        }

        area.innerHTML += `
            <div class="card">
                <strong>${item.descricao}</strong><br>
                ${item.tipo} - R$ ${item.valor.toFixed(2)}
                <br><br>
                <button onclick="removerLancamento(${index})" class="btn-delete">
                    Excluir
                </button>
            </div>
        `;
    });

    const lucro = totalEntradas - totalSaidas;

    area.innerHTML += `
        <div class="card resumo">
            <h3>Resumo Geral</h3>
            <p>Entradas: R$ ${totalEntradas.toFixed(2)}</p>
            <p>Saídas: R$ ${totalSaidas.toFixed(2)}</p>
            <p><strong>Lucro: R$ ${lucro.toFixed(2)}</strong></p>
        </div>

        <button onclick="novoLancamento()" class="btn-add">
            + Novo Lançamento
        </button>
    `;
}

// Novo lançamento
function novoLancamento() {
    const descricao = prompt("Descrição:");
    const valor = parseFloat(prompt("Valor:"));
    const tipo = prompt("Digite: entrada ou saida");

    if (!descricao || !valor || !tipo) {
        alert("Preencha corretamente.");
        return;
    }

    if (tipo !== "entrada" && tipo !== "saida") {
        alert("Digite apenas: entrada ou saida");
        return;
    }

    financeiro.push({
        descricao,
        valor,
        tipo
    });

    salvarFinanceiro();
    mostrarFinanceiro();
}

// Remover lançamento
function removerLancamento(index) {
    if (confirm("Excluir lançamento?")) {
        financeiro.splice(index, 1);
        salvarFinanceiro();
        mostrarFinanceiro();
    }
}

// Inicializar
document.addEventListener("DOMContentLoaded", function () {
    mostrarFinanceiro();
});
