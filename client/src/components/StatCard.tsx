
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  subtext?: string;
  icon: React.ReactNode;
  bg?: string;
  trendColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  trend, 
  subtext, 
  icon, 
  bg = 'bg-blue-50', 
  trendColor = 'text-green-600' 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
        <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
            {trend && (
                <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${trendColor}`}>
                    <TrendingUp size={12} />
                    <span>{trend}</span>
                </div>
            )}
            {subtext && <p className="text-xs text-gray-400 mt-0.5">{subtext}</p>}
        </div>
        <div className={`p-2.5 rounded-full ${bg} flex items-center justify-center`}>
            {icon}
        </div>
    </div>
  );
};

export default StatCard;
