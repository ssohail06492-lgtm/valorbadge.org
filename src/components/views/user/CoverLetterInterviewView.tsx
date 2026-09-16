import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  HelpCircle, 
  MessageSquare, 
  CheckCircle2, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';

export const CoverLetterInterviewView: React.FC = () => {
  const { profile, setCurrentRoute } = useApp();
  const [activeTab, setActiveTab] = useState<'cover_letter' | 'interview'>('cover_letter');
  const [targetCompany, setTargetCompany] = useState('Tata Advanced Systems / Amazon Logistics');
  const [targetRole, setTargetRole] = useState('Operations & Supply Chain Director');
  const [copied, setCopied] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const sampleCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${targetRole} position at ${targetCompany}. With over ${profile.yearsOfExperience} years of mission-critical leadership and operational stewardship in ${profile.generalRoleCategory || 'the armed forces'}, I have built an uncompromising foundation in large-scale supply chain logistics, cross-functional team command, and crisis containment.

Throughout my service career, I have been directly accountable for:
• Managing inventory and resource pipelines without a single stockout or compliance discrepancy.
• Directing multi-disciplinary technical teams in high-tempo, demanding environments while maintaining zero-harm safety standards.
• Engineering preventative maintenance regimens that maximized equipment availability and operational readiness.

Corporate organizations require leaders who remain calm under ambiguity, take end-to-end ownership of objectives, and motivate teams through disciplined communication. I am eager to bring these exact strengths, along with my certifications in ${profile.certifications.join(', ') || 'Civilian Operations Management'}, to elevate operational velocity at ${targetCompany}.

Thank you for your consideration. I look forward to discussing how my service-tested discipline and leadership can accelerate your mission objectives.

Sincerely,
${profile.fullName}
${profile.phone} | ${profile.email}`;

  const interviewQuestions = [
    {
      q: '“How do you translate your military leadership style to civilian corporate culture?”',
      framework: 'STAR: Focus on Empathy, Collaborative Alignment & Clear Delegation',
      recommendedAnswer: '“In military leadership, the highest value is placed on taking care of your people so they can accomplish the mission. While military drills have a command structure, effective leadership is fundamentally about listening, transparent delegation, and psychological safety. In a civilian setting, I apply the same principles: setting crystal-clear goals, empowering team members with autonomy, and providing calm, constructive feedback during times of uncertainty.”'
    },
    {
      q: '“Can you give an example of handling a major crisis or sudden logistical failure?”',
      framework: 'STAR: Incident Containment, Triage & Root Cause Prevention',
      recommendedAnswer: '“During a multi-station transport operation, severe weather disrupted our primary transit artery. I immediately initiated a secondary contingency route, reassigned fleet assets within 45 minutes, and established hourly communication syncs with all station chiefs. We completed the delivery with zero loss of equipment. Following the event, I authored an updated SOP that became standard across 4 regional branches.”'
    },
    {
      q: '“Why are you transitioning to the corporate sector now?”',
      framework: 'Positive Trajectory: Building Upon Solid Operational Roots',
      recommendedAnswer: '“Having proudly fulfilled my military service commitments, I am excited to apply my operational discipline, logistical problem-solving, and continuous improvement mindset to the commercial sector. I admire your company’s scale and culture of innovation, and I am eager to dedicate my next career chapter to driving high-impact commercial outcomes.”'
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCoverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            CIVILIAN TRANSITION TOOLKIT
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
            Cover Letter Generator & Interview Coach
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Prepare compelling written pitches and master corporate interview questions using the STAR framework.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-700 text-xs font-mono">
          <button
            onClick={() => setActiveTab('cover_letter')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'cover_letter' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cover Letter
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'interview' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Interview Coach
          </button>
        </div>
      </div>

      <SecurityNoticeBanner compact />

      {activeTab === 'cover_letter' ? (
        <div className="space-y-6">
          
          {/* Target input params */}
          <div className="p-4 rounded-2xl bg-[#071328]/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                Target Company Name
              </label>
              <input
                type="text"
                value={targetCompany}
                onChange={e => setTargetCompany(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-slate-300 mb-1">
                Target Job Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Cover Letter Output Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                Generated Civilian Pitch
              </span>
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Pitch'}</span>
              </button>
            </div>

            <pre className="text-xs sm:text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
              {sampleCoverLetter}
            </pre>
          </div>

        </div>
      ) : (
        <div className="space-y-6">
          
          <div className="p-4 rounded-2xl bg-[#071328]/80 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start space-x-3">
            <BookOpen className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Civilian Corporate Interview Mindset:</strong>
              Corporate interviewers respect military service, but they want reassurance that you will thrive in civilian team structures, collaborate across departments, and articulate results in commercial metrics (efficiency, cost reduction, reliability).
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left questions list */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold block mb-2">
                Core Transition Questions:
              </span>
              {interviewQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedQuestion(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs ${
                    selectedQuestion === idx
                      ? 'bg-cyan-950/40 border-cyan-400 text-white font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <p className="line-clamp-2">{q.q}</p>
                </button>
              ))}
            </div>

            {/* Right answer details */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-slate-900 text-cyan-400 border border-cyan-500/20">
                Recommended STAR Framework
              </span>

              <h3 className="text-base font-bold text-white font-display">
                {interviewQuestions[selectedQuestion].q}
              </h3>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                Strategy: {interviewQuestions[selectedQuestion].framework}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400 block font-semibold">
                  Sample Recruiter-Approved Response:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-black/40 p-4 rounded-xl border border-slate-800">
                  {interviewQuestions[selectedQuestion].recommendedAnswer}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentRoute('valor_ai')}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Practice with ValorAI Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
