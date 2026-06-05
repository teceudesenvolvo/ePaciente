import React, { useState } from 'react';
import { FaSearch, FaCheck, FaTimes } from 'react-icons/fa';

const UBSRecepcao = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const pacientes = [
    { id: 1, nome: 'Maria Souza', servico: 'Dr. Marcos - Clínico', status: 'pendente', hora: '07:30' },
    { id: 2, nome: 'Carlos Eduardo', servico: 'Sala de Vacina', status: 'presente', hora: '08:15' },
    { id: 3, nome: 'Ana Rita', servico: 'Coleta de Sangue', status: 'pendente', hora: '08:30' },
  ];

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <h1 className="ep-page-title">Recepção / Check-in</h1>
      </div>
      
      <div className="ep-content">
        <div className="ep-input-group">
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', top: 16, left: 16, color: 'var(--color-n400)' }} />
            <input 
              type="text" 
              className="ep-input" 
              placeholder="Buscar por Nome, CPF ou CNS" 
              style={{ paddingLeft: 44 }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="ep-section-header ep-mt-6">
          <h3 className="ep-section-title">Pacientes do Dia</h3>
          <span className="ep-badge ep-badge--primary">3 aguardando</span>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {pacientes.map(p => (
            <div key={p.id} className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between">
                <div>
                  <div className="ep-fw-bold">{p.nome}</div>
                  <div className="ep-text-sm ep-text-muted">{p.hora} · {p.servico}</div>
                </div>
                <div>
                  {p.status === 'presente' ? (
                    <span className="ep-badge ep-badge--success">Presente</span>
                  ) : (
                    <div className="ep-flex ep-gap-2">
                      <button className="ep-btn ep-btn--sm ep-btn--ghost" style={{ padding: '8px', color: 'var(--color-error)' }}><FaTimes /></button>
                      <button className="ep-btn ep-btn--sm ep-btn--primary" style={{ padding: '8px 12px' }}><FaCheck /> Check-in</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UBSRecepcao;
