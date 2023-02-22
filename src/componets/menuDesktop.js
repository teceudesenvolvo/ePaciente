import React, { Component } from 'react';


//Imagens
import Logo from '../assets/logoLaranga.png';

// Icones
import {
    FaHome,
    FaHeart,
    FaShoppingBag,
    FaBell,
    FaUser,
    FaQuestionCircle

} from "react-icons/fa";

// Components

//mudança de páginas

class menuDesktop extends Component {

    constructor(props) {
        super(props)
        this.state = {
            linkMenu: 'aDesktop',
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
            case `/favoritos`:
                return this.setState({ linkMenu2: 'aDesktop link-desktop-active' })
            case `/Compras`:
                return this.setState({ linkMenu3: 'aDesktop link-desktop-active' })
            case `/Notificacoes`:
                return this.setState({ linkMenu4: 'aDesktop link-desktop-active' })
            case `/Mais`:
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
                    <img src={Logo} alt="logomarca" ></img>
                    {/* <h1 className='h1-logo'>| List</h1> */}
                </a>

                <a href="/" className={this.state.linkMenu}>
                    <FaHome className='fas fa-home'></FaHome>
                    <span className='nav-item'>Home</span>
                </a>

                <a href="/favoritos" className={this.state.linkMenu2}>
                    <FaHeart className='fas fa-favoritos'></FaHeart>
                    <span className='nav-item'>favoritos</span>
                </a>

                <a href="/Compras" className={this.state.linkMenu3}>
                    <FaShoppingBag className='fas fa-Compras'></FaShoppingBag>
                    <span className='nav-item'>Compras</span>
                </a>

                <a href="/Notificacoes" className={this.state.linkMenu4}>
                    <FaBell className='fas fa-Notificacoes'></FaBell>
                    <span className='nav-item'>Notificações</span>
                </a>
                <a href="/login" className={this.state.linkMenu5}>
                    <FaUser className='fas fa-Ajuda'></FaUser>
                    <span className='nav-item'>Minha Conta</span>
                </a>
                <a href="/Ajuda" className={this.state.linkMenu5}>
                    <FaQuestionCircle className='fas fa-Ajuda'></FaQuestionCircle>
                    <span className='nav-item'>Ajuda</span>
                </a>




            </nav>

        );
    }
}

export default menuDesktop;