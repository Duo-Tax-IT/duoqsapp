
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import { ChevronDown, RefreshCw, Calendar as CalendarIcon, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

// --- Mock Data Types ---
interface CalendarEvent {
  id: string;
  title: string;
  type: string;
  color: 'green' | 'pink' | 'blue' | 'yellow' | 'red' | 'white';
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
  // Jan 12 (Mon)
  { id: '1', day: 12, type: 'DUO TAX IMPROVEMENT REPORT', title: 'CC385452-Taylors Lakes', color: 'green', status: 'verified' },
  
  // Jan 13 (Tue)
  { id: '2', day: 13, type: 'DETAILED COST REPORT', title: 'CC384557-East Geelong', color: 'green' },
  { id: '3', day: 13, type: 'COST ESTIMATE - PROGRESS CLAIM REPORT', title: 'CC385229-Buderim', color: 'red', status: 'verified' },
  { id: '4', day: 13, type: 'INSURANCE REPLACEMENT VALUATION REPORT', title: 'CC385935-Coogee', color: 'pink' },

  // Jan 14 (Wed)
  { id: '5', day: 14, type: 'COST ESTIMATE - PROGRESS CLAIM REPORT', title: 'CC384526-Witchcliffe', color: 'red' },
  { id: '6', day: 14, type: 'PRELIMINARY COST ESTIMATE', title: 'CC384456-Kilmore', color: 'blue' },
  { id: '7', day: 14, type: 'COUNCIL COST REPORT', title: 'CC386016-Condell Park', color: 'pink' },
  { id: '8', day: 14, type: 'COUNCIL COST REPORT', title: 'CC386014-Murrumbateman', color: 'pink', status: 'verified' },
  { id: '9', day: 14, type: 'DUO TAX IMPROVEMENT REPORT', title: 'CC384636-Heidelberg', color: 'green' },

  // Jan 15 (Thu)
  { id: '10', day: 15, type: 'COUNCIL COST REPORT', title: 'CC386262-North Ryde', color: 'pink' },
  { id: '11', day: 15, type: '', title: 'CC384336-Annandale', color: 'pink' },
  { id: '12', day: 15, type: 'INSURANCE REPLACEMENT VALUATION REPORT', title: 'CC386037-West End', color: 'pink' },
  { id: '13', day: 15, type: 'PRELIMINARY COST ESTIMATE', title: 'CC385863-East Victoria Park', color: 'green', status: 'verified' },

  // Jan 16 (Fri)
  { id: '14', day: 16, type: 'INITIAL COST REPORT', title: 'CC385812-Hoxton Park', color: 'yellow' },
  { id: '15', day: 16, type: '', title: 'CC354395-Haynes', color: 'yellow' },

  // Jan 19 (Mon)
  { id: '16', day: 19, type: 'INSURANCE REPLACEMENT VALUATION REPORT', title: 'CC385583-Bohle', color: 'pink' },

  // Jan 20 (Tue)
  { id: '17', day: 20, type: 'INITIAL COST REPORT - COST TO COMPLETE', title: 'CC385409-North Kellyville', color: 'red' },

  // Jan 23 (Fri)
  { id: '18', day: 23, type: 'PRELIMINARY COST ESTIMATE', title: 'CC379196-Woollahra', color: 'yellow', status: 'verified' },
  { id: '19', day: 23, type: 'DETAILED COST REPORT', title: 'CC386002-Terrey Hills', color: 'blue' },
];

const SIDEBAR_RFI: SidebarItem[] = [
  { id: '1', title: 'CC374344-Blacktown', color: 'pink' },
  { id: '2', title: 'CC375057-Mandurah', color: 'blue' },
  { id: '3', title: 'CC377713-Kingscliff', color: 'blue' },
  { id: '4', title: 'CC378611-Revesby', color: 'green' },
  { id: '5', title: 'CC379370-Palm Beach', color: 'yellow' },
  { id: '6', title: 'CC382777-Gunnedah', color: 'yellow' },
  { id: '7', title: 'CC383774-Kyogle', color: 'pink' },
  { id: '8', title: 'CC368205-Kirrawee', color: 'green' },
  { id: '9', title: 'CC369005-Bargara', color: 'pink' },
];

const SIDEBAR_DRAFT: SidebarItem[] = [
  { id: '1', title: 'CC378611-Revesby', color: 'green' },
  { id: '2', title: 'CC380088-Coombs', color: 'pink' },
  { id: '3', title: 'CC381261-Maroubra', color: 'gray' },
  { id: '4', title: 'CC382777-Gunnedah', color: 'yellow' },
];

const SIDEBAR_REVIEWS: SidebarItem[] = [
  { id: '1', title: 'CC378611-Revesby', color: 'green' },
  { id: '2', title: 'CC381261-Maroubra', color: 'gray' },
  { id: '3', title: 'CC324135-Warwick Farm', color: 'gray' },
  { id: '4', title: 'CC349064-Lawson', color: 'gray' },
  { id: '5', title: 'CC349174-Guyra', color: 'gray' },
  { id: '6', title: 'CC349211-Liverpool', color: 'gray' },
  { id: '7', title: 'CC349418-Manilla', color: 'gray' },
  { id: '8', title: 'CC349467-Bexley', color: 'gray' },
  { id: '9', title: 'CC349505-Warners Bay', color: 'gray' },
  { id: '10', title: 'CC349605-East Tamworth', color: 'gray' },
];

const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const onEventClick = (title: string) => navigate(`/opportunities/${encodeURIComponent(title)}`);
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
                        January 2026 <ChevronDown size={12} />
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

             {/* Days Grid - Approximating the layout for Jan 2026 */}
             <div className="flex-1 grid grid-cols-5 grid-rows-4">
                {/* Week 1: Dec 29 - Jan 2 (Thu/Fri start Jan) */}
                {[29, 30, 31, 1, 2].map((day, idx) => (
                    <div key={`w1-${idx}`} className={`border-r border-b border-gray-200 min-h-[120px] p-1.5 relative bg-white last:border-r-0 ${day > 20 ? 'bg-gray-50/50 text-gray-300' : ''}`}>
                        <span className="text-xs font-medium text-gray-400 mb-1 block">{day}</span>
                    </div>
                ))}
                
                {/* Week 2: Jan 5 - 9 */}
                {[5, 6, 7, 8, 9].map(day => <CalendarCell key={day} day={day} events={CALENDAR_EVENTS.filter(e => e.day === day)} onEventClick={onEventClick} />)}

                {/* Week 3: Jan 12 - 16 */}
                {[12, 13, 14, 15, 16].map(day => <CalendarCell key={day} day={day} events={CALENDAR_EVENTS.filter(e => e.day === day)} onEventClick={onEventClick} />)}

                {/* Week 4: Jan 19 - 23 */}
                {[19, 20, 21, 22, 23].map(day => <CalendarCell key={day} day={day} events={CALENDAR_EVENTS.filter(e => e.day === day)} onEventClick={onEventClick} />)}
                
                {/* Week 5: Jan 26 - 30 */}
                {[26, 27, 28, 29, 30].map(day => <CalendarCell key={day} day={day} events={CALENDAR_EVENTS.filter(e => e.day === day)} onEventClick={onEventClick} />)}
             </div>
          </div>

        </div>

        {/* RIGHT: Sidebar Lists */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col overflow-y-auto p-4 gap-6 flex-shrink-0">
            
            <SidebarSection title="RFI Sent - No Deadline" count={9} items={SIDEBAR_RFI} />
            <SidebarSection title="Draft Report Sent - No Deadline" count={4} items={SIDEBAR_DRAFT} />
            <SidebarSection title="Reviews Docs & Fillout - No Deadline" count={13} items={SIDEBAR_REVIEWS} />
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
        pink: 'bg-pink-100 border-l-pink-400', 
        blue: 'bg-blue-100 border-l-blue-400',
        yellow: 'bg-yellow-100 border-l-yellow-400',
        red: 'bg-red-200 border-l-red-600',
        white: 'bg-white border-l-blue-400 border border-gray-100', // Added white style for cards with white bg
    };

    return (
        <div onClick={onClick} className={`text-[10px] p-1 border-l-[3px] rounded-r-sm shadow-sm cursor-pointer hover:opacity-80 leading-tight ${colorStyles[event.color]}`}>
            {event.type && <div className="text-[8px] text-gray-500 uppercase font-semibold mb-0.5 truncate tracking-tight">{event.type}</div>}
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
                              item.color === 'pink' ? 'bg-pink-50 text-pink-800' :
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
