import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaAddressCard, FaEdit, FaFilter, FaIdCard, FaMapMarkerAlt, FaPlus, FaSave, FaSearch, FaTimes, FaUserCheck } from 'react-icons/fa';
import HeaderTop from '../../../HeaderTop';

const initialPatients = [
  {
    id: 1,
    nome: 'Maria Oliveira',
    nomeSocial: '',
    cpf: '284.981.442-10',
    cns: '705 0042 9811 0008',
    nascimento: '1982-03-14',
    sexo: 'Feminino',
    racaCor: 'Parda',
    mae: 'Raimunda Oliveira',
    pai: 'José Oliveira',
    telefone: '(85) 98842-1100',
    email: 'maria.oliveira@email.com',
    cep: '62665-000',
    logradouro: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    municipio: 'São Luís do Curu',
    uf: 'CE',
    microarea: '02',
    equipe: 'ESF Centro',
    situacaoRua: 'Não',
    responsavel: 'A própria',
    condicoes: 'Hipertensão; Diabetes tipo 2',
    status: 'Cadastro completo',
  },
  {
    id: 2,
    nome: 'João Batista',
    nomeSocial: '',
    cpf: '901.412.774-35',
    cns: '898 1120 4521 0031',
    nascimento: '1974-11-08',
    sexo: 'Masculino',
    racaCor: 'Branca',
    mae: 'Maria Batista',
    pai: 'Desconhecido',
    telefone: '(85) 99714-2038',
    email: '',
    cep: '62665-000',
    logradouro: 'Av. Principal',
    numero: '742',
    bairro: 'Centro',
    municipio: 'São Luís do Curu',
    uf: 'CE',
    microarea: '01',
    equipe: 'ESF Centro',
    situacaoRua: 'Não',
    responsavel: 'A própria',
    condicoes: 'Asma',
    status: 'Revisar contato',
  },
];

const emptyForm = {
  nome: '',
  nomeSocial: '',
  cpf: '',
  cns: '',
  nascimento: '',
  sexo: '',
  racaCor: '',
  mae: '',
  pai: '',
  telefone: '',
  email: '',
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  municipio: 'São Luís do Curu',
  uf: 'CE',
  microarea: '',
  equipe: '',
  situacaoRua: 'Não',
  responsavel: '',
  condicoes: '',
  deficiencia: '',
  nacionalidade: 'Brasileira',
  paisNascimento: 'Brasil',
};

const requiredFields = ['nome', 'cpf', 'cns', 'nascimento', 'sexo', 'racaCor', 'mae', 'logradouro', 'bairro', 'municipio', 'uf'];

const statusClass = (status) => status === 'Cadastro completo' ? 'ep-badge--success' : 'ep-badge--warning';

const RecepcaoPacientes = () => {
  const history = useHistory();
  const [patients, setPatients] = useState(initialPatients);
  const [busca, setBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('Todos');
  const [selectedPatient, setSelectedPatient] = useState(initialPatients[0]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filteredPatients = useMemo(() => patients.filter((patient) => {
    const query = `${patient.nome} ${patient.nomeSocial} ${patient.cpf} ${patient.cns} ${patient.telefone} ${patient.bairro}`.toLowerCase();
    const matchesBusca = query.includes(busca.toLowerCase());
    const matchesStatus = statusFiltro === 'Todos' || patient.status === statusFiltro;
    return matchesBusca && matchesStatus;
  }), [patients, busca, statusFiltro]);

  const completion = useMemo(() => {
    const filled = requiredFields.filter((field) => selectedPatient?.[field]).length;
    return Math.round((filled / requiredFields.length) * 100);
  }, [selectedPatient]);

  const handleChange = (field, value) => setForm({ ...form, [field]: value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const missing = requiredFields.some((field) => !form[field]);
    const newPatient = {
      ...form,
      id: Date.now(),
      status: missing ? 'Revisar contato' : 'Cadastro completo',
    };
    setPatients([newPatient, ...patients]);
    setSelectedPatient(newPatient);
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-card ep-card--flat ep-mb-6">
          <div className="ep-flex ep-justify-between ep-items-center ep-gap-4" style={{ flexWrap: 'wrap' }}>
            <div>
              <div className="ep-text-sm ep-text-muted">Recepção</div>
              <h2 className="ep-font-xl ep-fw-bold">Pacientes e CadSUS</h2>
              <div className="ep-text-sm ep-text-muted ep-mt-1">Consulta, atualização e cadastro individual para atendimento na rede municipal.</div>
            </div>
            <div className="ep-record-actions">
              <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => history.push('/funcionarios/recepcao/fila')}>
                <FaUserCheck /> Iniciar demanda espontânea
              </button>
              <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={() => setShowForm(true)}>
                <FaPlus /> Novo paciente
              </button>
            </div>
          </div>
        </div>

        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat">
            <div className="ep-text-sm ep-text-muted">Pacientes cadastrados</div>
            <div className="ep-font-xl ep-fw-bold ep-mt-1">{patients.length}</div>
          </div>
          <div className="ep-card ep-card--flat">
            <div className="ep-text-sm ep-text-muted">Cadastros completos</div>
            <div className="ep-font-xl ep-fw-bold ep-mt-1">{patients.filter((item) => item.status === 'Cadastro completo').length}</div>
          </div>
          <div className="ep-card ep-card--flat">
            <div className="ep-text-sm ep-text-muted">Selecionado</div>
            <div className="ep-font-xl ep-fw-bold ep-mt-1">{completion}%</div>
          </div>
        </div>

        <div className="ep-record-grid ep-record-grid--2">
          <div className="ep-card ep-card--flat">
            <div className="ep-flex ep-items-center ep-gap-2 ep-mb-4" style={{ color: 'var(--color-primary)' }}>
              <FaFilter />
              <span className="ep-text-sm ep-fw-bold">Busca de pacientes</span>
            </div>
            <div className="ep-grid-2 ep-gap-4 ep-mb-6">
              <div className="ep-input-group ep-mb-0">
                <label className="ep-label">Buscar</label>
                <div className="ep-flex ep-items-center ep-gap-2 ep-input">
                  <FaSearch className="ep-text-muted" />
                  <input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Nome, CPF, CNS ou bairro" style={{ border: 0, outline: 0, width: '100%', background: 'transparent' }} />
                </div>
              </div>
              <div className="ep-input-group ep-mb-0">
                <label className="ep-label">Status</label>
                <select className="ep-select" value={statusFiltro} onChange={(event) => setStatusFiltro(event.target.value)}>
                  <option>Todos</option>
                  <option>Cadastro completo</option>
                  <option>Revisar contato</option>
                </select>
              </div>
            </div>

            <div className="ep-flex-col ep-gap-3">
              {filteredPatients.map((patient) => (
                <button key={patient.id} className="ep-patient-list-item" onClick={() => setSelectedPatient(patient)}>
                  <div className="ep-avatar ep-avatar--sm" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                    <FaUserCheck />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="ep-fw-bold">{patient.nome}</div>
                    <div className="ep-text-sm ep-text-muted">CPF {patient.cpf} · CNS {patient.cns}</div>
                  </div>
                  <span className={`ep-badge ${statusClass(patient.status)}`}>{patient.status}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedPatient && (
            <div className="ep-card ep-card--flat">
              <div className="ep-flex ep-justify-between ep-items-start ep-gap-4 ep-mb-5">
                <div>
                  <div className="ep-text-sm ep-text-muted">Prontuário cadastral</div>
                  <h3 className="ep-font-lg ep-fw-bold">{selectedPatient.nome}</h3>
                  {selectedPatient.nomeSocial && <div className="ep-text-sm ep-text-muted">Nome social: {selectedPatient.nomeSocial}</div>}
                </div>
                <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => { setForm({ ...emptyForm, ...selectedPatient }); setShowForm(true); }}>
                  <FaEdit /> Editar
                </button>
              </div>

              <div className="ep-patient-detail-grid">
                <div>
                  <div className="ep-flex ep-items-center ep-gap-2 ep-fw-bold ep-mb-2"><FaIdCard /> Identificação</div>
                  <p>CPF: {selectedPatient.cpf}</p>
                  <p>CNS: {selectedPatient.cns}</p>
                  <p>Nascimento: {selectedPatient.nascimento}</p>
                  <p>Sexo: {selectedPatient.sexo} · Raça/cor: {selectedPatient.racaCor}</p>
                  <p>Mãe: {selectedPatient.mae}</p>
                  <p>Pai: {selectedPatient.pai}</p>
                </div>
                <div>
                  <div className="ep-flex ep-items-center ep-gap-2 ep-fw-bold ep-mb-2"><FaMapMarkerAlt /> Endereço e território</div>
                  <p>{selectedPatient.logradouro}, {selectedPatient.numero} · {selectedPatient.bairro}</p>
                  <p>{selectedPatient.municipio}/{selectedPatient.uf} · CEP {selectedPatient.cep}</p>
                  <p>Equipe: {selectedPatient.equipe || 'Não vinculada'} · Microárea: {selectedPatient.microarea || 'N/I'}</p>
                  <p>Situação de rua: {selectedPatient.situacaoRua}</p>
                </div>
                <div>
                  <div className="ep-flex ep-items-center ep-gap-2 ep-fw-bold ep-mb-2"><FaAddressCard /> Contato e saúde</div>
                  <p>Telefone: {selectedPatient.telefone || 'Não informado'}</p>
                  <p>E-mail: {selectedPatient.email || 'Não informado'}</p>
                  <p>Responsável familiar: {selectedPatient.responsavel || 'Não informado'}</p>
                  <p>Condições: {selectedPatient.condicoes || 'Não informadas'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {showForm && (
          <div className="ep-modal-overlay" onClick={() => setShowForm(false)}>
            <form className="ep-modal ep-patient-register-modal" onClick={(event) => event.stopPropagation()} onSubmit={handleSubmit}>
              <div className="ep-flex ep-justify-between ep-items-start ep-gap-4 ep-mb-6">
                <div>
                  <div className="ep-text-sm ep-text-muted">Cadastro individual</div>
                  <h2 className="ep-modal-title">Paciente SUS</h2>
                </div>
                <button className="ep-btn ep-btn--ghost ep-btn--icon" type="button" onClick={() => setShowForm(false)} aria-label="Fechar cadastro">
                  <FaTimes />
                </button>
              </div>

              <div className="ep-form-section">
                <h3>Identificação do cidadão</h3>
                <div className="ep-grid-3 ep-gap-4">
                  <Field label="Nome completo" value={form.nome} onChange={(value) => handleChange('nome', value)} required />
                  <Field label="Nome social" value={form.nomeSocial} onChange={(value) => handleChange('nomeSocial', value)} />
                  <Field label="CPF" value={form.cpf} onChange={(value) => handleChange('cpf', value)} required />
                  <Field label="CNS" value={form.cns} onChange={(value) => handleChange('cns', value)} required />
                  <Field label="Data de nascimento" type="date" value={form.nascimento} onChange={(value) => handleChange('nascimento', value)} required />
                  <SelectField label="Sexo" value={form.sexo} onChange={(value) => handleChange('sexo', value)} options={['', 'Feminino', 'Masculino', 'Intersexo', 'Não informado']} required />
                  <SelectField label="Raça/cor" value={form.racaCor} onChange={(value) => handleChange('racaCor', value)} options={['', 'Branca', 'Preta', 'Parda', 'Amarela', 'Indígena']} required />
                  <Field label="Nome da mãe" value={form.mae} onChange={(value) => handleChange('mae', value)} required />
                  <Field label="Nome do pai" value={form.pai} onChange={(value) => handleChange('pai', value)} />
                </div>
              </div>

              <div className="ep-form-section">
                <h3>Contato, endereço e território</h3>
                <div className="ep-grid-3 ep-gap-4">
                  <Field label="Telefone" value={form.telefone} onChange={(value) => handleChange('telefone', value)} />
                  <Field label="E-mail" value={form.email} onChange={(value) => handleChange('email', value)} />
                  <Field label="CEP" value={form.cep} onChange={(value) => handleChange('cep', value)} />
                  <Field label="Logradouro" value={form.logradouro} onChange={(value) => handleChange('logradouro', value)} required />
                  <Field label="Número" value={form.numero} onChange={(value) => handleChange('numero', value)} />
                  <Field label="Complemento" value={form.complemento} onChange={(value) => handleChange('complemento', value)} />
                  <Field label="Bairro" value={form.bairro} onChange={(value) => handleChange('bairro', value)} required />
                  <Field label="Município" value={form.municipio} onChange={(value) => handleChange('municipio', value)} required />
                  <Field label="UF" value={form.uf} onChange={(value) => handleChange('uf', value)} required />
                  <Field label="Equipe ESF" value={form.equipe} onChange={(value) => handleChange('equipe', value)} />
                  <Field label="Microárea" value={form.microarea} onChange={(value) => handleChange('microarea', value)} />
                  <SelectField label="Está em situação de rua?" value={form.situacaoRua} onChange={(value) => handleChange('situacaoRua', value)} options={['Não', 'Sim']} />
                </div>
              </div>

              <div className="ep-form-section">
                <h3>Dados complementares APS</h3>
                <div className="ep-grid-3 ep-gap-4">
                  <Field label="Responsável familiar" value={form.responsavel} onChange={(value) => handleChange('responsavel', value)} />
                  <Field label="Nacionalidade" value={form.nacionalidade} onChange={(value) => handleChange('nacionalidade', value)} />
                  <Field label="País de nascimento" value={form.paisNascimento} onChange={(value) => handleChange('paisNascimento', value)} />
                  <Field label="Deficiência" value={form.deficiencia} onChange={(value) => handleChange('deficiencia', value)} />
                  <div className="ep-input-group" style={{ gridColumn: 'span 2' }}>
                    <label className="ep-label">Condições de saúde autorreferidas</label>
                    <textarea className="ep-textarea" rows={3} value={form.condicoes} onChange={(event) => handleChange('condicoes', event.target.value)} placeholder="Hipertensão, diabetes, gestação, deficiência, alergias..." />
                  </div>
                </div>
              </div>

              <div className="ep-modal-footer">
                <button className="ep-btn ep-btn--secondary" type="button" onClick={() => setShowForm(false)}>Cancelar</button>
                <button className="ep-btn ep-btn--primary" type="submit"><FaSave /> Salvar cadastro</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange, type = 'text', required = false }) => (
  <div className="ep-input-group">
    <label className="ep-label">{label}{required ? ' *' : ''}</label>
    <input className="ep-input" type={type} value={value} onChange={(event) => onChange(event.target.value)} required={required} />
  </div>
);

const SelectField = ({ label, value, onChange, options, required = false }) => (
  <div className="ep-input-group">
    <label className="ep-label">{label}{required ? ' *' : ''}</label>
    <select className="ep-select" value={value} onChange={(event) => onChange(event.target.value)} required={required}>
      {options.map((option) => <option key={option} value={option}>{option || 'Selecione'}</option>)}
    </select>
  </div>
);

export default RecepcaoPacientes;
