import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Menu from './components/Menu';
import Vitrine from './pages/Vitrine';
import Login from './components/Login'; // ajuste conforme seu export

export default function App() {
  return (
    <div className="bg-light min-vh-100">
      <Menu />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Vitrine />} />
          <Route path="/casas" element={<Vitrine tipoPadrao="casa" />} />
          <Route path="/terrenos" element={<Vitrine tipoPadrao="terreno" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<div>404 – página não encontrada</div>} />
        </Routes>
      </div>
    </div>
  );
}
