
import React from 'react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-cyan-400 mb-3">{title}</h3>
      <div className="text-gray-300 space-y-2">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
