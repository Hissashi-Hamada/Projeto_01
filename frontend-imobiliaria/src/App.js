// App.js
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

export default function App() {
  return (
    <div className="container pt-3">
      <nav className="mb-3 d-flex gap-3">
        <Link to="/register">Cadastro</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </div>
  );
}
