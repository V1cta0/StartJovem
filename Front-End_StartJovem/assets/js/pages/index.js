document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona o botão de começar
    const btnComecar = document.getElementById('btnComecar');

    // Faz o redirecionamento para a página de escolha de perfil
    if (btnComecar) {
        btnComecar.addEventListener('click', () => {
            window.location.href = 'escolha-perfil.html';
        });
    }

});