
import React from 'react';
import { ChevronDown, ChevronUp, AlertCircle, Pencil, Info } from 'lucide-react';

// --- Form Section Wrapper ---
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children, icon, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
      <div 
        className="flex items-center justify-between px-4 py-2 bg-gray-50/80 border-b border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <ChevronDown size={14} className={`text-gray-400 transform transition-transform ${isOpen ? '' : '-rotate-90'}`} />
          <h3 className="text-xs font-bold text-gray-700">{title}</h3>
        </div>
        {/* Optional right side controls could go here */}
      </div>
      
      {isOpen && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};

// --- Form Row (Salesforce Style) ---
interface FormRowProps {
  label: string;
  value?: string | boolean | React.ReactNode;
  type?: 'text' | 'checkbox' | 'link' | 'multiline';
  info?: boolean;
  onEdit?: () => void;
}

export const FormRow: React.FC<FormRowProps> = ({ label, value, type = 'text', info, onEdit }) => {
  return (
    <div className="flex items-start justify-between py-2 border-b border-gray-50 min-h-[36px] group hover:bg-gray-50/50 px-2 rounded -mx-2">
      {/* Label Side */}
      <div className="flex items-center gap-1 w-1/3 pt-1">
        <span className="text-[11px] text-gray-500 font-medium truncate pr-2" title={label}>{label}</span>
        {info && <Info size={10} className="text-gray-400 flex-shrink-0" />}
      </div>
      
      {/* Value Side */}
      <div className="flex-1 flex items-start justify-between gap-2 relative pl-2">
         <div className="text-xs text-gray-800 break-words flex-1 font-normal">
            {type === 'checkbox' ? (
                <div className="pt-0.5">
                    <input 
                        type="checkbox" 
                        defaultChecked={value === true} 
                        className="rounded border-gray-300 text-brand-orange focus:ring-brand-orange h-3.5 w-3.5" 
                    />
                </div>
            ) : type === 'link' ? (
                <span className="text-blue-600 hover:underline cursor-pointer">{value}</span>
            ) : type === 'multiline' ? (
                <p className="whitespace-pre-line leading-relaxed">{value}</p>
            ) : (
                <span>{value}</span>
            )}
         </div>
         <Pencil size={10} className="text-gray-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-brand-orange transition-opacity absolute right-0 top-1" />
      </div>
    </div>
  );
};

// --- Form Input ---
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  fullWidth?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ label, error, fullWidth = true, className = '', ...props }) => {
  return (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : ''} mb-4`}>
      <label className="text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide flex justify-between">
        {label}
        {error && <span className="text-red-500 normal-case flex items-center gap-1"><AlertCircle size={10} /> {error}</span>}
      </label>
      <div className="relative">
        <input 
          className={`w-full text-sm text-gray-800 border ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50/50'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white transition-all ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

// --- Form Select ---
interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
}

export const FormSelect: React.FC<FormSelectProps> = ({ label, options, className = '', ...props }) => {
  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select 
          className={`w-full text-sm text-gray-800 border border-gray-200 bg-gray-50/50 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white appearance-none transition-all ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};

// --- Form Text Area ---
interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <textarea 
        className={`w-full text-sm text-gray-800 border border-gray-200 bg-gray-50/50 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white transition-all min-h-[80px] ${className}`}
        {...props}
      />
    </div>
  );
};

// --- Form Date Picker ---
interface FormDateProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FormDate: React.FC<FormDateProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-[11px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <input 
          type="date"
          className={`w-full text-sm text-gray-800 border border-gray-200 bg-gray-50/50 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:bg-white transition-all ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
