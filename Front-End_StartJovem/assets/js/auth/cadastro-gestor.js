document.addEventListener('DOMContentLoaded', () => {

    const registerGestorForm = document.getElementById('registerGestorForm');

    if(registerGestorForm){

        registerGestorForm.addEventListener('submit', async function(event){

            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;

            if(senha !== confirmarSenha){
                alert('As senhas não coincidem.');
                return;
            }

            try{

                const response = await fetch('http://localhost:1880/cadastro-gestor', {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        nome,
                        email,
                        senha
                    })
                });

                const data = await response.json();

                alert(data.mensagem);

                if(data.sucesso){

                    registerGestorForm.reset();

                    window.location.href = 'loginGestor.html';

                }

            }catch(error){

                console.error(error);

                alert('Erro ao cadastrar gestor.');

            }

        });

    }

});