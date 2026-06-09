import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { FaCheck, FaGasPump, FaMapMarkedAlt, FaRoute, FaTools, FaTimes } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';
import '../../../utils/chartSetup';

const solicitacoesBase = [
  { id: 101, paciente: 'Antônio Marcos', origem: 'Sítio das Pedras', destino: 'Hospital Municipal', data: '12/06', just: 'Hemodiálise', prioridade: 'Alta', status: 'pendente' },
  { id: 102, paciente: 'Lúcia Silva', origem: 'Bairro Alto', destino: 'Clínica Visão', data: '13/06', just: 'Cirurgia Catarata', prioridade: 'Normal', status: 'aprovado', veiculo: 'VAN-04' },
  { id: 103, paciente: 'Maria de Lourdes', origem: 'Centro', destino: 'Fortaleza', data: '14/06', just: 'Consulta cardiologia', prioridade: 'Normal', status: 'pendente' },
];

const veiculosDisponiveis = ['AMB-01', 'VAN-04', 'VAN-07', 'CAR-12'];

const FrotasGestao = () => {
  const history = useHistory();
  const [solicitacoes, setSolicitacoes] = useState(solicitacoesBase);

  const handleStatus = (id, status) => {
    setSolicitacoes(solicitacoes.map((item) => (
      item.id === id
        ? { ...item, status, veiculo: status === 'aprovado' ? item.veiculo || 'VAN-04' : item.veiculo }
        : item
    )));
  };

  const handleVeiculo = (id, veiculo) => {
    setSolicitacoes(solicitacoes.map((item) => (
      item.id === id ? { ...item, veiculo } : item
    )));
  };

  const pendentes = solicitacoes.filter((item) => item.status === 'pendente');
  const aprovados = solicitacoes.filter((item) => item.status === 'aprovado');
  const recusados = solicitacoes.filter((item) => item.status === 'recusado');

  const atalhos = [
    { label: 'Combustíveis', icon: <FaGasPump />, path: '/funcionarios/frotas/combustiveis' },
    { label: 'Manutenção', icon: <FaTools />, path: '/funcionarios/frotas/manutencao' },
    { label: 'Rastreio', icon: <FaMapMarkedAlt />, path: '/funcionarios/frotas/rastreio' },
  ];

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--primary ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-3">
            <FaRoute style={{ fontSize: 24 }} />
            <div style={{ flex: 1 }}>
              <h3 className="ep-font-lg ep-fw-bold">Operação de transporte</h3>
              <p className="ep-text-sm" style={{ opacity: 0.9 }}>Triagem, alocação de veículo e acompanhamento das rotas do dia.</p>
            </div>
            <div style={{ width: 74, height: 74 }}>
              <Doughnut
                data={{ labels: ['Em rota', 'Disponíveis'], datasets: [{ data: [9, 5], backgroundColor: ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.28)'], borderWidth: 0 }] }}
                options={{ cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }}
              />
            </div>
          </div>
        </div>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          {atalhos.map((atalho) => (
            <button key={atalho.path} className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-3" onClick={() => history.push(atalho.path)} style={{ border: '1.5px solid var(--color-n200)', cursor: 'pointer', textAlign: 'left' }}>
              <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-primary)', color: 'white' }}>{atalho.icon}</div>
              <div>
                <div className="ep-fw-bold">{atalho.label}</div>
                <div className="ep-text-xs ep-text-muted">Abrir painel</div>
              </div>
            </button>
          ))}
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Solicitações pendentes ({pendentes.length})</h3>
        </div>

        <div className="ep-flex-col ep-gap-4">
          {pendentes.map((item) => (
            <div key={item.id} className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-gap-4">
                <div>
                  <div className="ep-fw-bold">{item.paciente}</div>
                  <div className="ep-text-sm ep-text-muted ep-mt-1">Data: {item.data} · Prioridade: {item.prioridade}</div>
                  <div className="ep-text-sm ep-mt-2"><strong>De:</strong> {item.origem}<br /><strong>Para:</strong> {item.destino}</div>
                  <div className="ep-text-sm ep-mt-2 ep-p-2" style={{ background: 'var(--color-n50)', borderRadius: 4 }}>
                    <strong>Justificativa:</strong> {item.just}
                  </div>
                </div>
                <div style={{ minWidth: 180 }}>
                  <label className="ep-label">Veículo sugerido</label>
                  <select className="ep-select" value={item.veiculo || 'VAN-04'} onChange={(event) => handleVeiculo(item.id, event.target.value)}>
                    {veiculosDisponiveis.map((veiculo) => <option key={veiculo}>{veiculo}</option>)}
                  </select>
                </div>
              </div>
              <div className="ep-flex ep-gap-2 ep-mt-4">
                <button className="ep-btn ep-btn--ghost ep-btn--full" style={{ color: 'var(--color-error)' }} onClick={() => handleStatus(item.id, 'recusado')}><FaTimes /> Recusar</button>
                <button className="ep-btn ep-btn--primary ep-btn--full" onClick={() => handleStatus(item.id, 'aprovado')}><FaCheck /> Aprovar e Alocar</button>
              </div>
            </div>
          ))}
          {pendentes.length === 0 && <div className="ep-alert ep-alert--success">Todas as solicitações foram tratadas.</div>}
        </div>

        <div className="ep-section-header ep-mt-6">
          <h3 className="ep-section-title">Aprovados recentes</h3>
        </div>
        <div className="ep-flex-col ep-gap-3">
          {aprovados.map((item) => (
            <div key={item.id} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center">
              <div>
                <div className="ep-fw-bold">{item.paciente}</div>
                <div className="ep-text-xs ep-text-muted">{item.origem} → {item.destino}</div>
              </div>
              <span className="ep-badge ep-badge--success">{item.veiculo || 'VAN-04'}</span>
            </div>
          ))}
        </div>

        {recusados.length > 0 && (
          <>
            <div className="ep-section-header ep-mt-6">
              <h3 className="ep-section-title">Recusados</h3>
            </div>
            <div className="ep-flex-col ep-gap-3">
              {recusados.map((item) => (
                <div key={item.id} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center">
                  <div>
                    <div className="ep-fw-bold">{item.paciente}</div>
                    <div className="ep-text-xs ep-text-muted">{item.origem} → {item.destino}</div>
                  </div>
                  <span className="ep-badge ep-badge--error">Recusado</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FrotasGestao;
