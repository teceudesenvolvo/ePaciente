import React, { Component } from 'react';



//Imagens


// Icones
import {
  FaHome,
  FaHeart,
  FaShoppingBag,
  FaBell,
  FaSistrix,
  FaUser,
  FaUsers,
  FaTag,
  FaQuestionCircle

} from "react-icons/fa";

// Components
import TopBar from '../../componets/topBarSearch'


//mudança de páginas

class Mais extends Component {
  render() {
    return (

      <div className='App-header MenuPage' >
        <div className='header-home'>
          <TopBar />
        </div>
        <div className='Mais-content'>
          <div className='Mais-item'>
            <a href='/consultas' className='Mais-icon' >
              <span className='Mais-item-title'>Consultas</span>
            </a>
          </div>
          <div className='Mais-item'>
            <a href='/exames' className='Mais-icon' >
              <span className='Mais-item-title'>Exames</span>
            </a>
          </div>
          <div className='Mais-item'>
            <a href='/vacinas' className='Mais-icon' >
              <span className='Mais-item-title'>Vacinas</span>
            </a>
          </div>
          <div className='Mais-item'>
            <a href='/receitas' className='Mais-icon' >
              <span className='Mais-item-title'>Receitas</span>
            </a> 
          </div>
          <div className='Mais-item'>
            <a href='/perfil' className='Mais-icon' >
              <span className='Mais-item-title'>Minha Saúde</span>
            </a>
          </div>
          <div className='Mais-item'>
            <a href='/avalie' className='Mais-icon' >
              <span className='Mais-item-title'>Avalie</span>
            </a>
          </div>
        </div>




      </div>
    );
  }
}

export default Mais;