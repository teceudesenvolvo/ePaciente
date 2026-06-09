import React from 'react';

const chamadas = [
  { senha: 'M003', paciente: 'Ana Clara', local: 'Consultório 2', tipo: 'Médico', profissional: 'Dra. Ana Júlia' },
  { senha: 'E003', paciente: 'Pedro Henrique', local: 'Sala de Triagem', tipo: 'Enfermagem', profissional: 'Enf. Camila' },
  { senha: 'D004', paciente: 'Lucas Mendes', local: 'Consultório Odonto', tipo: 'Dentista', profissional: 'Dr. Bruno' },
];

const PainelChamadas = () => (
  <div className="ep-call-panel">
    <div className="ep-call-panel__shell">
      <div className="ep-call-panel__header">
        <div>
          <span>Secretaria Municipal de Saúde</span>
          <h1>Painel de chamadas</h1>
          <p>Chamadas realizadas por médicos, enfermagem e odontologia.</p>
        </div>
        <div className="ep-call-panel__clock">{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
      <div className="ep-call-panel__featured">
        <div>
          <span>Chamando agora</span>
          <strong>{chamadas[0].senha}</strong>
        </div>
        <div>
          <p>{chamadas[0].paciente}</p>
          <small>{chamadas[0].local} · {chamadas[0].profissional}</small>
        </div>
      </div>
      <div className="ep-call-panel__grid">
        {chamadas.slice(1).map((item) => (
          <div key={item.senha} className="ep-call-panel__card">
            <span>{item.tipo}</span>
            <strong>{item.senha}</strong>
            <p>{item.paciente}</p>
            <small>{item.local} · {item.profissional}</small>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PainelChamadas;
