import React, { Component } from 'react';

//Imagens


// Icones
import {
  FaStethoscope,
  FaFileMedical,
  FaBars,
  FaSyringe,
  FaHandHoldingHeart
} from "react-icons/fa";

// Components

//mudança de páginas

class menu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      linkMenu: 'linkMenu',
      linkMenu2: 'linkMenu',
      linkMenu3: 'linkMenu',
      linkMenu4: 'linkMenu',
      linkMenu5: 'linkMenu',
      menuClass: 'menu',
      window: window.location.pathname,
    }
  }


  btnHome = () => {
    switch (this.state.window) {
      case `/consultas`:
        return this.setState({ linkMenu: 'linkMenu link-active' })
      case `/exames`:
        return this.setState({ linkMenu2: 'linkMenu link-active' })
      case `/vacinas`:
        return this.setState({ linkMenu3: 'linkMenu link-active' })
      case `/receitas`:
        return this.setState({ linkMenu4: 'linkMenu link-active' })
      case `/Mais`:
        return this.setState({ linkMenu5: 'linkMenu link-active' })
      case `/login`:
        return this.setState({ menuClass: 'menuNone' })
      case `/register`:
        return this.setState({ menuClass: 'menuNone' })
      case `/`:
        return this.setState({ menuClass: 'menuNone' })
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
      <nav className={this.state.menuClass}>

        <a href='/consultas' className={this.state.linkMenu}><FaStethoscope /></a>
        <a href='/exames' className={this.state.linkMenu2}> < FaHandHoldingHeart /> </a>
        <a href='/vacinas' className={this.state.linkMenu3}> <FaSyringe /> </a>
        <a href='/receitas' className={this.state.linkMenu4}> <FaFileMedical /> </a>
        <a href='/Mais' className={this.state.linkMenu5}> <FaBars /> </a>

      </nav>

    );
  }
}

export default menu;