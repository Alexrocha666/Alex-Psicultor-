// ===============================
// ALEX PSICULTOR - APP PRINCIPAL
// ===============================

let modoVisualizacao = "individual";

function renderApp() {

    let seletorAdmin = "";

    if (usuarioLogado.tipo === "admin") {

        let opcoes = `<option value="individual">Meus Dados</option>
                      <option value="todos">Todos Usuários</option>`;

        seletorAdmin = `
            <select onchange="alterarModo(this.value)">
                ${opcoes}
            </select>
            <button class="btn-warning" onclick="criarUsuario()">Novo Usuário</button>
        `;
    }

    document.getElementById("app").innerHTML = `
        <div class="navbar">
            <h1>Alex Psicultor</h1>
            <div class="nav-buttons">
                ${seletorAdmin}
                <button class="btn-primary" onclick="renderTanques()">Tanques</button>
                <button class="btn-primary" onclick="renderVendas()">Vendas</button>
                <button class="btn-primary" onclick="renderRelatorios()">Relatórios</button>
                <button class="btn-danger" onclick="logout()">Sair</button>
            </div>
        </div>
        <div id="conteudo"></div>
    `;

    renderRelatorios();
}

function alterarModo(valor) {
    modoVisualizacao = valor;
    renderRelatorios();
}

// Inicialização
verificarSessao();      </div>
    `).join("")}
  `;
}

function criarTanque(){
  let nome = document.getElementById("nomeTanque").value;
  let quantidade = Number(document.getElementById("quantidade").value);
  let peso = Number(document.getElementById("peso").value);

  if(!nome || !quantidade || !peso){
    alert("Preencha todos os campos");
    return;
  }

  let tanques = carregar("tanques");
  tanques.push({nome, quantidade, peso});
  salvar("tanques", tanques);
  telaTanques();
}

function excluirTanque(i){
  let tanques = carregar("tanques");
  tanques.splice(i,1);
  salvar("tanques", tanques);
  telaTanques();
}

/* FINANCEIRO */
function telaFinanceiro(){
  let custos = carregar("custos");
  let total = custos.reduce((a,b)=>a+b.valor,0);

  document.getElementById("conteudo").innerHTML = `
    <h2>💰 Financeiro</h2>
    <input id="descricao" placeholder="Descrição"><br>
    <input id="valor" type="number" placeholder="Valor"><br>
    <button onclick="adicionarCusto()">Adicionar</button>
    <hr>
    <h3>Total despesas: R$ ${total.toFixed(2)}</h3>
    ${custos.map((c,i)=>`
      <p>${c.descricao} - R$ ${c.valor.toFixed(2)}
      <button onclick="excluirCusto(${i})">Excluir</button></p>
    `).join("")}
  `;
}

function adicionarCusto(){
  let descricao = document.getElementById("descricao").value;
  let valor = Number(document.getElementById("valor").value);

  if(!descricao || !valor){
    alert("Preencha todos os campos");
    return;
  }

  let custos = carregar("custos");
  custos.push({descricao, valor});
  salvar("custos", custos);
  telaFinanceiro();
}

function excluirCusto(i){
  let custos = carregar("custos");
  custos.splice(i,1);
  salvar("custos", custos);
  telaFinanceiro();
}

/* VENDAS */
function telaVendas(){
  let vendas = carregar("vendas");
  let receita = vendas.reduce((a,v)=>a+(v.kg*v.preco),0);

  document.getElementById("conteudo").innerHTML = `
    <h2>🛒 Vendas</h2>
    <input id="kg" type="number" placeholder="Kg vendidos"><br>
    <input id="preco" type="number" placeholder="Preço por kg"><br>
    <button onclick="registrarVenda()">Registrar</button>
    <hr>
    <h3>Receita total: R$ ${receita.toFixed(2)}</h3>
    ${vendas.map((v,i)=>`
      <p>${v.kg}kg - R$ ${v.preco.toFixed(2)}/kg
      <button onclick="excluirVenda(${i})">Excluir</button></p>
    `).join("")}
  `;
}

function registrarVenda(){
  let kg = Number(document.getElementById("kg").value);
  let preco = Number(document.getElementById("preco").value);

  if(!kg || !preco){
    alert("Preencha todos os campos");
    return;
  }

  let vendas = carregar("vendas");
  vendas.push({kg, preco});
  salvar("vendas", vendas);
  telaVendas();
}

function excluirVenda(i){
  let vendas = carregar("vendas");
  vendas.splice(i,1);
  salvar("vendas", vendas);
  telaVendas();
}

/* INICIAR */
verificarLogin();
