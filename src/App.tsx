/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { SignatureCanvas } from './components/background/SignatureCanvas';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileNavigation } from './components/common/MobileNavigation';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { AuthAndSecurityModal } from './components/security/AuthAndSecurityModal';

// Public Views
import { LandingView } from './components/views/public/LandingView';
import { HowItWorksView } from './components/views/public/HowItWorksView';
import { AboutView } from './components/views/public/AboutView';
import { ForEmployersView } from './components/views/public/ForEmployersView';
import { PrivacyView, TermsView, ContactView } from './components/views/public/LegalViews';

// User / Veteran Transition Views
import { DashboardView } from './components/views/user/DashboardView';
import { TransitionPlanView } from './components/views/user/TransitionPlanView';
import { ServiceProfileView } from './components/views/user/ServiceProfileView';
import { SkillTranslatorView } from './components/views/user/SkillTranslatorView';
import { CareerMatchesView } from './components/views/user/CareerMatchesView';
import { JobsInternshipsView } from './components/views/user/JobsInternshipsView';
import { GovernmentSchemesView } from './components/views/user/GovernmentSchemesView';
import { LearningHubView } from './components/views/user/LearningHubView';
import { ResumeBuilderView } from './components/views/user/ResumeBuilderView';
import { CoverLetterInterviewView } from './components/views/user/CoverLetterInterviewView';
import { ValorAIView } from './components/views/user/ValorAIView';
import { ApplicationsSavedView } from './components/views/user/ApplicationsSavedView';
import { MessagesNotificationsView } from './components/views/user/MessagesNotificationsView';
import { PrivacyCenterView } from './components/views/user/PrivacyCenterView';
import { VeteranHelpCenterView } from './components/views/user/VeteranHelpCenterView';
import { DisabilitySupportView } from './components/views/user/DisabilitySupportView';

// Employer & Admin Views
import { EmployerDashboardView } from './components/views/employer/EmployerDashboardView';
import { CompanyProfileView } from './components/views/employer/CompanyProfileView';
import { AdminDashboardView } from './components/views/admin/AdminDashboardView';

const MainContent: React.FC = () => {
  const { currentRoute, reducedMotion, largeText } = useApp();

  const renderView = () => {
    switch (currentRoute) {
      // Public Views
      case 'landing':
        return <LandingView />;
      case 'how_it_works':
        return <HowItWorksView />;
      case 'about':
        return <AboutView />;
      case 'for_employers':
        return <ForEmployersView />;
      case 'privacy':
        return <PrivacyView />;
      case 'terms':
        return <TermsView />;
      case 'contact':
        return <ContactView />;

      // User Views
      case 'dashboard':
        return <DashboardView />;
      case 'transition_plan':
        return <TransitionPlanView />;
      case 'service_profile':
      case 'profile_settings':
        return <ServiceProfileView />;
      case 'skill_translator':
        return <SkillTranslatorView />;
      case 'career_matches':
        return <CareerMatchesView />;
      case 'jobs':
        return <JobsInternshipsView initialType="all" />;
      case 'internships':
        return <JobsInternshipsView initialType="internship" />;
      case 'government_schemes':
        return <GovernmentSchemesView />;
      case 'learning_hub':
        return <LearningHubView />;
      case 'resume_builder':
        return <ResumeBuilderView />;
      case 'cover_letter':
        return <CoverLetterInterviewView />;
      case 'valor_ai':
        return <ValorAIView />;
      case 'applications':
      case 'saved_jobs':
        return <ApplicationsSavedView />;
      case 'messages':
      case 'notifications':
        return <MessagesNotificationsView />;
      case 'privacy_center':
        return <PrivacyCenterView />;
      case 'veteran_help_center':
        return <VeteranHelpCenterView />;
      case 'disability_support':
        return <DisabilitySupportView />;

      // Employer Views
      case 'employer_dashboard':
      case 'employer_candidates':
      case 'employer_jobs':
        return <EmployerDashboardView />;
      case 'company_profile':
        return <CompanyProfileView />;

      // Admin Views
      case 'admin_dashboard':
      case 'admin_verification':
      case 'admin_logs':
        return <AdminDashboardView />;

      default:
        return <LandingView />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col relative text-slate-100 bg-[#050b14] overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 ${largeText ? 'text-lg leading-relaxed' : ''}`}>
      {/* Signature Animated Background */}
      <SignatureCanvas />

      {/* Sticky App Header */}
      <Header />

      {/* Primary Route View */}
      <main className="flex-1 relative z-10 pb-24 xl:pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.22, ease: 'easeOut' }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation with ValorAI Central FAB */}
      <MobileNavigation />

      {/* 5-Step Onboarding Modal with Consent & Privacy Agreement */}
      <OnboardingModal />

      {/* Security & Authentication Modal */}
      <AuthAndSecurityModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
