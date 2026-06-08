import React from 'react';
import { FaBalanceScale, FaFileInvoiceDollar, FaMoneyCheckAlt, FaPlus, FaSearch, FaWallet } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const lancamentos = [
  { descricao: 'Folha da atenção básica', categoria: 'Pessoal', valor: 'R$ 428.900,00', status: 'Empenhado' },
  { descricao: 'Insumos laboratoriais', categoria: 'Material de consumo', valor: 'R$ 84.230,00', status: 'Liquidado' },
  { descricao: 'Manutenção de ambulâncias', categoria: 'Serviços', valor: 'R$ 31.780,00', status: 'A pagar' },
];

const GestaoContabilidade = () => {
  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-flex ep-gap-3 ep-mb-6">
          <div className="ep-input-group" style={{ flex: 1, marginBottom: 0 }}>
            <div className="ep-flex ep-items-center ep-gap-2 ep-input">
              <FaSearch className="ep-text-muted" />
              <input type="text" placeholder="Buscar empenho, contrato ou fornecedor" style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
            </div>
          </div>
          <button className="ep-btn ep-btn--primary" aria-label="Novo lançamento">
            <FaPlus />
          </button>
        </div>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-primary)', color: 'white' }}><FaWallet /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Orçamento disponível</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">R$ 2,4 mi</div>
            </div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-success)', color: 'white' }}><FaMoneyCheckAlt /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Liquidado no mês</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">R$ 713 mil</div>
            </div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-warning)', color: 'white' }}><FaFileInvoiceDollar /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Notas pendentes</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">16</div>
            </div>
          </div>
        </div>

        <div className="ep-card ep-card--primary ep-mb-6">
          <div className="ep-flex ep-items-center ep-gap-3 ep-mb-3">
            <FaBalanceScale style={{ fontSize: 24 }} />
            <h3 className="ep-font-lg ep-fw-bold">Controle contábil da secretaria</h3>
          </div>
          <p className="ep-text-sm" style={{ opacity: 0.92 }}>Acompanhe empenhos, liquidações, pagamentos e saldos por bloco de financiamento.</p>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Lançamentos recentes</h3>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {lancamentos.map((item) => (
            <div key={item.descricao} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center">
              <div>
                <div className="ep-fw-bold">{item.descricao}</div>
                <div className="ep-text-xs ep-text-muted ep-mt-1">{item.categoria}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="ep-fw-bold">{item.valor}</div>
                <span className={`ep-badge ep-mt-1 ${item.status === 'Liquidado' ? 'ep-badge--success' : item.status === 'A pagar' ? 'ep-badge--warning' : 'ep-badge--primary'}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestaoContabilidade;
