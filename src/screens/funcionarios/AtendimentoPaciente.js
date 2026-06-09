import React, { useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaClipboardCheck, FaDownload, FaExclamationTriangle, FaFileAlt, FaFileMedical, FaHeartbeat, FaHistory, FaIdCard, FaPills, FaPlus, FaPrint, FaSave, FaSignature, FaStethoscope, FaTasks } from 'react-icons/fa';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import HeaderTop from '../../HeaderTop';
import logoPrefeitura from '../../assets/sao_luis_do_curu1.png.600x600_q85_box-0,0,108,108_crop_detail.png';
import { getPatientRecord, statusClass } from './FuncionarioPage';

pdfMake.vfs = pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts;

const fallbackPatient = (nome) => ({
  paciente: nome || 'Paciente',
  title: 'Consulta',
  meta: 'UBS Centro · Atendimento em andamento',
  status: 'Em atendimento',
  tipo: 'Atendimento',
  unidade: 'UBS Centro',
});

const sanitizeFileName = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-zA-Z0-9]+/g, '_')
  .replace(/^_|_$/g, '');

const documentHeader = {
  stack: [
    { image: 'logo', width: 52, alignment: 'center', margin: [0, 18, 0, 5] },
    { text: 'ESTADO DO CEARÁ', style: 'headerSub' },
    { text: 'PREFEITURA MUNICIPAL DE SÃO LUÍS DO CURU', style: 'headerMain' },
    { text: 'SECRETARIA MUNICIPAL DE SAÚDE', style: 'headerSub' },
    { text: 'Rua General Potiguara, S/N · Centro · CEP 62.665-000', style: 'headerAddress' },
  ],
};

const baseDoc = (title, patient, professionalCouncil, content) => ({
  pageSize: 'A4',
  pageMargins: [42, 155, 42, 72],
  header: documentHeader,
  footer: (currentPage, pageCount) => ({
    columns: [
      { text: 'Documento emitido pelo ePaciente · Secretaria Municipal de Saúde', style: 'footerText' },
      { text: `Página ${currentPage}/${pageCount}`, style: 'footerText', alignment: 'right' },
    ],
    margin: [42, 20, 42, 0],
  }),
  content: [
    { text: title, style: 'title', margin: [0, 0, 0, 18] },
    {
      table: {
        widths: ['*', '*'],
        body: [
          [
            { text: [{ text: 'Paciente: ', bold: true }, patient.paciente], style: 'infoCell' },
            { text: [{ text: 'Unidade: ', bold: true }, patient.unidade || 'UBS Centro'], style: 'infoCell' },
          ],
          [
            { text: [{ text: 'Atendimento: ', bold: true }, patient.title || 'Consulta'], style: 'infoCell' },
            { text: [{ text: 'Data de emissão: ', bold: true }, new Date().toLocaleDateString('pt-BR')], style: 'infoCell' },
          ],
        ],
      },
      layout: {
        hLineColor: () => '#dfe3ea',
        vLineColor: () => '#dfe3ea',
        paddingLeft: () => 8,
        paddingRight: () => 8,
        paddingTop: () => 7,
        paddingBottom: () => 7,
      },
      margin: [0, 0, 0, 20],
    },
    ...content,
    {
      stack: [
        { text: 'Assinado digitalmente', bold: true, alignment: 'center', margin: [0, 28, 0, 3] },
        { text: `Dr. Responsável · ${professionalCouncil} · ICP-Brasil`, alignment: 'center', fontSize: 9, color: '#4b5563' },
        { text: 'Validação por QR Code disponível na versão integrada ao backend municipal.', alignment: 'center', fontSize: 8, color: '#6b7280', italics: true, margin: [0, 4, 0, 0] },
      ],
    },
  ],
  styles: {
    headerMain: { fontSize: 12, bold: true, alignment: 'center', color: '#003f7d' },
    headerSub: { fontSize: 9.5, alignment: 'center', color: '#475569' },
    headerAddress: { fontSize: 8.5, alignment: 'center', color: '#64748b', margin: [0, 3, 0, 0] },
    title: { fontSize: 16, bold: true, alignment: 'center', color: '#111827' },
    sectionTitle: { fontSize: 11, bold: true, color: '#003f7d', margin: [0, 12, 0, 8] },
    tableHeader: { fontSize: 10, bold: true, color: '#FFFFFF', fillColor: '#003f7d', margin: [6, 8, 6, 8] },
    tableCell: { fontSize: 10, margin: [6, 8, 6, 8], color: '#1f2937' },
    infoCell: { fontSize: 9.5, color: '#1f2937' },
    paragraph: { fontSize: 10.5, lineHeight: 1.4, color: '#1f2937' },
    footerText: { fontSize: 8, color: '#64748b' },
  },
  images: { logo: window.location.origin + logoPrefeitura },
});

const AtendimentoPaciente = () => {
  const location = useLocation();
  const { paciente } = useParams();
  const patient = location.state?.patient || fallbackPatient(decodeURIComponent(paciente || 'Paciente'));
  const moduleKey = location.state?.moduleKey || 'medicos';
  const selectedRecord = useMemo(() => getPatientRecord(patient.paciente), [patient.paciente]);
  const patientPhoto = `https://api.dicebear.com/8.x/personas/svg?seed=${encodeURIComponent(patient.paciente)}&backgroundColor=e0f2fe,dbeafe,f0fdf4`;
  const professionalCouncil = moduleKey === 'dentistas' ? 'CRO-CE 9182' : 'CRM-CE 18472';

  const [activeTab, setActiveTab] = useState('resumo');
  const [evolucao, setEvolucao] = useState('Paciente avaliado em consulta. Conduta registrada conforme queixa principal, exame físico e histórico do prontuário.');
  const [soap, setSoap] = useState({
    subjetivo: 'Queixa principal registrada pelo cidadão durante a consulta.',
    objetivo: selectedRecord.sinais || 'Sinais vitais e exame físico em atualização.',
    avaliacao: (selectedRecord.condicoes || []).join('; ') || 'Avaliação clínica em andamento.',
    plano: 'Orientações, prescrição e acompanhamento conforme necessidade clínica.',
  });
  const [receitaMedicamentos, setReceitaMedicamentos] = useState((selectedRecord.receitas || []).slice(0, 2).map((receita) => {
    const [medicamento, uso] = receita.split('·').map((value) => value.trim());
    return { medicamento, uso: uso || 'Uso conforme orientação profissional.' };
  }));
  const [novoMedicamento, setNovoMedicamento] = useState('');
  const [novaPosologia, setNovaPosologia] = useState('');
  const [atestado, setAtestado] = useState({
    dias: '1',
    cid: '',
    finalidade: 'Compareceu a consulta médica nesta unidade, necessitando afastamento de suas atividades pelo período informado.',
  });

  const tabs = [
    { key: 'resumo', label: 'Folha de rosto' },
    { key: 'soap', label: 'SOAP' },
    { key: 'evolucao', label: 'Evolução livre' },
    { key: 'problemas', label: 'Problemas e alergias' },
    { key: 'medicoes', label: 'Medições' },
    { key: 'receita', label: 'Receita digital' },
    { key: 'atestado', label: 'Atestado' },
    { key: 'solicitacoes', label: 'Solicitações' },
    { key: 'arquivos', label: 'Arquivos' },
  ];

  const addMedicamento = () => {
    if (!novoMedicamento.trim() || !novaPosologia.trim()) return;
    setReceitaMedicamentos([...receitaMedicamentos, { medicamento: novoMedicamento.trim(), uso: novaPosologia.trim() }]);
    setNovoMedicamento('');
    setNovaPosologia('');
  };

  const downloadPdf = (title, content, filePrefix) => {
    const docDefinition = baseDoc(title, patient, professionalCouncil, content);
    pdfMake.createPdf(docDefinition).download(`${filePrefix}_${sanitizeFileName(patient.paciente)}.pdf`);
  };

  const generateReceitaPdf = () => {
    downloadPdf('RECEITUÁRIO MÉDICO DIGITAL', [
      { text: 'Medicamentos prescritos', style: 'sectionTitle' },
      {
        table: {
          headerRows: 1,
          widths: ['38%', '*'],
          body: [
            [{ text: 'MEDICAMENTO', style: 'tableHeader' }, { text: 'POSOLOGIA / FORMA DE USO', style: 'tableHeader' }],
            ...receitaMedicamentos.map((item) => [
              { text: item.medicamento, style: 'tableCell', bold: true },
              { text: item.uso, style: 'tableCell' },
            ]),
          ],
        },
        layout: 'lightHorizontalLines',
      },
      { text: 'Orientações gerais: seguir exatamente a forma de uso indicada e procurar a unidade em caso de reação adversa.', style: 'paragraph', margin: [0, 18, 0, 0] },
    ], 'Receita_Digital');
  };

  const generateAtestadoPdf = () => {
    downloadPdf('ATESTADO MÉDICO', [
      { text: 'Declaração', style: 'sectionTitle' },
      { text: atestado.finalidade, style: 'paragraph', margin: [0, 0, 0, 12] },
      { text: `Afastamento recomendado: ${atestado.dias} dia(s).`, style: 'paragraph' },
      { text: atestado.cid ? `CID informado: ${atestado.cid}.` : 'CID não informado por sigilo profissional ou opção clínica.', style: 'paragraph', margin: [0, 4, 0, 0] },
    ], 'Atestado_Medico');
  };

  const generateExamesPdf = () => {
    downloadPdf('SOLICITAÇÃO DE EXAMES', [
      { text: 'Exames solicitados', style: 'sectionTitle' },
      {
        table: {
          headerRows: 1,
          widths: ['*', '32%'],
          body: [
            [{ text: 'EXAME / PROCEDIMENTO', style: 'tableHeader' }, { text: 'PRIORIDADE', style: 'tableHeader' }],
            ...(selectedRecord.exames || ['Hemograma completo · rotina']).map((exame) => {
              const [nome, prioridade] = exame.split('·').map((value) => value.trim());
              return [
                { text: nome, style: 'tableCell', bold: true },
                { text: prioridade || 'Rotina', style: 'tableCell' },
              ];
            }),
          ],
        },
        layout: 'lightHorizontalLines',
      },
      { text: 'Justificativa clínica: solicitação vinculada ao atendimento e ao acompanhamento registrado no prontuário eletrônico.', style: 'paragraph', margin: [0, 18, 0, 0] },
    ], 'Solicitacao_Exames');
  };

  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-record-hero">
          <div className="ep-record-hero__main">
            <img className="ep-record-photo" src={patientPhoto} alt={`Foto de ${patient.paciente}`} />
            <div className="ep-record-hero__text">
              <div className="ep-text-sm ep-text-muted">{patient.tipo} · {patient.unidade}</div>
              <h1>{patient.paciente}</h1>
              <div className="ep-text-sm ep-text-muted">{patient.title} · {patient.meta}</div>
            </div>
          </div>
          <div className="ep-record-hero__actions">
            <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={() => setActiveTab('receita')}><FaPills /> Nova receita</button>
            <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => setActiveTab('atestado')}><FaFileAlt /> Gerar atestado</button>
            <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={() => setActiveTab('evolucao')}><FaSave /> Salvar evolução</button>
          </div>
        </div>

        <div className="ep-record-tabs">
          {tabs.map((tab) => (
            <button key={tab.key} className={activeTab === tab.key ? 'active' : ''} onClick={() => setActiveTab(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'resumo' && (
          <div className="ep-record-section">
            <div className="ep-record-grid ep-record-grid--3">
              <div className="ep-card ep-card--flat">
                <div className="ep-flex ep-items-center ep-gap-2 ep-text-muted ep-text-sm"><FaIdCard /> Cadastro</div>
                <div className="ep-text-sm ep-mt-3">CPF: {selectedRecord.cpf}</div>
                <div className="ep-text-sm ep-mt-1">CNS: {selectedRecord.cns}</div>
                <div className="ep-text-sm ep-mt-1">Nascimento: {selectedRecord.nascimento}</div>
                <div className="ep-text-sm ep-mt-1">Telefone: {selectedRecord.telefone}</div>
              </div>
              <div className="ep-card ep-card--flat">
                <div className="ep-flex ep-items-center ep-gap-2 ep-text-muted ep-text-sm"><FaHeartbeat /> Dados clínicos</div>
                <div className="ep-text-sm ep-mt-3">Alergias: {selectedRecord.alergias}</div>
                <div className="ep-text-sm ep-mt-1">Sinais: {selectedRecord.sinais}</div>
                <div className="ep-text-sm ep-mt-1">Endereço: {selectedRecord.endereco}</div>
              </div>
              <div className="ep-card ep-card--flat">
                <div className="ep-flex ep-items-center ep-gap-2 ep-text-muted ep-text-sm"><FaFileMedical /> Atendimento</div>
                <div className="ep-fw-bold ep-mt-3">{patient.title}</div>
                <div className="ep-text-sm ep-text-muted ep-mt-1">{patient.meta}</div>
                <span className={`ep-badge ${statusClass(patient.status)} ep-mt-3`}>{patient.status}</span>
              </div>
            </div>

            <div className="ep-record-grid ep-record-grid--4">
              <div className="ep-card ep-card--flat">
                <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaExclamationTriangle /> <strong>Alergias/Reações</strong></div>
                <div className="ep-text-sm ep-text-muted">{selectedRecord.alergias || 'Sem alergias informadas'}</div>
              </div>
              <div className="ep-card ep-card--flat">
                <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaTasks /> <strong>Problemas ativos</strong></div>
                {(selectedRecord.condicoes || []).map((condicao) => <span key={condicao} className="ep-badge ep-badge--neutral ep-mb-2">{condicao}</span>)}
              </div>
              <div className="ep-card ep-card--flat">
                <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaPills /> <strong>Medicamentos ativos</strong></div>
                {selectedRecord.receitas.map((receita) => <div key={receita} className="ep-text-sm ep-text-muted ep-mb-2">{receita}</div>)}
              </div>
              <div className="ep-card ep-card--flat">
                <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaFileMedical /> <strong>Últimos exames</strong></div>
                {selectedRecord.exames.map((exame) => <div key={exame} className="ep-text-sm ep-text-muted ep-mb-2">{exame}</div>)}
              </div>
            </div>

            <div className="ep-record-grid ep-record-grid--2">
              <div className="ep-card ep-card--flat">
                <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaHistory /> <strong>Histórico do paciente</strong></div>
                <div className="ep-flex-col ep-gap-2">
                  {selectedRecord.historico.map((entry) => <div key={entry} className="ep-text-sm ep-text-muted">{entry}</div>)}
                </div>
              </div>
              <div className="ep-card ep-card--flat">
                <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaClipboardCheck /> <strong>Condições acompanhadas</strong></div>
                <div className="ep-flex ep-gap-2" style={{ flexWrap: 'wrap' }}>
                  {selectedRecord.condicoes.map((condicao) => <span key={condicao} className="ep-badge ep-badge--neutral">{condicao}</span>)}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'soap' && (
          <div className="ep-record-grid ep-record-grid--2">
            {[
              ['subjetivo', 'S · Subjetivo', 'Anamnese, queixas, percepções e motivo da consulta.'],
              ['objetivo', 'O · Objetivo', 'Exame físico, sinais vitais, medições e achados objetivos.'],
              ['avaliacao', 'A · Avaliação', 'CIAP2/CID10, hipóteses, problemas e condições avaliadas.'],
              ['plano', 'P · Plano', 'Conduta, orientações, prescrições, exames, retorno e compartilhamento do cuidado.'],
            ].map(([field, title, helper]) => (
              <div key={field} className="ep-card ep-card--flat">
                <div className="ep-flex ep-items-center ep-gap-2 ep-mb-2"><FaStethoscope /> <strong>{title}</strong></div>
                <div className="ep-text-sm ep-text-muted ep-mb-3">{helper}</div>
                <textarea className="ep-textarea" rows={6} value={soap[field]} onChange={(event) => setSoap({ ...soap, [field]: event.target.value })} />
              </div>
            ))}
            <div className="ep-card ep-card--flat" style={{ gridColumn: '1 / -1' }}>
              <div className="ep-record-actions">
                <button className="ep-btn ep-btn--primary ep-btn--sm"><FaSave /> Salvar SOAP</button>
                <button className="ep-btn ep-btn--secondary ep-btn--sm"><FaSignature /> Assinar atendimento</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'problemas' && (
          <div className="ep-record-grid ep-record-grid--2">
            <div className="ep-card ep-card--flat">
              <h3 className="ep-font-md ep-fw-bold ep-mb-3">Lista de problemas/condições</h3>
              {(selectedRecord.condicoes || []).map((condicao) => (
                <div key={condicao} className="ep-problem-row">
                  <div>
                    <strong>{condicao}</strong>
                    <div className="ep-text-sm ep-text-muted">Situação: Ativo · Início estimado: informado no cadastro</div>
                  </div>
                  <span className="ep-badge ep-badge--primary">Ativo</span>
                </div>
              ))}
              <button className="ep-btn ep-btn--secondary ep-btn--sm ep-mt-4"><FaPlus /> Adicionar problema ou condição</button>
            </div>
            <div className="ep-card ep-card--flat">
              <h3 className="ep-font-md ep-fw-bold ep-mb-3">Alergias e reações adversas</h3>
              <div className="ep-problem-row">
                <div>
                  <strong>{selectedRecord.alergias || 'Sem alergias registradas'}</strong>
                  <div className="ep-text-sm ep-text-muted">Categoria: medicamento/alimento/ambiente · Criticidade: revisar</div>
                </div>
                <span className="ep-badge ep-badge--warning">Revisar</span>
              </div>
              <button className="ep-btn ep-btn--secondary ep-btn--sm ep-mt-4"><FaPlus /> Registrar alergia</button>
            </div>
          </div>
        )}

        {activeTab === 'medicoes' && (
          <div className="ep-record-grid ep-record-grid--3">
            {[
              ['Pressão arterial', '120/80 mmHg'],
              ['Glicemia capilar', patient.paciente === 'Maria Oliveira' ? '108 mg/dL' : 'Não aferida'],
              ['Saturação', patient.paciente === 'João Batista' ? '94%' : '98%'],
              ['Temperatura', '36,7ºC'],
              ['Peso', patient.paciente === 'Ana Clara' ? '64 kg' : '72 kg'],
              ['IMC', patient.paciente === 'Maria Oliveira' ? '27,4' : 'Em cálculo'],
            ].map(([label, value]) => (
              <div key={label} className="ep-card ep-card--flat">
                <div className="ep-text-sm ep-text-muted">{label}</div>
                <div className="ep-font-lg ep-fw-bold ep-mt-1">{value}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'evolucao' && (
          <div className="ep-card ep-card--flat">
            <h3 className="ep-font-md ep-fw-bold ep-mb-3">Evolução clínica</h3>
            <textarea className="ep-textarea" value={evolucao} onChange={(event) => setEvolucao(event.target.value)} rows={10} />
            <div className="ep-record-actions ep-mt-4">
              <button className="ep-btn ep-btn--primary ep-btn--sm"><FaSave /> Salvar no prontuário</button>
              <button className="ep-btn ep-btn--secondary ep-btn--sm"><FaSignature /> Assinar evolução</button>
            </div>
          </div>
        )}

        {activeTab === 'receita' && (
          <div className="ep-record-grid ep-record-grid--2">
            <div className="ep-card ep-card--flat">
              <h3 className="ep-font-md ep-fw-bold ep-mb-3">Medicamentos</h3>
              <div className="ep-flex-col ep-gap-3">
                {receitaMedicamentos.map((item) => (
                  <div key={`${item.medicamento}-${item.uso}`} className="ep-prescription-item">
                    <strong>{item.medicamento}</strong>
                    <span>{item.uso}</span>
                  </div>
                ))}
              </div>
              <div className="ep-grid-2 ep-gap-4 ep-mt-4">
                <div className="ep-input-group ep-mb-0">
                  <label className="ep-label">Medicamento</label>
                  <input className="ep-input" value={novoMedicamento} onChange={(event) => setNovoMedicamento(event.target.value)} placeholder="Ex: Amoxicilina 500mg" />
                </div>
                <div className="ep-input-group ep-mb-0">
                  <label className="ep-label">Forma de uso</label>
                  <input className="ep-input" value={novaPosologia} onChange={(event) => setNovaPosologia(event.target.value)} placeholder="Ex: 1 cápsula a cada 8h por 7 dias" />
                </div>
              </div>
              <button className="ep-btn ep-btn--secondary ep-btn--sm ep-mt-4" onClick={addMedicamento}><FaPlus /> Incluir medicamento</button>
            </div>
            <div className="ep-card ep-card--flat ep-document-preview">
              <div className="ep-text-sm ep-text-muted">Receita digital</div>
              <h3 className="ep-font-md ep-fw-bold ep-mb-3">{patient.paciente}</h3>
              {receitaMedicamentos.map((item) => (
                <div key={`preview-${item.medicamento}-${item.uso}`} className="ep-text-sm ep-mb-3">
                  <strong>{item.medicamento}</strong><br />{item.uso}
                </div>
              ))}
              <div className="ep-digital-signature">
                <FaSignature />
                <div>
                  <strong>Assinado digitalmente</strong>
                  <span>Dr. Responsável · {professionalCouncil} · ICP-Brasil</span>
                </div>
              </div>
              <div className="ep-record-actions ep-mt-4">
                <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={generateReceitaPdf}><FaSignature /> Assinar e emitir</button>
                <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={generateReceitaPdf}><FaPrint /> Gerar PDF</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'atestado' && (
          <div className="ep-record-grid ep-record-grid--2">
            <div className="ep-card ep-card--flat">
              <h3 className="ep-font-md ep-fw-bold ep-mb-3">Gerar atestado médico</h3>
              <div className="ep-grid-2 ep-gap-4">
                <div className="ep-input-group">
                  <label className="ep-label">Dias de afastamento</label>
                  <input className="ep-input" value={atestado.dias} onChange={(event) => setAtestado({ ...atestado, dias: event.target.value })} />
                </div>
                <div className="ep-input-group">
                  <label className="ep-label">CID opcional</label>
                  <input className="ep-input" value={atestado.cid} onChange={(event) => setAtestado({ ...atestado, cid: event.target.value })} placeholder="Ex: J06.9" />
                </div>
              </div>
              <div className="ep-input-group ep-mb-0">
                <label className="ep-label">Texto do atestado</label>
                <textarea className="ep-textarea" value={atestado.finalidade} onChange={(event) => setAtestado({ ...atestado, finalidade: event.target.value })} rows={7} />
              </div>
            </div>
            <div className="ep-card ep-card--flat ep-document-preview">
              <div className="ep-text-sm ep-text-muted">Atestado médico</div>
              <h3 className="ep-font-md ep-fw-bold ep-mb-3">{patient.paciente}</h3>
              <p className="ep-text-sm ep-text-muted">{atestado.finalidade}</p>
              <p className="ep-text-sm ep-text-muted">Afastamento: {atestado.dias} dia(s). {atestado.cid ? `CID: ${atestado.cid}.` : 'CID não informado por sigilo ou opção clínica.'}</p>
              <div className="ep-digital-signature">
                <FaSignature />
                <div>
                  <strong>Assinado digitalmente</strong>
                  <span>Dr. Responsável · {professionalCouncil} · validade conferível por QR Code</span>
                </div>
              </div>
              <div className="ep-record-actions ep-mt-4">
                <button className="ep-btn ep-btn--primary ep-btn--sm" onClick={generateAtestadoPdf}><FaSignature /> Assinar atestado</button>
                <button className="ep-btn ep-btn--secondary ep-btn--sm" onClick={generateAtestadoPdf}><FaPrint /> Gerar PDF</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'solicitacoes' && (
          <div className="ep-record-grid ep-record-grid--3">
            <div className="ep-card ep-card--flat">
              <h3 className="ep-font-md ep-fw-bold ep-mb-3">Receitas</h3>
              {selectedRecord.receitas.map((receita) => <div key={receita} className="ep-text-sm ep-text-muted ep-mb-2">{receita}</div>)}
            </div>
            <div className="ep-card ep-card--flat">
              <h3 className="ep-font-md ep-fw-bold ep-mb-3">Exames</h3>
              {selectedRecord.exames.map((exame) => <div key={exame} className="ep-text-sm ep-text-muted ep-mb-2">{exame}</div>)}
              <button className="ep-btn ep-btn--secondary ep-btn--sm ep-mt-4" onClick={generateExamesPdf}><FaPlus /> Solicitar exame</button>
            </div>
            <div className="ep-card ep-card--flat">
              <h3 className="ep-font-md ep-fw-bold ep-mb-3">Encaminhamentos</h3>
              {selectedRecord.encaminhamentos.map((encaminhamento) => <div key={encaminhamento} className="ep-text-sm ep-text-muted ep-mb-2">{encaminhamento}</div>)}
              <button className="ep-btn ep-btn--secondary ep-btn--sm ep-mt-4"><FaPlus /> Novo encaminhamento</button>
            </div>
          </div>
        )}

        {activeTab === 'arquivos' && (
          <div className="ep-card ep-card--flat">
            <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3"><FaFileAlt /> <strong>Arquivos do paciente</strong></div>
            <div className="ep-flex-col ep-gap-3">
              {selectedRecord.arquivos.map((arquivo) => (
                <div key={arquivo.nome} className="ep-file-row">
                  <div>
                    <div className="ep-fw-bold">{arquivo.nome}</div>
                    <div className="ep-text-sm ep-text-muted">{arquivo.tipo} · {arquivo.data}</div>
                  </div>
                  <button className="ep-btn ep-btn--secondary ep-btn--sm" type="button">
                    <FaDownload /> Abrir
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtendimentoPaciente;
