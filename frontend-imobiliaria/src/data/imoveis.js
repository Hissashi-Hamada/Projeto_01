import { useMemo, useState } from "react";
import ImovelCarouselCard from "../components/ImovelCarouselCard";
import IMOVEIS from "../data/imoveis"; 

export default function VitrineImoveis(){
  const [busca,setBusca] = useState("");

  const itens = useMemo(()=>{
    let base = Array.isArray(IMOVEIS)? [...IMOVEIS] : [];
    if(busca.trim()){
      const b = busca.toLowerCase();
      base = base.filter(i => (i.titulo||"").toLowerCase().includes(b) || (i.cidade||"").toLowerCase().includes(b));
    }
    return base;
  },[busca]);
  

  return (
    <section>
      <h2 className="mb-3">Imóveis</h2>
      <div className="d-flex gap-2 mb-3">
        <input className="form-control" placeholder="Buscar por título ou cidade..." value={busca} onChange={e=>setBusca(e.target.value)} />
      </div>

      {itens.length===0 ? (
        <div className="text-center text-muted py-5 bg-white rounded">Nenhum imóvel encontrado.</div>
      ):(
        <div className="row g-3">
          {itens.map(item=>(
            <div key={item.id} className="col-12 col-sm-6 col-lg-4">
              <ImovelCarouselCard item={item}/>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
