import "./styles.css";
import brainLogo from "./assets/cerebro2.png";
import { Link } from "react-router-dom";
export default function Topbar() {
  return (
    <header className="header-home">
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to={"/"}>
            <img src={brainLogo} alt="Brain Logo" className="img-logo-nav" />
          </Link>
        </div>

        <ul className="nav-list">
          <Link to={"/"} className="nav-link">
            <li className="nav-item"> Home </li>
          </Link>
          <Link to={"testimonials"} className="nav-link">
            <li className="nav-item"> Depoimentos </li>
          </Link>
          <Link to={"supportgroup"} className="nav-link">
            <li className="nav-item"> Apoio </li>
          </Link>
        </ul>

        <div className="btn-group">
          <Link to={"/login"} className="nav-link-top">
            <button className="btn-login"> Login </button>
          </Link>
          <Link to={"/register"}  className="nav-link-top" >
            <button className="btn-sign-up"> Sing Up</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
