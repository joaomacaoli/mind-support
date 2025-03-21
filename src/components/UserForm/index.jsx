import { useState } from "react";
import PropTypes from "prop-types";
import { isValidEmail } from "../../utils/masks";
import "./styles.css";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

export function UserForm({ defaultValues, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);

  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleSpecific: {},
    ...defaultValues,
  });

  const steps = {
    patient: [{ title: "Informações Básicas" }, { title: "Senha" }],
    professional: [
      { title: "Informações Básicas" },
      { title: "Informações Profissionais" },
      { title: "Senha" },
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
      case "email":
        if (!isValidEmail(value)) error = "E-mail inválido";
        break;
      case "password":
        if (value.length < 6)
          error = "A senha deve ter pelo menos 6 caracteres";
        break;
      case "confirmPassword":
        if (value !== formValues.password) error = "As senhas não coincidem";
        break;
      case "specialty":
        if (!value.trim()) error = "Especialidade é obrigatória";
        break;
      case "location":
        if (!value.trim()) error = "Localização é obrigatória";
        break;
      case "ageRange":
        if (!value.trim()) error = "Faixa etária de atendimento é obrigatória";
        break;
      case "freeSessions":
        if (isNaN(value))
          error = "Quantidade de atendimentos gratuitos deve ser um número";
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

    if (step === 0 && userType) {
      const fieldsToValidate = ["fullName", "email"];
      fieldsToValidate.forEach((field) => {
        const error = validateField(field, formValues[field]);
        if (error) newErrors[field] = error;
      });
    }

    if (step === 1 && userType === "professional") {
      const fieldsToValidate = [
        "specialty",
        "location",
        "ageRange",
        "freeSessions",
      ];
      fieldsToValidate.forEach((field) => {
        const error = validateField(field, formValues.roleSpecific[field]);
        if (error) newErrors[field] = error;
      });
    }

    if (
      (step === 1 && userType === "patient") ||
      (step === 2 && userType === "professional")
    ) {
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
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      const error = validateField(name, value);
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result); 
      };
      reader.readAsDataURL(file); 
      setFormValues((prev) => ({
        ...prev,
        roleSpecific: {
          ...prev.roleSpecific,
          photo: file,
        },
      }));
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps[userType].length - 1));
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
    const currentSteps = steps[userType] || [];
    const stepTitle = currentSteps[currentStep]?.title;

    switch (stepTitle) {
      case "Informações Básicas":
        return (
          <>
            {userType === "professional" && (
              <div className="input-group">
              
                <div id="photo-container">
                  <label htmlFor="photo" className="file-label">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Foto do profissional"
                        className="photo-preview"
                      />
                    ) : (
                      <div className="photo-placeholder">
                        <User size={40} color="var(--color-primary)" />
                      </div>
                    )}
                    <span>Selecionar Foto</span>
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handlePhotoChange}
                    className="file-input"
                    accept="image/*"
                  />
                </div>
              </div>
            )}
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
          </>
        );

      case "Informações Profissionais":
        return (
          <div className="role-specific-fields">
            <div className="input-group">
              <label htmlFor="specialty" className="input-label">
                Especialidade <small>*</small>
              </label>
              <select
                id="specialty"
                name="specialty"
                value={formValues.roleSpecific.specialty || ""}
                onChange={handleRoleSpecificChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, specialty: error }));
                }}
                className={`input-field ${errors.specialty ? "error" : ""}`}
              >
                <option value="">Selecione uma especialidade</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              {errors.specialty && (
                <small className="error-message">{errors.specialty}</small>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="location" className="input-label">
                Localização <small>*</small>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formValues.roleSpecific.location || ""}
                onChange={handleRoleSpecificChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, location: error }));
                }}
                className={`input-field ${errors.location ? "error" : ""}`}
              />
              {errors.location && (
                <small className="error-message">{errors.location}</small>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="ageRange" className="input-label">
                Faixa etária de atendimento <small>*</small>
              </label>
              <input
                type="text"
                id="ageRange"
                name="ageRange"
                value={formValues.roleSpecific.ageRange || ""}
                onChange={handleRoleSpecificChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, ageRange: error }));
                }}
                className={`input-field ${errors.ageRange ? "error" : ""}`}
              />
              {errors.ageRange && (
                <small className="error-message">{errors.ageRange}</small>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="freeSessions" className="input-label">
                Quantidade de atendimentos gratuitos
              </label>
              <input
                type="number"
                id="freeSessions"
                name="freeSessions"
                value={formValues.roleSpecific.freeSessions || ""}
                onChange={handleRoleSpecificChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, freeSessions: error }));
                }}
                className={`input-field ${errors.freeSessions ? "error" : ""}`}
              />
              {errors.freeSessions && (
                <small className="error-message">{errors.freeSessions}</small>
              )}
            </div>
          </div>
        );

      case "Senha":
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
                className={`input-field ${
                  errors.confirmPassword ? "error" : ""
                }`}
              />
              {errors.confirmPassword && (
                <small className="error-message">
                  {errors.confirmPassword}
                </small>
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
        {steps[userType]?.map((step, index) => (
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
        {!userType ? (
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
              className={`role-card ${
                userType === "professional" ? "active" : ""
              }`}
              onClick={() => setUserType("professional")}
            >
              <h3>Profissional</h3>
              <p>Cadastro para médicos e terapeutas</p>
            </button>

            {errors.userType && (
              <small className="error-message">{errors.userType}</small>
            )}
          </div>
        ) : (
          renderStepContent()
        )}

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

          {currentStep < steps[userType]?.length - 1 ? (
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
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};
