import React, { useState } from 'react';
import { FaCalendarAlt, FaDownload, FaExclamationTriangle, FaFileAlt, FaFileMedical, FaFilter, FaHeartbeat, FaIdCard, FaInfoCircle, FaPills, FaPrint, FaSave, FaSearch, FaSignature, FaStethoscope, FaTasks, FaUserMd, FaVideo } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';
import { getPatientRecord, statusClass } from '../FuncionarioPage';

const teleconsultas = [
  {
    id: 1,
    paciente: 'Maria Oliveira',
    horario: '09:00',
    data: '10/06/2026',
    motivo: 'Clínica Geral',
    status: 'Em atendimento',
    prioridade: 'Rotina',
    origem: 'Agendamento',
  },
  {
    id: 2,
    paciente: 'João Batista',
    horario: '09:40',
    data: '10/06/2026',
    motivo: 'Reavaliação respiratória',
    status: 'Aguardando paciente',
    prioridade: 'Atenção',
    origem: 'Agendamento',
  },
  {
    id: 3,
    paciente: 'Ana Clara',
    horario: '10:20',
    data: '10/06/2026',
    motivo: 'Orientação pré-natal',
    status: 'Agendada',
    prioridade: 'Rotina',
    origem: 'Agendamento',
  },
  {
    id: 4,
    paciente: 'Carlos Alberto',
    horario: 'Encaixe',
    data: '10/06/2026',
    motivo: 'Demanda espontânea · Dor abdominal',
    status: 'Aguardando paciente',
    prioridade: 'Atenção',
    origem: 'Demanda espontânea',
  },
  {
    id: 5,
    paciente: 'Lúcia Silva',
    horario: 'Encaixe',
    data: '10/06/2026',
    motivo: 'Demanda espontânea · Renovação de receita',
    status: 'Aguardando paciente',
    prioridade: 'Rotina',
    origem: 'Demanda espontânea',
  },
];

const MedicosOnline = () => {
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [activeTab, setActiveTab] = useState('rosto');
  const [busca, setBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('Todos');
  const [dataFiltro, setDataFiltro] = useState(teleconsultas[0]?.data || '');
  const [filaTab, setFilaTab] = useState('agendamentos');
  const [soap, setSoap] = useState({
    subjetivo: 'Paciente relata acompanhamento de hipertensão e diabetes, sem queixas agudas no momento.',
    objetivo: 'PA 120/80 · Glicemia 108 mg/dL · IMC 27,4',
    avaliacao: 'Hipertensão e diabetes tipo 2 em acompanhamento.',
    plano: 'Manter acompanhamento, renovar receita, solicitar exames de controle e orientar retorno.',
  });
  const [evolucao, setEvolucao] = useState('Teleconsulta realizada com identificação confirmada, revisão do histórico e orientações registradas no prontuário.');
  const [receitaMedicamentos] = useState([{ medicamento: 'Losartana 50mg', uso: 'Tomar 1 comprimido pela manhã por 30 dias.' }]);
  const [atestado, setAtestado] = useState({ dias: '1', cid: '', finalidade: 'Compareceu a consulta médica online, necessitando afastamento conforme avaliação clínica.' });
  const dataOptions = Array.from(new Set(teleconsultas.map((consulta) => consulta.data)));
  const selectedData = dataOptions.includes(dataFiltro) ? dataFiltro : dataOptions[0];
  const filteredConsultas = teleconsultas.filter((consulta) => {
    const query = `${consulta.paciente} ${consulta.motivo} ${consulta.status} ${consulta.prioridade} ${consulta.data} ${consulta.origem}`.toLowerCase();
    const matchesBusca = query.includes(busca.toLowerCase());
    const matchesStatus = statusFiltro === 'Todos' || consulta.status === statusFiltro;
    const matchesData = consulta.data === selectedData;
    return matchesBusca && matchesStatus && matchesData;
  });
  const roomName = activeConsultation
    ? `ePaciente-${activeConsultation.paciente.replace(/\s+/g, '-')}-${activeConsultation.id}`
    : 'ePacienteMedicoSala';
  const jitsiUrl = `https://meet.jit.si/${roomName}#config.startWithAudioMuted=false&config.startWithVideoMuted=false&userInfo.displayName="Profissional ePaciente"`;
  const selectedRecord = activeConsultation ? getPatientRecord(activeConsultation.paciente) : null;
  const agendamentosPorData = filteredConsultas
    .filter((consulta) => consulta.origem !== 'Demanda espontânea')
    .reduce((acc, consulta) => {
      acc[consulta.data] = [...(acc[consulta.data] || []), consulta];
      return acc;
    }, {});
  const demandasEspontaneas = filteredConsultas.filter((consulta) => consulta.origem === 'Demanda espontânea');
  const tabs = [
    { key: 'rosto', label: 'Folha de rosto' },
    { key: 'soap', label: 'SOAP' },
    { key: 'evolucao', label: 'Evolução livre' },
    { key: 'problemas', label: 'Problemas e alergias' },
    { key: 'medicoes', label: 'Medições' },
    { key: 'receita', label: 'Receita digital' },
    { key: 'atestado', label: 'Atestado' },
    { key: 'solicitacoes', label: 'Solicitações' },
    { key: 'arquivos', label: 'Arquivos' },
  ];

  if (activeConsultation) {
    return (
      <div className="ep-page">
        <HeaderTop customTitle={`Consulta online · ${activeConsultation.paciente}`} />

        <div className="ep-content ep-animate-fade-up">
          <div className="ep-record-hero">
            <div className="ep-record-hero__main">
              <div className="ep-avatar ep-avatar--lg" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                <FaVideo />
              </div>
              <div className="ep-record-hero__text">
                <div className="ep-text-sm ep-text-muted">Teleconsulta · Jitsi Meet</div>
                <h1>{activeConsultation.paciente}</h1>
                <div className="ep-text-sm ep-text-muted">{activeConsultation.paciente} · {activeConsultation.horario} · {activeConsultation.motivo} · {activeConsultation.status}</div>
                <span className="ep-badge ep-badge--neutral ep-mt-3">{activeConsultation.origem}</span>
              </div>
            </div>
            <div className="ep-record-hero__actions">
              <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={() => setActiveTab('receita')}><FaPills /> Nova receita</button>
              <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => setActiveTab('atestado')}><FaFileAlt /> Gerar atestado</button>
              <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => setActiveTab('evolucao')}><FaSave /> Salvar evolução</button>
              <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => setActiveConsultation(null)}>Sair da sala</button>
              <a className="ep-btn ep-btn--primary ep-btn--sm" href={jitsiUrl} target="_blank" rel="noreferrer"><FaVideo /> Abrir externo</a>
            </div>
          </div>

          <div className="ep-card ep-card--flat ep-mb-6">
            <div className="ep-alert ep-alert--info" style={{ marginBottom: 'var(--sp-4)' }}>
              <FaInfoCircle style={{ marginRight: 10 }} />
              Teleatendimento sem gravação pelo aplicativo. Confirme câmera, microfone, privacidade do ambiente e identificação do paciente.
            </div>
            <div className="ep-video-wrapper" style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 24, overflow: 'hidden', background: '#000' }}>
              <iframe
                title="Consulta online Jitsi"
                src={jitsiUrl}
                allow="camera; microphone; fullscreen; display-capture"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            </div>
          </div>

          <div className="ep-record-tabs">
            {tabs.map((tab) => (
              <button key={tab.key} className={activeTab === tab.key ? 'active' : ''} onClick={() => setActiveTab(tab.key)}>
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'rosto' && selectedRecord && (
            <div className="ep-record-section">
              <div className="ep-record-grid ep-record-grid--3">
                <div className="ep-card ep-card--flat">
                  <div className="ep-flex ep-items-center ep-gap-2 ep-text-muted ep-text-sm"><FaIdCard /> Cadastro</div>
                  <div className="ep-text-sm ep-mt-3">CPF: {selectedRecord.cpf}</div>
                  <div className="ep-text-sm ep-mt-1">CNS: {selectedRecord.cns}</div>
                  <div className="ep-text-sm ep-mt-1">Nascimento: {selectedRecord.nascimento}</div>
                </div>
                <div className="ep-card ep-card--flat">
                  <div className="ep-flex ep-items-center ep-gap-2 ep-text-muted ep-text-sm"><FaHeartbeat /> Dados clínicos</div>
                  <div className="ep-text-sm ep-mt-3">Alergias: {selectedRecord.alergias}</div>
                  <div className="ep-text-sm ep-mt-1">Sinais: {selectedRecord.sinais}</div>
                </div>
                <div className="ep-card ep-card--flat">
                  <div className="ep-flex ep-items-center ep-gap-2 ep-text-muted ep-text-sm"><FaFileMedical /> Atendimento online</div>
                  <div className="ep-fw-bold ep-mt-3">{activeConsultation.motivo}</div>
                  <div className="ep-text-sm ep-text-muted ep-mt-1">{activeConsultation.horario} · {activeConsultation.status}</div>
                  <span className={`ep-badge ${statusClass(activeConsultation.status)} ep-mt-3`}>{activeConsultation.status}</span>
                </div>
              </div>
              <div className="ep-record-grid ep-record-grid--4">
                <div className="ep-card ep-card--flat"><FaExclamationTriangle /> <strong>Alergias</strong><div className="ep-text-sm ep-text-muted ep-mt-2">{selectedRecord.alergias}</div></div>
                <div className="ep-card ep-card--flat"><FaTasks /> <strong>Problemas ativos</strong><div className="ep-flex ep-gap-2 ep-mt-2" style={{ flexWrap: 'wrap' }}>{selectedRecord.condicoes.map((c) => <span key={c} className="ep-badge ep-badge--neutral">{c}</span>)}</div></div>
                <div className="ep-card ep-card--flat"><FaPills /> <strong>Medicamentos ativos</strong>{selectedRecord.receitas.map((r) => <div key={r} className="ep-text-sm ep-text-muted ep-mt-2">{r}</div>)}</div>
                <div className="ep-card ep-card--flat"><FaFileMedical /> <strong>Últimos exames</strong>{selectedRecord.exames.map((e) => <div key={e} className="ep-text-sm ep-text-muted ep-mt-2">{e}</div>)}</div>
              </div>
            </div>
          )}

          {activeTab === 'soap' && (
            <div className="ep-record-grid ep-record-grid--2">
              {[
                ['subjetivo', 'S · Subjetivo'],
                ['objetivo', 'O · Objetivo'],
                ['avaliacao', 'A · Avaliação'],
                ['plano', 'P · Plano'],
              ].map(([field, title]) => (
                <div key={field} className="ep-card ep-card--flat">
                  <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaStethoscope /> <strong>{title}</strong></div>
                  <textarea className="ep-textarea" rows={6} value={soap[field]} onChange={(event) => setSoap({ ...soap, [field]: event.target.value })} />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'evolucao' && (
            <div className="ep-card ep-card--flat">
              <h3 className="ep-font-md ep-fw-bold ep-mb-3">Evolução livre</h3>
              <textarea className="ep-textarea" rows={9} value={evolucao} onChange={(event) => setEvolucao(event.target.value)} />
              <div className="ep-record-actions ep-mt-4"><button className="ep-btn ep-btn--primary ep-btn--sm"><FaSave /> Salvar evolução</button><button className="ep-btn ep-btn--secondary ep-btn--sm"><FaSignature /> Assinar</button></div>
            </div>
          )}

          {activeTab === 'problemas' && selectedRecord && (
            <div className="ep-record-grid ep-record-grid--2">
              <div className="ep-card ep-card--flat"><h3 className="ep-font-md ep-fw-bold ep-mb-3">Problemas ativos</h3>{selectedRecord.condicoes.map((c) => <div key={c} className="ep-problem-row"><strong>{c}</strong><span className="ep-badge ep-badge--primary">Ativo</span></div>)}</div>
              <div className="ep-card ep-card--flat"><h3 className="ep-font-md ep-fw-bold ep-mb-3">Alergias e reações</h3><div className="ep-problem-row"><strong>{selectedRecord.alergias}</strong><span className="ep-badge ep-badge--warning">Revisar</span></div></div>
            </div>
          )}

          {activeTab === 'medicoes' && (
            <div className="ep-record-grid ep-record-grid--3">
              {['PA 120/80', 'Glicemia 108 mg/dL', 'IMC 27,4', 'Temperatura 36,7ºC', 'Saturação 98%', 'Peso 72 kg'].map((item) => {
                const [label, ...value] = item.split(' ');
                return <div key={item} className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">{label}</div><div className="ep-font-lg ep-fw-bold ep-mt-1">{value.join(' ')}</div></div>;
              })}
            </div>
          )}

          {activeTab === 'receita' && (
            <div className="ep-record-grid ep-record-grid--2">
              <div className="ep-card ep-card--flat"><h3 className="ep-font-md ep-fw-bold ep-mb-3">Receita digital</h3>{receitaMedicamentos.map((r) => <div key={r.medicamento} className="ep-prescription-item"><strong>{r.medicamento}</strong><span>{r.uso}</span></div>)}<button className="ep-btn ep-btn--primary ep-btn--sm ep-mt-4"><FaSignature /> Assinar e emitir</button></div>
              <div className="ep-card ep-card--flat ep-document-preview"><div className="ep-text-sm ep-text-muted">Prévia</div><h3 className="ep-font-md ep-fw-bold ep-mb-3">{activeConsultation.paciente}</h3>{receitaMedicamentos.map((r) => <div key={`prev-${r.medicamento}`} className="ep-text-sm ep-mb-3"><strong>{r.medicamento}</strong><br />{r.uso}</div>)}<button className="ep-btn ep-btn--secondary ep-btn--sm"><FaPrint /> Gerar PDF</button></div>
            </div>
          )}

          {activeTab === 'atestado' && (
            <div className="ep-record-grid ep-record-grid--2">
              <div className="ep-card ep-card--flat"><h3 className="ep-font-md ep-fw-bold ep-mb-3">Atestado</h3><div className="ep-grid-2 ep-gap-4"><div className="ep-input-group"><label className="ep-label">Dias</label><input className="ep-input" value={atestado.dias} onChange={(event) => setAtestado({ ...atestado, dias: event.target.value })} /></div><div className="ep-input-group"><label className="ep-label">CID opcional</label><input className="ep-input" value={atestado.cid} onChange={(event) => setAtestado({ ...atestado, cid: event.target.value })} /></div></div><textarea className="ep-textarea" rows={5} value={atestado.finalidade} onChange={(event) => setAtestado({ ...atestado, finalidade: event.target.value })} /><button className="ep-btn ep-btn--primary ep-btn--sm ep-mt-4"><FaSignature /> Assinar atestado</button></div>
              <div className="ep-card ep-card--flat ep-document-preview"><div className="ep-text-sm ep-text-muted">Prévia</div><h3 className="ep-font-md ep-fw-bold ep-mb-3">{activeConsultation.paciente}</h3><p className="ep-text-sm ep-text-muted">{atestado.finalidade}</p><p className="ep-text-sm ep-text-muted">Afastamento: {atestado.dias} dia(s).</p></div>
            </div>
          )}

          {activeTab === 'solicitacoes' && selectedRecord && (
            <div className="ep-record-grid ep-record-grid--3">
              <div className="ep-card ep-card--flat"><h3 className="ep-font-md ep-fw-bold ep-mb-3">Receitas</h3>{selectedRecord.receitas.map((r) => <div key={r} className="ep-text-sm ep-text-muted ep-mb-2">{r}</div>)}</div>
              <div className="ep-card ep-card--flat"><h3 className="ep-font-md ep-fw-bold ep-mb-3">Exames</h3>{selectedRecord.exames.map((e) => <div key={e} className="ep-text-sm ep-text-muted ep-mb-2">{e}</div>)}<button className="ep-btn ep-btn--secondary ep-btn--sm ep-mt-4">Solicitar exame</button></div>
              <div className="ep-card ep-card--flat"><h3 className="ep-font-md ep-fw-bold ep-mb-3">Encaminhamentos</h3>{selectedRecord.encaminhamentos.map((e) => <div key={e} className="ep-text-sm ep-text-muted ep-mb-2">{e}</div>)}<button className="ep-btn ep-btn--secondary ep-btn--sm ep-mt-4">Novo encaminhamento</button></div>
            </div>
          )}

          {activeTab === 'arquivos' && selectedRecord && (
            <div className="ep-card ep-card--flat">
              <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaFileMedical /> <strong>Arquivos</strong></div>
              <div className="ep-flex-col ep-gap-3">{selectedRecord.arquivos.map((arquivo) => <div key={arquivo.nome} className="ep-file-row"><div><div className="ep-fw-bold">{arquivo.nome}</div><div className="ep-text-sm ep-text-muted">{arquivo.tipo} · {arquivo.data}</div></div><button className="ep-btn ep-btn--secondary ep-btn--sm"><FaDownload /> Abrir</button></div>)}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-3">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-primary)', color: 'white' }}>
              <FaUserMd />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="ep-text-sm ep-text-muted">Médicos</div>
              <h2 className="ep-font-lg ep-fw-bold">Consultas online</h2>
              <div className="ep-text-sm ep-text-muted">Salas Jitsi para teleconsulta, teleorientação e acompanhamento remoto.</div>
            </div>
          </div>
        </div>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Teleconsultas</div><div className="ep-font-xl ep-fw-bold">{teleconsultas.length}</div></div>
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Agendadas</div><div className="ep-font-xl ep-fw-bold">{teleconsultas.filter(t => t.origem === 'Agendamento').length}</div></div>
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Demandas espontâneas</div><div className="ep-font-xl ep-fw-bold">{teleconsultas.filter(t => t.origem === 'Demanda espontânea').length}</div></div>
        </div>

        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-2 ep-mb-4" style={{ color: 'var(--color-primary)' }}><FaFilter /> <strong>Filtros</strong></div>
          <div className="ep-grid-3 ep-gap-4">
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Buscar</label>
              <div className="ep-flex ep-items-center ep-gap-2 ep-input"><FaSearch className="ep-text-muted" /><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Paciente, motivo ou prioridade" style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} /></div>
            </div>
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Status</label>
              <select className="ep-select" value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value)}><option>Todos</option><option>Em atendimento</option><option>Aguardando paciente</option><option>Agendada</option></select>
            </div>
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Data</label>
              <select className="ep-select" value={selectedData || ''} onChange={(e) => setDataFiltro(e.target.value)}>
                {dataOptions.map((data) => <option key={data}>{data}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="ep-flex-col ep-gap-5">
          <div className="ep-record-tabs">
            <button className={filaTab === 'agendamentos' ? 'active' : ''} onClick={() => setFilaTab('agendamentos')}>
              Agendamentos
            </button>
            <button className={filaTab === 'demanda' ? 'active' : ''} onClick={() => setFilaTab('demanda')}>
              Demanda espontânea
            </button>
          </div>

          {filaTab === 'agendamentos' && Object.entries(agendamentosPorData).map(([data, registros]) => (
            <section key={data}>
              <div className="ep-flex ep-justify-between ep-items-center ep-mb-3">
                <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                  <div className="ep-text-xs ep-text-muted">Consultas online agendadas</div>
                  <h3 className="ep-font-md ep-fw-bold">{data}</h3>
                </div>
                <span className="ep-badge ep-badge--neutral">{registros.length} sala(s)</span>
              </div>
              <div className="ep-record-grid ep-record-grid--3">
                {registros.map((consulta) => (
                  <div key={consulta.id} className="ep-card ep-card--flat">
                    <div className="ep-flex ep-justify-between ep-items-start ep-gap-3 ep-mb-4">
                      <div>
                        <div className="ep-text-sm ep-text-muted">Paciente</div>
                        <h3 className="ep-font-md ep-fw-bold">{consulta.paciente}</h3>
                      </div>
                      <span className={`ep-badge ${consulta.prioridade === 'Atenção' ? 'ep-badge--warning' : 'ep-badge--success'}`}>{consulta.status}</span>
                    </div>
                    <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted ep-mb-3">
                      <FaCalendarAlt /> {consulta.data} às {consulta.horario}
                    </div>
                    <div className="ep-text-sm ep-text-muted ep-mb-6">{consulta.motivo}</div>
                    <button className="ep-btn ep-btn--primary ep-btn--full" onClick={() => { setActiveTab('rosto'); setActiveConsultation(consulta); }}>
                      <FaVideo /> Entrar na sala
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {filaTab === 'agendamentos' && Object.keys(agendamentosPorData).length === 0 && (
            <div className="ep-alert ep-alert--info" style={{ margin: 0 }}>Nenhuma consulta online agendada encontrada com os filtros selecionados.</div>
          )}

          {filaTab === 'demanda' && (
          <section>
            <div className="ep-flex ep-justify-between ep-items-center ep-mb-3">
              <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                <div className="ep-text-xs ep-text-muted">Fila separada</div>
                <h3 className="ep-font-md ep-fw-bold">Demandas espontâneas online</h3>
              </div>
              <span className="ep-badge ep-badge--primary">{demandasEspontaneas.length} aguardando</span>
            </div>
            <div className="ep-record-grid ep-record-grid--3">
              {demandasEspontaneas.map((consulta) => (
                <div key={consulta.id} className="ep-card ep-card--flat">
                  <div className="ep-flex ep-justify-between ep-items-start ep-gap-3 ep-mb-4">
                    <div>
                      <div className="ep-text-sm ep-text-muted">Paciente</div>
                      <h3 className="ep-font-md ep-fw-bold">{consulta.paciente}</h3>
                    </div>
                    <span className={`ep-badge ${consulta.prioridade === 'Atenção' ? 'ep-badge--warning' : 'ep-badge--success'}`}>{consulta.status}</span>
                  </div>
                  <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted ep-mb-3">
                    <FaCalendarAlt /> {consulta.data} · {consulta.horario}
                  </div>
                  <div className="ep-text-sm ep-text-muted ep-mb-6">{consulta.motivo}</div>
                  <button className="ep-btn ep-btn--primary ep-btn--full" onClick={() => { setActiveTab('rosto'); setActiveConsultation(consulta); }}>
                    <FaVideo /> Entrar na sala
                  </button>
                </div>
              ))}
            </div>
            {demandasEspontaneas.length === 0 && (
              <div className="ep-alert ep-alert--info" style={{ margin: 0 }}>Nenhuma demanda espontânea online encontrada com os filtros selecionados.</div>
            )}
          </section>
          )}

          {filteredConsultas.length === 0 && (
            <div className="ep-alert ep-alert--info" style={{ margin: 0 }}>Nenhuma teleconsulta encontrada com os filtros selecionados.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicosOnline;
