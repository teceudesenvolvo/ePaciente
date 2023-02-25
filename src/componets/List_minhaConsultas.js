import React, { Component } from 'react';

//Imagen

// Icones


// Components

//mudança de páginas

class ProductsList_minhaConsultas extends Component {
    state = {
        consultas: [
            {
                id: '1',
                especialidade: 'Clinica Médica',
                data: '10/03/2023',
                horario: '10:00',
                medico: 'Nome Sobrenome',
                protocolo: '000000123',
                unidade: 'UBS - Localidade',
                enderecoUnd: 'Rua: Qualquer 13 - Cidade - Estado',
                status: 'aguardando'
            },
            {
                id: '2',
                especialidade: 'Dentista',
                data: '20/03/2023',
                horario: '10:00',
                medico: 'Nome Sobrenome',
                protocolo: '000000123',
                unidade: 'UBS - Localidade',
                enderecoUnd: 'Rua: Qualquer 13 - Cidade - Estado',
                status: 'aguardando'
            },
            {
                id: '3',
                especialidade: 'Cardiologista',
                data: '23/03/2023',
                horario: '10:00',
                medico: 'Nome Sobrenome',
                protocolo: '000000123',
                unidade: 'UBS - Localidade',
                enderecoUnd: 'Rua: Qualquer 13 - Cidade - Estado',
                status: 'aguardando'
            },
            {
                id: '4',
                especialidade: 'Pscologo',
                data: '27/03/2023',
                horario: '10:00',
                medico: 'Nome Sobrenome',
                protocolo: '000000123',
                unidade: 'UBS - Localidade',
                enderecoUnd: 'Rua: Qualquer 13 - Cidade - Estado',
                status: 'aguardando'
            },
        ]
    }




    render() {
        const consultas = this.state.consultas

        const listCategories = consultas.map((consulta) =>
            <li key={(consulta.id)} className="productItem-minhasCompras"
                onClick={
                    () => {
                        window.location.href = "/Servico"
                        // this.setState({id: aviso.id}, () => {
                        // (this.props.clickButton(this.state))
                        //   }
                    }
                }
            >
                <div className='areaTextDescProduct-minhasCompras' >
                    <div className='descricaoProduct-minhasCompras'>
                        <p><b>{consulta.especialidade}</b></p>
                        <p className='status'>{consulta.data}</p>
                        <p>{consulta.horario}</p>
                        <p>{consulta.medico}</p>
                        <p>{consulta.protocolo}</p>
                        <p><b>{consulta.unidade}</b></p>
                        <p>{consulta.enderecoUnd}</p>
                    </div>
                    <div className='status'></div>
                </div>
            </li>
        )


        return (
            <>
                <ul className='vistosHome consultas'>
                    {listCategories}
                </ul>
            </>

        );
    }
}

export default ProductsList_minhaConsultas;