import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { evaluatePassword } from '../utils/passwordUtils';
import { maskCPF, maskPhone, maskDate } from '../utils/masks';
import '../styles/css/estilos.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    nascimento: '',
    cpf: '',
    telefone: '',
  });

  const [showPass, setShowPass] = useState(false);
  const [strength, setStrength] = useState({
    score: 0, label: '—', percent: 0, colorClass: ''
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    let v = value;

    if (name === 'cpf') v = maskCPF(value);
    if (name === 'telefone') v = maskPhone(value);
    if (name === 'nascimento') v = maskDate(value);

    // atualiza força quando digita a senha
    if (name === 'password') {
      const r = evaluatePassword(v);
      setStrength(r);
    }

    setForm(prev => ({ ...prev, [name]: v }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const r = evaluatePassword(form.password);
    if (r.score < 2) {
      alert('Senha muito fraca!');
      return;
    }
    if (form.password !== form.password_confirmation) {
      alert('As senhas não coincidem!');
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
    };

    try {
      await axios.post('http://localhost:8000/api/register', payload, { withCredentials: true });
      alert('Cadastro realizado com sucesso!');
      setForm({
        name: '', email: '', password: '', password_confirmation: '',
        nascimento: '', cpf: '', telefone: '',
      });
      setStrength({ score: 0, label: '—', percent: 0, colorClass: '' });
    } catch (err) {
      console.error(err.response?.data || err);
      alert('Erro ao cadastrar!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-start" style={{ minHeight: '100vh', paddingTop: '48px' }}>
      <div className="card-register p-4 w-100" style={{ maxWidth: 560 }}>
        <h2 className="card-header mb-3">Cadastro</h2>

        <form onSubmit={handleSubmit} className="mt-2">
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Seu nome completo"
              value={form.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="seu@email.com"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>

            <div className="mb-2 input-with-icon">
              <label className="form-label">Senha</label>
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                id="inputPassword"
                className="form-control with-eye-padding"
                placeholder="Crie uma senha forte"
                value={form.password}
                onChange={onChange}
                required
              />
              <span
                className="password-eye"
                onClick={() => setShowPass(!showPass)}
                aria-label="Mostrar/ocultar senha"
                title={showPass ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <i className={showPass ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} />
              </span>
            </div>

          {/* Barra de força da senha */}
          <div className="mb-2">
            <div className="strength-bar mb-1">
              <div
                className={`strength-fill ${strength.colorClass || ''}`}
                style={{ width: `${strength.percent || 0}%` }}
              />
            </div>
            <small className="text-muted">
              Força da senha: <strong>{strength.label}</strong> ({strength.score}/4)
            </small>
            {/* sugestões (máx. 3) */}
            {Array.isArray(strength.suggestions) && strength.suggestions.length > 0 && (
              <ul className="mt-2 mb-0 ps-3 small">
                {strength.suggestions.slice(0, 3).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            )}
          </div>

            <div className="mb-3 input-with-icon">
              <label className="form-label">Confirmar senha</label>
              <input
                type={showPass ? 'text' : 'password'}
                name="password_confirmation"
                id="inputConfirmPassword"
                className="form-control with-eye-padding"
                placeholder="Repita a senha"
                value={form.password_confirmation}
                onChange={onChange}
                required
              />
            </div>



          {/* Extras (opcionais pro back agora) */}
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label">Nascimento</label>
              <input
                type="text"
                name="nascimento"
                className="form-control"
                placeholder="DD/MM/AAAA"
                value={form.nascimento}
                onChange={onChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">CPF</label>
              <input
                type="text"
                name="cpf"
                className="form-control"
                placeholder="000.000.000-00"
                value={form.cpf}
                onChange={onChange}
              />  
            </div>
            <div className="col-12">
              <label className="form-label">Telefone</label>
              <input
                type="text"
                name="telefone"
                className="form-control"
                placeholder="(00) 00000-0000"
                value={form.telefone}
                onChange={onChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-Primary w-100" id="submitBtn">
            Registrar
          </button>
                    
          {/* Link para a página de Login */}
          <div className="text-center mt-3">
            <Link to="/login" className="btn btn-outline-secondary w-100">
              Já tem conta ? Entrar
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;
