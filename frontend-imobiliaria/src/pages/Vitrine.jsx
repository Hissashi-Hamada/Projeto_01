import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import PropertyCard from "../components/PropertyCard.jsx";
import FiltersBar from "../components/FiltersBar.jsx";
import "./vitrine.css";
import imoveisBase from "../data/imoveis"; // ajuste se for export nomeado

function useQuery(){
  const { search } = useLocation();
  return useMemo(()=> new URLSearchParams(search), [search]);
}

export default function Vitrine(){
  const q = useQuery();
  const ref = q.get("ref")?.trim().toLowerCase() || "";
  const negocio = q.get("negocio") || ""; // venda | aluguel
  const tipo = q.get("tipo") || "";
  const min = Number(q.get("min") || 0);
  const max = Number(q.get("max") || 0);

  const [order, setOrder] = useState("recentes");
  const [quick, setQuick] = useState([]); // ex: ["novo","com-garagem"]

  const filtrados = useMemo(()=>{
    let arr = [...imoveisBase];

    if(ref) arr = arr.filter(i => String(i.referencia || "").toLowerCase().includes(ref));
    if(negocio) arr = arr.filter(i => i.tipo === negocio);
    if(tipo) arr = arr.filter(i => i.categoria === tipo); // ex.: campo 'categoria' no seu dataset

    if(min) arr = arr.filter(i => Number(i.preco) >= min);
    if(max) arr = arr.filter(i => Number(i.preco) <= max);

    // chips rápidos (ex.: condicao === "novo"; vagas > 0; pet === true)
    if(quick.includes("novo")) arr = arr.filter(i => i.condicao === "novo");
    if(quick.includes("com-garagem")) arr = arr.filter(i => Number(i.vagas) > 0);
    if(quick.includes("pet-friendly")) arr = arr.filter(i => i.pet === true);

    switch(order){
      case "menor-preco": arr.sort((a,b)=> a.preco - b.preco); break;
      case "maior-preco": arr.sort((a,b)=> b.preco - a.preco); break;
      case "maior-area": arr.sort((a,b)=> (b.area||0) - (a.area||0)); break;
      default: // recentes: usa 'createdAt' ou 'id' desc
        arr.sort((a,b)=> (b.createdAt||b.id||0) - (a.createdAt||a.id||0));
    }

    return arr;
  }, [imoveisBase, ref, negocio, tipo, min, max, order, quick]);

  return (
    <main className="container section">
      <FiltersBar total={filtrados.length} order={order} setOrder={setOrder} quick={quick} setQuick={setQuick} />

      <div className="vitrine">
        {filtrados.map(item => <PropertyCard key={item.id || item.referencia} item={item} />)}
      </div>
    </main>
  );
}
