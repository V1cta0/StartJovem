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

            // Lógica de integração com a API virá aqui posteriormente
            alert('Cadastro de Gestor realizado com sucesso!');
            
            registerGestorForm.reset();
            
            // Redireciona para o login do gestor após o cadastro (opcional)
            // window.location.href = 'loginGestor.html';
        });
    }

});