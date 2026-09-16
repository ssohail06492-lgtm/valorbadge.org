import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert,
  Lock, 
  Check, 
  HelpCircle,
  Cpu,
  User,
  RefreshCw,
  Info,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { detectSensitiveMilitaryInfo, SensitiveCheckResult } from '../../../lib/skillTaxonomy';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const ValorAIView: React.FC = () => {
  const { profile } = useApp();
  const [input, setInput] = useState('');
  const [sensitiveAlert, setSensitiveAlert] = useState<SensitiveCheckResult | null>(null);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Greetings ${profile.fullName || 'Service Member'}. I am ValorAI, your specialized military-to-civilian career transition advisor. 

I can help you with:
• Career matching & industry exploration
• Translating service duties into civilian competencies
• Civilian ATS resume formatting & corporate phrasing
• Interview preparation using the STAR method
• Bridging skill gaps & accredited learning pathways

🛡️ Privacy & Operational Security: Never share classified units, tactical plans, deployment locations, or security credentials. How can I assist your career mission today?`,
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const promptSuggestions = [
    { label: 'Skill Translation', prompt: 'How do I translate ASC / quartermaster duty to corporate supply chain?' },
    { label: 'Career Matching', prompt: 'Which civilian careers match 5+ years of operational team coordination?' },
    { label: 'Resume Advice', prompt: 'How do I write ATS-friendly civilian resume bullet points without military jargon?' },
    { label: 'Interview Preparation', prompt: 'How should I structure answers using the STAR method in a civilian interview?' },
    { label: 'Learning Plans', prompt: 'What accredited certifications bridge the gap to Corporate Facility Management?' }
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // PART 9 & 16: Check for potentially sensitive military information
    const check = detectSensitiveMilitaryInfo(text);
    if (check.isSensitive) {
      setSensitiveAlert(check);
      return;
    }

    setSensitiveAlert(null);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      const lower = text.toLowerCase();

      if (lower.includes('asc') || lower.includes('quartermaster') || lower.includes('logistics') || lower.includes('supply')) {
        aiResponseText = `Here is how to translate Quartermaster / ASC duties into high-impact corporate supply chain terminology:

1. **Military Term**: "In-charge of Ration & Ammunition Depot, managed troop supplies"
   → **Civilian Translation**: *"Directed multi-tiered inventory and warehousing operations overseeing ₹25Cr+ in material assets with 99.8% audit reconciliation accuracy."*

2. **Military Term**: "Coordinated vehicle convoy transport"
   → **Civilian Translation**: *"Orchestrated multi-modal freight logistics and fleet routing, optimizing fuel burn and delivery SLAs across 12 distributed supply nodes."*

3. **Target Corporate Roles**: Supply Chain Lead, Regional Fulfillment Hub Head, Logistics Operations Manager.`;
      } else if (lower.includes('career match') || lower.includes('match') || lower.includes('industry')) {
        aiResponseText = `Based on your military operational team coordination experience:

• **Primary Fit**: Operations Coordinator / Fulfillment Operations Lead (Estimated 91% alignment).
• **Why it matches**: Team leadership, high-reliability SOP enforcement, shift handovers, and resource planning under pressure.
• **Skill Gaps to Bridge**: Commercial ERP software (SAP S/4HANA), advanced spreadsheet data analysis (VLOOKUP, Pivot), and civilian vendor SLA management.
• **Recommended Pathway**: Take the 4-week ERP & Project Management fundamentals course in the Learning Hub.`;
      } else if (lower.includes('resume') || lower.includes('bullet') || lower.includes('ats')) {
        aiResponseText = `Here are 3 rules for ATS-compliant civilian resume bullet points:

1. **Start with Action Verbs**: Spearheaded, Orchestrated, Standardized, Administered, Optimized.
2. **Remove Acronyms**: Replace unit names, ranks, and acronyms with corporate titles like "Cross-functional Team Lead (25 Personnel)".
3. **Quantify Outcomes**: Include percentages, budgets overseen, team size, and safety records.

*Example*: "Supervised 30 personnel and maintained ₹12Cr in diagnostic and fleet assets, achieving 99.4% mission readiness with zero workplace safety incidents."`;
      } else if (lower.includes('interview') || lower.includes('star')) {
        aiResponseText = `The STAR method is the gold standard for civilian behavioral interviews:

• **Situation**: Describe the business context succinctly (e.g. "Our regional supply center faced a 40% unexpected demand surge").
• **Task**: What was your specific responsibility? ("I was tasked with re-routing transport schedules without increasing overtime costs").
• **Action**: What specific civilian-aligned steps did you lead? ("I established a daily cross-docking roster and aligned shift captains").
• **Result**: Measurable positive impact ("We met 100% of delivery deadlines with zero stockout disruptions").`;
      } else if (lower.includes('learning') || lower.includes('certif') || lower.includes('course') || lower.includes('dgr')) {
        aiResponseText = `Top civilian bridging certifications recommended for military transitions:

1. **Operations & Projects**: CAPM / PMP or Lean Six Sigma Green Belt.
2. **Safety & Plant Operations**: NEBOSH International General Certificate (IGC) or OSHA 30-Hour.
3. **Supply Chain**: APICS Certified Supply Chain Professional (CSCP).
4. **IT & Telecom**: Cisco CCNA or CompTIA Security+.

You can explore official DGR resettlement programs directly under the 'Learning' tab in the top navigation!`;
      } else {
        aiResponseText = `Thank you for your inquiry. As your transition advisor:

• Focus on articulating the **leadership, risk management, and procedural discipline** you developed during service.
• Translate your operational experience into standard commercial business outcomes (cost control, safety compliance, inventory accuracy, on-time delivery).
• Check out the **Skill Translator** or **Career Matches** in the navigation bar to see interactive personalized mappings!`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                ValorAI Career Advisor
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                TRANSITION MENTOR
              </span>
              <DemoDataBadge />
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalized career transition intelligence calibrated for armed forces personnel & Agniveers.
            </p>
          </div>
        </div>
      </div>

      <SecurityNoticeBanner compact />

      {/* PART 16 Mandatory Disclaimer */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-white">Advisory Disclaimer</p>
          <p className="text-slate-400">
            ValorAI provides informational guidance and may make mistakes. Verify important information with official sources. ValorAI does not represent the Indian Armed Forces or Government of India, and does not make employment guarantees.
          </p>
        </div>
      </div>

      {/* Sensitive Info Alert */}
      {sensitiveAlert && (
        <div role="alert" className="p-4 rounded-xl bg-rose-950/60 border border-rose-500 text-rose-200 space-y-3 animate-fadeIn">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Sensitive Military Information Blocked
              </p>
              <p className="text-xs text-rose-200 mt-0.5 font-semibold">
                “{sensitiveAlert.warningMessage}”
              </p>
            </div>
          </div>
          <button
            onClick={() => setSensitiveAlert(null)}
            className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-rose-900 hover:bg-rose-800 text-white font-bold text-xs border border-rose-600 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Edit Information</span>
          </button>
        </div>
      )}

      {/* Chat messages viewport */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#071328]/95 border border-slate-800 min-h-[380px] max-h-[520px] overflow-y-auto space-y-4 shadow-xl">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[88%] sm:max-w-[80%] whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-cyan-600 text-white rounded-tr-none shadow-md shadow-cyan-600/20'
                  : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-cyan-400 font-mono">
            <Bot className="w-4 h-4 animate-spin" />
            <span>ValorAI is analyzing transition ontology benchmarks...</span>
          </div>
        )}
      </div>

      {/* Prompt Suggestions */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-slate-400 uppercase font-bold tracking-wider block">
          Suggested Inquiries:
        </span>
        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s.prompt)}
              className="min-h-[40px] text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-colors text-left flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input box */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={e => {
            setInput(e.target.value);
            if (sensitiveAlert) setSensitiveAlert(null);
          }}
          placeholder="Ask ValorAI about career matches, resume translation, or interview prep..."
          className="flex-1 min-h-[48px] bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="min-h-[48px] px-5 sm:px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2 shrink-0"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
