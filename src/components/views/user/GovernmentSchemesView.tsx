import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  FileText, 
  Search, 
  Building, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Layers,
  MapPin,
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Briefcase,
  Sparkles,
  HeartHandshake,
  DollarSign,
  Accessibility,
  Info,
  X
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DEMO_SCHEMES } from '../../../lib/demoData';
import { GovernmentScheme } from '../../../types';

export const GovernmentSchemesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchemeType, setSelectedSchemeType] = useState<'all' | 'central' | 'state'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string>('all');
  const [activeSchemeModal, setActiveSchemeModal] = useState<GovernmentScheme | null>(null);
  const [copiedSchemeId, setCopiedSchemeId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const copyApplicationGuide = (scheme: GovernmentScheme) => {
    const text = `
GOVERNMENT SCHEME APPLICATION GUIDE (ValorBadge Information Directory)
Scheme: ${scheme.title}
Agency: ${scheme.agency}
Scope: ${scheme.schemeType.toUpperCase()} - ${scheme.stateOrRegion || 'Pan-India'}
Official Portal: ${scheme.officialPortalUrl}

IMPORTANT NOTICE: Always verify on the official government website before applying. ValorBadge does not charge any fees.

ELIGIBILITY CRITERIA:
${scheme.eligibilityCriteria.map(e => `• ${e}`).join('\n')}

APPLICATION STEPS:
${(scheme.applicationSteps || [scheme.applicationProcess]).map((s, i) => `${i + 1}. ${s}`).join('\n')}

DOCUMENTS REQUIRED:
${(scheme.documentsRequired || ['Service Discharge Book', 'ESM Identity Card']).map(d => `[ ] ${d}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedSchemeId(scheme.id);
    setTimeout(() => setCopiedSchemeId(null), 2500);
  };

  const filteredSchemes = DEMO_SCHEMES.filter(s => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.benefitsSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.stateOrRegion && s.stateOrRegion.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedSchemeType === 'all' || s.schemeType === selectedSchemeType;

    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;

    const matchesBeneficiary = selectedBeneficiary === 'all' || 
      s.targetBeneficiaries.some(b => b.toLowerCase().includes(selectedBeneficiary.toLowerCase()));

    return matchesSearch && matchesType && matchesCategory && matchesBeneficiary;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              OFFICIAL WELFARE DIRECTORY
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Government Schemes, DGR Quotas & Resettlement
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Verified repository of Central & State welfare programs, Agniveer horizontal reservations, DGR skill courses, and pensions.
          </p>
        </div>
      </div>

      <SecurityNoticeBanner compact />

      {/* MANDATORY PROMINENT DISCLAIMER: VERIFY ON OFFICIAL GOV WEBSITE */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-amber-950/70 border border-amber-500/50 text-slate-200 text-xs sm:text-sm shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
          <AlertCircle className="w-6 h-6 text-amber-400" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-300 uppercase tracking-wider text-xs font-mono">
              CRITICAL NOTICE: VERIFY ON OFFICIAL GOVERNMENT WEBSITE
            </span>
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">
            ValorBadge provides this curated directory solely for informational and educational awareness. <strong>Never pay any intermediary, agent, or fee for government benefits or application forms.</strong> All official applications and quota verifications are processed strictly via respective government portals (e.g., DGR, Kendriya Sainik Board, State Sainik Boards, SSC).
          </p>
        </div>
      </div>

      {/* Search & Comprehensive Filters */}
      <div className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 space-y-4 shadow-xl">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search schemes by keyword, state, agency, Agniveer, quota, pension, scholarship..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-sm text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Scheme Level: Central vs State */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-400 block">Level / Jurisdiction</label>
            <select
              value={selectedSchemeType}
              onChange={e => setSelectedSchemeType(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
            >
              <option value="all">All Jurisdictions (Central + State)</option>
              <option value="central">Central Government / Pan-India (MoD, DGR, KSB, MHA)</option>
              <option value="state">State Sainik Welfare Boards (Punjab, Haryana, UP, etc.)</option>
            </select>
          </div>

          {/* Benefit Category */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-400 block">Benefit Category</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="jobs">Civilian Jobs & Reservation Quotas</option>
              <option value="education">Higher Education & Scholarships</option>
              <option value="training">Resettlement & Skill Training (DGR)</option>
              <option value="self_employment">Self-Employment & Subsidized Credit</option>
              <option value="disability">Disability & Medical Grants</option>
              <option value="welfare">Pensions, Welfare & Land Assistance</option>
            </select>
          </div>

          {/* Target Beneficiary */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono text-slate-400 block">Beneficiary Group</label>
            <select
              value={selectedBeneficiary}
              onChange={e => setSelectedBeneficiary(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
            >
              <option value="all">All Beneficiary Groups</option>
              <option value="ex-servicemen">Ex-Servicemen (ESM / Retiring Personnel)</option>
              <option value="agniveer">Former Agniveers (All 3 Wings)</option>
              <option value="disabled">Disabled & War-Wounded Personnel</option>
              <option value="widows">Veer Naris / Widows & Wards</option>
            </select>
          </div>

        </div>

        {/* Filter summary badge */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span>
            Found <strong className="text-cyan-400 font-mono">{filteredSchemes.length}</strong> official verified scheme directories
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Source: DGR • KSB • MoD • Rajya Sainik Boards (Official Gazette)
          </span>
        </div>

      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map(scheme => {
          const isBookmarked = bookmarkedIds.includes(scheme.id);
          const isCopied = copiedSchemeId === scheme.id;

          return (
            <div
              key={scheme.id}
              className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div>
                
                {/* Badges & Meta */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      scheme.schemeType === 'central'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                        : 'bg-indigo-950 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {scheme.schemeType === 'central' ? 'Central Scheme' : `State Scheme (${scheme.stateOrRegion})`}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700 capitalize">
                      {scheme.category.replace('_', ' ')}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleBookmark(scheme.id)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark scheme'}
                    aria-label="Bookmark scheme"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-cyan-400 text-cyan-400' : ''}`} />
                  </button>
                </div>

                {/* Title & Sponsoring Agency */}
                <h3 className="text-base font-bold text-white font-display leading-snug">
                  {scheme.title}
                </h3>
                <p className="text-xs text-cyan-300 font-medium mt-1">
                  {scheme.agency}
                </p>

                {/* Summary */}
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {scheme.benefitsSummary}
                </p>

                {/* Beneficiaries Chip list */}
                <div className="mt-3.5 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                    Target Beneficiaries:
                  </span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {scheme.targetBeneficiaries.map((b, i) => (
                      <span key={i} className="text-[11px] font-medium text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Eligibility Excerpt */}
                <div className="mt-3.5 space-y-2 text-xs">
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Eligibility:</strong> {scheme.eligibilityCriteria[0]}
                    </span>
                  </div>
                  {scheme.documentsRequired && (
                    <div className="flex items-start gap-1.5 text-slate-400">
                      <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-300">Key Document:</strong> {scheme.documentsRequired[0]}
                      </span>
                    </div>
                  )}
                </div>

              </div>

              {/* Action Buttons & Links */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveSchemeModal(scheme)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Application Steps</span>
                  </button>

                  <button
                    onClick={() => copyApplicationGuide(scheme)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    title="Copy full steps and checklist to clipboard"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{isCopied ? 'Copied Guide' : 'Copy Checklist'}</span>
                  </button>
                </div>

                {/* Direct Official Link */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="font-mono text-[10px] text-slate-500">
                    Verified: {scheme.lastVerifiedDate}
                  </span>
                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>Verify & Apply on Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#071328]/60 border border-slate-800 space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Schemes Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            No government schemes match your filter criteria. Try resetting the filters or searching for keywords like "DGR", "Agniveer", "Punjab", or "Scholarship".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSchemeType('all');
              setSelectedCategory('all');
              setSelectedBeneficiary('all');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Detail Modal for Selected Scheme */}
      {activeSchemeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#071429] border border-cyan-500/40 rounded-2xl p-6 space-y-6 shadow-2xl relative my-8">
            
            <button
              onClick={() => setActiveSchemeModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-700"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 uppercase font-bold">
                  {activeSchemeModal.schemeType.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {activeSchemeModal.stateOrRegion || 'Pan-India'}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-white font-display pr-8">
                {activeSchemeModal.title}
              </h2>
              <p className="text-xs text-cyan-400 mt-1 font-medium">
                {activeSchemeModal.agency}
              </p>
            </div>

            {/* Prominent Verification Warning */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Verify on official portal:</strong> Applications must be completed on official portals ({activeSchemeModal.officialPortalUrl}). Never submit original military discharge books to any unofficial entity.
              </span>
            </div>

            {/* Detailed Benefits */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                Detailed Scheme Benefits & Quota Terms
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                {activeSchemeModal.benefitsSummary}
              </p>
            </div>

            {/* Eligibility Criteria */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                Eligibility Criteria
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeSchemeModal.eligibilityCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step by Step Process */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold">
                Step-by-Step Application Procedure
              </h4>
              <div className="space-y-2">
                {(activeSchemeModal.applicationSteps || [activeSchemeModal.applicationProcess]).map((step, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-xs text-slate-200 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents Required */}
            {activeSchemeModal.documentsRequired && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                  Required Documents Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSchemeModal.documentsRequired.map((doc, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => copyApplicationGuide(activeSchemeModal)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2"
              >
                {copiedSchemeId === activeSchemeModal.id ? <Check className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4 text-cyan-400" />}
                <span>{copiedSchemeId === activeSchemeModal.id ? 'Copied Guide' : 'Copy Application Checklist'}</span>
              </button>

              <a
                href={activeSchemeModal.officialPortalUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>Open Official Government Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
