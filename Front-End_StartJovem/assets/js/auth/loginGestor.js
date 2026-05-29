document.addEventListener('DOMContentLoaded', () => {
    
    // Captura o formulário pelo ID
    const loginGestorForm = document.getElementById('loginGestorForm');

    if (loginGestorForm) {
        loginGestorForm.addEventListener('submit', function(event) {
            // Oculta o recarregamento padrão da página
            event.preventDefault();
            
            // Alerta opcional para confirmar a ação antes de mudar de tela
            alert('Login de Gestor efetuado com sucesso!');
            
            // Força o redirecionamento para o monitoramento
            window.location.assign('monitoramento.html');
        });
    } else {
        console.error("Erro: O formulário com ID 'loginGestorForm' não foi encontrado nesta página.");
    }

});