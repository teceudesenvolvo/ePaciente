import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaClipboardCheck, FaDownload, FaFileAlt, FaFileMedical, FaFilter, FaHeartbeat, FaHistory, FaIdCard, FaNotesMedical, FaPills, FaPlus, FaPrint, FaSave, FaSearch, FaSignature, FaTimes, FaUserClock, FaUsers } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

export const patientRecords = {
  'Maria Oliveira': {
    cpf: '***.284.981-**',
    cns: '705 0042 9811 0008',
    nascimento: '14/03/1982',
    telefone: '(85) 98842-1100',
    endereco: 'Rua das Flores, 123 · Centro',
    alergias: 'Dipirona',
    condicoes: ['Hipertensão', 'Diabetes tipo 2'],
    sinais: 'PA 120/80 · Glicemia 108 mg/dL · IMC 27,4',
    historico: [
      'Consulta clínica em 22/05: renovação de receita e orientação alimentar.',
      'Exame de hemoglobina glicada solicitado em 18/05.',
      'Acompanhamento de hipertensão atualizado pela enfermagem.',
    ],
    receitas: ['Losartana 50mg · 30 dias', 'Metformina 850mg · uso contínuo'],
    exames: ['Hemograma completo · solicitado', 'Glicemia de jejum · resultado anexado'],
    encaminhamentos: ['Cardiologia · regulação municipal'],
    arquivos: [
      { nome: 'resultado_glicemia_maria.pdf', tipo: 'PDF', data: '04/06/2026' },
      { nome: 'ecg_maria_oliveira.jpg', tipo: 'Imagem', data: '29/05/2026' },
      { nome: 'termo_acompanhamento.pdf', tipo: 'PDF', data: '22/05/2026' },
    ],
  },
  'João Batista': {
    cpf: '***.901.412-**',
    cns: '898 1120 4521 0031',
    nascimento: '08/11/1974',
    telefone: '(85) 99714-2038',
    endereco: 'Av. Principal, 742 · Centro',
    alergias: 'Penicilina',
    condicoes: ['Asma', 'Tabagismo em cessação'],
    sinais: 'PA 130/84 · Saturação 94% · Temperatura 37,2ºC',
    historico: [
      'Triagem com queixa respiratória e saturação reduzida.',
      'Retorno agendado após uso de broncodilatador.',
      'Orientação para sinais de alerta respiratório.',
    ],
    receitas: ['Salbutamol spray · se necessário', 'Prednisona 20mg · 5 dias'],
    exames: ['Raio-X de tórax · prioridade alta', 'Hemograma · solicitado'],
    encaminhamentos: ['Pneumologia · avaliação especializada'],
    arquivos: [
      { nome: 'raiox_torax_joao.pdf', tipo: 'PDF', data: '07/06/2026' },
      { nome: 'triagem_respiratoria.pdf', tipo: 'PDF', data: '07/06/2026' },
    ],
  },
  'Ana Clara': {
    cpf: '***.448.771-**',
    cns: '703 7712 4488 4401',
    nascimento: '21/07/1996',
    telefone: '(85) 99133-7844',
    endereco: 'Rua Nova, 88 · UBS Centro',
    alergias: 'Não informadas',
    condicoes: ['Gestação em acompanhamento'],
    sinais: 'PA 110/70 · Peso 64 kg · Sem febre',
    historico: [
      'Avaliação inicial confirmada para acompanhamento clínico.',
      'Pré-natal acompanhado pela UBS Centro.',
      'Solicitado retorno com exames laboratoriais.',
    ],
    receitas: ['Ácido fólico · uso contínuo'],
    exames: ['Urina tipo I · pendente', 'Hemograma · pendente'],
    encaminhamentos: ['Fisioterapia · UBS Centro'],
    arquivos: [
      { nome: 'cartao_pre_natal.pdf', tipo: 'PDF', data: '02/06/2026' },
      { nome: 'hemograma_ana_clara.pdf', tipo: 'PDF', data: '30/05/2026' },
    ],
  },
  'Lucas Mendes': {
    cpf: '***.188.620-**',
    cns: '709 6201 1882 1200',
    nascimento: '02/01/2008',
    telefone: '(85) 99620-1188',
    endereco: 'Rua São José, 45 · Centro',
    alergias: 'Não informadas',
    condicoes: ['Dor odontológica aguda'],
    sinais: 'Dor 8/10 · Sem febre · Edema localizado',
    historico: [
      'Atendimento odontológico prioritário por dor aguda.',
      'Radiografia solicitada para avaliação de conduta.',
      'Orientado retorno em 48 horas se houver piora.',
    ],
    receitas: ['Ibuprofeno 600mg · 3 dias'],
    exames: ['Radiografia periapical · solicitada'],
    encaminhamentos: ['Cirurgia bucomaxilofacial · regulação'],
    arquivos: [
      { nome: 'radiografia_lucas.jpg', tipo: 'Imagem', data: '08/06/2026' },
      { nome: 'odontograma_lucas.pdf', tipo: 'PDF', data: '08/06/2026' },
    ],
  },
};

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
          { title: 'Maria Oliveira', meta: '09:00 · Clínica Geral · Em atendimento', data: '10/06/2026', horario: '09:00', origem: 'Agendamento', status: 'Em atendimento' },
          { title: 'João Batista', meta: '09:40 · Retorno · Aguardando', data: '10/06/2026', horario: '09:40', origem: 'Agendamento', status: 'Aguardando' },
          { title: 'Ana Clara', meta: '10:20 · Avaliação inicial · Confirmada', data: '11/06/2026', horario: '10:20', origem: 'Agendamento', status: 'Confirmada' },
          { title: 'Carlos Alberto', meta: 'Demanda espontânea · Dor abdominal · Triagem verde', data: '10/06/2026', horario: 'Encaixe', origem: 'Demanda espontânea', status: 'Aguardando' },
          { title: 'Lúcia Silva', meta: 'Demanda espontânea · Renovação de receita · Triagem azul', data: '10/06/2026', horario: 'Encaixe', origem: 'Demanda espontânea', status: 'Aguardando' },
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

export const statusClass = (status) => {
  if (['Crítico', 'Urgente', 'Prioritário', 'Atenção'].includes(status)) return 'ep-badge--warning';
  if (['Pendente', 'Aguardando', 'Regulação', 'Revisar', 'Retorno'].includes(status)) return 'ep-badge--primary';
  return 'ep-badge--success';
};

const getPaciente = (item) => {
  if (item.paciente) return item.paciente;
  const patientMatch = item.meta?.match(/Paciente:\s*([^·]+)/i);
  if (patientMatch) return patientMatch[1].trim();
  const firstPart = item.meta?.split('·')[0]?.trim();
  if (firstPart && !firstPart.includes(':') && !firstPart.match(/^(Saldo|Uso|UBS|Laboratório|Sala|Campanha|Microárea|Quarteirão|Família)/i)) return firstPart;
  return item.title;
};

const getUnidade = (item) => {
  if (item.unidade) return item.unidade;
  const unidade = ['UBS Centro', 'UBS Curu', 'Hospital Municipal', 'Laboratório Central', 'Farmácia Central'].find((value) => item.meta?.includes(value));
  return unidade || 'UBS Centro';
};

const getTipo = (item, actionTitle) => {
  if (item.tipo) return item.tipo;
  if (actionTitle.includes('Receita')) return 'Receita';
  if (actionTitle.includes('Exame')) return 'Exame';
  if (actionTitle.includes('Encaminhamento')) return 'Encaminhamento';
  if (actionTitle.includes('Triagem')) return 'Triagem';
  if (actionTitle.includes('Procedimento')) return 'Procedimento';
  if (actionTitle.includes('Agendamento')) return 'Agendamento';
  if (actionTitle.includes('Residência')) return 'Residência';
  if (actionTitle.includes('Visita')) return 'Visita';
  return 'Atendimento';
};

const getDataAtendimento = (item) => item.data || 'Hoje';

const getHorarioAtendimento = (item) => {
  if (item.horario) return item.horario;
  const horarioMatch = item.meta?.match(/\b\d{2}:\d{2}\b/);
  return horarioMatch ? horarioMatch[0] : 'Encaixe';
};

const getOrigemAtendimento = (item) => {
  if (item.origem) return item.origem;
  if (item.meta?.toLowerCase().includes('demanda espontânea')) return 'Demanda espontânea';
  return 'Agendamento';
};

export const getPatientRecord = (patientName) => patientRecords[patientName] || {
  cpf: '***.000.000-**',
  cns: 'Cadastro em atualização',
  nascimento: 'Não informado',
  telefone: 'Não informado',
  endereco: 'Unidade de referência',
  alergias: 'Não informadas',
  condicoes: ['Cadastro clínico em conferência'],
  sinais: 'Aguardando atualização da triagem',
  historico: ['Registro criado recentemente. Histórico completo será sincronizado pelo prontuário eletrônico.'],
  receitas: ['Sem receitas recentes'],
  exames: ['Sem exames anexados'],
  encaminhamentos: ['Sem encaminhamentos ativos'],
  arquivos: [{ nome: 'cadastro_paciente.pdf', tipo: 'PDF', data: 'Hoje' }],
};

const FuncionarioPage = ({ moduleKey, actionKey }) => {
  const module = moduleConfig[moduleKey];
  const action = module?.actions[actionKey];
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [busca, setBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('Todos');
  const [unidadeFiltro, setUnidadeFiltro] = useState('Todas');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('resumo');
  const [evolucao, setEvolucao] = useState('Paciente avaliado em consulta. Conduta registrada conforme queixa principal, exame físico e histórico do prontuário.');
  const [receitaMedicamentos, setReceitaMedicamentos] = useState([{ medicamento: 'Losartana 50mg', uso: 'Tomar 1 comprimido pela manhã por 30 dias.' }]);
  const [novoMedicamento, setNovoMedicamento] = useState('');
  const [novaPosologia, setNovaPosologia] = useState('');
  const [atestado, setAtestado] = useState({ dias: '1', cid: '', finalidade: 'Compareceu a consulta médica nesta unidade, necessitando afastamento de suas atividades pelo período informado.' });

  useEffect(() => {
    setItems(action?.items || []);
    setBusca('');
    setStatusFiltro('Todos');
    setUnidadeFiltro('Todas');
    setSelectedPatient(null);
    setActiveTab('resumo');
  }, [action]);

  if (!module || !action) return null;

  const enrichedItems = items.map((item) => ({
    ...item,
    paciente: getPaciente(item),
    unidade: getUnidade(item),
    tipo: getTipo(item, action.title),
    data: getDataAtendimento(item),
    horario: getHorarioAtendimento(item),
    origem: getOrigemAtendimento(item),
  }));

  const statusOptions = ['Todos', ...Array.from(new Set(enrichedItems.map((item) => item.status)))];
  const unidadeOptions = ['Todas', ...Array.from(new Set(enrichedItems.map((item) => item.unidade)))];
  const filteredItems = enrichedItems.filter((item) => {
    const query = `${item.paciente} ${item.title} ${item.meta} ${item.status} ${item.unidade} ${item.data} ${item.origem}`.toLowerCase();
    const matchesBusca = query.includes(busca.toLowerCase());
    const matchesStatus = statusFiltro === 'Todos' || item.status === statusFiltro;
    const matchesUnidade = unidadeFiltro === 'Todas' || item.unidade === unidadeFiltro;
    return matchesBusca && matchesStatus && matchesUnidade;
  });

  const resumo = {
    total: enrichedItems.length,
    pendentes: enrichedItems.filter((item) => ['Pendente', 'Aguardando', 'Regulação', 'Revisar', 'Retorno'].includes(item.status)).length,
    criticos: enrichedItems.filter((item) => ['Crítico', 'Urgente', 'Prioritário', 'Atenção'].includes(item.status)).length,
  };

  const handleAdd = () => {
    setItems([
      {
        title: action.primary,
        meta: 'Paciente: Novo paciente · UBS Centro · Registrado agora',
        paciente: 'Novo paciente',
        unidade: 'UBS Centro',
        status: 'Pendente',
        tipo: getTipo({ title: action.primary }, action.title),
      },
      ...items,
    ]);
  };

  const isConsulta = actionKey === 'consultas';
  const consultasAgendadasPorData = filteredItems
    .filter((item) => item.origem !== 'Demanda espontânea')
    .reduce((acc, item) => {
      acc[item.data] = [...(acc[item.data] || []), item];
      return acc;
    }, {});
  const demandasEspontaneas = filteredItems.filter((item) => item.origem === 'Demanda espontânea');
  const selectedRecord = selectedPatient ? getPatientRecord(selectedPatient.paciente) : null;
  const professionalCouncil = moduleKey === 'dentistas' ? 'CRO-CE 9182' : 'CRM-CE 18472';

  const openPatientRecord = (item) => {
    history.push({
      pathname: `/funcionarios/${moduleKey}/consultas/${encodeURIComponent(item.paciente)}`,
      state: { patient: item, moduleKey },
    });
  };

  const addMedicamento = () => {
    if (!novoMedicamento.trim() || !novaPosologia.trim()) return;
    setReceitaMedicamentos([...receitaMedicamentos, { medicamento: novoMedicamento.trim(), uso: novaPosologia.trim() }]);
    setNovoMedicamento('');
    setNovaPosologia('');
  };

  const tabs = [
    { key: 'resumo', label: 'Resumo' },
    { key: 'evolucao', label: 'Evolução' },
    { key: 'receita', label: 'Receita digital' },
    { key: 'atestado', label: 'Atestado' },
    { key: 'solicitacoes', label: 'Solicitações' },
    { key: 'arquivos', label: 'Arquivos' },
  ];

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
            <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={handleAdd}>
              <FaPlus /> {action.primary}
            </button>
          </div>
        </div>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat">
            <div className="ep-text-sm ep-text-muted">Registros</div>
            <div className="ep-font-xl ep-fw-bold ep-mt-1">{resumo.total}</div>
          </div>
          <div className="ep-card ep-card--flat">
            <div className="ep-text-sm ep-text-muted">Pendentes</div>
            <div className="ep-font-xl ep-fw-bold ep-mt-1">{resumo.pendentes}</div>
          </div>
          <div className="ep-card ep-card--flat">
            <div className="ep-text-sm ep-text-muted">Atenção</div>
            <div className="ep-font-xl ep-fw-bold ep-mt-1">{resumo.criticos}</div>
          </div>
        </div>

        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-2 ep-mb-4" style={{ color: module.color }}>
            <FaFilter />
            <span className="ep-text-sm ep-fw-bold">Filtros</span>
          </div>
          <div className="ep-grid-3 ep-gap-4">
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Buscar</label>
              <div className="ep-flex ep-items-center ep-gap-2 ep-input">
                <FaSearch className="ep-text-muted" />
                <input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Paciente, registro ou unidade" style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
              </div>
            </div>
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Status</label>
              <select className="ep-select" value={statusFiltro} onChange={(event) => setStatusFiltro(event.target.value)}>
                {statusOptions.map((status) => <option key={status}>{status}</option>)}
              </select>
            </div>
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Unidade</label>
              <select className="ep-select" value={unidadeFiltro} onChange={(event) => setUnidadeFiltro(event.target.value)}>
                {unidadeOptions.map((unidade) => <option key={unidade}>{unidade}</option>)}
              </select>
            </div>
          </div>
        </div>

        {isConsulta ? (
          <div className="ep-flex-col ep-gap-5">
            {Object.entries(consultasAgendadasPorData).map(([data, registros]) => (
              <section key={data}>
                <div className="ep-flex ep-justify-between ep-items-center ep-mb-3">
                  <div>
                    <div className="ep-text-xs ep-text-muted">Agendamentos</div>
                    <h3 className="ep-font-md ep-fw-bold">{data}</h3>
                  </div>
                  <span className="ep-badge ep-badge--neutral">{registros.length} atendimento(s)</span>
                </div>
                <div className="ep-flex-col ep-gap-3">
                  {registros.map((item) => (
                    <div
                      key={`${item.title}-${item.meta}`}
                      className="ep-card ep-card--flat"
                      onClick={() => openPatientRecord(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          openPatientRecord(item);
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="ep-flex ep-justify-between ep-items-center">
                        <div>
                          <div className="ep-text-xs ep-text-muted">{item.tipo} · {item.unidade} · {item.horario}</div>
                          <div className="ep-fw-bold ep-mt-1">{item.paciente}</div>
                          <div className="ep-text-sm ep-mt-1">{item.title}</div>
                          <div className="ep-text-sm ep-text-muted ep-mt-1">{item.meta}</div>
                        </div>
                        <span className={`ep-badge ${statusClass(item.status)}`}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <div className="ep-flex ep-justify-between ep-items-center ep-mb-3">
                <div>
                  <div className="ep-text-xs ep-text-muted">Fila separada</div>
                  <h3 className="ep-font-md ep-fw-bold">Demandas espontâneas</h3>
                </div>
                <span className="ep-badge ep-badge--primary">{demandasEspontaneas.length} aguardando</span>
              </div>
              <div className="ep-flex-col ep-gap-3">
                {demandasEspontaneas.map((item) => (
                  <div
                    key={`${item.title}-${item.meta}`}
                    className="ep-card ep-card--flat"
                    onClick={() => openPatientRecord(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openPatientRecord(item);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="ep-flex ep-justify-between ep-items-center">
                      <div>
                        <div className="ep-text-xs ep-text-muted">{item.unidade} · {item.data} · {item.horario}</div>
                        <div className="ep-fw-bold ep-mt-1">{item.paciente}</div>
                        <div className="ep-text-sm ep-mt-1">{item.title}</div>
                        <div className="ep-text-sm ep-text-muted ep-mt-1">{item.meta}</div>
                      </div>
                      <span className={`ep-badge ${statusClass(item.status)}`}>{item.status}</span>
                    </div>
                  </div>
                ))}
                {demandasEspontaneas.length === 0 && (
                  <div className="ep-alert ep-alert--info" style={{ margin: 0 }}>Nenhuma demanda espontânea encontrada com os filtros selecionados.</div>
                )}
              </div>
            </section>

            {filteredItems.length === 0 && (
              <div className="ep-alert ep-alert--info" style={{ margin: 0 }}>Nenhum registro encontrado com os filtros selecionados.</div>
            )}
          </div>
        ) : (
          <div className="ep-flex-col ep-gap-3">
            {filteredItems.map((item) => (
              <div key={`${item.title}-${item.meta}`} className="ep-card ep-card--flat">
                <div className="ep-flex ep-justify-between ep-items-center">
                  <div>
                    <div className="ep-text-xs ep-text-muted">{item.tipo} · {item.unidade}</div>
                    <div className="ep-fw-bold ep-mt-1">{item.paciente}</div>
                    <div className="ep-text-sm ep-mt-1">{item.title}</div>
                    <div className="ep-text-sm ep-text-muted ep-mt-1">{item.meta}</div>
                  </div>
                  <span className={`ep-badge ${statusClass(item.status)}`}>{item.status}</span>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="ep-alert ep-alert--info" style={{ margin: 0 }}>Nenhum registro encontrado com os filtros selecionados.</div>
            )}
          </div>
        )}
      </div>

      {selectedPatient && selectedRecord && (
        <div className="ep-modal-overlay" onClick={() => setSelectedPatient(null)}>
          <div className="ep-modal ep-patient-modal" onClick={(event) => event.stopPropagation()}>
            <div className="ep-patient-modal__header">
              <div>
                <div className="ep-text-sm ep-text-muted">{selectedPatient.tipo} · {selectedPatient.unidade}</div>
                <h2 className="ep-modal-title">{selectedPatient.paciente}</h2>
                <div className="ep-text-sm ep-text-muted">{selectedPatient.title} · {selectedPatient.meta}</div>
              </div>
              <button className="ep-btn ep-btn--ghost ep-btn--icon" onClick={() => setSelectedPatient(null)} aria-label="Fechar prontuário">
                <FaTimes />
              </button>
            </div>

            <div className="ep-patient-actions">
              <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={() => setActiveTab('receita')}><FaPills /> Nova receita</button>
              <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => setActiveTab('atestado')}><FaFileAlt /> Gerar atestado</button>
              <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => setActiveTab('evolucao')}><FaSave /> Salvar evolução</button>
            </div>

            <div className="ep-patient-tabs">
              {tabs.map((tab) => (
                <button key={tab.key} className={activeTab === tab.key ? 'active' : ''} onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'resumo' && (
              <div className="ep-patient-section">
                <div className="ep-patient-grid ep-patient-grid--3">
                  <div className="ep-card ep-card--flat">
                    <div className="ep-flex ep-items-center ep-gap-2 ep-text-muted ep-text-sm"><FaIdCard /> Cadastro</div>
                    <div className="ep-text-sm ep-mt-3">CPF: {selectedRecord.cpf}</div>
                    <div className="ep-text-sm ep-mt-1">CNS: {selectedRecord.cns}</div>
                    <div className="ep-text-sm ep-mt-1">Nascimento: {selectedRecord.nascimento}</div>
                    <div className="ep-text-sm ep-mt-1">Telefone: {selectedRecord.telefone}</div>
                  </div>
                  <div className="ep-card ep-card--flat">
                    <div className="ep-flex ep-items-center ep-gap-2 ep-text-muted ep-text-sm"><FaHeartbeat /> Dados clínicos</div>
                    <div className="ep-text-sm ep-mt-3">Alergias: {selectedRecord.alergias}</div>
                    <div className="ep-text-sm ep-mt-1">Sinais: {selectedRecord.sinais}</div>
                    <div className="ep-text-sm ep-mt-1">Endereço: {selectedRecord.endereco}</div>
                  </div>
                  <div className="ep-card ep-card--flat">
                    <div className="ep-flex ep-items-center ep-gap-2 ep-text-muted ep-text-sm"><FaFileMedical /> Atendimento</div>
                    <div className="ep-fw-bold ep-mt-3">{selectedPatient.title}</div>
                    <div className="ep-text-sm ep-text-muted ep-mt-1">{selectedPatient.meta}</div>
                    <span className={`ep-badge ${statusClass(selectedPatient.status)} ep-mt-3`}>{selectedPatient.status}</span>
                  </div>
                </div>

                <div className="ep-patient-grid ep-patient-grid--2">
                  <div className="ep-card ep-card--flat">
                    <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaHistory /> <strong>Histórico do paciente</strong></div>
                    <div className="ep-flex-col ep-gap-2">
                      {selectedRecord.historico.map((entry) => <div key={entry} className="ep-text-sm ep-text-muted">{entry}</div>)}
                    </div>
                  </div>
                  <div className="ep-card ep-card--flat">
                    <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaClipboardCheck /> <strong>Condições acompanhadas</strong></div>
                    <div className="ep-flex ep-gap-2" style={{ flexWrap: 'wrap' }}>
                      {selectedRecord.condicoes.map((condicao) => <span key={condicao} className="ep-badge ep-badge--neutral">{condicao}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'evolucao' && (
              <div className="ep-patient-section">
                <div className="ep-card ep-card--flat">
                  <h3 className="ep-font-md ep-fw-bold ep-mb-3">Evolução clínica</h3>
                  <textarea className="ep-textarea" value={evolucao} onChange={(event) => setEvolucao(event.target.value)} rows={8} />
                  <div className="ep-patient-actions ep-mt-4">
                    <button className="ep-btn ep-btn--primary ep-btn--sm"><FaSave /> Salvar no prontuário</button>
                    <button className="ep-btn ep-btn--secondary ep-btn--sm"><FaSignature /> Assinar evolução</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'receita' && (
              <div className="ep-patient-section">
                <div className="ep-patient-grid ep-patient-grid--2">
                  <div className="ep-card ep-card--flat">
                    <h3 className="ep-font-md ep-fw-bold ep-mb-3">Medicamentos</h3>
                    <div className="ep-flex-col ep-gap-3">
                      {receitaMedicamentos.map((item) => (
                        <div key={`${item.medicamento}-${item.uso}`} className="ep-prescription-item">
                          <strong>{item.medicamento}</strong>
                          <span>{item.uso}</span>
                        </div>
                      ))}
                    </div>
                    <div className="ep-grid-2 ep-gap-4 ep-mt-4">
                      <div className="ep-input-group ep-mb-0">
                        <label className="ep-label">Medicamento</label>
                        <input className="ep-input" value={novoMedicamento} onChange={(event) => setNovoMedicamento(event.target.value)} placeholder="Ex: Amoxicilina 500mg" />
                      </div>
                      <div className="ep-input-group ep-mb-0">
                        <label className="ep-label">Forma de uso</label>
                        <input className="ep-input" value={novaPosologia} onChange={(event) => setNovaPosologia(event.target.value)} placeholder="Ex: 1 cápsula a cada 8h por 7 dias" />
                      </div>
                    </div>
                    <button className="ep-btn ep-btn--secondary ep-btn--sm ep-mt-4" onClick={addMedicamento}><FaPlus /> Incluir medicamento</button>
                  </div>
                  <div className="ep-card ep-card--flat ep-document-preview">
                    <div className="ep-text-sm ep-text-muted">Receita digital</div>
                    <h3 className="ep-font-md ep-fw-bold ep-mb-3">{selectedPatient.paciente}</h3>
                    {receitaMedicamentos.map((item) => (
                      <div key={`preview-${item.medicamento}-${item.uso}`} className="ep-text-sm ep-mb-3">
                        <strong>{item.medicamento}</strong><br />{item.uso}
                      </div>
                    ))}
                    <div className="ep-digital-signature">
                      <FaSignature />
                      <div>
                        <strong>Assinado digitalmente</strong>
                        <span>Dr. Responsável · {professionalCouncil} · ICP-Brasil</span>
                      </div>
                    </div>
                    <div className="ep-patient-actions ep-mt-4">
                      <button className="ep-btn ep-btn--primary ep-btn--sm"><FaSignature /> Assinar e emitir</button>
                      <button className="ep-btn ep-btn--secondary ep-btn--sm"><FaPrint /> Imprimir</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'atestado' && (
              <div className="ep-patient-section">
                <div className="ep-patient-grid ep-patient-grid--2">
                  <div className="ep-card ep-card--flat">
                    <h3 className="ep-font-md ep-fw-bold ep-mb-3">Gerar atestado médico</h3>
                    <div className="ep-grid-2 ep-gap-4">
                      <div className="ep-input-group">
                        <label className="ep-label">Dias de afastamento</label>
                        <input className="ep-input" value={atestado.dias} onChange={(event) => setAtestado({ ...atestado, dias: event.target.value })} />
                      </div>
                      <div className="ep-input-group">
                        <label className="ep-label">CID opcional</label>
                        <input className="ep-input" value={atestado.cid} onChange={(event) => setAtestado({ ...atestado, cid: event.target.value })} placeholder="Ex: J06.9" />
                      </div>
                    </div>
                    <div className="ep-input-group ep-mb-0">
                      <label className="ep-label">Texto do atestado</label>
                      <textarea className="ep-textarea" value={atestado.finalidade} onChange={(event) => setAtestado({ ...atestado, finalidade: event.target.value })} rows={6} />
                    </div>
                  </div>
                  <div className="ep-card ep-card--flat ep-document-preview">
                    <div className="ep-text-sm ep-text-muted">Atestado médico</div>
                    <h3 className="ep-font-md ep-fw-bold ep-mb-3">{selectedPatient.paciente}</h3>
                    <p className="ep-text-sm ep-text-muted">{atestado.finalidade}</p>
                    <p className="ep-text-sm ep-text-muted">Afastamento: {atestado.dias} dia(s). {atestado.cid ? `CID: ${atestado.cid}.` : 'CID não informado por sigilo ou opção clínica.'}</p>
                    <div className="ep-digital-signature">
                      <FaSignature />
                      <div>
                        <strong>Assinado digitalmente</strong>
                        <span>Dr. Responsável · {professionalCouncil} · validade conferível por QR Code</span>
                      </div>
                    </div>
                    <div className="ep-patient-actions ep-mt-4">
                      <button className="ep-btn ep-btn--primary ep-btn--sm"><FaSignature /> Assinar atestado</button>
                      <button className="ep-btn ep-btn--secondary ep-btn--sm"><FaPrint /> Imprimir</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'solicitacoes' && (
              <div className="ep-patient-section">
                <div className="ep-patient-grid ep-patient-grid--3">
                  <div className="ep-card ep-card--flat">
                    <h3 className="ep-font-md ep-fw-bold ep-mb-3">Receitas</h3>
                    {selectedRecord.receitas.map((receita) => <div key={receita} className="ep-text-sm ep-text-muted ep-mb-2">{receita}</div>)}
                  </div>
                  <div className="ep-card ep-card--flat">
                    <h3 className="ep-font-md ep-fw-bold ep-mb-3">Exames</h3>
                    {selectedRecord.exames.map((exame) => <div key={exame} className="ep-text-sm ep-text-muted ep-mb-2">{exame}</div>)}
                    <button className="ep-btn ep-btn--secondary ep-btn--sm ep-mt-4"><FaPlus /> Solicitar exame</button>
                  </div>
                  <div className="ep-card ep-card--flat">
                    <h3 className="ep-font-md ep-fw-bold ep-mb-3">Encaminhamentos</h3>
                    {selectedRecord.encaminhamentos.map((encaminhamento) => <div key={encaminhamento} className="ep-text-sm ep-text-muted ep-mb-2">{encaminhamento}</div>)}
                    <button className="ep-btn ep-btn--secondary ep-btn--sm ep-mt-4"><FaPlus /> Novo encaminhamento</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'arquivos' && (
              <div className="ep-patient-section">
                <div className="ep-card ep-card--flat">
                  <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaFileAlt /> <strong>Arquivos do paciente</strong></div>
                  <div className="ep-flex-col ep-gap-3">
                    {selectedRecord.arquivos.map((arquivo) => (
                      <div key={arquivo.nome} className="ep-file-row">
                        <div>
                          <div className="ep-fw-bold">{arquivo.nome}</div>
                          <div className="ep-text-sm ep-text-muted">{arquivo.tipo} · {arquivo.data}</div>
                        </div>
                        <button className="ep-btn ep-btn--secondary ep-btn--sm" type="button">
                          <FaDownload /> Abrir
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FuncionarioPage;
