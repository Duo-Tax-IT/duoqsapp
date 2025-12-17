
import React from 'react';
import TopBar from '../components/TopBar';
import DashboardCard from '../components/DashboardCard';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, Label, LabelList
} from 'recharts';
import { RefreshCw, Maximize2 } from 'lucide-react';

// --- Colors ---
const COLORS = {
  teal: '#2dd4bf',      // Quoc Duong
  darkBlue: '#1e3a8a',  // Kim Quach / Duo Tax
  blue: '#3b82f6',      // Google / Jack Ho
  lightBlue: '#93c5fd', // Steven Leuta
  orange: '#f97316',    // Opportunity Count text
  green: '#10b981',     // Revenue text
  yellow: '#eab308',    // Andy Tran
  purple: '#a855f7',
  gray: '#e5e7eb',
  slate: '#64748b'
};

const PALETTE = [
  '#3b82f6', // blue
  '#1e40af', // dark blue
  '#2dd4bf', // teal
  '#f59e0b', // yellow
  '#10b981', // green
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#6366f1', // indigo
];

// --- Mock Data ---

// Row 1: This Week
const DATA_REV_THIS_WEEK = [
  { name: 'Google', value: 1500, fill: '#3b82f6' },
  { name: 'Kim Quach', value: 660, fill: '#1e3a8a' },
  { name: 'Quoc Duong', value: 2500, fill: '#2dd4bf' },
];

const DATA_OPP_THIS_WEEK = [
  { name: 'Google', value: 2, fill: '#3b82f6' },
  { name: 'Kim Quach', value: 1, fill: '#1e3a8a' },
  { name: 'Quoc Duong', value: 2, fill: '#2dd4bf' },
];

const DATA_REV_DONUT_THIS_WEEK = [
  { name: 'Google', value: 1500, fill: '#3b82f6' },
  { name: 'Kim Quach', value: 660, fill: '#1e3a8a' },
  { name: 'Quoc Duong', value: 2500, fill: '#2dd4bf' },
];

// Row 2: Last Week
const DATA_REV_LAST_WEEK = [
  { name: 'Andy Tran', value: 1100, fill: '#eab308' },
  { name: 'Duo Tax', value: 600, fill: '#1e3a8a' },
  { name: 'Duo Tax | Referring', value: 1700, fill: '#1e40af' },
  { name: 'George Nguyen', value: 1800, fill: '#0ea5e9' },
  { name: 'Google', value: 6100, fill: '#3b82f6' },
  { name: 'Jack Ho', value: 5800, fill: '#6366f1' },
  { name: 'Lachlan Volpes', value: 2800, fill: '#8b5cf6' },
  { name: 'Quoc Duong', value: 10000, fill: '#2dd4bf' },
  { name: 'Steven Leuta', value: 4000, fill: '#06b6d4' },
  { name: 'Thomas Ngo', value: 2300, fill: '#ec4899' },
];

const DATA_JOBS_LAST_WEEK = [
  { name: 'Andy Tran', value: 1, fill: '#eab308' },
  { name: 'Duo Tax', value: 1, fill: '#1e3a8a' },
  { name: 'Duo Tax | Referring', value: 2, fill: '#1e40af' },
  { name: 'George Nguyen', value: 2, fill: '#0ea5e9' },
  { name: 'Google', value: 6, fill: '#3b82f6' },
  { name: 'Jack Ho', value: 2, fill: '#6366f1' },
  { name: 'Lachlan Volpes', value: 1, fill: '#8b5cf6' },
  { name: 'Quoc Duong', value: 10, fill: '#2dd4bf' },
  { name: 'Steven Leuta', value: 1, fill: '#06b6d4' },
  { name: 'Thomas Ngo', value: 2, fill: '#ec4899' },
];

// Row 3: Monthly & Yearly
const DATA_REV_THIS_MONTH = [
  { name: 'Others', value: 25000, fill: '#eab308' },
  { name: 'Quoc Duong', value: 30000, fill: '#2dd4bf' },
  { name: 'Google', value: 20000, fill: '#3b82f6' },
  { name: 'Jack Ho', value: 15000, fill: '#6366f1' },
]; // Total ~90k

const DATA_JOBS_THIS_MONTH = [
  { name: 'Others', value: 22, fill: '#eab308' },
  { name: 'Quoc Duong', value: 29, fill: '#2dd4bf' },
  { name: 'Google', value: 18, fill: '#3b82f6' },
  { name: 'Jack Ho', value: 4, fill: '#1e3a8a' }, // Dark blue segment
]; // Total 73

const DATA_REV_LAST_MONTH = [
  { name: 'Duo Tax', value: 2900, fill: '#1e3a8a' },
  { name: 'Duo Tax | Referring', value: 2000, fill: '#f87171' },
  { name: 'George Nguyen', value: 4100, fill: '#0ea5e9' },
  { name: 'Google', value: 5000, fill: '#3b82f6' },
  { name: 'Jack Ho', value: 3300, fill: '#eab308' },
  { name: 'James Li', value: 3500, fill: '#f59e0b' },
  { name: 'Lachlan Volpes', value: 1700, fill: '#10b981' },
  { name: 'Other', value: 128500, fill: '#1e293b' }, // Remaining to make 151k
];

const DATA_JOBS_LAST_MONTH = [
  { name: 'Duo Tax', value: 4, fill: '#3b82f6' },
  { name: 'Duo Tax | Referring', value: 3, fill: '#eab308' },
  { name: 'George Nguyen', value: 5, fill: '#1e3a8a' },
  { name: 'Other', value: 98, fill: '#0f172a' },
]; // Total 110

const DATA_JOBS_THIS_MONTH_LY = [
  { name: 'George Nguyen', value: 17, fill: '#1e3a8a' },
  { name: 'Google', value: 3, fill: '#eab308' },
  { name: 'James Li', value: 1, fill: '#3b82f6' },
  { name: 'Other', value: 39, fill: '#0f172a' },
]; // Total 60

const DATA_REV_THIS_MONTH_LY = [
  { name: 'George Nguyen', value: 25500, fill: '#1e3a8a' },
  { name: 'Google', value: 5000, fill: '#3b82f6' },
  { name: 'James Li', value: 4000, fill: '#eab308' },
  { name: 'Other', value: 42400, fill: '#eab308' },
]; // Total 76.9k

// --- BDM Business Development Data ---

const DATA_OPEN_LEADS_BAR = [
  { date: '14/01/2024', name: 'Quoc Duong', count: 1 },
  { date: '24/01/2024', name: 'Quoc Duong', count: 1 },
  { date: '30/01/2024', name: 'Quoc Duong', count: 3 },
  { date: '31/01/2024', name: 'Quoc Duong', count: 1 },
  { date: '01/02/2024', name: 'Quoc Duong', count: 3 },
  { date: '02/02/2024', name: 'Quoc Duong', count: 1 },
  { date: '06/02/2024', name: 'Quoc Duong', count: 2 },
  { date: '08/02/2024', name: 'Quoc Duong', count: 1 },
  { date: '10/02/2024', name: 'Quoc Duong', count: 1 },
];

const DATA_OPEN_LEADS_PIE = [
  { name: 'Quoc Duong', value: 366000, fill: '#0070d2' },
  { name: 'Steven Leuta', value: 50000, fill: '#1e293b' },
  { name: 'Cost Consultant', value: 40000, fill: '#22c55e' },
  { name: 'Ricky Liang', value: 30000, fill: '#eab308' },
  { name: 'Jack Ho', value: 30000, fill: '#f97316' },
  { name: 'Others', value: 104000, fill: '#64748b' },
];

const DATA_REVENUE_HISTORY = [
  { name: '01 Jan', y2022: 15, y2023: 28, y2024: 49, y2025: 71, target: 73 },
  { name: '02 Feb', y2022: 20, y2023: 49, y2024: 100, y2025: 135, target: 167 },
  { name: '03 Mar', y2022: 18, y2023: 36, y2024: 91, y2025: 140, target: 120 },
  { name: '04 Apr', y2022: 25, y2023: 49, y2024: 60, y2025: 102, target: 116 },
  { name: '05 May', y2022: 30, y2023: 70, y2024: 90, y2025: 132, target: 127 },
  { name: '06 Jun', y2022: 45, y2023: 76, y2024: 72, y2025: 175, target: 135 },
  { name: '07 Jul', y2022: 38, y2023: 52, y2024: 84, y2025: 171, target: 128 },
  { name: '08 Aug', y2022: 42, y2023: 66, y2024: 86, y2025: 136, target: 124 },
  { name: '09 Sep', y2022: 50, y2023: 77, y2024: 91, y2025: 127, target: 128 },
  { name: '10 Oct', y2022: 55, y2023: 71, y2024: 139, y2025: 171, target: 194 },
  { name: '11 Nov', y2022: 60, y2023: 85, y2024: 112, y2025: 151, target: 157 },
  { name: '12 Dec', y2022: 65, y2023: 54, y2024: 77, y2025: 90, target: 110 },
];


const BDMDashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-100">
      <TopBar 
        title="Cost Consultants - Sales" 
        subtitle="Dashboard" 
        description="As of 15/12/2025 4:19 pm • Viewing as Quoc Duong" 
      />

      <main className="flex-1 overflow-y-auto p-4 bg-[#f8fafc]">
        <div className="max-w-[1920px] mx-auto space-y-4 pb-20">
            
            {/* Filter / Header Row (Visual Only to match Screenshot) */}
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-orange-500 p-1.5 rounded text-white">
                    <RefreshCw size={14} />
                </div>
                <div className="text-sm font-semibold text-gray-700">Sales</div>
            </div>

            {/* ROW 1: This Week */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[320px]">
                
                <SalesBarWidget 
                    title="CC Sales | Revenue - This Week"
                    data={DATA_REV_THIS_WEEK}
                    dataKey="value"
                    categoryKey="name"
                    barLabelFormat={(val) => `$${(val / 1000).toFixed(1)}k`}
                    yAxisLabel="Relationship Manager"
                    xAxisLabel="Sum of Report Fee"
                    footerLeft="View Report (CC Sales | Revenue - This Week)"
                    timestamp="As of 15/12/2025 4:19 pm"
                />

                <SalesBarWidget 
                    title="CC Sales | Opportunity Count - This Week"
                    data={DATA_OPP_THIS_WEEK}
                    dataKey="value"
                    categoryKey="name"
                    yAxisLabel="Relationship Manager"
                    xAxisLabel="Record Count"
                    footerLeft="View Report (CC Sales | Revenue - This Week)"
                    timestamp="As of 15/12/2025 4:19 pm"
                />

                {/* Combined Metric Card */}
                <DashboardCard className="flex flex-col justify-between">
                    <div>
                         <div className="flex justify-between items-start">
                            <h3 className="text-sm font-semibold text-gray-800">Revenue - This Week</h3>
                            <div className="flex gap-1 text-gray-400">
                                <RefreshCw size={12} />
                                <Maximize2 size={12} />
                            </div>
                         </div>
                         <div className="mt-8 text-center">
                             <div className="text-[56px] font-bold text-[#0f766e] tracking-tight">$4,730</div>
                         </div>
                         
                         <div className="mt-8 border-t border-gray-100 pt-4">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">Opportunity Count - This Week</h3>
                            <div className="text-center">
                                <div className="text-[56px] font-bold text-[#f97316] tracking-tight">5</div>
                            </div>
                         </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] pt-2 border-t border-gray-100">
                        <span className="text-blue-500 hover:underline">View Report (CC Sales | Revenu...</span>
                        <span className="text-gray-400">As of 15/12/2025 4:19 pm</span>
                    </div>
                </DashboardCard>

                <SalesDonutWidget 
                    title="CC Sales | Revenue - This Week"
                    data={DATA_REV_DONUT_THIS_WEEK}
                    totalLabel="$4.7k"
                    subLabel="Sum of Report Fee"
                    footerLeft="View Report (CC Sales | Revenu..."
                    timestamp="As of 15/12/2025 4:19 pm"
                />
            </div>

            {/* ROW 2: Last Week */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[320px]">
                 <SalesBarWidget 
                    title="CC Sales | Revenue - Last Week"
                    data={DATA_REV_LAST_WEEK}
                    dataKey="value"
                    categoryKey="name"
                    barLabelFormat={(val) => `$${(val / 1000).toFixed(1)}k`}
                    yAxisLabel="Relationship Manager"
                    xAxisLabel="Sum of Report Fee"
                    footerLeft="View Report (CC Sales | Revenue - Last Week)"
                    timestamp="As of 15/12/2025 4:19 pm"
                    labelInside
                />

                <SalesBarWidget 
                    title="CC Sales | Jobs - Last Week"
                    data={DATA_JOBS_LAST_WEEK}
                    dataKey="value"
                    categoryKey="name"
                    yAxisLabel="Relationship Manager"
                    xAxisLabel="Record Count"
                    footerLeft="View Report (CC Sales | Revenue - Last Week)"
                    timestamp="As of 15/12/2025 4:19 pm"
                    labelInside
                />

                {/* Revenue Last Week Metric */}
                <DashboardCard className="flex flex-col justify-between">
                     <div>
                         <div className="flex justify-between items-start">
                            <h3 className="text-sm font-semibold text-gray-800">Revenue - Last Week</h3>
                            <div className="flex gap-1 text-gray-400">
                                <RefreshCw size={12} />
                                <Maximize2 size={12} />
                            </div>
                         </div>
                         <div className="mt-16 text-center">
                             <div className="text-[56px] font-bold text-[#0f766e] tracking-tight">$37,990</div>
                         </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] pt-2 border-t border-gray-100">
                        <span className="text-blue-500 hover:underline">View Report (CC SALES - Last W...</span>
                        <span className="text-gray-400">As of 15/12/2025 4:19 pm</span>
                    </div>
                </DashboardCard>

                <SalesDonutWidget 
                    title="CC Sales | Revenue - Last Week"
                    data={DATA_REV_LAST_WEEK}
                    totalLabel="$38k"
                    subLabel="Sum of Report Fee"
                    footerLeft="View Report (CC Sales | Revenu..."
                    timestamp="As of 15/12/2025 4:19 pm"
                />
            </div>

            {/* ROW 3: Monthly & Yearly */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 h-[320px]">
                
                <SalesDonutWidget 
                    title="CC Sales | Revenue - This Month"
                    data={DATA_REV_THIS_MONTH}
                    totalLabel="$90k"
                    subLabel="Sum of Report Fee"
                    footerLeft="View Report"
                    timestamp=""
                    legendMode="right"
                />

                <SalesDonutWidget 
                    title="CC Sales | Jobs - This Month"
                    data={DATA_JOBS_THIS_MONTH}
                    totalLabel="73"
                    subLabel="Record Count"
                    footerLeft="View Report"
                    timestamp=""
                    legendMode="right"
                />

                <SalesDonutWidget 
                    title="CC Sales | Revenue - Last Month"
                    data={DATA_REV_LAST_MONTH}
                    totalLabel="$151k"
                    subLabel="Sum of Report Fee"
                    footerLeft="View Report"
                    timestamp=""
                    legendMode="right"
                />

                <SalesDonutWidget 
                    title="CC Sales | Jobs - Last Month"
                    data={DATA_JOBS_LAST_MONTH}
                    totalLabel="110"
                    subLabel="Record Count"
                    footerLeft="View Report"
                    timestamp=""
                    legendMode="right"
                />

                <SalesDonutWidget 
                    title="CC Sales | Jobs - This Month Last Year"
                    data={DATA_JOBS_THIS_MONTH_LY}
                    totalLabel="60"
                    subLabel="Record Count"
                    footerLeft="View Report"
                    timestamp=""
                    legendMode="right"
                />

                <SalesDonutWidget 
                    title="CC Sales | Revenue - This Month Last Year"
                    data={DATA_REV_THIS_MONTH_LY}
                    totalLabel="$76.9k"
                    subLabel="Sum of Report Fee"
                    footerLeft="View Report"
                    timestamp=""
                    legendMode="right"
                />

            </div>

            {/* BDM Dashboard Business Development Section */}
            <div className="pt-6 mt-6 border-t border-gray-200">
                <div className="text-lg font-bold text-gray-800 mb-4">BDM Dashboard business development</div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    {/* Horizontal Bar Chart: Open Leads */}
                    <div className="lg:col-span-2 h-[350px]">
                        <DashboardCard className="flex flex-col h-full relative p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-sm font-semibold text-gray-800">All Open Leads - CC</h3>
                                <div className="flex gap-1 text-gray-400">
                                    <RefreshCw size={12} />
                                    <Maximize2 size={12} />
                                </div>
                            </div>
                            <div className="flex justify-end mb-1">
                                <div className="text-[10px] text-gray-500">Closed By</div>
                            </div>
                            <div className="flex-1 min-h-0 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        layout="vertical"
                                        data={DATA_OPEN_LEADS_BAR}
                                        margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                                        barCategoryGap={8}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                        <XAxis type="number" hide />
                                        <YAxis 
                                            type="category" 
                                            dataKey="date" 
                                            tick={{ fontSize: 10, fill: '#4b5563' }} 
                                            width={80}
                                            interval={0}
                                        />
                                        {/* Mocking the Name next to date via YAxis or custom tick is complex, keeping simple date for Y */}
                                        <Tooltip cursor={{ fill: 'transparent' }} />
                                        <Bar dataKey="count" fill="#0070d2" radius={[0, 4, 4, 0]}>
                                            <LabelList dataKey="count" position="right" style={{ fontSize: '10px', fill: '#6b7280', fontWeight: 'bold' }} />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="absolute top-0 left-20 text-[10px] text-gray-500">Quoc Duong (Most recent)</div>
                            </div>
                            <div className="flex justify-between items-center text-[10px] pt-2 border-t border-gray-100">
                                <span className="text-blue-500 hover:underline">View Report (All Open Leads - CC)</span>
                                <span className="text-gray-400">As of 15/12/2025 4:19 pm</span>
                            </div>
                        </DashboardCard>
                    </div>

                    {/* Donut Chart: Open Leads Revenue */}
                    <div className="lg:col-span-1 h-[350px]">
                        <SalesDonutWidget 
                            title="All Open Leads - CC"
                            data={DATA_OPEN_LEADS_PIE}
                            totalLabel="$620k"
                            subLabel="Sum of Report Fee"
                            footerLeft="View Report (All Open Leads - CC)"
                            timestamp="As of 15/12/2025 4:19 pm"
                            legendMode="right"
                        />
                    </div>
                </div>

                {/* Big Vertical Chart: Monthly Revenue History */}
                <div className="h-[400px]">
                    <DashboardCard className="flex flex-col h-full relative p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-semibold text-gray-800">CC SALES | Opportunity Revenue - Monthly</h3>
                            <div className="flex gap-1 text-gray-400">
                                <RefreshCw size={12} />
                                <Maximize2 size={12} />
                            </div>
                        </div>
                        <div className="flex justify-end mb-1">
                            <div className="text-[10px] text-gray-500">Conversion Year</div>
                        </div>
                        <div className="flex-1 min-h-0 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={DATA_REVENUE_HISTORY}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                                    barCategoryGap="20%"
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#4b5563' }} angle={-90} textAnchor="end" height={60} />
                                    <YAxis tick={{ fontSize: 10, fill: '#4b5563' }} />
                                    <Tooltip />
                                    <Legend wrapperStyle={{ fontSize: '10px' }} verticalAlign="top" align="right" height={30} />
                                    <Bar dataKey="y2022" name="2022" fill="#eab308" stackId="a" /> 
                                    {/* Not actually stacking, just grouping. To group, remove stackId */}
                                    {/* Recharts groups automatically if no stackId. The screenshot shows grouped bars. */}
                                    <Bar dataKey="y2023" name="2023" fill="#d97706" />
                                    <Bar dataKey="y2024" name="2024" fill="#1e3a8a" />
                                    <Bar dataKey="y2025" name="2025" fill="#059669" />
                                    <Bar dataKey="target" name="Company Target" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] text-gray-500">Conversion Month {'>'} Conversion Year</div>
                        </div>
                        <div className="flex justify-between items-center text-[10px] pt-2 border-t border-gray-100">
                            <span className="text-blue-500 hover:underline">View Report (CC SALES | Opportunity Revenue - Monthly)</span>
                            <span className="text-gray-400">As of 15/12/2025 4:19 pm</span>
                        </div>
                    </DashboardCard>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

// --- Reusable Chart Widgets ---

interface SalesBarWidgetProps {
    title: string;
    data: any[];
    dataKey: string;
    categoryKey: string;
    yAxisLabel?: string;
    xAxisLabel?: string;
    footerLeft: string;
    timestamp: string;
    barLabelFormat?: (val: number) => string;
    labelInside?: boolean;
}

const SalesBarWidget: React.FC<SalesBarWidgetProps> = ({
    title, data, dataKey, categoryKey, yAxisLabel, xAxisLabel, footerLeft, timestamp, barLabelFormat, labelInside
}) => {
    return (
        <DashboardCard className="flex flex-col h-full relative p-4">
             <div className="flex justify-between items-start mb-2">
                 <h3 className="text-sm font-semibold text-gray-800 truncate" title={title}>{title}</h3>
                 <div className="flex gap-1 text-gray-400 flex-shrink-0">
                     <RefreshCw size={12} />
                     <Maximize2 size={12} />
                 </div>
             </div>
             
             {/* Legend Header */}
             <div className="flex justify-end mb-1">
                 <div className="text-[10px] text-gray-500">{yAxisLabel}</div>
             </div>

             <div className="flex-1 min-h-0 relative">
                 {xAxisLabel && <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] text-gray-500">{xAxisLabel}</div>}
                 
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={data}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        barCategoryGap={2}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis 
                            type="category" 
                            dataKey={categoryKey} 
                            tick={{ fontSize: 10, fill: '#4b5563' }} 
                            width={80}
                            interval={0}
                        />
                        <Tooltip 
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ fontSize: '12px', padding: '4px' }}
                        />
                        <Bar dataKey={dataKey} radius={[0, 2, 2, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList 
                                dataKey={dataKey} 
                                position={labelInside ? "insideRight" : "right"} 
                                formatter={barLabelFormat}
                                style={{ fontSize: '10px', fill: labelInside ? '#fff' : '#6b7280', fontWeight: 'bold' }} 
                            />
                        </Bar>
                    </BarChart>
                 </ResponsiveContainer>
             </div>

             <div className="flex justify-between items-center text-[10px] pt-2 border-t border-gray-100">
                <span className="text-blue-500 hover:underline truncate max-w-[60%]">{footerLeft}</span>
                <span className="text-gray-400">{timestamp}</span>
             </div>
        </DashboardCard>
    );
};

interface SalesDonutWidgetProps {
    title: string;
    data: any[];
    totalLabel: string;
    subLabel?: string;
    footerLeft: string;
    timestamp: string;
    legendMode?: 'right' | 'bottom';
}

const SalesDonutWidget: React.FC<SalesDonutWidgetProps> = ({
    title, data, totalLabel, subLabel, footerLeft, timestamp, legendMode
}) => {
    return (
        <DashboardCard className="flex flex-col h-full relative p-4">
            <div className="flex justify-between items-start mb-2">
                 <h3 className="text-sm font-semibold text-gray-800 truncate" title={title}>{title}</h3>
                 <div className="flex gap-1 text-gray-400 flex-shrink-0">
                     <RefreshCw size={12} />
                     <Maximize2 size={12} />
                 </div>
             </div>
            
            {/* Legend Header */}
             <div className="flex justify-end mb-1">
                 <div className="text-[10px] text-gray-500">Relationship Manager</div>
             </div>

             <div className="flex-1 min-h-0 relative">
                 {subLabel && <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] text-gray-500">{subLabel}</div>}

                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx={legendMode === 'right' ? '40%' : '50%'}
                            cy="55%"
                            innerRadius={legendMode === 'right' ? 40 : 55}
                            outerRadius={legendMode === 'right' ? 60 : 80}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <Label 
                               value={totalLabel} 
                               position="center" 
                               style={{ 
                                   fontSize: legendMode === 'right' ? '18px' : '24px', 
                                   fontWeight: 'bold', 
                                   fill: '#374151' 
                               }} 
                            />
                        </Pie>
                        {legendMode === 'right' ? (
                             <Legend 
                                layout="vertical" 
                                verticalAlign="middle" 
                                align="right"
                                wrapperStyle={{ fontSize: '9px', right: -10, width: '45%', lineHeight: '12px' }}
                                iconSize={6}
                            />
                        ) : (
                            <Legend 
                                layout="vertical" 
                                verticalAlign="middle" 
                                align="right"
                                wrapperStyle={{ fontSize: '10px', right: 0, width: '35%' }}
                                iconSize={8}
                            />
                        )}
                        <Tooltip />
                    </PieChart>
                 </ResponsiveContainer>
             </div>

             <div className="flex justify-between items-center text-[10px] pt-2 border-t border-gray-100">
                <span className="text-blue-500 hover:underline truncate max-w-[60%]">{footerLeft}</span>
                <span className="text-gray-400">{timestamp}</span>
             </div>
        </DashboardCard>
    );
};

export default BDMDashboardPage;
