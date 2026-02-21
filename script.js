let tanques = JSON.parse(localStorage.getItem("tanques")) || [];
let financeiro = JSON.parse(localStorage.getItem("financeiro")) || [];

function trocarPagina(pagina){
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(pagina).classList.add("active");
}

function salvarDados(){
    localStorage.setItem("tanques", JSON.stringify(tanques));
    localStorage.setItem("financeiro", JSON.stringify(financeiro));
}

function adicionarTanque(){
    let nome = document.getElementById("nomeTanque").value;
    let qtd = parseInt(document.getElementById("qtdPeixes").value);
    let peso = parseFloat(document.getElementById("pesoMedio").value);

    if(!nome || !qtd || !peso){
        alert("Preencha todos os campos!");
        return;
    }

    tanques.push({nome, qtd, peso});
    salvarDados();
    atualizarTanques();
}

function atualizarTanques(){
    let lista = document.getElementById("listaTanques");
    lista.innerHTML = "";

    tanques.forEach((t,index)=>{
        let biomassa = (t.qtd * t.peso) / 1000;
        let racao = biomassa * 0.03;

        lista.innerHTML += `
        <div class="list-item">
            <strong>${t.nome}</strong><br>
            Peixes: ${t.qtd}<br>
            Peso médio: ${t.peso} g<br>
            Biomassa: ${biomassa.toFixed(2)} kg<br>
            Ração diária estimada: ${racao.toFixed(2)} kg<br>
            <button onclick="removerTanque(${index})">Remover</button>
        </div>
        `;
    });
}

function removerTanque(index){
    tanques.splice(index,1);
    salvarDados();
    atualizarTanques();
}

function salvarLancamento(){
    let tipo = document.getElementById("tipo").value;
    let descricao = document.getElementById("descricao").value;
    let valor = parseFloat(document.getElementById("valor").value);

    if(!descricao || !valor){
        alert("Preencha todos os campos!");
        return;
    }

    financeiro.push({tipo,descricao,valor});
    salvarDados();
    atualizarFinanceiro();
}

function atualizarFinanceiro(){
    let lista = document.getElementById("listaFinanceiro");
    lista.innerHTML = "";

    let entradas = 0;
    let saidas = 0;

    financeiro.forEach((f,index)=>{
        if(f.tipo === "entrada") entradas += f.valor;
        else saidas += f.valor;

        lista.innerHTML += `
        <div class="list-item">
            ${f.descricao} - R$ ${f.valor}
            <button onclick="removerLancamento(${index})">Remover</button>
        </div>
        `;
    });

    document.getElementById("totalEntradas").innerText = entradas.toFixed(2);
    document.getElementById("totalSaidas").innerText = saidas.toFixed(2);
    document.getElementById("lucro").innerText = (entradas - saidas).toFixed(2);
}

function removerLancamento(index){
    financeiro.splice(index,1);
    salvarDados();
    atualizarFinanceiro();
}

atualizarTanques();
atualizarFinanceiro();
