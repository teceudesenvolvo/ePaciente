import React from 'react';
import { FaFileInvoiceDollar, FaChartLine, FaDownload } from 'react-icons/fa';

const ExecTransparencia = () => {
  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <h1 className="ep-page-title">Transparência Ativa</h1>
      </div>
      
      <div className="ep-content">
        <div className="ep-card ep-card--primary ep-mb-6">
           <div className="ep-flex ep-items-center ep-gap-3 ep-mb-2">
             <FaChartLine style={{ fontSize: 24 }} />
             <span className="ep-fw-bold ep-font-lg">Índice de Transparência</span>
           </div>
           <div className="ep-flex ep-justify-between ep-items-end">
             <div className="ep-text-sm" style={{ opacity: 0.9 }}>Avaliação TCE/TCM</div>
             <div className="ep-font-xl ep-fw-bold">9.8<span className="ep-text-sm">/10</span></div>
           </div>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Contratos Recentes (Saúde)</h3>
        </div>

        <div className="ep-flex-col ep-gap-3 ep-mb-6">
           <div className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-start">
                 <div>
                    <div className="ep-fw-bold">Fornecimento de Medicamentos Básicos</div>
                    <div className="ep-text-sm ep-text-muted ep-mt-1">Pregão 045/2026 · Vencedor: MedFarma LTDA</div>
                 </div>
                 <FaFileInvoiceDollar style={{ color: 'var(--color-success)' }} />
              </div>
              <div className="ep-divider" style={{ margin: 'var(--sp-3) 0' }}></div>
              <div className="ep-flex ep-justify-between ep-items-center">
                 <div className="ep-fw-bold">R$ 1.250.000,00</div>
                 <span className="ep-text-xs ep-text-success ep-fw-semibold">Em execução</span>
              </div>
           </div>

           <div className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-start">
                 <div>
                    <div className="ep-fw-bold">Reforma da UBS Bairro Novo</div>
                    <div className="ep-text-sm ep-text-muted ep-mt-1">Tomada de Preços 012/2026 · Vencedor: Construtora Alfa</div>
                 </div>
                 <FaFileInvoiceDollar style={{ color: 'var(--color-primary)' }} />
              </div>
              <div className="ep-divider" style={{ margin: 'var(--sp-3) 0' }}></div>
              <div className="ep-flex ep-justify-between ep-items-center">
                 <div className="ep-fw-bold">R$ 450.000,00</div>
                 <span className="ep-text-xs ep-text-warning ep-fw-semibold">Aguardando Início</span>
              </div>
           </div>
        </div>

        <button className="ep-btn ep-btn--secondary ep-btn--full">
           <FaDownload /> Baixar Relatório LRF (Mês Ref. Maio/2026)
        </button>

      </div>
    </div>
  );
};

export default ExecTransparencia;
