import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import HeroSearch from "./components/HeroSearch.jsx";
import Vitrine from "./pages/Vitrine.jsx";
import Footer from "./components/Footer.jsx";

export default function App(){
  return (
    <>
      <Header />
      <HeroSearch />
      <Routes>
        <Route path="/" element={<Vitrine />} />
        <Route path="/vitrine" element={<Vitrine />} />
      </Routes>
      <Footer />
    </>
  );
}
