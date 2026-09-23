import React, { useState } from "react";
import { MathView } from "./MathView";
import { 
  FlaskConical, 
  Waves, 
  Zap, 
  Scale, 
  BookOpen, 
  Play, 
  RotateCcw, 
  Download, 
  Send, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

interface TrialRecord {
  trial: number;
  param1: string;
  param2: string;
  measuredResult: string;
  status: string;
}

export const InteractiveLab: React.FC<{ onLogEvent?: (activity: string, score: number, notes: string) => void }> = ({ onLogEvent }) => {
  const [activeTab, setActiveTab] = useState<"archimedes" | "ph" | "circuit" | "lever" | "report">("archimedes");

  // --- LAB 1: ARCHIMEDES & DENSITY ---
  const [fluidDensity, setFluidDensity] = useState<number>(1000); // kg/m3 (Nước)
  const [objectMass, setObjectMass] = useState<number>(1.2); // kg
  const [objectVolume, setObjectVolume] = useState<number>(0.001); // m3 (1 L)
  const [trials, setTrials] = useState<TrialRecord[]>([
    { trial: 1, param1: "Nước (1000 kg/m³)", param2: "m = 1.2 kg, V = 0.001 m³", measuredResult: "FA = 10 N < P = 12 N", status: "Chìm xuống đáy" }
  ]);

  const objectDensity = Math.round(objectMass / objectVolume);
  const gravityForce = Number((objectMass * 10).toFixed(2)); // P = 10 * m
  // Displaced volume
  const isFloating = objectDensity <= fluidDensity;
  const submergedFraction = Math.min(1, objectDensity / fluidDensity);
  const displacedVolume = isFloating ? (objectMass / fluidDensity) : objectVolume;
  const buoyantForce = Number((fluidDensity * 10 * displacedVolume).toFixed(2)); // FA = d * V

  const addArchimedesTrial = () => {
    const newRecord: TrialRecord = {
      trial: trials.length + 1,
      param1: `${fluidDensity} kg/m³`,
      param2: `m = ${objectMass} kg, V = ${objectVolume * 1000} L (D = ${objectDensity} kg/m³)`,
      measuredResult: `FA = ${buoyantForce} N, P = ${gravityForce} N`,
      status: isFloating ? (objectDensity === fluidDensity ? "Lơ lửng" : "Nổi trên mặt") : "Chìm xuống đáy"
    };
    setTrials([...trials, newRecord]);
    if (onLogEvent) {
      onLogEvent("LAB_ARCHIMEDES_TRIAL", 10, `Thực hiện lượt thử #${newRecord.trial}: D_vật=${objectDensity}, D_lỏng=${fluidDensity} -> ${newRecord.status}`);
    }
  };

  // --- LAB 2: PH SCALE ---
  const [selectedLiquid, setSelectedLiquid] = useState<{ name: string; ph: number; type: string; color: string; litmusColor: string }>({
    name: "Nước cốt chanh",
    ph: 2.4,
    type: "Acid mạnh",
    color: "#ef4444",
    litmusColor: "#dc2626"
  });
  const [isDipped, setIsDipped] = useState<boolean>(false);

  const LIQUIDS = [
    { name: "Nước cốt chanh", ph: 2.4, type: "Acid (chứa acid citric)", color: "#ef4444", litmusColor: "#dc2626" },
    { name: "Giấm ăn 5%", ph: 3.0, type: "Acid (chứa acid axetic)", color: "#f97316", litmusColor: "#ea580c" },
    { name: "Cà phê đen", ph: 5.0, type: "Acid nhẹ", color: "#f59e0b", litmusColor: "#d97706" },
    { name: "Nước cất tinh khiết", ph: 7.0, type: "Môi trường Trung tính", color: "#10b981", litmusColor: "#6b7280" },
    { name: "Nước biển", ph: 8.2, type: "Kiềm nhẹ (Base)", color: "#06b6d4", litmusColor: "#0284c7" },
    { name: "Nước xà phòng giặt", ph: 10.5, type: "Kiềm mạnh (Base)", color: "#3b82f6", litmusColor: "#1d4ed8" },
    { name: "Nước vôi trong Ca(OH)2", ph: 12.0, type: "Kiềm mạnh (Base)", color: "#6366f1", litmusColor: "#4338ca" }
  ];

  // --- LAB 3: OHM'S LAW CIRCUIT ---
  const [voltage, setVoltage] = useState<number>(6.0); // V
  const [resistance, setResistance] = useState<number>(20); // Ohm
  const [circuitClosed, setCircuitClosed] = useState<boolean>(true);

  const current = circuitClosed ? Number((voltage / resistance).toFixed(3)) : 0;
  const lampBrightness = circuitClosed ? Math.min(100, Math.round((current / 0.5) * 100)) : 0;

  // --- LAB 4: LEVER BALANCE ---
  const [f1, setF1] = useState<number>(20); // N
  const [d1, setD1] = useState<number>(40); // cm
  const [f2, setF2] = useState<number>(40); // N
  const [d2, setD2] = useState<number>(20); // cm

  const torque1 = (f1 * (d1 / 100)).toFixed(2);
  const torque2 = (f2 * (d2 / 100)).toFixed(2);
  const isLeverBalanced = Math.abs(Number(torque1) - Number(torque2)) < 0.05;

  // --- LAB REPORT ---
  const [reportQuestion, setReportQuestion] = useState<string>("Khối lượng riêng của vật và chất lỏng ảnh hưởng như thế nào đến khả năng nổi của vật?");
  const [reportHypothesis, setReportHypothesis] = useState<string>("Nếu khối lượng riêng của vật D_vật < D_chất lỏng thì vật sẽ nổi, ngược lại D_vật > D_chất lỏng thì vật sẽ chìm.");
  const [reportConclusion, setReportConclusion] = useState<string>("Thí nghiệm chứng minh hoàn toàn công thức lực đẩy Archimedes F_A = d * V. Trạng thái nổi xảy ra khi F_A = P, lúc này D_vật <= D_lỏng.");
  const [reportSaved, setReportSaved] = useState<boolean>(false);

  const handleSaveReport = () => {
    setReportSaved(true);
    if (onLogEvent) {
      onLogEvent("LAB_REPORT_SUBMIT", 10, `Báo cáo thí nghiệm: "${reportQuestion}" - Kết luận hợp lệ.`);
    }
    setTimeout(() => setReportSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header with Lab Selector Tabs */}
      <div className="p-4 sm:p-6 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold tracking-tight">Phòng Thí Nghiệm Khoa Học Ảo KHTN 8</h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Mô phỏng trực quan tương tác, đo lường số liệu thực nghiệm và lập báo cáo khoa học.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1 bg-slate-800 p-1.5 rounded-xl text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab("archimedes")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "archimedes" ? "bg-blue-500 text-white shadow-md font-semibold" : "text-slate-300 hover:text-white"
            }`}
          >
            <Waves className="w-4 h-4 text-cyan-300" /> 
            <span>[Lí] Archimedes & KLR</span>
          </button>
          <button
            onClick={() => setActiveTab("circuit")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "circuit" ? "bg-blue-500 text-white shadow-md font-semibold" : "text-slate-300 hover:text-white"
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" /> 
            <span>[Lí] Mạch điện & Ohm</span>
          </button>
          <button
            onClick={() => setActiveTab("lever")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "lever" ? "bg-blue-500 text-white shadow-md font-semibold" : "text-slate-300 hover:text-white"
            }`}
          >
            <Scale className="w-4 h-4 text-emerald-300" /> 
            <span>[Lí] Đòn bẩy & Moment</span>
          </button>
          <button
            onClick={() => setActiveTab("ph")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "ph" ? "bg-purple-600 text-white shadow-md font-semibold" : "text-slate-300 hover:text-white"
            }`}
          >
            <FlaskConical className="w-4 h-4 text-purple-200" /> 
            <span>[Hóa] Thang pH & Acid/Base</span>
          </button>
          <button
            onClick={() => setActiveTab("report")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "report" ? "bg-amber-400 text-slate-950 shadow-md font-semibold" : "text-slate-300 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Sổ tay thí nghiệm
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="p-4 sm:p-6">
        {/* ================= 1. ARCHIMEDES & DENSITY LAB ================= */}
        {activeTab === "archimedes" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visualizer & Stage */}
            <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 text-white flex flex-col justify-between relative overflow-hidden border border-slate-800">
              <div className="flex justify-between items-center text-xs text-slate-400 z-10">
                <span className="font-semibold uppercase tracking-wider text-cyan-400">
                  Bình Thí Nghiệm Lực Đẩy Archimedes
                </span>
                <span className="bg-slate-800 px-2 py-1 rounded">
                  {fluidDensity === 1000 ? "Môi trường: Nước cất" : fluidDensity === 800 ? "Môi trường: Dầu hoả" : "Môi trường: Nước muối đặc"}
                </span>
              </div>

              {/* Tank Graphic */}
              <div className="relative h-64 sm:h-72 w-full my-4 border-b-4 border-x-4 border-slate-600 rounded-b-xl overflow-hidden bg-slate-950 flex flex-col justify-end">
                {/* Fluid layer */}
                <div 
                  className="w-full relative transition-all duration-500 flex items-center justify-center"
                  style={{
                    height: "85%",
                    background: fluidDensity === 800 
                      ? "linear-gradient(to top, #b45309, #d97706, #fbbf24)" 
                      : fluidDensity === 1000 
                        ? "linear-gradient(to top, #0369a1, #0284c7, #38bdf8)" 
                        : "linear-gradient(to top, #1e3a8a, #2563eb, #60a5fa)"
                  }}
                >
                  <div className="absolute top-2 left-4 text-xs font-mono text-white/80 bg-black/30 px-2 py-0.5 rounded">
                    d_lỏng = {fluidDensity * 10} N/m³ (D = {fluidDensity} kg/m³)
                  </div>

                  {/* Submerged Object Box */}
                  <div
                    className="absolute transition-all duration-700 rounded-lg shadow-2xl flex flex-col items-center justify-center p-2 text-center text-xs font-bold border-2 border-white/60"
                    style={{
                      width: "110px",
                      height: "90px",
                      backgroundColor: objectDensity > 2000 ? "#64748b" : objectDensity > 1000 ? "#94a3b8" : "#f59e0b",
                      bottom: isFloating ? `${(1 - submergedFraction) * 55 + 25}%` : "5px"
                    }}
                  >
                    <span className="text-white drop-shadow-md">Vật thể</span>
                    <span className="text-xs font-mono text-white/90">D = {objectDensity} kg/m³</span>
                    <span className="text-[10px] font-mono text-white/80">m = {objectMass} kg</span>
                  </div>
                </div>

                {/* Force Vectors Label */}
                <div className="absolute right-4 top-12 bg-black/60 backdrop-blur-sm p-2 rounded-lg text-xs space-y-1 font-mono text-right">
                  <div className="text-amber-400">Trọng lực P = {gravityForce} N ↓</div>
                  <div className="text-cyan-300">Lực đẩy FA = {buoyantForce} N ↑</div>
                  <div className={`font-bold ${isFloating ? "text-emerald-400" : "text-rose-400"}`}>
                    Trạng thái: {isFloating ? (objectDensity === fluidDensity ? "Lơ lửng" : "Nổi trên mặt nước") : "Chìm hoàn toàn"}
                  </div>
                </div>
              </div>

              {/* Formula & Rule Strip */}
              <div className="bg-slate-800/80 p-3 rounded-lg flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-semibold">Công thức:</span>
                  <MathView math="F_A = d_{lỏng} \cdot V_{chìm}" />
                </div>
                <div className="text-right">
                  <span className="text-slate-400">Điều kiện nổi: </span>
                  <span className="text-emerald-400 font-mono font-bold">D_vật ≤ D_lỏng</span>
                </div>
              </div>
            </div>

            {/* Controls & Data Table */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-600" /> Bảng Điều Khiển Biến Số
                </h3>

                {/* Choose Fluid */}
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">1. Chọn loại chất lỏng</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setFluidDensity(800)}
                      className={`py-1.5 px-2 text-xs rounded-lg border font-medium transition-all ${
                        fluidDensity === 800 ? "bg-amber-100 border-amber-400 text-amber-900 font-bold" : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      Dầu hoả (800)
                    </button>
                    <button
                      onClick={() => setFluidDensity(1000)}
                      className={`py-1.5 px-2 text-xs rounded-lg border font-medium transition-all ${
                        fluidDensity === 1000 ? "bg-cyan-100 border-cyan-400 text-cyan-900 font-bold" : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      Nước cất (1000)
                    </button>
                    <button
                      onClick={() => setFluidDensity(1200)}
                      className={`py-1.5 px-2 text-xs rounded-lg border font-medium transition-all ${
                        fluidDensity === 1200 ? "bg-blue-100 border-blue-400 text-blue-900 font-bold" : "bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      Nước muối (1200)
                    </button>
                  </div>
                </div>

                {/* Object Mass Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Khối lượng vật (m):</span>
                    <span className="font-mono font-bold text-cyan-700">{objectMass} kg</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="5.0"
                    step="0.1"
                    value={objectMass}
                    onChange={(e) => setObjectMass(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                </div>

                {/* Object Volume Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Thể tích vật (V):</span>
                    <span className="font-mono font-bold text-cyan-700">{(objectVolume * 1000).toFixed(1)} L ({objectVolume} m³)</span>
                  </div>
                  <input
                    type="range"
                    min="0.0005"
                    max="0.003"
                    step="0.0001"
                    value={objectVolume}
                    onChange={(e) => setObjectVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={addArchimedesTrial}
                    className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" /> Ghi Nhận Số Liệu Lượt Thử
                  </button>
                </div>
              </div>

              {/* Trials Table */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-800">Nhật ký đo thực nghiệm ({trials.length} lượt)</span>
                  <button 
                    onClick={() => setTrials([])}
                    className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Xoá
                  </button>
                </div>
                <div className="max-h-36 overflow-y-auto text-[11px]">
                  <table className="w-full text-left">
                    <thead className="bg-slate-200 text-slate-700 uppercase text-[10px] sticky top-0">
                      <tr>
                        <th className="py-1 px-1.5">Lần</th>
                        <th className="py-1 px-1.5">Chất lỏng</th>
                        <th className="py-1 px-1.5">Lực FA & P</th>
                        <th className="py-1 px-1.5">Hiện tượng</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {trials.map((t) => (
                        <tr key={t.trial} className="hover:bg-slate-100">
                          <td className="py-1 px-1.5 font-bold">{t.trial}</td>
                          <td className="py-1 px-1.5">{t.param1}</td>
                          <td className="py-1 px-1.5 font-mono">{t.measuredResult}</td>
                          <td className="py-1 px-1.5">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                              t.status.includes("Chìm") ? "bg-rose-100 text-rose-800" : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. PH SCALE & ACID/BASE LAB ================= */}
        {activeTab === "ph" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-slate-900 rounded-xl p-6 text-white border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">
                  Thí Nghiệm Nhận Biết Độ pH & Chất Chỉ Thị Màu
                </h3>
                <p className="text-slate-400 text-xs mb-4">
                  Nhúng giấy quỳ tím và que thử pH chuẩn vào các mẫu dung dịch đời sống để xác định tính acid hoặc base.
                </p>
              </div>

              {/* Beaker Graphic */}
              <div className="relative h-60 w-full flex items-center justify-center my-4">
                {/* Beaker body */}
                <div className="relative w-44 h-52 border-x-4 border-b-4 border-slate-500 rounded-b-2xl bg-slate-950/60 overflow-hidden flex flex-col justify-end p-2 shadow-inner">
                  {/* Graduations */}
                  <div className="absolute right-2 top-8 text-[9px] font-mono text-slate-500 space-y-4 text-right">
                    <div>— 200 ml</div>
                    <div>— 150 ml</div>
                    <div>— 100 ml</div>
                    <div>— 50 ml</div>
                  </div>

                  {/* Liquid */}
                  <div 
                    className="w-full h-36 rounded-b-xl transition-all duration-500 opacity-90 flex items-center justify-center relative"
                    style={{ backgroundColor: selectedLiquid.color }}
                  >
                    <span className="text-xs font-bold text-white drop-shadow bg-black/40 px-2 py-1 rounded">
                      {selectedLiquid.name}
                    </span>
                  </div>

                  {/* Dipped Litmus Strip */}
                  <div 
                    className={`absolute left-16 w-8 h-32 rounded-t transition-all duration-700 border border-white/40 shadow-xl ${
                      isDipped ? "top-16" : "top-2"
                    }`}
                    style={{
                      backgroundColor: isDipped ? selectedLiquid.litmusColor : "#e2e8f0"
                    }}
                  >
                    <div className="text-[9px] text-center text-slate-900 font-bold mt-1">
                      {isDipped ? "Quỳ đổi màu" : "Quỳ tím"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsDipped(!isDipped)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all shadow ${
                    isDipped ? "bg-amber-500 hover:bg-amber-600 text-slate-950" : "bg-cyan-500 hover:bg-cyan-600 text-slate-950"
                  }`}
                >
                  {isDipped ? "Rút que thử ra khỏi dung dịch" : "Nhúng que thử quỳ tím vào dung dịch"}
                </button>
              </div>
            </div>

            {/* Selector & pH Rainbow Scale */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Chọn mẫu dung dịch thử nghiệm
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {LIQUIDS.map((liq) => (
                    <button
                      key={liq.name}
                      onClick={() => {
                        setSelectedLiquid(liq);
                        setIsDipped(false);
                      }}
                      className={`p-2.5 rounded-lg text-left text-xs border transition-all flex items-center justify-between ${
                        selectedLiquid.name === liq.name
                          ? "bg-white border-cyan-500 ring-2 ring-cyan-200 shadow-sm font-bold text-slate-900"
                          : "bg-white/80 border-slate-200 text-slate-600 hover:bg-white"
                      }`}
                    >
                      <span>{liq.name}</span>
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-slate-300"
                        style={{ backgroundColor: liq.color }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Real pH meter display card */}
              <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-slate-400">Kết quả đo pH điện tử</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                    selectedLiquid.ph < 7 ? "bg-rose-900 text-rose-300" : selectedLiquid.ph > 7 ? "bg-blue-900 text-blue-300" : "bg-emerald-900 text-emerald-300"
                  }`}>
                    {selectedLiquid.type}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 my-2">
                  <span className="text-4xl font-extrabold font-mono text-cyan-400">pH = {selectedLiquid.ph}</span>
                  <span className="text-xs text-slate-400">
                    {selectedLiquid.ph < 7 ? "[H+] > [OH-]" : selectedLiquid.ph > 7 ? "[OH-] > [H+]" : "[H+] = [OH-]"}
                  </span>
                </div>

                {/* Visual Bar 1-14 */}
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
                    <span>1 (Acid mạnh)</span>
                    <span>7 (Trung tính)</span>
                    <span>14 (Kiềm mạnh)</span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-gradient-to-r from-red-600 via-emerald-500 to-blue-700 relative p-0.5">
                    <div 
                      className="absolute top-[-4px] w-3 h-6 bg-white rounded border-2 border-slate-900 shadow -ml-1.5 transition-all duration-500"
                      style={{ left: `${(selectedLiquid.ph / 14) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. CIRCUIT & OHM'S LAW LAB ================= */}
        {activeTab === "circuit" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 text-white border border-slate-800 flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-amber-400">Sơ Đồ Mạch Điện KHTN 8</span>
                <span className={`px-2 py-0.5 rounded font-mono font-bold ${circuitClosed ? "bg-emerald-900 text-emerald-300" : "bg-rose-900 text-rose-300"}`}>
                  {circuitClosed ? "MẠCH KÍN" : "MẠCH HỞ"}
                </span>
              </div>

              {/* Circuit Canvas representation */}
              <div className="h-64 my-4 bg-slate-950 rounded-xl border border-slate-800 relative flex items-center justify-center p-6">
                {/* Wire rectangle */}
                <div className={`w-4/5 h-40 border-4 rounded-xl transition-all duration-300 relative flex items-center justify-between px-8 ${
                  circuitClosed && current > 0 ? "border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]" : "border-slate-600"
                }`}>
                  {/* Top: Battery / DC Source */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 px-3 py-1 rounded border border-slate-700 flex items-center gap-2 text-xs font-mono">
                    <span className="text-cyan-400 font-bold">+ Nguồn DC -</span>
                    <span className="text-amber-400 font-extrabold">{voltage} V</span>
                  </div>

                  {/* Left: Switch (K) */}
                  <div className="absolute -left-5 top-1/2 -translate-y-1/2 bg-slate-900 px-2 py-1 rounded border border-slate-700 text-xs">
                    <button 
                      onClick={() => setCircuitClosed(!circuitClosed)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        circuitClosed ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                      }`}
                    >
                      K: {circuitClosed ? "ĐÓNG" : "NGẮT"}
                    </button>
                  </div>

                  {/* Right: Resistor (R) */}
                  <div className="absolute -right-6 top-1/2 -translate-y-1/2 bg-slate-900 px-2.5 py-1.5 rounded border border-slate-700 text-xs font-mono text-center">
                    <div className="text-[10px] text-slate-400">Điện trở R</div>
                    <div className="text-cyan-300 font-bold">{resistance} Ω</div>
                  </div>

                  {/* Bottom: Light bulb & Ammeter */}
                  <div className="absolute -bottom-7 left-1/3 -translate-x-1/2 flex items-center gap-2 bg-slate-900 px-3 py-1 rounded border border-slate-700">
                    {/* Glowing Lamp */}
                    <div 
                      className="w-7 h-7 rounded-full border-2 border-white/60 transition-all duration-300 flex items-center justify-center text-[10px]"
                      style={{
                        backgroundColor: circuitClosed ? `rgba(251, 191, 36, ${Math.min(1, current * 2)})` : "#334155",
                        boxShadow: circuitClosed && current > 0 ? `0 0 ${lampBrightness * 0.4}px rgba(251, 191, 36, 0.8)` : "none"
                      }}
                    >
                      💡
                    </div>
                    <span className="text-[11px] font-mono text-slate-300">Đèn ({lampBrightness}%)</span>
                  </div>

                  <div className="absolute -bottom-6 left-2/3 -translate-x-1/2 bg-slate-900 px-2.5 py-1 rounded border border-cyan-500/60 font-mono text-xs text-cyan-300">
                    A: <span className="font-extrabold">{current} A</span>
                  </div>
                </div>
              </div>

              {/* Ohm's Law formula */}
              <div className="bg-slate-800/80 p-3 rounded-lg flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-semibold">Định luật Ôm:</span>
                  <MathView math="I = \frac{U}{R}" />
                </div>
                <div>
                  Công suất đèn: <span className="font-mono text-amber-300 font-bold">{(voltage * current).toFixed(2)} W</span>
                </div>
              </div>
            </div>

            {/* Controls for Voltage and Resistance */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Điều chỉnh nguồn & điện trở</h4>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Hiệu điện thế nguồn U:</span>
                    <span className="font-mono font-bold text-cyan-700">{voltage} V</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="24.0"
                    step="1.5"
                    value={voltage}
                    onChange={(e) => setVoltage(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                    <span>1.5 V (Pin con thỏ)</span>
                    <span>12 V (Bình acquy)</span>
                    <span>24 V</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">Điện trở dây dẫn / tải R:</span>
                    <span className="font-mono font-bold text-amber-700">{resistance} Ω</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={resistance}
                    onChange={(e) => setResistance(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1.5">
                  <div className="font-semibold text-slate-800">Nhận xét định luật:</div>
                  <p className="text-slate-600">
                    - Cường độ dòng điện I tỉ lệ thuận với hiệu điện thế U (tăng U thì I tăng, đèn sáng mạnh hơn).
                  </p>
                  <p className="text-slate-600">
                    - Cường độ dòng điện I tỉ lệ nghịch với điện trở R (tăng R thì cản trở dòng điện nhiều hơn, I giảm).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. LEVER & TORQUE BALANCE LAB ================= */}
        {activeTab === "lever" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-slate-900 rounded-xl p-6 text-white border border-slate-800 flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-amber-400">Đòn Bẩy & Cân Bằng Moment Lực</span>
                <span className={`px-2 py-0.5 rounded font-mono font-bold ${isLeverBalanced ? "bg-emerald-900 text-emerald-300" : "bg-amber-900 text-amber-300"}`}>
                  {isLeverBalanced ? "TRẠNG THÁI CÂN BẰNG" : "ĐANG NGHIÊNG"}
                </span>
              </div>

              {/* Seesaw Stage */}
              <div className="h-60 my-4 bg-slate-950 rounded-xl border border-slate-800 relative flex flex-col items-center justify-center p-6 overflow-hidden">
                {/* Pivot triangle */}
                <div className="absolute bottom-10 w-0 h-0 border-l-[24px] border-l-transparent border-r-[24px] border-r-transparent border-b-[40px] border-b-slate-400 z-10" />

                {/* Tilting bar */}
                <div 
                  className="w-4/5 h-4 bg-amber-400 rounded-full transition-transform duration-500 relative flex items-center justify-between"
                  style={{
                    transform: `rotate(${Math.max(-15, Math.min(15, (Number(torque1) - Number(torque2)) * -12))}deg)`
                  }}
                >
                  {/* Left Weight F1 */}
                  <div 
                    className="absolute bottom-4 flex flex-col items-center"
                    style={{ left: `${50 - (d1 / 60) * 45}%` }}
                  >
                    <div className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                      F1 = {f1} N
                    </div>
                    <div className="w-1 h-3 bg-slate-400" />
                  </div>

                  {/* Pivot center marker O */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-900 rounded-full border-2 border-white" />

                  {/* Right Weight F2 */}
                  <div 
                    className="absolute bottom-4 flex flex-col items-center"
                    style={{ right: `${50 - (d2 / 60) * 45}%` }}
                  >
                    <div className="bg-cyan-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                      F2 = {f2} N
                    </div>
                    <div className="w-1 h-3 bg-slate-400" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-3 rounded-lg flex items-center justify-between text-xs text-slate-300 font-mono">
                <div>Vế trái M1 = F1 * d1 = <span className="text-rose-400 font-bold">{torque1} N.m</span></div>
                <div>Vế phải M2 = F2 * d2 = <span className="text-cyan-400 font-bold">{torque2} N.m</span></div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tuỳ chỉnh Đòn bẩy</h4>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-rose-700">Lực F1 (bên trái):</span>
                  <span className="font-mono font-bold">{f1} N (cách trục {d1} cm)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={f1}
                  onChange={(e) => setF1(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600 mb-2"
                />
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={d1}
                  onChange={(e) => setD1(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-cyan-700">Lực F2 (bên phải):</span>
                  <span className="font-mono font-bold">{f2} N (cách trục {d2} cm)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={f2}
                  onChange={(e) => setF2(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 mb-2"
                />
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={d2}
                  onChange={(e) => setD2(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. LAB REPORT NOTEBOOK ================= */}
        {activeTab === "report" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900">
                <span className="font-bold">Quy chuẩn Báo cáo Thực hành KHTN 8: </span>
                Mỗi báo cáo phải thể hiện rõ: Câu hỏi nghiên cứu, Giả thuyết, Biến số độc lập/phụ thuộc, Bảng dữ liệu thực nghiệm và Kết luận khoa học có bằng chứng.
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 shadow-sm">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  1. Câu hỏi nghiên cứu khoa học (Research Question)
                </label>
                <input
                  type="text"
                  value={reportQuestion}
                  onChange={(e) => setReportQuestion(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  2. Giả thuyết khoa học (Hypothesis)
                </label>
                <textarea
                  rows={2}
                  value={reportHypothesis}
                  onChange={(e) => setReportHypothesis(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  3. Phân tích kết quả & Kết luận (Claim - Evidence - Reasoning)
                </label>
                <textarea
                  rows={3}
                  value={reportConclusion}
                  onChange={(e) => setReportConclusion(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {reportSaved ? (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Đã lưu vào Portfolio học sinh & đồng bộ Sheets!
                    </span>
                  ) : (
                    "Dữ liệu được lưu với mã định danh học sinh chuẩn."
                  )}
                </span>
                <button
                  onClick={handleSaveReport}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Nộp Báo Cáo Thực Hành
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
