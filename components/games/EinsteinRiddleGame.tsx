import React, { useState } from 'react';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

const CATEGORIES = ['Cor', 'Nacionalidade', 'Bebida', 'Cigarro', 'Animal'];
const OPTIONS = {
    Cor: ['Amarela', 'Azul', 'Branca', 'Verde', 'Vermelha'],
    Nacionalidade: ['Alemão', 'Dinamarquês', 'Inglês', 'Norueguês', 'Sueco'],
    Bebida: ['Água', 'Café', 'Cerveja', 'Chá', 'Leite'],
    Cigarro: ['Blends', 'Blue Master', 'Dunhill', 'Pall Mall', 'Prince'],
    Animal: ['Cachorros', 'Cavalos', 'Gatos', 'Pássaros', 'Peixe'],
};
const HOUSE_COUNT = 5;

type House = {
    Cor: string;
    Nacionalidade: string;
    Bebida: string;
    Cigarro: string;
    Animal: string;
}

const initialHouses = (): House[] => Array(HOUSE_COUNT).fill(null).map(() => ({
    Cor: '', Nacionalidade: '', Bebida: '', Cigarro: '', Animal: '',
}));

const CLUES = [
    "O Inglês vive na casa Vermelha.",
    "O Sueco tem Cachorros como animais de estimação.",
    "O Dinamarquês bebe Chá.",
    "A casa Verde fica do lado esquerdo da casa Branca.",
    "O homem que vive na casa Verde bebe Café.",
    "O homem que fuma Pall Mall cria Pássaros.",
    "O homem que vive na casa Amarela fuma Dunhill.",
    "O homem que vive na casa do meio bebe Leite.",
    "O Norueguês vive na primeira casa.",
    "O homem que fuma Blends vive ao lado do que tem Gatos.",
    "O homem que cria Cavalos vive ao lado do que fuma Dunhill.",
    "O homem que fuma Blue Master bebe Cerveja.",
    "O Alemão fuma Prince.",
    "O Norueguês vive ao lado da casa Azul.",
    "O homem que fuma Blends é vizinho do que bebe Água.",
];

const SOLUTION: House[] = [
    { Cor: 'Amarela', Nacionalidade: 'Norueguês', Bebida: 'Água', Cigarro: 'Dunhill', Animal: 'Gatos' },
    { Cor: 'Azul', Nacionalidade: 'Dinamarquês', Bebida: 'Chá', Cigarro: 'Blends', Animal: 'Cavalos' },
    { Cor: 'Vermelha', Nacionalidade: 'Inglês', Bebida: 'Leite', Cigarro: 'Pall Mall', Animal: 'Pássaros' },
    { Cor: 'Verde', Nacionalidade: 'Alemão', Bebida: 'Café', Cigarro: 'Prince', Animal: 'Peixe' },
    { Cor: 'Branca', Nacionalidade: 'Sueco', Bebida: 'Cerveja', Cigarro: 'Blue Master', Animal: 'Cachorros' },
];

const EinsteinRiddleGame: React.FC = () => {
    const [houses, setHouses] = useState<House[]>(initialHouses);
    const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    const handleSelectChange = (houseIndex: number, category: keyof House, value: string) => {
        setHouses(prev => {
            const newHouses = [...prev];
            newHouses[houseIndex] = { ...newHouses[houseIndex], [category]: value };
            return newHouses;
        });
        setFeedback(null);
    };
    
    const getAvailableOptions = (category: keyof typeof OPTIONS, currentHouseValue: string) => {
        const usedOptions = houses.map(h => h[category]);
        return OPTIONS[category].filter(opt => !usedOptions.includes(opt) || opt === currentHouseValue);
    };
    
    const checkSolution = () => {
        let isCorrect = true;
        for (let i = 0; i < HOUSE_COUNT; i++) {
            for (const category of CATEGORIES as (keyof House)[]) {
                if (houses[i][category] !== SOLUTION[i][category]) {
                    isCorrect = false;
                    break;
                }
            }
            if (!isCorrect) break;
        }

        if (isCorrect) {
            setFeedback({ message: 'Correto! O Alemão é o dono do Peixe.', type: 'success' });
        } else {
            setFeedback({ message: 'Incorreto. Verifique as dicas e tente novamente.', type: 'error' });
        }
    };
    
    const resetGame = () => {
        setHouses(initialHouses());
        setFeedback(null);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start p-2 sm:p-4 text-white">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Teste de Einstein</h2>
            <p className="text-sm text-brand-gray mb-6 text-center max-w-2xl">Use as dicas para preencher a grade. A pergunta é: Quem é o dono do peixe?</p>
            
            <div className="flex flex-col items-center gap-8 w-full">
                {/* Grid */}
                <div className="w-full overflow-x-auto scrollbar-custom">
                    <div className="flex gap-2 min-w-[600px] md:min-w-full md:justify-center">
                        <div className="flex flex-col justify-end space-y-2 pt-8 text-right pr-2">
                            {CATEGORIES.map(cat => <div key={cat} className="h-10 flex items-center justify-end font-semibold text-sm">{cat}</div>)}
                        </div>
                        {houses.map((house, houseIndex) => (
                            <div key={houseIndex} className="flex-1 flex flex-col items-center space-y-2 min-w-[100px]">
                                <h3 className="font-bold text-center h-8">Casa #{houseIndex + 1}</h3>
                                {(CATEGORIES as (keyof House)[]).map(category => (
                                    <div key={category} className="relative w-full">
                                        <select
                                            value={house[category]}
                                            onChange={(e) => handleSelectChange(houseIndex, category, e.target.value)}
                                            className="w-full h-10 rounded-md bg-white/10 border border-white/20 pl-3 pr-8 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none cursor-pointer"
                                        >
                                            <option className="bg-brand-dark text-brand-gray" value="">Selecione</option>
                                            {getAvailableOptions(category, house[category]).map(opt => (
                                                <option className="bg-brand-dark text-white" key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <ChevronDownIcon className="w-5 h-5 text-brand-gray" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Clues */}
                <div className="w-full max-w-4xl">
                    <h3 className="font-bold mb-2 text-center md:text-left">Dicas</h3>
                    <ul className="text-sm text-brand-gray space-y-1.5 sm:columns-2 md:columns-3">
                        {CLUES.map((clue, index) => <li key={index} className="break-inside-avoid">{index + 1}. {clue}</li>)}
                    </ul>
                </div>
            </div>
            
            {/* Controls */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                <button 
                    onClick={checkSolution} 
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform"
                >
                    Verificar Resposta
                </button>
                <button 
                    onClick={resetGame}
                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform"
                >
                    Reiniciar
                </button>
            </div>

            {feedback && (
                <div className={`mt-4 p-3 rounded-lg text-center font-semibold text-sm w-full max-w-md
                    ${feedback.type === 'success' ? 'bg-green-500/20 text-green-300' : ''}
                    ${feedback.type === 'error' ? 'bg-red-500/20 text-red-300' : ''}
                `}>
                    {feedback.message}
                </div>
            )}
        </div>
    );
};

export default EinsteinRiddleGame;