// Carrinho de compras
let carrinho = [];
let total = 0;

// Carrega carrinho do localStorage ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    carregarCarrinho();
    atualizarCarrinho();
});

// Função para adicionar ao carrinho
function adicionarAoCarrinho(nome, preco) {
    // Verifica se o item já existe no carrinho
    const itemExistente = carrinho.find(item => item.nome === nome);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }
    
    // Atualiza o carrinho
    atualizarCarrinho();
    salvarCarrinho();
    
    // Feedback visual
    const btn = event.target;
    const textoOriginal = btn.textContent;
    btn.textContent = '✓ ADICIONADO';
    btn.style.background = '#4CAF50';
    btn.style.borderColor = '#4CAF50';
    
    setTimeout(() => {
        btn.textContent = textoOriginal;
        btn.style.background = '';
        btn.style.borderColor = '';
    }, 1000);
}

// Função para remover item do carrinho
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
    salvarCarrinho();
}

// Função para alterar quantidade
function alterarQuantidade(index, operacao) {
    if (operacao === 'aumentar') {
        carrinho[index].quantidade++;
    } else if (operacao === 'diminuir') {
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade--;
        } else {
            removerItem(index);
            return;
        }
    }
    
    atualizarCarrinho();
    salvarCarrinho();
}

// Função para atualizar o carrinho na tela
function atualizarCarrinho() {
    const carrinhoItems = document.getElementById('carrinhoItems');
    const carrinhoCount = document.getElementById('carrinhoCount');
    const carrinhoTotal = document.getElementById('carrinhoTotal');
    
    // Atualiza contador
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    carrinhoCount.textContent = totalItens;
    
    // Se carrinho vazio
    if (carrinho.length === 0) {
        carrinhoItems.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio</p>';
        carrinhoTotal.textContent = 'Total: R$ 0,00';
        return;
    }
    
    // Monta itens do carrinho
    let html = '';
    let total = 0;
    
    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        
        html += `
            <div class="carrinho-item">
                <div class="item-info">
                    <div class="item-nome">${item.nome}</div>
                    <div class="item-preco">R$ ${item.preco.toFixed(2)}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-qtd" onclick="alterarQuantidade(${index}, 'diminuir')">-</button>
                    <span class="item-qtd">${item.quantidade}</span>
                    <button class="btn-qtd" onclick="alterarQuantidade(${index}, 'aumentar')">+</button>
                    <button class="btn-remove" onclick="removerItem(${index})">×</button>
                </div>
            </div>
        `;
    });
    
    carrinhoItems.innerHTML = html;
    carrinhoTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Função para salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Função para carregar carrinho do localStorage
function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
    }
}

// Função para finalizar compra
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('❌ Seu carrinho está vazio!');
        return;
    }
    
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    
    // Mensagem personalizada
    let mensagem = '🎬 PEDIDO REALIZADO!\n\n';
    mensagem += 'Seus itens:\n';
    carrinho.forEach(item => {
        mensagem += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    mensagem += `\n💰 Total: R$ ${total.toFixed(2)}`;
    mensagem += '\n\n📱 Retire seu pedido na bomboniere';
    
    alert(mensagem);
    
    // Limpa carrinho
    carrinho = [];
    atualizarCarrinho();
    salvarCarrinho();
}

// Função para filtrar por categoria
function filtrarCategoria(categoria) {
    // Atualiza botões
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.classList.remove('ativo');
    });
    event.target.classList.add('ativo');
    
    // Filtra produtos
    const produtos = document.querySelectorAll('.product-card');
    
    produtos.forEach(produto => {
        if (categoria === 'todos') {
            produto.style.display = 'block';
        } else {
            const prodCategoria = produto.getAttribute('data-categoria');
            if (prodCategoria === categoria) {
                produto.style.display = 'block';
            } else {
                produto.style.display = 'none';
            }
        }
    });
}

// Animação dos produtos
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Não executa se clicou no botão
        if (e.target.classList.contains('btn-add')) return;
        
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// Mensagem no console
console.log('🎬 CineVortex - Bomboniere');