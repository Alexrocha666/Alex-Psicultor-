// ===============================
// ALEX PSICULTOR - BANCO LOCAL
// ===============================

const DB_KEY = "alex_psicultor_db";

// Criar banco inicial se não existir
function inicializarBanco() {

    let banco = localStorage.getItem(DB_KEY);

    if (!banco) {

        const bancoInicial = {
            usuarios: [
                {
                    usuario: "admin",
                    senha: "admin123",
                    tipo: "admin",
                    tanques: [],
                    vendas: []
                }
            ]
        };

        localStorage.setItem(DB_KEY, JSON.stringify(bancoInicial));
    }
}

// Obter banco completo
function obterBanco() {
    return JSON.parse(localStorage.getItem(DB_KEY));
}

// Salvar banco
function salvarBanco(banco) {
    localStorage.setItem(DB_KEY, JSON.stringify(banco));
}

// Obter todos usuários
function obterUsuarios() {
    return obterBanco().usuarios;
}

// Buscar usuário
function buscarUsuario(nome) {
    return obterBanco().usuarios.find(u => u.usuario === nome);
}

// Adicionar usuário
function adicionarUsuario(novoUsuario) {
    const banco = obterBanco();
    banco.usuarios.push(novoUsuario);
    salvarBanco(banco);
}

// Atualizar usuário
function atualizarUsuario(usuarioAtualizado) {
    const banco = obterBanco();
    const index = banco.usuarios.findIndex(u => u.usuario === usuarioAtualizado.usuario);
    banco.usuarios[index] = usuarioAtualizado;
    salvarBanco(banco);
}

// Excluir usuário
function excluirUsuario(nomeUsuario) {
    const banco = obterBanco();
    banco.usuarios = banco.usuarios.filter(u => u.usuario !== nomeUsuario);
    salvarBanco(banco);
}

// Inicializa automaticamente
inicializarBanco();
