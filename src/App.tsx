/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ALL_LESSONS } from "./data/lessonsData";
import { CHAPTERS_DATA } from "./data/chaptersData";
import { Lesson, Strand, Discipline, getLessonDiscipline, getDisciplineBadge, KHTN8_DISCIPLINES } from "./types";
import { InteractiveLab } from "./components/InteractiveLab";
import { FormulaPlayground } from "./components/FormulaPlayground";
import { PhenomenonExplorer } from "./components/PhenomenonExplorer";
import { SocraticAITutor } from "./components/SocraticAITutor";
import { GoogleSheetSyncPanel } from "./components/GoogleSheetSyncPanel";
import { LessonViewer } from "./components/LessonViewer";
import { DisciplineCards } from "./components/DisciplineCards";
import { SmartKnowledgeExport } from "./components/SmartKnowledgeExport";
import { Dashboard } from "./components/Dashboard";
import { CelebrationModal } from "./components/CelebrationModal";
import { triggerLessonSuccessConfetti } from "./utils/confetti";
import { 
  BookOpen, 
  FlaskConical, 
  Calculator, 
  Sparkles, 
  Bot, 
  FileSpreadsheet, 
  Search, 
  Filter, 
  CheckCircle2, 
  Award, 
  Zap, 
  ChevronRight,
  GraduationCap,
  Layers,
  ArrowUpRight,
  Dna,
  PackageCheck,
  Network
} from "lucide-react";
import { InterdisciplinaryProblemSolver } from "./components/InterdisciplinaryProblemSolver";

export default function App() {
  const [activeTab, setActiveTab] = useState<"curriculum" | "lab" | "formulas" | "phenomena" | "tutor" | "sheets" | "export" | "interdisciplinary">("curriculum");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | "all">("all");
  const [selectedStrand, setSelectedStrand] = useState<string>("all");
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  
  // Active lesson for modal viewer
  const [viewingLesson, setViewingLesson] = useState<Lesson | null>(null);
  const [exportInitialLessonId, setExportInitialLessonId] = useState<number | undefined>(undefined);

  // Lesson context passed to tutor
  const [tutorContextLesson, setTutorContextLesson] = useState<{ id: number; title: string }>({
    id: 13,
    title: "Bài 13: Khối lượng riêng"
  });

  // Gamification & student state
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([1, 2, 8, 13, 15, 17, 20]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [celebratingLesson, setCelebratingLesson] = useState<Lesson | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLessonCompleted = (lessonId: number) => {
    const targetLesson = ALL_LESSONS.find((l) => l.id === lessonId) || null;
    
    // Always trigger fireworks confetti animation & chime sound
    triggerLessonSuccessConfetti(0.55);

    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      showToast(`🎉 Chúc mừng! Em đã hoàn thành mục tiêu bài học #${lessonId}`);
      if (targetLesson) {
        setCelebratingLesson(targetLesson);
      }
      // Send event
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schema_version: "1.0",
          action: "student_event",
          request_id: `req-complete-${Date.now()}`,
          client_id: "web-app",
          payload: {
            student_key: "HS-8A-01",
            lesson_id: String(lessonId),
            activity_id: `ACT_LESSON_${lessonId}_DONE`,
            skill: "Hoàn thành chuẩn kiến thức YCCD",
            score: 10,
            max_score: 10,
            hints: 0,
            duration_seconds: 120,
            timestamp: new Date().toISOString()
          }
        })
      }).catch(console.error);
    } else {
      showToast(`🎉 Em đã hoàn thành bài học #${lessonId}! Tiếp tục phát huy nhé!`);
      if (targetLesson) {
        setCelebratingLesson(targetLesson);
      }
    }
  };

  const handleNextLesson = () => {
    if (!celebratingLesson) return;
    const nextLesson = ALL_LESSONS.find((l) => l.id === celebratingLesson.id + 1);
    setCelebratingLesson(null);
    if (nextLesson) {
      setViewingLesson(nextLesson);
    }
  };

  const handleLogLabEvent = (activity: string, score: number, notes: string) => {
    showToast(`Đã đồng bộ kết quả thí nghiệm: ${notes}`);
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        schema_version: "1.0",
        action: "student_event",
        request_id: `req-lab-${Date.now()}`,
        client_id: "web-lab",
        payload: {
          student_key: "HS-8A-01",
          lesson_id: "17",
          activity_id: activity,
          skill: "Thực hành phòng thí nghiệm ảo",
          score,
          max_score: 10,
          hints: 0,
          duration_seconds: 90,
          notes,
          timestamp: new Date().toISOString()
        }
      })
    }).catch(console.error);
  };

  const getLessonStrand = (l: Lesson): Strand => {
    if (l.strand) return l.strand;
    if (l.id <= 12) return "chat";
    if (l.id <= 29) return "nang_luong";
    if (l.id <= 40) return "vat_song";
    return "trai_dat";
  };

  // Filter lessons with Discipline, Strand, Chapter & Search
  const filteredLessons = ALL_LESSONS.filter((l) => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.id.toString() === searchQuery.trim() ||
                          l.yccd.some((y) => y.toLowerCase().includes(searchQuery.toLowerCase()));
    const discipline = l.discipline || getLessonDiscipline(l.id);
    const matchesDiscipline = selectedDiscipline === "all" || discipline === selectedDiscipline;
    const matchesStrand = selectedStrand === "all" || getLessonStrand(l) === selectedStrand;
    const matchesChapter = selectedChapter === "all" || l.chapterId === selectedChapter;
    return matchesSearch && matchesDiscipline && matchesStrand && matchesChapter;
  });

  const getStrandLabel = (strand: Strand) => {
    switch (strand) {
      case "chat": return { label: "Chất & Biến đổi", bg: "bg-blue-100 text-blue-800" };
      case "nang_luong": return { label: "Năng lượng & Biến đổi", bg: "bg-amber-100 text-amber-800" };
      case "vat_song": return { label: "Vật sống", bg: "bg-emerald-100 text-emerald-800" };
      case "trai_dat": return { label: "Trái Đất & Vũ trụ", bg: "bg-purple-100 text-purple-800" };
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-cyan-500/50 flex items-center gap-2 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="bg-slate-950 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & School context */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 flex items-center justify-center font-black text-slate-950 text-lg shadow-md">
              8
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                  KHTN 8 Smart Notebook
                </h1>
                <span className="hidden md:inline-block text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono px-2 py-0.5 rounded-full font-semibold">
                  Kết Nối Tri Thức
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Nền tảng sổ tay khoa học tự nhiên 8 thông minh chuẩn GDPT 2018
              </p>
            </div>
          </div>

          {/* Student Status Badge */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <div className="hidden sm:block">
                <div className="text-[10px] text-slate-400">Học sinh</div>
                <div className="font-bold text-slate-200">HS-8A-01</div>
              </div>
              <div className="h-6 w-px bg-slate-800 hidden sm:block" />
              <div className="flex items-center gap-1 font-mono text-amber-400 font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>{completedLessonIds.length * 50 + 30} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-900/90 border-t border-slate-800/80 px-4 sm:px-6 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex gap-1 sm:gap-2">
            {[
              { id: "curriculum", label: "47 Bài Học SGK", icon: BookOpen },
              { id: "interdisciplinary", label: "Vấn Đề Liên Môn (Spec 18)", icon: Network },
              { id: "export", label: "Xuất Gói Tri Thức (Spec 15)", icon: PackageCheck },
              { id: "lab", label: "Thí Nghiệm Ảo", icon: FlaskConical },
              { id: "formulas", label: "Kho Công Thức QA", icon: Calculator },
              { id: "phenomena", label: "Ma Trận Hiện Tượng", icon: Sparkles },
              { id: "tutor", label: "Gia Sư Socratic AI", icon: Bot },
              { id: "sheets", label: "Đồng Bộ Google Sheets", icon: FileSpreadsheet }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-3 sm:px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-cyan-400 text-cyan-300 bg-slate-800/60"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* ================= 1. CURRICULUM VIEW (47 LESSONS) ================= */}
        {activeTab === "curriculum" && (
          <div className="space-y-6">
            {/* Dashboard Component replacing text summary */}
            <Dashboard
              completedLessonIds={completedLessonIds}
              selectedDiscipline={selectedDiscipline}
              onSelectDiscipline={setSelectedDiscipline}
            />

            {/* 3 Core Disciplines: Lí - Hóa - Sinh Cards */}
            <DisciplineCards
              selectedDiscipline={selectedDiscipline}
              onSelectDiscipline={setSelectedDiscipline}
              completedLessonIds={completedLessonIds}
            />

            {/* Filter and Search Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              {/* Quick Discipline Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pb-2.5 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-cyan-600" />
                  Lọc theo Lĩnh vực:
                </span>
                {[
                  { id: "all", label: "Tất cả 3 phân môn (47 bài)", icon: Layers, color: "text-slate-800" },
                  { id: "physics", label: "Vật lí (17 bài)", icon: Zap, color: "text-blue-700", count: "Bài 13-29" },
                  { id: "chemistry", label: "Hóa học (12 bài)", icon: FlaskConical, color: "text-purple-700", count: "Bài 1-12" },
                  { id: "biology", label: "Sinh học (18 bài)", icon: Dna, color: "text-emerald-700", count: "Bài 30-47" }
                ].map((disc) => {
                  const Icon = disc.icon;
                  const isSelected = selectedDiscipline === disc.id;
                  return (
                    <button
                      key={disc.id}
                      onClick={() => setSelectedDiscipline(disc.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-cyan-400" : disc.color}`} />
                      <span>{disc.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm tên bài, số bài (ví dụ: 13, 17), hoặc nội dung YCCD..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Chapter Select */}
                <div className="w-full md:w-auto flex items-center gap-2">
                  <select
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="w-full md:w-72 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="all">Tất cả 9 Chương (Toàn bộ SGK)</option>
                    {CHAPTERS_DATA.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.discipline === "physics" ? "Vật lí" : c.discipline === "chemistry" ? "Hóa học" : "Sinh học"})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Result Summary Bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                <div>
                  Đang hiển thị <strong className="text-slate-900">{filteredLessons.length}</strong> / 47 bài học
                  {selectedDiscipline !== "all" && (
                    <span className="ml-1 text-cyan-700 font-semibold">
                      (thuộc phân môn {selectedDiscipline === "physics" ? "Vật lí" : selectedDiscipline === "chemistry" ? "Hóa học" : "Sinh học"})
                    </span>
                  )}
                </div>
                {selectedDiscipline !== "all" && (
                  <button
                    onClick={() => setSelectedDiscipline("all")}
                    className="text-[11px] text-cyan-700 hover:underline font-bold"
                  >
                    Xóa bộ lọc phân môn &times;
                  </button>
                )}
              </div>
            </div>

            {/* Lesson Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLessons.map((lesson) => {
                const strandInfo = getStrandLabel(getLessonStrand(lesson));
                const discipline = lesson.discipline || getLessonDiscipline(lesson.id);
                const discBadge = getDisciplineBadge(discipline);
                const isCompleted = completedLessonIds.includes(lesson.id);
                const sgkText = lesson.pages?.sgk || `SGK tr.${lesson.sgkStartPage}-${lesson.sgkEndPage}`;
                const sgvText = lesson.pages?.sgv || `SGV tr.${lesson.sgvStartPage}`;

                return (
                  <div
                    key={lesson.id}
                    onClick={() => setViewingLesson(lesson)}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-cyan-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Badges: Discipline & Strand */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDiscipline(discipline);
                            }}
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 transition-transform hover:scale-105 ${discBadge.pillClass}`}
                            title={`Bấm để chỉ lọc các bài ${discBadge.label}`}
                          >
                            {discipline === "physics" ? <Zap className="w-3 h-3" /> : discipline === "chemistry" ? <FlaskConical className="w-3 h-3" /> : <Dna className="w-3 h-3" />}
                            {discBadge.label}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${strandInfo.bg}`}>
                            {strandInfo.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLessonCompleted(lesson.id);
                            }}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 transition-all active:scale-90 ${
                              isCompleted
                                ? "text-emerald-700 bg-emerald-100/90 hover:bg-emerald-200 border border-emerald-300"
                                : "text-slate-600 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border hover:border-emerald-300"
                            }`}
                            title={isCompleted ? "Đã xong! Nhấp để bắn pháo hoa ăn mừng lại 🎉" : "Nhấp để đánh dấu hoàn thành bài học"}
                          >
                            <CheckCircle2 className={`w-3 h-3 ${isCompleted ? "text-emerald-600 fill-emerald-100" : "text-slate-400"}`} />
                            <span>{isCompleted ? "Đã xong 🎉" : `${lesson.atoms.length} Hạt nhân`}</span>
                          </button>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug">
                        {lesson.title}
                      </h3>

                      {/* Page anchors */}
                      <div className="text-[11px] font-mono text-slate-600 mt-2">
                        {sgkText} • {sgvText}
                      </div>

                      {/* Primary YCCD snippet */}
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {lesson.yccd[0] || "Hạt nhân kiến thức cốt lõi chuẩn chương trình GDPT 2018."}
                      </p>
                    </div>

                    {/* Bottom action trigger */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-cyan-700 font-semibold">
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        Khám phá bài học & YCCD
                      </span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= 2. INTERACTIVE LAB ================= */}
        {activeTab === "lab" && (
          <InteractiveLab onLogEvent={handleLogLabEvent} />
        )}

        {/* ================= 3. FORMULA PLAYGROUND ================= */}
        {activeTab === "formulas" && (
          <FormulaPlayground />
        )}

        {/* ================= 4. PHENOMENON EXPLORER ================= */}
        {activeTab === "phenomena" && (
          <PhenomenonExplorer 
            onSelectLesson={(id) => {
              const l = ALL_LESSONS.find((item) => item.id === id);
              if (l) setViewingLesson(l);
            }} 
          />
        )}

        {/* ================= 5. SOCRATIC AI TUTOR ================= */}
        {activeTab === "tutor" && (
          <SocraticAITutor 
            selectedLessonId={tutorContextLesson.id}
            selectedLessonTitle={tutorContextLesson.title}
          />
        )}

        {/* ================= 6. GOOGLE SHEET SYNC ================= */}
        {activeTab === "sheets" && (
          <GoogleSheetSyncPanel />
        )}

        {/* ================= 7. SMART KNOWLEDGE EXPORT (SPEC 15) ================= */}
        {activeTab === "export" && (
          <SmartKnowledgeExport 
            initialLessonId={exportInitialLessonId}
            onOpenLessonViewer={(lesson) => setViewingLesson(lesson)}
          />
        )}

        {/* ================= 8. INTERDISCIPLINARY PROBLEM SOLVER (SPEC 18) ================= */}
        {activeTab === "interdisciplinary" && (
          <InterdisciplinaryProblemSolver
            onNavigateToLesson={(lessonId) => {
              const l = ALL_LESSONS.find((item) => item.id === lessonId);
              if (l) setViewingLesson(l);
            }}
          />
        )}
      </main>

      {/* Lesson Viewer Modal */}
      {viewingLesson && (
        <LessonViewer
          lesson={viewingLesson}
          isCompleted={completedLessonIds.includes(viewingLesson.id)}
          onClose={() => setViewingLesson(null)}
          onOpenTutor={(id, title) => {
            setTutorContextLesson({ id, title });
            setActiveTab("tutor");
          }}
          onOpenLab={() => {
            setActiveTab("lab");
          }}
          onLogProgress={(id) => {
            handleLessonCompleted(id);
          }}
          onExportLesson={(id) => {
            setViewingLesson(null);
            setExportInitialLessonId(id);
            setActiveTab("export");
          }}
        />
      )}

      {/* Celebration Confetti & Motivation Modal */}
      <CelebrationModal
        isOpen={!!celebratingLesson}
        lesson={celebratingLesson}
        onClose={() => setCelebratingLesson(null)}
        onNextLesson={handleNextLesson}
        totalCompleted={completedLessonIds.length}
        totalLessons={ALL_LESSONS.length}
      />
    </div>
  );
}
