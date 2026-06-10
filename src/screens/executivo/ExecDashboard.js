import React, { useState } from 'react';
import { FaAmbulance, FaFilter } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ExecDashboard = () => {
  const [compararMesAnterior, setCompararMesAnterior] = useState(true);
  const [selectedMes, setSelectedMes] = useState('Junho');
  const [selectedUBS, setSelectedUBS] = useState('Todas as Unidades');
  const [selectedEspecialidade, setSelectedEspecialidade] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('Todos');

  // Lógica de simulação de impacto nos dados (multiplicador baseado na unidade)
  const getMultiplier = () => {
    let multiplier = 1;
    if (selectedUBS === 'UBS Centro') multiplier *= 0.45;
    else if (selectedUBS === 'UBS Bairro Novo') multiplier *= 0.35;
    else if (selectedUBS === 'Hospital Municipal') multiplier *= 0.2;

    if (selectedEspecialidade !== 'Todas') multiplier *= 0.4;
    if (selectedStatus !== 'Todos') multiplier *= 0.7;

    return multiplier;
  };
  const m = getMultiplier();

  const labelsDias = ['01', '05', '10', '15', '20', '25', '30'];
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, padding: 15, font: { size: 11 } } }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' } },
      x: { grid: { display: false } }
    }
  };

  // Configuração dos Dados para Comparativo
  const dataAtendimentos = {
    labels: labelsDias,
    datasets: [
      { label: `${selectedMes} (Atual)`, data: [450, 520, 480, 610, 590, 680, 710].map(v => Math.round(v * m)), borderColor: '#004a8d', backgroundColor: 'rgba(0, 74, 141, 0.1)', fill: true, tension: 0.4 },
      compararMesAnterior ? { label: 'Mês Anterior', data: [400, 480, 460, 550, 520, 600, 650].map(v => Math.round(v * m)), borderColor: '#d2d2d7', borderDash: [5, 5], tension: 0.4, fill: false } : null
    ].filter(Boolean)
  };

  const dataMedicamentos = {
    labels: ['Analges.', 'Antibiot.', 'Hipert.', 'Diabet.', 'Outros'],
    datasets: [
      { label: 'Entradas (Estoque)', data: [2500, 1800, 3200, 2100, 4500].map(v => Math.round(v * m)), backgroundColor: '#28a745', borderRadius: 6 },
      { label: 'Saídas (Consumo)', data: [2100, 1950, 2800, 2050, 4100].map(v => Math.round(v * m)), backgroundColor: '#ffc107', borderRadius: 6 }
    ]
  };

  const dataExames = {
    labels: labelsDias,
    datasets: [{ label: 'Exames Realizados', data: [120, 150, 110, 180, 200, 160, 190].map(v => Math.round(v * m)), backgroundColor: '#5856d6', borderRadius: 8 }]
  };

  const dataTransporte = {
    labels: labelsDias,
    datasets: [
      { label: 'Solicitações', data: [15, 22, 18, 30, 25, 28, 35].map(v => Math.round(v * m)), borderColor: '#ff3b30', backgroundColor: '#ff3b30', tension: 0.3 },
      compararMesAnterior ? { label: 'Mês Anterior', data: [10, 15, 12, 20, 18, 15, 22].map(v => Math.round(v * m)), borderColor: '#d2d2d7', borderDash: [3, 3], tension: 0.3 } : null
    ].filter(Boolean)
  };

  const dataTelemedicina = {
    labels: labelsDias,
    datasets: [{ label: 'Consultas Online', data: [40, 65, 80, 55, 90, 110, 95].map(v => Math.round(v * m)), borderColor: '#4cd964', backgroundColor: 'rgba(76, 217, 100, 0.1)', fill: true, tension: 0.4 }]
  };

  const dataTiposAtendimento = {
    labels: ['Clínica Geral', 'Pediatria', 'Odontologia', 'Ginecologia', 'Outros'],
    datasets: [
      { label: 'Atual', data: [1200, 850, 600, 450, 300].map(v => Math.round(v * m)), backgroundColor: '#007AFF', borderRadius: 4 },
      compararMesAnterior ? { label: 'Mês Anterior', data: [1100, 780, 550, 400, 280].map(v => Math.round(v * m)), backgroundColor: '#d2d2d7', borderRadius: 4 } : null
    ].filter(Boolean)
  };

  // Dados para os Mini-Gráficos de Resumo
  const dataOrcamentoResumo = {
    labels: ['Empenhado', 'Restante'],
    datasets: [{
      data: [65, 35],
      backgroundColor: ['#007AFF', 'rgba(0, 122, 255, 0.1)'],
      borderWidth: 0,
    }]
  };

  const dataPopResumo = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
      data: [800, 950, 1100, 900, 1050, 1200].map(v => Math.round(v * m)),
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderRadius: 4,
    }]
  };

  return (
    <div className="ep-page" style={{ background: 'var(--color-n100)' }}>
      <HeaderTop />
      
      <div className="ep-content ep-animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 1600 }}>
        
        {/* Painel de Filtros Superiores */}
        <div className="ep-card ep-card--flat ep-flex-col ep-gap-4 ep-mb-2" style={{ padding: '16px 24px', background: 'white' }}>
          <div className="ep-flex ep-items-center ep-gap-2 ep-w-full ep-mb-2" style={{ color: 'var(--color-primary)', borderBottom: '1px solid var(--color-n100)', paddingBottom: '8px' }}>
            <FaFilter size={12} /> <span className="ep-text-xs ep-fw-bold" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filtros de Visão Geral</span>
          </div>
          
          <div className="ep-grid-4 ep-gap-4">
            <div className="ep-input-group ep-mb-0">
            <label className="ep-label">Período</label>
            <select className="ep-select" value={selectedMes} onChange={e => setSelectedMes(e.target.value)} style={{ height: '42px', borderRadius: '10px' }}>
               <option value="Janeiro">Janeiro</option>
               <option value="Fevereiro">Fevereiro</option>
               <option value="Março">Março</option>
               <option value="Abril">Abril</option>
               <option value="Maio">Maio</option>
               <option value="Junho">Junho</option>
            </select>
          </div>

            <div className="ep-input-group ep-mb-0">
            <label className="ep-label">Unidade de Saúde</label>
            <select className="ep-select" value={selectedUBS} onChange={e => setSelectedUBS(e.target.value)} style={{ height: '42px', borderRadius: '10px' }}>
               <option value="Todas as Unidades">Todas as Unidades de Saúde</option>
               <option value="UBS Centro">UBS Centro</option>
               <option value="UBS Bairro Novo">UBS Bairro Novo</option>
               <option value="Hospital Municipal">Hospital Municipal</option>
            </select>
          </div>

            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Especialidade</label>
              <select className="ep-select" value={selectedEspecialidade} onChange={e => setSelectedEspecialidade(e.target.value)} style={{ height: '42px', borderRadius: '10px' }}>
                 <option value="Todas">Todas as Especialidades</option>
                 <option value="Clínica Geral">Clínica Geral</option>
                 <option value="Pediatria">Pediatria</option>
                 <option value="Odontologia">Odontologia</option>
                 <option value="Cardiologia">Cardiologia</option>
              </select>
            </div>

            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Status</label>
              <select className="ep-select" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} style={{ height: '42px', borderRadius: '10px' }}>
                 <option value="Todos">Todos os Status</option>
                 <option value="Concluído">Concluído</option>
                 <option value="Pendente">Pendente</option>
                 <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>

          <div className="ep-flex ep-justify-end">
            <label className="ep-flex ep-items-center ep-gap-2 ep-cursor-pointer ep-text-sm ep-fw-medium" style={{ marginTop: '4px' }}>
              <input 
                type="checkbox" 
                checked={compararMesAnterior} 
                onChange={() => setCompararMesAnterior(!compararMesAnterior)}
              />
              Comparar com mês anterior
            </label>
          </div>
        </div>

        {/* Resumo em Cards */}
        <div className="ep-grid-2 ep-mb-6">
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div style={{ width: '70px', height: '70px', flexShrink: 0 }}>
              <Doughnut 
                data={dataOrcamentoResumo} 
                options={{ cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} 
              />
            </div>
            <div className="ep-text-left" style={{ textAlign: 'left' }}>
              <div className="ep-text-sm ep-text-muted">Orçamento Empenhado</div>
              <div className="ep-font-xl ep-fw-bold">R$ 12.5M</div>
              <div className="ep-text-xs ep-text-warning ep-mt-1">65% do anual</div>
            </div>
          </div>
          
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div style={{ width: '90px', height: '50px', flexShrink: 0 }}>
              <Bar 
                data={dataPopResumo} 
                options={{ 
                  plugins: { legend: { display: false }, tooltip: { enabled: false } },
                  scales: { x: { display: false }, y: { display: false } }
                }} 
              />
            </div>
            <div className="ep-text-left" style={{ textAlign: 'left' }}>
              <div className="ep-text-sm ep-text-muted">Pop. Atendida</div>
              <div className="ep-font-xl ep-fw-bold">{Math.round(42100 * m).toLocaleString('pt-BR')}</div>
              <div className="ep-text-xs ep-text-success ep-mt-1">+1.2k este mês</div>
            </div>
          </div>
        </div>

        {/* Grid de Gráficos */}
        <div className="ep-grid-2" style={{ gap: '20px' }}>
          
          {/* Gráfico 1: Atendimentos */}
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Fluxo de Atendimentos (Diário)</h4>
            <div style={{ height: '240px' }}>
              <Line data={dataAtendimentos} options={chartOptions} />
            </div>
          </div>

          {/* Gráfico 2: Medicamentos */}
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Movimentação de Medicamentos (Categorias)</h4>
            <div style={{ height: '240px' }}>
              <Bar data={dataMedicamentos} options={chartOptions} />
            </div>
          </div>

          {/* Gráfico 3: Tipos de Atendimento */}
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Atendimentos por Especialidade</h4>
            <div style={{ height: '240px' }}>
              <Bar data={dataTiposAtendimento} options={{ ...chartOptions, indexAxis: 'y' }} />
            </div>
          </div>

          {/* Gráfico 4: Exames */}
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Volume de Exames Laboratoriais</h4>
            <div style={{ height: '240px' }}>
              <Bar data={dataExames} options={chartOptions} />
            </div>
          </div>

          {/* Gráfico 5: Transporte */}
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Demandas de Transporte Sanitário</h4>
            <div style={{ height: '240px' }}>
              <Line data={dataTransporte} options={chartOptions} />
            </div>
          </div>

          {/* Gráfico 6: Telemedicina */}
          <div className="ep-card ep-card--flat" style={{ gridColumn: '1 / -1' }}>
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Adesão à Telemedicina (Consultas Online)</h4>
            <div style={{ height: '260px' }}>
              <Line data={dataTelemedicina} options={{
                ...chartOptions,
                plugins: { ...chartOptions.plugins, legend: { display: false } }
              }} />
            </div>
          </div>
        </div>

        {/* Seções de Status e Alertas */}
        <div className="ep-section-header">
          <h3 className="ep-section-title">Ocorrências Críticas (SAMU)</h3>
        </div>

        <div className="ep-card ep-card--flat ep-mb-6" style={{ borderLeft: '4px solid var(--color-error)' }}>
          <div className="ep-flex ep-items-center ep-gap-3 ep-mb-2">
            <FaAmbulance style={{ color: 'var(--color-error)' }} />
            <span className="ep-fw-bold">Tempo Resposta Alto</span>
          </div>
          <p className="ep-text-sm ep-text-muted">
            Tempo médio de resposta na Zona Sul está em 22min (meta: 15min). Recomendado realocar viatura V-03 para base Sul.
          </p>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Satisfação do Cidadão</h3>
        </div>

        <div className="ep-card ep-card--flat">
           <div className="ep-flex ep-justify-between ep-items-center ep-mb-4">
              <span className="ep-fw-semibold">NPS Geral da Saúde</span>
              <span className="ep-font-lg ep-fw-bold ep-text-success">72</span>
           </div>
           
           <div className="ep-flex-col ep-gap-3">
             <div>
                <div className="ep-flex ep-justify-between ep-text-xs ep-mb-1">
                   <span>Atendimento Médico</span> <span>85% aprovam</span>
                </div>
                <div style={{ height: 6, background: 'var(--color-n200)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: 'var(--color-success)' }}></div>
                </div>
             </div>
             
             <div>
                <div className="ep-flex ep-justify-between ep-text-xs ep-mb-1">
                   <span>Tempo de Espera</span> <span>45% aprovam</span>
                </div>
                <div style={{ height: 6, background: 'var(--color-n200)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '45%', height: '100%', background: 'var(--color-warning)' }}></div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExecDashboard;
