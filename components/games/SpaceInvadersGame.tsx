
import React, { useRef, useEffect, useState, useCallback } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; color: string; life: number };

const SpaceInvadersGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('invadersHighScore')) || 0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameMessage, setGameMessage] = useState('Clique ou Toque para Iniciar');
    const isDragging = useRef(false);

    const gameState = useRef({
        player: { x: 300, y: 550, width: 40, height: 20 },
        bullets: [] as { x: number; y: number; width: number; height: number }[],
        aliens: [] as { x: number; y: number; width: number; height: number }[],
        alienBullets: [] as { x: number; y: number; width: number; height: number }[],
        particles: [] as Particle[],
        alienDirection: 1,
        alienSpeed: 0.2,
        keys: {} as Record<string, boolean>,
        lastShotTime: 0,
    });

    const createExplosion = (x: number, y: number, color: string) => {
        for (let i = 0; i < 20; i++) {
            gameState.current.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                radius: Math.random() * 2 + 1,
                color,
                life: 40,
            });
        }
    };

    const createAliens = () => {
        const newAliens = [];
        const rows = 5; const cols = 10;
        const alienWidth = 30; const alienHeight = 20; const alienPadding = 15;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                newAliens.push({ x: c * (alienWidth + alienPadding) + 60, y: r * (alienHeight + alienPadding) + 50, width: alienWidth, height: alienHeight });
            }
        }
        gameState.current.aliens = newAliens;
    };

    const resetGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        gameState.current.player.x = canvas.width / 2 - gameState.current.player.width / 2;
        gameState.current.player.y = canvas.height - 50;
        gameState.current.bullets = [];
        gameState.current.alienBullets = [];
        gameState.current.particles = [];
        gameState.current.alienDirection = 1;
        gameState.current.alienSpeed = 0.2;
        createAliens();
        setScore(0);
        setIsGameOver(false);
        setGameStarted(true);
        setGameMessage('');
    }, []);
    
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { gameState.current.keys[e.key] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { gameState.current.keys[e.key] = false; };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const canvas = canvasRef.current;
        if(!canvas) return;

        const updatePlayerPositionFromClientX = (clientX: number) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            let newX = (clientX - rect.left) * scaleX;
            gameState.current.player.x = newX - gameState.current.player.width / 2;
        };

        const handleMouseDown = (e: MouseEvent) => {
            if (gameStarted && !isGameOver) {
                isDragging.current = true;
                updatePlayerPositionFromClientX(e.clientX);
            }
        };
        const handleMouseUp = () => {
            isDragging.current = false;
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging.current && gameStarted && !isGameOver) {
                updatePlayerPositionFromClientX(e.clientX);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            if (!gameStarted || isGameOver) {
                resetGame();
            } else if (e.touches.length > 0) {
                 updatePlayerPositionFromClientX(e.touches[0].clientX);
            }
        };
        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            if (e.touches.length > 0) {
                updatePlayerPositionFromClientX(e.touches[0].clientX);
            }
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
        };
    }, [gameStarted, isGameOver, resetGame]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        gameState.current.player.y = canvas.height - 50;
        let animationFrameId: number;
        
        const gameLoop = () => {
            animationFrameId = requestAnimationFrame(gameLoop);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            gameState.current.particles.forEach((p, index) => {
                p.x += p.vx; p.y += p.vy; p.life--;
                if (p.life <= 0) gameState.current.particles.splice(index, 1);
                else {
                    ctx.globalAlpha = p.life / 40; ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 5;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
                    ctx.globalAlpha = 1.0; ctx.shadowBlur = 0;
                }
            });

            if (!gameStarted || isGameOver) return;
            
            const now = Date.now();
            if (now - gameState.current.lastShotTime > 700) {
                const { player } = gameState.current;
                gameState.current.bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, width: 4, height: 10 });
                gameState.current.lastShotTime = now;
            }

            const { player, keys } = gameState.current;
            if (keys['ArrowLeft'] && player.x > 0) player.x -= 5;
            if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += 5;

            player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

            ctx.fillStyle = '#00FFFF'; ctx.shadowColor = '#00FFFF'; ctx.shadowBlur = 10;
            ctx.fillRect(player.x, player.y, player.width, player.height); ctx.shadowBlur = 0;

            gameState.current.bullets.forEach((bullet, index) => {
                bullet.y -= 7;
                ctx.fillStyle = '#FFFFFF'; ctx.shadowColor = '#FFFFFF'; ctx.shadowBlur = 8;
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height); ctx.shadowBlur = 0;
                if (bullet.y < 0) gameState.current.bullets.splice(index, 1);
            });

            gameState.current.alienBullets.forEach((bullet, index) => {
                bullet.y += 5;
                ctx.fillStyle = '#FF4500'; ctx.shadowColor = '#FF4500'; ctx.shadowBlur = 8;
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height); ctx.shadowBlur = 0;
                if (bullet.y > canvas.height) gameState.current.alienBullets.splice(index, 1);
            });

            let edgeReached = false;
            gameState.current.aliens.forEach(alien => {
                alien.x += gameState.current.alienDirection * gameState.current.alienSpeed;
                if (alien.x <= 0 || alien.x >= canvas.width - alien.width) edgeReached = true;
                ctx.fillStyle = '#7FFF00'; ctx.shadowColor = '#7FFF00'; ctx.shadowBlur = 10;
                ctx.fillRect(alien.x, alien.y, alien.width, alien.height); ctx.shadowBlur = 0;
                if (Math.random() < 0.0008) {
                    gameState.current.alienBullets.push({ x: alien.x + alien.width / 2 - 2, y: alien.y + alien.height, width: 4, height: 10 });
                }
            });
            if (edgeReached) {
                gameState.current.alienDirection *= -1;
                gameState.current.aliens.forEach(alien => alien.y += 10);
            }

            gameState.current.bullets.forEach((bullet, bIndex) => {
                gameState.current.aliens.forEach((alien, aIndex) => {
                    if (bullet.x < alien.x + alien.width && bullet.x + bullet.width > alien.x && bullet.y < alien.y + alien.height && bullet.y + bullet.height > alien.y) {
                        createExplosion(alien.x + alien.width / 2, alien.y + alien.height / 2, '#7FFF00');
                        gameState.current.bullets.splice(bIndex, 1);
                        gameState.current.aliens.splice(aIndex, 1);
                        setScore(s => s + 100);
                        gameState.current.alienSpeed += 0.01;
                    }
                });
            });

            gameState.current.alienBullets.forEach((bullet, index) => {
                 if (bullet.x < player.x + player.width && bullet.x + bullet.width > player.x && bullet.y < player.y + player.height && bullet.y + bullet.height > player.y) {
                    createExplosion(player.x + player.width / 2, player.y + player.height / 2, '#00FFFF');
                    gameState.current.alienBullets.splice(index, 1); setIsGameOver(true); setGameMessage('Fim de Jogo!');
                 }
            });

            gameState.current.aliens.forEach(alien => {
                if (alien.y + alien.height >= player.y) { setIsGameOver(true); setGameMessage('Invasão Completa!'); }
            });

            if (gameState.current.aliens.length === 0) { setIsGameOver(true); setGameMessage('Você Venceu!'); }
        };
        gameLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isGameOver, gameStarted, resetGame]);

    useEffect(() => {
        if (isGameOver && score > highScore) {
            localStorage.setItem('invadersHighScore', String(score));
            setHighScore(score);
        }
    }, [isGameOver, score, highScore]);

    const handleCanvasClick = () => {
        if (!gameStarted || isGameOver) resetGame();
    };
    
    return (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className="flex justify-between items-center w-full max-w-2xl mb-2 p-2 bg-white/5 rounded-lg border border-white/10 text-center">
                 <div><span className="text-brand-gray text-sm">PONTUAÇÃO</span><p className="text-xl font-bold">{score}</p></div>
                 <div><span className="text-brand-gray text-sm">RECORDE</span><p className="text-xl font-bold">{highScore}</p></div>
            </div>
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width="600"
                    height="700"
                    className="bg-brand-dark/50 rounded-lg border-2 border-white/10 max-w-full h-auto"
                />
                 {(!gameStarted || isGameOver) && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg text-center cursor-pointer" onClick={handleCanvasClick}>
                        <h2 className="text-4xl font-bold text-red-500 mb-4">{gameMessage}</h2>
                        {isGameOver && <p className="text-lg mb-6">Sua pontuação: {score}</p>}
                        <p className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full animate-subtle-pulse">
                          {isGameOver ? 'Jogar Novamente' : 'Iniciar'}
                        </p>
                    </div>
                )}
            </div>
             <p className="text-brand-gray text-sm text-center">
                Tiro automático! Use <strong className="text-white">← →</strong> ou <strong className="text-white">arraste o mouse/dedo</strong> para mover.
             </p>
        </div>
    );
};

export default SpaceInvadersGame;
