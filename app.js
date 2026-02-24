let usuarioAtual = null;

/* ================= UTIL ================= */

function salvar(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function carregar(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}

/* ================= LOGIN ================= */

function verificarLogin() {
  let salvo = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (salvo && salvo.nome) {
    usuarioAtual = salvo;
    iniciarSistema();
  } else {
    telaLogin();
  }
}

function telaLogin() {
  document.getElementById("app").innerHTML = `
    <div class="container">
      <h1>🐟 Alex Piscicultura PRO</h1>
      <h2>Login</h2>
      <input type="text" id="nome" placeholder="Seu nome"><br>
      <button onclick="login()">Entrar</button>
    </div>
  `;
}

function login() {
  let nome = document.getElementById("nome").value;
  if (!nome) return alert("Digite seu nome");

  usuarioAtual = { nome };
  salvar("usuarioLogado", usuarioAtual);
  iniciarSistema();
}

function logout() {
  localStorage.removeItem("usuarioLogado");
  location.reload();
}

/* ================= SISTEMA ================= */

function iniciarSistema() {
  document.getElementById("app").innerHTML = `
    <h1>🐟 Alex Piscicultura PRO</h1>
    <p>Bem-vindo, ${usuarioAtual.nome}</p>

    <div class="menu">
      <button onclick="telaDashboard()">Dashboard</button>
      <button onclick="telaTanques()">Tanques</button>
      <button onclick="telaFinanceiro()">Financeiro</button>
      <button onclick="telaVendas()">Vendas</button>
      <button onclick="logout()">Sair</button>
    </div>

    <hr>
    <div id="conteudo"></div>
  `;
}

/* ================= DASHBOARD ================= */

function telaDashboard() {
  let tanques = carregar("tanques");
  let custos = carregar("custos");
  let vendas = carregar("vendas");

  let totalPeixes = tanques.reduce((a,t)=>a+t.quantidade,0);
  let biomassa = tanques.reduce((a,t)=>a+(t.quantidade*t.peso/1000),0);
  let receita = vendas.reduce((a,v)=>a+(v.kg*v.preco),0);
  let despesa = custos.reduce((a,c)=>a+c.valor,0);

  document.getElementById("conteudo").innerHTML = `
    <h2>📊 Dashboard</h2>
    <p>Total Tanques: ${tanques.length}</p>
    <p>Total Peixes: ${totalPeixes}</p>
    <p>Biomassa Total: ${biomassa.toFixed(2)} kg</p>
    <p>Receita: R$ ${receita.toFixed(2)}</p>
    <p>Despesas: R$ ${despesa.toFixed(2)}</p>
    <h3>Lucro: R$ ${(receita-despesa).toFixed(2)}</h3>
  `;
}

/* ================= TANQUES ================= */

function telaTanques() {
  let tanques = carregar("tanques");

  document.getElementById("conteudo").innerHTML = `
    <h2>🐟 Gestão de Tanques</h2>

    <input id="nomeTanque" placeholder="Nome do tanque"><br>
    <input id="quantidade" type="number" placeholder="Qtd peixes"><br>
    <input id="peso" type="number" placeholder="Peso médio (g)"><br>
    <button onclick="criarTanque()">Criar Tanque</button>

    <hr>

    ${tanques.map((t, i) => `
      <div>
        <b>${t.nome}</b><br>
        Peixes: ${t.quantidade}<br>
        Peso médio: ${t.peso} g<br>
        Biomassa: ${(t.quantidade * t.peso / 1000).toFixed(2)} kg<br>
        <button onclick="excluirTanque(${i})">Excluir</button>
        <hr>
      </div>
    `).join("")}
  `;
}

function criarTanque() {
  let nome = document.getElementById("nomeTanque").value;
  let quantidade = Number(document.getElementById("quantidade").value);
  let peso = Number(document.getElementById("peso").value);

  if (!nome || !quantidade || !peso) {
    alert("Preencha todos os campos");
    return;
  }

  let tanques = carregar("tanques");
  tanques.push({ nome, quantidade, peso });
  salvar("tanques", tanques);

  telaTanques();
}

function excluirTanque(i) {
  let tanques = carregar("tanques");
  tanques.splice(i, 1);
  salvar("tanques", tanques);
  telaTanques();
}

/* ================= FINANCEIRO ================= */

function telaFinanceiro() {
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

function adicionarCusto() {
  let descricao = document.getElementById("descricao").value;
  let valor = Number(document.getElementById("valor").value);

  if (!descricao || !valor) {
    alert("Preencha todos os campos");
    return;
  }

  let custos = carregar("custos");
  custos.push({ descricao, valor });
  salvar("custos", custos);

  telaFinanceiro();
}

function excluirCusto(i) {
  let custos = carregar("custos");
  custos.splice(i,1);
  salvar("custos", custos);
  telaFinanceiro();
}

/* ================= VENDAS ================= */

function telaVendas() {
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

function registrarVenda() {
  let kg = Number(document.getElementById("kg").value);
  let preco = Number(document.getElementById("preco").value);

  if (!kg || !preco) {
    alert("Preencha todos os campos");
    return;
  }

  let vendas = carregar("vendas");
  vendas.push({ kg, preco });
  salvar("vendas", vendas);

  telaVendas();
}

function excluirVenda(i) {
  let vendas = carregar("vendas");
  vendas.splice(i,1);
  salvar("vendas", vendas);
  telaVendas();
}

/* ================= INICIAR ================= */

verificarLogin();
