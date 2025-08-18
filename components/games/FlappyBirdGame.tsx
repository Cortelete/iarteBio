
import React, { useRef, useEffect, useState, useCallback } from 'react';

const FlappyBirdGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('flappyHighScore')) || 0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const gameState = useRef({
        bird: { x: 50, y: 150, width: 34, height: 24, velocity: 0 },
        pipes: [] as { x: number; y: number; width: number; height: number; passed: boolean; }[],
        frame: 0,
    });

    const gameConstants = {
        gameSpeed: 1.5,
        gravity: 0.18,
        jump: -6,
        pipeWidth: 52,
        pipeGap: 240,
    };

    const startGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        gameState.current = {
            bird: { x: 50, y: canvas.height / 2, width: 34, height: 24, velocity: 0 },
            pipes: [],
            frame: 0,
        };
        setScore(0);
        setIsGameOver(false);
        setGameStarted(true);
    }, []);

    const flap = useCallback(() => {
        if (gameStarted && !isGameOver) {
            gameState.current.bird.velocity = gameConstants.jump;
        }
    }, [gameStarted, isGameOver, gameConstants.jump]);

    useEffect(() => {
        const handleInteraction = (e: Event) => {
            e.preventDefault();
            if (!gameStarted || isGameOver) {
                startGame();
            } else {
                flap();
            }
        };

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.code === 'Space' || e.key === ' ') {
                handleInteraction(e);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        window.addEventListener('mousedown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            window.removeEventListener('mousedown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [gameStarted, isGameOver, startGame, flap]);

    useEffect(() => {
        if (!gameStarted || isGameOver) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        let animationFrameId: number;

        const gameLoop = () => {
            if (!gameStarted || isGameOver) {
                cancelAnimationFrame(animationFrameId);
                return;
            }
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const { bird, pipes } = gameState.current;

            // Bird physics
            bird.velocity += gameConstants.gravity;
            bird.y += bird.velocity;
            
            if (bird.y < 0) { // Don't die at top
                bird.y = 0;
                bird.velocity = 0;
            }

            if (bird.y + bird.height > canvas.height) { // Stop at ground
                bird.y = canvas.height - bird.height;
                bird.velocity = 0;
            }
            
            // Pipe generation and movement
            if (gameState.current.frame % 100 === 0) {
                const pipeY = Math.random() * (canvas.height - gameConstants.pipeGap - 100) + 50;
                pipes.push({ x: canvas.width, y: pipeY, width: gameConstants.pipeWidth, height: canvas.height, passed: false });
            }

            let newScore = score;
            pipes.forEach(pipe => {
                pipe.x -= gameConstants.gameSpeed;

                if (!pipe.passed && pipe.x + pipe.width < bird.x) {
                    newScore++;
                    pipe.passed = true;
                }
                
                const padding = 5; 
                const birdLeft = bird.x + padding;
                const birdRight = bird.x + bird.width - padding;
                const birdTop = bird.y + padding;
                const birdBottom = bird.y + bird.height - padding;
                const pipeLeft = pipe.x;
                const pipeRight = pipe.x + pipe.width;
                const topPipeBottom = pipe.y;
                const bottomPipeTop = pipe.y + gameConstants.pipeGap;
                
                if (birdRight > pipeLeft && birdLeft < pipeRight && (birdTop < topPipeBottom || birdBottom > bottomPipeTop)) {
                    setIsGameOver(true);
                }
            });
            if (newScore > score) {
                setScore(newScore);
            }
            gameState.current.pipes = pipes.filter(pipe => pipe.x + pipe.width > 0);
            gameState.current.frame++;

            // Drawing
            drawPipes(ctx, canvas);
            drawBird(ctx);
            drawScore(ctx, canvas, score);

            animationFrameId = requestAnimationFrame(gameLoop);
        };
        
        const drawBird = (context: CanvasRenderingContext2D) => {
            const { bird } = gameState.current;
            context.save();
            context.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);
            context.rotate(Math.min(Math.max(-Math.PI / 4, bird.velocity / 15), Math.PI / 4));
            
            context.fillStyle = '#ffde59';
            context.shadowColor = '#ffde59';
            context.shadowBlur = 10;
            context.fillRect(-bird.width / 2, -bird.height / 2, bird.width, bird.height);
            
            context.fillStyle = '#f5f5f5';
            context.shadowColor = '#f5f5f5';
            context.shadowBlur = 5;
            context.fillRect(-5, 0, 15, 8);
            
            context.fillStyle = '#1e1e1e';
            context.shadowBlur = 0;
            context.beginPath();
            context.arc(10, -5, 3, 0, Math.PI * 2);
            context.fill();
            context.restore();
        };

        const drawPipes = (context: CanvasRenderingContext2D, canvasElement: HTMLCanvasElement) => {
            context.fillStyle = '#7CFC00';
            context.shadowColor = '#7CFC00';
            context.shadowBlur = 15;
            gameState.current.pipes.forEach(pipe => {
                context.fillRect(pipe.x, 0, pipe.width, pipe.y);
                context.fillRect(pipe.x, pipe.y + gameConstants.pipeGap, pipe.width, canvasElement.height - pipe.y - gameConstants.pipeGap);
                context.fillRect(pipe.x - 5, pipe.y - 20, pipe.width + 10, 20);
                context.fillRect(pipe.x - 5, pipe.y + gameConstants.pipeGap, pipe.width + 10, 20);
            });
            context.shadowBlur = 0;
        };

        const drawScore = (context: CanvasRenderingContext2D, canvasElement: HTMLCanvasElement, currentScore: number) => {
             context.fillStyle = 'white';
             context.font = '36px "Poppins", sans-serif';
             context.textAlign = 'center';
             context.fillText(`${currentScore}`, canvasElement.width / 2, 50);
        }

        animationFrameId = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [gameStarted, isGameOver, score]);

    useEffect(() => {
        if (isGameOver) {
            if (score > highScore) {
                localStorage.setItem('flappyHighScore', String(score));
                setHighScore(score);
            }
        }
    }, [isGameOver, score, highScore]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width="600"
                    height="500"
                    className="bg-brand-dark/50 rounded-lg border-2 border-white/10 max-w-full h-auto"
                />
                {isGameOver && (
                    <div 
                        className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg text-center"
                    >
                        <h2 className="text-4xl font-bold text-red-500 mb-4 animate-fade-in-up">Fim de Jogo</h2>
                        <p className="text-lg mb-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>Pontuação: {score}</p>
                        <p className="text-lg mb-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>Recorde: {highScore}</p>
                        <button 
                            onClick={startGame} 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform animate-subtle-pulse animate-fade-in-up"
                            style={{ animationDelay: '300ms' }}
                        >
                           Iniciar Novamente
                        </button>
                    </div>
                )}
                {!gameStarted && !isGameOver && (
                     <div 
                        className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg text-center cursor-pointer"
                        onClick={startGame}
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">Pássaro Saltitante</h2>
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform animate-subtle-pulse">
                            Iniciar Jogo
                        </div>
                    </div>
                )}
            </div>
            <p className="text-brand-gray text-sm">Use <strong className="text-white">ESPAÇO</strong>, <strong className="text-white">clique</strong> ou <strong className="text-white">toque</strong> para jogar.</p>
        </div>
    );
};

export default FlappyBirdGame;
