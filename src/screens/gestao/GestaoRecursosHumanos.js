import React, { useState } from 'react';
import { FaBriefcaseMedical, FaCalendarCheck, FaFileSignature, FaIdBadge, FaPlus, FaSearch, FaTimes, FaUserTie } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const colaboradoresBase = [
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
  const [colaboradores, setColaboradores] = useState(colaboradoresBase);
  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [novoColaborador, setNovoColaborador] = useState({ nome: '', cargo: '', unidade: 'UBS Centro', vinculo: 'Contrato', status: 'Ativo' });
  const colaboradoresFiltrados = colaboradores.filter((colaborador) => `${colaborador.nome} ${colaborador.cargo} ${colaborador.unidade}`.toLowerCase().includes(busca.toLowerCase()));

  const handleCreate = (event) => {
    event.preventDefault();
    setColaboradores([
      {
        ...novoColaborador,
        nome: novoColaborador.nome.trim() || 'Novo colaborador',
        cargo: novoColaborador.cargo.trim() || 'Agente administrativo',
      },
      ...colaboradores,
    ]);
    setNovoColaborador({ nome: '', cargo: '', unidade: 'UBS Centro', vinculo: 'Contrato', status: 'Ativo' });
    setShowModal(false);
  };

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-flex ep-gap-3 ep-mb-6">
          <div className="ep-input-group" style={{ flex: 1, marginBottom: 0 }}>
            <div className="ep-flex ep-items-center ep-gap-2 ep-input">
              <FaSearch className="ep-text-muted" />
              <input type="text" value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar colaborador, cargo ou unidade" style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
            </div>
          </div>
          <button className="ep-btn ep-btn--primary" aria-label="Novo colaborador" onClick={() => setShowModal(true)}>
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
          {colaboradoresFiltrados.map((colaborador) => (
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

      {showModal && (
        <div className="ep-modal-overlay" onClick={() => setShowModal(false)}>
          <form className="ep-modal" style={{ maxWidth: 460 }} onClick={(event) => event.stopPropagation()} onSubmit={handleCreate}>
            <button type="button" className="ep-close-btn" style={{ position: 'absolute', top: 16, right: 16 }} onClick={() => setShowModal(false)}><FaTimes /></button>
            <h3 className="ep-font-lg ep-fw-bold ep-mb-4">Novo colaborador</h3>
            <div className="ep-input-group">
              <label className="ep-label">Nome</label>
              <input className="ep-input" value={novoColaborador.nome} onChange={(event) => setNovoColaborador({ ...novoColaborador, nome: event.target.value })} placeholder="Nome completo" />
            </div>
            <div className="ep-input-group">
              <label className="ep-label">Cargo</label>
              <input className="ep-input" value={novoColaborador.cargo} onChange={(event) => setNovoColaborador({ ...novoColaborador, cargo: event.target.value })} placeholder="Ex: Técnico de enfermagem" />
            </div>
            <div className="ep-grid-2 ep-gap-3">
              <div className="ep-input-group">
                <label className="ep-label">Unidade</label>
                <select className="ep-select" value={novoColaborador.unidade} onChange={(event) => setNovoColaborador({ ...novoColaborador, unidade: event.target.value })}>
                  <option>UBS Centro</option>
                  <option>Hospital Municipal</option>
                  <option>Transporte Sanitário</option>
                </select>
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Vínculo</label>
                <select className="ep-select" value={novoColaborador.vinculo} onChange={(event) => setNovoColaborador({ ...novoColaborador, vinculo: event.target.value })}>
                  <option>Contrato</option>
                  <option>Efetivo</option>
                  <option>Temporário</option>
                </select>
              </div>
            </div>
            <button className="ep-btn ep-btn--primary ep-btn--full" type="submit">Adicionar colaborador</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GestaoRecursosHumanos;
