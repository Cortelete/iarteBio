import React, { useRef, useEffect, useState, useCallback } from 'react';

// Game Constants
const V_WIDTH = 800;
const V_HEIGHT = 600;
const HORIZON_Y = V_HEIGHT / 4; // Pushed horizon up for more distance
const SAND_START_Y = HORIZON_Y + 40;
const BARRICADE_Y = V_HEIGHT - 80;

const ENEMY_EMOJI = { boat: '🚤', tank: '🚜' };
const GRENADE_EMOJI = '💣';

// Types
type GameObject = { x: number; y: number; width: number; height: number; scale: number; };
type Bullet = { x: number; y: number; vx: number; vy: number; life: number };
type Particle = { x: number; y: number; vx: number; vy: number; radius: number; color: string; life: number };
type Grenade = GameObject & { vx: number; vy: number; vz: number; rotation: number; rotationSpeed: number; };
type Enemy = GameObject & { health: number; type: 'boat' | 'tank'; speed: number; lastShot: number; };

const WEAPONS = {
    pistol: { fireRate: 400, damage: 1, name: "Pistola" },
    machine_gun: { fireRate: 100, damage: 1, name: "Metralhadora" },
};

const BeachDefenderGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [kills, setKills] = useState(0);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('beachDefenderHighScore')) || 0);
    const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'gameOver'>('idle');

    const state = useRef({
        player: { health: 100, weapon: WEAPONS.pistol, weaponTimer: 0 },
        crosshair: { x: V_WIDTH / 2, y: V_HEIGHT / 2 },
        bullets: [] as Bullet[],
        enemies: [] as Enemy[],
        grenades: [] as Grenade[],
        particles: [] as Particle[],
        wave: 0,
        isShooting: false,
        lastShotTime: 0,
        isMobile: false,
    });

    const createExplosion = useCallback((x: number, y: number, color: string, count = 20) => {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 1;
            state.current.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 3 + 1,
                color,
                life: 50 + Math.random() * 30,
            });
        }
    }, []);

    const spawnWave = useCallback(() => {
        state.current.wave++;
        const enemyCount = 3 + state.current.wave * 2;
        for (let i = 0; i < enemyCount; i++) {
            const type = Math.random() > 0.7 ? 'tank' : 'boat';
            state.current.enemies.push({
                x: Math.random() * V_WIDTH,
                y: HORIZON_Y + Math.random() * 40 - 20,
                width: type === 'boat' ? 60 : 50,
                height: type === 'boat' ? 30 : 40,
                scale: 1,
                health: type === 'boat' ? 3 : 5,
                type,
                speed: 0.02 + Math.random() * 0.05 + state.current.wave * 0.01,
                lastShot: Date.now() + Math.random() * 5000,
            });
        }
    }, []);
    
    const resetGame = useCallback(() => {
        state.current = {
            ...state.current,
            player: { health: 100, weapon: WEAPONS.pistol, weaponTimer: 0 },
            bullets: [], enemies: [], grenades: [], particles: [],
            wave: 0,
            isShooting: false,
            lastShotTime: 0,
        };
        setKills(0);
        setGameStatus('playing');
        spawnWave();
    }, [spawnWave]);

    // Controls
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        state.current.isMobile = 'ontouchstart' in window;

        const getCoords = (clientX: number, clientY: number) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = V_WIDTH / rect.width;
            const scaleY = V_HEIGHT / rect.height;
            return {
                x: (clientX - rect.left) * scaleX,
                y: (clientY - rect.top) * scaleY,
            };
        };
        const handleAim = (clientX: number, clientY: number) => {
            const coords = getCoords(clientX, clientY);
            state.current.crosshair.x = coords.x;
            state.current.crosshair.y = coords.y;
        };

        const handlePointerDown = (e: PointerEvent) => {
            if (gameStatus !== 'playing') {
                resetGame();
                return;
            }
            state.current.isShooting = true;
            handleAim(e.clientX, e.clientY);
        };
        const handlePointerUp = () => {
            state.current.isShooting = false;
        };
        const handlePointerMove = (e: PointerEvent) => {
            handleAim(e.clientX, e.clientY);
        };

        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('pointerup', handlePointerUp);
        canvas.addEventListener('pointerleave', handlePointerUp);
        canvas.addEventListener('pointermove', handlePointerMove);

        return () => {
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('pointerup', handlePointerUp);
            canvas.removeEventListener('pointerleave', handlePointerUp);
            canvas.removeEventListener('pointermove', handlePointerMove);
        };
    }, [gameStatus, resetGame]);

    // Game Loop
    useEffect(() => {
        if (gameStatus !== 'playing') return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;
        let animationFrameId: number;

        const gameLoop = () => {
            // --- UPDATE ---
            const now = Date.now();
            const { player, bullets, enemies, grenades, particles, crosshair, isMobile } = state.current;
            
            let autoShooting = false;
            if (isMobile) {
                for(const enemy of enemies) {
                    if (crosshair.x > enemy.x && crosshair.x < enemy.x + enemy.width * enemy.scale &&
                        crosshair.y > enemy.y && crosshair.y < enemy.y + enemy.height * enemy.scale) {
                        autoShooting = true;
                        break;
                    }
                }
            }
            
            if ((state.current.isShooting || autoShooting) && now > state.current.lastShotTime + player.weapon.fireRate) {
                state.current.lastShotTime = now;
                const muzzleX = V_WIDTH / 2;
                const muzzleY = BARRICADE_Y + 10;
                const angle = Math.atan2(crosshair.y - muzzleY, crosshair.x - muzzleX);
                const speed = 15;
                bullets.push({
                    x: muzzleX, y: muzzleY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 100,
                });
                createExplosion(muzzleX + Math.cos(angle) * 30, muzzleY + Math.sin(angle) * 30, '#ffcc00', 3);
            }
            
            bullets.forEach((b, i) => {
                b.x += b.vx; b.y += b.vy; b.life--;
                if(b.life <= 0) bullets.splice(i, 1);
            });
            
            enemies.forEach((e, i) => {
                e.y += e.speed;
                const perspectiveScale = 0.1 + (e.y - HORIZON_Y) / (BARRICADE_Y - HORIZON_Y) * 1.5;
                e.scale = Math.max(0.1, perspectiveScale);

                if (e.y > BARRICADE_Y) {
                    enemies.splice(i, 1);
                    player.health -= e.type === 'tank' ? 20 : 10;
                    createExplosion(V_WIDTH / 2, BARRICADE_Y, '#ff4500', 50);
                }
                
                if (e.type === 'tank' && now > e.lastShot && e.y > HORIZON_Y + 50) {
                     e.lastShot = now + 10000;
                     grenades.push({
                        x: e.x + (e.width * e.scale) / 2, y: e.y + (e.height * e.scale) / 2,
                        width: 15, height: 15, scale: 1,
                        vx: (V_WIDTH/2 - e.x) / 100,
                        vy: (BARRICADE_Y - e.y) / 100 - 5,
                        vz: 0,
                        rotation: 0, rotationSpeed: (Math.random() - 0.5) * 0.2
                     });
                }
            });

            grenades.forEach((g, i) => {
                g.x += g.vx; g.y += g.vy; g.vy += 0.15;
                g.rotation += g.rotationSpeed;
                if(g.y > BARRICADE_Y) {
                    grenades.splice(i, 1);
                    player.health -= 25;
                    createExplosion(g.x, BARRICADE_Y, '#ff4500', 100);
                }
            });
            
            for(let bIdx = bullets.length - 1; bIdx >= 0; bIdx--) {
                const b = bullets[bIdx];
                for(let eIdx = enemies.length - 1; eIdx >= 0; eIdx--) {
                    const e = enemies[eIdx];
                    if(b.x > e.x && b.x < e.x + e.width * e.scale && b.y > e.y && b.y < e.y + e.height * e.scale) {
                        bullets.splice(bIdx, 1);
                        e.health -= player.weapon.damage;
                        if(e.health <= 0) {
                            createExplosion(e.x + (e.width * e.scale) / 2, e.y + (e.height * e.scale) / 2, '#ffa500');
                            enemies.splice(eIdx, 1);
                            setKills(k => k + 1);
                        }
                        break;
                    }
                }
                for(let gIdx = grenades.length - 1; gIdx >= 0; gIdx--) {
                    const g = grenades[gIdx];
                    if (Math.hypot(b.x - g.x, b.y - g.y) < (g.width * g.scale)) {
                        bullets.splice(bIdx, 1);
                        grenades.splice(gIdx, 1);
                        createExplosion(g.x, g.y, '#ffffff', 30);
                        setKills(k => k + 1);
                        break;
                    }
                }
            }

            if (enemies.length === 0) {
                spawnWave();
            }
            
            if(player.health <= 0) {
                player.health = 0;
                setGameStatus('gameOver');
                if (kills > highScore) {
                    localStorage.setItem('beachDefenderHighScore', String(kills));
                    setHighScore(kills);
                }
            }

            // --- DRAW ---
            const skyGradient = ctx.createLinearGradient(0, 0, 0, HORIZON_Y);
            skyGradient.addColorStop(0, '#87CEEB');
            skyGradient.addColorStop(1, '#4682B4');
            ctx.fillStyle = skyGradient;
            ctx.fillRect(0, 0, V_WIDTH, HORIZON_Y);

            const seaGradient = ctx.createLinearGradient(0, HORIZON_Y, 0, SAND_START_Y);
            seaGradient.addColorStop(0, '#006994');
            seaGradient.addColorStop(1, '#5F9EA0');
            ctx.fillStyle = seaGradient;
            ctx.fillRect(0, HORIZON_Y, V_WIDTH, SAND_START_Y - HORIZON_Y);

            const sandGradient = ctx.createLinearGradient(0, SAND_START_Y, 0, V_HEIGHT);
            sandGradient.addColorStop(0, '#F4A460');
            sandGradient.addColorStop(1, '#DEB887');
            ctx.fillStyle = sandGradient;
            ctx.fillRect(0, SAND_START_Y, V_WIDTH, V_HEIGHT - SAND_START_Y);

            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                ctx.moveTo(V_WIDTH / 2, HORIZON_Y);
                ctx.lineTo(i * (V_WIDTH / 9), V_HEIGHT);
                ctx.stroke();
            }

            const allObjects = [...enemies, ...grenades].sort((a,b) => a.y - b.y);
            allObjects.forEach(obj => {
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                if('type' in obj) {
                    const e = obj as Enemy;
                    ctx.font = `${e.height * e.scale * 1.5}px sans-serif`;
                    ctx.fillText(ENEMY_EMOJI[e.type], e.x + (e.width * e.scale) / 2, e.y + (e.height * e.scale) / 2);
                } else {
                    const g = obj as Grenade;
                    const scale = 0.5 + (g.y - HORIZON_Y) / (BARRICADE_Y - HORIZON_Y);
                    ctx.font = `${g.height * scale * 2}px sans-serif`;
                    ctx.translate(g.x, g.y);
                    ctx.rotate(g.rotation);
                    ctx.fillText(GRENADE_EMOJI, 0, 0);
                }
                ctx.restore();
            });

            const drawSandbag = (x: number, y: number, width: number, height: number) => {
                ctx.fillStyle = '#C2B280';
                ctx.beginPath();
                ctx.roundRect(x, y, width, height, 10);
                ctx.fill();
                ctx.strokeStyle = '#856d4b';
                ctx.stroke();
            };
            for (let i = -50; i < V_WIDTH; i += 80) {
                drawSandbag(i, BARRICADE_Y + 10, 100, 40);
            }
            for (let i = -20; i < V_WIDTH; i += 90) {
                drawSandbag(i, BARRICADE_Y - 10, 110, 40);
            }
            
            particles.forEach((p) => {
                p.x += p.vx; p.y += p.vy; p.life--;
                ctx.globalAlpha = Math.max(0, p.life / 60);
                ctx.fillStyle = p.color;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI); ctx.fill();
            });
            ctx.globalAlpha = 1;
            
            bullets.forEach(b => {
                 ctx.fillStyle = '#FFFF00';
                 ctx.beginPath(); ctx.arc(b.x, b.y, 3, 0, 2 * Math.PI); ctx.fill();
            });

            ctx.save();
            ctx.translate(V_WIDTH/2, BARRICADE_Y + 10);
            const angle = Math.atan2(crosshair.y - (BARRICADE_Y + 10), crosshair.x - (V_WIDTH / 2));
            ctx.rotate(angle);
            ctx.fillStyle = '#36454F';
            ctx.fillRect(0, -5, 60, 10);
            ctx.restore();
            
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.8)'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(crosshair.x - 10, crosshair.y); ctx.lineTo(crosshair.x + 10, crosshair.y); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(crosshair.x, crosshair.y - 10); ctx.lineTo(crosshair.x, crosshair.y + 10); ctx.stroke();

            // Draw HUD
            const barWidth = 200; const barHeight = 25;
            const barX = (V_WIDTH - barWidth) / 2;
            const barY = V_HEIGHT - 45;
            ctx.fillStyle = '#ff4500';
            ctx.beginPath(); ctx.roundRect(barX, barY, barWidth, barHeight, 5); ctx.fill();
            const healthWidth = (player.health / 100) * barWidth;
            ctx.fillStyle = '#7CFC00';
            ctx.beginPath(); ctx.roundRect(barX, barY, healthWidth, barHeight, 5); ctx.fill();
            ctx.strokeStyle = 'white'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.roundRect(barX, barY, barWidth, barHeight, 5); ctx.stroke();
            ctx.fillStyle = "white";
            ctx.font = '16px "Poppins"';
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 4;
            ctx.fillText("SAÚDE", barX + barWidth / 2, barY + barHeight / 2);
            ctx.shadowBlur = 0;

            ctx.font = '20px "Poppins"';
            ctx.textAlign = 'left';
            ctx.fillText(`Arma: ${player.weapon.name}`, 10, 30);
            ctx.textAlign = 'right';
            ctx.fillText(`Abates: ${kills}`, V_WIDTH - 10, 30);
            
            animationFrameId = requestAnimationFrame(gameLoop);
        };

        gameLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [gameStatus, kills, highScore, resetGame, spawnWave, createExplosion]);

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className="relative w-full max-w-3xl aspect-[4/3]">
                <canvas
                    ref={canvasRef}
                    width={V_WIDTH}
                    height={V_HEIGHT}
                    className="bg-brand-dark/50 rounded-lg border-2 border-white/10 w-full h-full cursor-crosshair"
                />
                {gameStatus !== 'playing' && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg text-center cursor-pointer" onClick={resetGame}>
                        <h2 className="text-4xl font-bold text-red-500 mb-4">{gameStatus === 'idle' ? 'Defensor da Praia' : 'Fim de Jogo!'}</h2>
                        {gameStatus === 'gameOver' && <p className="text-lg mb-6">Total de abates: {kills} (Recorde: {highScore})</p>}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full animate-subtle-pulse">
                            {gameStatus === 'idle' ? 'Iniciar' : 'Jogar Novamente'}
                        </div>
                    </div>
                )}
            </div>
            <p className="text-brand-gray text-sm text-center">
                <strong className="text-white">PC:</strong> Mire com o mouse, clique para atirar.
                 <br />
                <strong className="text-white">Mobile:</strong> Arraste para mirar, o tiro é automático.
            </p>
        </div>
    );
};

export default BeachDefenderGame;