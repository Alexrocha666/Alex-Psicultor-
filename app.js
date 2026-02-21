let tanques = JSON.parse(localStorage.getItem("tanques")) || [];
let despesas = JSON.parse(localStorage.getItem("despesas")) || [];
let receitas = JSON.parse(localStorage.getItem("receitas")) || [];

function salvarTanque() {
let nome = nomeTanque.value;
let qtd = Number(qtdPeixes.value);
let peso = Number(pesoMedio.value);

let biomassa = qtd * peso;

tanques.push({nome,qtd,peso,biomassa});
localStorage.setItem("tanques", JSON.stringify(tanques));
atualizar();
}

function salvarDespesa() {
let desc = descDespesa.value;
let valor = Number(valorDespesa.value);

despesas.push({desc,valor});
localStorage.setItem("despesas", JSON.stringify(despesas));
atualizar();
}

function salvarReceita() {
let desc = descReceita.value;
let valor = Number(valorReceita.value);

receitas.push({desc,valor});
localStorage.setItem("receitas", JSON.stringify(receitas));
atualizar();
}

function atualizar() {

let totalDespesas = despesas.reduce((a,b)=>a+b.valor,0);
let totalReceitas = receitas.reduce((a,b)=>a+b.valor,0);
let lucro = totalReceitas - totalDespesas;
let biomassaTotal = tanques.reduce((a,b)=>a+b.biomassa,0);

document.getElementById("totalDespesas").innerText = totalDespesas.toFixed(2);
document.getElementById("totalReceitas").innerText = totalReceitas.toFixed(2);
document.getElementById("lucroTotal").innerText = lucro.toFixed(2);
document.getElementById("biomassaTotal").innerText = biomassaTotal.toFixed(2);

let custoKg = biomassaTotal > 0 ? totalDespesas / biomassaTotal : 0;
let eficiencia = totalReceitas > 0 ? (lucro / totalReceitas) * 100 : 0;
let projecao = lucro * 1.2;

document.getElementById("custoKg").innerText = custoKg.toFixed(2);
document.getElementById("eficiencia").innerText = eficiencia.toFixed(1);
document.getElementById("projecao").innerText = projecao.toFixed(2);

let lista = document.getElementById("listaTanques");
lista.innerHTML="";
tanques.forEach(t=>{
lista.innerHTML += `<li>${t.nome} - ${t.biomassa} kg</li>`;
});

gerarGrafico(totalReceitas,totalDespesas);
}

function gerarGrafico(receitas,despesas){

let ctx = document.getElementById("graficoFinanceiro");

if(window.grafico) window.grafico.destroy();

window.grafico = new Chart(ctx,{
type:'bar',
data:{
labels:['Receitas','Despesas'],
datasets:[{
label:'Financeiro',
data:[receitas,despesas],
backgroundColor:['#10b981','#ef4444']
}]
}
});
}

atualizar();
