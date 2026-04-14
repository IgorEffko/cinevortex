// Script simples para cadastro
document.addEventListener('DOMContentLoaded', function() {
    
    // Pegar o formulário
    const form = document.getElementById('cadastroForm');
    const errorMsg = document.getElementById('errorMessage');
    const successMsg = document.getElementById('successMessage');
    
    // Função para mostrar erro
    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
        successMsg.style.display = 'none';
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 3000);
    }
    
    // Função para mostrar sucesso
    function showSuccess(message) {
        successMsg.textContent = message;
        successMsg.style.display = 'block';
        errorMsg.style.display = 'none';
    }
    
    // Função para salvar dados
    function saveUser(userData) {
        // Pega usuários já cadastrados
        let users = JSON.parse(localStorage.getItem('cinevortex_users')) || [];
        
        // Verifica se email já existe
        if (users.some(user => user.email === userData.email)) {
            showError('Este e-mail já está cadastrado!');
            return false;
        }
        
        // Adiciona novo usuário
        users.push(userData);
        
        // Salva no navegador
        localStorage.setItem('cinevortex_users', JSON.stringify(users));
        
        return true;
    }
    
    // Evento de enviar formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar os dados
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar_senha').value;
        const aceitoTermos = document.getElementById('aceito_termos').checked;
        
        // Validar
        if (!nome || !email || !senha || !confirmarSenha) {
            showError('Preencha todos os campos!');
            return;
        }
        
        if (senha.length < 6) {
            showError('A senha deve ter no mínimo 6 caracteres!');
            return;
        }
        
        if (senha !== confirmarSenha) {
            showError('As senhas não coincidem!');
            return;
        }
        
        if (!aceitoTermos) {
            showError('Você precisa aceitar os termos!');
            return;
        }
        
        // Criar objeto com os dados
        const userData = {
            id: Date.now(),
            nome: nome,
            email: email,
            senha: senha,
            dataCadastro: new Date().toLocaleString()
        };
        
        // Salvar
        if (saveUser(userData)) {
            showSuccess('Cadastro realizado com sucesso!');
            
            // Limpar formulário
            form.reset();
            
            // Redirecionar após 2 segundos
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);
        }
    });
    
    // Verificar força da senha (simples)
    const senhaInput = document.getElementById('senha');
    const strengthDiv = document.getElementById('passwordStrength');
    
    senhaInput.addEventListener('input', function() {
        const senha = this.value;
        
        if (senha.length === 0) {
            strengthDiv.textContent = '';
        } else if (senha.length < 6) {
            strengthDiv.textContent = '⚠️ Senha muito curta (mínimo 6 caracteres)';
            strengthDiv.style.color = '#ff4444';
        } else if (senha.length < 10) {
            strengthDiv.textContent = '✅ Senha média';
            strengthDiv.style.color = '#ffaa00';
        } else {
            strengthDiv.textContent = '✅ Senha forte';
            strengthDiv.style.color = '#00c851';
        }
    });
    
    // Confirmar senha em tempo real
    const confirmarInput = document.getElementById('confirmar_senha');
    
    confirmarInput.addEventListener('input', function() {
        const senha = senhaInput.value;
        const confirmar = this.value;
        
        if (confirmar && senha !== confirmar) {
            this.style.borderColor = '#ff4444';
        } else {
            this.style.borderColor = '#00c851';
        }
    });
});

// Função para ver usuários cadastrados (opcional - use no console)
function verUsuarios() {
    const users = JSON.parse(localStorage.getItem('cinevortex_users')) || [];
    console.log('Usuários cadastrados:', users);
    return users;
}