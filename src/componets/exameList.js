import React, { Component } from 'react';

//Imagen

// Icones


// Components

//mudança de páginas

class favoritoList extends Component {
    state = {
        exames: [
            {
                id: '1',
                image: 'https://utilider.com/wp-content/uploads/2022/04/BATERIA-ALFACELL-LITHIUM-3V-CARTELA-C-2.webp',
                desc: 'Descrição do serviço 1',
                value: '192,50',
                valueP: '2x R$ 96,25'
            }
        ]
    }




    render() {
        const exames = this.state.exames

        if (exames.length > 10) {
            exames.length = 10
        }

        const listCategories = exames.map((exame) =>
            <li key={(exame.id)} className="favoritoItem"
                onClick={
                    () => {
                        window.location.href = "/produto"
                        // this.setState({id: aviso.id}, () => {
                        // (this.props.clickButton(this.state))
                        //   }
                    }
                }
            >
                <div className='areaTextDescProductF' >
                    <p className='valueProduct' >{exame.value}</p>
                    <p className='valueProductP' >{exame.valueP}</p>
                    <p className='descricaoProduct' >{exame.desc}</p>
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