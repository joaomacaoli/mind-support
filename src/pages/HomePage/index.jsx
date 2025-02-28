import "./styles.css";
import Footer from "../../components/Footer";

import headflower from "./assets/headflower.jpg";
import twoWomen from "./assets/two-women-img.png";
import greenBrain from "./assets/green-brain.png";

const Home = () => {
  return (
    <>
      <main className="main-landing-page">
        <section className="presentation-section">
          <div className="presentation-text">
            <h1> MindSupport </h1>
            <h3> Clínica de Apoio Psicológico </h3>
            <h4>
              {" "}
              Liberte-se do peso da{" "}
              <span className="green-highlighted-font">mente</span> e descubra
              uma nova forma de{" "}
              <span className="green-highlighted-font">viver</span>{" "}
            </h4>
          </div>
          <div className="presentation-logo">
            <img src={headflower} alt="Logo Psicologia" />
          </div>
        </section>

        <section className="objetivos">
          <h3> Confira nossos objetivos </h3>
          <div className="card-container">
            <div className="card obj1">
              <img src={greenBrain} alt="Green Brain" />
              <p className="titulo-obj"> Promoção de autoconhecimento </p>
              <p>
                {" "}
                Ajudar os pacientes a compreenderem melhor suas emoções, padrões
                de pensamento e comportamentos.
              </p>
            </div>

            <div className="card obj2">
              <img src={greenBrain} alt="Green Brain" />
              <p className="titulo-obj"> Acompanhamento gratuito </p>
              <p>
                {" "}
                Garantir acesso e apoio emocional de qualidade, com a ajuda de
                psicólogos altamente qualificados, independentemente da sua
                situação financeira.
              </p>
            </div>

            <div className="card obj3">
              <img src={greenBrain} alt="Green Brain" />
              <p className="titulo-obj"> Melhorar a qualidade de vida </p>
              <p>
                {" "}
                Proporcionar práticas e estratégias personalizadas, para que
                cada pessoa possa desenvolver habilidades para gerenciar o
                estresse, melhorar o autocuidado e cultivar uma mentalidade
                positiva.{" "}
              </p>
            </div>
          </div>
        </section>

        <section className="about-and-help-section">
          <div className="left-about-and-help">
            <img src={twoWomen} alt="Two Women Img" />
          </div>

          <div className="right-help-text">
            <p>
              {" "}
              Na nossa clínica, acreditamos que a saúde mental é a base para uma
              vida equilibrada e plena. Sabemos que, muitas vezes, os desafios
              emocionais podem se tornar um fardo pesado.{" "}
            </p>
            <p>
              {" "}
              No entanto, também sabemos que é possível superar esses obstáculos
              e redescobrir a sua força interior. Estamos aqui para acompanhar
              você em cada passo dessa jornada, oferecendo um ambiente
              acolhedor, empático e profissional.
            </p>
          
          </div>
        </section>
      </main>

      <footer>
        <Footer></Footer>
      </footer>
     
    </>
  );
};

export default Home;
