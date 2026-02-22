let tanques = JSON.parse(localStorage.getItem("tanques")) || [];

function salvarTanques(){
    localStorage.setItem("tanques", JSON.stringify(tanques));
}

function mostrarTanques(){
    const area=document.getElementById("areaTanques");
    area.innerHTML="";

    if(tanques.length===0){
        area.innerHTML="<p>Nenhum tanque cadastrado.</p>";
        return;
    }

    tanques.forEach((tanque,index)=>{

        const ultimoPeso = tanque.historico.length>0
            ? tanque.historico[tanque.historico.length-1].peso
            : tanque.pesoMedio;

        const totalRacao = tanque.historicoRacao.reduce((s,r)=>s+r.quantidade,0);
        const custoTotalRacao = tanque.historicoRacao.reduce((s,r)=>s+r.valor,0);

        const custoPorPeixe = custoTotalRacao / tanque.quantidade;
        const kgProduzido = (ultimoPeso/1000) * tanque.quantidade;
        const custoPorKg = kgProduzido>0 ? custoTotalRacao / kgProduzido : 0;

        const faturamentoPrevisto = kgProduzido * tanque.precoVenda;
        const lucroPrevisto = faturamentoPrevisto - custoTotalRacao;

        let alerta="";
        if(lucroPrevisto < 0){
            alerta="<p style='color:red;font-weight:bold;'>🚨 PREJUÍZO!</p>";
        }

        area.innerHTML += `
        <div class="card">
            <h3>${tanque.nome}</h3>
            <p>Peixes: ${tanque.quantidade}</p>
            <p>Peso Atual: ${ultimoPeso.toFixed(2)} g</p>
            <p>Meta Final: ${tanque.metaPeso} g</p>

            <hr>

            <p>Total Ração: ${totalRacao.toFixed(2)} kg</p>
            <p>Custo Total Ração: R$ ${custoTotalRacao.toFixed(2)}</p>
            <p>Custo por Peixe: R$ ${custoPorPeixe.toFixed(2)}</p>
            <p>Custo por Kg: R$ ${custoPorKg.toFixed(2)}</p>

            <hr>

            <p>Previsão Faturamento: R$ ${faturamentoPrevisto.toFixed(2)}</p>
            <p><strong>Previsão Lucro: R$ ${lucroPrevisto.toFixed(2)}</strong></p>

            ${alerta}

            <button onclick="adicionarPesagem(${index})">Adicionar Pesagem</button>
            <button onclick="registrarRacao(${index})">Registrar Ração</button>
            <button onclick="definirPrecoVenda(${index})">Definir Preço Venda</button>
            <button onclick="removerTanque(${index})" style="background:red;">Excluir</button>
        </div>
        `;
    });
}

function adicionarTanque(){
    const nome=prompt("Nome do tanque:");
    const quantidade=parseInt(prompt("Quantidade de peixes:"));
    const pesoInicial=parseFloat(prompt("Peso médio inicial (g):"));
    const metaPeso=parseFloat(prompt("Meta final (g):"));

    tanques.push({
        nome,
        quantidade,
        pesoMedio:pesoInicial,
        metaPeso,
        precoVenda:15,
        historico:[],
        historicoRacao:[]
    });

    salvarTanques();
    mostrarTanques();
}

function adicionarPesagem(index){
    const novoPeso=parseFloat(prompt("Novo peso médio (g):"));
    const data=new Date().toLocaleDateString();

    tanques[index].pesoMedio=novoPeso;
    tanques[index].historico.push({data,peso:novoPeso});

    salvarTanques();
    mostrarTanques();
}

function registrarRacao(index){
    const quantidade=parseFloat(prompt("Quantos kg de ração?"));
    const valor=parseFloat(prompt("Valor total da ração (R$)?"));
    const data=new Date().toLocaleDateString();

    tanques[index].historicoRacao.push({data,quantidade,valor});

    lancamentos.push({
        tipo:"saída",
        descricao:`Ração tanque ${tanques[index].nome}`,
        valor:valor,
        data:data
    });

    salvarTanques();
    salvarLancamentos();
    mostrarTanques();
    mostrarFinanceiro();
}

function definirPrecoVenda(index){
    const preco=parseFloat(prompt("Preço venda por kg?"));
    tanques[index].precoVenda=preco;
    salvarTanques();
    mostrarTanques();
}

function removerTanque(index){
    tanques.splice(index,1);
    salvarTanques();
    mostrarTanques();
}
