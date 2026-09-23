import React, { useState } from "react";
import { Lesson, KnowledgeAtom, ScenarioContext, getLessonDiscipline, getDisciplineBadge } from "../types";
import { MathView } from "./MathView";
import { 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  AlertCircle, 
  Sparkles, 
  Calculator, 
  X, 
  Target, 
  HelpCircle,
  Award,
  Zap,
  FlaskConical,
  Dna,
  Home,
  School,
  Cpu,
  Factory,
  Globe,
  Scale,
  ExternalLink,
  Lightbulb,
  Compass,
  FileCheck,
  RotateCcw,
  Download
} from "lucide-react";

interface LessonViewerProps {
  lesson: Lesson;
  isCompleted?: boolean;
  onClose: () => void;
  onOpenTutor: (lessonId: number, title: string) => void;
  onOpenLab: () => void;
  onLogProgress: (lessonId: number) => void;
  onExportLesson?: (lessonId: number) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  isCompleted = false,
  onClose,
  onOpenTutor,
  onOpenLab,
  onLogProgress,
  onExportLesson
}) => {
  const [activeTab, setActiveTab] = useState<"atoms" | "scenarios" | "diagnostic" | "yccd">("atoms");
  const [selectedAtom, setSelectedAtom] = useState<KnowledgeAtom>(lesson.atoms[0] || null);
  const [selectedContextClass, setSelectedContextClass] = useState<string>("all");

  // Diagnostic Quiz State for the current atom
  const currentDiagnostic = selectedAtom?.diagnostic_question;
  const [selectedDiagOpt, setSelectedDiagOpt] = useState<number | null>(null);
  const [diagSubmitted, setDiagSubmitted] = useState<boolean>(false);

  // Discipline metadata
  const discipline = getLessonDiscipline(lesson.id);
  const badge = getDisciplineBadge(discipline);

  const getDisciplineIcon = () => {
    switch (discipline) {
      case "physics": return <Zap className="w-3.5 h-3.5" />;
      case "chemistry": return <FlaskConical className="w-3.5 h-3.5" />;
      case "biology": return <Dna className="w-3.5 h-3.5" />;
    }
  };

  const getContextClassIcon = (ctxClass: string) => {
    switch (ctxClass) {
      case "home": return <Home className="w-4 h-4 text-amber-500" />;
      case "school": return <School className="w-4 h-4 text-blue-500" />;
      case "technology": return <Cpu className="w-4 h-4 text-purple-500" />;
      case "production_or_agriculture": return <Factory className="w-4 h-4 text-emerald-600" />;
      case "environment_or_community": return <Globe className="w-4 h-4 text-teal-500" />;
      case "decision_or_problem_solving": return <Scale className="w-4 h-4 text-rose-500" />;
      default: return <Compass className="w-4 h-4 text-cyan-600" />;
    }
  };

  const getContextClassLabel = (ctxClass: string) => {
    switch (ctxClass) {
      case "home": return "Gia đình";
      case "school": return "Trường học";
      case "technology": return "Công nghệ";
      case "production_or_agriculture": return "Sản xuất / Nông nghiệp";
      case "environment_or_community": return "Môi trường";
      case "decision_or_problem_solving": return "Ra quyết định";
      default: return ctxClass;
    }
  };

  const allContexts: ScenarioContext[] = (selectedAtom?.contexts || lesson.atoms.flatMap(a => a.contexts || [])).filter(ctx => {
    if (selectedContextClass === "all") return true;
    return ctx.contextClass === selectedContextClass;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white w-full max-w-5xl h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-base">
              {lesson.id}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${badge.pillClass}`}>
                  {getDisciplineIcon()} {badge.label}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  SGK tr.{lesson.sgkStartPage}-{lesson.sgkEndPage} | SGV tr.{lesson.sgvStartPage}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white line-clamp-1 mt-0.5">
                {lesson.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onExportLesson && (
              <button
                onClick={() => onExportLesson(lesson.id)}
                className="px-3 py-1.5 bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-semibold rounded-lg hover:bg-cyan-600/50 transition-all flex items-center gap-1.5"
                title="Mở gói xuất kiến thức của bài học này"
              >
                <Download className="w-3.5 h-3.5" /> Xuất Gói Tri Thức
              </button>
            )}
            <button
              onClick={() => onLogProgress(lesson.id)}
              className={`px-3 py-1.5 border text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 active:scale-95 ${
                isCompleted 
                  ? "bg-emerald-600 border-emerald-400 text-white shadow-md shadow-emerald-600/30"
                  : "bg-emerald-600/30 border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/50"
              }`}
              title={isCompleted ? "Bài học đã hoàn thành (Bấm để bắn pháo hoa ăn mừng lại)" : "Đánh dấu đã học và hoàn thành bài này"}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Đã Hoàn Thành 🎉
                </>
              ) : (
                <>
                  <Award className="w-3.5 h-3.5" /> Ghi Nhận Đã Học
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("atoms")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "atoms" ? "border-cyan-600 text-cyan-800 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" /> Hạt Nhân Tri Thức ({lesson.atoms.length})
          </button>
          <button
            onClick={() => setActiveTab("scenarios")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "scenarios" ? "border-cyan-600 text-cyan-800 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Compass className="w-4 h-4" /> 6 Chiều Thực Tiễn ({allContexts.length})
          </button>
          <button
            onClick={() => setActiveTab("diagnostic")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "diagnostic" ? "border-cyan-600 text-cyan-800 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Chẩn Đoán & Chuyển Giao
          </button>
          <button
            onClick={() => setActiveTab("yccd")}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "yccd" ? "border-cyan-600 text-cyan-800 bg-white" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Target className="w-4 h-4" /> Chuẩn YCCD & Khung GDPT
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 bg-slate-50/50">
          
          {/* TAB 1: KNOWLEDGE ATOMS */}
          {activeTab === "atoms" && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Atom Selector */}
              <div className="md:col-span-4 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Hạt nhân tri thức:</span>
                  <span className="text-cyan-700 font-mono">{lesson.atoms.length} hạt nhân</span>
                </div>
                {lesson.atoms.length === 0 ? (
                  <div className="text-xs text-slate-500 italic p-3 bg-white rounded-xl border border-slate-200">
                    Đang đồng bộ hạt nhân tri thức từ SGK.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                    {lesson.atoms.map((atom) => {
                      const isSelected = (selectedAtom?.atom_id || selectedAtom?.id) === (atom.atom_id || atom.id);
                      return (
                        <button
                          key={atom.atom_id || atom.id}
                          onClick={() => {
                            setSelectedAtom(atom);
                            setSelectedDiagOpt(null);
                            setDiagSubmitted(false);
                          }}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                            isSelected
                              ? "bg-cyan-50 border-cyan-500 text-cyan-950 font-bold shadow-xs ring-1 ring-cyan-400"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-slate-100 text-slate-600 font-bold">
                              {atom.atom_id || atom.id}
                            </span>
                            {atom.concept_type && (
                              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                                {atom.concept_type}
                              </span>
                            )}
                          </div>
                          <div className="font-semibold text-slate-900 leading-snug">{atom.title || atom.topic}</div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Atom Detail Inspector */}
              <div className="md:col-span-8 space-y-4">
                {selectedAtom ? (
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                    {/* Header & Source Anchor */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                          Hạt nhân khoa học: {selectedAtom.atom_id}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                          {selectedAtom.title || selectedAtom.topic}
                        </h4>
                      </div>

                      {selectedAtom.source_anchors && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg font-mono">
                          <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                          <span>{selectedAtom.source_anchors.join(" • ")}</span>
                        </div>
                      )}
                    </div>

                    {/* Scientific Statement & Canonical Explanation */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                        Phát biểu chuẩn xác & Giải thích khoa học:
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-medium">
                        {selectedAtom.definition || selectedAtom.statement}
                      </p>
                      {selectedAtom.canonical_explanation && selectedAtom.canonical_explanation !== selectedAtom.statement && (
                        <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                          <span className="font-semibold text-blue-900">Bản chất cơ chế: </span>
                          {selectedAtom.canonical_explanation}
                        </p>
                      )}
                    </div>

                    {/* Formula with KaTeX if present */}
                    {(selectedAtom.formulaLatex || selectedAtom.formula?.latex_display) && (
                      <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 text-center shadow-inner">
                        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">Công thức chuẩn SGK</div>
                        <div className="my-2.5">
                          <MathView 
                            math={selectedAtom.formulaLatex || selectedAtom.formula?.latex_display || ""} 
                            block 
                            className="text-2xl sm:text-3xl text-cyan-300 font-mono" 
                          />
                        </div>
                        {(selectedAtom.conditions || selectedAtom.formula?.conditions_of_validity) && (
                          <div className="text-[11px] text-slate-300 bg-slate-800/80 p-1.5 rounded inline-block mt-1">
                            <span className="text-amber-400 font-semibold">Điều kiện áp dụng:</span> {selectedAtom.conditions || selectedAtom.formula?.conditions_of_validity}
                          </div>
                        )}
                        {selectedAtom.formula?.derived_forms && selectedAtom.formula.derived_forms.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-slate-800">
                            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1.5">
                              Hệ quả suy ra chuẩn xác:
                            </div>
                            <div className="flex flex-wrap gap-2 justify-center">
                              {selectedAtom.formula.derived_forms.map((df, idx) => (
                                <span key={idx} className="bg-slate-800/90 text-slate-200 px-2.5 py-1 rounded-lg text-xs font-mono border border-slate-700 flex items-center gap-1.5">
                                  <MathView math={df.latex} className="text-cyan-300 font-bold" />
                                  <span className="text-[10px] text-slate-400 font-sans">({df.note})</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Examples & Counterexamples */}
                    {((selectedAtom.examples && selectedAtom.examples.length > 0) || (selectedAtom.counterexamples && selectedAtom.counterexamples.length > 0)) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        {selectedAtom.examples && selectedAtom.examples.length > 0 && (
                          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Ví dụ thực tiễn:
                            </div>
                            <ul className="list-disc pl-4 space-y-1 text-[11px] text-emerald-950">
                              {selectedAtom.examples.map((ex, i) => (
                                <li key={i}>{ex}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedAtom.counterexamples && selectedAtom.counterexamples.length > 0 && (
                          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                            <div className="font-bold text-amber-900 flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Phản ví dụ (Tránh nhầm lẫn):
                            </div>
                            <ul className="list-disc pl-4 space-y-1 text-[11px] text-amber-950">
                              {selectedAtom.counterexamples.map((cex, i) => (
                                <li key={i}>{cex}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Misconceptions & Repair Strategy */}
                    {selectedAtom.misconceptions && selectedAtom.misconceptions.length > 0 && (
                      <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs text-rose-900">
                        <div className="font-bold flex items-center gap-1.5 text-rose-800">
                          <AlertCircle className="w-4 h-4 text-rose-600" /> Bẫy nhận thức phổ biến & Chiến lược sửa sai:
                        </div>
                        {selectedAtom.misconceptions.map((m: any, idx: number) => (
                          <div key={idx} className="bg-white p-3 rounded-lg border border-rose-200 space-y-1.5 shadow-2xs">
                            <div className="font-semibold text-rose-950 text-xs">
                              ⚠️ Sai lầm: {typeof m === "string" ? m : m.description}
                            </div>
                            {m.counterExample && (
                              <div className="text-[11px] text-slate-700">
                                <span className="font-bold text-slate-900">Bằng chứng bác bỏ:</span> {m.counterExample}
                              </div>
                            )}
                            {m.repairStrategy && (
                              <div className="text-[11px] text-emerald-800 bg-emerald-50/60 p-2 rounded border border-emerald-200">
                                <span className="font-bold text-emerald-900">Chiến lược sửa sai Socratic:</span> {m.repairStrategy}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Applications */}
                    {selectedAtom.applications && selectedAtom.applications.length > 0 && (
                      <div className="p-3.5 bg-cyan-50/60 border border-cyan-200 rounded-xl space-y-1.5 text-xs">
                        <div className="font-bold text-cyan-900 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-cyan-700" /> Ứng dụng thực tiễn khoa học:
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-[11px] text-cyan-950">
                          {selectedAtom.applications.map((app, i) => (
                            <li key={i}>{app}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Curated Web Resources (PhET, Wiki) */}
                    {selectedAtom.web_resources && selectedAtom.web_resources.length > 0 && (
                      <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="font-bold text-slate-800 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5 text-cyan-600" /> Tài nguyên số đã thẩm định (PhET / Wikimedia):
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">Độ tin cậy &gt; 95%</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedAtom.web_resources.map((res, i) => (
                            <a
                              key={i}
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2.5 bg-white rounded-lg border border-slate-200 hover:border-cyan-500 hover:shadow-xs transition-all flex items-start gap-2 group"
                            >
                              <div className="w-6 h-6 rounded bg-cyan-50 text-cyan-700 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                                <ExternalLink className="w-3.5 h-3.5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-bold text-slate-900 group-hover:text-cyan-700 text-[11px] truncate">
                                  {res.title}
                                </div>
                                <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                                  {res.evidence_excerpt || res.url}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                    Chọn một hạt nhân tri thức bên trái để xem phân tích chi tiết.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MULTIDIMENSIONAL SCENARIOS (6 CHIỀU THỰC TIỄN) */}
          {activeTab === "scenarios" && (
            <div className="space-y-4">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-600 mr-1">Bộ lọc bối cảnh:</span>
                {[
                  { id: "all", label: "Tất cả (6 Chiều)", icon: <Compass className="w-3.5 h-3.5" /> },
                  { id: "home", label: "Gia đình", icon: <Home className="w-3.5 h-3.5" /> },
                  { id: "school", label: "Trường học", icon: <School className="w-3.5 h-3.5" /> },
                  { id: "technology", label: "Công nghệ", icon: <Cpu className="w-3.5 h-3.5" /> },
                  { id: "production_or_agriculture", label: "Sản xuất / Nông nghiệp", icon: <Factory className="w-3.5 h-3.5" /> },
                  { id: "environment_or_community", label: "Môi trường", icon: <Globe className="w-3.5 h-3.5" /> },
                  { id: "decision_or_problem_solving", label: "Ra quyết định", icon: <Scale className="w-3.5 h-3.5" /> }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedContextClass(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      selectedContextClass === cat.id
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>

              {/* Scenarios Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allContexts.length === 0 ? (
                  <div className="col-span-2 text-center p-8 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
                    Không có tình huống nào trong phân loại này.
                  </div>
                ) : (
                  allContexts.map((ctx) => (
                    <div
                      key={ctx.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 flex items-center gap-1 border border-slate-200">
                            {getContextClassIcon(ctx.contextClass)} {getContextClassLabel(ctx.contextClass)}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{ctx.id}</span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {ctx.title}
                        </h4>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
                          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Hiện tượng quan sát:</div>
                          <p className="text-slate-800 leading-relaxed">{ctx.phenomenon}</p>
                          {ctx.observation && (
                            <p className="text-slate-600 text-[11px] pt-1 border-t border-slate-200/60 mt-1">
                              💡 {ctx.observation}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 space-y-2">
                        <div className="text-xs">
                          <span className="font-bold text-cyan-900">Câu hỏi khám phá: </span>
                          <span className="text-slate-800 font-medium">{ctx.question}</span>
                        </div>
                        <div className="bg-cyan-50/70 p-3 rounded-xl border border-cyan-100 text-xs text-cyan-950">
                          <span className="font-bold text-cyan-900 flex items-center gap-1 mb-0.5">
                            <Lightbulb className="w-3.5 h-3.5 text-cyan-600" /> Giải thích cơ chế khoa học:
                          </span>
                          <p className="leading-relaxed text-[11px]">{ctx.explanationRoute}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: DIAGNOSTIC QUESTIONS & TRANSFER TASKS */}
          {activeTab === "diagnostic" && (
            <div className="space-y-5">
              {/* Diagnostic Assessment Section */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-cyan-700 uppercase tracking-wider bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                      Đánh Giá Chẩn Đoán Sâu (Diagnostic Assessment)
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      {currentDiagnostic?.question || `Kiểm tra mức độ thấu hiểu bản chất bài học: ${lesson.title}`}
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold border border-emerald-200">
                    +15 Điểm Năng Lực
                  </span>
                </div>

                {currentDiagnostic ? (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      {currentDiagnostic.options.map((opt, idx) => {
                        const isSelected = selectedDiagOpt === idx;
                        const isCorrect = idx === currentDiagnostic.correctIndex;
                        
                        let optStyle = "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800";
                        if (diagSubmitted) {
                          if (isCorrect) {
                            optStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400";
                          } else if (isSelected) {
                            optStyle = "bg-rose-50 border-rose-500 text-rose-950 font-semibold ring-1 ring-rose-400";
                          } else {
                            optStyle = "bg-slate-50 border-slate-200 opacity-50";
                          }
                        } else if (isSelected) {
                          optStyle = "bg-cyan-50 border-cyan-500 text-cyan-950 font-semibold";
                        }

                        return (
                          <button
                            key={idx}
                            disabled={diagSubmitted}
                            onClick={() => setSelectedDiagOpt(idx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${optStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {!diagSubmitted ? (
                      <div className="flex justify-end pt-2">
                        <button
                          disabled={selectedDiagOpt === null}
                          onClick={() => setDiagSubmitted(true)}
                          className="px-5 py-2.5 bg-slate-900 hover:bg-black disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
                        >
                          Xác Nhận Câu Trả Lời
                        </button>
                      </div>
                    ) : (
                      <div className="pt-2 space-y-3">
                        <div className={`p-4 rounded-xl text-xs space-y-2 border ${
                          selectedDiagOpt === currentDiagnostic.correctIndex 
                            ? "bg-emerald-50 border-emerald-200 text-emerald-950" 
                            : "bg-rose-50 border-rose-200 text-rose-950"
                        }`}>
                          <div className="font-bold flex items-center gap-2 text-sm">
                            {selectedDiagOpt === currentDiagnostic.correctIndex ? (
                              <>
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Xuất sắc! Em đã nhận diện chính xác bản chất khoa học.
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-5 h-5 text-rose-600" /> Cần xem lại! Em đã vướng phải bẫy nhận thức phổ biến.
                              </>
                            )}
                          </div>
                          
                          {selectedDiagOpt !== currentDiagnostic.correctIndex && currentDiagnostic.commonWrongReason && (
                            <div className="bg-white/80 p-3 rounded-lg border border-rose-200 text-rose-900 text-xs">
                              <span className="font-bold">⚠️ Lý do chọn sai thường gặp:</span> {currentDiagnostic.commonWrongReason}
                            </div>
                          )}

                          {currentDiagnostic.socraticHint && (
                            <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold">Gợi ý tư duy Socratic:</span> {currentDiagnostic.socraticHint}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              setSelectedDiagOpt(null);
                              setDiagSubmitted(false);
                            }}
                            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Làm lại câu hỏi
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                    Không có câu hỏi chẩn đoán cho hạt nhân này.
                  </div>
                )}
              </div>

              {/* Transfer Task Section */}
              {selectedAtom?.transfer_task && (
                <div className="bg-gradient-to-br from-indigo-50/50 via-white to-cyan-50/40 p-6 rounded-2xl border border-indigo-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 flex items-center gap-1.5 w-fit">
                        <FileCheck className="w-3.5 h-3.5 text-indigo-600" /> Nhiệm Vụ Chuyển Giao Năng Lực (Transfer Task)
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-1">
                        {selectedAtom.transfer_task.title}
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-4 rounded-xl border border-indigo-100 space-y-2">
                      <div className="font-bold text-indigo-950 flex items-center gap-1.5">
                        <Target className="w-4 h-4 text-indigo-600" /> Bối cảnh & Nhiệm vụ thực tế:
                      </div>
                      <p className="text-slate-600 text-[11px] italic bg-slate-50 p-2 rounded">
                        "{selectedAtom.transfer_task.context}"
                      </p>
                      <p className="text-slate-800 leading-relaxed font-medium pt-1">
                        {selectedAtom.transfer_task.task}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-cyan-100 space-y-2">
                      <div className="font-bold text-cyan-950 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-cyan-600" /> Sản phẩm nộp & Tiêu chí đánh giá:
                      </div>
                      <div className="bg-cyan-50/50 p-2 rounded text-cyan-900 text-[11px]">
                        <span className="font-bold">Sản phẩm bàn giao:</span> {selectedAtom.transfer_task.deliverables}
                      </div>
                      <div className="bg-emerald-50/50 p-2 rounded text-emerald-900 text-[11px]">
                        <span className="font-bold">Tiêu chí chấm điểm:</span> {selectedAtom.transfer_task.evaluationCriteria}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: YCCD & LEARNING OBJECTIVES */}
          {activeTab === "yccd" && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Yêu Cầu Cần Đạt (Theo chuẩn GDPT 2018 - SGK KHTN 8):
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">
                    Trang {lesson.sgkStartPage} - {lesson.sgkEndPage}
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {lesson.yccd.map((y, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{y}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-cyan-50/60 border border-cyan-200 rounded-2xl text-xs space-y-3">
                <span className="font-bold text-cyan-900 uppercase tracking-wider">
                  Ma Trận Năng Lực Khoa Học KHTN 8 (GDPT 2018):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-white p-4 rounded-xl border border-cyan-200 shadow-2xs">
                    <div className="font-bold text-cyan-800 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-cyan-600" /> 1. Nhận thức KHTN
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      Trình bày, nhận biết khái niệm, công thức và quy luật khoa học tự nhiên.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-cyan-200 shadow-2xs">
                    <div className="font-bold text-cyan-800 flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-cyan-600" /> 2. Tìm hiểu tự nhiên
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      Đề xuất giả thuyết, thực hiện thí nghiệm ảo/thực tế và thu thập số liệu.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-cyan-200 shadow-2xs">
                    <div className="font-bold text-cyan-800 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-cyan-600" /> 3. Vận dụng kiến thức
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      Giải thích hiện tượng đời sống và đề xuất giải pháp kỹ thuật an toàn.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenTutor(lesson.id, lesson.title);
              }}
              className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" /> Hỏi Gia Sư Socratic Về Bài Này
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenLab();
              }}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Calculator className="w-4 h-4" /> Mở Phòng Thí Nghiệm Liên Quan
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-all"
          >
            Đóng Lại
          </button>
        </div>
      </div>
    </div>
  );
};
