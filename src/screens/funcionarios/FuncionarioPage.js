import React from 'react';
import { FaClipboardCheck, FaFileMedical, FaNotesMedical, FaPills, FaPlus, FaUserClock, FaUsers } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const moduleConfig = {
  medicos: {
    title: 'Médicos',
    color: 'var(--color-primary)',
    icon: <FaNotesMedical />,
    actions: {
      consultas: {
        title: 'Consultas Médicas',
        primary: 'Nova evolução',
        items: [
          { title: 'Maria Oliveira', meta: '09:00 · Clínica Geral · Em atendimento', status: 'Em atendimento' },
          { title: 'João Batista', meta: '09:40 · Retorno · Aguardando', status: 'Aguardando' },
          { title: 'Ana Clara', meta: '10:20 · Avaliação inicial · Confirmada', status: 'Confirmada' },
        ],
      },
      receitas: {
        title: 'Receitas Médicas',
        primary: 'Nova receita',
        items: [
          { title: 'Losartana 50mg', meta: 'Paciente: Maria Oliveira · 30 dias', status: 'Emitida' },
          { title: 'Amoxicilina 500mg', meta: 'Paciente: João Batista · 7 dias', status: 'Revisar' },
        ],
      },
      exames: {
        title: 'Solicitação de Exames',
        primary: 'Solicitar exame',
        items: [
          { title: 'Hemograma completo', meta: 'Maria Oliveira · Prioridade normal', status: 'Solicitado' },
          { title: 'Raio-X de tórax', meta: 'João Batista · Prioridade alta', status: 'Urgente' },
        ],
      },
      encaminhamentos: {
        title: 'Encaminhamentos',
        primary: 'Novo encaminhamento',
        items: [
          { title: 'Cardiologia', meta: 'Paciente: Maria Oliveira · Regulação municipal', status: 'Pendente' },
          { title: 'Fisioterapia', meta: 'Paciente: Ana Clara · UBS Centro', status: 'Aprovado' },
        ],
      },
    },
  },
  farmacia: {
    title: 'Farmácia UBS',
    color: 'var(--color-success)',
    icon: <FaPills />,
    actions: {
      estoque: {
        title: 'Estoque da Farmácia',
        primary: 'Registrar entrada',
        items: [
          { title: 'Dipirona 500mg', meta: 'Saldo: 420 unidades · Mínimo: 120', status: 'Normal' },
          { title: 'Amoxicilina 500mg', meta: 'Saldo: 38 unidades · Mínimo: 80', status: 'Crítico' },
        ],
      },
      medicamentos: {
        title: 'Medicamentos',
        primary: 'Cadastrar medicamento',
        items: [
          { title: 'Losartana 50mg', meta: 'Uso contínuo · Farmácia básica', status: 'Disponível' },
          { title: 'Metformina 850mg', meta: 'Uso contínuo · Farmácia básica', status: 'Disponível' },
        ],
      },
      solicitacoes: {
        title: 'Solicitações da Farmácia',
        primary: 'Nova solicitação',
        items: [
          { title: 'Reposição de antibióticos', meta: 'UBS Centro · Enviada hoje', status: 'Pendente' },
          { title: 'Insumos de curativo', meta: 'UBS Curu · Aprovada', status: 'Aprovada' },
        ],
      },
    },
  },
  recepcao: {
    title: 'Recepção',
    color: 'var(--color-warning)',
    icon: <FaUserClock />,
    actions: {
      agendamentos: {
        title: 'Agendamentos de Consultas',
        primary: 'Novo agendamento',
        items: [
          { title: 'Maria Oliveira', meta: 'Clínica Geral · 09:00 · Dr. Carlos', status: 'Confirmado' },
          { title: 'Pedro Henrique', meta: 'Pediatria · 10:30 · Dra. Ana', status: 'Aguardando' },
        ],
      },
      exames: {
        title: 'Agendamento de Exames',
        primary: 'Agendar exame',
        items: [
          { title: 'Hemograma', meta: 'Laboratório Central · 12/06 · 07:30', status: 'Confirmado' },
          { title: 'Ultrassom', meta: 'Hospital Municipal · Regulação', status: 'Pendente' },
        ],
      },
      fila: {
        title: 'Fila de Atendimento',
        primary: 'Chamar próximo',
        items: [
          { title: 'Senha A023', meta: 'Maria Oliveira · Triagem', status: 'Chamando' },
          { title: 'Senha A024', meta: 'João Batista · Recepção', status: 'Aguardando' },
          { title: 'Senha P008', meta: 'Prioritário · Pediatria', status: 'Prioritário' },
        ],
      },
    },
  },
  enfermeiros: {
    title: 'Enfermeiros',
    color: 'var(--color-primary)',
    icon: <FaClipboardCheck />,
    actions: {
      triagem: {
        title: 'Triagem de Enfermagem',
        primary: 'Nova triagem',
        items: [
          { title: 'Maria Oliveira', meta: 'PA 120/80 · Temperatura 36,7ºC', status: 'Concluída' },
          { title: 'João Batista', meta: 'Queixa respiratória · Saturação 94%', status: 'Atenção' },
        ],
      },
      procedimentos: {
        title: 'Procedimentos',
        primary: 'Registrar procedimento',
        items: [
          { title: 'Curativo simples', meta: 'Sala de procedimentos · 08:40', status: 'Realizado' },
          { title: 'Vacinação', meta: 'Campanha Influenza · 12 doses aplicadas', status: 'Em andamento' },
        ],
      },
      acompanhamentos: {
        title: 'Acompanhamentos',
        primary: 'Novo acompanhamento',
        items: [
          { title: 'Hipertensos', meta: '18 pacientes com retorno pendente', status: 'Monitorar' },
          { title: 'Pré-natal', meta: '6 gestantes acompanhadas pela UBS Centro', status: 'Atualizado' },
        ],
      },
    },
  },
  dentistas: {
    title: 'Dentistas',
    color: 'var(--color-primary)',
    icon: <FaFileMedical />,
    actions: {
      consultas: {
        title: 'Consultas Odontológicas',
        primary: 'Nova consulta',
        items: [
          { title: 'Ana Clara', meta: 'Avaliação odontológica · 09:30', status: 'Confirmada' },
          { title: 'Lucas Mendes', meta: 'Dor aguda · Prioritário', status: 'Prioritário' },
        ],
      },
      receitas: {
        title: 'Receitas Odontológicas',
        primary: 'Nova receita',
        items: [
          { title: 'Ibuprofeno 600mg', meta: 'Paciente: Lucas Mendes · 3 dias', status: 'Emitida' },
          { title: 'Clorexidina 0,12%', meta: 'Paciente: Ana Clara · 7 dias', status: 'Emitida' },
        ],
      },
      exames: {
        title: 'Exames Odontológicos',
        primary: 'Solicitar exame',
        items: [
          { title: 'Radiografia panorâmica', meta: 'Regulação odontológica · Pendente', status: 'Pendente' },
          { title: 'Periapical', meta: 'UBS Centro · Solicitado', status: 'Solicitado' },
        ],
      },
      encaminhamentos: {
        title: 'Encaminhamentos Odontológicos',
        primary: 'Novo encaminhamento',
        items: [
          { title: 'Cirurgia bucomaxilofacial', meta: 'Paciente: Lucas Mendes', status: 'Regulação' },
          { title: 'Endodontia', meta: 'Paciente: Ana Clara', status: 'Aguardando' },
        ],
      },
    },
  },
  acs: {
    title: 'ACS',
    color: 'var(--color-success)',
    icon: <FaUsers />,
    actions: {
      residencias: {
        title: 'Atendimento por Residências',
        primary: 'Registrar visita',
        items: [
          { title: 'Rua das Flores, 123', meta: 'Família Oliveira · 4 moradores · Visitada hoje', status: 'Visitada' },
          { title: 'Sítio das Pedras, casa 18', meta: 'Família Santos · 2 idosos · Retorno pendente', status: 'Retorno' },
        ],
      },
      visitas: {
        title: 'Visitas Domiciliares',
        primary: 'Nova visita',
        items: [
          { title: 'Gestante acompanhada', meta: 'Microárea 02 · 28 semanas', status: 'Atualizado' },
          { title: 'Paciente acamado', meta: 'Microárea 04 · Visita semanal', status: 'Prioritário' },
        ],
      },
      alertas: {
        title: 'Alertas Territoriais',
        primary: 'Novo alerta',
        items: [
          { title: 'Foco de dengue', meta: 'Quarteirão 12 · Encaminhar endemias', status: 'Crítico' },
          { title: 'Vacina atrasada', meta: '3 crianças na microárea 03', status: 'Atenção' },
        ],
      },
    },
  },
};

const statusClass = (status) => {
  if (['Crítico', 'Urgente', 'Prioritário', 'Atenção'].includes(status)) return 'ep-badge--warning';
  if (['Pendente', 'Aguardando', 'Regulação', 'Revisar', 'Retorno'].includes(status)) return 'ep-badge--primary';
  return 'ep-badge--success';
};

const FuncionarioPage = ({ moduleKey, actionKey }) => {
  const module = moduleConfig[moduleKey];
  const action = module?.actions[actionKey];

  if (!module || !action) return null;

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--flat ep-mb-6" style={{ borderLeft: `4px solid ${module.color}` }}>
          <div className="ep-flex ep-items-center ep-gap-3">
            <div className="ep-avatar ep-avatar--md" style={{ background: module.color, color: 'white' }}>
              {module.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div className="ep-text-sm ep-text-muted">{module.title}</div>
              <h2 className="ep-font-lg ep-fw-bold">{action.title}</h2>
            </div>
            <button className="ep-btn ep-btn--primary ep-btn--sm">
              <FaPlus /> {action.primary}
            </button>
          </div>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {action.items.map((item) => (
            <div key={`${item.title}-${item.meta}`} className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-center">
                <div>
                  <div className="ep-fw-bold">{item.title}</div>
                  <div className="ep-text-sm ep-text-muted ep-mt-1">{item.meta}</div>
                </div>
                <span className={`ep-badge ${statusClass(item.status)}`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FuncionarioPage;
