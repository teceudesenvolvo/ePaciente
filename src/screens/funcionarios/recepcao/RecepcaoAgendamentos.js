import React from 'react';
import { FaCalendarCheck, FaStethoscope } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';

const agenda = [
  { hora: '08:00', senha: 'M001', paciente: 'Maria Oliveira', medico: 'Dr. Ricardo Santos', especialidade: 'Clínica Geral', status: 'Confirmado' },
  { hora: '08:20', senha: 'M002', paciente: 'João Batista', medico: 'Dr. Ricardo Santos', especialidade: 'Clínica Geral', status: 'Aguardando' },
  { hora: '08:40', senha: 'M003', paciente: 'Ana Clara', medico: 'Dra. Ana Júlia', especialidade: 'Pré-natal', status: 'Em atendimento' },
];

const RecepcaoAgendamentos = () => (
  <div className="ep-page">
    <HeaderTop />
    <div className="ep-content ep-animate-fade-up">
      <div className="ep-card ep-card--flat ep-mb-6">
        <div style={{ textAlign: 'left' }}>
          <div className="ep-text-sm ep-text-muted">Recepção</div>
          <h2 className="ep-font-xl ep-fw-bold">Agenda e fila médica do dia</h2>
          <div className="ep-text-sm ep-text-muted">Atendimentos agendados, confirmação de presença e direcionamento para os médicos.</div>
        </div>
      </div>

      <div className="ep-grid-3 ep-gap-4 ep-mb-6">
        <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Atendimentos do dia</div><div className="ep-font-xl ep-fw-bold">{agenda.length}</div></div>
        <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Aguardando</div><div className="ep-font-xl ep-fw-bold">{agenda.filter(a => a.status === 'Aguardando').length}</div></div>
        <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Em atendimento</div><div className="ep-font-xl ep-fw-bold">{agenda.filter(a => a.status === 'Em atendimento').length}</div></div>
      </div>

      <div className="ep-card ep-card--flat">
        <h3 className="ep-font-md ep-fw-bold ep-mb-4">Lista de atendimentos para médicos</h3>
        <div className="ep-flex-col ep-gap-3">
          {agenda.map((item) => (
            <div key={item.senha} className="ep-problem-row">
              <div>
                <strong>{item.senha} · {item.paciente}</strong>
                <div className="ep-text-sm ep-text-muted"><FaCalendarCheck /> {item.hora} · {item.medico} · {item.especialidade}</div>
              </div>
              <div className="ep-record-actions">
                <span className="ep-badge ep-badge--primary">{item.status}</span>
                <button className="ep-btn ep-btn--primary ep-btn--sm"><FaStethoscope /> Direcionar médico</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default RecepcaoAgendamentos;
