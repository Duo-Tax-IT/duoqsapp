
import React, { useState, useRef, useEffect } from 'react';
import TopBar from '../components/TopBar';
import { 
  ChevronLeft, ChevronRight, MoreVertical, Calendar as CalendarIcon, 
  Clock, CheckCircle, Circle, Cloud, Eye, Filter, Download, ChevronDown
} from 'lucide-react';

// --- Mock Data & Types ---

interface GanttTask {
  id: string;
  oppName: string;
  oppId: string;
  reportType: string;
  status: 'PAID' | 'UNPAID';
  stage: string;
  salesforce: boolean;
  clockInfo?: string;
  bars: GanttBar[];
}

interface GanttBar {
  id: string;
  label: string; // e.g. "Team Pink" or "32d"
  days: number;
  startDateOffset: number; // Days from View Start (Dec 12)
  color: 'green' | 'pink' | 'red' | 'yellow' | 'blue';
  showCheckBtn?: boolean;
  secondaryLabel?: string; // e.g. "2d"
}

// View Start Date: Dec 12, 2025
// View Range: ~35 days
const VIEW_START_DATE = new Date(2025, 11, 12); // Dec 12 2025

const MOCK_GANTT_DATA: GanttTask[] = [
  {
    id: '1',
    oppName: 'CC378611-Revesby',
    oppId: '19',
    reportType: 'cost estimate',
    stage: 'Fillout',
    status: 'PAID',
    salesforce: true,
    clockInfo: '10:00 AM',
    bars: [
       { id: 'b1', label: '', days: 5, startDateOffset: 0, color: 'green', secondaryLabel: '' }
    ]
  },
  {
    id: '2',
    oppName: 'CC381261-Maroubra',
    oppId: '',
    reportType: 'council cost report',
    stage: 'Fillout',
    status: 'UNPAID',
    salesforce: true,
    bars: []
  },
  {
    id: '3',
    oppName: 'CC382115-Nubeena',
    oppId: '',
    reportType: 'Cost estimate - progress claim report',
    stage: 'Fillout',
    status: 'PAID',
    salesforce: true,
    clockInfo: '2:00 PM',
    bars: [
        { id: 'b3', label: '', days: 2, startDateOffset: 0, color: 'red', secondaryLabel: '11d' },
        { id: 'b3-2', label: 'Check...', days: 4, startDateOffset: 0, color: 'blue', showCheckBtn: true } 
    ]
  },
  {
    id: '4',
    oppName: 'CC383639-Turramurra',
    oppId: '',
    reportType: 'council cost report',
    stage: 'Fillout',
    status: 'UNPAID',
    salesforce: true,
    bars: [
        { id: 'b4', label: 'Team Pink', days: 4, startDateOffset: 4, color: 'pink', secondaryLabel: '2d' },
        { id: 'b4-2', label: 'Check...', days: 3, startDateOffset: 8, color: 'blue', showCheckBtn: true }
    ]
  },
  {
    id: '5',
    oppName: 'CC383431-Spencer',
    oppId: '',
    reportType: 'cost estimate',
    stage: 'Fillout',
    status: 'PAID',
    salesforce: true,
    clockInfo: '9:00 AM',
    bars: [
        { id: 'b5', label: 'Team Green', days: 8, startDateOffset: 0, color: 'green', secondaryLabel: '6d' },
        { id: 'b5-2', label: 'Check...', days: 3, startDateOffset: 8, color: 'blue', showCheckBtn: true }
    ]
  },
  {
    id: '6',
    oppName: 'CC383585-Picnic Point',
    oppId: '',
    reportType: 'council cost report',
    stage: 'Fillout',
    status: 'UNPAID',
    salesforce: true,
    bars: [
        { id: 'b6', label: 'Team Pink', days: 4, startDateOffset: 4, color: 'pink', secondaryLabel: '2d' },
        { id: 'b6-2', label: 'Check...', days: 3, startDateOffset: 8, color: 'blue', showCheckBtn: true }
    ]
  },
  {
    id: '7',
    oppName: 'CC377963-Hayborough',
    oppId: '',
    reportType: 'detailed cost report',
    stage: 'Fillout',
    status: 'UNPAID',
    salesforce: true,
    clockInfo: '11:00 AM',
    bars: [
        { id: 'b7', label: '', days: 12, startDateOffset: 0, color: 'yellow', secondaryLabel: '32d' },
        { id: 'b7-2', label: 'Check...', days: 3, startDateOffset: 12, color: 'blue', showCheckBtn: true }
    ]
  },
  {
    id: '8',
    oppName: 'CC383462-Charmhaven',
    oppId: '',
    reportType: 'council cost report',
    stage: 'Fillout',
    status: 'UNPAID',
    salesforce: true,
    bars: [
        { id: 'b8', label: 'Team Pink', days: 5, startDateOffset: 4, color: 'pink', secondaryLabel: '3d' },
        { id: 'b8-2', label: 'Check...', days: 3, startDateOffset: 9, color: 'blue', showCheckBtn: true }
    ]
  },
  {
    id: '9',
    oppName: 'CC383327-Riverwood',
    oppId: '',
    reportType: 'Duo Tax Improvement Report',
    stage: 'Fillout',
    status: 'PAID',
    salesforce: true,
    bars: [
        { id: 'b9', label: 'Team Green', days: 9, startDateOffset: 0, color: 'green', secondaryLabel: '7d' },
        { id: 'b9-2', label: 'Check...', days: 3, startDateOffset: 9, color: 'blue', showCheckBtn: true }
    ]
  },
  {
    id: '10',
    oppName: 'CC383823-Summer Hill',
    oppId: '',
    reportType: 'Duo Tax Improvement Report',
    stage: 'Fillout',
    status: 'UNPAID',
    salesforce: true,
    bars: [
        { id: 'b10', label: 'Team Green', days: 5, startDateOffset: 2, color: 'green', secondaryLabel: '3d' },
        { id: 'b10-2', label: 'Check...', days: 3, startDateOffset: 7, color: 'blue', showCheckBtn: true }
    ]
  },
  {
    id: '11',
    oppName: 'CC383821-Homebush West',
    oppId: '',
    reportType: 'Duo Tax Improvement Report',
    stage: 'Fillout',
    status: 'UNPAID',
    salesforce: true,
    clockInfo: '4:00 PM',
    bars: [
        { id: 'b11', label: 'Team Green', days: 5, startDateOffset: 2, color: 'green', secondaryLabel: '3d' },
        { id: 'b11-2', label: 'Check...', days: 3, startDateOffset: 7, color: 'blue', showCheckBtn: true }
    ]
  },
  {
    id: '12',
    oppName: 'CC382273-Nelson',
    oppId: '',
    reportType: 'council cost report',
    stage: 'Fillout',
    status: 'UNPAID',
    salesforce: true,
    bars: [
        { id: 'b12', label: 'Team Pink', days: 5, startDateOffset: 4, color: 'pink', secondaryLabel: '3d' },
        { id: 'b12-2', label: 'Check...', days: 3, startDateOffset: 9, color: 'blue', showCheckBtn: true }
    ]
  },
];

// Generate dates for the header
const generateDates = (startDate: Date, days: number) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }
  return dates;
};

const DATES = generateDates(VIEW_START_DATE, 35);
const CELL_WIDTH = 48; // px width for one day column

const GanttChartPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'Daily' | 'Hourly'>('Daily');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to "today" (simulated as Dec 16)
  useEffect(() => {
    if (scrollContainerRef.current) {
        // 4 days in is Dec 16
        // scrollContainerRef.current.scrollLeft = 0; 
    }
  }, []);

  const getBarStyles = (bar: GanttBar) => {
    const left = bar.startDateOffset * CELL_WIDTH;
    const width = bar.days * CELL_WIDTH;
    
    let bgClass = 'bg-gray-400';
    let textClass = 'text-white';
    
    switch(bar.color) {
        case 'green': bgClass = 'bg-[#22c55e]'; break;
        case 'pink': bgClass = 'bg-[#f472b6]'; break;
        case 'red': bgClass = 'bg-[#ef4444]'; break;
        case 'yellow': bgClass = 'bg-[#eab308]'; break;
        case 'blue': bgClass = 'bg-[#64748b]'; break; // Using gray/blue for 'Check...' buttons
    }

    // Special style for "Check..." buttons
    if (bar.showCheckBtn) {
        bgClass = 'bg-[#64748b]'; 
    }

    return { left: `${left}px`, width: `${width}px`, bgClass, textClass };
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white font-sans">
      {/* Top Bar Reuse */}
      <TopBar 
        title="Gantt Chart" 
        subtitle="QS Tools" 
        description="Timeline view of active opportunities" 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Controls Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white flex flex-col gap-4">
            
            {/* Row 1: Title & Main Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-gray-900">Gantt Chart</h1>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button 
                            onClick={() => setViewMode('Daily')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${viewMode === 'Daily' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Daily View
                        </button>
                        <button 
                            onClick={() => setViewMode('Hourly')}
                            className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${viewMode === 'Hourly' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Hourly View
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-1.5 border border-gray-300 rounded bg-white text-sm font-medium hover:bg-gray-50">
                        Today
                    </button>
                    <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft size={18} className="text-gray-500" /></button>
                        <span className="text-sm font-bold text-gray-700">December 2025 - February 2026</span>
                        <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight size={18} className="text-gray-500" /></button>
                    </div>
                </div>
            </div>

            {/* Row 2: Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <FilterDropdown label="Team" value="All Teams" />
                <FilterDropdown label="Sort By" value="Report Type" />
                <FilterDropdown label="Stage" value="Fillout" />
                <FilterDropdown label="Report Type" value="All Types" />
                <FilterDropdown label="Payment Status" value="All Payment Status" />
                <button className="ml-auto p-2 text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
            </div>
        </div>

        {/* Gantt Area */}
        <div className="flex-1 flex overflow-hidden relative">
            
            {/* Main Scroll Container (Both Horizontal for Grid and Vertical for everything) */}
            <div className="flex-1 flex flex-col overflow-auto bg-white" ref={scrollContainerRef}>
                
                {/* Header Row (Sticky Top) */}
                <div className="flex sticky top-0 z-30 min-w-max border-b border-gray-200 bg-gray-50 shadow-sm">
                    {/* Left Top Cell (Sticky Left) */}
                    <div className="sticky left-0 z-40 bg-gray-50 border-r border-gray-200 w-[300px] flex-shrink-0 h-[60px] flex items-center px-4 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                        <span className="text-xs font-bold text-gray-600 uppercase">Opportunity</span>
                        <span className="ml-auto bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">19</span>
                    </div>

                    {/* Timeline Headers */}
                    {DATES.map((date, i) => {
                        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                        const isToday = i === 4; // Mocking Dec 16 (Tue) as "Today"
                        
                        return (
                            <div 
                                key={i} 
                                className={`flex flex-col items-center justify-center border-r border-gray-200 h-[60px] flex-shrink-0 relative ${isWeekend ? 'bg-gray-100/50' : 'bg-white'}`}
                                style={{ width: `${CELL_WIDTH}px` }}
                            >
                                <span className="text-[10px] font-bold text-gray-500">{date.getDate()}</span>
                                <span className="text-[9px] font-medium text-gray-400 uppercase">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                {isToday && (
                                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-800"></div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Body Rows */}
                <div className="min-w-max">
                    {MOCK_GANTT_DATA.map((item) => (
                        <div key={item.id} className="flex h-[80px] border-b border-gray-100 hover:bg-gray-50 group">
                            
                            {/* Left Sticky Column */}
                            <div className="sticky left-0 z-20 bg-white border-r border-gray-200 w-[300px] flex-shrink-0 px-4 py-2 flex flex-col justify-center gap-1 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] group-hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-800 truncate pr-2" title={item.oppName}>{item.oppName}</span>
                                    <div className="flex items-center gap-1">
                                        {item.clockInfo && <Clock size={12} className="text-gray-400" />}
                                        {item.salesforce && <Cloud size={12} className="text-blue-400 fill-blue-400" />}
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <div className={`w-0.5 h-6 rounded-full ${item.status === 'PAID' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] text-gray-600 truncate" title={item.reportType}>{item.reportType}</div>
                                        <div className="flex items-center justify-between mt-0.5">
                                            <span className="text-[10px] text-gray-400">{item.stage}</span>
                                            <span className={`text-[9px] font-bold px-1.5 rounded border ${item.status === 'PAID' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                                {item.status === 'PAID' ? '✓ PAID' : '○ UNPAID'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline Grid Cells */}
                            <div className="flex relative">
                                {/* Grid Lines */}
                                {DATES.map((date, colIdx) => {
                                    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                                    const isToday = colIdx === 4;

                                    return (
                                        <div 
                                            key={colIdx} 
                                            className={`border-r border-gray-100 h-full flex-shrink-0 ${isWeekend ? 'bg-gray-100/30' : ''}`}
                                            style={{ width: `${CELL_WIDTH}px` }}
                                        >
                                            {isToday && (
                                                <div className="h-full w-px bg-gray-800 mx-auto opacity-20"></div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Gantt Bars (Absolute positioned relative to this row's timeline area) */}
                                {item.bars.map((bar) => {
                                    const styles = getBarStyles(bar);
                                    return (
                                        <div 
                                            key={bar.id}
                                            className={`absolute top-1/2 -translate-y-1/2 h-8 rounded px-2 flex items-center justify-between shadow-sm border border-white/20 select-none ${styles.bgClass} ${styles.textClass}`}
                                            style={{ 
                                                left: styles.left, 
                                                width: styles.width,
                                                marginTop: bar.showCheckBtn ? '14px' : '0' // Offset slightly if it's the check button or needs stacking
                                            }}
                                        >
                                            <div className="flex items-center gap-1 overflow-hidden">
                                                {bar.showCheckBtn && <CheckCircle size={10} className="text-white fill-white/20" />}
                                                <span className="text-[10px] font-bold whitespace-nowrap truncate">{bar.label}</span>
                                            </div>
                                            {bar.secondaryLabel && (
                                                <span className="text-[9px] font-medium opacity-80 whitespace-nowrap bg-black/10 px-1 rounded ml-1">
                                                    {bar.secondaryLabel}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Floating Icons on Timeline (Mock) */}
                                {item.clockInfo && (
                                    <div className="absolute top-2 left-[10px] z-10 bg-white shadow-sm border border-gray-200 rounded-full p-1">
                                        <Eye size={10} className="text-purple-500" />
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </div>
      </div>
    </div>
  );
};

// Helper Component for filters
const FilterDropdown: React.FC<{ label: string, value: string }> = ({ label, value }) => (
    <div className="flex flex-col min-w-[120px]">
        <label className="text-[10px] text-gray-500 font-semibold mb-0.5">{label}</label>
        <div className="relative">
            <button className="w-full bg-white border border-gray-300 hover:border-gray-400 text-left px-3 py-1.5 rounded text-xs font-medium text-gray-700 flex items-center justify-between shadow-sm">
                <span className="truncate">{value}</span>
                <ChevronDown size={12} className="text-gray-400 flex-shrink-0 ml-2" />
            </button>
        </div>
    </div>
);

export default GanttChartPage;
