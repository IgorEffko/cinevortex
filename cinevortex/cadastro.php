<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>CineVortex • Cadastrar</title>
    <link rel="stylesheet" href="cadastro.css">
</head>
<body>
    <div class="signup-container">
        <h1 class="logo">CINE<span>VORTEX</span></h1>
        <form id="formCadastro" class="auth-card">
            <h2>Criar Conta</h2>
            <input type="text" id="cadNome" placeholder="Nome Completo" required>
            <input type="email" id="cadEmail" placeholder="E-mail" required>
            <input type="password" id="cadPass" placeholder="Senha" required>
            <button type="submit">Finalizar Cadastro</button>
            <div class="links">
                <a href="login.html">Já tenho conta</a>
                <a href="index.html">Cancelar</a>
            </div>
        </form>
    </div>
    <script src="js/cadastro.js"></script>
</body>
</html>