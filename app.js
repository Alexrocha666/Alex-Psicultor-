let usuarioAtual = null;

function salvar(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function carregar(chave) {
  return JSON.parse(localStorage.getItem(chave)) || [];
}

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

function iniciarSistema() {
  document.getElementById("app").innerHTML = `
    <h1>🐟 Alex Piscicultura PRO</h1>
    <p>Bem-vindo, ${usuarioAtual.nome}</p>

    <button onclick="telaDashboard()">Dashboard</button>
    <button onclick="telaTanques()">Tanques</button>
    <button onclick="telaFinanceiro()">Financeiro</button>
    <button onclick="telaVendas()">Vendas</button>
    <button onclick="logout()">Sair</button>
    <hr>
    <div id="conteudo"></div>
  `;
}

/* ================= TANQUES ================= */

function telaTanques() {
  let tanques = carregar("tanques");

  document.getElementById("conteudo").innerHTML = `
    <h2>🐟 Gestão de Tanques</h2>
    <input id="nomeTanque" placeholder="Nome do tanque">
    <input id="quantidade" type="number" placeholder="Qtd peixes">
    <input id="peso" type="number" placeholder="Peso médio (g)">
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

  document.getElementById("conteudo").innerHTML = `
    <h2>💰 Financeiro</h2>
    <input id="descricao" placeholder="Descrição">
    <input id="valor" type="number" placeholder="Valor">
    <button onclick="adicionarCusto()">Adicionar</button>
    <hr>
    Total despesas: R$ ${custos.reduce((a,b)=>a+b.valor,0).toFixed(2)}
    <hr>
    ${custos.map(c=>`<p>${c.descricao} - R$ ${c.valor}</p>`).join("")}
  `;
}

function adicionarCusto() {
  let descricao = document.getElementById("descricao").value;
  let valor = Number(document.getElementById("valor").value);

  let custos = carregar("custos");
  custos.push({ descricao, valor });
  salvar("custos", custos);
  telaFinanceiro();
}

/* ================= VENDAS ================= */

function telaVendas() {
  let vendas = carregar("vendas");

  document.getElementById("conteudo").innerHTML = `
    <h2>🛒 Vendas</h2>
    <input id="kg" type="number" placeholder="Kg vendidos">
    <input id="preco" type="number" placeholder="Preço por kg">
    <button onclick="registrarVenda()">Registrar</button>
    <hr>
    Receita total: R$ ${vendas.reduce((a,v)=>a+(v.kg*v.preco),0).toFixed(2)}
    <hr>
    ${vendas.map(v=>`<p>${v.kg}kg - R$ ${v.preco}/kg</p>`).join("")}
  `;
}

function registrarVenda() {
  let kg = Number(document.getElementById("kg").value);
  let preco = Number(document.getElementById("preco").value);

  let vendas = carregar("vendas");
  vendas.push({ kg, preco });
  salvar("vendas", vendas);
  telaVendas();
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

verificarLogin();
