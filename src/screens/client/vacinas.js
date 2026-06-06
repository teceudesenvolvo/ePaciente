import React, { useState } from 'react';
import { 
  FaSyringe, FaCalendarAlt, FaMapMarkerAlt, FaTimes, FaInfoCircle, 
  FaDownload, FaCheckDouble 
} from 'react-icons/fa';
import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import logoPrefeitura from '../../assets/sao_luis_do_curu1.png.600x600_q85_box-0,0,108,108_crop_detail.png';
import HeaderTop from '../../HeaderTop';

// Correção para o erro de carregamento das fontes (VFS) do pdfMake
pdfMake.vfs = pdfFonts && pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts;

const Vacinas = () => {
  const [selectedVacina, setSelectedVacina] = useState(null);

  const historicoVacinas = [
    { id: 1, nome: "COVID-19 (Pfizer)", data: "15/01/2024", local: "UBS Centro", lote: "FJ2102", dose: "Reforço", status: "Aplicada" },
    { id: 2, nome: "Influenza", data: "10/05/2024", local: "UBS Bairro Novo", lote: "24P412V", dose: "Anual", status: "Aplicada" },
    { id: 3, nome: "Antitetânica", data: "Aguardando", local: "UBS Centro", dose: "Dose 3", status: "Pendente" },
  ];

  const calendarioMunicipio = [
    { id: 101, nome: "Campanha Poliomielite", periodo: "01/06 a 30/06", publico: "Crianças de 1 a 5 anos", local: "Todas as UBS" },
    { id: 102, nome: "Multivacinação", periodo: "Permanente", publico: "Público Geral", local: "UBS Centro e Bairro Novo" },
  ];

  const handleGeneratePDF = () => {
    const aplicadas = historicoVacinas.filter(v => v.status === 'Aplicada');

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
      footer: (currentPage, pageCount) => ({
        stack: [
          { canvas: [{ type: 'line', x1: 40, y1: 0, x2: 555, y2: 0, lineWidth: 0.5, lineColor: '#EEEEEE' }] },
          { text: 'Secretaria Municipal de Saúde - Rua Principal, 100, São Luís do Curu/CE - CEP: 62650-000', style: 'footerText' },
          { text: `Página ${currentPage} de ${pageCount}`, style: 'footerText' }
        ],
        margin: [0, 10]
      }),
      content: [
        { text: 'CARTÃO DE VACINAÇÃO DIGITAL', style: 'title', margin: [0, 20, 0, 20] },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto', 'auto', '*'],
            body: [
              [
                { text: 'DATA', style: 'tableHeader' }, 
                { text: 'VACINA', style: 'tableHeader' }, 
                { text: 'DOSE', style: 'tableHeader' }, 
                { text: 'LOTE', style: 'tableHeader' }, 
                { text: 'LOCAL', style: 'tableHeader' }
              ],
              ...aplicadas.map(v => [
                { text: v.data, style: 'tableCell' },
                { text: v.nome, style: 'tableCellBold' },
                { text: v.dose, style: 'tableCell' },
                { text: v.lote || '-', style: 'tableCell' },
                { text: v.local, style: 'tableCell' }
              ])
            ]
          },
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        headerMain: { fontSize: 12, bold: true, alignment: 'center', color: '#004a8d' },
        headerSub: { fontSize: 10, alignment: 'center', color: '#666666' },
        title: { fontSize: 16, bold: true, alignment: 'center', color: '#1d1d1f' },
        tableHeader: { fontSize: 10, bold: true, color: '#FFFFFF', fillColor: '#004a8d', margin: [5, 5, 5, 5] },
        tableCell: { fontSize: 10, margin: [5, 5, 5, 5] },
        tableCellBold: { fontSize: 10, bold: true, margin: [5, 5, 5, 5] },
        footerText: { fontSize: 8, alignment: 'center', color: '#999999', margin: [0, 5] }
      },
      images: { logo: window.location.origin + logoPrefeitura }
    };

    try {
      pdfMake.createPdf(docDefinition).download(`Cartao_Vacina_${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF de vacinação:', error);
      alert('Não foi possível gerar o PDF no momento. Por favor, tente novamente.');
    }
  };

  return (
    <div className="ep-page" style={{ background: '#f5f5f7' }}>
      <HeaderTop>
        <button 
          className="ep-btn ep-btn--primary ep-flex ep-items-center ep-gap-2"
          style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '12px' }}
          onClick={handleGeneratePDF}
        >
          <FaDownload size={14} /> Baixar Cartão PDF
        </button>
      </HeaderTop>

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-alert ep-alert--info ep-mb-8">
          <span className="ep-alert__icon"><FaInfoCircle /></span>
          <div className="ep-alert__text">Consulte seu histórico de doses e as campanhas municipais ativas. Procure a UBS para vacinação.</div>
        </div>

        <div className="ep-flex ep-flex-col ep-gap-10">
          {/* Seção: Histórico Pessoal */}
          <div>
            <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
              <h3 className="ep-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 0, marginTop: '30px' }}>
                <FaCheckDouble style={{ color: 'var(--color-success)', fontSize: '18px'}} /> Histórico de Doses
              </h3>
            </div>
            <div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: 'var(--sp-4)' 
              }}
            >
              {historicoVacinas.map((item) => (
                <div 
                  key={item.id} 
                  className="ep-card ep-card--flat" 
                  style={{ padding: 'var(--sp-5)', cursor: 'pointer' }}
                  onClick={() => setSelectedVacina(item)}
                >
                  <div className="ep-flex ep-justify-between ep-items-start ep-mb-4">
                    <div className="ep-flex ep-gap-3 ep-items-center">
                      <div className="ep-icon-wrapper" style={{ background: item.status === 'Aplicada' ? 'var(--color-success-light)' : 'var(--color-warning-light)', color: item.status === 'Aplicada' ? 'var(--color-success)' : 'var(--color-warning)', width: '44px', height: '44px' }}>
                        <FaSyringe />
                      </div>
                      <div>
                        <h3 className="ep-font-md ep-fw-bold">{item.nome}</h3>
                        <p className="ep-text-sm ep-text-muted">{item.dose}</p>
                      </div>
                    </div>
                    <span className={`ep-badge ${item.status === 'Aplicada' ? 'ep-badge--success' : 'ep-badge--warning'}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="ep-flex-col ep-gap-2">
                    <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted">
                      <FaCalendarAlt size={14} className="ep-text-primary" /> {item.data}
                    </div>
                    <div className="ep-flex ep-items-center ep-gap-2 ep-text-sm ep-text-muted">
                      <FaMapMarkerAlt size={14} className="ep-text-error" /> {item.local}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seção: Calendário Municipal */}
          <div>
            <h3 className="ep-section-title ep-mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '30px' }}>
              <FaCalendarAlt style={{ color: 'var(--color-primary)', fontSize: '18px' }} /> Calendário do Município
            </h3>
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: 'var(--sp-4)' 
            }}
          >
            {calendarioMunicipio.map((campanha) => (
              <div 
                key={campanha.id} 
                className="ep-card ep-card--flat" 
                style={{ padding: 'var(--sp-5)', borderLeft: '4px solid var(--color-primary)' }}
              >
                <h4 className="ep-fw-bold ep-mb-2">{campanha.nome}</h4>
                <div className="ep-flex-col ep-gap-2">
                  <div className="ep-text-sm ep-text-muted"><strong>Público:</strong> {campanha.publico}</div>
                  <div className="ep-text-sm ep-text-muted ep-flex ep-items-center ep-gap-2">
                    <FaCalendarAlt className="ep-text-primary" size={12} /> {campanha.periodo}
                  </div>
                  <div className="ep-text-sm ep-text-muted ep-flex ep-items-center ep-gap-2">
                    <FaMapMarkerAlt className="ep-text-error" size={12} /> {campanha.local}
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Detalhes da Minha Vacina */}
      {selectedVacina && (
        <div className="ep-modal-overlay" onClick={() => setSelectedVacina(null)}>
          <div className="ep-modal" onClick={e => e.stopPropagation()}>
            <button className="ep-close-btn" style={{ position: 'absolute', top: '20px', right: '20px' }} onClick={() => setSelectedVacina(null)}><FaTimes /></button>
            <h2 className="ep-modal-title ep-mb-6">Detalhes da Vacina</h2>
            <div className="ep-flex ep-items-center ep-gap-4 ep-mb-8">
              <div className="ep-icon-wrapper ep-icon-wrapper--lg" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)' }}>
                <FaSyringe />
              </div>
              <div className="ep-flex-col">
                <h3 className="ep-font-xl ep-fw-bold">{selectedVacina.nome}</h3>
                <span className={`ep-badge ${selectedVacina.status === 'Aplicada' ? 'ep-badge--success' : 'ep-badge--warning'}`}>{selectedVacina.status}</span>
              </div>
            </div>
            <div className="ep-grid-2 ep-gap-4 ep-mb-8">
              <div className="ep-info-card">
                <span className="ep-label-xs">Lote</span>
                <p className="ep-value-sm">{selectedVacina.lote || 'N/A'}</p>
              </div>
              <div className="ep-info-card">
                <span className="ep-label-xs">Dose</span>
                <p className="ep-value-sm">{selectedVacina.dose}</p>
              </div>
            </div>
            <button className="ep-btn ep-btn--primary ep-btn--full" onClick={() => setSelectedVacina(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vacinas;