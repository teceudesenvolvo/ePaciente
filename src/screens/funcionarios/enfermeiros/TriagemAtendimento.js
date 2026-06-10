import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { FaArrowLeft, FaClipboardCheck, FaHeartbeat, FaSave, FaStethoscope } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';
import { getPatientRecord } from '../FuncionarioPage';
import { triagemQueue } from './EnfermeirosTriagem';

const TriagemAtendimento = () => {
  const history = useHistory();
  const location = useLocation();
  const { paciente } = useParams();
  const patientName = decodeURIComponent(paciente || '');
  const triagem = location.state?.triagem || triagemQueue.find((item) => item.paciente === patientName) || triagemQueue[0];
  const record = getPatientRecord(triagem?.paciente || patientName);
  const [form, setForm] = useState({
    queixa: triagem?.queixa || '',
    pa: '120/80',
    temperatura: '36,7',
    saturacao: '98',
    frequencia: '82',
    glicemia: '108',
    peso: '72',
    altura: '1,62',
    dor: '2',
    prioridade: triagem?.prioridade || 'Verde',
    destino: 'Consultório médico',
    observacao: 'Paciente orientado e encaminhado conforme classificação de risco.',
  });

  const updateField = (field, value) => setForm({ ...form, [field]: value });

  return (
    <div className="ep-page">
      <HeaderTop customTitle={`Triagem · ${triagem?.paciente || patientName}`} />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-record-hero">
          <div className="ep-record-hero__main">
            <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => history.push('/funcionarios/enfermeiros/triagem')}>
              <FaArrowLeft /> Voltar
            </button>
            <div className="ep-avatar ep-avatar--lg" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
              <FaClipboardCheck />
            </div>
            <div className="ep-record-hero__text">
              <div className="ep-text-sm ep-text-muted">{triagem?.senha} · {triagem?.origem} · {triagem?.unidade}</div>
              <h1>{triagem?.paciente || patientName}</h1>
              <div className="ep-text-sm ep-text-muted">{triagem?.horario} · {triagem?.queixa}</div>
            </div>
          </div>
          <div className="ep-record-hero__actions">
            <button className="ep-btn ep-btn--primary ep-btn--sm"><FaSave /> Salvar triagem</button>
          </div>
        </div>

        <div className="ep-record-grid ep-record-grid--3">
          <div className="ep-card ep-card--flat">
            <div className="ep-flex ep-items-center ep-gap-2 ep-text-muted ep-text-sm"><FaHeartbeat /> Dados clínicos</div>
            <div className="ep-text-sm ep-mt-3">Alergias: {record.alergias}</div>
            <div className="ep-text-sm ep-mt-1">Condições: {record.condicoes.join(', ')}</div>
          </div>
          <div className="ep-card ep-card--flat">
            <div className="ep-text-sm ep-text-muted">Cadastro</div>
            <div className="ep-text-sm ep-mt-3">CPF: {record.cpf}</div>
            <div className="ep-text-sm ep-mt-1">CNS: {record.cns}</div>
          </div>
          <div className="ep-card ep-card--flat">
            <div className="ep-text-sm ep-text-muted">Classificação atual</div>
            <div className="ep-font-lg ep-fw-bold ep-mt-2">{form.prioridade}</div>
            <div className="ep-text-sm ep-text-muted ep-mt-1">{form.destino}</div>
          </div>
        </div>

        <div className="ep-card ep-card--flat ep-mt-6">
          <div className="ep-flex ep-items-center ep-gap-2 ep-mb-4" style={{ color: 'var(--color-primary)' }}>
            <FaStethoscope />
            <strong>Informações da triagem</strong>
          </div>

          <div className="ep-input-group">
            <label className="ep-label">Queixa principal</label>
            <textarea className="ep-textarea" rows={4} value={form.queixa} onChange={(event) => updateField('queixa', event.target.value)} />
          </div>

          <div className="ep-grid-4 ep-gap-4">
            <div className="ep-input-group"><label className="ep-label">PA</label><input className="ep-input" value={form.pa} onChange={(event) => updateField('pa', event.target.value)} /></div>
            <div className="ep-input-group"><label className="ep-label">Temperatura</label><input className="ep-input" value={form.temperatura} onChange={(event) => updateField('temperatura', event.target.value)} /></div>
            <div className="ep-input-group"><label className="ep-label">Saturação</label><input className="ep-input" value={form.saturacao} onChange={(event) => updateField('saturacao', event.target.value)} /></div>
            <div className="ep-input-group"><label className="ep-label">Frequência cardíaca</label><input className="ep-input" value={form.frequencia} onChange={(event) => updateField('frequencia', event.target.value)} /></div>
            <div className="ep-input-group"><label className="ep-label">Glicemia</label><input className="ep-input" value={form.glicemia} onChange={(event) => updateField('glicemia', event.target.value)} /></div>
            <div className="ep-input-group"><label className="ep-label">Peso</label><input className="ep-input" value={form.peso} onChange={(event) => updateField('peso', event.target.value)} /></div>
            <div className="ep-input-group"><label className="ep-label">Altura</label><input className="ep-input" value={form.altura} onChange={(event) => updateField('altura', event.target.value)} /></div>
            <div className="ep-input-group"><label className="ep-label">Dor 0-10</label><input className="ep-input" value={form.dor} onChange={(event) => updateField('dor', event.target.value)} /></div>
          </div>

          <div className="ep-grid-2 ep-gap-4">
            <div className="ep-input-group">
              <label className="ep-label">Classificação de risco</label>
              <select className="ep-select" value={form.prioridade} onChange={(event) => updateField('prioridade', event.target.value)}>
                <option>Vermelho</option>
                <option>Amarelo</option>
                <option>Verde</option>
                <option>Azul</option>
              </select>
            </div>
            <div className="ep-input-group">
              <label className="ep-label">Destino</label>
              <select className="ep-select" value={form.destino} onChange={(event) => updateField('destino', event.target.value)}>
                <option>Consultório médico</option>
                <option>Sala de medicação</option>
                <option>Observação</option>
                <option>Odontologia</option>
                <option>Urgência externa</option>
              </select>
            </div>
          </div>

          <div className="ep-input-group">
            <label className="ep-label">Observações e conduta</label>
            <textarea className="ep-textarea" rows={5} value={form.observacao} onChange={(event) => updateField('observacao', event.target.value)} />
          </div>

          <div className="ep-record-actions">
            <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => history.push('/funcionarios/enfermeiros/triagem')}>Cancelar</button>
            <button className="ep-btn ep-btn--primary ep-btn--sm"><FaSave /> Salvar e encaminhar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriagemAtendimento;
