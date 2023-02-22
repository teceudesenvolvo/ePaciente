import React, { Component } from 'react';
import '../App.css'


//Imagens

import Logo from '../assets/e-paciente-15.png'

// Icones
import {
    FaSistrix
} from "react-icons/fa";


// Components

import CategoriasDesktop from '../componets/categoriasDesktop';

//mudança de páginas

class topBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            window: window.location.pathname,
        }
    }

    componentDidMount() {
        if (this.state.name) {
            this.setState({ helloText: `Olá, ${this.state.name}` })
        } else {
            this.setState({ helloText: `Seja bem vindo.` })
        }
    }


    render() {
        return (
            <>
                <div className='header-home'>
                    <p className='titleHeader'><img src={Logo} onClick={()=> {window.location.href = "/"}}/></p>
                    <input type="text" placeholder={`Pesquisar`} className='inputPesquisar' />
                    <FaSistrix className='PesquisarLogo' />
                    <div className='categoriasHomeDesktop'>
                        <CategoriasDesktop />
                    </div>
                </div>
            </>
        );
    }
}

export default topBar;