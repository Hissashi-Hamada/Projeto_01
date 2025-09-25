import React, { useEffect } from 'react';
import axios from 'axios';
import { togglePasswordVisibility, evaluatePassword } from '../utils/passwordUtils';
import { maskDate, maskCPF, maskPhone } from '../utils/masks';
import '../styles/estilos.css';
import '../styles/estilos.css';


const Register = () => {
  useEffect(() => {
    const inputPassword = document.getElementById('inputPassword');
    const inputConfirmPassword = document.getElementById('inputConfirmPassword');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const inputNascimento = document.getElementById('inputNascimento');
    const inputCPF = document.getElementById('inputCPF');
    const inputTelefone = document.getElementById('inputTelefone');

    maskDate(inputNascimento);
    maskCPF(inputCPF);
    maskPhone(inputTelefone);
    togglePasswordVisibility(inputPassword, inputConfirmPassword, togglePasswordBtn);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const confirm = form.password_confirmation.value;

    const result = evaluatePassword(password);
    if (result.score < 2) {
      alert('Senha muito fraca!');
      return;
    }
    if (password !== confirm) {
      alert('As senhas não coincidem!');
      return;
    }

    const formData = {
      name: form.name.value,
      email: form.email.value,
      password,
      password_confirmation: confirm
    };

    try {
      await axios.post('http://localhost:8000/api/register', formData, { withCredentials: true });
      alert('Cadastro realizado com sucesso!');
      form.reset();
    } catch (err) {
      console.error(err.response?.data);
      alert('Erro ao cadastrar!');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Cadastro</h3>
        <form onSubmit={handleSubmit} id="registerForm">
          <div className="mb-3">
            <input type="text" name="name" className="form-control" placeholder="Nome" required />
          </div>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="mb-3 position-relative">
            <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Senha" required />
            <span id="togglePassword" className="password-toggle">Mostrar</span>
          </div>
          <div className="mb-3">
            <input type="password" id="inputConfirmPassword" name="password_confirmation" className="form-control" placeholder="Confirmar Senha" required />
          </div>
          <div className="mb-3">
            <input type="text" id="inputNascimento" placeholder="Data de Nascimento" className="form-control" />
          </div>
          <div className="mb-3">
            <input type="text" id="inputCPF" placeholder="CPF" className="form-control" />
          </div>
          <div className="mb-3">
            <input type="text" id="inputTelefone" placeholder="Telefone" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
