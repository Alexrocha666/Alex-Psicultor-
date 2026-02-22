const App = {
    navigate: function(pageId){
        document.querySelectorAll(".page").forEach(p=>{
            p.classList.remove("active");
        });
        document.getElementById(pageId).classList.add("active");
    }
};

document.addEventListener("DOMContentLoaded",()=>{
    if(typeof mostrarTanques === "function") mostrarTanques();
    if(typeof mostrarFinanceiro === "function") mostrarFinanceiro();
    mostrarDashboard();
});

function mostrarDashboard(){
    const area = document.getElementById("dashboardContent");

    const lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

    let entrada=0;
    let saida=0;

    lancamentos.forEach(l=>{
        if(l.tipo==="entrada") entrada+=l.valor;
        else saida+=l.valor;
    });

    const lucro=entrada-saida;

    area.innerHTML=`
        <div class="card">
            <h2>Resumo Geral</h2>
            <p>Entradas: R$ ${entrada.toFixed(2)}</p>
            <p>Saídas: R$ ${saida.toFixed(2)}</p>
            <p><strong>Lucro: R$ ${lucro.toFixed(2)}</strong></p>
        </div>
    `;
}
