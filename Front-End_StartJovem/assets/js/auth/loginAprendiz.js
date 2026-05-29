document.addEventListener('DOMContentLoaded', () => {
    
    const loginAprendizForm = document.getElementById('loginAprendizForm');

    if (loginAprendizForm) {
        loginAprendizForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Aqui entraria a verificação de e-mail e senha na API
            alert('Login de Aprendiz efetuado com sucesso!');
            
            // Redireciona imediatamente para a área de monitoramento (Dashboard)
            window.location.href = 'monitoramento.html';
        });
    }

});