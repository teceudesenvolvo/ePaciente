import React, { useState } from 'react';
import { FaCapsules, FaSearch, FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const Medicamentos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const unidadeReferencia = 'UBS Centro';

  const listaMedicamentos = [
    { id: 1, nome: "Amoxicilina 500mg", categoria: "Antibiótico", estoque: 38, minimo: 30 },
    { id: 2, nome: "Dipirona Monoidratada 500mg", categoria: "Analgésico", estoque: 420, minimo: 120 },
    { id: 3, nome: "Losartana Potássica 50mg", categoria: "Hipertensão", estoque: 24, minimo: 50 },
    { id: 4, nome: "Insulina NPH", categoria: "Diabetes", estoque: 18, minimo: 12 },
    { id: 5, nome: "Paracetamol 750mg", categoria: "Analgésico", estoque: 0, minimo: 80 },
    { id: 6, nome: "Sinvastatina 20mg", categoria: "Colesterol", estoque: 86, minimo: 40 },
  ];

  const medicamentosDaUbs = listaMedicamentos.map((item) => {
    if (item.estoque <= 0) return { ...item, status: 'Indisponível', cor: 'error' };
    if (item.estoque <= item.minimo) return { ...item, status: 'Estoque Baixo', cor: 'warning' };
    return { ...item, status: 'Em Estoque', cor: 'success' };
  });

  const filteredMedicamentos = medicamentosDaUbs.filter(m => 
    m.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    if (status === 'Em Estoque') return <FaCheckCircle />;
    if (status === 'Estoque Baixo') return <FaExclamationTriangle />;
    return <FaTimesCircle />;
  };

  return (
    <div className="ep-page" style={{ background: '#f5f5f7' }}>
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-3">
            <div className="ep-icon-wrapper" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', width: '48px', height: '48px' }}>
              <FaMapMarkerAlt />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="ep-text-sm ep-text-muted">Unidade de referência</div>
              <h2 className="ep-font-lg ep-fw-bold">{unidadeReferencia}</h2>
              <div className="ep-text-sm ep-text-muted">A disponibilidade abaixo é exibida somente para esta UBS.</div>
            </div>
          </div>
        </div>

        <div className="ep-mb-6">
          <div className="ep-input-group" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 18, left: 16, color: 'var(--color-n400)' }}>
              <FaSearch />
            </div>
            <input 
              type="text" 
              className="ep-input" 
              placeholder="Buscar medicamento ou categoria..." 
              style={{ paddingLeft: 44, borderRadius: '16px', height: '54px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="ep-grid-2 ep-gap-4">
          {filteredMedicamentos.map((item) => (
            <div key={item.id} className="ep-card ep-card--flat" style={{ padding: 'var(--sp-5)' }}>
              <div className="ep-flex ep-justify-between ep-items-start ep-mb-4">
                <div className="ep-flex ep-gap-3 ep-items-center">
                  <div className="ep-icon-wrapper" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', width: '44px', height: '44px' }}>
                    <FaCapsules />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h3 className="ep-font-md ep-fw-bold">{item.nome}</h3>
                    <p className="ep-text-xs ep-text-muted ep-fw-medium" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {item.categoria}
                    </p>
                  </div>
                </div>
                <span className={`ep-badge ep-badge--${item.cor} ep-flex ep-items-center ep-gap-1`}>
                  {getStatusIcon(item.status)} {item.status}
                </span>
              </div>

              <div className="ep-divider ep-my-3"></div>
              
              <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted">
                <FaMapMarkerAlt size={12} className="ep-text-primary" />
                <span className="ep-fw-medium">Unidade:</span> {unidadeReferencia}
              </div>
              <div className="ep-text-xs ep-text-muted ep-mt-2">Saldo informado pela farmácia da unidade: {item.estoque} unidade(s)</div>
            </div>
          ))}
        </div>

        {filteredMedicamentos.length === 0 && (
          <div className="ep-text-center ep-py-10">
            <p className="ep-text-muted">Nenhum medicamento encontrado para "{searchTerm}"</p>
          </div>
        )}

        <div className="ep-alert ep-alert--info ep-mt-8">
          <div className="ep-alert__text">A disponibilidade é limitada à sua UBS de referência e pode variar ao longo do dia. Leve sua receita e documento para retirada.</div>
        </div>
      </div>
    </div>
  );
};

export default Medicamentos;
