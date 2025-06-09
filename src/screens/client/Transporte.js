import React, { Component } from 'react';

//Imagens

// Icones

// Components
import ConsultaList from '../../componets/List_minhaConsultas'; // Mantido, mas pode ser renomeado para algo como "TransporteAgendadoList"

//mudança de páginas

class Minhas_Compras extends Component {

  render() {
    return (
      <div className='App-header' >
        <div className='minhasCompras'>
          <div className="agendar-consulta">
            <form className='formLogin agendarConsulta'>

              <h1>Agendar Transporte de Paciente:</h1>
              
              <select name="tipoAtendimento" placeholder='Tipo de Atendimento' className='inputLogin'>
                <option value="">Selecione o Tipo de Atendimento</option>
                <option value="consulta">Consulta Médica</option>
                <option value="exame">Exame Laboratorial/Imagem</option>
                <option value="internacao">Internação/Alta Hospitalar</option>
                <option value="transferencia">Transferência entre Unidades</option>
                <option value="urgencia">Urgência/Emergência</option>
                <option value="fisioterapia">Fisioterapia</option>
                <option value="odontologia">Odontologia</option>
                <option value="outro">Outro</option>
              </select>

              <select name="localOrigem" placeholder='Local de Origem' className='inputLogin'>
                <option value="">Selecione o Local de Origem</option>
                <option value="postoDeSaude">Posto de Saúde</option>
                <option value="hospital">Hospital</option>
                <option value="secretariaDeSaude">Secretaria de Saúde</option>
                <option value="residencia">Residência do Paciente</option>
                <option value="clinica">Clínica Particular</option>
              </select>

              <select name="localDestino" placeholder='Local de Destino' className='inputLogin'>
                <option value="">Selecione o Local de Destino</option>
                <option value="postoDeSaude">Posto de Saúde</option>
                <option value="hospital">Hospital</option>
                <option value="secretariaDeSaude">Secretaria de Saúde</option>
                <option value="clinicaEspecializada">Clínica Especializada</option>
                <option value="laboratorio">Laboratório</option>
                <option value="residencia">Residência do Paciente</option>
              </select>

              <select className='inputLogin'>
                <option value="">Selecione o dia</option>
                <option>Segunda-feira - 16/06/2025</option>
                <option>Terça-feira - 17/06/2025</option>
                <option>Quarta-feira - 18/06/2025</option>
                <option>Quinta-feira - 19/06/2025</option>
                <option>Sexta-feira - 20/06/2025</option>
              </select>

              <select className='inputLogin'>
                <option value="">Selecione a hora</option>
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

              <button className='buttonAgendar'>Agendar Transporte</button>
              
            </form>
          </div>
          <div className='consultasMarcadas'> {/* Considere renomear para algo como "transportesAgendados" */}
            <ConsultaList /> {/* Este componente precisaria ser adaptado para exibir agendamentos de transporte */}
          </div>
        </div>
      </div>
    );
  }
}

export default Minhas_Compras;