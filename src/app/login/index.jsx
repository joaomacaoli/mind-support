import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { isValidEmail } from "../../utils/masks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "O Email é obrigatório!";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Email inválido!";
    }

    if (!password) {
      newErrors.password = "A Senha é obrigatória!";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      validateInputs() &&
      email == "pacient.test@gmail.com" &&
      password == "123456"
    ) {
      console.log("Login bem-sucedido!");
      navigate("/pacient-dashboard");
    } else if (
      validateInputs() &&
      email == "professional.test@gmail.com" &&
      password == "123456"
    ) {
      console.log("Login bem-sucedido!");
      navigate("/professional-dashboard");
    }
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <h1 className="title-login">Mind Support</h1>
        <form className="form-login" onClick={handleLogin} noValidate>
          <div className="input-email">
            <label htmlFor="email" className="label-login">
              E-mail <small>*</small>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`input-type ${errors.email ? "error" : ""}`}
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="input-password">
            <label htmlFor="password" className="label-login">
              Senha <small>*</small>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`input-type ${errors.password ? "error" : ""}`}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="container-esqueceu-senha">
            <Link to="/construction" className="link-senha">
              <span className="esqueceu-senha-text">Esqueceu sua senha?</span>
            </Link>
          </div>

          <div className="container-button">
            <button
              type="submit"
              className="button-entre-login"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <Link to={"/registers"}>
              <button
                type="button"
                className="button-cadastro-login"
                disabled={loading}
              >
                {loading ? "Redirecionando..." : "Cadastrar"}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
