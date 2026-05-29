document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica do Menu Sanduíche (Mobile) ---
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // --- Lógica Funcional do Temporizador ---
    const toggleTimerBtn = document.getElementById('toggleTimerBtn');
    const timerDisplay = document.getElementById('timerDisplay');
    
    let timerInterval;
    // Inicia a contagem a partir de 1h 20m 34s (em segundos)
    let totalSeconds = (1 * 3600) + (20 * 60) + 34; 
    let isTimerRunning = true; // Inicia rodando

    function updateTimerDisplay() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        // Formata para garantir que fique com 2 dígitos (ex: 09 em vez de 9)
        const formatMin = minutes.toString().padStart(2, '0');
        const formatSec = seconds.toString().padStart(2, '0');
        
        timerDisplay.textContent = `${hours}:${formatMin}:${formatSec}`;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            totalSeconds++;
            updateTimerDisplay();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    if (toggleTimerBtn && timerDisplay) {
        startTimer(); // Começa a contar assim que a página carrega

        toggleTimerBtn.addEventListener('click', () => {
            isTimerRunning = !isTimerRunning;
            if (isTimerRunning) {
                toggleTimerBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                startTimer();
            } else {
                toggleTimerBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                stopTimer();
            }
        });
    }

    // --- Inicialização do Gráfico (Chart.js) ---
    const ctx = document.getElementById('produtividadeChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
                datasets: [
                    { data: [10, 25, 15, 35, 12, 45, 20], borderColor: '#ffffff', borderWidth: 2, pointBackgroundColor: '#ffffff', fill: false, tension: 0.1 },
                    { data: [5, 15, 10, 20, 25, 15, 30], borderColor: '#a0a5aa', borderWidth: 2, pointBackgroundColor: '#a0a5aa', fill: false, tension: 0.1 },
                    { data: [20, 30, 25, 40, 35, 25, 35], borderColor: '#555555', borderWidth: 2, pointBackgroundColor: '#555555', fill: false, tension: 0.1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: 'rgba(255, 255, 255, 0.1)', borderDash: [5, 5] }, ticks: { display: false } },
                    y: { grid: { display: false }, ticks: { display: false } }
                }
            }
        });
    }
});