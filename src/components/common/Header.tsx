import React, { useState } from 'react';
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
  Eye, 
  Sliders, 
  Compass, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  Send, 
  MessageSquare,
  ChevronDown,
  Layers,
  Settings,
  HelpCircle,
  Accessibility,
  Bot,
  Home,
  Route
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
    setCountry,
    notifications,
    reducedMotion,
    setReducedMotion,
    largeText,
    setLargeText,
    triggerLoadingSequence,
    setIsOnboardingOpen
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isQuickJumpOpen, setIsQuickJumpOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  const handleNavClick = (route: AppRoute) => {
    setCurrentRoute(route);
    setIsMobileMenuOpen(false);
    setIsQuickJumpOpen(false);
  };

  const navItems: { label: string; route: AppRoute; icon: React.ElementType }[] = [
    { label: 'Home', route: 'landing', icon: Home },
    { label: 'Jobs', route: 'jobs', icon: Briefcase },
    { label: 'Career', route: 'career_matches', icon: Sparkles },
    { label: 'ValorAI', route: 'valor_ai', icon: Bot },
    { label: 'Resume', route: 'resume_builder', icon: FileText },
    { label: 'Learning', route: 'learning_hub', icon: GraduationCap },
    { label: 'Schemes', route: 'government_schemes', icon: ShieldCheck },
    { label: 'Transition Plan', route: 'transition_plan', icon: Route },
    { label: 'Profile', route: 'service_profile', icon: User },
    { label: 'Help', route: 'veteran_help_center', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#060e1d]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center space-x-2.5 focus:outline-none group text-left"
              aria-label="ValorBadge Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-slate-900 to-indigo-600 p-[1.5px] shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <div className="w-full h-full bg-[#071326] rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:scale-105 transition-transform" />
                </div>
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight font-display flex items-center gap-1">
                  Valor<span className="text-cyan-400">Badge</span>
                </span>
                <span className="hidden sm:block text-[9.5px] font-mono text-slate-400 tracking-wider uppercase -mt-0.5">
                  Your Service. Your Skills. Your Next Mission.
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1" aria-label="Main Navigation">
            {navItems.map(item => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-[11px] xl:text-xs font-semibold tracking-tight transition-all duration-150 touch-manipulation whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Tools & Controls */}
          <div className="flex items-center space-x-2">

            {/* Role Switcher Pill */}
            <div className="hidden sm:flex items-center rounded-lg bg-slate-900/90 border border-slate-700/80 p-0.5 text-[11px] font-mono">
              {(['user', 'employer', 'admin'] as Role[]).map(r => (
                <button
                  key={r}
                  onClick={() => {
                    setCurrentRole(r);
                    if (r === 'employer') setCurrentRoute('employer_dashboard');
                    else if (r === 'admin') setCurrentRoute('admin_dashboard');
                    else setCurrentRoute('dashboard');
                  }}
                  className={`px-2.5 py-1 rounded capitalize font-medium transition-all ${
                    currentRole === r
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={`Switch role to ${r}`}
                >
                  {r === 'user' ? 'Veteran' : r}
                </button>
              ))}
            </div>

            {/* Quick 42-Area Jump Drawer Button */}
            <div className="relative">
              <button
                onClick={() => setIsQuickJumpOpen(!isQuickJumpOpen)}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-slate-300 hover:text-white hover:border-cyan-500/40 text-xs font-mono flex items-center gap-1.5"
                title="All 42 Application Areas Quick Selector"
                aria-label="All Application Sections"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">Areas</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isQuickJumpOpen && (
                <div className="absolute right-0 mt-2 w-72 md:w-80 max-h-[75vh] overflow-y-auto rounded-xl bg-[#071326] border border-cyan-500/30 shadow-2xl p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="font-mono text-cyan-400 font-bold uppercase text-[11px]">
                      Complete System Index (42 Areas)
                    </span>
                    <button 
                      onClick={() => setIsQuickJumpOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* PUBLIC */}
                  <div className="mb-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                      Public Sections (1-7)
                    </span>
                    <div className="space-y-0.5">
                      {[
                        { r: 'landing', label: '1. Landing Page' },
                        { r: 'how_it_works', label: '2. How It Works' },
                        { r: 'about', label: '3. About ValorBadge' },
                        { r: 'for_employers', label: '4. For Employers' },
                        { r: 'privacy', label: '5. Privacy Policy' },
                        { r: 'terms', label: '6. Terms of Service' },
                        { r: 'contact', label: '7. Contact & Help' },
                      ].map(item => (
                        <button
                          key={item.r}
                          onClick={() => handleNavClick(item.r as AppRoute)}
                          className="w-full text-left px-2 py-1 rounded text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* USER */}
                  <div className="mb-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                      Veteran / User Portal (8-25)
                    </span>
                    <div className="space-y-0.5">
                      {[
                        { r: 'dashboard', label: '8. Dashboard' },
                        { r: 'service_profile', label: '9. Service Profile' },
                        { r: 'skill_translator', label: '10. Skill Translator' },
                        { r: 'career_matches', label: '11. Career Matches' },
                        { r: 'jobs', label: '12. Jobs Feed' },
                        { r: 'internships', label: '13. Internships' },
                        { r: 'government_schemes', label: '14. Government Schemes' },
                        { r: 'learning_hub', label: '15. Learning Hub' },
                        { r: 'resume_builder', label: '16. Resume Builder' },
                        { r: 'cover_letter', label: '17. Cover Letter' },
                        { r: 'interview_coach', label: '18. Interview Coach' },
                        { r: 'valor_ai', label: '19. ValorAI' },
                        { r: 'applications', label: '20. Applications' },
                        { r: 'saved_jobs', label: '21. Saved Jobs' },
                        { r: 'messages', label: '22. Messages' },
                        { r: 'notifications', label: '23. Notifications' },
                        { r: 'profile_settings', label: '24. Profile Settings' },
                        { r: 'privacy_center', label: '25. Privacy Center' },
                      ].map(item => (
                        <button
                          key={item.r}
                          onClick={() => handleNavClick(item.r as AppRoute)}
                          className="w-full text-left px-2 py-1 rounded text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* EMPLOYER */}
                  <div className="mb-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                      Employer Portal (26-33)
                    </span>
                    <div className="space-y-0.5">
                      {[
                        { r: 'employer_dashboard', label: '26. Employer Dashboard' },
                        { r: 'company_profile', label: '27. Company Profile' },
                        { r: 'create_job', label: '28. Create Job' },
                        { r: 'manage_jobs', label: '29. Manage Jobs' },
                        { r: 'candidate_search', label: '30. Candidate Search' },
                        { r: 'employer_applications', label: '31. Employer Applications' },
                        { r: 'employer_messages', label: '32. Employer Messages' },
                        { r: 'employer_verification', label: '33. Verification Status' },
                      ].map(item => (
                        <button
                          key={item.r}
                          onClick={() => handleNavClick(item.r as AppRoute)}
                          className="w-full text-left px-2 py-1 rounded text-slate-300 hover:bg-slate-800 hover:text-cyan-300"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ADMIN */}
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold block mb-1">
                      Admin Portal (34-42) - Protected
                    </span>
                    <div className="space-y-0.5">
                      {[
                        { r: 'admin_dashboard', label: '34. Admin Dashboard' },
                        { r: 'user_management', label: '35. User Management' },
                        { r: 'employer_verification_admin', label: '36. Employer Verification' },
                        { r: 'job_verification', label: '37. Job Verification' },
                        { r: 'scheme_management', label: '38. Scheme Management' },
                        { r: 'reports', label: '39. Reports' },
                        { r: 'audit_logs', label: '40. Audit Logs' },
                        { r: 'content_management', label: '41. Content Management' },
                        { r: 'system_health', label: '42. System Health' },
                      ].map(item => (
                        <button
                          key={item.r}
                          onClick={() => handleNavClick(item.r as AppRoute)}
                          className="w-full text-left px-2 py-1 rounded text-slate-300 hover:bg-slate-800 hover:text-amber-300"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector (11 languages) */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-slate-300 hover:text-white hover:border-cyan-500/40 flex items-center gap-1 text-xs"
                title="Select Platform Language"
                aria-label="Language selector"
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase font-mono font-semibold">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#071326] border border-cyan-500/30 shadow-2xl p-2 z-50">
                  <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase font-semibold border-b border-slate-800 mb-1">
                    Select Language (11)
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                          language === lang.code
                            ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span>{lang.name}</span>
                        <span className="text-[11px] text-slate-400 font-normal">{lang.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Country Selector */}
            <div className="hidden sm:flex items-center px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/70 text-xs text-slate-300 font-mono">
              <span className="text-cyan-400 mr-1.5 font-bold">🇮🇳</span>
              <span>{country}</span>
            </div>

            {/* Accessibility & Options Drawer */}
            <div className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-slate-300 hover:text-white hover:border-cyan-500/40 text-xs"
                title="Accessibility & System Controls"
                aria-label="Settings"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
              </button>

              {isSettingsOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#071326] border border-cyan-500/30 shadow-2xl p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2 font-mono text-cyan-400 font-semibold uppercase text-[11px]">
                    <span>Accessibility Controls</span>
                    <button onClick={() => setIsSettingsOpen(false)}>
                      <X className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* Reduced Motion Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Reduced Motion</span>
                      <button
                        onClick={() => setReducedMotion(!reducedMotion)}
                        className={`w-9 h-5 rounded-full transition-colors relative ${
                          reducedMotion ? 'bg-cyan-500' : 'bg-slate-800'
                        }`}
                      >
                        <span
                          className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                            reducedMotion ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Text Size Scaling */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Large Typography</span>
                      <button
                        onClick={() => setLargeText(!largeText)}
                        className={`w-9 h-5 rounded-full transition-colors relative ${
                          largeText ? 'bg-cyan-500' : 'bg-slate-800'
                        }`}
                      >
                        <span
                          className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                            largeText ? 'translate-x-4' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Loading Experience Replay */}
                    <div className="pt-2 border-t border-slate-800">
                      <button
                        onClick={() => {
                          setIsSettingsOpen(false);
                          triggerLoadingSequence();
                        }}
                        className="w-full py-1.5 px-2 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-medium text-center"
                      >
                        Preview Brand Loading Intro
                      </button>
                    </div>

                    {/* Onboarding Replay */}
                    <div>
                      <button
                        onClick={() => {
                          setIsSettingsOpen(false);
                          setIsOnboardingOpen(true);
                        }}
                        className="w-full py-1.5 px-2 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-medium text-center hover:bg-cyan-900/50"
                      >
                        Relaunch Onboarding Setup
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-slate-300 hover:text-white hover:border-cyan-500/40 relative"
                aria-label={`Notifications (${unreadNotifs} unread)`}
              >
                <Bell className="w-4 h-4 text-cyan-400" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#071326] border border-cyan-500/30 shadow-2xl p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                    <span className="font-mono text-cyan-400 font-bold uppercase text-[11px]">
                      Notifications & Alerts
                    </span>
                    <button 
                      onClick={() => handleNavClick('notifications')}
                      className="text-[10px] text-slate-400 hover:text-cyan-300"
                    >
                      View All
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map(notif => (
                      <div 
                        key={notif.id}
                        className={`p-2.5 rounded-lg border ${
                          notif.read ? 'bg-slate-900/40 border-slate-800' : 'bg-cyan-950/30 border-cyan-500/30'
                        }`}
                      >
                        <p className="font-semibold text-white">{notif.title}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5 leading-tight">{notif.message}</p>
                        <span className="text-[10px] font-mono text-slate-400 mt-1 block">{notif.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900/80 border border-slate-700/70 text-slate-300 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#061022] p-4 max-h-[80vh] overflow-y-auto">
          {/* Mobile Role Switcher */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <span className="text-xs font-mono text-slate-400 uppercase">Current Role:</span>
            <div className="flex gap-1 text-xs">
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
                  className={`px-2.5 py-1 rounded text-xs font-mono capitalize ${
                    currentRole === r ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {r === 'user' ? 'Veteran' : r}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 text-left text-xs font-medium text-slate-200 hover:border-cyan-500/40"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsOnboardingOpen(true);
              }}
              className="flex-1 py-2 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold text-center"
            >
              Start Onboarding
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleNavClick('privacy_center');
              }}
              className="flex-1 py-2 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium text-center border border-slate-700"
            >
              Privacy Center
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
