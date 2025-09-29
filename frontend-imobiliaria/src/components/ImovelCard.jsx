import { formatBRL } from "../utils/money";

export default function ImovelCard({ item }) {
  return (
    <div className="card">
      <img src={item.img} alt={item.titulo} />
      <div className="card-body">
        <h5>{item.titulo}</h5>
        <p>{formatBRL(item.preco)}</p>
      </div>
    </div>
  );
}
