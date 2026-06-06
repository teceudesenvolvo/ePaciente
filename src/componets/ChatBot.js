import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import { FaTimes, FaRobot, FaStethoscope, FaCalendarCheck, FaVial, FaSyringe, FaBus, FaFileMedical } from 'react-icons/fa';

const initialMessage = {
  id: 1,
  sender: 'bot',
  text: 'Olá! Sou seu Assistente Virtual de Saúde. Como posso te ajudar hoje?',
  options: [
    { id: 'agendar_consulta', label: 'Agendar Consulta', icon: <FaCalendarCheck /> },
    { id: 'telemedicina', label: 'Telemedicina', icon: <FaStethoscope /> },
    { id: 'exames', label: 'Agendar Exame', icon: <FaVial /> },
    { id: 'vacinas', label: 'Vacinas', icon: <FaSyringe /> },
    { id: 'transporte', label: 'Transporte', icon: <FaBus /> },
    { id: 'receitas', label: 'Receitas Digitais', icon: <FaFileMedical /> },
  ]
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentFlow, setCurrentFlow] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOptionClick = (optionId, optionLabel) => {
    const newUserMsg = { id: Date.now(), sender: 'user', text: optionLabel };
    setMessages(prev => [...prev.filter(m => !m.options), newUserMsg]);
    setIsTyping(true);
    
    setTimeout(() => {
      processFlow(optionId);
    }, 1000);
  };

  const processFlow = (optionId) => {
    setIsTyping(false);
    
    switch (optionId) {
      case 'agendar_consulta':
        setCurrentFlow('agendar_consulta');
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'bot',
          text: 'Qual especialidade você deseja agendar?',
          options: [
            { id: 'espec_clinico', label: 'Clínico Geral' },
            { id: 'espec_pediatra', label: 'Pediatra' },
            { id: 'espec_ginecologista', label: 'Ginecologista' }
          ]
        }]);
        break;
      
      case 'espec_clinico':
      case 'espec_pediatra':
      case 'espec_ginecologista':
        if (currentFlow === 'agendar_consulta') {
          setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'bot',
            text: 'Em qual período você prefere?',
            options: [
              { id: 'periodo_manha', label: 'Manhã' },
              { id: 'periodo_tarde', label: 'Tarde' }
            ]
          }]);
        }
        break;

      case 'periodo_manha':
      case 'periodo_tarde':
         if (currentFlow === 'agendar_consulta') {
            setMessages(prev => [...prev, {
              id: Date.now(),
              sender: 'bot',
              text: 'Consulta agendada com sucesso! Você receberá os detalhes em breve.',
              options: [{ id: 'inicio', label: 'Voltar ao Menu Principal' }]
            }]);
            setCurrentFlow(null);
         }
         break;

      case 'telemedicina':
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'bot',
          text: 'O atendimento online é seguro e prático. Certifique-se de que possui um dispositivo com câmera e internet. Para acessar a sala virtual, clique no link que enviamos para o seu e-mail.',
          options: [{ id: 'inicio', label: 'Voltar ao Menu Principal' }]
        }]);
        break;

      case 'exames':
         setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'bot',
            text: 'Para agendar um exame, por favor, confirme o tipo de exame solicitado na guia médica.',
            options: [
              { id: 'exame_sangue', label: 'Exame de Sangue' },
              { id: 'exame_imagem', label: 'Exame de Imagem' }
            ]
          }]);
          break;

      case 'exame_sangue':
      case 'exame_imagem':
          setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'bot',
            text: 'Seu exame foi pré-agendado. O sistema gerará uma confirmação automática e enviará lembretes perto da data.',
            options: [{ id: 'inicio', label: 'Voltar ao Menu Principal' }]
          }]);
          break;

      case 'vacinas':
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'bot',
          text: 'Seu calendário vacinal está atualizado! A próxima vacina (Gripe) está prevista para o mês que vem.',
          options: [{ id: 'inicio', label: 'Voltar ao Menu Principal' }]
        }]);
        break;

      case 'transporte':
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'bot',
          text: 'O serviço de transporte é direcionado para pacientes com mobilidade reduzida ou que necessitam de deslocamento rural. Deseja solicitar agora?',
          options: [
             { id: 'solicitar_transporte', label: 'Sim, solicitar' },
             { id: 'inicio', label: 'Não, voltar ao menu' }
          ]
        }]);
        break;

      case 'solicitar_transporte':
         setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'bot',
            text: 'Por favor, acesse a aba "Transporte" no menu principal para preencher o formulário completo com justificativa, local de partida e destino.',
            options: [{ id: 'inicio', label: 'Voltar ao Menu Principal' }]
          }]);
          break;

      case 'receitas':
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'bot',
          text: 'Suas receitas médicas digitais estão disponíveis. Você pode acessá-las na sua Carteira de Saúde e apresentar o QR Code diretamente na farmácia.',
          options: [{ id: 'inicio', label: 'Voltar ao Menu Principal' }]
        }]);
        break;

      case 'inicio':
        setMessages(prev => [...prev, initialMessage]);
        setCurrentFlow(null);
        break;

      default:
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'bot',
          text: 'Desculpe, não entendi. Por favor, escolha uma das opções.',
          options: [{ id: 'inicio', label: 'Voltar ao Menu Principal' }]
        }]);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="ep-chatbot-wrapper">
      <button 
        className={`ep-chatbot-fab ${isOpen ? 'ep-chatbot-fab--open' : ''}`}
        onClick={toggleChat}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {isOpen && (
        <div className="ep-chatbot-window ep-animate-fade-up">
          <div className="ep-chatbot-header">
            <div className="ep-chatbot-avatar">
              <FaRobot />
            </div>
            <div className="ep-chatbot-title">
              <h4>ePaciente Assist</h4>
              <span>Online</span>
            </div>
          </div>

          <div className="ep-chatbot-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`ep-chatbot-message-row ${msg.sender === 'user' ? 'ep-chatbot-message-row--right' : ''}`}>
                {msg.sender === 'bot' && (
                  <div className="ep-chatbot-message-avatar">
                    <FaRobot />
                  </div>
                )}
                <div className="ep-chatbot-message-content">
                  <div className={`ep-chatbot-bubble ep-chatbot-bubble--${msg.sender}`}>
                    {msg.text}
                  </div>
                  {msg.options && (
                    <div className="ep-chatbot-options">
                      {msg.options.map(opt => (
                        <button 
                          key={opt.id} 
                          className="ep-chatbot-option-btn"
                          onClick={() => handleOptionClick(opt.id, opt.label)}
                        >
                          {opt.icon && <span className="ep-chatbot-option-icon">{opt.icon}</span>}
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="ep-chatbot-message-row">
                <div className="ep-chatbot-message-avatar">
                  <FaRobot />
                </div>
                <div className="ep-chatbot-message-content">
                  <div className="ep-chatbot-bubble ep-chatbot-bubble--bot ep-chatbot-typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
