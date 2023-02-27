import React, { Component } from 'react';
import '../App.css'
import axios from 'axios'

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
          <TopBar />
        </div>


        <div className='conteinerHome'>
          <div>
            <input className='btnHomeAcess btnLoginHome' type="button" value="Primeiro Acesso"
            onClick={
              () => {
                window.location.pathname = '/register'
              }
            }
            />
            <input className='btnHomeAcess btnCadastroHome' type="button" value="Acessar Portal" 
            onClick={
              () => {
                window.location.pathname = '/login'
              }
            }
            />
          </div>

          {/* Carrosel */}
          <p className='textoDestaques'>Destaques</p>

          <div className='HomeDesktopCarrosel'>
            <SlideFeacures />

          </div>
          {/* Destaque Lista */}
          <div className=''>
            <ProductsList />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;