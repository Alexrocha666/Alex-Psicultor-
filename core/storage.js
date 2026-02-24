// ===============================
// ALEX PSICULTOR - STORAGE CORE
// ===============================

const STORAGE_KEY = "alex_psicultor_db";

// Estrutura padrão do banco
function estruturaPadrao() {
    return {
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
}

// Inicializar banco
function inicializarBanco() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(estruturaPadrao()));
    }
}

// Obter banco completo
function obterBanco() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

// Salvar banco completo
function salvarBanco(db) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

// Buscar usuário por nome
function buscarUsuario(usuario) {
    const db = obterBanco();
    return db.usuarios.find(u => u.usuario === usuario);
}

// Atualizar usuário específico
function atualizarUsuario(usuarioAtualizado) {
    const db = obterBanco();
    const index = db.usuarios.findIndex(u => u.usuario === usuarioAtualizado.usuario);
    if (index !== -1) {
        db.usuarios[index] = usuarioAtualizado;
        salvarBanco(db);
    }
}

// Adicionar novo usuário
function adicionarUsuario(novoUsuario) {
    const db = obterBanco();
    db.usuarios.push(novoUsuario);
    salvarBanco(db);
}

// Excluir usuário
function excluirUsuario(nomeUsuario) {
    const db = obterBanco();
    db.usuarios = db.usuarios.filter(u => u.usuario !== nomeUsuario);
    salvarBanco(db);
}

// Obter todos usuários
function obterUsuarios() {
    const db = obterBanco();
    return db.usuarios;
}

// Inicializar banco ao carregar
inicializarBanco();
