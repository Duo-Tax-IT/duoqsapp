/**
 * Maps old page-id strings to URL paths.
 * Used by pages that previously called onNavigate(page, id).
 */
export function pageToPath(page: string, id?: string): string {
  switch (page) {
    case 'home':                       return '/home';
    case 'duoqs':                      return '/duoqs';
    case 'dashboard':                  return '/dashboard';
    case 'dashboard-bdm':              return '/dashboard-bdm';
    case 'dashboard-ops':              return '/dashboard-ops';
    case 'calendar':                   return '/calendar';
    case 'task-portal':                return '/task-portal';
    case 'task-detail':                return `/task-detail/${encodeURIComponent(id || '')}`;
    case 'weekly-meetings':            return '/weekly-meetings';
    case 'operations-portal':          return '/operations-portal';
    case 'project-tracker-portal':     return '/project-tracker-portal';
    case 'project-tracker-dashboard':  return '/project-tracker-dashboard';
    case 'templates':
    case 'manage-delegation-templates': return '/templates';
    case 'project-tracker':            return '/project-tracker';
    case 'cc-delegate-list':           return `/cc-delegate-list/${encodeURIComponent(id || '')}`;
    case 'follow-ups':                 return '/follow-ups';
    case 'assignments':                return '/assignments';
    case 'leads':                      return '/leads';
    case 'lead-detail':                return `/leads/${encodeURIComponent(id || '')}`;
    case 'opportunities':              return '/opportunities';
    case 'opportunity-detail':         return `/opportunities/${encodeURIComponent(id || '')}`;
    case 'reports':                    return '/reports';
    case 'contacts':                   return '/contacts';
    case 'accounts':                   return '/accounts';
    case 'recycle-bin':                return '/recycle-bin';
    case 'case-studies':               return '/case-studies';
    case 'pricing-matrix':             return '/pricing-matrix';
    case 'rp-data':                    return '/rp-data';
    case 'qs-database':                return '/qs-database';
    case 'inspectors':                 return '/inspectors';
    case 'document-register':          return '/document-register';
    case 'quantification-manual':      return '/quantification-manual';
    case 'gantt-chart':                return '/gantt-chart';
    case 'ops-weekly-report':          return '/ops-weekly-report';
    case 'qs-rfi':
    case 'qs-rfi-pending':             return '/qs-rfi/pending';
    case 'qs-rfi-received':            return '/qs-rfi/received';
    case 'qs-rfi-create':              return '/qs-rfi/create';
    default:                           return '/dashboard';
  }
}

/**
 * Maps a URL pathname back to the old page-id string.
 * Used by the Layout component to tell SideNav which page is active.
 */
export function pathToPage(pathname: string): string {
  // Strip trailing slash
  const p = pathname.replace(/\/$/, '') || '/';

  if (p === '/' || p === '/dashboard')          return 'dashboard';
  if (p === '/home')                            return 'home';
  if (p === '/duoqs')                           return 'duoqs';
  if (p === '/dashboard-bdm')                   return 'dashboard-bdm';
  if (p === '/dashboard-ops')                   return 'dashboard-ops';
  if (p === '/calendar')                        return 'calendar';
  if (p === '/task-portal')                     return 'task-portal';
  if (p.startsWith('/task-detail/'))            return 'task-portal';
  if (p === '/weekly-meetings')                 return 'weekly-meetings';
  if (p === '/operations-portal')               return 'operations-portal';
  if (p === '/project-tracker-portal')          return 'project-tracker-portal';
  if (p === '/project-tracker-dashboard')       return 'project-tracker-dashboard';
  if (p === '/templates')                       return 'manage-delegation-templates';
  if (p === '/project-tracker')                 return 'project-tracker';
  if (p.startsWith('/cc-delegate-list/'))       return 'project-tracker';
  if (p === '/follow-ups')                      return 'follow-ups';
  if (p === '/assignments')                     return 'assignments';
  if (p === '/leads')                           return 'leads';
  if (p.startsWith('/leads/'))                  return 'leads';
  if (p === '/opportunities')                   return 'opportunities';
  if (p.startsWith('/opportunities/'))          return 'opportunities';
  if (p === '/reports')                         return 'reports';
  if (p === '/contacts')                        return 'contacts';
  if (p === '/accounts')                        return 'accounts';
  if (p === '/recycle-bin')                     return 'recycle-bin';
  if (p === '/case-studies')                    return 'case-studies';
  if (p === '/pricing-matrix')                  return 'pricing-matrix';
  if (p === '/rp-data')                         return 'rp-data';
  if (p === '/qs-database')                     return 'qs-database';
  if (p === '/inspectors')                      return 'inspectors';
  if (p === '/document-register')               return 'document-register';
  if (p === '/quantification-manual')           return 'quantification-manual';
  if (p === '/gantt-chart')                     return 'gantt-chart';
  if (p === '/ops-weekly-report')              return 'operations-portal';
  if (p.startsWith('/qs-rfi'))                  return 'qs-rfi-pending';

  return 'dashboard';
}
