
import React, { useState } from 'react';
import TopBar from '../components/TopBar';
import { FormSection, FormRow } from '../components/FormElements';
import { 
  ArrowLeft, User, Phone, Mail, FileText, Info, Calendar, 
  MessageSquare, Clock, UploadCloud, ChevronDown, Check,
  MoreHorizontal, PhoneCall, Mail as MailIcon, MessageCircle
} from 'lucide-react';

interface LeadDetailPageProps {
  leadName?: string;
  onBack: () => void;
}

const LEAD_STATUS_STEPS = [
  'Automate',
  'Lost',
  'Missed Call',
  'Not Contacted',
  'Awaiting Response',
  'Awaiting Information',
  'Awaiting Approval',
  'Processing',
  'Converted'
];

const LeadDetailPage: React.FC<LeadDetailPageProps> = ({ leadName = "Juan Monroy", onBack }) => {
  const [activeTab, setActiveTab] = useState<'Follow Up' | 'Engagement'>('Follow Up');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-100">
      <TopBar 
        title="Lead" 
        subtitle={leadName} 
        description="View and manage lead details" 
      />

      {/* Dark Record Header */}
      <div className="bg-[#1e293b] text-white px-6 py-4 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-[#10b981] flex items-center justify-center shadow-sm">
                <User size={20} className="text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold leading-none mb-1">{leadName}</h1>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-gray-300">
                    <div className="flex items-center gap-1.5">
                        <span className="opacity-70">Email</span>
                        <a href="mailto:juanmonroy@gmail.com" className="text-blue-300 hover:underline">juanmonroy@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="opacity-70">Mobile</span>
                        <a href="tel:0449766845" className="text-blue-300 hover:underline">0449 766 845</a>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="opacity-70">Record Type</span>
                        <span className="font-medium text-white">Lead</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="opacity-70">Assigned To</span>
                        <div className="flex items-center gap-1">
                             <User size={10} />
                             <span className="text-blue-300 border-b border-blue-300 border-dotted cursor-pointer">Steven Leuta</span>
                        </div>
                    </div>
                     <div className="flex items-center gap-1.5">
                        <span className="opacity-70">Property Address 1(formula)</span>
                        <span className="font-medium text-white">-</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="flex gap-2 self-end md:self-center">
            <button className="bg-[#f97316] hover:bg-orange-600 text-white px-4 py-1.5 rounded text-sm font-bold shadow-sm transition-colors">
                Convert
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-sm font-medium border border-white/20 transition-colors">
                <MoreHorizontal size={16} />
            </button>
        </div>
      </div>

      {/* Status Path */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto">
         <div className="flex min-w-max px-4 py-3">
            {LEAD_STATUS_STEPS.map((step, index) => {
                const isCurrent = step === 'Awaiting Response';
                const isCompleted = index < LEAD_STATUS_STEPS.indexOf('Awaiting Response');
                
                let bgClass = 'bg-gray-100 text-gray-500';
                if (isCurrent) bgClass = 'bg-[#f97316] text-white font-bold';
                else if (isCompleted) bgClass = 'bg-green-500 text-white';

                return (
                    <div key={step} className="flex items-center mr-1">
                        <div className={`px-4 py-1.5 text-[11px] uppercase tracking-wide rounded-sm clip-path-chevron relative ${bgClass} flex items-center justify-center min-w-[100px]`}>
                            {step}
                            {isCompleted && <Check size={10} className="ml-1" />}
                        </div>
                        {/* CSS Arrow simulated by border trick in Nextjs usually, but simplistic here */}
                        <div className="w-0.5 h-full bg-white"></div> 
                    </div>
                )
            })}
         </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-12 gap-6 max-w-[1800px] mx-auto">
            
            {/* LEFT COLUMN: Main Form */}
            <div className="col-span-12 xl:col-span-8 space-y-4">
                
                {/* SECTION 1: Project Scope */}
                <FormSection title="Project Scope">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="Report Type" value="detailed cost report" />
                            <FormRow label="Owner Builder" value={false} type="checkbox" />
                            <FormRow label="New Build" value={false} type="checkbox" />
                            <FormRow label="CC Cost to Complete" value={false} type="checkbox" />
                            <FormRow label="Report Send Off Conditions" value="" />
                            <FormRow label="CC Year Built" value="" info />
                            <FormRow label="Heritage-listed / Conservation Zone" value={false} type="checkbox" />
                            <FormRow label="Flood or Bushfire-Prone Site" value="" />
                            <FormRow label="Steep or Difficult Access Site" value={false} type="checkbox" />
                            <FormRow label="Regional or Remote Location (Cost Adjust)" value={false} type="checkbox" />
                            <FormRow label="Client-Supplied Rates or Quantities" value="" />
                            <FormRow label="Fast-Track / Urgent Delivery Required" value={false} type="checkbox" />
                            <FormRow label="Valuers Guaranteed Value High" value="" />
                            <FormRow label="Renovation Completion Date" value="" />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="Alteration and Additions" value={false} type="checkbox" />
                            <FormRow label="Building Works" value={false} type="checkbox" info />
                            <FormRow label="Finishes & Fitout" value={false} type="checkbox" />
                            <FormRow label="External Works & Services" value={false} type="checkbox" />
                            <FormRow label="Retaining Walls / Civil Infrastructure" value="" />
                            <FormRow label="Mechanical / Electrical / Hydraulic Serv" value={false} type="checkbox" />
                            <FormRow label="Fitout" value={false} type="checkbox" />
                            <FormRow label="Earthworks" value={false} type="checkbox" />
                            <FormRow label="Amenities" value={false} type="checkbox" />
                            <FormRow label="Other" value="" info />
                        </div>
                    </div>
                </FormSection>

                {/* SECTION 2: Lead Information */}
                <FormSection title="Lead Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="Account Name" value="Juan Monroy" />
                            <FormRow label="Contact is" value="" info />
                            <FormRow label="Name" value="Juan Monroy" />
                            <FormRow label="Mobile" value="0449 786 845" type="link" />
                            <FormRow label="Closed By" value="Steven Leuta" type="link" info />
                            <FormRow label="Entered By" value="Quoc Duong" type="link" />
                            <FormRow label="Follow Up" value="17/12/2025 11:45 AM" info />
                            <FormRow label="Follow Up By" value="Steven Leuta" type="link" />
                            <FormRow label="Follow Up Reminder" value="" info />
                            <FormRow label="Additional Information" value="" info />
                            <FormRow label="Primary Contact" value="Juan Monroy" type="link" />
                            <FormRow label="Unsubscribe Automations" value={false} type="checkbox" />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="Lead Status" value="Awaiting Response" />
                            <FormRow label="Date of Enquiry" value="1/12/2025" />
                            <FormRow label="Lost Lead Reason" value="" info />
                            <FormRow label="Lost Quarter of Leads Date" value="" />
                            <FormRow label="Send Lost Lead Notification to RP" value="" />
                            <FormRow label="Initial Text Message" value="Do not send" />
                            <FormRow label="Returning Customer" value={false} type="checkbox" />
                            <FormRow label="Automate Follow Up" value="Do not automate" info />
                            <FormRow label="Contact Method Type *" value="" info />
                            <FormRow label="Form Entry" value="FE-087751" type="link" />
                            <FormRow label="Duplicate Address" value="" />
                            <FormRow label="Campaign Source" value="" />
                        </div>
                    </div>
                </FormSection>

                {/* SECTION 3: Invoice */}
                <FormSection title="Invoice">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="Property Invoice Address" value="" info />
                            <FormRow label="Invoice Description" value="" info />
                            <FormRow label="Invoice Recipient Email" value="" />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="Name on Invoice (Override)" value="" info />
                            <FormRow label="Invoice Description Override" value="" info />
                            <FormRow label="PO Number" value="" />
                        </div>
                    </div>
                </FormSection>

                {/* SECTION 4: Other Financial Options */}
                <FormSection title="Other Financial Options">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="Report Fee" value="" />
                            <FormRow label="Deposit Amount" value="" info />
                            <FormRow label="DNS Invoice" value={false} type="checkbox" info />
                            <FormRow label="CC Calculated Deposit" value="No Deposit" />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="Proceed without Payment" value={true} type="checkbox" />
                            <FormRow label="Trusted Reason" value="" info />
                        </div>
                    </div>
                </FormSection>

                {/* SECTION 5: Reporting */}
                <FormSection title="Reporting">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="Report Type" value="detailed cost report" />
                            <FormRow label="Scope of Works" value="" />
                            <FormRow label="Awaiting Information (Don't fillout)" value={false} type="checkbox" info />
                            <FormRow label="Awaiting Information Reason" value="" />
                            <FormRow label="Report Send Off Conditions" value="" />
                            <FormRow label="CC Builder Type" value="" />
                            <FormRow label="Opportunity Notes" value="" />
                            <FormRow label="Excel BOQ (Rated) to be sent out" value={false} type="checkbox" />
                            <FormRow label="Excel BOQ (Unrated) to be sent out" value={false} type="checkbox" />
                            <FormRow label="Cubit File (CBX) to be sent out" value={false} type="checkbox" />
                            <FormRow label="CC Council Form Fillout" value={false} type="checkbox" info />
                            <FormRow label="Number of Reports" value="1" />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="Property Type" value="" />
                            <FormRow label="LGA (Council)" value="" info />
                            <FormRow label="Bank Panel" value="" />
                            <FormRow label="Progress Claim Number" value="" info />
                            <FormRow label="Bank" value="" />
                            <FormRow label="Exact Build Cost" value="" info />
                            <FormRow label="Build / Renovation Notes" value="" info />
                            <FormRow label="CC Architect/RP the report" value={false} type="checkbox" />
                            <FormRow label="Deadline Date" value="" />
                            <FormRow label="Non-Negotiable Deadline Date" value={false} type="checkbox" />
                        </div>
                    </div>
                </FormSection>

                {/* SECTION 6: Property Details #1 */}
                <FormSection title="Property Details #1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="Property Address Street" value="" info />
                            <FormRow label="Property Address Postcode" value="" />
                            <FormRow label="RP Street Address" value="" />
                            <FormRow label="RP Street Number" value="" />
                            <FormRow label="RP Category" value="" />
                            <FormRow label="RP Year Built" value="" />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="Property Address City" value="" />
                            <FormRow label="Property Address State" value="" />
                            <FormRow label="International" value={false} type="checkbox" info />
                            <FormRow label="RP Data Link" value="" info />
                            <FormRow label="RP Data Property ID" value="" />
                        </div>
                    </div>
                </FormSection>

                {/* SECTION 7: Ownership */}
                <FormSection title="Ownership">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="First Name (Owner 1)" value="" />
                            <FormRow label="First Name (Owner 2)" value="" />
                            <FormRow label="First Name (Owner 3)" value="" />
                            <FormRow label="First Name (Owner 4)" value="" />
                            <FormRow label="First Name (Owner 5)" value="" />
                            <FormRow label="Owners" value="" />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="Last Name (Owner 1)" value="" />
                            <FormRow label="Last Name (Owner 2)" value="" />
                            <FormRow label="Last Name (Owner 3)" value="" />
                            <FormRow label="Last Name (Owner 4)" value="" />
                            <FormRow label="Last Name (Owner 5)" value="" />
                        </div>
                    </div>
                </FormSection>

                {/* SECTION 8: Secondary Contact #2 */}
                <FormSection title="Secondary Contact #2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="Contact #2 First Name" value="" />
                            <FormRow label="Contact #2 Mobile" value="" />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="Contact #2 Last Name" value="" />
                            <FormRow label="Contact #2 Email" value="" />
                        </div>
                    </div>
                </FormSection>

                {/* SECTION 9: Referral */}
                <FormSection title="Referral">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="Referral Account" value="" info />
                            <FormRow label="Referral Contact" value="" />
                            <FormRow label="Referral Partner to receive report" value={false} type="checkbox" />
                            <FormRow label="Relationship Manager" value="" />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="Fee Notes" value="" info />
                            <FormRow label="Adjusted Commission" value="" info />
                            <FormRow label="Commission Notes" value="" />
                            <FormRow label="Referral Partner Survey Type" value="" />
                            <FormRow label="Sub Campaign" value="" info />
                            <FormRow label="Duo Event" value="" />
                        </div>
                    </div>
                </FormSection>

                {/* SECTION 10: Architect */}
                <FormSection title="Architect">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="Architect Account" value="" />
                            <FormRow label="Architect Contact" value="" />
                            <FormRow label="Architect Info Log Date" value="" />
                            <FormRow label="Architect Notes" value="" />
                            <FormRow label="Contact Architect?" value="" />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="New Architect's Company" value="" />
                            <FormRow label="New Architect's Name" value="" />
                            <FormRow label="New Architect's Email" value="" />
                            <FormRow label="New Architect's Mobile" value="" />
                        </div>
                    </div>
                </FormSection>

                {/* SECTION 11: Access */}
                <FormSection title="Access">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="Survey Options" value="No Survey" />
                            <FormRow label="Access Type" value="" info />
                            <FormRow label="Access Company (New)" value="" info />
                            <FormRow label="Instructions for Inspector" value="" />
                            <FormRow label="Tenant Info" value="" info />
                            <FormRow label="Inspection Booked by Closed By" value={false} type="checkbox" />
                            <FormRow label="Inspection Booked by CC" value={false} type="checkbox" />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="Booking Notes" value="" info />
                            <FormRow label="Access Account" value="" />
                            <FormRow label="Access Contact" value="" />
                            <FormRow label="Access Number (New)" value="" />
                            <FormRow label="Access Email (New)" value="" />
                            <FormRow label="Tenant SMS no." value="" info />
                        </div>
                    </div>
                </FormSection>

                {/* SECTION 12: System Information */}
                <FormSection title="System Information">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                        {/* Col 1 */}
                        <div>
                            <FormRow label="Multi-Report #" value="1" info />
                            <FormRow label="Filout Delegation" value="" info />
                            <FormRow label="Report Recipient #1" value="" info />
                            <FormRow label="excl. GST" value={false} type="checkbox" info />
                        </div>
                        {/* Col 2 */}
                        <div>
                            <FormRow label="Multi-Report Total" value="1" />
                            <FormRow label="Filout Instructions" value="" />
                            <FormRow label="Report Recipient #2" value="" info />
                            <FormRow label="Development Project" value="" />
                            <FormRow label="Project Name" value="" info />
                        </div>
                    </div>
                </FormSection>

                <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
                    <button onClick={onBack} className="flex items-center gap-1 hover:text-gray-600">
                        <ArrowLeft size={12} /> Back to Leads
                    </button>
                </div>
            </div>

            {/* RIGHT COLUMN: Sidebar */}
            <div className="col-span-12 xl:col-span-4 space-y-4">
                
                {/* NEW CUSTOMER Header */}
                <div className="bg-blue-50 border border-blue-100 p-3 rounded-t-lg">
                    <h3 className="text-xs font-bold text-blue-700 uppercase flex items-center gap-2">
                        <User size={14} /> New Customer
                    </h3>
                </div>

                {/* PRICING MATRIX CALCULATOR */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 -mt-2">
                    <h4 className="text-sm font-bold text-green-600 mb-3 flex items-center gap-1">
                        $ Pricing Matrix Calculator
                    </h4>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                            <label className="text-[10px] text-gray-500 font-bold block mb-1">Report Type *</label>
                            <select className="w-full text-xs border border-gray-300 rounded p-1.5">
                                <option>Select Report Type</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[10px] text-gray-500 font-bold block mb-1">Property Type *</label>
                            <select className="w-full text-xs border border-gray-300 rounded p-1.5">
                                <option>Select Property Type</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                         <div>
                            <label className="text-[10px] text-gray-500 font-bold block mb-1">Referral Source *</label>
                            <select className="w-full text-xs border border-gray-300 rounded p-1.5">
                                <option>No Commission</option>
                            </select>
                        </div>
                         <div>
                            <label className="text-[10px] text-gray-500 font-bold block mb-1">Purchase Price *</label>
                            <div className="relative">
                                <span className="absolute left-2 top-1.5 text-gray-500 text-xs">$</span>
                                <input type="text" placeholder="Enter price (e.g., 5M, 500K)" className="w-full text-xs border border-gray-300 rounded p-1.5 pl-5" />
                            </div>
                        </div>
                    </div>
                    <p className="text-[10px] text-red-500 mb-2 italic">Purchase Price is required and must be greater than 0</p>
                    <label className="flex items-center gap-2 text-xs text-gray-600">
                        <input type="checkbox" className="rounded border-gray-300" />
                        International
                    </label>
                </div>

                {/* OTHER LEADS */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <h4 className="text-xs font-bold text-gray-700 mb-3">Other Leads for this Contact (1)</h4>
                    <div className="bg-orange-50 border border-orange-100 rounded p-3">
                         <div className="flex justify-between items-start">
                             <a href="#" className="text-sm font-bold text-[#f97316] hover:underline">Juan Monroy</a>
                         </div>
                         <div className="text-xs text-gray-600 mt-1">
                             <div>Report Fee: <span className="font-mono">-</span></div>
                             <div>Status: <span className="font-bold">Awaiting Response</span></div>
                             <div>Report Type: <span className="italic">detailed cost report</span></div>
                         </div>
                    </div>
                </div>

                {/* FILES */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-sm font-bold text-gray-800">Files</h4>
                        <div className="relative">
                            <input type="text" placeholder="Search files..." className="text-xs border border-gray-200 rounded pl-2 pr-6 py-1 w-32" />
                            <div className="absolute right-2 top-1.5 text-gray-400">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 text-[10px] text-gray-500 font-medium border-b border-gray-100 pb-2 mb-2">
                        <span>Name</span>
                        <span>File size</span>
                        <span>Created</span>
                        <span>Last Modified</span>
                    </div>
                    
                    <div className="text-center py-6 text-xs text-gray-400">
                        No files attached to this record
                    </div>

                    <div className="mt-4 border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <span className="text-xs text-gray-500">Drag files here or click here to upload</span>
                    </div>
                </div>

                {/* FOLLOW UP / ENGAGEMENT TABS */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="flex bg-gray-100 border-b border-gray-200">
                        <button 
                            onClick={() => setActiveTab('Follow Up')}
                            className={`flex-1 py-2 text-xs font-bold text-center border-r border-gray-200 ${activeTab === 'Follow Up' ? 'bg-white text-gray-800 border-t-2 border-t-[#f97316]' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            Follow Up
                        </button>
                         <button 
                            onClick={() => setActiveTab('Engagement')}
                            className={`flex-1 py-2 text-xs font-bold text-center ${activeTab === 'Engagement' ? 'bg-white text-gray-800 border-t-2 border-t-[#f97316]' : 'text-gray-500 hover:bg-gray-200'}`}
                        >
                            Engagement
                        </button>
                    </div>

                    <div className="p-4 bg-[#fffaf0]"> {/* Light orange bg for Follow Up */}
                         <div className="flex items-center gap-2 mb-4 bg-white p-2 border border-gray-200 rounded">
                             <div className="p-1 bg-[#f97316] rounded text-white"><Clock size={12} /></div>
                             <span className="text-xs font-bold text-gray-700">Follow Up</span>
                             <div className="ml-auto flex gap-2">
                                <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                                    <Clock size={10} /> DNP
                                </span>
                                <button className="bg-white border border-gray-300 text-[10px] px-2 py-0.5 rounded hover:bg-gray-50">
                                    Automate
                                </button>
                             </div>
                         </div>

                         <div className="space-y-4">
                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Follow Up</label>
                                 <div className="col-span-2 text-xs text-gray-800">17/12/2025 11:45</div>
                             </div>

                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Speaking As</label>
                                 <div className="col-span-2">
                                     <select className="w-full text-xs border border-gray-300 rounded p-1.5 bg-white">
                                         <option>Select staff member</option>
                                     </select>
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Speaking as RM</label>
                                 <div className="col-span-2">
                                     <input type="checkbox" className="rounded border-gray-300 text-[#f97316] focus:ring-[#f97316]" />
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 items-start">
                                 <label className="text-[10px] font-bold text-gray-600 pt-1.5">Follow Up Reason</label>
                                 <div className="col-span-2">
                                     <div className="border border-gray-300 rounded p-2 bg-white text-xs text-gray-700 min-h-[30px]">
                                         No Survey
                                     </div>
                                 </div>
                             </div>
                             
                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Follow Up Reminder</label>
                                 <div className="col-span-2 relative">
                                     <select className="w-full text-xs border border-gray-300 rounded p-1.5 bg-white appearance-none">
                                         <option>--None--</option>
                                     </select>
                                     <ChevronDown size={12} className="absolute right-2 top-2 text-gray-400 pointer-events-none" />
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Follow Up By</label>
                                 <div className="col-span-2 bg-[#fff1e0] border border-orange-100 rounded px-2 py-1.5 flex justify-between items-center">
                                     <div className="flex items-center gap-1.5">
                                         <User size={12} className="text-[#f97316]" />
                                         <span className="text-xs text-gray-800">Steven Leuta</span>
                                     </div>
                                     <button className="text-gray-400 hover:text-red-500">×</button>
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Automate Follow Up</label>
                                 <div className="col-span-2 text-xs text-gray-800">
                                     Do not automate
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Status</label>
                                 <div className="col-span-2 relative">
                                     <select className="w-full text-xs border border-gray-300 rounded p-1.5 bg-white appearance-none">
                                         <option>Awaiting Response</option>
                                     </select>
                                     <ChevronDown size={12} className="absolute right-2 top-2 text-gray-400 pointer-events-none" />
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Contact Method Type *</label>
                                 <div className="col-span-2 relative">
                                     <select className="w-full text-xs border border-gray-300 rounded p-1.5 bg-white appearance-none">
                                         <option>--None--</option>
                                     </select>
                                      <Info size={10} className="absolute -left-4 top-2 text-gray-400" />
                                      <ChevronDown size={12} className="absolute right-2 top-2 text-gray-400 pointer-events-none" />
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Preset Outcomes</label>
                                 <div className="col-span-2 relative">
                                     <select className="w-full text-xs border border-gray-300 rounded p-1.5 bg-white appearance-none">
                                         <option>--None--</option>
                                     </select>
                                     <ChevronDown size={12} className="absolute right-2 top-2 text-gray-400 pointer-events-none" />
                                 </div>
                             </div>
                             
                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Additional Information</label>
                                 <div className="col-span-2">
                                     <textarea className="w-full border border-gray-300 rounded p-1.5 text-xs h-10"></textarea>
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Closed By</label>
                                 <div className="col-span-2 bg-[#fff1e0] border border-orange-100 rounded px-2 py-1.5 flex justify-between items-center">
                                     <div className="flex items-center gap-1.5">
                                         <User size={12} className="text-[#f97316]" />
                                         <span className="text-xs text-gray-800">Steven Leuta</span>
                                     </div>
                                     <button className="text-gray-400 hover:text-red-500">×</button>
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 items-start">
                                 <label className="text-[10px] font-bold text-gray-600 pt-1">Latest Call Summary</label>
                                 <div className="col-span-2">
                                     <textarea className="w-full border border-gray-300 rounded p-1.5 text-xs h-12 bg-white"></textarea>
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 items-start">
                                 <label className="text-[10px] font-bold text-gray-600 pt-1">Lead Notes</label>
                                 <div className="col-span-2">
                                     <div className="w-full border border-gray-300 rounded p-1.5 text-[10px] h-20 bg-white overflow-y-auto leading-tight text-gray-600 font-mono">
                                         (15/12/25 STL Outbound Email) Sent email to follow up - Awaiting Response<br/>
                                         (15/12/25 SLT) Sent Follow up email<br/>
                                         (04/12/25 Aircall) - Sent LE email with all services we provide.<br/>
                                         (01/12/25 Aircall) Outbound - Answered In-call Duration: 379
                                     </div>
                                 </div>
                             </div>

                              <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Lost Lead Reason</label>
                                 <div className="col-span-2 relative">
                                     <select className="w-full text-xs border border-gray-300 rounded p-1.5 bg-white appearance-none">
                                         <option>--None--</option>
                                     </select>
                                      <Info size={10} className="absolute -left-4 top-2 text-gray-400" />
                                      <ChevronDown size={12} className="absolute right-2 top-2 text-gray-400 pointer-events-none" />
                                 </div>
                             </div>

                              <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Lost Lead Notes</label>
                                 <div className="col-span-2 relative">
                                     <input type="text" className="w-full text-xs border border-gray-300 rounded p-1.5 bg-white" />
                                     <Info size={10} className="absolute -left-4 top-2 text-gray-400" />
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 items-center">
                                 <label className="text-[10px] font-bold text-gray-600">Send Lost Lead Notification to RP</label>
                                 <div className="col-span-2 relative">
                                     <select className="w-full text-xs border border-gray-300 rounded p-1.5 bg-white appearance-none">
                                         <option>--None--</option>
                                     </select>
                                     <ChevronDown size={12} className="absolute right-2 top-2 text-gray-400 pointer-events-none" />
                                 </div>
                             </div>

                         </div>
                    </div>
                </div>

                {/* TABS BOTTOM */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex border-b border-gray-200 bg-gray-50">
                        <button className="flex-1 py-2 text-[10px] font-bold text-gray-800 bg-white border-t-2 border-t-gray-500">Contact History</button>
                        <button className="flex-1 py-2 text-[10px] font-bold text-gray-500 hover:bg-gray-100">Chatter</button>
                        <button className="flex-1 py-2 text-[10px] font-bold text-gray-500 hover:bg-gray-100">Lead History</button>
                    </div>
                    <div className="p-4">
                        <h5 className="text-xs font-bold text-gray-800 mb-2">Contact History</h5>
                        <div className="flex gap-2 text-[10px] text-gray-500 mb-4">
                            <span className="bg-orange-100 text-[#f97316] px-1.5 py-0.5 rounded font-bold border border-orange-200">All 4</span>
                            <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded flex items-center gap-1"><PhoneCall size={8} /> Calls 3</span>
                            <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded flex items-center gap-1"><MessageSquare size={8} /> Texts</span>
                            <span className="bg-white border border-gray-200 px-1.5 py-0.5 rounded flex items-center gap-1"><MailIcon size={8} /> Emails 1</span>
                        </div>

                        <div className="space-y-4">
                            <ActivityItem 
                                icon={<MailIcon size={12} className="text-purple-600" />}
                                title="DUOQS"
                                user="From: Steven Leuta"
                                date="Dec 4, 2025 11:07 AM"
                                daysAgo="11 days ago"
                                preview="Hi Juan, Thank you for your time earlier, it was a pleasure speaking with you..."
                            />
                             <ActivityItem 
                                icon={<PhoneCall size={12} className="text-green-600" />}
                                title="Outbound call"
                                user="Using: Steven Leuta (CC) (BDM) • Agent: Steven Leuta"
                                date="Dec 1, 2025 3:07 PM"
                                daysAgo="14 days ago"
                                preview="Duration: 6:19"
                            />
                             <ActivityItem 
                                icon={<PhoneCall size={12} className="text-red-500" />}
                                title="Missed inbound call"
                                user="Using: Steven Leuta (CC) (BDM)"
                                date="Dec 1, 2025 2:49 PM"
                                daysAgo="14 days ago"
                                preview="Duration: Not Answered"
                            />
                             <ActivityItem 
                                icon={<PhoneCall size={12} className="text-green-600" />}
                                title="Outbound call"
                                user="Using: Steven Leuta (CC) (BDM) • Agent: Steven Leuta"
                                date="Dec 1, 2025 2:43 PM"
                                daysAgo="14 days ago"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </main>
    </div>
  );
};

// --- Helpers ---

const ActivityItem: React.FC<{ icon: React.ReactNode, title: string, user: string, date: string, daysAgo: string, preview?: string }> = ({ icon, title, user, date, daysAgo, preview }) => (
    <div className="flex gap-2">
        <div className="mt-0.5 bg-gray-50 p-1 rounded h-fit border border-gray-200">{icon}</div>
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">{title}</span>
                <div className="text-right">
                    <div className="text-[10px] text-gray-500">{date}</div>
                    <div className="text-[9px] font-bold text-gray-400 uppercase">{daysAgo}</div>
                </div>
            </div>
            <div className="text-[10px] text-gray-600 mt-0.5">{user}</div>
            {preview && <div className="text-[10px] text-gray-400 mt-1 italic truncate">{preview}</div>}
        </div>
    </div>
);

export default LeadDetailPage;
