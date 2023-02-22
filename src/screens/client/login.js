import React, { Component } from 'react';
import ReactDOM from 'react-dom'

//Imagens
import logo from '../../assets/logoLaranga.png';
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
                    <img src={logo} alt="logo" className='logo' />
                    <h1>Seja bem-vindo!</h1>
                    <form className='formLogin'>
                        <input type="text" placeholder="E-mail" className='inputLogin' />
                        <input type="password" placeholder="Senha" className='inputLogin' />
                        <a href='#' className='linkLogin'>Esqueceu a senha?</a>
                        <button className='buttonLogin'>Entrar</button>
                    </form>
                    <p>Entre com sua conta:</p>
                    <div className='divLogin'>
                        <a href='#' className='logoGoogle'>
                            <img src={google} alt="google" className='imgLogin' />
                        </a>
                        <a href='#' className='logoFace'>
                            <img src={face} alt="face" className='imgLogin' />
                        </a>
                    </div>
                    <p>Não tem uma conta? <a href='/register' className='linkLogin'>Crie uma</a></p>
                </div>
            </div>
        );
    }
}

export default loginClient;