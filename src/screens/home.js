import React, { Component } from 'react';
import '../App.css'

//Imagens
import Logo from '../assets/logoLaranga.png';

// Icones
import {

  FaSistrix,


} from "react-icons/fa";

// Components
import SlideFeacures from '../componets/slideFeactures';
import Categories from '../componets/categories';
import CategoriasDesktop from '../componets/categoriasDesktop';
import ProductsList from '../componets/productsListHome';

//mudança de páginas

class Home extends Component {
  render() {
    return (

      <div className='App-header' >

        {/* Search */}
        <div className='header-home'>
          <a href='/' className="logoDesktop" >
            {/* <img src={Logo} alt="Logo" /> */}
          </a>
          <input type="text" placeholder={`Pesquisar`} className='inputPesquisar' />
          <FaSistrix className='PesquisarLogo'/>
          <div className='categoriasHomeDesktop'>
            <CategoriasDesktop />
          </div>
        </div>

        <div className='conteinerHome'>

          {/* Carrosel */}
          <p className='textoDestaques'>Destaques</p>
 
          <div className='HomeDesktopCarrosel'>
          <SlideFeacures />
        
          </div>


          {/* Categories */}

          {/* <p className='textoDestaques'>Categorias</p>
          <div className='categoriasHome'>
            <Categories />
          </div> */}



          {/* View Latest */}
          <p className='textoDestaques'>Ultimos Vistos</p>
          <div className=''>
            <ProductsList />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;