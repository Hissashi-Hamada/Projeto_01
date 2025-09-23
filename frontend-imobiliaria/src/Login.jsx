import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

        try {
          const response = await axios.post("http://localhost:8000/api/login", {
              email,
              password,
            }, {
              headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
              },
            });   
                  
          const { token, user } = response.data;    
      
          // salva o token no localStorage
          localStorage.setItem("token", token); 
      
          setUsuario(user);
          setErro("");  
      
        } catch (error) {
          setErro("E-mail ou senha inválidos");
        }

    };

  return (
    <div>
      <h2>Login</h2>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <button type="submit">Entrar</button>
      </form>

      {usuario && (
        <div>
          <h3>Bem-vindo, {usuario.name}</h3>
          <p>Email: {usuario.email}</p>
        </div>
      )}
    </div>
  );
}

export default Login;
