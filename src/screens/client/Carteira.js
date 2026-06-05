import React from 'react';
import { FaSyringe, FaQrcode, FaShareAlt, FaDownload } from 'react-icons/fa';
import { MdOutlineMedicalServices } from 'react-icons/md';

const Carteira = () => {
  const [activeTab, setActiveTab] = React.useState('vacinas');
  const [showQR, setShowQR] = React.useState(false);

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <h1 className="ep-page-title">Minha Carteira</h1>
      </div>
      
      <div className="ep-content">
        <div className="ep-tabs">
          <button 
            className={`ep-tab ${activeTab === 'vacinas' ? 'ep-tab--active' : ''}`}
            onClick={() => setActiveTab('vacinas')}
          >
            <FaSyringe /> Vacinas
          </button>
          <button 
            className={`ep-tab ${activeTab === 'receitas' ? 'ep-tab--active' : ''}`}
            onClick={() => setActiveTab('receitas')}
          >
            <MdOutlineMedicalServices /> Receitas
          </button>
        </div>

        {activeTab === 'vacinas' && (
          <div className="ep-animate-fade-up">
            <div className="ep-alert ep-alert--warning ep-mb-4">
              <span className="ep-alert__icon">⚠️</span>
              <div>
                <div className="ep-alert__title">Atenção ao calendário</div>
                <div className="ep-alert__text">Você tem 1 vacina pendente este mês.</div>
              </div>
            </div>

            <div className="ep-section-header">
              <h3 className="ep-section-title">Calendário Vacinal</h3>
            </div>

            <div className="ep-list-item">
              <div className="ep-list-icon" style={{ background: 'var(--color-error-light)', color: 'var(--color-error)' }}>
                <FaSyringe />
              </div>
              <div className="ep-list-body">
                <div className="ep-list-title">Influenza (Gripe)</div>
                <div className="ep-list-sub">Campanha Anual 2026</div>
              </div>
              <span className="ep-badge ep-badge--error">Atrasada</span>
            </div>

            <div className="ep-list-item">
              <div className="ep-list-icon" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
                <FaSyringe />
              </div>
              <div className="ep-list-body">
                <div className="ep-list-title">Covid-19 (Reforço)</div>
                <div className="ep-list-sub">Aplicada em 15/01/2026</div>
              </div>
              <span className="ep-badge ep-badge--success">Em dia</span>
            </div>

            <div className="ep-list-item">
              <div className="ep-list-icon" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>
                <FaSyringe />
              </div>
              <div className="ep-list-body">
                <div className="ep-list-title">Febre Amarela</div>
                <div className="ep-list-sub">Aplicada em 10/05/2018</div>
              </div>
              <span className="ep-badge ep-badge--success">Em dia</span>
            </div>
            
            <button className="ep-btn ep-btn--ghost ep-btn--full ep-mt-4">
              Ver calendário completo por idade
            </button>
          </div>
        )}

        {activeTab === 'receitas' && (
          <div className="ep-animate-fade-up">
            <div className="ep-list-item" onClick={() => setShowQR(true)}>
              <div className="ep-list-icon" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
                <MdOutlineMedicalServices />
              </div>
              <div className="ep-list-body">
                <div className="ep-list-title">Dr. Marcos Silva - Clínico</div>
                <div className="ep-list-sub">Emitida em 05/06/2026</div>
                <div className="ep-mt-2 ep-text-xs ep-text-muted">Amoxicilina 500mg, Dipirona</div>
              </div>
              <div className="ep-list-arrow"><FaQrcode /></div>
            </div>

            <div className="ep-list-item">
              <div className="ep-list-icon" style={{ background: 'var(--color-n100)', color: 'var(--color-n600)' }}>
                <MdOutlineMedicalServices />
              </div>
              <div className="ep-list-body">
                <div className="ep-list-title">Dra. Ana Costa - Cardio</div>
                <div className="ep-list-sub">Emitida em 12/03/2026</div>
                <div className="ep-mt-2 ep-text-xs ep-text-muted">Losartana 50mg</div>
              </div>
              <span className="ep-badge ep-badge--neutral">Expirada</span>
            </div>
          </div>
        )}
      </div>

      {showQR && (
        <div className="ep-modal-overlay" onClick={() => setShowQR(false)}>
          <div className="ep-modal" onClick={e => e.stopPropagation()}>
            <div className="ep-modal__handle"></div>
            <div className="ep-text-center">
              <h3 className="ep-section-title">Receita Digital</h3>
              <p className="ep-text-sm ep-text-muted ep-mt-2">Apresente este QR Code na farmácia</p>
              
              <div className="ep-mt-6 ep-mb-6 ep-flex ep-items-center" style={{ justifyContent: 'center' }}>
                {/* Fake QR Code */}
                <div style={{ width: 200, height: 200, background: 'var(--color-n800)', borderRadius: '12px', padding: 10 }}>
                   <div style={{ width: '100%', height: '100%', background: 'white' }}>
                      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=ePaciente-Receita-123`} alt="QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
                   </div>
                </div>
              </div>

              <div className="ep-kpi ep-mb-6">
                 <div className="ep-kpi__label">Código de Liberação</div>
                 <div className="ep-kpi__value" style={{ letterSpacing: '2px' }}>A8B-99K</div>
              </div>

              <div className="ep-grid-2">
                <button className="ep-btn ep-btn--secondary"><FaDownload /> Baixar PDF</button>
                <button className="ep-btn ep-btn--primary"><FaShareAlt /> Compartilhar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carteira;
