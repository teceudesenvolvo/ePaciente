import React, { useState } from 'react';
import { FaMapMarkerAlt, FaFilter } from 'react-icons/fa';

const ExecMapa = () => {
  const [filtro, setFiltro] = useState('dengue');

  return (
    <div className="ep-page">
      <div className="ep-page-header">
        <h1 className="ep-page-title">Mapa de Calor (Vigilância)</h1>
      </div>
      
      <div className="ep-content">
        <div className="ep-flex ep-gap-2 ep-mb-4 ep-overflow-x-auto" style={{ paddingBottom: 8 }}>
          <button 
            className={`ep-btn ep-btn--sm ${filtro === 'dengue' ? 'ep-btn--primary' : 'ep-btn--ghost'}`}
            onClick={() => setFiltro('dengue')}
          >
            Focos de Dengue
          </button>
          <button 
            className={`ep-btn ep-btn--sm ${filtro === 'respiratorio' ? 'ep-btn--primary' : 'ep-btn--ghost'}`}
            onClick={() => setFiltro('respiratorio')}
          >
            Síndromes Respiratórias
          </button>
          <button 
            className={`ep-btn ep-btn--sm ${filtro === 'vacina' ? 'ep-btn--primary' : 'ep-btn--ghost'}`}
            onClick={() => setFiltro('vacina')}
          >
            Baixa Cobertura Vacinal
          </button>
        </div>

        {/* Fake Map Container */}
        <div className="ep-card ep-card--flat ep-p-0 ep-overflow-hidden ep-mb-6" style={{ height: '300px', position: 'relative', background: '#e5e3df' }}>
           {/* Placeholder map graphic */}
           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(200,200,200,0.5) 0%, rgba(229,227,223,1) 100%)' }}></div>
           
           {filtro === 'dengue' && (
             <>
               <div style={{ position: 'absolute', top: '30%', left: '40%', width: 60, height: 60, background: 'radial-gradient(circle, rgba(255,59,48,0.8) 0%, rgba(255,59,48,0) 70%)' }}></div>
               <div style={{ position: 'absolute', top: '60%', left: '70%', width: 40, height: 40, background: 'radial-gradient(circle, rgba(255,59,48,0.8) 0%, rgba(255,59,48,0) 70%)' }}></div>
               <div style={{ position: 'absolute', top: '35%', left: '45%', color: 'var(--color-error)' }}><FaMapMarkerAlt size={20}/></div>
             </>
           )}

           {filtro === 'respiratorio' && (
             <>
               <div style={{ position: 'absolute', top: '50%', left: '50%', width: 80, height: 80, background: 'radial-gradient(circle, rgba(255,149,0,0.8) 0%, rgba(255,149,0,0) 70%)' }}></div>
               <div style={{ position: 'absolute', top: '55%', left: '55%', color: 'var(--color-warning)' }}><FaMapMarkerAlt size={20}/></div>
             </>
           )}

           <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 'bold' }}>
              Base Cartográfica © OpenStreetMap
           </div>
        </div>

        <div className="ep-card ep-card--flat">
          <div className="ep-flex ep-items-center ep-gap-2 ep-mb-3 ep-fw-bold">
            <FaFilter style={{ color: 'var(--color-n500)' }} /> Insights Automatizados
          </div>
          <p className="ep-text-sm ep-text-muted">
            {filtro === 'dengue' && "Alta concentração de casos no Bairro Alto (+45% na última semana). Sugestão: Direcionar agentes de endemias para quarteirões 12 a 18."}
            {filtro === 'respiratorio' && "Aumento de 20% em atendimentos pediátricos na UBS Centro. Clima seco é o fator provável."}
            {filtro === 'vacina' && "Zona Rural Sul apresenta cobertura de Influenza abaixo de 60%. Sugestão: Agendar unidade móvel para o próximo sábado."}
          </p>
          <button className="ep-btn ep-btn--primary ep-btn--full ep-mt-4 ep-btn--sm">Gerar Ordem de Serviço</button>
        </div>

      </div>
    </div>
  );
};

export default ExecMapa;
