import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//Imagens
import logo from '../../assets/logoLaranga.png';
// Libs
import { cpf } from 'cpf-cnpj-validator';
import axios from 'axios';

const Register = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    passwordConfirmed: '',
    tel: '',
    cep: '',
    address: 'Endereço',
    numberBilling: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear individual error when user starts typing again
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const fetchAddress = () => {
    if (formData.cep.length < 8) return;

    setFormData(prev => ({ ...prev, address: 'Carregando...' }));
    axios.get(`https://viacep.com.br/ws/${formData.cep}/json`)
      .then((res) => {
        if (res.data.erro) throw new Error('CEP não encontrado');
        setFormData(prev => ({
          ...prev,
          address: `${res.data.logradouro}, ${res.data.bairro}, ${res.data.localidade} - ${res.data.uf}`,
        }));
      })
      .catch(() => {
        setErrors(prev => ({ ...prev, cep: 'CEP Inválido' }));
        setFormData(prev => ({ ...prev, address: 'Endereço não encontrado' }));
      });
  };

  const handleRegister = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!cpf.isValid(formData.cpf)) newErrors.cpf = 'CPF inválido';
    if (!formData.email.includes('@')) newErrors.email = 'Email inválido';
    if (formData.password.length < 6) newErrors.password = 'Senha curta';
    if (formData.password !== formData.passwordConfirmed) newErrors.passwordConfirmed = 'Senhas não conferem';
    if (!formData.numberBilling) newErrors.numberBilling = 'Obrigatório';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Navigation logic
    history.push('/perfil');
  };

  return (
    <div className='App-header'>
      <div className='Container'>
        <img src={logo} alt="logo" className='logo' />
        <h1>Seja bem-vindo!</h1>
        <form className='formLogin' onSubmit={(e) => e.preventDefault()}>
          <input name="name" value={formData.name} onChange={handleInputChange} 
            placeholder={errors.name || "Nome*"} className={errors.name ? 'inputLogin txtErro' : 'inputLogin'} />
          
          <input name="cpf" value={formData.cpf} onChange={handleInputChange} 
            placeholder={errors.cpf || "CPF*"} className={errors.cpf ? 'inputLogin txtErro' : 'inputLogin'} />

          <input name="email" value={formData.email} onChange={handleInputChange} 
            placeholder={errors.email || "Email*"} className={errors.email ? 'inputLogin txtErro' : 'inputLogin'} />

          <input name="password" type="password" value={formData.password} onChange={handleInputChange} 
            placeholder={errors.password || "Senha*"} className={errors.password ? 'inputLogin txtErro' : 'inputLogin'} />

          <input name="passwordConfirmed" type="password" value={formData.passwordConfirmed} onChange={handleInputChange} 
            placeholder={errors.passwordConfirmed || "Confirmação de Senha*"} className={errors.passwordConfirmed ? 'inputLogin txtErro' : 'inputLogin'} />

          <input name="tel" value={formData.tel} onChange={handleInputChange} 
            placeholder={errors.tel || "Telefone*"} className={errors.tel ? 'inputLogin txtErro' : 'inputLogin'} />

          <label className="labelEndereco">{formData.address}</label>
          
          <input name="cep" value={formData.cep} onChange={handleInputChange} onBlur={fetchAddress}
            placeholder={errors.cep || "CEP*"} className={errors.cep ? 'inputLogin txtErro' : 'inputLogin'} />

          <input name="numberBilling" value={formData.numberBilling} onChange={handleInputChange} 
            placeholder={errors.numberBilling || "Número da casa*"} className={errors.numberBilling ? 'inputLogin txtErro' : 'inputLogin'} />

          <div className="checkbox-politicas">
            <input type="checkbox" className='inputLogin' />
            <p>Concordo com os termos de uso e as politicas de privacidade.</p>
          </div>
        </form>
        <button onClick={handleRegister} className='buttonLogin'>Cadastrar</button>
        <p>já tem uma conta? <a href='/login' className='linkLogin'>Fazer login</a></p>
      </div>
    </div>
  );
};

export default Register;