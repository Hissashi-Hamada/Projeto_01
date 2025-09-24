import React from 'react';
import Register from './components/Register';
import './styles/css/estilos.css';

function App() {
  return (
    <div className="container mt-5 p-4" style={{
      backgroundColor: 'rgba(255,255,255,0.9)',
      borderRadius: '12px',
      maxWidth: '500px'
    }}>
      <h2>Cadastro</h2>
      <Register />
    </div>
  );
}

export default App;
