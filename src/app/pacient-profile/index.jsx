import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export function PacientProfile() {
  const [userData, setUserData] = useState({
    type: "Paciente",
    nome: "João da Silva",
    email: "joao.silva@exemplo.com",
    cpf: "123.456.789-00",
    senha: "********",
  });

  const [clinicalData, setClinicalData] = useState({
    queixas: "Ansiedade e dificuldade para dormir",
    historicoFamiliar: "Histórico de depressão na família",
    medicamentos: "Fluoxetina 20mg diários",
    objetivoTerapia: "Melhorar qualidade do sono e reduzir ansiedade",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...userData, ...clinicalData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUserData({
      type: tempData.type,
      nome: tempData.nome,
      email: tempData.email,
      cpf: tempData.cpf,
      senha: tempData.senha,
    });
    setClinicalData({
      queixas: tempData.queixas,
      historicoFamiliar: tempData.historicoFamiliar,
      medicamentos: tempData.medicamentos,
      objetivoTerapia: tempData.objetivoTerapia,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...userData, ...clinicalData });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Meu Perfil</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="button-edit"
          >
            Editar Perfil
          </button>
        ) : (
          <div className="button-group">
            <button
              onClick={handleSave}
              className="button-save"
            >
              Salvar Alterações
            </button>
            <button
              onClick={handleCancel}
              className="button-cancel"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="profile-section">
        <h2 className="section-title">Dados Pessoais</h2>
        <div className="profile-form">
          <div className="form-row">
            <label className="form-label">Tipo de Usuário</label>
            <div className="data-view">
              <p className="data-value">{userData.type}</p>
            </div>
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
                <p className="data-value">{userData.nome}</p>
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
                <p className="data-value">{userData.email}</p>
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">CPF</label>
            {isEditing ? (
              <input
                type="text"
                className="form-input"
                name="cpf"
                value={tempData.cpf}
                onChange={handleInputChange}
              />
            ) : (
              <div className="data-view">
                <p className="data-value">{userData.cpf}</p>
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">Senha</label>
            {isEditing ? (
              <input
                type="password"
                className="form-input"
                name="senha"
                value={tempData.senha}
                onChange={handleInputChange}
              />
            ) : (
              <div className="password-field">
                <p className="data-value">{userData.senha}</p>
                <Link to="/construction">
                  <button className="button-password">Redefinir Senha</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2 className="section-title">Quadro Clínico</h2>
        <div className="profile-form">
          <div className="form-row">
            <label className="form-label">Principais Queixas</label>
            {isEditing ? (
              <textarea
                className="form-input form-textarea"
                name="queixas"
                value={tempData.queixas}
                onChange={handleInputChange}
              />
            ) : (
              <div className="data-view">
                <p className="data-value">{clinicalData.queixas}</p>
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">Histórico Familiar</label>
            {isEditing ? (
              <textarea
                className="form-input form-textarea"
                name="historicoFamiliar"
                value={tempData.historicoFamiliar}
                onChange={handleInputChange}
              />
            ) : (
              <div className="data-view">
                <p className="data-value">{clinicalData.historicoFamiliar}</p>
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">Uso de Medicamentos</label>
            {isEditing ? (
              <textarea
                className="form-input form-textarea"
                name="medicamentos"
                value={tempData.medicamentos}
                onChange={handleInputChange}
              />
            ) : (
              <div className="data-view">
                <p className="data-value">{clinicalData.medicamentos}</p>
              </div>
            )}
          </div>

          <div className="form-row">
            <label className="form-label">Objetivo da Terapia</label>
            {isEditing ? (
              <textarea
                className="form-input form-textarea"
                name="objetivoTerapia"
                value={tempData.objetivoTerapia}
                onChange={handleInputChange}
              />
            ) : (
              <div className="data-view">
                <p className="data-value">{clinicalData.objetivoTerapia}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="button-return-profile-container">
        <button className="button-return-profile">
          <Link to="/pacient-dashboard" className="link-return-profile">
            Voltar
          </Link>
        </button>
      </div>
    </div>
  );
}
