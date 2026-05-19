document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os botões
    const btnAprendiz = document.getElementById('btnAprendiz');
    const btnGestor = document.getElementById('btnGestor');

    // Redireciona para o login de Aprendiz
    if (btnAprendiz) {
        btnAprendiz.addEventListener('click', () => {
            window.location.href = 'loginAprendiz.html';
        });
    }

    // Redireciona para o login/cadastro de Gestor
    if (btnGestor) {
        btnGestor.addEventListener('click', () => {
            window.location.href = 'loginGestor.html';
        });
    }

});