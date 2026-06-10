import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaFilter, FaPlay, FaSearch, FaUserNurse } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';
import { statusClass } from '../FuncionarioPage';

export const triagemQueue = [
  { senha: 'E003', paciente: 'Pedro Henrique', data: '10/06/2026', horario: '08:20', origem: 'Demanda espontânea', queixa: 'Falta de ar', prioridade: 'Vermelho', status: 'Aguardando triagem', unidade: 'UBS Centro' },
  { senha: 'E004', paciente: 'Carlos Alberto', data: '10/06/2026', horario: '08:35', origem: 'Demanda espontânea', queixa: 'Febre e dor no corpo', prioridade: 'Amarelo', status: 'Aguardando triagem', unidade: 'UBS Centro' },
  { senha: 'A018', paciente: 'Maria Oliveira', data: '10/06/2026', horario: '09:00', origem: 'Agendamento', queixa: 'Consulta clínica programada', prioridade: 'Verde', status: 'Aguardando triagem', unidade: 'UBS Centro' },
  { senha: 'A019', paciente: 'João Batista', data: '10/06/2026', horario: '09:40', origem: 'Agendamento', queixa: 'Reavaliação respiratória', prioridade: 'Amarelo', status: 'Aguardando triagem', unidade: 'UBS Centro' },
  { senha: 'A020', paciente: 'Ana Clara', data: '11/06/2026', horario: '10:20', origem: 'Agendamento', queixa: 'Pré-natal', prioridade: 'Verde', status: 'Aguardando triagem', unidade: 'UBS Centro' },
];

const priorityBadge = {
  Vermelho: 'ep-badge--danger',
  Amarelo: 'ep-badge--warning',
  Verde: 'ep-badge--success',
  Azul: 'ep-badge--primary',
};

const EnfermeirosTriagem = () => {
  const history = useHistory();
  const [queue, setQueue] = useState(triagemQueue);
  const [busca, setBusca] = useState('');
  const [dataFiltro, setDataFiltro] = useState(triagemQueue[0]?.data || '');
  const [origemTab, setOrigemTab] = useState('demanda');
  const dataOptions = useMemo(() => Array.from(new Set(queue.map((item) => item.data))), [queue]);
  const selectedData = dataOptions.includes(dataFiltro) ? dataFiltro : dataOptions[0];
  const origemFiltro = origemTab === 'demanda' ? 'Demanda espontânea' : 'Agendamento';
  const filteredQueue = queue.filter((item) => {
    const query = `${item.senha} ${item.paciente} ${item.queixa} ${item.prioridade} ${item.status}`.toLowerCase();
    return item.data === selectedData && item.origem === origemFiltro && query.includes(busca.toLowerCase());
  });
  const nextPatient = queue.find((item) => item.data === selectedData && item.status === 'Aguardando triagem');

  const openTriagem = (item) => {
    history.push({
      pathname: `/funcionarios/enfermeiros/triagem/${encodeURIComponent(item.paciente)}`,
      state: { triagem: item },
    });
  };

  const callNext = () => {
    if (!nextPatient) return;
    setQueue(queue.map((item) => (
      item.senha === nextPatient.senha ? { ...item, status: 'Chamando triagem' } : item
    )));
  };

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--flat ep-mb-6" style={{ borderLeft: '4px solid var(--color-primary)' }}>
          <div className="ep-flex ep-items-center ep-gap-3">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-primary)', color: 'white' }}>
              <FaUserNurse />
            </div>
            <div style={{ flex: 1 }}>
              <div className="ep-text-sm ep-text-muted">Enfermeiros</div>
              <h2 className="ep-font-lg ep-fw-bold">Triagem de enfermagem</h2>
              <div className="ep-text-sm ep-text-muted">Fila de acolhimento com chamada e registro dos sinais vitais.</div>
            </div>
            <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={callNext} disabled={!nextPatient}>
              <FaPlay /> Chamar próximo
            </button>
          </div>
        </div>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Para triagem</div><div className="ep-font-xl ep-fw-bold">{queue.filter((item) => item.data === selectedData && item.status.includes('Aguardando')).length}</div></div>
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Chamando</div><div className="ep-font-xl ep-fw-bold">{queue.filter((item) => item.status.includes('Chamando')).length}</div></div>
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Prioridade alta</div><div className="ep-font-xl ep-fw-bold">{queue.filter((item) => ['Vermelho', 'Amarelo'].includes(item.prioridade)).length}</div></div>
        </div>

        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-2 ep-mb-4" style={{ color: 'var(--color-primary)' }}>
            <FaFilter />
            <strong>Filtros</strong>
          </div>
          <div className="ep-grid-2 ep-gap-4">
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Buscar</label>
              <div className="ep-flex ep-items-center ep-gap-2 ep-input">
                <FaSearch className="ep-text-muted" />
                <input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Paciente, senha ou queixa" style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
              </div>
            </div>
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Data</label>
              <select className="ep-select" value={selectedData || ''} onChange={(event) => setDataFiltro(event.target.value)}>
                {dataOptions.map((data) => <option key={data}>{data}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="ep-record-tabs">
          <button className={origemTab === 'demanda' ? 'active' : ''} onClick={() => setOrigemTab('demanda')}>Demanda espontânea</button>
          <button className={origemTab === 'agendamentos' ? 'active' : ''} onClick={() => setOrigemTab('agendamentos')}>Agendamentos</button>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {filteredQueue.map((item) => (
            <div key={item.senha} className="ep-card ep-card--flat" role="button" tabIndex={0} onClick={() => openTriagem(item)} onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openTriagem(item);
              }
            }} style={{ cursor: 'pointer' }}>
              <div className="ep-flex ep-justify-between ep-items-center ep-gap-4">
                <div>
                  <div className="ep-text-xs ep-text-muted">{item.senha} · {item.unidade} · {item.horario}</div>
                  <div className="ep-fw-bold ep-mt-1">{item.paciente}</div>
                  <div className="ep-text-sm ep-mt-1">{item.queixa}</div>
                  <div className="ep-text-sm ep-text-muted ep-mt-1">{item.origem}</div>
                </div>
                <div className="ep-flex ep-items-center ep-gap-2" style={{ flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <span className={`ep-badge ${priorityBadge[item.prioridade] || 'ep-badge--neutral'}`}>{item.prioridade}</span>
                  <span className={`ep-badge ${statusClass(item.status)}`}>{item.status}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredQueue.length === 0 && (
            <div className="ep-alert ep-alert--info" style={{ margin: 0 }}>Nenhum paciente encontrado para a data e origem selecionadas.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnfermeirosTriagem;
