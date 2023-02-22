import React, { Component } from 'react';

//Imagens


// Icones


// Components
import ProductsList from '../../componets/productsListHome';

//mudança de páginas

class categorias extends Component {
    render() {
        return (

            <div className='App-header' >


                <div className='conteinerCategorias'>
                    <div className='categoriesHeader'>
                        <p className='pCategories' >Cursos</p>
                    </div>
                    <div className=''>
                        <ProductsList />
                    </div>

                </div>



            </div>
        );
    }
}

export default categorias;