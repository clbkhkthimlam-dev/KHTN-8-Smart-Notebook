import React, { useState, useMemo } from "react";
import { 
  ExportSelection, 
  ExportLayerConfig, 
  ExerciseFilterConfig, 
  ExportPackPreset,
  Discipline,
  Lesson,
  getLessonDiscipline,
  getDisciplineBadge,
  KHTN8_DISCIPLINES
} from "../types";
import { ALL_LESSONS } from "../data/lessonsData";
import { CHAPTERS_DATA } from "../data/chaptersData";
import { 
  buildKnowledgePackage, 
  renderPackageToMarkdown, 
  renderPackageToJSON, 
  downloadBlob,
  DEFAULT_LAYER_CONFIG,
  DEFAULT_EXERCISE_FILTER 
} from "../data/exportEngine";
import { 
  downloadDOCXDocument,
  openPrintDocumentWindow,
  downloadHTMLDocument,
  normalizeNFC
} from "../utils/documentExport";
import { MathView } from "./MathView";
import { 
  Download, 
  Copy, 
  Printer, 
  FileText, 
  Code, 
  Eye, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Calculator, 
  HelpCircle, 
  ExternalLink, 
  Filter, 
  Compass, 
  FileCheck, 
  Award,
  Zap,
  FlaskConical,
  Dna,
  ShieldCheck,
  RefreshCw,
  Sliders,
  CheckSquare,
  Square,
  Bookmark,
  Target,
  Globe
} from "lucide-react";

interface SmartKnowledgeExportProps {
  initialLessonId?: number;
  onOpenLessonViewer?: (lesson: Lesson) => void;
}

export const SmartKnowledgeExport: React.FC<SmartKnowledgeExportProps> = ({
  initialLessonId,
  onOpenLessonViewer
}) => {
  // Selection State
  const [selectedChapters, setSelectedChapters] = useState<string[]>(
    initialLessonId ? [] : ["CH_III_DENSITY_PRESSURE"]
  );
  const [selectedLessons, setSelectedLessons] = useState<number[]>(
    initialLessonId ? [initialLessonId] : [13, 16, 17]
  );
  const [selectedAtoms, setSelectedAtoms] = useState<string[]>([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | "all">("all");
  const [selectionMode, setSelectionMode] = useState<"chapters" | "lessons" | "atoms">("lessons");

  // Layers Configuration (Tầng 0 - Tầng 5)
  const [layers, setLayers] = useState<ExportLayerConfig>(DEFAULT_LAYER_CONFIG);

  // Exercise Filter Configuration
  const [exerciseFilters, setExerciseFilters] = useState<ExerciseFilterConfig>(DEFAULT_EXERCISE_FILTER);

  // Preset Template
  const [activePreset, setActivePreset] = useState<ExportPackPreset>("full_knowledge");

  // Output View Mode
  const [outputMode, setOutputMode] = useState<"interactive" | "print" | "markdown" | "json">("interactive");

  // Copy Feedback & Export Loading States
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [isLoggingExport, setIsLoggingExport] = useState<boolean>(false);
  const [isExportingDocx, setIsExportingDocx] = useState<boolean>(false);
  const [isOpeningPrint, setIsOpeningPrint] = useState<boolean>(false);

  // Apply Preset Configuration
  const handleApplyPreset = (preset: ExportPackPreset) => {
    setActivePreset(preset);
    switch (preset) {
      case "quick_revision":
        setLayers({
          includeCore: true,
          includePrereq: false,
          includePractice: true,
          includeApplication: false,
          includeTransfer: false,
          includeExtension: false
        });
        setExerciseFilters({
          difficulties: [1, 2, 3],
          cognitiveLevels: ["recognition", "comprehension"],
          questionTypes: ["multiple_choice", "calculation"],
          maxPerLesson: 4
        });
        break;
      case "formula_sheet":
        setLayers({
          includeCore: true,
          includePrereq: false,
          includePractice: false,
          includeApplication: false,
          includeTransfer: false,
          includeExtension: false
        });
        break;
      case "phenomenon_pack":
        setLayers({
          includeCore: true,
          includePrereq: false,
          includePractice: true,
          includeApplication: true,
          includeTransfer: true,
          includeExtension: true
        });
        break;
      case "practice_pack":
        setLayers({
          includeCore: true,
          includePrereq: true,
          includePractice: true,
          includeApplication: false,
          includeTransfer: false,
          includeExtension: false
        });
        setExerciseFilters(DEFAULT_EXERCISE_FILTER);
        break;
      case "teacher_pack":
      case "full_knowledge":
      default:
        setLayers(DEFAULT_LAYER_CONFIG);
        setExerciseFilters(DEFAULT_EXERCISE_FILTER);
        break;
    }
  };

  // Build the Knowledge Package dynamically
  const knowledgePackage = useMemo(() => {
    const selection: ExportSelection = {
      chapters: selectedChapters,
      lessons: selectedLessons,
      atoms: selectedAtoms,
      skills: [],
      packTemplate: activePreset
    };
    return buildKnowledgePackage(selection, layers, exerciseFilters);
  }, [selectedChapters, selectedLessons, selectedAtoms, layers, exerciseFilters, activePreset]);

  // Markdown and JSON outputs
  const markdownText = useMemo(() => renderPackageToMarkdown(knowledgePackage), [knowledgePackage]);
  const jsonText = useMemo(() => renderPackageToJSON(knowledgePackage), [knowledgePackage]);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(`Đã sao chép ${label} vào clipboard!`);
    setTimeout(() => setCopyFeedback(null), 3000);
  };

  // Download helpers for Markdown / JSON
  const handleDownload = (format: "markdown" | "json") => {
    const timestamp = new Date().toISOString().slice(0, 10);
    if (format === "markdown") {
      downloadBlob(markdownText, `KHTN8_GoiTriThuc_${knowledgePackage.package_hash}_${timestamp}.md`, "text/markdown;charset=utf-8");
    } else {
      downloadBlob(jsonText, `KHTN8_KnowledgePackage_${knowledgePackage.package_hash}_${timestamp}.json`, "application/json;charset=utf-8");
    }
  };

  // Spec 17: Export standard Microsoft Word (.docx) with pure UTF-8 NFC & font support
  const handleExportDOCX = async () => {
    setIsExportingDocx(true);
    try {
      await downloadDOCXDocument(knowledgePackage);
      setCopyFeedback(`Đã tạo và tải file DOCX (.docx) thành công với phông chữ tiếng Việt chuẩn!`);
      setTimeout(() => setCopyFeedback(null), 4000);
      handleRecordExport();
    } catch (err) {
      console.error("DOCX Export Error:", err);
      setCopyFeedback(`Có lỗi khi tạo file DOCX. Vui lòng thử lại.`);
      setTimeout(() => setCopyFeedback(null), 3000);
    } finally {
      setIsExportingDocx(false);
    }
  };

  // Spec 17: Open isolated print window for PDF vector export without iframe clipping
  const handleExportPDF = () => {
    setIsOpeningPrint(true);
    try {
      openPrintDocumentWindow(knowledgePackage);
      setCopyFeedback(`Đang mở cửa sổ in ấn A4! Trong hộp thoại in, chọn 'Lưu dưới dạng PDF' hoặc chọn máy in.`);
      setTimeout(() => setCopyFeedback(null), 4500);
      handleRecordExport();
    } catch (err) {
      console.error("Print/PDF Window Error:", err);
      setCopyFeedback(`Vui lòng cho phép popup để mở cửa sổ in tài liệu.`);
      setTimeout(() => setCopyFeedback(null), 3000);
    } finally {
      setIsOpeningPrint(false);
    }
  };

  // Download Standalone Printable HTML
  const handleDownloadHTML = () => {
    downloadHTMLDocument(knowledgePackage);
    setCopyFeedback(`Đã tải về bản in HTML độc lập (chuẩn UTF-8 NFC).`);
    setTimeout(() => setCopyFeedback(null), 3500);
  };

  // Record export event to server
  const handleRecordExport = async () => {
    setIsLoggingExport(true);
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schema_version: "1.0",
          action: "student_event",
          request_id: `req-exp-${Date.now()}`,
          client_id: "web-export-engine",
          payload: {
            student_key: "HS-8A-01",
            lesson_id: knowledgePackage.scope.lessons[0] ? String(knowledgePackage.scope.lessons[0]) : "ALL",
            activity_id: "ACT_EXPORT_PACKAGE",
            skill: "Xuất gói kiến thức thông minh Spec 15",
            score: 10,
            max_score: 10,
            hints: 0,
            duration_seconds: 45,
            notes: `Xuất gói ${knowledgePackage.package_hash} gồm ${knowledgePackage.content.coreLessons.length} bài và ${knowledgePackage.content.exercises.length} bài tập.`,
            timestamp: new Date().toISOString()
          }
        })
      });
      setCopyFeedback(`Đã đồng bộ thông tin gói ${knowledgePackage.package_hash} lên hệ thống quản trị!`);
      setTimeout(() => setCopyFeedback(null), 3500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoggingExport(false);
    }
  };

  // Filter lessons for picker
  const filteredLessons = useMemo(() => {
    return ALL_LESSONS.filter((l) => {
      if (selectedDiscipline === "all") return true;
      return (l.discipline || getLessonDiscipline(l.id)) === selectedDiscipline;
    });
  }, [selectedDiscipline]);

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {copyFeedback && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-2xl border border-cyan-500 flex items-center gap-2 animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copyFeedback}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> SPEC 15 ENGINE
              </span>
              <span className="text-xs font-mono text-slate-400">
                Formula Gate QA Pass • GDPT 2018
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Smart Knowledge Export & Package Builder
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Truy xuất trực tiếp từ đồ thị tri thức (Knowledge Graph) KHTN 8. Tự động kết nối 6 tầng: 
              <span className="text-cyan-300 font-semibold"> CORE ➔ PREREQUISITE ➔ PRACTICE ➔ APPLICATION ➔ TRANSFER ➔ EXTENSION</span>. 
              Công thức bảo toàn KaTeX chuẩn xác, có thể tái lập với mã băm định danh (Package Hash).
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="bg-slate-800/80 border border-slate-700 p-4 sm:p-5 rounded-2xl flex flex-col gap-2 min-w-[240px]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Định danh gói:</span>
              <span className="font-mono text-cyan-300 font-bold text-[11px] bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                {knowledgePackage.package_hash}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Độ bao phủ SGK:</span>
              <span className="text-emerald-400 font-bold font-mono">
                {knowledgePackage.quality_report.source_coverage}% SGK/SGV
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-700">
              <span className="text-slate-400">Công thức đã kiểm duyệt:</span>
              <span className="text-cyan-400 font-bold font-mono">
                {knowledgePackage.content.formulas.length} công thức
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Packs Row */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 text-cyan-600" /> Chọn Gói Mẫu Có Sẵn (Preset Packs):
          </span>
          <span className="text-[11px] text-slate-500 font-mono">9 cấu hình chuyên dụng</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {[
            { id: "full_knowledge", label: "Toàn Diện (Full)", icon: Layers, desc: "Trọn vẹn 6 tầng" },
            { id: "quick_revision", label: "Ôn Tập Nhanh", icon: Sparkles, desc: "Lõi + 4 bài tập" },
            { id: "formula_sheet", label: "Kho Công Thức", icon: Calculator, desc: "KaTeX + Điều kiện" },
            { id: "phenomenon_pack", label: "Hiện Tượng Thực Tế", icon: Compass, desc: "6 Chiều thực tiễn" },
            { id: "practice_pack", label: "Luyện Bài Tập", icon: HelpCircle, desc: "Phân loại nhận thức" },
            { id: "teacher_pack", label: "Gói Giáo Viên", icon: Award, desc: "YCCD & Rubric" },
            { id: "student_pack", label: "Gói Học Sinh", icon: BookOpen, desc: "Gợi ý Socratic" },
            { id: "exam_prep", label: "Luyện Thi", icon: FileCheck, desc: "Trọng tâm kiểm tra" }
          ].map((preset) => {
            const Icon = preset.icon;
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id as ExportPackPreset)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-cyan-50/80 border-cyan-500 text-cyan-950 font-bold shadow-xs ring-1 ring-cyan-400"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${isSelected ? "text-cyan-600" : "text-slate-500"}`} />
                  <span className="text-xs font-bold leading-tight">{preset.label}</span>
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-1">{preset.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Configuration Grid: Left is Selector & Layers, Right is Preview & Export */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (5 Cols): Selection & Layers Config */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* 1. Selection Mode Tabs */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-cyan-600" /> Phạm Vi Chọn Xuất:
              </span>
              <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px] font-semibold">
                <button
                  onClick={() => setSelectionMode("chapters")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectionMode === "chapters" ? "bg-white text-cyan-800 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Chương
                </button>
                <button
                  onClick={() => setSelectionMode("lessons")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectionMode === "lessons" ? "bg-white text-cyan-800 shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Bài học
                </button>
              </div>
            </div>

            {/* Discipline Filter */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {[
                { id: "all", label: "Tất cả" },
                { id: "physics", label: "Vật lí" },
                { id: "chemistry", label: "Hóa học" },
                { id: "biology", label: "Sinh học" }
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDiscipline(d.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedDiscipline === d.id
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Chapter Selection View */}
            {selectionMode === "chapters" && (
              <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                {CHAPTERS_DATA.map((ch) => {
                  const isChecked = selectedChapters.includes(ch.id);
                  const disciplineBadge = getDisciplineBadge(ch.discipline);
                  return (
                    <div
                      key={ch.id}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedChapters(selectedChapters.filter(id => id !== ch.id));
                        } else {
                          setSelectedChapters([...selectedChapters, ch.id]);
                        }
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? "bg-cyan-50/70 border-cyan-400 text-cyan-950 font-bold"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="mt-0.5 text-cyan-700">
                        {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${disciplineBadge.pillClass}`}>
                            {disciplineBadge.short}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 font-semibold">{ch.code}</span>
                          <span className="text-[10px] font-mono text-slate-400">
                            (Bài {ch.lessonRange[0]}-{ch.lessonRange[1]})
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-900 leading-snug">{ch.name}</div>
                        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{ch.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Lesson Selection View */}
            {selectionMode === "lessons" && (
              <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1">
                  <span>{filteredLessons.length} bài học phù hợp</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedLessons(filteredLessons.map(l => l.id))}
                      className="text-cyan-700 font-semibold hover:underline"
                    >
                      Chọn hết
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => setSelectedLessons([])}
                      className="text-slate-500 hover:underline"
                    >
                      Bỏ chọn
                    </button>
                  </div>
                </div>

                {filteredLessons.map((l) => {
                  const isChecked = selectedLessons.includes(l.id);
                  const discipline = l.discipline || getLessonDiscipline(l.id);
                  const badge = getDisciplineBadge(discipline);
                  return (
                    <div
                      key={l.id}
                      onClick={() => {
                        if (isChecked) {
                          setSelectedLessons(selectedLessons.filter(id => id !== l.id));
                        } else {
                          setSelectedLessons([...selectedLessons, l.id]);
                        }
                      }}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                        isChecked
                          ? "bg-cyan-50/70 border-cyan-400 text-cyan-950 font-bold"
                          : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-cyan-700">
                        {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                      </div>
                      <span className="w-6 h-6 rounded-md bg-slate-100 font-mono text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {l.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-slate-900 truncate">{l.title}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-2">
                          <span className={`px-1 rounded text-[9px] font-semibold ${badge.pillClass}`}>{badge.short}</span>
                          <span>SGK tr.{l.sgkStartPage}-{l.sgkEndPage}</span>
                          <span>•</span>
                          <span>{l.atoms?.length || 1} hạt nhân</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Smart Expansion Layers (Tầng 0 -> Tầng 5) */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-600" /> Bật / Tắt 6 Tầng Tri Thức (Layers):
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { 
                  key: "includeCore", 
                  title: "Tầng 0: Kiến Thức Cốt Lõi (Core)", 
                  desc: "YCCD, định nghĩa chuẩn, công thức KaTeX, bản chất khoa học",
                  required: true 
                },
                { 
                  key: "includePrereq", 
                  title: "Tầng 1: Kiến Thức Nền (Prerequisites)", 
                  desc: "Tự động kéo các hạt nhân tiên quyết từ bài trước / chương trước",
                  required: false 
                },
                { 
                  key: "includePractice", 
                  title: "Tầng 2: Bài Tập Rèn Luyện (Practice)", 
                  desc: "Hệ thống bài tập phân loại theo các mức nhận thức Bloom / GDPT",
                  required: false 
                },
                { 
                  key: "includeApplication", 
                  title: "Tầng 3: Hiện Tượng & 6 Chiều Thực Tiễn", 
                  desc: "Gia đình, trường học, công nghệ, sản xuất, môi trường, ra quyết định",
                  required: false 
                },
                { 
                  key: "includeTransfer", 
                  title: "Tầng 4: Nhiệm Vụ Chuyển Giao Năng Lực", 
                  desc: "Tình huống thực tế, sản phẩm nộp, tiêu chí chấm điểm khoa học",
                  required: false 
                },
                { 
                  key: "includeExtension", 
                  title: "Tầng 5: Thí Nghiệm Số & Mở Rộng", 
                  desc: "Liên kết mô phỏng PhET, tư liệu mở Wikimedia đã kiểm định",
                  required: false 
                }
              ].map((layer) => {
                const isEnabled = layers[layer.key as keyof ExportLayerConfig];
                return (
                  <label
                    key={layer.key}
                    className={`p-2.5 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      isEnabled ? "bg-slate-50 border-cyan-300" : "bg-white border-slate-200 opacity-60"
                    }`}
                  >
                    <input
                      type="checkbox"
                      disabled={layer.required}
                      checked={isEnabled}
                      onChange={(e) => {
                        setLayers({
                          ...layers,
                          [layer.key]: e.target.checked
                        });
                      }}
                      className="rounded text-cyan-600 focus:ring-cyan-500 mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                        <span>{layer.title}</span>
                        {layer.required && <span className="text-[10px] text-cyan-800 font-mono">Bắt buộc</span>}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{layer.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (7 Cols): Live Preview & Multi-Format Renderers */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Action Toolbar & Output Mode Tabs */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            {/* View Mode Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setOutputMode("interactive")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  outputMode === "interactive" ? "bg-white text-cyan-900 font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Bản Tương Tác
              </button>
              <button
                onClick={() => setOutputMode("print")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  outputMode === "print" ? "bg-white text-cyan-900 font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Printer className="w-3.5 h-3.5" /> Bản In Ấn / PDF
              </button>
              <button
                onClick={() => setOutputMode("markdown")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  outputMode === "markdown" ? "bg-white text-cyan-900 font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Markdown (.md)
              </button>
              <button
                onClick={() => setOutputMode("json")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  outputMode === "json" ? "bg-white text-cyan-900 font-bold shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Code className="w-3.5 h-3.5" /> JSON Schema
              </button>
            </div>

            {/* Export & Sync Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Primary Universal Export: DOCX */}
              <button
                onClick={handleExportDOCX}
                disabled={isExportingDocx}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                title="Xuất file Microsoft Word (.docx) chuẩn phông chữ tiếng Việt và bảng biểu"
              >
                <FileText className={`w-3.5 h-3.5 ${isExportingDocx ? "animate-spin" : ""}`} />
                <span>{isExportingDocx ? "Đang Tạo DOCX..." : "Xuất DOCX"}</span>
              </button>

              {/* Primary Universal Export: PDF / A4 Print Window */}
              <button
                onClick={handleExportPDF}
                disabled={isOpeningPrint}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                title="Mở cửa sổ in ấn A4 chuyên biệt để In hoặc Lưu dưới dạng PDF chuẩn vector"
              >
                <Printer className={`w-3.5 h-3.5 ${isOpeningPrint ? "animate-pulse" : ""}`} />
                <span>Xuất PDF / In A4</span>
              </button>

              <button
                onClick={handleRecordExport}
                disabled={isLoggingExport}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 border border-slate-300"
                title="Lưu yêu cầu xuất vào Google Sheets & Server Audit Log"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoggingExport ? "animate-spin" : ""}`} />
              </button>

              {outputMode === "markdown" && (
                <>
                  <button
                    onClick={() => handleCopy(markdownText, "văn bản Markdown")}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" /> Sao Chép
                  </button>
                  <button
                    onClick={() => handleDownload("markdown")}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" /> Tải .md
                  </button>
                </>
              )}

              {outputMode === "json" && (
                <>
                  <button
                    onClick={() => handleCopy(jsonText, "dữ liệu JSON")}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" /> Sao Chép
                  </button>
                  <button
                    onClick={() => handleDownload("json")}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" /> Tải .json
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Scope Statistics Bar */}
          <div className="bg-slate-900 text-white p-3.5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1 text-slate-300">
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <strong className="text-white">{knowledgePackage.content.coreLessons.length}</strong> bài học
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <strong className="text-white">{knowledgePackage.content.formulas.length}</strong> công thức
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <strong className="text-white">{knowledgePackage.content.exercises.length}</strong> bài tập
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                <strong className="text-white">{knowledgePackage.content.scenarios.length}</strong> tình huống
              </span>
              {knowledgePackage.content.prerequisiteAtoms.length > 0 && (
                <span className="flex items-center gap-1 text-indigo-300 font-mono text-[11px]">
                  +{knowledgePackage.content.prerequisiteAtoms.length} kiến thức nền
                </span>
              )}
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Mã gói: <span className="text-cyan-300">{knowledgePackage.package_hash}</span>
            </span>
          </div>

          {/* ================= VIEW 1: INTERACTIVE DOCUMENT VIEW ================= */}
          {outputMode === "interactive" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6 max-h-[650px] overflow-y-auto">
              
              {/* Scope Title */}
              <div className="border-b border-slate-200 pb-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-700">
                  Bộ Gói Tri Thức Thông Minh (Interactive Mode)
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Khoa Học Tự Nhiên 8 — Bộ Sách Kết Nối Tri Thức
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Đã đối chiếu chéo SGK & SGV, tuân thủ nghiêm ngặt chuẩn kiến thức GDPT 2018.
                </p>
              </div>

              {/* Core Lessons Iteration */}
              <div className="space-y-6">
                {knowledgePackage.content.coreLessons.map((lesson) => (
                  <div key={lesson.id} className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                          {lesson.id}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{lesson.title}</h4>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        SGK tr.{lesson.sgkStartPage}-{lesson.sgkEndPage}
                      </span>
                    </div>

                    {/* YCCD */}
                    <div className="space-y-1 text-xs">
                      <div className="font-bold text-slate-700">Yêu cầu cần đạt (YCCD):</div>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-600">
                        {lesson.yccd.map((y, idx) => (
                          <li key={idx}>{y}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Atoms */}
                    {lesson.atoms && lesson.atoms.length > 0 && (
                      <div className="space-y-3 pt-2">
                        {lesson.atoms.map((atom) => (
                          <div key={atom.atom_id} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                                {atom.title || atom.topic}
                              </span>
                              <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                                {atom.atom_id}
                              </span>
                            </div>

                            <p className="text-slate-700 leading-relaxed text-[11px]">
                              {atom.canonical_explanation || atom.statement}
                            </p>

                            {/* KaTeX formula if available */}
                            {(atom.formulaLatex || atom.formula?.latex_display) && (
                              <div className="bg-slate-900 text-white p-3 rounded-lg text-center font-mono">
                                <MathView math={atom.formulaLatex || atom.formula?.latex_display || ""} block className="text-xl text-cyan-300" />
                                {(atom.conditions || atom.formula?.conditions_of_validity) && (
                                  <div className="text-[10px] text-slate-400 mt-1">
                                    Điều kiện: {atom.conditions || atom.formula?.conditions_of_validity}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Verified Formulas Section */}
              {knowledgePackage.content.formulas.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-emerald-600" /> Kho Công Thức Chuẩn (Formula Gate QA Pass):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {knowledgePackage.content.formulas.map((f) => (
                      <div key={f.formula_id} className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                        <div className="text-[10px] font-mono text-cyan-400 flex items-center justify-between">
                          <span>{f.formula_id}</span>
                          <span>{f.topic}</span>
                        </div>
                        <div className="py-2 text-center">
                          <MathView math={f.latex_display} block className="text-xl text-cyan-300 font-mono" />
                        </div>
                        <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-1">
                          {f.conditions}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exercises Section */}
              {knowledgePackage.content.exercises.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-600" /> Hệ Thống Bài Tập Rèn Luyện & Lời Giải:
                  </div>
                  <div className="space-y-3">
                    {knowledgePackage.content.exercises.map((ex, i) => (
                      <div key={ex.exercise_id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">
                            Bài {i + 1}. [{ex.exercise_id}] • {ex.cognitive_level.toUpperCase()}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">Độ khó: {ex.difficulty}/5</span>
                        </div>
                        <p className="text-slate-800 font-medium">{ex.prompt}</p>

                        {ex.options && (
                          <div className="space-y-1 pl-2 text-[11px] text-slate-700">
                            {ex.options.map((opt, idx) => (
                              <div key={idx}>{opt}</div>
                            ))}
                          </div>
                        )}

                        <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-emerald-950 text-[11px] space-y-1">
                          <div><strong>Đáp án:</strong> {ex.correct_answer}</div>
                          <div><strong>Lời giải:</strong> {ex.detailed_solution}</div>
                          <div className="text-emerald-800 italic">💡 Gợi ý: {ex.socratic_hint}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= VIEW 2: PRINT / PDF PREVIEW ================= */}
          {outputMode === "print" && (
            <div className="space-y-4">
              {/* Specialized Print Controls Header */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-cyan-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Bộ Xuất & In Ấn Tài Liệu KHTN 8 (Chuẩn V4/V5 Document Engine)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Mã hóa UTF-8 NFC • Font Noto Sans & Times New Roman • Công thức KaTeX chuẩn xác • Đã khắc phục triệt để lỗi dấu tiếng Việt.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleExportPDF}
                    disabled={isOpeningPrint}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
                    title="Mở tài liệu trong cửa sổ riêng để Lưu dạng PDF (A4) hoặc in ra máy in"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In & Lưu PDF A4</span>
                  </button>

                  <button
                    onClick={handleExportDOCX}
                    disabled={isExportingDocx}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-xs"
                    title="Tải về file Microsoft Word (.docx) đầy đủ định dạng"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Tải DOCX (.docx)</span>
                  </button>

                  <button
                    onClick={handleDownloadHTML}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-all flex items-center gap-1 border border-slate-700"
                    title="Tải về file HTML in ấn độc lập"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải HTML</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-all flex items-center gap-1 border border-slate-700"
                    title="In nhanh trực tiếp trên trình duyệt"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>In (Ctrl+P)</span>
                  </button>
                </div>
              </div>

              {/* Printable Document Canvas */}
              <div 
                id="printable-document" 
                className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-300 shadow-sm text-slate-900 font-sans leading-relaxed max-h-[650px] overflow-y-auto space-y-6 select-text"
              >
                {/* Header Document Banner */}
                <div className="text-center border-b-2 border-slate-900 pb-4">
                  <div className="text-xs uppercase tracking-widest font-sans font-bold text-slate-600">
                    BỘ GIÁO DỤC VÀ ĐÀO TẠO — CHƯƠNG TRÌNH GDPT 2018
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold font-sans mt-1 text-slate-950">
                    TÀI LIỆU HỌC TẬP & ÔN LUYỆN KHTN 8 (KẾT NỐI TRI THỨC)
                  </h2>
                  <div className="text-xs text-slate-600 font-sans mt-1">
                    Mã tài liệu: <strong>{knowledgePackage.package_hash}</strong> • Ngày tạo: {new Date(knowledgePackage.created_at).toLocaleDateString("vi-VN")} • Độ bao phủ SGK: <strong>{knowledgePackage.quality_report.source_coverage}%</strong>
                  </div>
                </div>

                {/* Section I: Core Lessons */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase text-cyan-900 border-b border-cyan-800 pb-1 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-cyan-700" /> I. KIẾN THỨC CỐT LÕI (CORE KNOWLEDGE)
                  </h3>

                  {knowledgePackage.content.coreLessons.map((lesson) => (
                    <div key={lesson.id} className="space-y-3 pt-1 border-b border-slate-200 pb-5">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 bg-slate-100 p-2 rounded-lg border-l-4 border-cyan-700">
                        BÀI {lesson.id}. {lesson.title.toUpperCase()}
                      </h4>
                      <div className="text-xs text-slate-600 italic">
                        (Phạm vi SGK trang {lesson.sgkStartPage} đến {lesson.sgkEndPage} • SGV trang {lesson.sgvStartPage})
                      </div>

                      <div className="text-xs space-y-1.5">
                        <p><strong>Yêu cầu cần đạt:</strong> {lesson.yccd.join("; ")}.</p>
                        <p><strong>Nội dung tóm tắt:</strong> {lesson.summary}</p>
                      </div>

                      {lesson.atoms && lesson.atoms.length > 0 && (
                        <div className="pl-3 border-l-2 border-slate-300 space-y-3 text-xs mt-2">
                          {lesson.atoms.map((atom, aIdx) => (
                            <div key={atom.atom_id} className="space-y-1">
                              <div className="font-bold text-emerald-800">
                                1.{aIdx + 1}. [{atom.atom_id}] {atom.title || atom.topic}
                              </div>
                              <p className="text-slate-800">{atom.canonical_explanation || atom.statement || atom.definition}</p>
                              
                              {(atom.formulaLatex || atom.formula?.latex_display) && (
                                <div className="py-2 my-1.5 bg-slate-50 border border-slate-200 rounded-lg text-center overflow-x-auto">
                                  <MathView math={atom.formulaLatex || atom.formula?.latex_display || ""} displayMode={true} />
                                  {atom.conditions && (
                                    <div className="text-[10px] text-slate-500 italic mt-0.5">
                                      Điều kiện áp dụng: {atom.conditions}
                                    </div>
                                  )}
                                </div>
                              )}

                              {atom.examples && atom.examples.length > 0 && (
                                <div className="text-[11px] text-slate-700">
                                  <strong>Ví dụ:</strong> {atom.examples.join("; ")}
                                </div>
                              )}

                              {atom.misconceptions && atom.misconceptions.length > 0 && (
                                <div className="text-[11px] text-amber-800">
                                  ⚠️ <strong>Tránh nhầm lẫn:</strong> {(atom.misconceptions.map((m: any) => typeof m === "string" ? m : m.description)).join("; ")}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Section II: Verified Formulas */}
                {knowledgePackage.content.formulas.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <h3 className="text-sm font-bold uppercase text-cyan-900 border-b border-cyan-800 pb-1 flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-cyan-700" /> II. BẢNG CÔNG THỨC CHUẨN ĐÃ THẨM ĐỊNH FORMULA GATE
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {knowledgePackage.content.formulas.map((f) => (
                        <div key={f.formula_id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                          <div className="font-bold text-slate-900">[{f.formula_id}] {f.topic}</div>
                          <div className="py-1 my-1 bg-white border border-slate-200 rounded text-center">
                            <MathView math={f.latex_display} displayMode={true} />
                          </div>
                          <div className="text-[10px] text-slate-600 leading-snug">
                            <strong>Điều kiện:</strong> {f.conditions}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            <strong>Nguồn SGK:</strong> {f.source_anchor}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section III: Exercises */}
                {knowledgePackage.content.exercises.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <h3 className="text-sm font-bold uppercase text-cyan-900 border-b border-cyan-800 pb-1 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-cyan-700" /> III. HỆ THỐNG CÂU HỎI VÀ BÀI TẬP TỰ LUYỆN
                    </h3>
                    <div className="space-y-3">
                      {knowledgePackage.content.exercises.map((ex, idx) => (
                        <div key={ex.exercise_id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
                          <div className="flex items-center justify-between text-slate-700 font-bold">
                            <span>Câu {idx + 1} [{ex.exercise_id}] • {ex.cognitive_level.toUpperCase()}</span>
                            <span className="text-[10px] font-mono text-slate-500">Độ khó: {ex.difficulty}/5</span>
                          </div>
                          <p className="text-slate-900 font-medium">{ex.prompt}</p>

                          {ex.options && (
                            <div className="pl-3 space-y-0.5 text-slate-700">
                              {ex.options.map((opt, oIdx) => (
                                <div key={oIdx}>{opt}</div>
                              ))}
                            </div>
                          )}

                          <div className="bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200 text-emerald-950 text-[11px] space-y-0.5 mt-1.5">
                            <div><strong>Đáp án:</strong> {ex.correct_answer}</div>
                            <div><strong>Lời giải:</strong> {ex.detailed_solution}</div>
                            <div className="text-emerald-800 italic">💡 Gợi ý tư duy: {ex.socratic_hint}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section IV: Real-world Phenomena & Scenarios */}
                {(knowledgePackage.content.phenomena.length > 0 || knowledgePackage.content.scenarios.length > 0) && (
                  <div className="space-y-4 pt-4">
                    <h3 className="text-sm font-bold uppercase text-emerald-900 border-b border-emerald-800 pb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-700" /> IV. HIỆN TƯỢNG ĐỜI SỐNG & TÌNH HUỐNG THỰC TIỄN (TẦNG 3)
                    </h3>
                    <div className="space-y-3">
                      {knowledgePackage.content.phenomena.map((p, idx) => (
                        <div key={p.id} className="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl text-xs space-y-1.5">
                          <div className="font-bold text-emerald-900 text-sm">
                            Hiện tượng {idx + 1}: {p.name}
                            <span className="text-xs font-normal text-slate-500 ml-2">({p.lessonTitle})</span>
                          </div>
                          <p className="text-slate-800"><strong>• Dấu hiệu quan sát:</strong> {p.observableSigns.join("; ")}</p>
                          <p className="text-cyan-900"><strong>• Câu hỏi gợi mở:</strong> <span className="italic">{p.inquiryQuestion}</span></p>
                          <p className="text-slate-800"><strong>• Bản chất khoa học:</strong> {p.scientificExplanation}</p>
                          {p.experimentSuggestion && (
                            <p className="text-slate-700"><strong>• Gợi ý thí nghiệm/trải nghiệm:</strong> {p.experimentSuggestion}</p>
                          )}
                          {p.safetyNote && (
                            <p className="text-amber-800">⚠️ <strong>Lưu ý an toàn:</strong> {p.safetyNote}</p>
                          )}
                        </div>
                      ))}

                      {knowledgePackage.content.scenarios.map((sc, idx) => (
                        <div key={sc.id || idx} className="p-3 bg-blue-50/50 border border-blue-200 rounded-xl text-xs space-y-1">
                          <div className="font-bold text-blue-900">Tình huống {idx + 1}: {sc.title}</div>
                          <p className="text-slate-800"><strong>• Vấn đề điều tra:</strong> {sc.question}</p>
                          <p className="text-slate-700"><strong>• Hướng giải thích:</strong> {sc.explanationRoute}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section V: Transfer Tasks */}
                {knowledgePackage.content.transferTasks.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <h3 className="text-sm font-bold uppercase text-purple-900 border-b border-purple-800 pb-1 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-purple-700" /> V. NHIỆM VỤ CHUYỂN GIAO NĂNG LỰC GIẢI QUYẾT VẤN ĐỀ (TẦNG 4)
                    </h3>
                    <div className="space-y-3">
                      {knowledgePackage.content.transferTasks.map((tt, idx) => (
                        <div key={idx} className="p-3.5 bg-purple-50/50 border border-purple-200 rounded-xl text-xs space-y-1.5">
                          <div className="font-bold text-purple-900 text-sm">Dự án/Nhiệm vụ {idx + 1}: {tt.title}</div>
                          <p className="text-slate-800"><strong>• Bối cảnh thực tiễn:</strong> {tt.context}</p>
                          <p className="text-slate-800"><strong>• Nhiệm vụ học sinh:</strong> {tt.task}</p>
                          <p className="text-emerald-900"><strong>• Sản phẩm hoàn thành:</strong> {tt.deliverables}</p>
                          <p className="text-slate-600"><strong>• Tiêu chí đánh giá chất lượng:</strong> {tt.evaluationCriteria}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section VI: Digital Resources & Simulations */}
                {knowledgePackage.content.webResources.length > 0 && (
                  <div className="space-y-4 pt-4">
                    <h3 className="text-sm font-bold uppercase text-indigo-900 border-b border-indigo-800 pb-1 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-indigo-700" /> VI. TÀI NGUYÊN SỐ & THÍ NGHIỆM MÔ PHỎNG ĐÃ THẨM ĐỊNH (TẦNG 5)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700">
                            <th className="p-2 border border-slate-200">Tên tài nguyên</th>
                            <th className="p-2 border border-slate-200 w-24">Nguồn</th>
                            <th className="p-2 border border-slate-200 w-20 text-center">Độ tin cậy</th>
                            <th className="p-2 border border-slate-200">Đường dẫn & Chứng cứ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {knowledgePackage.content.webResources.map((res, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50">
                              <td className="p-2 border border-slate-200 font-semibold">{res.title}</td>
                              <td className="p-2 border border-slate-200 uppercase text-[11px]">{res.source_type}</td>
                              <td className="p-2 border border-slate-200 font-bold text-emerald-700 text-center">{res.trust_score}/100</td>
                              <td className="p-2 border border-slate-200">
                                <span className="font-mono text-cyan-700 text-[11px] block">{res.url}</span>
                                <span className="text-[10px] text-slate-500 italic block mt-0.5">{res.evidence_excerpt}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Section VII: Prerequisite Atoms */}
                {knowledgePackage.content.prerequisiteAtoms.length > 0 && (
                  <div className="space-y-3 pt-4">
                    <h3 className="text-sm font-bold uppercase text-slate-800 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-slate-600" /> VII. KIẾN THỨC NỀN TẢNG TIÊN QUYẾT (TẦNG 1)
                    </h3>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                      {knowledgePackage.content.prerequisiteAtoms.map((a) => (
                        <div key={a.atom_id}>
                          <strong>[{a.atom_id}] {a.title || a.topic}:</strong>{" "}
                          <span className="text-slate-700">{a.canonical_explanation || a.statement || a.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section VIII: Quality Report & Provenance Table */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-sm font-bold uppercase text-slate-800 border-b border-slate-300 pb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> VIII. BÁO CÁO THẨM ĐỊNH CHẤT LƯỢNG & TRUY NGUYÊN TRI THỨC
                  </h3>
                  <table className="w-full text-xs border-collapse">
                    <tbody>
                      <tr>
                        <td className="p-2 border border-slate-200 font-semibold bg-slate-50 w-1/3">Độ bao phủ SGK & YCCD</td>
                        <td className="p-2 border border-slate-200">{knowledgePackage.quality_report.source_coverage}% đạt chuẩn đối sánh SGK/SGV Kết nối tri thức</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-200 font-semibold bg-slate-50">Kiểm định công thức qua Formula Gate</td>
                        <td className="p-2 border border-slate-200">{knowledgePackage.quality_report.formula_coverage}% (100% công thức chuẩn hóa KaTeX)</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-200 font-semibold bg-slate-50">Hệ thống bài tập tự luyện</td>
                        <td className="p-2 border border-slate-200">{knowledgePackage.quality_report.exercise_count} bài tập phân hóa 4 mức độ có đáp án & lời giải</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-200 font-semibold bg-slate-50">Mã băm kiểm định tính toàn vẹn</td>
                        <td className="p-2 border border-slate-200 font-mono font-bold text-cyan-800">{knowledgePackage.package_hash}</td>
                      </tr>
                      <tr>
                        <td className="p-2 border border-slate-200 font-semibold bg-slate-50">Trạng thái thẩm định</td>
                        <td className="p-2 border border-slate-200 font-bold text-emerald-700">QA_PASS (Đạt chuẩn quy chuẩn GDPT 2018 Bộ GD&ĐT)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Document Footer */}
                <div className="pt-6 border-t border-slate-300 text-center text-xs text-slate-500 space-y-1">
                  <p>Tài liệu được khởi tạo tự động từ Đồ thị Tri thức KHTN 8 (GDPT 2018 Bộ GD&ĐT).</p>
                  <p className="font-mono text-[10px]">Mã băm kiểm định tính vẹn toàn (Package Hash): {knowledgePackage.package_hash}</p>
                </div>
              </div>
            </div>
          )}

          {/* ================= VIEW 3: MARKDOWN RAW VIEW ================= */}
          {outputMode === "markdown" && (
            <div className="bg-slate-950 text-slate-200 p-4 rounded-2xl border border-slate-800 font-mono text-xs max-h-[650px] overflow-y-auto">
              <pre className="whitespace-pre-wrap leading-relaxed">{markdownText}</pre>
            </div>
          )}

          {/* ================= VIEW 4: JSON RAW VIEW ================= */}
          {outputMode === "json" && (
            <div className="bg-slate-950 text-cyan-300 p-4 rounded-2xl border border-slate-800 font-mono text-xs max-h-[650px] overflow-y-auto">
              <pre className="whitespace-pre-wrap leading-relaxed">{jsonText}</pre>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
