
import React, { useRef, useEffect, useState, useCallback } from 'react';

const PongGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scores, setScores] = useState({ player: 0, ai: 0 });
    const [winner, setWinner] = useState<string | null>(null);
    const isDragging = useRef(false);

    const gameState = useRef({
        ball: { x: 200, y: 300, dx: 3, dy: 3, radius: 8 },
        player: { x: 150, y: 575, width: 100, height: 15 },
        ai: { x: 150, y: 10, width: 100, height: 15, speed: 2.5 },
        gameRunning: true,
    });

    const resetBall = useCallback((direction: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        gameState.current.ball.x = canvas.width / 2;
        gameState.current.ball.y = canvas.height / 2;
        gameState.current.ball.dy = 3 * direction;
        gameState.current.ball.dx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 1);
    }, []);

    const resetGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        setScores({ player: 0, ai: 0 });
        setWinner(null);
        gameState.current.player.x = canvas.width / 2 - gameState.current.player.width / 2;
        gameState.current.ai.x = canvas.width / 2 - gameState.current.ai.width / 2;
        gameState.current.gameRunning = true;
        isDragging.current = false;
        resetBall(1);
    }, [resetBall]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const updatePlayerPosition = (clientX: number) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            let newX = (clientX - rect.left) * scaleX;
            gameState.current.player.x = newX - gameState.current.player.width / 2;
        };
        
        const handleMouseDown = (e: MouseEvent) => {
            if (gameState.current.gameRunning) {
                isDragging.current = true;
                updatePlayerPosition(e.clientX);
            }
        };
        const handleMouseUp = () => {
            isDragging.current = false;
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (gameState.current.gameRunning && isDragging.current) {
                updatePlayerPosition(e.clientX);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
             if (e.touches.length > 0 && gameState.current.gameRunning) {
                e.preventDefault();
                isDragging.current = true;
                updatePlayerPosition(e.touches[0].clientX);
            }
        };
        const handleTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            isDragging.current = false;
        };
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0 && gameState.current.gameRunning && isDragging.current) {
                e.preventDefault();
                updatePlayerPosition(e.touches[0].clientX);
            }
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);
        
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
        
        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchend', handleTouchEnd);
            canvas.removeEventListener('touchmove', handleTouchMove);
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;
        
        let animationFrameId: number;

        const gameLoop = () => {
            if (!gameState.current.gameRunning) {
                ctx.fillStyle = 'rgba(10, 10, 10, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'white';
                ctx.font = '50px "Poppins", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(`${winner} Venceu!`, canvas.width / 2, canvas.height / 2 - 30);
                ctx.font = '20px "Poppins", sans-serif';
                ctx.fillText('Clique para jogar novamente', canvas.width / 2, canvas.height / 2 + 20);
                return;
            }

            ctx.fillStyle = '#0a0a0a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.setLineDash([10, 10]);
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
            ctx.setLineDash([]);
            
            const { ball, player, ai } = gameState.current;
            ball.x += ball.dx;
            ball.y += ball.dy;

            if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                ball.dx *= -1;
            }

            if (ball.y + ball.radius > canvas.height) {
                setScores(s => ({...s, ai: s.ai + 1}));
                resetBall(-1);
            }
            if (ball.y - ball.radius < 0) {
                setScores(s => ({...s, player: s.player + 1}));
                resetBall(1);
            }

            if (ball.y + ball.radius > player.y && ball.x > player.x && ball.x < player.x + player.width) {
                ball.dy = -Math.abs(ball.dy) * 1.02;
            }
            if (ball.y - ball.radius < ai.y + ai.height && ball.x > ai.x && ball.x < ai.x + ai.width) {
                ball.dy = Math.abs(ball.dy) * 1.02;
            }

            const aiCenter = ai.x + ai.width / 2;
            if (aiCenter < ball.x - 10) ai.x += ai.speed;
            else if (aiCenter > ball.x + 10) ai.x -= ai.speed;

            player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
            ai.x = Math.max(0, Math.min(canvas.width - ai.width, ai.x));
            
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#fff'; ctx.shadowColor = '#fff'; ctx.shadowBlur = 15;
            ctx.fill(); ctx.shadowBlur = 0;

            ctx.fillStyle = '#00FFFF'; ctx.shadowColor = '#00FFFF'; ctx.shadowBlur = 10;
            ctx.fillRect(player.x, player.y, player.width, player.height);
            ctx.fillStyle = '#FF00FF'; ctx.shadowColor = '#FF00FF'; ctx.shadowBlur = 10;
            ctx.fillRect(ai.x, ai.y, ai.width, ai.height);
            ctx.shadowBlur = 0;

            animationFrameId = requestAnimationFrame(gameLoop);
        };

        gameLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [winner, resetBall]);
    
    useEffect(() => {
        if (scores.player >= 5) {
            setWinner('Jogador');
            gameState.current.gameRunning = false;
            isDragging.current = false;
        } else if (scores.ai >= 5) {
            setWinner('Computador');
            gameState.current.gameRunning = false;
            isDragging.current = false;
        }
    }, [scores]);

    const handleCanvasClick = () => {
        if (!gameState.current.gameRunning) {
            resetGame();
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="flex justify-around items-center w-full max-w-sm mb-2 p-2 bg-white/5 rounded-lg border border-white/10 text-center text-2xl font-bold">
                 <div className="w-1/2">
                    <span className="text-cyan-400">{scores.player}</span>
                 </div>
                 <div className="w-px h-8 bg-white/20"></div>
                 <div className="w-1/2">
                    <span className="text-pink-400">{scores.ai}</span>
                 </div>
            </div>
            <canvas
                ref={canvasRef}
                width="400"
                height="600"
                className="bg-brand-dark/50 rounded-lg border-2 border-white/10 max-w-full cursor-grab active:cursor-grabbing"
                onClick={handleCanvasClick}
            />
            <p className="text-brand-gray text-sm text-center">Clique e <strong className="text-white">arraste o mouse</strong> ou <strong className="text-white">deslize o dedo</strong> para controlar. O primeiro a fazer 5 pontos vence.</p>
        </div>
    );
};

export default PongGame;
