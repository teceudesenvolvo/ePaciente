import React from 'react';
import { FaUserInjured, FaStethoscope, FaSyringe, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const GestaoDashboard = () => {
  return (
    <div className="ep-page" style={{ background: 'var(--color-n50)' }}>
      <div className="ep-page-header" style={{ background: 'var(--color-primary-dark)', color: 'white' }}>
        <div>
          <h1 className="ep-page-title" style={{ color: 'white' }}>Visão Geral (Município)</h1>
          <p className="ep-text-sm" style={{ opacity: 0.8 }}>Mês atual: Junho 2026</p>
        </div>
      </div>
      
      <div className="ep-content ep-animate-fade-up">
        {/* Painel Resumo */}
        <div className="ep-grid-2 ep-mb-6">
          <div className="ep-card ep-card--flat">
            <div className="ep-flex ep-items-center ep-gap-2 ep-mb-2 ep-text-muted">
              <FaUserInjured /> Pacientes Atendidos
            </div>
            <div className="ep-font-xl ep-fw-bold">14.5k</div>
            <div className="ep-text-xs ep-text-success ep-flex ep-items-center ep-gap-1 ep-mt-1">
              <FaArrowUp /> 5% vs último mês
            </div>
          </div>
          
          <div className="ep-card ep-card--flat">
            <div className="ep-flex ep-items-center ep-gap-2 ep-mb-2 ep-text-muted">
              <FaStethoscope /> Teleconsultas
            </div>
            <div className="ep-font-xl ep-fw-bold">3.2k</div>
            <div className="ep-text-xs ep-text-success ep-flex ep-items-center ep-gap-1 ep-mt-1">
              <FaArrowUp /> 12% vs último mês
            </div>
          </div>
          
          <div className="ep-card ep-card--flat">
            <div className="ep-flex ep-items-center ep-gap-2 ep-mb-2 ep-text-muted">
              <FaSyringe /> Vacinas Aplicadas
            </div>
            <div className="ep-font-xl ep-fw-bold">8.4k</div>
            <div className="ep-text-xs ep-text-error ep-flex ep-items-center ep-gap-1 ep-mt-1">
              <FaArrowDown /> 2% vs último mês
            </div>
          </div>

          <div className="ep-card ep-card--flat">
            <div className="ep-flex ep-items-center ep-gap-2 ep-mb-2 ep-text-muted">
               Custo por Paciente
            </div>
            <div className="ep-font-xl ep-fw-bold">R$ 142</div>
            <div className="ep-text-xs ep-text-success ep-flex ep-items-center ep-gap-1 ep-mt-1">
              <FaArrowDown /> R$ 5 vs último mês
            </div>
          </div>
        </div>

        {/* Status das Unidades */}
        <div className="ep-section-header">
          <h3 className="ep-section-title">Status das Unidades</h3>
        </div>

        <div className="ep-flex-col ep-gap-3">
          <div className="ep-card ep-card--flat">
            <div className="ep-flex ep-justify-between ep-items-center">
              <div>
                <div className="ep-fw-bold">Hospital Municipal</div>
                <div className="ep-text-sm ep-text-muted">Taxa de Ocupação: 85%</div>
              </div>
              <span className="ep-badge ep-badge--warning">Alerta</span>
            </div>
            <div className="ep-mt-3" style={{ height: 6, background: 'var(--color-n200)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'var(--color-warning)' }}></div>
            </div>
          </div>

          <div className="ep-card ep-card--flat">
            <div className="ep-flex ep-justify-between ep-items-center">
              <div>
                <div className="ep-fw-bold">UBS Centro</div>
                <div className="ep-text-sm ep-text-muted">Tempo Médio de Espera: 15min</div>
              </div>
              <span className="ep-badge ep-badge--success">Normal</span>
            </div>
          </div>
          
          <div className="ep-card ep-card--flat">
            <div className="ep-flex ep-justify-between ep-items-center">
              <div>
                <div className="ep-fw-bold">Laboratório Central</div>
                <div className="ep-text-sm ep-text-muted">Exames hoje: 450</div>
              </div>
              <span className="ep-badge ep-badge--success">Operacional</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GestaoDashboard;
