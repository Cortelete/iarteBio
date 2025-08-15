
import React from 'react';
import { motion } from 'framer-motion';
import { CatalogSubcategory } from '../../types';
import { InfoIcon } from '../icons/InfoIcon';
import { TargetIcon } from '../icons/TargetIcon';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';

interface SubcategoryCardProps {
  subcategory: CatalogSubcategory;
  onOpenModal: () => void;
  isActive?: boolean;
  [key: string]: any; // Allow other props from framer-motion
}

const SubcategoryCard: React.FC<SubcategoryCardProps> = ({ subcategory, onOpenModal, isActive = true, ...rest }) => {
  const hasPlans = subcategory.plans && subcategory.plans.length > 0;

  const handleClick = () => {
    if (isActive) {
      onOpenModal();
    }
  };

  return (
    <motion.div 
      {...rest}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (isActive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onOpenModal();
        }
      }}
      role="button"
      tabIndex={isActive ? 0 : -1}
      aria-disabled={!isActive}
      className={`group w-full h-full rounded-xl p-px bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 flex ${isActive ? 'cursor-pointer' : 'cursor-grab'}`}
      whileTap={isActive ? { scale: 0.98, transition: { duration: 0.1 } } : {}}
    >
      <div className="w-full h-full bg-brand-dark/60 backdrop-blur-xl rounded-[11px] flex flex-col overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[11px] pointer-events-none">
          <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
        </div>
        
        {/* Content area */}
        <div className="relative z-10 flex-1 p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col">
          <div className="flex-grow">
            <h4 className="text-sm sm:text-base lg:text-lg font-bold text-center text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-2 sm:mb-3">{subcategory.name}</h4>
            
            <div className="space-y-1 sm:space-y-2 lg:space-y-4">
              <div className="text-center">
                <InfoIcon className="w-3 h-3 sm:w-4 sm:h-5 text-blue-400 mx-auto mb-1" />
                <h5 className="font-semibold text-brand-light/80 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">O que é?</h5>
                <p className="text-brand-gray text-xs sm:text-sm">{subcategory.whatIsIt}</p>
              </div>
              <div className="text-center">
                <TargetIcon className="w-3 h-3 sm:w-4 sm:h-5 text-purple-400 mx-auto mb-1" />
                <h5 className="font-semibold text-brand-light/80 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">Para que serve?</h5>
                <p className="text-brand-gray text-xs sm:text-sm">{subcategory.whatIsItFor}</p>
              </div>
              <div className="text-center">
                <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-5 text-pink-400 mx-auto mb-1" />
                <h5 className="font-semibold text-brand-light/80 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5 sm:mb-1">Como ajuda?</h5>
                <p className="text-brand-gray text-xs sm:text-sm">{subcategory.howItHelps}</p>
              </div>
            </div>
          </div>
        </div>
 
        {/* Price and Action Area */}
        <div className="relative z-10 flex-shrink-0 p-2 pt-1 sm:p-3 sm:pt-2 border-t border-white/10">
          <div className="text-center mb-1 sm:mb-2">
            <p className="text-sm text-brand-gray">
              {hasPlans ? "Planos a partir de" : "Valor"}
            </p>
            <p className="text-base sm:text-lg lg:text-2xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {subcategory.price ? `R$ ${subcategory.price}` : 'A consultar'}
            </p>
            <p className="text-xs sm:text-sm text-brand-gray mt-1">{subcategory.productionTime}</p>
          </div>

          <div
            className="w-full text-center bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white font-semibold py-1 px-3 rounded-full text-xs sm:text-sm lg:text-base group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/20"
          >
            Saber Mais / Contratar
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubcategoryCard;
