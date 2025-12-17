import React from 'react';
import TopBar from '../components/TopBar';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <TopBar 
        title={title} 
        subtitle="Under Construction" 
        description={`Manage your ${title.toLowerCase()} here.`} 
      />

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-gray-400 bg-gray-50/50">
        <div className="bg-white p-8 rounded-full shadow-sm mb-4">
            <Construction size={48} className="text-brand-orange opacity-50" />
        </div>
        <h2 className="text-lg font-semibold text-gray-600 mb-2">{title}</h2>
        <p className="max-w-md text-center text-sm">
          This page is currently being built. Check back soon for the full {title} interface.
        </p>
      </main>
    </div>
  );
};

export default PlaceholderPage;