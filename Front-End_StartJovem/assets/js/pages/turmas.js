import { API_URL } from '../config/config.js';

document.addEventListener('DOMContentLoaded', async () => {

    const turmaForm =
        document.getElementById('turmaForm');

    const listaTurmas =
        document.getElementById('listaTurmas');

    async function listarTurmas(){

        const response =
            await fetch(
                `${API_URL}/listar-turmas`
            );

        const turmas =
            await response.json();

        listaTurmas.innerHTML = '';

        turmas.forEach(turma => {

            listaTurmas.innerHTML += `

                <div class="turma-card">

                    <h3>${turma.nome}</h3>

                    <p>${turma.descricao}</p>

                </div>

            `;

        });

    }

    turmaForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        const nome =
            document.getElementById('nomeTurma').value;

        const descricao =
            document.getElementById(
                'descricaoTurma'
            ).value;

        await fetch(
            `${API_URL}/criar-turma`,
            {

                method:'POST',

                headers:{
                    'Content-Type':'application/json'
                },

                body: JSON.stringify({
                    nome,
                    descricao
                })

            }
        );

        turmaForm.reset();

        listarTurmas();

    });

    listarTurmas();

});
