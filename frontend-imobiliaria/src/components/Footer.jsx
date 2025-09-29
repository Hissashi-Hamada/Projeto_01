import "./footer.css";

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="brand__logo">🏠</div>
          <div>
            <h4 className="brand__name">Sua Imobiliária</h4>
            <p className="footer__copy">© {new Date().getFullYear()} — Todos os direitos reservados</p>
          </div>
        </div>

        <div className="footer__col">
          <h5>Unidade 1</h5>
          <p>Avenida Guanabara, 2340, Zona VII — Umuarama/PR</p>
          <p><a href="tel:+554436399966">(44) 3639-9966</a></p>
          <p><a href="mailto:contato@imobiliaria.com">contato@imobiliaria.com</a></p>
        </div>

        <div className="footer__col">
          <h5>Unidade 2</h5>
          <p>Avenida Londrina, 3777, Zona II — Umuarama/PR</p>
          <p><a href="tel:+554437711060">(44) 3771-1060</a></p>
          <p><a href="mailto:atendimento@imobiliaria.com">atendimento@imobiliaria.com</a></p>
        </div>
      </div>
    </footer>
  );
}
