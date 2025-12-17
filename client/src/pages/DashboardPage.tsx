
import React from 'react';
import TopBar from '../components/TopBar';
import DashboardCard from '../components/DashboardCard';
import StatCard from '../components/StatCard';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Label, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList
} from 'recharts';
import { RefreshCw, Maximize2, FileText, Phone, Clock, CheckCircle } from 'lucide-react';

// --- Colors & Mock Data ---

const COLORS = {
  purple: '#8B5CF6',
  blue: '#3B82F6',
  teal: '#14B8A6',
  green: '#10B981',
  yellow: '#F59E0B',
  orange: '#F97316',
  red: '#EF4444',
  slate: '#64748B',
  lightBlue: '#0EA5E9',
};

// Row 1 Data
const DATA_FEE_PROPOSALS_TODAY = [{ name: 'council cost report', value: 1, fill: COLORS.purple }];
const DATA_FEE_PROPOSALS_WEEK = [{ name: 'council cost report', value: 1, fill: COLORS.purple }];
const DATA_AIRCALL_INBOUND = [
  { name: '-', value: 4, fill: '#0f766e' }, // dark teal
  { name: 'Architect', value: 2, fill: '#0ea5e9' }, // light blue
  { name: 'Developer', value: 1, fill: COLORS.purple },
];
const DATA_AIRCALL_OUTBOUND = [
  { name: '-', value: 29, fill: '#0ea5e9' },
  { name: 'Architect', value: 2, fill: '#0f766e' },
  { name: 'Other', value: 6, fill: COLORS.purple },
];

// Row 2 Data
const DATA_LEADS_AWAITING_FY = [
  { date: '24/08/2025', count: 3, Jack: 1, Martin: 1, Steven: 1 },
  { date: '31/08/2025', count: 2, Jack: 1, Martin: 0, Steven: 1 },
  { date: '07/09/2025', count: 1, Jack: 0, Martin: 1, Steven: 0 },
  { date: '21/09/2025', count: 2, Jack: 1, Martin: 0, Steven: 1 },
  { date: '05/10/2025', count: 5, Jack: 2, Martin: 1, Steven: 2 },
  { date: '19/10/2025', count: 7, Jack: 3, Martin: 2, Steven: 2 },
  { date: '02/11/2025', count: 6, Jack: 2, Martin: 2, Steven: 2 },
  { date: '16/11/2025', count: 9, Jack: 3, Martin: 3, Steven: 3 },
  { date: '30/11/2025', count: 12, Jack: 4, Martin: 4, Steven: 4 },
  { date: '14/12/2025', count: 20, Jack: 5, Martin: 5, Steven: 10 },
];

const DATA_FEE_PROPOSALS_LAST_WEEK = [
  { name: 'insurance replace...', value: 8, fill: '#f87171' }, // red
  { name: 'detailed cost report', value: 1, fill: '#c084fc' }, // purple
  { name: 'Preliminary Cost Es...', value: 1, fill: '#22d3ee' }, // cyan
  { name: 'council cost report', value: 3, fill: '#38bdf8' }, // sky
  { name: 'initial cost report', value: 2, fill: '#818cf8' }, // indigo
  { name: 'Duo Tax Improvem...', value: 3, fill: '#4ade80' }, // green
];

const DATA_LEADS_CLOSED_LAST_WEEK = [
  { name: 'insurance replace...', value: 9, fill: '#f87171' },
  { name: 'detailed cost report', value: 4, fill: '#ef4444' },
  { name: 'cost estimate', value: 2, fill: '#818cf8' }, 
  { name: 'cost estimate - pro...', value: 3, fill: '#0ea5e9' },
  { name: 'council cost report', value: 1, fill: '#f472b6' },
  { name: 'Duo Tax Improvem...', value: 10, fill: '#9d174d' },
];

// Row 3 Data
const DATA_LEADS_AWAITING_THIS_WEEK = [{ name: 'Duo Tax Improvem...', value: 1, fill: COLORS.purple }];
const DATA_LEADS_AWAITING_LAST_WEEK = [
  { name: '-', value: 1, fill: '#ef4444' },
  { name: 'insurance replace...', value: 2, fill: '#f97316' },
  { name: 'detailed cost report', value: 1, fill: '#0ea5e9' },
  { name: 'Preliminary Cost Es...', value: 2, fill: '#ec4899' },
  { name: 'council cost report', value: 3, fill: '#0d9488' },
  { name: 'initial cost report', value: 3, fill: '#10b981' },
  { name: 'Duo Tax Improvem...', value: 8, fill: '#15803d' },
];
const DATA_LEADS_CLOSED_TODAY = [
    { name: 'cost estimate - pro...', value: 1, fill: COLORS.purple },
    { name: 'council cost report', value: 3, fill: '#0ea5e9' },
];
const DATA_LEADS_CLOSED_THIS_WEEK = [
    { name: 'cost estimate - pro...', value: 1, fill: COLORS.purple },
    { name: 'council cost report', value: 3, fill: '#0ea5e9' },
];

// Row 4 Data
const DATA_DAILY_LEADS_WEEK = [
    { name: 'cost estimate - progress claim report', value: 1, fill: COLORS.purple },
    { name: 'council cost report', value: 3, fill: '#0ea5e9' },
];

// Row 5 Data
const DATA_LOST_TODAY = [
    { name: 'Uncontactable', value: 4, fill: COLORS.purple },
    { name: 'Timing', value: 3, fill: '#0f766e' },
    { name: 'Prior relationship...', value: 1, fill: '#10b981' },
];
const DATA_LOST_WEEK = [
    { name: 'Uncontactable', value: 4, fill: COLORS.purple },
    { name: 'Timing', value: 3, fill: '#0ea5e9' },
    { name: 'Prior relationship...', value: 1, fill: '#0f766e' },
];
const DATA_LOST_LAST_WEEK = [
    { name: 'Uncontactable', value: 3, fill: COLORS.purple },
    { name: 'Pricing', value: 1, fill: '#3b82f6' },
    { name: 'Timing', value: 1, fill: '#0ea5e9' },
    { name: 'Service', value: 26, fill: '#f87171' },
    { name: 'Prior relationship...', value: 4, fill: '#0f766e' },
    { name: 'Disgruntled', value: 1, fill: '#ef4444' },
];


const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-100">
      <TopBar 
        title="CSR Dashboard" 
        subtitle="CSR Operations Dashboard" 
        description="Lead follow ups, my follow ups and missed calls"
      />

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-[1920px] mx-auto space-y-4 pb-20">
          
          {/* Row 0: KPI Stats (Caesar Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
            <StatCard 
               label="Fee Proposals (Today)" 
               value="12" 
               trend="+2"
               icon={<FileText className="text-white" size={20} />}
               bg="bg-brand-orange"
            />
            <StatCard 
               label="Call Volume (Today)" 
               value="44" 
               subtext="7 Inbound / 37 Outbound"
               icon={<Phone className="text-blue-600" size={20} />}
               bg="bg-blue-50"
            />
            <StatCard 
               label="Leads Awaiting" 
               value="21" 
               trend="+5 vs last week"
               trendColor="text-red-500"
               icon={<Clock className="text-purple-600" size={20} />}
               bg="bg-purple-50"
            />
             <StatCard 
               label="Deals Closed (Week)" 
               value="8" 
               trend="+12%"
               icon={<CheckCircle className="text-green-600" size={20} />}
               bg="bg-green-50"
            />
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DonutChartWidget 
                title="DUOQS - Fee Proposals"
                subtitle="Today"
                cornerLabel="Related Lead: Report Type"
                data={DATA_FEE_PROPOSALS_TODAY}
                total={1}
                footerLeft="View Report (DuoQS Fee ..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
            <DonutChartWidget 
                title="DUOQS - Fee Proposals"
                subtitle="This Week"
                cornerLabel="Related Lead: Report Type"
                data={DATA_FEE_PROPOSALS_WEEK}
                total={1}
                footerLeft="View Report (DuoQS Fee ..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
            <DonutChartWidget 
                title="DUOQS - Aircall - Ref Partner Types (A..."
                subtitle="Inbound - This Week"
                cornerLabel="Ref_Partner_Type"
                data={DATA_AIRCALL_INBOUND}
                total={7}
                footerLeft="View Report (CC - Aircall - ..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
            <DonutChartWidget 
                title="DUOQS - Aircall - Ref Partner Types (A..."
                subtitle="Outbound - This Week"
                cornerLabel="Ref_Partner_Type"
                data={DATA_AIRCALL_OUTBOUND}
                total={37}
                footerLeft="View Report (Aircall - Ref ..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
                <StackedBarWidget 
                    title="DUOQS Leads - Awaiting Response"
                    subtitle="This FY"
                    cornerLabel="Closed By"
                    data={DATA_LEADS_AWAITING_FY}
                    footerLeft="View Report (CC Leads - Awaiting Response- This FY)"
                    footerRight="As of 15/12/2025 2:38 pm"
                />
            </div>
            <DonutChartWidget 
                title="DUOQS - Fee Proposals"
                subtitle="Last Week"
                cornerLabel="Related Lead: Report Type"
                data={DATA_FEE_PROPOSALS_LAST_WEEK}
                total={18}
                footerLeft="View Report (DuoQS Fee ..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
            <DonutChartWidget 
                title="DUOQS - Leads Closed"
                subtitle="Last Week"
                cornerLabel="Related Opportunity: Re..."
                data={DATA_LEADS_CLOSED_LAST_WEEK}
                total={29}
                sumLabel="Sum of Points"
                footerLeft="View Report (CC - Daily Le..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DonutChartWidget 
                title="DUOQS - Leads - Awaiting Response"
                subtitle="This Week"
                cornerLabel="Report Type"
                data={DATA_LEADS_AWAITING_THIS_WEEK}
                total={1}
                footerLeft="View Report (CC Leads - A..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
            <DonutChartWidget 
                title="DUOQS - Leads - Awaiting Response"
                subtitle="Last Week"
                cornerLabel="Report Type"
                data={DATA_LEADS_AWAITING_LAST_WEEK}
                total={20}
                footerLeft="View Report (CC Leads - A..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
            <DonutChartWidget 
                title="DUOQS - Leads Closed"
                subtitle="Today"
                cornerLabel="Related Opportunity: Re..."
                data={DATA_LEADS_CLOSED_TODAY}
                total={4}
                footerLeft="View Report (CC - Todays ..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
            <DonutChartWidget 
                title="DUOQS - Leads Closed"
                subtitle="This Week"
                cornerLabel="Related Opportunity: Re..."
                data={DATA_LEADS_CLOSED_THIS_WEEK}
                total={4}
                sumLabel="Sum of Points"
                footerLeft="View Report (CC - Daily Le..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
          </div>

          {/* Row 4 - Wide Bar Chart */}
          <div className="w-full">
            <SimpleBarWidget 
                title="DUOQS - Daily Leads Closed"
                subtitle="This Week"
                cornerLabel="Related Opportunity: Report Type"
                data={DATA_DAILY_LEADS_WEEK}
                footerLeft="View Report (CC - Daily Leads Closed (This Week))"
                footerRight="As of 15/12/2025 2:38 pm"
            />
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <DonutChartWidget 
                title="DUOQS - Lost Leads"
                subtitle="Today"
                cornerLabel="Lost Lead Reason"
                data={DATA_LOST_TODAY}
                total={8}
                footerLeft="View Report (CC Leads - Lost Leads - ..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
            <DonutChartWidget 
                title="DUOQS - Lost Leads"
                subtitle="This Week"
                cornerLabel="Lost Lead Reason"
                data={DATA_LOST_WEEK}
                total={8}
                footerLeft="View Report (CC Leads - Lost Leads - ..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
            <DonutChartWidget 
                title="DUOQS - Lost Leads"
                subtitle="Last Week"
                cornerLabel="Lost Lead Reason"
                data={DATA_LOST_LAST_WEEK}
                total={36}
                footerLeft="View Report (CC Leads - Lost Leads - ..."
                footerRight="As of 15/12/2025 2:38 pm"
            />
          </div>

        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---

interface ChartWidgetProps {
    title: string;
    subtitle: string;
    cornerLabel?: string;
    footerLeft: string;
    footerRight: string;
    className?: string;
}

interface DonutWidgetProps extends ChartWidgetProps {
    data: any[];
    total: number;
    sumLabel?: string;
}

const DonutChartWidget: React.FC<DonutWidgetProps> = ({ 
    title, subtitle, cornerLabel, data, total, footerLeft, footerRight, sumLabel 
}) => {
    return (
        <DashboardCard className="flex flex-col h-80 relative p-4">
             {/* Header */}
             <div className="flex justify-between items-start mb-1">
                 <div>
                     <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                     <p className="text-xs text-blue-600">{subtitle}</p>
                 </div>
                 <div className="flex gap-1 text-gray-400">
                     <RefreshCw size={12} className="cursor-pointer hover:text-gray-600" />
                     <Maximize2 size={12} className="cursor-pointer hover:text-gray-600" />
                 </div>
             </div>

             {/* Corner Label */}
             {cornerLabel && (
                <div className="absolute top-12 right-4 text-[10px] text-gray-500 text-right">
                    {cornerLabel}
                </div>
             )}

             {/* Chart Area */}
             <div className="flex-1 min-h-0 relative mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="35%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <Label 
                               value={total} 
                               position="center" 
                               style={{ fontSize: '24px', fontWeight: 'bold', fill: '#374151' }} 
                            />
                        </Pie>
                        <Legend 
                            layout="vertical" 
                            verticalAlign="middle" 
                            align="right"
                            wrapperStyle={{ fontSize: '10px', right: 0, width: '45%', lineHeight: '14px' }}
                            iconSize={8}
                        />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Label Title (Record Count / Sum of Points) */}
                <div className="absolute top-[35%] left-[20%] text-[10px] text-gray-500 font-medium transform -translate-x-1/2">
                    {sumLabel || 'Record Count'}
                </div>
             </div>

             {/* Footer */}
             <div className="flex justify-between items-end mt-2 pt-2 border-t border-gray-100 text-[10px]">
                 <a href="#" className="text-blue-500 hover:underline truncate max-w-[50%]">{footerLeft}</a>
                 <span className="text-gray-400">{footerRight}</span>
             </div>
        </DashboardCard>
    );
};

const StackedBarWidget: React.FC<ChartWidgetProps & { data: any[] }> = ({ 
    title, subtitle, cornerLabel, data, footerLeft, footerRight 
}) => {
    return (
        <DashboardCard className="flex flex-col h-80 relative p-4">
             {/* Header */}
             <div className="flex justify-between items-start mb-1">
                 <div>
                     <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                     <p className="text-xs text-blue-600">{subtitle}</p>
                 </div>
                 <div className="flex gap-1 text-gray-400">
                     <RefreshCw size={12} className="cursor-pointer hover:text-gray-600" />
                     <Maximize2 size={12} className="cursor-pointer hover:text-gray-600" />
                 </div>
             </div>

             {/* Corner Label */}
             {cornerLabel && (
                <div className="absolute top-12 right-4 text-[10px] text-gray-500 text-right mb-2">
                    {cornerLabel}
                    <div className="flex flex-col items-end gap-1 mt-1">
                         <div className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-sm"></span> Jack Ho</div>
                         <div className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 rounded-sm"></span> Joseph Vu</div>
                         <div className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-sm"></span> Martin Ly</div>
                         <div className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-sm"></span> Michelle Hoang</div>
                         <div className="flex items-center gap-1"><span className="w-2 h-2 bg-teal-500 rounded-sm"></span> Quoc Duong</div>
                         <div className="flex items-center gap-1"><span className="w-2 h-2 bg-indigo-500 rounded-sm"></span> Steven Leuta</div>
                    </div>
                </div>
             )}

             {/* Chart */}
             <div className="flex-1 min-h-0 relative mt-2 mr-24">
                  <div className="absolute -left-8 top-1/2 -rotate-90 text-[10px] text-gray-500 font-medium">Record Count</div>
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data} margin={{ top: 20, right: 0, left: 10, bottom: 30 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis 
                            dataKey="date" 
                            tick={{fontSize: 9}} 
                            angle={-45} 
                            textAnchor="end" 
                            interval={0}
                          />
                          <YAxis tick={{fontSize: 10}} />
                          <Tooltip />
                          <Bar dataKey="Jack" stackId="a" fill="#3b82f6" />
                          <Bar dataKey="Martin" stackId="a" fill="#10b981" />
                          <Bar dataKey="Steven" stackId="a" fill="#6366f1" />
                      </BarChart>
                  </ResponsiveContainer>
                  <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 text-[10px] text-gray-500">Date of Enquiry</div>
             </div>

              {/* Footer */}
             <div className="flex justify-between items-end mt-2 pt-2 border-t border-gray-100 text-[10px]">
                 <a href="#" className="text-blue-500 hover:underline truncate max-w-[50%]">{footerLeft}</a>
                 <span className="text-gray-400">{footerRight}</span>
             </div>
        </DashboardCard>
    );
};

const SimpleBarWidget: React.FC<ChartWidgetProps & { data: any[] }> = ({ 
    title, subtitle, cornerLabel, data, footerLeft, footerRight 
}) => {
    return (
        <DashboardCard className="flex flex-col h-80 relative p-4">
            <div className="flex justify-between items-start mb-1">
                 <div>
                     <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
                     <p className="text-xs text-blue-600">{subtitle}</p>
                 </div>
                 <div className="flex gap-1 text-gray-400">
                     <RefreshCw size={12} className="cursor-pointer hover:text-gray-600" />
                     <Maximize2 size={12} className="cursor-pointer hover:text-gray-600" />
                 </div>
             </div>

             {cornerLabel && (
                <div className="absolute top-12 right-4 text-[10px] text-gray-500 text-right">
                    {cornerLabel}
                    <div className="flex flex-col items-end gap-1 mt-1">
                        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-purple-500 rounded-sm"></span> cost estimate - progress claim report</div>
                        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-sky-500 rounded-sm"></span> council cost report</div>
                    </div>
                </div>
             )}

             <div className="flex-1 min-h-0 relative mt-4 mr-48">
                  <div className="absolute -left-8 top-1/2 -rotate-90 text-[10px] text-gray-500 font-medium">Record Count</div>
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data} margin={{ top: 20, right: 0, left: 10, bottom: 20 }} barCategoryGap="20%">
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} tickLine={false} axisLine={false} />
                          <YAxis tick={{fontSize: 10}} />
                          <Tooltip />
                          <Bar dataKey="value">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList dataKey="value" position="top" style={{ fontSize: '12px', fill: '#374151' }} />
                          </Bar>
                      </BarChart>
                  </ResponsiveContainer>
                   <div className="absolute bottom-0 left-2 text-[10px] font-bold text-gray-700">15/12/2025</div>
                   <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-gray-500">Completed Time  {'>'}  Related Opportunity: Report Type</div>
             </div>

             <div className="flex justify-between items-end mt-2 pt-2 border-t border-gray-100 text-[10px]">
                 <a href="#" className="text-blue-500 hover:underline truncate max-w-[50%]">{footerLeft}</a>
                 <span className="text-gray-400">{footerRight}</span>
             </div>
        </DashboardCard>
    );
}

export default DashboardPage;
