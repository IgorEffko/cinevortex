// Usuários cadastrados (simulação)
const usuarios = [
    {
        email: "admin@cinevortex.com",
        senha: "admin123",
        nome: "Administrador"
    },
    {
        email: "usuario@cinevortex.com",
        senha: "usuario123",
        nome: "Usuário"
    }
];

// Carregar dados salvos
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se tem usuário lembrado
    const emailSalvo = localStorage.getItem('rememberEmail');
    if (emailSalvo) {
        document.getElementById('email').value = emailSalvo;
        document.getElementById('lembrar').checked = true;
    }
    
    // Verificar se já está logado
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        window.location.href = 'index.html';
    }
});

// Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const lembrar = document.getElementById('lembrar').checked;
    
    // Limpar mensagens anteriores
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    
    // Validação básica
    if (!email || !senha) {
        mostrarErro('❌ Preencha todos os campos!');
        return;
    }
    
    // Buscar usuário
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
        // Salvar dados do usuário
        localStorage.setItem('usuarioLogado', JSON.stringify({
            email: usuario.email,
            nome: usuario.nome
        }));
        
        // Salvar e-mail se "lembrar" estiver marcado
        if (lembrar) {
            localStorage.setItem('rememberEmail', email);
        } else {
            localStorage.removeItem('rememberEmail');
        }
        
        // Mostrar mensagem de sucesso
        mostrarSucesso('✅ Login realizado com sucesso! Redirecionando...');
        
        // Redirecionar após 1.5 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        mostrarErro('❌ E-mail ou senha incorretos!');
    }
});

function mostrarErro(mensagem) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = mensagem;
    errorDiv.style.display = 'block';
    
    // Esconder após 3 segundos
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

function mostrarSucesso(mensagem) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = mensagem;
    successDiv.style.display = 'block';
}