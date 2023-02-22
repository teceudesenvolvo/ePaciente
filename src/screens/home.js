import React, { Component } from 'react';
import '../App.css'

//Imagens
import Logo from '../assets/logoLaranga.png';

// Icones


// Components
import SlideFeacures from '../componets/slideFeactures';
import TopBar from '../componets/topBarSearch'
import ProductsList from '../componets/productsListHome';

//mudança de páginas

class Home extends Component {
  render() {
    return (

      <div className='App-header' >

        {/* Search */}
        <div className='header-home'>
          <TopBar/>
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
          {/* <p className='textoDestaques'>Ultimos Vistos</p> */}
          <div className=''>
            <ProductsList />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;