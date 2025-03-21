import React, { useState } from "react";
import "./style.css";
import brainLogo from './assets/green-brain.png';

const GeneralRegistration = () =>{

    const [formData, setFormData] = useState({
        nomeUsuario: "",
        email: "",
        senha: "",
        tipoUsuario: "",
      });

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };
    
      {/* */}
      const handleSubmit = (e) => {
        e.preventDefault();
           
            if (formData.nomeUsuario == "" || formData.email == "" || 
                formData.senha == "" || formData.tipoUsuario == "" ) {
                alert("Preencha todos os campos obrigatórios!");
                return;
            }
        alert("Conta criada com sucesso!");
      };  

    return(
        <main className="main-class-form">
            <div className="container-form-general"> 
                <form onSubmit={handleSubmit} className="form-general">
                    <section className="conteiner-singUp-text">
                        <div className="logo-singUp">
                            <img src={brainLogo} alt=" Brain Logo"/> 
                            <h1> Sing Up </h1>
                        </div>
                        <div className="text-entre-seu-email">
                            <h4> Entre com seu e-mail para criar uma conta
                                e conheça os benefícios da MindSupport </h4>
                        </div>
                    </section>

                    <section className="conteiner-form-field">
                        <div className="form-field-general">
                            <label htmlFor="nomeUsuario">Nome de usuário: <span className="asterisco">*</span></label>
                            <input type="text" id="nomeUsuario" name="nomeUsuario"
                            value={formData.nomeUsuario} onChange={handleChange} 
                            placeholder="Escolha um nome de usuário"/>
                        </div>

                        <div className="form-field-general">
                            <label htmlFor="email">E-mail: <span className="asterisco">*</span></label>
                            <input type="email" id="email" name="email"
                            value={formData.email} onChange={handleChange} 
                            placeholder="Digite seu e-mail"/>
                        </div>
                        
                        <div className="form-field-general">
                            <label htmlFor="senha">Senha: <span className="asterisco">*</span></label>
                            <input type="password" id="senha" name="senha"
                            value={formData.senha} onChange={handleChange} 
                            placeholder="Crie uma senha para acesso"/>
                        </div>

                        <div className="form-field-radio">
                                <label> Tipo de usuário <span className="asterisco">*</span></label>
                                <div className="radio-group">
                                    <div>
                                        <input type="radio" id="tipoPaciente" name="tipoUsuario"
                                        value="tipoPaciente" checked={formData.tipoUsuario === "tipoPaciente"} 
                                        onChange={handleChange} required/>
                                        <label htmlFor="tipoPaciente"> Paciente</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="tipoProfissional" name="tipoUsuario"
                                        value="tipoProfissional" checked={formData.tipoUsuario === "tipoProfissional"} 
                                        onChange={handleChange} required/>
                                        <label htmlFor="tipoProfissional"> Profissional</label>
                                    </div>
                                </div>
                            </div>
                    </section>

                    <div>
                        <button type="submit" className="btn-avancar"> Criar conta </button>
                    </div>
                    
                </form>
            </div>
        </main>
    );
}

export default GeneralRegistration;






