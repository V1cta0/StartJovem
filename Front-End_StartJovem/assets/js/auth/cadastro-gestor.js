document.addEventListener('DOMContentLoaded', () => {
    
    const registerGestorForm = document.getElementById('registerGestorForm');

    if (registerGestorForm) {
        registerGestorForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem. Por favor, tente novamente.');
                return;
            }

            // Simulação de sucesso no cadastro
            alert('Cadastro de Gestor realizado com sucesso!');
            
            // Limpa o formulário
            registerGestorForm.reset();
            
            // Redireciona imediatamente para a tela de login do gestor
            window.location.href = 'loginGestor.html';
        });
    }

});