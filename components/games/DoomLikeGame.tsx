
import React, { useRef, useEffect, useState, useCallback } from 'react';

type GameObject = { x: number; y: number; width: number; height: number; };
type Bullet = GameObject & { dx: number; dy: number; life: number };
type Enemy = GameObject & { health: number; speed: number; lastShot: number; };
type Particle = { x: number; y: number; vx: number; vy: number; radius: number; color: string; life: number };

const DoomLikeGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [message, setMessage] = useState('Clique para Iniciar');
    
    // Joystick state
    const joystick = useRef({ active: false, x: 0, y: 0, dx: 0, dy: 0, touchId: -1 });
    const fireButton = useRef({ active: false, x: 0, y: 0, touchId: -1 });

    const gameState = useRef({
        player: { x: 300, y: 550, width: 30, height: 30, health: 100, speed: 2.5, angle: 0 },
        bullets: [] as Bullet[],
        enemies: [] as Enemy[],
        particles: [] as Particle[],
        keys: {} as Record<string, boolean>,
        mouse: { x: 300, y: 550, down: false },
        lastPlayerShot: 0,
    });

    const createExplosion = (x: number, y: number, color: string) => {
        for (let i = 0; i < 30; i++) {
            gameState.current.particles.push({
                x, y,
                vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6,
                radius: Math.random() * 3 + 1, color, life: 50,
            });
        }
    };
    
    const spawnEnemies = (count: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const newEnemies: Enemy[] = [];
        for (let i = 0; i < count; i++) {
            newEnemies.push({
                x: Math.random() * (canvas.width - 40) + 20,
                y: Math.random() * (canvas.height / 2) + 20,
                width: 25, height: 25, health: 3, speed: 0.5 + Math.random() * 0.5,
                lastShot: Date.now() + Math.random() * 2000,
            });
        }
        gameState.current.enemies = newEnemies;
    };

    const resetGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        gameState.current = {
            ...gameState.current,
            player: { x: canvas.width / 2, y: canvas.height - 60, width: 30, height: 30, health: 100, speed: 2.5, angle: 0 },
            bullets: [], enemies: [], particles: [],
            lastPlayerShot: 0,
        };
        spawnEnemies(10);
        setScore(0);
        setIsGameOver(false);
        setGameStarted(true);
        setMessage('');
    }, []);

    // Controls setup
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { gameState.current.keys[e.key.toLowerCase()] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { gameState.current.keys[e.key.toLowerCase()] = false; };
        const handleMouseDown = () => { gameState.current.mouse.down = true; };
        const handleMouseUp = () => { gameState.current.mouse.down = false; };
        const handleMouseMove = (e: MouseEvent) => {
            const canvas = canvasRef.current;
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                gameState.current.mouse.x = e.clientX - rect.left;
                gameState.current.mouse.y = e.clientY - rect.top;
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            
            for (const touch of Array.from(e.changedTouches)) {
                const touchX = touch.clientX - rect.left;
                const touchY = touch.clientY - rect.top;

                // Fire button area (right side)
                if (touchX > canvas.width / 2) {
                    fireButton.current = { active: true, x: touchX, y: touchY, touchId: touch.identifier };
                } 
                // Joystick area (left side)
                else if (!joystick.current.active) {
                    joystick.current = { active: true, x: touchX, y: touchY, dx: 0, dy: 0, touchId: touch.identifier };
                }
            }
        };
        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();

            for (const touch of Array.from(e.changedTouches)) {
                if (touch.identifier === joystick.current.touchId) {
                    const touchX = touch.clientX - rect.left;
                    const touchY = touch.clientY - rect.top;
                    const dx = touchX - joystick.current.x;
                    const dy = touchY - joystick.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 50;

                    if (dist > maxDist) {
                        joystick.current.dx = (dx / dist) * maxDist;
                        joystick.current.dy = (dy / dist) * maxDist;
                    } else {
                        joystick.current.dx = dx;
                        joystick.current.dy = dy;
                    }
                }
            }
        };
        const handleTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            for (const touch of Array.from(e.changedTouches)) {
                if (touch.identifier === joystick.current.touchId) {
                    joystick.current = { active: false, x: 0, y: 0, dx: 0, dy: 0, touchId: -1 };
                }
                if (touch.identifier === fireButton.current.touchId) {
                    fireButton.current = { active: false, x: 0, y: 0, touchId: -1 };
                }
            }
        };
        
        window.addEventListener('keydown', handleKeyDown); window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('mousedown', handleMouseDown); window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
        const canvas = canvasRef.current;
        if(canvas) {
            canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
            canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
            canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
            canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('mousedown', handleMouseDown); window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
             if(canvas) {
                canvas.removeEventListener('touchstart', handleTouchStart);
                canvas.removeEventListener('touchmove', handleTouchMove);
                canvas.removeEventListener('touchend', handleTouchEnd);
                canvas.removeEventListener('touchcancel', handleTouchEnd);
            }
        };
    }, []);

    // Game Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;
        let animationFrameId: number;
        let lastTime = 0;

        const gameLoop = (timestamp: number) => {
            animationFrameId = requestAnimationFrame(gameLoop);
            if (!lastTime) lastTime = timestamp;
            const deltaTime = (timestamp - lastTime) / 16.67;
            lastTime = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Particles
            gameState.current.particles.forEach((p, i) => {
                p.x += p.vx * deltaTime; p.y += p.vy * deltaTime; p.life -= deltaTime;
                if (p.life <= 0) gameState.current.particles.splice(i, 1);
                else {
                    ctx.globalAlpha = p.life / 50; ctx.fillStyle = p.color;
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
                    ctx.globalAlpha = 1.0;
                }
            });
            
            if (!gameStarted || isGameOver) return;
            
            const { player, keys, mouse, bullets, enemies } = gameState.current;

            // Player movement
            let moveX = 0; let moveY = 0;
            if (keys['w']) moveY -= 1;
            if (keys['s']) moveY += 1;
            if (keys['a']) moveX -= 1;
            if (keys['d']) moveX += 1;
            
            // Joystick movement
            if (joystick.current.active) {
                moveX += joystick.current.dx / 50;
                moveY += joystick.current.dy / 50;
            }

            const moveMagnitude = Math.sqrt(moveX * moveX + moveY * moveY);
            if (moveMagnitude > 0) {
                player.x += (moveX / moveMagnitude) * player.speed * deltaTime;
                player.y += (moveY / moveMagnitude) * player.speed * deltaTime;
            }

            player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
            player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
            
            // Player aiming
            let isFiring = false;
            if (fireButton.current.active) {
                // If joystick is active, fire in the direction of joystick movement
                if (joystick.current.active && (joystick.current.dx !== 0 || joystick.current.dy !== 0)) {
                    player.angle = Math.atan2(joystick.current.dy, joystick.current.dx);
                }
                isFiring = true;
            } else { // Desktop aiming
                player.angle = Math.atan2(mouse.y - (player.y + player.height / 2), mouse.x - (player.x + player.width / 2));
                if (mouse.down) {
                    isFiring = true;
                }
            }

            // Player shooting
            const now = Date.now();
            if (isFiring && now - gameState.current.lastPlayerShot > 150) {
                gameState.current.lastPlayerShot = now;
                bullets.push({
                    x: player.x + player.width / 2, y: player.y + player.height / 2,
                    width: 5, height: 5,
                    dx: Math.cos(player.angle) * 7, dy: Math.sin(player.angle) * 7,
                    life: 100,
                });
            }

            // Update & Draw Bullets
            bullets.forEach((b, i) => {
                b.x += b.dx * deltaTime; b.y += b.dy * deltaTime; b.life -= deltaTime;
                if (b.life <= 0) bullets.splice(i, 1);
                ctx.fillStyle = '#00FFFF';
                ctx.beginPath(); ctx.arc(b.x, b.y, 3, 0, Math.PI * 2); ctx.fill();
            });

            // Update & Draw Enemies
            enemies.forEach((enemy, i) => {
                const angleToPlayer = Math.atan2((player.y + player.height/2) - (enemy.y + enemy.height/2), (player.x+player.width/2) - (enemy.x+enemy.width/2));
                enemy.x += Math.cos(angleToPlayer) * enemy.speed * deltaTime;
                enemy.y += Math.sin(angleToPlayer) * enemy.speed * deltaTime;
                
                ctx.fillStyle = '#ff4500';
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
                ctx.fillStyle = '#1e1e1e';
                ctx.fillRect(enemy.x + 5, enemy.y+5, 5, 5);
                ctx.fillRect(enemy.x + 15, enemy.y+5, 5, 5);
            });

            // Collisions
            bullets.forEach((bullet, bIndex) => {
                enemies.forEach((enemy, eIndex) => {
                    if (bullet.x > enemy.x && bullet.x < enemy.x + enemy.width && bullet.y > enemy.y && bullet.y < enemy.y + enemy.height) {
                        bullets.splice(bIndex, 1);
                        enemy.health--;
                        if (enemy.health <= 0) {
                            createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, '#ff4500');
                            enemies.splice(eIndex, 1);
                            setScore(s => s + 100);
                        }
                    }
                });
            });

            enemies.forEach((enemy) => {
                if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x && player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
                    player.health -= 1 * deltaTime;
                }
            });

            if (player.health <= 0) {
                createExplosion(player.x + player.width / 2, player.y + player.height / 2, '#00FFFF');
                setIsGameOver(true); setMessage('Você Morreu!');
                player.health = 0;
            }
            if(enemies.length === 0) {
                setIsGameOver(true); setMessage('Você Venceu!');
            }
            
            // Draw Player
            ctx.save();
            ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
            ctx.rotate(player.angle);
            ctx.fillStyle = '#00FFFF';
            ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);
            ctx.fillStyle = '#1e1e1e';
            ctx.fillRect(0, -3, 15, 6);
            ctx.restore();

            // Draw HUD
            ctx.fillStyle = 'white'; ctx.font = '20px "Poppins"'; ctx.textAlign = 'left';
            ctx.fillText(`Saúde: ${Math.ceil(player.health)}`, 10, 30);
            ctx.textAlign = 'center';
            ctx.fillText(`Pontuação: ${score}`, canvas.width / 2, 30);
            ctx.textAlign = 'right';
            ctx.fillText(`Inimigos: ${enemies.length}`, canvas.width - 10, 30);

            // Draw joystick
            if (joystick.current.active) {
                ctx.beginPath();
                ctx.arc(joystick.current.x, joystick.current.y, 50, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(joystick.current.x + joystick.current.dx, joystick.current.y + joystick.current.dy, 30, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                ctx.fill();
            }
            if (fireButton.current.active) {
                ctx.beginPath();
                ctx.arc(fireButton.current.x, fireButton.current.y, 40, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 69, 0, 0.4)';
                ctx.fill();
            }
        };

        gameLoop(0);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isGameOver, gameStarted, resetGame]);


    return (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className="relative w-full max-w-3xl aspect-[4/3]">
                <canvas
                    ref={canvasRef}
                    width="800"
                    height="600"
                    className="bg-brand-dark/50 rounded-lg border-2 border-white/10 w-full h-full"
                />
                {(!gameStarted || isGameOver) && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg text-center cursor-pointer" onClick={resetGame}>
                        <h2 className="text-4xl font-bold text-red-500 mb-4">{message}</h2>
                        {isGameOver && <p className="text-lg mb-6">Sua pontuação: {score}</p>}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full animate-subtle-pulse">
                            {isGameOver ? 'Jogar Novamente' : 'Iniciar'}
                        </div>
                    </div>
                )}
            </div>
            <p className="text-brand-gray text-sm text-center max-w-prose">
                <strong className="text-white">PC:</strong> Use <strong className="text-white">WASD</strong> para mover, <strong className="text-white">Mouse</strong> para mirar e <strong className="text-white">Clique</strong> para atirar.
                 <br />
                <strong className="text-white">Mobile:</strong> Use o <strong className="text-white">joystick esquerdo</strong> para mover e o <strong className="text-white">botão direito</strong> para atirar.
            </p>
        </div>
    );
};

export default DoomLikeGame;
