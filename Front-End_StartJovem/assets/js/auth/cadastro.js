document.addEventListener('DOMContentLoaded', () => {
    
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o recarregamento da página

            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem. Por favor, tente novamente.');
                return;
            }

            // Simulação de sucesso no cadastro
            alert('Cadastro realizado com sucesso!');
            
            // Limpa o formulário
            registerForm.reset();

            // Redireciona imediatamente para a tela de login correspondente
            window.location.href = 'loginAprendiz.html';
        });
    }

});