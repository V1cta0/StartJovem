document.addEventListener('DOMContentLoaded', () => {
    
    // Controle do Menu Sanduíche da Sidebar principal
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Ação do Botão Salvar
    const btnSave = document.querySelector('.btn-save');
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            // Futuramente, aqui será feita a requisição PUT/PATCH para a API
            alert('Configurações salvas com sucesso!');
        });
    }
    
    // Efeito visual no clique do menu lateral interno de configurações
    const menuItems = document.querySelectorAll('.settings-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove 'active' de todos
            menuItems.forEach(i => i.classList.remove('active'));
            // Adiciona 'active' apenas no clicado
            this.classList.add('active');
        });
    });

});