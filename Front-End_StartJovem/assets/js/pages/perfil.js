document.addEventListener('DOMContentLoaded', () => {
    // Menu Sanduíche
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Ação do botão de currículo
    const btnCurriculo = document.querySelector('.btn-curriculo');
    if (btnCurriculo) {
        btnCurriculo.addEventListener('click', () => {
            alert('Abrindo visualizador de currículo...');
        });
    }
});