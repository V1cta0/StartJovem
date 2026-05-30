import { API_URL } from '../config/config.js';

document.addEventListener('DOMContentLoaded', async () => {

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
        window.location.href = 'loginAprendiz.html';
        return;
    }

    document.getElementById('nomeUsuario').textContent = usuario.nome;

    let totalSeconds = parseInt(localStorage.getItem(`tempo_${usuario.id}`)) || 0;
    let dadosSemanais = JSON.parse(localStorage.getItem(`produtividade_${usuario.id}`)) || [0, 0, 0, 0, 0, 0, 0];
    let chart;

    // Atualizar tempo na tela
    function atualizarTempo() {
        const horas = Math.floor(totalSeconds / 3600);
        const minutos = Math.floor((totalSeconds % 3600) / 60);
        const segundos = totalSeconds % 60;
        const tempo = `${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;
        document.getElementById('tempoTotal').textContent = tempo;
        document.getElementById('timerDisplay').textContent = tempo;
    }

    // Salvar no localStorage
    function salvarLocal() {
        localStorage.setItem(`tempo_${usuario.id}`, totalSeconds);
        localStorage.setItem(`produtividade_${usuario.id}`, JSON.stringify(dadosSemanais));
    }

    // Salvar no banco
    async function salvarBanco() {
        const diaIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
        await fetch(`${API_URL}/salvar-tempo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ aprendiz_id: usuario.id, segundos_totais: totalSeconds })
        });
        await fetch(`${API_URL}/salvar-produtividade`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ aprendiz_id: usuario.id, dia_semana: diaIndex, minutos: dadosSemanais[diaIndex] })
        });
    }

    // Criar gráfico
    function criarGrafico() {
        const ctx = document.getElementById('produtividadeChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [{ label: 'Minutos', data: dadosSemanais, backgroundColor: '#0056ff', borderRadius: 8 }]
            },
            options: {
                responsive: true,
                plugins: { legend: { labels: { color: '#fff' } } },
                scales: { y: { ticks: { color: '#fff' } }, x: { ticks: { color: '#fff' } } }
            }
        });
    }

    function atualizarGrafico() {
        if (chart) {
            chart.data.datasets[0].data = dadosSemanais;
            chart.update();
        } else {
            criarGrafico();
        }
    }

    // Timer principal
    setInterval(() => {
        totalSeconds++;
        const diaIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
        dadosSemanais[diaIndex] += 1 / 60;
        atualizarTempo();
        atualizarGrafico();
        if (totalSeconds % 5 === 0) salvarLocal();
    }, 1000);

    // Salvar no banco a cada 10 minutos
    setInterval(() => salvarBanco(), 600000);
    
    // Sincronizar com banco a cada 5 minutos
    setInterval(async () => {
        const res = await fetch(`${API_URL}/tempo-aprendiz/${usuario.id}`);
        if (res.ok) {
            const data = await res.json();
            if (data.segundos_totais > totalSeconds) totalSeconds = data.segundos_totais;
            atualizarTempo();
            salvarLocal();
        }
    }, 300000);

    // Carregar dados do banco ao iniciar
    const resTempo = await fetch(`${API_URL}/tempo-aprendiz/${usuario.id}`);
    if (resTempo.ok) {
        const data = await resTempo.json();
        if (data.segundos_totais > totalSeconds) totalSeconds = data.segundos_totais;
    }
    
    const resProd = await fetch(`${API_URL}/produtividade-semanal/${usuario.id}`);
    if (resProd.ok) {
        const dados = await resProd.json();
        const totalLocal = dadosSemanais.reduce((a,b)=>a+b,0);
        const totalBanco = dados.reduce((a,b)=>a+b,0);
        if (totalBanco > totalLocal) dadosSemanais = dados;
    }
    
    atualizarTempo();
    criarGrafico();
    salvarLocal();

    // Carregar outras infos
    try {
        const turma = await fetch(`${API_URL}/turma-aprendiz/${usuario.id}`);
        if (turma.ok) document.getElementById('nomeTurma').textContent = (await turma.json()).nome || 'Sem turma';
    } catch(e) { document.getElementById('nomeTurma').textContent = 'Sem turma'; }
    
    try {
        const tarefas = await fetch(`${API_URL}/tarefas/${usuario.id}`);
        if (tarefas.ok) {
            const lista = await tarefas.json();
            document.getElementById('tarefasConcluidas').textContent = lista.filter(t => t.status === 'concluido').length;
        }
    } catch(e) { document.getElementById('tarefasConcluidas').textContent = '0'; }
    
    document.getElementById('projetosAtivos').textContent = '3';

    // Menu
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    if (toggle && sidebar) {
        toggle.onclick = () => sidebar.classList.toggle('active');
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !toggle.contains(e.target))
                sidebar.classList.remove('active');
        });
    }

    window.addEventListener('beforeunload', () => { salvarLocal(); salvarBanco(); });
});