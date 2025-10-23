
import React from 'react';
import { ResistanceLengthEntry } from '../types';
import InfoCard from './InfoCard';
import LineChartComponent from './LineChartComponent';

interface Props {
  data: ResistanceLengthEntry[];
  setData: React.Dispatch<React.SetStateAction<ResistanceLengthEntry[]>>;
}

const ResistanceLengthSection: React.FC<Props> = ({ data, setData }) => {
  const handleResistanceChange = (id: string, value: string) => {
    const resistanceValue = value === '' ? null : parseFloat(value);
    setData(
      data.map((entry) =>
        entry.id === id ? { ...entry, resistance: resistanceValue } : entry
      )
    );
  };

  return (
    <section id="fase1a">
      <h2 className="text-3xl font-bold mb-6 text-cyan-300 border-l-4 border-cyan-400 pl-4">
        Fase I: Resistência em Função do Comprimento
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InfoCard title="Procedimento">
            <p>
              Anote os valores de resistência (R) medidos para diferentes comprimentos (L) do condutor. A tabela irá calcular a relação R/L, que deve ser aproximadamente constante, representando a resistência por unidade de comprimento.
            </p>
          </InfoCard>
          <div className="overflow-x-auto bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-4">Pontos</th>
                  <th className="p-4">L (m)</th>
                  <th className="p-4">R (Ω) - Insira o valor</th>
                  <th className="p-4">R/L (Ω/m)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry) => (
                  <tr key={entry.id} className="border-t border-gray-700">
                    <td className="p-4 font-mono">{entry.id}</td>
                    <td className="p-4">{entry.length.toFixed(2)}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Ex: 0.22"
                        value={entry.resistance ?? ''}
                        onChange={(e) => handleResistanceChange(entry.id, e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                      />
                    </td>
                    <td className="p-4 font-semibold text-cyan-400">
                      {entry.resistance !== null ? (entry.resistance / entry.length).toFixed(2) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <LineChartComponent
          data={data}
          xKey="length"
          yKey="resistance"
          xAxisLabel="Comprimento (m)"
          yAxisLabel="Resistência (Ω)"
          lineName="Resistência"
        />
      </div>
    </section>
  );
};

export default ResistanceLengthSection;
