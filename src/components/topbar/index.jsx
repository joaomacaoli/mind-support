import { NavLink } from "react-router-dom";
import "./styles.css";

export default function Topbar() {
  return (
    <nav className="container-nav">
      <div>
        <NavLink to="/">LOGO</NavLink>
      </div>
      <div className="container-top-bar-menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/supportgroup">Suporte</NavLink>
        <NavLink to="/testimonials">Depoimentos</NavLink>
      </div>
    </nav>
  );
}
