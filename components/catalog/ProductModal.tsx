
import React, { useState, useEffect } from 'react';
import { CatalogSubcategory, SubcategoryPlan } from '../../types';
import { WHATSAPP_NUMBER } from '../../constants';
import { CloseIcon } from '../icons/CloseIcon';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import ImageViewer from './ImageViewer';
import { InfoIcon } from '../icons/InfoIcon';
import { TargetIcon } from '../icons/TargetIcon';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';


interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: CatalogSubcategory | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [view, setView] = useState<'details' | 'form'>('details');
  const [selectedPlan, setSelectedPlan] = useState<SubcategoryPlan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    email: '',
    instagram: '',
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
      setView('details');
      setSelectedPlan(product.plans && product.plans.length > 0 ? product.plans[0] : null);
      setFormData({ name: '', brandName: '', email: '', instagram: '' });
      setErrors({ name: false, email: false });
      setIsImageViewerOpen(false);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, product]);

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

  const handleSendToWhatsapp = () => {
    if (!product) return;

    const newErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email) {
      return;
    }

    let message = `Olá! Meu nome é *${formData.name.trim()}*`;
    if (formData.brandName.trim()) {
        message += `, da marca *${formData.brandName.trim()}*.`;
    } else {
        message += `.`;
    }
    
    message += `\n\nGostaria de um orçamento para o serviço: *${product.name}*.`;

    if (selectedPlan) {
      message += `\nPlano selecionado: *${selectedPlan.name} (R$ ${selectedPlan.price})*.`;
    }

    message += `\n\n---\n*Contato*`;
    message += `\nEmail: ${formData.email.trim()}`;
    if (formData.instagram.trim()) {
      message += `\nInstagram: @${formData.instagram.trim().replace('@', '')}`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    handleClose();
  };

  if (!product) return null;

  const backdropClass = isClosing ? 'opacity-0' : 'opacity-100';
  const modalClass = isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100';
  const inputStyle = "w-full bg-white/5 border border-white/10 rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors duration-300";
  const errorInputStyle = "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50";
  const hasPlans = product.plans && product.plans.length > 0;

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'visible' : 'invisible'}`}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${backdropClass}`} />
        <div
          className={`relative w-full max-w-4xl bg-brand-dark/80 rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/10 text-white transform transition-all duration-300 ${modalClass} max-h-[90vh] overflow-y-auto scrollbar-custom`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 sm:p-6 md:p-8">
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors duration-300 z-20" aria-label="Fechar modal">
              <CloseIcon className="w-6 h-6" />
            </button>
            
            {view === 'details' && (
              <div className="animate-fade-in-up md:grid md:grid-cols-5 md:gap-8">
                 {/* Left column (image) */}
                <div className="md:col-span-2">
                  <div className="md:sticky md:top-6">
                    <button
                      onClick={() => setIsImageViewerOpen(true)}
                      aria-label={`Ver imagem de ${product.name} em tela cheia`}
                      className="block w-full mb-6 rounded-lg overflow-hidden relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-brand-dark"
                    >
                      <img 
                          src={`/${product.image}`} 
                          alt={`Imagem para ${product.name}`} 
                          className="w-full h-40 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </div>
                    </button>
                    {!hasPlans && (
                       <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                          <p className="text-sm text-brand-gray uppercase tracking-wider">Valor</p>
                          <p className="text-3xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mt-1">
                            {product.price ? `R$ ${product.price}` : 'A consultar'}
                          </p>
                          <p className="text-sm text-brand-gray mt-2">
                            <strong>Produção:</strong> {product.productionTime}
                          </p>
                        </div>
                    )}
                  </div>
                </div>

                {/* Right column (details) */}
                <div className="md:col-span-3 mt-6 md:mt-0">
                  <h2 id="modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4 sm:mb-6">{product.name}</h2>
                  
                  <div className="space-y-4 sm:space-y-5 text-sm mb-6 sm:mb-8 text-brand-gray">
                    <div className="flex gap-4">
                      <InfoIcon className="w-6 h-6 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-brand-light/80 text-xs uppercase tracking-wider mb-1">O que é?</h5>
                        <p>{product.whatIsIt}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <TargetIcon className="w-6 h-6 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-brand-light/80 text-xs uppercase tracking-wider mb-1">Para que serve?</h5>
                        <p>{product.whatIsItFor}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <CheckCircleIcon className="w-6 h-6 text-pink-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-brand-light/80 text-xs uppercase tracking-wider mb-1">Como ajuda?</h5>
                        <p>{product.howItHelps}</p>
                      </div>
                    </div>
                  </div>

                  {hasPlans && (
                    <div className="mb-6 sm:mb-8">
                      <h4 className="font-semibold text-brand-light mb-3">Escolha um Plano:</h4>
                      <div className="space-y-2 sm:space-y-3">
                        {product.plans!.map(plan => (
                          <label
                            key={plan.name}
                            className={`block p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                              selectedPlan?.name === plan.name
                                ? 'border-purple-500 bg-purple-500/10 shadow-lg'
                                : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            <input
                              type="radio"
                              name="plan"
                              className="sr-only"
                              checked={selectedPlan?.name === plan.name}
                              onChange={() => setSelectedPlan(plan)}
                              aria-label={`${plan.name} - R$ ${plan.price}`}
                            />
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-brand-light">{plan.name}</span>
                              <span className="font-bold text-xl sm:text-2xl text-gradient bg-gradient-to-r from-blue-400 to-purple-400">R${plan.price}</span>
                            </div>
                            <p className="text-sm text-brand-gray mt-1">{plan.description}</p>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setView('form')}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full text-base sm:text-lg hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transform transition-all duration-300"
                  >
                    Solicitar Orçamento via WhatsApp
                  </button>
                </div>
              </div>
            )}

            {view === 'form' && (
              <div className="animate-fade-in-up">
                <button onClick={() => setView('details')} className="absolute top-4 left-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 z-20">
                  <ArrowLeftIcon className="w-5 h-5"/>
                  <span className="text-sm">Voltar</span>
                </button>
                <h2 id="modal-title" className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6">Informações de Contato</h2>
                <p className="text-center text-brand-gray text-sm mb-4 sm:mb-6">Preencha seus dados para agilizar o atendimento.</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brand-gray mb-2">Nome *</label>
                      <input type="text" id="name" value={formData.name} onChange={handleInputChange} className={`${inputStyle} ${errors.name ? errorInputStyle : ''}`} placeholder="Seu nome completo" />
                      {errors.name && <p className="text-red-400 text-xs mt-1">Por favor, preencha seu nome.</p>}
                    </div>
                    <div>
                      <label htmlFor="brandName" className="block text-sm font-medium text-brand-gray mb-2">Nome da Marca (opcional)</label>
                      <input type="text" id="brandName" value={formData.brandName} onChange={handleInputChange} className={inputStyle} placeholder="Sua empresa" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-gray mb-2">Email *</label>
                      <input type="email" id="email" value={formData.email} onChange={handleInputChange} className={`${inputStyle} ${errors.email ? errorInputStyle : ''}`} placeholder="seu.email@exemplo.com" />
                      {errors.email && <p className="text-red-400 text-xs mt-1">Por favor, insira um email válido.</p>}
                    </div>
                    <div>
                      <label htmlFor="instagram" className="block text-sm font-medium text-brand-gray mb-2">Instagram (opcional)</label>
                      <input type="text" id="instagram" value={formData.instagram} onChange={handleInputChange} className={inputStyle} placeholder="@seuusuario" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSendToWhatsapp}
                  className="w-full mt-8 flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full text-base sm:text-lg hover:scale-105 hover:shadow-lg hover:shadow-green-500/20 transform transition-all duration-300"
                >
                  <WhatsAppIcon className="w-6 h-6" />
                  Enviar Solicitação
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {product && (
        <ImageViewer 
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
          imageUrl={`/${product.image}`}
        />
      )}
    </>
  );
};

export default ProductModal;