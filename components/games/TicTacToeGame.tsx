

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Player = 'X' | 'O' | null;

const calculateWinner = (squares: Player[]): Player => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const findBestMove = (currentBoard: Player[]): number => {
    // 1. Check for AI winning move
    for (let i = 0; i < 9; i++) {
        if (!currentBoard[i]) {
            const boardCopy = [...currentBoard];
            boardCopy[i] = 'O';
            if (calculateWinner(boardCopy) === 'O') {
                return i;
            }
        }
    }

    // 2. Check for player winning move and block
    for (let i = 0; i < 9; i++) {
        if (!currentBoard[i]) {
            const boardCopy = [...currentBoard];
            boardCopy[i] = 'X';
            if (calculateWinner(boardCopy) === 'X') {
                return i;
            }
        }
    }

    // 3. Take center
    if (!currentBoard[4]) return 4;

    // 4. Take a random corner
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => !currentBoard[i]);
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // 5. Take a random side
    const sides = [1, 3, 5, 7];
    const availableSides = sides.filter(i => !currentBoard[i]);
    if (availableSides.length > 0) {
        return availableSides[Math.floor(Math.random() * availableSides.length)];
    }

    const availableMoves = currentBoard.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    return availableMoves[0] as number;
};

const Square: React.FC<{ value: Player; onClick: () => void }> = ({ value, onClick }) => (
  <button
    className="w-20 h-20 sm:w-24 sm:h-24 bg-brand-dark/50 border border-white/10 rounded-lg flex items-center justify-center text-5xl sm:text-6xl font-bold transition-colors hover:bg-white/5"
    onClick={onClick}
    aria-label={`Posição do tabuleiro com valor ${value || 'vazio'}`}
  >
    {value === 'X' && <span className="text-cyan-400" style={{ textShadow: '0 0 10px #06b6d4' }}>X</span>}
    {value === 'O' && <span className="text-pink-400" style={{ textShadow: '0 0 10px #f472b6' }}>O</span>}
  </button>
);

const TicTacToeGame: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  const makeMove = (i: number, player: 'X' | 'O') => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = player;
    setBoard(newBoard);
    setIsXNext(player === 'O');
  };
  
  const handlePlayerClick = (i: number) => {
    if (isXNext && !board[i]) {
      makeMove(i, 'X');
    }
  };

  useEffect(() => {
    if (!isXNext && !winner && !isDraw) {
        const aiMove = findBestMove(board);
        const timeoutId = setTimeout(() => {
            makeMove(aiMove, 'O');
        }, 600);
        return () => clearTimeout(timeoutId);
    }
  }, [isXNext, board, winner, isDraw]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };
  
  let status;
  if (winner) {
    status = winner === 'X' ? 'Você Venceu!' : 'A Máquina Venceu!';
  } else if (isDraw) {
    status = "Empate!";
  } else {
    status = isXNext ? 'Sua vez (X)' : 'Vez da Máquina (O)...';
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="mb-6 text-center h-8">
        <h3 className={`text-2xl font-bold transition-colors ${winner ? (winner === 'X' ? 'text-cyan-400' : 'text-pink-400') : 'text-white'}`}>
          {status}
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {board.map((_, i) => (
          <Square key={i} value={board[i]} onClick={() => handlePlayerClick(i)} />
        ))}
      </div>
      {(winner || isDraw) && (
        <motion.button
          onClick={resetGame}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Jogar Novamente
        </motion.button>
      )}
    </div>
  );
};

export default TicTacToeGame;