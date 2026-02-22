
let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

function salvarLancamentos(){
    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));
}

function adicionarLancamento(){
    const tipo = prompt("Digite: entrada ou saída");
    const descricao = prompt("Descrição:");
    const valor = parseFloat(prompt("Valor (R$):"));
    const data = new Date().toLocaleDateString();

    if(!tipo || !descricao || !valor){
        alert("Preencha corretamente!");
        return;
    }

    lancamentos.push({
        tipo: tipo.toLowerCase(),
        descricao,
        valor,
        data
    });

    salvarLancamentos();
    mostrarFinanceiro();
    mostrarDashboard();
}

function mostrarFinanceiro(){
    const area = document.getElementById("areaFinanceiro");
    area.innerHTML = "";

    if(lancamentos.length === 0){
        area.innerHTML = "<p>Nenhum lançamento registrado.</p>";
        return;
    }

    let totalEntrada = 0;
    let totalSaida = 0;

    lancamentos.forEach(l => {
        if(l.tipo === "entrada"){
            totalEntrada += l.valor;
        } else {
            totalSaida += l.valor;
        }

        area.innerHTML += `
        <div class="card">
            <p><strong>${l.descricao}</strong></p>
            <p>Tipo: ${l.tipo}</p>
            <p>Valor: R$ ${l.valor.toFixed(2)}</p>
            <p>Data: ${l.data}</p>
        </div>
        `;
    });

    const lucro = totalEntrada - totalSaida;

    area.innerHTML += `
    <div class="card">
        <h3>Resumo</h3>
        <p>Entradas: R$ ${totalEntrada.toFixed(2)}</p>
        <p>Saídas: R$ ${totalSaida.toFixed(2)}</p>
        <p><strong>Lucro Líquido: R$ ${lucro.toFixed(2)}</strong></p>
    </div>
    `;

    atualizarGraficoFinanceiro(totalEntrada, totalSaida);
}

function atualizarGraficoFinanceiro(entrada, saida){
    const ctx = document.getElementById("graficoFinanceiro");

    if(window.graficoFinanceiro){
        window.graficoFinanceiro.destroy();
    }

    window.graficoFinanceiro = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Entradas", "Saídas"],
            datasets: [{
                label: "Financeiro",
                data: [entrada, saida]
            }]
        }
    });
}
