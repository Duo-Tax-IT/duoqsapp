
import React, { useState, useMemo } from 'react';
import TopBar from '../components/TopBar';
import DashboardCard from '../components/DashboardCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell
} from 'recharts';
import { CheckCircle2, AlertCircle, Clock, ChevronDown, X, Search } from 'lucide-react';

// Duplicate mock data (same as PlaceholderPage)
const WEEK1_DATA = [
  { id: '1', day: 'Mon 12', title: 'CC385452-Taylors Lakes', team: 'Team Green', status: 'Done', type: 'DUO TAX IMPROVEMENT REPORT' },
  { id: '2', day: 'Tue 13', title: 'CC384557-East Geelong', team: 'Team Green', status: 'In Progress', type: 'DETAILED COST REPORT' },
  { id: '3', day: 'Tue 13', title: 'CC385229-Buderim', team: 'Team Red', status: 'Done', type: 'COST ESTIMATE - PROGRESS CLAIM REPORT' },
  { id: '4', day: 'Tue 13', title: 'CC385935-Coogee', team: 'Team Pink', status: 'Done', type: 'INSURANCE REPLACEMENT VALUATION REPORT' },
  { id: '5', day: 'Wed 14', title: 'CC384526-Witchcliffe', team: 'Team Red', status: 'In Progress', type: 'COST ESTIMATE - PROGRESS CLAIM REPORT' },
  { id: '6', day: 'Wed 14', title: 'CC384456-Kilmore', team: 'Team Blue', status: 'Done', type: 'PRELIMINARY COST ESTIMATE' },
  { id: '7', day: 'Wed 14', title: 'CC386016-Condell Park', team: 'Team Pink', status: 'In Progress', type: 'COUNCIL COST REPORT' },
  { id: '8', day: 'Wed 14', title: 'CC386014-Murrumbateman', team: 'Team Pink', status: 'Done', type: 'COUNCIL COST REPORT' },
  { id: '9', day: 'Wed 14', title: 'CC384636-Heidelberg', team: 'Team Green', status: 'Done', type: 'DUO TAX IMPROVEMENT REPORT' },
  { id: '10', day: 'Thu 15', title: 'CC386262-North Ryde', team: 'Team Pink', status: 'Open', type: 'COUNCIL COST REPORT' },
  { id: '11', day: 'Thu 15', title: 'CC384336-Annandale', team: 'Team Pink', status: 'Open', type: 'COUNCIL COST REPORT' },
  { id: '12', day: 'Thu 15', title: 'CC386037-West End', team: 'Team Pink', status: 'In Progress', type: 'INSURANCE REPLACEMENT VALUATION REPORT' },
  { id: '13', day: 'Thu 15', title: 'CC385863-East Victoria Park', team: 'Team Green', status: 'Done', type: 'PRELIMINARY COST ESTIMATE' },
  { id: '14', day: 'Fri 16', title: 'CC385812-Hoxton Park', team: 'Team Yellow', status: 'Done', type: 'INITIAL COST REPORT' },
  { id: '15', day: 'Fri 16', title: 'CC354395-Haynes', team: 'Team Yellow', status: 'Open', type: 'INITIAL COST REPORT' },
];

const WEEK2_DATA = [
  { id: '16', day: 'Mon 19', title: 'CC385583-Bohle', team: 'Team Pink', status: 'Open', type: 'INSURANCE REPLACEMENT VALUATION REPORT' },
  { id: '17', day: 'Tue 20', title: 'CC385409-North Kellyville', team: 'Team Red', status: 'Open', type: 'INITIAL COST REPORT - COST TO COMPLETE' },
  { id: '18', day: 'Fri 23', title: 'CC379196-Woollahra', team: 'Team Yellow', status: 'Open', type: 'PRELIMINARY COST ESTIMATE' },
  { id: '19', day: 'Fri 23', title: 'CC386002-Terrey Hills', team: 'Team Blue', status: 'Open', type: 'DETAILED COST REPORT' },
];

const TEAM_COLORS: Record<string, string> = {
  'Team Red': '#EF4444',
  'Team Blue': '#3B82F6',
  'Team Yellow': '#EAB308',
  'Team Green': '#22C55E',
  'Team Pink': '#EC4899',
};

const TEAM_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'Team Red': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  'Team Blue': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'Team Yellow': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  'Team Green': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'Team Pink': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
};

type ReportItem = typeof WEEK1_DATA[number];

function getWeekStats(data: ReportItem[]) {
  const done = data.filter(r => r.status === 'Done').length;
  const inProgress = data.filter(r => r.status === 'In Progress').length;
  const open = data.filter(r => r.status === 'Open').length;
  return { total: data.length, done, inProgress, open, notCompleted: inProgress + open };
}

const ALL_TEAMS = ['Team Red', 'Team Blue', 'Team Yellow', 'Team Green', 'Team Pink'];

function getTeamBreakdown(data: ReportItem[]) {
  const map = new Map<string, { done: number; notCompleted: number; total: number }>();
  ALL_TEAMS.forEach(t => map.set(t, { done: 0, notCompleted: 0, total: 0 }));
  data.forEach(r => {
    if (!map.has(r.team)) map.set(r.team, { done: 0, notCompleted: 0, total: 0 });
    const t = map.get(r.team)!;
    t.total++;
    if (r.status === 'Done') t.done++;
    else t.notCompleted++;
  });
  return Array.from(map.entries())
    .map(([team, stats]) => ({ team, ...stats }))
    .sort((a, b) => a.team.localeCompare(b.team));
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    'Done': 'bg-green-100 text-green-700 border-green-200',
    'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
    'Open': 'bg-red-100 text-red-700 border-red-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
      {status === 'Done' && <CheckCircle2 size={10} />}
      {status === 'In Progress' && <Clock size={10} />}
      {status === 'Open' && <AlertCircle size={10} />}
      {status}
    </span>
  );
};

const TeamBadge: React.FC<{ team: string }> = ({ team }) => {
  const s = TEAM_STYLES[team] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${s.bg} ${s.text} ${s.border}`}>
      {team}
    </span>
  );
};

const SummaryCard: React.FC<{
  weekLabel: string;
  dateRange: string;
  stats: ReturnType<typeof getWeekStats>;
}> = ({ weekLabel, dateRange, stats }) => {
  const pct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;
  return (
    <DashboardCard>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-800">{weekLabel}</h3>
          <p className="text-xs text-gray-500">{dateRange}</p>
        </div>
        <div className={`text-2xl font-black ${pct === 100 ? 'text-green-600' : pct >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
          {pct}%
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${pct === 100 ? 'bg-green-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-lg font-black text-green-600">{stats.done}</div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase">Done</div>
        </div>
        <div>
          <div className="text-lg font-black text-amber-600">{stats.inProgress}</div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase">In Progress</div>
        </div>
        <div>
          <div className="text-lg font-black text-red-600">{stats.open}</div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase">Open</div>
        </div>
      </div>
    </DashboardCard>
  );
};

const TeamBreakdownSection: React.FC<{
  weekLabel: string;
  breakdown: ReturnType<typeof getTeamBreakdown>;
}> = ({ weekLabel, breakdown }) => (
  <DashboardCard>
    <h3 className="text-sm font-bold text-gray-800 mb-4">{weekLabel} — Team Breakdown</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-3 font-bold text-gray-500 uppercase tracking-wide">Team</th>
            <th className="text-center py-2 px-3 font-bold text-gray-500 uppercase tracking-wide">Total</th>
            <th className="text-center py-2 px-3 font-bold text-green-600 uppercase tracking-wide">Completed</th>
            <th className="text-center py-2 px-3 font-bold text-red-600 uppercase tracking-wide">Outstanding</th>
            <th className="text-center py-2 px-3 font-bold text-gray-500 uppercase tracking-wide">Rate</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map(row => {
            const rate = row.total > 0 ? Math.round((row.done / row.total) * 100) : 0;
            return (
              <tr key={row.team} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-2.5 px-3"><TeamBadge team={row.team} /></td>
                <td className="text-center py-2.5 px-3 font-bold text-gray-700">{row.total}</td>
                <td className="text-center py-2.5 px-3 font-bold text-green-600">{row.done}</td>
                <td className="text-center py-2.5 px-3 font-bold text-red-600">{row.notCompleted}</td>
                <td className="text-center py-2.5 px-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${rate === 100 ? 'bg-green-100 text-green-700' : rate >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                    {rate}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </DashboardCard>
);

const STATUS_GROUPS = ['Done', 'In Progress', 'Open'] as const;
type StatusGroup = typeof STATUS_GROUPS[number];

const STATUS_META: Record<StatusGroup, { label: string; color: string; textClass: string }> = {
  'Done':        { label: 'Completed', color: '#22C55E', textClass: 'text-green-600' },
  'In Progress': { label: 'In Progress', color: '#F59E0B', textClass: 'text-amber-600' },
  'Open':        { label: 'Open', color: '#EF4444', textClass: 'text-red-600' },
};

function getTeamCountsByStatus(data: ReportItem[], status: string) {
  const counts: Record<string, number> = {};
  ALL_TEAMS.forEach(t => { counts[t] = 0; });
  data.filter(r => r.status === status).forEach(r => { counts[r.team] = (counts[r.team] || 0) + 1; });
  return counts;
}

function getTeamReportsByStatus(data: ReportItem[], status: string) {
  const map: Record<string, ReportItem[]> = {};
  ALL_TEAMS.forEach(t => { map[t] = []; });
  data.filter(r => r.status === status).forEach(r => {
    if (!map[r.team]) map[r.team] = [];
    map[r.team].push(r);
  });
  return map;
}

const StatusTooltip: React.FC<any> = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0]?.payload;
  if (!entry) return null;

  const weekLabel = entry.week as string;
  const status = entry.status as StatusGroup;
  const meta = STATUS_META[status];
  const weekData = weekLabel === 'Week 1' ? WEEK1_DATA : WEEK2_DATA;
  const reportsByTeam = getTeamReportsByStatus(weekData, status);
  const total = weekData.filter(r => r.status === status).length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-4 max-w-xs">
      <div className="text-xs font-bold text-gray-800 mb-1">{weekLabel} — {meta.label}</div>
      <div className={`text-lg font-black mb-3 ${meta.textClass}`}>{total} <span className="text-xs font-semibold text-gray-500">report{total !== 1 ? 's' : ''}</span></div>
      <div className="space-y-2.5">
        {ALL_TEAMS.map(team => {
          const reports = reportsByTeam[team];
          if (reports.length === 0) return null;
          const style = TEAM_STYLES[team];
          return (
            <div key={team}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: TEAM_COLORS[team] }} />
                <span className={`text-[10px] font-bold uppercase tracking-wide ${style?.text || 'text-gray-700'}`}>{team}</span>
                <span className="text-[10px] font-bold text-gray-400 ml-auto">({reports.length})</span>
              </div>
              <div className="pl-4 space-y-0.5">
                {reports.map(r => (
                  <div key={r.id} className="text-[10px] text-gray-600 truncate">{r.title}</div>
                ))}
              </div>
            </div>
          );
        })}
        {total === 0 && <div className="text-[10px] text-gray-400 italic">None</div>}
      </div>
    </div>
  );
};

const OpsWeeklyReportPage: React.FC = () => {
  const w1Stats = getWeekStats(WEEK1_DATA);
  const w2Stats = getWeekStats(WEEK2_DATA);
  const w1Breakdown = getTeamBreakdown(WEEK1_DATA);
  const w2Breakdown = getTeamBreakdown(WEEK2_DATA);

  const weeks = [
    { label: 'Week 1', short: 'W1', data: WEEK1_DATA },
    { label: 'Week 2', short: 'W2', data: WEEK2_DATA },
  ];
  const chartData = weeks.flatMap(w =>
    STATUS_GROUPS.map(status => ({
      name: `${w.short} ${STATUS_META[status].label}`,
      week: w.label,
      status,
      ...getTeamCountsByStatus(w.data, status),
    }))
  );

  const allReports = useMemo(() => [
    ...WEEK1_DATA.map(r => ({ ...r, week: 'Week 1' })),
    ...WEEK2_DATA.map(r => ({ ...r, week: 'Week 2' })),
  ], []);

  const allTypes = useMemo(() => Array.from(new Set(allReports.map(r => r.type))).sort(), [allReports]);

  const [filterWeek, setFilterWeek] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return allReports.filter(r => {
      if (filterWeek && r.week !== filterWeek) return false;
      if (filterTeam && r.team !== filterTeam) return false;
      if (filterType && r.type !== filterType) return false;
      if (filterStatus && r.status !== filterStatus) return false;
      if (term && !r.title.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [allReports, filterWeek, filterTeam, filterType, filterStatus, searchTerm]);

  const hasActiveFilters = filterWeek || filterTeam || filterType || filterStatus || searchTerm;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#f8fafc]">
      <TopBar
        title="Weekly Report Completion"
        subtitle="Operations"
        description="Completion status of reports across all teams"
      />

      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-[1600px] mx-auto pb-12 space-y-6">

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SummaryCard weekLabel="Week 1" dateRange="Jan 12 – 16, 2026" stats={w1Stats} />
            <SummaryCard weekLabel="Week 2" dateRange="Jan 19 – 23, 2026" stats={w2Stats} />
          </div>

          {/* Bar Chart — All statuses by Team */}
          <DashboardCard>
            <h3 className="text-sm font-bold text-gray-800 mb-1">Completion Overview</h3>
            <p className="text-xs text-gray-500 mb-4">Reports broken down by status and team</p>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              {ALL_TEAMS.map(team => (
                <div key={team} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: TEAM_COLORS[team] }} />
                  <span className="text-[10px] font-bold text-gray-600">{team}</span>
                </div>
              ))}
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barSize={48}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 600 }} interval={0} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} label={{ value: 'Reports', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#9ca3af' } }} />
                  <Tooltip content={<StatusTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                  {ALL_TEAMS.map((team, i) => (
                    <Bar
                      key={team}
                      dataKey={team}
                      stackId="a"
                      fill={TEAM_COLORS[team]}
                      radius={i === ALL_TEAMS.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </DashboardCard>

          {/* Team Breakdowns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <TeamBreakdownSection weekLabel="Week 1" breakdown={w1Breakdown} />
            <TeamBreakdownSection weekLabel="Week 2" breakdown={w2Breakdown} />
          </div>

          {/* Detailed Report Table */}
          <DashboardCard>
            {/* Row 1: Title + Search (primary) + Clear + Count */}
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-sm font-bold text-gray-800">All Reports</h3>

              <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-orange-100 transition-all ml-auto w-56">
                <Search size={14} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search opportunity..."
                  className="bg-transparent border-none outline-none text-xs font-medium ml-2 w-full text-gray-700 placeholder-gray-400"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-1">
                    <X size={12} />
                  </button>
                )}
              </div>

              {hasActiveFilters && (
                <button onClick={() => { setFilterWeek(''); setFilterTeam(''); setFilterType(''); setFilterStatus(''); setSearchTerm(''); }} className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-bold text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-lg transition-colors flex-shrink-0">
                  <X size={10} /> Clear all
                </button>
              )}

              <span className="text-[10px] font-semibold text-gray-400 flex-shrink-0 tabular-nums">{filteredReports.length} of {allReports.length}</span>
            </div>

            {/* Row 2: Filter pills in grouped container */}
            <div className="flex items-center gap-2 bg-gray-50/80 rounded-xl px-3 py-2 border border-gray-100 mb-3">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mr-1 flex-shrink-0">Filters</span>

              <div className="relative">
                <select
                  value={filterWeek}
                  onChange={e => setFilterWeek(e.target.value)}
                  className={`appearance-none pl-2.5 pr-6 py-1 rounded-md text-[11px] font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${filterWeek ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-500 border-gray-200'}`}
                >
                  <option value="">Week</option>
                  <option value="Week 1">Week 1</option>
                  <option value="Week 2">Week 2</option>
                </select>
                <ChevronDown size={9} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={filterTeam}
                  onChange={e => setFilterTeam(e.target.value)}
                  className={`appearance-none pl-2.5 pr-6 py-1 rounded-md text-[11px] font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${filterTeam ? `${TEAM_STYLES[filterTeam]?.bg || 'bg-blue-50'} ${TEAM_STYLES[filterTeam]?.text || 'text-blue-700'} ${TEAM_STYLES[filterTeam]?.border || 'border-blue-200'}` : 'bg-white text-gray-500 border-gray-200'}`}
                >
                  <option value="">Team</option>
                  {ALL_TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={9} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className={`appearance-none pl-2.5 pr-6 py-1 rounded-md text-[11px] font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${filterStatus === 'Done' ? 'bg-green-50 text-green-700 border-green-200' : filterStatus === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-200' : filterStatus === 'Open' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-white text-gray-500 border-gray-200'}`}
                >
                  <option value="">Status</option>
                  <option value="Done">Done</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Open">Open</option>
                </select>
                <ChevronDown size={9} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="w-px h-4 bg-gray-200 mx-1 flex-shrink-0" />

              <div className="relative">
                <select
                  value={filterType}
                  onChange={e => setFilterType(e.target.value)}
                  className={`appearance-none pl-2.5 pr-6 py-1 rounded-md text-[11px] font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all max-w-[220px] ${filterType ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-gray-500 border-gray-200'}`}
                >
                  <option value="">Report Type</option>
                  {allTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={9} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Row 3: Active filter chips (only when filters active) */}
            {(filterWeek || filterTeam || filterStatus || filterType) && (
              <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mr-0.5">Active:</span>
                {filterWeek && (
                  <button onClick={() => setFilterWeek('')} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors">
                    {filterWeek} <X size={8} />
                  </button>
                )}
                {filterTeam && (
                  <button onClick={() => setFilterTeam('')} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border hover:opacity-80 transition-colors ${TEAM_STYLES[filterTeam]?.bg || 'bg-blue-50'} ${TEAM_STYLES[filterTeam]?.text || 'text-blue-700'} ${TEAM_STYLES[filterTeam]?.border || 'border-blue-200'}`}>
                    {filterTeam} <X size={8} />
                  </button>
                )}
                {filterStatus && (
                  <button onClick={() => setFilterStatus('')} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border hover:opacity-80 transition-colors ${filterStatus === 'Done' ? 'bg-green-50 text-green-700 border-green-200' : filterStatus === 'In Progress' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {filterStatus} <X size={8} />
                  </button>
                )}
                {filterType && (
                  <button onClick={() => setFilterType('')} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors max-w-[200px]">
                    <span className="truncate">{filterType}</span> <X size={8} className="flex-shrink-0" />
                  </button>
                )}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-bold text-gray-500 uppercase tracking-wide">Week</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-500 uppercase tracking-wide">Day</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-500 uppercase tracking-wide">Opportunity Name</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-500 uppercase tracking-wide">Team</th>
                    <th className="text-left py-2 px-3 font-bold text-gray-500 uppercase tracking-wide">Type</th>
                    <th className="text-center py-2 px-3 font-bold text-gray-500 uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length > 0 ? filteredReports.map(r => (
                    <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-gray-600">{r.week}</td>
                      <td className="py-2.5 px-3 text-gray-600">{r.day}</td>
                      <td className="py-2.5 px-3 font-medium text-gray-800">{r.title}</td>
                      <td className="py-2.5 px-3"><TeamBadge team={r.team} /></td>
                      <td className="py-2.5 px-3 text-gray-500 max-w-[200px] truncate">{r.type}</td>
                      <td className="py-2.5 px-3 text-center"><StatusBadge status={r.status} /></td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-400 text-xs font-medium">No reports match the selected filters.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </DashboardCard>

        </div>
      </main>
    </div>
  );
};

export default OpsWeeklyReportPage;
