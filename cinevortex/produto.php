<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CineVortex • Produto</title>
    <link rel="stylesheet" href="produto.css">
</head>
<body>
  <!-- Partículas de fundo -->
    <div class="particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>

    <div class="container">
        <div class="product-box">
            <!-- Header -->
            <div class="product-header">
                <a href="inicial.html" class="btn-voltar">← Voltar</a>
                <div class="logo-icon">🍿</div>
                <h1 class="title">BOMBONIERE <span>CINEVORTEX</span></h1>
                <p class="subtitle">Os melhores produtos para sua sessão</p>
            </div>

            <!-- Categorias -->
            <div class="categorias">
                <button class="categoria-btn ativo" onclick="filtrarCategoria('todos')">Todos</button>
                <button class="categoria-btn" onclick="filtrarCategoria('pipocas')">Pipocas</button>
                <button class="categoria-btn" onclick="filtrarCategoria('bebidas')">Bebidas</button>
                <button class="categoria-btn" onclick="filtrarCategoria('combos')">Combos</button>
                <button class="categoria-btn" onclick="filtrarCategoria('doces')">Doces</button>
            </div>

            <!-- Grid de produtos -->
            <div class="products-grid">
                <!-- Pipoca Pequena -->
                <div class="product-card" data-categoria="pipocas">
                    <div class="product-badge">MAIS VENDIDO</div>
                    <div class="product-image">🍿</div>
                    <div class="product-info">
                        <h3>Pipoca Pequena</h3>
                        <p>Pipoca tradicional salgada</p>
                        <div class="product-price">
                            <span class="price">R$ 12,90</span>
                            <button class="btn-add" onclick="adicionarAoCarrinho('Pipoca Pequena', 12.90)">Comprar</button>
                        </div>
                    </div>
                </div>

                <!-- Pipoca Grande -->
                <div class="product-card" data-categoria="pipocas">
                    <div class="product-image">🍿</div>
                    <div class="product-info">
                        <h3>Pipoca Grande</h3>
                        <p>Pipoca grande com manteiga</p>
                        <div class="product-price">
                            <span class="price">R$ 19,90</span>
                            <button class="btn-add" onclick="adicionarAoCarrinho('Pipoca Grande', 19.90)">Comprar</button>
                        </div>
                    </div>
                </div>

                <!-- Refrigerante -->
                <div class="product-card" data-categoria="bebidas">
                    <div class="product-image">🥤</div>
                    <div class="product-info">
                        <h3>Refrigerante</h3>
                        <p>Coca-Cola 500ml</p>
                        <div class="product-price">
                            <span class="price">R$ 8,90</span>
                            <button class="btn-add" onclick="adicionarAoCarrinho('Refrigerante', 8.90)">Comprar</button>
                        </div>
                    </div>
                </div>

                <!-- Água -->
                <div class="product-card" data-categoria="bebidas">
                    <div class="product-image">💧</div>
                    <div class="product-info">
                        <h3>Água Mineral</h3>
                        <p>Água sem gás 500ml</p>
                        <div class="product-price">
                            <span class="price">R$ 4,90</span>
                            <button class="btn-add" onclick="adicionarAoCarrinho('Água Mineral', 4.90)">Comprar</button>
                        </div>
                    </div>
                </div>

                <!-- Combo Individual -->
                <div class="product-card" data-categoria="combos">
                    <div class="product-badge">ECONÔMICO</div>
                    <div class="product-image">🍱</div>
                    <div class="product-info">
                        <h3>Combo Individual</h3>
                        <p>Pipoca média + Refri 500ml</p>
                        <div class="product-price">
                            <span class="price">R$ 22,90</span>
                            <button class="btn-add" onclick="adicionarAoCarrinho('Combo Individual', 22.90)">Comprar</button>
                        </div>
                    </div>
                </div>

                <!-- Combo Família -->
                <div class="product-card" data-categoria="combos">
                    <div class="product-badge">PROMOÇÃO</div>
                    <div class="product-image">🍱</div>
                    <div class="product-info">
                        <h3>Combo Família</h3>
                        <p>2 Pipocas grandes + 2 Refris</p>
                        <div class="product-price">
                            <span class="price-old">R$ 59,90</span>
                            <span class="price">R$ 49,90</span>
                            <button class="btn-add" onclick="adicionarAoCarrinho('Combo Família', 49.90)">Comprar</button>
                        </div>
                    </div>
                </div>

                <!-- Chocolate -->
                <div class="product-card" data-categoria="doces">
                    <div class="product-image">🍫</div>
                    <div class="product-info">
                        <h3>Chocolate</h3>
                        <p>Barra de chocolate 100g</p>
                        <div class="product-price">
                            <span class="price">R$ 7,90</span>
                            <button class="btn-add" onclick="adicionarAoCarrinho('Chocolate', 7.90)">Comprar</button>
                        </div>
                    </div>
                </div>

                <!-- M&M's -->
                <div class="product-card" data-categoria="doces">
                    <div class="product-image">🍬</div>
                    <div class="product-info">
                        <h3>M&M's</h3>
                        <p>Pacote 140g</p>
                        <div class="product-price">
                            <span class="price">R$ 9,90</span>
                            <button class="btn-add" onclick="adicionarAoCarrinho('M&M\'s', 9.90)">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Carrinho de compras -->
            <div class="carrinho" id="carrinho">
                <h3 class="carrinho-title">
                    🛒 Meu Carrinho
                    <span class="carrinho-count" id="carrinhoCount">0</span>
                </h3>
                
                <div class="carrinho-items" id="carrinhoItems">
                    <p class="carrinho-vazio">Seu carrinho está vazio</p>
                </div>
                
                <div class="carrinho-total" id="carrinhoTotal">
                    Total: R$ 0,00
                </div>
                
                <button class="btn-finalizar" onclick="finalizarCompra()">
                    FINALIZAR PEDIDO
                </button>
            </div>
        </div>
    </div>

    <script src="produto.js"></script>
</body>
</html>