import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSearch from "./components/HeroSearch";
import Vitrine from "./pages/Vitrine";
import Footer from "./components/Footer";

export default function App(){
  return (
    <>
      <Header />
      <HeroSearch />
      <Routes>
        <Route path="/" element={<Vitrine />} />
        <Route path="/vitrine" element={<Vitrine />} />
        {/* outras páginas */}
      </Routes>
      <Footer />
    </>
  );
}
