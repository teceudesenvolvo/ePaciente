import './App.css';

import { Switch, Route } from 'react-router-dom'


//Screen Navigate
import Home from '../src/screens/home';
import Exames from './screens/client/exames';
import Receitas from '../src/screens/client/receitas'
import Minhas_Consultas from './screens/client/Minhas_Consultas';
import vacinas from './screens/client/vacinas';
import Mais from './screens/client/Mais';
import Notificacoes from './screens/client/Notificacoes';
import Perfil from './screens/client/Perfil';


import homeDashboard from '../src/screens/homeDashboard';


// SingIn / SignUp
import login from './screens/client/login';
import register from './screens/client/register';
import loginDashboard from './screens/loginDashboard';
import registerDashboard from './screens/registerDashboard';
import registerEndereco from './screens/registerEndereco';
import registerLoja from './screens/resgisterLoja';


// Navigate Components
import Menu from './componets/menu';
import MenuDesktop from './componets/menuDesktop';






function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={login} />
        <Route path="/register" component={register} />


        <Route path="/Consultas" component={Minhas_Consultas} />
        <Route path="/Exames" component={Exames} />
        <Route path="/vacinas" component={vacinas} />
        <Route path="/Perfil" component={Perfil} />
        <Route path="/receitas" component={Receitas} />
        
        <Route path="/Notificacoes" component={Notificacoes} />
        <Route path="/Mais" component={Mais} />
        <Route path="/loginDashboard" component={loginDashboard} />
        <Route path="/registerDashboard" component={registerDashboard} />
        <Route path="/registerEndereco" component={registerEndereco} />
        <Route path="/registerLoja" component={registerLoja} />
        <Route path="/homeDashboard" component={homeDashboard} />




      </Switch>
      <Menu />
      <MenuDesktop />
      <footer className='footer'>
        <p> - Desenvolvido por Blu Tecnologias -</p>
      </footer>


    </div>
  );
}

export default App;
