import React, { useState } from 'react';
import axios from 'axios';
import { togglePasswordVisibility, evaluatePassword } from '../utils/passwordUtils';
import { maskDate, maskCPF, maskPhone } from '../utils/masks';

const Register = () => {
  const [formData, setFormData] = useState({
    name:'', email:'', password:'', password_confirmation:'',
    nascimento:'', cpf:'', telefone:''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState({score:0,label:'—',percent:0});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if(name==='cpf') val = maskCPF(value);
    if(name==='telefone') val = maskTelefone(value);
    if(name==='nascimento') val = maskData(value);
    setFormData({...formData, [name]: val});
    if(name==='password') setStrength(evaluatePassword(val));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.password_confirmation){
      alert('Senhas não coincidem!');
      return;
    }
    if(strength.score<2){
      alert('Senha muito fraca!');
      return;
    }
    try {
      await axios.post('http://localhost:8000/api/register', formData, {withCredentials:true});
      alert('Cadastro realizado com sucesso!');
      setFormData({ name:'', email:'', password:'', password_confirmation:'', nascimento:'', cpf:'', telefone:'' });
    } catch (err) {
      alert('Erro ao cadastrar!');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card-register p-4">
        <h2 className="card-header">Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Nome" className="form-control mb-3" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="form-control mb-3" value={formData.email} onChange={handleChange} required />
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Senha" className="form-control mb-3" value={formData.password} onChange={handleChange} required />
          <input type={showPassword ? "text" : "password"} name="password_confirmation" placeholder="Confirmar Senha" className="form-control mb-3" value={formData.password_confirmation} onChange={handleChange} required />
          <button type="button" onClick={()=>setShowPassword(!showPassword)} className="btn btn-secondary mb-3">{showPassword ? 'Ocultar' : 'Mostrar'} Senha</button>
          <input type="text" name="nascimento" placeholder="Nascimento" className="form-control mb-3" value={formData.nascimento} onChange={handleChange} required />
          <input type="text" name="cpf" placeholder="CPF" className="form-control mb-3" value={formData.cpf} onChange={handleChange} required />
          <input type="text" name="telefone" placeholder="Telefone" className="form-control mb-3" value={formData.telefone} onChange={handleChange} required />
          <div className="strength-bar mb-2">
            <div className="strength-fill" style={{width: `${strength.percent}%`}}></div>
          </div>
          <small>Força da senha: {strength.label}</small>
          <button type="submit" className="btn btn-Primary w-100 mt-3">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
