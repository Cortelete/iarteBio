
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeIcon } from '../icons/CodeIcon';
import { DesignIcon } from '../icons/DesignIcon';
import { MarketingIcon } from '../icons/MarketingIcon';
import { BotIcon } from '../icons/BotIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { TargetIcon } from '../icons/TargetIcon';

const icons = [
    { name: 'dev', component: CodeIcon, color: 'text-blue-400' },
    { name: 'design', component: DesignIcon, color: 'text-purple-400' },
    { name: 'mkt', component: MarketingIcon, color: 'text-pink-400' },
    { name: 'ia', component: BotIcon, color: 'text-green-400' },
    { name: 'users', component: UsersIcon, color: 'text-cyan-400' },
    { name: 'target', component: TargetIcon, color: 'text-yellow-400' },
];

interface Card {
  id: number;
  type: string;
  icon: React.ElementType;
  color: string;
}

const generateDeck = () => {
  const deck = icons.flatMap((icon, index) => [
    { id: index * 2, type: icon.name, icon: icon.component, color: icon.color },
    { id: index * 2 + 1, type: icon.name, icon: icon.component, color: icon.color }
  ]);
  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  
  useEffect(() => {
    if (flipped.length === 2) {
      const [firstCardIndex, secondCardIndex] = flipped;
      const firstCard = cards[firstCardIndex];
      const secondCard = cards[secondCardIndex];

      if (firstCard.type === secondCard.type) {
        setMatched(prev => [...prev, firstCard.type]);
      }

      setTimeout(() => setFlipped([]), 1000);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === icons.length) {
      setIsWon(true);
    }
  }, [matched]);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].type)) {
      return;
    }
    setFlipped(prev => [...prev, index]);
    if(flipped.length === 0) { // First card of a pair
      setMoves(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setCards(generateDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setIsWon(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="flex justify-between items-center w-full max-w-md mb-6 p-3 bg-white/5 rounded-lg border border-white/10">
        <div className="text-center">
            <span className="text-brand-gray text-sm">Movimentos</span>
            <p className="text-2xl font-bold">{moves}</p>
        </div>
        <div className="text-center">
             <span className="text-brand-gray text-sm">Pares Encontrados</span>
             <p className="text-2xl font-bold">{matched.length} / {icons.length}</p>
        </div>
        <button onClick={resetGame} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-full text-sm hover:scale-105 transition-transform">
          Reiniciar
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md w-full relative">
        <AnimatePresence>
          {isWon && (
            <motion.div 
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2 className="text-4xl font-bold text-gradient bg-gradient-to-r from-green-400 to-cyan-400 mb-4">Parabéns!</h2>
              <p className="text-lg text-brand-light">Você venceu em {moves} movimentos.</p>
              <button onClick={resetGame} className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform">
                Jogar Novamente
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(card.type);
          const CardIcon = card.icon;
          return (
            <div key={index} className="w-full aspect-square [perspective:1000px]" onClick={() => handleCardClick(index)}>
              <motion.div
                className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
              >
                {/* Card Back */}
                <div className="absolute w-full h-full [backface-visibility:hidden] bg-gradient-to-br from-blue-500/80 to-purple-500/80 rounded-lg flex items-center justify-center cursor-pointer">
                    <span className="text-3xl font-bold text-gradient bg-gradient-to-r from-white to-gray-300">IA</span>
                </div>
                {/* Card Front */}
                <div className={`absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-brand-dark/70 border-2 ${matched.includes(card.type) ? 'border-green-400/50' : 'border-white/10'} rounded-lg flex items-center justify-center`}>
                    <CardIcon className={`w-1/2 h-1/2 ${card.color}`} />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MemoryGame;
