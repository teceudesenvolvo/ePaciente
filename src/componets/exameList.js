import React, { Component } from 'react';

//Imagen

// Icones


// Components

//mudança de páginas

class exameList extends Component {
    state = {
        exames: [
            {
                id: '1',
                tipo: 'Exame de sangue',
                date: '20/02/2023',
            },
            {
                id: '1',
                tipo: 'Exame de sangue',
                date: '20/02/2023',
            }
        ]
    }




    render() {
        const exames = this.state.exames

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
                    <p className='valueProduct' >{exame.tipo}</p>
                    <p className='descricaoProduct' >{exame.date}</p>

                    <button className='buttonLogin btnExame'>PDF</button>
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

export default exameList;