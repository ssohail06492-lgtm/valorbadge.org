import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  UserCheck, 
  Building2, 
  ShieldAlert, 
  Clock, 
  X, 
  CheckCircle, 
  AlertTriangle,
  LogOut,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Role } from '../../types';
import { 
  validateEmail, 
  validateRequired, 
  checkRateLimit, 
  screenClassifiedInfo 
} from '../../lib/security';

export const AuthAndSecurityModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    isSecuritySettingsOpen, 
    setIsSecuritySettingsOpen,
    authSession,
    login,
    logout,
    currentRole,
    t,
    deleteAccountData
  } = useApp();

  const [activeTab, setActiveTab] = useState<'login' | 'security'>('login');
  const [targetRole, setTargetRole] = useState<Role>(currentRole || 'user');
  const [email, setEmail] = useState('rajesh.verma@example.com');
  const [pinCode, setPinCode] = useState('1234');
  const [showPin, setShowPin] = useState(false);
  const [autoLockMinutes, setAutoLockMinutes] = useState('30');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isOpen = isAuthModalOpen || isSecuritySettingsOpen;

  if (!isOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setIsSecuritySettingsOpen(false);
    setStatusMessage(null);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Rate limit check
    const rateCheck = checkRateLimit('auth_login', 5, 60000);
    if (!rateCheck.allowed) {
      setStatusMessage({
        type: 'error',
        text: `${t('Too many login attempts. Please wait')} ${rateCheck.retryAfterSeconds} ${t('seconds before trying again.')}`
      });
      return;
    }

    // 2. Validate input
    const emailVal = validateEmail(email);
    if (!emailVal.isValid) {
      setStatusMessage({ type: 'error', text: emailVal.error || t('Invalid email') });
      return;
    }

    const pinVal = validateRequired(pinCode, 'Security PIN / Password', 4, 30);
    if (!pinVal.isValid) {
      setStatusMessage({ type: 'error', text: pinVal.error || t('Invalid PIN') });
      return;
    }

    // 3. Classified text screen
    const screen = screenClassifiedInfo(email);
    if (!screen.isClean) {
      setStatusMessage({ type: 'error', text: screen.warningMessage || t('Restricted terms detected') });
      return;
    }

    // Perform authenticated login
    let userName = 'Subedar Rajesh Sharma (Retd.)';
    if (targetRole === 'employer') userName = 'Arun Deshmukh (VP Talent - Bharat Dynamics)';
    if (targetRole === 'admin') userName = 'Chief Platform Administrator';

    login(targetRole, email, userName);
    setStatusMessage({
      type: 'success',
      text: `${t('Securely authenticated as')} ${targetRole.toUpperCase()} (${userName}). ${t('Session token active.')}`
    });

    setTimeout(() => {
      handleClose();
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="security-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-xl bg-[#081224] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8 text-slate-100"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="security-modal-title" className="text-lg sm:text-xl font-bold font-display text-white">
                {activeTab === 'login' ? t('signIn') : t('securitySettings')}
              </h2>
              <p className="text-xs text-slate-400">
                {t('End-to-End Encrypted Session • Zero Classified Data')}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label={t('close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab('login')}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'login' 
                ? 'border-cyan-400 text-cyan-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>{t('signIn')} / {t('role')}</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'security' 
                ? 'border-cyan-400 text-cyan-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{t('securitySettings')}</span>
          </button>
        </div>

        {/* Status notice */}
        {statusMessage && (
          <div className={`mx-6 mt-4 p-3 rounded-xl border text-xs flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/70 border-rose-500/40 text-rose-300'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  {t('Select Role & Permission Level')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'user', label: t('veteran'), icon: UserCheck, desc: t('Candidate') },
                    { id: 'employer', label: t('employer'), icon: Building2, desc: t('Recruiter') },
                    { id: 'admin', label: t('admin'), icon: ShieldAlert, desc: t('Platform Admin') }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTargetRole(item.id as Role)}
                      className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center transition-all ${
                        targetRole === item.id 
                          ? 'border-cyan-500 bg-cyan-950/40 text-white shadow-md shadow-cyan-500/20' 
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <item.icon className={`w-5 h-5 mb-1 ${targetRole === item.id ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span className="text-xs font-bold">{item.label}</span>
                      <span className="text-[10px] text-slate-400">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('Registered Email Address')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500"
                  placeholder="name@example.com"
                />
              </div>

              {/* PIN / Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    {t('Security Passcode / PIN')}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showPin ? t('Hide') : t('Show')}</span>
                  </button>
                </div>
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pinCode}
                  onChange={e => setPinCode(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"
                  placeholder="••••"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {t('Demo credentials: any 4+ digit PIN (e.g. 1234)')}
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between gap-3">
                {authSession.isAuthenticated && (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setStatusMessage({ type: 'success', text: t('Logged out successfully.') });
                    }}
                    className="px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-950/40 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('signOut')}</span>
                  </button>
                )}

                <button
                  type="submit"
                  className="ml-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  <span>{t('Authenticate & Continue')}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Security Settings Tab */
            <div className="space-y-5 text-xs text-slate-300">
              {/* Security Status Box */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 space-y-2">
                <h3 className="font-bold text-cyan-300 flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  {t('Active Security Safeguards')}
                </h3>
                <ul className="space-y-1.5 text-slate-400 text-xs">
                  <li className="flex items-center gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <strong>{t('Content Security Policy (CSP)')}:</strong> {t('Enabled & Active')}
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <strong>{t('Transport Security')}:</strong> {t('Strict HTTPS enforced')}
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <strong>{t('Client-Side Sanitization')}:</strong> {t('XSS Protection & HTML Entity Escaping')}
                  </li>
                  <li className="flex items-center gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <strong>{t('Zero Operational Data Filter')}:</strong> {t('Military secrecy guard enabled')}
                  </li>
                </ul>
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <p className="font-semibold text-slate-200">{t('2-Factor Authentication Simulation')}</p>
                    <p className="text-[11px] text-slate-400">{t('Require mobile OTP confirmation before data export')}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={e => setTwoFactorEnabled(e.target.checked)}
                    className="w-4 h-4 accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <p className="font-semibold text-slate-200">{t('Inactivity Auto-Lock')}</p>
                    <p className="text-[11px] text-slate-400">{t('Lock session automatically when idle')}</p>
                  </div>
                  <select
                    value={autoLockMinutes}
                    onChange={e => setAutoLockMinutes(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="15">15 {t('minutes')}</option>
                    <option value="30">30 {t('minutes')}</option>
                    <option value="60">1 {t('hour')}</option>
                  </select>
                </div>
              </div>

              {/* Dangerous actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-rose-300">{t('Purge Local Session & Sensitive Keys')}</p>
                  <p className="text-[11px] text-slate-400">{t('Clears all stored application tokens and logs')}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    deleteAccountData();
                    setStatusMessage({ type: 'success', text: t('Local session cleared.') });
                  }}
                  className="px-3 py-1.5 rounded-lg border border-rose-500/40 text-rose-300 hover:bg-rose-950/60 font-semibold"
                >
                  {t('Purge Data')}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
