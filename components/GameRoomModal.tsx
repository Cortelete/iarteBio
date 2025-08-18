import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { CloseIcon } from './icons/CloseIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import TicTacToeGame from './games/TicTacToeGame';
import SnakeGame from './games/SnakeGame';
import FlappyBirdGame from './games/FlappyBirdGame';
import MemoryGame from './games/MemoryGame';
import SpaceInvadersGame from './games/SpaceInvadersGame';
import PongGame from './games/PongGame';
import DoomLikeGame from './games/DoomLikeGame';
import EinsteinRiddleGame from './games/EinsteinRiddleGame';
import BubbleShooterGame from './games/BubbleShooterGame';
import BeachDefenderGame from './games/BeachDefenderGame';
import { GamepadIcon } from './icons/GamepadIcon';
import { SnakeIcon } from './icons/SnakeIcon';
import { CardsIcon } from './icons/CardsIcon';
import { BirdIcon } from './icons/BirdIcon';
import { AlienIcon } from './icons/AlienIcon';
import { PongIcon } from './icons/PongIcon';
import { HelmIcon } from './icons/HelmIcon';
import { BrainIcon } from './icons/BrainIcon';
import { PenToolIcon } from './icons/PenToolIcon';
import { BubbleIcon } from './icons/BubbleIcon';
import { CrosshairIcon } from './icons/CrosshairIcon';


interface GameRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const games = [
  { id: 'tictactoe', name: 'Jogo da Velha', component: TicTacToeGame, icon: (props: any) => <div {...props}>#</div>, color: 'from-cyan-400 to-blue-500', glow: 'shadow-cyan-500/50' },
  { id: 'defender', name: 'Defensor da Praia', component: BeachDefenderGame, icon: CrosshairIcon, color: 'from-yellow-500 to-amber-600', glow: 'shadow-amber-500/50' },
  { id: 'snake', name: 'Jogo da Cobrinha', component: SnakeGame, icon: SnakeIcon, color: 'from-green-400 to-emerald-500', glow: 'shadow-green-500/50' },
  { id: 'bubble', name: 'Canhão de Bolhas', component: BubbleShooterGame, icon: BubbleIcon, color: 'from-sky-400 to-indigo-500', glow: 'shadow-sky-500/50' },
  { id: 'flappy', name: 'Pássaro Saltitante', component: FlappyBirdGame, icon: BirdIcon, color: 'from-yellow-400 to-orange-500', glow: 'shadow-yellow-500/50' },
  { id: 'memory', name: 'Jogo da Memória', component: MemoryGame, icon: CardsIcon, color: 'from-purple-400 to-pink-500', glow: 'shadow-purple-500/50' },
  { id: 'invaders', name: 'Invasores do Espaço', component: SpaceInvadersGame, icon: AlienIcon, color: 'from-red-500 to-orange-500', glow: 'shadow-red-500/50' },
  { id: 'pong', name: 'Pong Clássico', component: PongGame, icon: PongIcon, color: 'from-gray-400 to-white', glow: 'shadow-white/50' },
  { id: 'doom', name: 'Pixel Slayer', component: DoomLikeGame, icon: HelmIcon, color: 'from-amber-700 to-red-600', glow: 'shadow-red-600/50' },
  { id: 'einstein', name: 'Teste de Einstein', component: EinsteinRiddleGame, icon: BrainIcon, color: 'from-gray-300 to-blue-300', glow: 'shadow-blue-300/50' },
];

const externalGames = [
  { id: 'iapalavra', name: 'IA.Palavra', link: 'https://iapalavra.vercel.app/', icon: PenToolIcon, color: 'from-blue-300 to-sky-400', glow: 'shadow-sky-500/50' },
];


const GameRoomModal: React.FC<GameRoomModalProps> = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'auto';
      setActiveGame(null); // Reset active game when modal closes
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500);
  };

  const selectedGame = games.find(g => g.id === activeGame);

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { opacity: 0, scale: 0.9, y: -50, transition: { duration: 0.3 } },
  };
  
  const animatedGridBg = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(167 139 250 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`;

  if (!isOpen && !isClosing) return null;

  return (
    <AnimatePresence>
      {(isOpen || isClosing) && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="relative w-full h-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] lg:max-h-[95vh] bg-brand-dark/80 rounded-2xl border border-white/10 shadow-2xl shadow-purple-500/10 text-white flex flex-col overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex-shrink-0 p-4 border-b border-white/10 flex justify-between items-center z-10">
              <div className="flex items-center gap-4">
                {activeGame && (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setActiveGame(null)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <ArrowLeftIcon className="w-5 h-5"/>
                  </motion.button>
                )}
                 <h2 className="text-xl sm:text-2xl font-bold text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 flex items-center gap-3">
                  <GamepadIcon className="w-7 h-7" />
                  <span>{selectedGame ? selectedGame.name : 'Sala de Jogos'}</span>
                 </h2>
              </div>
              <button onClick={handleClose} className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors duration-300 z-10" aria-label="Fechar modal">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 relative scrollbar-custom">
              <AnimatePresence mode="wait">
                {!activeGame ? (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 z-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,white_10%,transparent_70%)]" style={{ backgroundImage: animatedGridBg }}></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                      {games.map((game, index) => {
                        const Icon = game.icon;
                        return (
                          <motion.button
                              key={game.id}
                              onClick={() => setActiveGame(game.id)}
                              className={`group relative rounded-lg p-px overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl ${game.glow}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                          >
                              {/* Shooting Star on hover */}
                              <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[7px]">
                                  <span className="absolute block w-1/2 h-[400%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
                              </span>

                              {/* Rising stars */}
                              <div className="absolute inset-0 z-0 overflow-hidden rounded-[7px]">
                                  <div className="absolute bottom-0 left-[20%] w-0.5 h-0.5 bg-white rounded-full animate-star-rise" style={{ animationDuration: '8s', animationDelay: '-2s' }}></div>
                                  <div className="absolute bottom-0 left-[80%] w-1 h-1 bg-white rounded-full animate-star-rise" style={{ animationDuration: '12s', animationDelay: '-5s' }}></div>
                                  <div className="absolute bottom-0 left-[40%] w-0.5 h-0.5 bg-white rounded-full animate-star-rise" style={{ animationDuration: '10s', animationDelay: '-1s' }}></div>
                                  <div className="absolute bottom-0 left-[90%] w-1 h-1 bg-white rounded-full animate-star-rise" style={{ animationDuration: '7s', animationDelay: '-4s' }}></div>
                                  <div className="absolute bottom-0 left-[10%] w-0.5 h-0.5 bg-white rounded-full animate-star-rise" style={{ animationDuration: '15s', animationDelay: '-8s' }}></div>
                                  <div className="absolute bottom-0 left-[60%] w-1 h-1 bg-white rounded-full animate-star-rise" style={{ animationDuration: '9s', animationDelay: '0s' }}></div>
                              </div>
                              
                              <div className={`absolute inset-0 z-0 opacity-20 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-br ${game.color} bg-[length:200%_200%] group-hover:animate-gradient-pan`}></div>
                              <div className={`relative h-full w-full bg-brand-dark/60 rounded-[7px] p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-4 text-center`}>
                                  <div className={`text-5xl text-gradient bg-gradient-to-br ${game.color}`}>
                                      <Icon className="w-12 h-12 sm:w-16 sm:h-16 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                                  </div>
                                  <h3 className={`text-lg sm:text-xl font-bold text-gradient bg-gradient-to-br ${game.color} bg-[length:200%_auto] animate-text-gradient-pan`}>{game.name}</h3>
                              </div>
                          </motion.button>
                        );
                      })}
                    </div>
                    
                    <div className="mt-10 pt-6 border-t border-white/10">
                       <h3 className="text-xl font-bold text-center text-gradient bg-gradient-to-r from-purple-400 to-pink-400 mb-6">Ferramentas & Jogos Externos</h3>
                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                         {externalGames.map((game, index) => {
                           const Icon = game.icon;
                           return (
                            <motion.a
                                key={game.id}
                                href={game.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative rounded-lg p-px overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl ${game.glow}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: (index + games.length) * 0.05 } }}
                            >
                              <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-[7px]">
                                  <span className="absolute block w-1/2 h-[400%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%]"></span>
                              </span>
                              <div className="absolute inset-0 z-0 overflow-hidden rounded-[7px]">
                                  <div className="absolute bottom-0 left-[30%] w-0.5 h-0.5 bg-white rounded-full animate-star-rise" style={{ animationDuration: '11s', animationDelay: '-3s' }}></div>
                                  <div className="absolute bottom-0 left-[70%] w-1 h-1 bg-white rounded-full animate-star-rise" style={{ animationDuration: '9s', animationDelay: '-6s' }}></div>
                              </div>
                              <div className={`absolute inset-0 z-0 opacity-20 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-br ${game.color} bg-[length:200%_200%] group-hover:animate-gradient-pan`}></div>
                              <div className={`relative h-full w-full bg-brand-dark/60 rounded-[7px] p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-4 text-center`}>
                                  <div className={`text-5xl text-gradient bg-gradient-to-br ${game.color}`}>
                                      <Icon className="w-12 h-12 sm:w-16 sm:h-16 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                                  </div>
                                  <h3 className={`text-lg sm:text-xl font-bold text-gradient bg-gradient-to-br ${game.color} bg-[length:200%_auto] animate-text-gradient-pan`}>{game.name}</h3>
                              </div>
                            </motion.a>
                           );
                         })}
                       </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeGame}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col items-center justify-center"
                  >
                    {selectedGame && React.createElement(selectedGame.component)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameRoomModal;