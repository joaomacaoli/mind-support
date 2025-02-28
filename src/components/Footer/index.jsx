import { Link } from "react-router-dom";
import "./styles.css";
export default function Footer() {
  return (
    <footer className="footer-landing">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">MindSupport</h3>
          <p className="footer-text">
            Transformando vidas através do apoio psicológico acessível e de
            qualidade.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Links Rápidos</h4>
          <ul className="footer-links">
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="footer-link">
                Depoimentos
              </Link>
            </li>
            <li>
              <Link to="/" className="footer-link">
                Apoio
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Contato</h4>
          <p className="footer-text">
            Email:{" "}
            <a
              href="https://atlanticoavanti.ensinio.com/browse"
              className="footer-link"
            >
              suporte@mindsupport.com
            </a>
          </p>
          <p className="footer-text">
            Telefone:{" "}
            <a href="tel:+(85) 4002-8922" className="footer-link">
              (85) 4002-8922
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} MindSupport. Todos os direitos
          reservados.
        </p>
      </div>

      <button className="btn ask-for-help-now">Peça ajuda agora</button>
    </footer>
  );
}
