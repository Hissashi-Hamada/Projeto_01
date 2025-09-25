import { useId } from "react";
import { formatBRL } from "../utils/money";

export default function ImovelCarouselCard({ item }) {
  const carouselId = useId().replace(/:/g, ""); // id único p/ carrossel

  const badgeTipo = item.tipo === "casa" ? "primary" : "success";
  const isAluguel = item.status === "aluguel";

  return (
    <div className="card h-100 shadow-sm">
      {/* Carousel */}
      <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner" style={{ height: 200 }}>
          {(item.imagens?.length ? item.imagens : ["/img/placeholder.jpg"]).map((src, idx) => (
            <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
              <img src={src} className="d-block w-100" alt={item.titulo} style={{ objectFit: "cover", height: 200 }} />
            </div>
          ))}
        </div>
        {item.imagens?.length > 1 && (
          <>
            <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Próximo</span>
            </button>
          </>
        )}
      </div>

      {/* Badges */}
      <div className="position-absolute m-2" style={{ top: 0, left: 0 }}>
        <span className={`badge bg-${badgeTipo} me-1`}>{item.tipo.toUpperCase()}</span>
        <span className={`badge ${isAluguel ? "bg-warning text-dark" : "bg-dark"}`}>
          {isAluguel ? "ALUGUEL" : "VENDA"}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{item.titulo}</h5>
        <small className="text-muted">{item.cidade} • {item.metragem}m²</small>
        <div className="mt-2 fw-bold">
          {isAluguel ? `${formatBRL(item.preco)}/mês` : formatBRL(item.preco)}
        </div>

        <div className="mt-2 d-flex gap-2 flex-wrap">
          {item.quartos > 0 && <span className="badge bg-light text-dark"><i className="fa-solid fa-bed me-1"></i>{item.quartos} qtos</span>}
          {item.banheiros > 0 && <span className="badge bg-light text-dark"><i className="fa-solid fa-bath me-1"></i>{item.banheiros} banh</span>}
          <span className="badge bg-light text-dark"><i className="fa-regular fa-square me-1"></i>{item.metragem}m²</span>
        </div>

        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-primary w-100">Ver detalhes</button>
          <button className="btn btn-outline-secondary"><i className="fa-regular fa-heart"></i></button>
        </div>
      </div>
    </div>
  );
}
