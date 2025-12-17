import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';

interface DataItem {
  name: string;
  count: number;
  fill: string;
}

interface MetricChartProps {
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  data: DataItem[];
  loading?: boolean;
}

const MetricChart: React.FC<MetricChartProps> = ({ title, xAxisLabel, yAxisLabel, data, loading }) => {
  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg animate-pulse">
        <span className="text-gray-400 font-medium">Loading chart data...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
              width={80}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList dataKey="count" position="right" style={{ fontSize: '12px', fill: '#6b7280', fontWeight: 'bold' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Simple Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100 justify-center">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></span>
            <span className="text-xs text-gray-600 font-medium">{item.name}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-4 text-xs text-gray-400 italic">
        <span>{yAxisLabel}</span>
        <span>{xAxisLabel}</span>
      </div>
    </div>
  );
};

export default MetricChart;