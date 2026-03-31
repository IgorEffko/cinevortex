// Verificar se usuário está logado
document.addEventListener('DOMContentLoaded', () => {
    const usuarioLogado = localStorage.getItem('cinevortex_usuario_logado');
    
    if (!usuarioLogado) {
        // Se não estiver logado, redirecionar para login
        window.location.href = 'login.html';
        return;
    }
    
    // Se estiver logado, carregar os filmes do usuário específico
    const usuario = JSON.parse(usuarioLogado);
    carregarFilmesDoUsuario(usuario.id);
    
    // Resto do código de inicialização...
});

// Modificar as funções para usar usuário específico
function carregarFilmesDoUsuario(usuarioId) {
    const saved = localStorage.getItem(`cinevortex_filmes_${usuarioId}`);
    if (saved) {
        filmesUsuario = JSON.parse(saved);
        if (filmesUsuario.length > 0) {
            proximoId = Math.max(...filmesUsuario.map(f => f.id)) + 1;
        }
    } else {
        filmesUsuario = [];
        proximoId = 1;
    }
    atualizarStats();
    renderizarFilmes();
}

function salvarFilmes() {
    const usuario = JSON.parse(localStorage.getItem('cinevortex_usuario_logado'));
    if (usuario) {
        localStorage.setItem(`cinevortex_filmes_${usuario.id}`, JSON.stringify(filmesUsuario));
    }
    atualizarStats();
    renderizarFilmes();
}

// Botão de logout no header
function adicionarBotaoLogout() {
    const headerButtons = document.querySelector('.header-buttons');
    if (headerButtons) {
        const usuarioLogado = localStorage.getItem('cinevortex_usuario_logado');
        if (usuarioLogado) {
            const usuario = JSON.parse(usuarioLogado);
            headerButtons.innerHTML = `
                <span class="usuario-nome">Olá, ${usuario.nome}</span>
                <button class="btn-logout" onclick="logout()">Sair</button>
            `;
        }
    }
}

function logout() {
    localStorage.removeItem('cinevortex_usuario_logado');
    window.location.href = 'login.html';
}