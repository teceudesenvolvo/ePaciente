import React, { Component } from 'react';

//Imagens

// Icones

// Components
import ExameList from '../../componets/exameList';

//mudança de páginas

class Exames extends Component {
  render() {
    return (
      <div className='App-header' >
        <div className='agendaExame agendar-consulta'>
          <form className='formLogin agendarConsulta'>
            <h1 className='titleAgendarExame'>Agendar Exame:</h1>
            <select name="tipoExame" placeholder='Tipo de Exame' className='inputLogin inputAgendarExame'>
              <option value="">Selecione o Tipo de Exame</option>
              <option value="hemograma">Hemograma Completo</option>
              <option value="glicemia">Glicemia em Jejum</option>
              <option value="colesterol">Perfil Lipídico (Colesterol)</option>
              <option value="urina">Exame de Urina</option>
              <option value="fezes">Exame de Fezes</option>
              <option value="raioX">Raio-X</option>
              <option value="ultrassom">Ultrassonografia</option>
              <option value="ressonancia">Ressonância Magnética</option>
              <option value="tomografia">Tomografia Computadorizada</option>
            </select>

            <select name="unidade" placeholder='Unidade' className='inputLogin inputAgendarExame'>
              <option value="">Selecione a Unidade</option>
              <option value="ubs">UBS - Localidade Cadastrada</option>
              <option value="hospitalMunicipal">Hospital Municipal</option>
              <option value="laboratorioCentral">Laboratório Central</option>
              <option value="clinicaParticular">Clínica de Imagem XYZ</option>
            </select>

            <select className='inputLogin inputAgendarExame'>
              <option value="">Selecione o Dia</option>
              <option>Segunda-feira - 16/06/2025</option>
              <option>Terça-feira - 17/06/2025</option>
              <option>Quarta-feira - 18/06/2025</option>
              <option>Quinta-feira - 19/06/2025</option>
              <option>Sexta-feira - 20/06/2025</option>
            </select>

            <select className='inputLogin inputAgendarExame'>
              <option value="">Selecione a Hora</option>
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

            <button className='buttonAgendar inputAgendarExame'>Agendar Exame</button>
          </form>
        </div>
        
        <div className='favoritos agendarConsulta'>
          <h1>Meus Exames</h1>
          <ExameList/> 
        </div>
      </div>
    );
  }
}

export default Exames;