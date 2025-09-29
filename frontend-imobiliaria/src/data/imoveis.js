// src/data/imoveis.js
const imoveis = [
  {
    id: 1,
    titulo: "Casa no Centro",
    cidade: "Umuarama",
    estado: "PR",
    bairro: "Centro",
    preco: 350000,
    imagem: "/img/casa1.jpg",
    area: 120,
    quartos: 3,
    banheiros: 2,
    vagas: 1,
    condicao: "novo",
    tipo: "venda",
    createdAt: 1
  },
  {
    id: 2,
    titulo: "Apartamento Jardim São Paulo",
    cidade: "Umuarama",
    estado: "PR",
    bairro: "Jd São Paulo",
    preco: 1200,
    imagem: "/img/apto1.jpg",
    area: 80,
    quartos: 2,
    banheiros: 1,
    vagas: 1,
    condicao: "usado",
    tipo: "aluguel",
    createdAt: 2
  }
];

export default imoveis;
