import React, { Component } from 'react';

//Imagens

// Icones

// Components
import TopBar from '../../componets/topBarSearch'
import FavoritoList from '../../componets/exameList';

//mudança de páginas

class favoritos extends Component {
  render() {
    return (

      <div className='App-header' >
        <div className='header-home'>
          <TopBar />
        </div>
        <div className='favoritos agendarConsulta'>
        <h1>Meus Exames</h1>
          <FavoritoList></FavoritoList> 
        </div>
      </div>
    );
  }
}

export default favoritos;