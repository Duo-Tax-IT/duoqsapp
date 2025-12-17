
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { Search, Plus, Trash2, FileText } from 'lucide-react';

interface CaseStudy {
  id: string;
  subject: string;
  createdBy: string;
  created: string;
}

const MOCK_CASE_STUDIES: CaseStudy[] = [
  { id: '1', subject: 'Variation Claim Analysis - 50 Martin Place', createdBy: 'Quoc Duong', created: '15/09/2025' },
  { id: '2', subject: 'Cost Overrun Investigation - Concrete Supply Shortage', createdBy: 'Jack Ho', created: '12/09/2025' },
  { id: '3', subject: 'Feasibility Study Discrepancy vs Actuals (Q3)', createdBy: 'Kimberly Cuaresma', created: '10/09/2025' },
  { id: '4', subject: 'Value Management Workshop Outcomes - High Rise Project', createdBy: 'Patrick Cuaresma', created: '08/09/2025' },
  { id: '5', subject: 'Defect Liability Period - Unexpected Rectification Costs', createdBy: 'Dave Agcaoili', created: '05/09/2025' },
  { id: '6', subject: 'Extension of Time Claim Assessment - Rain Delays', createdBy: 'Angelo Encabo', created: '01/09/2025' },
  { id: '7', subject: 'Liquidated Damages Calculation - Project Omega', createdBy: 'Edrian Pardillo', created: '28/08/2025' },
  { id: '8', subject: 'Materials Price Escalation Impact Report 2025', createdBy: 'Jerald Aben', created: '25/08/2025' },
  { id: '9', subject: 'Dispute Resolution: Subcontractor Payment Default', createdBy: 'John Christian Perez', created: '20/08/2025' },
  { id: '10', subject: 'Green Star Rating Cost Benefit Analysis', createdBy: 'Rina Aquino', created: '15/08/2025' },
  { id: '11', subject: 'Heritage Facade Restoration - Budget Review', createdBy: 'Dzung Nguyen', created: '10/08/2025' },
  { id: '12', subject: 'Site Contamination Remediation Costs - Unexpected Findings', createdBy: 'Rengie Ann Argana', created: '05/08/2025' },
  { id: '13', subject: 'Incorrect Report Type Selection leading to Revision', createdBy: 'Regina De Los Reyes', created: '02/08/2025' },
  { id: '14', subject: 'Misleading notes for internal use on Complex Build', createdBy: 'Camille Centeno', created: '28/07/2025' },
  { id: '15', subject: 'Using another property\'s details without verification', createdBy: 'Rean Aquino', created: '20/07/2025' },
];

const CaseStudiesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(MOCK_CASE_STUDIES);

  const filteredStudies = caseStudies.filter(study => 
    study.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    study.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      setCaseStudies(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <TopBar 
        title="Case Studies" 
        subtitle="Manage your case studies" 
        description="Repository of past project learnings and scenarios" 
      />

      <main className="flex-1 overflow-y-auto p-6 bg-white">
        <div className="max-w-[1600px] mx-auto space-y-6">
            
            {/* Search Bar */}
            <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search case-studies..." 
                    className="w-full pl-12 pr-4 py-3 border border-gray-100 bg-gray-50/50 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-orange text-sm transition-all hover:bg-gray-50"
                />
            </div>

            {/* Create Button Row */}
            <div className="flex justify-end">
                <button className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
                    <Plus size={16} /> Create Case Study
                </button>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200">Subject</th>
                            <th className="py-3 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 w-48">Created By</th>
                            <th className="py-3 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 w-32">Created</th>
                            <th className="py-3 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider border-b border-gray-200 w-32 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredStudies.length > 0 ? (
                            filteredStudies.map((study) => (
                                <tr key={study.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="py-4 px-6 text-sm text-gray-800 font-medium">
                                        <div className="flex items-center gap-2">
                                            <FileText size={16} className="text-gray-400 group-hover:text-brand-orange transition-colors" />
                                            {study.subject}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-600">{study.createdBy}</td>
                                    <td className="py-4 px-6 text-sm text-gray-600 font-mono text-[11px]">{study.created}</td>
                                    <td className="py-4 px-6 text-right">
                                        <button 
                                            onClick={() => handleDelete(study.id)}
                                            className="inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors"
                                        >
                                            <Trash2 size={12} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-12 text-center text-gray-400 text-sm">
                                    No case studies found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Footer (Static for now as per design pattern) */}
            <div className="text-xs text-gray-400 text-center pt-4">
                Showing {filteredStudies.length} records
            </div>

        </div>
      </main>
    </div>
  );
};

export default CaseStudiesPage;
