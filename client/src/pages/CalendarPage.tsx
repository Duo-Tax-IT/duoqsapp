
import React from 'react';
import TopBar from '../components/TopBar';
import { ChevronDown, RefreshCw, Calendar as CalendarIcon, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// --- Mock Data Types ---
interface CalendarEvent {
  id: string;
  title: string;
  type: string;
  color: 'green' | 'pink' | 'blue' | 'yellow' | 'red';
  status?: string;
  day: number;
}

interface SidebarItem {
  id: string;
  title: string;
  color: 'green' | 'pink' | 'blue' | 'yellow' | 'gray';
}

// --- Mock Data ---
const CALENDAR_EVENTS: CalendarEvent[] = [
  // Dec 10
  { id: '1', day: 10, type: 'COUNCIL COST REPORT', title: 'CC382774-St Marys', color: 'pink' },
  { id: '2', day: 10, type: 'PRELIMINARY COST ESTIMATE', title: 'CC382772-Bentleigh East', color: 'pink' },
  { id: '3', day: 10, type: 'INITIAL COST REPORT', title: 'CC382811-Roseville Chase', color: 'pink' },
  { id: '4', day: 10, type: 'DUO TAX IMPROVEMENT REPORT', title: 'CC382487-Mansfield Park', color: 'green', status: 'verified' },
  { id: '5', day: 10, type: 'COST ESTIMATE - PROGRESS CLAIM', title: 'CC382556-Truganina', color: 'red' },
  
  // Dec 11
  { id: '6', day: 11, type: 'INSURANCE REPLACEMENT', title: 'CC382986-Burwood', color: 'pink' },
  { id: '7', day: 11, type: 'COST ESTIMATE - PROGRESS CLAIM', title: 'CC382325-Dry Diggings', color: 'pink', status: 'verified' },
  { id: '8', day: 11, type: 'INITIAL COST REPORT', title: 'CC354395-Haynes', color: 'yellow' },

  // Dec 12
  { id: '9', day: 12, type: 'COST ESTIMATE - PROGRESS CLAIM', title: 'CC382345-Whitlam', color: 'pink' },
  { id: '10', day: 12, type: 'COST ESTIMATE - PROGRESS CLAIM', title: 'CC382929-South Fremantle', color: 'pink', status: 'verified' },
  { id: '11', day: 12, type: 'COST ESTIMATE - PROGRESS CLAIM', title: 'CC383097-Randwick', color: 'pink' },
  { id: '12', day: 12, type: 'COST ESTIMATE - PROGRESS CLAIM', title: 'CC382581-Como', color: 'pink' },
  { id: '13', day: 12, type: 'COST ESTIMATE - PROGRESS CLAIM', title: 'CC382554-Thirroul', color: 'pink' },
  { id: '14', day: 12, type: 'PRELIMINARY COST ESTIMATE', title: 'CC379196-Woollahra', color: 'yellow', status: 'verified' },
  { id: '15', day: 12, type: 'COUNCIL COST REPORT', title: 'CC383171-Baulkham Hills', color: 'pink' },

  // Dec 15
  { id: '16', day: 15, type: 'PRELIMINARY COST ESTIMATE', title: 'CC382660-Melton South', color: 'green' },
  { id: '17', day: 15, type: 'INSURANCE REPLACEMENT', title: 'CC382899-Highett', color: 'pink', status: 'verified' },
  { id: '18', day: 15, type: 'COST ESTIMATE - PROGRESS CLAIM', title: 'CC383237-Clovelly', color: 'red' },

  // Dec 16
  { id: '19', day: 16, type: 'COUNCIL COST REPORT', title: 'CC383034-Berowra Heights', color: 'pink' },

  // Dec 17
  { id: '20', day: 17, type: 'COST ESTIMATE - PROGRESS CLAIM', title: 'CC383122-Surfers Paradise', color: 'pink', status: 'verified' },
  { id: '21', day: 17, type: 'DETAILED COST REPORT', title: 'CC382722-Paradise Point', color: 'blue' },

  // Dec 18
  { id: '22', day: 18, type: 'COST ESTIMATE - PROGRESS CLAIM', title: 'CC382062-Mentone', color: 'pink', status: 'verified' },
  { id: '23', day: 18, type: 'INITIAL COST REPORT', title: 'CC382839-Warnervale', color: 'blue' },
  { id: '24', day: 18, type: 'DETAILED COST REPORT', title: 'CC383056-Mawson Lakes', color: 'green' },
  { id: '25', day: 18, type: 'DETAILED COST REPORT', title: 'CC382777-Gunnedah', color: 'yellow' },
];

const SIDEBAR_RFI: SidebarItem[] = [
  { id: '1', title: 'CC368205-Kirrawee', color: 'green' },
  { id: '2', title: 'CC369005-Bargara', color: 'pink' },
  { id: '3', title: 'CC374344-Blacktown', color: 'pink' },
  { id: '4', title: 'CC375057-Mandurah', color: 'blue' },
  { id: '5', title: 'CC377713-Kingscliff', color: 'blue' },
  { id: '6', title: 'CC378611-Revesby', color: 'green' },
];

const SIDEBAR_DRAFT: SidebarItem[] = [
  { id: '1', title: 'CC378611-Revesby', color: 'green' },
  { id: '2', title: 'CC380088-Coombs', color: 'pink' },
  { id: '3', title: 'CC381261-Maroubra', color: 'gray' },
];

const SIDEBAR_REVIEWS: SidebarItem[] = [
  { id: '1', title: 'CC349605-East Tamworth', color: 'gray' },
  { id: '2', title: 'CC350010-Petersham', color: 'gray' },
  { id: '3', title: 'CC351054-Willoughby', color: 'gray' },
  { id: '4', title: 'CC351884-Leeton', color: 'gray' },
  { id: '5', title: 'CC378611-Revesby', color: 'green' },
  { id: '6', title: 'CC324135-Warwick Farm', color: 'gray' },
  { id: '7', title: 'CC348560-Cessnock', color: 'gray' },
  { id: '8', title: 'CC349064-Lawson', color: 'gray' },
];

interface CalendarPageProps {
  onEventClick?: (title: string) => void;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ onEventClick }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-100">
      <TopBar 
        title="Calendar" 
        subtitle="QS Pipeline" 
        description="Schedule and manage cost report tasks" 
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-row">
        
        {/* LEFT: Calendar Grid Area */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden border-r border-gray-200 bg-white">
          
          {/* Header Controls */}
          <div className="flex flex-col gap-4 mb-4">
            
            {/* Row 1: Toggles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800">QS Pipeline</h2>
                
                <div className="flex bg-gray-100 p-0.5 rounded-md border border-gray-200">
                  <button className="px-3 py-1 bg-white shadow-sm rounded-sm text-xs font-medium text-gray-700">Monthly</button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">Rolling</button>
                </div>

                <div className="flex bg-gray-100 p-0.5 rounded-md border border-gray-200">
                  <button className="px-3 py-1 bg-white shadow-sm rounded-sm text-xs font-medium text-gray-700">Open Jobs</button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">All Jobs</button>
                </div>

                <div className="flex bg-gray-100 p-0.5 rounded-md border border-gray-200">
                  <button className="px-3 py-1 bg-white shadow-sm rounded-sm text-xs font-medium text-gray-700">Concise View</button>
                  <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">Relaxed View</button>
                </div>

                <div className="flex items-center gap-4 ml-2">
                    <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
                        <input type="checkbox" className="rounded text-brand-orange focus:ring-brand-orange" />
                        Show Inspection
                    </label>
                    <label className="flex items-center gap-2 text-xs font-medium text-gray-600 cursor-pointer">
                        <input type="checkbox" className="rounded text-brand-orange focus:ring-brand-orange" />
                        Show RFI
                    </label>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-blue-700 transition-colors">
                    Refresh
                </button>
                <button className="bg-brand-orange text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-orange-600 transition-colors">
                    Today
                </button>
              </div>
            </div>

            {/* Row 2: Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <div className="relative">
                    <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 bg-white text-xs font-medium hover:bg-gray-50">
                        December 2025 <ChevronDown size={12} />
                    </button>
                </div>
                <div className="relative">
                    <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 bg-white text-xs font-medium hover:bg-gray-50">
                        All Types <ChevronDown size={12} />
                    </button>
                </div>
                <div className="relative">
                    <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 bg-white text-xs font-medium hover:bg-gray-50">
                        All Stages <ChevronDown size={12} />
                    </button>
                </div>
                
                {/* Team Colors */}
                <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100 ml-4">
                    <button className="px-3 py-1 bg-purple-600 text-white rounded-full text-[10px] font-bold shadow-sm">All Teams</button>
                    <button className="px-3 py-1 text-blue-600 font-bold text-[10px] hover:bg-white rounded-full">Team Blue</button>
                    <button className="px-3 py-1 text-green-600 font-bold text-[10px] hover:bg-white rounded-full">Team Green</button>
                    <button className="px-3 py-1 text-pink-600 font-bold text-[10px] hover:bg-white rounded-full">Team Pink</button>
                    <button className="px-3 py-1 text-red-600 font-bold text-[10px] hover:bg-white rounded-full">Team Red</button>
                    <button className="px-3 py-1 text-yellow-600 font-bold text-[10px] hover:bg-white rounded-full">Team Yellow</button>
                </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 overflow-auto border border-gray-200 rounded bg-white shadow-sm flex flex-col min-w-[800px]">
             {/* Days Header */}
             <div className="grid grid-cols-5 border-b border-gray-200 bg-gray-50">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => (
                    <div key={d} className="p-2 text-center text-xs font-semibold text-gray-500 border-r border-gray-200 last:border-r-0">
                        {d}
                    </div>
                ))}
             </div>

             {/* Days Grid - Approximating the layout with CSS Grid */}
             <div className="flex-1 grid grid-cols-5 grid-rows-4">
                {/* Generating cells for a month view simulation (Mon-Fri only for this mockup) */}
                {/* Week 1 (Dec 1 - 5) - Empty mostly in data */}
                {[1, 2, 3, 4, 5].map(day => <CalendarCell key={day} day={day} events={CALENDAR_EVENTS.filter(e => e.day === day)} onEventClick={onEventClick} />)}
                
                {/* Week 2 (Dec 8 - 12) */}
                {[8, 9, 10, 11, 12].map(day => <CalendarCell key={day} day={day} events={CALENDAR_EVENTS.filter(e => e.day === day)} onEventClick={onEventClick} />)}

                {/* Week 3 (Dec 15 - 19) */}
                {[15, 16, 17, 18, 19].map(day => <CalendarCell key={day} day={day} events={CALENDAR_EVENTS.filter(e => e.day === day)} onEventClick={onEventClick} />)}

                {/* Week 4 (Dec 22 - 26) */}
                {[22, 23, 24, 25, 26].map(day => <CalendarCell key={day} day={day} events={CALENDAR_EVENTS.filter(e => e.day === day)} onEventClick={onEventClick} />)}
             </div>
          </div>

        </div>

        {/* RIGHT: Sidebar Lists */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col overflow-y-auto p-4 gap-6 flex-shrink-0">
            
            <SidebarSection title="RFI Sent - No Deadline" count={6} items={SIDEBAR_RFI} />
            <SidebarSection title="Draft Report Sent - No Deadline" count={3} items={SIDEBAR_DRAFT} />
            <SidebarSection title="Reviews Docs & Fillout - No Deadline" count={12} items={SIDEBAR_REVIEWS} />
            <SidebarSection title="RFI Received - No Deadline" count={0} items={[]} />

        </div>
      </main>
    </div>
  );
};

// --- Sub Components ---

const CalendarCell: React.FC<{ day: number, events: CalendarEvent[], onEventClick?: (title: string) => void }> = ({ day, events, onEventClick }) => {
    return (
        <div className="border-r border-b border-gray-200 min-h-[120px] p-1.5 relative bg-white last:border-r-0">
            <span className="text-xs font-medium text-gray-400 mb-1 block">{day}</span>
            <div className="space-y-1">
                {events.map((evt, idx) => (
                    <JobCard key={idx} event={evt} onClick={() => onEventClick && onEventClick(evt.title)} />
                ))}
            </div>
        </div>
    );
};

const JobCard: React.FC<{ event: CalendarEvent, onClick?: () => void }> = ({ event, onClick }) => {
    // Style Map
    const colorStyles = {
        green: 'bg-green-100 border-l-green-400',
        pink: 'bg-red-50 border-l-red-300', // Making pink slightly reddish for mockup accuracy
        blue: 'bg-blue-100 border-l-blue-400',
        yellow: 'bg-yellow-100 border-l-yellow-400',
        red: 'bg-red-100 border-l-red-500',
    };

    return (
        <div onClick={onClick} className={`text-[10px] p-1 border-l-[3px] rounded-r-sm shadow-sm cursor-pointer hover:opacity-80 leading-tight ${colorStyles[event.color]}`}>
            <div className="text-[9px] text-gray-500 uppercase font-semibold mb-0.5 truncate">{event.type}</div>
            <div className="flex items-center justify-between font-bold text-gray-700 truncate">
                <span>{event.title}</span>
                {event.status === 'verified' && <CheckCircle size={8} className="text-green-600 fill-green-100" />}
            </div>
        </div>
    );
};

const SidebarSection: React.FC<{ title: string, count: number, items: SidebarItem[] }> = ({ title, count, items }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xs font-semibold text-gray-700">{title} ({count})</h3>
                <ChevronDown size={14} className="text-gray-400" />
            </div>
            <div className="p-2 space-y-1.5 max-h-60 overflow-y-auto">
                {items.length === 0 ? (
                    <p className="text-xs text-gray-400 italic p-2 text-center">No items</p>
                ) : (
                    items.map((item, idx) => (
                        <div key={idx} className={`px-2 py-1.5 rounded text-xs font-medium border border-transparent hover:border-gray-300 cursor-pointer flex items-center justify-between
                            ${item.color === 'green' ? 'bg-green-100 text-green-800' : 
                              item.color === 'pink' ? 'bg-red-50 text-red-800' :
                              item.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                              item.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-600'
                            }
                        `}>
                            {item.title}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CalendarPage;
