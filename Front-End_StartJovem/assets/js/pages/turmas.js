const API_URL = "http://localhost:1880";

document.addEventListener("DOMContentLoaded", async () => {

    const turmaForm = document.getElementById("turmaForm");
    const listaTurmas = document.getElementById("listaTurmas");

    await carregarTurmas();

    if (turmaForm) {

        turmaForm.addEventListener("submit", async (event) => {

            event.preventDefault();

            const nome =
                document.getElementById("nomeTurma").value;

            const descricao =
                document.getElementById("descricaoTurma").value;

            try {

                const response =
                    await fetch(
                        `${API_URL}/criar-turma`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                nome,
                                descricao
                            })
                        }
                    );

                const data =
                    await response.json();

                if (data.sucesso) {

                    alert(data.mensagem);

                    turmaForm.reset();

                    carregarTurmas();

                } else {

                    alert(data.mensagem);

                }

            } catch (error) {

                console.error(error);

                alert("Erro ao criar turma.");

            }

        });

    }

    async function carregarTurmas() {

        try {

            const response =
                await fetch(
                    `${API_URL}/listar-turmas`
                );

            const turmas =
                await response.json();

            if (!listaTurmas) return;

            listaTurmas.innerHTML = "";

            if (turmas.length === 0) {

                listaTurmas.innerHTML =
                    "<p>Nenhuma turma cadastrada.</p>";

                return;

            }

            turmas.forEach(turma => {

                listaTurmas.innerHTML += `
                    <div class="turma-card border-roxo">

                        <div class="turma-icon ico-roxo">
                            <i class="fa-solid fa-users"></i>
                        </div>

                        <h3>${turma.nome}</h3>

                        <p>
                            ${turma.descricao || "Sem descrição"}
                        </p>

                        <button
                            class="btn-turma"
                            onclick="verAlunos(${turma.id}, '${turma.nome}')"
                        >
                            Ver Alunos
                        </button>

                    </div>
                `;

            });

        } catch (error) {

            console.error(error);

        }

    }

});

window.verAlunos = async function (turmaId, nomeTurma) {

    try {

        const response =
            await fetch(
                `${API_URL}/alunos-turma/${turmaId}`
            );

        const alunos =
            await response.json();

        if (alunos.length === 0) {

            alert(
                `A turma "${nomeTurma}" não possui alunos.`
            );

            return;

        }

        let mensagem =
            `Turma: ${nomeTurma}\n\n`;

        alunos.forEach(aluno => {

            mensagem +=
                `• ${aluno.nome} (${aluno.email})\n`;

        });

        alert(mensagem);

    } catch (error) {

        console.error(error);

        alert("Erro ao carregar alunos.");

    }

};