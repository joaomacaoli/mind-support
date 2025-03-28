import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Users, PieChart, Settings } from 'react-feather';
import './styles.css';

const ProfessionalDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('agenda');

  const [professionalData] = useState({
    nome: "Dra. Ana Paula Padrão",
    email: "ana.souza@exemplo.com",
    foto: "https://randomuser.me/api/portraits/women/72.jpg",
    especialidade: "Ansiedade e depressão",
    localizacao: "Fortaleza - Aldeota",
    faixaAtendimento: "Adultos (18-60 anos)",
    atendimentosGratuitos: 3,
    bio: "Psicóloga clínica com 10 anos de experiência, especializada em TCC para tratamento de ansiedade e depressão."
  });

  const [scheduledSessions] = useState([
    {
      id: 1,
      paciente: "João da Silva",
      idade: 35,
      data: "15/03/2024",
      horario: "14:00",
      status: "Confirmado",
      modalidade: "Online",
      link: "https://meet.google.com/xyz-abc-123",
      anamnese: "Ansiedade generalizada e dificuldade para dormir"
    },
    {
      id: 2,
      paciente: "Maria Oliveira",
      idade: 28,
      data: "16/03/2024",
      horario: "10:30",
      status: "Confirmado",
      modalidade: "Presencial",
      endereco: "Clínica Comunitária - Sala 203",
      anamnese: "Crises de pânico e estresse pós-traumático"
    },
    {
      id: 3,
      paciente: "Carlos Santos",
      idade: 42,
      data: "16/03/2024",
      horario: "15:00",
      status: "Pendente",
      modalidade: "Online",
      anamnese: "Depressão moderada e dificuldades conjugais"
    }
  ]);

  const [sessionHistory] = useState([
    {
      id: 4,
      paciente: "Fernanda Costa",
      data: "08/03/2024",
      avaliacao: "5.0",
      relato: "Primeira sessão - Anamnese completa realizada"
    },
    {
      id: 5,
      paciente: "Roberto Almeida",
      data: "01/03/2024",
      avaliacao: "4.5",
      relato: "Aplicação de técnicas de relaxamento"
    }
  ]);

  const [metrics] = useState({
    totalAtendimentos: 24,
    atendimentosGratuitos: 12,
    mediaAvaliacao: 4.7,
    proximosAtendimentosGratuitos: 3
  });

  const handleStartSession = (session) => {
    if (session.modalidade === 'Online') {
      window.open(session.link, '_blank');
    } else {
      alert(`Consulta presencial com ${session.paciente} às ${session.horario}`);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'agenda':
        return (
          <div className="tab-content-professional">
            <div className="professional-info-card">
              <h3>Atendimentos Gratuitos Disponíveis</h3>
              <div className="free-sessions-professional">
                <span className="count-professional">{professionalData.atendimentosGratuitos}</span>
                <span>vagas gratuitas restantes este mês</span>
              </div>
              <p className="bio-professional">{professionalData.bio}</p>
            </div>

            <h2>Próximas Consultas</h2>
            <div className="sessions-grid-professional">
              {scheduledSessions.map(session => (
                <div key={session.id} className="session-card-professional">
                  <div className="session-info-professional">
                    <h3>{session.paciente} ({session.idade} anos)</h3>
                    <p className="date-time">
                      <Calendar size={14} /> {session.data} <Clock size={14} /> {session.horario}
                    </p>
                    <p className={`status ${session.status.toLowerCase()}`}>
                      {session.status}
                    </p>
                    <p className="modality">{session.modalidade}</p>
                    {session.modalidade === 'Online' && (
                      <p className="link">Link: {session.link}</p>
                    )}
                    {session.modalidade === 'Presencial' && (
                      <p className="address">{session.endereco}</p>
                    )}
                    <div className="anamnese-preview-professional">
                      <p className="label-professional">Anamnese:</p>
                      <p className="content-professional">{session.anamnese}</p>
                    </div>
                  </div>
                  <div className="session-actions-professional">
                    <button 
                      className="primary-button"
                      onClick={() => handleStartSession(session)}
                      disabled={session.status !== 'Confirmado'}
                    >
                      Iniciar Consulta
                    </button>
                    <button className="secondary-button">Confirmar</button>
                    <button className="text-button">Remarcar</button>
                  </div>
                </div>
              ))}
            </div>

            <h2>Histórico de Consultas</h2>
            <div className="history-grid-professional">
              {sessionHistory.map(session => (
                <div key={session.id} className="history-card-professional">
                  <h3>{session.paciente}</h3>
                  <p className="date">{session.data}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={i < Math.floor(session.avaliacao) ? 'filled' : ''}
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
      
      case 'pacientes':
        return (
          <div className="tab-content-professesional">
            <div className="metrics-grid-professional">
              <div className="metric-card-professional">
                <h3>Total de Atendimentos</h3>
                <p className="value">{metrics.totalAtendimentos}</p>
              </div>
              <div className="metric-card-professional">
                <h3>Atendimentos Gratuitos</h3>
                <p className="value">{metrics.atendimentosGratuitos}</p>
              </div>
              <div className="metric-card-professional">
                <h3>Média de Avaliação</h3>
                <p className="value">{metrics.mediaAvaliacao}</p>
              </div>
              <div className="metric-card-professional">
                <h3>Próximos Gratuitos</h3>
                <p className="value">{metrics.proximosAtendimentosGratuitos}</p>
              </div>
            </div>

            <h2>Meus Pacientes</h2>
            <div className="search-bar-professional">
              <input type="text" placeholder="Buscar pacientes..." />
              <button className="primary-button">Buscar</button>
            </div>

            <div className="empty-state">
              <p>Você ainda não tem pacientes cadastrados</p>
              <button 
                className="primary-button"
                onClick={() => navigate('/construction')}
              >
                Otimizar Perfil
              </button>
            </div>
          </div>
        );
      
      case 'relatorios':
        return (
          <div className="tab-content-professional">
            <h2>Relatórios e Métricas</h2>
            <div className="reports-grid-professional">
              <div className="report-card-professional">
                <h3>Atendimentos por Mês</h3>
                <div className="chart-placeholder">
                  <p>Média de <strong>{metrics.totalAtendimentos}</strong> atendimentos por mês</p>
                 
                </div>
                
              </div>
              <div className="report-card-professional">
                <h3>Distribuição por Especialidade</h3>
                <div className="chart-placeholder">
                  <p>Processando...</p>
          
                </div>
              </div>
              <div className="report-card-professional">
                <h3>Avaliações dos Pacientes</h3>
                <div className="chart-placeholder">
                  <p>Média de Avaliação: <strong>{metrics.mediaAvaliacao}</strong></p>
                  <p>Pacientes satisfeitos: <strong>{metrics.totalAtendimentos}</strong></p>
                </div>
              </div>
              <div className="report-card-professional">
                <h3>Impacto Social</h3>
                <div className="impact-metrics-professional">
                  <p>Atendimentos gratuitos realizados: <strong>{metrics.atendimentosGratuitos}</strong></p>
                  <p>Pessoas ajudadas: <strong>{metrics.totalAtendimentos}</strong></p>
                  <p>Comunidades atendidas: <strong>5</strong></p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="professional-dashboard">
      <header className="dashboard-header-professional">
        <div className="user-info-professional">
          <img src={professionalData.foto} alt="Foto do profissional" className="user-avatar" onClick={() => navigate('/professional-profile')} />
          <div>
            <h1>Bem-vinda, {professionalData.nome.split(' ')[1]}!</h1>
            <p className="user-specialty-professional">{professionalData.especialidade}</p>
            <p className="user-location-professional">
              {professionalData.localizacao} • {professionalData.faixaAtendimento}
            </p>
          </div>
        </div>  
        <div className="dash-buttons-secundary">

        
        <button 
          className="profile-button-professional"
          onClick={() => navigate('/professional-profile')}
        >
          <User size={18} /> Meu Perfil
        </button>
        <button
            className="secondary-button"
            onClick={() => navigate("/")}
          >
            Sair
          </button>
          </div>
      </header>

      <nav className="dashboard-nav-professional">
        <ul>
          <li className={activeTab === 'agenda' ? 'active' : ''}>
            <button onClick={() => setActiveTab('agenda')}>
              <Calendar size={18} /> Agenda
            </button>
          </li>
          <li className={activeTab === 'pacientes' ? 'active' : ''}>
            <button onClick={() => setActiveTab('pacientes')}>
              <Users size={18} /> Pacientes
            </button>
          </li>
          <li className={activeTab === 'relatorios' ? 'active' : ''}>
            <button onClick={() => setActiveTab('relatorios')}>
              <PieChart size={18} /> Relatórios
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/construction')}>
              <Clock size={18} /> Horários
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/construction')}>
              <Settings size={18} /> Configurações
            </button>
          </li>
        </ul>
      </nav>

      <main className="dashboard-main">
        {renderTabContent()}
      </main>

      <div className="community-impact-professional">
        <p>
          <strong>Seu impacto na comunidade:</strong> Você já realizou {metrics.atendimentosGratuitos} atendimentos gratuitos, 
          ajudando a tornar o acesso à saúde mental mais acessível.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;