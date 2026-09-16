import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Briefcase, 
  Sparkles, 
  FileText, 
  User, 
  Bot, 
  GraduationCap, 
  ShieldCheck, 
  Route, 
  HelpCircle, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppRoute } from '../../types';

export const MobileNavigation: React.FC = () => {
  const { currentRoute, setCurrentRoute, reducedMotion } = useApp();
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);

  const allNavItems: { label: string; route: AppRoute; icon: React.ElementType; desc: string }[] = [
    { label: 'Home', route: 'landing', icon: Home, desc: 'Overview & Mission' },
    { label: 'Jobs', route: 'jobs', icon: Briefcase, desc: 'Verified Opportunities' },
    { label: 'Career', route: 'career_matches', icon: Sparkles, desc: 'Matched Pathways' },
    { label: 'ValorAI', route: 'valor_ai', icon: Bot, desc: 'AI Transition Advisor' },
    { label: 'Resume', route: 'resume_builder', icon: FileText, desc: 'Civilian Format' },
    { label: 'Learning', route: 'learning_hub', icon: GraduationCap, desc: 'Courses & DGR Schemes' },
    { label: 'Schemes', route: 'government_schemes', icon: ShieldCheck, desc: 'Reservations & Quotas' },
    { label: 'Transition Plan', route: 'transition_plan', icon: Route, desc: 'Step-by-step Blueprint' },
    { label: 'Profile', route: 'service_profile', icon: User, desc: 'Service & Skills' },
    { label: 'Help', route: 'veteran_help_center', icon: HelpCircle, desc: 'Support & FAQs' },
  ];

  const handleRouteSelect = (route: AppRoute) => {
    setCurrentRoute(route);
    setIsMoreDrawerOpen(false);
  };

  // Determine if active route is in the "More" category
  const isMoreActive = ['learning_hub', 'government_schemes', 'resume_builder', 'service_profile', 'veteran_help_center'].includes(currentRoute);

  return (
    <>
      {/* Slide-Up Bottom Drawer for All 10 Navigation Items */}
      <AnimatePresence>
        {isMoreDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreDrawerOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Bottom Sheet Menu */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: reducedMotion ? 0.01 : 0.25, ease: 'easeOut' }}
              className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#071328] border-t border-cyan-500/30 rounded-t-3xl p-5 pb-[max(env(safe-area-inset-bottom),1.5rem)] shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Sheet Drag Handle & Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mb-3" />
                  <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                    <span className="text-cyan-400">ValorBadge</span> Navigation
                  </h3>
                  <p className="text-[11px] text-slate-400">All 10 transition centers</p>
                </div>
                <button
                  onClick={() => setIsMoreDrawerOpen(false)}
                  className="min-h-[44px] min-w-[44px] p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center touch-manipulation"
                  aria-label="Close navigation drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid of all 10 navigation items */}
              <div className="grid grid-cols-2 gap-2.5">
                {allNavItems.map(item => {
                  const Icon = item.icon;
                  const isActive = currentRoute === item.route;

                  return (
                    <button
                      key={item.route}
                      onClick={() => handleRouteSelect(item.route)}
                      className={`min-h-[52px] p-3 rounded-xl border text-left flex items-center space-x-3 transition-all active:scale-[0.98] touch-manipulation ${
                        isActive
                          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20 font-bold'
                          : 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-cyan-500/30'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold tracking-tight truncate">{item.label}</p>
                        <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Security & Non-affiliation Notice */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-[10.5px] text-slate-400 flex items-center justify-between">
                <span className="font-mono">Zero classified data stored</span>
                <span className="text-cyan-400">Non-government portal</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Primary Mobile Bottom Dock */}
      <nav 
        id="valorbadge-mobile-nav"
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#061022]/95 backdrop-blur-lg border-t border-slate-800 pb-[max(env(safe-area-inset-bottom),0.5rem)] shadow-2xl"
      >
        <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2 relative">
          
          {/* Item 1: Home */}
          <button
            onClick={() => setCurrentRoute('landing')}
            className={`min-h-[44px] flex flex-col items-center justify-center flex-1 py-1 transition-colors touch-manipulation active:scale-95 ${
              currentRoute === 'landing' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Navigate to Home"
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </button>

          {/* Item 2: Jobs */}
          <button
            onClick={() => setCurrentRoute('jobs')}
            className={`min-h-[44px] flex flex-col items-center justify-center flex-1 py-1 transition-colors touch-manipulation active:scale-95 ${
              currentRoute === 'jobs' || currentRoute === 'internships' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Navigate to Jobs"
          >
            <Briefcase className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Jobs</span>
          </button>

          {/* Central Floating Action Button: ValorAI */}
          <div className="relative -top-5 flex flex-col items-center">
            <button
              onClick={() => setCurrentRoute('valor_ai')}
              className={`w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[2px] shadow-lg shadow-cyan-500/40 focus:outline-none transition-transform active:scale-90 touch-manipulation ${
                currentRoute === 'valor_ai' ? 'ring-2 ring-cyan-300 ring-offset-2 ring-offset-slate-900 scale-105' : ''
              }`}
              aria-label="Open ValorAI Career Advisor"
            >
              <div className="w-full h-full bg-[#071328] rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-cyan-300" />
              </div>
            </button>
            <span className="text-[10px] font-bold text-cyan-400 font-mono tracking-wider mt-0.5">
              ValorAI
            </span>
          </div>

          {/* Item 3: Transition Plan */}
          <button
            onClick={() => setCurrentRoute('transition_plan')}
            className={`min-h-[44px] flex flex-col items-center justify-center flex-1 py-1 transition-colors touch-manipulation active:scale-95 ${
              currentRoute === 'transition_plan' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Navigate to Transition Plan"
          >
            <Route className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Plan</span>
          </button>

          {/* Item 4: More (Triggers full 10 items menu drawer) */}
          <button
            onClick={() => setIsMoreDrawerOpen(!isMoreDrawerOpen)}
            className={`min-h-[44px] flex flex-col items-center justify-center flex-1 py-1 transition-colors touch-manipulation active:scale-95 relative ${
              isMoreDrawerOpen || isMoreActive ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            aria-label="Open full menu"
          >
            <Menu className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">More</span>
            {isMoreActive && (
              <span className="absolute top-1 right-3 w-1.5 h-1.5 rounded-full bg-cyan-400" />
            )}
          </button>

        </div>
      </nav>
    </>
  );
};
