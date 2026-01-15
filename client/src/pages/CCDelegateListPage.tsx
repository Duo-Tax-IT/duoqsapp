
import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { Search, ChevronDown, ArrowLeft, MoreHorizontal, User, Edit2, Check } from 'lucide-react';
import { FormRow, FormSection } from '../components/FormElements';

interface CCDelegateListPageProps {
  projectName: string;
  onBack: () => void;
  onViewOpportunity?: () => void;
}

interface Task {
  id: string;
  tradeName: string;
  delegateName: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Revision';
}

const TRADES_LIST = [
  'Upload to Cubit',
  'Preliminaries',
  'Demolitions',
  'Earthworks',
  'Concrete Works',
  'Reinforcement',
  'Formwork',
  'Structural Works',
  'Masonry',
  'Metalwork',
  'Aluminium Windows And Doors',
  'Doors & Door Hardware',
  'Carpentry',
  'Roofing And Roof Plumbing',
  'Hydraulic Services',
  'Electrical Services',
  'Mechanical Services',
  'Plasterboard',
  'Tiling',
  'Floor Finishes',
  'Waterproofing',
  'Sanitary Fixtures & Tapware',
  'Bathroom Accessories And Shower Screens',
  'Joinery',
  'Electrical Appliances',
  'Painting',
  'Rendering',
  'Cladding',
  'Swimming Pool',
  'Landscaping',
  'External Works',
  'G.F.A',
  'Excel Fillout'
];

const DELEGATES = [
  'Regina De Los Reyes',
  'Jamielah Villanueva',
  'Georgie Mercado',
  'Dorothy Tumbaga'
];

const STATUSES = ['Open', 'In Progress', 'Completed', 'Revision'] as const;

const CCDelegateListPage: React.FC<CCDelegateListPageProps> = ({ projectName, onBack, onViewOpportunity }) => {
  const [activeTab, setActiveTab] = useState<'Details' | 'All Tasks'>('Details');
  const [selectedDelegate, setSelectedDelegate] = useState<string>('Regina De Los Reyes');

  // Generate mock tasks with random statuses for demonstration
  const tasks: Task[] = useMemo(() => {
    return TRADES_LIST.map((trade, index) => ({
        id: (index + 1).toString(),
        tradeName: trade,
        delegateName: DELEGATES[index % DELEGATES.length], // Rotate through delegates
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)] // Random status
    }));
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => t.delegateName === selectedDelegate);
  }, [tasks, selectedDelegate]);

  const getStatusBadgeStyles = (status: string) => {
    switch(status) {
        case 'Completed':
            return 'bg-green-100 text-green-800 border-green-200';
        case 'In Progress':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Revision':
            return 'bg-red-100 text-red-800 border-red-200';
        case 'Open':
        default:
            return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-100">
      <TopBar 
        title="CC Delegate List" 
        subtitle={projectName} 
        description="Manage delegates and trade tasks" 
      />

      <div className="bg-white border-b border-gray-200 px-6 py-2 shadow-sm flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
           <button 
             onClick={onBack}
             className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-brand-orange transition-colors"
           >
             <ArrowLeft size={14} /> Back
           </button>
           <div className="flex items-center gap-3 ml-4">
             <div className="bg-orange-600 p-1.5 rounded text-white">
                <Edit2 size={16} />
             </div>
             <div>
                <div className="text-[10px] font-semibold text-gray-500 uppercase">CC Delegate List</div>
                <h1 className="text-lg font-bold text-gray-900 leading-none">{projectName} CCD List</h1>
             </div>
           </div>
        </div>
        <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded text-xs font-bold hover:bg-gray-50">
            Create Custom Trade
        </button>
      </div>

      <main className="flex-1 overflow-hidden flex flex-col">
        {/* Tabs */}
        <div className="bg-white px-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex gap-6">
                <button 
                  onClick={() => setActiveTab('Details')}
                  className={`py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'Details' ? 'border-brand-orange text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    Details
                </button>
                <button 
                  onClick={() => setActiveTab('All Tasks')}
                  className={`py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'All Tasks' ? 'border-brand-orange text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    All Tasks
                </button>
            </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
            
            {/* DETAILS TAB */}
            {activeTab === 'Details' && (
                <div className="grid grid-cols-1 min-[1100px]:grid-cols-[1fr_360px] gap-4 items-start w-full">
                    {/* Main Content (Left Column) */}
                    <div className="min-w-0 space-y-6">
                        
                        {/* Project Tracker Details Section */}
                        <FormSection title="Project Tracker Details">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                                {/* Col 1 */}
                                <div>
                                    <FormRow label="Conversion Date" value="4/12/2025" />
                                    <FormRow label="Account Name" value="Damien ." type="link" onEdit={() => {}} />
                                    <FormRow label="Deadline Date" value="" onEdit={() => {}} />
                                    <FormRow label="Non-Negotiable Deadline Date" value={false} type="checkbox" onEdit={() => {}} />
                                    <FormRow label="Awaiting Information (Don't fillout)" value={false} type="checkbox" info onEdit={() => {}} />
                                    <FormRow label="Awaiting Information Reason" value="Email from client 05/12 - to be determined by ANZ if PC is required or not." info onEdit={() => {}} />
                                    <FormRow label="Documents Reviewed" value={true} type="checkbox" info onEdit={() => {}} />
                                    <FormRow label="CC Documents Reviewed By" value="Edrian Pardillo" info onEdit={() => {}} />
                                    <FormRow label="Documents Reviewed Notes" value="(10/12/2025 EP) - Requested for Documents, Client refused to submit. Finalised report using Invoice only." onEdit={() => {}} />
                                </div>
                                {/* Col 2 */}
                                <div>
                                    <FormRow 
                                        label="CC Assign To Team" 
                                        value={
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600"></div>
                                                <span className="font-medium text-gray-800">Team Red</span>
                                            </div>
                                        } 
                                        info 
                                        onEdit={() => {}} 
                                    />
                                    <FormRow label="CC Assign To Team - Leader" value="Edrian Pardillo" info onEdit={() => {}} />
                                    <FormRow label="CC Assign to Secondary Team" value="" info onEdit={() => {}} />
                                    <FormRow label="CC Internal Take Off - Start Date" value="9/12/2025" onEdit={() => {}} />
                                    <FormRow label="CC Internal Take Off - Completion Date" value="12/12/2025" onEdit={() => {}} />
                                    <FormRow label="CC Final Review By" value="Dzung Nguyen" onEdit={() => {}} />
                                    <FormRow label="CC Internal Checking - Start Date" value="12/12/2025" onEdit={() => {}} />
                                    <FormRow label="CC Internal Checking - Completion Date" value="12/12/2025" onEdit={() => {}} />
                                </div>
                            </div>
                        </FormSection>

                        {/* Picklist Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col">
                            <h2 className="text-sm font-medium text-gray-700 mb-4 border-b border-gray-100 pb-2">Select yourself to display your tasks</h2>
                            
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-red-600 mb-1 block">* Delegate Picklist</label>
                                
                                <div className="mt-2 mb-2 pb-1 border-b border-gray-50 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Team Red</h3>
                                </div>

                                {DELEGATES.map((d) => (
                                    <label key={d} className="flex items-center gap-2 cursor-pointer group ml-3">
                                        <div className="relative flex items-center">
                                            <input 
                                                type="radio" 
                                                name="delegate" 
                                                checked={selectedDelegate === d} 
                                                onChange={() => setSelectedDelegate(d)}
                                                className="peer h-4 w-4 border-gray-300 text-brand-orange focus:ring-brand-orange"
                                            />
                                        </div>
                                        <span className="text-sm text-gray-700 group-hover:text-gray-900">{d}</span>
                                    </label>
                                ))}
                                <p className="text-xs text-red-500 mt-2">Please select a choice.</p>
                            </div>

                            <div className="flex justify-end mt-6 border-t border-gray-100 pt-4">
                                <button className="bg-brand-orange text-white px-4 py-1.5 rounded text-sm font-bold hover:bg-orange-600 transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>

                        {/* Filtered Tasks Table (Based on Picklist) */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden w-full">
                            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                <h3 className="font-bold text-sm text-gray-800">Tasks for {selectedDelegate}</h3>
                                <span className="text-xs text-gray-500">{filteredTasks.length} items</span>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-2 px-4 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                                                CC Delegate Task Name
                                            </th>
                                            <th className="py-2 px-4 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                                                Delegate
                                            </th>
                                            <th className="py-2 px-4 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                                                Trade
                                            </th>
                                            <th className="py-2 px-4 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredTasks.length > 0 ? (
                                            filteredTasks.map((task) => (
                                                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="py-2.5 px-4 text-sm text-blue-600 hover:underline cursor-pointer">
                                                        {projectName}-{task.tradeName}
                                                    </td>
                                                    <td className="py-2.5 px-4 text-sm text-blue-600 hover:underline cursor-pointer">
                                                        {task.delegateName}
                                                    </td>
                                                    <td className="py-2.5 px-4 text-sm text-gray-700">{task.tradeName}</td>
                                                    <td className="py-2.5 px-4 text-sm">
                                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadgeStyles(task.status)}`}>
                                                            {task.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="py-8 text-center text-gray-500 text-sm">
                                                    No tasks assigned to {selectedDelegate}.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Details (Right Column) */}
                    <div className="min-w-0 w-full bg-white rounded-lg shadow-sm border border-gray-200 h-fit">
                         <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                             <h3 className="text-sm font-bold text-gray-800">Details</h3>
                         </div>
                         <div className="p-4 space-y-0">
                            <FormRow 
                                label="Opportunity" 
                                value={
                                    <span 
                                        className="text-blue-600 hover:underline cursor-pointer"
                                        onClick={onViewOpportunity}
                                    >
                                        {projectName}
                                    </span>
                                }
                                onEdit={() => {}} 
                            />
                            <FormRow label="List Number" value="1" onEdit={() => {}} />
                            <FormRow label="Presets" value="" onEdit={() => {}} />
                            <FormRow label="Total Tasks" value={tasks.length.toString()} />
                            <FormRow label="Open Tasks" value="0" />
                            <FormRow label="Completed Tasks" value="0" />
                            <FormRow label="Tasks in Revision" value="0" />
                            <FormRow label="CC Delegate Preset" value="ICR: Team Red - Residential House (General) - V0" type="link" onEdit={() => {}} />
                            <FormRow label="Opportunity Open" value={true} type="checkbox" />
                            <FormRow label="CC Delegate List Name" value={`${projectName} CCD List`} onEdit={() => {}} />
                            
                            <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase mb-1">Created By</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-[10px] text-blue-600 font-bold">CC</div>
                                        <a href="#" className="text-xs text-blue-600 hover:underline">Cost Consultants</a>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-0.5">24/11/2025 1:03 PM</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase mb-1">Last Modified By</p>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-[10px] text-blue-600 font-bold">CC</div>
                                        <a href="#" className="text-xs text-blue-600 hover:underline">Cost Consultants</a>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-0.5">28/11/2025 4:47 PM</p>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            )}

            {/* ALL TASKS TAB */}
            {activeTab === 'All Tasks' && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full w-full">
                    
                    {/* Filters Header */}
                    <div className="p-4 space-y-4 border-b border-gray-200">
                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 font-medium">Assign New Delegate</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="Search Contacts..." 
                                    className="w-full pl-9 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                                />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600" size={14} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-gray-500 font-medium">Assign New Status</label>
                            <div className="relative">
                                <select className="w-full py-1.5 pl-3 pr-8 border border-gray-300 rounded text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-brand-orange">
                                    <option>--None--</option>
                                    <option>Completed</option>
                                    <option>In Progress</option>
                                    <option>Not Started</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                                <div className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-px bg-gray-300"></div>
                            </div>
                        </div>
                    </div>

                    {/* Table Info */}
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs text-gray-600 font-medium">
                        {tasks.length} items • 0 items selected
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    <th className="py-2 px-4 border-b border-gray-200 w-10">
                                        <input type="checkbox" className="rounded border-gray-300 text-brand-orange focus:ring-brand-orange" />
                                    </th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                                            CC Delegate Task Name <ChevronDown size={12} />
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                                            Delegate <ChevronDown size={12} />
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                                            Trade <ChevronDown size={12} />
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase whitespace-nowrap">
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                                            Status <ChevronDown size={12} />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tasks.map((task) => (
                                    <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-2 px-4 w-10">
                                            <input type="checkbox" className="rounded border-gray-300 text-brand-orange focus:ring-brand-orange" />
                                        </td>
                                        <td className="py-2.5 px-4 text-sm text-blue-600 hover:underline cursor-pointer">
                                            {projectName}-{task.tradeName}
                                        </td>
                                        <td className="py-2.5 px-4 text-sm text-blue-600 hover:underline cursor-pointer">
                                            {task.delegateName}
                                        </td>
                                        <td className="py-2.5 px-4 text-sm text-gray-700">{task.tradeName}</td>
                                        <td className="py-2.5 px-4 text-sm">
                                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadgeStyles(task.status)}`}>
                                                {task.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-gray-200 flex justify-end bg-gray-50 rounded-b-lg">
                        <button className="bg-brand-orange text-white px-6 py-2 rounded text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm">
                            Next
                        </button>
                    </div>

                </div>
            )}

        </div>
      </main>
    </div>
  );
};

export default CCDelegateListPage;
