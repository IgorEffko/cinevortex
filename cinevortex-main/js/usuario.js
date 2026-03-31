// Lista de gêneros disponíveis
const generosDisponiveis = [
    { id: 1, nome: "Ação", icone: "🎬" },
    { id: 2, nome: "Aventura", icone: "🗺️" },
    { id: 3, nome: "Comédia", icone: "😂" },
    { id: 4, nome: "Drama", icone: "🎭" },
    { id: 5, nome: "Ficção Científica", icone: "🚀" },
    { id: 6, nome: "Terror", icone: "👻" },
    { id: 7, nome: "Romance", icone: "💕" },
    { id: 8, nome: "Suspense", icone: "🔪" },
    { id: 9, nome: "Animação", icone: "🎨" },
    { id: 10, nome: "Documentário", icone: "📹" },
    { id: 11, nome: "Fantasia", icone: "✨" },
    { id: 12, nome: "Musical", icone: "🎵" }
];

// Carregar dados do usuário
function carregarDados() {
    // Dados do perfil
    const perfilSalvo = localStorage.getItem('usuarioPerfil');
    if (perfilSalvo) {
        const usuario = JSON.parse(perfilSalvo);
        document.getElementById('nomePerfil').textContent = usuario.nome || 'Cinéfilo';
        document.getElementById('emailPerfil').textContent = usuario.email || 'cinefilo@email.com';
        
        if (usuario.foto) {
            document.getElementById('fotoImagem').src = usuario.foto;
        }
    }
    
    // Gêneros favoritos
    const generosSalvos = localStorage.getItem('generosFavoritos');
    let generosIds = [];
    if (generosSalvos) {
        generosIds = JSON.parse(generosSalvos);
    }
    renderizarGeneros(generosIds);
    
    // Avaliações
    const avaliacoesSalvas = localStorage.getItem('avaliacoesCineVortex');
    let avaliacoes = [];
    if (avaliacoesSalvas) {
        avaliacoes = JSON.parse(avaliacoesSalvas);
    }
    renderizarAvaliacoes(avaliacoes);
    atualizarStats(avaliacoes);
    
    // Data de membro
    const membroDesde = localStorage.getItem('membroDesde');
    if (!membroDesde) {
        const data = new Date().toLocaleDateString('pt-BR');
        localStorage.setItem('membroDesde', data);
        document.getElementById('membroDesde').textContent = data;
    } else {
        document.getElementById('membroDesde').textContent = membroDesde;
    }
}

// Renderizar gêneros
function renderizarGeneros(generosIds) {
    const container = document.getElementById('generosLista');
    if (!container) return;
    
    const generosSelecionados = generosDisponiveis.filter(g => generosIds.includes(g.id));
    
    if (generosSelecionados.length === 0) {
        container.innerHTML = `
            <div class="sem-generos">
                <span>🎬</span>
                <p>Nenhum gênero selecionado ainda</p>
                <small>Clique em "Editar" para escolher seus favoritos!</small>
            </div>
        `;
        return;
    }
    
    container.innerHTML = generosSelecionados.map(genero => `
        <div class="genero-card">
            <div class="genero-icone">${genero.icone}</div>
            <div class="genero-nome">${genero.nome}</div>
        </div>
    `).join('');
}

// Renderizar avaliações
function renderizarAvaliacoes(avaliacoes) {
    const container = document.getElementById('avaliacoesLista');
    if (!container) return;
    
    // Pegar as 5 últimas avaliações
    const ultimasAvaliacoes = [...avaliacoes].reverse().slice(0, 5);
    
    if (ultimasAvaliacoes.length === 0) {
        container.innerHTML = `
            <div class="sem-avaliacoes">
                <span>📝</span>
                <p>Você ainda não fez nenhuma avaliação</p>
                <small>Volte para a página inicial e avalie um filme!</small>
            </div>
        `;
        return;
    }
    
    container.innerHTML = ultimasAvaliacoes.map(avaliacao => {
        const estrelas = '⭐'.repeat(avaliacao.nota) + '☆'.repeat(5 - avaliacao.nota);
        const data = new Date(avaliacao.data).toLocaleDateString('pt-BR');
        
        return `
            <div class="avaliacao-item">
                <div class="avaliacao-filme">${avaliacao.filme}</div>
                <div class="avaliacao-nota">${estrelas} (${avaliacao.nota}/5)</div>
                ${avaliacao.comentario ? `<div class="avaliacao-comentario">${avaliacao.comentario}</div>` : ''}
                <div class="avaliacao-data">${data}</div>
            </div>
        `;
    }).join('');
}

// Atualizar estatísticas
function atualizarStats(avaliacoes) {
    const totalAvaliacoes = avaliacoes.length;
    const totalFilmes = new Set(avaliacoes.map(a => a.filme)).size;
    
    document.getElementById('totalAvaliacoes').textContent = totalAvaliacoes;
    document.getElementById('totalFilmes').textContent = totalFilmes;
}

// Upload de foto
function setupFotoUpload() {
    const uploadInput = document.getElementById('uploadFoto');
    
    uploadInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('❌ Por favor, selecione uma imagem válida.');
                return;
            }
            
            if (file.size > 5 * 1024 * 1024) {
                alert('❌ A imagem deve ter no máximo 5MB.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const fotoUrl = event.target.result;
                document.getElementById('fotoImagem').src = fotoUrl;
                
                const perfilSalvo = localStorage.getItem('usuarioPerfil');
                let usuario = perfilSalvo ? JSON.parse(perfilSalvo) : {};
                usuario.foto = fotoUrl;
                localStorage.setItem('usuarioPerfil', JSON.stringify(usuario));
                
                alert('✅ Foto de perfil atualizada com sucesso!');
            };
            reader.readAsDataURL(file);
        }
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
    setupFotoUpload();
});