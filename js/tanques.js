function adicionarTanque(){

    let tanques = JSON.parse(localStorage.getItem("tanques")) || [];

    const nome = prompt("Nome do tanque:");
    const quantidade = parseInt(prompt("Quantidade de peixes:"));
    const peso = parseFloat(prompt("Peso médio inicial (g):"));

    if(!nome || isNaN(quantidade) || isNaN(peso)){
        alert("Dados inválidos!");
        return;
    }

    tanques.push({
        nome,
        quantidade,
        peso
    });

    localStorage.setItem("tanques", JSON.stringify(tanques));

    mostrarTanques();
}

function mostrarTanques(){

    const area = document.getElementById("areaTanques");
    let tanques = JSON.parse(localStorage.getItem("tanques")) || [];

    area.innerHTML="";

    if(tanques.length===0){
        area.innerHTML="<p>Nenhum tanque cadastrado.</p>";
        return;
    }

    tanques.forEach((t,index)=>{
        area.innerHTML+=`
            <div class="card">
                <h3>${t.nome}</h3>
                <p>Peixes: ${t.quantidade}</p>
                <p>Peso médio: ${t.peso} g</p>
                <button class="btn-danger" onclick="removerTanque(${index})">Excluir</button>
            </div>
        `;
    });
}

function removerTanque(index){

    let tanques = JSON.parse(localStorage.getItem("tanques")) || [];

    tanques.splice(index,1);

    localStorage.setItem("tanques", JSON.stringify(tanques));

    mostrarTanques();
}
