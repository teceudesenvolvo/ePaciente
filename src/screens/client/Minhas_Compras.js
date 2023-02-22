import React, { Component } from 'react';


//Imagens

// Icones

// Components
import ProductsList from '../../componets/ProductsList_minhaComp';

//mudança de páginas

class Minhas_Compras extends Component{
  render(){  
    return (   

        <div className='App-header' >

            <p>Minhas Compras</p>
            <div className='minhasCompras'>
                  <ProductsList ></ProductsList>
            </div>
           
        </div>
    );
  }
}

export default Minhas_Compras;