import React, { Component } from 'react';
import '../App.css'

//Imagens
import logoPref from '../assets/logo-slc.jpg'


// Icones
import {
  MdOutlineMedicalServices,
  MdOutlineBloodtype, 
  MdOutlineVaccines,
  MdOutlineFireTruck ,
  MdOutlineSummarize 
} from "react-icons/md";



// Components

//mudança de páginas

class Home extends Component {
  state = {
    name: 'Leonardo'
  }


  render() {
    return (

      <div className='App-header' >

        {/* Search */}
        <div className='header-home'>
          <div className='headerName' >
            <h2>Olá, {this.state.name}</h2>
            <h3>Seja bem-vindo!</h3>
          </div>
          <div className='logoPrefHeaderHome'>
            <img alt='logomarca' src={logoPref} className='logoPref' />
          </div>
        </div>
        <div className='optionsHome'>
          <a className='optionHomeA' href='/'><MdOutlineMedicalServices className='iconOptionsHome' /> <br />  Consultas</a>
          <a className='optionHomeA' href='/'><MdOutlineBloodtype className='iconOptionsHome' /> <br />  Exames</a>
          <a className='optionHomeA' href='/'><MdOutlineVaccines className='iconOptionsHome' /> <br />  Vacinas</a>
          <a className='optionHomeA' href='/'><MdOutlineFireTruck   className='iconOptionsHome' /> <br />  Transporte</a>
          <a className='optionHomeA' href='/'><MdOutlineSummarize  className='iconOptionsHome' /> <br />  Receitas</a>
        </div>
      </div>
    );
  }
}

export default Home;