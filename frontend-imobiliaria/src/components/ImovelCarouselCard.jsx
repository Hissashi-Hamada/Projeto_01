import { useId } from "react";

export default function ImovelCarouselCard({ item }){
  const cid = useId().replace(/:/g,"");
  const imagens = item.imagens?.length ? item.imagens : [item.img]; // fallback

  return (
    <div className="card h-100 shadow-sm">
      <div id={cid} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner" style={{height:200}}>
          {imagens.map((src, i)=>(
            <div className={`carousel-item ${i===0?"active":""}`} key={i}>
              <img src={src} className="d-block w-100" alt={item.titulo} style={{objectFit:"cover",height:200}}/>
            </div>
          ))}
        </div>
        {imagens.length>1 && (
          <>
            <button className="carousel-control-prev" type="button" data-bs-target={`#${cid}`} data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${cid}`} data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Próximo</span>
            </button>
          </>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{item.titulo}</h5>
        <small className="text-muted">{item.cidade} • {item.metragem}m²</small>
        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-primary w-100">Ver detalhes</button>
        </div>
      </div>
    </div>
  );
}
