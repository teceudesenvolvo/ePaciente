import React, { Component } from 'react';



//Imagens

// Icones

// Components
import TopBar from '../../componets/topBarSearch'


//mudança de páginas

class Perfil extends Component {
    render() {
        return (

            <div className='App-header' >
                <div className='header-home'>
                    <TopBar />
                </div>
                <div className='favoritos agendarConsulta'>
                    <h1>Informações Pessoais</h1>


                    <ul className='vistosHome'>
                        <li className="favoritoItem vacinaItem">
                            <div className='areaTextDescProduct' >
                                <p className='descricaoProduct' ><b>Nome Completo</b></p>
                                <p className='descricaoProduct authorProduct' >Nascimento: 03/11/1997</p>
                                <p className='descricaoProduct' >Sexo: <b>Masculino</b></p>
                                <p className='descricaoProduct' >Tipo Sanguineo: <b>O-</b></p>
                                <p className='descricaoProduct' >CPF:</p>
                                <p className='descricaoProduct' >RG:</p>
                                <p className='descricaoProduct' >CNS<b>123 1234 1234 1234</b></p>
                                <p className='descricaoProduct' >Endereço</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}

export default Perfil;