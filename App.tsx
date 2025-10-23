
import React, { useState } from 'react';
import { ResistanceLengthEntry, ResistanceAreaEntry, OhmLawEntry } from './types';
import Header from './components/Header';
import ResistanceLengthSection from './components/ResistanceLengthSection';
import ResistanceAreaSection from './components/ResistanceAreaSection';
import OhmLawSection from './components/OhmLawSection';
import GeminiExplainer from './components/GeminiExplainer';

const App: React.FC = () => {
  const [resistanceLengthData, setResistanceLengthData] = useState<ResistanceLengthEntry[]>([
    { id: 'AB', length: 0.25, resistance: null },
    { id: 'AC', length: 0.50, resistance: null },
    { id: 'AD', length: 0.75, resistance: null },
    { id: 'AE', length: 1.00, resistance: null },
  ]);

  const [resistanceAreaData, setResistanceAreaData] = useState<ResistanceAreaEntry[]>([
    // Diameters are illustrative, based on typical AWG values.
    { id: 'Resistor 3 (AWG 22)', diameter: 0.64, area: null, resistance: null },
    { id: 'Resistor 4 (AWG 24)', diameter: 0.51, area: null, resistance: null },
    { id: 'Resistor 5 (AWG 26)', diameter: 0.40, area: null, resistance: null },
  ]);

  const [ohmLawData, setOhmLawData] = useState<OhmLawEntry[]>([
    { id: 1, voltage: 0.5, current: null },
    { id: 2, voltage: 1.0, current: null },
    { id: 3, voltage: 1.5, current: null },
    { id: 4, voltage: 2.0, current: null },
    { id: 5, voltage: 2.5, current: null },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid gap-12">
          <ResistanceLengthSection data={resistanceLengthData} setData={setResistanceLengthData} />
          <ResistanceAreaSection data={resistanceAreaData} setData={setResistanceAreaData} />
          <OhmLawSection data={ohmLawData} setData={setOhmLawData} />
          <GeminiExplainer />
        </main>
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Desenvolvido como uma ferramenta de aprendizado interativa.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
