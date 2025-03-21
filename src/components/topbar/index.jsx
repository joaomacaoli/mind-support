import { NavLink } from "react-router-dom";
import "./styles.css";
import brainLogo from './assets/green-brain.png';

export default function Topbar() {
  return (
  
    <nav className="container-nav">
          <div className="container-logo"> 
              <img src={brainLogo} alt=" Brain Logo"/> 
          </div>
          
          <div className="container-top-bar-menu">
              <NavLink to="/homepage">Home</NavLink>
              <NavLink to="/supportgroup">Suporte</NavLink>
              <NavLink to="/anonymousTestimonial">Depoimentos</NavLink>
          </div>

          <div className="btn-group-login">
              <NavLink to="/supportgroup" className="button login">Login</NavLink>
              <NavLink to="/generalRegistration" className="button sing-up">Sing Up</NavLink>
          </div>
    </nav>
  );
}
