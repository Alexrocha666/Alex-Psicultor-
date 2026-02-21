let tanques = JSON.parse(localStorage.getItem("tanques")) || [];
let receitas = JSON.parse(localStorage.getItem("receitas")) || [];
let despesas = JSON.parse(localStorage.getItem("despesas")) || [];
let racao = JSON.parse(localStorage.getItem("racao")) || {sacos:0,preco:0};

function mostrar(id){
document.querySelectorAll(".aba").forEach(a=>a.classList.add("oculto"));
document.getElementById(id).classList.remove("oculto");
}

function salvarTanque(){
let nome = nomeTanque.value;
let qtd = Number(qtdPeixes.value);
let peso = Number(pesoMedio.value);
tanques.push({id:Date.now(),nome,qtd,peso,biomassa:qtd*peso});
localStorage.setItem("tanques",JSON.stringify(tanques));
atualizar();
}

function salvarReceita(){
receitas.push({id:Date.now(),desc:descReceita.value,valor:Number(valorReceita.value)});
localStorage.setItem("receitas",JSON.stringify(receitas));
atualizar();
}

function salvarDespesa(){
despesas.push({id:Date.now(),desc:descDespesa.value,valor:Number(valorDespesa.value)});
localStorage.setItem("despesas",JSON.stringify(despesas));
atualizar();
}

function salvarRacao(){
racao.sacos = Number(sacosRacao.value);
racao.preco = Number(precoSaco.value);
localStorage.setItem("racao",JSON.stringify(racao));
atualizar();
}

function remover(lista,id,tipo){
if(confirm("Deseja remover?")){
lista = lista.filter(item=>item.id!==id);
localStorage.setItem(tipo,JSON.stringify(lista));
location.reload();
}
}

function atualizar(){
let totalReceitas = receitas.reduce((a,b)=>a+b.valor,0);
let totalDespesas = despesas.reduce((a,b)=>a+b.valor,0);
let lucro = totalReceitas - totalDespesas;
let biomassaTotal = tanques.reduce((a,b)=>a+b.biomassa,0);
let custoKg = biomassaTotal>0? totalDespesas/biomassaTotal:0;
let eficiencia = totalReceitas>0? (lucro/totalReceitas)*100:0;

receitasTotal.innerText = totalReceitas.toFixed(2);
despesasTotal.innerText = totalDespesas.toFixed(2);
lucroTotal.innerText = lucro.toFixed(2);
biomassaTotal.innerText = biomassaTotal.toFixed(2);
custoKg.innerText = custoKg.toFixed(2);
eficiencia.innerText = eficiencia.toFixed(1);
estoqueRacao.innerText = racao.sacos;

listaTanques.innerHTML="";
tanques.forEach(t=>{
listaTanques.innerHTML += `<li>${t.nome} - ${t.biomassa}kg <button onclick="remover(tanques,${t.id},'tanques')">❌</button></li>`;
});

listaReceitas.innerHTML="";
receitas.forEach(r=>{
listaReceitas.innerHTML += `<li>${r.desc} R$${r.valor} <button onclick="remover(receitas,${r.id},'receitas')">❌</button></li>`;
});

listaDespesas.innerHTML="";
despesas.forEach(d=>{
listaDespesas.innerHTML += `<li>${d.desc} R$${d.valor} <button onclick="remover(despesas,${d.id},'despesas')">❌</button></li>`;
});

gerarGrafico(totalReceitas,totalDespesas);
}

function gerarGrafico(r,d){
let ctx=document.getElementById("grafico");
if(window.grafico)window.grafico.destroy();
window.grafico=new Chart(ctx,{
type:"bar",
data:{
labels:["Receitas","Despesas"],
datasets:[{data:[r,d],backgroundColor:["#10b981","#ef4444"]}]
}
});
}

function exportarBackup(){
let dados={tanques,receitas,despesas,racao};
let blob=new Blob([JSON.stringify(dados)],{type:"application/json"});
let link=document.createElement("a");
link.href=URL.createObjectURL(blob);
link.download="backup-alex-psicultor.json";
link.click();
}

function importarBackup(e){
let file=e.target.files[0];
let reader=new FileReader();
reader.onload=function(){
let dados=JSON.parse(reader.result);
localStorage.setItem("tanques",JSON.stringify(dados.tanques));
localStorage.setItem("receitas",JSON.stringify(dados.receitas));
localStorage.setItem("despesas",JSON.stringify(dados.despesas));
localStorage.setItem("racao",JSON.stringify(dados.racao));
location.reload();
};
reader.readAsText(file);
}

atualizar();
