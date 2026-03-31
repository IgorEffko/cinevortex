// Elementos do DOM
const form = document.getElementById('cadastroForm');
const senhaInput = document.getElementById('senha');
const confirmarSenhaInput = document.getElementById('confirmarSenha');
const passwordMatchDiv = document.getElementById('passwordMatch');
const strengthBars = document.querySelectorAll('.strength-bar');
const termosCheckbox = document.getElementById('termos');
const btnSignup = document.getElementById('btnSignup');

// Função para mostrar/esconder senha
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    
    // Muda o ícone do botão
    const btn = event.target;
    btn.textContent = type === 'password' ? '👁️' : '🔓';
}

// Verifica força da senha
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    return Math.min(strength, 3);
}

// Atualiza barras de força da senha
senhaInput.addEventListener('input', function() {
    const strength = checkPasswordStrength(this.value);
    
    strengthBars.forEach((bar, index) => {
        if (index < strength) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });
    
    // Verifica match com confirmar senha
    if (confirmarSenhaInput.value) {
        checkPasswordMatch();
    }
});

// Verifica se as senhas coincidem
function checkPasswordMatch() {
    const senha = senhaInput.value;
    const confirmar = confirmarSenhaInput.value;
    
    if (confirmar.length > 0) {
        if (senha === confirmar) {
            passwordMatchDiv.textContent = '✓ Senhas coincidem';
            passwordMatchDiv.className = 'password-match match';
        } else {
            passwordMatchDiv.textContent = '✗ Senhas não coincidem';
            passwordMatchDiv.className = 'password-match error';
        }
    } else {
        passwordMatchDiv.textContent = '';
    }
}

confirmarSenhaInput.addEventListener('input', checkPasswordMatch);

// Validação em tempo real do email
document.getElementById('email').addEventListener('input', function(e) {
    const email = this.value;
    const emailGroup = this.closest('.input-group');
    
    if (email.length > 0) {
        if (email.includes('@') && email.includes('.')) {
            emailGroup.style.borderColor = '#4caf50';
        } else {
            emailGroup.style.borderColor = '#f44336';
        }
    } else {
        emailGroup.style.borderColor = '';
    }
});

// Submit do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Pega valores
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;
    
    // Validações
    const errors = [];
    
    if (!nome.trim()) errors.push('Nome é obrigatório');
    if (!email.includes('@') || !email.includes('.')) errors.push('E-mail inválido');
    if (senha.length < 6) errors.push('Senha deve ter no mínimo 6 caracteres');
    if (senha !== confirmarSenha) errors.push('As senhas não coincidem');
    if (!termosCheckbox.checked) errors.push('Você deve aceitar os termos');
    
    if (errors.length > 0) {
        alert('❌ Erros:\n• ' + errors.join('\n• '));
        return;
    }
    
    // Animação do botão
    btnSignup.style.transform = 'scale(0.95)';
    btnSignup.querySelector('.btn-text').textContent = 'CRIANDO CONTA...';
    
    // Salva dados
    const usuario = {
        nome: nome,
        email: email,
        dataCadastro: new Date().toLocaleDateString('pt-BR'),
        horaCadastro: new Date().toLocaleTimeString('pt-BR')
    };
    
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    // Simula loading
    setTimeout(() => {
        btnSignup.style.transform = '';
        btnSignup.querySelector('.btn-text').textContent = 'CONTA CRIADA! ✓';
        
        setTimeout(() => {
            window.location.href = 'inicial.html';
        }, 500);
    }, 1000);
});

// Animação de entrada
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.signup-box').style.animation = 'fadeInUp 0.8s ease';
});

// Prevenção de submit com enter em campos vazios
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
});