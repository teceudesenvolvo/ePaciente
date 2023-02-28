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
            <select name="Especialidade" placeholder='Especialidade' className='inputLogin'>
              <option>Clinica Médica</option>
              <option>Cardiologista</option>
              <option>Dentista</option>
              </select>


            <select name="unidade" placeholder='Unidade' className='inputLogin'>
              <option>UBS - Localidade Cadastrada</option>
              <option>Hospital Municipal</option>
              </select>

            <input type="date" placeholder="Data" className='inputLogin' />
            <input type="time" placeholder="Horário" className='inputLogin' 
            min="07:00" max="17:00"
            />

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