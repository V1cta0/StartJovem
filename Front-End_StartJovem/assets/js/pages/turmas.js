import { API_URL } from '../config/config.js';

document.addEventListener("DOMContentLoaded", async () => {

    const tipoUsuario = localStorage.getItem('tipoUsuario');
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    const sectionAprendiz = document.getElementById("section-aprendiz");
    const sectionGestor = document.getElementById("section-gestor");
    const acessoNegado = document.getElementById("acesso-negado");

    // Esconde todas as seções inicialmente
    if (sectionAprendiz) sectionAprendiz.style.display = "none";
    if (sectionGestor) sectionGestor.style.display = "none";
    if (acessoNegado) acessoNegado.style.display = "none";

    if (!tipoUsuario) {
        alert("Você precisa fazer login primeiro.");
        window.location.href = "loginAprendiz.html";
        return;
    }

    setupModal();

    // ==================== CONTROLE DE ACESSO ====================
    if (tipoUsuario === 'gestor') {
        if (sectionGestor) sectionGestor.style.display = "block";
        await carregarPainelGestor();
    } 
    else if (tipoUsuario === 'aprendiz') {
        if (sectionAprendiz) sectionAprendiz.style.display = "block";
        await carregarMinhasTurmas(usuario.id);
    } 
    else {
        if (acessoNegado) acessoNegado.style.display = "block";
    }
});

// ====================== APRENDIZ - MINHAS TURMAS ======================
async function carregarMinhasTurmas(aprendizId) {
    try {
        const response = await fetch(`${API_URL}/minhas-turmas/${aprendizId}`);
        const turmas = await response.json();

        const container = document.getElementById("listaMinhasTurmas");
        if (!container) return;

        container.innerHTML = "";

        if (!turmas || turmas.length === 0) {
            container.innerHTML = `
                <p style="color:#aaa; text-align:center; padding:80px; font-size:1.1rem;">
                    Você ainda não está matriculado em nenhuma turma.
                </p>`;
            return;
        }

        turmas.forEach(turma => {
            container.innerHTML += `
                <div class="turma-card border-azul">
                    <div class="turma-icon ico-azul">
                        <i class="fa-solid fa-code"></i>
                    </div>
                    <h3>${turma.nome}</h3>
                    <p>${turma.descricao || "Sem descrição"}</p>
                    <button class="btn-turma btn-azul" 
                            onclick="verAlunos(${turma.id}, '${turma.nome.replace(/'/g, "\\'")}')">
                        Acessar Turma
                    </button>
                </div>`;
        });
    } catch (error) {
        console.error(error);
        document.getElementById("listaMinhasTurmas").innerHTML = `
            <p style="color:red; text-align:center;">Erro ao carregar suas turmas.</p>`;
    }
}

// ====================== GESTOR ======================
async function carregarPainelGestor() {
    await carregarTurmasGestor();
    await carregarListasVincular();
}

async function carregarTurmasGestor() {
    try {
        const response = await fetch(`${API_URL}/listar-turmas`);
        const turmas = await response.json();
        const container = document.getElementById("listaTurmas");
        if (!container) return;

        container.innerHTML = "";

        if (!turmas || turmas.length === 0) {
            container.innerHTML = `<p style='color:white;text-align:center;padding:30px;'>Nenhuma turma cadastrada.</p>`;
            return;
        }

        turmas.forEach(turma => {
            container.innerHTML += `
                <div class="turma-card border-roxo">
                    <div class="turma-icon ico-roxo">
                        <i class="fa-solid fa-users"></i>
                    </div>
                    <h3>${turma.nome}</h3>
                    <p>${turma.descricao || "Sem descrição"}</p>
                    <button class="btn-turma" onclick="verAlunos(${turma.id}, '${turma.nome.replace(/'/g, "\\'")}')">
                        Ver Alunos
                    </button>
                </div>`;
        });
    } catch (error) {
        console.error("Erro ao carregar turmas:", error);
    }
}

// ====================== VINCULAÇÃO ======================
let turmaSelecionada = null;
let aprendizSelecionado = null;

async function carregarListasVincular() {
    try {
        const turmas = await (await fetch(`${API_URL}/listar-turmas`)).json();
        const aprendizes = await (await fetch(`${API_URL}/listar-aprendizes`)).json();

        const listaTurmasEl = document.getElementById("listaTurmasVincular");
        const listaAprendizesEl = document.getElementById("listaAprendizesVincular");

        if (listaTurmasEl) listaTurmasEl.innerHTML = "";
        if (listaAprendizesEl) listaAprendizesEl.innerHTML = "";

        turmas.forEach(t => {
            listaTurmasEl?.appendChild(criarItem(t.nome, t.id, "#listaTurmasVincular"));
        });

        aprendizes.forEach(a => {
            listaAprendizesEl?.appendChild(criarItem(a.nome, a.id, "#listaAprendizesVincular"));
        });
    } catch (error) {
        console.error("Erro ao carregar listas de vinculação:", error);
    }
}

function criarItem(texto, id, container) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = texto;
    div.dataset.id = id;

    div.addEventListener("click", () => {
        document.querySelectorAll(`${container} .item`).forEach(i => i.classList.remove("selecionado"));
        div.classList.add("selecionado");

        if (container.includes("Turmas")) turmaSelecionada = id;
        else aprendizSelecionado = id;
    });
    return div;
}

// Busca em tempo real
document.getElementById("searchTurma")?.addEventListener("input", filtrarItens);
document.getElementById("searchAprendiz")?.addEventListener("input", filtrarItens);

function filtrarItens(e) {
    const term = e.target.value.toLowerCase();
    const container = e.target.id.includes("Turma") ? "#listaTurmasVincular" : "#listaAprendizesVincular";
    document.querySelectorAll(`${container} .item`).forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(term) ? "block" : "none";
    });
}

// Botão Vincular
document.getElementById("btnVincular")?.addEventListener("click", async () => {
    if (!turmaSelecionada || !aprendizSelecionado) {
        return alert("❌ Selecione uma turma e um aprendiz");
    }

    try {
        const response = await fetch(`${API_URL}/atribuir-aprendiz`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                turma_id: Number(turmaSelecionada),
                aprendiz_id: Number(aprendizSelecionado)
            })
        });

        const data = await response.json();
        alert(data.mensagem);

        if (data.sucesso) {
            turmaSelecionada = null;
            aprendizSelecionado = null;
            document.querySelectorAll(".item").forEach(i => i.classList.remove("selecionado"));
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao vincular aprendiz");
    }
});

// ====================== MODAL ======================
function setupModal() {
    const modal = document.getElementById("modalAlunos");
    if (!modal) return;

    const closeBtn = document.querySelector(".close-modal");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => modal.style.display = "none");
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}

window.verAlunos = async function (turmaId, nomeTurma) {
    try {
        const response = await fetch(`${API_URL}/alunos-turma/${turmaId}`);
        const alunos = await response.json();

        const modal = document.getElementById("modalAlunos");
        const title = document.getElementById("modalTurmaNome");
        const lista = document.getElementById("listaAlunosModal");

        title.textContent = `Alunos da Turma: ${nomeTurma}`;
        lista.innerHTML = "";

        if (!alunos || alunos.length === 0) {
            lista.innerHTML = `<p style="text-align:center;color:#aaa;padding:40px;">Nenhum aluno vinculado ainda.</p>`;
        } else {
            alunos.forEach(aluno => {
                lista.innerHTML += `
                    <div class="aluno-item">
                        <strong>${aluno.nome}</strong><br>
                        <small>${aluno.email || 'Sem email'}</small>
                    </div>`;
            });
        }

        modal.style.display = "flex";
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar alunos da turma.");
    }
};