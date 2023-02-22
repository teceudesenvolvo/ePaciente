import React, { Component } from 'react';

//Imagen

// Icones


// Components

//mudança de páginas

class ProductsList extends Component {
    state = {
        products: [
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/limpeza.jpg',
                desc: 'Limpeza Técnica',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/motor.jpg',
                desc: 'Limpeza detalhada de motor',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/rodas.jpg',
                desc: 'Limpeza detalhada Em Rodas',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/moto.jpg',
                desc: 'Limpeza Em Motocicletas',
                value: '192,50' 
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/limpeza.jpg',
                desc: 'Limpeza Técnica',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/motor.jpg',
                desc: 'Limpeza detalhada de motor',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/rodas.jpg',
                desc: 'Limpeza detalhada Em Rodas',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/moto.jpg',
                desc: 'Limpeza Em Motocicletas',
                value: '192,50' 
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/limpeza.jpg',
                desc: 'Limpeza Técnica',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/motor.jpg',
                desc: 'Limpeza detalhada de motor',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/rodas.jpg',
                desc: 'Limpeza detalhada Em Rodas',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/moto.jpg',
                desc: 'Limpeza Em Motocicletas',
                value: '192,50' 
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/limpeza.jpg',
                desc: 'Limpeza Técnica',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/motor.jpg',
                desc: 'Limpeza detalhada de motor',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/rodas.jpg',
                desc: 'Limpeza detalhada Em Rodas',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/moto.jpg',
                desc: 'Limpeza Em Motocicletas',
                value: '192,50' 
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/limpeza.jpg',
                desc: 'Limpeza Técnica',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/motor.jpg',
                desc: 'Limpeza detalhada de motor',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/rodas.jpg',
                desc: 'Limpeza detalhada Em Rodas',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/moto.jpg',
                desc: 'Limpeza Em Motocicletas',
                value: '192,50' 
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/limpeza.jpg',
                desc: 'Limpeza Técnica',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/motor.jpg',
                desc: 'Limpeza detalhada de motor',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/rodas.jpg',
                desc: 'Limpeza detalhada Em Rodas',
                value: '192,50' 
            }, 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/moto.jpg',
                desc: 'Limpeza Em Motocicletas',
                value: '192,50' 
            }
            , 
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/moto.jpg',
                desc: 'Limpeza Em Motocicletas',
                value: '192,50' 
            }
            
        ]
    }

   


    render() {
        const products = this.state.products 

        if(products.length > 21){
            products.length = 21
        }
        
        const listCategories = products.map((product) => 
        <li key={(product.id)} className="productItem"
        onClick={
          () => {
              window.location.href = "/Servico"
            // this.setState({id: aviso.id}, () => {
            // (this.props.clickButton(this.state))
        //   }
        }
        }
        >
                <img alt='imagem do serviço' src={product.image} width="50%" className='imgProduct'/>
            <div className='areaTextDescProduct' >
                <p className='valueProduct' >R$ {product.value}</p>
                <p className='descricaoProduct' >{product.desc}</p>
            </div>
      </li>
    )


        return (
            <>
                <ul className='vistosHome'>
                    {listCategories}
                </ul>
            </>

        );
    }
}

export default ProductsList;
