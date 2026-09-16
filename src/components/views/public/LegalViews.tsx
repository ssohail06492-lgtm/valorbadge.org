import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, FileText, HelpCircle } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';

export const PrivacyView: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          LEGAL & DATA PROTECTION
        </span>
        <h1 className="text-3xl font-extrabold text-white font-display mt-1">
          Privacy Policy & Data Minimization Framework
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          Effective Date: March 2026 • Version 1.2
        </p>
      </div>

      <SecurityNoticeBanner />

      <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white font-display">
            1. Fundamental Commitment: Zero Tactical Data Collection
          </h2>
          <p>
            ValorBadge strictly prohibits the entry, transmission, and retention of military classified, operational, deployment, weaponry, or intelligence data. The platform only processes general civilian employment competencies, educational history, non-sensitive job preferences, and contact details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white font-display">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Standard biographical data (Name, email address, general phone, city/state of residence).</li>
            <li>Civilian educational qualifications and civilian-equivalent certifications.</li>
            <li>Broad service categories (e.g., Logistics, Mechanical Maintenance, Telecommunications) without specific unit rosters or deployment operational details.</li>
            <li>Employment and internship application submissions.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white font-display">
            3. Profile Visibility Options
          </h2>
          <p>
            Users have full control over who can view their profile data:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li><strong>Private:</strong> Profile is visible solely to the user; no corporate recruiters can discover it.</li>
            <li><strong>Verified Employers:</strong> Only verified corporate hiring partners who have signed our veteran non-exploitation agreement may view civilian-translated skills.</li>
            <li><strong>Application Only:</strong> Information is shared only with a company when you explicitly apply for their specific job posting.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white font-display">
            4. User Rights (Export & Deletion)
          </h2>
          <p>
            Under our privacy-first design, you have an unhindered right to export all personal data in standard JSON format, edit any record at any time, or permanently delete your account and all associated records with immediate effect from the{' '}
            <button
              onClick={() => setCurrentRoute('privacy_center')}
              className="text-cyan-400 hover:underline font-semibold"
            >
              Privacy Center
            </button>.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          TERMS & CONDITIONS
        </span>
        <h1 className="text-3xl font-extrabold text-white font-display mt-1">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-400 mt-2">
          Last Updated: March 2026
        </p>
      </div>

      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
        <strong className="text-cyan-400 font-mono block uppercase">
          Essential Disclaimer Notice
        </strong>
        <p>
          “ValorBadge is an independent platform and is not officially affiliated with or endorsed by the Indian Army or any government organization unless formal authorization is obtained.”
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white font-display">
            1. Acceptance of Terms & Purpose
          </h2>
          <p>
            By accessing ValorBadge, you agree to these Terms. ValorBadge provides digital tools to assist military veterans, ex-service personnel, and Agniveers in translating experience to civilian opportunities. The platform does not guarantee commercial job placement or specific compensation outcomes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white font-display">
            2. Prohibited Conduct: Military Secrecy
          </h2>
          <p>
            Users are strictly prohibited from entering, sharing, uploading, or distributing any classified, tactical, restricted, weapons-related, or security-sensitive military information. Any user attempting to upload restricted military documentation will face immediate account termination and appropriate security notification.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white font-display">
            3. Employer Obligations
          </h2>
          <p>
            Employers accessing ValorBadge candidate profiles warrant that they are legitimate commercial entities seeking to hire candidates for lawful civilian roles. Discrimination or misrepresentation of compensation is strictly prohibited.
          </p>
        </section>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Career Transition Support');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-white font-display">
          Contact & Veteran Help Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Our transition counselors and technical team are here to assist veterans, Agniveers, and partner employers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Contact Info Cards */}
        <div className="space-y-4 md:col-span-1">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold">
              <Mail className="w-4 h-4" />
              <span>EMAIL SUPPORT</span>
            </div>
            <p className="text-xs text-slate-300">support@valorbadge.org</p>
            <p className="text-[11px] text-slate-500">24-48 hr response SLA</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENT ASSISTANCE</span>
            </div>
            <p className="text-xs text-slate-300">Resettlement DGR guidance, resume conversion troubleshooting & employer verification.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold">
              <Lock className="w-4 h-4" />
              <span>PRIVACY DESK</span>
            </div>
            <p className="text-xs text-slate-300">privacy@valorbadge.org</p>
            <p className="text-[11px] text-slate-500">Data deletion & export requests</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 md:col-span-2">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Thank you, {name}. A ValorBadge transition support coordinator will review your inquiry and get back to you at {email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">
                Send a Message to Support
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Subedar Rajesh Kumar"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                  Subject Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Career Transition Support">Career Transition & Skill Translation Support</option>
                  <option value="Agniveer Cohort Inquiries">Agniveer Cohort Inquiries</option>
                  <option value="Employer Verification Inquiry">Employer Corporate Verification</option>
                  <option value="Government Scheme Question">Government / DGR Scheme Clarification</option>
                  <option value="Technical Issue">Platform / Technical Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 font-mono uppercase">
                  Message / Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Describe your question or request. Remember never to enter restricted or military-sensitive details."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none placeholder:text-slate-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
