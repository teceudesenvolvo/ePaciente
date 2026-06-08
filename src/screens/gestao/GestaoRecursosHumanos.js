import React from 'react';
import { FaBriefcaseMedical, FaCalendarCheck, FaFileSignature, FaIdBadge, FaPlus, FaSearch, FaUserTie } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const colaboradores = [
  { nome: 'Ana Paula Mendes', cargo: 'Enfermeira', unidade: 'UBS Centro', vinculo: 'Efetivo', status: 'Ativo' },
  { nome: 'Rafael Oliveira', cargo: 'Motorista', unidade: 'Transporte Sanitário', vinculo: 'Contrato', status: 'Ativo' },
  { nome: 'Cláudia Martins', cargo: 'Recepcionista', unidade: 'Hospital Municipal', vinculo: 'Temporário', status: 'Férias' },
];

const indicadores = [
  { label: 'Servidores ativos', value: '214', icon: <FaUserTie />, tone: 'var(--color-success)' },
  { label: 'Escalas abertas', value: '18', icon: <FaCalendarCheck />, tone: 'var(--color-primary)' },
  { label: 'Contratos a vencer', value: '7', icon: <FaFileSignature />, tone: 'var(--color-warning)' },
];

const GestaoRecursosHumanos = () => {
  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-flex ep-gap-3 ep-mb-6">
          <div className="ep-input-group" style={{ flex: 1, marginBottom: 0 }}>
            <div className="ep-flex ep-items-center ep-gap-2 ep-input">
              <FaSearch className="ep-text-muted" />
              <input type="text" placeholder="Buscar colaborador, cargo ou unidade" style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
            </div>
          </div>
          <button className="ep-btn ep-btn--primary" aria-label="Novo colaborador">
            <FaPlus />
          </button>
        </div>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          {indicadores.map((item) => (
            <div key={item.label} className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
              <div className="ep-avatar ep-avatar--md" style={{ background: item.tone, color: 'white' }}>
                {item.icon}
              </div>
              <div>
                <div className="ep-text-sm ep-text-muted">{item.label}</div>
                <div className="ep-font-xl ep-fw-bold ep-mt-1">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="ep-grid-2 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--primary">
            <div className="ep-flex ep-items-center ep-gap-3 ep-mb-3">
              <FaBriefcaseMedical style={{ fontSize: 24 }} />
              <h3 className="ep-font-lg ep-fw-bold">Quadro da saúde</h3>
            </div>
            <p className="ep-text-sm" style={{ opacity: 0.92 }}>Distribuição por vínculo, cargo e unidade para apoiar remanejamentos e escalas.</p>
          </div>

          <div className="ep-card ep-card--flat">
            <h3 className="ep-font-lg ep-fw-bold ep-mb-3">Pendências do RH</h3>
            <div className="ep-flex-col ep-gap-2">
              <span className="ep-badge ep-badge--warning">5 admissões aguardando documentação</span>
              <span className="ep-badge ep-badge--primary">12 avaliações de desempenho em aberto</span>
              <span className="ep-badge ep-badge--success">Folha preliminar validada</span>
            </div>
          </div>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Colaboradores</h3>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {colaboradores.map((colaborador) => (
            <div key={colaborador.nome} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center">
              <div className="ep-flex ep-items-center ep-gap-3">
                <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-success)', color: 'white' }}>
                  <FaIdBadge />
                </div>
                <div>
                  <div className="ep-fw-bold">{colaborador.nome}</div>
                  <div className="ep-text-xs ep-text-muted">{colaborador.cargo} · {colaborador.unidade}</div>
                  <div className="ep-text-xs ep-mt-1">{colaborador.vinculo}</div>
                </div>
              </div>
              <span className={`ep-badge ${colaborador.status === 'Ativo' ? 'ep-badge--success' : 'ep-badge--warning'}`}>
                {colaborador.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestaoRecursosHumanos;
