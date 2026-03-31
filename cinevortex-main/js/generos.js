// Lista de gêneros de filmes com ícones
const generos = [
    { id: 1, nome: "Ação", icone: "🎬", cor: "#ff4757" },
    { id: 2, nome: "Aventura", icone: "🗺️", cor: "#ffa502" },
    { id: 3, nome: "Comédia", icone: "😂", cor: "#ffd32a" },
    { id: 4, nome: "Drama", icone: "🎭", cor: "#747d8c" },
    { id: 5, nome: "Ficção Científica", icone: "🚀", cor: "#1e90ff" },
    { id: 6, nome: "Terror", icone: "👻", cor: "#ff6b81" },
    { id: 7, nome: "Romance", icone: "💕", cor: "#ff6b6b" },
    { id: 8, nome: "Suspense", icone: "🔪", cor: "#4a4e69" },
    { id: 9, nome: "Animação", icone: "🎨", cor: "#70a1ff" },
    { id: 10, nome: "Documentário", icone: "📹", cor: "#a4b0be" },
    { id: 11, nome: "Fantasia", icone: "✨", cor: "#d98cff" },
    { id: 12, nome: "Musical", icone: "🎵", cor: "#ff9ff3" }
];

// Variáveis globais
let generosSelecionados = [];

// Carregar gêneros salvos do localStorage
function carregarGenerosSalvos() {
    const salvos = localStorage.getItem('generosFavoritos');
    if (salvos) {
        generosSelecionados = JSON.parse(salvos);
    }
}

// Salvar gêneros no localStorage
function salvarGeneros() {
    localStorage.setItem('generosFavoritos', JSON.stringify(generosSelecionados));
    atualizarContador();
}

// Alternar seleção de gênero
function toggleGenero(id) {
    const index = generosSelecionados.indexOf(id);
    if (index === -1) {
        generosSelecionados.push(id);
    } else {
        generosSelecionados.splice(index, 1);
    }
    salvarGeneros();
    renderizarGeneros();
}

// Limpar todos os gêneros selecionados
function limparSelecao() {
    if (generosSelecionados.length > 0) {
        if (confirm('Tem certeza que deseja limpar todos os gêneros selecionados?')) {
            generosSelecionados = [];
            salvarGeneros();
            renderizarGeneros();
        }
    }
}

// Atualizar contador de gêneros selecionados
function atualizarContador() {
    const contadorSpan = document.getElementById('contadorSelecionados');
    if (contadorSpan) {
        contadorSpan.textContent = generosSelecionados.length;
    }
}

// Confirmar seleção e voltar para tela inicial
function confirmarEVoltar() {
    if (generosSelecionados.length === 0) {
        // Se nenhum gênero foi selecionado, pergunta se quer continuar mesmo assim
        if (confirm('Você não selecionou nenhum gênero. Deseja continuar mesmo assim?')) {
            redirecionarParaHome();
        }
    } else {
        // Mostra mensagem de sucesso
        const generosNomes = generosSelecionados.map(id => {
            const genero = generos.find(g => g.id === id);
            return genero ? genero.nome : '';
        }).filter(nome => nome);
        
        const mensagem = `✨ Gêneros favoritos salvos com sucesso!\n\nSelecionados: ${generosNomes.join(', ')}`;
        alert(mensagem);
        
        redirecionarParaHome();
    }
}

// Redirecionar para a tela inicial
function redirecionarParaHome() {
    // Salva os gêneros uma última vez
    salvarGeneros();
    
    // Adiciona um pequeno delay para dar tempo de ver a mensagem
    setTimeout(() => {
        // Redireciona para a página inicial
        window.location.href = 'index.html';
        // Se estiver em um ambiente de desenvolvimento, use o caminho correto
        // window.location.href = '/';
    }, 500);
}

// Renderizar os cards de gêneros na tela
function renderizarGeneros() {
    const grid = document.getElementById('generosGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    generos.forEach(genero => {
        const isSelecionado = generosSelecionados.includes(genero.id);
        
        const card = document.createElement('div');
        card.className = `genero-card ${isSelecionado ? 'selecionado' : ''}`;
        card.onclick = () => toggleGenero(genero.id);
        
        card.innerHTML = `
            <div class="genero-icon">${genero.icone}</div>
            <div class="genero-nome">${genero.nome}</div>
            <div class="genero-check">✓</div>
        `;
        
        grid.appendChild(card);
    });
    
    atualizarContador();
}

// Inicializar a página
function init() {
    carregarGenerosSalvos();
    renderizarGeneros();
    
    // Adicionar event listeners
    const btnLimpar = document.getElementById('btnLimpar');
    const btnConfirmar = document.getElementById('btnConfirmar');
    
    if (btnLimpar) {
        btnLimpar.addEventListener('click', limparSelecao);
    }
    
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', confirmarEVoltar);
    }
}

// Aguardar o DOM carregar para inicializar
document.addEventListener('DOMContentLoaded', init);