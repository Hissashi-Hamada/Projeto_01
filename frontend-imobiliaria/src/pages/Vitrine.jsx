import { useMemo, useState, useEffect } from "react";
import { IMOVEIS } from "../data/imoveis";   // ← apenas esta linha
import ImovelCard from "../components/ImovelCard";

// opcional para checar
// console.log("Tipo de IMOVEIS:", Array.isArray(IMOVEIS), IMOVEIS?.length);

export default function Vitrine({ tipoPadrao = "todos" }) {
  // ... resto igual
}
