import React, { Component } from 'react';


//Imagens

// Icones

// Components
import TopBar from '../../componets/topBarSearch'
import ProductsList from '../../componets/List_minhaConsultas';


//mudança de páginas

class Minhas_Compras extends Component {
  render() {
    return (

      <div className='App-header' >
        <div className='header-home'>
          <TopBar />
        </div>
        <div className='minhasCompras'>
          <form className='formLogin agendarConsulta'>
            <h1>Agendar Consulta:</h1>
            <input type="text" placeholder="Especialidade" className='inputLogin' />
            <input type="text" placeholder="Unidade" className='inputLogin' />
            <input type="text" placeholder="Data" className='inputLogin' />
            <input type="text" placeholder="Horário" className='inputLogin' />

            <button className='buttonLogin'>Agendar</button>
            <h1>Minhas Consultas:</h1>
          </form>
          <ProductsList />
        </div>

      </div>
    );
  }
}

export default Minhas_Compras;