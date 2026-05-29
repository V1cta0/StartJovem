document.addEventListener('DOMContentLoaded', () => {

    const loginAprendizForm = document.getElementById('loginAprendizForm');

    if (loginAprendizForm) {

        loginAprendizForm.addEventListener('submit', async function(event) {

            event.preventDefault();

            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            try {

                const response = await fetch('http://localhost:1880/login-aprendiz', {
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

                    alert(data.mensagem);

                    localStorage.setItem('usuario', JSON.stringify(data.usuario));

                    window.location.href = 'monitoramento.html';

                }else{

                    alert(data.mensagem);

                }

            } catch(error){

                console.error(error);
                alert('Erro ao realizar login.');

            }

        });

    }

});