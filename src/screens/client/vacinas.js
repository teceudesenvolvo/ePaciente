import React, { Component } from 'react';

//Imagens


// Icones


// Components
import TopBar from '../../componets/topBarSearch'

import VacinasList from '../../componets/vacinasList';

//mudança de páginas

class categorias extends Component {
    render() {
        return (

            <div className='App-header' >
            <div className='header-home'>
              <TopBar />
            </div>
            <div className='favoritos agendarConsulta'>
            <h1>Calendário de Vacinas</h1>
              <VacinasList/> 
            </div>
          </div>
        );
    }
}

export default categorias;