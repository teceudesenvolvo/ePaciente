import React, { Component } from 'react';


//Imagens

// Icones

// Components
import TopBar from '../../componets/topBarSearch'
import ProductsList from '../../componets/ProductsList_minhaConsultas';


//mudança de páginas

class Minhas_Compras extends Component {
  render() {
    return (

      <div className='App-header' >
        <div className='header-home'>
          <TopBar />
        </div>
        <div className='minhasCompras'>
          <ProductsList />
        </div>

      </div>
    );
  }
}

export default Minhas_Compras;