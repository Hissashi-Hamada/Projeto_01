import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container">
        <span className="navbar-brand fw-bold text-primary">Imobiliária</span>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navLinks">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navLinks" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto gap-2">
            <li className="nav-item"><NavLink to="/" className="btn btn-sm btn-outline-secondary">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/imoveis" className="btn btn-sm btn-outline-secondary">Imóveis</NavLink></li>
            <li className="nav-item"><NavLink to="/casas" className="btn btn-sm btn-primary text-white">Casas</NavLink></li>
            <li className="nav-item"><NavLink to="/terrenos" className="btn btn-sm btn-success text-white">Terrenos</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
