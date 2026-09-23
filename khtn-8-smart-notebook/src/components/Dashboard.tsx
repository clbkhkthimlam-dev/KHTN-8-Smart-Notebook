import React, { useState } from "react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from "recharts";
import { ALL_LESSONS } from "../data/lessonsData";
import { Discipline } from "../types";
import { 
  Zap, 
  FlaskConical, 
  Dna, 
  Award, 
  CheckCircle2, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity,
  Layers
} from "lucide-react";

interface DashboardProps {
  completedLessonIds: number[];
  selectedDiscipline?: Discipline | "all";
  onSelectDiscipline?: (discipline: Discipline | "all") => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  completedLessonIds,
  selectedDiscipline = "all",
  onSelectDiscipline
}) => {
  const [chartView, setChartView] = useState<"bar" | "pie" | "radar">("bar");

  // Filter lessons per discipline
  const physicsLessons = ALL_LESSONS.filter(l => l.discipline === "physics");
  const chemistryLessons = ALL_LESSONS.filter(l => l.discipline === "chemistry");
  const biologyLessons = ALL_LESSONS.filter(l => l.discipline === "biology");

  const completedPhysics = physicsLessons.filter(l => completedLessonIds.includes(l.id)).length;
  const completedChemistry = chemistryLessons.filter(l => completedLessonIds.includes(l.id)).length;
  const completedBiology = biologyLessons.filter(l => completedLessonIds.includes(l.id)).length;

  const totalLessons = ALL_LESSONS.length;
  const totalCompleted = completedLessonIds.length;
  const totalPercent = Math.round((totalCompleted / totalLessons) * 100) || 0;

  // Data for Bar Chart
  const disciplineData = [
    {
      discipline: "Vật lí",
      key: "physics" as Discipline,
      total: physicsLessons.length,
      completed: completedPhysics,
      remaining: physicsLessons.length - completedPhysics,
      percent: Math.round((completedPhysics / physicsLessons.length) * 100),
      color: "#3b82f6",
      range: "Bài 13 - 29"
    },
    {
      discipline: "Hóa học",
      key: "chemistry" as Discipline,
      total: chemistryLessons.length,
      completed: completedChemistry,
      remaining: chemistryLessons.length - completedChemistry,
      percent: Math.round((completedChemistry / chemistryLessons.length) * 100),
      color: "#a855f7",
      range: "Bài 1 - 12"
    },
    {
      discipline: "Sinh học",
      key: "biology" as Discipline,
      total: biologyLessons.length,
      completed: completedBiology,
      remaining: biologyLessons.length - completedBiology,
      percent: Math.round((completedBiology / biologyLessons.length) * 100),
      color: "#10b981",
      range: "Bài 30 - 47"
    }
  ];

  // Data for Pie Chart
  const pieData = [
    { name: "Vật lí hoàn thành", value: completedPhysics, color: "#3b82f6" },
    { name: "Hóa học hoàn thành", value: completedChemistry, color: "#a855f7" },
    { name: "Sinh học hoàn thành", value: completedBiology, color: "#10b981" },
    { name: "Chưa hoàn thành", value: totalLessons - totalCompleted, color: "#334155" }
  ];

  // Data for Radar Chart (Multi-dimensional mastery)
  const radarData = [
    { subject: "Vật lí (Lí)", mastery: Math.round((completedPhysics / physicsLessons.length) * 100), fullMark: 100 },
    { subject: "Hóa học (Hóa)", mastery: Math.round((completedChemistry / chemistryLessons.length) * 100), fullMark: 100 },
    { subject: "Sinh học (Sinh)", mastery: Math.round((completedBiology / biologyLessons.length) * 100), fullMark: 100 },
    { subject: "Thí nghiệm ảo", mastery: Math.min(100, totalPercent + 15), fullMark: 100 },
    { subject: "Hạt nhân tri thức", mastery: Math.min(100, totalPercent + 20), fullMark: 100 }
  ];

  // Custom tooltip for Bar Chart
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 border border-slate-700 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
          <div className="font-bold text-sm text-cyan-400">{data.discipline} ({data.range})</div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Đã hoàn thành:</span>
            <span className="font-bold text-emerald-400">{data.completed} / {data.total} bài</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-slate-400">Tỉ lệ đạt:</span>
            <span className="font-bold text-cyan-300">{data.percent}%</span>
          </div>
          <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800">
            Nhấp chuột để lọc danh sách bài học
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-md space-y-6">
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <BarChart3 className="w-4 h-4 text-cyan-400" /> Dashboard Thống Kê Tiến Độ KHTN 8 (Recharts)
          </div>
          <h2 className="text-lg sm:text-xl font-bold mt-0.5 text-white tracking-tight">
            Mức Độ Hoàn Thành Bài Học Theo Phân Môn
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Theo dõi phân bố 47 bài học trên 3 phân môn: Vật lí, Hóa học và Sinh học chuẩn GDPT 2018.
          </p>
        </div>

        {/* Chart View Toggle buttons */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs w-fit">
          <button
            onClick={() => setChartView("bar")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              chartView === "bar"
                ? "bg-cyan-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> Biểu đồ Cột
          </button>
          <button
            onClick={() => setChartView("pie")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              chartView === "pie"
                ? "bg-cyan-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <PieChartIcon className="w-3.5 h-3.5" /> Biểu đồ Tròn
          </button>
          <button
            onClick={() => setChartView("radar")}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              chartView === "radar"
                ? "bg-cyan-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Radar Năng Lực
          </button>
        </div>
      </div>

      {/* 3 Discipline Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Total Metric */}
        <div className="bg-slate-800/70 border border-slate-700/80 p-4 rounded-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">Toàn bộ 47 bài</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-white font-mono">
              {totalCompleted} <span className="text-xs text-slate-400 font-normal">/ {totalLessons}</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${totalPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-emerald-400 font-bold mt-1 text-right">
              {totalPercent}% hoàn thành
            </div>
          </div>
        </div>

        {/* Physics Card */}
        <div 
          onClick={() => onSelectDiscipline && onSelectDiscipline("physics")}
          className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
            selectedDiscipline === "physics" 
              ? "bg-blue-950/60 border-blue-500 ring-2 ring-blue-500/30" 
              : "bg-slate-800/70 border-slate-700/80 hover:border-blue-500/60"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Phân môn Vật lí
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Bài 13-29</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-blue-300 font-mono">
              {completedPhysics} <span className="text-xs text-slate-400 font-normal">/ 17 bài</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.round((completedPhysics / 17) * 100)}%` }}
              />
            </div>
            <div className="text-[11px] text-blue-400 font-bold mt-1 text-right">
              {Math.round((completedPhysics / 17) * 100)}% hoàn thành
            </div>
          </div>
        </div>

        {/* Chemistry Card */}
        <div 
          onClick={() => onSelectDiscipline && onSelectDiscipline("chemistry")}
          className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
            selectedDiscipline === "chemistry" 
              ? "bg-purple-950/60 border-purple-500 ring-2 ring-purple-500/30" 
              : "bg-slate-800/70 border-slate-700/80 hover:border-purple-500/60"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" /> Phân môn Hóa học
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Bài 1-12</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-purple-300 font-mono">
              {completedChemistry} <span className="text-xs text-slate-400 font-normal">/ 12 bài</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-purple-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.round((completedChemistry / 12) * 100)}%` }}
              />
            </div>
            <div className="text-[11px] text-purple-400 font-bold mt-1 text-right">
              {Math.round((completedChemistry / 12) * 100)}% hoàn thành
            </div>
          </div>
        </div>

        {/* Biology Card */}
        <div 
          onClick={() => onSelectDiscipline && onSelectDiscipline("biology")}
          className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
            selectedDiscipline === "biology" 
              ? "bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/30" 
              : "bg-slate-800/70 border-slate-700/80 hover:border-emerald-500/60"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Dna className="w-3.5 h-3.5" /> Phân môn Sinh học
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Bài 30-47</span>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-emerald-300 font-mono">
              {completedBiology} <span className="text-xs text-slate-400 font-normal">/ 18 bài</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.round((completedBiology / 18) * 100)}%` }}
              />
            </div>
            <div className="text-[11px] text-emerald-400 font-bold mt-1 text-right">
              {Math.round((completedBiology / 18) * 100)}% hoàn thành
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Stage */}
      <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
        {chartView === "bar" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-semibold text-slate-300">Biểu đồ so sánh số bài hoàn thành vs tổng số bài theo 3 phân môn</span>
              <span className="text-[11px] text-cyan-400">Đơn vị: Số bài học</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={disciplineData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  onClick={(e: any) => {
                    if (e && e.activePayload && e.activePayload.length) {
                      const clickedKey = e.activePayload[0].payload.key;
                      onSelectDiscipline && onSelectDiscipline(clickedKey);
                    }
                  }}
                >
                  <XAxis 
                    dataKey="discipline" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    domain={[0, 20]} 
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend 
                    wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} 
                  />
                  <Bar 
                    dataKey="completed" 
                    name="Đã hoàn thành" 
                    fill="#10b981" 
                    radius={[6, 6, 0, 0]} 
                  />
                  <Bar 
                    dataKey="total" 
                    name="Tổng số bài môn" 
                    fill="#475569" 
                    radius={[6, 6, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {chartView === "pie" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-7 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any, name: any) => [`${value} bài`, name]}
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="md:col-span-5 space-y-2.5 text-xs">
              <div className="font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>Cơ cấu tiến độ hoàn thành</span>
                <span className="font-mono text-cyan-400">{totalPercent}% / 100%</span>
              </div>
              <div className="space-y-1.5">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-300">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-white">{item.value} bài</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {chartView === "radar" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-7 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                  <PolarRadiusAxis stroke="#64748b" domain={[0, 100]} />
                  <Radar
                    name="Mức độ thành thạo (%)"
                    dataKey="mastery"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.4}
                  />
                  <Tooltip 
                    formatter={(val: any) => [`${val}%`, "Mức độ"]}
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="md:col-span-5 space-y-2 text-xs">
              <div className="font-bold text-slate-200 border-b border-slate-800 pb-2">
                Đánh giá năng lực tích hợp KHTN
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Biểu đồ radar phản ánh độ cân bằng kiến thức giữa các trục Vật lí, Hóa học, Sinh học và năng lực thực hành thí nghiệm ảo của học sinh.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-cyan-300">
                💡 <strong>Khuyến nghị:</strong> Duy trì tiến độ học tập đều đặn trên cả 3 phân môn để phát triển năng lực khoa học tự nhiên toàn diện.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
