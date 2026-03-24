<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CineVortex • Serviço</title>
    <link rel="stylesheet" href="servico.css">
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
        <div class="service-box">
            <!-- Header -->
            <div class="service-header">
                <a href="inicial.html" class="btn-voltar">← Voltar</a>
                <div class="logo-icon">🎫</div>
                <h1 class="title">SERVIÇOS <span>CINEVORTEX</span></h1>
                <p class="subtitle">Escolha a melhor opção para sua experiência</p>
            </div>

            <!-- Cards de serviços -->
            <div class="services-grid">
                <!-- Plano Básico -->
                <div class="service-card" onclick="selecionarPlano('basico')">
                    <div class="card-tag">POPULAR</div>
                    <div class="card-icon">🍿</div>
                    <h3>Plano Básico</h3>
                    <div class="card-price">R$ 29,90<span>/mês</span></div>
                    <ul class="card-features">
                        <li>✓ 1 ingresso por mês</li>
                        <li>✓ Pipoca pequena grátis</li>
                        <li>✓ Desconto em combos</li>
                        <li>✓ 1 tela simultânea</li>
                    </ul>
                    <button class="btn-assinar" onclick="assinarPlano('basico')">ASSINAR AGORA</button>
                </div>

                <!-- Plano Premium -->
                <div class="service-card destaque" onclick="selecionarPlano('premium')">
                    <div class="card-tag">MAIS VENDIDO</div>
                    <div class="card-icon">🎬</div>
                    <h3>Plano Premium</h3>
                    <div class="card-price">R$ 49,90<span>/mês</span></div>
                    <ul class="card-features">
                        <li>✓ 3 ingressos por mês</li>
                        <li>✓ Pipoca grande grátis</li>
                        <li>✓ 2 combos com desconto</li>
                        <li>✓ 3 telas simultâneas</li>
                        <li>✓ Acesso antecipado</li>
                    </ul>
                    <button class="btn-assinar" onclick="assinarPlano('premium')">ASSINAR AGORA</button>
                </div>

                <!-- Plano Família -->
                <div class="service-card" onclick="selecionarPlano('familia')">
                    <div class="card-tag">ECONÔMICO</div>
                    <div class="card-icon">👨‍👩‍👧‍👦</div>
                    <h3>Plano Família</h3>
                    <div class="card-price">R$ 79,90<span>/mês</span></div>
                    <ul class="card-features">
                        <li>✓ 5 ingressos por mês</li>
                        <li>✓ 3 pipocas grátis</li>
                        <li>✓ Combos família</li>
                        <li>✓ 5 telas simultâneas</li>
                        <li>✓ Estacionamento grátis</li>
                    </ul>
                    <button class="btn-assinar" onclick="assinarPlano('familia')">ASSINAR AGORA</button>
                </div>
            </div>

            <!-- Serviços adicionais -->
            <div class="extras">
                <h2 class="extras-title">Serviços Avulsos</h2>
                
                <div class="extras-grid">
                    <div class="extra-item" onclick="comprarExtra('ingresso')">
                        <span class="extra-icon">🎫</span>
                        <div class="extra-info">
                            <h4>Ingresso Avulso</h4>
                            <p>R$ 24,00</p>
                        </div>
                        <button class="extra-btn">Comprar</button>
                    </div>

                    <div class="extra-item" onclick="comprarExtra('pipoca')">
                        <span class="extra-icon">🍿</span>
                        <div class="extra-info">
                            <h4>Pipoca + Refri</h4>
                            <p>R$ 19,90</p>
                        </div>
                        <button class="extra-btn">Comprar</button>
                    </div>

                    <div class="extra-item" onclick="comprarExtra('combopremium')">
                        <span class="extra-icon">🥤</span>
                        <div class="extra-info">
                            <h4>Combo Premium</h4>
                            <p>R$ 35,90</p>
                        </div>
                        <button class="extra-btn">Comprar</button>
                    </div>

                    <div class="extra-item" onclick="comprarExtra('vip')">
                        <span class="extra-icon">👑</span>
                        <div class="extra-info">
                            <h4>Sala VIP</h4>
                            <p>R$ 45,00</p>
                        </div>
                        <button class="extra-btn">Comprar</button>
                    </div>
                </div>
            </div>

            <!-- Informações adicionais -->
            <div class="info-box">
                <p>🎬 Assinantes CineVortex têm 10% de desconto na bomboniere</p>
                <p>📱 Aplicativo disponível para iOS e Android</p>
            </div>
        </div>
    </div>
    <script src="servico.js"></script>
</body>
</html>