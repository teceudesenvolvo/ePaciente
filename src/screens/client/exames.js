import React, { Component } from 'react';

//Imagens

// Icones

// Components
import ExameList from '../../componets/exameList';

//mudança de páginas

class Exames extends Component {
  render() {
    return (
      <div className='App-header' >
        <div className='agendaExame agendar-consulta'>
          <form className='formLogin agendarConsulta'>
            <h1 className='titleAgendarExame'>Agendar Exame:</h1>
            <select name="tipoExame" placeholder='Tipo de Exame' className='inputLogin inputAgendarExame'>
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft, FaVial, FaFileMedicalAlt, FaCheckCircle } from 'react-icons/fa';

const Exames = () => {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('agendar');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <button className="ep-back-btn" onClick={() => history.push('/')}>
          <FaArrowLeft />
        </button>
        <h1 className="ep-page-title">Exames</h1>
      </div>
      
      <div className="ep-content">
        <div className="ep-tabs">
          <button 
            className={`ep-tab ${activeTab === 'agendar' ? 'ep-tab--active' : ''}`}
            onClick={() => setActiveTab('agendar')}
          >
            Agendar Exame
          </button>
          <button 
            className={`ep-tab ${activeTab === 'resultados' ? 'ep-tab--active' : ''}`}
            onClick={() => setActiveTab('resultados')}
          >
            Meus Resultados
          </button>
        </div>

        {activeTab === 'agendar' && !isSubmitted && (
          <form className="ep-card ep-card--flat ep-animate-fade-up" onSubmit={handleSubmit}>
            <div className="ep-input-group">
              <label className="ep-label">Tipo de Exame</label>
              <select className="ep-select" required>
                <option value="">Selecione...</option>
                <option value="sangue">Exame de Sangue</option>
                <option value="urina">Exame de Urina/Fezes</option>
                <option value="raiox">Raio-X</option>
                <option value="ultrassom">Ultrassonografia</option>
              </select>
            </div>

            <div className="ep-input-group">
              <label className="ep-label">Local de Coleta</label>
              <select className="ep-select" required>
                <option value="">Selecione a unidade...</option>
                <option value="1">Laboratório Central Municipal</option>
                <option value="2">UBS Centro</option>
                <option value="3">UBS Bairro Novo</option>
              </select>
            </div>

            <div className="ep-input-group">
              <label className="ep-label">Anexar Guia Médica (Opcional)</label>
              <div style={{
                border: '2px dashed var(--color-n300)',
                borderRadius: 'var(--r-md)',
                padding: 'var(--sp-4)',
                textAlign: 'center',
                color: 'var(--color-n600)',
                background: 'var(--color-n50)',
                cursor: 'pointer'
              }}>
                <FaFileMedicalAlt style={{ fontSize: 24, marginBottom: 8 }} />
                <p className="ep-text-sm">Clique para enviar foto da guia</p>
              </div>
            </div>

            <button type="submit" className="ep-btn ep-btn--primary ep-btn--full ep-mt-4">
              Solicitar Agendamento
            </button>
          </form>
        )}

        {activeTab === 'agendar' && isSubmitted && (
          <div className="ep-animate-scale-in ep-empty">
            <div className="ep-empty__icon" style={{ color: 'var(--color-success)', opacity: 1, fontSize: 64 }}>
              <FaCheckCircle />
            </div>
            <h2 className="ep-font-xl ep-fw-bold ep-mt-4">Solicitação Recebida!</h2>
            <p className="ep-text-muted ep-mt-2 ep-text-center">
              Sua solicitação de exame foi enviada para regulação. Você receberá a data e o horário da coleta em breve.
            </p>
            <button className="ep-btn ep-btn--secondary ep-btn--full ep-mt-6" onClick={() => history.push('/')}>
              Voltar para o Início
            </button>
          </div>
        )}

        {activeTab === 'resultados' && (
          <div className="ep-animate-fade-up">
            <div className="ep-list-item">
              <div className="ep-list-icon" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
                <FaVial />
              </div>
              <div className="ep-list-body">
                <div className="ep-list-title">Hemograma Completo</div>
                <div className="ep-list-sub">Coletado em 12/05/2026</div>
              </div>
              <span className="ep-badge ep-badge--success">Pronto</span>
            </div>

            <div className="ep-list-item">
              <div className="ep-list-icon" style={{ background: 'var(--color-n100)', color: 'var(--color-n600)' }}>
                <FaVial />
              </div>
              <div className="ep-list-body">
                <div className="ep-list-title">Glicemia em Jejum</div>
                <div className="ep-list-sub">Coletado em 12/05/2026</div>
              </div>
              <span className="ep-badge ep-badge--success">Pronto</span>
            </div>
            
            <div className="ep-list-item">
              <div className="ep-list-icon" style={{ background: 'var(--color-warning-light)', color: 'var(--color-warning)' }}>
                <FaVial />
              </div>
              <div className="ep-list-body">
                <div className="ep-list-title">Raio-X de Tórax</div>
                <div className="ep-list-sub">Coletado em 02/06/2026</div>
              </div>
              <span className="ep-badge ep-badge--warning">Em Análise</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exames;