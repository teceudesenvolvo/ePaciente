import React, { Component } from 'react';

//Imagens


// Icones


// Components
import VacinasList from '../../componets/vacinasList';

//mudança de páginas

class categorias extends Component {
    render() {
        return (

            <div className='App-header' >
            
            <div className='favoritos agendarConsulta'>
            <h1 className="titleVacinas" >Calendário de Vacinas</h1>
              <VacinasList/> 
            </div>
          </div>
        );
    }
}

export default categorias;