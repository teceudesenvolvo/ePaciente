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

class menu extends Component{

  constructor(props){
    super(props)
    this.state = {
      linkMenu: 'linkMenu',
      linkMenu2: 'linkMenu',
      linkMenu3: 'linkMenu',
      linkMenu4: 'linkMenu',
      linkMenu5: 'linkMenu',
      window: window.location.pathname,
    }
  }


  btnHome = () =>{
       switch (this.state.window) {
      case `/`:
        return this.setState({linkMenu: 'linkMenu link-active'})
      case `/favoritos`:
        return this.setState({linkMenu2: 'linkMenu link-active'})
      case `/Compras`:
        return this.setState({linkMenu3: 'linkMenu link-active'})
      case `/Notificacoes`:
        return this.setState({linkMenu4: 'linkMenu link-active'})
      case `/Mais`:
        return this.setState({linkMenu5: 'linkMenu link-active'})
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


  render(){  
    return (      
        <nav className='menu'>
                        
            <a href='/'  className={this.state.linkMenu}><FaStethoscope /></a> 
            <a href='/favoritos' className={this.state.linkMenu2}> < FaHandHoldingHeart/> </a> 
            <a href='/Compras' className={this.state.linkMenu3}> <FaSyringe /> </a>
            <a href='/Notificacoes' className={this.state.linkMenu4}> <FaFileMedical /> </a>
            <a href='/Mais' className={this.state.linkMenu5}> <FaBars /> </a>
               
        </nav>

    );
  }
}

export default menu;