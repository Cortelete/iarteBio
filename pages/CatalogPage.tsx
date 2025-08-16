

import React, { useState, useCallback, useEffect } from 'react';
import { catalogData } from '../data/catalog';
import { CatalogCategory, CatalogSubcategory } from '../types';
import CategoryCard from '../components/catalog/CategoryCard';
import SubcategoryCard from '../components/catalog/SubcategoryCard';
import ProductModal from '../components/catalog/ProductModal';
import CardCarousel from '../components/catalog/CardCarousel';
import { ListIcon } from '../components/icons/ListIcon';
import { CardViewIcon } from '../components/icons/CardViewIcon';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

interface CatalogPageProps {
  navigateTo: (page: 'home' | 'catalog') => void;
  initialTarget?: { categoryName?: string } | null;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ navigateTo, initialTarget }) => {
  const [selectedCategory, setSelectedCategory] = useState<CatalogCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<CatalogSubcategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [isClickLocked, setIsClickLocked] = useState(false);
  const clickLockTimeoutRef = React.useRef<number | null>(null);

  const handleDragGestureEnd = useCallback(() => {
    if (clickLockTimeoutRef.current) {
      clearTimeout(clickLockTimeoutRef.current);
    }
    setIsClickLocked(true);
    clickLockTimeoutRef.current = window.setTimeout(() => {
      setIsClickLocked(false);
    }, 500); // 0.5-second cooldown
  }, []);
  
  const handleSelectCategory = useCallback((category: CatalogCategory) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (initialTarget?.categoryName) {
      const category = catalogData.find(c => c.category === initialTarget.categoryName);
      if (category) {
        handleSelectCategory(category);
      }
    }
  }, [initialTarget, handleSelectCategory]);


  useEffect(() => {
    // Cleanup timeout on component unmount
    return () => {
      if (clickLockTimeoutRef.current) {
        clearTimeout(clickLockTimeoutRef.current);
      }
    };
  }, []);

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (subcategory: CatalogSubcategory) => {
    setSelectedProduct(subcategory);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const renderBackButton = () => {
    const handleBack = () => {
      if (selectedCategory) {
        handleBackToCategories();
      } else {
        navigateTo('home');
      }
    };

    const backText = selectedCategory ? 'Voltar para Categorias' : 'Voltar para Início';

    return (
      <button 
        onClick={handleBack} 
        className="flex items-center gap-2 text-brand-gray mb-6 hover:text-white transition-colors animate-fade-in-up font-medium"
      >
        <ArrowLeftIcon className="w-5 h-5"/>
        <span>{backText}</span>
      </button>
    );
  };

  const renderViewToggle = () => (
    <div className="flex items-center gap-2 rounded-full p-1.5 bg-brand-dark/50 border border-white/10">
      <button 
        onClick={() => setViewMode('card')} 
        className={`p-1.5 sm:p-2 rounded-full transition-colors duration-300 ${viewMode === 'card' ? 'bg-purple-500/50 text-white' : 'text-brand-gray hover:text-white'}`}
        aria-label="Visualização em Cartão"
      >
        <CardViewIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button 
        onClick={() => setViewMode('list')} 
        className={`p-1.5 sm:p-2 rounded-full transition-colors duration-300 ${viewMode === 'list' ? 'bg-purple-500/50 text-white' : 'text-brand-gray hover:text-white'}`}
        aria-label="Visualização em Lista"
      >
        <ListIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-24 md:py-28 min-h-[80vh] flex flex-col">
      {renderBackButton()}
      
      {!selectedCategory ? (
        // Category View
        <>
          <div className="flex justify-between items-center mb-10 animate-fade-in-up">
            <div className="text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
                Nosso Catálogo
              </h2>
              <p className="text-sm sm:text-base text-brand-gray max-w-2xl">
                Explore nossas soluções e encontre a que melhor se adapta ao seu projeto.
              </p>
            </div>
            {renderViewToggle()}
          </div>
          {viewMode === 'card' ? (
            <div className="flex-grow flex items-center justify-center">
              <CardCarousel
                items={catalogData}
                onDragGestureEnd={handleDragGestureEnd}
                renderCard={(cat, { isActive }) => (
                  <CategoryCard category={cat} onClick={() => handleSelectCategory(cat)} isActive={isActive && !isClickLocked} />
                )}
              />
            </div>
          ) : (
            <div className="w-full max-w-3xl mx-auto space-y-3 animate-fade-in-up">
              {catalogData.map((cat) => (
                <div
                  key={cat.category}
                  onClick={() => handleSelectCategory(cat)}
                  className="flex items-center justify-between p-3 sm:p-4 bg-brand-dark/40 rounded-lg border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all cursor-pointer duration-300 transform hover:scale-[1.02]"
                  role="button"
                >
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white">{cat.category}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                      {cat.keyIndicators.map(indicator => (
                        <span key={indicator.label} className="text-xs text-brand-gray">{indicator.label}: <span className="font-bold text-brand-light/80">{indicator.value}</span></span>
                      ))}
                    </div>
                  </div>
                  <ChevronRightIcon className="w-6 h-6 text-brand-gray" />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        // Subcategory View
        <div className="animate-fade-in-up flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              {selectedCategory.category}
            </h3>
            {renderViewToggle()}
          </div>
          {viewMode === 'card' ? (
            <div className="flex-grow flex items-center justify-center">
              <CardCarousel
                items={selectedCategory.subcategories}
                onDragGestureEnd={handleDragGestureEnd}
                renderCard={(sub, { isActive }) => (
                  <SubcategoryCard subcategory={sub} onOpenModal={() => handleOpenModal(sub)} isActive={isActive && !isClickLocked} />
                )}
              />
            </div>
          ) : (
             <div className="w-full max-w-4xl mx-auto space-y-4 animate-fade-in-up">
              {selectedCategory.subcategories.map((sub) => (
                <div key={sub.name} className="flex items-center justify-between gap-4 p-3 sm:p-4 bg-brand-dark/40 rounded-lg border border-white/10 transition-colors hover:bg-white/5">
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-base sm:text-base">{sub.name}</h4>
                    <p className="text-sm text-brand-gray mt-1">{sub.description}</p>
                  </div>
                  <button onClick={() => handleOpenModal(sub)} className="bg-blue-500/80 hover:bg-blue-500 text-white font-semibold py-1.5 px-4 rounded-full text-sm transition-colors whitespace-nowrap">
                    Ver Detalhes
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <ProductModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default CatalogPage;