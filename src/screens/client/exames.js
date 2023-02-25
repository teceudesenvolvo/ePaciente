import React, { Component } from 'react';

//Imagens

// Icones

// Components
import TopBar from '../../componets/topBarSearch'
import ExameList from '../../componets/exameList';

//mudança de páginas

class Exames extends Component {
  render() {
    return (

      <div className='App-header' >
        <div className='header-home'>
          <TopBar />
        </div>
        <div className='favoritos agendarConsulta'>
        <h1>Meus Exames</h1>
          <ExameList/> 
        </div>
      </div>
    );
  }
}

export default Exames;