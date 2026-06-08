import React from 'react';
import { FaCheckCircle, FaCrosshairs, FaMapMarkerAlt, FaMobileAlt, FaRoute } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';

const visitas = [
  { nome: 'João Batista', equipe: 'ACS Microárea 03', local: 'Bairro Alto', distancia: '28 m', status: 'Validado' },
  { nome: 'Marina Sousa', equipe: 'Vigilância', local: 'Centro', distancia: '42 m', status: 'Validado' },
  { nome: 'Carlos Eduardo', equipe: 'Transporte', local: 'Sítio Flores', distancia: '210 m', status: 'Revisar' },
];

const GestaoPontoGeolocalizacao = () => {
  return (
    <div className="ep-page">
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up">
        <div className="ep-grid-3 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-primary)', color: 'white' }}><FaMobileAlt /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Registros mobile</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">73</div>
            </div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-success)', color: 'white' }}><FaCheckCircle /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Validados</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">68</div>
            </div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div className="ep-avatar ep-avatar--md" style={{ background: 'var(--color-warning)', color: 'white' }}><FaCrosshairs /></div>
            <div>
              <div className="ep-text-sm ep-text-muted">Fora do raio</div>
              <div className="ep-font-xl ep-fw-bold ep-mt-1">5</div>
            </div>
          </div>
        </div>

        <div className="ep-card ep-card--flat ep-mb-6 ep-p-0 ep-overflow-hidden" style={{ height: 280, position: 'relative', background: 'linear-gradient(135deg, #e8f3ff 0%, #f7fff9 100%)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div style={{ position: 'absolute', left: '18%', top: '34%', color: 'var(--color-success)', fontSize: 28 }}><FaMapMarkerAlt /></div>
          <div style={{ position: 'absolute', left: '48%', top: '46%', color: 'var(--color-primary)', fontSize: 28 }}><FaMapMarkerAlt /></div>
          <div style={{ position: 'absolute', left: '72%', top: '28%', color: 'var(--color-warning)', fontSize: 28 }}><FaMapMarkerAlt /></div>
          <div className="ep-card ep-card--flat" style={{ position: 'absolute', left: 20, bottom: 20, maxWidth: 320, background: 'rgba(255,255,255,0.92)' }}>
            <div className="ep-flex ep-items-center ep-gap-2 ep-fw-bold ep-mb-2"><FaRoute /> Mapa de validação</div>
            <p className="ep-text-sm ep-text-muted">Raio permitido por unidade, rota ou território de atuação.</p>
          </div>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Registros geolocalizados</h3>
        </div>

        <div className="ep-flex-col ep-gap-3">
          {visitas.map((item) => (
            <div key={item.nome} className="ep-card ep-card--flat ep-flex ep-justify-between ep-items-center">
              <div>
                <div className="ep-fw-bold">{item.nome}</div>
                <div className="ep-text-xs ep-text-muted ep-mt-1">{item.equipe} · {item.local}</div>
              </div>
              <div className="ep-flex ep-items-center ep-gap-3">
                <span className="ep-text-sm ep-text-muted">{item.distancia}</span>
                <span className={`ep-badge ${item.status === 'Validado' ? 'ep-badge--success' : 'ep-badge--warning'}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestaoPontoGeolocalizacao;
