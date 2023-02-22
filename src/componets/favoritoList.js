import React, { Component } from 'react';

//Imagen

// Icones


// Components

//mudança de páginas

class favoritoList extends Component {
    state = {
        products: [
            {
                id: '1',
                image: 'https://utilider.com/wp-content/uploads/2022/04/BATERIA-ALFACELL-LITHIUM-3V-CARTELA-C-2.webp',
                desc: 'Descrição do serviço 1',
                value: '192,50', 
                valueP: '2x R$ 96,25' 
            }, 
            {
                id: '1',
                image: 'https://utilider.com/wp-content/uploads/2022/04/PILHA-ALFACELL-COMUM-PQ-AA-1.5V-C-4-CARTELA.webp',
                desc: 'Descrição do serviço 1',
                value: '192,50',
                valueP: '2x R$ 96,25' 

            }, 
            {
                id: '1',
                image: 'https://utilider.com/wp-content/uploads/2022/04/PISTOLA-PCOLA-QUENTE.webp',
                desc: 'Descrição do serviço 1',
                value: '192,50',
                valueP: '2x R$ 96,25' 
            }, 
            {
                id: '1',
                image: 'https://utilider.com/wp-content/uploads/2022/04/VDA06020-PETISQUEIRA-DE-VIDRO-D.webp',
                desc: 'Descrição do serviço 1',
                value: '192,50',
                valueP: '2x R$ 96,25'  
            }, 
            {
                id: '1',
                image: 'https://utilider.com/wp-content/uploads/2022/04/POTE-C-TAMPA-CLEAN-PRA.jpg',
                desc: 'Descrição do serviço 1',
                value: '192,50',
                valueP: '2x R$ 96,25' 
            }, 
            {
                id: '1',
                image: 'https://utilider.com/wp-content/uploads/2022/04/tabua-bambu-nv.webp',
                desc: 'Descrição do serviço 1',
                value: '192,50',
                valueP: '2x R$ 96,25'  
            }, 
            {
                id: '1',
                image: 'https://utilider.com/wp-content/uploads/2022/04/JARRA-DE-VIDRO-LOSANGO-416x416.jpg',
                desc: 'Descrição do serviço 1',
                value: '192,50',
                valueP: '2x R$ 96,25'  
            }, 
            {
                id: '1',
                image: 'https://utilider.com/wp-content/uploads/2022/04/POTE-DE-VIDRO-RT-C-DIV.jpg',
                desc: 'Descrição do serviço que vai',
                value: '192,50',
                valueP: '2x R$ 96,25' 

            }, 
        ]
    }

   


    render() {
        const products = this.state.products 

        if(products.length > 10){
            products.length = 10
        }
        
        const listCategories = products.map((product) => 
        <li key={(product.id)} className="favoritoItem"
        onClick={
          () => {
              window.location.href = "/produto"
            // this.setState({id: aviso.id}, () => {
            // (this.props.clickButton(this.state))
        //   }
        }
        }
        >
                <img alt='produto favorito' src={product.image} className='imgProductF'/>
            <div className='areaTextDescProductF' >
                <p className='valueProduct' >R$ {product.value}</p>
                <p className='valueProductP' >{product.valueP}</p>
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

export default favoritoList;