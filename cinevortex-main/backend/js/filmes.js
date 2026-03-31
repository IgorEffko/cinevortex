// Banco de dados de filmes do usuário (armazenado no localStorage)
let filmesUsuario = [];
let proximoId = 1;

// Estado da interface
let abaAtual = 'todos';

// Carregar filmes do localStorage
function carregarFilmes() {
    const saved = localStorage.getItem('cinevortex_filmes');
    if (saved) {
        filmesUsuario = JSON.parse(saved);
        // Encontrar o próximo ID disponível
        if (filmesUsuario.length > 0) {
            proximoId = Math.max(...filmesUsuario.map(f => f.id)) + 1;
        }
    }
    // NÃO TEM FILMES DE EXEMPLO - COMEÇA VAZIO
    atualizarStats();
    renderizarFilmes();
}

// Salvar filmes no localStorage
function salvarFilmes() {
    localStorage.setItem('cinevortex_filmes', JSON.stringify(filmesUsuario));
    atualizarStats();
    renderizarFilmes();
}

// Atualizar estatísticas
function atualizarStats() {
    const total = filmesUsuario.length;
    const assistidos = filmesUsuario.filter(f => f.status === 'assistidos').length;
    const favoritos = filmesUsuario.filter(f => f.status === 'favoritos').length;
    const queroVer = filmesUsuario.filter(f => f.status === 'quero-ver').length;
    
    const totalFilmesEl = document.getElementById('totalFilmes');
    const totalAssistidosEl = document.getElementById('totalAssistidos');
    const totalFavoritosEl = document.getElementById('totalFavoritos');
    const totalQueroVerEl = document.getElementById('totalQueroVer');
    
    if (totalFilmesEl) totalFilmesEl.textContent = total;
    if (totalAssistidosEl) totalAssistidosEl.textContent = assistidos;
    if (totalFavoritosEl) totalFavoritosEl.textContent = favoritos;
    if (totalQueroVerEl) totalQueroVerEl.textContent = queroVer;
}

// Adicionar novo filme
function adicionarFilme(filme) {
    const novoFilme = {
        id: proximoId++,
        ...filme,
        status: filme.status || 'nenhum',
        avaliacao: null
    };
    filmesUsuario.push(novoFilme);
    salvarFilmes();
}

// Editar filme existente
function editarFilme(id, dadosAtualizados) {
    const index = filmesUsuario.findIndex(f => f.id === id);
    if (index !== -1) {
        filmesUsuario[index] = { ...filmesUsuario[index], ...dadosAtualizados };
        salvarFilmes();
    }
}

// Deletar filme
function deletarFilme(id) {
    if (confirm('Tem certeza que deseja remover este filme da sua coleção?')) {
        filmesUsuario = filmesUsuario.filter(f => f.id !== id);
        salvarFilmes();
        fecharModalDetalhes();
    }
}

// Alterar status do filme
function alterarStatus(id, novoStatus) {
    const filme = filmesUsuario.find(f => f.id === id);
    if (filme) {
        if (filme.status === novoStatus) {
            filme.status = 'nenhum';
        } else {
            filme.status = novoStatus;
        }
        salvarFilmes();
        if (modalAtual === id) {
            abrirDetalhes(id);
        }
    }
}

// Salvar avaliação
function salvarAvaliacao(id) {
    const notaSelecionada = document.querySelector(`#stars-container-${id} .star.active`);
    const nota = notaSelecionada ? parseInt(notaSelecionada.dataset.valor) : 0;
    const comentario = document.getElementById(`avaliacao-texto-${id}`)?.value || '';
    
    const filme = filmesUsuario.find(f => f.id === id);
    if (filme) {
        if (nota > 0 || comentario) {
            filme.avaliacao = {
                nota: nota,
                comentario: comentario,
                data: new Date().toISOString()
            };
        } else {
            filme.avaliacao = null;
        }
        salvarFilmes();
        if (modalAtual === id) {
            abrirDetalhes(id);
        }
    }
}

// Renderizar filmes
function renderizarFilmes() {
    let filmesFiltrados = [...filmesUsuario];
    
    if (abaAtual !== 'todos') {
        filmesFiltrados = filmesFiltrados.filter(f => f.status === abaAtual);
    }
    
    const container = document.getElementById('filmes-grid');
    
    if (!container) return;
    
    if (filmesFiltrados.length === 0) {
        let mensagem = '';
        let subMensagem = '';
        
        if (abaAtual === 'quero-ver') {
            mensagem = 'Nenhum filme na lista "Quero Assistir"';
            subMensagem = 'Adicione filmes que você quer assistir';
        } else if (abaAtual === 'favoritos') {
            mensagem = 'Nenhum filme nos favoritos';
            subMensagem = 'Adicione seus filmes favoritos';
        } else if (abaAtual === 'assistidos') {
            mensagem = 'Nenhum filme assistido ainda';
            subMensagem = 'Marque os filmes que você já assistiu';
        } else {
            mensagem = 'Sua coleção está vazia';
            subMensagem = 'Clique em "Adicionar Novo Filme" para começar!';
        }
        
        container.innerHTML = `
            <div class="empty-message">
                <span>🎬</span>
                <p>${mensagem}</p>
                <small>${subMensagem}</small>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filmesFiltrados.map(filme => {
        let badges = '';
        if (filme.status === 'favoritos') badges += '<div class="badge favorito">⭐ Favorito</div>';
        else if (filme.status === 'assistidos') badges += '<div class="badge assistido">✅ Assistido</div>';
        else if (filme.status === 'quero-ver') badges += '<div class="badge quero-ver">⏰ Quero Ver</div>';
        
        if (filme.avaliacao && filme.avaliacao.nota > 0) {
            badges += `<div class="badge avaliacao">⭐ ${filme.avaliacao.nota}/10</div>`;
        }
        
        return `
            <div class="filme-card" onclick="abrirDetalhes(${filme.id})">
                <div class="filme-poster">
                    <img src="${filme.imagem || 'https://via.placeholder.com/300x450?text=Sem+Imagem'}" alt="${filme.nome}" onerror="this.src='https://via.placeholder.com/300x450?text=Imagem+não+encontrada'">
                    <div class="filme-badges">${badges}</div>
                    <div class="filme-overlay">
                        <button class="btn-acao ${filme.status === 'quero-ver' ? 'ativo' : ''}" onclick="event.stopPropagation(); alterarStatus(${filme.id}, 'quero-ver')">
                            ${filme.status === 'quero-ver' ? '✓ Quero Ver' : '⏰ Quero Ver'}
                        </button>
                        <button class="btn-acao ${filme.status === 'favoritos' ? 'ativo' : ''}" onclick="event.stopPropagation(); alterarStatus(${filme.id}, 'favoritos')">
                            ${filme.status === 'favoritos' ? '⭐ Favorito' : '☆ Favoritar'}
                        </button>
                        <button class="btn-acao ${filme.status === 'assistidos' ? 'ativo' : ''}" onclick="event.stopPropagation(); alterarStatus(${filme.id}, 'assistidos')">
                            ${filme.status === 'assistidos' ? '✓ Assistido' : '✅ Marcar Assistido'}
                        </button>
                        <button class="btn-acao" style="background:#f44336;" onclick="event.stopPropagation(); deletarFilme(${filme.id})">
                            🗑️ Remover
                        </button>
                    </div>
                </div>
                <div class="filme-info">
                    <div class="filme-titulo">${filme.nome}</div>
                    <div class="filme-descricao">${filme.descricao.substring(0, 80)}${filme.descricao.length > 80 ? '...' : ''}</div>
                    <div class="filme-detalhes">
                        <span>${filme.ano || 'Ano N/A'}</span>
                        <span>${filme.genero || 'Sem gênero'}</span>
                        ${filme.avaliacao ? `<span class="filme-nota">⭐ ${filme.avaliacao.nota}/10</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Abrir modal de adicionar/editar filme
let editandoId = null;

function abrirModalFilme(filmeId = null) {
    editandoId = filmeId;
    const modal = document.getElementById('modalFilme');
    const titulo = document.getElementById('modalFilmeTitulo');
    const form = document.getElementById('formFilme');
    
    if (!modal) return;
    
    if (filmeId) {
        const filme = filmesUsuario.find(f => f.id === filmeId);
        if (filme) {
            titulo.textContent = '✎ Editar Filme';
            document.getElementById('filmeNome').value = filme.nome;
            document.getElementById('filmeImagem').value = filme.imagem || '';
            document.getElementById('filmeDescricao').value = filme.descricao;
            document.getElementById('filmeGenero').value = filme.genero || '';
            document.getElementById('filmeAno').value = filme.ano || '';
            const statusSelect = document.getElementById('filmeStatus');
            if (statusSelect) statusSelect.value = filme.status || 'nenhum';
            
            if (filme.imagem) {
                const preview = document.getElementById('imagemPreview');
                const previewImg = document.getElementById('previewImg');
                if (previewImg) previewImg.src = filme.imagem;
                if (preview) preview.style.display = 'block';
            } else {
                const preview = document.getElementById('imagemPreview');
                if (preview) preview.style.display = 'none';
            }
        }
    } else {
        titulo.textContent = '➕ Adicionar Novo Filme';
        if (form) form.reset();
        const preview = document.getElementById('imagemPreview');
        if (preview) preview.style.display = 'none';
        const statusSelect = document.getElementById('filmeStatus');
        if (statusSelect) statusSelect.value = 'nenhum';
    }
    
    modal.style.display = 'block';
}

function fecharModalFilme() {
    const modal = document.getElementById('modalFilme');
    if (modal) modal.style.display = 'none';
    editandoId = null;
}

// Preview da imagem
document.addEventListener('DOMContentLoaded', () => {
    const imagemInput = document.getElementById('filmeImagem');
    if (imagemInput) {
        imagemInput.addEventListener('input', function() {
            const url = this.value;
            const preview = document.getElementById('imagemPreview');
            const previewImg = document.getElementById('previewImg');
            
            if (url && preview && previewImg) {
                previewImg.src = url;
                preview.style.display = 'block';
            } else if (preview) {
                preview.style.display = 'none';
            }
        });
    }
});

// Salvar filme do formulário
function salvarFilmeFormulario(event) {
    event.preventDefault();
    
    const filmeData = {
        nome: document.getElementById('filmeNome').value.trim(),
        imagem: document.getElementById('filmeImagem').value.trim(),
        descricao: document.getElementById('filmeDescricao').value.trim(),
        genero: document.getElementById('filmeGenero').value.trim(),
        ano: document.getElementById('filmeAno').value.trim(),
        status: document.getElementById('filmeStatus')?.value || 'nenhum'
    };
    
    if (!filmeData.nome) {
        alert('Por favor, preencha o nome do filme!');
        return;
    }
    
    if (!filmeData.descricao) {
        alert('Por favor, preencha a descrição do filme!');
        return;
    }
    
    if (editandoId) {
        editarFilme(editandoId, filmeData);
    } else {
        adicionarFilme(filmeData);
    }
    
    fecharModalFilme();
}

// Modal de detalhes
let modalAtual = null;

function abrirDetalhes(id) {
    const filme = filmesUsuario.find(f => f.id === id);
    if (!filme) return;
    
    modalAtual = id;
    const modal = document.getElementById('modalDetalhes');
    const container = document.getElementById('detalhesConteudo');
    
    if (!modal || !container) return;
    
    const avaliacao = filme.avaliacao;
    
    // Gerar estrelas
    let estrelasHTML = '';
    for (let i = 1; i <= 10; i++) {
        const isActive = avaliacao && avaliacao.nota >= i;
        estrelasHTML += `<span class="star ${isActive ? 'active' : ''}" data-valor="${i}">★</span>`;
    }
    
    container.innerHTML = `
        <div class="detalhes-container">
            <div class="detalhes-poster">
                <img src="${filme.imagem || 'https://via.placeholder.com/300x450?text=Sem+Imagem'}" alt="${filme.nome}" onerror="this.src='https://via.placeholder.com/300x450?text=Imagem+não+encontrada'">
            </div>
            <div class="detalhes-info">
                <h1 class="detalhes-titulo">${filme.nome}</h1>
                <div class="detalhes-metadados">
                    <span>📅 ${filme.ano || 'Ano não informado'}</span>
                    <span>🎭 ${filme.genero || 'Gênero não informado'}</span>
                    ${filme.avaliacao ? `<span>⭐ Avaliação: ${filme.avaliacao.nota}/10</span>` : ''}
                </div>
                <p class="detalhes-descricao">${filme.descricao}</p>
                
                <div class="avaliacao-section">
                    <h3 class="avaliacao-titulo">⭐ Minha Avaliação</h3>
                    <div class="stars-container" id="stars-container-${filme.id}">
                        ${estrelasHTML}
                    </div>
                    <textarea id="avaliacao-texto-${filme.id}" class="avaliacao-texto" rows="3" placeholder="Escreva sua crítica ou comentário sobre o filme...">${avaliacao ? avaliacao.comentario : ''}</textarea>
                    <button class="salvar-avaliacao-btn" onclick="salvarAvaliacao(${filme.id})">💾 Salvar Avaliação</button>
                    
                    ${avaliacao && (avaliacao.nota > 0 || avaliacao.comentario) ? `
                        <div class="avaliacao-existente">
                            <p><strong>⭐ Avaliação salva em:</strong> ${new Date(avaliacao.data).toLocaleDateString('pt-BR')}</p>
                            ${avaliacao.nota > 0 ? `<p><strong>Nota:</strong> ${avaliacao.nota}/10</p>` : ''}
                            ${avaliacao.comentario ? `<p><strong>Comentário:</strong> ${avaliacao.comentario}</p>` : ''}
                        </div>
                    ` : ''}
                </div>
                
                <div class="detalhes-acoes">
                    <button class="detalhes-btn detalhes-btn-primary" onclick="alterarStatus(${filme.id}, 'assistidos'); abrirDetalhes(${filme.id})">
                        ${filme.status === 'assistidos' ? '✅ Já Assistido' : '🎬 Marcar como Assistido'}
                    </button>
                    <button class="detalhes-btn detalhes-btn-secondary" onclick="alterarStatus(${filme.id}, 'quero-ver'); abrirDetalhes(${filme.id})">
                        ${filme.status === 'quero-ver' ? '✓ Na Lista' : '⏰ Quero Ver'}
                    </button>
                    <button class="detalhes-btn detalhes-btn-secondary" onclick="alterarStatus(${filme.id}, 'favoritos'); abrirDetalhes(${filme.id})">
                        ${filme.status === 'favoritos' ? '⭐ Favoritado' : '☆ Favoritar'}
                    </button>
                    <button class="detalhes-btn detalhes-btn-secondary" onclick="abrirModalFilme(${filme.id}); fecharModalDetalhes()">
                        ✎ Editar Filme
                    </button>
                    <button class="detalhes-btn detalhes-btn-secondary" style="background:#f44336; color:white;" onclick="deletarFilme(${filme.id}); fecharModalDetalhes()">
                        🗑️ Remover Filme
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar evento nas estrelas
    const starsContainer = document.getElementById(`stars-container-${filme.id}`);
    if (starsContainer) {
        const stars = starsContainer.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const valor = parseInt(this.dataset.valor);
                stars.forEach((s, index) => {
                    if (index < valor) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });
    }
    
    modal.style.display = 'block';
}

function fecharModalDetalhes() {
    const modal = document.getElementById('modalDetalhes');
    if (modal) modal.style.display = 'none';
    modalAtual = null;
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarFilmes();
    
    // Event listeners
    const btnAddFilme = document.getElementById('btnAddFilme');
    if (btnAddFilme) {
        btnAddFilme.addEventListener('click', () => abrirModalFilme());
    }
    
    const btnCancelarFilme = document.getElementById('btnCancelarFilme');
    if (btnCancelarFilme) {
        btnCancelarFilme.addEventListener('click', fecharModalFilme);
    }
    
    const formFilme = document.getElementById('formFilme');
    if (formFilme) {
        formFilme.addEventListener('submit', salvarFilmeFormulario);
    }
    
    document.querySelectorAll('.close-filme').forEach(btn => {
        btn.addEventListener('click', fecharModalFilme);
    });
    
    document.querySelectorAll('.close-detalhes').forEach(btn => {
        btn.addEventListener('click', fecharModalDetalhes);
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            abaAtual = btn.dataset.tab;
            renderizarFilmes();
        });
    });
    
    // Fechar modais clicando fora
    window.addEventListener('click', (e) => {
        const modalFilme = document.getElementById('modalFilme');
        const modalDetalhes = document.getElementById('modalDetalhes');
        if (e.target === modalFilme) fecharModalFilme();
        if (e.target === modalDetalhes) fecharModalDetalhes();
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharModalFilme();
            fecharModalDetalhes();
        }
    });
});

// Expor funções globalmente
window.abrirModalFilme = abrirModalFilme;
window.abrirDetalhes = abrirDetalhes;
window.alterarStatus = alterarStatus;
window.deletarFilme = deletarFilme;
window.salvarAvaliacao = salvarAvaliacao;
window.fecharModalDetalhes = fecharModalDetalhes;