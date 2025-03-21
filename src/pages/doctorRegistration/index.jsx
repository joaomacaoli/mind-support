import React, {useState} from "react";
import "./style.css"

const DoctorRegistration = () => {

    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        dataNascimento: "",
        endereco: "",
        estadoCivil: "",
        telefone: "",
        sexo: "",
        numCRM: "",
        especialidade: "",
        abordagemTerapeutica: "",
        quantAtendimento: "",
        faixaEtaria: "",
        modalidadeAtendimento: "",
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
                formData.dataNascimento == "" || formData.estadoCivil == "" || 
                formData.telefone == "" || formData.sexo == "" || formData.numCRM == "" ||
                formData.especialidade == "" || formData.abordagemTerapeutica == "" || 
                formData.quantAtendimento == "" || formData.faixaEtaria == "" ||
                formData.modalidadeAtendimento == ""  ) {
                alert("Preencha todos os campos obrigatórios!");
                return;
            }
        alert("Formulário enviado com sucesso!");
      }; 


    return(

       <main className="main-class-form">
            <div className="container-form-doctor">
                <p> Caro profissional, preencha a ficha a seguir. </p>
                <form className="form-doctor" onSubmit={handleSubmit}>

                    <section className="left-column-section">
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

                        <div className="form-field">
                            <label htmlFor="estadoCivil">Estado Civil: <span className="asterisco">*</span></label>
                            <select id="estadoCivil" name="estadoCivil"
                            value={formData.estadoCivil} onChange={handleChange}>
                                <option value="" disabled> Selecione seu estado civil</option>
                                <option value="solteiro"> Solteiro </option>
                                <option value="casado"> Casado </option>
                                <option value="divorciado"> Divorciado </option>
                                <option value="viuvo"> Viúvo </option>
                            </select>
                        </div>

                        <div className="form-field">
                            <label htmlFor="telefone"> Telefone: <span className="asterisco">*</span></label>
                            <input type="text" id="telefone" name="telefone"
                            value={formData.telefone} onChange={handleChange} 
                            placeholder="Digite seu telefone"/>
                        </div>

                        <div className="form-field-radio">
                            <label>Sexo <span className="asterisco">*</span></label>
                            <div className="radio-group">
                                <div>
                                    <input type="radio" id="sexoMasculino" name="sexo"
                                    value="masculino" checked={formData.sexo === "masculino"} 
                                    onChange={handleChange} required/>
                                    <label htmlFor="sexoMasculino">Masculino</label>
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
                    </section>

                    <section className="right-column-section">

                        <div className="form-field">
                            <label htmlFor="numCRM"> Número do CMR: <span className="asterisco">*</span></label>
                            <input type="text" id="numCRM" name="numCRM"
                            value={formData.numCRM} onChange={handleChange} 
                            placeholder="Digite seu número de registro no CRM"/>
                        </div>

                        <div className="form-field">
                            <label htmlFor="especialidade">Especialidade: <span className="asterisco">*</span></label>
                            <select id="especialidade" name="especialidade"
                            value={formData.especialidade} onChange={handleChange}>
                                <option value="" disabled selected> Selecione sua especialidade</option>
                                <option value="casalFamília"> Psicologia de Casal e Família </option>
                                <option value="neuropsicologia"> Neuropsicologia </option>
                                <option value="psicoterapia"> Psicoterapia </option>
                                <option value="organizacionalTrabalho"> Psicologia Organizacional ou do Trabalho </option>
                                <option value="escolarEducacional"> Psicologia Escolar ou Educacional </option>
                                <option value="Infantil"> Psicologia Infantil </option>
                                <option value="clinica"> Psicologia Clínica </option>
                            </select>
                        </div>

                        <div className="form-field">
                            <label htmlFor="Abordagem terapeutica"> Abordagem terapeutica: <span className="asterisco">*</span></label>
                            <select id="abordagemTerapeutica" name="abordagemTerapeutica"
                            value={formData.abordagemTerapeutica} onChange={handleChange}>
                                <option value="" disabled selected> Selecione sua abordagem terapeutica</option>
                                <option value="terapiacognitivoComportamental"> Terapia Cognitivo-Comportamental (TCC) </option>
                                <option value="psicoterapiaPsicodinamica"> Psicoterapia Psicodinâmica </option>
                                <option value="psicoterapiaHumanista"> Psicoterapia Humanista </option>
                                <option value="terapiaComportamentalDialetica"> Terapia Comportamental Dialética (DBT) </option>
                            </select>
                        </div>

                        <div className="form-field">
                            <label htmlFor="quantAtendimento"> Quantidade de atendimento: <span className="asterisco">*</span></label>
                            <input type="number" id="quantAtendimento" name="quantAtendimento"
                            value={formData.quantAtendimento} onChange={handleChange} 
                            placeholder="Quantidade de atendimentos gratuitos"/>
                        </div>


                        <div className="form-field">
                            <label htmlFor="faixaEtaria"> Faixa etária: <span className="asterisco">*</span></label>
                            <select id="faixaEtaria" name="faixaEtaria"
                            value={formData.faixaEtaria} onChange={handleChange}>
                                <option value="" disabled selected> Selecione sua faixa etária de atendimento</option>
                                <option value="infantil"> Infantil </option>
                                <option value="adolescente"> Adolescente </option>
                                <option value="adulto"> Adulto </option>
                                <option value="idoso"> Idoso </option>
                            </select>
                        </div>

                        <div className="form-field-radio">
                            <label> Modalidade de atendimento <span className="asterisco">*</span></label>
                            <div className="radio-group">
                                <div>
                                    <input type="radio" id="presencial" name="modalidadeAtendimento"
                                    value="presencial" checked={formData.modalidadeAtendimento === "presencial"} 
                                    onChange={handleChange} required/>
                                    <label htmlFor="presencial"> Presencial</label>
                                </div>
                                <div>
                                    <input type="radio" id="online" name="modalidadeAtendimento"
                                    value="online" checked={formData.modalidadeAtendimento === "online"} 
                                    onChange={handleChange} required/>
                                    <label htmlFor="online"> Online</label>
                                </div>
                                <div>
                                    <input type="radio" id="ambos" name="modalidadeAtendimento"
                                    value="ambos" checked={formData.modalidadeAtendimento === "ambos"} 
                                    onChange={handleChange} required/>
                                    <label htmlFor="ambos"> Ambos </label>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="btn-finalizar-cadastro"> Finalizar cadastro </button>
                        </div>
                    
                    </section>

                    
                </form>
                
            </div>
       </main>

        
    );
}

export default DoctorRegistration;