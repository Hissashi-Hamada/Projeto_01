import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/css/estilos.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData, { withCredentials: true });
      alert('Login realizado com sucesso!');
      console.log(response.data); // aqui você pode salvar token ou dados do usuário
    } catch (error) {
      console.error(error.response?.data || error);
      alert('Erro ao logar!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card-register p-4 w-100" style={{ maxWidth: 560, marginInline: '1rem' }}>
        <h2 className="card-header mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

        <div className="mb-3 input-with-icon">
          <label className="form-label">Senha</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Digite sua senha"
            className="form-control with-eye-padding"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="password-eye"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Mostrar/ocultar senha"
          >
            <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
          </span>
        </div>

          <button type="submit" className="btn btn-Primary w-100">
              Entrar
            </button>

            {/* Link para a página de Cadastro */}
            <div className="text-center mt-3">
              <Link to="/register" className="btn btn-outline-secondary w-100">
                Não tem conta ? Registrar-se
              </Link>
            </div>

        </form>
      </div>
    </div>
  );
};

export default Login;
