import React, { Component } from 'react';

//Imagen

// Icones


// Components

//mudança de páginas

class receitaList extends Component {
    state = {
        receitas: [
            {
                id: '1',
                title: 'Receita Médica',
                date: '20/02/2023',
                protocolo: '10129819378234',
                remedios: [
                    {
                        id: '1',
                        nome: 'Tilenol',
                        uso: 'Oral',
                        intervalo: '8 horas',
                        dose: '1 comprimido',
                    },
                    {
                        id: '2',
                        nome: 'Dipirona',
                        uso: 'Oral',
                        intervalo: '12 horas',
                        dose: '2 comprimidos',
                    }
                ]
            },

        ]
    }




    render() {
        const receitas = this.state.receitas

        const listCategories = receitas.map((receita) =>
            <li key={(receita.id)} className="favoritoItem vacinaItem"
                onClick={
                    () => {
                        // window.location.href = "/produto"
                        // this.setState({id: aviso.id}, () => {
                        // (this.props.clickButton(this.state))
                        //   }
                    }
                }
            >
                <div className='areaTextDescProductF vacinaItem receitaItem' >
                    <p className='valueProduct' >{receita.title}</p>
                    <p className='descricaoProduct' >{receita.date}</p>
                    <p className='descricaoProduct' > Protocolo: {receita.protocolo}</p>  
                    <button className='buttonLogin btnExame'>Ver</button>                  
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

export default receitaList;