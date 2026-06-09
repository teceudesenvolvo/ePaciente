import React, { useMemo, useState } from 'react';
import { FaCheck, FaFilePrescription, FaPills, FaPrint, FaSearch, FaTimes } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';

const prescricoes = [
  { protocolo: 'CONS-0900-001', paciente: 'Maria Oliveira', medico: 'Dr. Ricardo Santos', origem: 'Consulta médica', status: 'Aguardando dispensação', medicamentos: ['Losartana 50mg · 30 comprimidos', 'Metformina 850mg · 60 comprimidos'] },
  { protocolo: 'CONS-0940-002', paciente: 'João Batista', medico: 'Dr. Ricardo Santos', origem: 'Consulta online', status: 'Separando', medicamentos: ['Salbutamol spray · 1 unidade', 'Prednisona 20mg · 10 comprimidos'] },
  { protocolo: 'CONS-1020-003', paciente: 'Ana Clara', medico: 'Dra. Ana Júlia', origem: 'Pré-natal', status: 'Entregue', medicamentos: ['Ácido fólico · 30 comprimidos'] },
];

const FarmaciaMedicamentos = () => {
  const [prescriptionList, setPrescriptionList] = useState(prescricoes);
  const [busca, setBusca] = useState('');
  const [selected, setSelected] = useState(prescricoes[0]);
  const [receipt, setReceipt] = useState(null);
  const filtered = useMemo(() => prescriptionList.filter((item) => `${item.protocolo} ${item.paciente} ${item.medico}`.toLowerCase().includes(busca.toLowerCase())), [busca, prescriptionList]);

  const updateStatus = (nextStatus) => {
    const updated = { ...selected, status: nextStatus };
    setPrescriptionList(prescriptionList.map((item) => item.protocolo === selected.protocolo ? updated : item));
    setSelected(updated);
    if (nextStatus === 'Entregue') setReceipt(updated);
  };

  return (
    <div className="ep-page">
      <HeaderTop />
      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-3">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-success)', color: 'white' }}><FaPills /></div>
            <div style={{ textAlign: 'left' }}>
              <div className="ep-text-sm ep-text-muted">Farmácia</div>
              <h2 className="ep-font-xl ep-fw-bold">Sala de medicações</h2>
              <div className="ep-text-sm ep-text-muted">Recebe prescrições emitidas nas consultas e localiza por paciente ou protocolo.</div>
            </div>
          </div>
        </div>

        <div className="ep-record-grid ep-record-grid--2">
          <div className="ep-card ep-card--flat">
            <div className="ep-input-group">
              <label className="ep-label">Buscar por nome ou protocolo</label>
              <div className="ep-flex ep-items-center ep-gap-2 ep-input"><FaSearch className="ep-text-muted" /><input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="CONS-0900-001 ou Maria" style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} /></div>
            </div>
            <div className="ep-flex-col ep-gap-3">
              {filtered.map((item) => (
                <button key={item.protocolo} className="ep-patient-list-item" onClick={() => setSelected(item)}>
                  <div className="ep-avatar ep-avatar--sm" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}><FaFilePrescription /></div>
                  <div style={{ flex: 1 }}>
                    <div className="ep-fw-bold">{item.paciente}</div>
                    <div className="ep-text-sm ep-text-muted">{item.protocolo} · {item.origem}</div>
                  </div>
                  <span className="ep-badge ep-badge--primary">{item.status}</span>
                </button>
              ))}
            </div>
          </div>

          {selected && (
            <div className="ep-card ep-card--flat">
              <div className="ep-text-sm ep-text-muted">Prescrição selecionada</div>
              <h3 className="ep-font-lg ep-fw-bold">{selected.paciente}</h3>
              <div className="ep-text-sm ep-text-muted ep-mb-4">{selected.protocolo} · {selected.medico}</div>
              <div className="ep-flex-col ep-gap-3">
                {selected.medicamentos.map((med) => (
                  <div key={med} className="ep-prescription-item"><strong>{med}</strong><span>Conferir estoque, lote e validade antes da entrega.</span></div>
                ))}
              </div>
              <div className="ep-record-actions ep-mt-4">
                <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => updateStatus('Separando')}><FaPills /> Separar medicação</button>
                <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={() => updateStatus('Entregue')}><FaCheck /> Confirmar dispensação</button>
                <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => setReceipt(selected)}><FaPrint /> Recibo</button>
              </div>
            </div>
          )}
        </div>

      </div>

      {receipt && (
        <div className="ep-modal-overlay" onClick={() => setReceipt(null)}>
          <div className="ep-modal" style={{ maxWidth: 520 }} onClick={(event) => event.stopPropagation()}>
            <div className="ep-flex ep-justify-between ep-items-start ep-gap-4 ep-mb-6">
              <div><div className="ep-text-sm ep-text-muted">Farmácia</div><h2 className="ep-modal-title">Recibo de dispensação</h2></div>
              <button className="ep-btn ep-btn--ghost ep-btn--icon" type="button" onClick={() => setReceipt(null)}><FaTimes /></button>
            </div>
            <div className="ep-card ep-card--flat ep-mb-4">
              <strong>{receipt.paciente}</strong>
              <div className="ep-text-sm ep-text-muted">{receipt.protocolo} · {receipt.medico}</div>
            </div>
            <div className="ep-flex-col ep-gap-3">
              {receipt.medicamentos.map((med) => <div key={med} className="ep-prescription-item"><strong>{med}</strong><span>Dispensado pela farmácia da unidade.</span></div>)}
            </div>
            <div className="ep-modal-footer"><button className="ep-btn ep-btn--secondary" onClick={() => window.print()}><FaPrint /> Imprimir</button><button className="ep-btn ep-btn--primary" onClick={() => setReceipt(null)}>Concluir</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmaciaMedicamentos;
