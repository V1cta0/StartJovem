import { API_URL } from '../config/config.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    
    if (!usuario) {
        alert('Faça login primeiro');
        window.location.href = 'login.html';
        return;
    }
    
    // Carregar dados salvos do localStorage
    let cursos = JSON.parse(localStorage.getItem(`cursos_${usuario.id}`)) || [];
    let idiomas = JSON.parse(localStorage.getItem(`idiomas_${usuario.id}`)) || ["Português - Nativo"];
    let habilidades = JSON.parse(localStorage.getItem(`habilidades_${usuario.id}`)) || ["HTML5", "CSS3", "JavaScript", "React"];
    
    // Preencher dados
    document.getElementById('nomeUsuario').textContent = usuario.nome;
    document.getElementById('email').value = usuario.email;
    document.getElementById('telefone').value = usuario.telefone || '';
    document.getElementById('bio').value = usuario.bio || '';
    
    // Elementos
    const cursosEl = document.getElementById('listaCursos');
    const idiomasEl = document.getElementById('listaIdiomas');
    const habilidadesEl = document.getElementById('listaHabilidades');
    
    // Função para salvar tudo
    function salvarTudo() {
        localStorage.setItem(`cursos_${usuario.id}`, JSON.stringify(cursos));
        localStorage.setItem(`idiomas_${usuario.id}`, JSON.stringify(idiomas));
        localStorage.setItem(`habilidades_${usuario.id}`, JSON.stringify(habilidades));
    }
    
    // Renderizar cursos
    function renderizarCursos() {
        cursosEl.innerHTML = cursos.map((c, i) => `
            <div class="item-curso" data-index="${i}">
                <div><strong>${c.nome}</strong>${c.arquivo ? `<br><small>📄 ${c.arquivo}</small>` : '<br><small>Sem arquivo</small>'}</div>
                <button class="remove-btn" data-tipo="curso" data-index="${i}">×</button>
            </div>
        `).join('');
    }
    
    // Renderizar idiomas
    function renderizarIdiomas() {
        idiomasEl.innerHTML = idiomas.map((i, idx) => `
            <div class="item" data-index="${idx}">
                <span>${i}</span>
                <button class="remove-btn" data-tipo="idioma" data-index="${idx}">×</button>
            </div>
        `).join('');
    }
    
    // Renderizar habilidades
    function renderizarHabilidades() {
        habilidadesEl.innerHTML = habilidades.map((h, idx) => `
            <div class="skill-tag" data-index="${idx}">
                ${h} <span class="remove-skill" data-tipo="habilidade" data-index="${idx}">×</span>
            </div>
        `).join('');
    }
    
    // Adicionar curso
    document.getElementById('addCurso').onclick = () => {
        const nome = document.getElementById('nomeCurso').value.trim();
        if (!nome) return alert('Digite o nome do curso');
        
        const arquivoInput = document.getElementById('arquivoCurso');
        const arquivo = arquivoInput.files.length > 0 ? arquivoInput.files[0].name : null;
        
        cursos.push({ nome, arquivo });
        salvarTudo();
        renderizarCursos();
        
        document.getElementById('nomeCurso').value = '';
        arquivoInput.value = '';
        alert('Curso adicionado!');
    };
    
    // Adicionar idioma
    document.getElementById('addIdioma').onclick = () => {
        const idioma = prompt('Digite o idioma e nível (ex: Inglês - Intermediário):');
        if (idioma && idioma.trim()) {
            idiomas.push(idioma.trim());
            salvarTudo();
            renderizarIdiomas();
            alert('Idioma adicionado!');
        }
    };
    
    // Adicionar habilidade
    document.getElementById('addHabilidade').onclick = () => {
        const input = document.getElementById('novaHabilidade');
        if (input.value.trim()) {
            habilidades.push(input.value.trim());
            salvarTudo();
            renderizarHabilidades();
            input.value = '';
            alert('Habilidade adicionada!');
        }
    };
    
    // Remover itens (event delegation)
    document.addEventListener('click', (e) => {
        const btn = e.target;
        const tipo = btn.getAttribute('data-tipo');
        const index = btn.getAttribute('data-index');
        
        if (tipo === 'curso' && index !== null) {
            if (confirm('Remover este curso?')) {
                cursos.splice(parseInt(index), 1);
                salvarTudo();
                renderizarCursos();
            }
        }
        else if (tipo === 'idioma' && index !== null) {
            if (confirm('Remover este idioma?')) {
                idiomas.splice(parseInt(index), 1);
                salvarTudo();
                renderizarIdiomas();
            }
        }
        else if (tipo === 'habilidade' && index !== null) {
            if (confirm('Remover esta habilidade?')) {
                habilidades.splice(parseInt(index), 1);
                salvarTudo();
                renderizarHabilidades();
            }
        }
    });
    
    // Salvar perfil (telefone e bio)
    document.getElementById('btnSalvar').onclick = () => {
        const telefone = document.getElementById('telefone').value;
        const bio = document.getElementById('bio').value;
        
        usuario.telefone = telefone;
        usuario.bio = bio;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        
        alert('✅ Perfil salvo com sucesso!');
    };
    
    // Enter para adicionar habilidade
    document.getElementById('novaHabilidade').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('addHabilidade').click();
        }
    });
    
    // Renderizar tudo
    renderizarCursos();
    renderizarIdiomas();
    renderizarHabilidades();
    
    // Menu toggle
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    if (toggle && sidebar) {
        toggle.onclick = () => sidebar.classList.toggle('active');
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && !toggle.contains(e.target))
                sidebar.classList.remove('active');
        });
    }
});