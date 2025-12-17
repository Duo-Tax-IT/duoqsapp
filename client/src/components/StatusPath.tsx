
import React from 'react';

const STEPS = [
  'Awaiting Payment',
  'Bookings',
  'Surveying',
  'Awaiting Information',
  'Fillout',
  'Market Evidence',
  'Check',
  'Revision',
  'Job Complete'
];

interface StatusPathProps {
  currentStep: string;
}

const StatusPath: React.FC<StatusPathProps> = ({ currentStep }) => {
  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <div className="w-full overflow-x-auto bg-white border-b border-gray-200">
      <div className="flex min-w-max px-2 py-2">
        {STEPS.map((step, index) => {
          let statusColor = 'bg-gray-100 text-gray-500'; // Default Future
          let arrowColor = 'border-l-gray-100';
          
          if (index < currentIndex) {
             statusColor = 'bg-green-500 text-white'; // Completed
             arrowColor = 'border-l-green-500';
          } else if (index === currentIndex) {
             statusColor = 'bg-brand-orange text-white'; // Current
             arrowColor = 'border-l-brand-orange';
          }

          return (
            <div key={step} className="relative flex items-center h-8 mr-1 group">
               {/* Body */}
               <div className={`pl-6 pr-2 h-full flex items-center justify-center text-[10px] font-bold uppercase tracking-wider ${statusColor} ${index === 0 ? 'rounded-l pl-4' : ''}`}>
                 {step}
               </div>
               
               {/* Arrow Point */}
               <div 
                 className={`w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-l-[12px] ${arrowColor}`} 
               />
               
               {/* White Separator for Arrow overlap effect - manually positioning negative margin would be complex, simplified here */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusPath;
