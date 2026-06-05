import React from 'react';
import { FaChartPie, FaAmbulance, FaUsers } from 'react-icons/fa';

const ExecDashboard = () => {
  return (
    <div className="ep-page" style={{ background: 'var(--color-n100)' }}>
      <div className="ep-page-header" style={{ background: 'var(--color-n900)', color: 'white' }}>
        <div>
          <h1 className="ep-page-title" style={{ color: 'white' }}>Gabinete Virtual</h1>
          <p className="ep-text-sm" style={{ opacity: 0.8 }}>Relatório Diário - Prefeito</p>
        </div>
      </div>
      
      <div className="ep-content ep-animate-fade-up">
        <div className="ep-grid-2 ep-mb-6">
          <div className="ep-card ep-card--flat ep-text-center">
            <FaChartPie style={{ fontSize: 24, color: 'var(--color-primary)', marginBottom: 8 }} />
            <div className="ep-text-sm ep-text-muted">Orçamento Empenhado</div>
            <div className="ep-font-xl ep-fw-bold">R$ 12.5M</div>
            <div className="ep-text-xs ep-text-warning ep-mt-1">65% do anual</div>
          </div>
          
          <div className="ep-card ep-card--flat ep-text-center">
            <FaUsers style={{ fontSize: 24, color: 'var(--color-info)', marginBottom: 8 }} />
            <div className="ep-text-sm ep-text-muted">Pop. Atendida</div>
            <div className="ep-font-xl ep-fw-bold">42.1k</div>
            <div className="ep-text-xs ep-text-success ep-mt-1">+1.2k este mês</div>
          </div>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Ocorrências Críticas (SAMU)</h3>
        </div>

        <div className="ep-card ep-card--flat ep-mb-6" style={{ borderLeft: '4px solid var(--color-error)' }}>
          <div className="ep-flex ep-items-center ep-gap-3 ep-mb-2">
            <FaAmbulance style={{ color: 'var(--color-error)' }} />
            <span className="ep-fw-bold">Tempo Resposta Alto</span>
          </div>
          <p className="ep-text-sm ep-text-muted">
            Tempo médio de resposta na Zona Sul está em 22min (meta: 15min). Recomendado realocar viatura V-03 para base Sul.
          </p>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Satisfação do Cidadão</h3>
        </div>

        <div className="ep-card ep-card--flat">
           <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
              <span className="ep-fw-semibold">NPS Geral da Saúde</span>
              <span className="ep-font-lg ep-fw-bold ep-text-success">72</span>
           </div>
           
           <div className="ep-flex-col ep-gap-3">
             <div>
                <div className="ep-flex ep-justify-between ep-text-xs ep-mb-1">
                   <span>Atendimento Médico</span> <span>85% aprovam</span>
                </div>
                <div style={{ height: 6, background: 'var(--color-n200)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: 'var(--color-success)' }}></div>
                </div>
             </div>
             
             <div>
                <div className="ep-flex ep-justify-between ep-text-xs ep-mb-1">
                   <span>Tempo de Espera</span> <span>45% aprovam</span>
                </div>
                <div style={{ height: 6, background: 'var(--color-n200)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '45%', height: '100%', background: 'var(--color-warning)' }}></div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExecDashboard;
