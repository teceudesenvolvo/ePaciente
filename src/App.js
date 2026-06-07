import React from 'react';
import './design-system/tokens.css';
import './design-system/components.css';
import './App.css';

import { Switch, Route, useLocation } from 'react-router-dom';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

// Citizen Screens
import Home from './screens/client/home';
import LandingPage from './screens/LandingPage';
import Exames from './screens/client/exames';
import Receitas from './screens/client/receitas';
import Minhas_Consultas from './screens/client/Minhas_Consultas';
import Telemedicina from './screens/client/Telemedicina';
import vacinas from './screens/client/vacinas';
import Transporte from './screens/client/Transporte';
import Notificacoes from './screens/client/Notificacoes';
import Perfil from './screens/client/Perfil';
import Medicamentos from './screens/client/Medicamentos';

// SingIn / SignUp
import login from './screens/client/login';
import register from './screens/client/register';


// Navigate Components
import Menu from './componets/menu';
import MenuDesktop from './componets/menuDesktop';
import ChatBot from './componets/ChatBot';
import UBSMenu from './componets/UBSMenu';
import GestaoMenu from './componets/GestaoMenu';
import ExecMenu from './componets/ExecMenu';

// UBS Screens
import UBSDashboard from './screens/ubs/UBSDashboard';
import UBSAgenda from './screens/ubs/UBSAgenda';
import UBSRecepcao from './screens/ubs/UBSRecepcao';
import UBSEstoque from './screens/ubs/UBSEstoque';

// Gestão Screens
import GestaoDashboard from './screens/gestao/GestaoDashboard';
import GestaoTelemedicina from './screens/gestao/GestaoTelemedicina';
import GestaoTransportes from './screens/gestao/GestaoTransportes';
import GestaoCampanhas from './screens/gestao/GestaoCampanhas';

// Executivo Screens
import ExecDashboard from './screens/executivo/ExecDashboard';
import ExecMapa from './screens/executivo/ExecMapa';
import ExecTransparencia from './screens/executivo/ExecTransparencia';

const AppContent = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const hideChatBot = ['/', '/login', '/register', '/loginDashboard', '/registerDashboard'].includes(currentPath);

  const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);

  React.useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine if the desktop sidebar should be visible
  // This logic mirrors the one in MenuDesktop.js
  const showDesktopSidebar = isDesktop && !['/', '/login', '/register', '/loginDashboard', '/registerDashboard', '/ubs', '/gestao', '/executivo'].some(prefix => currentPath.startsWith(prefix));


  return (
    <div className={`App ${showDesktopSidebar ? 'has-desktop-sidebar' : ''}`}>
      <Switch>
        {/* Auth */}
        <Route path="/login" component={login} />
        <Route path="/register" component={register} />

        {/* Cidadão */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/inicio" component={Home} />
        <Route path="/consultas" component={Minhas_Consultas} />
        <Route path="/telemedicina" component={Telemedicina} />
        <Route path="/exames" component={Exames} />
        <Route path="/vacinas" component={vacinas} />
        <Route path="/transporte" component={Transporte} />
        <Route path="/receitas" component={Receitas} />
        <Route path="/perfil" component={Perfil} />
        <Route path="/medicamentos" component={Medicamentos} />
        <Route path="/Notificacoes" component={Notificacoes} />

        {/* UBS */}
        <Route path="/ubs/dashboard" component={UBSDashboard} />
        <Route path="/ubs/agenda" component={UBSAgenda} />
        <Route path="/ubs/recepcao" component={UBSRecepcao} />
        <Route path="/ubs/estoque" component={UBSEstoque} />

        {/* Gestão */}
        <Route path="/gestao/dashboard" component={GestaoDashboard} />
        <Route path="/gestao/telemedicina" component={GestaoTelemedicina} />
        <Route path="/gestao/transportes" component={GestaoTransportes} />
        <Route path="/gestao/campanhas" component={GestaoCampanhas} />

        {/* Executivo */}
        <Route path="/executivo/dashboard" component={ExecDashboard} />
        <Route path="/executivo/mapa" component={ExecMapa} />
        <Route path="/executivo/transparencia" component={ExecTransparencia} />
      </Switch>

      <Menu />
      <UBSMenu />
      <GestaoMenu />
      <ExecMenu />
      <MenuDesktop />
      
      {!hideChatBot && <ChatBot />}
      {currentPath === '/' && (
        <footer style={{ 
          background: '#f5f5f7', 
          color: '#1d1d1f', 
          paddingTop: 'var(--sp-12)', 
          paddingBottom: 'var(--sp-12)', 
          borderTop: '1px solid #d2d2d7', 
          marginTop: 'var(--sp-20)' 
        }}>
          <div className="ep-content">
            <div className="ep-grid-3 ep-gap-8 ep-text-xs" style={{ color: '#424245' }}>
              <div className="ep-flex-col ep-gap-2">
                <h4 className="ep-fw-bold ep-mb-3" style={{ color: '#1d1d1f', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secretaria de Saúde</h4>
                <p><strong>Secretário:</strong> FRANCISCO FABRÍCIO MARQUES GOMES</p>
                <p><strong>Atendimento:</strong> 07:30 às 13:30</p>
                <p><FaPhone style={{ color: '#86868b' }} /> (85) 3355-1100</p>
                <p><FaEnvelope style={{ color: '#86868b' }} /> saude@saoluisdocuru.ce.gov.br</p>
              </div>
              <div className="ep-flex-col ep-gap-2">
                <h4 className="ep-fw-bold ep-mb-3" style={{ color: '#1d1d1f', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Localização</h4>
                <p>Rua General Potiguara, S/N</p>
                <p>Centro</p>
                <p>CEP: 62.665-000</p>
                <p>São Luís do Curu - CE</p>
              </div>
              <div className="ep-flex-col ep-gap-2">
                <h4 className="ep-fw-bold ep-mb-3" style={{ color: '#1d1d1f', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Institucional</h4>
                <a href="https://saoluisdocuru.ce.gov.br" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Portal da Prefeitura</a>
                <a href="/transparencia" style={{ color: 'inherit', textDecoration: 'none' }}>Portal da Transparência</a>
                <a href="/ouvidoria" style={{ color: 'inherit', textDecoration: 'none' }}>Ouvidoria Municipal</a>
                <a href="/diario-oficial" style={{ color: 'inherit', textDecoration: 'none' }}>Diário Oficial</a>
              </div>
            </div>
          </div>
        </footer>
      )}
      
      {currentPath === '/' && (
        <footer className='footer' style={{ 
        background: '#f5f5f7', 
        borderTop: '1px solid #d2d2d7', 
        padding: '32px 0 var(--sp-12)',
        marginTop: 'var(--sp-12)'
      }}>
        <div className="ep-content ep-flex ep-items-center ep-justify-between">
          <div className="ep-flex ep-items-center ep-gap-4">
            <img src="https://intgest-executivo.s3.amazonaws.com/media/intgest_executivo/public/entidade/logotipo/sao_luis_do_curu1.png.600x600_q85_box-0%2C0%2C108%2C108_crop_detail.png" alt="Logo Câmara" style={{ height: '42px', objectFit: 'contain' }} />
            <div className="ep-flex-col ep-text-left" style={{ gap: '2px' }}>
              <span className="ep-fw-bold" style={{ fontSize: '13px', color: '#1d1d1f', textTransform: 'uppercase', letterSpacing: '0.02em' }}>Prefeitura Municipal</span>
              <span style={{ fontSize: '12px', color: '#86868b' }}>São Luís do Curu · Ceará</span>
            </div>
          </div>
          <div className="ep-text-right ep-flex-col" style={{ gap: '4px' }}>
            <p style={{ margin: 0, fontSize: '11px', color: '#86868b' }}>Desenvolvido por <strong>Blu Tecnologias</strong></p>
            <p style={{ margin: 0, fontSize: '11px', color: '#86868b' }}>© 2026 Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
};


function App() {
  return <AppContent />;
}

export default App;
