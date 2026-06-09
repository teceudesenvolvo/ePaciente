import React from 'react';
import { FaFlask, FaVial } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';

const exames = [
  { senha: 'X001', paciente: 'Maria Oliveira', exame: 'Hemograma completo', setor: 'Laboratório', horario: '07:30', status: 'Aguardando coleta' },
  { senha: 'X002', paciente: 'João Batista', exame: 'Raio-X de tórax', setor: 'Imagem', horario: '08:10', status: 'Chamado' },
  { senha: 'X003', paciente: 'Ana Clara', exame: 'Urina tipo I', setor: 'Laboratório', horario: '08:40', status: 'Aguardando coleta' },
];

const RecepcaoExames = () => (
  <div className="ep-page">
    <HeaderTop />
    <div className="ep-content ep-animate-fade-up">
      <div className="ep-card ep-card--flat ep-mb-6">
        <div style={{ textAlign: 'left' }}>
          <div className="ep-text-sm ep-text-muted">Recepção</div>
          <h2 className="ep-font-xl ep-fw-bold">Fila de exames do dia</h2>
          <div className="ep-text-sm ep-text-muted">Organize coletas e direcione pacientes aos setores responsáveis.</div>
        </div>
      </div>

      <div className="ep-grid-3 ep-gap-4 ep-mb-6">
        <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Exames hoje</div><div className="ep-font-xl ep-fw-bold">{exames.length}</div></div>
        <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Laboratório</div><div className="ep-font-xl ep-fw-bold">{exames.filter(e => e.setor === 'Laboratório').length}</div></div>
        <div className="ep-card ep-card--flat"><div className="ep-text-sm ep-text-muted">Imagem</div><div className="ep-font-xl ep-fw-bold">{exames.filter(e => e.setor === 'Imagem').length}</div></div>
      </div>

      <div className="ep-record-grid ep-record-grid--3">
        {exames.map((item) => (
          <div key={item.senha} className="ep-card ep-card--flat">
            <div className="ep-flex ep-items-center ep-gap-2 ep-fw-bold"><FaVial /> {item.senha} · {item.paciente}</div>
            <div className="ep-text-sm ep-text-muted ep-mt-2">{item.exame} · {item.setor}</div>
            <div className="ep-text-sm ep-text-muted ep-mt-1">Horário: {item.horario} · {item.status}</div>
            <div className="ep-record-actions ep-mt-4">
              <button className="ep-btn ep-btn--primary ep-btn--sm"><FaFlask /> Enviar setor</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RecepcaoExames;
