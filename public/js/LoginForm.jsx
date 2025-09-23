import { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      }, {
        headers: {
          Accept: 'application/json',
        },
      });

      // Token recebido do Laravel Sanctum
      const token = response.data.token;

      // Salva no localStorage para usar nas próximas requisições
      localStorage.setItem('auth_token', token);

      setUser(response.data.user);
      setError('');

      console.log('Login feito com sucesso!');

    } catch (err) {
      console.error(err);
      setError('Login inválido. Verifique o e-mail e a senha.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />

        <button type="submit">Entrar</button>
      </form>

      {user && (
        <div>
          <h3>Bem-vindo, {user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
