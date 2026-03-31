// Cadastro simples com localStorage
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validações
        if (!nome || !email || !password || !confirmPassword) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        if (password.length < 4) {
            alert('A senha deve ter pelo menos 4 caracteres!');
            return;
        }
        
        // Buscar usuários existentes
        const usuarios = JSON.parse(localStorage.getItem('cinevortex_usuarios') || '[]');
        
        // Verificar se e-mail já está cadastrado
        if (usuarios.some(u => u.email === email)) {
            alert('Este e-mail já está cadastrado!');
            return;
        }
        
        // Criar novo usuário
        const novoUsuario = {
            id: Date.now(),
            nome: nome,
            email: email,
            senha: password
        };
        
        usuarios.push(novoUsuario);
        localStorage.setItem('cinevortex_usuarios', JSON.stringify(usuarios));
        
        alert('Cadastro realizado com sucesso! Faça login para continuar.');
        window.location.href = 'login.html';
    });
});