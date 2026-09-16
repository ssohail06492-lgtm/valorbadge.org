import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Download, 
  Trash2, 
  Eye, 
  Check, 
  AlertTriangle, 
  FileText,
  Key
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { ProfileVisibility } from '../../../types';

export const PrivacyCenterView: React.FC = () => {
  const { profile, updateProfile, deleteAccountData, exportUserData, setCurrentRoute } = useApp();
  const [currentVisibility, setCurrentVisibility] = useState<ProfileVisibility>(profile.visibility);
  const [savedNotice, setSavedNotice] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSaveVisibility = () => {
    updateProfile({ visibility: currentVisibility });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleExportJSON = () => {
    exportUserData();
  };

  const handleDeleteAccount = () => {
    deleteAccountData();
    setShowDeleteModal(false);
    setCurrentRoute('landing');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          PRIVACY & DATA SOVEREIGNTY
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
          Privacy Center & Candidate Data Controls
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage employer visibility permissions, audit stored records, export data, or purge your account.
        </p>
      </div>

      <SecurityNoticeBanner />

      {savedNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Employer visibility preferences updated immediately!</span>
        </div>
      )}

      {/* SECTION 1: Visibility Controls */}
      <div className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-white font-bold text-base">
          <Eye className="w-5 h-5 text-cyan-400" />
          <h2>Profile Visibility Setting</h2>
        </div>

        <p className="text-xs text-slate-400">
          Decide who can discover your translated civilian competencies in the recruiter database.
        </p>

        <div className="space-y-3">
          {[
            {
              val: 'employers' as const,
              title: 'Verified Employers Only (Recommended)',
              desc: 'Vetted companies with official corporate identification and signed veteran-friendly pledges can discover your translated skills.'
            },
            {
              val: 'application_only' as const,
              title: 'Application Only',
              desc: 'Your profile is completely unlisted. Only companies where you explicitly click "Quick Apply" receive your resume.'
            },
            {
              val: 'private' as const,
              title: 'Strictly Private',
              desc: 'No employer can view your profile or contact you. Suitable when preparing your transition ahead of service retirement.'
            }
          ].map(opt => (
            <label
              key={opt.val}
              onClick={() => setCurrentVisibility(opt.val)}
              className={`flex items-start space-x-3 p-4 rounded-xl border cursor-pointer transition-all ${
                currentVisibility === opt.val
                  ? 'bg-cyan-950/40 border-cyan-400 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <input
                type="radio"
                name="visibility"
                checked={currentVisibility === opt.val}
                onChange={() => setCurrentVisibility(opt.val)}
                className="mt-0.5 text-cyan-500 focus:ring-0"
              />
              <div className="space-y-0.5">
                <span className="text-xs font-bold font-display block">{opt.title}</span>
                <span className="text-[11px] text-slate-400 leading-relaxed block">{opt.desc}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={handleSaveVisibility}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Update Visibility</span>
          </button>
        </div>
      </div>

      {/* SECTION 2: Data Export & Audit */}
      <div className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-white font-bold text-base">
          <Download className="w-5 h-5 text-cyan-400" />
          <h2>Export All Personal Data</h2>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Download a machine-readable JSON archive containing all data fields, skills translations, and application statuses stored in your active session.
        </p>

        <button
          onClick={handleExportJSON}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export JSON Archive</span>
        </button>
      </div>

      {/* SECTION 3: Account & Data Deletion */}
      <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-4">
        <div className="flex items-center space-x-2 text-red-300 font-bold text-base">
          <Trash2 className="w-5 h-5 text-red-400" />
          <h2>Permanent Account & Data Purge</h2>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Permanently eradicate your service profile, translated competencies, applications, and saved preferences from ValorBadge. This action is irreversible.
        </p>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" />
          <span>Purge All Stored Data</span>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#09152b] border border-red-500/40 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Confirm Data Purge</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete all stored profile details, translated skills, and job application history? This cannot be recovered.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30"
              >
                Yes, Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
