import React, { useState } from 'react';
import { FaBoxOpen, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

const UBSEstoque = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const inventario = [
    { id: 1, item: 'Dipirona 500mg', lote: 'A45G', validade: '12/2027', qtd: 450, status: 'ok' },
    { id: 2, item: 'Luvas de Procedimento P', lote: 'B99K', validade: '05/2028', qtd: 12, status: 'critico' },
    { id: 3, item: 'Amoxicilina 500mg', lote: 'C12P', validade: '08/2026', qtd: 85, status: 'ok' },
    { id: 4, item: 'Seringa 5ml', lote: 'X09L', validade: '01/2025', qtd: 200, status: 'vencendo' },
  ];

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <h1 className="ep-page-title">Estoque da Unidade</h1>
      </div>
      
      <div className="ep-content">
        <div className="ep-grid-2 ep-mb-6">
          <button className="ep-btn ep-btn--primary ep-btn--full">Nova Entrada</button>
          <button className="ep-btn ep-btn--secondary ep-btn--full">Registrar Saída</button>
        </div>

        <div className="ep-input-group">
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', top: 16, left: 16, color: 'var(--color-n400)' }} />
            <input 
              type="text" 
              className="ep-input" 
              placeholder="Buscar medicamento ou insumo" 
              style={{ paddingLeft: 44 }}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="ep-section-header ep-mt-6">
          <h3 className="ep-section-title">Inventário</h3>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {inventario.map(i => (
            <div key={i.id} className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between">
                <div>
                  <div className="ep-fw-bold ep-flex ep-items-center ep-gap-2">
                    {i.item}
                    {i.status === 'critico' && <FaExclamationTriangle style={{ color: 'var(--color-error)' }} />}
                  </div>
                  <div className="ep-text-sm ep-text-muted">Lote: {i.lote} · Validade: {i.validade}</div>
                </div>
                <div className="ep-text-right">
                  <div className="ep-font-lg ep-fw-bold">{i.qtd}</div>
                  <div className="ep-text-xs ep-text-muted">unid.</div>
                </div>
              </div>
              {i.status === 'critico' && (
                <div className="ep-mt-3 ep-text-xs ep-text-error ep-fw-semibold">
                  Estoque abaixo do mínimo recomendado (50 unid). Solicite reposição.
                </div>
              )}
              {i.status === 'vencendo' && (
                <div className="ep-mt-3 ep-text-xs ep-text-warning ep-fw-semibold">
                  Atenção: Lote próximo ao vencimento.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UBSEstoque;
