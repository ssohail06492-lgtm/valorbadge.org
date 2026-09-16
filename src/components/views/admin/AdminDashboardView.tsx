import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Database,
  Lock,
  Search,
  Activity
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DEMO_AUDIT_LOGS } from '../../../lib/demoData';

export const AdminDashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'verification' | 'logs' | 'compliance'>('verification');
  const [pendingEmployers, setPendingEmployers] = useState([
    {
      id: 'emp-v1',
      name: 'Bharat Forge Precision Dynamics',
      cin: 'L25209PN1961PLC012004',
      contactPerson: 'Arun Deshmukh (VP HR)',
      submittedDate: '2026-03-10',
      industry: 'Defense Manufacturing',
      status: 'pending'
    },
    {
      id: 'emp-v2',
      name: 'BlueDart Aviation Operations Ltd',
      cin: 'U62100DL1994PLC059882',
      contactPerson: 'Kavita Sen (Director Logistics)',
      submittedDate: '2026-03-11',
      industry: 'Aviation Freight',
      status: 'pending'
    }
  ]);
  const [notice, setNotice] = useState<string | null>(null);

  const handleApprove = (id: string, name: string) => {
    setPendingEmployers(prev => prev.filter(e => e.id !== id));
    setNotice(`Approved ${name} with official Verified Employer Badge.`);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleReject = (id: string, name: string) => {
    setPendingEmployers(prev => prev.filter(e => e.id !== id));
    setNotice(`Rejected verification for ${name}.`);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              SYSTEM GOVERNANCE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
              ADMINISTRATOR
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            ValorBadge Platform Administration & Security
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verify corporate employer credentials, inspect privacy compliance logs, and supervise zero-tactical data filters.
          </p>
        </div>
      </div>

      <SecurityNoticeBanner compact />

      {notice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}

      {/* Platform Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Active Veterans</span>
          <p className="text-2xl font-bold text-white font-mono">1,480</p>
          <span className="text-[10px] text-cyan-400">100% Zero-Tactical safe</span>
        </div>

        <div className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Verified Employers</span>
          <p className="text-2xl font-bold text-white font-mono">124</p>
          <span className="text-[10px] text-emerald-400">All CIN verified</span>
        </div>

        <div className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Active Requisitions</span>
          <p className="text-2xl font-bold text-white font-mono">312</p>
          <span className="text-[10px] text-cyan-400">Across 18 industries</span>
        </div>

        <div className="p-4 rounded-xl bg-[#071328]/80 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Sensitive Keyword Blocks</span>
          <p className="text-2xl font-bold text-white font-mono">0</p>
          <span className="text-[10px] text-emerald-400">All inputs compliant</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-700 text-xs font-mono w-fit">
        <button
          onClick={() => setActiveTab('verification')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'verification' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Employer Approvals ({pendingEmployers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('compliance')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'compliance' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Data Minimization Audits</span>
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'logs' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>System Audit Trail</span>
        </button>
      </div>

      {activeTab === 'verification' ? (
        <div className="space-y-4">
          {pendingEmployers.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-2xl bg-[#071328]/80 border border-slate-800 space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">All Employer Verifications Cleared</h3>
              <p className="text-xs text-slate-400">
                There are no pending corporate accounts requiring review.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingEmployers.map(emp => (
                <div
                  key={emp.id}
                  className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white">{emp.name}</h4>
                      <DemoDataBadge size="sm" />
                    </div>
                    <p className="text-xs text-slate-400">
                      CIN: <span className="font-mono text-cyan-300">{emp.cin}</span> • Industry: {emp.industry}
                    </p>
                    <p className="text-xs text-slate-400">
                      Contact: {emp.contactPerson} • Submitted: {emp.submittedDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReject(emp.id, emp.name)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5 text-red-400" />
                      <span>Reject</span>
                    </button>
                    <button
                      onClick={() => handleApprove(emp.id, emp.name)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve Verified Badge</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : activeTab === 'compliance' ? (
        <div className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white font-display">
              Zero-Tactical Compliance Guard Logs
            </h3>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sanitization Active</span>
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            ValorBadge runs client-side and server-side regular expression filters on profile fields. Any keywords relating to tactical weapon specs, deployment map coordinates, or classified unit code numbers are automatically blocked prior to persistence.
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 space-y-1.5">
            <p className="text-cyan-400 font-bold">// REAL-TIME COMPLIANCE METRICS</p>
            <p>Database Records Inspected: 1,480 candidate documents</p>
            <p>Classified Terms Intercepted: 0</p>
            <p>Data Sovereignty Region: ap-south-1 (Mumbai, India)</p>
            <p>Encryption at Rest: AES-256 GCM</p>
            <p>Public Visibility Status: Restricted to Authenticated Employers</p>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-display pb-3 border-b border-slate-800">
            Audit Activity Trail
          </h3>

          <div className="space-y-2">
            {DEMO_AUDIT_LOGS.map(log => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-white">{log.action}</span>
                  <p className="text-slate-400 text-[11px]">{log.details} by {log.actor}</p>
                </div>
                <span className="text-slate-500 font-mono text-[10px]">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
