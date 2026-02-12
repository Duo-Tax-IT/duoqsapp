
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { Search, ChevronDown, ArrowLeft, MoreHorizontal, User, Edit2, Check, Filter, Layers, List } from 'lucide-react';
import { FormRow, FormSection } from '../components/FormElements';

interface CCDelegateListPageProps {
  // All props now come from hooks
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
  'Georgie Mercado'
];

const STATUSES = ['Open', 'In Progress', 'Completed', 'Revision'] as const;

const CCDelegateListPage: React.FC<CCDelegateListPageProps> = () => {
  const { projectName: projectNameParam } = useParams<{ projectName: string }>();
  const navigate = useNavigate();
  const projectName = decodeURIComponent(projectNameParam || '') || 'CC382581-Como';
  const onBack = () => navigate('/project-tracker');
  const onViewOpportunity = () => navigate(`/opportunities/${encodeURIComponent(projectName)}`);
  const [activeTab, setActiveTab] = useState<'Details' | 'All Tasks'>('Details');
  const [selectedDelegate, setSelectedDelegate] = useState<string>('All Team Members');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Grouping State
  const [grouping, setGrouping] = useState<'none' | 'delegate' | 'status'>('none');

  // Generate mock tasks with random statuses for demonstration
  const tasks: Task[] = useMemo(() => {
    return TRADES_LIST.map((trade, index) => ({
        id: (index + 1).toString(),
        tradeName: trade,
        delegateName: DELEGATES[index % DELEGATES.length], // Rotate through delegates
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)] // Random status
    }));
  }, []);

  const filteredDelegateTasks = useMemo(() => {
    if (selectedDelegate === 'All Team Members') return tasks;
    return tasks.filter(t => t.delegateName === selectedDelegate);
  }, [tasks, selectedDelegate]);

  const filteredAllTasks = useMemo(() => {
    if (statusFilter === 'All') return tasks;
    return tasks.filter(t => t.status === statusFilter);
  }, [tasks, statusFilter]);

  const getStatusBadgeStyles = (status: string) => {
    switch(status) {
        case 'Completed':
            return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold';
        case 'In Progress':
            return 'bg-blue-50 text-blue-700 border-blue-200 font-bold';
        case 'Revision':
            return 'bg-red-50 text-red-700 border-red-200 font-bold';
        case 'Open':
        default:
            return 'bg-gray-50 text-gray-600 border-gray-200 font-medium';
    }
  };

  const toggleGrouping = (type: 'delegate' | 'status') => {
    setGrouping(prev => prev === type ? 'none' : type);
  };

  // Helper to render table rows with grouping support
  const renderTableRows = (data: Task[], columns: number, showCheckbox: boolean = false) => {
    if (data.length === 0) {
        return (
            <tr>
                <td colSpan={columns} className="py-8 text-center text-gray-500 text-sm border border-gray-200">
                    No tasks found.
                </td>
            </tr>
        );
    }

    if (grouping === 'none') {
        return data.map(task => renderSingleRow(task, showCheckbox));
    }

    const groups: Record<string, Task[]> = {};
    data.forEach(task => {
        const key = grouping === 'delegate' ? task.delegateName : task.status;
        if (!groups[key]) groups[key] = [];
        groups[key].push(task);
    });

    const getStatusHeaderClass = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-100 text-emerald-900 border-emerald-200';
            case 'In Progress': return 'bg-blue-100 text-blue-900 border-blue-200';
            case 'Revision': return 'bg-red-100 text-red-900 border-red-200';
            case 'Open': return 'bg-slate-200 text-slate-800 border-slate-300';
            default: return 'bg-gray-50 text-gray-800 border-gray-200';
        }
    };

    // Sort groups if grouping by status: Open -> In Progress -> Completed -> Revision
    let sortedGroups = Object.entries(groups);
    if (grouping === 'status') {
        const statusOrder = ['Open', 'In Progress', 'Completed', 'Revision'];
        sortedGroups.sort(([keyA], [keyB]) => {
            return statusOrder.indexOf(keyA) - statusOrder.indexOf(keyB);
        });
    }

    return sortedGroups.map(([group, groupTasks]) => {
        const headerClass = grouping === 'status' 
            ? getStatusHeaderClass(group)
            : 'bg-gray-50 text-gray-800 border-gray-200';
        
        return (
            <React.Fragment key={group}>
                <tr className={`${headerClass} border-b`}>
                    <td colSpan={columns} className="py-2.5 px-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        {grouping === 'delegate' ? (
                            <User size={14} className="text-gray-400" />
                        ) : (
                            <Layers size={14} className={grouping === 'status' ? "opacity-60" : "text-gray-400"} />
                        )}
                        {group} <span className="opacity-60 font-medium ml-1">({groupTasks.length})</span>
                    </td>
                </tr>
                {groupTasks.map(task => renderSingleRow(task, showCheckbox))}
            </React.Fragment>
        );
    });
  };

  const renderSingleRow = (task: Task, showCheckbox: boolean) => (
    <tr key={task.id} className="hover:bg-gray-50 transition-colors">
        {showCheckbox && (
            <td className="py-3 px-4 w-10 text-center border-r border-gray-100">
                <input type="checkbox" className="rounded border-gray-300 text-brand-orange focus:ring-brand-orange" />
            </td>
        )}
        <td className={`py-3 px-4 text-sm font-bold text-gray-900 ${showCheckbox ? 'border-r border-gray-100' : 'border border-gray-200'}`}>
            {task.tradeName}
        </td>
        <td className={`py-3 px-4 text-sm text-gray-600 ${showCheckbox ? 'border-r border-gray-100' : 'border border-gray-200'}`}>
            {task.delegateName}
        </td>
        <td className={`py-3 px-4 text-sm ${showCheckbox ? '' : 'border border-gray-200'}`}>
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] border uppercase tracking-wide ${getStatusBadgeStyles(task.status)}`}>
                {task.status}
            </span>
        </td>
    </tr>
  );

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

                                <label className="flex items-center gap-2 cursor-pointer group ml-3 mb-2">
                                    <div className="relative flex items-center">
                                        <input 
                                            type="radio" 
                                            name="delegate" 
                                            checked={selectedDelegate === 'All Team Members'} 
                                            onChange={() => setSelectedDelegate('All Team Members')}
                                            className="peer h-4 w-4 border-gray-300 text-brand-orange focus:ring-brand-orange"
                                        />
                                    </div>
                                    <span className="text-sm font-bold text-gray-800 group-hover:text-brand-orange transition-colors">All Team Members</span>
                                </label>

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

                            {/* Delegate Grouping Toggle */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative inline-flex items-center">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={grouping === 'delegate'}
                                            onChange={() => toggleGrouping('delegate')}
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-orange/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-orange"></div>
                                    </div>
                                    <span className={`text-xs font-medium transition-colors ${grouping === 'delegate' ? 'text-brand-orange font-bold' : 'text-gray-600 group-hover:text-gray-800'}`}>Group Tasks by Delegate</span>
                                </label>
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
                                <span className="text-xs text-gray-500">{filteredDelegateTasks.length} items</span>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="py-2 px-4 text-xs font-bold text-gray-600 uppercase whitespace-nowrap">
                                                Trade
                                            </th>
                                            <th className="py-2 px-4 text-xs font-bold text-gray-600 uppercase whitespace-nowrap">
                                                Delegate
                                            </th>
                                            <th className="py-2 px-4 text-xs font-bold text-gray-600 uppercase whitespace-nowrap">
                                                <div className="flex items-center justify-between gap-2">
                                                    Status
                                                    <button 
                                                        onClick={() => toggleGrouping('status')} 
                                                        title="Group by Status" 
                                                        className={`p-1 rounded transition-colors ${grouping === 'status' ? 'bg-orange-100 text-brand-orange shadow-sm' : 'hover:bg-gray-200 text-gray-400'}`}
                                                    >
                                                        <Layers size={14} />
                                                    </button>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {renderTableRows(filteredDelegateTasks, 3, false)}
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
                    <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-end md:items-center">
                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="space-y-1 flex-1 md:flex-none">
                                <label className="text-xs text-gray-500 font-medium">Assign New Delegate</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input 
                                        type="text" 
                                        placeholder="Search Contacts..." 
                                        className="w-full md:w-64 pl-9 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1 flex-1 md:flex-none">
                                <label className="text-xs text-gray-500 font-medium">Assign New Status</label>
                                <div className="relative">
                                    <select className="w-full md:w-48 py-1.5 pl-3 pr-8 border border-gray-300 rounded text-sm bg-white appearance-none focus:outline-none focus:ring-1 focus:ring-brand-orange">
                                        <option>--None--</option>
                                        <option>Completed</option>
                                        <option>In Progress</option>
                                        <option>Not Started</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter size={14} className="text-gray-400" />
                            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Filter Status:</label>
                            <div className="relative">
                                <select 
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="py-1.5 pl-3 pr-8 border border-gray-300 rounded text-xs font-bold text-gray-700 bg-gray-50 hover:bg-white transition-colors cursor-pointer outline-none focus:border-brand-orange"
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Open">Not Started / Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Revision">Revision</option>
                                </select>
                                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Table Info */}
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs text-gray-600 font-medium flex justify-between">
                        <span>{filteredAllTasks.length} items • 0 items selected</span>
                        {statusFilter !== 'All' && <span className="text-brand-orange font-bold">Filtered by: {statusFilter}</span>}
                    </div>

                    {/* Table */}
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100 sticky top-0 z-10 shadow-sm border-b border-gray-200">
                                <tr>
                                    <th className="py-2 px-4 w-10 border-r border-gray-200">
                                        <input type="checkbox" className="rounded border-gray-300 text-brand-orange focus:ring-brand-orange" />
                                    </th>
                                    <th className="py-2 px-4 text-xs font-bold text-gray-600 uppercase whitespace-nowrap border-r border-gray-200">
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                                            Trade <ChevronDown size={12} />
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 text-xs font-bold text-gray-600 uppercase whitespace-nowrap border-r border-gray-200">
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                                            Delegate <ChevronDown size={12} />
                                        </div>
                                    </th>
                                    <th className="py-2 px-4 text-xs font-bold text-gray-600 uppercase whitespace-nowrap">
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-900">
                                            Status <ChevronDown size={12} />
                                            <button 
                                                onClick={() => toggleGrouping('status')} 
                                                title="Group by Status" 
                                                className={`ml-2 p-1 rounded transition-colors ${grouping === 'status' ? 'bg-orange-100 text-brand-orange shadow-sm' : 'hover:bg-gray-200 text-gray-400'}`}
                                            >
                                                <Layers size={14} />
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {renderTableRows(filteredAllTasks, 4, true)}
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
