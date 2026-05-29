import { API_URL } from '../config/config.js';

document.addEventListener('DOMContentLoaded', async () => {

    const usuario =
        JSON.parse(localStorage.getItem('usuario'));

    if(!usuario){

        window.location.href =
            'loginAprendiz.html';

        return;

    }

    document.getElementById('nomeUsuario')
        .textContent = usuario.nome;

    let totalSeconds = 0;

    let timerInterval = null;

    let timerRodando = false;

    async function carregarTurma(){

        const response =
            await fetch(
                `${API_URL}/turma-aprendiz/${usuario.id}`
            );

        const turma =
            await response.json();

        document.getElementById('nomeTurma')
            .textContent = turma.nome || 'Sem turma';

    }

    async function carregarTempo(){

        const response =
            await fetch(
                `${API_URL}/tempo-aprendiz/${usuario.id}`
            );

        const data =
            await response.json();

        totalSeconds =
            data.segundos_totais || 0;

        atualizarTempo();

    }

    function atualizarTempo(){

        const horas =
            Math.floor(totalSeconds / 3600);

        const minutos =
            Math.floor((totalSeconds % 3600) / 60);

        const segundos =
            totalSeconds % 60;

        const tempoFormatado =
            `${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;

        document.getElementById('tempoTotal')
            .textContent = tempoFormatado;

        document.getElementById('timerDisplay')
            .textContent = tempoFormatado;

    }

    function iniciarTimer(){

        timerInterval = setInterval(() => {

            totalSeconds++;

            atualizarTempo();

        }, 1000);

    }

    async function salvarTempo(){

        await fetch(
            `${API_URL}/salvar-tempo`,
            {

                method:'POST',

                headers:{
                    'Content-Type':'application/json'
                },

                body: JSON.stringify({

                    aprendiz_id: usuario.id,

                    segundos_totais: totalSeconds

                })

            }
        );

    }

    document
        .getElementById('toggleTimerBtn')
        .addEventListener('click', async () => {

            timerRodando = !timerRodando;

            if(timerRodando){

                iniciarTimer();

                document
                    .getElementById('toggleTimerBtn')
                    .innerHTML =
                        '<i class="fa-solid fa-pause"></i>';

            }else{

                clearInterval(timerInterval);

                await salvarTempo();

                document
                    .getElementById('toggleTimerBtn')
                    .innerHTML =
                        '<i class="fa-solid fa-play"></i>';

            }

        });

    async function carregarTarefas(){

        const response =
            await fetch(
                `${API_URL}/tarefas/${usuario.id}`
            );

        const tarefas =
            await response.json();

        const fazer =
            document.getElementById('kanbanFazer');

        const progresso =
            document.getElementById('kanbanProgresso');

        const concluido =
            document.getElementById('kanbanConcluido');

        fazer.innerHTML = '';
        progresso.innerHTML = '';
        concluido.innerHTML = '';

        let concluidas = 0;

        tarefas.forEach(tarefa => {

            const item =
                document.createElement('div');

            item.classList.add('kanban-item');

            item.innerHTML = `

                <h4>${tarefa.titulo}</h4>

                <p>${tarefa.descricao || ''}</p>

            `;

            if(tarefa.status === 'fazer'){

                fazer.appendChild(item);

            }

            if(tarefa.status === 'progresso'){

                progresso.appendChild(item);

            }

            if(tarefa.status === 'concluido'){

                concluido.appendChild(item);

                concluidas++;

            }

        });

        document
            .getElementById('tarefasConcluidas')
            .textContent = concluidas;

    }

    async function carregarProjetos(){

        const response =
            await fetch(
                `${API_URL}/projetos-ativos/${usuario.id}`
            );

        const data =
            await response.json();

        document
            .getElementById('projetosAtivos')
            .textContent = data.total || 0;

    }

    async function carregarGrafico(){

        const response =
            await fetch(
                `${API_URL}/produtividade-semanal/${usuario.id}`
            );

        const dados =
            await response.json();

        const ctx =
            document
                .getElementById('produtividadeChart');

        new Chart(ctx, {

            type:'line',

            data:{

                labels:[
                    'Seg',
                    'Ter',
                    'Qua',
                    'Qui',
                    'Sex',
                    'Sab',
                    'Dom'
                ],

                datasets:[{

                    data:dados,

                    borderColor:'#ffffff',

                    backgroundColor:'transparent',

                    borderWidth:2,

                    tension:0.4

                }]

            },

            options:{

                responsive:true,

                plugins:{
                    legend:{
                        display:false
                    }
                },

                scales:{

                    y:{
                        beginAtZero:true
                    }

                }

            }

        });

    }

    await carregarTurma();

    await carregarTempo();

    await carregarTarefas();

    await carregarProjetos();

    await carregarGrafico();

});
