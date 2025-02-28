import { useState } from "react";
import PropTypes from "prop-types";
import {
  isValidCPF,
  isValidPhone,
  isValidEmail,
  isValidCep,
  phoneMask,
  cpfMask,
  cepMask,
} from "../../utils/masks";
import "./styles.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function UserForm({ defaultValues, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({});
  const [showOtherSpecialtyInput] = useState(false);

  const [formValues, setFormValues] = useState({
    fullName: "",
    cpf: "",
    phone: "",
    email: "",
    cep: "",
    password: "",
    confirmPassword: "",
    roleSpecific: {},
    ...defaultValues,
  });

  // Etapas do formulário
  const steps = [
    { title: "Tipo de Usuário" },
    { title: "Informações Básicas" },
    { title: "Informações Específicas" },
    { title: "Senha" }, // Novo passo para a senha
  ];

  // Campos específicos por tipo de usuário
  const roleFields = {
    professional: [
      { name: "crm", label: "CRM/CRP", required: true },
      { name: "specialty", label: "Especialidade", required: true },
    ],
    patient: [
      { name: "medicalHistory", label: "Histórico Médico", required: false },
      { name: "insurance", label: "Convênio Médico", required: false },
    ],
  };

  const specialties = [


    "Endocrinologia",
  
    "Neurologia",
    "Psicologia",
    "Pediatria",
    "Psiquiatria",

  ];

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Nome completo é obrigatório";
        break;
      case "cpf":
        if (!isValidCPF(value)) error = "CPF inválido";
        break;
      case "phone":
        if (!isValidPhone(value)) error = "Telefone inválido";
        break;
      case "email":
        if (!isValidEmail(value)) error = "E-mail inválido";
        break;
      case "cep":
        if (!isValidCep(value)) error = "CEP inválido";
        break;
      case "crm":
        if (!value.trim()) error = "CRM/CRP é obrigatório";
        break;
      case "specialty":
        if (!value.trim()) error = "Especialidade é obrigatória";
        break;
      case "password":
        if (value.length < 6) error = "A senha deve ter pelo menos 6 caracteres";
        break;
      case "confirmPassword":
        if (value !== formValues.password) error = "As senhas não coincidem";
        break;
      default:
        break;
    }
    return error;
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0 && !userType) {
      newErrors.userType = "Selecione um tipo de usuário";
    }

    if (step === 1) {
      const fieldsToValidate = ["fullName", "cpf", "phone", "email", "cep"];
      fieldsToValidate.forEach((field) => {
        const error = validateField(field, formValues[field]);
        if (error) newErrors[field] = error;
      });
    }

    if (step === 2 && userType === "professional") {
      const fieldsToValidate = ["crm", "specialty"];
      fieldsToValidate.forEach((field) => {
        const error = validateField(field, formValues.roleSpecific[field]);
        if (error) newErrors[field] = error;
      });
    }

    if (step === 3) {
      const fieldsToValidate = ["password", "confirmPassword"];
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
    let maskedValue = value;

    switch (name) {
      case "phone":
        maskedValue = phoneMask(value);
        break;
      case "cpf":
        maskedValue = cpfMask(value);
        break;
      case "cep":
        maskedValue = cepMask(value);
        break;
      default:
        maskedValue = value;
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: maskedValue,
    }));

    if (errors[name]) {
      const error = validateField(name, maskedValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };


  const handleRoleSpecificChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      roleSpecific: {
        ...prev.roleSpecific,
        [name]: value,
      },
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
      onSubmit({
        ...formValues,
        userType,
      });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="role-selection">
            <button
              type="button"
              className={`role-card ${userType === "patient" ? "active" : ""}`}
              onClick={() => setUserType("patient")}
            >
              <h3>Paciente</h3>
              <p>Cadastro para pacientes</p>
            </button>

            <button
              type="button"
              className={`role-card ${userType === "professional" ? "active" : ""}`}
              onClick={() => setUserType("professional")}
            >
              <h3>Profissional</h3>
              <p>Cadastro para médicos e terapeutas</p>
            </button>

            {errors.userType && (
              <small className="error-message">{errors.userType}</small>
            )}
          </div>
        );

      case 1:
        return (
          <>
            <div className="input-group">
              <label htmlFor="fullName" className="input-label">
                Nome completo <small>*</small>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formValues.fullName}
                onChange={handleInputChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, fullName: error }));
                }}
                className={`input-field ${errors.fullName ? "error" : ""}`}
              />
              {errors.fullName && (
                <small className="error-message">{errors.fullName}</small>
              )}
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="cpf" className="input-label">
                  CPF <small>*</small>
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={formValues.cpf}
                  onChange={handleInputChange}
                  onBlur={(e) => {
                    const error = validateField(e.target.name, e.target.value);
                    setErrors((prev) => ({ ...prev, cpf: error }));
                  }}
                  className={`input-field ${errors.cpf ? "error" : ""}`}
                />
                {errors.cpf && (
                  <small className="error-message">{errors.cpf}</small>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="phone" className="input-label">
                  Telefone <small>*</small>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  onBlur={(e) => {
                    const error = validateField(e.target.name, e.target.value);
                    setErrors((prev) => ({ ...prev, phone: error }));
                  }}
                  className={`input-field ${errors.phone ? "error" : ""}`}
                />
                {errors.phone && (
                  <small className="error-message">{errors.phone}</small>
                )}
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  E-mail <small>*</small>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  onBlur={(e) => {
                    const error = validateField(e.target.name, e.target.value);
                    setErrors((prev) => ({ ...prev, email: error }));
                  }}
                  className={`input-field ${errors.email ? "error" : ""}`}
                />
                {errors.email && (
                  <small className="error-message">{errors.email}</small>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="cep" className="input-label">
                  CEP <small>*</small>
                </label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  value={formValues.cep}
                  onChange={handleInputChange}
                  onBlur={(e) => {
                    const error = validateField(e.target.name, e.target.value);
                    setErrors((prev) => ({ ...prev, cep: error }));
                  }}
                  className={`input-field ${errors.cep ? "error" : ""}`}
                />
                {errors.cep && (
                  <small className="error-message">{errors.cep}</small>
                )}
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <div className="role-specific-fields">
            {roleFields[userType]?.map((field) => (
              <div key={field.name} className="input-group">
                <label htmlFor={field.name} className="input-label">
                  {field.label}
                  {field.required && <small> *</small>}
                </label>
                {field.name === "specialty" ? (
                  <>
                    <select
                      id={field.name}
                      name={field.name}
                      value={formValues.roleSpecific[field.name] || ""}
                      onChange={handleRoleSpecificChange}
                      onBlur={(e) => {
                        const error = validateField(e.target.name, e.target.value);
                        setErrors((prev) => ({ ...prev, [field.name]: error }));
                      }}
                      className={`input-field ${errors[field.name] ? "error" : ""}`}
                    >
                      <option value="">Selecione uma especialidade</option>
                      {specialties.map((specialty) => (
                        <option key={specialty} value={specialty}>
                          {specialty}
                        </option>
                      ))}
                    </select>
                    {showOtherSpecialtyInput && (
                      <input
                        type="text"
                        id="otherSpecialty"
                        name="otherSpecialty"
                        value={formValues.roleSpecific.otherSpecialty || ""}
                        onChange={handleRoleSpecificChange}
                        className={`input-field ${errors.otherSpecialty ? "error" : ""}`}
                        placeholder="Digite a especialidade"
                      />
                    )}
                  </>
                ) : (
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={formValues.roleSpecific[field.name] || ""}
                    onChange={handleRoleSpecificChange}
                    onBlur={(e) => {
                      const error = validateField(e.target.name, e.target.value);
                      setErrors((prev) => ({ ...prev, [field.name]: error }));
                    }}
                    className={`input-field ${errors[field.name] ? "error" : ""}`}
                  />
                )}
                {errors[field.name] && (
                  <small className="error-message">{errors[field.name]}</small>
                )}
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="password-fields">
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Senha <small>*</small>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, password: error }));
                }}
                className={`input-field ${errors.password ? "error" : ""}`}
              />
              {errors.password && (
                <small className="error-message">{errors.password}</small>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword" className="input-label">
                Confirmar Senha <small>*</small>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassword: error }));
                }}
                className={`input-field ${errors.confirmPassword ? "error" : ""}`}
              />
              {errors.confirmPassword && (
                <small className="error-message">{errors.confirmPassword}</small>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={`step ${index <= currentStep ? "active" : ""}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="form">
        {renderStepContent()}

        <div className="form-actions">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrevStep}
              className="button secondary"
              aria-label="Voltar"
            >
              <ChevronLeft />
            </button>
          )}

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="button primary"
              aria-label="Continuar"
            >
              <ChevronRight />
            </button>
          ) : (
            <button type="submit" className="button submit">
              {defaultValues ? "Atualizar" : "Cadastrar"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

UserForm.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};