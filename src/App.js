import './App.css';

import { Switch, Route } from 'react-router-dom'


//Screen Navigate
import Home from '../src/screens/home';
import Exames from './screens/client/exames';
import Minhas_Consultas from './screens/client/Minhas_Consultas';
import Notificacoes from './screens/client/Notificacoes';
import Mais from './screens/client/Mais';
import Servico from './screens/client/Servico';
import Produto from './screens/client/Produto';
import Carrinho from './screens/client/carrinho';
import pagamento from './screens/client/pagamento';
import Pesquisar from './screens/client/pesquisa';
import vacinas from './screens/client/vacinas';
import utilider from './screens/client/utilider';
import pagamentoUtilider from './screens/client/pagamentoUtilider';
import Perfil from './screens/client/Perfil';
import addProducts from '../src/screens/addProducts';
import servicosDashboard from '../src/screens/ServicosDashboard';
import homeDashboard from '../src/screens/homeDashboard';
import NotDashboard from '../src/screens/NotDashboard';
import Receitas from '../src/screens/client/receitas'



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
        <Route path="/Exames" component={Exames} />
        <Route path="/Consultas" component={Minhas_Consultas} />
        <Route path="/Notificacoes" component={Notificacoes} />
        <Route path="/Mais" component={Mais} />
        <Route path="/Servico" component={Servico} />
        <Route path="/Produto" component={Produto} />
        <Route path="/Carrinho" component={Carrinho} />
        <Route path="/pesquisar" component={Pesquisar} />
        <Route path="/vacinas" component={vacinas} />
        <Route path="/pagamento" component={pagamento} />
        <Route path="/utilider" component={utilider} />
        <Route path="/pagamentoUtilider" component={pagamentoUtilider} />
        <Route path="/Perfil" component={Perfil} />
        <Route path="/loginDashboard" component={loginDashboard} />
        <Route path="/registerDashboard" component={registerDashboard} />
        <Route path="/registerEndereco" component={registerEndereco} />
        <Route path="/registerLoja" component={registerLoja} />
        <Route path="/addProducts" component={addProducts} />
        <Route path="/servicosDashboard" component={servicosDashboard} />
        <Route path="/homeDashboard" component={homeDashboard} />
        <Route path="/NotDashboard" component={NotDashboard} />
        <Route path="/receitas" component={Receitas} />




      </Switch>
      <Menu />
      <MenuDesktop />
      <footer className='footer'>
        <p> Copyright &copy; 2023 - eudesenvolvo</p>
      </footer>


    </div>
  );
}

export default App;
