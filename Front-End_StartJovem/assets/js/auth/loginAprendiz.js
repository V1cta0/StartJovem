import { API_URL } from '../config/config.js';

document.addEventListener('DOMContentLoaded', () => {

    const loginAprendizForm =
        document.getElementById('loginAprendizForm');

    if (loginAprendizForm) {

        loginAprendizForm.addEventListener(
            'submit',
            async function (event) {

                event.preventDefault();

                const email =
                    document.getElementById('email').value;

                const senha =
                    document.getElementById('senha').value;

                try {

                    const response = await fetch(
                        `${API_URL}/login-aprendiz`,
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
                        data.usuario.tipo === 'aprendiz'
                    ) {

                        localStorage.setItem(
                            'usuario',
                            JSON.stringify(data.usuario)
                        );

                        alert(data.mensagem || 'Login realizado');

                        window.location.href =
                            'monitoramento.html';

                    } else {

                        alert('Usuário não é aprendiz.');

                    }

                } catch (error) {

                    console.error(error);

                    alert('Erro ao realizar login.');

                }

            }
        );

    }

});