import { API_URL } from '../config/config.js';

document.addEventListener('DOMContentLoaded', () => {

    const loginGestorForm = document.getElementById('loginGestorForm');

    if (loginGestorForm) {
        loginGestorForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value;

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (data.sucesso) {
                    const usuario = data.usuario;

                    // ✅ PROTEÇÃO FORTE: Só permite login se for realmente GESTOR
                    if (usuario.tipo !== 'gestor') {
                        alert('Este login é apenas para Gestores.');
                        return;
                    }

                    // Salva as informações
                    localStorage.setItem('usuario', JSON.stringify(usuario));
                    localStorage.setItem('tipoUsuario', 'gestor');

                    alert(data.mensagem || 'Login realizado com sucesso!');
                    window.location.href = 'turmas.html';
                } else {
                    alert(data.mensagem || 'Email ou senha incorretos.');
                }
            } catch (error) {
                console.error(error);
                alert('Erro ao realizar login.');
            }
        });
    }
});