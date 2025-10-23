
import React from 'react';
import { ResistanceAreaEntry } from '../types';
import InfoCard from './InfoCard';

interface Props {
  data: ResistanceAreaEntry[];
  setData: React.Dispatch<React.SetStateAction<ResistanceAreaEntry[]>>;
}

const ResistanceAreaSection: React.FC<Props> = ({ data, setData }) => {
  
  const calculateArea = (diameter: number): number => {
    const radius = (diameter / 1000) / 2; // convert mm to m and get radius
    return Math.PI * Math.pow(radius, 2);
  };

  const handleResistanceChange = (id: string, value: string) => {
    const resistanceValue = value === '' ? null : parseFloat(value);
    setData(
      data.map((entry) =>
        entry.id === id ? { ...entry, resistance: resistanceValue } : entry
      )
    );
  };
  
  const handleAreaChange = (id: string, value: string) => {
    const areaValue = value === '' ? null : parseFloat(value);
    setData(
      data.map((entry) =>
        entry.id === id ? { ...entry, area: areaValue } : entry
      )
    );
  };

  React.useEffect(() => {
    setData(data.map(entry => ({ ...entry, area: calculateArea(entry.diameter) })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="fase1b">
      <h2 className="text-3xl font-bold mb-6 text-cyan-300 border-l-4 border-cyan-400 pl-4">
        Fase I: Resistência em Função da Área
      </h2>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <InfoCard title="Procedimento">
            <p>
              Para resistores de mesmo material e comprimento, a resistência (R) é inversamente proporcional à área da seção transversal (A). Calcule a área a partir do diâmetro e insira a resistência medida. O produto R·A deve ser aproximadamente constante, representando a resistividade do material multiplicada pelo comprimento.
            </p>
          </InfoCard>
          <div className="overflow-x-auto bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-4">Resistor</th>
                  <th className="p-4">A (m²)</th>
                  <th className="p-4">R (Ω)</th>
                  <th className="p-4">R·A (Ω·m²)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry) => (
                  <tr key={entry.id} className="border-t border-gray-700">
                    <td className="p-4 font-mono">{entry.id}</td>
                    <td className="p-4">
                      {entry.area ? entry.area.toExponential(2) : '-'}
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Ex: 0.35"
                        value={entry.resistance ?? ''}
                        onChange={(e) => handleResistanceChange(entry.id, e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                      />
                    </td>
                    <td className="p-4 font-semibold text-cyan-400">
                      {(entry.resistance !== null && entry.area !== null) ? (entry.resistance * entry.area).toExponential(2) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <InfoCard title="Análise Gráfica">
            <p>
              Para visualizar a relação, um gráfico de Resistência (R) versus o Inverso da Área (1/A) resultaria em uma linha reta passando pela origem. A inclinação dessa linha seria igual à resistividade (ρ) multiplicada pelo comprimento (L).
            </p>
        </InfoCard>
      </div>
    </section>
  );
};

export default ResistanceAreaSection;
