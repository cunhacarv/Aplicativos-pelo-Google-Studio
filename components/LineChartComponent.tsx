
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

interface ChartProps<T,> {
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  xAxisLabel: string;
  yAxisLabel: string;
  lineName: string;
}

const LineChartComponent = <T,>({ data, xKey, yKey, xAxisLabel, yAxisLabel, lineName }: ChartProps<T>) => {
  // Filter out data points where yKey is null or undefined
  const validData = data.filter(item => item[yKey] != null);
  
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 shadow-lg h-80 w-full">
      <ResponsiveContainer>
        <LineChart
          data={validData}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 25,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey={xKey as string} stroke="#A0AEC0">
            <Label value={xAxisLabel} offset={-20} position="insideBottom" fill="#A0AEC0" />
          </XAxis>
          <YAxis stroke="#A0AEC0">
             <Label value={yAxisLabel} angle={-90} position="insideLeft" style={{ textAnchor: 'middle', fill: '#A0AEC0' }} />
          </YAxis>
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                borderColor: '#4A5568',
                color: '#E5E7EB'
            }} 
          />
          <Legend wrapperStyle={{ color: '#E5E7EB' }} />
          <Line type="monotone" dataKey={yKey as string} name={lineName} stroke="#2DD4BF" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
