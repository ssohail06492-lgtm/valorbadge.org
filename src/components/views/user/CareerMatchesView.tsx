import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Briefcase,
  Search,
  Filter,
  Layers,
  ArrowLeftRight,
  Info,
  ChevronRight,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { 
  CAREER_DATABASE, 
  CareerDetail, 
  CareerCategory,
  calculateCareerMatches 
} from '../../../lib/careerDatabase';
import { CareerDetailModal } from './CareerDetailModal';
import { CareerComparisonModal } from './CareerComparisonModal';
import { CareerPathwayVisualizer } from './CareerPathwayVisualizer';

type ActiveTab = 'matches' | 'explorer' | 'pathway';

export const CareerMatchesView: React.FC = () => {
  const { profile, setCurrentRoute } = useApp();
  
  const [activeTab, setActiveTab] = useState<ActiveTab>('matches');
  
  // Modals state
  const [selectedCareerDetail, setSelectedCareerDetail] = useState<CareerDetail | null>(null);
  const [comparisonModalOpen, setComparisonModalOpen] = useState<boolean>(false);
  const [compareCareerA, setCompareCareerA] = useState<string>(CAREER_DATABASE[0].id);
  const [compareCareerB, setCompareCareerB] = useState<string>(CAREER_DATABASE[1]?.id || CAREER_DATABASE[0].id);
  const [activePathwayCareerId, setActivePathwayCareerId] = useState<string>(CAREER_DATABASE[0].id);

  // Explorer filters state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');

  // Compute algorithmic career matches based on the user's active profile
  const userAllSkills = useMemo(() => {
    return [
      ...(profile.skills || []),
      ...(profile.technicalSkills || []),
      ...(profile.leadership || []),
      ...(profile.logistics || []),
      ...(profile.administration || []),
      ...(profile.maintenance || []),
      ...(profile.safety || []),
      ...(profile.generalSkillsDeveloped || [])
    ];
  }, [profile]);

  const matches = useMemo(() => {
    return calculateCareerMatches(
      userAllSkills,
      profile.education,
      profile.yearsOfExperience,
      profile.preferredIndustries,
      profile.preferredLocations,
      profile.workPreference
    );
  }, [userAllSkills, profile.education, profile.yearsOfExperience, profile.preferredIndustries, profile.preferredLocations, profile.workPreference]);

  // Filtered explorer careers
  const filteredCareers = useMemo(() => {
    return CAREER_DATABASE.filter(c => {
      const matchesSearch = searchQuery === '' || 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const allCategories: string[] = [
    'All',
    'Operations',
    'Logistics',
    'Safety',
    'IT',
    'Cybersecurity',
    'Manufacturing',
    'Engineering',
    'Aviation',
    'Project Management',
    'Administration',
    'Entrepreneurship'
  ];

  const handleOpenComparisonWith = (career: CareerDetail) => {
    setCompareCareerA(career.id);
    setComparisonModalOpen(true);
  };

  const handleViewPathway = (careerId: string) => {
    setActivePathwayCareerId(careerId);
    setActiveTab('pathway');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Title & Top Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              CAREER INTELLIGENCE & PATHWAYS
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Civilian Career Matches & Pathways
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Algorithmic career matching, searchable civilian career blueprints, and 7-stage military-to-civilian progression roadmaps.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setComparisonModalOpen(true)}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-cyan-300 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Compare 2 Careers</span>
          </button>
          <button
            onClick={() => setCurrentRoute('skill_translator')}
            className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Skill Translator</span>
          </button>
        </div>
      </div>

      <SecurityNoticeBanner compact />

      {/* Main Feature Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('matches')}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'matches'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Calculated Career Matches ({matches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('explorer')}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'explorer'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Career Explorer ({CAREER_DATABASE.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pathway')}
          className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'pathway'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Visual Career Pathways (7 Stages)</span>
        </button>
      </div>

      {/* TAB 1: CAREER MATCHES (PART 11) */}
      {activeTab === 'matches' && (
        <div className="space-y-6">
          
          {/* AI Estimate & No Guarantee Disclaimer (PART 11 Mandatory Rule) */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-3">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-white">
                Algorithmic Career Fit Estimation
              </p>
              <p className="text-slate-300 leading-relaxed">
                Match percentages are an automated AI / system estimate calculated by scoring your reported education, certifications, and service competencies ({userAllSkills.length} identified skills) against corporate benchmarks. 
                <strong className="text-cyan-300"> This is an estimate, NOT a guarantee of employment.</strong>
              </p>
            </div>
          </div>

          {/* Matches List */}
          <div className="space-y-6">
            {matches.map(({ career, matchScore, whyThisMatches, skillGaps, recommendedLearning, suitabilitySummary }) => (
              <div
                key={career.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#071328]/95 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-5 shadow-xl"
              >
                {/* Header: Title + Match Badge */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                        {career.category}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-xs text-slate-400">
                        {career.industry}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                      {career.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Benchmark: <strong className="text-slate-200">{career.salaryBenchmark}</strong> • Environment: <strong className="text-slate-200">{career.workEnvironment}</strong>
                    </p>
                  </div>

                  {/* Estimated Match Badge */}
                  <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-center shrink-0 min-w-[100px]">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 block">
                      {matchScore}%
                    </span>
                    <span className="text-[9.5px] font-mono uppercase text-cyan-400 font-semibold block tracking-tight">
                      System Estimate
                    </span>
                  </div>
                </div>

                {/* Suitability summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/25 p-3 rounded-xl border border-slate-800/80">
                  {suitabilitySummary}
                </p>

                {/* Why this matches + Skill gaps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Why this matches */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Why this matches:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {whyThisMatches.map((m, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 font-medium">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skill gaps */}
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 uppercase">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Skill gaps to bridge:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGaps.map((gap, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded bg-amber-950/30 border border-amber-500/20 text-amber-200 font-medium">
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Recommended learning */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Recommended learning:</span>
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {recommendedLearning.map((course, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-slate-800 text-xs">
                        <p className="font-semibold text-white">{course.title}</p>
                        <span className="text-[10px] text-slate-400 font-mono">{course.duration} • {course.level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCareerDetail(career)}
                      className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-white transition-colors"
                    >
                      Career Overview & Details
                    </button>
                    <button
                      onClick={() => handleViewPathway(career.id)}
                      className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 hover:bg-cyan-950/30 text-xs font-semibold text-cyan-300 transition-colors"
                    >
                      View 7-Stage Pathway
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenComparisonWith(career)}
                      className="min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
                    >
                      Compare
                    </button>
                    <button
                      onClick={() => setCurrentRoute('jobs')}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Browse Jobs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: CAREER EXPLORER (PART 13) */}
      {activeTab === 'explorer' && (
        <div className="space-y-6">
          
          {/* Search and Category Filter Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#071328]/95 border border-slate-800 space-y-4 shadow-xl">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 17 career categories, skills, titles, or certifications..."
                className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
                Filter by Category:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Career Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredCareers.map(career => (
              <div
                key={career.id}
                className="p-5 rounded-2xl bg-[#071328]/90 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                      {career.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {career.experienceLevel}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {career.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {career.overview}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1">
                    {career.transferableSkills.slice(0, 3).map(sk => (
                      <span key={sk} className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {sk}
                      </span>
                    ))}
                    {career.transferableSkills.length > 3 && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        +{career.transferableSkills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-400 font-mono">
                    {career.salaryBenchmark}
                  </span>

                  <button
                    onClick={() => setSelectedCareerDetail(career)}
                    className="min-h-[40px] px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-cyan-300 flex items-center gap-1"
                  >
                    <span>View Blueprint</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredCareers.length === 0 && (
            <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 space-y-2">
              <p className="text-sm">No careers found matching “{searchQuery}” in category {selectedCategory}.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs text-cyan-400 underline font-semibold"
              >
                Reset filters
              </button>
            </div>
          )}

        </div>
      )}

      {/* TAB 3: VISUAL CAREER PATHWAY (PART 12) */}
      {activeTab === 'pathway' && (
        <div className="space-y-6">
          <CareerPathwayVisualizer initialCareerId={activePathwayCareerId} />
        </div>
      )}

      {/* Career Detail Modal (PART 14) */}
      {selectedCareerDetail && (
        <CareerDetailModal
          career={selectedCareerDetail}
          onClose={() => setSelectedCareerDetail(null)}
          onSelectForComparison={(c) => {
            setCompareCareerA(c.id);
            setComparisonModalOpen(true);
          }}
          onViewPathway={handleViewPathway}
        />
      )}

      {/* Career Comparison Modal (PART 15) */}
      {comparisonModalOpen && (
        <CareerComparisonModal
          careerAId={compareCareerA}
          careerBId={compareCareerB}
          onClose={() => setComparisonModalOpen(false)}
        />
      )}

    </div>
  );
};
