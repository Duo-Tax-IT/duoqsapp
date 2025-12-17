
import React from 'react';
import TopBar from '../components/TopBar';
import { ChevronDown } from 'lucide-react';

const PricingMatrixPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#666666]">
      <TopBar 
        title="Fee Proposal" 
        subtitle="Pricing Matrix" 
        description="Calculate fees and generate proposals" 
      />
      <div className="flex-1 overflow-auto p-4 text-xs font-sans">
        
        {/* Header Strip mimicking image */}
        <div className="bg-[#444444] p-3 flex items-center mb-4 rounded-t-lg border-b-4 border-gray-500 shadow-md">
             <div className="text-[#F97316] font-extrabold text-2xl mr-2 italic tracking-tighter">duoqs</div>
             <div className="text-white font-extrabold text-2xl uppercase tracking-wide drop-shadow-sm">FEE PROPOSAL</div>
        </div>

        <div className="flex flex-col xl:flex-row gap-4 items-start pb-20">
            {/* LEFT PANEL */}
            <div className="w-full xl:w-[450px] flex-shrink-0 space-y-4">
                
                {/* CLIENT PARTICULARS */}
                <div className="border border-black bg-white shadow-sm">
                    <div className="bg-[#FFCC00] text-center font-bold border-b border-black py-1.5 text-black">CLIENT PARTICULARS</div>
                    <FieldRow label="First Name" />
                    <FieldRow label="Surname" />
                    <FieldRow label="Company Name" />
                    <FieldRow label="Email Address" />
                    <FieldRow label="Contact Number" />
                    <FieldRow label="Project Address" />
                    <FieldRow label="State" />
                    <FieldRow label="Client Type" />
                    <FieldRow label="Registered Referral Partner" />
                    <FieldRow label="Fee Proposal Version" />
                </div>

                {/* PROJECT PARTICULARS */}
                <div className="border border-black bg-white shadow-sm">
                    <div className="bg-[#FFB300] text-center font-bold border-b border-black py-1.5 text-black">PROJECT PARTICULARS</div>
                    <FieldRow label="Sector" />
                    <FieldRow label="Project Type" />
                    <FieldRow label="Input details if Sector is &quot;Other&quot;" isStriped />
                    <FieldRow label="Construction" isStriped />
                    <FieldRow label="Number of Units" />
                    <FieldRow label="Number of Levels (Floors)" />
                    <FieldRow label="Number of Basements" />
                    <FieldRow label="Project Size (GFA)" />
                    <FieldRow label="Site Area" />
                    <FieldRow label="Level of Finish" />
                    <FieldRow label="Level of Fitout" value="Hot - Structure and Fitout Works" isDropdown />
                    <FieldRow label="Ancillary Stucture 1" />
                    <FieldRow label="Ancillary Stucture 2" value="None" />
                    <FieldRow label="Ancillary Stucture 3" value="None" />
                    <FieldRow label="Ancillary Stucture 4" value="None" />
                    <FieldRow label="Ancillary Stucture 5" value="None" />
                    <FieldRow label="Level of Documentation" value="100%" />
                    <FieldRow label="Client Prioritisation" value="Standard" />
                    <FieldRow label="Ave. No. of Units per Apartment Level" isStriped />
                    <FieldRow label="Retail Areas on Lower Floors of Apartments" isStriped />
                    <FieldRow label="Level of Renovation (For CIR Only)" />
                    <FieldRow label="Approved % Applied for DTIRs" />
                    <FieldRow label="Cost of Renovation Works" />
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex-1 w-full flex flex-col gap-4">
                {/* PRICING TABLE */}
                <div className="border border-black bg-white overflow-x-auto shadow-sm">
                    <table className="w-full border-collapse min-w-[800px]">
                        <thead>
                            <tr className="text-center font-bold text-black text-[11px] leading-tight">
                                <th className="bg-[#FFCC00] border border-black p-2 w-1/3">REPORT TYPE</th>
                                <th className="bg-[#FFB300] border border-black p-2 w-24">BASE PRICE</th>
                                <th className="bg-[#FFCC00] border border-black p-2 w-24">ADDITIONAL COSTS</th>
                                <th className="bg-[#FFCC00] border border-black p-2 w-24">GROSS PRICE (INC. GST)</th>
                                <th className="bg-[#FFCC00] border border-black p-2 w-24">RUNNING PRICE (INC. GST)</th>
                                <th className="bg-[#FF5722] text-white border border-black p-2 w-24">% ADJUST 0.00%</th>
                                <th className="bg-[#999999] border border-black p-2 w-24">RP DISCOUNT</th>
                                <th className="bg-[#FFFF00] border border-black p-2 w-24">PRICE BASED ON TURNAROUND<br/>STANDARD</th>
                                <th className="bg-[#FFFF00] border border-black p-2 w-24">PRIORITY</th>
                            </tr>
                        </thead>
                        <tbody>
                            <PricingRow label="Detailed Cost Report" />
                            <PricingRow label="Detailed Cost Report - Cost to Complete" />
                            <PricingRow label="Standard Initial Cost Report" />
                            <PricingRow label="Standard Initial Cost Report - Cost to Complete" />
                            <PricingRow label="Panel Level Initial Cost Report" />
                            <PricingRow label="Panel Level Initial Cost Report - Cost to Complete" />
                            <PricingRow label="Preliminary Cost Estimate" />
                            <PricingRow label="Budget Cost Estimate" />
                            <PricingRow label="NABERS Embodied Emissions Report" />
                            <PricingRow label="Council Cost Report" />
                            <PricingRow label="Insurance Valuation Report" />
                            <PricingRow label="Duo Tax Improvement Report" isCheck hasData />
                            <PricingRow label="Standard Progress Claims Report" />
                            <PricingRow label="Panel Level Progress Claims Report" />
                            <PricingRow label="Forensic Report" />
                        </tbody>
                    </table>
                </div>

                {/* BOTTOM INFO SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white p-4">
                    <div className="space-y-6">
                         <div>
                             <h3 className="text-[#FFB300] font-bold uppercase mb-1">ADDITIONAL INFORMATION</h3>
                             <p className="text-gray-300 underline mb-1 font-bold">LEVEL OF FIT-OUT</p>
                             <div className="space-y-0.5 text-gray-200">
                                <p><span className="font-bold text-white">Cold</span> - Construction of Structure/Shell Only</p>
                                <p><span className="font-bold text-white">Warm</span> - Internal Fitout Works Only</p>
                                <p><span className="font-bold text-white">Hot</span> - Structure and Fitout Works</p>
                             </div>
                         </div>
                         <div>
                             <h3 className="text-[#FFFF00] font-bold uppercase mb-1">APPLICABLE ON APARTMENT UNITS ONLY</h3>
                             <div className="space-y-0.5 text-gray-200">
                                <p>AVE. NO. OF UNITS PER LEVEL</p>
                                <p>RETAIL AREAS ON LOWER FLOORS</p>
                             </div>
                         </div>
                    </div>

                    <div className="space-y-6">
                         <div>
                             <h3 className="text-[#FFB300] font-bold uppercase mb-1">FEE PROPOSAL REMARKS</h3>
                             <div className="space-y-2">
                                 <div className="border-b border-dashed border-gray-400 h-4"></div>
                                 <div className="border-b border-dashed border-gray-400 h-4"></div>
                                 <div className="border-b border-dashed border-gray-400 h-4"></div>
                                 <div className="border-b border-dashed border-gray-400 h-4"></div>
                                 <div className="border-b border-dashed border-gray-400 h-4"></div>
                             </div>
                         </div>
                         <div>
                             <h3 className="text-[#FFB300] font-bold uppercase mb-1">UPDATES</h3>
                             <ul className="list-disc list-inside space-y-1 text-gray-200 text-[11px]">
                                 <li>Scaling Factor for Floor Levels and Basement Levels</li>
                                 <li>Rates per States is now a factor for Costing</li>
                                 <li>For DTIR, Rates based on Level of Renovation is Included</li>
                                 <li>First Paragraph on Application form fixed</li>
                                 <li>Insurances for Public Liability and Professional Indemnity Updated</li>
                                 <li className="text-[#FFFF00]">DTIR Fee Computations - Base Price of $1,100 for Renovation Works worth $40K below. All Excess of $40K multiplied by 2% will be added on the base price of $1,100</li>
                                 <li className="text-[#FFFF00]">Discount for RP added.</li>
                             </ul>
                             <div className="space-y-2 mt-4">
                                 <div className="border-b border-dashed border-gray-400 h-4"></div>
                                 <div className="border-b border-dashed border-gray-400 h-4"></div>
                                 <div className="border-b border-dashed border-gray-400 h-4"></div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub Components ---

const FieldRow: React.FC<{ label: string, value?: string, isStriped?: boolean, isDropdown?: boolean }> = ({ label, value, isStriped, isDropdown }) => (
    <div className="flex border-b border-black last:border-b-0 h-[26px]">
        <div className="w-[45%] bg-[#EEECE1] px-2 flex items-center border-r border-black font-medium text-black truncate" title={label}>
            {label}
        </div>
        <div className={`flex-1 relative ${isStriped ? 'bg-orange-100' : 'bg-white'}`}>
             {isDropdown ? (
                 <div className="w-full h-full flex items-center justify-between px-2 text-black cursor-pointer hover:bg-gray-50">
                    <span className="truncate">{value}</span>
                    <ChevronDown size={14} className="text-gray-500" />
                 </div>
             ) : (
                 <input 
                    type="text" 
                    defaultValue={value} 
                    className={`w-full h-full px-2 border-none bg-transparent focus:ring-0 text-black ${isStriped ? 'bg-orange-100' : ''}`} 
                 />
             )}
        </div>
    </div>
);

const PricingRow: React.FC<{ label: string, isCheck?: boolean, hasData?: boolean }> = ({ label, isCheck, hasData }) => (
    <tr className="border-b border-black bg-white hover:bg-gray-50">
        <td className="border-r border-black px-2 py-1 text-black font-medium">{label}</td>
        
        {/* Base Price */}
        <td className="border-r border-black px-2 py-1 text-center text-black">
            {hasData ? '$' : isCheck ? '$    -' : '$    -'}
        </td>
        
        {/* Additional Costs */}
        <td className="border-r border-black px-2 py-1 text-center text-black">
            {hasData ? (isCheck ? <CheckMark /> : '$') : '$    -'}
        </td>
        
        {/* Gross Price */}
        <td className="border-r border-black px-2 py-1 text-center text-black">
             {hasData ? '$' : '$    -'}
        </td>
        
        {/* Running Price (CHECK logic) */}
        <td className="border-r border-black px-2 py-1 text-center text-black">
            {isCheck ? 'CHECK' : 'CHECK'}
        </td>
        
        {/* % Adjust */}
        <td className="border-r border-black px-2 py-1 text-center text-black">
            {isCheck ? '0.00%' : '0.00%'}
        </td>
        
        {/* RP Discount */}
        <td className="border-r border-black px-2 py-1 text-center text-black">
            {isCheck ? '0.00%' : '0.00%'}
        </td>
        
        {/* Standard */}
        <td className="border-r border-black px-2 py-1 text-center font-bold bg-[#FFFFE0] text-black">
            {isCheck ? 'CHECK' : 'CHECK'}
        </td>
        
        {/* Priority */}
        <td className="px-2 py-1 text-center font-bold bg-[#FFFFE0] text-black">
            {isCheck ? 'CHECK' : 'CHECK'}
        </td>
    </tr>
);

const CheckMark = () => (
    <div className="w-3 h-3 bg-green-500 rounded-sm mx-auto"></div>
)

export default PricingMatrixPage;
