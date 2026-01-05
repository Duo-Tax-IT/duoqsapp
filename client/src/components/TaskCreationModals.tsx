import React from 'react';
import { X, FileCheck, FileText, Star, User, ChevronDown, Calendar } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- Step 1: Selection Modal ---
export const CreateSelectionModal: React.FC<ModalProps & { onSelectTask: () => void }> = ({ isOpen, onClose, onSelectTask }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">What would you like to create?</h2>
              <p className="text-gray-500 mt-1 text-sm">Choose the type of item you want to create</p>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Task Card */}
            <button 
              onClick={onSelectTask}
              className="group flex flex-col items-center text-center p-8 rounded-2xl border-2 border-brand-orange bg-orange-50/50 hover:bg-orange-100/50 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-brand-orange flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <FileCheck size={32} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Task</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Action item with shared completion status for all assignees</p>
            </button>

            {/* Note Card */}
            <button className="group flex flex-col items-center text-center p-8 rounded-2xl border-2 border-transparent hover:border-purple-200 hover:bg-purple-50 transition-all">
              <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <FileText size={32} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Note</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Information requiring individual acknowledgment from each assignee</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Step 2: Form Modal ---
export const NewTaskModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800">Create New Task</h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-white transition-colors">
              <X size={20} />
            </button>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-5 max-h-[75vh] overflow-y-auto">
            <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Update cost report for Revesby"
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-100 focus:border-brand-orange outline-none transition-all shadow-sm" 
                />
            </div>

            <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Description</label>
                <textarea 
                  placeholder="Provide any context or instructions..."
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-100 focus:border-brand-orange outline-none transition-all h-28 shadow-sm" 
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Assigned To *</label>
                    <div className="relative">
                        <input type="text" placeholder="Search staff..." className="w-full border border-gray-200 rounded-lg p-3 text-sm pr-10 shadow-sm" />
                        <User size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300" />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Assigned By</label>
                    <div className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-gray-50 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-[10px] font-bold text-white">JH</div>
                             <span className="font-medium">Jack Ho</span>
                        </div>
                        <ChevronDown size={14} className="text-gray-400" />
                    </div>
                </div>
            </div>

            <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Meeting (Optional)</label>
                <div className="relative">
                    <select className="w-full border border-gray-200 rounded-lg p-3 text-sm appearance-none bg-white shadow-sm focus:ring-2 focus:ring-orange-100 outline-none">
                        <option>No meeting context</option>
                        <option>Weekly WIP meeting</option>
                        <option>Team Green Sync</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <Star size={16} className="text-brand-orange fill-brand-orange/10" />
                <div className="flex-1">
                    <p className="text-xs font-bold text-gray-700">Set Priority</p>
                    <p className="text-[10px] text-gray-500">How urgent is this task?</p>
                </div>
                <div className="flex bg-white p-1 rounded-md border border-gray-200 shadow-sm">
                    <button className="px-3 py-1 text-[10px] font-bold rounded-sm bg-gray-100 text-gray-600">Low</button>
                    <button className="px-3 py-1 text-[10px] font-bold rounded-sm bg-brand-orange text-white">Normal</button>
                    <button className="px-3 py-1 text-[10px] font-bold rounded-sm hover:bg-gray-50 text-gray-600">High</button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Status</label>
                    <select className="w-full border border-gray-200 rounded-lg p-3 text-sm shadow-sm outline-none">
                        <option>Open</option>
                        <option>Ongoing</option>
                        <option>In Review</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">% Complete</label>
                    <select className="w-full border border-gray-200 rounded-lg p-3 text-sm shadow-sm outline-none">
                        <option>0%</option>
                        <option>25%</option>
                        <option>50%</option>
                        <option>75%</option>
                        <option>100%</option>
                    </select>
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Due Date</label>
                    <div className="relative">
                        <input type="date" className="w-full border border-gray-200 rounded-lg p-3 text-sm shadow-sm outline-none" />
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50/50">
            <button onClick={onClose} className="px-6 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                Cancel
            </button>
            <button className="px-6 py-2 rounded-lg text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 transition-all shadow-md active:scale-95">
                Create Task
            </button>
        </div>
      </div>
    </div>
  );
};