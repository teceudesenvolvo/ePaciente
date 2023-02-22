import React, { Component } from 'react';

//Imagen

// Icones


// Components

//mudança de páginas

class ProductsList_minhaComp extends Component {
    state = {
        products: [
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/limpeza.jpg',
                desc: 'Limpeza Técnica',
                value: '192,50',
                dataComp: '02 de Maio',
                status: 'Concluido',
                descStatus:'Concluído no dia 02 de maio'
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/motor.jpg',
                desc: 'Limpeza detalhada de motor',
                value: '192,50',
                dataComp: '02 de Maio',
                status: 'Concluido',
                descStatus:'Concluído no dia 02 de maio'
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/rodas.jpg',
                desc: 'Limpeza detalhada Em Rodas',
                value: '192,50',
                dataComp: '02 de Maio',
                status: 'Concluido',
                descStatus:'Concluído no dia 02 de maio'
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/moto.jpg',
                desc: 'Limpeza Em Motocicletas',
                value: '192,50',
                dataComp: '02 de Maio',
                status: 'Concluido',
                descStatus:'Concluído no dia 02 de maio'
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/limpeza.jpg',
                desc: 'Limpeza Técnica',
                value: '192,50',
                dataComp: '02 de Maio',
                status: 'Concluido',
                descStatus:'Concluído no dia 02 de maio'
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/motor.jpg',
                desc: 'Limpeza detalhada de motor',
                value: '192,50',
                dataComp: '02 de Maio',
                status: 'Concluido',
                descStatus:'Concluído no dia 02 de maio'
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/rodas.jpg',
                desc: 'Limpeza detalhada Em Rodas',
                value: '192,50',
                dataComp: '02 de Maio',
                status: 'Concluido',
                descStatus:'Concluído no dia 02 de maio'
            },
            {
                id: '1',
                image: 'https://autolider-ok6fhsopc-felipe00007.vercel.app/img/moto.jpg',
                desc: 'Limpeza Em Motocicletas',
                value: '192,50',
                dataComp: '02 de Maio',
                status: 'Concluido',
                descStatus:'Concluído no dia 02 de maio'
            }

        ]
    }




    render() {
        const products = this.state.products

        if (products.length > 10) {
            products.length = 10
        }

        const listCategories = products.map((product) =>
            <li key={(product.id)} className="productItem-minhasCompras"
                onClick={
                    () => {
                        window.location.href = "/Servico"
                        // this.setState({id: aviso.id}, () => {
                        // (this.props.clickButton(this.state))
                        //   }
                    }
                }
            >
                <img src={product.image}  className='imgProduct-minhasCompras' />
                <div className='areaTextDescProduct-minhasCompras' >
                    <div className='tituloProduct-minhasCompras'>
                        <h5>{product. dataComp}</h5>
                    </div>
                    <div className='descricaoProduct-minhasCompras'>
                      
                        <p className='status'>{product.status}</p>
                        <p>{product.descStatus}</p>
                        
                    </div>

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

export default ProductsList_minhaComp;