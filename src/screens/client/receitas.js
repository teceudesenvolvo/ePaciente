import React, { Component } from 'react';

//Imagens


// Icones


// Components
import ReceitasList from '../../componets/receitasList';

//mudança de páginas

class categorias extends Component {
    render() {
        return (

            <div className='App-header' >
           
            <div className='favoritos agendarConsulta'>
            <h1>Minhas Receitas</h1>
              <ReceitasList/> 
            </div>
          </div>
        );
    }
}

export default categorias;