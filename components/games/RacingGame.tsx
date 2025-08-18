
import React, { useRef, useEffect, useState, useCallback } from 'react';

type Car = {
    x: number; y: number;
    speed: number; angle: number;
    width: number; height: number;
    color: string;
    isPlayer: boolean;
    lap: number;
    lastCheckpoint: number;
    lapTime: number;
    totalTime: number;
    // AI specific
    targetNode?: number;
};

const trackNodes = [
    { x: 150, y: 500 }, { x: 650, y: 500 },
    { x: 700, y: 450 }, { x: 700, y: 150 },
    { x: 650, y: 100 }, { x: 150, y: 100 },
    { x: 100, y: 150 }, { x: 100, y: 450 }
];
const trackWidth = 80;
const totalLaps = 3;


// Helper function to get the closest point on a line segment to a given point
const getClosestPointOnSegment = (pX: number, pY: number, s1X: number, s1Y: number, s2X: number, s2Y: number) => {
    const l2 = (s2X - s1X) ** 2 + (s2Y - s1Y) ** 2;
    if (l2 === 0) return { x: s1X, y: s1Y };
    let t = ((pX - s1X) * (s2X - s1X) + (pY - s1Y) * (s2Y - s1Y)) / l2;
    t = Math.max(0, Math.min(1, t));
    return { x: s1X + t * (s2X - s1X), y: s1Y + t * (s2Y - s1Y) };
};


const RacingGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'pre-race' | 'racing' | 'post-race'>('pre-race');
    const [raceResult, setRaceResult] = useState({ position: 0, totalTime: 0 });

    const gameData = useRef({
        cars: [] as Car[],
        keys: {} as Record<string, boolean>,
        touch: { gas: false, brake: false, left: false, right: false },
        startTime: 0,
    });
    
    const resetGame = useCallback(() => {
        gameData.current.cars = [
            { x: 150, y: 520, speed: 0, angle: -Math.PI / 2, width: 20, height: 35, color: '#00FFFF', isPlayer: true, lap: 0, lastCheckpoint: 7, lapTime: 0, totalTime: 0 },
            { x: 150, y: 480, speed: 0, angle: -Math.PI / 2, width: 20, height: 35, color: '#FF00FF', isPlayer: false, targetNode: 0, lap: 0, lastCheckpoint: 7, lapTime: 0, totalTime: 0 },
            { x: 200, y: 520, speed: 0, angle: -Math.PI / 2, width: 20, height: 35, color: '#FFFF00', isPlayer: false, targetNode: 0, lap: 0, lastCheckpoint: 7, lapTime: 0, totalTime: 0 },
            { x: 200, y: 480, speed: 0, angle: -Math.PI / 2, width: 20, height: 35, color: '#FF4500', isPlayer: false, targetNode: 0, lap: 0, lastCheckpoint: 7, lapTime: 0, totalTime: 0 },
        ];
        gameData.current.startTime = Date.now();
        setGameState('racing');
    }, []);

    // Controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { gameData.current.keys[e.key] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { gameData.current.keys[e.key] = false; };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Game Loop
    useEffect(() => {
        if (gameState !== 'racing') return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        let animationFrameId: number;
        
        const gameLoop = () => {
            // Update logic
            const { cars, keys, touch } = gameData.current;

            cars.forEach(car => {
                let onTrack = true;

                // Physics and Controls
                if (car.isPlayer) {
                    const acceleration = (keys['ArrowUp'] || touch.gas) ? 0.12 : 0;
                    const braking = (keys['ArrowDown'] || touch.brake) ? 0.08 : 0;
                    const turn = (keys['ArrowLeft'] || touch.left) ? -0.05 : (keys['ArrowRight'] || touch.right) ? 0.05 : 0;
                    
                    car.speed += acceleration;
                    car.speed -= braking;
                    if (Math.abs(turn) > 0 && car.speed > 1) car.speed *= 0.99; // Turning friction
                
                    if (car.speed !== 0) {
                        car.angle += turn * (car.speed / 4);
                    }
                } else { // AI Logic
                    const targetNodeIndex = car.targetNode!;
                    const target = trackNodes[targetNodeIndex];

                    const angleToTarget = Math.atan2(target.y - car.y, target.x - car.x);
                    let angleDiff = angleToTarget - (car.angle + Math.PI / 2);
                    while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
                    while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
                    
                    car.angle += Math.sign(angleDiff) * 0.06;

                    // AI speed control based on upcoming turn
                    const nextNodeIndex = (targetNodeIndex + 1) % trackNodes.length;
                    const nextTarget = trackNodes[nextNodeIndex];
                    const nextAngle = Math.atan2(nextTarget.y - target.y, nextTarget.x - target.x);
                    const currentSegmentAngle = Math.atan2(target.y - car.y, target.x - car.x);
                    const turnSeverity = Math.abs(nextAngle - currentSegmentAngle);

                    const targetSpeed = turnSeverity > 1 ? 2.0 : 3.5;
                    car.speed += (targetSpeed - car.speed) * 0.1;
                    
                    const distToTarget = Math.hypot(target.x - car.x, target.y - car.y);
                    if (distToTarget < 60) {
                        car.targetNode = (targetNodeIndex + 1) % trackNodes.length;
                    }
                }

                car.speed *= 0.98; // Friction

                // Track Boundary Collision
                let minDistance = Infinity;
                let closestPoint = { x: 0, y: 0 };
                let currentSegment = { p1: {x:0, y:0}, p2: {x:0, y:0} };

                for (let i = 0; i < trackNodes.length; i++) {
                    const p1 = trackNodes[i];
                    const p2 = trackNodes[(i + 1) % trackNodes.length];
                    const point = getClosestPointOnSegment(car.x, car.y, p1.x, p1.y, p2.x, p2.y);
                    const dist = Math.hypot(car.x - point.x, car.y - point.y);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closestPoint = point;
                        currentSegment = { p1, p2 };
                    }
                }
                
                if (minDistance > trackWidth / 2) {
                    onTrack = false;
                    car.speed *= 0.9; // Penalty for being off-track
                    // Push car back towards the track
                    const pushAngle = Math.atan2(closestPoint.y - car.y, closestPoint.x - car.x);
                    car.x += Math.cos(pushAngle);
                    car.y += Math.sin(pushAngle);
                }

                // Apply movement
                car.x += Math.sin(car.angle) * car.speed;
                car.y -= Math.cos(car.angle) * car.speed;
                car.totalTime = Date.now() - gameData.current.startTime;

                // Lap tracking
                const nextCheckpointIndex = (car.lastCheckpoint + 1) % trackNodes.length;
                const distToCheckpoint = Math.hypot(trackNodes[nextCheckpointIndex].x - car.x, trackNodes[nextCheckpointIndex].y - car.y);

                if (distToCheckpoint < trackWidth * 1.5) {
                    if (nextCheckpointIndex === 0 && car.lastCheckpoint === trackNodes.length - 1) {
                       if(car.lap < totalLaps) car.lap++;
                       car.lapTime = car.totalTime;
                       if (car.isPlayer && car.lap >= totalLaps) {
                            const finalPositions = [...gameData.current.cars].sort((a, b) => (b.lap - a.lap) || (a.totalTime - b.totalTime));
                            const playerPosition = finalPositions.findIndex(c => c.isPlayer) + 1;
                            setRaceResult({ position: playerPosition, totalTime: car.totalTime });
                            setGameState('post-race');
                       }
                    }
                    car.lastCheckpoint = nextCheckpointIndex;
                }
            });


            // Drawing
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw track
            ctx.strokeStyle = '#444'; ctx.lineWidth = trackWidth + 10;
            ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(trackNodes[0].x, trackNodes[0].y);
            for(let i=1; i < trackNodes.length; i++) ctx.lineTo(trackNodes[i].x, trackNodes[i].y);
            ctx.closePath();
            ctx.stroke();

            ctx.strokeStyle = '#888'; ctx.lineWidth = trackWidth;
            ctx.stroke();
            
            // Draw finish line
            const finishNode1 = trackNodes[0];
            const finishNode2 = trackNodes[trackNodes.length - 1];
            const finishLineAngle = Math.atan2(finishNode1.y - finishNode2.y, finishNode1.x - finishNode2.x);
            const finishCenterX = (finishNode1.x + finishNode2.x) / 2;
            const finishCenterY = (finishNode1.y + finishNode2.y) / 2;

            ctx.save();
            ctx.translate(finishCenterX, finishCenterY);
            ctx.rotate(finishLineAngle);
            ctx.lineWidth = 2;
            for (let i = -trackWidth/2; i < trackWidth/2; i+=10) {
                 ctx.strokeStyle = (i/10 % 2 === 0) ? '#fff' : '#000';
                 ctx.beginPath();
                 ctx.moveTo(i, -5);
                 ctx.lineTo(i+10, -5);
                 ctx.stroke();
            }
            ctx.restore();


            // Draw cars
            cars.forEach(car => {
                ctx.save();
                ctx.translate(car.x, car.y);
                ctx.rotate(car.angle);
                ctx.fillStyle = car.color;
                ctx.shadowColor = car.color;
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.rect(-car.width / 2, -car.height / 2, car.width, car.height);
                ctx.fill();
                // Add a small triangle to show front
                ctx.fillStyle = 'rgba(0,0,0,0.4)';
                ctx.beginPath();
                ctx.moveTo(0, -car.height/2 - 2);
                ctx.lineTo(-car.width/4, -car.height/2 + 5);
                ctx.lineTo(car.width/4, -car.height/2 + 5);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            });

            // Draw HUD
            const playerCar = cars.find(c => c.isPlayer);
            if (playerCar) {
                const positions = [...cars].sort((a,b) => (b.lap - a.lap) || (a.lastCheckpoint - b.lastCheckpoint) || (a.totalTime - b.totalTime));
                const playerPosition = positions.findIndex(c => c.isPlayer) + 1;

                ctx.shadowColor = 'black'; ctx.shadowBlur = 5;
                ctx.fillStyle = 'white';
                ctx.font = '20px "Poppins"';
                ctx.textAlign = 'left';
                ctx.fillText(`Velocidade: ${(playerCar.speed * 20).toFixed(0)} km/h`, 20, 30);
                ctx.fillText(`Volta: ${Math.min(playerCar.lap, totalLaps)} / ${totalLaps}`, 20, 60);
                ctx.textAlign = 'right';
                ctx.fillText(`Posição: ${playerPosition} / ${cars.length}`, canvas.width - 20, 30);
                const totalTime = new Date(playerCar.totalTime).toISOString().substr(14, 8);
                ctx.fillText(`Tempo: ${totalTime}`, canvas.width - 20, 60);
                ctx.shadowBlur = 0;
            }

            animationFrameId = requestAnimationFrame(gameLoop);
        };
        gameLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [gameState]);

    const formatTime = (ms: number) => new Date(ms).toISOString().substr(14, 8);

    const TouchButton = ({ onTouchStart, onTouchEnd, children, className }: any) => (
        <button
            onTouchStart={(e) => { e.preventDefault(); onTouchStart(); }}
            onTouchEnd={(e) => { e.preventDefault(); onTouchEnd(); }}
            onMouseDown={(e) => { e.preventDefault(); onTouchStart(); }}
            onMouseUp={(e) => { e.preventDefault(); onTouchEnd(); }}
            className={`w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-2xl active:bg-white/40 ${className}`}
        >
            {children}
        </button>
    );

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4">
            <div className="relative w-full max-w-4xl aspect-[4/3]">
                <canvas
                    ref={canvasRef}
                    width="800"
                    height="600"
                    className="bg-green-900/50 rounded-lg border-2 border-white/10 w-full h-full"
                />
                {gameState !== 'racing' && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-lg text-center cursor-pointer" onClick={resetGame}>
                        <h2 className="text-4xl font-bold text-yellow-400 mb-4">{gameState === 'pre-race' ? 'Circuito Neon' : 'Fim da Corrida!'}</h2>
                        {gameState === 'post-race' && (
                           <>
                             <p className="text-2xl mb-2">Sua Posição: {raceResult.position}º</p>
                             <p className="text-lg mb-6">Tempo Total: {formatTime(raceResult.totalTime)}</p>
                           </>
                        )}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-6 rounded-full animate-subtle-pulse">
                            {gameState === 'pre-race' ? 'Iniciar Corrida' : 'Correr Novamente'}
                        </div>
                    </div>
                )}
                <div className="absolute bottom-4 left-4 flex gap-4 md:hidden">
                    <TouchButton onTouchStart={() => gameData.current.touch.left = true} onTouchEnd={() => gameData.current.touch.left = false}>←</TouchButton>
                    <TouchButton onTouchStart={() => gameData.current.touch.right = true} onTouchEnd={() => gameData.current.touch.right = false}>→</TouchButton>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-4 md:hidden">
                     <TouchButton onTouchStart={() => gameData.current.touch.brake = true} onTouchEnd={() => gameData.current.touch.brake = false}>↓</TouchButton>
                    <TouchButton onTouchStart={() => gameData.current.touch.gas = true} onTouchEnd={() => gameData.current.touch.gas = false}>↑</TouchButton>
                </div>
            </div>
            <p className="text-brand-gray text-sm text-center max-w-prose">
                <strong className="text-white">PC:</strong> Use as <strong className="text-white">Setas Direcionais</strong> para pilotar.
                <br />
                <strong className="text-white">Mobile:</strong> Use os <strong className="text-white">botões de toque</strong> na tela.
            </p>
        </div>
    );
};

export default RacingGame;
