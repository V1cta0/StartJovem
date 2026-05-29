document.addEventListener('DOMContentLoaded', () => {

    const loginGestorForm = document.getElementById('loginGestorForm');

    if(loginGestorForm){

        loginGestorForm.addEventListener('submit', async function(event){

            event.preventDefault();

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try{

                const response = await fetch('http://localhost:1880/login-gestor', {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        senha
                    })
                });

                const data = await response.json();

                if(data.sucesso){

                    localStorage.setItem('gestor', JSON.stringify(data.usuario));

                    alert(data.mensagem);

                    window.location.href = 'monitoramento.html';

                }else{

                    alert(data.mensagem);

                }

            }catch(error){

                console.error(error);

                alert('Erro ao realizar login.');

            }

        });

    }

});