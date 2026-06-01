import { API_URL } from '../config/config.js';

document.addEventListener('DOMContentLoaded', () => {

    const registerGestorForm = document.getElementById('registerGestorForm');

    if (registerGestorForm) {
        registerGestorForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;

            if (senha !== confirmarSenha) {
                return alert('As senhas não coincidem.');
            }

            if (senha.length < 6) {
                return alert('A senha deve ter pelo menos 6 caracteres.');
            }

            try {
                const response = await fetch(`${API_URL}/cadastro-gestor`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, senha })
                });

                const data = await response.json();

                alert(data.mensagem);

                if (data.sucesso) {
                    registerGestorForm.reset();
                    window.location.href = 'loginGestor.html';
                }
            } catch (error) {
                console.error(error);
                alert('Erro ao cadastrar gestor.');
            }
        });
    }
});