import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaCommentDots, FaExclamationTriangle, FaHeart, FaLightbulb, FaPaperPlane, FaSearch } from 'react-icons/fa';

const protocolos = [
  { id: 'OUV-2026-0018', tipo: 'Sugestão', assunto: 'Ampliação dos horários de coleta de exames', status: 'Em análise', data: '09/06/2026' },
  { id: 'OUV-2026-0012', tipo: 'Elogio', assunto: 'Atendimento da equipe da UBS Centro', status: 'Respondida', data: '04/06/2026' },
  { id: 'OUV-2026-0007', tipo: 'Crítica', assunto: 'Tempo de espera para transporte sanitário', status: 'Encaminhada', data: '29/05/2026' },
];

const tipoConfig = {
  Crítica: { icon: <FaExclamationTriangle />, color: 'var(--color-warning)', bg: 'rgba(255, 149, 0, 0.12)' },
  Elogio: { icon: <FaHeart />, color: 'var(--color-success)', bg: 'rgba(0, 200, 83, 0.12)' },
  Sugestão: { icon: <FaLightbulb />, color: 'var(--color-primary)', bg: 'var(--color-primary-light)' },
};

const Ouvidoria = () => {
  const history = useHistory();
  const [tipo, setTipo] = useState('Sugestão');
  const [anonimo, setAnonimo] = useState(false);
  const [busca, setBusca] = useState('');
  const filteredProtocolos = protocolos.filter((item) => `${item.id} ${item.tipo} ${item.assunto} ${item.status}`.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <button className="ep-back-btn ep-hide-desktop" onClick={() => history.push('/inicio')}>
          <FaArrowLeft />
        </button>
        <h1 className="ep-page-title">Ouvidoria</h1>
      </div>

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-3">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
              <FaCommentDots />
            </div>
            <div>
              <div className="ep-text-sm ep-text-muted">Canal do cidadão</div>
              <h2 className="ep-font-lg ep-fw-bold">Críticas, elogios e sugestões</h2>
              <div className="ep-text-sm ep-text-muted">Registre sua manifestação e acompanhe o protocolo pela plataforma.</div>
            </div>
          </div>
        </div>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          {Object.entries(tipoConfig).map(([nome, config]) => (
            <button
              key={nome}
              className="ep-card ep-card--flat"
              onClick={() => setTipo(nome)}
              style={{
                borderColor: tipo === nome ? config.color : 'var(--color-border)',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <div className="ep-avatar ep-avatar--sm ep-mb-3" style={{ background: config.bg, color: config.color }}>
                {config.icon}
              </div>
              <div className="ep-fw-bold">{nome}</div>
              <div className="ep-text-sm ep-text-muted ep-mt-1">
                {nome === 'Crítica' && 'Informe falhas, atrasos ou dificuldade no atendimento.'}
                {nome === 'Elogio' && 'Reconheça profissionais, unidades ou serviços bem avaliados.'}
                {nome === 'Sugestão' && 'Proponha melhorias para a saúde municipal.'}
              </div>
            </button>
          ))}
        </div>

        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-justify-between ep-items-center ep-gap-3 ep-mb-4">
            <div>
              <div className="ep-text-sm ep-text-muted">Nova manifestação</div>
              <h3 className="ep-font-md ep-fw-bold">{tipo}</h3>
            </div>
            <label className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted" style={{ cursor: 'pointer' }}>
              <input type="checkbox" checked={anonimo} onChange={(event) => setAnonimo(event.target.checked)} />
              Enviar como anônimo
            </label>
          </div>

          <div className="ep-grid-2 ep-gap-4">
            <div className="ep-input-group">
              <label className="ep-label">Assunto</label>
              <input className="ep-input" placeholder="Ex.: Atendimento, consulta, transporte..." />
            </div>
            <div className="ep-input-group">
              <label className="ep-label">Unidade/serviço</label>
              <select className="ep-select">
                <option>UBS Centro</option>
                <option>UBS Curu</option>
                <option>Hospital Municipal</option>
                <option>Transporte sanitário</option>
                <option>Secretaria Municipal de Saúde</option>
              </select>
            </div>
          </div>

          {!anonimo && (
            <div className="ep-grid-2 ep-gap-4">
              <div className="ep-input-group">
                <label className="ep-label">Nome</label>
                <input className="ep-input" placeholder="Seu nome completo" />
              </div>
              <div className="ep-input-group">
                <label className="ep-label">Contato para resposta</label>
                <input className="ep-input" placeholder="Telefone ou e-mail" />
              </div>
            </div>
          )}

          <div className="ep-input-group">
            <label className="ep-label">Descrição</label>
            <textarea className="ep-textarea" rows={6} placeholder="Descreva com detalhes o que aconteceu ou sua sugestão." />
          </div>

          <div className="ep-record-actions">
            <button className="ep-btn ep-btn--secondary ep-btn--sm">Anexar arquivo</button>
            <button className="ep-btn ep-btn--primary ep-btn--sm"><FaPaperPlane /> Enviar manifestação</button>
          </div>
        </div>

        <div className="ep-card ep-card--flat">
          <div className="ep-flex ep-justify-between ep-items-center ep-gap-3 ep-mb-4">
            <div>
              <div className="ep-text-sm ep-text-muted">Acompanhamento</div>
              <h3 className="ep-font-md ep-fw-bold">Meus protocolos</h3>
            </div>
            <div className="ep-flex ep-items-center ep-gap-2 ep-input" style={{ maxWidth: 360 }}>
              <FaSearch className="ep-text-muted" />
              <input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar protocolo" style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
            </div>
          </div>

          <div className="ep-flex-col ep-gap-3">
            {filteredProtocolos.map((item) => (
              <div key={item.id} className="ep-list-item">
                <div className="ep-list-icon" style={{ background: tipoConfig[item.tipo].bg, color: tipoConfig[item.tipo].color }}>
                  {tipoConfig[item.tipo].icon}
                </div>
                <div className="ep-list-body">
                  <div className="ep-list-title">{item.assunto}</div>
                  <div className="ep-list-sub">{item.id} · {item.tipo} · {item.data}</div>
                </div>
                <span className={`ep-badge ${item.status === 'Respondida' ? 'ep-badge--success' : 'ep-badge--primary'}`}>
                  {item.status === 'Respondida' && <FaCheckCircle />}
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ouvidoria;
