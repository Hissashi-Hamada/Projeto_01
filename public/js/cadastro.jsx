import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
    const logarUsuario = async (e) => {
        e.preventDefault(); // Impede o form de enviar via HTML padrão

        const usuario = document.getElementById('username').value.trim();
        const senha = document.getElementById('password').value.trim();

        if (!usuario || !senha) {
            alert('Preencha todos os campos!');
            return;
        }

        const data = {
            usuario: usuario,
            senha: senha
        };

        try {
            const response = await fetch('/postform', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);
            alert('Form enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar:', error);
        }
    };

    return (
        <form onSubmit={logarUsuario}>
            <label htmlFor="username">Usuário</label><br />
            <input type="text" id="username" name="usuario" /><br />

            <label htmlFor="password">Senha</label><br />
            <input type="password" id="password" name="senha" /><br />

            <button type="submit">Enviar</button>
        </form>
    );
}

const root = ReactDOM.createRoot(document.getElementById('formularioLogin'));
root.render(<App />);
