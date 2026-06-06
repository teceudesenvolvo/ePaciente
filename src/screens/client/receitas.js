import React, { useState } from 'react';
import { 
  FaFileMedical, FaUserMd, FaCalendarAlt, FaDownload, 
  FaTimes, FaInfoCircle, FaExclamationTriangle 
} from 'react-icons/fa';
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import HeaderTop from '../../HeaderTop';
import logoPrefeitura from '../../assets/sao_luis_do_curu1.png.600x600_q85_box-0,0,108,108_crop_detail.png';

// Correção para o carregamento das fontes do pdfMake
pdfMake.vfs = pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts;

const Receitas = () => {
  const [selectedReceita, setSelectedReceita] = useState(null);

  const listaReceitas = [
    { 
      id: 1, 
      medico: "Dr. Ricardo Santos", 
      especialidade: "Clínico Geral",
      data: "10/05/2026", 
      validade: "10/11/2026",
      medicamentos: [
        { nome: "Amoxicilina 500mg", posologia: "1 comprimido de 8 em 8 horas por 7 dias" },
        { nome: "Dipirona 500mg", posologia: "1 comprimido se houver febre ou dor" }
      ],
      status: "Disponível na UBS",
      corStatus: "success"
    },
    { 
      id: 2, 
      medico: "Dra. Ana Julia", 
      especialidade: "Cardiologista",
      data: "15/04/2026", 
      validade: "15/10/2026",
      medicamentos: [
        { nome: "Losartana 50mg", posologia: "1 comprimido pela manhã em jejum" }
      ],
      status: "Uso Contínuo",
      corStatus: "primary"
    }
  ];

  const handleGeneratePDF = (receita) => {
    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 140, 40, 60],
      header: {
        stack: [
          { image: 'logo', width: 50, alignment: 'center', margin: [0, 20, 0, 5] },
          { text: 'ESTADO DO CEARÁ', style: 'headerSub' },
          { text: 'PREFEITURA MUNICIPAL DE SÃO LUÍS DO CURU', style: 'headerMain' },
          { text: 'SECRETARIA MUNICIPAL DE SAÚDE', style: 'headerSub' },
        ],
        margin: [0, 10]
      },
      content: [
        { text: 'RECEITUÁRIO MÉDICO DIGITAL', style: 'title', margin: [0, 20, 0, 10] },
        { text: `Emitida em: ${receita.data}`, alignment: 'right', fontSize: 10, margin: [0, 0, 0, 20] },
        { 
          text: [
            { text: 'Paciente: ', bold: true }, 'LEONARDO RIBEIRO\n',
            { text: 'Médico(a): ', bold: true }, `${receita.medico} (${receita.especialidade})`
          ], 
          margin: [0, 0, 0, 30] 
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              [{ text: 'MEDICAMENTO', style: 'tableHeader' }, { text: 'POSOLOGIA / ORIENTAÇÃO', style: 'tableHeader' }],
              ...receita.medicamentos.map(m => [
                { text: m.nome, style: 'tableCellBold' },
                { text: m.posologia, style: 'tableCell' }
              ])
            ]
          },
          layout: 'lightHorizontalLines'
        },
        { text: '\n\nValidade desta receita: ' + receita.validade, style: 'footerText', bold: true, alignment: 'left' },
        { text: '\nDocumento assinado digitalmente conforme MP nº 2.200-2/2001.', style: 'footerText', italics: true, alignment: 'center', margin: [0, 50] }
      ],
      styles: {
        headerMain: { fontSize: 12, bold: true, alignment: 'center', color: '#004a8d' },
        headerSub: { fontSize: 10, alignment: 'center', color: '#666666' },
        title: { fontSize: 16, bold: true, alignment: 'center', color: '#1d1d1f' },
        tableHeader: { fontSize: 11, bold: true, color: '#FFFFFF', fillColor: '#004a8d', margin: [5, 8, 5, 8] },
        tableCell: { fontSize: 10, margin: [5, 10, 5, 10] },
        tableCellBold: { fontSize: 10, bold: true, margin: [5, 10, 5, 10] },
        footerText: { fontSize: 9, color: '#333333' }
      },
      images: { logo: window.location.origin + logoPrefeitura }
    };

    pdfMake.createPdf(docDefinition).download(`Receita_${receita.medico.replace(' ', '_')}.pdf`);
  };

  return (
    <div className="ep-page" style={{ background: '#f5f5f7' }}>
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-alert ep-alert--info ep-mb-8" style={{ marginBottom: '32px' }}>
          <span className="ep-alert__icon"><FaInfoCircle /></span>
          <div className="ep-alert__text">Suas receitas digitais possuem a mesma validade da receita em papel. Apresente o PDF na farmácia da UBS.</div>
        </div>

        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
            gap: 'var(--sp-4)' 
          }}
        >
          {listaReceitas.map((receita) => (
            <div 
              key={receita.id} 
              className="ep-card ep-card--flat" 
              style={{ padding: 'var(--sp-5)', cursor: 'pointer' }}
              onClick={() => setSelectedReceita(receita)}
            >
              <div className="ep-flex ep-justify-between ep-items-start ep-mb-4">
                <div className="ep-flex ep-gap-3 ep-items-center">
                  <div className="ep-icon-wrapper" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', width: '48px', height: '48px' }}>
                    <FaFileMedical />
                  </div>
                  <div>
                    <h3 className="ep-font-md ep-fw-bold">{receita.medico}</h3>
                    <p className="ep-text-sm ep-text-muted">{receita.especialidade}</p>
                  </div>
                </div>
                <span className={`ep-badge ep-badge--${receita.corStatus}`}>
                  {receita.status}
                </span>
              </div>

              <div className="ep-flex-col ep-gap-2">
                <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted">
                  <FaCalendarAlt size={14} className="ep-text-primary" /> Emitida em {receita.data}
                </div>
                <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted">
                  <FaExclamationTriangle size={14} className="ep-text-warning" /> Válida até {receita.validade}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalhes da Receita */}
      {selectedReceita && (
        <div className="ep-modal-overlay" onClick={() => setSelectedReceita(null)}>
          <div className="ep-modal" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <button className="ep-close-btn" style={{ position: 'absolute', top: '20px', right: '20px' }} onClick={() => setSelectedReceita(null)}><FaTimes /></button>
            
            <h2 className="ep-modal-title ep-mb-6">Detalhes da Prescrição</h2>
            
            <div className="ep-flex ep-items-center ep-gap-4 ep-mb-8">
              <div className="ep-icon-wrapper ep-icon-wrapper--lg" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
                <FaUserMd />
              </div>
              <div className="ep-flex-col">
                <h3 className="ep-font-xl ep-fw-bold">{selectedReceita.medico}</h3>
                <p className="ep-text-sm ep-text-muted">{selectedReceita.especialidade}</p>
              </div>
            </div>

            <div className="ep-flex-col ep-gap-4 ep-mb-8">
              <div className="ep-fw-bold ep-text-sm ep-text-primary ep-mb-1">Medicamentos:</div>
              {selectedReceita.medicamentos.map((m, index) => (
                <div key={index} style={{ padding: '12px', background: 'var(--color-n50)', borderRadius: '12px', border: '1px solid var(--color-n100)' }}>
                  <div className="ep-fw-semibold ep-text-sm">{m.nome}</div>
                  <div className="ep-text-xs ep-text-muted ep-mt-1">{m.posologia}</div>
                </div>
              ))}
            </div>

            <div className="ep-modal-footer ep-flex-col ep-gap-3">
              <button className="ep-btn ep-btn--primary ep-btn--full" onClick={() => handleGeneratePDF(selectedReceita)}>
                <FaDownload /> Baixar Receita Digital (PDF)
              </button>
              <button className="ep-btn ep-btn--ghost ep-btn--full" onClick={() => setSelectedReceita(null)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Receitas;