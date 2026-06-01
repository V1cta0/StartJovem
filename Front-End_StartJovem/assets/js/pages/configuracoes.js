import { API_URL } from '../config/config.js';

document.addEventListener('DOMContentLoaded', async () => {

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
        window.location.href = 'loginAprendiz.html';
        return;
    }

    // Carregar dados do perfil
    document.getElementById('nomeUsuario').value = usuario.nome || '';
    document.getElementById('email').value = usuario.email || '';
    document.getElementById('telefone').value = usuario.telefone || '';

    // Salvar perfil
    document.getElementById('btnSalvarPerfil').onclick = () => {
        usuario.nome = document.getElementById('nomeUsuario').value;
        usuario.telefone = document.getElementById('telefone').value;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert('✅ Perfil atualizado com sucesso!');
    };

    // Finalizar sessão (logout)
    document.getElementById('btnLogout').onclick = () => {
        if (confirm('Deseja realmente finalizar a sessão?')) {
            localStorage.removeItem('usuario');
            localStorage.removeItem('tipoUsuario');
            window.location.href = '../html/index.html';
        }
    };

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