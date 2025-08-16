
import React from 'react';
import { InstagramIcon } from './icons/InstagramIcon';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { INSTAGRAM_URL, WHATSAPP_NUMBER, WHATSAPP_CONTACT_MESSAGE } from '../constants';

const Footer: React.FC = () => {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_CONTACT_MESSAGE}`;

  return (
    <footer className="border-t border-white/10 py-6 bg-gradient-to-r from-brand-dark via-gray-900/50 to-brand-dark bg-[length:400%_400%] animate-gradient-pan">
      <div className="container mx-auto px-6 text-center text-brand-gray">
        <div className="flex justify-center items-center space-x-6 mb-4">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <WhatsAppIcon className="w-6 h-6" />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
            <InstagramIcon className="w-6 h-6" />
          </a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} InteligenciArte.IA. Todos os direitos reservados.
        </p>
        <p className="text-sm mt-2">
          Desenvolvido com ❤️ por{' '}
          <a href="#" className="font-semibold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-[length:200%_auto] animate-text-gradient-pan hover:brightness-110 transition">
            InteligenciArte.IA
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;