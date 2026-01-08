
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import StatusPath from '../components/StatusPath';
import { FormSection, FormRow } from '../components/FormElements';
import { 
  ArrowLeft, User, TrendingUp, Settings, FolderKanban, Construction, Share2, UploadCloud,
  Crown, Wrench, RefreshCw, ExternalLink, FileText, ChevronDown, Copy, Pencil,
  Search, Filter, ListFilter, MessageCircle, ThumbsUp, MoreHorizontal, Archive,
  Phone, Mail, MessageSquare
} from 'lucide-react';

interface OpportunityDetailPageProps {
  opportunityName: string;
  onBack: () => void;
}

// --- MOCK DATA STORE ---
const MOCK_DATA: Record<string, any> = {
  'default': {
    // Identity
    subtitle: 'cost estimate - progress claim report',
    statusStep: 'Fillout',
    
    // Header Stats
    lastAircall: '15/12/2025 2:45 PM',
    lastAircallBy: 'Called by Steven Leuta',
    lastEmail: '16/12/2025 9:12 AM',
    lastEmailBy: 'Sent by Jack Ho',
    rfiSent: 'Yes (View Report)',
    
    // Notes
    notes: `(09/12/25 JH) CC Deadline Date set to 2025-12-12
(08/12/25 RA) Received an email form Damien with notes:
ANZ have confirmed they will cover the cost of your inspection so can you please now organise a time to visit our site with our building foreman Phil Jeffries on 0417 063 014. The sooner the better if possible as our builders are obviously keen to get paid soon.

(05/12/25 AD) JH sent an email via surveying:
I have cancelled this progress claim on our system until ANZ confirms directly with you whether a QS inspection is required at slab stage and how the fee will be handled. As noted earlier, DUOQS will only proceed once we have your instruction, and at this stage no action has been taken.`,

    // CSR
    reportType: 'insurance replacement valuation report',
    ownerBuilder: false,
    newBuild: false,
    costToComplete: false,
    costBase: false,
    yearBuilt: '',
    sendOffConditions: 'Proceed Without Payment, 100% Payment Upon Completion – Report Uploaded to SF',
    heritage: false,
    floodProne: '',
    difficultAccess: false,
    regional: false,
    clientRates: '',
    fastTrack: false,
    altAdditions: false,
    buildingWorks: false,
    finishesFitout: '',
    extWorks: false,
    retainingWalls: '',
    services: false,
    fitout: false,
    earthworks: false,
    amenities: false,
    otherScope: '',
    
    fee: '$1,100.00',
    invoiceDesc: 'Provision of an insurance replacement valuation report for the house at 4 Appian Way Burwood NSW 2134',
    propAddressInvoice: '30 Verona Range Como NSW 2226',
    depositAmount: '',
    depositPaid: '',
    depositReceived: false,
    depositReconciled: '',
    dnsInvoice: false,
    invoicePaidDate: '',
    invoicePaid: false,
    delayReminder: '',
    delayReason: '',
    trustedReason: '',
    
    docsReviewed: false,
    docsReviewedBy: '',
    awaitingInfo: false,
    awaitingInfoReason: '',
    draftEmail: false,
    excelRated: false,
    excelUnrated: false,
    cubitFile: false,
    reportSent: false,
    reportUploaded: 'No',
    
    assignTeamLeader: 'Edrian Pardillo',
    rfiSendDate: '',
    rfiSender: '',
    rfiReceivedDate: '',
    rfiNotes: '',
    
    propType: 'House',
    street: '30 Verona Range',
    city: 'Como',
    state: 'NSW',
    postcode: '2226',
    scopeWorks: '',
    lga: 'Sutherland',
    
    primaryMobile: '(02) 9262 4919',
    firstName: 'Damien',
    lastName: 'Barker',
    contactMobile: '(02) 9262 4919',
    contact2First: '',
    contact2Last: '',
    contact2Email: '',
    contact2Mobile: '',
    primaryEmail: 'damien@mgmca.com.au',
    contactEmail: 'damien@mgmca.com.au',
    isReferral: 'No',
    
    owner1First: 'Damien',
    owner2First: 'Kathleen',
    owner1Last: 'Barker',
    owner2Last: 'Barker',
    owners: 'Damien & Kathleen Barker',
    
    inspBookedByCC: true,
    surveyType: 'Inspection',
    accessType: 'Owner Occupied',
    tenantInfo: 'Phil Jeffries - building foreman',
    bookingNotes: '(04/12 DTB) LD called owner #not in use/sent email',
    inspInstructions: 'Building foreman Phil Jeffries on 0417 063 014',
    inspBookedBy: 'Jack Ho',
    inspector: 'Jack Ho',
    inspDate: '9/12/2025',
    inspTime: '10:30 AM',
    meetOnSite: 'You are meeting the PM',
    inspOutcome: 'Surveyed. Photos Uploaded.',

    // BDM
    conversionDate: '4/12/2025',
    accountName: 'Damien .',
    deadlineDate: '12/12/2025',
    nonNegotiable: false,
    checkDate: '',
    repeatCustomer: true,
    minTurnaround: '',
    maxTurnaround: '',
    proceedNoPay: true,
    logNotes: '',
    enteredBy: 'Rina Aquino',
    closedBy: 'Steven Leuta',
    relManager: 'James Li',
    referralDetails: 'Masselos Grahame Masselos Pty Ltd > Damien Barker > $990',
    seniorOnshore: '',
    seniorOffshore: '',
    commencementStatus: '',
    accountNotes: '',
    filloutInstr: '',
    isOldXero: false,
    
    // Ops
    delegateList: '',
    folderName: 'CC382581-Como - [Cost Estimate - Progress Claim Report]',
    draftDate: '',
    daysSinceDraft: '0',
    deadlinePriority: 'Medium',
    cubitFillout: '',
    excelFillout: '',
    finalReview: '',
    checkBy: '',
    filloutBy: '',
    
    // PM
    pmConversion: '10/12/2025',
    pmAccount: 'Greg Rowell',
    pmDeadline: '16/12/2025',
    assignTeam: 'Team Green',
    pmAssignTeamLeader: 'Angelo Encabo',
    assignSecondary: '',
    takeOffStart: '11/12/2025',
    takeOffComplete: '16/12/2025',
    ccFinalReview: 'Gregory Christ',
    checkingStart: '16/12/2025',
    checkingComplete: '16/12/2025'
  },
  'CC383072-Picnic Point': {
    // Identity
    subtitle: 'cost estimate - progress claim report',
    statusStep: 'Review',
    
    // Header Stats
    lastAircall: '12/12/2025 10:15 AM',
    lastAircallBy: 'Called by Jack Ho',
    lastEmail: '14/12/2025 3:30 PM',
    lastEmailBy: 'Sent by Steven Leuta',
    rfiSent: 'No (Pending)',

    // Notes
    notes: `(12/12/25 SL) Spoke to client regarding missing structural drawings. Client will follow up with engineer.
(10/12/25 JH) Site inspection confirmed for 15/12. Access code provided for lockbox.
(08/12/25 SL) Initial review of documents. Missing window schedule and finalized floor finishes.
(08/12/25 SL) Project set up in system. Quote accepted by CT Accountants.`,

    // CSR
    reportType: 'cost estimate - progress claim report',
    ownerBuilder: true,
    newBuild: true,
    costToComplete: true,
    costBase: false,
    yearBuilt: '2025',
    sendOffConditions: 'Standard 7 Day Terms',
    heritage: false,
    floodProne: '',
    difficultAccess: false,
    regional: false,
    clientRates: '',
    fastTrack: true,
    altAdditions: false,
    buildingWorks: true,
    finishesFitout: 'High Spec',
    extWorks: true,
    retainingWalls: '',
    services: true,
    fitout: true,
    earthworks: true,
    amenities: false,
    otherScope: 'Pool and Cabana',
    
    fee: '$950.00',
    invoiceDesc: 'Progress Claim Report #2 for 33 Doris Street Picnic Point NSW 2213',
    propAddressInvoice: '33 Doris Street Picnic Point NSW 2213',
    depositAmount: '$400.00',
    depositPaid: 'Yes',
    depositReceived: true,
    depositReconciled: '09/12/2025',
    dnsInvoice: false,
    invoicePaidDate: '',
    invoicePaid: false,
    delayReminder: '',
    delayReason: '',
    trustedReason: 'Referral Partner (CT Accountants)',
    
    docsReviewed: true,
    docsReviewedBy: 'Steven Leuta',
    awaitingInfo: true,
    awaitingInfoReason: 'Missing Structural Engineering',
    draftEmail: false,
    excelRated: true,
    excelUnrated: false,
    cubitFile: true,
    reportSent: false,
    reportUploaded: 'No',
    
    assignTeamLeader: 'Steven Leuta',
    rfiSendDate: '12/12/2025',
    rfiSender: 'Steven Leuta',
    rfiReceivedDate: '',
    rfiNotes: 'Pending structural drawings',
    
    propType: 'House',
    street: '33 Doris Street',
    city: 'Picnic Point',
    state: 'NSW',
    postcode: '2213',
    scopeWorks: 'New Build - Double Storey',
    lga: 'Canterbury-Bankstown',
    
    primaryMobile: '0411 222 333',
    firstName: 'Peter',
    lastName: 'Jones',
    contactMobile: '0411 222 333',
    contact2First: 'Mary',
    contact2Last: 'Jones',
    contact2Email: 'mary.jones@email.com',
    contact2Mobile: '0411 444 555',
    primaryEmail: 'peter.jones@email.com',
    contactEmail: 'peter.jones@email.com',
    isReferral: 'Yes',
    
    owner1First: 'Peter',
    owner2First: 'Mary',
    owner1Last: 'Jones',
    owner2Last: 'Jones',
    owners: 'Peter & Mary Jones',
    
    inspBookedByCC: true,
    surveyType: 'Inspection',
    accessType: 'Lockbox',
    tenantInfo: 'Unoccupied',
    bookingNotes: 'Lockbox code 1984',
    inspInstructions: 'Take photos of retaining wall progress',
    inspBookedBy: 'Steven Leuta',
    inspector: 'Jack Ho',
    inspDate: '15/12/2025',
    inspTime: '09:00 AM',
    meetOnSite: 'Nobody',
    inspOutcome: 'Scheduled',

    // BDM
    conversionDate: '08/12/2025',
    accountName: 'CT Accountants Australia',
    deadlineDate: '15/12/2025',
    nonNegotiable: true,
    checkDate: '14/12/2025',
    repeatCustomer: true,
    minTurnaround: '5 Days',
    maxTurnaround: '10 Days',
    proceedNoPay: false,
    logNotes: 'Urgent turnaround requested',
    enteredBy: 'Quoc Duong',
    closedBy: 'Steven Leuta',
    relManager: 'Duo Tax | Referring',
    referralDetails: 'CT Accountants > Peter Jones > $950',
    seniorOnshore: 'Jack Ho',
    seniorOffshore: 'Edrian Pardillo',
    commencementStatus: 'In Progress',
    accountNotes: 'VIP Referral Partner',
    filloutInstr: 'Follow PC template v2',
    isOldXero: false,
    
    // Ops
    delegateList: 'Picnic Point List',
    folderName: 'CC383072-Picnic Point - [PC2]',
    draftDate: '',
    daysSinceDraft: '0',
    deadlinePriority: 'High',
    cubitFillout: 'Team Blue',
    excelFillout: 'Team Blue',
    finalReview: 'Quoc Duong',
    checkBy: 'Jack Ho',
    filloutBy: 'Team Blue',
    
    // PM
    pmConversion: '08/12/2025',
    pmAccount: 'CT Accountants Australia',
    pmDeadline: '15/12/2025',
    assignTeam: 'Team Blue',
    pmAssignTeamLeader: 'Steven Leuta',
    assignSecondary: 'Team Green',
    takeOffStart: '10/12/2025',
    takeOffComplete: '13/12/2025',
    ccFinalReview: 'Quoc Duong',
    checkingStart: '14/12/2025',
    checkingComplete: '14/12/2025',
    docReviewNotes: 'Waiting on engineer specs'
  },
  'CC377733-Picnic Point': {
    // Identity
    subtitle: 'cost estimate - progress claim report',
    statusStep: 'Job Complete',
    
    // Header Stats
    lastAircall: '05/11/2025 3:45 PM',
    lastAircallBy: 'Called by Steven Leuta',
    lastEmail: '12/11/2025 10:30 AM',
    lastEmailBy: 'Sent by Accounts',
    rfiSent: 'Yes (Completed)',

    // Notes
    notes: `(12/11/25 ACC) Payment received in full. Invoice reconciled.
(05/11/25 SL) Report finalized and sent to client.
(03/11/25 SL) Draft reviewed by client, minor adjustments made to windows schedule.`,

    // CSR
    reportType: 'cost estimate - progress claim report',
    ownerBuilder: true,
    newBuild: true,
    costToComplete: true,
    costBase: false,
    yearBuilt: '2025',
    sendOffConditions: 'Standard 7 Day Terms',
    heritage: false,
    floodProne: '',
    difficultAccess: false,
    regional: false,
    clientRates: '',
    fastTrack: false,
    altAdditions: false,
    buildingWorks: true,
    finishesFitout: 'High Spec',
    extWorks: true,
    retainingWalls: '',
    services: true,
    fitout: true,
    earthworks: true,
    amenities: false,
    otherScope: 'Pool and Cabana',
    
    fee: '$950.00',
    invoiceDesc: 'Progress Claim Report #1 for 33 Doris Street Picnic Point NSW 2213',
    propAddressInvoice: '33 Doris Street Picnic Point NSW 2213',
    depositAmount: '$475.00',
    depositPaid: 'Yes',
    depositReceived: true,
    depositReconciled: '28/10/2025',
    dnsInvoice: false,
    invoicePaidDate: '12/11/2025',
    invoicePaid: true,
    delayReminder: '',
    delayReason: '',
    trustedReason: 'Referral Partner (CT Accountants)',
    
    docsReviewed: true,
    docsReviewedBy: 'Steven Leuta',
    awaitingInfo: false,
    awaitingInfoReason: '',
    draftEmail: true,
    excelRated: true,
    excelUnrated: false,
    cubitFile: true,
    reportSent: true,
    reportUploaded: 'Yes',
    
    assignTeamLeader: 'Steven Leuta',
    rfiSendDate: '30/10/2025',
    rfiSender: 'Steven Leuta',
    rfiReceivedDate: '01/11/2025',
    rfiNotes: 'All docs received',
    
    propType: 'House',
    street: '33 Doris Street',
    city: 'Picnic Point',
    state: 'NSW',
    postcode: '2213',
    scopeWorks: 'New Build - Double Storey',
    lga: 'Canterbury-Bankstown',
    
    primaryMobile: '0411 222 333',
    firstName: 'Peter',
    lastName: 'Jones',
    contactMobile: '0411 222 333',
    contact2First: 'Mary',
    contact2Last: 'Jones',
    contact2Email: 'mary.jones@email.com',
    contact2Mobile: '0411 444 555',
    primaryEmail: 'peter.jones@email.com',
    contactEmail: 'peter.jones@email.com',
    isReferral: 'Yes',
    
    owner1First: 'Peter',
    owner2First: 'Mary',
    owner1Last: 'Jones',
    owner2Last: 'Jones',
    owners: 'Peter & Mary Jones',
    
    inspBookedByCC: true,
    surveyType: 'Inspection',
    accessType: 'Lockbox',
    tenantInfo: 'Unoccupied',
    bookingNotes: 'Lockbox code 1984',
    inspInstructions: 'Confirm lockup stage complete',
    inspBookedBy: 'Steven Leuta',
    inspector: 'Jack Ho',
    inspDate: '02/11/2025',
    inspTime: '11:00 AM',
    meetOnSite: 'Nobody',
    inspOutcome: 'Completed',

    // BDM
    conversionDate: '28/10/2025',
    accountName: 'CT Accountants Australia',
    deadlineDate: '05/11/2025',
    nonNegotiable: false,
    checkDate: '04/11/2025',
    repeatCustomer: true,
    minTurnaround: '5 Days',
    maxTurnaround: '10 Days',
    proceedNoPay: false,
    logNotes: '',
    enteredBy: 'Quoc Duong',
    closedBy: 'Steven Leuta',
    relManager: 'Duo Tax | Referring',
    referralDetails: 'CT Accountants > Peter Jones > $950',
    seniorOnshore: 'Jack Ho',
    seniorOffshore: 'Edrian Pardillo',
    commencementStatus: 'Completed',
    accountNotes: 'VIP Referral Partner',
    filloutInstr: 'Follow PC template v2',
    isOldXero: false,
    
    // Ops
    delegateList: 'Picnic Point List',
    folderName: 'CC377733-Picnic Point - [PC1]',
    draftDate: '03/11/2025',
    daysSinceDraft: '-',
    deadlinePriority: 'Normal',
    cubitFillout: 'Team Blue',
    excelFillout: 'Team Blue',
    finalReview: 'Quoc Duong',
    checkBy: 'Jack Ho',
    filloutBy: 'Team Blue',
    
    // PM
    pmConversion: '28/10/2025',
    pmAccount: 'CT Accountants Australia',
    pmDeadline: '05/11/2025',
    assignTeam: 'Team Green',
    pmAssignTeamLeader: 'Steven Leuta',
    assignSecondary: '',
    takeOffStart: '30/10/2025',
    takeOffComplete: '02/11/2025',
    ccFinalReview: 'Quoc Duong',
    checkingStart: '03/11/2025',
    checkingComplete: '04/11/2025',
    docReviewNotes: 'All clear'
  },
  'CC314870-Williamstown': {
    // Identity
    subtitle: 'initial cost report',
    statusStep: 'Job Complete',
    
    // Header Stats
    lastAircall: '08/10/2024 11:20 AM',
    lastAircallBy: 'Called by Quoc Duong',
    lastEmail: '20/10/2024 4:15 PM',
    lastEmailBy: 'Sent by Accounts',
    rfiSent: 'Yes (Completed)',

    // Notes
    notes: `(20/10/24 ACC) Invoice #INV-2024-889 paid in full.
(08/10/24 QD) Report delivered to Google Drive folder. Client notified.
(01/10/24 QD) Site inspection completed. Access was easy.`,

    // CSR
    reportType: 'initial cost report',
    ownerBuilder: false,
    newBuild: true,
    costToComplete: false,
    costBase: true,
    yearBuilt: '2024',
    sendOffConditions: 'Pre-payment required for first-time client',
    heritage: false,
    floodProne: 'No',
    difficultAccess: false,
    regional: true,
    clientRates: '',
    fastTrack: false,
    altAdditions: false,
    buildingWorks: true,
    finishesFitout: 'Standard',
    extWorks: true,
    retainingWalls: 'Massive sandstone retaining',
    services: true,
    fitout: true,
    earthworks: true,
    amenities: false,
    otherScope: '',
    
    fee: '$2,035.00',
    invoiceDesc: 'Initial Cost Report for 38 Mount Crawford Road Williamstown SA 5351',
    propAddressInvoice: '38 Mount Crawford Road Williamstown SA 5351',
    depositAmount: '$2,035.00',
    depositPaid: 'Yes',
    depositReceived: true,
    depositReconciled: '08/10/2024',
    dnsInvoice: false,
    invoicePaidDate: '08/10/2024',
    invoicePaid: true,
    delayReminder: '',
    delayReason: '',
    trustedReason: '',
    
    docsReviewed: true,
    docsReviewedBy: 'Quoc Duong',
    awaitingInfo: false,
    awaitingInfoReason: '',
    draftEmail: false,
    excelRated: false,
    excelUnrated: false,
    cubitFile: true,
    reportSent: true,
    reportUploaded: 'Yes',
    
    assignTeamLeader: 'Quoc Duong',
    rfiSendDate: '01/10/2024',
    rfiSender: 'Quoc Duong',
    rfiReceivedDate: '03/10/2024',
    rfiNotes: 'Plans received via Dropbox',
    
    propType: 'Commercial',
    street: '38 Mount Crawford Road',
    city: 'Williamstown',
    state: 'SA',
    postcode: '5351',
    scopeWorks: 'New Warehouse Construction',
    lga: 'Barossa',
    
    primaryMobile: '0499 123 456',
    firstName: 'Larry',
    lastName: 'Page',
    contactMobile: '0499 123 456',
    contact2First: '',
    contact2Last: '',
    contact2Email: '',
    contact2Mobile: '',
    primaryEmail: 'larry@google.com',
    contactEmail: 'larry@google.com',
    isReferral: 'No',
    
    owner1First: 'Larry',
    owner2First: 'Sergey',
    owner1Last: 'Page',
    owner2Last: 'Brin',
    owners: 'Larry Page & Sergey Brin',
    
    inspBookedByCC: true,
    surveyType: 'Inspection',
    accessType: 'Open Site',
    tenantInfo: 'Vacant Land',
    bookingNotes: 'Met with site foreman',
    inspInstructions: 'Check boundary pegs',
    inspBookedBy: 'Quoc Duong',
    inspector: 'Quoc Duong',
    inspDate: '01/10/2024',
    inspTime: '02:00 PM',
    meetOnSite: 'Site Foreman',
    inspOutcome: 'Completed',

    // BDM
    conversionDate: '25/09/2024',
    accountName: 'Google (Cost Report)',
    deadlineDate: '08/10/2024',
    nonNegotiable: false,
    checkDate: '07/10/2024',
    repeatCustomer: false,
    minTurnaround: '10 Days',
    maxTurnaround: '15 Days',
    proceedNoPay: false,
    logNotes: 'Big tech client',
    enteredBy: 'Quoc Duong',
    closedBy: 'Quoc Duong',
    relManager: 'Google',
    referralDetails: 'Direct Enquiry',
    seniorOnshore: 'Quoc Duong',
    seniorOffshore: '',
    commencementStatus: 'Completed',
    accountNotes: 'Potential for multiple sites',
    filloutInstr: 'Standard Commercial Template',
    isOldXero: true,
    
    // Ops
    delegateList: 'Williamstown List',
    folderName: 'CC314870-Williamstown - [ICR]',
    draftDate: '',
    daysSinceDraft: '-',
    deadlinePriority: 'High',
    cubitFillout: 'Team Yellow',
    excelFillout: 'Team Yellow',
    finalReview: 'Quoc Duong',
    checkBy: 'Steven Leuta',
    filloutBy: 'Team Yellow',
    
    // PM
    pmConversion: '25/09/2024',
    pmAccount: 'Google',
    pmDeadline: '08/10/2024',
    assignTeam: 'Team Yellow',
    pmAssignTeamLeader: 'Quoc Duong',
    assignSecondary: '',
    takeOffStart: '02/10/2024',
    takeOffComplete: '06/10/2024',
    ccFinalReview: 'Quoc Duong',
    checkingStart: '07/10/2024',
    checkingComplete: '07/10/2024',
    docReviewNotes: 'Adequate docs provided'
  },
  'CC382096-Williamstown': {
    subtitle: 'cost estimate - progress claim report',
    statusStep: 'Review',
    lastAircall: '05/12/2025 10:00 AM',
    lastAircallBy: 'Called by Steven Leuta',
    lastEmail: '09/12/2025 2:00 PM',
    lastEmailBy: 'Sent by Steven Leuta',
    rfiSent: 'Yes (Pending)',
    notes: '(09/12/25 SL) Sent draft report for review.\n(05/12/25 SL) Site photos received.',
    reportType: 'cost estimate - progress claim report',
    ownerBuilder: false, newBuild: true, costToComplete: true,
    fee: '$990.00',
    invoiceDesc: 'Progress Claim Report for Unit 3, 38 Mount Crawford Road',
    propAddressInvoice: '3/38 Mount Crawford Road Williamstown SA 5351',
    street: '3/38 Mount Crawford Road', city: 'Williamstown', state: 'SA', postcode: '5351',
    firstName: 'Larry', lastName: 'Page', primaryMobile: '0499 123 456',
    inspBookedByCC: false, surveyType: 'No Survey',
    conversionDate: '02/12/2025', deadlineDate: '10/12/2025',
    enteredBy: 'Steven Leuta', closedBy: 'Steven Leuta', relManager: 'Google',
    folderName: 'CC382096-Williamstown - [PC]',
    assignTeam: 'Team Pink', pmAssignTeamLeader: 'Kimberly Cuaresma',
    pmConversion: '02/12/2025', pmDeadline: '10/12/2025'
  },
  'CC380746-North Bondi': {
    subtitle: 'council cost report',
    statusStep: 'Job Complete',
    lastAircall: '20/11/2025 11:30 AM',
    lastAircallBy: 'Called by Quoc Duong',
    lastEmail: '01/12/2025 9:00 AM',
    lastEmailBy: 'Sent by Accounts',
    rfiSent: 'Yes (Completed)',
    notes: '(01/12/25 ACC) Final invoice paid.\n(30/11/25 QD) Report sent to client.',
    reportType: 'council cost report',
    ownerBuilder: false, newBuild: false, altAdditions: true,
    fee: '$770.00',
    invoiceDesc: 'Council Cost Report for DA',
    propAddressInvoice: '16 Gould Street North Bondi NSW 2026',
    street: '16 Gould Street', city: 'North Bondi', state: 'NSW', postcode: '2026',
    firstName: 'Sarah', lastName: 'Thodey', primaryMobile: '0400 111 222',
    inspBookedByCC: false, surveyType: 'No Survey',
    conversionDate: '21/11/2025', deadlineDate: '30/11/2025',
    enteredBy: 'Quoc Duong', closedBy: 'Steven Leuta', relManager: 'Quoc Duong',
    folderName: 'CC380746-North Bondi - [CCR]',
    assignTeam: 'Team Red', pmAssignTeamLeader: 'Edrian Pardillo',
    pmConversion: '21/11/2025', pmDeadline: '30/11/2025'
  },
  'CC382839-Warnervale': {
    subtitle: 'initial cost report',
    statusStep: 'Fillout',
    lastAircall: '06/12/2025 2:15 PM',
    lastAircallBy: 'Called by Steven Leuta',
    lastEmail: '05/12/2025 4:45 PM',
    lastEmailBy: 'Sent by Steven Leuta',
    rfiSent: 'Yes (Pending)',
    notes: '(06/12/25 SL) Followed up on civil drawings.\n(05/12/25 SL) Project commenced.',
    reportType: 'initial cost report',
    ownerBuilder: false, newBuild: true,
    fee: '$4,400.00',
    invoiceDesc: 'Initial Cost Report for Commercial Development',
    propAddressInvoice: '12 Shrike Way Warnervale NSW 2259',
    street: '12 Shrike Way', city: 'Warnervale', state: 'NSW', postcode: '2259',
    firstName: 'Michael', lastName: 'Scott', primaryMobile: '0412 345 678',
    inspBookedByCC: true, surveyType: 'Inspection',
    conversionDate: '05/12/2025', deadlineDate: '15/12/2025',
    enteredBy: 'Steven Leuta', closedBy: 'Steven Leuta', relManager: 'Google',
    folderName: 'CC382839-Warnervale - [ICR]',
    assignTeam: 'Team Blue', pmAssignTeamLeader: 'Steven Leuta',
    pmConversion: '05/12/2025', pmDeadline: '15/12/2025'
  },
  'CC380088-Coombs': {
    subtitle: 'initial cost report - cost to complete',
    statusStep: 'Check',
    lastAircall: '19/11/2025 10:00 AM',
    lastAircallBy: 'Called by Steven Leuta',
    lastEmail: '25/11/2025 11:30 AM',
    lastEmailBy: 'Sent by Steven Leuta',
    rfiSent: 'Yes (Received)',
    notes: '(25/11/25 SL) Received updated bank requirements.\n(18/11/25 SL) Initial contact made.',
    reportType: 'initial cost report - cost to complete',
    ownerBuilder: true, newBuild: true,
    fee: '$2,500.00',
    invoiceDesc: 'ICR Cost to Complete for Bank',
    propAddressInvoice: '32 Calaby Street Coombs ACT 2611',
    street: '32 Calaby Street', city: 'Coombs', state: 'ACT', postcode: '2611',
    firstName: 'Jim', lastName: 'Halpert', primaryMobile: '0422 987 654',
    inspBookedByCC: true, surveyType: 'Inspection',
    conversionDate: '18/11/2025', deadlineDate: '28/11/2025',
    enteredBy: 'Steven Leuta', closedBy: 'Steven Leuta', relManager: 'Google',
    folderName: 'CC380088-Coombs - [ICR CTC]',
    assignTeam: 'Team Green', pmAssignTeamLeader: 'Angelo Encabo',
    pmConversion: '18/11/2025', pmDeadline: '28/11/2025'
  },
  'CC378611-Revesby': {
    subtitle: 'cost estimate',
    statusStep: 'Fillout',
    lastAircall: '10/11/2025 3:00 PM',
    lastAircallBy: 'Called by Steven Leuta',
    lastEmail: '10/11/2025 3:30 PM',
    lastEmailBy: 'Sent by Steven Leuta',
    rfiSent: 'No (Pending)',
    notes: '(10/11/25 SL) Pro bono work for long term partner.',
    reportType: 'cost estimate',
    ownerBuilder: false, newBuild: true,
    fee: '$0.00',
    invoiceDesc: 'Pro Bono Cost Estimate',
    propAddressInvoice: '287 Milperra Road Revesby NSW 2212',
    street: '287 Milperra Road', city: 'Revesby', state: 'NSW', postcode: '2212',
    firstName: 'Pam', lastName: 'Beesly', primaryMobile: '0433 112 233',
    inspBookedByCC: false, surveyType: 'No Survey',
    conversionDate: '10/11/2025', deadlineDate: '17/11/2025',
    enteredBy: 'Steven Leuta', closedBy: 'Steven Leuta', relManager: 'Duo Tax',
    folderName: 'CC378611-Revesby - [CE]',
    assignTeam: 'Team Yellow', pmAssignTeamLeader: 'Rengie Ann Argana',
    pmConversion: '10/11/2025', pmDeadline: '17/11/2025'
  },
  'CC382986-Burwood': {
    subtitle: 'insurance replacement valuation report',
    statusStep: 'Awaiting Payment',
    lastAircall: '08/12/2025 1:00 PM',
    lastAircallBy: 'Called by Steven Leuta',
    lastEmail: '08/12/2025 1:30 PM',
    lastEmailBy: 'Sent by Accounts',
    rfiSent: 'No (Pending)',
    notes: '(08/12/25 SL) Invoice sent. Awaiting payment before scheduling inspection.',
    reportType: 'insurance replacement valuation report',
    ownerBuilder: false, newBuild: false,
    fee: '$1,100.00',
    invoiceDesc: 'Insurance Valuation',
    propAddressInvoice: '4 Appian Way Burwood NSW 2134',
    street: '4 Appian Way', city: 'Burwood', state: 'NSW', postcode: '2134',
    firstName: 'Dwight', lastName: 'Schrute', primaryMobile: '0444 555 666',
    inspBookedByCC: true, surveyType: 'Inspection',
    conversionDate: '08/12/2025', deadlineDate: '18/12/2025',
    enteredBy: 'Steven Leuta', closedBy: 'Steven Leuta', relManager: 'Google',
    folderName: 'CC382986-Burwood - [IRVR]',
    assignTeam: 'Team Pink', pmAssignTeamLeader: 'Kimberly Cuaresma',
    pmConversion: '08/12/2025', pmDeadline: '18/12/2025'
  },
  'CC251019-Vaucluse': {
    subtitle: 'council cost report',
    statusStep: 'Job Complete',
    lastAircall: '13/04/2023 10:00 AM',
    lastAircallBy: 'Called by Quoc Duong',
    lastEmail: '23/04/2023 2:00 PM',
    lastEmailBy: 'Sent by Quoc Duong',
    rfiSent: 'Yes (Completed)',
    notes: '(23/04/23 QD) Job completed and sent.',
    reportType: 'council cost report',
    ownerBuilder: false, newBuild: false, altAdditions: true,
    fee: '$660.00',
    invoiceDesc: 'CCR for DA',
    propAddressInvoice: '31 Wentworth Road Vaucluse NSW 2030',
    street: '31 Wentworth Road', city: 'Vaucluse', state: 'NSW', postcode: '2030',
    firstName: 'Andy', lastName: 'Bernard', primaryMobile: '0455 777 888',
    inspBookedByCC: false, surveyType: 'No Survey',
    conversionDate: '13/04/2023', deadlineDate: '23/04/2023',
    enteredBy: 'Quoc Duong', closedBy: 'Quoc Duong', relManager: 'Steven Ong',
    folderName: 'CC251019-Vaucluse - [CCR]',
    assignTeam: 'Team Red', pmAssignTeamLeader: 'Edrian Pardillo',
    pmConversion: '13/04/2023', pmDeadline: '23/04/2023'
  },
  'CC381785-Thrumster': {
    subtitle: 'cost estimate - progress claim report',
    statusStep: 'Awaiting Payment',
    lastAircall: '28/11/2025 9:00 AM',
    lastAircallBy: 'Called by Steven Leuta',
    lastEmail: '28/11/2025 9:30 AM',
    lastEmailBy: 'Sent by Accounts',
    rfiSent: 'No (Pending)',
    notes: '(28/11/25 SL) Regular client. Invoice issued.',
    reportType: 'cost estimate - progress claim report',
    ownerBuilder: true, newBuild: true,
    fee: '$990.00',
    invoiceDesc: 'PC Report #3',
    propAddressInvoice: '38 Coupe Drive Thrumster NSW 2444',
    street: '38 Coupe Drive', city: 'Thrumster', state: 'NSW', postcode: '2444',
    firstName: 'Stanley', lastName: 'Hudson', primaryMobile: '0466 999 000',
    inspBookedByCC: true, surveyType: 'Inspection',
    conversionDate: '28/11/2025', deadlineDate: '08/12/2025',
    enteredBy: 'Steven Leuta', closedBy: 'Steven Leuta', relManager: 'Kim Quach',
    folderName: 'CC381785-Thrumster - [PC]',
    assignTeam: 'Team Blue', pmAssignTeamLeader: 'Steven Leuta',
    pmConversion: '28/11/2025', pmDeadline: '08/12/2025'
  },
  'CC373837-Campbellfield': {
    subtitle: 'cost estimate - progress claim report',
    statusStep: 'Job Complete',
    lastAircall: '16/10/2025 4:00 PM',
    lastAircallBy: 'Called by Jack Ho',
    lastEmail: '23/10/2025 11:00 AM',
    lastEmailBy: 'Sent by Jack Ho',
    rfiSent: 'Yes (Completed)',
    notes: '(23/10/25 JH) Sent to NAB Panel.',
    reportType: 'cost estimate - progress claim report',
    ownerBuilder: true, newBuild: true,
    fee: '$990.00',
    invoiceDesc: 'Progress Claim #5',
    propAddressInvoice: '42-56 Glenbarry Road Campbellfield VIC 3061',
    street: '42-56 Glenbarry Road', city: 'Campbellfield', state: 'VIC', postcode: '3061',
    firstName: 'Kevin', lastName: 'Malone', primaryMobile: '0477 222 111',
    inspBookedByCC: true, surveyType: 'Inspection',
    conversionDate: '16/10/2025', deadlineDate: '23/10/2025',
    enteredBy: 'Jack Ho', closedBy: 'Jack Ho', relManager: 'Quoc Duong',
    folderName: 'CC373837-Campbellfield - [PC]',
    assignTeam: 'Team Yellow', pmAssignTeamLeader: 'Rengie Ann Argana',
    pmConversion: '16/10/2025', pmDeadline: '23/10/2025'
  },
  'CC369385-Campbellfield': {
    subtitle: 'initial cost report - cost to complete',
    statusStep: 'Job Complete',
    lastAircall: '23/09/2025 2:30 PM',
    lastAircallBy: 'Called by Steven Leuta',
    lastEmail: '30/09/2025 5:00 PM',
    lastEmailBy: 'Sent by Steven Leuta',
    rfiSent: 'Yes (Completed)',
    notes: '(30/09/25 SL) CTC Completed.',
    reportType: 'initial cost report - cost to complete',
    ownerBuilder: true, newBuild: true,
    fee: '$4,180.00',
    invoiceDesc: 'ICR Cost to Complete',
    propAddressInvoice: '42-56 Glenbarry Road Campbellfield VIC 3061',
    street: '42-56 Glenbarry Road', city: 'Campbellfield', state: 'VIC', postcode: '3061',
    firstName: 'Kevin', lastName: 'Malone', primaryMobile: '0477 222 111',
    inspBookedByCC: true, surveyType: 'Inspection',
    conversionDate: '23/09/2025', deadlineDate: '30/09/2025',
    enteredBy: 'Steven Leuta', closedBy: 'Steven Leuta', relManager: 'Quoc Duong',
    folderName: 'CC369385-Campbellfield - [ICR CTC]',
    assignTeam: 'Team Yellow', pmAssignTeamLeader: 'Rengie Ann Argana',
    pmConversion: '23/09/2025', pmDeadline: '30/09/2025'
  },
  'CC382232-Campbellfield': {
    subtitle: 'cost estimate - progress claim report',
    statusStep: 'Fillout',
    lastAircall: '02/12/2025 10:45 AM',
    lastAircallBy: 'Called by Jack Ho',
    lastEmail: '02/12/2025 11:00 AM',
    lastEmailBy: 'Sent by Jack Ho',
    rfiSent: 'Yes (Pending)',
    notes: '(02/12/25 JH) New claim received.',
    reportType: 'cost estimate - progress claim report',
    ownerBuilder: true, newBuild: true,
    fee: '$990.00',
    invoiceDesc: 'Progress Claim #6',
    propAddressInvoice: '42-56 Glenbarry Road Campbellfield VIC 3061',
    street: '42-56 Glenbarry Road', city: 'Campbellfield', state: 'VIC', postcode: '3061',
    firstName: 'Kevin', lastName: 'Malone', primaryMobile: '0477 222 111',
    inspBookedByCC: true, surveyType: 'Inspection',
    conversionDate: '02/12/2025', deadlineDate: '09/12/2025',
    enteredBy: 'Jack Ho', closedBy: 'Jack Ho', relManager: 'Quoc Duong',
    folderName: 'CC382232-Campbellfield - [PC]',
    assignTeam: 'Team Yellow', pmAssignTeamLeader: 'Rengie Ann Argana',
    pmConversion: '02/12/2025', pmDeadline: '09/12/2025'
  },
  'CC382262-Middleton Grange': {
    subtitle: 'cost estimate - progress claim report',
    statusStep: 'Awaiting Payment',
    lastAircall: '03/12/2025 3:30 PM',
    lastAircallBy: 'Called by Steven Leuta',
    lastEmail: '03/12/2025 4:00 PM',
    lastEmailBy: 'Sent by Accounts',
    rfiSent: 'No (Pending)',
    notes: '(03/12/25 SL) Invoice sent.',
    reportType: 'cost estimate - progress claim report',
    ownerBuilder: true, newBuild: true,
    fee: '$990.00',
    invoiceDesc: 'Progress Claim #2',
    propAddressInvoice: 'Lot 55, No. 11 Sonic Close, Middleton Grange NSW 2171',
    street: '11 Sonic Close', city: 'Middleton Grange', state: 'NSW', postcode: '2171',
    firstName: 'Angela', lastName: 'Martin', primaryMobile: '0488 333 444',
    inspBookedByCC: true, surveyType: 'Inspection',
    conversionDate: '03/12/2025', deadlineDate: '10/12/2025',
    enteredBy: 'Steven Leuta', closedBy: 'Steven Leuta', relManager: 'Google',
    folderName: 'CC382262-Middleton Grange - [PC]',
    assignTeam: 'Team Blue', pmAssignTeamLeader: 'Steven Leuta',
    pmConversion: '03/12/2025', pmDeadline: '10/12/2025'
  },
  'CC378997-Axedale': {
    subtitle: 'initial cost report - cost to complete',
    statusStep: 'Job Complete',
    lastAircall: '12/11/2025 11:00 AM',
    lastAircallBy: 'Called by Steven Leuta',
    lastEmail: '22/11/2025 4:00 PM',
    lastEmailBy: 'Sent by Steven Leuta',
    rfiSent: 'Yes (Completed)',
    notes: '(22/11/25 SL) Report completed and sent.',
    reportType: 'initial cost report - cost to complete',
    ownerBuilder: true, newBuild: true,
    fee: '$3,300.00',
    invoiceDesc: 'ICR CTC for Bank',
    propAddressInvoice: '31 Raglan Place Axedale VIC 3551',
    street: '31 Raglan Place', city: 'Axedale', state: 'VIC', postcode: '3551',
    firstName: 'Oscar', lastName: 'Martinez', primaryMobile: '0499 555 666',
    inspBookedByCC: true, surveyType: 'Inspection',
    conversionDate: '12/11/2025', deadlineDate: '22/11/2025',
    enteredBy: 'Steven Leuta', closedBy: 'Steven Leuta', relManager: 'Steven Leuta',
    folderName: 'CC378997-Axedale - [ICR CTC]',
    assignTeam: 'Team Green', pmAssignTeamLeader: 'Angelo Encabo',
    pmConversion: '12/11/2025', pmDeadline: '22/11/2025'
  }
};

const OpportunityDetailPage: React.FC<OpportunityDetailPageProps> = ({ opportunityName, onBack }) => {
  const [activeTab, setActiveTab] = useState<'CSR' | 'BDM' | 'Operations' | 'PM'>('CSR');

  // Determine which data set to use
  const data = MOCK_DATA[opportunityName] || MOCK_DATA['default'];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-100">
      <TopBar 
        title={opportunityName || "Opportunity Detail"} 
        subtitle={data.subtitle} 
        description="View and manage opportunity specifics" 
      />

      {/* Top Status Bar */}
      <StatusPath currentStep={data.statusStep} />

      {/* Action Toolbar with Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-6 w-full md:w-auto">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-brand-orange transition-colors flex-shrink-0"
            >
              <ArrowLeft size={14} /> Back
            </button>

            {/* Department Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto max-w-full">
                <TabButton 
                    label="CSR" 
                    icon={<User size={14} />} 
                    isActive={activeTab === 'CSR'} 
                    onClick={() => setActiveTab('CSR')} 
                />
                <TabButton 
                    label="BDM" 
                    icon={<TrendingUp size={14} />} 
                    isActive={activeTab === 'BDM'} 
                    onClick={() => setActiveTab('BDM')} 
                />
                <TabButton 
                    label="Operations" 
                    icon={<Settings size={14} />} 
                    isActive={activeTab === 'Operations'} 
                    onClick={() => setActiveTab('Operations')} 
                />
                <TabButton 
                    label="Project Mgmt" 
                    icon={<FolderKanban size={14} />} 
                    isActive={activeTab === 'PM'} 
                    onClick={() => setActiveTab('PM')} 
                />
            </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto justify-end">
             <button className="hidden md:block px-3 py-1.5 text-xs font-bold text-white bg-brand-orange rounded hover:bg-orange-600 transition-colors">
                Create Lead
             </button>
             <button className="hidden md:block px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors">
                Resend Invoice
             </button>
             <button className="hidden md:block px-3 py-1.5 text-xs font-bold text-white bg-red-500 rounded hover:bg-red-600 transition-colors">
                Cancel
             </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-6">
        
        {/* SUMMARY METRICS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-[1600px] mx-auto">
            {/* Last Aircall */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-2 bg-orange-50 text-brand-orange rounded-lg">
                    <Phone size={20} />
                </div>
                <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">LAST AIRCALL</h4>
                    <p className="text-sm font-bold text-gray-900">{data.lastAircall}</p>
                    <p className="text-xs text-gray-500 italic mt-0.5">{data.lastAircallBy}</p>
                </div>
            </div>

            {/* Last Email */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                    <Mail size={20} />
                </div>
                <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">LAST EMAIL</h4>
                    <p className="text-sm font-bold text-gray-900">{data.lastEmail}</p>
                    <p className="text-xs text-gray-500 italic mt-0.5">{data.lastEmailBy}</p>
                </div>
            </div>

            {/* RFI Sent */}
            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                    <MessageSquare size={20} />
                </div>
                <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">RFI SENT</h4>
                    <div className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
                        {data.rfiSent} <ExternalLink size={12} />
                    </div>
                    <p className="text-xs text-gray-500 italic mt-0.5">Linked to Pending RFI Queue</p>
                </div>
            </div>
        </div>

        {/* CSR TAB CONTENT (Standard Layout - No General Section) */}
        {activeTab === 'CSR' && (
            <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
                {/* LEFT COLUMN - MAIN FORMS */}
                <div className="col-span-12 xl:col-span-8 space-y-4">
                    
                    {/* SECTION 1: Project Scope */}
                    <FormSection title="Project Scope (Filled out by CSR)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Report Type" value={data.reportType} />
                                <FormRow label="Owner Builder" value={data.ownerBuilder} type="checkbox" />
                                <FormRow label="New Build" value={data.newBuild} type="checkbox" />
                                <FormRow label="CC Cost to Complete" value={data.costToComplete} type="checkbox" />
                                <FormRow label="CC Cost Base" value={data.costBase} type="checkbox" />
                                <FormRow label="CC Year Built" value={data.yearBuilt} info />
                                <FormRow label="Report Send Off Conditions" value={data.sendOffConditions} type="multiline" />
                                <FormRow label="Heritage-listed / Conservation Zone" value={data.heritage} type="checkbox" />
                                <FormRow label="Flood or Bushfire-Prone Site" value={data.floodProne} />
                                <FormRow label="Steep or Difficult Access Site" value={data.difficultAccess} type="checkbox" />
                                <FormRow label="Regional or Remote Location (Cost Adjust)" value={data.regional} type="checkbox" />
                                <FormRow label="Client-Supplied Rates or Quantities" value={data.clientRates} />
                                <FormRow label="Fast-Track / Urgent Delivery Required" value={data.fastTrack} type="checkbox" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Alteration and Additions" value={data.altAdditions} type="checkbox" />
                                <FormRow label="Building Works" value={data.buildingWorks} type="checkbox" info />
                                <FormRow label="Finishes & Fitout" value={data.finishesFitout} />
                                <FormRow label="External Works & Services" value={data.extWorks} type="checkbox" />
                                <FormRow label="Retaining Walls / Civil Infrastructure" value={data.retainingWalls} />
                                <FormRow label="Mechanical / Electrical / Hydraulic Serv" value={data.services} type="checkbox" />
                                <FormRow label="Fitout" value={data.fitout} type="checkbox" />
                                <FormRow label="Earthworks" value={data.earthworks} type="checkbox" />
                                <FormRow label="Amenities" value={data.amenities} type="checkbox" />
                                <FormRow label="Other" value={data.otherScope} info />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 2: Accounting */}
                    <FormSection title="Accounting">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Report Fee" value={data.fee} />
                                <FormRow label="Invoice Description" value={data.invoiceDesc} type="multiline" />
                                <FormRow label="Property Address On Invoice" value={data.propAddressInvoice} info />
                                <FormRow label="Deposit Amount" value={data.depositAmount} info />
                                <FormRow label="Invoice Deposit Paid" value={data.depositPaid} />
                                <FormRow label="Deposit Received" value={data.depositReceived} type="checkbox" info />
                                <FormRow label="Deposit Reconciled Date" value={data.depositReconciled} info />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="DNS Invoice" value={data.dnsInvoice} type="checkbox" />
                                <FormRow label="Invoice Paid Date" value={data.invoicePaidDate} />
                                <FormRow label="Invoice Paid" value={data.invoicePaid} type="checkbox" />
                                <FormRow label="Delay Invoice Reminder" value={data.delayReminder} />
                                <FormRow label="Delay Invoice Reminder Reason" value={data.delayReason} />
                                <FormRow label="Trusted Reason" value={data.trustedReason} info />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 3: Report */}
                    <FormSection title="Report">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Documents Reviewed" value={data.docsReviewed} type="checkbox" info />
                                <FormRow label="CC Documents Reviewed By" value={data.docsReviewedBy} info />
                                <FormRow label="Awaiting Information (Don't fillout)" value={data.awaitingInfo} type="checkbox" info />
                                <FormRow label="Awaiting Information Reason" value={data.awaitingInfoReason} />
                                <FormRow label="Draft Report Send Via Email" value={data.draftEmail} type="checkbox" info />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Excel BOQ (Rated) to be sent out" value={data.excelRated} type="checkbox" />
                                <FormRow label="Excel BOQ (Unrated) to be sent out" value={data.excelUnrated} type="checkbox" />
                                <FormRow label="Cubit File (CBX) to be sent out" value={data.cubitFile} type="checkbox" />
                                <FormRow label="Report Sent" value={data.reportSent} type="checkbox" info />
                                <FormRow label="Report Uploaded" value={data.reportUploaded} />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 4: Request for Information */}
                    <FormSection title="Request for Information">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="CC Assign To Team - Leader" value={data.assignTeamLeader} info />
                                <FormRow label="RFI Send Date" value={data.rfiSendDate} />
                                <FormRow label="RFI Sender" value={data.rfiSender} />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="RFI Received Date" value={data.rfiReceivedDate} />
                                <FormRow label="RFI Notes" value={data.rfiNotes} />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 5: Property Details */}
                    <FormSection title="Property Details">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Property Type" value={data.propType} />
                                <FormRow label="Property Address Street" value={data.street} />
                                <FormRow label="Property Address City" value={data.city} />
                                <FormRow label="Property Address State" value={data.state} />
                                <FormRow label="Property Address Postcode" value={data.postcode} />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="CC Scope of Works" value={data.scopeWorks} />
                                <FormRow label="LGA (Council)" value={data.lga} />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 6: Contact */}
                    <FormSection title="Contact">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Primary Contact Mobile" value={data.primaryMobile} />
                                <FormRow label="Contact First Name" value={data.firstName} />
                                <FormRow label="Contact Last Name" value={data.lastName} />
                                <FormRow label="Contact Mobile" value={data.contactMobile} type="link" />
                                <FormRow label="Contact #2 First Name" value={data.contact2First} />
                                <FormRow label="Contact #2 Last Name" value={data.contact2Last} />
                                <FormRow label="Contact #2 Email" value={data.contact2Email} />
                                <FormRow label="Contact #2 Mobile" value={data.contact2Mobile} />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Primary Contact Email" value={data.primaryEmail} type="link" />
                                <FormRow label="Contact Email" value={data.contactEmail} type="link" />
                                <FormRow label="Contact is Referral Partner" value={data.isReferral} info />
                            </div>
                        </div>
                    </FormSection>

                     {/* SECTION 7: Ownership */}
                     <FormSection title="Ownership">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="First Name (Owner 1)" value={data.owner1First} />
                                <FormRow label="First Name (Owner 2)" value={data.owner2First} />
                                <FormRow label="First Name (Owner 3)" value="" />
                                <FormRow label="First Name (Owner 4)" value="" />
                                <FormRow label="First Name (Owner 5)" value="" />
                                <FormRow label="Owners" value={data.owners} />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Last Name (Owner 1)" value={data.owner1Last} />
                                <FormRow label="Last Name (Owner 2)" value={data.owner2Last} />
                                <FormRow label="Last Name (Owner 3)" value="" />
                                <FormRow label="Last Name (Owner 4)" value="" />
                                <FormRow label="Last Name (Owner 5)" value="" />
                            </div>
                        </div>
                    </FormSection>

                     {/* SECTION 8: Inspection */}
                     <FormSection title="Inspection">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Inspection Booked by CC" value={data.inspBookedByCC} type="checkbox" />
                                <FormRow label="Survey Type" value={data.surveyType} />
                                <FormRow label="Access Type" value={data.accessType} />
                                <FormRow label="Tenant info" value={data.tenantInfo} />
                                <FormRow label="Booking Notes (Admin Only)" value={data.bookingNotes} />
                                <FormRow label="Instructions for Inspector" value={data.inspInstructions} />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Inspection Booked By" value={data.inspBookedBy} type="link" />
                                <FormRow label="Inspector" value={data.inspector} type="link" />
                                <FormRow label="Inspection Date (new)" value={data.inspDate} />
                                <FormRow label="Inspection Time (new)" value={data.inspTime} />
                                <FormRow label="Who Inspector is meet-ing on site" value={data.meetOnSite} />
                                <FormRow label="Inspection Outcome" value={data.inspOutcome} info />
                            </div>
                        </div>
                    </FormSection>

                </div>

                {/* RIGHT COLUMN - SIDEBAR */}
                <div className="col-span-12 xl:col-span-4 space-y-4">
                    <RightSidebar data={data} />
                </div>
            </div>
        )}

        {/* BDM TAB CONTENT (New DUOQS Layout) */}
        {activeTab === 'BDM' && (
             <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
                {/* LEFT COLUMN - BDM View */}
                <div className="col-span-12 xl:col-span-8 space-y-4">
                    
                    {/* SECTION 1: DUOQS - General */}
                    <FormSection title="DUOQS - General">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Conversion Date" value={data.conversionDate} />
                                <FormRow label="Account Name" value={data.accountName} type="link" />
                                <FormRow label="Deadline Date" value={data.deadlineDate} />
                                <FormRow label="Non-Negotiable Deadline Date" value={data.nonNegotiable} type="checkbox" />
                                <FormRow label="CC Check Date (Estimated)" value={data.checkDate} />
                                <FormRow label="Repeat Customer" value={data.repeatCustomer} type="checkbox" info />
                                <FormRow label="Fee Proposal Minimum Turnaround Date" value={data.minTurnaround} />
                                <FormRow label="Fee Proposal Maximum Turnaround Date" value={data.maxTurnaround} />
                                <FormRow label="Invoice Paid Date" value={data.invoicePaidDate} />
                                <FormRow label="Proceed without Payment" value={data.proceedNoPay} type="checkbox" />
                                <FormRow label="Report Fee" value={data.fee} />
                                <FormRow label="Deposit Received" value={data.depositReceived} type="checkbox" info />
                                <FormRow label="Deposit Amount" value={data.depositAmount} info />
                                <FormRow label="Log Opp Notes" value={data.logNotes} info />
                                <FormRow label="Opportunity Notes" value={data.notes} type="multiline" info />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Report Type" value={data.reportType} />
                                <FormRow label="Entered By" value={data.enteredBy} type="link" info />
                                <FormRow label="Closed By" value={data.closedBy} type="link" />
                                <FormRow label="Relationship Manager" value={data.relManager} type="link" />
                                <FormRow label="Referral Details" value={data.referralDetails} />
                                <FormRow label="CC Senior Onshore Estimator Incharge" value={data.seniorOnshore} />
                                <FormRow label="CC Senior Offshore Estimator Incharge" value={data.seniorOffshore} />
                                <FormRow label="CC Report Commencement Status" value={data.commencementStatus} />
                                <FormRow label="Account Opportunity Notes" value={data.accountNotes} />
                                <FormRow label="Fillout Stage Instructions" value={data.filloutInstr} info />
                                <FormRow label="Awaiting Information (Don't fillout)" value={data.awaitingInfo} type="checkbox" info />
                                <FormRow label="Awaiting Information Reason" value={data.awaitingInfoReason} info />
                            </div>
                        </div>
                    </FormSection>

                    <div className="px-1">
                        <FormRow label="IsOldXeroProcess" value={data.isOldXero} type="checkbox" />
                    </div>

                    {/* SECTION 2: Project Scope (BDM Version) */}
                    <FormSection title="Project Scope (Filled out by CSR)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Report Type" value={data.reportType} />
                                <FormRow label="Owner Builder" value={data.ownerBuilder} type="checkbox" />
                                <FormRow label="New Build" value={data.newBuild} type="checkbox" />
                                <FormRow label="CC Cost to Complete" value={data.costToComplete} type="checkbox" />
                                <FormRow label="CC Cost Base" value={data.costBase} type="checkbox" />
                                <FormRow label="CC Year Built" value={data.yearBuilt} info />
                                <FormRow label="Report Send Off Conditions" value={data.sendOffConditions} type="multiline" />
                                <FormRow label="Draft Report Send Via Email" value={data.draftEmail} type="checkbox" info />
                                <FormRow label="Excel BOQ (Rated) to be sent out" value={data.excelRated} type="checkbox" />
                                <FormRow label="Excel BOQ (Unrated) to be sent out" value={data.excelUnrated} type="checkbox" />
                                <FormRow label="Cubit File (CBX) to be sent out" value={data.cubitFile} type="checkbox" />
                                <FormRow label="Heritage-listed / Conservation Zone" value={data.heritage} type="checkbox" />
                                <FormRow label="Flood or Bushfire-Prone Site" value={data.floodProne} />
                                <FormRow label="Steep or Difficult Access Site" value={data.difficultAccess} type="checkbox" />
                                <FormRow label="Regional or Remote Location (Cost Adjust)" value={data.regional} type="checkbox" />
                                <FormRow label="Client-Supplied Rates or Quantities" value={data.clientRates} />
                                <FormRow label="Fast-Track / Urgent Delivery Required" value={data.fastTrack} type="checkbox" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Alteration and Additions" value={data.altAdditions} type="checkbox" />
                                <FormRow label="Building Works" value={data.buildingWorks} type="checkbox" info />
                                <FormRow label="Finishes & Fitout" value={data.finishesFitout} />
                                <FormRow label="External Works & Services" value={data.extWorks} type="checkbox" />
                                <FormRow label="Retaining Walls / Civil Infrastructure" value={data.retainingWalls} />
                                <FormRow label="Mechanical / Electrical / Hydraulic Serv" value={data.services} type="checkbox" />
                                <FormRow label="Fitout" value={data.fitout} type="checkbox" />
                                <FormRow label="Earthworks" value={data.earthworks} type="checkbox" />
                                <FormRow label="Amenities" value={data.amenities} type="checkbox" />
                                <FormRow label="Other" value={data.otherScope} info />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 3: DUOQS Inspection */}
                    <FormSection title="DUOQS Inspection">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Survey Type" value={data.surveyType} />
                                <FormRow label="Inspection Booked By" value={data.inspBookedBy} type="link" />
                                <FormRow label="Inspection Time (new)" value={data.inspTime} />
                                <FormRow label="Who Inspector is meeting on site" value={data.meetOnSite} />
                                <FormRow label="Inspection Outcome" value={data.inspOutcome} info />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Inspection Booked by CC" value={data.inspBookedByCC} type="checkbox" />
                                <FormRow label="Inspector" value={data.inspector} type="link" />
                                <FormRow label="Inspector Fee" value="" />
                                <FormRow label="Instructions for Inspector" value={data.inspInstructions} />
                                <FormRow label="Inspection Cancelled Reason" value="" info />
                                <FormRow label="Inspection Booked by Closed By" value={false} type="checkbox" />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 4: Request for Information */}
                    <FormSection title="Request for Information">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="CC Assign To Team - Leader" value={data.assignTeamLeader} info />
                                <FormRow label="RFI Send Date" value={data.rfiSendDate} />
                                <FormRow label="RFI Sender" value={data.rfiSender} />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="RFI Received Date" value={data.rfiReceivedDate} />
                                <FormRow label="RFI Notes" value={data.rfiNotes} />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 5: Property Details */}
                    <FormSection title="Property Details">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Property Type" value={data.propType} />
                                <FormRow label="Property Address Street" value={data.street} />
                                <FormRow label="Property Address City" value={data.city} />
                                <FormRow label="Property Address State" value={data.state} />
                                <FormRow label="Property Address Postcode" value={data.postcode} />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="CC Scope of Works" value={data.scopeWorks} />
                                <FormRow label="LGA (Council)" value={data.lga} />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 6: Contact */}
                    <FormSection title="Contact">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Primary Contact Mobile" value={data.primaryMobile} />
                                <FormRow label="Contact First Name" value={data.firstName} />
                                <FormRow label="Contact Last Name" value={data.lastName} />
                                <FormRow label="Contact Mobile" value={data.contactMobile} type="link" />
                                <FormRow label="Contact #2 First Name" value={data.contact2First} />
                                <FormRow label="Contact #2 Last Name" value={data.contact2Last} />
                                <FormRow label="Contact #2 Email" value={data.contact2Email} />
                                <FormRow label="Contact #2 Mobile" value={data.contact2Mobile} />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Primary Contact Email" value={data.primaryEmail} type="link" />
                                <FormRow label="Contact Email" value={data.contactEmail} type="link" />
                                <FormRow label="Contact is Referral Partner" value={data.isReferral} info />
                            </div>
                        </div>
                    </FormSection>

                     {/* SECTION 7: Ownership */}
                     <FormSection title="Ownership">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="First Name (Owner 1)" value={data.owner1First} />
                                <FormRow label="First Name (Owner 2)" value={data.owner2First} />
                                <FormRow label="First Name (Owner 3)" value="" />
                                <FormRow label="First Name (Owner 4)" value="" />
                                <FormRow label="First Name (Owner 5)" value="" />
                                <FormRow label="Owners" value={data.owners} />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Last Name (Owner 1)" value={data.owner1Last} />
                                <FormRow label="Last Name (Owner 2)" value={data.owner2Last} />
                                <FormRow label="Last Name (Owner 3)" value="" />
                                <FormRow label="Last Name (Owner 4)" value="" />
                                <FormRow label="Last Name (Owner 5)" value="" />
                            </div>
                        </div>
                    </FormSection>

                </div>

                {/* RIGHT COLUMN - SIDEBAR */}
                <div className="col-span-12 xl:col-span-4 space-y-4">
                    <RightSidebar data={data} />
                </div>
             </div>
        )}

        {/* OPERATIONS TAB CONTENT (New Layout) */}
        {activeTab === 'Operations' && (
             <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
                {/* LEFT COLUMN - Operations View */}
                <div className="col-span-12 xl:col-span-8 space-y-4">
                    
                    {/* SECTION 1: Project Scope (Added) */}
                    <FormSection title="Project Scope (Filled out by CSR)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Report Type" value={data.reportType} />
                                <FormRow label="Owner Builder" value={data.ownerBuilder} type="checkbox" />
                                <FormRow label="New Build" value={data.newBuild} type="checkbox" />
                                <FormRow label="CC Cost to Complete" value={data.costToComplete} type="checkbox" />
                                <FormRow label="CC Cost Base" value={data.costBase} type="checkbox" />
                                <FormRow label="CC Year Built" value={data.yearBuilt} info />
                                <FormRow label="Report Send Off Conditions" value={data.sendOffConditions} type="multiline" />
                                <FormRow label="Heritage-listed / Conservation Zone" value={data.heritage} type="checkbox" />
                                <FormRow label="Flood or Bushfire-Prone Site" value={data.floodProne} />
                                <FormRow label="Steep or Difficult Access Site" value={data.difficultAccess} type="checkbox" />
                                <FormRow label="Regional or Remote Location (Cost Adjust)" value={data.regional} type="checkbox" />
                                <FormRow label="Client-Supplied Rates or Quantities" value={data.clientRates} />
                                <FormRow label="Fast-Track / Urgent Delivery Required" value={data.fastTrack} type="checkbox" />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="Alteration and Additions" value={data.altAdditions} type="checkbox" />
                                <FormRow label="Building Works" value={data.buildingWorks} type="checkbox" info />
                                <FormRow label="Finishes & Fitout" value={data.finishesFitout} />
                                <FormRow label="External Works & Services" value={data.extWorks} type="checkbox" />
                                <FormRow label="Retaining Walls / Civil Infrastructure" value={data.retainingWalls} />
                                <FormRow label="Mechanical / Electrical / Hydraulic Serv" value={data.services} type="checkbox" />
                                <FormRow label="Fitout" value={data.fitout} type="checkbox" />
                                <FormRow label="Earthworks" value={data.earthworks} type="checkbox" />
                                <FormRow label="Amenities" value={data.amenities} type="checkbox" />
                                <FormRow label="Other" value={data.otherScope} info />
                            </div>
                        </div>
                    </FormSection>

                    {/* SECTION 2: DUOQS - Operations */}
                    <FormSection title="DUOQS - Operations">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Deadline Date" value={data.deadlineDate} />
                                <FormRow label="CC Delegate List" value={data.delegateList} />
                                <FormRow label="CC Folder Name" value={data.folderName} />
                                <FormRow label="Draft Report Send Via Email" value={data.draftEmail} type="checkbox" info />
                                <FormRow label="Draft Report Send Via Email Date" value={data.draftDate} />
                                <FormRow label="Days Since Draft Report Sent" value={data.daysSinceDraft} />
                                <FormRow label="Excel BOQ (Rated) to be sent out" value={data.excelRated} type="checkbox" />
                                <FormRow label="Excel BOQ (Unrated) to be sent out" value={data.excelUnrated} type="checkbox" />
                                <FormRow label="Cubit File (CBX) to be sent out" value={data.cubitFile} type="checkbox" />
                                <FormRow label="Log Opp Notes" value={data.logNotes} info />
                                <FormRow label="Opportunity Notes" value={data.notes} type="multiline" info />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="CC Deadline Priority" value={data.deadlinePriority} />
                                <FormRow label="CC Senior Onshore Estimator Incharge" value={data.seniorOnshore} />
                                <FormRow label="CC Senior Offshore Estimator Incharge" value={data.seniorOffshore} />
                                <FormRow label="CC Cubit Fillout By" value={data.cubitFillout} />
                                <FormRow label="CC Excel Fillout By" value={data.excelFillout} />
                                <FormRow label="CC Final Review By" value={data.finalReview} />
                                <FormRow label="Check By" value={data.checkBy} info />
                                <FormRow label="Fillout By" value={data.filloutBy} info />
                                <FormRow label="Awaiting Information (Don't fillout)" value={data.awaitingInfo} type="checkbox" info />
                                <FormRow label="Awaiting Information Reason" value={data.awaitingInfoReason} info />
                            </div>
                        </div>
                    </FormSection>

                </div>

                {/* RIGHT COLUMN - SIDEBAR */}
                <div className="col-span-12 xl:col-span-4 space-y-4">
                    <RightSidebar data={data} />
                </div>
             </div>
        )}

        {/* PM TAB CONTENT (New Project Management Layout) */}
        {activeTab === 'PM' && (
             <div className="grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
                {/* LEFT COLUMN - PM View */}
                <div className="col-span-12 xl:col-span-8 space-y-4">
                    
                    {/* SECTION 1: Project Management */}
                    <FormSection title="Project Management">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                            {/* Col 1 */}
                            <div>
                                <FormRow label="Conversion Date" value={data.pmConversion} />
                                <FormRow label="Account Name" value={data.pmAccount} type="link" />
                                <FormRow label="Deadline Date" value={data.pmDeadline} />
                                <FormRow label="Non-Negotiable Deadline Date" value={data.nonNegotiable} type="checkbox" />
                                <FormRow label="Awaiting Information (Don't fillout)" value={data.awaitingInfo} type="checkbox" info />
                                <FormRow label="Awaiting Information Reason" value={data.awaitingInfoReason} info />
                                <FormRow label="Documents Reviewed" value={data.docsReviewed} type="checkbox" info />
                                <FormRow label="CC Documents Reviewed By" value={data.docsReviewedBy} info />
                                <FormRow label="Documents Reviewed Notes" value={data.docReviewNotes} />
                            </div>
                            {/* Col 2 */}
                            <div>
                                <FormRow label="CC Assign To Team" value={data.assignTeam} info />
                                <FormRow label="CC Assign To Team - Leader" value={data.pmAssignTeamLeader} info />
                                <FormRow label="CC Assign to Secondary Team" value={data.assignSecondary} info />
                                <FormRow label="CC Internal Take Off - Start Date" value={data.takeOffStart} />
                                <FormRow label="CC Internal Take Off - Completion Date" value={data.takeOffComplete} />
                                <FormRow label="CC Final Review By" value={data.ccFinalReview} />
                                <FormRow label="CC Internal Checking - Start Date" value={data.checkingStart} />
                                <FormRow label="CC Internal Checking - Completion Date" value={data.checkingComplete} />
                            </div>
                        </div>
                    </FormSection>

                </div>

                {/* RIGHT COLUMN - SIDEBAR */}
                <div className="col-span-12 xl:col-span-4 space-y-4">
                    <RightSidebar data={data} />
                </div>
             </div>
        )}

      </main>
    </div>
  );
};

// Internal Component for Tabs
const TabButton: React.FC<{
    label: string; 
    icon: React.ReactNode; 
    isActive: boolean; 
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap ${
            isActive 
            ? 'bg-white text-brand-orange shadow-sm' 
            : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
        }`}
    >
        {icon}
        <span className="hidden xl:inline">{label}</span>
        <span className="xl:hidden">{label.split(' ')[0]}</span>
    </button>
);

// FeedItem Component
interface FeedItemProps {
    user?: string;
    action?: string;
    time: string;
    avatarBg?: string;
    avatarColor?: string;
    initials?: string;
    noAvatar?: boolean;
    title?: string;
    children?: React.ReactNode;
}

const FeedItem: React.FC<FeedItemProps> = ({ 
    user, 
    action, 
    time, 
    avatarBg, 
    avatarColor, 
    initials, 
    noAvatar, 
    title, 
    children 
}) => {
    return (
        <div className="flex gap-3 p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors group">
            {!noAvatar ? (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${avatarBg || 'bg-gray-200'} ${avatarColor || 'text-gray-600'}`}>
                    {initials}
                </div>
            ) : (
                <div className="w-8 flex justify-center flex-shrink-0 pt-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                </div>
            )}
            
            <div className="flex-1">
                <div className="text-xs text-gray-800">
                    {title ? (
                        <span className="font-medium text-gray-500">{title}</span>
                    ) : (
                        <>
                            <span className="font-bold text-blue-600 hover:underline cursor-pointer">{user}</span> <span className="text-gray-700">{action}</span>
                        </>
                    )}
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">{time}</div>
                
                {children && <div className="mt-1">{children}</div>}
            </div>
        </div>
    );
};

// Extracted Right Sidebar Component
const RightSidebar = ({ data }: { data: any }) => (
    <div className="space-y-4">
        {/* Action Buttons */}
        <div className="space-y-2">
                <button className="w-full bg-[#D97706] hover:bg-[#b45309] text-white font-bold py-2 px-4 rounded shadow-sm text-sm border border-[#b45309]">
                Copy CC Fillout Data
                </button>
                <button className="w-full bg-[#991B1B] hover:bg-[#7f1d1d] text-white font-bold py-2 px-4 rounded shadow-sm text-sm border border-[#7f1d1d]">
                Copy CC Folder Name
                </button>
                <button className="w-full bg-[#D97706] hover:bg-[#b45309] text-white font-bold py-2 px-4 rounded shadow-sm text-sm border border-[#b45309]">
                Copy CC Tracker Data
                </button>
        </div>

        {/* Awaiting Payment Widget */}
        <FormSection title="Awaiting Payment" icon={<Crown size={14} className="text-white" />} defaultOpen>
                <div className="grid grid-cols-2 gap-4">
                <FormRow label="Payment Follow Up Outcome" value="" info />
                <FormRow label="Last Payment Reminder Sent" value="4/12/2025" />
                <FormRow label="Delay Invoice Reminder" value={data.delayReminder} />
                <FormRow label="Delay Invoice Reminder Reason" value={data.delayReason} />
                <div className="col-span-2">
                    <FormRow label="Log Payment Notes" value="" />
                </div>
                <div className="col-span-2">
                    <FormRow label="Awaiting Payment Notes" value="" info />
                </div>
                <FormRow label="DNS Invoice" value={data.dnsInvoice} type="checkbox" />
                <FormRow label="DNP until full payment is received" value={false} type="checkbox" info />
                </div>
        </FormSection>

        {/* Aircall / Chatter Feed Widget */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                    <span className="bg-[#F472B6] p-1 rounded-sm"><Archive size={12} className="text-white" /></span>
                    <h3 className="text-sm font-bold text-gray-800">Aircall (Customer) for Parent Contact (0)</h3>
                    </div>
            </div>

            {/* Tabs */}
            <div className="flex text-xs font-semibold text-gray-600 border-b border-gray-200 bg-white">
                <div className="px-4 py-3 cursor-pointer hover:text-gray-800">SMS/Email</div>
                <div className="px-4 py-3 cursor-pointer text-gray-800 border-b-2 border-brand-orange bg-gray-50">Chatter</div>
                <div className="px-4 py-3 cursor-pointer hover:text-gray-800">History</div>
                <div className="px-4 py-3 cursor-pointer hover:text-gray-800">Related</div>
            </div>

            {/* Composer */}
            <div className="p-3 bg-gray-50 border-b border-gray-200">
                <div className="flex gap-0 border border-gray-300 rounded overflow-hidden mb-2">
                    <button className="flex-1 py-1.5 bg-white text-xs font-medium text-gray-700 border-r border-gray-200">Post</button>
                    <button className="flex-1 py-1.5 bg-gray-100 text-xs font-medium text-gray-500 hover:bg-white">Poll</button>
                </div>
                <div className="border border-gray-300 rounded bg-white p-2">
                    <input className="w-full text-sm outline-none text-gray-600 placeholder-gray-400 mb-2" placeholder="Share an update..." />
                    <div className="flex justify-end">
                        <button className="bg-[#D97706] hover:bg-[#b45309] text-white text-xs font-bold py-1 px-4 rounded">Share</button>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 bg-white border-b border-gray-100">
                <button className="p-1 border border-gray-300 rounded bg-white hover:bg-gray-50"><ListFilter size={14} className="text-gray-500" /></button>
                <div className="flex-1 relative">
                    <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input className="w-full pl-6 pr-2 py-1 border border-gray-300 rounded text-xs outline-none" placeholder="Search this feed..." />
                </div>
                <button className="p-1 border border-gray-300 rounded bg-white hover:bg-gray-50"><RefreshCw size={14} className="text-gray-500" /></button>
            </div>

            {/* Feed Stream */}
            <div className="bg-white max-h-[500px] overflow-y-auto">
                
                {/* Item 1 */}
                <FeedItem 
                    user="Cost Consultants" 
                    action="updated this record." 
                    time="16h ago" 
                    avatarBg="bg-blue-100"
                    avatarColor="text-blue-600"
                    initials="CC"
                >
                    <div className="text-xs text-gray-600 mt-2 border-l-2 border-gray-200 pl-2">
                        <div className="font-medium text-gray-500 text-[10px] uppercase">Stage</div>
                        <div>Surveying to Review Documents</div>
                    </div>
                </FeedItem>

                {/* Item 2 */}
                <FeedItem 
                    user="Jack Ho" 
                    action="updated this record." 
                    time="23h ago" 
                    avatarBg="bg-purple-100"
                    avatarColor="text-purple-600"
                    initials="JH"
                >
                    <div className="text-xs text-gray-600 mt-2 border-l-2 border-gray-200 pl-2">
                        <div className="font-medium text-gray-500 text-[10px] uppercase">Deadline Date</div>
                        <div>A blank value to {data.deadlineDate}</div>
                    </div>
                </FeedItem>

                {/* Item 3 */}
                <FeedItem 
                    user="Jack Ho" 
                    action="to Duo Tax Quantity Surveyors Only" 
                    time="23h ago" 
                    avatarBg="bg-purple-100"
                    avatarColor="text-purple-600"
                    initials="JH"
                >
                    <div className="text-xs text-gray-800 mt-1">JH has set the Deadline Date to {data.deadlineDate}</div>
                    <div className="text-[10px] text-gray-400 mt-1">1 view</div>
                </FeedItem>

                {/* Item 4 */}
                <FeedItem 
                    noAvatar
                    title="This record was updated."
                    time="8 December 2025 at 10:14 AM"
                >
                    <div className="text-xs text-gray-600 mt-2 border-l-2 border-gray-200 pl-2 space-y-2">
                        <div>
                            <div className="font-medium text-gray-500 text-[10px] uppercase">Stage</div>
                            <div>Bookings to Surveying</div>
                        </div>
                        <div>
                            <div className="font-medium text-gray-500 text-[10px] uppercase">Stage</div>
                            <div>Review Documents to Bookings</div>
                        </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 text-center">
                        <span className="text-xs text-blue-500 hover:underline cursor-pointer">Show All Updates</span>
                    </div>
                </FeedItem>

                {/* Item 5 */}
                <FeedItem 
                    user="Jack Ho" 
                    action="to Duo Tax Quantity Surveyors Only" 
                    time="8 December 2025 at 12:09 PM" 
                    avatarBg="bg-purple-100"
                    avatarColor="text-purple-600"
                    initials="JH"
                >
                    <div className="text-xs text-gray-800 mt-1">Confirmation inspection time (2025-12-09) sent to tenant.</div>
                    <div className="text-[10px] text-gray-400 mt-1">1 view</div>
                </FeedItem>

            </div>
        </div>
    </div>
);

export default OpportunityDetailPage;
