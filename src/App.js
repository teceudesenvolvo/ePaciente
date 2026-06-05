import './design-system/tokens.css';
import './design-system/components.css';
import './App.css';

import { Switch, Route, useLocation } from 'react-router-dom';

// Citizen Screens
import Home from '../src/screens/home';
import Exames from './screens/client/exames';
import Receitas from '../src/screens/client/receitas';
import Minhas_Consultas from './screens/client/Minhas_Consultas';
import vacinas from './screens/client/vacinas';
import Transporte from './screens/client/Transporte';
import Notificacoes from './screens/client/Notificacoes';
import Perfil from './screens/client/Perfil';
import Carteira from './screens/client/Carteira'; // New

// SingIn / SignUp
import login from './screens/client/login';
import register from './screens/client/register';
import loginDashboard from './screens/loginDashboard';
import registerDashboard from './screens/registerDashboard';

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
  const hideChatBot = ['/login', '/register', '/loginDashboard', '/registerDashboard'].includes(location.pathname);

  return (
    <div className="App">
      <Switch>
        {/* Auth */}
        <Route path="/login" component={login} />
        <Route path="/register" component={register} />
        <Route path="/loginDashboard" component={loginDashboard} />
        <Route path="/registerDashboard" component={registerDashboard} />

        {/* Cidadão */}
        <Route exact path="/" component={Home} />
        <Route path="/consultas" component={Minhas_Consultas} />
        <Route path="/exames" component={Exames} />
        <Route path="/vacinas" component={vacinas} />
        <Route path="/transporte" component={Transporte} />
        <Route path="/receitas" component={Receitas} />
        <Route path="/carteira" component={Carteira} />
        <Route path="/perfil" component={Perfil} />
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
      
      <footer className='footer'>
        <p> - Desenvolvido por Blu Tecnologias -</p>
      </footer>
    </div>
  );
};

function App() {
  return <AppContent />;
}

export default App;
