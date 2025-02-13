import React from "react";

import "./home.css";
import brainLogo from './assets/brain-logo.jpg';
import simboloPsico from './assets/simboloPsico.png';
import twoWomen from './assets/two-women-img.png';
import greenBrain from './assets/green-brain.png';

const Home = () =>{
	return(
	<>
		<header>
        	<nav className="barra-navegacao">
        		<div className="container-logo"> 
        			<img src={brainLogo} alt=" Brain Logo"/> 
        		</div>

          		<ul className="lista-navigacao">
            		<li> Home </li>
            		<li> Depoimentos </li>
            		<li> Apoio </li>
          		</ul>

          		<div className="btn-group-login">
            		<button className="button login"> Login </button>
            		<button className="button sing-up"> Sing Up</button>
          		</div>
        	</nav>
      	</header>

      	<main>
      		<section className="presentation-section">
      			<div className="presentation-text">
      				<h1> MindSupport </h1>
      				<h3> Clínica de Apoio Psicológico </h3>
      				<h4> Liberte-se do peso da <span className="green-highlighted-font">mente</span> e descubra uma nova forma de <span className="green-highlighted-font">viver</span> </h4>
      			</div>
      			<div className="presentation-logo">
      				<img src={simboloPsico} alt="Logo Psicologia"/> 
      			</div>
      		</section>

      		<section className="objetivos">
      			<h3> Confira nossos objetivos </h3>
      			<div className="card-container"> 
      				<div className="card obj1"> 
      					<img src={greenBrain} alt="Green Brain"/> 
      					<p className="titulo-obj"> Promoção de autoconhecimento </p>
      					<p> Ajudar os pacientes a compreenderem melhor
      					 suas emoções, padrões de pensamento e comportamentos.</p>
      				</div>

      				<div className="card obj2"> 
      					<img src={greenBrain} alt="Green Brain"/> 
      					<p className="titulo-obj"> Acompanhamento gratuito </p>
      					<p> Garantir acesso e apoio emocional de qualidade,
      					 com a ajuda de psicólogos altamente qualificados, 
      					 independentemente da sua situação financeira.</p>
      				</div>

      				<div className="card obj3"> 
      					<img src={greenBrain} alt="Green Brain"/> 
      					<p className="titulo-obj"> Melhorar a qualidade de vida </p>
      					<p> Proporcionar práticas e estratégias personalizadas, 
      					para que cada pessoa possa desenvolver habilidades para 
      					gerenciar o estresse, melhorar o autocuidado e 
      					cultivar uma mentalidade positiva. </p>
      				</div>

      				<div className="card obj4"> 
      					<img src={greenBrain} alt="Green Brain"/> 
      					<p className="titulo-obj"> Melhorar a qualidade de vida </p>
      					<p> Proporcionar práticas e estratégias personalizadas, 
      					para que cada pessoa possa desenvolver habilidades para 
      					gerenciar o estresse, melhorar o autocuidado e 
      					cultivar uma mentalidade positiva. </p>
      				</div>

      				<div className="card obj5"> 
      					<img src={greenBrain} alt="Green Brain"/> 
      					<p className="titulo-obj"> Melhorar a qualidade de vida </p>
      					<p> Proporcionar práticas e estratégias personalizadas, 
      					para que cada pessoa possa desenvolver habilidades para 
      					gerenciar o estresse, melhorar o autocuidado e 
      					cultivar uma mentalidade positiva. </p>
      				</div>
      			</div>
      		</section>

      		<section className="about-and-help-section">
      			<div className="left-about-and-help"> 
      				<img src={twoWomen} alt="Two Women Img"/> 
      				<button className="btn ask-for-help-now"> Peça ajuda agora </button>
      			</div>

      			<div className="right-help-text"> 
      				<p> Na nossa clínica, acreditamos que a saúde mental é a base para 
      				uma vida equilibrada e plena. Sabemos que, muitas vezes, os desafios
      				emocionais podem se tornar um fardo pesado. </p>
      				<p> No entanto, também sabemos que é possível superar esses 
      				obstáculos e redescobrir a sua força interior. Estamos aqui para 
      				acompanhar você em cada passo dessa jornada, oferecendo um 
      				ambiente acolhedor, empático e profissional.</p>
      				<p> Se você está pronto para dar o primeiro passo, estamos aqui para ajudar! </p>
      			</div>
      		</section>
      	</main>

      	<footer></footer>	
	</>
	);
}

export default Home;