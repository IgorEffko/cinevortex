// Banco de dados de filmes
const filmes = [
    {
        id: 1,
        titulo: "Duna: Parte 2",
        ano: 2024,
        descricao: "Paul Atreides se une a Chani e aos Fremen em uma jornada de vingança contra os conspiradores que destruíram sua família.",
        poster: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
        nota: 8.7,
        genero: ["Ficção Científica", "Aventura"]
    },
    {
        id: 2,
        titulo: "Oppenheimer",
        ano: 2023,
        descricao: "A história do físico J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica.",
        poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        nota: 8.5,
        genero: ["Drama", "Histórico"]
    },
    {
        id: 3,
        titulo: "Barbie",
        ano: 2023,
        descricao: "Barbie vive em um mundo perfeito, mas começa a enfrentar crises existenciais que a levam a uma jornada no mundo real.",
        poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        nota: 7.2,
        genero: ["Comédia", "Fantasia"]
    },
    {
        id: 4,
        titulo: "Homem-Aranha: Através do Aranhaverso",
        ano: 2023,
        descricao: "Miles Morales embarca em uma aventura épica através do multiverso, encontrando outras versões do Homem-Aranha.",
        poster: "https://image.tmdb.org/t/p/w500/rTmJ2Z2EHGjEUMu6F8tQYx0X6tD.jpg",
        nota: 8.8,
        genero: ["Animação", "Ação"]
    },
    {
        id: 5,
        titulo: "John Wick 4: Baba Yaga",
        ano: 2023,
        descricao: "John Wick descobre um caminho para derrotar a Alta Cúpula e finalmente conquistar sua liberdade.",
        poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        nota: 7.9,
        genero: ["Ação", "Thriller"]
    },
    {
        id: 6,
        titulo: "A Baleia",
        ano: 2022,
        descricao: "Um professor de inglês recluso tenta se reconectar com sua filha adolescente em um esforço final de redenção.",
        poster: "https://image.tmdb.org/t/p/w500/4q2NNj4S5dG2KnFk6dmY6K5VzH.jpg",
        nota: 8.1,
        genero: ["Drama"]
    },
    {
        id: 7,
        titulo: "Missão: Impossível - Acerto de Contas Parte 1",
        ano: 2023,
        descricao: "Ethan Hunt e sua equipe enfrentam a nova ameaça mais perigosa: uma arma de IA que pode controlar o mundo.",
        poster: "https://image.tmdb.org/t/p/w500/4fRjCj8xqQgQjZk8y6qKXwqQyQJ.jpg",
        nota: 8.0,
        genero: ["Ação", "Espionagem"]
    },
    {
        id: 8,
        titulo: "Elementos",
        ano: 2023,
        descricao: "Em uma cidade onde os elementos vivem em harmonia, Faísca e Gota descobrem que têm mais em comum do que imaginavam.",
        poster: "https://image.tmdb.org/t/p/w500/6oH378KUfCEitzJkm07r97L0RsZ.jpg",
        nota: 7.5,
        genero: ["Animação", "Romance"]
    },
    {
        id: 9,
        titulo: "Wonka",
        ano: 2023,
        descricao: "As origens de Willy Wonka, o excêntrico dono da maior fábrica de chocolate do mundo.",
        poster: "https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
        nota: 7.4,
        genero: ["Fantasia", "Musical"]
    },
    {
        id: 10,
        titulo: "Napoleão",
        ano: 2023,
        descricao: "A origem e a ascensão de Napoleão Bonaparte ao poder, através de sua relação com Josefina.",
        poster: "https://image.tmdb.org/t/p/w500/bFgqjd2UuLSx1Z6VKjvqjQK8z8K.jpg",
        nota: 6.8,
        genero: ["Drama", "Histórico"]
    },
    {
        id: 11,
        titulo: "Aquaman 2: O Reino Perdido",
        ano: 2023,
        descricao: "Aquaman precisa se unir ao seu meio-irmão para proteger Atlantis de uma antiga ameaça.",
        poster: "https://image.tmdb.org/t/p/w500/7lUyW4TqFqJq6XqKqXqXqXqXqX.jpg",
        nota: 6.5,
        genero: ["Ação", "Aventura"]
    },
    {
        id: 12,
        titulo: "Ferrari",
        ano: 2023,
        descricao: "A história de Enzo Ferrari durante o verão de 1957, quando sua empresa enfrentava falência.",
        poster: "https://image.tmdb.org/t/p/w500/7lUyW4TqFqJq6XqKqXqXqXqXqX.jpg",
        nota: 7.1,
        genero: ["Drama", "Biografia"]
    }
];

// Estado do usuário (armazenado no localStorage)
let bibliotecaUsuario = {
    queroVer: [],
    favoritos: [],
    assistidos: []
};

// Carregar dados do localStorage
function carregarBiblioteca() {
    const saved = localStorage.getItem('cinevortex_biblioteca');
    if (saved) {
        bibliotecaUsuario = JSON.parse(saved);
    }
    atualizarStats();
}

// Salvar dados no localStorage
function salvarBiblioteca() {
    localStorage.setItem('cinevortex_biblioteca', JSON.stringify(bibliotecaUsuario));
    atualizarStats();
    atualizarTodosOsFilmes();
}

// Atualizar estatísticas
function atualizarStats() {
    document.getElementById('totalFilmes').textContent = filmes.length;
    document.getElementById('totalAssistidos').textContent = bibliotecaUsuario.assistidos.length;
    document.getElementById('totalFavoritos').textContent = bibliotecaUsuario.favoritos.length;
}

// Verificar se filme está em uma categoria
function estaNaCategoria(filmeId, categoria) {
    return bibliotecaUsuario[categoria].includes(filmeId);
}

// Adicionar/remover filme de categoria
function toggleCategoria(filmeId, categoria) {
    const index = bibliotecaUsuario[categoria].indexOf(filmeId);
    if (index === -1) {
        bibliotecaUsuario[categoria].push(filmeId);
    } else {
        bibliotecaUsuario[categoria].splice(index, 1);
    }
    salvarBiblioteca();
}

// Renderizar card do filme
function renderizarFilmeCard(filme, categoriaAtual = null) {
    const isFavorito = estaNaCategoria(filme.id, 'favoritos');
    const isAssistido = estaNaCategoria(filme.id, 'assistidos');
    const isQueroVer = estaNaCategoria(filme.id, 'queroVer');
    
    let badge = '';
    if (isFavorito) badge = '<div class="badge favorito">⭐ Favorito</div>';
    else if (isAssistido) badge = '<div class="badge assistido">✅ Assistido</div>';
    else if (isQueroVer) badge = '<div class="badge quero-ver">⏰ Quero Ver</div>';
    
    return `
        <div class="filme-card" data-id="${filme.id}" onclick="abrirModal(${filme.id})">
            <div class="filme-poster">
                <img src="${filme.poster}" alt="${filme.titulo}" loading="lazy">
                ${badge}
                <div class="filme-overlay">
                    <button class="btn-acao ${isQueroVer ? 'ativo' : ''}" onclick="event.stopPropagation(); toggleCategoria(${filme.id}, 'queroVer')">
                        ${isQueroVer ? '✓ Quero Ver' : '⏰ Quero Ver'}
                    </button>
                    <button class="btn-acao ${isFavorito ? 'ativo' : ''}" onclick="event.stopPropagation(); toggleCategoria(${filme.id}, 'favoritos')">
                        ${isFavorito ? '⭐ Favoritado' : '☆ Favoritar'}
                    </button>
                    <button class="btn-acao ${isAssistido ? 'ativo' : ''}" onclick="event.stopPropagation(); toggleCategoria(${filme.id}, 'assistidos')">
                        ${isAssistido ? '✓ Assistido' : '✅ Marcar Assistido'}
                    </button>
                </div>
            </div>
            <div class="filme-info">
                <div class="filme-titulo">${filme.titulo}</div>
                <div class="filme-ano">${filme.ano} • ⭐ ${filme.nota}</div>
            </div>
        </div>
    `;
}

// Renderizar filmes por categoria
function renderizarCategoria(categoria, containerId, maxItems = 6) {
    let filmesCategoria = [];
    
    if (categoria === 'recomendados') {
        // Recomendados: filmes que não estão em nenhuma lista
        filmesCategoria = filmes.filter(filme => 
            !estaNaCategoria(filme.id, 'queroVer') && 
            !estaNaCategoria(filme.id, 'assistidos')
        ).slice(0, maxItems);
    } else {
        filmesCategoria = filmes.filter(filme => 
            estaNaCategoria(filme.id, categoria)
        ).slice(0, maxItems);
    }
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (filmesCategoria.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666; grid-column: 1/-1;">
                Nenhum filme nesta categoria ainda
            </div>
        `;
        return;
    }
    
    container.innerHTML = filmesCategoria.map(filme => renderizarFilmeCard(filme)).join('');
}

// Atualizar todos os filmes
function atualizarTodosOsFilmes() {
    renderizarCategoria('recomendados', 'recomendados-grid');
    renderizarCategoria('queroVer', 'quero-ver-grid');
    renderizarCategoria('favoritos', 'favoritos-grid');
    renderizarCategoria('assistidos', 'assistidos-grid');
}

// Filtrar filmes por categoria
let filtroAtual = 'todos';

function aplicarFiltro(categoria) {
    filtroAtual = categoria;
    
    // Esconder/mostrar seções baseado no filtro
    const secoes = document.querySelectorAll('.categoria');
    secoes.forEach(secao => secao.style.display = 'block');
    
    if (categoria !== 'todos') {
        secoes.forEach(secao => {
            const titulo = secao.querySelector('.categoria-titulo').textContent;
            if ((categoria === 'quero-ver' && !titulo.includes('Quero Ver')) ||
                (categoria === 'favoritos' && !titulo.includes('Favoritos')) ||
                (categoria === 'assistidos' && !titulo.includes('Assistidos'))) {
                secao.style.display = 'none';
            }
        });
    }
    
    // Atualizar botões ativos
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        if (btn.dataset.filtro === categoria) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Ver todos os filmes de uma categoria
function verTodos(categoria) {
    if (categoria === 'recomendados') {
        aplicarFiltro('todos');
    } else {
        aplicarFiltro(categoria);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modal
let modalAtual = null;

function abrirModal(filmeId) {
    const filme = filmes.find(f => f.id === filmeId);
    if (!filme) return;
    
    const isFavorito = estaNaCategoria(filme.id, 'favoritos');
    const isAssistido = estaNaCategoria(filme.id, 'assistidos');
    const isQueroVer = estaNaCategoria(filme.id, 'queroVer');
    
    const modalDetalhes = document.getElementById('modal-detalhes');
    modalDetalhes.innerHTML = `
        <div class="modal-poster">
            <img class="modal-poster-img" src="${filme.poster}" alt="${filme.titulo}">
            <div class="modal-info">
                <h2 class="modal-titulo">${filme.titulo}</h2>
                <p class="modal-ano">${filme.ano} • ⭐ ${filme.nota} • ${filme.genero.join(', ')}</p>
                <p class="modal-descricao">${filme.descricao}</p>
                <div class="modal-acoes">
                    <button class="modal-btn modal-btn-primary" onclick="toggleCategoria(${filme.id}, 'assistidos'); abrirModal(${filme.id})">
                        ${isAssistido ? '✅ Já Assistido' : '🎬 Marcar como Assistido'}
                    </button>
                    <button class="modal-btn modal-btn-secondary" onclick="toggleCategoria(${filme.id}, 'queroVer'); abrirModal(${filme.id})">
                        ${isQueroVer ? '✓ Na Lista' : '⏰ Quero Ver'}
                    </button>
                    <button class="modal-btn modal-btn-secondary" onclick="toggleCategoria(${filme.id}, 'favoritos'); abrirModal(${filme.id})">
                        ${isFavorito ? '⭐ Favoritado' : '☆ Favoritar'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    modalAtual = filmeId;
}

function fecharModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modalAtual = null;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarBiblioteca();
    atualizarTodosOsFilmes();
    
    // Event listeners dos filtros
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            aplicarFiltro(btn.dataset.filtro);
        });
    });
    
    // Event listener do modal
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.modal-close');
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });
    
    closeBtn.addEventListener('click', fecharModal);
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalAtual) {
            fecharModal();
        }
    });
});

// Expor funções globalmente
window.toggleCategoria = toggleCategoria;
window.abrirModal = abrirModal;
window.verTodos = verTodos;
window.aplicarFiltro = aplicarFiltro;