import "./hero-search.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSearch(){
  const [referencia, setReferencia] = useState("");
  const [negocio, setNegocio] = useState(""); // venda | aluguel | ""
  const [tipo, setTipo] = useState("");       // casa | apartamento | terreno | comercial | ""
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const navigate = useNavigate();

  const onSubmit = (e)=>{
    e.preventDefault();
    const params = new URLSearchParams();
    if(referencia) params.set("ref", referencia);
    if(negocio) params.set("negocio", negocio);
    if(tipo) params.set("tipo", tipo);
    if(min) params.set("min", min);
    if(max) params.set("max", max);
    navigate(`/vitrine?${params.toString()}`);
  };

  return (
    <section className="hero">
      <div className="container hero__inner">
        <h1 className="hero__title">Encontre seu próximo imóvel</h1>
        <p className="hero__subtitle">Compra, venda e aluguel em Umuarama e região</p>

        <form className="hero__form" onSubmit={onSubmit}>
          <input className="input" placeholder="Referência" value={referencia}
                 onChange={(e)=>setReferencia(e.target.value)} />

          <select className="select" value={negocio} onChange={e=>setNegocio(e.target.value)}>
            <option value="">Negócio</option>
            <option value="venda">Venda</option>
            <option value="aluguel">Aluguel</option>
          </select>

          <select className="select" value={tipo} onChange={e=>setTipo(e.target.value)}>
            <option value="">Tipo do Imóvel</option>
            <option value="casa">Casa</option>
            <option value="apartamento">Apartamento</option>
            <option value="terreno">Terreno</option>
            <option value="comercial">Comercial</option>
          </select>

          <input className="input" type="number" min="0" placeholder="Valor mín (R$)"
                 value={min} onChange={e=>setMin(e.target.value)} />
          <input className="input" type="number" min="0" placeholder="Valor máx (R$)"
                 value={max} onChange={e=>setMax(e.target.value)} />

          <button className="btn btn--primary" type="submit">Pesquisar</button>
        </form>
      </div>
    </section>
  );
}
