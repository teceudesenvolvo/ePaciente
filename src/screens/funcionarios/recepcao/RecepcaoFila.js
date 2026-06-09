import React, { useState } from 'react';
import { FaPlus, FaUserClock, FaUserNurse } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';

const initialQueue = [
  { senha: 'E001', paciente: 'Carlos Alberto', origem: 'Demanda espontânea', queixa: 'Febre e dor no corpo', prioridade: 'Amarelo', status: 'Aguardando triagem' },
  { senha: 'E002', paciente: 'Lúcia Silva', origem: 'Demanda espontânea', queixa: 'Renovação de receita', prioridade: 'Verde', status: 'Aguardando triagem' },
  { senha: 'E003', paciente: 'Pedro Henrique', origem: 'Demanda espontânea', queixa: 'Falta de ar', prioridade: 'Vermelho', status: 'Triagem imediata' },
];

const priorityClass = (value) => value === 'Vermelho' ? 'ep-badge--warning' : value === 'Amarelo' ? 'ep-badge--primary' : 'ep-badge--success';

const RecepcaoFila = () => {
  const [queue, setQueue] = useState(initialQueue);

  const addSpontaneous = () => {
    const next = String(queue.length + 1).padStart(3, '0');
    setQueue([{ senha: `E${next}`, paciente: 'Novo paciente', origem: 'Demanda espontânea', queixa: 'Acolhimento inicial', prioridade: 'Verde', status: 'Aguardando triagem' }, ...queue]);
  };

  return (
    <div className="ep-page">
      <HeaderTop />
      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-justify-between ep-items-center ep-gap-4" style={{ flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'left' }}>
              <div className="ep-text-sm ep-text-muted">Recepção</div>
              <h2 className="ep-font-xl ep-fw-bold">Demanda espontânea e triagem</h2>
              <div className="ep-text-sm ep-text-muted">Inicie acolhimentos sem agendamento e direcione para a fila da enfermagem.</div>
            </div>
            <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={addSpontaneous}><FaPlus /> Iniciar demanda espontânea</button>
          </div>
        </div>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Na fila</div><div className="ep-font-xl ep-fw-bold">{queue.length}</div></div>
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Prioridade alta</div><div className="ep-font-xl ep-fw-bold">{queue.filter(q => q.prioridade === 'Vermelho').length}</div></div>
          <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Para triagem</div><div className="ep-font-xl ep-fw-bold">{queue.filter(q => q.status.includes('triagem')).length}</div></div>
        </div>

        <div className="ep-record-grid ep-record-grid--2">
          {queue.map((item) => (
            <div key={item.senha} className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-start ep-gap-3">
                <div>
                  <div className="ep-flex ep-items-center ep-gap-2 ep-fw-bold"><FaUserClock /> {item.senha} · {item.paciente}</div>
                  <div className="ep-text-sm ep-text-muted ep-mt-2">{item.origem} · {item.queixa}</div>
                  <div className="ep-text-sm ep-text-muted ep-mt-1">{item.status}</div>
                </div>
                <span className={`ep-badge ${priorityClass(item.prioridade)}`}>{item.prioridade}</span>
              </div>
              <div className="ep-record-actions ep-mt-4">
                <button className="ep-btn ep-btn--primary ep-btn--sm"><FaUserNurse /> Encaminhar triagem</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecepcaoFila;
