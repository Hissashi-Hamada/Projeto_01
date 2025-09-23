import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData, {withCredentials: true});
      alert('Login realizado com sucesso!');
      console.log(response.data); // aqui você pode salvar token ou dados do usuário
    } catch (error) {
      console.error(error.response.data);
      alert('Erro ao logar!');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card-register p-4">
        <h2 className="card-header">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Senha"
            className="form-control mb-3"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={()=>setShowPassword(!showPassword)} className="btn btn-secondary mb-3">
            {showPassword ? 'Ocultar' : 'Mostrar'} Senha
          </button>
          <button type="submit" className="btn btn-Primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
