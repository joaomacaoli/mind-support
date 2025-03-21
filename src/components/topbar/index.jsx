import { NavLink } from "react-router-dom";
import "./styles.css";
import brainLogo from "/green-brain.png";

export default function Topbar() {
  return (
    <nav className="container-nav">
      <div className="container-logo">
        <NavLink to="/">
          <img src={brainLogo} alt=" Brain Logo" className="imglogo"/>
        </NavLink>
      </div>

      <div className="container-top-bar-menu">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/support-groups">Suporte</NavLink>
        <NavLink to="/testimonials">Depoimentos</NavLink>
      </div>

      <div className="btn-group-login">
        <NavLink to="/login" className="button-login">
          Login
        </NavLink>
        <NavLink to="/registers" className="button-sing-up">
          Sing Up
        </NavLink>
      </div>
    </nav>
  );
}
