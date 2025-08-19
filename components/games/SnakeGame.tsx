import React, { useState, useEffect, useRef, useCallback } from 'react';

// The game board will be 30x30 cells
const BOARD_DIMENSION = 30;

type SnakeSegment = { x: number; y: number };

const SnakeGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameContainerRef = useRef<HTMLDivElement>(null);

    // Dynamic state for canvas and grid size
    const [canvasSize, setCanvasSize] = useState(300);
    const [gridSize, setGridSize] = useState(10);

    const getRandomCoord = useCallback(() => ({
        x: Math.floor(Math.random() * BOARD_DIMENSION),
        y: Math.floor(Math.random() * BOARD_DIMENSION)
    }), []);

    const [snake, setSnake] = useState<SnakeSegment[]>([{ x: 15, y: 15 }]);
    const [food, setFood] = useState<SnakeSegment>(getRandomCoord());
    const [direction, setDirection] = useState<{ x: number; y: number }>({ x: 0, y: -1 });
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('snakeHighScore')) || 0);
    const [speed, setSpeed] = useState(200);
    const touchStartRef = useRef<{ x: number; y: number } | null>(null);
    const touchEndRef = useRef<{ x: number; y: number } | null>(null);

    const resetGame = useCallback(() => {
        setSnake([{ x: 15, y: 15 }]);
        setFood(getRandomCoord());
        setDirection({ x: 0, y: -1 });
        setIsGameOver(false);
        setScore(0);
        setSpeed(200);
    }, [getRandomCoord]);

    // Effect to handle responsive canvas size
    useEffect(() => {
        const updateCanvasSize = () => {
            if (gameContainerRef.current) {
                const containerWidth = gameContainerRef.current.offsetWidth;
                // Use container width, up to a max of 600px. Ensure it's not 0.
                const size = Math.max(containerWidth, 240);
                const newGridSize = Math.floor(size / BOARD_DIMENSION);
                const newCanvasSize = newGridSize * BOARD_DIMENSION;
                
                setCanvasSize(newCanvasSize);
                setGridSize(newGridSize);
            }
        };
        
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    // Effect for controls
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
                case 'Enter':
                    if(isGameOver) resetGame();
                    break;
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            if (isGameOver) {
                resetGame();
                return;
            }
            touchEndRef.current = null;
            if (e.targetTouches.length > 0) {
              touchStartRef.current = { x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY };
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
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
            const swipeThreshold = 20;

            if (Math.abs(dx) > swipeThreshold || Math.abs(dy) > swipeThreshold) {
              if (Math.abs(dx) > Math.abs(dy)) {
                  if (dx > 0 && direction.x === 0) setDirection({ x: 1, y: 0 });
                  else if (dx < 0 && direction.x === 0) setDirection({ x: -1, y: 0 });
              } else {
                  if (dy > 0 && direction.y === 0) setDirection({ x: 0, y: 1 });
                  else if (dy < 0 && direction.y === 0) setDirection({ x: 0, y: -1 });
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

    // Effect for game logic
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

                if (head.x < 0 || head.x >= BOARD_DIMENSION || head.y < 0 || head.y >= BOARD_DIMENSION) {
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
    }, [snake, direction, food, isGameOver, score, highScore, speed, getRandomCoord]);
    
    // Effect for drawing
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas || gridSize === 0) return;

        ctx.clearRect(0, 0, canvasSize, canvasSize);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        for (let i = 0; i <= BOARD_DIMENSION; i++) {
            ctx.beginPath();
            ctx.moveTo(i * gridSize, 0);
            ctx.lineTo(i * gridSize, canvasSize);
            ctx.stroke();
        }
        for (let i = 0; i <= BOARD_DIMENSION; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * gridSize);
            ctx.lineTo(canvasSize, i * gridSize);
            ctx.stroke();
        }

        snake.forEach((segment, index) => {
            const isHead = index === 0;
            ctx.fillStyle = isHead ? '#7FFF00' : '#32CD32';
            if (isHead) {
                ctx.shadowColor = '#7FFF00';
                ctx.shadowBlur = 10;
            }
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
            if (isHead) ctx.shadowBlur = 0;
        });

        ctx.fillStyle = '#FF4500';
        ctx.shadowColor = '#FF4500';
        ctx.shadowBlur = 15;
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
        ctx.shadowBlur = 0;

    }, [snake, food, canvasSize, gridSize, isGameOver]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
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
            <div ref={gameContainerRef} className="relative w-full max-w-lg mx-auto">
                <canvas
                    ref={canvasRef}
                    width={canvasSize}
                    height={canvasSize}
                    className="bg-brand-dark/50 rounded-lg border-2 border-white/10 w-full h-auto"
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
            <p className="text-brand-gray text-sm text-center">Use as <strong className="text-white">setas</strong> ou <strong className="text-white">deslize o dedo</strong> para mover.</p>
        </div>
    );
};

export default SnakeGame;