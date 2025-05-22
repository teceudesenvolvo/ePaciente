import React, { Component } from 'react';


//Imagens

// Icones
import {
    MdOutlineHome,
    MdOutlineMedicalServices,
    MdOutlineBloodtype,
    MdOutlineVaccines,
    MdOutlineFireTruck,
    MdOutlineSummarize
} from "react-icons/md";

// Components

//mudança de páginas

class menuDesktop extends Component {

    constructor(props) {
        super(props)
        this.state = {
            linkMenu: 'aDesktop',
            linkMenu1: 'aDesktop',
            linkMenu2: 'aDesktop',
            linkMenu3: 'aDesktop',
            linkMenu4: 'aDesktop',
            linkMenu5: 'aDesktop',
            window: window.location.pathname,
        }
    }


    btnHome = () => {
        switch (this.state.window) {
            case `/`:
                return this.setState({ linkMenu: 'aDesktop link-desktop-active' })
            case `/consultas`:
                return this.setState({ linkMenu1: 'aDesktop link-desktop-active' })
            case `/exames`:
                return this.setState({ linkMenu2: 'aDesktop link-desktop-active' })
            case `/vacinas`:
                return this.setState({ linkMenu3: 'aDesktop link-desktop-active' })
            case `/transporte`:
                return this.setState({ linkMenu4: 'aDesktop link-desktop-active' })
            case `/receitas`:
                return this.setState({ linkMenu5: 'aDesktop link-desktop-active' })
            default:
                return null
        }
    }

    componentDidMount() {
        const loadPage = () => {
            this.btnHome()
        }

        loadPage()
    }


    render() {
        return (
            <nav className='menuDesktop'>

                <a href='/' className="logoDesktopM" >

                </a>

                <a href="/" className={this.state.linkMenu}>
                    <MdOutlineHome className='fas fa-home'></MdOutlineHome >
                    <span className='nav-item'>Início</span>
                </a>

                <a href="/consultas" className={this.state.linkMenu1}>
                    <MdOutlineMedicalServices className='fas fa-home'></MdOutlineMedicalServices>
                    <span className='nav-item'>Consultas</span>
                </a>

                <a href="/exames" className={this.state.linkMenu2}>
                    <MdOutlineBloodtype className='fas fa-favoritos'></MdOutlineBloodtype>
                    <span className='nav-item'>Exames</span>
                </a>

                <a href="/vacinas" className={this.state.linkMenu3}>
                    <MdOutlineVaccines className='fas fa-Compras'></MdOutlineVaccines>
                    <span className='nav-item'>Vacinas</span>
                </a>

                <a href="/transporte" className={this.state.linkMenu4}>
                    <MdOutlineFireTruck className='fas fa-Notificacoes'></MdOutlineFireTruck>
                    <span className='nav-item'>Transporte</span>
                </a>
                <a href="/receitas" className={this.state.linkMenu5}>
                    <MdOutlineSummarize className='fas fa-Ajuda'></MdOutlineSummarize>
                    <span className='nav-item'>Receitas</span>
                </a>




            </nav>

        );
    }
}

export default menuDesktop;