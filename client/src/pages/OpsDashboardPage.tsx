
import React from 'react';
import TopBar from '../components/TopBar';
import DashboardCard from '../components/DashboardCard';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Label, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList
} from 'recharts';
import { RefreshCw, Download, Maximize2 } from 'lucide-react';

// --- Colors based on screenshot ---
const COLORS = {
  orange: '#F97316',
  purple: '#A855F7',
  teal: '#14B8A6',
  blue: '#3B82F6',
  lightBlue: '#93C5FD',
  green: '#22C55E',
  yellow: '#EAB308',
  gray: '#E5E7EB',
  pink: '#EC4899',
  red: '#EF4444'
};

// --- Mock Data ---

const DATA_FILLOUT = [
  { name: 'cost estimate (No)', value: 10, fill: COLORS.orange },
  { name: 'detailed cost report (No)', value: 3, fill: COLORS.purple },
  { name: 'initial cost report (No)', value: 2, fill: COLORS.teal },
  { name: 'cost estimate - progress (No)', value: 3, fill: COLORS.purple },
  { name: 'insurance replacement (No)', value: 5, fill: COLORS.blue },
];

const DATA_CHECK = [
  { name: 'cost estimate (No)', value: 1, fill: COLORS.blue },
  { name: 'detailed cost report (No)', value: 1, fill: COLORS.lightBlue },
  { name: 'initial cost report (No)', value: 2, fill: COLORS.purple },
  { name: 'insurance val (No)', value: 2, fill: COLORS.purple },
];

const DATA_REVIEW = [
  { name: 'progress claim (No)', value: 4, fill: COLORS.blue },
  { name: 'council cost (No)', value: 1, fill: COLORS.teal },
  { name: 'detailed cost (No)', value: 2, fill: COLORS.teal },
  { name: 'duo tax improve (No)', value: 7, fill: COLORS.green },
  { name: 'insurance val (No)', value: 4, fill: COLORS.purple },
  { name: 'preliminary (No)', value: 3, fill: COLORS.purple },
];

const DATA_DEADLINES = [
  { date: '5/12', count: 1, fill: '#fdba74' },
  { date: '9/12', count: 2, fill: '#c084fc' },
  { date: '10/12', count: 5, fill: '#2dd4bf' },
  { date: '11/12', count: 2, fill: '#3b82f6' },
  { date: '12/12', count: 12, fill: '#93c5fd' }, // Stacked look simulated by height
  { date: '15/12', count: 3, fill: '#60a5fa' },
  { date: '16/12', count: 1, fill: '#22c55e' },
  { date: '17/12', count: 2, fill: '#7dd3fc' },
  { date: '18/12', count: 4, fill: '#7dd3fc' },
  { date: '19/12', count: 2, fill: '#60a5fa' },
  { date: '22/12', count: 2, fill: '#c084fc' },
];

const DATA_MISSING = [
  { date: '-', count: 5, fill: '#3b82f6' },
  { date: '25/08', count: 1, fill: '#c084fc' },
  { date: '2/09', count: 1, fill: '#c084fc' },
  { date: '3/11', count: 1, fill: '#c084fc' },
  { date: '9/12', count: 1, fill: '#2dd4bf' },
  { date: '15/12', count: 1, fill: '#c084fc' },
  { date: '17/12', count: 4, fill: '#a855f7' },
  { date: '5/01', count: 2, fill: '#a855f7' },
];

const DATA_UNPAID = [
  { name: 'capital improve', value: 2, fill: COLORS.blue },
  { name: 'insurance val', value: 4, fill: COLORS.lightBlue },
  { name: 'detailed cost', value: 3, fill: COLORS.purple },
  { name: 'cost estimate', value: 3, fill: COLORS.teal },
  { name: 'progress claim', value: 5, fill: COLORS.green },
  { name: 'preliminary', value: 10, fill: COLORS.orange },
];

const DATA_SURVEYING = [
  { date: '9/12/2025', count: 2 },
  { date: '10/12/2025', count: 2 },
  { date: '12/12/2025', count: 1 },
  { date: '15/12/2025', count: 3 },
  { date: '18/12/2025', count: 2 },
];

const DATA_UNASSIGNED = [
  { name: 'UNASSIGNED TEAM', value: 12, fill: COLORS.blue },
];

// --- Additional Info Data (New) ---

const DATA_TEAM_ASSIGNMENTS = [
  { name: 'Team Blue', value: 11, fill: '#3b82f6' },
  { name: 'Team Green', value: 13, fill: '#22c55e' },
  { name: 'Team Pink', value: 19, fill: '#ec4899' },
  { name: 'Team Red', value: 17, fill: '#ef4444' },
  { name: 'Team Yellow', value: 4, fill: '#eab308' },
  { name: 'UNASSIGNED TEAM', value: 14, fill: '#94a3b8' },
];

const DATA_AWAITING_PAYMENT_OPPS = [
  { name: 'capital improvements report', value: 2, fill: '#f472b6' },
  { name: 'insurance replacement valuation r...', value: 4, fill: '#c084fc' },
  { name: 'detailed cost report', value: 3, fill: '#a855f7' },
  { name: 'cost estimate', value: 3, fill: '#818cf8' },
  { name: 'cost estimate - progress claim rep...', value: 5, fill: '#2dd4bf' },
  { name: 'preliminary cost estimate', value: 10, fill: '#fb923c' },
  { name: 'council cost report', value: 2, fill: '#fbbf24' },
  { name: 'initial cost report', value: 2, fill: '#a3e635' },
  { name: 'Other', value: 9, fill: '#f87171' },
];

const DATA_NO_DEADLINE_PAID = [
  { name: 'Deposit Paid', value: 15, fill: '#60a5fa' },
  { name: 'Invoice Paid', value: 8, fill: '#3b82f6' },
];

const DATA_PIPELINE = [
  { name: 'Bookings', d7: 1, d14: 0, dMore: 0 },
  { name: 'Surveying', d7: 2, d14: 0, dMore: 0 },
  { name: 'Awaiting Info...', d7: 15, d14: 2, dMore: 1 },
  { name: 'Review Docume...', d7: 5, d14: 1, dMore: 0 },
  { name: 'Fillout', d7: 8, d14: 4, dMore: 0 },
  { name: 'Check', d7: 2, d14: 1, dMore: 0 },
];

const DATA_REVISIONS = [
  { name: 'CC331452-Beaumaris', stage: 'Job Complete', date: '12/03/2025', rev: 'RR-007392', priority: 'Medium' },
  { name: 'CC331842-Ingleburn', stage: 'Job Complete', date: '14/03/2025', rev: 'RR-010201', priority: 'Medium' },
  { name: 'CC331842-Ingleburn', stage: 'Job Complete', date: '14/03/2025', rev: 'RR-010621', priority: 'Medium' },
  { name: 'CC331842-Ingleburn', stage: 'Job Complete', date: '14/03/2025', rev: 'RR-010780', priority: 'Medium' },
  { name: 'CC332325-Northbridge', stage: 'Job Complete', date: '18/03/2025', rev: 'RR-007511', priority: 'High' },
  { name: 'CC332624-Lord Howe Island', stage: 'Job Complete', date: '20/03/2025', rev: 'RR-007306', priority: 'Medium' },
  { name: 'CC332879-Perth', stage: 'Job Complete', date: '21/03/2025', rev: 'RR-007314', priority: 'High' },
  { name: 'CC333447-Penshurst', stage: 'Job Complete', date: '26/03/2025', rev: 'RR-008193', priority: 'High' },
  { name: 'CC333530-Lindfield', stage: 'Job Complete', date: '26/03/2025', rev: 'RR-007503', priority: 'High' },
  { name: 'CC333839-Gordon', stage: 'Job Complete', date: '28/03/2025', rev: 'RR-007637', priority: 'High' },
  { name: 'CC333976-Point Piper', stage: 'Job Complete', date: '28/03/2025', rev: 'RR-010244', priority: 'High' },
  { name: 'CC334087-Picnic Point', stage: 'Job Complete', date: '31/03/2025', rev: 'RR-008098', priority: 'High' },
  { name: 'CC334087-Picnic Point', stage: 'Job Complete', date: '31/03/2025', rev: 'RR-009735', priority: 'Medium' },
  { name: 'CC334094-Padstow Heights', stage: 'Job Complete', date: '31/03/2025', rev: 'RR-007675', priority: 'High' },
  { name: 'CC334257-Bexley', stage: 'Job Complete', date: '1/04/2025', rev: 'RR-007525', priority: 'High' },
  { name: 'CC334673-Brassall', stage: 'Job Complete', date: '3/04/2025', rev: 'RR-009094', priority: 'Medium' },
];

const DATA_BOOKINGS = [
  { conv: '12/12/2025', name: 'CC383785-Nelson Bay', type: 'cost estimate - progress claim report', acc: 'Janis Eyles', inv: false, insp: false, follow: '15/12/2025' }
];

const DATA_AWAITING_INFO = [
  { name: 'CC250639-Balwyn', acc: 'Providence Properties', conv: '5/04/2023', deadline: '-', soft: '21/04/2023', type: 'detailed cost report (No)', paid: true, note: '04/05 AJ - Awaiting information from client to provide quotes.', ref: 'Toran Rusitovski' },
  { name: 'CC251734-Hazelbrook', acc: 'Han Strating', conv: '24/04/2023', deadline: '-', soft: '4/05/2023', type: 'initial cost report (No)', paid: true, note: '04/05 AJ - Request for additional information, awaiting revised cost plus contract', ref: 'Mark Davis' },
  { name: 'CC300323-Burnside', acc: 'Rate Money - Craigieburn', conv: '15/07/2024', deadline: '-', soft: '-', type: 'initial cost report (No)', paid: true, note: '(02/08/24 JH) Report complete, awaiting discuss from QD to client to discuss total cost of development. (is too high)', ref: 'Kushwinder Singh' },
  { name: 'CC303300-Sydney', acc: '4d Architecture & Design', conv: '30/07/2024', deadline: '-', soft: '-', type: 'detailed cost report (No)', paid: false, note: '-', ref: 'Christian Farrell' },
  { name: 'CC313949-Huskisson', acc: 'OX Bridge', conv: '1/10/2024', deadline: '-', soft: '-', type: 'initial cost report (No)', paid: false, note: '(16/10 RSA) Sent follow up email via surveying', ref: 'Philip Lee' },
];

const DATA_FILLOUT_INVOICE_PAID = [
  { name: 'CC324135-Warwick Farm', ref: 'Neogen Homes Pty Ltd', paid: false, type: 'detailed cost report (No)', days: 129, soft: '-', dead: '-', del: '-', fill: 'Cost Consultant Team', instr: '-' },
  { name: 'CC349064-Lawson', ref: 'Bakoffis', paid: false, type: 'insurance replacement valuation report (No)', days: 110, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC349211-Liverpool', ref: 'Bakoffis', paid: false, type: 'insurance replacement valuation report (No)', days: 105, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC349418-Manilla', ref: 'Bakoffis', paid: false, type: 'insurance replacement valuation report (No)', days: 105, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC349605-East Tamworth', ref: 'Bakoffis', paid: false, type: 'insurance replacement valuation report (No)', days: 95, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC351054-Willoughby', ref: 'Bakoffis', paid: false, type: 'insurance replacement valuation report (No)', days: 95, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC349473-Wallsend', ref: 'Bakoffis', paid: false, type: 'insurance replacement valuation report (No)', days: 90, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC350010-Petersham', ref: 'Bakoffis', paid: false, type: 'insurance replacement valuation report (No)', days: 90, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC351884-Leeton', ref: 'Bakoffis', paid: false, type: 'insurance replacement valuation report (No)', days: 80, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC348560-Cessnock', ref: 'Bakoffis', paid: false, type: 'insurance replacement valuation report (No)', days: 40, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC378611-Revesby', ref: 'Capstone Consulting', paid: true, type: 'cost estimate (No)', days: 23, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC349467-Bexley', ref: 'Bakoffis', paid: false, type: 'insurance replacement valuation report (No)', days: 20, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC382115-Nubeena', ref: 'Google (Cost Report)', paid: true, type: 'cost estimate - progress claim report (No)', days: 9, soft: '-', dead: '12/12/2025', del: '-', fill: '-', instr: '-' },
  { name: 'CC381808-Vida Estate', ref: 'Map Architects', paid: true, type: 'detailed cost report (No)', days: 9, soft: '-', dead: '15/12/2025', del: '-', fill: '-', instr: '-' },
  { name: 'CC381261-Maroubra', ref: 'Emk Architects', paid: false, type: 'council cost report (No)', days: 5, soft: '-', dead: '-', del: '-', fill: '-', instr: '-' },
  { name: 'CC382660-Melton South', ref: 'Google (Cost Report)', paid: true, type: 'preliminary cost estimate (No)', days: 5, soft: '-', dead: '15/12/2025', del: '-', fill: '-', instr: '-' },
  { name: 'CC382722-Paradise Point', ref: 'WRC Quantity Surveying', paid: false, type: 'detailed cost report (No)', days: 5, soft: '-', dead: '17/12/2025', del: '-', fill: '-', instr: '-' },
  { name: 'CC382839-Warnervale', ref: 'Google (Cost Report)', paid: false, type: 'initial cost report (No)', days: 5, soft: '-', dead: '18/12/2025', del: '-', fill: '-', instr: '-' },
  { name: 'CC383267-West Pymble', ref: 'Exempla Homes', paid: false, type: 'detailed cost report (No)', days: 4, soft: '-', dead: '19/12/2025', del: '-', fill: '-', instr: '-' },
  { name: 'CC383351-Wyong', ref: 'AUDAA', paid: false, type: 'council cost report (No)', days: 4, soft: '-', dead: '15/12/2025', del: '-', fill: '-', instr: '-' },
];

const DATA_AWAITING_INFO_NEW = [
  { conv: '25/10/2024', name: 'CC371434-Kings Langley', acc: 'Sami Design Architects', dead: '-', type: 'council cost report' },
  { conv: '6/11/2024', name: 'CC318935-Laverton North', acc: 'SOLOMON KOSHER', dead: '-', type: 'insurance replacement valuation report' },
  { conv: '4/12/2024', name: 'CC321884-Rose Bay', acc: 'Thomas Heatley Smith', dead: '-', type: 'insurance replacement valuation report' },
  { conv: '4/02/2025', name: 'CC326898-Blue Bay', acc: 'Ibrahim Chambour', dead: '-', type: 'detailed cost report' },
  { conv: '4/02/2025', name: 'CC326899-Toowoon Bay', acc: 'Ibrahim Chambour', dead: '-', type: 'detailed cost report' },
  { conv: '7/03/2025', name: 'CC330898-Werribee', acc: 'Kirks Accountants', dead: '-', type: 'initial cost report' },
  { conv: '10/03/2025', name: 'CC331215-Bankstown', acc: 'AL Nachabe', dead: '-', type: 'council cost report' },
  { conv: '21/03/2025', name: 'CC332910-Leppington', acc: 'JPG Investments', dead: '-', type: 'council cost report' },
  { conv: '21/03/2025', name: 'CC332914-Leppington', acc: 'JPG Investments', dead: '-', type: 'Embodied Emissions NABERS Report' },
  { conv: '16/06/2025', name: 'CC347206-Marayong', acc: 'Genevieve Pender', dead: '-', type: 'initial cost report' },
  { conv: '8/07/2025', name: 'CC353006-Box Hill', acc: 'Vishal Gumber', dead: '-', type: 'Embodied Emissions NABERS Report' },
  { conv: '14/08/2025', name: 'CC361625-Cobbitty', acc: 'Jeckra', dead: '-', type: 'Embodied Emissions NABERS Report' },
  { conv: '8/09/2025', name: 'CC366504-Jensen', acc: 'Hayley Moss', dead: '-', type: 'cost estimate - progress claim report' },
  { conv: '17/09/2025', name: 'CC368205-Kirrawee', acc: 'Ray Pont', dead: '-', type: 'capital improvements report' },
  { conv: '17/10/2025', name: 'CC374344-Blacktown', acc: 'Petra Developments (Australia)', dead: '-', type: 'initial cost report' },
];

const DATA_AWAITING_PAYMENT_NEW = [
  { conv: '11/12/2025', name: 'CC383570-Clovelly', type: 'cost estimate - progress claim report (No)', fee: '$440.00', addr: '8 Victory Street Clovelly NSW 2031', dnp: false, note: '(11/12/25 AD) As per JH this is clients PC9 - (09/12/25 AD) CC Deadline Date set to 2025-12-15...' },
  { conv: '9/12/2025', name: 'CC383237-Clovelly', type: 'cost estimate - progress claim report (No)', fee: '$880.00', addr: '8 Victory Street Clovelly NSW 2031', dnp: false, note: '(12/12/25 JH) CC Deadline Date has been cleared. (11/12/25 AD) As per JH this is clients PC10...' },
  { conv: '9/12/2025', name: 'CC383185-Windsor', type: 'council cost report (No)', fee: '$1.32k', addr: '38 Macquarie Street Windsor NSW 2756', dnp: false, note: '(12/12/25 CC) CC Deadline Date has been cleared. (09/12/25 RA) SL received an email from Manuela...' },
];

const DATA_PREPARED_REPORTS = [
  { name: 'budget cost estimate (No)', value: 2 },
  { name: 'capital improvements report (No)', value: 153 },
  { name: 'cost estimate', value: 17 },
  { name: 'cost estimate (No)', value: 116 },
  { name: 'cost estimate - progress claim report', value: 1 },
  { name: 'cost estimate - progress claim report (No)', value: 439 },
  { name: 'cost to complete (No)', value: 16 },
  { name: 'council cost report', value: 2 },
  { name: 'council cost report (No)', value: 1600 },
  { name: 'detailed cost report', value: 2 },
  { name: 'detailed cost report (No)', value: 448 },
  { name: 'detailed cost report - builder (No)', value: 1 },
  { name: 'detailed cost report - client side (No)', value: 11 },
  { name: 'detailed cost report - contractor side (No)', value: 3 },
  { name: 'detailed cost report - cost to complete (No)', value: 9 },
  { name: 'duo tax improvement report (No)', value: 20 },
  { name: 'embodied emissions nabers report (No)', value: 18 },
  { name: 'feasibility study (No)', value: 2 },
  { name: 'initial cost report (No)', value: 278 },
  { name: 'initial cost report - cost to complete (No)', value: 31 },
  { name: 'insurance replacement valuation report (No)', value: 240 },
  { name: 'preliminary cost estimate (No)', value: 176 },
];


const OpsDashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-100">
      <TopBar 
        title="Operations Dashboard" 
        subtitle="Dashboard" 
        description="As of 10/12/2025 8:00 am • Viewing as Aaron Owens" 
      />

      <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <div className="max-w-[1920px] mx-auto pb-20">
            
            {/* Header Actions */}
            <div className="flex justify-end mb-4 gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
                    <RefreshCw size={14} /> Refresh
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
                    <Download size={14} /> Subscribe
                </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* ROW 1 */}
                <DonutWidget 
                    title="Cost Estimate - Fillout Stage DB v2" 
                    subTitle="-Includes Revision & Awaiting Payment"
                    data={DATA_FILLOUT}
                    total={23}
                />
                <DonutWidget 
                    title="Cost Estimate - Check Stage" 
                    data={DATA_CHECK}
                    total={6}
                />
                <DonutWidget 
                    title="Cost Estimate - Review Documents Stage" 
                    data={DATA_REVIEW}
                    total={17}
                />

                {/* ROW 2 */}
                <div className="lg:col-span-1 h-80">
                    <DashboardCard className="h-full flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-semibold text-gray-800">CC - Tracking Deadlines</h3>
                        </div>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={DATA_DEADLINES} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" tick={{fontSize: 10}} angle={0} />
                                    <YAxis tick={{fontSize: 10}} />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#3B82F6">
                                        {DATA_DEADLINES.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="text-[10px] text-gray-400 text-right mt-2">As of 10/12/2025 8:00 am</div>
                    </DashboardCard>
                </div>

                <div className="lg:col-span-1 h-80">
                    <DashboardCard className="h-full flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-semibold text-gray-800">CC - Check/Fillout - Missing Deadline</h3>
                        </div>
                        <div className="flex-1 min-h-0">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={DATA_MISSING} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" tick={{fontSize: 10}} angle={-45} textAnchor="end" />
                                    <YAxis tick={{fontSize: 10}} />
                                    <Tooltip />
                                    <Bar dataKey="count">
                                        {DATA_MISSING.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                         <div className="text-[10px] text-gray-400 text-right mt-2">As of 10/12/2025 8:00 am</div>
                    </DashboardCard>
                </div>

                <DonutWidget 
                    title="Report Uploaded - Unpaid Opportunities" 
                    subTitle="Since 1/1/25"
                    data={DATA_UNPAID}
                    total={28}
                />

                {/* ROW 3 */}
                 <div className="lg:col-span-1 h-80">
                    <DashboardCard className="h-full flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-semibold text-gray-800">CC - Revision Stage - Amendments (New)</h3>
                        </div>
                        <div className="flex-1 flex items-center justify-center bg-gray-50 rounded border border-gray-100 m-4">
                            <p className="text-xs text-gray-400">We can't draw this chart because there is no data.</p>
                        </div>
                        <div className="text-[10px] text-gray-400 text-right mt-2">As of 10/12/2025 8:00 am</div>
                    </DashboardCard>
                </div>

                <div className="lg:col-span-1 h-80">
                    <DashboardCard className="h-full flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-semibold text-gray-800">Cost Estimate - Surveying</h3>
                        </div>
                         <div className="flex-1 min-h-0">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={DATA_SURVEYING} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="date" tick={{fontSize: 10}} />
                                    <YAxis tick={{fontSize: 10}} />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#3B82F6" barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="text-[10px] text-gray-400 text-right mt-2">As of 10/12/2025 8:00 am</div>
                    </DashboardCard>
                </div>

                 <DonutWidget 
                    title="Current Opportunities with no Team Assigned" 
                    subTitle="Conversions Since July 1, 2025"
                    data={DATA_UNASSIGNED}
                    total={12}
                    hideLegend
                />

            </div>

            {/* Additional Operations Information Section */}
            <div className="pt-6 mt-6 border-t border-gray-200">
                <div className="text-lg font-bold text-gray-800 mb-4">Operations - Additional Insights</div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    <DonutWidget 
                        title="Open Opps - Team Assignments"
                        subTitle="Conversions Since July 1, 2025"
                        data={DATA_TEAM_ASSIGNMENTS}
                        total={78}
                    />
                    <DonutWidget 
                        title="Opps | CC Uploaded & Awaiting Payment"
                        data={DATA_AWAITING_PAYMENT_OPPS}
                        total={40}
                        legendMode="right"
                    />
                    <DonutWidget 
                        title="No Deadline - Invoice Paid / Deposit Received"
                        subTitle="Awaiting Info, Review Docs, Fillout"
                        data={DATA_NO_DEADLINE_PAID}
                        total={23}
                    />
                </div>

                <div className="space-y-6">
                    {/* Revisions Table */}
                    <DashboardCard className="p-0 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-gray-800">CC Opportunities with Report Revisions</h3>
                            <div className="flex gap-1 text-gray-400"><RefreshCw size={12} /><Maximize2 size={12} /></div>
                        </div>
                        <SimpleTable 
                            headers={['Opportunity Name', 'Stage', 'Conversion Date', 'Report Revision Name', 'Priority']}
                            data={DATA_REVISIONS}
                            renderRow={(row, i) => (
                                <tr key={i} className="hover:bg-gray-50 border-b border-gray-100 last:border-0 text-xs text-gray-700">
                                    <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer font-medium">{row.name}</td>
                                    <td className="px-4 py-2">{row.stage}</td>
                                    <td className="px-4 py-2">{row.date}</td>
                                    <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">{row.rev}</td>
                                    <td className="px-4 py-2">{row.priority}</td>
                                </tr>
                            )}
                            footerLeft="View Report (CC Opportunities with Report Revisions)"
                            footerRight="As of 15/12/2025 10:05 am"
                        />
                    </DashboardCard>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Pipeline Chart */}
                        <DashboardCard className="flex flex-col h-80 relative p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-sm font-semibold text-gray-800">CC Opportunity Pipeline</h3>
                                <div className="flex gap-1 text-gray-400"><RefreshCw size={12} /><Maximize2 size={12} /></div>
                            </div>
                            <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={DATA_PIPELINE} margin={{ top: 10, right: 30, left: -20, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" tick={{fontSize: 10}} angle={-45} textAnchor="end" height={50} />
                                        <YAxis tick={{fontSize: 10}} label={{ value: 'Record Count', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#6b7280' }} />
                                        <Tooltip />
                                        <Legend wrapperStyle={{ fontSize: '10px' }} verticalAlign="top" align="right" />
                                        <Bar dataKey="d7" name="<= 07 Days" stackId="a" fill="#3b82f6" />
                                        <Bar dataKey="d14" name="<= 14 Days" stackId="a" fill="#60a5fa" />
                                        <Bar dataKey="dMore" name="> 14 Days" stackId="a" fill="#93c5fd" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-between items-center text-[10px] pt-2 border-t border-gray-100">
                                <a href="#" className="text-blue-500 hover:underline">View Report (CC Opportunity Pipeline)</a>
                                <span className="text-gray-400">As of 15/12/2025 10:05 am</span>
                            </div>
                        </DashboardCard>

                        {/* Bookings Table */}
                        <DashboardCard className="p-0 overflow-hidden h-80 flex flex-col">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center shrink-0">
                                <h3 className="text-sm font-semibold text-gray-800">Cost Estimate - Bookings</h3>
                                <div className="flex gap-1 text-gray-400"><RefreshCw size={12} /><Maximize2 size={12} /></div>
                            </div>
                            <div className="flex-1 overflow-auto">
                                <SimpleTable 
                                    headers={['Conversion...', 'Opportunity Name', 'Report Type', 'Account...', 'Invoi...', 'Inspection...', 'Bookings Follow...']}
                                    data={DATA_BOOKINGS}
                                    renderRow={(row, i) => (
                                        <tr key={i} className="hover:bg-gray-50 border-b border-gray-100 last:border-0 text-xs text-gray-700">
                                            <td className="px-4 py-2">{row.conv}</td>
                                            <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer font-medium">{row.name}</td>
                                            <td className="px-4 py-2">{row.type}</td>
                                            <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">{row.acc}</td>
                                            <td className="px-4 py-2 text-center"><input type="checkbox" disabled checked={row.inv} /></td>
                                            <td className="px-4 py-2 text-center"><input type="checkbox" disabled checked={row.insp} /></td>
                                            <td className="px-4 py-2 text-right">{row.follow}</td>
                                        </tr>
                                    )}
                                />
                            </div>
                            <div className="p-2 border-t border-gray-100 flex justify-between items-center text-[10px] shrink-0 bg-white">
                                <a href="#" className="text-blue-500 hover:underline">View Report (Cost Estimate - Bookings)</a>
                                <span className="text-gray-400">As of 15/12/2025 10:05 am</span>
                            </div>
                        </DashboardCard>
                    </div>

                    {/* Awaiting Info Table */}
                    <DashboardCard className="p-0 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-gray-800">CC - Awaiting Info - No Follow Up Date</h3>
                            <div className="flex gap-1 text-gray-400"><RefreshCw size={12} /><Maximize2 size={12} /></div>
                        </div>
                        <div className="overflow-x-auto">
                            <SimpleTable 
                                headers={['Opportunity Name', 'Account Name', 'Conversion Date', 'Deadline Date', 'CC Soft Deadline Date', 'CC Report Type', 'Invoice Paid', 'Opportunity Notes', 'Referral Contact']}
                                data={DATA_AWAITING_INFO}
                                renderRow={(row, i) => (
                                    <tr key={i} className="hover:bg-gray-50 border-b border-gray-100 last:border-0 text-xs text-gray-700">
                                        <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer font-medium">{row.name}</td>
                                        <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">{row.acc}</td>
                                        <td className="px-4 py-2">{row.conv}</td>
                                        <td className="px-4 py-2">{row.deadline}</td>
                                        <td className="px-4 py-2">{row.soft}</td>
                                        <td className="px-4 py-2">{row.type}</td>
                                        <td className="px-4 py-2 text-center"><input type="checkbox" disabled checked={row.paid} /></td>
                                        <td className="px-4 py-2 max-w-[200px] truncate" title={row.note}>{row.note}</td>
                                        <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">{row.ref}</td>
                                    </tr>
                                )}
                                footerLeft="View Report (CC - Awaiting Info - No Follow Up)"
                                footerRight="As of 15/12/2025 10:05 am"
                            />
                        </div>
                    </DashboardCard>

                    {/* Fillout Stage Table */}
                    <DashboardCard className="p-0 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-gray-800">Cost Estimate - Fillout Stage (Invoice Paid)</h3>
                            <div className="flex gap-1 text-gray-400"><RefreshCw size={12} /><Maximize2 size={12} /></div>
                        </div>
                        <div className="max-h-[400px] overflow-auto">
                            <SimpleTable 
                                headers={['Opportunity Name', 'Referral Account', 'Invoice Paid', 'CC Report Type', 'Days in Current Stage', 'CC Soft Deadline Date', 'Deadline Date', 'CC Delegate List', 'Fillout By', 'Fillout Stage Instructions']}
                                data={DATA_FILLOUT_INVOICE_PAID}
                                renderRow={(row, i) => (
                                    <tr key={i} className="hover:bg-gray-50 border-b border-gray-100 last:border-0 text-xs text-gray-700">
                                        <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer font-medium">{row.name}</td>
                                        <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">{row.ref}</td>
                                        <td className="px-4 py-2 text-center"><input type="checkbox" disabled checked={row.paid} /></td>
                                        <td className="px-4 py-2">{row.type}</td>
                                        <td className="px-4 py-2 text-right">{row.days}</td>
                                        <td className="px-4 py-2">{row.soft}</td>
                                        <td className="px-4 py-2">{row.dead}</td>
                                        <td className="px-4 py-2">{row.del}</td>
                                        <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">{row.fill}</td>
                                        <td className="px-4 py-2">{row.instr}</td>
                                    </tr>
                                )}
                            />
                        </div>
                        <div className="p-2 border-t border-gray-100 flex justify-between items-center text-[10px] shrink-0 bg-white">
                            <a href="#" className="text-blue-500 hover:underline">View Report (Cost Estimate - Fillout Stage)</a>
                            <span className="text-gray-400">As of 15/12/2025 10:05 am</span>
                        </div>
                    </DashboardCard>

                    {/* NEW SECTION: Cost Estimate - Awaiting Information */}
                    <DashboardCard className="p-0 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-gray-800">Cost Estimate - Awaiting Information</h3>
                            <div className="flex gap-1 text-gray-400"><RefreshCw size={12} /><Maximize2 size={12} /></div>
                        </div>
                        <div className="max-h-[400px] overflow-auto">
                            <SimpleTable 
                                headers={['Conversion Date', 'Opportunity Name', 'Account Name', 'Deadline Date', 'Report Type']}
                                data={DATA_AWAITING_INFO_NEW}
                                renderRow={(row, i) => (
                                    <tr key={i} className="hover:bg-gray-50 border-b border-gray-100 last:border-0 text-xs text-gray-700">
                                        <td className="px-4 py-2">{row.conv}</td>
                                        <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer font-medium">{row.name}</td>
                                        <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">{row.acc}</td>
                                        <td className="px-4 py-2">{row.dead}</td>
                                        <td className="px-4 py-2">{row.type}</td>
                                    </tr>
                                )}
                                footerLeft="View Report (Cost Estimate - Awaiting Information)"
                                footerRight="As of 15/12/2025 10:05 am"
                            />
                        </div>
                    </DashboardCard>

                    {/* NEW SECTION: Cost Estimate - Awaiting Payment */}
                    <DashboardCard className="p-0 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-sm font-semibold text-gray-800">Cost Estimate - Awaiting Payment</h3>
                            <div className="flex gap-1 text-gray-400"><RefreshCw size={12} /><Maximize2 size={12} /></div>
                        </div>
                        <div className="max-h-[400px] overflow-auto">
                            <SimpleTable 
                                headers={['Conversion Date', 'Opportunity Name', 'CC Report Type', 'Report Fee', 'Property Address on Invoice', 'DNP until full payment is received', 'Opportunity Notes']}
                                data={DATA_AWAITING_PAYMENT_NEW}
                                renderRow={(row, i) => (
                                    <tr key={i} className="hover:bg-gray-50 border-b border-gray-100 last:border-0 text-xs text-gray-700">
                                        <td className="px-4 py-2 whitespace-nowrap">{row.conv}</td>
                                        <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer font-medium whitespace-nowrap">{row.name}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{row.type}</td>
                                        <td className="px-4 py-2 text-right whitespace-nowrap">{row.fee}</td>
                                        <td className="px-4 py-2 max-w-[200px] truncate" title={row.addr}>{row.addr}</td>
                                        <td className="px-4 py-2 text-center"><input type="checkbox" disabled checked={row.dnp} /></td>
                                        <td className="px-4 py-2 max-w-[300px] truncate" title={row.note}>{row.note}</td>
                                    </tr>
                                )}
                                footerLeft="View Report (Cost Estimate - Awaiting Payment)"
                                footerRight="As of 15/12/2025 10:05 am"
                            />
                        </div>
                    </DashboardCard>

                    {/* NEW SECTION: All CC Prepared Reports Chart */}
                    <DashboardCard className="flex flex-col h-[500px] relative p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-semibold text-gray-800">All CC Prepared Reports</h3>
                            <div className="flex gap-1 text-gray-400"><RefreshCw size={12} /><Maximize2 size={12} /></div>
                        </div>
                        <div className="flex-1 min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={DATA_PREPARED_REPORTS} margin={{ top: 20, right: 30, left: 0, bottom: 100 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis 
                                        dataKey="name" 
                                        tick={{fontSize: 9}} 
                                        angle={-45} 
                                        textAnchor="end" 
                                        interval={0}
                                    />
                                    <YAxis tick={{fontSize: 10}} label={{ value: 'Record Count', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#6b7280' }} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#3B82F6">
                                        <LabelList dataKey="value" position="top" style={{ fontSize: '10px', fill: '#374151' }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-500">CC Report Type</div>
                        </div>
                        <div className="flex justify-between items-center text-[10px] pt-2 border-t border-gray-100">
                            <a href="#" className="text-blue-500 hover:underline">View Report (CC | All CC Prepared Reports)</a>
                            <span className="text-gray-400">As of 15/12/2025 10:05 am</span>
                        </div>
                    </DashboardCard>

                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

// --- Helper Components ---

interface DonutWidgetProps {
  title: string;
  subTitle?: string;
  data: { name: string; value: number; fill: string }[];
  total: number;
  hideLegend?: boolean;
  legendMode?: 'right' | 'bottom';
}

const DonutWidget: React.FC<DonutWidgetProps> = ({ title, subTitle, data, total, hideLegend, legendMode }) => {
  const centerPercent = (hideLegend || legendMode === 'bottom') ? '50%' : '30%';

  return (
    <div className="lg:col-span-1 h-80">
      <DashboardCard className="h-full flex flex-col relative">
        <div className="mb-2">
             <div className="flex justify-between items-start">
                <h3 className="text-sm font-semibold text-gray-800 truncate max-w-[90%]" title={title}>{title}</h3>
                <div className="flex gap-1 text-gray-400 shrink-0"><RefreshCw size={12} /><Maximize2 size={12} /></div>
             </div>
             {subTitle && <p className="text-[10px] text-blue-600">{subTitle}</p>}
        </div>

        <div className="flex-1 min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx={centerPercent}
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                        ))}
                        <Label 
                           value={total} 
                           position="center" 
                           style={{ 
                               fontSize: '24px', 
                               fontWeight: 'bold', 
                               fill: '#374151', 
                               fontFamily: 'sans-serif',
                               textAnchor: 'middle',
                               dominantBaseline: 'middle'
                           }} 
                        />
                    </Pie>
                    {!hideLegend && (
                        <Legend 
                            layout="vertical" 
                            verticalAlign="middle" 
                            align="right"
                            wrapperStyle={{ fontSize: '10px', right: 0, width: '45%', lineHeight: '14px' }}
                            iconSize={8}
                        />
                    )}
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '4px' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between items-center mt-2 border-t border-gray-100 pt-2">
            <a href="#" className="text-[10px] text-blue-500 hover:underline truncate max-w-[200px]">View Report ({title})</a>
            <span className="text-[10px] text-gray-400">As of 15/12/2025 10:05 am</span>
        </div>
      </DashboardCard>
    </div>
  );
};

// Generic Table Component for Dashboard
interface SimpleTableProps {
    headers: string[];
    data: any[];
    renderRow: (row: any, index: number) => React.ReactNode;
    footerLeft?: string;
    footerRight?: string;
}

const SimpleTable: React.FC<SimpleTableProps> = ({ headers, data, renderRow, footerLeft, footerRight }) => {
    return (
        <div className="flex flex-col h-full">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        {headers.map((h, i) => (
                            <th key={i} className="px-4 py-2 text-[10px] font-bold text-gray-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                    {data.map((row, i) => renderRow(row, i))}
                </tbody>
            </table>
            {(footerLeft || footerRight) && (
                <div className="p-2 border-t border-gray-100 flex justify-between items-center text-[10px] mt-auto bg-white">
                    {footerLeft && <a href="#" className="text-blue-500 hover:underline">{footerLeft}</a>}
                    {footerRight && <span className="text-gray-400">{footerRight}</span>}
                </div>
            )}
        </div>
    );
};

export default OpsDashboardPage;
