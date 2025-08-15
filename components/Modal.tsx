
import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { CloseIcon } from './icons/CloseIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, service }) => {
  const [selectedDetails, setSelectedDetails] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    instagram: '',
    extraMessage: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
      // Reset state when modal opens
      setSelectedDetails(new Set());
      setFormData({ name: '', email: '', instagram: '', extraMessage: '' });
      setErrors({ name: false, email: false });
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if(errors.name && id === 'name') setErrors(prev => ({...prev, name: false}));
    if(errors.email && id === 'email') setErrors(prev => ({...prev, email: false}));
  };

  const handleDetailToggle = (detail: string) => {
    setSelectedDetails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(detail)) {
        newSet.delete(detail);
      } else {
        newSet.add(detail);
      }
      return newSet;
    });
  };

  const handleSendWhatsApp = () => {
    if (!service) return;

    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email) {
      return;
    }

    let message = `Olá! Meu nome é *${formData.name}*.\n\n`;
    message += `Gostaria de um orçamento para o serviço de *${service.title}*.`;

    if (selectedDetails.size > 0) {
      message += `\n\nItens de interesse:\n${Array.from(selectedDetails).map(d => `- ${d}`).join('\n')}`;
    }

    if (formData.extraMessage.trim()) {
      message += `\n\nInformações adicionais:\n${formData.extraMessage.trim()}`;
    }

    message += `\n\n---\n*Contato*\nEmail: ${formData.email}`;
    if (formData.instagram.trim()) {
      message += `\nInstagram: @${formData.instagram.trim().replace('@', '')}`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  if (!service) return null;

  const backdropClass = isClosing ? 'opacity-0' : 'opacity-100';
  const modalClass = isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors duration-300";
  const errorInputStyle = "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50";


  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'visible' : 'invisible'}`}
      onClick={handleClose}
    >
      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${backdropClass}`}
      />
      <div
        className={`relative w-full max-w-2xl bg-brand-dark/80 rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/10 text-white transform transition-all duration-300 ${modalClass} overflow-y-auto max-h-[90vh]`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors duration-300 z-10">
            <CloseIcon className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {React.createElement(service.icon, { width: 36, height: 36 })}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">{service.title}</h2>
          </div>

          <p className="text-brand-gray mb-6 text-sm sm:text-base">{service.longDescription}</p>
          
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brand-gray mb-2">Nome *</label>
                <input type="text" id="name" value={formData.name} onChange={handleInputChange} className={`${inputStyle} ${errors.name ? errorInputStyle : ''}`} placeholder="Seu nome completo" />
                {errors.name && <p className="text-red-400 text-xs mt-1">Por favor, preencha seu nome.</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-brand-gray mb-2">Email *</label>
                <input type="email" id="email" value={formData.email} onChange={handleInputChange} className={`${inputStyle} ${errors.email ? errorInputStyle : ''}`} placeholder="seu.email@exemplo.com" />
                {errors.email && <p className="text-red-400 text-xs mt-1">Por favor, insira um email válido.</p>}
              </div>
            </div>
             <div>
                <label htmlFor="instagram" className="block text-sm font-medium text-brand-gray mb-2">Instagram (opcional)</label>
                <input type="text" id="instagram" value={formData.instagram} onChange={handleInputChange} className={inputStyle} placeholder="@seuusuario" />
              </div>
            <div>
              <label htmlFor="extraMessage" className="block text-sm font-medium text-brand-gray mb-2">Mensagem adicional (opcional)</label>
              <textarea id="extraMessage" rows={3} value={formData.extraMessage} onChange={handleInputChange} className={inputStyle} placeholder="Conte mais sobre seu projeto..."></textarea>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-semibold mb-3 text-base">Selecione os itens de interesse (opcional):</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.details.map(detail => (
                <label key={detail} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm sm:text-base">
                  <input
                    type="checkbox"
                    checked={selectedDetails.has(detail)}
                    onChange={() => handleDetailToggle(detail)}
                    className="form-checkbox h-5 w-5 rounded bg-gray-700 border-gray-600 text-purple-500 focus:ring-purple-500"
                  />
                  <span>{detail}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSendWhatsApp}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full text-base sm:text-lg hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 transform transition-all duration-300"
          >
            <WhatsAppIcon className="w-6 h-6" />
            Enviar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
