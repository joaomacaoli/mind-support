import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Clipboard,
  Heart,
  MessageSquare,
  Settings,
} from "react-feather";
import "./styles.css";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("agenda");

  const [patientData] = useState({
    nome: "João da Silva",
    email: "joao.silva@exemplo.com",
    foto: "http://graph.facebook.com/{user-id}/picture?type=large",
  });

  const [upcomingSessions] = useState([
    {
      id: 1,
      profissional: "Dra. Ana Paula Souza",
      especialidade: "Ansiedade e depressão",
      data: "15/03/2024",
      horario: "14:00",
      status: "Confirmado",
      modalidade: "Online",
      link: "https://meet.google.com/xyz-abc-123",
    },
    {
      id: 2,
      profissional: "Dr. Carlos Mendes",
      especialidade: "Terapia cognitivo-comportamental",
      data: "20/03/2024",
      horario: "10:30",
      status: "Agendado",
      modalidade: "Presencial",
      endereco: "Clínica Comunitária - Sala 203",
    },
  ]);

  const [sessionHistory] = useState([
    {
      id: 3,
      profissional: "Dra. Ana Paula Souza",
      data: "01/03/2024",
      avaliacao: "4.5",
      relato: "Sessão produtiva sobre técnicas de relaxamento",
    },
    {
      id: 4,
      profissional: "Dra. Ana Paula Souza",
      data: "08/03/2024",
      avaliacao: "5.0",
      relato: "Discussão sobre progressos e desafios",
    },
  ]);

  const [supportGroups] = useState([
    {
      id: 1,
      nome: "Ansiedade - Juntos Venceremos",
      descricao: "Grupo para compartilhamento de experiências e estratégias",
      proximoEncontro: "18/03/2024 - 19:00",
    },
    {
      id: 2,
      nome: "Homens pela Saúde Mental",
      descricao: "Espaço seguro para discussão de desafios emocionais",
      proximoEncontro: "22/03/2024 - 18:30",
    },
  ]);

  const handleStartSession = (session) => {
    if (session.modalidade === "Online") {
      window.open(session.link, "_blank");
    } else {
      alert(`Dirija-se a: ${session.endereco}`);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "agenda":
        return (
          <div className="tab-content">
            <h2>Próximas Consultas</h2>
            <div className="sessions-grid">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="session-card">
                  <div className="session-info">
                    <h3>{session.profissional}</h3>
                    <p className="specialty">{session.especialidade}</p>
                    <p className="date-time">
                      <Calendar size={14} /> {session.data} <Clock size={14} />{" "}
                      {session.horario}
                    </p>
                    <p className={`status ${session.status.toLowerCase()}`}>
                      {session.status}
                    </p>
                    <p className="modality">{session.modalidade}</p>
                    {session.modalidade === "Online" && (
                      <p className="link">Link: {session.link}</p>
                    )}
                    {session.modalidade === "Presencial" && (
                      <p className="address">{session.endereco}</p>
                    )}
                  </div>
                  <div className="session-actions">
                    {new Date(session.data.split("/").reverse().join("-")) >
                    new Date() ? (
                      <>
                        <button
                          className="primary-button"
                          onClick={() => handleStartSession(session)}
                          disabled={session.status !== "Confirmado"}
                        >
                          Iniciar Consulta
                        </button>
                        <button className="secondary-button">Remarcar</button>
                        <button className="text-button">Cancelar</button>
                      </>
                    ) : (
                      <button
                        className="primary-button"
                        onClick={() =>
                        //   navigate(`/zzzzzzzz/${session.id}`)
                        navigate(`/construction`)
                        }
                      >
                        Avaliar Consulta
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h2>Histórico de Consultas</h2>
            <div className="history-grid">
              {sessionHistory.map((session) => (
                <div key={session.id} className="history-card">
                  <h3>{session.profissional}</h3>
                  <p className="date">{session.data}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.floor(session.avaliacao) ? "filled" : ""
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="report">{session.relato}</p>
                  <button
                    className="text-button"
                    onClick={() => navigate(`/construction`)}
                  >
                    Ver detalhes
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "profissionais":
        return (
          <div className="tab-content">
            <div className="search-bar">
              <input type="text" placeholder="Buscar profissionais..." />
              <select>
                <option value="">Todas especialidades</option>
                <option value="ansiedade">Ansiedade</option>
                <option value="depressao">Depressão</option>
                <option value="tcc">TCC</option>
              </select>
              <select>
                <option value="">Todas regiões</option>
                <option value="norte">Norte</option>
                <option value="sudeste">Sudeste</option>
                <option value="nordeste">Nordeste</option>
                <option value="sul">Sul</option>
                <option value="centro-oeste">Centro-Oeste</option>
              </select>
              <button className="primary-button">Buscar</button>
            </div>

            <div className="professionals-grid">
              <div className="empty-state">
                <p>
                  Use os filtros acima para encontrar profissionais disponíveis
                </p>
                <button
                  className="primary-button"
                  onClick={() => navigate("/construction")}
                >
                  Buscar Profissionais
                </button>
              </div>
            </div>
          </div>
        );

      case "grupos":
        return (
          <div className="tab-content">
            <h2>Grupos de Apoio Recomendados</h2>
            <div className="groups-grid">
              {supportGroups.map((group) => (
                <div key={group.id} className="group-card">
                  <h3>{group.nome}</h3>
                  <p className="description">{group.descricao}</p>
                  <p className="next-meeting">
                    <Clock size={14} /> Próximo encontro:{" "}
                    {group.proximoEncontro}
                  </p>
                  <div className="group-actions">
                    <button className="primary-button">Participar</button>
                    <button
                      className="text-button"
                      onClick={() => navigate(`/construction`)}
                    >
                      Ver detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="patient-dashboard">
      <header className="dashboard-header">
        <div className="user-info">
          <img
            src={patientData.foto}
            alt="Foto do paciente"
            className="user-avatar"
          />
          <div>
            <h1>Olá, {patientData.nome.split(" ")[0]}!</h1>
            <p className="user-email">{patientData.email}</p>
          </div>
        </div>
        <div className="dash-buttons-secundary">
          <button
            className="profile-button"
            onClick={() => navigate("/pacient-profile")}
          >
            <User size={18} /> Meu Perfil
          </button>

          <button className="secondary-button">Sair</button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <ul>
          <li className={activeTab === "agenda" ? "active" : ""}>
            <button onClick={() => setActiveTab("agenda")}>
              <Calendar size={18} /> Agenda
            </button>
          </li>
          <li className={activeTab === "profissionais" ? "active" : ""}>
            <button onClick={() => setActiveTab("profissionais")}>
              <Clipboard size={18} /> Profissionais
            </button>
          </li>
          <li className={activeTab === "grupos" ? "active" : ""}>
            <button onClick={() => setActiveTab("grupos")}>
              <Heart size={18} /> Grupos de Apoio
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/construction")}>
                <MessageSquare size={18} /> Depoimentos
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/construction")}>
              <Settings size={18} /> Configurações
            </button>
          </li>
        </ul>
      </nav>

      <main className="dashboard-main">{renderTabContent()}</main>

      <div className="emergency-banner">
        <p>
          Precisa de ajuda imediata?{" "}
          <button onClick={() => navigate("/construction")}>
            Acesse nosso suporte de emergência
          </button>
        </p>
      </div>
    </div>
  );
};

export default PatientDashboard;
