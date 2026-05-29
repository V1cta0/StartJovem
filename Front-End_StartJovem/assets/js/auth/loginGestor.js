import { API_URL } from '../config/config.js';

document.addEventListener('DOMContentLoaded', () => {

    const loginGestorForm =
        document.getElementById('loginGestorForm');

    if (loginGestorForm) {

        loginGestorForm.addEventListener(
            'submit',
            async function (event) {

                event.preventDefault();

                const email =
                    document.getElementById('email').value;

                const senha =
                    document.getElementById('senha').value;

                try {

                    const response =
                        await fetch(
                            `${API_URL}/login`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    email,
                                    senha
                                })
                            }
                        );

                    const data =
                        await response.json();

                    if (
                        data.sucesso &&
                        data.usuario.tipo === 'gestor'
                    ) {

                        localStorage.setItem(
                            'gestor',
                            JSON.stringify(data.usuario)
                        );

                        alert(data.mensagem || 'Login realizado');

                        window.location.href =
                            'dashboardGestor.html';

                    } else {

                        alert('Usuário não é gestor.');

                    }

                } catch (error) {

                    console.error(error);

                    alert('Erro ao realizar login.');

                }

            }
        );

    }

});