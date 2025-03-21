import { useState } from "react";
import "./styles.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';

// eslint-disable-next-line react/prop-types
export function AnamneseForm({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState({
    nome: "",
    idade: "",
    genero: "",
    queixas: "",
    historicoFamiliar: "",
    usoMedicamentos: "",
    objetivoTerapia: "",
    outroQueixas: "", 
    outroHistoricoFamiliar: "", 
    outroUsoMedicamentos: "", 
    outroObjetivoTerapia: "",
  });

  const steps = [
    { title: "Dados Pessoais" },
    { title: "Informações de Saúde Mental" },
    { title: "Objetivo da Terapia" },
  ];

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "nome":
        if (!value.trim()) error = "Nome é obrigatório";
        break;
      case "idade":
        if (!value.trim() || isNaN(value)) error = "Idade inválida";
        break;
      case "genero":
        if (!value.trim()) error = "Gênero é obrigatório";
        break;
      case "queixas":
        if (!value.trim()) error = "Principais queixas são obrigatórias";
        break;
      case "historicoFamiliar":
        if (!value.trim()) error = "Histórico familiar é obrigatório";
        break;
      case "usoMedicamentos":
        if (!value.trim()) error = "Informe o uso de medicamentos";
        break;
      case "objetivoTerapia":
        if (!value.trim()) error = "Objetivo da terapia é obrigatório";
        break;
      default:
        break;
    }
    return error;
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      const fieldsToValidate = ["nome", "idade", "genero"];
      fieldsToValidate.forEach((field) => {
        const error = validateField(field, formValues[field]);
        if (error) newErrors[field] = error;
      });
    }

    if (step === 1) {
      const fieldsToValidate = ["queixas", "historicoFamiliar", "usoMedicamentos"];
      fieldsToValidate.forEach((field) => {
        const error = validateField(field, formValues[field]);
        if (error) newErrors[field] = error;
      });
    }

    if (step === 2) {
      const fieldsToValidate = ["objetivoTerapia"];
      fieldsToValidate.forEach((field) => {
        const error = validateField(field, formValues[field]);
        if (error) newErrors[field] = error;
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onSubmit(formValues);
    }
  };

  const renderStepContent = () => {
    const stepTitle = steps[currentStep]?.title;

    switch (stepTitle) {
      case "Dados Pessoais":
        return (
          <>
            <div className="anamnese-input-group">
              <label htmlFor="nome" className="anamnese-input-label">
                Nome <small>*</small>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formValues.nome}
                onChange={handleInputChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, nome: error }));
                }}
                className={`anamnese-input-field ${errors.nome ? "error" : ""}`}
              />
              {errors.nome && (
                <small className="anamnese-error-message">{errors.nome}</small>
              )}
            </div>

            <div className="anamnese-input-group">
              <label htmlFor="idade" className="anamnese-input-label">
                Idade <small>*</small>
              </label>
              <input
                type="number"
                id="idade"
                name="idade"
                value={formValues.idade}
                onChange={handleInputChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, idade: error }));
                }}
                className={`anamnese-input-field ${errors.idade ? "error" : ""}`}
              />
              {errors.idade && (
                <small className="anamnese-error-message">{errors.idade}</small>
              )}
            </div>

            <div className="anamnese-input-group">
              <label htmlFor="genero" className="anamnese-input-label">
                Gênero <small>*</small>
              </label>
              <select
                id="genero"
                name="genero"
                value={formValues.genero}
                onChange={handleInputChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, genero: error }));
                }}
                className={`anamnese-input-field ${errors.genero ? "error" : ""}`}
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
              {errors.genero && (
                <small className="anamnese-error-message">{errors.genero}</small>
              )}
            </div>
          </>
        );

      case "Informações de Saúde Mental":
        return (
          <>
            <div className="anamnese-input-group">
              <label htmlFor="queixas" className="anamnese-input-label">
                Principais queixas <small>*</small>
              </label>
              <select
                id="queixas"
                name="queixas"
                value={formValues.queixas}
                onChange={handleInputChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, queixas: error }));
                }}
                className={`anamnese-input-field ${errors.queixas ? "error" : ""}`}
              >
                <option value="">Selecione uma opção</option>
                <option value="Ansiedade">Ansiedade</option>
                <option value="Depressão">Depressão</option>
                <option value="Estresse">Estresse</option>
                <option value="Problemas de relacionamento">Problemas de relacionamento</option>
                <option value="Outro">Outro</option>
              </select>
              {formValues.queixas === "Outro" && (
                <textarea
                  id="outroQueixas"
                  name="outroQueixas"
                  value={formValues.outroQueixas}
                  onChange={handleInputChange}
                  className="anamnese-input-field"
                  rows={2}
                  placeholder="Descreva suas queixas"
                />
              )}
              {errors.queixas && (
                <small className="anamnese-error-message">{errors.queixas}</small>
              )}
            </div>

            <div className="anamnese-input-group">
              <label htmlFor="historicoFamiliar" className="anamnese-input-label">
                Histórico familiar <small>*</small>
              </label>
              <select
                id="historicoFamiliar"
                name="historicoFamiliar"
                value={formValues.historicoFamiliar}
                onChange={handleInputChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, historicoFamiliar: error }));
                }}
                className={`anamnese-input-field ${errors.historicoFamiliar ? "error" : ""}`}
              >
                <option value="">Selecione uma opção</option>
                <option value="Nenhum">Nenhum</option>
                <option value="Depressão">Depressão</option>
                <option value="Ansiedade">Ansiedade</option>
                <option value="Transtorno bipolar">Transtorno bipolar</option>
                <option value="Outro">Outro</option>
              </select>
              {formValues.historicoFamiliar === "Outro" && (
                <textarea
                  id="outroHistoricoFamiliar"
                  name="outroHistoricoFamiliar"
                  value={formValues.outroHistoricoFamiliar}
                  onChange={handleInputChange}
                  className="anamnese-input-field"
                  rows={2}
                  placeholder="Descreva o histórico familiar"
                />
              )}
              {errors.historicoFamiliar && (
                <small className="anamnese-error-message">{errors.historicoFamiliar}</small>
              )}
            </div>

            <div className="anamnese-input-group">
              <label htmlFor="usoMedicamentos" className="anamnese-input-label">
                Uso de medicamentos <small>*</small>
              </label>
              <select
                id="usoMedicamentos"
                name="usoMedicamentos"
                value={formValues.usoMedicamentos}
                onChange={handleInputChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, usoMedicamentos: error }));
                }}
                className={`anamnese-input-field ${errors.usoMedicamentos ? "error" : ""}`}
              >
                <option value="">Selecione uma opção</option>
                <option value="Nenhum">Nenhum</option>
                <option value="Antidepressivos">Antidepressivos</option>
                <option value="Ansiolíticos">Ansiolíticos</option>
                <option value="Outro">Outro</option>
              </select>
              {formValues.usoMedicamentos === "Outro" && (
                <textarea
                  id="outroUsoMedicamentos"
                  name="outroUsoMedicamentos"
                  value={formValues.outroUsoMedicamentos}
                  onChange={handleInputChange}
                  className="anamnese-input-field"
                  rows={2}
                  placeholder="Descreva o uso de medicamentos"
                />
              )}
              {errors.usoMedicamentos && (
                <small className="anamnese-error-message">{errors.usoMedicamentos}</small>
              )}
            </div>
          </>
        );

      case "Objetivo da Terapia":
        return (
          <div className="anamnese-input-group">
            <label htmlFor="objetivoTerapia" className="anamnese-input-label">
              Objetivo da terapia <small>*</small>
            </label>
            <select
              id="objetivoTerapia"
              name="objetivoTerapia"
              value={formValues.objetivoTerapia}
              onChange={handleInputChange}
              onBlur={(e) => {
                const error = validateField(e.target.name, e.target.value);
                setErrors((prev) => ({ ...prev, objetivoTerapia: error }));
              }}
              className={`anamnese-input-field ${errors.objetivoTerapia ? "error" : ""}`}
            >
              <option value="">Selecione uma opção</option>
              <option value="Melhorar autoestima">Melhorar autoestima</option>
              <option value="Reduzir ansiedade">Reduzir ansiedade</option>
              <option value="Superar depressão">Superar depressão</option>
              <option value="Melhorar relacionamentos">Melhorar relacionamentos</option>
              <option value="Outro">Outro</option>
            </select>
            {formValues.objetivoTerapia === "Outro" && (
              <textarea
                id="outroObjetivoTerapia"
                name="outroObjetivoTerapia"
                value={formValues.outroObjetivoTerapia}
                onChange={handleInputChange}
                className="anamnese-input-field"
                rows={2}
                placeholder="Descreva o objetivo da terapia"
              />
            )}
            {errors.objetivoTerapia && (
              <small className="anamnese-error-message">{errors.objetivoTerapia}</small>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="anamnese-form-container">
      <div className="anamnese-step-indicator">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={`anamnese-step ${index <= currentStep ? "active" : ""}`}
          >
            <div className="anamnese-step-number">{index + 1}</div>
            <div className="anamnese-step-title">{step.title}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="anamnese-form">
        {renderStepContent()}

        <div className="anamnese-form-actions">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="anamnese-button secondary"
              aria-label="Voltar"
            >
              <ChevronLeft />
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="anamnese-button primary"
              aria-label="Continuar"
            >
              <ChevronRight />
            </button>
          ) : (
            <button type="submit" className="anamnese-button submit">
              Enviar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}