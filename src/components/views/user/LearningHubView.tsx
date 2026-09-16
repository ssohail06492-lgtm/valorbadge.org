import React, { useState } from 'react';
import { 
  GraduationCap, 
  Clock, 
  Search, 
  BookOpen, 
  Award, 
  ExternalLink, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import { DemoDataBadge } from '../../common/DemoDataBadge';
import { SecurityNoticeBanner } from '../../common/SecurityNoticeBanner';
import { DEMO_COURSES } from '../../../lib/demoData';

export const LearningHubView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [enrolledNotice, setEnrolledNotice] = useState<string | null>(null);

  const groups = ['All', 'Supply Chain & Logistics', 'Technical & Systems Engineering', 'Corporate Management', 'Aviation & Advanced Tech'];

  const filteredCourses = DEMO_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'All' || course.civilianSkillGroup.toLowerCase().includes(selectedGroup.toLowerCase());
    return matchesSearch && matchesGroup;
  });

  const handleEnroll = (courseId: string, title: string) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      setEnrolledNotice(title);
      setTimeout(() => setEnrolledNotice(null), 3500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              ACCREDITED UPSKILLING & RESKILLING
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Veteran Upskilling & Resettlement Academy
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Civilian skill bridging courses aligned with Directorate General Resettlement (DGR) guidelines and premier corporate training partners.
          </p>
        </div>
      </div>

      <SecurityNoticeBanner compact />

      {enrolledNotice && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>You have successfully enrolled in <strong>{enrolledNotice}</strong>! Learning dashboard materials are now unlocked.</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#071328]/80 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search courses or providers..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-mono">Skill Area:</span>
          <select
            value={selectedGroup}
            onChange={e => setSelectedGroup(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
          >
            {groups.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const isEnrolled = enrolledCourses.includes(course.id);

          return (
            <div
              key={course.id}
              className="p-6 rounded-2xl bg-[#071328]/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/20 uppercase font-semibold">
                    {course.civilianSkillGroup}
                  </span>
                  <DemoDataBadge size="sm" />
                </div>

                <h3 className="text-base font-bold text-white font-display mb-1">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Offered by <span className="text-cyan-300">{course.provider}</span>
                </p>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {course.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Duration: {course.duration}</span>
                    </span>
                    <span className="font-mono text-cyan-300 font-medium">
                      Level: {course.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Certification: {course.certificationOffered ? 'Accredited Certificate' : 'Completion Letter'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleEnroll(course.id, course.title)}
                  disabled={isEnrolled}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isEnrolled
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 cursor-default'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                  }`}
                >
                  {isEnrolled ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Enrolled / Access Granted</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-4 h-4" />
                      <span>Enroll in Course</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
