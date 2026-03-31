<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CineVortex • Cadastro</title>
    <link rel="stylesheet" href="css/usuario.css">
</head>
<body>
    <!-- Partículas de fundo (efeito visual) -->
    <div class="particles">
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
        <div class="particle"></div>
    </div>

    <div class="container">
        <div class="signup-box">
            <!-- Logo e título -->
            <div class="signup-header">
                <div class="logo-icon">🎬</div>
                <h1 class="title">CINE<span>VORTEX</span></h1>
                <p class="subtitle">Crie sua conta e entre no universo do cinema</p>
            </div>

            <!-- Formulário de cadastro -->
            <form id="cadastroForm" class="signup-form">
                <!-- Campo Nome -->
                <div class="input-group">
                    <label for="nome">
                        <span class="label-icon">👤</span>
                        Nome completo
                    </label>
                    <input 
                        type="text" 
                        id="nome" 
                        required 
                        placeholder="Digite seu nome completo"
                        autocomplete="off"
                    >
                    <div class="input-highlight"></div>
                </div>

                <!-- Campo Email -->
                <div class="input-group">
                    <label for="email">
                        <span class="label-icon">📧</span>
                        E-mail
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        required 
                        placeholder="seu@email.com"
                        autocomplete="off"
                    >
                    <div class="input-highlight"></div>
                </div>

                <!-- Campo Senha -->
                <div class="input-group">
                    <label for="senha">
                        <span class="label-icon">🔒</span>
                        Senha
                    </label>
                    <div class="password-wrapper">
                        <input 
                            type="password" 
                            id="senha" 
                            required 
                            placeholder="Crie uma senha forte"
                        >
                        <button type="button" class="toggle-password" onclick="togglePassword('senha')">
                            👁️
                        </button>
                    </div>
                    <div class="password-strength" id="passwordStrength">
                        <div class="strength-bar"></div>
                        <div class="strength-bar"></div>
                        <div class="strength-bar"></div>
                    </div>
                    <small class="password-hint">Mínimo 6 caracteres</small>
                </div>

                <!-- Campo Confirmar Senha -->
                <div class="input-group">
                    <label for="confirmarSenha">
                        <span class="label-icon">✓</span>
                        Confirmar senha
                    </label>
                    <div class="password-wrapper">
                        <input 
                            type="password" 
                            id="confirmarSenha" 
                            required 
                            placeholder="Digite a senha novamente"
                        >
                        <button type="button" class="toggle-password" onclick="togglePassword('confirmarSenha')">
                            👁️
                        </button>
                    </div>
                    <div class="password-match" id="passwordMatch"></div>
                </div>

                <!-- Termos e condições -->
                <div class="terms-group">
                    <label class="checkbox-container">
                        <input type="checkbox" id="termos" required>
                        <span class="checkmark"></span>
                        <span class="terms-text">
                            Eu aceito os <a href="#">Termos de Uso</a> e a <a href="#">Política de Privacidade</a>
                        </span>
                    </label>
                </div>

                <!-- Botão de cadastro -->
                <button type="submit" class="btn-signup" id="btnSignup">
                    <span class="btn-text">CRIAR CONTA</span>
                    <span class="btn-icon">→</span>
                </button>

                <!-- Link para login -->
                <div class="login-link">
                    Já tem uma conta? <a href="#">Fazer login</a>
                </div>
            </form>

            <!-- Redes sociais (opcional, só pra decorar) -->
            <div class="social-divider">
                <span>ou continue com</span>
            </div>

            <div class="social-buttons">
                <button type="button" class="social-btn" onclick="alert('Google Login - Em breve!')">
                    <span class="social-icon">G</span>
                    <span>Google</span>
                </button>
                <button type="button" class="social-btn" onclick="alert('Facebook Login - Em breve!')">
                    <span class="social-icon">f</span>
                    <span>Facebook</span>
                </button>
            </div>
        </div>

        <!-- Citação de filme (detalhe) -->
        <div class="movie-quote">
            <p>"Que a força esteja com você"</p>
            <span>- Star Wars</span>
        </div>
    </div>

    <script src="js/usuario.js"></script>
</body>
</html>