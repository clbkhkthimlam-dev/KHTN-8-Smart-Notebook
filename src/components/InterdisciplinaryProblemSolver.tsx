import React, { useState } from "react";
import {
  InterdisciplinaryProblem,
  SubProblem,
  MinimalSufficientKnowledgePathItem,
  VisionEvidenceStatus
} from "../types";
import {
  INTERDISCIPLINARY_PROBLEMS_DATABASE,
  calculateMinimalSufficientKnowledgePath
} from "../data/problemGraphData";
import {
  Network,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Compass,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  Send,
  Bot,
  Zap,
  FlaskConical,
  Dna,
  Database,
  Eye,
  Sliders,
  Award,
  ChevronRight,
  CheckSquare,
  ShieldCheck,
  FileCheck,
  Target
} from "lucide-react";

interface InterdisciplinaryProblemSolverProps {
  onNavigateToLesson?: (lessonId: number) => void;
}

export const InterdisciplinaryProblemSolver: React.FC<InterdisciplinaryProblemSolverProps> = ({
  onNavigateToLesson
}) => {
  const [selectedProblemId, setSelectedProblemId] = useState<string>("PROB_01_FLOATING_BUOY");
  const [activeTierTab, setActiveTierTab] = useState<"ALL" | "A_IDENTIFY" | "B_EXPLAIN" | "C_DECIDE" | "D_VALIDATE">("ALL");
  const [activeViewMode, setActiveViewMode] = useState<"SOLVER" | "GRAPH">("SOLVER");

  // User interactive state inside the solver
  const [completedSubProblemIds, setCompletedSubProblemIds] = useState<string[]>([]);
  const [selectedSolutionId, setSelectedSolutionId] = useState<string | null>(null);
  const [transferResponse, setTransferResponse] = useState<string>("");
  const [isTransferSubmitted, setIsTransferSubmitted] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Socratic AI dialogue inside problem solver
  const [aiPromptQuery, setAiPromptQuery] = useState<string>("");
  const [aiDialogue, setAiDialogue] = useState<{ role: "ai" | "user"; text: string }[]>([
    {
      role: "ai",
      text: "Chào em! Thầy là Gia sư Socratic Liên môn KHTN 8. Thầy sẽ giúp em phân rã các nút thắt của vấn đề thực tế này mà không đưa ra đáp án trực tiếp. Em đang băn khoăn ở bước đo đạc, cơ chế liên môn hay phương án kỹ thuật nào?"
    }
  ]);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const currentProblem: InterdisciplinaryProblem =
    INTERDISCIPLINARY_PROBLEMS_DATABASE.find((p) => p.id === selectedProblemId) ||
    INTERDISCIPLINARY_PROBLEMS_DATABASE[0];

  const mskpPath: MinimalSufficientKnowledgePathItem[] = calculateMinimalSufficientKnowledgePath(
    currentProblem,
    completedSubProblemIds
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const toggleSubProblem = (spId: string) => {
    setCompletedSubProblemIds((prev) =>
      prev.includes(spId) ? prev.filter((id) => id !== spId) : [...prev, spId]
    );
  };

  const handleSelectSolution = (solId: string) => {
    setSelectedSolutionId(solId);
    showToast("Đã ghi nhận lựa chọn giải pháp kỹ thuật của em!");
  };

  const handleSubmitTransfer = () => {
    if (!transferResponse.trim()) {
      showToast("Em hãy nhập câu trả lời cho nhiệm vụ chuyển giao trước nhé!");
      return;
    }
    setIsTransferSubmitted(true);
    showToast("🎉 Đã nộp bài giải quyết vấn đề và lưu vào hồ sơ năng lực (Portfolio)!");

    // Send event
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        schema_version: "1.0",
        action: "student_event",
        request_id: `req-prob-transfer-${Date.now()}`,
        client_id: "web-problem-solver",
        payload: {
          student_key: "HS-8A-01",
          problem_id: currentProblem.id,
          activity_id: `PROBLEM_SOLVING_${currentProblem.code}`,
          skill: "Năng lực giải quyết vấn đề liên môn KHTN 8",
          score: 10,
          max_score: 10,
          response_text: transferResponse,
          selected_solution: selectedSolutionId,
          timestamp: new Date().toISOString()
        }
      })
    }).catch(console.error);
  };

  const handleAskAi = (presetQuestion?: string) => {
    const questionText = presetQuestion || aiPromptQuery;
    if (!questionText.trim()) return;

    setAiDialogue((prev) => [...prev, { role: "user", text: questionText }]);
    setAiPromptQuery("");
    setIsAiThinking(true);

    setTimeout(() => {
      let aiReply = "";
      if (questionText.toLowerCase().includes("muối") || questionText.toLowerCase().includes("chìm") || questionText.toLowerCase().includes("nước ngọt")) {
        aiReply = "💡 Em hãy quan sát công thức lực đẩy Archimedes F_A = d · V. Khi vật nổi cân bằng thì F_A luôn bằng Trọng lượng P. Nếu nước ngọt có khối lượng riêng D nhỏ hơn nước biển (d_ngọt < d_biển), để giữ tích số d · V_chìm không đổi thì thể tích phần chìm V_chìm bắt buộc phải thay đổi theo chiều hướng nào?";
      } else if (questionText.toLowerCase().includes("sụt áp") || questionText.toLowerCase().includes("khí gas") || questionText.toLowerCase().includes("ẩm")) {
        aiReply = "💡 Trong mạch điện mắc nối tiếp, tổng hiệu điện thế U toàn mạch bằng tổng các hiệu điện thế thành phần U = U_còi + U_dây + U_rơ-le. Nếu chốt tiếp xúc bị gỉ sét ẩm tạo ra một điện trở phụ rất lớn thì hiệu điện thế rơi trên chốt nối sẽ tăng lên hay giảm đi, và phần điện áp còn lại cho còi sẽ ra sao?";
      } else if (questionText.toLowerCase().includes("truyền nhiệt") || questionText.toLowerCase().includes("hô hấp") || questionText.toLowerCase().includes("thanh long")) {
        aiReply = "💡 Quả sau khi thu hoạch vẫn là cơ thể sống tiếp tục hô hấp tế bào: Chất hữu cơ + O2 → CO2 + H2O + Nhiệt lượng. Em nghĩ xem tại sao đống quả để trong phòng kín lại tự nóng lên? Và màu trắng sáng của vỏ container giúp ích gì trong việc ngăn cản bức xạ nhiệt mặt trời?";
      } else if (questionText.toLowerCase().includes("phú dưỡng") || questionText.toLowerCase().includes("tảo") || questionText.toLowerCase().includes("cá chết")) {
        aiReply = "💡 Hãy chú ý mốc thời gian: Cá chỉ chết ngạt vào khoảng 3h - 5h sáng chứ không chết vào buổi trưa nắng! Ban ngày tảo quang hợp thì sinh ra khí gì? Còn ban đêm khi không có ánh sáng, cả hàng tỷ tế bào tảo và vi khuẩn đáy hồ đều làm gì với lượng oxy hòa tan trong nước?";
      } else {
        aiReply = "💡 Câu hỏi rất sắc bén! Để giải quyết nút thắt này, em hãy đối chiếu giữa Bằng chứng thực tế quan sát được với Kiến thức SGK trong bảng 'Đường Dẫn Tri Thức Tối Thiểu (MSKP)' ở bên cạnh xem định luật nào áp dụng trực tiếp nhé!";
      }

      setAiDialogue((prev) => [...prev, { role: "ai", text: aiReply }]);
      setIsAiThinking(false);
    }, 700);
  };

  const getDisciplineBadge = (disc: string) => {
    switch (disc) {
      case "physics":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800"><Zap className="w-3 h-3 text-blue-600" /> Vật lí</span>;
      case "chemistry":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-purple-100 text-purple-800"><FlaskConical className="w-3 h-3 text-purple-600" /> Hóa học</span>;
      case "biology":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800"><Dna className="w-3 h-3 text-emerald-600" /> Sinh học</span>;
      case "data":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800"><Database className="w-3 h-3 text-amber-600" /> Dữ liệu & Đo đạc</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: VisionEvidenceStatus) => {
    switch (status) {
      case "observed":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">👁️ Quan sát thực tế</span>;
      case "measured":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">📏 Đo đạc định lượng</span>;
      case "inferred":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">🧠 Suy luận logic</span>;
      case "hypothesis":
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">🧪 Giả thuyết cần thử nghiệm</span>;
      default:
        return null;
    }
  };

  const filteredSubproblems = currentProblem.subproblems.filter((sp) => {
    if (activeTierTab === "ALL") return true;
    return sp.tier === activeTierTab;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-cyan-500/50 flex items-center gap-2 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Banner Spec 18 */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 rounded-3xl shadow-md border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-radial from-cyan-500/10 to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="bg-indigo-900/80 text-cyan-300 border border-indigo-700/60 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Network className="w-3.5 h-3.5 text-cyan-400" />
                SPEC 18 • INTERDISCIPLINARY PROBLEM SOLVING GRAPH
              </span>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-[11px] font-bold px-2 py-0.5 rounded-full">
                V5 Core Architecture
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Giải Quyết Vấn Đề Liên Môn & Đồ Thị Tri Thức Thực Tế
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
              Vấn đề thực tế là trung tâm; kiến thức SGK KHTN 8 (Vật lí, Hóa học, Sinh học) là các nút mạng được gọi đúng lúc để giải quyết từng nút thắt qua <strong>Đường Dẫn Tri Thức Tối Thiểu (MSKP)</strong>.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-2xl border border-slate-700">
            <button
              onClick={() => setActiveViewMode("SOLVER")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeViewMode === "SOLVER"
                  ? "bg-cyan-500 text-slate-950 shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Tiến Trình 4 Tầng
            </button>
            <button
              onClick={() => setActiveViewMode("GRAPH")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeViewMode === "GRAPH"
                  ? "bg-cyan-500 text-slate-950 shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Bản Đồ Mạng Lưới (Graph)
            </button>
          </div>
        </div>

        {/* 4 Problem Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {INTERDISCIPLINARY_PROBLEMS_DATABASE.map((prob) => {
            const isSelected = prob.id === selectedProblemId;
            return (
              <button
                key={prob.id}
                onClick={() => {
                  setSelectedProblemId(prob.id);
                  setSelectedSolutionId(null);
                  setIsTransferSubmitted(false);
                  setTransferResponse("");
                }}
                className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-indigo-900/90 border-cyan-400 shadow-md ring-2 ring-cyan-500/30"
                    : "bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded">
                      {prob.code}
                    </span>
                    <div className="flex gap-1">
                      {prob.disciplines.map((d) => (
                        <span key={d} className="text-[10px]">
                          {d === "physics" && "⚡ Lí"}
                          {d === "chemistry" && "🧪 Hóa"}
                          {d === "biology" && "🌱 Sinh"}
                          {d === "data" && "📊 Số"}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                    {prob.title}
                  </h4>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{prob.subproblems.length} Nút thắt</span>
                  <span className="text-cyan-400 font-semibold flex items-center gap-0.5">
                    Khám phá <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode 1: PROBLEM SOLVER STUDIO */}
      {activeViewMode === "SOLVER" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Problem Investigation Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Context & Central Question Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 flex-wrap justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-lg">
                    {currentProblem.code}
                  </span>
                  <div className="flex gap-1 flex-wrap">
                    {currentProblem.disciplines.map((d) => (
                      <span key={d}>{getDisciplineBadge(d)}</span>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  📍 {currentProblem.locality}
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {currentProblem.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {currentProblem.subtitle}
                </p>
              </div>

              {/* Real World Context & Visual Evidence */}
              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs space-y-3">
                <div className="flex flex-col sm:flex-row gap-4">
                  {currentProblem.imageEvidenceUrl && (
                    <div className="sm:w-1/3 shrink-0">
                      <img
                        src={currentProblem.imageEvidenceUrl}
                        alt="Hiện trường thực tế"
                        className="w-full h-32 object-cover rounded-xl border border-slate-300"
                        referrerPolicy="no-referrer"
                      />
                      <p className="text-[10px] text-slate-500 italic mt-1 leading-tight">
                        {currentProblem.imageEvidenceCaption}
                      </p>
                    </div>
                  )}
                  <div className="sm:w-2/3 space-y-2">
                    <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-cyan-600" /> Bối Cảnh Thực Tế & Triệu Chứng Ban Đầu:
                    </div>
                    <p className="text-slate-700 leading-relaxed text-[11.5px]">
                      {currentProblem.realWorldContext}
                    </p>
                    <div className="pt-2 border-t border-slate-200">
                      <div className="text-[11px] font-bold text-slate-800 mb-1">Các hiện tượng quan sát trực tiếp:</div>
                      <ul className="space-y-1 text-slate-600 text-[11px]">
                        {currentProblem.observedPhenomena.map((ph, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-cyan-600 font-bold">•</span>
                            <span>{ph}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Question Highlight */}
              <div className="p-4 bg-cyan-50/70 border-l-4 border-cyan-500 rounded-r-2xl">
                <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-900 flex items-center gap-1.5 mb-1">
                  <HelpCircle className="w-4 h-4 text-cyan-600" /> CÂU HỎI TRUNG TÂM CẦN GIẢI QUYẾT:
                </div>
                <div className="text-sm font-bold text-slate-900 leading-snug">
                  "{currentProblem.centralQuestion}"
                </div>
              </div>
            </div>

            {/* 4-Tier Investigation Section */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-5">
              <div className="flex items-center justify-between gap-2 flex-wrap border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-indigo-600" />
                    Tiến Trình Giải Quyết Nút Thắt (4 Tầng Spec 18)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Phân rã vấn đề theo mạch 5 bước: Hiện tượng gì? → Đo cái gì? → Tại sao? → Can thiệp thế nào? → Kiểm chứng ra sao?
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex gap-1">
                  {[
                    { id: "ALL", label: "Tất cả các tầng" },
                    { id: "A_IDENTIFY", label: "Tầng A (Nhận diện)" },
                    { id: "B_EXPLAIN", label: "Tầng B (Giải thích)" },
                    { id: "C_DECIDE", label: "Tầng C (Quyết định)" },
                    { id: "D_VALIDATE", label: "Tầng D (Kiểm chứng)" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTierTab(tab.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        activeTierTab === tab.id
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subproblems Accordions / Cards */}
              <div className="space-y-4">
                {filteredSubproblems.map((sp) => {
                  const isDone = completedSubProblemIds.includes(sp.id);
                  return (
                    <div
                      key={sp.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isDone
                          ? "bg-emerald-50/40 border-emerald-300 ring-1 ring-emerald-400/30"
                          : "bg-slate-50/80 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                              Nút thắt #{sp.order}
                            </span>
                            <span className="text-[11px] font-semibold text-slate-500">
                              {sp.tierTitle}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {sp.question}
                          </h4>
                        </div>

                        <button
                          onClick={() => toggleSubProblem(sp.id)}
                          className={`shrink-0 p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                            isDone
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isDone ? "Đã giải quyết" : "Đánh dấu xong"}</span>
                        </button>
                      </div>

                      {/* Investigation Steps & Expected Finding */}
                      <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2.5 text-xs">
                        <div>
                          <span className="font-bold text-slate-700">Các bước điều tra & bằng chứng cần thu thập:</span>
                          <ul className="mt-1 space-y-1 text-slate-600 pl-4 list-disc">
                            {sp.investigationSteps.map((step, sIdx) => (
                              <li key={sIdx}>{step}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-800">Kết luận khoa học cốt lõi: </span>
                            <span className="text-slate-700">{sp.expectedFinding}</span>
                          </div>
                        </div>

                        {/* Trigger Socratic Question */}
                        <div className="flex items-center justify-between pt-1 text-[11px]">
                          <span className="text-slate-500 italic">
                            Câu hỏi gợi mở: "{sp.guidingQuestions[0]}"
                          </span>
                          <button
                            onClick={() => handleAskAi(sp.guidingQuestions[0])}
                            className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                          >
                            <Bot className="w-3.5 h-3.5" /> Hỏi gợi ý AI
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tầng C: Hypotheses & Solution Options */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase">
                  <ShieldCheck className="w-4 h-4 text-cyan-600" /> Tầng C: Kiểm chứng Giả Thuyết & Lựa chọn Giải Pháp
                </h4>

                {/* Hypotheses Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentProblem.hypotheses.map((hyp) => (
                    <div
                      key={hyp.id}
                      className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                        hyp.isSupported
                          ? "bg-emerald-50/50 border-emerald-300 text-emerald-950"
                          : "bg-rose-50/50 border-rose-300 text-rose-950"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11px] uppercase">
                          {hyp.isSupported ? "✅ Giả thuyết ĐÚNG (Có bằng chứng)" : "❌ Giả thuyết SAI (Ngộ nhận)"}
                        </span>
                      </div>
                      <p className="font-semibold">{hyp.statement}</p>
                      <p className="text-[11px] opacity-90">{hyp.verificationEvidence}</p>
                    </div>
                  ))}
                </div>

                {/* Solution Options */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-700">Lựa chọn giải pháp can thiệp kỹ thuật:</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentProblem.solutionOptions.map((opt) => {
                      const isSelected = selectedSolutionId === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleSelectSolution(opt.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                            isSelected
                              ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-400/40"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs">{opt.title}</span>
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                              Điểm: {opt.score}/100
                            </span>
                          </div>
                          <p className="text-slate-600 text-xs">{opt.description}</p>
                          <div className="text-[11px] space-y-1 pt-1 border-t border-slate-100">
                            <div><strong>Cơ sở khoa học:</strong> {opt.scientificBasis}</div>
                            <div className="text-emerald-700"><strong>Ưu điểm:</strong> {opt.pros.join("; ")}</div>
                          </div>
                          <div className="pt-2 flex justify-end">
                            <span className={`text-[11px] font-bold ${isSelected ? "text-indigo-700" : "text-slate-400"}`}>
                              {isSelected ? "✓ Đã chọn phương án này" : "Chọn giải pháp này"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Tầng D: Validation Plan & Transfer Task */}
              <div className="pt-4 border-t border-slate-200 space-y-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase">
                  <Target className="w-4 h-4 text-purple-600" /> Tầng D: Kế Hoạch Thực Nghiệm & Nhiệm Vụ Chuyển Giao
                </h4>

                {/* Validation Plan Table */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="font-bold text-slate-800">
                    Kế hoạch thực nghiệm kiểm chứng: {currentProblem.validationPlan.experimentName}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11.5px]">
                    <div><strong>Biến độc lập (thay đổi):</strong> {currentProblem.validationPlan.independentVariable}</div>
                    <div><strong>Biến phụ thuộc (đo được):</strong> {currentProblem.validationPlan.dependentVariable}</div>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <strong>Biến kiểm soát (giữ không đổi):</strong> {currentProblem.validationPlan.controlVariables.join(", ")}
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200 text-[11px] text-emerald-800">
                    <strong>Chỉ số kỳ vọng đạt chuẩn:</strong> {currentProblem.validationPlan.expectedMetric}
                  </div>
                </div>

                {/* Transfer Task Card */}
                <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-900 text-sm flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-purple-700" /> Nhiệm vụ chuyển giao năng lực: {currentProblem.transferTask.title}
                    </span>
                    <span className="text-[10px] font-bold bg-purple-200 text-purple-900 px-2 py-0.5 rounded">
                      Đánh giá cá nhân hóa
                    </span>
                  </div>

                  <p className="text-xs text-slate-700">
                    <strong>Bối cảnh mở rộng:</strong> {currentProblem.transferTask.scenario}
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-purple-200 text-xs text-slate-800 leading-relaxed font-medium">
                    {currentProblem.transferTask.prompt}
                  </div>

                  {/* Student Response Area */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">
                      Sản phẩm nộp ({currentProblem.transferTask.deliverable}):
                    </label>
                    <textarea
                      value={transferResponse}
                      onChange={(e) => setTransferResponse(e.target.value)}
                      disabled={isTransferSubmitted}
                      placeholder="Em hãy vận dụng các nguyên lý KHTN 8 đã học để trình bày giải pháp, sơ đồ hoặc lập luận khoa học tại đây..."
                      className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
                    />
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] text-slate-500">
                        Tiêu chí chấm: {currentProblem.transferTask.rubricCriteria.length} tiêu chí chất lượng
                      </div>
                      <button
                        onClick={handleSubmitTransfer}
                        disabled={isTransferSubmitted}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isTransferSubmitted
                            ? "bg-emerald-600 text-white"
                            : "bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
                        }`}
                      >
                        {isTransferSubmitted ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Đã nộp vào Portfolio
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Nộp Bài Đánh Giá
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column: MSKP Router & AI Tutor (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Minimal Sufficient Knowledge Path (MSKP Router) Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-indigo-600" />
                    Đường Dẫn Tri Thức Tối Thiểu (MSKP)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Xếp hạng theo công thức Spec 18
                  </p>
                </div>
                <span className="font-mono text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
                  {mskpPath.length} Atoms
                </span>
              </div>

              {/* Formula explanation pill */}
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 space-y-1">
                <div><strong>Công thức xếp hạng định tuyến:</strong></div>
                <div className="font-mono text-indigo-700">
                  score = relevance × dependency × evidence × transfer × need
                </div>
              </div>

              {/* Atoms List */}
              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {mskpPath.map((atom) => (
                  <div
                    key={atom.atomId}
                    className="p-3 bg-slate-50 hover:bg-indigo-50/50 rounded-xl border border-slate-200 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-mono text-[10px] font-bold text-slate-500">
                        {atom.atomId}
                      </span>
                      <div className="flex items-center gap-1">
                        {getDisciplineBadge(atom.discipline)}
                        <span className="font-mono text-[10px] font-bold bg-indigo-600 text-white px-1.5 py-0.2 rounded">
                          {atom.compositeScore}đ
                        </span>
                      </div>
                    </div>

                    <div className="text-xs font-bold text-slate-900 leading-snug">
                      {atom.title}
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/60">
                      <span>{atom.lessonTitle}</span>
                      {onNavigateToLesson && (
                        <button
                          onClick={() => onNavigateToLesson(atom.lessonId)}
                          className="text-cyan-700 hover:text-cyan-900 font-bold flex items-center gap-0.5"
                        >
                          Xem bài <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Chain & Measurements Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-cyan-600" />
                Chuỗi Bằng Chứng & Dữ Liệu Đo Đạc
              </h4>

              {/* Measurements Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700">
                      <th className="p-1.5 border border-slate-200 text-left">Đại lượng</th>
                      <th className="p-1.5 border border-slate-200 text-center">Giá trị</th>
                      <th className="p-1.5 border border-slate-200 text-left">Thiết bị đo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProblem.measurements.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-1.5 border border-slate-200 font-medium">{m.parameter} ({m.symbol})</td>
                        <td className="p-1.5 border border-slate-200 font-mono font-bold text-cyan-800 text-center">{m.value} {m.unit}</td>
                        <td className="p-1.5 border border-slate-200 text-slate-600">{m.measurementTool}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Vision Grounding Status List */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="text-[11px] font-bold text-slate-700">Chứng cứ phân loại thị giác (Vision Grounding):</div>
                {currentProblem.evidenceChain.map((ev) => (
                  <div key={ev.id} className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-[11px] space-y-1">
                    <div className="flex items-center justify-between">
                      {getStatusBadge(ev.status)}
                    </div>
                    <p className="font-semibold text-slate-800">{ev.claim}</p>
                    <p className="text-[10px] text-slate-500 italic">Nguồn: {ev.observableSource}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Socratic AI Tutor Card */}
            <div className="bg-gradient-to-b from-indigo-950 to-slate-900 text-white rounded-3xl p-5 border border-indigo-800/60 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950 font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Gia Sư Socratic Liên Môn</h4>
                    <span className="text-[10px] text-cyan-300">Gợi mở từng nấc thang tư duy</span>
                  </div>
                </div>
                <span className="text-[10px] bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full font-mono">
                  Spec 18 AI
                </span>
              </div>

              {/* Dialogue Box */}
              <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-xs space-y-2.5 max-h-56 overflow-y-auto">
                {aiDialogue.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "ai" && (
                      <span className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                        AI
                      </span>
                    )}
                    <div
                      className={`p-2.5 rounded-xl text-[11.5px] max-w-[85%] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-cyan-600 text-white rounded-tr-none"
                          : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiThinking && (
                  <div className="text-[11px] text-cyan-400 italic animate-pulse">
                    Gia sư đang phân rã câu hỏi...
                  </div>
                )}
              </div>

              {/* Prompt Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiPromptQuery}
                  onChange={(e) => setAiPromptQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAskAi()}
                  placeholder="Hỏi gia sư Socratic về nút thắt này..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
                <button
                  onClick={() => handleAskAi()}
                  className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: INTERDISCIPLINARY GRAPH VISUALIZER */}
      {activeViewMode === "GRAPH" && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Network className="w-5 h-5 text-indigo-600" />
                Bản Đồ Mạng Lưới Kiến Thức Liên Môn (Interdisciplinary Knowledge Graph)
              </h3>
              <p className="text-xs text-slate-500">
                Hiển thị các nút tri thức và các cạnh ngữ nghĩa (EXPLAINS, MEASURES, CALCULATES, CONSTRAINS, CAUSES) nối giữa các phân môn KHTN 8.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-xl">
                {currentProblem.knowledgeEdges.length} Cạnh liên môn
              </span>
            </div>
          </div>

          {/* Interactive Graph Node View */}
          <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-white relative overflow-hidden min-h-[420px] flex flex-col justify-between">
            <div className="text-center max-w-lg mx-auto mb-6">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                NÚT TRUNG TÂM VẤN ĐỀ
              </span>
              <h4 className="text-base font-black text-white mt-1">
                {currentProblem.title}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Mọi nút tri thức xung quanh đều phục vụ giải quyết nút thắt cho vấn đề này.
              </p>
            </div>

            {/* Visual Node Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
              {/* Physics Node */}
              <div className="p-4 bg-blue-950/80 border border-blue-600/60 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-blue-400" /> Phân Môn Vật Lí
                  </span>
                  <span className="text-[10px] bg-blue-900 text-blue-200 font-mono px-2 py-0.5 rounded">
                    Lực & Năng Lượng
                  </span>
                </div>
                <div className="text-xs text-slate-200 space-y-1">
                  {currentProblem.requiredKnowledgeAtomIds
                    .filter((id) => id.includes("13") || id.includes("15") || id.includes("16") || id.includes("17") || id.includes("21") || id.includes("24") || id.includes("28"))
                    .map((id) => (
                      <div key={id} className="p-1.5 bg-blue-900/40 rounded-lg border border-blue-800/40 font-mono text-[11px]">
                        • {id}
                      </div>
                    ))}
                </div>
              </div>

              {/* Chemistry Node */}
              <div className="p-4 bg-purple-950/80 border border-purple-600/60 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <FlaskConical className="w-4 h-4 text-purple-400" /> Phân Môn Hóa Học
                  </span>
                  <span className="text-[10px] bg-purple-900 text-purple-200 font-mono px-2 py-0.5 rounded">
                    Chất & Biến Đổi
                  </span>
                </div>
                <div className="text-xs text-slate-200 space-y-1">
                  {currentProblem.requiredKnowledgeAtomIds
                    .filter((id) => id.includes("01") || id.includes("02") || id.includes("03") || id.includes("04") || id.includes("07") || id.includes("09") || id.includes("11") || id.includes("12"))
                    .map((id) => (
                      <div key={id} className="p-1.5 bg-purple-900/40 rounded-lg border border-purple-800/40 font-mono text-[11px]">
                        • {id}
                      </div>
                    ))}
                </div>
              </div>

              {/* Biology Node */}
              <div className="p-4 bg-emerald-950/80 border border-emerald-600/60 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <Dna className="w-4 h-4 text-emerald-400" /> Phân Môn Sinh Học
                  </span>
                  <span className="text-[10px] bg-emerald-900 text-emerald-200 font-mono px-2 py-0.5 rounded">
                    Vật Sống & Sinh Thái
                  </span>
                </div>
                <div className="text-xs text-slate-200 space-y-1">
                  {currentProblem.requiredKnowledgeAtomIds
                    .filter((id) => id.includes("34") || id.includes("39") || id.includes("41") || id.includes("42") || id.includes("44") || id.includes("46") || id.includes("47"))
                    .map((id) => (
                      <div key={id} className="p-1.5 bg-emerald-900/40 rounded-lg border border-emerald-800/40 font-mono text-[11px]">
                        • {id}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Semantic Edges Table */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="text-cyan-300 font-bold text-xs">Các cầu nối liên môn có bằng chứng (Evidence-based Edges):</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                {currentProblem.knowledgeEdges.map((edge) => (
                  <div key={edge.id} className="p-2 bg-slate-900/90 rounded-xl border border-slate-800 flex items-start gap-2">
                    <span className="font-mono font-bold text-cyan-400 text-[10px] bg-slate-800 px-1.5 py-0.5 rounded shrink-0">
                      [{edge.edgeType}]
                    </span>
                    <div className="space-y-0.5">
                      <div className="font-semibold text-slate-200">{edge.sourceAtomId} ➔ {edge.targetAtomId}</div>
                      <div className="text-slate-400 text-[10.5px]">{edge.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
