
import React, { useRef, useEffect, useState, useCallback } from 'react';

// Constantes do Jogo
const BUBBLE_RADIUS = 12; // Menores para caber mais na tela
const COLS = 16;
const ROWS = 16; // Menos fileiras para um campo mais baixo
const STARTING_ROWS = 6;
const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7'];
const SHOTS_PER_ROW_ADD = 8;
const ROW_HEIGHT = BUBBLE_RADIUS * 1.732;
const GAME_OVER_ROW = ROWS - 3;
const GAME_OVER_LINE_Y = GAME_OVER_ROW * ROW_HEIGHT;

type Bubble = { row: number; col: number; color: string; isConnected: boolean };
type Projectile = { x: number; y: number; color: string; angle: number };
type Particle = { x: number; y: number; vx: number; vy: number; radius: number; color: string; life: number; };

const BubbleShooterGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('bubbleShooterHighScore')) || 0);
    const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'gameOver'>('idle');

    const state = useRef({
        grid: [] as Bubble[],
        cannonBubble: { color: '' },
        nextBubble: { color: '' },
        projectile: null as Projectile | null,
        mouse: { x: 0, y: 0, angle: -Math.PI / 2 },
        shotsSinceRowAdd: 0,
        particles: [] as Particle[],
        width: 0,
        height: 0,
    });

    const getRandomColor = useCallback(() => {
        const availableColors = [...new Set(state.current.grid.map(b => b.color))];
        if (availableColors.length === 0) return COLORS[Math.floor(Math.random() * COLORS.length)];
        return availableColors[Math.floor(Math.random() * availableColors.length)];
    }, []);

    const initGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        state.current.width = canvas.width;
        state.current.height = canvas.height;
        state.current.grid = [];
        for (let row = 0; row < STARTING_ROWS; row++) {
            const colsInRow = row % 2 === 0 ? COLS : COLS - 1;
            for (let col = 0; col < colsInRow; col++) {
                state.current.grid.push({ row, col, color: COLORS[Math.floor(Math.random() * COLORS.length)], isConnected: false });
            }
        }
        state.current.cannonBubble.color = getRandomColor();
        state.current.nextBubble.color = getRandomColor();
        state.current.projectile = null;
        state.current.shotsSinceRowAdd = 0;
        state.current.particles = [];
        setScore(0);
        setGameStatus('playing');
    }, [getRandomColor]);
    
    // Controles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const updateMousePos = (e: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            let clientX, clientY;

            if ('touches' in e && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else if ('changedTouches' in e && e.changedTouches.length > 0) { // For touchend
                 clientX = e.changedTouches[0].clientX;
                 clientY = e.changedTouches[0].clientY;
            } else if ('clientX' in e) {
                clientX = e.clientX;
                clientY = e.clientY;
            } else {
                return; // No coordinates
            }
            
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            state.current.mouse.x = (clientX - rect.left) * scaleX;
            state.current.mouse.y = (clientY - rect.top) * scaleY;

            const cannonX = state.current.width / 2;
            const cannonY = state.current.height - 30;
            let angle = Math.atan2(state.current.mouse.y - cannonY, state.current.mouse.x - cannonX);
            state.current.mouse.angle = Math.max(-Math.PI + 0.1, Math.min(-0.1, angle));
        };

        const handleInteractionStart = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            if (gameStatus !== 'playing') {
                initGame();
                return;
            }
            updateMousePos(e);
        };
        
        const handleInteractionMove = (e: MouseEvent | TouchEvent) => {
            if (gameStatus !== 'playing') return;
            e.preventDefault();
            updateMousePos(e);
        };

        const handleInteractionEnd = (e: MouseEvent | TouchEvent) => {
            e.preventDefault();
            if (gameStatus === 'playing' && !state.current.projectile) {
                // Aim one last time for tap events where there's no move
                updateMousePos(e);

                state.current.projectile = {
                    x: state.current.width / 2,
                    y: state.current.height - 30,
                    color: state.current.cannonBubble.color,
                    angle: state.current.mouse.angle,
                };
                state.current.cannonBubble.color = state.current.nextBubble.color;
                state.current.nextBubble.color = getRandomColor();
                state.current.shotsSinceRowAdd++;
            }
        };

        canvas.addEventListener('mousedown', handleInteractionStart);
        canvas.addEventListener('touchstart', handleInteractionStart, { passive: false });
        
        canvas.addEventListener('mousemove', handleInteractionMove);
        canvas.addEventListener('touchmove', handleInteractionMove, { passive: false });

        canvas.addEventListener('mouseup', handleInteractionEnd);
        canvas.addEventListener('touchend', handleInteractionEnd, { passive: false });

        return () => {
            canvas.removeEventListener('mousedown', handleInteractionStart);
            canvas.removeEventListener('touchstart', handleInteractionStart);
            canvas.removeEventListener('mousemove', handleInteractionMove);
            canvas.removeEventListener('touchmove', handleInteractionMove);
            canvas.removeEventListener('mouseup', handleInteractionEnd);
            canvas.removeEventListener('touchend', handleInteractionEnd);
        };
    }, [gameStatus, initGame, getRandomColor]);

    // Loop do Jogo
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas || gameStatus !== 'playing') return;

        let animationFrameId: number;

        const getBubbleAt = (row: number, col: number) => state.current.grid.find(b => b.row === row && b.col === col);
        const getNeighbors = (row: number, col: number) => {
            const isOddRow = row % 2 !== 0;
            const neighborsCoords = [
                { r: row, c: col - 1 }, { r: row, c: col + 1 },
                { r: row - 1, c: col + (isOddRow ? 0 : -1) }, { r: row - 1, c: col + (isOddRow ? 1 : 0) },
                { r: row + 1, c: col + (isOddRow ? 0 : -1) }, { r: row + 1, c: col + (isOddRow ? 1 : 0) }
            ];
            return neighborsCoords.map(coord => getBubbleAt(coord.r, coord.c)).filter(Boolean) as Bubble[];
        };
        const getPixelCoords = (row: number, col: number) => {
            const x = col * BUBBLE_RADIUS * 2 + (row % 2 !== 0 ? BUBBLE_RADIUS : 0) + BUBBLE_RADIUS * 2;
            const y = row * ROW_HEIGHT + BUBBLE_RADIUS;
            return { x, y };
        };

        const addRow = () => {
            state.current.grid.forEach(b => b.row++);
            const colsInRow = state.current.grid.length > 0 && state.current.grid[0].row % 2 === 0 ? COLS : COLS - 1;
            for (let col = 0; col < colsInRow; col++) {
                state.current.grid.push({ row: 0, col, color: COLORS[Math.floor(Math.random() * COLORS.length)], isConnected: false });
            }
        };
        
        const createExplosion = (x: number, y: number, color: string) => {
             for (let i = 0; i < 10; i++) {
                state.current.particles.push({
                    x, y, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4,
                    radius: Math.random() * 2 + 1, color, life: 30
                });
            }
        };

        const handleSnap = (proj: Projectile) => {
            let closestDist = Infinity;
            let targetRow = 0, targetCol = 0;

            for (let row = 0; row < ROWS; row++) {
                const colsInRow = row % 2 === 0 ? COLS : COLS - 1;
                for (let col = 0; col < colsInRow; col++) {
                    if (!getBubbleAt(row, col)) {
                        const { x, y } = getPixelCoords(row, col);
                        const dist = Math.hypot(proj.x - x, proj.y - y);
                        if (dist < closestDist) {
                            closestDist = dist;
                            targetRow = row; targetCol = col;
                        }
                    }
                }
            }
            const snappedBubble = { row: targetRow, col: targetCol, color: proj.color, isConnected: false };
            state.current.grid.push(snappedBubble);

            // Match finding
            const toCheck: Bubble[] = [snappedBubble];
            const checked = new Set<Bubble>();
            const matches: Bubble[] = [];
            while (toCheck.length > 0) {
                const current = toCheck.pop()!;
                if (checked.has(current)) continue;
                checked.add(current);
                if (current.color === proj.color) {
                    matches.push(current);
                    getNeighbors(current.row, current.col).forEach(n => toCheck.push(n));
                }
            }

            // Popping
            if (matches.length >= 3) {
                matches.forEach(match => {
                    createExplosion(getPixelCoords(match.row, match.col).x, getPixelCoords(match.row, match.col).y, match.color);
                    state.current.grid = state.current.grid.filter(b => b !== match);
                });
                setScore(s => s + matches.length * 10);
                
                // Floating check
                state.current.grid.forEach(b => b.isConnected = false);
                const q: Bubble[] = state.current.grid.filter(b => b.row === 0);
                q.forEach(b => b.isConnected = true);
                const visited = new Set(q);
                while(q.length > 0) {
                    const current = q.pop()!;
                    getNeighbors(current.row, current.col).forEach(n => {
                        if(!visited.has(n)) {
                            n.isConnected = true;
                            visited.add(n);
                            q.push(n);
                        }
                    });
                }
                const floating = state.current.grid.filter(b => !b.isConnected);
                if(floating.length > 0) {
                    floating.forEach(b => createExplosion(getPixelCoords(b.row, b.col).x, getPixelCoords(b.row, b.col).y, b.color));
                    state.current.grid = state.current.grid.filter(b => b.isConnected);
                    setScore(s => s + floating.length * 20);
                }
            }

            if(state.current.shotsSinceRowAdd >= SHOTS_PER_ROW_ADD) {
                addRow();
                state.current.shotsSinceRowAdd = 0;
            }
            state.current.grid.forEach(b => {
                if (getPixelCoords(b.row, b.col).y >= GAME_OVER_LINE_Y) {
                    setGameStatus('gameOver');
                }
            });
        };

        const update = () => {
            if (state.current.projectile) {
                const proj = state.current.projectile;
                proj.x += Math.cos(proj.angle) * 10;
                proj.y += Math.sin(proj.angle) * 10;

                if (proj.x - BUBBLE_RADIUS < 0 || proj.x + BUBBLE_RADIUS > state.current.width) proj.angle = Math.PI - proj.angle;
                if (proj.y - BUBBLE_RADIUS < 0) {
                    state.current.projectile = null;
                    handleSnap(proj);
                    return;
                }

                for (const bubble of state.current.grid) {
                    const { x, y } = getPixelCoords(bubble.row, bubble.col);
                    const dist = Math.hypot(proj.x - x, proj.y - y);
                    if (dist < BUBBLE_RADIUS * 2) {
                        state.current.projectile = null;
                        handleSnap(proj);
                        return;
                    }
                }
            }
             state.current.particles.forEach((p, i) => {
                p.x += p.vx; p.y += p.vy; p.life--;
                if(p.life <= 0) state.current.particles.splice(i, 1);
            });
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw GameOver Line
            ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(0, GAME_OVER_LINE_Y); ctx.lineTo(canvas.width, GAME_OVER_LINE_Y);
            ctx.stroke(); ctx.setLineDash([]);

            state.current.grid.forEach(bubble => {
                const { x, y } = getPixelCoords(bubble.row, bubble.col);
                ctx.beginPath(); ctx.arc(x, y, BUBBLE_RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = bubble.color; ctx.fill();
            });

            const cannonX = state.current.width / 2; const cannonY = state.current.height - 30;
            ctx.save(); ctx.translate(cannonX, cannonY); ctx.rotate(state.current.mouse.angle + Math.PI / 2);
            ctx.fillStyle = '#94a3b8'; ctx.fillRect(-8, -10, 16, 40); ctx.restore();

            ctx.beginPath(); ctx.arc(cannonX, cannonY, 25, 0, Math.PI * 2); ctx.fillStyle = '#475569'; ctx.fill();
            
            ctx.beginPath(); ctx.arc(cannonX, cannonY, BUBBLE_RADIUS, 0, Math.PI * 2);
            ctx.fillStyle = state.current.cannonBubble.color; ctx.fill();
            
            ctx.beginPath(); ctx.arc(cannonX - 50, state.current.height - 25, BUBBLE_RADIUS, 0, Math.PI*2);
            ctx.fillStyle = state.current.nextBubble.color; ctx.fill();
            ctx.strokeStyle = 'white'; ctx.lineWidth = 1; ctx.stroke();
            
            if (state.current.projectile) {
                const { x, y, color } = state.current.projectile;
                ctx.beginPath(); ctx.arc(x, y, BUBBLE_RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = color; ctx.fill();
            }

            ctx.save();
            ctx.translate(cannonX, cannonY); ctx.rotate(state.current.mouse.angle);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
            ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(state.current.height, 0); ctx.stroke();
            ctx.restore();

            state.current.particles.forEach(p => {
                ctx.globalAlpha = p.life / 30; ctx.fillStyle = p.color;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
                ctx.globalAlpha = 1.0;
            });
        };

        const gameLoop = () => {
            update();
            draw();
            if (gameStatus === 'playing') animationFrameId = requestAnimationFrame(gameLoop);
        };
        gameLoop();

        return () => cancelAnimationFrame(animationFrameId);
    }, [gameStatus, getRandomColor]);

    useEffect(() => {
        if (gameStatus === 'gameOver' && score > highScore) {
            localStorage.setItem('bubbleShooterHighScore', String(score));
            setHighScore(score);
        }
    }, [gameStatus, score, highScore]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
             <div className="flex justify-between items-center w-full max-w-lg p-2 bg-white/5 rounded-lg border border-white/10 text-center">
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
                <canvas ref={canvasRef} width="408" height="480" className="bg-brand-dark/50 rounded-lg border-2 border-white/10 max-w-full h-auto" />
                {gameStatus !== 'playing' && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg text-center cursor-pointer" onClick={initGame}>
                        <h2 className="text-4xl font-bold text-red-500 mb-4">{gameStatus === 'idle' ? 'Canhão de Bolhas' : 'Fim de Jogo!'}</h2>
                        {gameStatus === 'gameOver' && <p className="text-lg mb-6">Sua pontuação: {score}</p>}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full animate-subtle-pulse">
                            {gameStatus === 'idle' ? 'Iniciar' : 'Jogar Novamente'}
                        </div>
                    </div>
                )}
            </div>
            <p className="text-brand-gray text-sm text-center">Mire com o <strong className="text-white">mouse/dedo</strong> e clique/toque para atirar.</p>
        </div>
    );
};

export default BubbleShooterGame;
