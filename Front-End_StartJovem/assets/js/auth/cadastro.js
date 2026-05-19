document.addEventListener('DOMContentLoaded', () => {
    
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return;
        }

        // Lógica de integração com a API virá aqui posteriormente
        alert('Cadastro de Aprendiz realizado com sucesso!');
        
        registerForm.reset();
    });

});