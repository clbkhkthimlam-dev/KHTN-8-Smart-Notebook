import React, { useState, useRef } from "react";
import { PHENOMENA_CATALOG } from "../data/phenomenaData";
import { SCENARIO_PACKS_DATABASE } from "../data/scenarioIntelligenceData";
import { PhenomenonItem, ScenarioPack } from "../types";
import { MathView } from "./MathView";
import { 
  Sparkles, 
  Camera, 
  Search, 
  ArrowRight, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2,
  Upload,
  BookOpen,
  Eye,
  Ruler,
  BrainCircuit,
  ShieldAlert,
  Layers,
  Award,
  Compass,
  FileCheck,
  ChevronRight,
  Maximize2,
  MapPin,
  Flame,
  Info
} from "lucide-react";

interface PhenomenonExplorerProps {
  onSelectLesson: (lessonId: number) => void;
}

export const PhenomenonExplorer: React.FC<PhenomenonExplorerProps> = ({ onSelectLesson }) => {
  const [selectedPhenomenon, setSelectedPhenomenon] = useState<PhenomenonItem>(PHENOMENA_CATALOG[0]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [filterContext, setFilterContext] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"visual_evidence" | "questions" | "what_if" | "quality_score">("visual_evidence");

  // Step in 10-step pedagogical pipeline (0 to 9)
  const [pedagogicalStep, setPedagogicalStep] = useState<number>(0);

  // Vision to science state
  const [isAnalyzingImage, setIsAnalyzingImage] = useState<boolean>(false);
  const [visionResult, setVisionResult] = useState<any | null>(null);
  const [customDescription, setCustomDescription] = useState<string>("");
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Interactive Question State
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const filteredList = PHENOMENA_CATALOG.filter((p) => {
    const matchesContext = filterContext === "all" || p.context === filterContext;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.lessonTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.scientificExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesContext && matchesSearch;
  });

  const scenarioPack: ScenarioPack | undefined = selectedPhenomenon.scenarioPack || 
    SCENARIO_PACKS_DATABASE.find(s => s.atom_id === selectedPhenomenon.relevantAtomId || s.lesson_id === selectedPhenomenon.lessonId);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setUploadedImagePreview(base64);
        handleRunVisionAnalysis(undefined, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunVisionAnalysis = async (presetText?: string, base64Override?: string) => {
    setIsAnalyzingImage(true);
    setVisionResult(null);
    try {
      const payload: any = {
        description: presetText || customDescription || "Hình ảnh quan sát hiện tượng khoa học trong đời sống"
      };
      if (base64Override || uploadedImagePreview) {
        payload.imageBase64 = base64Override || uploadedImagePreview;
      }
      const res = await fetch("/api/vision-science", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.ok) {
        setVisionResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  const PRESET_OBSERVATIONS = [
    { 
      label: "Tàu hàng vỏ thép 50.000 tấn nổi trên vịnh biển Cát Lái", 
      text: "Tàu vận tải container vỏ thép trọng tải hàng chục nghìn tấn nổi bồng bềnh trên mặt biển với vạch mớn nước Plimsoll chỉ mức an toàn" 
    },
    { 
      label: "Cần cờ lê nối dài ống thép mở bu-lông bánh xe tải", 
      text: "Người thợ cơ khí dùng ống thép dài 1 mét lồng vào cán cờ lê để tăng cánh tay đòn, nhẹ nhàng vặn mở bu-lông bị siết chặt" 
    },
    { 
      label: "Nến cháy trong bình đậy kín trên cân điện tử 0.01g", 
      text: "Thí nghiệm đốt nến trong bình tam giác nút kín đặt trên cân điện tử: số chỉ của cân trước và sau phản ứng giữ nguyên 350.28 g" 
    },
    { 
      label: "Giấy chỉ thị màu đo pH đất phèn ruộng lúa ĐBSCL", 
      text: "Lấy mẫu đất phèn pha nước thử giấy quỳ chuyển sang màu cam đỏ pH 4.2; bón vôi bột CaO giúp trung hòa nâng pH lên 6.5" 
    }
  ];

  const PEDAGOGICAL_STEPS = [
    { title: "Nhìn thấy (See)", desc: "Quan sát trực quan đối tượng thực tế" },
    { title: "Nhận ra (Recognize)", desc: "Xác định chi tiết dị biệt hoặc nổi bật" },
    { title: "Mô tả (Describe)", desc: "Tường thuật bằng ngôn từ khoa học trung tính" },
    { title: "Đặt câu hỏi (Question)", desc: "Khởi tạo nghi vấn và mâu thuẫn nhận thức" },
    { title: "Dự đoán (Predict)", desc: "Đưa ra giả thuyết khả dĩ ban đầu" },
    { title: "Dùng kiến thức (Apply)", desc: "Áp dụng định luật, công thức SGK KHTN 8" },
    { title: "Đọc bằng chứng (Evidence)", desc: "Giải mã dữ liệu, thang đo, vết tích" },
    { title: "Giải thích (Explain)", desc: "Lập luận nhân - quả có kiểm chứng" },
    { title: "Ra quyết định (Decide)", desc: "Chọn giải pháp kĩ thuật hoặc ứng phó đời sống" },
    { title: "Chuyển giao (Transfer)", desc: "Vận dụng sang bối cảnh mới hoàn toàn" }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 rounded-2xl border border-emerald-800/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-300 font-bold uppercase text-xs tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Module 16 — Real-World Scenario & Concrete Image Intelligence
          </div>
          <h2 className="text-xl sm:text-2xl font-black mt-1 tracking-tight">Ma Trận Hiện Tượng & Tình Huống Thị Giác KHTN 8</h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed">
            Hiện thực hóa nguyên lý: <span className="font-semibold text-cyan-300">"Hình ảnh không phải đồ trang trí — Hình ảnh là một phần của bằng chứng học tập"</span>. Khám phá 10 bước chuyển hóa từ hiện tượng đời thực sang định luật khoa học SGK.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow flex items-center gap-2 transition-all"
          >
            <Upload className="w-4 h-4" /> Tải Ảnh Thực Tế Lên
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      </div>

      {/* 10-Step Pedagogical Pipeline Ribbon */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Tiến Trình 10 Bước Chuyển Hóa Nhận Thức (Pedagogical Pipeline — Spec 16)</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Bước {pedagogicalStep + 1}/10: {PEDAGOGICAL_STEPS[pedagogicalStep].title}
          </span>
        </div>

        {/* Steps track */}
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-1.5 pt-1">
          {PEDAGOGICAL_STEPS.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setPedagogicalStep(idx)}
              className={`p-2 rounded-xl text-left border transition-all ${
                pedagogicalStep === idx
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : idx < pedagogicalStep
                  ? "bg-emerald-50/70 text-emerald-900 border-emerald-200 hover:bg-emerald-100"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <div className="text-[10px] font-bold opacity-80">Bước {idx + 1}</div>
              <div className="text-[11px] font-bold truncate">{step.title.split(" ")[0]}</div>
            </button>
          ))}
        </div>
        <div className="mt-2.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 flex items-center justify-between">
          <span>🎯 <strong>Mục tiêu bước {pedagogicalStep + 1}:</strong> {PEDAGOGICAL_STEPS[pedagogicalStep].desc}</span>
          <div className="flex gap-1.5">
            <button
              disabled={pedagogicalStep === 0}
              onClick={() => setPedagogicalStep(Math.max(0, pedagogicalStep - 1))}
              className="px-2 py-0.5 bg-white border border-slate-300 rounded text-[11px] font-medium disabled:opacity-40"
            >
              Lùi lại
            </button>
            <button
              disabled={pedagogicalStep === 9}
              onClick={() => setPedagogicalStep(Math.min(9, pedagogicalStep + 1))}
              className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[11px] font-medium hover:bg-emerald-700 disabled:opacity-40"
            >
              Kế tiếp
            </button>
          </div>
        </div>
      </div>

      {/* AI Vision to Science Studio (Spec 16: Anti-Hallucination Cognitive Gates) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <Camera className="w-5 h-5 text-emerald-600" />
            <span>Studio Nhận Diện Hiện Tượng Thực Tế Bằng AI (Vision to Science)</span>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-medium border border-emerald-200 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" /> Anti-Hallucination Gate (Mục 12)
          </span>
        </div>

        <p className="text-xs text-slate-600">
          Chụp ảnh hiện tượng ngoài đời sống hoặc chọn nhanh các tình huống thực tiễn có sẵn để AI phân tích theo 5 tầng nhận thức chống bịa đặt:
        </p>

        {/* Preset quick buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESET_OBSERVATIONS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCustomDescription(preset.text);
                setUploadedImagePreview(null);
                handleRunVisionAnalysis(preset.text);
              }}
              className="text-xs p-2.5 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-slate-700 rounded-xl transition-all text-left flex flex-col justify-between"
            >
              <span className="font-semibold text-slate-900">🔍 {preset.label}</span>
              <span className="text-[11px] text-slate-500 line-clamp-2 mt-1">{preset.text}</span>
            </button>
          ))}
        </div>

        {/* Input box and uploaded image preview */}
        <div className="space-y-2">
          {uploadedImagePreview && (
            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <img src={uploadedImagePreview} alt="Uploaded" className="w-16 h-16 object-cover rounded-lg border border-emerald-300 shadow-sm" />
              <div className="text-xs flex-1">
                <span className="font-bold text-emerald-900">Đã nạp ảnh thực tế từ thiết bị của học sinh</span>
                <p className="text-emerald-700 text-[11px]">Sẵn sàng trích xuất bằng chứng thị giác và loại bỏ suy đoán không căn cứ.</p>
              </div>
              <button 
                onClick={() => setUploadedImagePreview(null)}
                className="text-xs text-rose-600 font-semibold hover:underline"
              >
                Hủy ảnh
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nhập mô tả hiện tượng thực tế (ví dụ: Thanh sắt để ngoài mưa ẩm bị gỉ nâu, đo pH nước ao tôm tụt xuống 5.5...)"
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <button
              onClick={() => handleRunVisionAnalysis()}
              disabled={isAnalyzingImage}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow disabled:opacity-50 flex-shrink-0"
            >
              {isAnalyzingImage ? (
                <span>Đang phân tích...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Phân Tích Hiện Tượng
                </>
              )}
            </button>
          </div>
        </div>

        {/* Vision Result with Spec 16 Anti-Hallucination 5 Cognitive Gates */}
        {visionResult && (
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3 text-xs text-emerald-950 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200 pb-2.5">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Kết quả thẩm định AI Vision Grounding</span>
                <h4 className="font-bold text-base text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  {visionResult.phenomenonName}
                </h4>
              </div>
              <button
                onClick={() => onSelectLesson(Number(visionResult.linkedLessonId) || 17)}
                className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg flex items-center gap-1.5 transition-all text-xs w-fit"
              >
                Vào học {visionResult.linkedLessonTitle} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-slate-800 leading-relaxed font-medium">{visionResult.explanation}</p>

            {/* 5 Anti-Hallucination Cognitive Gates */}
            {visionResult.antiHallucination && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2 pt-2">
                <div className="p-2.5 bg-emerald-100/70 border border-emerald-300 rounded-xl">
                  <div className="font-bold text-emerald-900 text-[11px] flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> 1. Observed (Nhìn thấy)
                  </div>
                  <ul className="text-[11px] text-emerald-800 mt-1 list-disc pl-4 space-y-0.5">
                    {visionResult.antiHallucination.observed?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 bg-blue-100/70 border border-blue-300 rounded-xl">
                  <div className="font-bold text-blue-900 text-[11px] flex items-center gap-1">
                    <Ruler className="w-3.5 h-3.5" /> 2. Measured (Đo lường)
                  </div>
                  <ul className="text-[11px] text-blue-800 mt-1 list-disc pl-4 space-y-0.5">
                    {visionResult.antiHallucination.measured?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 bg-purple-100/70 border border-purple-300 rounded-xl">
                  <div className="font-bold text-purple-900 text-[11px] flex items-center gap-1">
                    <BrainCircuit className="w-3.5 h-3.5" /> 3. Inferred (Suy luận)
                  </div>
                  <ul className="text-[11px] text-purple-800 mt-1 list-disc pl-4 space-y-0.5">
                    {visionResult.antiHallucination.inferred?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 bg-amber-100/70 border border-amber-300 rounded-xl">
                  <div className="font-bold text-amber-900 text-[11px] flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> 4. Hypothesis (Giả thuyết)
                  </div>
                  <ul className="text-[11px] text-amber-800 mt-1 list-disc pl-4 space-y-0.5">
                    {visionResult.antiHallucination.hypothesis?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 bg-rose-100/70 border border-rose-300 rounded-xl">
                  <div className="font-bold text-rose-900 text-[11px] flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> 5. Unknown (Cấm bịa đặt)
                  </div>
                  <ul className="text-[11px] text-rose-800 mt-1 list-disc pl-4 space-y-0.5">
                    {visionResult.antiHallucination.unknown?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 4 Layer Questions from AI */}
            {visionResult.fourLayerQuestions && (
              <div className="bg-white p-3 rounded-xl border border-emerald-200 space-y-1.5 mt-2">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" /> Hệ thống 4 câu hỏi định hướng tư duy theo Spec 16:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-900">Lớp A (Quan sát):</strong> {visionResult.fourLayerQuestions.layerA_observation}
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-900">Lớp B (Khái niệm):</strong> {visionResult.fourLayerQuestions.layerB_concept}
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-900">Lớp C (Bằng chứng):</strong> {visionResult.fourLayerQuestions.layerC_evidence}
                  </div>
                  <div className="p-2 bg-slate-50 rounded border border-slate-200">
                    <strong className="text-slate-900">Lớp D (Quyết định):</strong> {visionResult.fourLayerQuestions.layerD_decision_transfer}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm hiện tượng, từ khoá, bài học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto text-xs">
          {[
            { id: "all", label: "Tất cả bối cảnh" },
            { id: "technology", label: "Công nghệ & Giao thông" },
            { id: "school", label: "Phòng thí nghiệm / Trường học" },
            { id: "production_or_agriculture", label: "Nông nghiệp ĐBSCL" },
            { id: "health_safety", label: "Y tế & Sức khoẻ" },
            { id: "environment_or_community", label: "Môi trường & Sinh thái" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterContext(tab.id)}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-all ${
                filterContext === tab.id
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Phenomena Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredList.map((p) => {
          const pack = p.scenarioPack || SCENARIO_PACKS_DATABASE.find(s => s.atom_id === p.relevantAtomId || s.lesson_id === p.lessonId);
          const isSelected = selectedPhenomenon.id === p.id;
          const displayImage = p.imageUrl || pack?.image_set[0]?.source_url;

          return (
            <div
              key={p.id}
              onClick={() => {
                setSelectedPhenomenon(p);
                setActiveImageIndex(0);
                setRevealedAnswers({});
              }}
              className={`rounded-2xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? "bg-white border-emerald-500 shadow-md ring-2 ring-emerald-200"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {displayImage && (
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={displayImage} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-sm">
                      {p.context === "home" ? "Gia đình" : p.context === "technology" ? "Công nghệ" : p.context === "health_safety" ? "Y tế học đường" : "Nông nghiệp"}
                    </span>
                    {pack && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-600/90 text-white backdrop-blur-sm">
                        Spec 16 Verified
                      </span>
                    )}
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] text-white font-semibold bg-emerald-700/90 px-2 py-0.5 rounded backdrop-blur-sm">
                    Bài {p.lessonId}
                  </span>
                </div>
              )}

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{p.name}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">{p.inquiryQuestion}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    Khám phá bằng chứng <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  {pack && (
                    <span className="text-[11px] text-slate-400 font-mono">
                      Q-Score: {Math.round(pack.quality_score.total * 100)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Interactive Studio for Selected Phenomenon (Spec 16 Full Case Study) */}
      {selectedPhenomenon && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                <span>{selectedPhenomenon.lessonTitle}</span>
                {scenarioPack && (
                  <span className="px-2 py-0.5 bg-cyan-50 text-cyan-700 rounded border border-cyan-200 lowercase font-mono">
                    {scenarioPack.atom_id}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">{selectedPhenomenon.name}</h3>
              {scenarioPack?.location_context && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                  <span>{scenarioPack.location_context}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectLesson(selectedPhenomenon.lessonId)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow flex items-center gap-1.5 transition-all w-fit"
              >
                <BookOpen className="w-4 h-4" /> Mở Bài Học SGK
              </button>
            </div>
          </div>

          {/* Concrete Image Showcase with Provenance & Sequence */}
          {scenarioPack && scenarioPack.image_set && scenarioPack.image_set.length > 0 && (
            <div className="space-y-3 bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Bằng Chứng Thị Giác Thực Nghiệm ({scenarioPack.image_set.length} Ảnh Kiểm Định)
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {scenarioPack.image_set.map((img, idx) => (
                    <button
                      key={img.image_id}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`px-3 py-1 rounded text-[11px] font-semibold transition-all ${
                        activeImageIndex === idx
                          ? "bg-cyan-500 text-slate-950 font-bold"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {img.image_type === "real_photo" ? "Ảnh Thực Tế" : img.image_type === "diagram" ? "Sơ Đồ Lực" : "Biểu Đồ"} #{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Image Card */}
              {scenarioPack.image_set[activeImageIndex] && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-7 relative rounded-xl overflow-hidden bg-slate-950 max-h-80 flex items-center justify-center border border-slate-700">
                    <img
                      src={scenarioPack.image_set[activeImageIndex].source_url}
                      alt={scenarioPack.image_set[activeImageIndex].alt_text}
                      className="w-full h-72 object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-slate-300 flex items-center gap-2 border border-slate-700">
                      <span>Nguồn: {scenarioPack.image_set[activeImageIndex].creator}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-mono">{scenarioPack.image_set[activeImageIndex].license}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3 text-xs">
                    <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 space-y-1">
                      <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" /> Chú Thích Bằng Chứng Thị Giác:
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {scenarioPack.image_set[activeImageIndex].visual_evidence}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 space-y-1">
                      <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <FileCheck className="w-3.5 h-3.5" /> Mô Tả Tình Huống Thực Tế:
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {scenarioPack.caption}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Interactive Exploration Tabs */}
          <div className="space-y-4">
            <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto text-xs">
              {[
                { id: "visual_evidence", label: "Tầng Bằng Chứng Thị Giác", icon: Eye },
                { id: "questions", label: "4 Lớp Câu Hỏi 'Nhìn Hình' (Mục 7)", icon: HelpCircle },
                { id: "what_if", label: "Biến Thể What-If & Địa Phương", icon: Compass },
                { id: "quality_score", label: "Chỉ Số Chất Lượng Tình Huống", icon: Award }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 pt-1 font-bold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
                      isActive
                        ? "border-emerald-600 text-emerald-700"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: VISUAL EVIDENCE LAYER */}
            {activeTab === "visual_evidence" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* What is visible */}
                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-emerald-600" /> 1. Những Gì Nhìn Thấy Trực Tiếp (What is Visible):
                    </div>
                    <ul className="list-disc pl-5 text-emerald-950 space-y-1">
                      {scenarioPack?.visual_evidence_layer?.what_is_visible?.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      )) || selectedPhenomenon.observableSigns.map((s, idx) => <li key={idx}>{s}</li>)}
                    </ul>
                  </div>

                  {/* What is measurable */}
                  <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 space-y-2">
                    <div className="font-bold text-blue-900 flex items-center gap-1.5">
                      <Ruler className="w-4 h-4 text-blue-600" /> 2. Những Gì Đo Lường Được (What is Measurable):
                    </div>
                    <ul className="list-disc pl-5 text-blue-950 space-y-1">
                      {scenarioPack?.visual_evidence_layer?.what_is_measurable?.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      )) || (
                        <li>Đại lượng vật lý và hóa học có thể xác định bằng dụng cụ thí nghiệm học đường.</li>
                      )}
                    </ul>
                  </div>

                  {/* What can be inferred */}
                  <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200 space-y-2">
                    <div className="font-bold text-purple-900 flex items-center gap-1.5">
                      <BrainCircuit className="w-4 h-4 text-purple-600" /> 3. Suy Luận Có Căn Cứ Khoa Học (What Can Be Inferred):
                    </div>
                    <ul className="list-disc pl-5 text-purple-950 space-y-1">
                      {scenarioPack?.visual_evidence_layer?.what_can_be_inferred?.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      )) || <li>{selectedPhenomenon.scientificExplanation}</li>}
                    </ul>
                  </div>

                  {/* What cannot be inferred - Anti-hallucination */}
                  <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-200 space-y-2">
                    <div className="font-bold text-rose-900 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600" /> 4. Cảnh Báo Chống Bịa Đặt (Anti-Hallucination Boundary):
                    </div>
                    <ul className="list-disc pl-5 text-rose-950 space-y-1">
                      {scenarioPack?.visual_evidence_layer?.what_cannot_be_inferred?.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      )) || (
                        <li>Tuyệt đối không kết luận cảm tính khi chưa đo đạc số liệu thực nghiệm.</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Known Data & Unknown Problem */}
                {scenarioPack?.known_data && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                    <div className="font-bold text-slate-800 flex items-center justify-between">
                      <span>Bảng Dữ Liệu Thực Nghiệm Của Tình Huống:</span>
                      <span className="text-[11px] font-mono text-slate-500">Mã: {scenarioPack.scenario_id}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {Object.entries(scenarioPack.known_data).map(([k, v], idx) => (
                        <div key={idx} className="p-2 bg-white rounded border border-slate-200">
                          <div className="text-[11px] text-slate-500 truncate">{k}</div>
                          <div className="font-bold text-slate-900">{String(v)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: FOUR LAYER QUESTIONS */}
            {activeTab === "questions" && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <p className="text-xs text-slate-600">
                  Thực hiện đúng quy tắc Mục 7 (Spec 16) với 4 lớp câu hỏi nhận thức từ quan sát, kết nối định luật SGK, đọc bằng chứng đến ra quyết định chuyển giao:
                </p>

                {scenarioPack?.four_layer_questions ? (
                  <div className="space-y-3">
                    {/* Layer A */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Eye className="w-4 h-4 text-emerald-600" /> Lớp A — Quan sát nhận diện (Observation):
                        </span>
                        <button
                          onClick={() => setRevealedAnswers(prev => ({ ...prev, layerA: !prev.layerA }))}
                          className="text-emerald-600 font-bold hover:underline"
                        >
                          {revealedAnswers.layerA ? "Ẩn đáp án gợi ý" : "Xem đáp án gợi ý"}
                        </button>
                      </div>
                      <p className="font-medium text-slate-800">{scenarioPack.four_layer_questions.layerA_observation.question}</p>
                      {revealedAnswers.layerA && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1 text-emerald-950">
                          <div className="font-semibold">Dấu hiệu nhận diện:</div>
                          <ul className="list-disc pl-5">
                            {scenarioPack.four_layer_questions.layerA_observation.answers.map((ans, i) => (
                              <li key={i}>{ans}</li>
                            ))}
                          </ul>
                          <div className="text-[11px] text-emerald-800 italic mt-1">
                            💡 {scenarioPack.four_layer_questions.layerA_observation.guide}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Layer B */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <BrainCircuit className="w-4 h-4 text-cyan-600" /> Lớp B — Kết nối kiến thức & Công thức SGK (Concept Connection):
                        </span>
                        <button
                          onClick={() => setRevealedAnswers(prev => ({ ...prev, layerB: !prev.layerB }))}
                          className="text-cyan-600 font-bold hover:underline"
                        >
                          {revealedAnswers.layerB ? "Ẩn đáp án gợi ý" : "Xem đáp án gợi ý"}
                        </button>
                      </div>
                      <p className="font-medium text-slate-800">{scenarioPack.four_layer_questions.layerB_concept.question}</p>
                      {revealedAnswers.layerB && (
                        <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-lg space-y-1.5 text-cyan-950">
                          <div className="font-semibold">Định luật & Biểu thức toán:</div>
                          <div className="p-2 bg-white rounded border border-cyan-200 font-bold text-center">
                            {scenarioPack.four_layer_questions.layerB_concept.formula_latex ? (
                              <MathView latex={scenarioPack.four_layer_questions.layerB_concept.formula_latex} displayMode={true} />
                            ) : (
                              <span>{scenarioPack.four_layer_questions.layerB_concept.related_concept}</span>
                            )}
                          </div>
                          <div className="text-[11px] text-cyan-800 italic">
                            💡 {scenarioPack.four_layer_questions.layerB_concept.guide}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Layer C */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Ruler className="w-4 h-4 text-purple-600" /> Lớp C — Bằng chứng & Kiểm chứng (Evidence & Validation):
                        </span>
                        <button
                          onClick={() => setRevealedAnswers(prev => ({ ...prev, layerC: !prev.layerC }))}
                          className="text-purple-600 font-bold hover:underline"
                        >
                          {revealedAnswers.layerC ? "Ẩn đáp án gợi ý" : "Xem đáp án gợi ý"}
                        </button>
                      </div>
                      <p className="font-medium text-slate-800">{scenarioPack.four_layer_questions.layerC_evidence.question}</p>
                      {revealedAnswers.layerC && (
                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg space-y-1 text-purple-950">
                          <div><strong>Số liệu chứng minh:</strong> {scenarioPack.four_layer_questions.layerC_evidence.supporting_data}</div>
                          <div><strong>Cách kiểm chứng:</strong> {scenarioPack.four_layer_questions.layerC_evidence.validation_test}</div>
                        </div>
                      )}
                    </div>

                    {/* Layer D */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-amber-600" /> Lớp D — Quyết định & Chuyển giao đời sống (Decision & Transfer):
                        </span>
                        <button
                          onClick={() => setRevealedAnswers(prev => ({ ...prev, layerD: !prev.layerD }))}
                          className="text-amber-600 font-bold hover:underline"
                        >
                          {revealedAnswers.layerD ? "Ẩn đáp án gợi ý" : "Xem đáp án gợi ý"}
                        </button>
                      </div>
                      <p className="font-medium text-slate-800">{scenarioPack.four_layer_questions.layerD_decision_transfer.question}</p>
                      {revealedAnswers.layerD && (
                        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-1 text-amber-950">
                          <div><strong>Phân tích điều kiện thay đổi:</strong> {scenarioPack.four_layer_questions.layerD_decision_transfer.what_if_variant}</div>
                          <div><strong>Quyết định khoa học:</strong> {scenarioPack.four_layer_questions.layerD_decision_transfer.decision_matrix}</div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-2">
                    <p className="font-bold text-slate-800">Câu hỏi khơi gợi: {selectedPhenomenon.inquiryQuestion}</p>
                    <p className="text-slate-600">Giải thích: {selectedPhenomenon.scientificExplanation}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: WHAT-IF VARIANTS & LOCAL CONTEXT */}
            {activeTab === "what_if" && (
              <div className="space-y-4 animate-in fade-in duration-200 text-xs">
                {/* What-if section */}
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3">
                  <div className="font-bold text-amber-950 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-600" /> Kịch Bản Giả Định "What-If" (Đổi Điều Kiện — Đoán Kết Quả):
                  </div>
                  {scenarioPack?.what_if_variants?.map((w, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border border-amber-200 space-y-1">
                      <div className="font-bold text-slate-900">⚡ Điều kiện: {w.condition}</div>
                      <div className="text-slate-700 pl-4 border-l-2 border-amber-500">
                        <strong>Hệ quả:</strong> {w.consequence}
                      </div>
                    </div>
                  )) || (
                    <p className="text-slate-600">Hiện tượng có tính ổn định cao trong các điều kiện tiêu chuẩn.</p>
                  )}
                </div>

                {/* Local Vietnamese Variants */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                  <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Tình Huống Liên Hệ Tại Địa Phương & Việt Nam:
                  </div>
                  <ul className="list-disc pl-5 text-emerald-900 space-y-1.5 font-medium">
                    {scenarioPack?.local_variants?.map((loc, idx) => (
                      <li key={idx}>{loc}</li>
                    )) || (
                      <li>Ứng dụng thực tiễn trong nông nghiệp, giao thông và đời sống tại các vùng miền Việt Nam.</li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 4: QUALITY SCORE RADAR */}
            {activeTab === "quality_score" && (
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4 animate-in fade-in duration-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" /> Bảng Thẩm Định Điểm Chất Lượng Tình Huống (Spec 16 Mục 16)
                  </span>
                  {scenarioPack && (
                    <span className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg font-mono">
                      Tổng Điểm: {Math.round(scenarioPack.quality_score.total * 100)} / 100 (ĐẠT CHUẨN PUBLISHED)
                    </span>
                  )}
                </div>

                {scenarioPack && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { label: "Bằng chứng thị giác (Visual Evidence)", score: scenarioPack.quality_score.visual_evidence, weight: "20%" },
                      { label: "Khớp chương trình SGK (Curriculum Match)", score: scenarioPack.quality_score.curriculum_match, weight: "15%" },
                      { label: "Độ chuẩn xác khoa học (Scientific Accuracy)", score: scenarioPack.quality_score.scientific_accuracy, weight: "15%" },
                      { label: "Tính chân thực đời sống (Authenticity)", score: scenarioPack.quality_score.authenticity, weight: "10%" },
                      { label: "Giá trị số liệu đo lường (Data Value)", score: scenarioPack.quality_score.data_value, weight: "10%" },
                      { label: "Năng lực chuyển giao (Transfer Value)", score: scenarioPack.quality_score.transfer_value, weight: "10%" }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-600">{item.label}</span>
                          <span className="font-mono font-bold text-slate-900">{Math.round(item.score * 100)}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full transition-all"
                            style={{ width: `${item.score * 100}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-slate-400">Trọng số: {item.weight}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
