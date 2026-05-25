document.addEventListener('DOMContentLoaded', () => {
    const loginGestorForm = document.getElementById('loginGestorForm');

    if (loginGestorForm) {
        loginGestorForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Lógica de autenticação na API
            alert('Login de Gestor efetuado!');
            // Redirecionamento para a Dashboard do Gestor
            // window.location.href = '../dashboard.html';
        });
    }
});