import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './components/Login';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
