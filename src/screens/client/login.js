import React, { Component } from 'react';
import ReactDOM from 'react-dom'

//Imagens
import logo from '../../assets/e-paciente-color-txt-15.png';
import google from '../../assets/google.png';
import face from '../../assets/face.png';
// Icones

// Components

//mudança de páginas

class loginClient extends Component {
    render() {
        return (
            <div className='App-header' >
                <div className='Container' >
                    <img src={logo} alt="logo" className='logo logoLogin' />
                    <form className='formLogin'>
                        <h1>Entre com sua conta:</h1>
                        <input type="text" placeholder="CPF" className='inputLogin' />
                        <input type="password" placeholder="Senha" className='inputLogin' />
                        <a href='#' className='linkLogin'>Esqueceu a senha?</a>
                        <button className='buttonLogin'>Entrar</button>
                        </form>
                    <p>Não tem uma conta? <a href='/register' className='linkLogin'>Crie uma</a></p>
                </div>
            </div>
        );
    }
}

export default loginClient;