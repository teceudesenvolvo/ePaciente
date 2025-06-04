import React, { Component } from 'react';


//Imagens

// Icones

// Components
import ConsultaList from '../../componets/List_minhaConsultas';


//mudança de páginas

class Minhas_Compras extends Component {

  render() {
    return (

      <div className='App-header' >

        <div className='minhasCompras'>
          <div className="agendar-consulta">

            <form className='formLogin agendarConsulta'>

              <h1>Agendar Consulta:</h1>
              <select name="Especialidade" placeholder='Especialidade' className='inputLogin'>
                <option>Clinica Médica (Atendimento Online)</option>
                <option>Clinica Médica</option>
                <option>Cardiologista</option>
                <option>Dentista</option>
              </select>


              <select name="unidade" placeholder='Unidade' className='inputLogin'>
                <option>UBS - Localidade Cadastrada</option>
                <option>Hospital Municipal</option>
              </select>

              <select className='inputLogin'>
                <option>Selecione o dia</option>
                <option>Segunda-feira - 16/06/2025</option>
                <option>Terça-feira - 17/06/2025</option>
                <option>Quarta-feira - 18/06/2025</option>
                <option>Quinta-feira - 19/06/2025</option>
                <option>Sexta-feira - 20/06/2025</option>
              </select>

              <select className='inputLogin'>
                <option>Selecione a hora</option>
                <option>07:00</option>
                <option>08:00</option>
                <option>09:00</option>
                <option>10:00</option>
                <option>13:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
                <option>17:00</option>
              </select>

              <button className='buttonAgendar'>Agendar</button>
              
            </form>
           
          
          
          </div>
          <div className='consultasMarcadas'>
            <ConsultaList />
          </div>
        </div>

      </div>
    );
  }
}

export default Minhas_Compras;