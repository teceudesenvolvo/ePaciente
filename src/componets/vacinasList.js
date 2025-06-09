import React, { Component } from 'react';

//Imagen

// Icones


// Components

//mudança de páginas

class vacinaList extends Component {
    state = {
        vacinas: [
            {
                id: '1',
                tipo: 'COVID-19',
                dateInitial: '20/02/2023',
                dateEnd: '20/02/2023',
                hora: '10:00 às 17:00',
                idades: '19 a 45 anos'
            },
            {
                id: '1',
                tipo: 'Influenza A',
                dateInitial: '20/02/2023',
                dateEnd: '20/02/2023',
                hora: '10:00 às 17:00',
                idades: '19 a 45 anos'
            },
            {
                id: '1',
                tipo: 'Poliomelite',
                dateInitial: '20/02/2023',
                dateEnd: '20/02/2023',
                hora: '10:00 às 17:00',
                idades: '19 a 45 anos'
            },
        ]
    }




    render() {
        const vacinas = this.state.vacinas

        const listCategories = vacinas.map((vacina) =>
            <li key={(vacina.id)} className="favoritoItem vacinaItem"
                onClick={
                    () => {
                        window.location.href = "#"
                       
                    }
                }
            >
                <div className='areaTextDescProductF vacinaItem' >
                    <p className='valueProduct' >{vacina.tipo}</p>
                    <p className='descricaoProduct' >Início: {vacina.dateInitial}</p>
                    <p className='descricaoProduct' >Final: {vacina.dateEnd}</p>
                    <p className='descricaoProduct' >{vacina.hora}</p>
                    <p className='descricaoProduct' >{vacina.idades}</p>
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

export default vacinaList;