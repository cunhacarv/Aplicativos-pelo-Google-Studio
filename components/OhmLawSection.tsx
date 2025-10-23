
import React from 'react';
import { OhmLawEntry } from '../types';
import InfoCard from './InfoCard';
import LineChartComponent from './LineChartComponent';

interface Props {
  data: OhmLawEntry[];
  setData: React.Dispatch<React.SetStateAction<OhmLawEntry[]>>;
}

const OhmLawSection: React.FC<Props> = ({ data, setData }) => {
  const handleCurrentChange = (id: number, value: string) => {
    const currentValue = value === '' ? null : parseFloat(value);
    setData(
      data.map((entry) =>
        entry.id === id ? { ...entry, current: currentValue } : entry
      )
    );
  };

  return (
    <section id="fase2">
      <h2 className="text-3xl font-bold mb-6 text-cyan-300 border-l-4 border-cyan-400 pl-4">
        Fase II: Corrente em Função da Tensão (Lei de Ohm)
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <InfoCard title="Procedimento">
            <p>
              Varie a tensão (V) aplicada ao resistor e anote a corrente (I) correspondente. A tabela calculará a razão V/I, que representa a resistência (R) do componente. Para um resistor ôhmico, este valor deve permanecer constante.
            </p>
          </InfoCard>
          <div className="overflow-x-auto bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl shadow-lg">
            <table className="w-full text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-4">V (V)</th>
                  <th className="p-4">I (A) - Insira o valor</th>
                  <th className="p-4">V/I (Ω)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry) => (
                  <tr key={entry.id} className="border-t border-gray-700">
                    <td className="p-4">{entry.voltage.toFixed(1)}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Ex: 0.25"
                        value={entry.current ?? ''}
                        onChange={(e) => handleCurrentChange(entry.id, e.target.value)}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                      />
                    </td>
                    <td className="p-4 font-semibold text-cyan-400">
                      {entry.current !== null && entry.current !== 0 ? (entry.voltage / entry.current).toFixed(2) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <LineChartComponent
          data={data}
          xKey="current"
          yKey="voltage"
          xAxisLabel="Corrente (A)"
          yAxisLabel="Tensão (V)"
          lineName="Tensão"
        />
      </div>
    </section>
  );
};

export default OhmLawSection;
