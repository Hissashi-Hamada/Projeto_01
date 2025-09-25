import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import Vitrine from "./pages/Vitrine";
import VitrineImoveis from "./pages/VitrineImoveis"; // ← novo

export default function App() {
  return (
    <div className="bg-light min-vh-100">
      <Menu />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Vitrine />} />
          <Route path="/imoveis" element={<VitrineImoveis />} />  {/* ← nova página */}
          <Route path="/casas" element={<Vitrine tipoPadrao="casa" />} />
          <Route path="/terrenos" element={<Vitrine tipoPadrao="terreno" />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<div>404 – página não encontrada</div>} />
        </Routes>
      </div>
    </div>
  );
}
