import { API_URL } from '../config/config.js';

document.addEventListener('DOMContentLoaded', async () => {

    const registerForm =
        document.getElementById('registerForm');

    const turmaSelect =
        document.getElementById('turma');

    async function carregarTurmas() {

        try {

            const response =
                await fetch(`${API_URL}/listar-turmas`);

            const turmas =
                await response.json();

            turmaSelect.innerHTML = '';

            turmas.forEach(turma => {

                turmaSelect.innerHTML += `
                    <option value="${turma.id}">
                        ${turma.nome}
                    </option>
                `;

            });

        } catch (error) {

            console.error(error);

        }

    }

    if (turmaSelect) {

        await carregarTurmas();

    }

    if (registerForm) {

        registerForm.addEventListener(
            'submit',
            async (event) => {

                event.preventDefault();

                const nome =
                    document.getElementById('nome').value;

                const email =
                    document.getElementById('email').value;

                const senha =
                    document.getElementById('senha').value;

                const confirmarSenha =
                    document.getElementById('confirmar-senha').value;

                if (senha !== confirmarSenha) {

                    alert('As senhas não coincidem');

                    return;

                }

                try {

                    const response =
                        await fetch(
                            `${API_URL}/cadastro-aprendiz`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    nome,
                                    email,
                                    senha
                                })
                            }
                        );

                    const data =
                        await response.json();

                    if (data.sucesso) {

                        alert(data.mensagem);

                        window.location.href =
                            'loginAprendiz.html';

                    } else {

                        alert(data.mensagem);

                    }

                } catch (error) {

                    console.error(error);

                    alert('Erro no cadastro');

                }

            }
        );

    }

});