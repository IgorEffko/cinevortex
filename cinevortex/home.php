<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CineVortex • Início</title>
    <link rel="stylesheet" href="home.css">
</head>
<body>
    <header class="header">
        <div class="header-container">
            <h1 class="logo">CINE<span>VORTEX</span></h1>
                
            <nav class="nav">
                <a href="home.php" class="nav-link active">Início</a>
                <a href="produto.php" class="nav-link active">Produto</a>
                <a href="servico.php" class="nav-link active">Serviço</a>
            </nav>
            </nav>

            <div class="header-buttons">
                <button class="btn-login" onclick="window.location.href='login.php'">Entrar</button>
                <button class="btn-signup" onclick="window.location.href='cadastro.php'">Cadastrar</button>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="page-title">
            <h2>Bem-vindo ao <span>CineVortex</span></h2>
            <p>Avalie os filmes que você já assistiu</p>
        </div>
<div class="cards">
    <div class="card" onclick="window.location.href='login.php'">
        <div class="card-icon">👤</div>
        <h3>Usuário</h3>
        <p>Gerencie seu perfil e avaliações</p>
    </div>

    <div class="card" onclick="window.location.href='produto.php'">
        <div class="card-icon">🎬</div>
        <h3>Produto</h3>
        <p>Explore os produtos que oferecemos</p>
    </div>

    <div class="card" onclick="window.location.href='servico.php'">
        <div class="card-icon">🎫</div>
        <h3>Serviço</h3>
        <p>Veja os nossos serviços</p>
    </div>
</div>
<div class="avaliacao">
            <h3 class="section-title">⭐ Avalie um Filme</h3>
            
            <div class="avaliacao-container">
                <div class="select-filme">
                    <label for="filme">Digite o nome do filme:</label>
                    <input type="text" id="filme" class="select-input" placeholder="Ex: Batman, Matrix, Shrek...">
                </div>

                <div class="estrelas-container">
                    <label>Sua nota:</label>
                    <div class="estrelas">
                        <span class="estrela" onclick="avaliar(1)">☆</span>
                        <span class="estrela" onclick="avaliar(2)">☆</span>
                        <span class="estrela" onclick="avaliar(3)">☆</span>
                        <span class="estrela" onclick="avaliar(4)">☆</span>
                        <span class="estrela" onclick="avaliar(5)">☆</span>
                    </div>
                    <span class="nota-texto" id="notaTexto">Clique nas estrelas</span>
                </div>

                <div class="comentario">
                    <label for="comentario">Comentário (opcional):</label>
                    <textarea id="comentario" class="comentario-input" placeholder="O que você achou do filme?" rows="3"></textarea>
                </div>

                <button class="btn-avaliar" onclick="enviarAvaliacao()">
                    Enviar Avaliação
                </button>
            </div>
        </div>

        <div class="ultimas-avaliacoes">
            <h3 class="section-title">📝 Últimas Avaliações</h3>
            <div class="avaliacoes-lista" id="avaliacoesLista"></div>
        </div>

        <div class="logout-section">
            <button class="btn-logout" onclick="window.location.href='index.html'">
                <span>←</span> Voltar
            </button>
        </div>
    </main>

    <footer class="footer">
        <p>CineVortex © 2024 - Avaliações de filmes</p>
    </footer>

    <script src="home.js"></script>
</body>
</html>