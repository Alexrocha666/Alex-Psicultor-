let tanques = JSON.parse(localStorage.getItem("tanques")) || [];
let receitas = JSON.parse(localStorage.getItem("receitas")) || [];
let despesas = JSON.parse(localStorage.getItem("despesas")) || [];
let racao = JSON.parse(localStorage.getItem("racao")) || {sacos:0,preco:0};

const conteudo = document.getElementById("conteudo");

function salvar(){
localStorage.setItem("tanques",JSON.stringify(tanques));
localStorage.setItem("receitas",JSON.stringify(receitas));
localStorage.setItem("despesas",JSON.stringify(despesas));
localStorage.setItem("racao",JSON.stringify(racao));
}

function carregarDashboard(){
let totalR = receitas.reduce((a,b)=>a+b.valor,0);
let totalD = despesas.reduce((a,b)=>a+b.valor,0);
let lucro = totalR-totalD;
let biomassa = tanques.reduce((a,b)=>a+b.qtd*b.peso,0);

conteudo.innerHTML=`
<div class="card">
<h3>Resumo</h3>
<p>Receitas: R$ ${totalR.toFixed(2)}</p>
<p>Despesas: R$ ${totalD.toFixed(2)}</p>
<p>Lucro: R$ ${lucro.toFixed(2)}</p>
<p>Biomassa: ${biomassa.toFixed(2)} kg</p>
</div>
<canvas id="grafico"></canvas>
`;

setTimeout(()=>{
new Chart(document.getElementById("grafico"),{
type:"bar",
data:{
labels:["Receitas","Despesas"],
datasets:[{
data:[totalR,totalD],
backgroundColor:["#10b981","#ef4444"]
}]
}
});
},100);
}

function carregarTanques(){
conteudo.innerHTML=`
<div class="card">
<h3>Novo Tanque</h3>
<input id="nome" placeholder="Nome">
<input id="qtd" type="number" placeholder="Quantidade">
<input id="peso" type="number" placeholder="Peso médio (kg)">
<button onclick="adicionarTanque()">Salvar</button>
</div>
<ul>
${tanques.map(t=>`
<li>
${t.nome} - ${(t.qtd*t.peso).toFixed(2)}kg
<button onclick="excluirTanque(${t.id})">❌</button>
</li>
`).join("")}
</ul>
`;
}

function adicionarTanque(){
let nome=document.getElementById("nome").value;
let qtd=Number(document.getElementById("qtd").value);
let peso=Number(document.getElementById("peso").value);

tanques.push({id:Date.now(),nome,qtd,peso});
salvar();
carregarTanques();
}

function excluirTanque(id){
tanques=tanques.filter(t=>t.id!==id);
salvar();
carregarTanques();
}

function carregarFinanceiro(){
conteudo.innerHTML=`
<div class="card">
<h3>Nova Receita</h3>
<input id="rdesc" placeholder="Descrição">
<input id="rvalor" type="number" placeholder="Valor">
<button onclick="addReceita()">Salvar</button>
</div>

<div class="card">
<h3>Nova Despesa</h3>
<input id="ddesc" placeholder="Descrição">
<input id="dvalor" type="number" placeholder="Valor">
<button onclick="addDespesa()">Salvar</button>
</div>

<h3>Histórico</h3>
<ul>
${receitas.map(r=>`<li>${r.desc} R$${r.valor}<button onclick="delReceita(${r.id})">❌</button></li>`).join("")}
${despesas.map(d=>`<li>${d.desc} -R$${d.valor}<button onclick="delDespesa(${d.id})">❌</button></li>`).join("")}
</ul>
`;
}

function addReceita(){
receitas.push({id:Date.now(),desc:rdesc.value,valor:Number(rvalor.value)});
salvar();
carregarFinanceiro();
}

function addDespesa(){
despesas.push({id:Date.now(),desc:ddesc.value,valor:Number(dvalor.value)});
salvar();
carregarFinanceiro();
}

function delReceita(id){
receitas=receitas.filter(r=>r.id!==id);
salvar();
carregarFinanceiro();
}

function delDespesa(id){
despesas=despesas.filter(d=>d.id!==id);
salvar();
carregarFinanceiro();
}

function carregarRacao(){
conteudo.innerHTML=`
<div class="card">
<h3>Estoque de Ração</h3>
<input id="sacos" type="number" placeholder="Sacos" value="${racao.sacos}">
<input id="preco" type="number" placeholder="Preço por saco" value="${racao.preco}">
<button onclick="salvarRacao()">Salvar</button>
<p>Total Investido: R$ ${(racao.sacos*racao.preco).toFixed(2)}</p>
</div>
`;
}

function salvarRacao(){
racao.sacos=Number(sacos.value);
racao.preco=Number(preco.value);
salvar();
carregarRacao();
}

function carregarRelatorios(){
conteudo.innerHTML=`
<div class="card">
<button onclick="exportar()">Exportar Backup</button>
<input type="file" onchange="importar(event)">
</div>
`;
}

function exportar(){
let dados={tanques,receitas,despesas,racao};
let blob=new Blob([JSON.stringify(dados)],{type:"application/json"});
let a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download="backup-alex-psicultor.json";
a.click();
}

function importar(e){
let reader=new FileReader();
reader.onload=function(){
let dados=JSON.parse(reader.result);
tanques=dados.tanques;
receitas=dados.receitas;
despesas=dados.despesas;
racao=dados.racao;
salvar();
carregarDashboard();
};
reader.readAsText(e.target.files[0]);
}

carregarDashboard();let dados=JSON.parse(reader.result);
localStorage.setItem("tanques",JSON.stringify(dados.tanques));
localStorage.setItem("receitas",JSON.stringify(dados.receitas));
localStorage.setItem("despesas",JSON.stringify(dados.despesas));
localStorage.setItem("racao",JSON.stringify(dados.racao));
location.reload();
};
reader.readAsText(file);
}

atualizar();
