

import React, { useState, useEffect, useRef, useCallback } from 'react';

const GRID_SIZE = 20;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const BOARD_WIDTH = CANVAS_WIDTH / GRID_SIZE;
const BOARD_HEIGHT = CANVAS_HEIGHT / GRID_SIZE;

const getRandomCoord = () => ({
    x: Math.floor(Math.random() * BOARD_WIDTH),
    y: Math.floor(Math.random() * BOARD_HEIGHT)
});

type SnakeSegment = { x: number; y: number };

const SnakeGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [snake, setSnake] = useState<SnakeSegment[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<SnakeSegment>(getRandomCoord());
    const [direction, setDirection] = useState<{ x: number; y: number }>({ x: 0, y: -1 });
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('snakeHighScore')) || 0);
    const [speed, setSpeed] = useState(200);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const touchEndRef = useRef<{ x: number; y: number } | null>(null);

    const resetGame = useCallback(() => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(getRandomCoord());
        setDirection({ x: 0, y: -1 });
        setIsGameOver(false);
        setScore(0);
        setSpeed(200);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();
            switch (e.key) {
                case 'ArrowUp':
                    if (direction.y === 0) setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (direction.y === 0) setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if (direction.x === 0) setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if (direction.x === 0) setDirection({ x: 1, y: 0 });
                    break;
                case ' ':
                    if(isGameOver) resetGame();
                    break;
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            // Prevent page scroll
            e.preventDefault();
            touchEndRef.current = null;
            if (e.targetTouches.length > 0) {
              touchStartRef.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            // Prevent page scroll
            e.preventDefault();
            if (e.targetTouches.length > 0) {
              touchEndRef.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            if (isGameOver || !touchStartRef.current || !touchEndRef.current) return;

            const dx = touchEndRef.current.x - touchStartRef.current.x;
            const dy = touchEndRef.current.y - touchStartRef.current.y;
            const swipeThreshold = 20; // Minimum distance for a swipe

            if (Math.abs(dx) > swipeThreshold || Math.abs(dy) > swipeThreshold) {
              if (Math.abs(dx) > Math.abs(dy)) { // Horizontal swipe
                  if (dx > 0 && direction.x === 0) setDirection({ x: 1, y: 0 }); // Right
                  else if (dx < 0 && direction.x === 0) setDirection({ x: -1, y: 0 }); // Left
              } else { // Vertical swipe
                  if (dy > 0 && direction.y === 0) setDirection({ x: 0, y: 1 }); // Down
                  else if (dy < 0 && direction.y === 0) setDirection({ x: 0, y: -1 }); // Up
              }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
          canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
          canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (canvas) {
              canvas.removeEventListener('touchstart', handleTouchStart);
              canvas.removeEventListener('touchmove', handleTouchMove);
              canvas.removeEventListener('touchend', handleTouchEnd);
            }
        };
    }, [direction, isGameOver, resetGame]);

    useEffect(() => {
        if (isGameOver) {
            if(score > highScore) {
                localStorage.setItem('snakeHighScore', String(score));
                setHighScore(score);
            }
            return;
        };

        const gameInterval = setInterval(() => {
            setSnake(prevSnake => {
                const newSnake = [...prevSnake];
                const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

                if (head.x < 0 || head.x >= BOARD_WIDTH || head.y < 0 || head.y >= BOARD_HEIGHT) {
                    setIsGameOver(true);
                    return prevSnake;
                }
                for (let i = 1; i < newSnake.length; i++) {
                    if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                        setIsGameOver(true);
                        return prevSnake;
                    }
                }

                newSnake.unshift(head);
                if (head.x === food.x && head.y === food.y) {
                    setScore(s => s + 10);
                    setSpeed(s => Math.max(50, s - 3));
                    let newFoodPosition;
                    do {
                        newFoodPosition = getRandomCoord();
                    } while (newSnake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
                    setFood(newFoodPosition);
                } else {
                    newSnake.pop();
                }
                return newSnake;
            });
        }, speed);

        return () => clearInterval(gameInterval);
    }, [snake, direction, food, isGameOver, score, highScore, speed]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        for (let i = 0; i <= BOARD_WIDTH; i++) {
            ctx.beginPath();
            ctx.moveTo(i * GRID_SIZE, 0);
            ctx.lineTo(i * GRID_SIZE, CANVAS_HEIGHT);
            ctx.stroke();
        }
        for (let i = 0; i <= BOARD_HEIGHT; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * GRID_SIZE);
            ctx.lineTo(CANVAS_WIDTH, i * GRID_SIZE);
            ctx.stroke();
        }

        snake.forEach((segment, index) => {
            const isHead = index === 0;
            ctx.fillStyle = isHead ? '#7FFF00' : '#32CD32';
            if (isHead) {
                ctx.shadowColor = '#7FFF00';
                ctx.shadowBlur = 10;
            }
            ctx.fillRect(segment.x * GRID_SIZE, segment.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
            if (isHead) ctx.shadowBlur = 0;
        });

        ctx.fillStyle = '#FF4500';
        ctx.shadowColor = '#FF4500';
        ctx.shadowBlur = 15;
        ctx.fillRect(food.x * GRID_SIZE, food.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
        ctx.shadowBlur = 0;

    }, [snake, food]);

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className="flex justify-between items-center w-full max-w-lg mb-2 p-2 bg-white/5 rounded-lg border border-white/10 text-center">
                 <div>
                    <span className="text-brand-gray text-sm">PONTUAÇÃO</span>
                    <p className="text-xl font-bold">{score}</p>
                 </div>
                 <div>
                    <span className="text-brand-gray text-sm">RECORDE</span>
                    <p className="text-xl font-bold">{highScore}</p>
                 </div>
            </div>
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="bg-brand-dark/50 rounded-lg border-2 border-white/10"
                />
                {isGameOver && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg text-center cursor-pointer" onClick={resetGame}>
                        <h2 className="text-4xl font-bold text-red-500 mb-4">Fim de Jogo</h2>
                        <p className="text-lg mb-6">Sua pontuação: {score}</p>
                        <button onClick={(e) => { e.stopPropagation(); resetGame(); }} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform animate-subtle-pulse">
                           Jogar Novamente
                        </button>
                         <p className="text-brand-gray text-xs mt-4">Ou toque na tela / pressione ESPAÇO</p>
                    </div>
                )}
            </div>
            <p className="text-brand-gray text-sm">Use as <strong className="text-white">setas</strong> ou <strong className="text-white">deslize o dedo</strong> para mover.</p>
        </div>
    );
};

export default SnakeGame;
