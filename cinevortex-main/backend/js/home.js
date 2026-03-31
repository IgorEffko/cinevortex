// Variáveis globais
let notaSelecionada = 0;
let avaliacoes = [];

// Carrega avaliações salvas ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    carregarAvaliacoes();
});

// Função para avaliar com estrelas
function avaliar(nota) {
    notaSelecionada = nota;
    
    // Atualiza as estrelas
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
    
    // Atualiza texto
    const textoNota = document.getElementById('notaTexto');
    const notas = ['péssimo', 'ruim', 'regular', 'bom', 'excelente'];
    textoNota.textContent = `Você avaliou como ${notas[nota-1]} (${nota} estrelas)`;
}

// Função para enviar avaliação
function enviarAvaliacao() {
    // Pega valores
    const filmeSelect = document.getElementById('filme');
    const filme = filmeSelect.options[filmeSelect.selectedIndex]?.text;
    const comentario = document.getElementById('comentario').value;
    
    // Validações
    if (!filmeSelect.value) {
        alert('❌ Selecione um filme para avaliar');
        return;
    }
    
    if (notaSelecionada === 0) {
        alert('❌ Dê uma nota para o filme');
        return;
    }
    
    // Cria objeto da avaliação
    const avaliacao = {
        id: Date.now(),
        filme: filme,
        nota: notaSelecionada,
        comentario: comentario || 'Sem comentário',
        data: new Date().toLocaleDateString('pt-BR')
    };
    
    // Adiciona à lista
    avaliacoes.unshift(avaliacao);
    
    // Salva no localStorage
    salvarAvaliacoes();
    
    // Atualiza a lista na tela
    mostrarAvaliacoes();
    
    // Limpa o formulário
    limparFormulario();
    
    // Mensagem de sucesso
    alert('✅ Avaliação enviada com sucesso!');
}

// Função para mostrar avaliações
function mostrarAvaliacoes() {
    const lista = document.getElementById('avaliacoesLista');
    
    if (avaliacoes.length === 0) {
        lista.innerHTML = '<div class="sem-avaliacoes">Nenhuma avaliação ainda. Seja o primeiro a avaliar!</div>';
        return;
    }
    
    let html = '';
    avaliacoes.forEach(av => {
        // Cria as estrelas baseado na nota
        let estrelas = '';
        for (let i = 1; i <= 5; i++) {
            estrelas += i <= av.nota ? '★' : '☆';
        }
        
        html += `
            <div class="avaliacao-item">
                <div class="avaliacao-header">
                    <span class="avaliacao-filme">${av.filme}</span>
                    <span class="avaliacao-estrelas">${estrelas}</span>
                </div>
                <div class="avaliacao-comentario">${av.comentario}</div>
                <div class="avaliacao-data">${av.data}</div>
            </div>
        `;
    });
    
    lista.innerHTML = html;
}

// Função para limpar formulário
function limparFormulario() {
    // Reseta select
    document.getElementById('filme').value = '';
    
    // Reseta estrelas
    notaSelecionada = 0;
    const estrelas = document.querySelectorAll('.estrela');
    estrelas.forEach(estrela => {
        estrela.textContent = '☆';
        estrela.classList.remove('ativa');
    });
    
    // Reseta texto
    document.getElementById('notaTexto').textContent = 'Clique nas estrelas';
    
    // Limpa comentário
    document.getElementById('comentario').value = '';
}

// Função para salvar no localStorage
function salvarAvaliacoes() {
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
}

// Função para carregar do localStorage
function carregarAvaliacoes() {
    const saved = localStorage.getItem('avaliacoes');
    if (saved) {
        avaliacoes = JSON.parse(saved);
        mostrarAvaliacoes();
    }
}

// Efeitos nos cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Destaque do link ativo
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Funções para botões (evitar propagação)
document.querySelectorAll('.btn-login, .btn-signup, .card-btn, .btn-logout, .btn-comprar').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Mensagem no console
console.log('🎬 CineVortex - Sistema de Avaliações');