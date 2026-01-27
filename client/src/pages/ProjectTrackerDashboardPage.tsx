
import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import DashboardCard from '../components/DashboardCard';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, LabelList
} from 'recharts';
import { Filter, Maximize2, RefreshCw, Search, User, ChevronDown, Clock, FileText } from 'lucide-react';

// --- Colors ---
const PROJECT_COLORS: Record<string, string> = {
  'CC381808-Vida Estate': '#8b5cf6', // Purple
  'CC385812-Hoxton Park': '#14b8a6', // Teal
  'CC386002-Terrey Hills': '#22c55e', // Green
  'CC386500-Frankston South': '#ef4444', // Red
  'CC386674-Lidcombe': '#3b82f6', // Blue
  'CC386821-Skye': '#60a5fa', // Light Blue
  'CC386912-Asquith': '#1e40af', // Dark Blue
  'CC387131-Merrylands': '#f97316', // Orange
  'CC388035-Parramatta': '#eab308', // Yellow
};

// --- Team Mapping ---
const PROJECT_TEAMS: Record<string, string> = {
  'CC381808-Vida Estate': 'Team Pink',
  'CC385812-Hoxton Park': 'Team Green',
  'CC386002-Terrey Hills': 'Team Green',
  'CC386500-Frankston South': 'Team Red',
  'CC386674-Lidcombe': 'Team Blue',
  'CC386821-Skye': 'Team Blue',
  'CC386912-Asquith': 'Team Blue',
  'CC387131-Merrylands': 'Team Yellow',
  'CC388035-Parramatta': 'Team Yellow',
};

// --- Team Colors (Requested Specifics) ---
const TEAM_COLORS_MAP: Record<string, string> = {
    'Team Pink': '#ec4899',   // Pink
    'Team Green': '#22c55e',  // Green
    'Team Red': '#ef4444',    // Red
    'Team Blue': '#3b82f6',   // Blue
    'Team Yellow': '#eab308', // Yellow
};

// --- Project Details (Deadlines, Priority, & Report Type) ---
const PROJECT_DETAILS: Record<string, { deadline: string; priority: string; reportType: string }> = {
  'CC381808-Vida Estate': { deadline: '15/02/2026', priority: 'High', reportType: 'Detailed Cost Report' },
  'CC385812-Hoxton Park': { deadline: '20/02/2026', priority: 'Medium', reportType: 'Initial Cost Report' },
  'CC386002-Terrey Hills': { deadline: '25/02/2026', priority: 'Medium', reportType: 'Cost Estimate - Progress Claim Report' },
  'CC386500-Frankston South': { deadline: '10/03/2026', priority: 'Low', reportType: 'Council Cost Report' },
  'CC386674-Lidcombe': { deadline: '28/02/2026', priority: 'High', reportType: 'Detailed Cost Report - Cost to Complete' },
  'CC386821-Skye': { deadline: '22/02/2026', priority: 'High', reportType: 'Preliminary Cost Estimate' },
  'CC386912-Asquith': { deadline: '01/03/2026', priority: 'Low', reportType: 'Insurance replacement valuation report' },
  'CC387131-Merrylands': { deadline: '05/03/2026', priority: 'Low', reportType: 'Cost Estimate' },
  'CC388035-Parramatta': { deadline: '08/03/2026', priority: 'Low', reportType: 'Initial Cost Report - Cost to Complete' },
};

// --- Mock Data ---

// Chart 1 Data: Stacked by Delegate
const DATA_DELEGATION_TASKS = [
  { name: '-', 'CC386912-Asquith': 1 },
  { name: 'Anamie Rance', 'CC386674-Lidcombe': 7 },
  { name: 'Ariel Monsalud', 'CC386674-Lidcombe': 10, 'CC381808-Vida Estate': 4 },
  { name: 'Camille Centeno', 'CC386674-Lidcombe': 9 },
  { name: 'Daniel Venus', 'CC381808-Vida Estate': 1, 'CC385812-Hoxton Park': 7, 'CC386674-Lidcombe': 7 },
  { name: 'Danilo Jr de la Cruz', 'CC385812-Hoxton Park': 3, 'CC381808-Vida Estate': 9, 'CC386500-Frankston South': 8, 'CC388035-Parramatta': 11 },
  { name: 'Georgie Mercado', 'CC386500-Frankston South': 5 },
  { name: 'Ian Joseph Larinay', 'CC386674-Lidcombe': 7 },
  { name: 'Jamielah Villanueva', 'CC386500-Frankston South': 9 },
  { name: 'Jennifer Espalmado', 'CC381808-Vida Estate': 10, 'CC388035-Parramatta': 5, 'CC387131-Merrylands': 6 },
  { name: 'Myra Manalac', 'CC386002-Terrey Hills': 4, 'CC386674-Lidcombe': 6, 'CC388035-Parramatta': 9 },
  { name: 'Nexierose Baluyot', 'CC381808-Vida Estate': 9, 'CC388035-Parramatta': 4 },
  { name: 'Patrick Cuaresma', 'CC386002-Terrey Hills': 4, 'CC386674-Lidcombe': 10, 'CC388035-Parramatta': 5 },
  { name: 'Rean Aquino', 'CC388035-Parramatta': 4 },
  { name: 'Regina De Los Reyes', 'CC386500-Frankston South': 8, 'CC388035-Parramatta': 4 },
  { name: 'Rica Galit', 'CC386674-Lidcombe': 20 },
];

// Chart 2 Data: By Project
const DATA_PROJECT_OVERVIEW = [
  { name: 'CC386821-Skye', value: 24 },
  { name: 'CC386674-Lidcombe', value: 33 },
  { name: 'CC386912-Asquith', value: 32 },
  { name: 'CC381808-Vida Estate', value: 1 },
  { name: 'CC386002-Terrey Hills', value: 15 },
  { name: 'CC385812-Hoxton Park', value: 3 },
  { name: 'CC387131-Merrylands', value: 27 },
  { name: 'CC388035-Parramatta', value: 29 },
  { name: 'CC386500-Frankston South', value: 22 },
];

// Chart 3 Data: By Delegate (Static base for dropdowns, chart data is now derived)
const DATA_DELEGATE_OVERVIEW = [
  { name: '-', value: 1 },
  { name: 'Anamie Rance', value: 7 },
  { name: 'Ariel Monsalud', value: 14 },
  { name: 'Camille Centeno', value: 9 },
  { name: 'Daniel Venus', value: 15 },
  { name: 'Danilo Jr de la Cruz', value: 31 },
  { name: 'Georgie Mercado', value: 5 },
  { name: 'Ian Joseph Larinay', value: 7 },
  { name: 'Jamielah Villanueva', value: 9 },
  { name: 'Jennifer Espalmado', value: 21 },
  { name: 'Myra Manalac', value: 19 },
  { name: 'Nexierose Baluyot', value: 13 },
  { name: 'Patrick Cuaresma', value: 19 },
  { name: 'Rean Aquino', value: 4 },
  { name: 'Regina De Los Reyes', value: 12 },
  { name: 'Rica Galit', value: 20 },
];

// Mock Data for Staff Workload
const STAFF_WORKLOAD_MOCK: Record<string, {name: string, value: number, fill: string, deadline: string}[]> = {
    'Anamie Rance': [
        { name: 'CC386821-Skye', value: 7, fill: '#3b82f6', deadline: '22/02/2026' }
    ],
    'Ariel Monsalud': [
        { name: 'CC386674-Lidcombe', value: 10, fill: '#3b82f6', deadline: '28/02/2026' },
        { name: 'CC381808-Vida Estate', value: 4, fill: '#8b5cf6', deadline: '15/02/2026' }
    ],
    'Daniel Venus': [
        { name: 'CC381808-Vida Estate', value: 1, fill: '#8b5cf6', deadline: '15/02/2026' },
        { name: 'CC385812-Hoxton Park', value: 7, fill: '#14b8a6', deadline: '20/02/2026' },
        { name: 'CC386674-Lidcombe', value: 7, fill: '#3b82f6', deadline: '28/02/2026' }
    ],
    'Danilo Jr de la Cruz': [
        { name: 'CC385812-Hoxton Park', value: 3, fill: '#14b8a6', deadline: '20/02/2026' },
        { name: 'CC381808-Vida Estate', value: 9, fill: '#8b5cf6', deadline: '15/02/2026' },
        { name: 'CC386500-Frankston South', value: 8, fill: '#ef4444', deadline: '10/03/2026' },
        { name: 'CC388035-Parramatta', value: 11, fill: '#eab308', deadline: '05/03/2026' }
    ]
};

const ProjectTrackerDashboardPage: React.FC = () => {
  const [activeTeamFilter, setActiveTeamFilter] = useState('All Teams');
  const [activePriorityFilter, setActivePriorityFilter] = useState('All Priorities');
  const [activeReportTypeFilter, setActiveReportTypeFilter] = useState('All Types');
  const [selectedStaffWorkload, setSelectedStaffWorkload] = useState('Anamie Rance');
  const [selectedDelegateFilter, setSelectedDelegateFilter] = useState('All Staff');

  // --- Filtering Logic ---

  // 1. Identify which projects belong to the active filter
  const visibleProjects = useMemo(() => {
    let projects = Object.keys(PROJECT_COLORS);

    if (activeTeamFilter !== 'All Teams') {
      projects = projects.filter(project => PROJECT_TEAMS[project] === activeTeamFilter);
    }

    if (activePriorityFilter !== 'All Priorities') {
        projects = projects.filter(project => PROJECT_DETAILS[project]?.priority === activePriorityFilter);
    }

    if (activeReportTypeFilter !== 'All Types') {
        projects = projects.filter(project => PROJECT_DETAILS[project]?.reportType === activeReportTypeFilter);
    }

    return projects;
  }, [activeTeamFilter, activePriorityFilter, activeReportTypeFilter]);

  // 2. Filter Stacked Bar Data (Chart 1): Only keep delegates that have values in visible projects
  const filteredDelegationTasks = useMemo(() => {
    return DATA_DELEGATION_TASKS.filter(task => {
        // Cast to any to allow string indexing
        const t = task as any;
        // Check if any of the visible projects have a value > 0 for this delegate
        return visibleProjects.some(project => t[project] && t[project] > 0);
    });
  }, [visibleProjects]);

  // 3. Filter Project Overview (Chart 2): Only keep visible projects
  const filteredProjectOverview = useMemo(() => {
    return DATA_PROJECT_OVERVIEW.filter(item => visibleProjects.includes(item.name));
  }, [visibleProjects]);

  // 4. Calculate Delegate Overview for Chart 3 (Functional Mock Data)
  const teamFilteredDelegateData = useMemo(() => {
      // Derive from the main delegation tasks to respect team filtering
      return DATA_DELEGATION_TASKS.map(task => {
          const t = task as any;
          let total = 0;
          visibleProjects.forEach(project => {
              if (t[project]) total += t[project];
          });
          return { name: task.name, value: total };
      }).filter(item => item.value > 0);
  }, [visibleProjects]);

  // 5. Apply Staff Filter to Chart 3
  const finalDelegateChartData = useMemo(() => {
      if (selectedDelegateFilter === 'All Staff') {
          return teamFilteredDelegateData;
      }
      return teamFilteredDelegateData.filter(d => d.name === selectedDelegateFilter);
  }, [teamFilteredDelegateData, selectedDelegateFilter]);

  // 6. Drilldown Tasks Logic (Dynamic Sidebar)
  const drilldownTasks = useMemo(() => {
    const projectCounts: Record<string, number> = {};
    
    // Determine which delegates to consider
    const relevantDelegates = selectedDelegateFilter === 'All Staff'
        ? filteredDelegationTasks
        : filteredDelegationTasks.filter(d => d.name === selectedDelegateFilter);

    // Aggregate task counts by project for relevant delegates
    relevantDelegates.forEach(delegate => {
        const d = delegate as any;
        Object.keys(d).forEach(key => {
            if (key !== 'name' && visibleProjects.includes(key) && typeof d[key] === 'number') {
                projectCounts[key] = (projectCounts[key] || 0) + d[key];
            }
        });
    });

    // Convert to array
    const tasks = Object.entries(projectCounts).map(([project, count]) => {
        const team = PROJECT_TEAMS[project];
        // Use team color map or fallback to project color
        const color = TEAM_COLORS_MAP[team] || PROJECT_COLORS[project] || '#9ca3af';
        
        return {
            project,
            count,
            deadline: PROJECT_DETAILS[project]?.deadline || 'TBD',
            reportType: PROJECT_DETAILS[project]?.reportType || '-',
            color
        };
    });

    return tasks.sort((a, b) => b.count - a.count);
  }, [filteredDelegationTasks, selectedDelegateFilter, visibleProjects]);

  // 7. Filter Staff Workload (Individual Staff Card) based on visible projects
  const currentStaffData = useMemo(() => {
      const staffProjects = STAFF_WORKLOAD_MOCK[selectedStaffWorkload] || [];
      return staffProjects.filter(project => visibleProjects.includes(project.name));
  }, [selectedStaffWorkload, visibleProjects]);

  const totalStaffTasks = currentStaffData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar 
        title="Project Tracker Dashboard" 
        subtitle="Overview" 
        description="Track delegation and workload across teams"
      />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-[1920px] mx-auto space-y-6 pb-20">
          
          {/* Row 1: Individual Staff Workload (Full Width) */}
          <DashboardCard className="flex flex-col h-[450px] p-6">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                 <div className="flex items-center gap-3">
                     <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <User size={20} />
                     </div>
                     <div>
                         <h3 className="text-base font-bold text-gray-800">Individual Staff Workload</h3>
                         <p className="text-xs text-gray-500">Breakdown of assigned projects per delegate</p>
                     </div>
                 </div>
                 
                 <div className="flex flex-col items-end gap-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Team Member</label>
                    <div className="relative w-64">
                        <select 
                            value={selectedStaffWorkload}
                            onChange={(e) => setSelectedStaffWorkload(e.target.value)}
                            className="w-full appearance-none bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-bold py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                        >
                            {DATA_DELEGATE_OVERVIEW.filter(d => d.name !== '-').map(d => (
                                <option key={d.name} value={d.name}>{d.name}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                            <ChevronDown size={14} />
                        </div>
                    </div>
                 </div>
             </div>

             <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-8 overflow-hidden">
                {/* Left: Project List */}
                <div className="w-full lg:w-1/3 flex flex-col min-h-0">
                    <div className="flex justify-between items-center mb-2 px-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Projects</span>
                        <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{totalStaffTasks} Total Tasks</span>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                        {currentStaffData.length > 0 ? (
                            currentStaffData.map((project, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg hover:border-blue-200 transition-colors group shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: project.fill }}></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600">{project.name}</span>
                                            <span className="text-[10px] text-red-500 font-medium">Deadline: {project.deadline}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100">{project.value}</span>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-xs text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                No active projects for this user match current filters.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Chart */}
                <div className="w-full lg:w-2/3 h-full border border-gray-100 rounded-xl bg-gray-50/30 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            layout="vertical"
                            data={currentStaffData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            barSize={20}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                            <XAxis type="number" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                            <YAxis type="category" dataKey="name" hide />
                            <Tooltip 
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} background={{ fill: '#f3f4f6' }}>
                                <Cell fill="#3b82f6" />
                                <LabelList dataKey="name" position="insideLeft" style={{ fontSize: '10px', fill: '#fff', fontWeight: 'bold' }} />
                                <LabelList dataKey="value" position="right" style={{ fontSize: '12px', fill: '#6b7280', fontWeight: 'bold' }} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
             </div>
          </DashboardCard>

          {/* Filter Bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-2 flex flex-col xl:flex-row xl:items-center gap-4 shadow-sm">
             <div className="flex items-center gap-2">
                 <div className="flex items-center gap-2 px-3 border-r border-gray-200 h-6">
                    <Filter size={16} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Team</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    <FilterButton label="All Teams" color="black" active={activeTeamFilter === 'All Teams'} onClick={() => setActiveTeamFilter('All Teams')} />
                    <FilterButton label="Team Red" color="red" active={activeTeamFilter === 'Team Red'} onClick={() => setActiveTeamFilter('Team Red')} />
                    <FilterButton label="Team Blue" color="blue" active={activeTeamFilter === 'Team Blue'} onClick={() => setActiveTeamFilter('Team Blue')} />
                    <FilterButton label="Team Yellow" color="yellow" active={activeTeamFilter === 'Team Yellow'} onClick={() => setActiveTeamFilter('Team Yellow')} />
                    <FilterButton label="Team Green" color="green" active={activeTeamFilter === 'Team Green'} onClick={() => setActiveTeamFilter('Team Green')} />
                    <FilterButton label="Team Pink" color="pink" active={activeTeamFilter === 'Team Pink'} onClick={() => setActiveTeamFilter('Team Pink')} />
                 </div>
             </div>

             <div className="hidden xl:block w-px h-6 bg-gray-200"></div>

             <div className="flex items-center gap-2">
                 <div className="flex items-center gap-2 px-3 border-r border-gray-200 h-6">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Priority</span>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    <FilterButton label="All Priorities" color="black" active={activePriorityFilter === 'All Priorities'} onClick={() => setActivePriorityFilter('All Priorities')} />
                    <FilterButton label="High" color="red" active={activePriorityFilter === 'High'} onClick={() => setActivePriorityFilter('High')} />
                    <FilterButton label="Medium" color="yellow" active={activePriorityFilter === 'Medium'} onClick={() => setActivePriorityFilter('Medium')} />
                    <FilterButton label="Low" color="green" active={activePriorityFilter === 'Low'} onClick={() => setActivePriorityFilter('Low')} />
                 </div>
             </div>

             <div className="hidden xl:block w-px h-6 bg-gray-200"></div>

             <div className="flex items-center gap-2">
                 <div className="flex items-center gap-2 px-3 border-r border-gray-200 h-6">
                    <FileText size={16} className="text-gray-400" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Report Type</span>
                 </div>
                 <div className="relative">
                     <select 
                        value={activeReportTypeFilter}
                        onChange={(e) => setActiveReportTypeFilter(e.target.value)}
                        className="appearance-none bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold py-1.5 pl-3 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
                     >
                        <option value="All Types">All Types</option>
                        <option value="Initial Cost Report">Initial Cost Report</option>
                        <option value="Cost Estimate - Progress Claim Report">Cost Estimate - Progress Claim Report</option>
                        <option value="Preliminary Cost Estimate">Preliminary Cost Estimate</option>
                        <option value="Cost Estimate">Cost Estimate</option>
                        <option value="Council Cost Report">Council Cost Report</option>
                        <option value="Detailed Cost Report">Detailed Cost Report</option>
                        <option value="Detailed Cost Report - Client Side">Detailed Cost Report - Client Side</option>
                        <option value="Detailed Cost Report - Cost to Complete">Detailed Cost Report - Cost to Complete</option>
                        <option value="Initial Cost Report - Cost to Complete">Initial Cost Report - Cost to Complete</option>
                        <option value="Insurance replacement valuation report">Insurance replacement valuation report</option>
                     </select>
                     <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                 </div>
             </div>
          </div>

          {/* Row 2: Main Stats Charts (Original Top Row) */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Big Chart: Stacked Delegation Tasks */}
              <DashboardCard className="xl:col-span-2 flex flex-col h-[500px] relative p-6">
                 <div className="flex justify-between items-start mb-4">
                     <div>
                         <h3 className="text-base font-bold text-gray-800">
                             Open CC Delegation Tasks <span className="text-gray-400 font-normal">
                                 ({activeTeamFilter !== 'All Teams' ? activeTeamFilter : 'All'} • {activePriorityFilter !== 'All Priorities' ? activePriorityFilter : 'All'})
                             </span>
                         </h3>
                     </div>
                     <div className="flex gap-2 text-gray-400">
                         <RefreshCw size={14} className="cursor-pointer hover:text-gray-600" />
                         <Maximize2 size={14} className="cursor-pointer hover:text-gray-600" />
                     </div>
                 </div>

                 <div className="flex-1 min-h-0 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-bold">Record Count</div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 font-bold origin-left translate-x-4">Opportunity Name {'>'} Delegate: Full Name</div>
                    
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            layout="vertical"
                            data={filteredDelegationTasks}
                            margin={{ top: 20, right: 120, left: 100, bottom: 20 }}
                            barSize={12}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                            <XAxis type="number" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                            <YAxis 
                                type="category" 
                                dataKey="name" 
                                tick={{fontSize: 10, fill: '#4b5563'}} 
                                width={120} 
                                interval={0}
                            />
                            <Tooltip contentStyle={{ fontSize: '12px' }} />
                            <Legend 
                                layout="vertical" 
                                verticalAlign="middle" 
                                align="right"
                                wrapperStyle={{ right: 0, top: 0, bottom: 0, fontSize: '10px' }}
                            />
                            {/* Only render bars for projects visible under current filter */}
                            {visibleProjects.map(key => (
                                <Bar 
                                    key={key} 
                                    dataKey={key} 
                                    stackId="a" 
                                    fill={PROJECT_COLORS[key]} 
                                    name={`${key} (Due: ${PROJECT_DETAILS[key]?.deadline || 'TBD'})`} 
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
                 
                 <div className="flex justify-between items-end mt-2 pt-4 border-t border-gray-100 text-[10px]">
                     <a href="#" className="text-blue-500 hover:underline">View Report (Open CC Delegation Tasks)</a>
                     <span className="text-gray-400">As of 27/01/2026 11:09 am</span>
                 </div>
              </DashboardCard>

              {/* Top Right: Project Overview */}
              <DashboardCard className="xl:col-span-1 flex flex-col h-[500px] relative p-6">
                 <div className="flex justify-between items-start mb-4">
                     <h3 className="text-base font-bold text-gray-800">Delegation Task Overview</h3>
                     <div className="flex gap-2 text-gray-400">
                         <RefreshCw size={14} className="cursor-pointer hover:text-gray-600" />
                         <Maximize2 size={14} className="cursor-pointer hover:text-gray-600" />
                     </div>
                 </div>

                 <div className="flex-1 min-h-0 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-bold">Record Count</div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 font-bold origin-left translate-x-4">Opportunity Name</div>

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            layout="vertical"
                            data={filteredProjectOverview}
                            margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                            barSize={15}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                            <XAxis type="number" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                            <YAxis 
                                type="category" 
                                dataKey="name" 
                                tick={{fontSize: 9, fill: '#4b5563'}} 
                                width={140} 
                                interval={0}
                            />
                            <Tooltip contentStyle={{ fontSize: '12px' }} />
                            <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                                <LabelList dataKey="value" position="right" style={{ fontSize: '10px', fill: '#6b7280', fontWeight: 'bold' }} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                 </div>

                 <div className="flex justify-between items-end mt-2 pt-4 border-t border-gray-100 text-[10px]">
                     <a href="#" className="text-blue-500 hover:underline">View Report (Open CC Delegation Tasks)</a>
                     <span className="text-gray-400">As of 27/01/2026 11:09 am</span>
                 </div>
              </DashboardCard>
          </div>

          {/* Row 3: By Delegated (Full Width) */}
          <DashboardCard className="flex flex-col h-[450px] relative p-6">
             <div className="flex justify-between items-start mb-4">
                 <h3 className="text-base font-bold text-gray-800">Open CC Delegation Tasks by Delegated</h3>
                 <div className="flex items-center gap-2">
                     <div className="relative">
                         <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded text-xs font-medium text-gray-600 relative">
                             <Search size={12} /> 
                             <select 
                                value={selectedDelegateFilter}
                                onChange={(e) => setSelectedDelegateFilter(e.target.value)}
                                className="bg-transparent border-none outline-none appearance-none pr-4 w-full cursor-pointer"
                             >
                                <option value="All Staff">All Staff</option>
                                {teamFilteredDelegateData.filter(d => d.name !== '-').map(d => (
                                    <option key={d.name} value={d.name}>{d.name}</option>
                                ))}
                             </select>
                             <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                         </div>
                     </div>
                     <div className="flex gap-2 text-gray-400">
                         <RefreshCw size={14} className="cursor-pointer hover:text-gray-600" />
                         <Maximize2 size={14} className="cursor-pointer hover:text-gray-600" />
                     </div>
                 </div>
             </div>

             <div className="flex-1 min-h-0 relative flex gap-4">
                <div className="flex-1 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-bold">Record Count</div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-gray-500 font-bold origin-left translate-x-4">Delegate: Full Name</div>

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            layout="vertical"
                            data={finalDelegateChartData}
                            margin={{ top: 20, right: 30, left: 80, bottom: 20 }}
                            barSize={10}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                            <XAxis type="number" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                            <YAxis 
                                type="category" 
                                dataKey="name" 
                                tick={{fontSize: 9, fill: '#4b5563'}} 
                                width={100} 
                                interval={0}
                            />
                            <Tooltip contentStyle={{ fontSize: '12px' }} />
                            <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                                <LabelList dataKey="value" position="right" style={{ fontSize: '10px', fill: '#6b7280', fontWeight: 'bold' }} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                {/* Drilldown Panel - Dynamic Task List (Widened to w-80 and using Team Colors) */}
                <div className="w-80 border-l border-gray-100 pl-4 pt-2 hidden sm:flex flex-col h-full overflow-hidden">
                    <div className="text-center text-gray-400 mb-2 font-medium text-xs">
                        {selectedDelegateFilter === 'All Staff' ? 'All Team Tasks' : selectedDelegateFilter}
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                        {drilldownTasks.length > 0 ? (
                            drilldownTasks.map((task, idx) => (
                                <div key={`${task.project}-${idx}`} className="bg-gray-50 p-2.5 rounded border border-gray-200 hover:border-gray-300 transition-colors">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: task.color }}></div>
                                        <span className="text-[9px] font-bold text-gray-600 bg-white px-1.5 py-0.5 border rounded">
                                            {task.count} Tasks
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex justify-between items-start gap-2">
                                            <div className="text-[10px] font-bold text-gray-800 flex-1 truncate" title={task.project}>
                                                {task.project}
                                            </div>
                                            <span className="text-[9px] text-red-500 font-bold whitespace-nowrap">
                                                {task.deadline}
                                            </span>
                                        </div>
                                        <div className="text-[9px] text-gray-500 italic truncate" title={task.reportType}>
                                            {task.reportType}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-[10px] text-gray-400 italic py-4">
                                No tasks found for selection.
                            </div>
                        )}
                    </div>
                </div>
             </div>

             <div className="flex justify-between items-end mt-2 pt-4 border-t border-gray-100 text-[10px]">
                 <a href="#" className="text-blue-500 hover:underline">View Report (Open CC Delegation Tasks by Delegated)</a>
                 <span className="text-gray-400">As of 27/01/2026 11:09 am</span>
             </div>
          </DashboardCard>

        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---

const FilterButton: React.FC<{ label: string, color: string, active: boolean, onClick: () => void }> = ({ label, color, active, onClick }) => {
    const colorMap: Record<string, string> = {
        black: 'bg-black text-white',
        red: 'bg-red-50 text-red-600 hover:bg-red-100',
        blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
        yellow: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
        green: 'bg-green-50 text-green-600 hover:bg-green-100',
        pink: 'bg-pink-50 text-pink-600 hover:bg-pink-100',
    };

    const dotColorMap: Record<string, string> = {
        black: 'bg-white', // Contrast dot for black bg
        red: 'bg-red-500',
        blue: 'bg-blue-500',
        yellow: 'bg-yellow-500',
        green: 'bg-green-500',
        pink: 'bg-pink-500',
    }

    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border border-transparent ${
                active && color !== 'black' ? 'ring-2 ring-offset-1 ring-gray-300' : ''
            } ${colorMap[color] || 'bg-gray-100 text-gray-600'}`}
        >
            {color !== 'black' && <div className={`w-2 h-2 rounded-full ${dotColorMap[color]}`}></div>}
            {label}
        </button>
    );
};

export default ProjectTrackerDashboardPage;
