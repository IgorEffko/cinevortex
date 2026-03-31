// ============== AVALIAÇÕES ==============
let notaSelecionada = 0;
let avaliacoes = [];
let filmes = [];

let bibliotecaUsuario = {
    queroVer: [],
    favoritos: [],
    assistidos: []
};

let filtroAtual = 'todos';

// Carrega dados salvos
document.addEventListener('DOMContentLoaded', function() {
    carregarAvaliacoes();
    carregarFilmes();
    carregarBiblioteca();
    atualizarSelectFilmes();
    atualizarTodosOsFilmes();
    setupFiltros();
});

// Função para adicionar filme
function adicionarFilme() {
    const titulo = document.getElementById('novoTitulo').value.trim();
    const ano = document.getElementById('novoAno').value.trim();
    const descricao = document.getElementById('novaDescricao').value.trim();
    const genero = document.getElementById('novoGenero').value.trim();
    const imagem = document.getElementById('novaImagem').value.trim();
    
    if (!titulo || !ano) {
        alert('❌ Por favor, preencha o título e o ano do filme!');
        return;
    }
    
    const novoFilme = {
        id: Date.now(),
        titulo: titulo,
        ano: parseInt(ano),
        descricao: descricao || 'Sem descrição disponível',
        genero: genero ? [genero] : ['Geral'],
        poster: imagem || 'https://via.placeholder.com/300x450?text=Sem+Poster',
        nota: 0
    };
    
    filmes.push(novoFilme);
    salvarFilmes();
    atualizarSelectFilmes();
    atualizarTodosOsFilmes();
    fecharModalAdicionar();
    
    // Limpar formulário
    document.getElementById('novoTitulo').value = '';
    document.getElementById('novoAno').value = '';
    document.getElementById('novaDescricao').value = '';
    document.getElementById('novoGenero').value = '';
    document.getElementById('novaImagem').value = '';
    
    alert(`✅ Filme "${titulo}" adicionado com sucesso!`);
}

// Função para avaliar
function avaliar(nota) {
    notaSelecionada = nota;
    
    const estrelas = document.querySelectorAll('.estrela');
    estrelas.forEach((estrela, index) => {
        if (index < nota) {
            estrela.textContent = '★';
            estrela.classList.add('ativa');
        } else {
            estrela.textContent = '☆';
            estrela.classList.remove('ativa');
        }
    });
    
    const textoNota = document.getElementById('notaTexto');
    const notas = ['péssimo', 'ruim', 'regular', 'bom', 'excelente'];
    textoNota.textContent = `Você avaliou como ${notas[nota-1]} (${nota} estrelas)`;
}

// Função para enviar avaliação
function enviarAvaliacao() {
    const filmeSelect = document.getElementById('filme');
    const filmeId = parseInt(filmeSelect.value);
    const filmeObj = filmes.find(f => f.id === filmeId);
    const comentario = document.getElementById('comentario').value.trim();
    
    if (!filmeId) {
        alert('❌ Selecione um filme para avaliar');
        return;
    }
    
    if (notaSelecionada === 0) {
        alert('❌ Dê uma nota para o filme');
        return;
    }
    
    const avaliacao = {
        id: Date.now(),
        filmeId: filmeId,
        filmeNome: filmeObj.titulo,
        nota: notaSelecionada,
        comentario: comentario || 'Sem comentário',
        data: new Date().toLocaleDateString('pt-BR')
    };
    
    avaliacoes.unshift(avaliacao);
    salvarAvaliacoes();
    mostrarAvaliacoes();
    limparFormularioAvaliacao();
    
    alert('✅ Avaliação enviada com sucesso!');
}

function mostrarAvaliacoes() {
    const lista = document.getElementById('avaliacoesLista');
    
    if (avaliacoes.length === 0) {
        lista.innerHTML = '<div class="sem-avaliacoes">Nenhuma avaliação ainda. Seja o primeiro a avaliar!</div>';
        return;
    }
    
    let html = '';
    avaliacoes.forEach(av => {
        let estrelas = '';
        for (let i = 1; i <= 5; i++) {
            estrelas += i <= av.nota ? '★' : '☆';
        }
        
        html += `
            <div class="avaliacao-item">
                <div class="avaliacao-header">
                    <span class="avaliacao-filme">${escapeHtml(av.filmeNome)}</span>
                    <span class="avaliacao-estrelas">${estrelas}</span>
                </div>
                <div class="avaliacao-comentario">${escapeHtml(av.comentario)}</div>
                <div class="avaliacao-data">${av.data}</div>
            </div>
        `;
    });
    
    lista.innerHTML = html;
}

function limparFormularioAvaliacao() {
    document.getElementById('filme').value = '';
    notaSelecionada = 0;
    const estrelas = document.querySelectorAll('.estrela');
    estrelas.forEach(estrela => {
        estrela.textContent = '☆';
        estrela.classList.remove('ativa');
    });
    document.getElementById('notaTexto').textContent = 'Clique nas estrelas';
    document.getElementById('comentario').value = '';
}

// Funções de biblioteca do usuário
function estaNaCategoria(filmeId, categoria) {
    return bibliotecaUsuario[categoria].includes(filmeId);
}

function toggleCategoria(filmeId, categoria, event) {
    if (event) event.stopPropagation();
    
    const index = bibliotecaUsuario[categoria].indexOf(filmeId);
    if (index === -1) {
        bibliotecaUsuario[categoria].push(filmeId);
    } else {
        bibliotecaUsuario[categoria].splice(index, 1);
    }
    salvarBiblioteca();
    atualizarTodosOsFilmes();
}

function atualizarStats() {
    document.getElementById('totalFilmes').textContent = filmes.length;
    document.getElementById('totalAssistidos').textContent = bibliotecaUsuario.assistidos.length;
    document.getElementById('totalFavoritos').textContent = bibliotecaUsuario.favoritos.length;
}

// Renderizar filmes
function renderizarFilmes(filmesParaRenderizar) {
    if (filmesParaRenderizar.length === 0) {
        return '<div class="sem-avaliacoes" style="grid-column: 1/-1; padding: 40px;">Nenhum filme encontrado</div>';
    }
    
    return filmesParaRenderizar.map(filme => {
        const isFavorito = estaNaCategoria(filme.id, 'favoritos');
        const isAssistido = estaNaCategoria(filme.id, 'assistidos');
        const isQueroVer = estaNaCategoria(filme.id, 'queroVer');
        
        let badge = '';
        if (isFavorito) badge = '<div class="badge favorito">⭐</div>';
        else if (isAssistido) badge = '<div class="badge assistido">✅</div>';
        else if (isQueroVer) badge = '<div class="badge quero-ver">⏰</div>';
        
        return `
            <div class="filme-card" onclick="abrirModalDetalhes(${filme.id})">
                <div class="filme-poster">
                    <img src="${filme.poster}" alt="${filme.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x450?text=Sem+Poster'">
                    ${badge}
                    <div class="filme-overlay">
                        <button class="btn-acao ${isQueroVer ? 'ativo' : ''}" onclick="toggleCategoria(${filme.id}, 'queroVer', event)">
                            ${isQueroVer ? '✓' : '⏰'} Quero Ver
                        </button>
                        <button class="btn-acao ${isFavorito ? 'ativo' : ''}" onclick="toggleCategoria(${filme.id}, 'favoritos', event)">
                            ${isFavorito ? '⭐' : '☆'} Favoritar
                        </button>
                        <button class="btn-acao ${isAssistido ? 'ativo' : ''}" onclick="toggleCategoria(${filme.id}, 'assistidos', event)">
                            ${isAssistido ? '✓' : '✅'} Assistido
                        </button>
                    </div>
                </div>
                <div class="filme-info">
                    <div class="filme-titulo">${escapeHtml(filme.titulo)}</div>
                    <div class="filme-ano">${filme.ano}</div>
                </div>
            </div>
        `;
    }).join('');
}

function atualizarTodosOsFilmes() {
    let filmesFiltrados = [];
    
    if (filtroAtual === 'todos') {
        filmesFiltrados = filmes;
    } else if (filtroAtual === 'quero-ver') {
        filmesFiltrados = filmes.filter(f => estaNaCategoria(f.id, 'queroVer'));
    } else if (filtroAtual === 'favoritos') {
        filmesFiltrados = filmes.filter(f => estaNaCategoria(f.id, 'favoritos'));
    } else if (filtroAtual === 'assistidos') {
        filmesFiltrados = filmes.filter(f => estaNaCategoria(f.id, 'assistidos'));
    }
    
    const grid = document.getElementById('todos-filmes-grid');
    grid.innerHTML = renderizarFilmes(filmesFiltrados);
    atualizarStats();
}

// Modal functions
function abrirModalAdicionar() {
    document.getElementById('modalAdicionar').style.display = 'block';
}

function fecharModalAdicionar() {
    document.getElementById('modalAdicionar').style.display = 'none';
}

function abrirModalDetalhes(filmeId) {
    const filme = filmes.find(f => f.id === filmeId);
    if (!filme) return;
    
    const isFavorito = estaNaCategoria(filme.id, 'favoritos');
    const isAssistido = estaNaCategoria(filme.id, 'assistidos');
    const isQueroVer = estaNaCategoria(filme.id, 'queroVer');
    
    const modalDetalhes = document.getElementById('modal-detalhes');
    modalDetalhes.innerHTML = `
        <div class="modal-poster">
            <img class="modal-poster-img" src="${filme.poster}" alt="${filme.titulo}" onerror="this.src='https://via.placeholder.com/300x450?text=Sem+Poster'">
            <div class="modal-info">
                <h2 class="modal-titulo">${escapeHtml(filme.titulo)}</h2>
                <p class="modal-ano">${filme.ano} • ${filme.genero.join(', ')}</p>
                <p class="modal-descricao">${escapeHtml(filme.descricao)}</p>
                <div class="modal-acoes">
                    <button class="modal-btn modal-btn-primary" onclick="toggleCategoria(${filme.id}, 'assistidos'); abrirModalDetalhes(${filme.id})">
                        ${isAssistido ? '✅ Já Assistido' : '🎬 Marcar Assistido'}
                    </button>
                    <button class="modal-btn modal-btn-secondary" onclick="toggleCategoria(${filme.id}, 'queroVer'); abrirModalDetalhes(${filme.id})">
                        ${isQueroVer ? '✓ Na Lista' : '⏰ Quero Ver'}
                    </button>
                    <button class="modal-btn modal-btn-secondary" onclick="toggleCategoria(${filme.id}, 'favoritos'); abrirModalDetalhes(${filme.id})">
                        ${isFavorito ? '⭐ Favoritado' : '☆ Favoritar'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('modalDetalhes').style.display = 'block';
}

function fecharModalDetalhes() {
    document.getElementById('modalDetalhes').style.display = 'none';
}

// Setup filtros
function setupFiltros() {
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtroAtual = btn.dataset.filtro;
            atualizarTodosOsFilmes();
        });
    });
}

// Funções de utilidade
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function atualizarSelectFilmes() {
    const select = document.getElementById('filme');
    select.innerHTML = '<option value="">-- Escolha um filme --</option>';
    filmes.forEach(filme => {
        select.innerHTML += `<option value="${filme.id}">${escapeHtml(filme.titulo)} (${filme.ano})</option>`;
    });
}

// Funções de localStorage
function salvarAvaliacoes() {
    localStorage.setItem('cinevortex_avaliacoes', JSON.stringify(avaliacoes));
}

function carregarAvaliacoes() {
    const saved = localStorage.getItem('cinevortex_avaliacoes');
    if (saved) {
        avaliacoes = JSON.parse(saved);
        mostrarAvaliacoes();
    }
}

function salvarFilmes() {
    localStorage.setItem('cinevortex_filmes', JSON.stringify(filmes));
}

function carregarFilmes() {
    const saved = localStorage.getItem('cinevortex_filmes');
    if (saved) {
        filmes = JSON.parse(saved);
    } else {
        // Filmes de exemplo
        filmes = [];
    }
}

function salvarBiblioteca() {
    localStorage.setItem('cinevortex_biblioteca', JSON.stringify(bibliotecaUsuario));
}

function carregarBiblioteca() {
    const saved = localStorage.getItem('cinevortex_biblioteca');
    if (saved) {
        bibliotecaUsuario = JSON.parse(saved);
    }
    atualizarStats();
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modalAdicionar = document.getElementById('modalAdicionar');
    const modalDetalhes = document.getElementById('modalDetalhes');
    if (event.target === modalAdicionar) {
        fecharModalAdicionar();
    }
    if (event.target === modalDetalhes) {
        fecharModalDetalhes();
    }
}

// Expor funções globalmente
window.avaliar = avaliar;
window.enviarAvaliacao = enviarAvaliacao;
window.adicionarFilme = adicionarFilme;
window.toggleCategoria = toggleCategoria;
window.abrirModalAdicionar = abrirModalAdicionar;
window.fecharModalAdicionar = fecharModalAdicionar;
window.abrirModalDetalhes = abrirModalDetalhes;
window.fecharModalDetalhes = fecharModalDetalhes;