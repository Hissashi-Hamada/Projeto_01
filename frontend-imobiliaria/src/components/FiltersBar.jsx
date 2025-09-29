import "./filters-bar.css";

export default function FiltersBar({ total, order, setOrder, quick, setQuick }){
  return (
    <div className="filters">
      <div className="filters__left">
        <strong>{total}</strong> imóveis encontrados
      </div>
      <div className="filters__right">
        <div className="chips">
          {["novo","com-garagem","pet-friendly"].map(c => (
            <button key={c}
              className={`chip ${quick.includes(c) ? "chip--active":""}`}
              onClick={()=> setQuick(
                quick.includes(c) ? quick.filter(x=>x!==c) : [...quick,c]
              )}>
              {c.replace("-"," ").toUpperCase()}
            </button>
          ))}
        </div>
        <select className="select" value={order} onChange={e=>setOrder(e.target.value)}>
          <option value="recentes">Mais recentes</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
          <option value="maior-area">Maior área</option>
        </select>
      </div>
    </div>
  );
}
