
import React from 'react';
import TopBar from '../components/TopBar';
import { BookOpen, ExternalLink, Download, FileText, Monitor } from 'lucide-react';

const QuantificationManualPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      <TopBar 
        title="Quantification Manual" 
        subtitle="Standard Methods of Measurement" 
        description="Guidelines and standards for quantity surveying takeoff" 
      />

      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Main Access Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
                    <div className="bg-orange-50 p-6 rounded-2xl flex-shrink-0">
                        <BookOpen size={48} className="text-brand-orange" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide">Live Version</span>
                            <span className="text-gray-400 text-sm">Last updated: Today, 9:00 AM</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Quantification Manual 2025</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
                            The DUOQS Quantification Manual serves as the definitive guide for standard methods of measurement. 
                            It is hosted on SharePoint and optimised for the OneNote Desktop App for the best collaborative experience.
                        </p>
                        
                        <div className="flex flex-wrap gap-4">
                            <a 
                                href="https://duotax.sharepoint.com/sites/CostEstimating/_layouts/Doc.aspx?sourcedoc={4C1D39C1-095A-4755-89DB-87C676AD7BD8}&end=()" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white rounded-lg font-bold transition-colors shadow-sm"
                            >
                                <ExternalLink size={18} />
                                Open in SharePoint Online
                            </a>
                            <a 
                                href="onenote:https://duotax.sharepoint.com/sites/CostEstimating/Shared%20Documents/General/QUANTIFICATION%20MANUAL%20-%202K25/" 
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-bold transition-colors"
                            >
                                <FileText size={18} className="text-purple-700" />
                                Open in OneNote App
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Setup Instructions - Full Width now */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <Download size={20} className="text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">OneNote Setup Guide</h3>
                        <p className="text-xs text-gray-500">For first time users</p>
                    </div>
                </div>
                
                <div className="space-y-6">
                    <InstructionStep 
                        number="1" 
                        title="Open in Browser" 
                        text="Click the 'Open in SharePoint Online' button above to view the manual in your web browser first."
                    />
                    <InstructionStep 
                        number="2" 
                        title="Launch Desktop App" 
                        text="In the SharePoint toolbar, click the 'Editing' dropdown or look for 'Open in Desktop App'. This will launch OneNote." 
                    />
                    <InstructionStep 
                        number="3" 
                        title="Sync Notebook" 
                        text="Allow OneNote to fully sync the notebook. This ensures you have offline access to all trade sections." 
                    />
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 bg-gray-50 -mx-6 -mb-6 p-4 text-xs text-gray-500 flex items-center justify-between">
                    <span>Need help? Contact IT Support</span>
                    <Monitor size={14} />
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

// --- Sub Components ---

const InstructionStep: React.FC<{ number: string, title: string, text: string }> = ({ number, title, text }) => (
    <div className="flex gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-50 text-purple-600 font-bold flex items-center justify-center border border-purple-100">
            {number}
        </div>
        <div>
            <h4 className="text-sm font-bold text-gray-800 mb-1">{title}</h4>
            <p className="text-sm text-gray-600 leading-snug">{text}</p>
        </div>
    </div>
);

export default QuantificationManualPage;
