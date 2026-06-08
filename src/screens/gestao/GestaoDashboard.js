import React, { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaExclamationTriangle, FaFilter } from 'react-icons/fa';
import HeaderTop from '../../HeaderTop';
import '../../utils/chartSetup';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

const GestaoDashboard = () => {
  const [compararMesAnterior, setCompararMesAnterior] = useState(true);
  const [selectedMes, setSelectedMes] = useState('Junho');
  const [selectedUnidade, setSelectedUnidade] = useState('Todas as Unidades');
  const [selectedLinha, setSelectedLinha] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('Todos');

  const getMultiplier = () => {
    let multiplier = 1;
    if (selectedUnidade === 'UBS Centro') multiplier *= 0.42;
    else if (selectedUnidade === 'UBS Curu') multiplier *= 0.31;
    else if (selectedUnidade === 'Hospital Municipal') multiplier *= 0.27;

    if (selectedLinha !== 'Todas') multiplier *= 0.55;
    if (selectedStatus !== 'Todos') multiplier *= 0.72;

    return multiplier;
  };

  const m = getMultiplier();
  const labelsDias = ['01', '05', '10', '15', '20', '25', '30'];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, padding: 14, font: { size: 11 } } },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' } },
      x: { grid: { display: false } },
    },
  };

  const dataAtendimentos = {
    labels: labelsDias,
    datasets: [
      {
        label: `${selectedMes} (Atual)`,
        data: [380, 460, 430, 520, 610, 580, 690].map((v) => Math.round(v * m)),
        borderColor: '#1f7a4d',
        backgroundColor: 'rgba(31, 122, 77, 0.12)',
        fill: true,
        tension: 0.4,
      },
      compararMesAnterior
        ? {
            label: 'Mês Anterior',
            data: [340, 410, 390, 470, 540, 520, 610].map((v) => Math.round(v * m)),
            borderColor: '#d2d2d7',
            borderDash: [5, 5],
            tension: 0.4,
          }
        : null,
    ].filter(Boolean),
  };

  const dataFilas = {
    labels: ['Clínica', 'Pediatria', 'Odonto', 'Pré-natal', 'Exames'],
    datasets: [
      {
        label: 'Aguardando',
        data: [128, 74, 96, 42, 153].map((v) => Math.round(v * m)),
        backgroundColor: '#ff9500',
        borderRadius: 6,
      },
      {
        label: 'Regulados',
        data: [92, 61, 80, 35, 121].map((v) => Math.round(v * m)),
        backgroundColor: '#34c759',
        borderRadius: 6,
      },
    ],
  };

  const dataUnidades = {
    labels: ['Hospital', 'UBS Centro', 'UBS Curu', 'Lab. Central'],
    datasets: [
      {
        label: 'Ocupação/uso',
        data: [86, 64, 51, 73].map((v) => Math.round(v * m)),
        backgroundColor: ['#ff9500', '#34c759', '#34c759', '#007aff'],
        borderRadius: 8,
      },
    ],
  };

  const dataTransporte = {
    labels: labelsDias,
    datasets: [
      {
        label: 'Solicitações',
        data: [18, 26, 21, 34, 29, 31, 38].map((v) => Math.round(v * m)),
        borderColor: '#ff3b30',
        backgroundColor: 'rgba(255, 59, 48, 0.1)',
        fill: true,
        tension: 0.35,
      },
      compararMesAnterior
        ? {
            label: 'Mês Anterior',
            data: [14, 19, 17, 25, 21, 24, 29].map((v) => Math.round(v * m)),
            borderColor: '#d2d2d7',
            borderDash: [4, 4],
            tension: 0.35,
          }
        : null,
    ].filter(Boolean),
  };

  const dataOuvidoria = {
    labels: ['Aberto', 'Em análise', 'Resolvido'],
    datasets: [
      {
        data: [36, 18, 92].map((v) => Math.round(v * m)),
        backgroundColor: ['#ff9500', '#007aff', '#34c759'],
        borderWidth: 0,
      },
    ],
  };

  const dataCampanhas = {
    labels: ['Gripe', 'Dengue', 'Pré-natal', 'Hipertensão'],
    datasets: [
      {
        label: 'Notificações enviadas',
        data: [4500, 3200, 1750, 2100].map((v) => Math.round(v * m)),
        backgroundColor: '#5856d6',
        borderRadius: 8,
      },
      {
        label: 'Aberturas',
        data: [1440, 1216, 840, 714].map((v) => Math.round(v * m)),
        backgroundColor: '#5ac8fa',
        borderRadius: 8,
      },
    ],
  };

  const dataEstoque = {
    labels: ['Normal', 'Atenção', 'Crítico'],
    datasets: [
      {
        data: [68, 22, 10],
        backgroundColor: ['#34c759', '#ff9500', '#ff3b30'],
        borderWidth: 0,
      },
    ],
  };

  const dataOrcamento = {
    labels: ['Executado', 'Disponível'],
    datasets: [
      {
        data: [58, 42],
        backgroundColor: ['#007aff', 'rgba(0, 122, 255, 0.12)'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="ep-page" style={{ background: 'var(--color-n100)' }}>
      <HeaderTop />

      <div className="ep-content ep-animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="ep-card ep-card--flat ep-flex-col ep-gap-4" style={{ padding: '16px 24px', background: 'white' }}>
          <div className="ep-flex ep-items-center ep-gap-2 ep-w-full ep-mb-2" style={{ color: 'var(--color-success)', borderBottom: '1px solid var(--color-n100)', paddingBottom: '8px' }}>
            <FaFilter size={12} />
            <span className="ep-text-xs ep-fw-bold" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filtros do Painel da Secretaria</span>
          </div>

          <div className="ep-grid-4 ep-gap-4">
            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Período</label>
              <select className="ep-select" value={selectedMes} onChange={(e) => setSelectedMes(e.target.value)} style={{ height: '42px', borderRadius: '10px' }}>
                <option value="Janeiro">Janeiro</option>
                <option value="Fevereiro">Fevereiro</option>
                <option value="Março">Março</option>
                <option value="Abril">Abril</option>
                <option value="Maio">Maio</option>
                <option value="Junho">Junho</option>
              </select>
            </div>

            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Unidade</label>
              <select className="ep-select" value={selectedUnidade} onChange={(e) => setSelectedUnidade(e.target.value)} style={{ height: '42px', borderRadius: '10px' }}>
                <option value="Todas as Unidades">Todas as Unidades</option>
                <option value="UBS Centro">UBS Centro</option>
                <option value="UBS Curu">UBS Curu</option>
                <option value="Hospital Municipal">Hospital Municipal</option>
              </select>
            </div>

            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Linha de cuidado</label>
              <select className="ep-select" value={selectedLinha} onChange={(e) => setSelectedLinha(e.target.value)} style={{ height: '42px', borderRadius: '10px' }}>
                <option value="Todas">Todas</option>
                <option value="Atenção Básica">Atenção Básica</option>
                <option value="Saúde da Mulher">Saúde da Mulher</option>
                <option value="Saúde Bucal">Saúde Bucal</option>
                <option value="Doenças Crônicas">Doenças Crônicas</option>
              </select>
            </div>

            <div className="ep-input-group ep-mb-0">
              <label className="ep-label">Status</label>
              <select className="ep-select" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} style={{ height: '42px', borderRadius: '10px' }}>
                <option value="Todos">Todos</option>
                <option value="Concluído">Concluído</option>
                <option value="Pendente">Pendente</option>
                <option value="Crítico">Crítico</option>
              </select>
            </div>
          </div>

          <div className="ep-flex ep-justify-end">
            <label className="ep-flex ep-items-center ep-gap-2 ep-cursor-pointer ep-text-sm ep-fw-medium">
              <input type="checkbox" checked={compararMesAnterior} onChange={() => setCompararMesAnterior(!compararMesAnterior)} />
              Comparar com mês anterior
            </label>
          </div>
        </div>

        <div className="ep-grid-4 ep-gap-4">
          <div className="ep-card ep-card--flat">
            <div style={{ height: 58, marginBottom: 8 }}>
              <Line data={dataAtendimentos} options={{ ...chartOptions, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }} />
            </div>
            <div className="ep-text-sm ep-text-muted">Atendimentos · {Math.round(14500 * m).toLocaleString('pt-BR')}</div>
            <div className="ep-text-xs ep-text-success ep-flex ep-items-center ep-gap-1 ep-mt-1"><FaArrowUp /> 8% vs mês anterior</div>
          </div>
          <div className="ep-card ep-card--flat">
            <div style={{ height: 58, marginBottom: 8 }}>
              <Bar data={dataFilas} options={{ ...chartOptions, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }} />
            </div>
            <div className="ep-text-sm ep-text-muted">Fila regulada · {Math.round(389 * m).toLocaleString('pt-BR')}</div>
            <div className="ep-text-xs ep-text-success ep-flex ep-items-center ep-gap-1 ep-mt-1"><FaArrowDown /> 11% de redução</div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div style={{ width: '68px', height: '68px', flexShrink: 0 }}>
              <Doughnut data={dataOrcamento} options={{ cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} />
            </div>
            <div>
              <div className="ep-text-sm ep-text-muted">Orçamento</div>
              <div className="ep-font-xl ep-fw-bold">58%</div>
              <div className="ep-text-xs ep-text-primary">executado</div>
            </div>
          </div>
          <div className="ep-card ep-card--flat ep-flex ep-items-center ep-gap-4">
            <div style={{ width: '68px', height: '68px', flexShrink: 0 }}>
              <Doughnut data={dataEstoque} options={{ cutout: '70%', plugins: { legend: { display: false }, tooltip: { enabled: false } } }} />
            </div>
            <div>
              <div className="ep-text-sm ep-text-muted">Estoque</div>
              <div className="ep-font-xl ep-fw-bold">10%</div>
              <div className="ep-text-xs ep-text-error">crítico</div>
            </div>
          </div>
        </div>

        <div className="ep-grid-2" style={{ gap: '20px' }}>
          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Fluxo de Atendimentos</h4>
            <div style={{ height: '240px' }}>
              <Line data={dataAtendimentos} options={chartOptions} />
            </div>
          </div>

          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Fila por Linha de Cuidado</h4>
            <div style={{ height: '240px' }}>
              <Bar data={dataFilas} options={chartOptions} />
            </div>
          </div>

          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Uso das Unidades</h4>
            <div style={{ height: '240px' }}>
              <Bar data={dataUnidades} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: false } } }} />
            </div>
          </div>

          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Transporte Sanitário</h4>
            <div style={{ height: '240px' }}>
              <Line data={dataTransporte} options={chartOptions} />
            </div>
          </div>

          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Campanhas e Notificações</h4>
            <div style={{ height: '240px' }}>
              <Bar data={dataCampanhas} options={chartOptions} />
            </div>
          </div>

          <div className="ep-card ep-card--flat">
            <h4 className="ep-fw-bold ep-mb-4 ep-text-sm">Ouvidoria por Situação</h4>
            <div style={{ height: '240px' }}>
              <Doughnut data={dataOuvidoria} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 14, font: { size: 11 } } } } }} />
            </div>
          </div>
        </div>

        <div className="ep-section-header">
          <h3 className="ep-section-title">Alertas Operacionais</h3>
        </div>

        <div className="ep-grid-2 ep-gap-4 ep-mb-6">
          <div className="ep-card ep-card--flat" style={{ borderLeft: '4px solid var(--color-warning)' }}>
            <div className="ep-flex ep-items-center ep-gap-3 ep-mb-2">
              <FaExclamationTriangle style={{ color: 'var(--color-warning)' }} />
              <span className="ep-fw-bold">Hospital Municipal em atenção</span>
            </div>
            <p className="ep-text-sm ep-text-muted">
              Ocupação em 86%. Avaliar redistribuição de atendimentos de baixa complexidade para UBS Centro e UBS Curu.
            </p>
          </div>

          <div className="ep-card ep-card--flat" style={{ borderLeft: '4px solid var(--color-error)' }}>
            <div className="ep-flex ep-items-center ep-gap-3 ep-mb-2">
              <FaExclamationTriangle style={{ color: 'var(--color-error)' }} />
              <span className="ep-fw-bold">Estoque crítico</span>
            </div>
            <p className="ep-text-sm ep-text-muted">
              10% dos itens monitorados estão em nível crítico. Priorizar reposição de antibióticos e insumos laboratoriais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestaoDashboard;
