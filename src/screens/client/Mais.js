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



//mudança de páginas

class Mais extends Component{
  render(){  
    return (   

        <div className='App-header' >
            <p className='Mais-title'>Mais</p>
            <div className='Mais-content'>
             <div className='Mais-item'>
                <a href='/' className='Mais-icon' >
                  <FaHome/>
                  <span className='Mais-item-title'>Início</span>
                </a>
             </div>
             <div className='Mais-item'>
                <a href='/pesquisar' className='Mais-icon' >
                  <FaSistrix/>
                  <span className='Mais-item-title'>Buscar</span>
                </a>
             </div>
             <div className='Mais-item'>
                <a href='/Notificacoes' className='Mais-icon' >
                  <FaBell/>
                  <span className='Mais-item-title'>Notificações</span>
                </a>
             </div>
             <div className='Mais-item'>
                <a href='/favoritos' className='Mais-icon' >
                  <FaHeart/>
                  <span className='Mais-item-title'>Favoritos</span>
                </a>
             </div>
             <div className='Mais-item'>
                <a href='/ofertas' className='Mais-icon' >
                  <FaTag/>
                  <span className='Mais-item-title'>Ofertas do dia</span>
                </a>
             </div>
             <div className='Mais-item'>
                <a href='/Compras' className='Mais-icon' >
                  <FaShoppingBag/>
                  <span className='Mais-item-title'>Minhas Compras</span>
                </a>
             </div>
             <div className='Mais-item'>
                <a href='/Perfil' className='Mais-icon' >
                  <FaUser/>
                  <span className='Mais-item-title'>Minha Conta</span>
                </a>
             </div>
             <div className='Mais-item'>
                <a href='/Grupos' className='Mais-icon' >
                  <FaUsers/>
                  <span className='Mais-item-title'>Grupos de pagamentos</span>
                </a>
             </div>
             <div className='Mais-item'>
                <a href='/Ajuda' className='Mais-icon' >
                  <FaQuestionCircle/>
                  <span className='Mais-item-title'>Ajuda</span>
                </a>
             </div>
            </div>

         
            
         
        </div>
    );
  }
}

export default Mais;