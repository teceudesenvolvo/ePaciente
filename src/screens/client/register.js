import React, { Component } from 'react';

//Imagens
import logo from '../../assets/logoLaranga.png';

// Libs
import { cpf } from 'cpf-cnpj-validator';
import axios from 'axios';
import { initializeApp } from "firebase/app";
import {firebaseConfig} from '../../firebase';


// Components

//mudança de páginas

// Cofigurações
const app = initializeApp(firebaseConfig) 

class register extends Component {
  state={
      placeName:'Nome*',
      placeCPF:'CPF*',
      placeEmail:'Email*',
      placePassword:'Senha*',
      placePasswordConfirmed:'Confirmação de Senha*',
      placeTel:'Telefone*',
      placeCEP:'CEP*',
      placeNumberBilling:'Número da casa*',
      name: '',
      cpf: '',
      email: '',
      password: '',
      passwordConfirmed: '',
      tel: '',
      cep: '',
      adress:'Endereço',
      numberBilling: '',
      classInput: 'inputLogin',  
      classInput1: 'inputLogin', 
      classInput2: 'inputLogin', 
      classInput3: 'inputLogin', 
      classInput4: 'inputLogin', 
      classInput5: 'inputLogin', 
      classInput6: 'inputLogin', 
      classInput7: 'inputLogin', 
  }

  changeCep = () => {
    this.setState({
      adress: 'Carregando...',
      bairro: 'Carregando...',
      cidade: 'Carregando...',
      estado: 'Carregando...',
    })
    axios.get(`https://viacep.com.br/ws/${this.state.cep}/json`)
      .then((res) => {
        this.setState({
          adress: `${res.data.logradouro}, ${res.data.bairro}, ${res.data.localidade} - ${res.data.uf}`,
          classInput6: 'inputLogin'
        })
      })
      .catch((erro) => {
        this.setState({ placeCEP: 'Cep Invalido', classInput6: 'txtErro' })
        console.log(erro)
      })
  }


  render() {
    return (
      <div className='App-header' >
        <div className='Container' >
          <img src={logo} alt="logo" className='logo' />
          <h1>Seja bem-vindo!</h1>
          <form className='formLogin'>
            <input 
            value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })}
            type="text" placeholder={this.state.placeName} className={this.state.classInput} />

            <input 
            value={this.state.cpf} 
            onFocus={
              () => {
                if (this.state.name === '') {
                  this.setState({ placeName: 'Digite seu nome', classInput: 'txtErro' })
                }else{
                  this.setState({classInput: 'inputLogin' })
                }
              }
            }
            onChange={(event) => this.setState({ cpf: event.target.value })} 
            type="text" placeholder={this.state.placeCPF} className={this.state.classInput1} />            
            <input 
            value={this.state.email} 
            onFocus={
              () => {
                   // Validação de CPF
                   if (this.state.cpf === '') {
                    this.setState({ placeCPF: 'Digite seu CPF', classInput1: 'txtErro' })
                  } else if (cpf.isValid(this.state.cpf) === false) {
                    this.setState({ placeCPF: 'Digite um CPF válido', classInput1: 'txtErro' })
                  }else{
                    this.setState({classInput1: 'inputLogin' })
                  }
              }
            }
            onChange={(event) => this.setState({ email: event.target.value })}
            type="text" placeholder={this.state.placeEmail} className={this.state.classInput2} />
            
            <input 
            value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })}
            onFocus={
              ()=>{
                if (this.state.email === '') {
                  this.setState({ placeEmail: 'Digite sua email', classInput2: 'txtErro' })
                } else if (this.state.email.includes('@') == false) {
                  this.setState({ placeEmail: 'Digite um email válido', classInput2: 'txtErro' })
                } else if (this.state.email.includes('.') == false) {
                  this.setState({ placeEmail: 'Digite um email válido', classInput2: 'txtErro' })
                } else if (this.state.email.length < 8) {
                  this.setState({ placeEmail: 'Digite um email válido', classInput2: 'txtErro' })
                }else{
                  this.setState({classInput2: 'inputLogin' })
                }
              }
            }
            type="password" placeholder={this.state.placePassword} className={this.state.classInput3} />
            
            <input 
            value={this.state.passwordConfirmed} onChange={(event) => this.setState({ passwordConfirmed: event.target.value })}
            onFocus={
              ()=>{
                if (this.state.password === '') {
                  this.setState({ placePassword: 'Digite seu senha', classInput3: 'txtErro' })
                } else if (this.state.password.length < 6) {
                  this.setState({ placePassword: 'Digite uma senha segura, maior que 6 caracteres com números e letras', classInput3: 'txtErro' })
                } else{
                  this.setState({classInput3: 'inputLogin' })
                }
              }
            }
            type="password" placeholder={this.state.placePasswordConfirmed} className={this.state.classInput4} />
            
            <input 
            value={this.state.tel} onChange={(event) => this.setState({ tel: event.target.value })}
            onFocus={
              ()=>{
                if(this.state.passwordConfirmed === ""){
                  this.setState({ placePasswordConfirmed: 'Confirmação de senha está diferente', classInput4: 'txtErro' })
                }else if(this.state.passwordConfirmed !== this.state.password){
                  this.setState({ placePasswordConfirmed: 'Confirmação de senha está diferente', classInput4: 'txtErro' })
                }
                else{
                  this.setState({classInput4: 'inputLogin' })
                }
              }
            }
            type="text" placeholder={this.state.placeTel} className={this.state.classInput5} />
            
            <label className="labelEndereco" >{this.state.adress}</label>
            <input 
            value={this.state.cep} onChange={(event) => this.setState({ cep: event.target.value })}
            onFocus={
              ()=>{
                if(this.state.tel === ""){
                  this.setState({ placeTel: 'Digite seu telefone', classInput5: 'txtErro' })
                }else{
                  this.setState({classInput5: 'inputLogin' })
                }
              }
            }
            type="text" placeholder={this.state.placeCEP} className={this.state.classInput6} />
            
            <input 
            value={this.state.numberBilling} onChange={(event) => this.setState({ numberBilling: event.target.value })}
            onFocus={()=>{
              this.changeCep()
            }}
            type="text" placeholder={this.state.placeNumberBilling} className={this.state.classInput7} />

            <div className="checkbox-politicas">
              <input type="checkbox" placeholder="Complemento" className='inputLogin' />
              <p> Concordo com os termos de uso e as politicas de privacidade. </p>
            </div>

            

          </form> 

            <button
              onClick={(
                () => {
                    if(this.state.numberBilling === ""){
                      this.setState({ placeNumberBilling: 'O número da casa', classInput6: 'txtErro' })
                    }

                    else {
                      this.createUser()
                    }
                }
            )}
            className='buttonLogin'>Cadastrar</button>
            <p>já tem uma conta? <a href='/login' className='linkLogin'>Fazer login</a></p>

        </div>

      </div>
    );
  }
}

export default register;