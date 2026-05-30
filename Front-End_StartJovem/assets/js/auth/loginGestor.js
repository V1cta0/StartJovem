import { API_URL } from '../config/config.js';

document.addEventListener('DOMContentLoaded', () => {

    const loginGestorForm = document.getElementById('loginGestorForm');

    if (loginGestorForm) {
        loginGestorForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (data.sucesso) {
                    // PADRONIZAÇÃO: sempre salvar como 'usuario'
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));
                    localStorage.setItem('tipoUsuario', 'gestor');

                    alert(data.mensagem || 'Login realizado com sucesso!');
                    window.location.href = 'turmas.html'; // ou dashboardGestor.html
                } else {
                    alert(data.mensagem || 'Email ou senha incorretos');
                }
            } catch (error) {
                console.error(error);
                alert('Erro ao realizar login');
            }
        });
    }
});