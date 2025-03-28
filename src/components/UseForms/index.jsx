import { useState } from "react"; 
import "./styles.css";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight, House } from "lucide-react";
import { cpfMask, cnpjMask, isValidCPF, isValidCNPJ, isValidEmail } from "../../utils/masks";

export function UserForm({ defaultValues, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    password: false,
    email: false,
    confirmPassword: false,
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [formValues, setFormValues] = useState({
    fullName: "",
    cpf: "",
    cnpj: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleSpecific: {
      specialty: "",
      otherSpecialty: "",
      location: "",
      ageRange: "",
      otherAgeRange: "",
      freeSessions: "",
      profilePhoto: null,
    },
    ...defaultValues,
  });

  const steps = {
    patient: [
      { title: "Informações Pessoais" },
      { title: "Informações de Acesso" },
    ],
    professional: [
      { title: "Informações Pessoais" },
      { title: "Informações Profissionais" },
      { title: "Informações de Acesso" },
    ],
  };

  const specialties = [
    "Endocrinologia",
    "Neurologia",
    "Psicologia",
    "Pediatria",
    "Psiquiatria",
  ];

  const ageRanges = [
    "Crianças (0-12 anos)",
    "Adolescentes (13-17 anos)",
    "Adultos (18-59 anos)",
    "Idosos (60+ anos)",
  ];

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      setFormValues(prev => ({
        ...prev,
        roleSpecific: {
          ...prev.roleSpecific,
          profilePhoto: file
        }
      }));
    }
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Nome completo é obrigatório";
        break;
      case "cpf":
        if (!isValidCPF(value.replace(/[^\d]/g, ""))) error = "CPF inválido";
        break;
      case "cnpj":
        if (!isValidCNPJ(value.replace(/[^\d]/g, ""))) error = "CNPJ inválido";
        break;
      case "profilePhoto":
        if (userType === "professional" && !value)
          error = "Foto de perfil é obrigatória para profissionais";
        break;
      case "email":
        if (!isValidEmail(value))
          error = "E-mail inválido";
        break;
      case "password":
        if (value.length < 6)
          error = "A senha deve ter pelo menos 6 caracteres";
        break;
      case "confirmPassword":
        if (value !== formValues.password) error = "As senhas não coincidem";
        break;
      case "specialty":
        if (!value.trim() && !formValues.roleSpecific.otherSpecialty.trim())
          error = "Especialidade é obrigatória";
        break;
      case "location":
        if (!value.trim()) error = "Localização é obrigatória";
        break;
      case "ageRange":
        if (!value.trim() && !formValues.roleSpecific.otherAgeRange.trim())
          error = "Faixa etária de atendimento é obrigatória";
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

    if (step === 0 && userType) {
      const fieldsToValidate =
        userType === "patient" 
          ? ["fullName", "cpf"] 
          : ["fullName", "cnpj", "profilePhoto"];
      
      fieldsToValidate.forEach((field) => {
        const error = validateField(
          field, 
          field === "profilePhoto" 
            ? formValues.roleSpecific[field] 
            : formValues[field]
        );
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
      const fieldsToValidate = ["email", "password", "confirmPassword"];
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
    let formattedValue = value;

    if (name === "cpf") {
      formattedValue = cpfMask(value);
    } else if (name === "cnpj") {
      formattedValue = cnpjMask(value);
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (errors[name]) {
      const error = validateField(name, formattedValue.replace(/[^\d]/g, ""));
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
      setCurrentStep((prev) => Math.min(prev + 1, steps[userType].length - 1));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleReset = () => {
    setCurrentStep(0);
    setUserType("");
    setProfilePhoto(null);
    setPhotoPreview("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      const formData = new FormData();
      
      Object.keys(formValues).forEach(key => {
        if (key === "roleSpecific") {
          Object.keys(formValues.roleSpecific).forEach(subKey => {
            if (subKey === "profilePhoto" && formValues.roleSpecific[subKey]) {
              formData.append(subKey, formValues.roleSpecific[subKey]);
            } else {
              formData.append(subKey, formValues.roleSpecific[subKey]);
            }
          });
        } else {
          formData.append(key, formValues[key]);
        }
      });
      
      formData.append("userType", userType);
      
      onSubmit(formData);
    }
  };

  const renderStepContent = () => {
    const currentSteps = steps[userType] || [];
    const stepTitle = currentSteps[currentStep]?.title;

    switch (stepTitle) {
      case "Informações Pessoais":
        return (
          <>
            {userType === "professional" && (
              <div className="input-group">
                <label htmlFor="profilePhoto" className="input-label">
                  Foto de Perfil <small>*</small>
                </label>
                <div className="photo-upload-container">
                  <div className="photo-preview">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="photo-preview-image" />
                    ) : (
                      <div className="photo-placeholder">
                        <span>Nenhuma foto selecionada</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    onBlur={(e) => {
                      const error = validateField(e.target.name, profilePhoto);
                      setErrors((prev) => ({ ...prev, profilePhoto: error }));
                    }}
                    className={`file-input ${errors.profilePhoto ? "error" : ""}`}
                  />
                  <label htmlFor="profilePhoto" className="upload-button">
                    Selecionar Foto
                  </label>
                  {errors.profilePhoto && (
                    <small className="error-message">{errors.profilePhoto}</small>
                  )}
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

            {userType === "patient" ? (
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
                  placeholder="000.000.000-00"
                />
                {errors.cpf && (
                  <small className="error-message">{errors.cpf}</small>
                )}
              </div>
            ) : (
              <div className="input-group">
                <label htmlFor="cnpj" className="input-label">
                  CNPJ <small>*</small>
                </label>
                <input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  value={formValues.cnpj}
                  onChange={handleInputChange}
                  onBlur={(e) => {
                    const error = validateField(e.target.name, e.target.value);
                    setErrors((prev) => ({ ...prev, cnpj: error }));
                  }}
                  className={`input-field ${errors.cnpj ? "error" : ""}`}
                  placeholder="00.000.000/0000-00"
                />
                {errors.cnpj && (
                  <small className="error-message">{errors.cnpj}</small>
                )}
              </div>
            )}

            <div className="form-actions">
              <button
                type="button"
                onClick={handleReset}
                className="button secondary"
                aria-label="Voltar ao início"
              >
                <House />
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="button primary"
                aria-label="Continuar"
              >
                <ChevronRight />
              </button>
            </div>
          </>
        );

      case "Informações Profissionais":
        return (
          <>
            <div className="input-group">
              <label htmlFor="specialty" className="input-label">
                Especialidade <small>*</small>
              </label>
              <select
                id="specialty"
                name="specialty"
                value={formValues.roleSpecific.specialty}
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
                <option value="other">Outro</option>
              </select>
              {formValues.roleSpecific.specialty === "other" && (
                <input
                  type="text"
                  name="otherSpecialty"
                  value={formValues.roleSpecific.otherSpecialty}
                  onChange={handleRoleSpecificChange}
                  placeholder="Digite sua especialidade"
                  className="input-field"
                />
              )}
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
                value={formValues.roleSpecific.location}
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
              <select
                id="ageRange"
                name="ageRange"
                value={formValues.roleSpecific.ageRange}
                onChange={handleRoleSpecificChange}
                onBlur={(e) => {
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, ageRange: error }));
                }}
                className={`input-field ${errors.ageRange ? "error" : ""}`}
              >
                <option value="">Selecione uma faixa etária</option>
                {ageRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
                <option value="other">Outro</option>
              </select>
              {formValues.roleSpecific.ageRange === "other" && (
                <input
                  type="text"
                  name="otherAgeRange"
                  value={formValues.roleSpecific.otherAgeRange}
                  onChange={handleRoleSpecificChange}
                  placeholder="Digite a faixa etária"
                  className="input-field"
                />
              )}
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
                value={formValues.roleSpecific.freeSessions}
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

            <div className="form-actions">
              <button
                type="button"
                onClick={handlePrevStep}
                className="button secondary"
                aria-label="Voltar"
              >
                <ChevronLeft />
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="button primary"
                aria-label="Continuar"
              >
                <ChevronRight />
              </button>
            </div>
          </>
        );

      case "Informações de Acesso":
        return (
          <>
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
                  setTouched((prev) => ({ ...prev, email: true }));
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, email: error }));
                }}
                className={`input-field ${
                  errors.email && touched.email ? "error" : ""
                }`}
              />
              {errors.email && touched.email && (
                <small className="error-message">{errors.email}</small>
              )}
            </div>

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
                  setTouched((prev) => ({ ...prev, password: true }));
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, password: error }));
                }}
                className={`input-field ${
                  errors.password && touched.password ? "error" : ""
                }`}
              />
              {errors.password && touched.password && (
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
                  setTouched((prev) => ({ ...prev, confirmPassword: true }));
                  const error = validateField(e.target.name, e.target.value);
                  setErrors((prev) => ({ ...prev, confirmPassword: error }));
                }}
                className={`input-field ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "error"
                    : ""
                }`}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <small className="error-message">
                  {errors.confirmPassword}
                </small>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handlePrevStep}
                className="button secondary"
                aria-label="Voltar"
              >
                <ChevronLeft />
              </button>

              <button type="submit" className="button submit">
                <ChevronRight />
              </button>
            </div>
          </>
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
              <h3 className="subtitle-reg">Paciente</h3>
              <p>Cadastro para pacientes</p>
            </button>

            <button
              type="button"
              className={`role-card ${
                userType === "professional" ? "active" : ""
              }`}
              onClick={() => setUserType("professional")}
            >
              <h3 className="subtitle-reg">Profissional</h3>
              <p>Cadastro para médicos e terapeutas</p>
            </button>
          </div>
        ) : (
          renderStepContent()
        )}
      </form>
    </div>
  );
}

UserForm.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};