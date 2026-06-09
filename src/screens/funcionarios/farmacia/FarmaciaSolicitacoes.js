import React, { useState } from 'react';
import { FaCalendarTimes, FaCheck, FaExclamationTriangle, FaFileAlt, FaTimes, FaTruckLoading } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';

const initialAlertas = [
  { item: 'Amoxicilina 500mg', motivo: 'Estoque mínimo', saldo: 38, necessidade: 200, prioridade: 'Alta' },
  { item: 'Dipirona 500mg', motivo: 'Validade próxima', saldo: 72, necessidade: 150, prioridade: 'Média' },
  { item: 'Soro fisiológico 0,9%', motivo: 'Consumo acima da média', saldo: 44, necessidade: 180, prioridade: 'Alta' },
];

const FarmaciaSolicitacoes = () => {
  const [alertas, setAlertas] = useState(initialAlertas.map((item) => ({ ...item, status: 'Pendente' })));
  const [reportOpen, setReportOpen] = useState(false);

  const solicitar = (alerta) => {
    setAlertas(alertas.map((item) => item.item === alerta.item ? { ...item, status: 'Solicitado' } : item));
  };

  return (
    <div className="ep-page">
      <HeaderTop />
      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-justify-between ep-items-center ep-gap-4" style={{ flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'left' }}>
              <div className="ep-text-sm ep-text-muted">Farmácia</div>
              <h2 className="ep-font-xl ep-fw-bold">Solicitações e reposição</h2>
              <div className="ep-text-sm ep-text-muted">Relatórios para compras, reposição entre unidades e alertas operacionais.</div>
            </div>
            <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={() => setReportOpen(true)}><FaFileAlt /> Gerar relatório</button>
          </div>
        </div>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat"><FaExclamationTriangle color="var(--color-warning)" /><div className="ep-text-sm ep-text-muted ep-mt-2">Alertas ativos</div><div className="ep-font-xl ep-fw-bold">{alertas.length}</div></div>
          <div className="ep-card ep-card--flat"><FaTruckLoading color="var(--color-primary)" /><div className="ep-text-sm ep-text-muted ep-mt-2">Itens a repor</div><div className="ep-font-xl ep-fw-bold">{alertas.reduce((sum, item) => sum + item.necessidade, 0)}</div></div>
          <div className="ep-card ep-card--flat"><FaCalendarTimes color="var(--color-danger)" /><div className="ep-text-sm ep-text-muted ep-mt-2">Validade próxima</div><div className="ep-font-xl ep-fw-bold">{alertas.filter(a => a.motivo === 'Validade próxima').length}</div></div>
        </div>

        <div className="ep-card ep-card--flat">
          <h3 className="ep-font-md ep-fw-bold ep-mb-4">Relatório de solicitação</h3>
          <div className="ep-flex-col ep-gap-3">
            {alertas.map((alerta) => (
              <div key={alerta.item} className="ep-problem-row">
                <div>
                  <strong>{alerta.item}</strong>
                  <div className="ep-text-sm ep-text-muted">{alerta.motivo} · Saldo: {alerta.saldo} · Solicitar: {alerta.necessidade}</div>
                </div>
                <div className="ep-record-actions">
                  <span className={`ep-badge ${alerta.prioridade === 'Alta' ? 'ep-badge--warning' : 'ep-badge--primary'}`}>{alerta.status}</span>
                  <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => solicitar(alerta)}><FaTruckLoading /> Solicitar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {reportOpen && (
        <div className="ep-modal-overlay" onClick={() => setReportOpen(false)}>
          <div className="ep-modal" style={{ maxWidth: 640 }} onClick={(event) => event.stopPropagation()}>
            <div className="ep-flex ep-justify-between ep-items-start ep-gap-4 ep-mb-6">
              <div><div className="ep-text-sm ep-text-muted">Farmácia</div><h2 className="ep-modal-title">Relatório de reposição</h2></div>
              <button className="ep-btn ep-btn--ghost ep-btn--icon" type="button" onClick={() => setReportOpen(false)}><FaTimes /></button>
            </div>
            <div className="ep-flex-col ep-gap-3">
              {alertas.map((alerta) => (
                <div key={alerta.item} className="ep-prescription-item">
                  <strong>{alerta.item}</strong>
                  <span>{alerta.motivo} · Saldo {alerta.saldo} · Reposição sugerida {alerta.necessidade} · Prioridade {alerta.prioridade}</span>
                </div>
              ))}
            </div>
            <div className="ep-modal-footer"><button className="ep-btn ep-btn--secondary" onClick={() => window.print()}><FaFileAlt /> Imprimir</button><button className="ep-btn ep-btn--primary" onClick={() => setReportOpen(false)}><FaCheck /> Concluir</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmaciaSolicitacoes;
