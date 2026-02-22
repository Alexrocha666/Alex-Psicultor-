function adicionarLancamento(){

    let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

    const tipo = prompt("entrada ou saída?");
    const descricao = prompt("Descrição:");
    const valor = parseFloat(prompt("Valor:"));

    if(!tipo || !descricao || isNaN(valor)){
        alert("Dados inválidos!");
        return;
    }

    lancamentos.push({
        tipo: tipo.toLowerCase(),
        descricao,
        valor
    });

    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));

    mostrarFinanceiro();
    mostrarDashboard();
}

function mostrarFinanceiro(){

    const area = document.getElementById("areaFinanceiro");
    let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

    area.innerHTML="";

    if(lancamentos.length===0){
        area.innerHTML="<p>Nenhum lançamento.</p>";
        return;
    }

    lancamentos.forEach(l=>{
        area.innerHTML+=`
            <div class="card">
                <strong>${l.descricao}</strong>
                <p>${l.tipo} - R$ ${l.valor.toFixed(2)}</p>
            </div>
        `;
    });
}
