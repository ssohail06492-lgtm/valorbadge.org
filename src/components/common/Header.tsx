import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Globe, 
  Bell, 
  Menu, 
  X, 
  Sparkles, 
  User, 
  Building2, 
  ShieldAlert, 
  Sliders, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  ChevronDown,
  Layers,
  HelpCircle,
  Bot,
  Home,
  Route,
  CheckCircle2,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppRoute, Role } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../lib/i18n';

export const Header: React.FC = () => {
  const { 
    currentRoute, 
    setCurrentRoute, 
    currentRole, 
    setCurrentRole,
    language, 
    setLanguage,
    country,
    notifications,
    clearNotifications,
    reducedMotion,
    setReducedMotion,
    largeText,
    setLargeText,
    triggerLoadingSequence,
    setIsOnboardingOpen,
    setIsAuthModalOpen,
    authSession,
    t
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isQuickJumpOpen, setIsQuickJumpOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Refs for outside click detection
  const notifContainerRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const quickJumpRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (notifContainerRef.current && !notifContainerRef.current.contains(target)) {
        setIsNotifOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setIsLanguageMenuOpen(false);
      }
      if (quickJumpRef.current && !quickJumpRef.current.contains(target)) {
        setIsQuickJumpOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleNavClick = (route: AppRoute) => {
    setCurrentRoute(route);
    setIsMobileMenuOpen(false);
    setIsQuickJumpOpen(false);
    setIsNotifOpen(false);
  };

  const navItems: { labelKey: string; defaultLabel: string; route: AppRoute; icon: React.ElementType }[] = [
    { labelKey: 'home', defaultLabel: 'Home', route: 'landing', icon: Home },
    { labelKey: 'jobs', defaultLabel: 'Jobs', route: 'jobs', icon: Briefcase },
    { labelKey: 'career', defaultLabel: 'Career', route: 'career_matches', icon: Sparkles },
    { labelKey: 'valorAi', defaultLabel: 'ValorAI', route: 'valor_ai', icon: Bot },
    { labelKey: 'resume', defaultLabel: 'Resume', route: 'resume_builder', icon: FileText },
    { labelKey: 'learning', defaultLabel: 'Learning', route: 'learning_hub', icon: GraduationCap },
    { labelKey: 'schemes', defaultLabel: 'Schemes', route: 'government_schemes', icon: ShieldCheck },
    { labelKey: 'transitionPlan', defaultLabel: 'Plan', route: 'transition_plan', icon: Route },
    { labelKey: 'profile', defaultLabel: 'Profile', route: 'service_profile', icon: User },
    { labelKey: 'help', defaultLabel: 'Help', route: 'veteran_help_center', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#060e1d]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center space-x-2.5 focus:outline-none group text-left touch-manipulation"
              aria-label="ValorBadge Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-slate-900 to-indigo-600 p-[1.5px] shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <div className="w-full h-full bg-[#071326] rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:scale-105 transition-transform" />
                </div>
              </div>
              <div className="overflow-hidden">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display flex items-center gap-1">
                  Valor<span className="text-cyan-400">Badge</span>
                </span>
                <span className="hidden xl:block text-xs font-mono text-slate-400 tracking-wider uppercase -mt-0.5 truncate max-w-xs">
                  {t('tagline')}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map(item => {
              const isActive = currentRoute === item.route;
              const label = t(item.labelKey) || item.defaultLabel;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold tracking-tight transition-all duration-150 touch-manipulation whitespace-nowrap min-h-[38px] flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Action Tools & Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">

            {/* Role Switcher Pill */}
            <div className="hidden sm:flex items-center rounded-xl bg-slate-900/90 border border-slate-700/80 p-0.5 text-xs font-medium">
              {(['user', 'employer', 'admin'] as Role[]).map(r => (
                <button
                  key={r}
                  onClick={() => {
                    setCurrentRole(r);
                    if (r === 'employer') setCurrentRoute('employer_dashboard');
                    else if (r === 'admin') setCurrentRoute('admin_dashboard');
                    else setCurrentRoute('dashboard');
                  }}
                  className={`px-2.5 py-1.5 rounded-lg transition-all capitalize whitespace-nowrap min-h-[32px] ${
                    currentRole === r
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r === 'user' ? t('veteran') : r === 'employer' ? t('employer') : t('admin')}
                </button>
              ))}
            </div>

            {/* Security & Auth Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-2.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/40 flex items-center gap-1.5 text-xs font-semibold min-h-[40px] touch-manipulation transition-colors"
              title={t('securitySettings')}
              aria-label={t('securitySettings')}
            >
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">
                {authSession?.isAuthenticated ? (currentRole === 'admin' ? t('admin') : currentRole === 'employer' ? t('employer') : t('veteran')) : t('signIn')}
              </span>
            </button>

            {/* Quick Navigation Jump (All Portals) */}
            <div className="relative" ref={quickJumpRef}>
              <button
                onClick={() => setIsQuickJumpOpen(!isQuickJumpOpen)}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/40 flex items-center gap-1 text-xs min-h-[40px] touch-manipulation"
                title={t('quickNavigation')}
                aria-label={t('quickNavigation')}
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="hidden xl:inline text-xs font-semibold">{t('quickNavigation')}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {isQuickJumpOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#071326] border border-cyan-500/40 shadow-2xl p-3 z-50 text-xs max-h-[75vh] overflow-y-auto"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                      <span className="font-mono text-cyan-400 font-bold uppercase text-xs">
                        {t('quickNavigation')}
                      </span>
                      <button onClick={() => setIsQuickJumpOpen(false)} aria-label={t('close')}>
                        <X className="w-4 h-4 text-slate-400 hover:text-white" />
                      </button>
                    </div>

                    {/* Portals List */}
                    <div className="space-y-3">
                      <div>
                        <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                          {t('Candidate & Veteran Centers')}
                        </span>
                        <div className="grid grid-cols-1 gap-1">
                          {[
                            { r: 'dashboard', label: 'Candidate Dashboard' },
                            { r: 'service_profile', label: 'Service Profile & Translation' },
                            { r: 'skill_translator', label: 'Military-to-Civilian Skills' },
                            { r: 'career_matches', label: 'Career Matching' },
                            { r: 'jobs', label: 'Corporate Jobs' },
                            { r: 'internships', label: 'Paid Apprenticeships & Internships' },
                            { r: 'government_schemes', label: 'Ex-Servicemen Schemes' },
                            { r: 'learning_hub', label: 'Upskilling & Courses' },
                            { r: 'resume_builder', label: 'Civilian Resume Builder' },
                            { r: 'cover_letter', label: 'Cover Letter & Interview Coach' },
                            { r: 'valor_ai', label: 'ValorAI Career Copilot' },
                            { r: 'applications', label: 'Tracked Applications' },
                            { r: 'saved_jobs', label: 'Bookmarked Opportunities' },
                            { r: 'messages', label: 'Secure Employer Messages' },
                            { r: 'notifications', label: 'Alerts & Updates' },
                            { r: 'privacy_center', label: 'Privacy & Data Export' },
                            { r: 'veteran_help_center', label: 'Help, FAQ & Scam Report' }
                          ].map(item => (
                            <button
                              key={item.r}
                              onClick={() => handleNavClick(item.r as AppRoute)}
                              className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800/80 hover:text-cyan-300 text-xs font-medium transition-colors"
                            >
                              {t(item.label)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                          {t('Employer & Admin')}
                        </span>
                        <div className="grid grid-cols-1 gap-1">
                          <button
                            onClick={() => handleNavClick('employer_dashboard')}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800/80 hover:text-cyan-300 text-xs font-medium"
                          >
                            {t('Employer Dashboard & Job Postings')}
                          </button>
                          <button
                            onClick={() => handleNavClick('admin_dashboard')}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg text-amber-300 hover:bg-amber-950/40 text-xs font-medium"
                          >
                            {t('Platform Governance & Security Admin')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Selector (Instant dynamic translation) */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/40 flex items-center gap-1.5 text-xs min-h-[40px] touch-manipulation font-semibold"
                title={t('selectLanguage')}
                aria-label={t('selectLanguage')}
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="uppercase font-mono">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {isLanguageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#071326] border border-cyan-500/40 shadow-2xl p-2 z-50"
                  >
                    <div className="px-2 py-1.5 text-[11px] font-mono text-cyan-400 uppercase font-semibold border-b border-slate-800 mb-1 flex items-center justify-between">
                      <span>{t('selectLanguage')}</span>
                      <span className="text-slate-400">{SUPPORTED_LANGUAGES.length}</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-0.5">
                      {SUPPORTED_LANGUAGES.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code);
                            setIsLanguageMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors min-h-[36px] ${
                            language === lang.code
                              ? 'bg-cyan-500/25 text-cyan-300 font-bold border border-cyan-500/30'
                              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                          }`}
                        >
                          <span>{lang.name}</span>
                          <span className="text-[11px] text-slate-400 font-normal">{lang.nativeName}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accessibility Drawer */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/40 text-xs min-h-[40px] touch-manipulation"
                title={t('accessibilityControls')}
                aria-label={t('accessibilityControls')}
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
              </button>

              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#071326] border border-cyan-500/40 shadow-2xl p-4 z-50 text-xs"
                  >
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-3 font-mono text-cyan-400 font-semibold uppercase text-xs">
                      <span>{t('accessibilityControls')}</span>
                      <button onClick={() => setIsSettingsOpen(false)}>
                        <X className="w-4 h-4 text-slate-400 hover:text-white" />
                      </button>
                    </div>

                    <div className="space-y-3.5">
                      {/* Reduced Motion Toggle */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200 font-medium">{t('reducedMotion')}</span>
                        <button
                          onClick={() => setReducedMotion(!reducedMotion)}
                          className={`w-10 h-6 rounded-full transition-colors relative focus:outline-none ${
                            reducedMotion ? 'bg-cyan-500' : 'bg-slate-800'
                          }`}
                        >
                          <span
                            className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                              reducedMotion ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Text Size Scaling */}
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200 font-medium">{t('largeTypography')}</span>
                        <button
                          onClick={() => setLargeText(!largeText)}
                          className={`w-10 h-6 rounded-full transition-colors relative focus:outline-none ${
                            largeText ? 'bg-cyan-500' : 'bg-slate-800'
                          }`}
                        >
                          <span
                            className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                              largeText ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Loading Experience Replay */}
                      <div className="pt-2 border-t border-slate-800 space-y-2">
                        <button
                          onClick={() => {
                            setIsSettingsOpen(false);
                            triggerLoadingSequence();
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-center text-xs min-h-[36px]"
                        >
                          {t('previewIntro')}
                        </button>

                        <button
                          onClick={() => {
                            setIsSettingsOpen(false);
                            setIsOnboardingOpen(true);
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-semibold text-center hover:bg-cyan-900/50 text-xs min-h-[36px]"
                        >
                          {t('relaunchOnboarding')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications Bell (Refined with toggle, click outside to close, and smooth motion animation) */}
            <div className="relative" ref={notifContainerRef}>
              <button
                onClick={() => setIsNotifOpen(prev => !prev)}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-cyan-500/40 relative min-h-[40px] touch-manipulation"
                aria-label={`${t('notifications')} (${unreadNotifs} ${t('unread')})`}
                aria-expanded={isNotifOpen}
              >
                <Bell className="w-4 h-4 text-cyan-400" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#071326] border border-cyan-500/40 shadow-2xl p-4 z-50 text-xs text-slate-200"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-800 mb-2.5">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-cyan-400" />
                        <span className="font-mono text-cyan-400 font-bold uppercase text-xs">
                          {t('notificationsAndAlerts')}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={clearNotifications}
                          className="text-[11px] text-slate-400 hover:text-cyan-300 transition-colors"
                        >
                          {t('markAllAsRead')}
                        </button>
                        <button 
                          onClick={() => handleNavClick('notifications')}
                          className="text-xs font-semibold text-cyan-400 hover:underline"
                        >
                          {t('viewAll')}
                        </button>
                      </div>
                    </div>

                    {/* Notifications list */}
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-slate-400">
                          <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                          <p>{t('noNotifications')}</p>
                        </div>
                      ) : (
                        notifications.map(notif => (
                          <div 
                            key={notif.id}
                            className={`p-3 rounded-xl border transition-all ${
                              notif.read ? 'bg-slate-900/40 border-slate-800' : 'bg-cyan-950/30 border-cyan-500/40 shadow-sm'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-semibold text-white text-xs">{notif.title}</p>
                              {!notif.read && (
                                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-slate-300 text-xs mt-1 leading-relaxed">{notif.message}</p>
                            <span className="text-[10px] font-mono text-slate-400 mt-1.5 block">{notif.timestamp}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white min-h-[40px] touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-slate-800 bg-[#061022] p-4 max-h-[82vh] overflow-y-auto"
          >
            {/* Mobile Role Switcher */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase">{t('role')}:</span>
              <div className="flex gap-1.5 text-xs">
                {(['user', 'employer', 'admin'] as Role[]).map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      setCurrentRole(r);
                      if (r === 'employer') setCurrentRoute('employer_dashboard');
                      else if (r === 'admin') setCurrentRoute('admin_dashboard');
                      else setCurrentRoute('dashboard');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize min-h-[34px] ${
                      currentRole === r ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {r === 'user' ? t('veteran') : r === 'employer' ? t('employer') : t('admin')}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Nav items grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navItems.map(item => {
                const Icon = item.icon;
                const label = t(item.labelKey) || item.defaultLabel;
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs font-semibold text-slate-200 hover:border-cyan-500/40 min-h-[44px]"
                  >
                    <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Quick Actions */}
            <div className="pt-2 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsOnboardingOpen(true);
                }}
                className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold text-center min-h-[44px]"
              >
                {t('relaunchOnboarding')}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold text-center border border-slate-700 min-h-[44px]"
              >
                {t('securitySettings')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
