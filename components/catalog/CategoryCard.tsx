
import React from 'react';
import { motion } from 'framer-motion';
import { CatalogCategory } from '../../types';
import { TrendingUpIcon } from '../icons/TrendingUpIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { TargetIcon } from '../icons/TargetIcon';
import { DollarSignIcon } from '../icons/DollarSignIcon';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';

const iconMap = {
  trendingUp: TrendingUpIcon,
  users: UsersIcon,
  target: TargetIcon,
  dollarSign: DollarSignIcon,
};

interface CategoryCardProps {
  category: CatalogCategory;
  onClick: () => void;
  isActive?: boolean;
  [key: string]: any; // Allow other props from framer-motion
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, isActive = true, ...rest }) => {
  const handleClick = () => {
    if (isActive) {
      onClick();
    }
  };

  return (
    <motion.div
      {...rest}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (isActive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={isActive ? 0 : -1}
      aria-disabled={!isActive}
      className={`group w-full h-full rounded-xl p-px bg-gradient-to-br from-blue-500/50 via-purple-500/50 to-pink-500/50 flex ${isActive ? 'cursor-pointer' : 'cursor-grab'}`}
      whileTap={isActive ? { scale: 0.98, transition: { duration: 0.1 } } : {}}
    >
      <div className="relative w-full h-full bg-brand-dark/60 backdrop-blur-xl rounded-[11px] p-2 sm:p-3 md:p-4 lg:p-5 flex flex-col justify-between overflow-hidden">
        {/* Gleam effect */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[11px]">
          <span className="absolute block w-1/2 h-[300%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
        </div>
        
        {/* Top content: Title and Emoji */}
        <div className="relative z-10 text-center">
          <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-1 sm:mb-2">{category.category}</h3>
          <span className="text-xl sm:text-2xl lg:text-3xl" role="img" aria-label={`${category.category} emoji`}>{category.emoji}</span>
        </div>

        {/* Key Indicators List */}
        <div className="relative z-10 space-y-0.5 text-left my-1 sm:my-2">
          {category.keyIndicators.map((indicator, index) => (
            <div key={index} className="flex items-center gap-1.5 text-[11px] sm:text-xs lg:text-sm">
              <CheckCircleIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-green-400 flex-shrink-0" />
              <span className="text-brand-gray flex-1 truncate" title={indicator.label}>{indicator.label}:</span>
              <span className="font-bold text-brand-light/90">{indicator.value}</span>
            </div>
          ))}
        </div>
 
        {/* Metrics Bar Chart */}
        <div className="relative z-10 flex flex-col justify-center">
          <div className="flex justify-around items-end h-16 sm:h-20 md:h-24 lg:h-28 gap-2 sm:gap-3 px-1 sm:px-2">
            {category.metrics.map((metric) => {
              const IconComponent = iconMap[metric.icon];
              const value = parseInt(metric.value.replace('%',''));
              return (
                <div key={metric.label} className="w-1/3 flex flex-col-reverse items-center group/metric h-full">
                  <span className="text-[10px] sm:text-xs lg:text-sm text-brand-gray mt-1 text-center leading-tight">{metric.label}</span>
                  <IconComponent className="w-3 h-3 sm:w-4 lg:w-5 mt-1 sm:mt-2 text-brand-gray group-hover/metric:text-white transition-colors" />
                  <div className="relative w-full flex items-end justify-center flex-grow">
                    <span className="absolute -top-4 text-[11px] sm:text-xs lg:text-sm font-bold text-white">{metric.value}</span>
                    <div 
                      className="w-3 sm:w-4 lg:w-5 bg-white/10 rounded-t-md"
                      style={{ height: `100%` }}
                    >
                      <motion.div 
                        className="bg-gradient-to-t from-blue-500 to-purple-500 h-full rounded-t-md"
                        initial={{ height: '0%' }}
                        whileInView={{ height: `${value}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, amount: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Bottom content: CTA */}
        <div className="relative z-10 text-center mt-1 sm:mt-2">
            <span className="text-xs sm:text-sm lg:text-base font-semibold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:brightness-125 transition-all">
                Ver Serviços &rarr;
            </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
