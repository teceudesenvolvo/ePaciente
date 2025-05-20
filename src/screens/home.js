import React, { Component } from 'react';
import '../App.css'

//Imagens


// Icones


// Components

//mudança de páginas

class Home extends Component {
  state={
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
        </div>
      </div>
    );
  }
}

export default Home;