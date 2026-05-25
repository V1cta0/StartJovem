document.addEventListener('DOMContentLoaded', () => {
    const loginAprendizForm = document.getElementById('loginAprendizForm');

    if (loginAprendizForm) {
        loginAprendizForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Lógica de autenticação na API
            alert('Login de Aprendiz efetuado!');
            // Redirecionamento para a Home do Aprendiz
            // window.location.href = '../home.html';
        });
    }
});