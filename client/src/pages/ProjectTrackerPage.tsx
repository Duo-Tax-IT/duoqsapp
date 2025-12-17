
import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import { Search, ChevronDown, ArrowDown, ArrowUp, AlertCircle, CheckCircle, Clock, PlayCircle, FileText, Filter, X, Check, ArrowUpDown } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  closedBy: string;
  commencementStatus: string;
  reportType: string;
  referralAccount: string;
  accountName: string;
  address: string;
  manager: string;
  fee: string;
  date: string;
  deadline: string;
  team: string;
  secondaryTeam: string;
  color: 'pink' | 'red' | 'blue' | 'yellow' | 'green';
}

const MOCK_PROJECTS: Project[] = [
  { 
    id: '1', 
    name: 'CC382581-Como', 
    closedBy: 'Steven Leuta', 
    commencementStatus: 'In Progress', 
    reportType: 'cost estimate - progress claim report', 
    referralAccount: 'Masselos Grahame Masselos Pty Ltd', 
    accountName: '', 
    address: '30 Verona Range Como NSW 2226', 
    manager: 'James Li', 
    fee: '$990.00', 
    date: '4/12/2025',
    deadline: '12/12/2025',
    team: 'Team Red',
    secondaryTeam: '-',
    color: 'red'
  },
  { 
    id: '2', 
    name: 'CC383072-Picnic Point', 
    closedBy: 'Steven Leuta', 
    commencementStatus: 'Request Info - delayed', 
    reportType: 'cost estimate - progress claim report', 
    referralAccount: 'CT Accountants Australia', 
    accountName: '', 
    address: '33 Doris Street Picnic Point NSW 2213', 
    manager: 'Duo Tax | Referring', 
    fee: '$950.00', 
    date: '8/12/2025',
    deadline: '15/12/2025',
    team: 'Team Blue',
    secondaryTeam: 'Team Green',
    color: 'blue'
  },
  { 
    id: '3', 
    name: 'CC377733-Picnic Point', 
    closedBy: 'Steven Leuta', 
    commencementStatus: 'Completed - Awaiting Payment', 
    reportType: 'cost estimate - progress claim report', 
    referralAccount: 'CT Accountants Australia', 
    accountName: '', 
    address: '33 Doris Street Picnic Point NSW 2213', 
    manager: 'Duo Tax | Referring', 
    fee: '$950.00', 
    date: '5/11/2025',
    deadline: '12/11/2025',
    team: 'Team Green',
    secondaryTeam: '-',
    color: 'green'
  },
  { 
    id: '4', 
    name: 'CC314870-Williamstown', 
    closedBy: 'Quoc Duong', 
    commencementStatus: 'Not Started - Behind schedule', 
    reportType: 'initial cost report', 
    referralAccount: 'Google (Cost Report)', 
    accountName: '', 
    address: '38 Mount Crawford Road Williamstown SA 5351', 
    manager: 'Google', 
    fee: '$2,035.00', 
    date: '8/10/2024',
    deadline: '20/10/2024',
    team: 'Team Yellow',
    secondaryTeam: '-',
    color: 'yellow'
  },
  { 
    id: '5', 
    name: 'CC382096-Williamstown', 
    closedBy: 'Steven Leuta', 
    commencementStatus: 'Report Sent - Awaiting Account Reconciliation', 
    reportType: 'cost estimate - progress claim report', 
    referralAccount: 'Google (Cost Report)', 
    accountName: '', 
    address: '3/38 Mount Crawford Road Williamstown SA 5351', 
    manager: 'Google', 
    fee: '$990.00', 
    date: '2/12/2025',
    deadline: '10/12/2025',
    team: 'Team Pink',
    secondaryTeam: 'Team Blue',
    color: 'pink'
  },
  { 
    id: '6', 
    name: 'CC380746-North Bondi', 
    closedBy: 'Steven Leuta', 
    commencementStatus: 'Started - Behind Schedule', 
    reportType: 'council cost report', 
    referralAccount: 'Thodey Design', 
    accountName: '', 
    address: '16 Gould Street North Bondi NSW 2026', 
    manager: 'Quoc Duong', 
    fee: '$770.00', 
    date: '21/11/2025',
    deadline: '30/11/2025',
    team: 'Team Red',
    secondaryTeam: '-',
    color: 'red'
  },
  { 
    id: '7', 
    name: 'CC382839-Warnervale', 
    closedBy: 'Steven Leuta', 
    commencementStatus: 'In Progress', 
    reportType: 'initial cost report', 
    referralAccount: 'Google (Cost Report)', 
    accountName: '', 
    address: '12 Shrike Way Warnervale NSW 2259', 
    manager: 'Google', 
    fee: '$4,400.00', 
    date: '5/12/2025',
    deadline: '15/12/2025',
    team: 'Team Blue',
    secondaryTeam: '-',
    color: 'blue'
  },
  { 
    id: '8', 
    name: 'CC380088-Coombs', 
    closedBy: 'Steven Leuta', 
    commencementStatus: 'Request Info - delayed', 
    reportType: 'initial cost report - cost to complete', 
    referralAccount: 'Google (Cost Report)', 
    accountName: '', 
    address: '32 Calaby Street Coombs ACT 2611', 
    manager: 'Google', 
    fee: '$2,500.00', 
    date: '18/11/2025',
    deadline: '28/11/2025',
    team: 'Team Green',
    secondaryTeam: 'Team Red',
    color: 'green'
  },
  { 
    id: '9', 
    name: 'CC378611-Revesby', 
    closedBy: 'Steven Leuta', 
    commencementStatus: 'Report Sent - Awaiting Account Reconciliation', 
    reportType: 'cost estimate', 
    referralAccount: 'Capstone Consulting', 
    accountName: '', 
    address: '287 Milperra Road Revesby NSW 2212', 
    manager: 'Duo Tax', 
    fee: '$0.00', 
    date: '10/11/2025',
    deadline: '17/11/2025',
    team: 'Team Yellow',
    secondaryTeam: '-',
    color: 'yellow'
  },
  { 
    id: '10', 
    name: 'CC382986-Burwood', 
    closedBy: 'Steven Leuta', 
    commencementStatus: 'Not Started - Behind schedule', 
    reportType: 'insurance replacement valuation report', 
    referralAccount: 'Google (Cost Report)', 
    accountName: '', 
    address: '4 Appian Way Burwood NSW 2134', 
    manager: 'Google', 
    fee: '$1,100.00', 
    date: '8/12/2025',
    deadline: '18/12/2025',
    team: 'Team Pink',
    secondaryTeam: '-',
    color: 'pink'
  },
  { 
    id: '11', 
    name: 'CC251019-Vaucluse', 
    closedBy: 'Quoc Duong', 
    commencementStatus: 'Completed - Awaiting Payment', 
    reportType: 'council cost report', 
    referralAccount: 'Atria Designs', 
    accountName: '', 
    address: '31 Wentworth Road Vaucluse NSW 2030', 
    manager: 'Steven Ong', 
    fee: '$660.00', 
    date: '13/04/2023',
    deadline: '23/04/2023',
    team: 'Team Red',
    secondaryTeam: 'Team Yellow',
    color: 'red'
  },
  { 
    id: '12', 
    name: 'CC381785-Thrumster', 
    closedBy: 'Steven Leuta', 
    commencementStatus: 'Started - Behind Schedule', 
    reportType: 'cost estimate - progress claim report', 
    referralAccount: 'ARGO Accounting and Business Services', 
    accountName: '', 
    address: '38 Coupe Drive Thrumster NSW 2444', 
    manager: 'Kim Quach', 
    fee: '$990.00', 
    date: '28/11/2025',
    deadline: '08/12/2025',
    team: 'Team Blue',
    secondaryTeam: '-',
    color: 'blue'
  },
];

interface ProjectTrackerPageProps {
  onProjectClick?: (projectName: string) => void;
}

const ProjectTrackerPage: React.FC<ProjectTrackerPageProps> = ({ onProjectClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('All');
  
  // Sorting State
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Helper to parse "DD/MM/YYYY" from mock data to Date object
  const parseProjectDate = (dateStr: string) => {
    if (!dateStr) return null;
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;
    const [day, month, year] = parts.map(Number);
    // Create date at midnight local time
    return new Date(year, month - 1, day);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredProjects = useMemo(() => {
    // 1. Filter
    let result = MOCK_PROJECTS.filter(proj => {
      // Search Logic
      const matchesSearch = 
        proj.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        proj.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.referralAccount.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status Logic
      const matchesStatus = statusFilter === 'All' || proj.commencementStatus === statusFilter;

      // Team Logic
      const matchesTeam = teamFilter === 'All' || proj.team === teamFilter;

      return matchesSearch && matchesStatus && matchesTeam;
    });

    // 2. Sort
    if (sortConfig) {
        result.sort((a, b) => {
            if (sortConfig.key === 'date' || sortConfig.key === 'deadline') {
                const dateA = parseProjectDate(a[sortConfig.key as keyof Project] as string);
                const dateB = parseProjectDate(b[sortConfig.key as keyof Project] as string);
                
                // Handle nulls/invalids (push to bottom usually, or treat as 0)
                if (!dateA && !dateB) return 0;
                if (!dateA) return 1;
                if (!dateB) return -1;

                if (dateA < dateB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (dateA > dateB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            }
            return 0;
        });
    }

    return result;
  }, [searchQuery, statusFilter, teamFilter, sortConfig]);

  const clearAllFilters = () => {
    setStatusFilter('All');
    setTeamFilter('All');
    setSearchQuery('');
    setSortConfig(null);
  };

  const hasActiveFilters = 
    statusFilter !== 'All' || 
    teamFilter !== 'All' || 
    searchQuery !== '' || 
    sortConfig !== null;

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            <PlayCircle size={10} className="fill-blue-600 text-white" /> In Progress
          </span>
        );
      case 'Request Info - delayed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
            <AlertCircle size={10} /> Request Info - Delayed
          </span>
        );
      case 'Not Started - Behind schedule':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
            <Clock size={10} /> Not Started - Behind
          </span>
        );
      case 'Started - Behind Schedule':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            <Clock size={10} /> Started - Behind
          </span>
        );
      case 'Completed - Awaiting Payment':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <CheckCircle size={10} className="fill-green-600 text-white" /> Completed
          </span>
        );
      case 'Report Sent - Awaiting Account Reconciliation':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            <FileText size={10} /> Report Sent - Recon
          </span>
        );
      default:
        return <span className="text-gray-600">{status}</span>;
    }
  };

  const getTeamBadgeStyles = (color: string) => {
    switch (color) {
      case 'red': return 'bg-red-50 text-red-700 border-red-200';
      case 'blue': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'green': return 'bg-green-50 text-green-700 border-green-200';
      case 'yellow': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'pink': return 'bg-pink-50 text-pink-700 border-pink-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTeamColor = (teamName: string): string => {
    const lower = teamName.toLowerCase();
    if (lower.includes('red')) return 'red';
    if (lower.includes('blue')) return 'blue';
    if (lower.includes('green')) return 'green';
    if (lower.includes('yellow')) return 'yellow';
    if (lower.includes('pink')) return 'pink';
    return 'gray';
  };

  // Helper for sort icon
  const SortIcon = ({ active, direction }: { active: boolean; direction: 'asc' | 'desc' }) => {
    if (!active) return <ArrowUpDown size={12} className="ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return direction === 'asc' 
      ? <ArrowUp size={12} className="ml-1 text-brand-orange" />
      : <ArrowDown size={12} className="ml-1 text-brand-orange" />;
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <TopBar 
        title="Project Tracker" 
        subtitle="Active Projects" 
        description="Track commencement status and deadlines" 
      />

      <main className="flex-1 overflow-hidden flex flex-col p-6">
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-brand-orange w-8 h-8 rounded-md flex items-center justify-center text-white shadow-sm">
                <span className="font-bold text-lg">P</span>
            </div>
            <div>
                 <h1 className="text-xl font-bold text-gray-900 leading-none">Project Tracker</h1>
                 <button className="flex items-center gap-1 text-sm text-gray-600 mt-1 hover:text-gray-900 font-medium">
                    All Active Projects
                    <ChevronDown size={14} />
                 </button>
            </div>
          </div>
        </div>

        {/* Search Bar Row */}
        <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search projects..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange text-sm shadow-sm"
                />
            </div>
            <button className="bg-brand-orange text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-orange-600 transition-colors shadow-sm">
                Search
            </button>
        </div>

        {/* Filtering System */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                
                {/* Status Filter */}
                <div className="flex flex-col gap-1.5 w-full lg:w-auto">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <Filter size={12} /> Commencement Status
                    </label>
                    <div className="relative">
                        <select 
                           value={statusFilter}
                           onChange={(e) => setStatusFilter(e.target.value)}
                           className="w-full lg:w-64 appearance-none pl-3 pr-8 py-2 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange shadow-sm cursor-pointer"
                        >
                           <option value="All">All Statuses</option>
                           <option value="In Progress">In Progress</option>
                           <option value="Request Info - delayed">Request Info - Delayed</option>
                           <option value="Not Started - Behind schedule">Not Started - Behind</option>
                           <option value="Started - Behind Schedule">Started - Behind</option>
                           <option value="Completed - Awaiting Payment">Completed - Awaiting Payment</option>
                           <option value="Report Sent - Awaiting Account Reconciliation">Report Sent - Recon</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Team Filter */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Assign To Team</label>
                    <div className="flex items-center gap-2">
                         <button 
                            onClick={() => setTeamFilter('All')}
                            className={`px-3 py-1.5 rounded-md border text-xs font-bold transition-all shadow-sm ${teamFilter === 'All' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                         >
                            All
                         </button>
                         
                         {['Team Red', 'Team Blue', 'Team Green', 'Team Yellow', 'Team Pink'].map(team => {
                            const colorMap: Record<string, string> = {
                                'Team Red': 'bg-red-500',
                                'Team Blue': 'bg-blue-500',
                                'Team Green': 'bg-green-500',
                                'Team Yellow': 'bg-yellow-400',
                                'Team Pink': 'bg-pink-500'
                            };
                            const isActive = teamFilter === team;
                            
                            return (
                                <button 
                                key={team}
                                onClick={() => setTeamFilter(team)}
                                className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${colorMap[team]} ${isActive ? 'ring-2 ring-offset-2 ring-gray-300 scale-110' : 'opacity-80 hover:opacity-100 hover:scale-105'}`}
                                title={team}
                                >
                                {isActive && <Check size={12} className="text-white stroke-[3px]" />}
                                </button>
                            );
                         })}
                    </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <div className="lg:ml-auto pb-1">
                        <button 
                            onClick={clearAllFilters}
                            className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-md transition-colors"
                        >
                            <X size={12} /> Clear Filters
                        </button>
                    </div>
                )}

            </div>
        </div>

        {/* Sort and Filter Controls */}
        <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Sort by:</span>
                <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white hover:bg-gray-50">
                    Commencement Status
                    <ChevronDown size={14} className="text-gray-400" />
                </button>
                <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700">
                    <ArrowDown size={14} />
                    Descending
                </button>
            </div>
            <div className="ml-auto text-xs text-gray-500 font-medium">
                {filteredProjects.length} projects found
            </div>
        </div>

        {/* Main Table Area */}
        <div className="flex-1 overflow-auto border border-gray-200 rounded-t-lg bg-white shadow-sm">
            <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                    <tr>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[180px]">Opportunity Name</th>
                        
                        {/* Sortable Header: Conversion Date */}
                        <th 
                            onClick={() => handleSort('date')}
                            className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                        >
                            <div className="flex items-center">
                                Conversion Date
                                <SortIcon active={sortConfig?.key === 'date'} direction={sortConfig?.direction || 'asc'} />
                            </div>
                        </th>

                        {/* Sortable Header: Deadline Date */}
                        <th 
                            onClick={() => handleSort('deadline')}
                            className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors group select-none"
                        >
                            <div className="flex items-center">
                                Deadline Date
                                <SortIcon active={sortConfig?.key === 'deadline'} direction={sortConfig?.direction || 'asc'} />
                            </div>
                        </th>

                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[200px]">Report Type</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[220px]">Report Commencement Status</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[140px]">Assign To Team</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[160px]">Assign To Secondary Team</th>
                        <th className="py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 min-w-[250px]">Property Address On Invoice</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((proj) => (
                            <tr 
                              key={proj.id} 
                              onClick={() => onProjectClick && onProjectClick(proj.name)}
                              className="hover:bg-gray-50 transition-colors cursor-pointer group"
                            >
                                <td className="py-3 px-4 text-sm text-blue-600 group-hover:underline font-medium">
                                  {proj.name}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-700">{proj.date}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{proj.deadline}</td>
                                <td className="py-3 px-4 text-sm text-gray-700">{proj.reportType}</td>
                                <td className="py-3 px-4 text-sm">
                                    {getStatusBadge(proj.commencementStatus)}
                                </td>
                                <td className="py-3 px-4 text-sm">
                                    <span className={`inline-block px-2 py-0.5 rounded border text-[11px] font-bold ${getTeamBadgeStyles(proj.color)}`}>
                                        {proj.team}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                    {proj.secondaryTeam && proj.secondaryTeam !== '-' ? (
                                        <span className={`inline-block px-2 py-0.5 rounded border text-[11px] font-bold ${getTeamBadgeStyles(getTeamColor(proj.secondaryTeam))}`}>
                                            {proj.secondaryTeam}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 text-xs pl-2">-</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-700">{proj.address}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="py-8 text-center text-gray-500 text-sm">
                                No projects found matching the selected filters.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Footer / Pagination */}
        <div className="border border-t-0 border-gray-200 rounded-b-lg bg-gray-50 p-3 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
                <span>Showing {filteredProjects.length} loaded records of {MOCK_PROJECTS.length} total</span>
                <span className="mx-2">|</span>
                <div className="flex items-center gap-1">
                    <span>Page Size:</span>
                    <button className="bg-white border border-gray-300 rounded px-2 py-0.5 flex items-center gap-1 hover:bg-gray-50">
                        50
                        <ChevronDown size={12} />
                    </button>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded bg-white text-gray-400 cursor-not-allowed">
                    <ArrowUp size={12} className="rotate-[-45deg]" /> 
                    Previous
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded bg-white hover:bg-gray-100 text-gray-700">
                    Next
                    <ArrowDown size={12} className="rotate-[-45deg]" />
                </button>
            </div>
        </div>

      </main>
    </div>
  );
};

export default ProjectTrackerPage;
