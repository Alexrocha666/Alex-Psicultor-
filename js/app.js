const App = {
    navigate: function(pageId){
        document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
        document.getElementById(pageId).classList.add("active");
    }
};

document.addEventListener("DOMContentLoaded",function(){
    mostrarTanques();
    mostrarFinanceiro();
    mostrarDashboard();
});

function mostrarDashboard(){
    const area = document.getElementById("dashboardContent");
    area.innerHTML="";

    let totalEntrada=0;
    let totalSaida=0;

    lancamentos.forEach(l=>{
        if(l.tipo==="entrada"){ totalEntrada+=l.valor; }
        else{ totalSaida+=l.valor; }
    });

    const lucro=totalEntrada-totalSaida;

    area.innerHTML=`
        <div class="card">
            <h2>Resumo Geral</h2>
            <p>Entradas: R$ ${totalEntrada.toFixed(2)}</p>
            <p>Saídas: R$ ${totalSaida.toFixed(2)}</p>
            <p><strong>Lucro Líquido: R$ ${lucro.toFixed(2)}</strong></p>
        </div>
    `;
}
