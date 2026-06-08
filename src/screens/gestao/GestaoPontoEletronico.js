import React from 'react';
import { FaClock, FaDownload, FaExclamationCircle, FaFingerprint, FaUserCheck } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const registros = [
  { nome: 'Ana Paula Mendes', unidade: 'UBS Centro', entrada: '07:02', saida: '13:08', status: 'Completo' },
  { nome: 'Rafael Oliveira', unidade: 'Transporte Sanitário', entrada: '06:48', saida: 'Em jornada', status: 'Aberto' },
  { nome: 'Cláudia Martins', unidade: 'Hospital Municipal', entrada: '07:31', saida: '--', status: 'Inconsistente' },
];

const GestaoPontoEletronico = () => {
  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-success)', color: 'white' }}><FaUserCheck /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Presentes hoje</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">186</div>
            </div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-primary)', color: 'white' }}><FaClock /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Em jornada</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">42</div>
            </div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-warning)', color: 'white' }}><FaExclamationCircle /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Inconsistências</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">9</div>
            </div>
          </div>
        </div>

        <div className="ep-card ep-card--primary ep-mb-6">
          <div className="ep-flex ep-justify-between ep-items-center ep-gap-4">
            <div>
              <div className="ep-flex ep-items-center ep-gap-3 ep-mb-2">
                <FaFingerprint style={{ fontSize: 24 }} />
                <h3 className="ep-font-lg ep-fw-bold">Ponto eletrônico</h3>
              </div>
              <p className="ep-text-sm" style={{ opacity: 0.92 }}>Registro biométrico e conferência diária de entradas, saídas e intervalos.</p>
            </div>
            <button className="ep-btn ep-btn--secondary ep-flex ep-items-center ep-gap-2">
              <FaDownload /> Espelho
            </button>
          </div>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Registros de hoje</h3>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {registros.map((registro) => (
            <div key={registro.nome} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center">
              <div>
                <div className="ep-fw-bold">{registro.nome}</div>
                <div className="ep-text-xs ep-text-muted ep-mt-1">{registro.unidade}</div>
              </div>
              <div className="ep-flex ep-items-center ep-gap-4">
                <div>
                  <div className="ep-text-xs ep-text-muted">Entrada</div>
                  <div className="ep-fw-bold">{registro.entrada}</div>
                </div>
                <div>
                  <div className="ep-text-xs ep-text-muted">Saída</div>
                  <div className="ep-fw-bold">{registro.saida}</div>
                </div>
                <span className={`ep-badge ${registro.status === 'Completo' ? 'ep-badge--success' : registro.status === 'Aberto' ? 'ep-badge--primary' : 'ep-badge--warning'}`}>
                  {registro.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestaoPontoEletronico;
