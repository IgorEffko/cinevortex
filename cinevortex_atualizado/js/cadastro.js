// Array para armazenar usuários cadastrados
let usuarios = [];

// Carregar usuários do localStorage
function carregarUsuarios() {
    const saved = localStorage.getItem('usuarios');
    if (saved) {
        usuarios = JSON.parse(saved);
    } else {
        // Usuários padrão
        usuarios = [
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
        salvarUsuarios();
    }
}

function salvarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Validação de força da senha
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (password.length === 0) return '';
    if (strength <= 2) return '<span class="strength-weak">⚠️ Senha fraca</span>';
    if (strength <= 4) return '<span class="strength-medium">⚠️ Senha média</span>';
    return '<span class="strength-strong">✓ Senha forte</span>';
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    carregarUsuarios();
    
    // Verificar se já está logado
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        window.location.href = 'index.html';
    }
    
    const senhaInput = document.getElementById('senha');
    const confirmarInput = document.getElementById('confirmar_senha');
    const strengthDiv = document.getElementById('passwordStrength');
    
    // Validação de senha em tempo real
    senhaInput.addEventListener('input', function() {
        strengthDiv.innerHTML = checkPasswordStrength(this.value);
        
        if (confirmarInput.value && this.value !== confirmarInput.value) {
            confirmarInput.style.borderColor = '#f44336';
        } else if (confirmarInput.value) {
            confirmarInput.style.borderColor = '#4caf50';
        } else {
            confirmarInput.style.borderColor = '#9c27b0';
        }
    });
    
    confirmarInput.addEventListener('input', function() {
        if (this.value !== senhaInput.value) {
            this.style.borderColor = '#f44336';
        } else {
            this.style.borderColor = '#4caf50';
        }
    });
});

// Cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar_senha').value;
    const aceitoTermos = document.getElementById('aceito_termos').checked;
    
    // Limpar mensagens
    document.getElementById('errorMessage').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    
    // Validações
    if (!nome || !email || !senha) {
        mostrarErro('❌ Preencha todos os campos obrigatórios!');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        mostrarErro('❌ Digite um e-mail válido!');
        return;
    }
    
    if (senha.length < 6) {
        mostrarErro('❌ A senha deve ter pelo menos 6 caracteres!');
        return;
    }
    
    if (senha !== confirmarSenha) {
        mostrarErro('❌ As senhas não coincidem!');
        return;
    }
    
    if (!aceitoTermos) {
        mostrarErro('❌ Você precisa aceitar os termos de uso!');
        return;
    }
    
    // Verificar se e-mail já existe
    const usuarioExistente = usuarios.find(u => u.email === email);
    if (usuarioExistente) {
        mostrarErro('❌ Este e-mail já está cadastrado!');
        return;
    }
    
    // Criar novo usuário
    const novoUsuario = {
        email: email,
        senha: senha,
        nome: nome
    };
    
    usuarios.push(novoUsuario);
    salvarUsuarios();
    
    // Mostrar mensagem de sucesso
    mostrarSucesso('✅ Conta criada com sucesso! Redirecionando para o login...');
    
    // Limpar formulário
    document.getElementById('cadastroForm').reset();
    document.getElementById('passwordStrength').innerHTML = '';
    
    // Redirecionar após 2 segundos
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
});

function mostrarErro(mensagem) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = mensagem;
    errorDiv.style.display = 'block';
    
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

function mostrarSucesso(mensagem) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = mensagem;
    successDiv.style.display = 'block';
}