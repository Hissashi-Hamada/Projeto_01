import { useEffect, useMemo, useState } from "react";
import { IMOVEIS } from "../data/imoveis";
import ImovelCarouselCard from "../components/ImovelCarouselCard";
import ImovelCard from "../components/ImovelCard";


export default function VitrineImoveis() {
  const [status, setStatus] = useState("todos"); // todos | venda | aluguel
  const [tipo, setTipo] = useState("todos");     // todos | casa | terreno
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState("recente"); // recente | menor-preco | maior-preco
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => { setPage(1); }, [status, tipo, busca, ordem]);

  const itens = useMemo(() => {
    let base = Array.isArray(IMOVEIS) ? [...IMOVEIS] : [];

    if (status !== "todos") base = base.filter(i => i.status === status);
    if (tipo !== "todos") base = base.filter(i => i.tipo === tipo);
    if (busca.trim()) {
      const b = busca.toLowerCase();
      base = base.filter(i =>
        i.titulo.toLowerCase().includes(b) ||
        i.cidade.toLowerCase().includes(b)
      );
    }

    if (ordem === "menor-preco") base.sort((a,b)=> a.preco - b.preco);
    if (ordem === "maior-preco") base.sort((a,b)=> b.preco - a.preco);
    // “recente” mantém a ordem mock

    return base;
  }, [status, tipo, busca, ordem]);

  const total = itens.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const pageItems = itens.slice(start, start + pageSize);

  return (
    <section>
      <h2 className="mb-3">Imóveis</h2>

      {/* Filtros */}
      <div className="row g-2 mb-3">
        <div className="col-12 d-flex gap-2 flex-wrap">
          <div className="btn-group" role="group" aria-label="status">
            <button className={`btn ${status==="todos"?"btn-dark":"btn-outline-secondary"}`} onClick={()=>setStatus("todos")}>Todos</button>
            <button className={`btn ${status==="venda"?"btn-dark":"btn-outline-secondary"}`} onClick={()=>setStatus("venda")}>Venda</button>
            <button className={`btn ${status==="aluguel"?"btn-dark":"btn-outline-secondary"}`} onClick={()=>setStatus("aluguel")}>Aluguel</button>
          </div>

          <div className="btn-group ms-2" role="group" aria-label="tipo">
            <button className={`btn ${tipo==="todos"?"btn-outline-secondary":"btn-outline-secondary"}`} onClick={()=>setTipo("todos")}>Todos os tipos</button>
            <button className={`btn ${tipo==="casa"?"btn-primary text-white":"btn-outline-primary"}`} onClick={()=>setTipo("casa")}>Casas</button>
            <button className={`btn ${tipo==="terreno"?"btn-success text-white":"btn-outline-success"}`} onClick={()=>setTipo("terreno")}>Terrenos</button>
          </div>
        </div>

        <div className="col-12 d-flex gap-2 flex-wrap">
          <input
            className="form-control"
            placeholder="Buscar por título ou cidade..."
            value={busca}
            onChange={(e)=> setBusca(e.target.value)}
            style={{minWidth: 240}}
          />
          <select
            className="form-select"
            value={ordem}
            onChange={(e)=> setOrdem(e.target.value)}
            style={{maxWidth: 220}}
          >
            <option value="recente">Mais recentes</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {pageItems.length === 0 ? (
        <div className="text-center text-muted py-5 bg-white rounded">Nenhum imóvel encontrado.</div>
      ) : (
        <div className="row g-3">
          {pageItems.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-lg-4">
              <ImovelCarouselCard item={item} />
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      <div className="d-flex justify-content-center align-items-center gap-2 mt-3 flex-wrap">
        <button className="btn btn-outline-secondary" disabled={page===1} onClick={()=> setPage(p=>Math.max(1,p-1))}>◀ Anterior</button>
        <span>Página {page} de {totalPages}</span>
        <button className="btn btn-outline-secondary" disabled={page===totalPages} onClick={()=> setPage(p=>Math.min(totalPages,p+1))}>Próxima ▶</button>
      </div>
    </section>
  );
}
