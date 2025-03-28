import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function ProfessionalProfile() {
  const [professionalData, setProfessionalData] = useState({
    type: "Profissional",
    nome: "Dra. Ana Paula Padrão",
    email: "ana.souza@exemplo.com",
    senha: "********",
    especialidade: "Ansiedade e depressão",
    localizacao: "Fortaleza - Aldeota",
    faixaEtaria: "Adultos (18-60 anos)",
    atendimentosGratuitos: 3,
    foto: "https://randomuser.me/api/portraits/women/72.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...professionalData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempData((prev) => ({ ...prev, foto: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfessionalData({
      ...tempData,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...professionalData });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Meu Perfil</h1>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="button-edit">
            Editar Perfil
          </button>
        ) : (
          <div className="button-group">
            <button onClick={handleSave} className="button-save">
              Salvar Alterações
            </button>
            <button onClick={handleCancel} className="button-cancel">
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2 className="section-title">Informações Profissionais</h2>
        <div className="profile-form">
          <div className="form-row">
            <label className="form-label">Tipo de Usuário</label>
            <div className="data-view">
              <p className="data-value">{professionalData.type}</p>
            </div>
          </div>

          <div className="form-row">
            <label className="form-label">Foto do Perfil</label>
            {isEditing ? (
              <div>
                <img
                  src={tempData.foto}
                  alt="Foto do profissional"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "1rem",
                    display: "block",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div>
                <img
                  src={professionalData.foto}
                  alt="Foto do profissional"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">Nome Completo</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                name="nome"
                value={tempData.nome}
                onChange={handleInputChange}
              />
            ) : (
              <div className="data-view">
                <p className="data-value">{professionalData.nome}</p>
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">Email</label>
            {isEditing ? (
              <input
                type="email"
                className="form-input"
                name="email"
                value={tempData.email}
                onChange={handleInputChange}
              />
            ) : (
              <div className="data-view">
                <p className="data-value">{professionalData.email}</p>
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">Senha</label>

            <div className="form-input">
              <div className="password-field">
                <p className="data-value">{professionalData.senha}</p>
              </div>
            </div>
            <Link to="/construction">
              <button className="button-password">Redefinir Senha</button>
            </Link>
          </div>

          <div className="form-row">
            <label className="form-label">Especialidade</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                name="especialidade"
                value={tempData.especialidade}
                onChange={handleInputChange}
              />
            ) : (
              <div className="data-view">
                <p className="data-value">{professionalData.especialidade}</p>
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">Localização</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                name="localizacao"
                value={tempData.localizacao}
                onChange={handleInputChange}
              />
            ) : (
              <div className="data-view">
                <p className="data-value">{professionalData.localizacao}</p>
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">Faixa Etária de Atendimento</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                name="faixaEtaria"
                value={tempData.faixaEtaria}
                onChange={handleInputChange}
              />
            ) : (
              <div className="data-view">
                <p className="data-value">{professionalData.faixaEtaria}</p>
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">Atendimentos Gratuitos/Mês</label>
            {isEditing ? (
              <input
                type="number"
                className="form-input"
                name="atendimentosGratuitos"
                value={tempData.atendimentosGratuitos}
                onChange={handleInputChange}
                min="0"
              />
            ) : (
              <div className="data-view">
                <p className="data-value">
                  {professionalData.atendimentosGratuitos}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="button-return-profile-container">
        <button className="button-return-profile">
          <Link to="/professional-dashboard" className="link-return-profile">
            Voltar
          </Link>
        </button>
      </div>
    </div>
  );
}
