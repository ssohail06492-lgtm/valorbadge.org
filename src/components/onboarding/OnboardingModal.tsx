import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  Target, 
  Building2, 
  Briefcase 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserType, CareerGoal } from '../../types';
import { SecurityNoticeBanner } from '../common/SecurityNoticeBanner';
import { ConsentPrivacyScreen } from '../common/ConsentPrivacyScreen';

interface OnboardingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const INDIAN_STATES = [
  'Karnataka',
  'Maharashtra',
  'Delhi NCR',
  'Punjab',
  'Haryana',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'Rajasthan',
  'West Bengal',
  'Kerala',
  'Madhya Pradesh',
  'Gujarat',
  'Uttarakhand'
];

const INDUSTRIES_LIST = [
  'Logistics & Supply Chain',
  'Operations & Management',
  'IT & Cloud Services',
  'Cybersecurity & Network Defense',
  'Engineering & Maintenance',
  'Manufacturing',
  'Aviation & Aerospace',
  'Finance & FinTech',
  'Administration & Human Resources',
  'Healthcare & Medical Logistics',
  'Education & Training',
  'Government & Public Sector (Civilian)',
  'Entrepreneurship & Micro-business'
];

const STEP_TITLES = [
  'Consent & Privacy Agreement',
  'Service Identity Alignment',
  'Primary Career Objective',
  'Geographic Preference',
  'Target Civilian Industries'
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ 
  isOpen: propIsOpen, 
  onClose: propOnClose 
}) => {
  const { 
    profile, 
    updateProfile, 
    setCurrentRoute, 
    isOnboardingOpen, 
    setIsOnboardingOpen,
    hasConsentedToPrivacy,
    setHasConsentedToPrivacy,
    t
  } = useApp();

  const isOpen = propIsOpen !== undefined ? propIsOpen : isOnboardingOpen;
  const onClose = propOnClose || (() => setIsOnboardingOpen(false));

  const [step, setStep] = useState<number>(1);

  const [selectedUserType, setSelectedUserType] = useState<UserType>(profile.userType || 'veteran');
  const [selectedGoal, setSelectedGoal] = useState<CareerGoal>('find_job');
  const [country, setCountry] = useState<string>(profile.country || 'India');
  const [state, setState] = useState<string>(profile.state || 'Karnataka');
  const [city, setCity] = useState<string>(profile.city || 'Bengaluru');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    profile.preferredIndustries && profile.preferredIndustries.length > 0 
      ? profile.preferredIndustries 
      : ['Logistics & Supply Chain', 'Operations & Management']
  );

  if (!isOpen) return null;

  const toggleIndustry = (ind: string) => {
    setSelectedIndustries(prev => 
      prev.includes(ind) ? prev.filter(item => item !== ind) : [...prev, ind]
    );
  };

  const handleFinish = () => {
    updateProfile({
      userType: selectedUserType,
      country,
      state,
      city,
      preferredIndustries: selectedIndustries,
      profileCompleted: true,
      hasConsentedToPrivacy: true,
      consentTimestamp: new Date().toISOString()
    });
    setHasConsentedToPrivacy(true);
    onClose();
    setCurrentRoute('dashboard');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-[#091426] border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="onboarding-title" className="text-lg font-bold text-white font-display">
                {t('ValorBadge Profile Creation')}
              </h2>
              <p className="text-xs text-slate-400">
                {t('Step')} {step} {t('of')} 5: {t(STEP_TITLES[step - 1])}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={t('close')}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-900 h-1.5 flex">
          <div 
            className="bg-cyan-500 h-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Security Warning Banner in Onboarding (for steps 2-5) */}
        {step > 1 && (
          <div className="px-6 pt-4">
            <SecurityNoticeBanner compact />
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 flex-1 overflow-y-auto max-h-[65vh]">
          {/* STEP 1: CONSENT & PRIVACY SCREEN BEFORE PROFILE CREATION */}
          {step === 1 && (
            <div className="space-y-4">
              <ConsentPrivacyScreen
                onContinue={() => setStep(2)}
                onCancel={onClose}
                title={t('Consent & Privacy Agreement')}
                subtitle={t('Please review our data minimization framework and defense security directives before creating your career profile.')}
              />
            </div>
          )}

          {/* STEP 2: Who are you? (Service Identity) */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-cyan-400 font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>{t('STEP 2: SERVICE IDENTITY')}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{t('Who are you?')}</h3>
              <p className="text-xs text-slate-400">
                {t('Select your service background to calibrate civilian equivalence frameworks and scheme eligibility.')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    id: 'veteran' as UserType,
                    title: 'Veteran / Ex-Service Personnel',
                    desc: 'Honorably discharged or retired armed forces personnel.'
                  },
                  {
                    id: 'agniveer' as UserType,
                    title: 'Agniveer / Former Agniveer',
                    desc: 'Completed or serving under the 4-year Agnipath scheme.'
                  },
                  {
                    id: 'eligible_service_personnel' as UserType,
                    title: 'Eligible Service Personnel',
                    desc: 'Currently serving and preparing for planned retirement/discharge.'
                  },
                  {
                    id: 'employer' as UserType,
                    title: 'Employer / Corporate Recruiter',
                    desc: 'Hiring veteran talent for civilian corporate leadership.'
                  }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedUserType(opt.id)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      selectedUserType === opt.id
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-950/50'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white">{t(opt.title)}</span>
                        {selectedUserType === opt.id && (
                          <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{t(opt.desc)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Career Goal */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-cyan-400 font-mono">
                <Target className="w-4 h-4" />
                <span>{t('STEP 3: PRIMARY OBJECTIVE')}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{t('What is your primary career goal?')}</h3>
              <p className="text-xs text-slate-400">
                {t('ValorBadge tailors matching algorithms, course recommendations, and resume formats to this goal.')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { id: 'find_job' as CareerGoal, title: 'Find a Civilian Job', desc: 'Direct corporate or industrial placement matching your rank/skills.' },
                  { id: 'find_internship' as CareerGoal, title: 'Find an Internship', desc: 'Fast-track apprenticeship or trainee corporate programs (Agniveer track).' },
                  { id: 'start_business' as CareerGoal, title: 'Start a Business / Venture', desc: 'Entrepreneurship, micro-credit schemes (SEMFEX), and franchise models.' },
                  { id: 'continue_education' as CareerGoal, title: 'Continue Higher Education', desc: 'Executive degrees, IIM/XLRI resettlement courses, or certifications.' },
                  { id: 'change_industry' as CareerGoal, title: 'Change Industry Domain', desc: 'Pivoting into Tech, Cybersecurity, FinTech, or Green Energy.' },
                  { id: 'improve_skills' as CareerGoal, title: 'Improve & Modernize Skills', desc: 'Upskilling in contemporary civilian tools and corporate frameworks.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedGoal(opt.id)}
                    className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      selectedGoal === opt.id
                        ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-950/50'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white">{t(opt.title)}</span>
                        {selectedGoal === opt.id && (
                          <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-xs">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{t(opt.desc)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Location */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-cyan-400 font-mono">
                <MapPin className="w-4 h-4" />
                <span>{t('STEP 4: GEOGRAPHIC PREFERENCE')}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{t('Where are you located or looking to work?')}</h3>
              <p className="text-xs text-slate-400">
                {t('Job matching, state-level welfare schemes, and Zila Sainik boards are anchored by geographic region.')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase font-mono">
                    {t('Country')}
                  </label>
                  <select
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="India">{t('India')}</option>
                    <option value="United States">{t('United States')} (Extensible)</option>
                    <option value="United Kingdom">{t('United Kingdom')} (Extensible)</option>
                    <option value="Australia">{t('Australia')} (Extensible)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase font-mono">
                    {t('State / Region')}
                  </label>
                  <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  >
                    {INDIAN_STATES.map(st => (
                      <option key={st} value={st}>{t(st)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase font-mono">
                    {t('City')}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder={t('e.g. Bengaluru, Pune, Delhi')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 mt-4">
                <strong>{t('Regional Scheme Filter:')}</strong> {t('Setting your state ensures you are notified of both Central Ministry schemes and State Sainik Welfare Department financial provisions.')}
              </div>
            </div>
          )}

          {/* STEP 5: Preferred Industries */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-cyan-400 font-mono">
                <Building2 className="w-4 h-4" />
                <span>{t('STEP 5: TARGET INDUSTRIES')}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{t('Preferred Civilian Industries')}</h3>
              <p className="text-xs text-slate-400">
                {t('Select one or more industries you are interested in exploring. You can update this at any time in Profile Settings.')}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {INDUSTRIES_LIST.map(ind => {
                  const isSelected = selectedIndustries.includes(ind);
                  return (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => toggleIndustry(ind)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center space-x-1.5 ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 shadow-sm'
                          : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{t(ind)}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300/90">
                {t('Selected')} {selectedIndustries.length} {t('industries. Our ontology engine will highlight military transferable skills specific to these sectors.')}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions for steps 2 to 5 (Step 1 controls are inside ConsentPrivacyScreen) */}
        {step > 1 && (
          <div className="p-6 border-t border-slate-800 flex items-center justify-between bg-slate-900/60">
            <button
              type="button"
              onClick={() => setStep(prev => prev - 1)}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Previous')}</span>
            </button>

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold transition-colors flex items-center space-x-2 shadow-lg shadow-cyan-500/20"
              >
                <span>{t('Continue')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 text-sm font-bold transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/30"
              >
                <span>{t('Complete Setup & View Dashboard')}</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
