  form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validação de campos obrigatórios
        campos.forEach(campo => {
            const input = document.getElementById(campo);
            if (input && input.required && !input.value.trim()) {
                mostrarErro(campo + 'Error', 'Este campo é obrigatório');
                isValid = false;
            }
        });
        
        // Validação de categoria e tempo
        const categoria = document.getElementById('categoria').value;
        const tempo = document.getElementById('tempo').value;
        
        if (!categoria) {
            const select = document.getElementById('categoria');
            select.style.borderColor = '#ff6b6b';
            isValid = false;
        }
        
        if (!tempo) {
            const select = document.getElementById('tempo');
            select.style.borderColor = '#ff6b6b';
            isValid = false;
        }
        
        // Validação de valor
        const valor = parseFloat(valorInput.value);
        if (isNaN(valor) || valor < 0) {
            mostrarErro('valorError', 'Valor inválido');
            isValid = false;
        }
        
        if (isValid) {
            // Coletar dados do formulário
            const formasPagamento = Array.from(document.querySelectorAll('input[name="pagamento"]:checked'))
                .map(cb => cb.value);
            
            const disponibilidade = Array.from(document.querySelectorAll('input[name="disponibilidade"]:checked'))
                .map(cb => cb.value);
            
            // Simular envio
            const btn = form.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
            btn.disabled = true;
            
            setTimeout(() => {
                successModal.style.display = 'flex';
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                // Salvar dados (simulação)
                const dadosServico = {
                    nome: document.getElementById('nomeServico').value,
                    descricao: document.getElementById('descricao').value,
                    categoria: categoria,
                    tempo: tempo,
                    valor: valor,
                    desconto: document.getElementById('desconto').value || 0,
                    formasPagamento: formasPagamento,
                    garantia: document.getElementById('garantia').value,
                    prioridade: document.getElementById('prioridade').value,
                    disponibilidade: disponibilidade,
                    dataCadastro: new Date().toISOString()
                };
                
                // Salvar no localStorage
                let servicos = JSON.parse(localStorage.getItem('servicos') || '[]');
                servicos.push(dadosServico);
                localStorage.setItem('servicos', JSON.stringify(servicos));
                
                console.log('Serviço salvo:', dadosServico);
                console.log('Total de serviços:', servicos.length);
                
                // Limpar formulário após sucesso
                form.reset();
            }, 1500);
        }
    });
    
    // Fechar modal
    closeModal.addEventListener('click', function() {
        successModal.style.display = 'none';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
    
    // Restaurar bordas dos selects após seleção
    document.getElementById('categoria').addEventListener('change', function() {
        this.style.borderColor = 'rgba(0, 188, 212, 0.2)';
    });
    
    document.getElementById('tempo').addEventListener('change', function() {
        this.style.borderColor = 'rgba(0, 188, 212, 0.2)';
    });
;