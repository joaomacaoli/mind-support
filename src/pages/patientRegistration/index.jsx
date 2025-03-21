import React, {useState} from "react";
import "./style.css"

const PatientRegistration = () => {

    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        dataNascimento: "",
        endereco: "",
        telefone: "",
        sexo: "",
        principalQueixa: "",
        historicoFamiliar: "",
        usoMedicamentos: "",
        doencasDiagnosticas: "",
        objTerapia: "",
    });
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
            if (formData.nome == "" || formData.cpf == "" || 
                formData.dataNascimento == "" || formData.telefone == "" || 
                formData.sexo == "" || formData.principalQueixa == "" || 
                formData.historicoFamiliar == "" || formData.usoMedicamentos == "" || 
                formData.doencasDiagnosticas == "" || formData.objTerapia == ""  ) {
                alert("Preencha todos os campos obrigatórios!");
                return;
            }
        alert("Formulário enviado com sucesso!");
      }; 


    return(

       <main className="main-class-form">
            <div className="container-form-patient">
                <p>Ficha de Anamnese Básica. </p>
                <form className="form-patient" onSubmit={handleSubmit}>

                    <section className="top-row-section">
                        <div className="top-left-column">
                            <div className="form-field">
                                <label htmlFor="nome"> Nome completo: <span className="asterisco">*</span></label>
                                <input type="text" id="nome" name="nome"
                                value={formData.nome} onChange={handleChange} 
                                placeholder="Digite seu nome completo"/>
                            </div>

                            <div className="form-field">
                                <label htmlFor="cpf"> CPF: <span className="asterisco">*</span></label>
                                <input type="text" id="cpf" name="cpf"
                                value={formData.cpf} onChange={handleChange} 
                                placeholder="Digite seu CPF"/>
                            </div>


                            <div className="form-field">
                                <label htmlFor="telefone"> Telefone: <span className="asterisco">*</span></label>
                                <input type="text" id="telefone" name="telefone"
                                value={formData.telefone} onChange={handleChange} 
                                placeholder="Digite seu telefone"/>
                            </div>
                        </div>

                        <div className="top-right-column">
                            <div className="form-field">
                                <label htmlFor="dataNascimento"> Data de nascimento: <span className="asterisco">*</span></label>
                                <input type="date" id="dataNascimento" name="dataNascimento"
                                value={formData.dataNascimento} onChange={handleChange} 
                                placeholder="Selecione sua data de nascimento"/>
                            </div>

                            <div className="form-field">
                                <label htmlFor="endereco"> Endereço: <span className="asterisco">*</span></label>
                                <input type="text" id="endereco" name="endereco"
                                value={formData.endereco} onChange={handleChange} 
                                placeholder="Bairro, Cidade, Estado"/>
                            </div>

                            <div className="form-field-radio">
                                <label>Sexo <span className="asterisco">*</span></label>
                                <div className="radio-group-anamnese">
                                    <div>
                                        <input type="radio" id="sexoMasculino" name="sexo"
                                        value="masculino" checked={formData.sexo === "masculino"} 
                                        onChange={handleChange} required/>
                                        <label htmlFor="sexoMasculino"> Masculino</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="sexoFeminino" name="sexo"
                                        value="feminino" checked={formData.sexo === "feminino"} 
                                        onChange={handleChange} required/>
                                        <label htmlFor="sexoFeminino"> Feminino</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="sexoOutro" name="sexo"
                                        value="outro" checked={formData.sexo === "outro"} 
                                        onChange={handleChange} required/>
                                        <label htmlFor="sexoOutro"> Outro</label>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </section>

                    <section className="bottom-row-section">
                        <div className="bottom-left-column">
                            <div className="form-field">
                                <label htmlFor="principalQueixa"> Principal queixa: <span className="asterisco">*</span></label>
                                <textarea type="text" id="principalQueixa" name="principalQueixa"
                                value={formData.principalQueixa} onChange={handleChange} 
                                placeholder="Ex.:Sinto que estou extremamente cansado"></textarea>
                            </div>


                            <div className="form-field">
                                <label htmlFor="historicoFamiliar"> Quantidade de atendimento: <span className="asterisco">*</span></label>
                                <textarea type="text" id="historicoFamiliar" name="historicoFamiliar"
                                value={formData.historicoFamiliar} onChange={handleChange} 
                                placeholder="Ex.: Minha irmã já teve episódios de depressão"></textarea>
                            </div>

                            <div className="form-field">
                                <label htmlFor="usoMedicamentos"> Uso de medicamentos: <span className="asterisco">*</span></label>
                                <textarea type="text" id="usoMedicamentos" name="usoMedicamentos"
                                value={formData.usoMedicamentos} onChange={handleChange} 
                                placeholder="Ex.: Uso remédios para dormir algumas vezes"></textarea>
                            </div>
                           
                        </div>

                        <div className="bottom-right-column">
                            <div className="form-field">
                                <label htmlFor="doencasDiagnosticas"> Doenças diagnosticas: <span className="asterisco">*</span></label>
                                <textarea type="text" id="doencasDiagnosticas" name="doencasDiagnosticas"
                                value={formData.doencasDiagnosticas} onChange={handleChange} 
                                placeholder="Ex.: Fui diagnosticado com hipertensão há dois anos"></textarea>
                            </div>


                            <div className="form-field">
                                <label htmlFor="objTerapia"> Objetivo da terapia: <span className="asterisco">*</span></label>
                                <textarea type="text" id="objTerapia" name="objTerapia"
                                value={formData.objTerapia} onChange={handleChange} 
                                placeholder="Ex.: Quero entender as causas da minha fadiga e como melhorar meu bem-estar mental."></textarea>
                            </div>

                            <div>
                                <button type="submit" className="btn-finalizar-cadastro"> Finalizar cadastro </button>
                            </div>
                            
                        </div>
        
                    </section>

                    
                </form>
                
            </div>
       </main>

        
    );
}

export default PatientRegistration;