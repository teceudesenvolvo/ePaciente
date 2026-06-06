import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft, FaBell, FaCircle } from 'react-icons/fa';

//Imagens

// Icones

// Components

//mudança de páginas

const Notificacoes = () => {
  const history = useHistory();

  const listaNotificacoes = [
    { id: 1, titulo: "Consulta Confirmada", mensagem: "Sua consulta com Clínico Geral foi agendada para o dia 10/06.", nova: true },
    { id: 2, titulo: "Resultado de Exame", mensagem: "O resultado do seu Hemograma já está disponível no portal.", nova: true },
    { id: 3, titulo: "Campanha de Vacinação", mensagem: "A vacinação contra Influenza começou na UBS Centro. Proteja-se!", nova: false },
    { id: 4, titulo: "Transporte Aprovado", mensagem: "Sua solicitação de transporte para Fortaleza foi aprovada.", nova: false },
  ];

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <button className="ep-back-btn ep-hide-desktop" onClick={() => history.push('/inicio')}>
          <FaArrowLeft />
        </button>
        <h1 className="ep-page-title">Notificações</h1>
      </div>

      <div className="ep-content ep-animate-fade-up">
        {listaNotificacoes.map((item) => (
          <div key={item.id} className="ep-list-item" style={{ opacity: item.nova ? 1 : 0.7 }}>
            <div 
              className="ep-list-icon" 
              style={{ 
                background: item.nova ? 'var(--color-primary-light)' : 'var(--color-n100)', 
                color: item.nova ? 'var(--color-primary-dark)' : 'var(--color-n500)' 
              }}
            >
              <FaBell />
            </div>
            
            <div className="ep-list-body">
              <div className="ep-list-title ep-flex ep-items-center ep-gap-2">
                {item.titulo}
                {item.nova && <FaCircle style={{ color: 'var(--color-primary)', fontSize: '8px' }} />}
              </div>
              <div className="ep-list-sub">{item.mensagem}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notificacoes;