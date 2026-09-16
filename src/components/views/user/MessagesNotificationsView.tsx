import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Building2, 
  ShieldCheck, 
  Lock, 
  Check, 
  User, 
  Bell, 
  AlertTriangle 
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';

interface MessageThread {
  id: string;
  employerName: string;
  company: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: { sender: 'candidate' | 'employer'; text: string; time: string }[];
}

export const MessagesNotificationsView: React.FC = () => {
  const { profile } = useApp();
  const [threads, setThreads] = useState<MessageThread[]>([
    {
      id: 'th-1',
      employerName: 'Vikram Malhotra (Lead Recruiter)',
      company: 'Tata Advanced Systems Ltd',
      lastMessage: 'We were very impressed by your translated logistics experience. Can we schedule an intro call this Friday?',
      timestamp: '10:30 AM',
      unread: true,
      messages: [
        { sender: 'employer', text: 'Namaste! We reviewed your ValorBadge civilian profile and translated competencies in multimodal supply chain management.', time: '10:25 AM' },
        { sender: 'employer', text: 'We were very impressed by your translated logistics experience. Can we schedule an intro call this Friday?', time: '10:30 AM' }
      ]
    },
    {
      id: 'th-2',
      employerName: 'Sneha Roy (Talent Lead)',
      company: 'Adani Ports & SEZ',
      lastMessage: 'Thank you for submitting your application for the Yard Operations Superintendent role.',
      timestamp: 'Yesterday',
      unread: false,
      messages: [
        { sender: 'employer', text: 'Thank you for submitting your application for the Yard Operations Superintendent role. Our hiring panel is currently reviewing your resume.', time: 'Yesterday' }
      ]
    }
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>('th-1');
  const [replyText, setReplyText] = useState('');

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setThreads(prev => prev.map(th => {
      if (th.id === activeThread.id) {
        return {
          ...th,
          lastMessage: replyText,
          unread: false,
          messages: [
            ...th.messages,
            { sender: 'candidate', text: replyText, time: 'Just now' }
          ]
        };
      }
      return th;
    }));

    setReplyText('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            DIRECT EMPLOYER ENGAGEMENT
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
            Messages & Recruiter Communications
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Connect directly with verified corporate hiring managers without exposing sensitive personal records.
          </p>
        </div>
      </div>

      <SecurityNoticeBanner compact />

      {/* Main Messaging Interface */}
      <div className="grid grid-cols-1 md:grid-cols-3 rounded-2xl bg-[#071328]/90 border border-slate-800 overflow-hidden min-h-[500px]">
        
        {/* Left: Threads list */}
        <div className="border-r border-slate-800 p-4 space-y-3 bg-[#061022]/60">
          <span className="text-xs font-mono text-slate-400 uppercase font-semibold block">
            Employer Conversations
          </span>

          <div className="space-y-2">
            {threads.map(thread => (
              <button
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  activeThread.id === thread.id
                    ? 'bg-cyan-950/40 border-cyan-400 text-white'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-display">{thread.company}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{thread.timestamp}</span>
                </div>
                <p className="text-[11px] text-cyan-300 truncate">{thread.employerName}</p>
                <p className="text-xs text-slate-400 truncate mt-1">{thread.lastMessage}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Chat Area */}
        <div className="md:col-span-2 flex flex-col justify-between p-4 sm:p-6 space-y-4">
          
          {/* Thread Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{activeThread.company}</h3>
                <p className="text-xs text-cyan-400">{activeThread.employerName}</p>
              </div>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Employer</span>
            </span>
          </div>

          {/* Messages list */}
          <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px] p-2">
            {activeThread.messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'candidate' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm max-w-[80%] leading-relaxed ${
                    m.sender === 'candidate'
                      ? 'bg-cyan-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSendReply} className="flex gap-2 pt-2 border-t border-slate-800">
            <input
              type="text"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              placeholder="Type your response to the employer..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
            >
              <span>Reply</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
