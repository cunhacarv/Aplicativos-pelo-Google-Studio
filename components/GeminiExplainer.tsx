
import React, { useState } from 'react';
import { getExplanation } from '../services/geminiService';

const GeminiExplainer: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const examplePrompts = [
    "Qual a relação entre resistência e a área da seção de um fio?",
    "Explique a Lei de Ohm de forma simples.",
    "O que é resistividade elétrica?",
  ];

  const handlePromptSubmit = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setResponse('');

    const explanation = await getExplanation(prompt);

    if (explanation.startsWith("Desculpe") || explanation.startsWith("API Key")) {
      setError(explanation);
    } else {
      setResponse(explanation);
    }

    setIsLoading(false);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <section id="ai-assistant">
      <h2 className="text-3xl font-bold mb-6 text-cyan-300 border-l-4 border-cyan-400 pl-4">
        Assistente de Laboratório com IA
      </h2>
      <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-lg">
        <p className="text-gray-300 mb-2">
          Tem alguma dúvida sobre os conceitos deste laboratório? Pergunte ao assistente!
        </p>
        <div className="mb-4">
            <span className="text-sm text-gray-400 mr-2">Experimente:</span>
            {examplePrompts.map((ex, index) => (
                <button 
                    key={index}
                    onClick={() => handleExampleClick(ex)}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-cyan-300 rounded-full px-3 py-1 mr-2 mb-2 transition-colors"
                >
                    {ex}
                </button>
            ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Digite sua pergunta aqui..."
            className="flex-grow bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none resize-none"
            rows={3}
          />
          <button
            onClick={handlePromptSubmit}
            disabled={isLoading || !prompt.trim()}
            className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Pensando...' : 'Perguntar'}
          </button>
        </div>
        
        {(isLoading || response || error) && (
            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                {isLoading && <div className="flex items-center justify-center text-gray-400"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-400 mr-3"></div>Processando...</div>}
                {error && <p className="text-red-400">{error}</p>}
                {response && <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: response.replace(/\n/g, '<br />') }}></div>}
            </div>
        )}
      </div>
    </section>
  );
};

export default GeminiExplainer;
