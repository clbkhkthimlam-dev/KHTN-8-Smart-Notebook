import React from "react";
import { 
  Zap, 
  FlaskConical, 
  Dna, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Award,
  Layers
} from "lucide-react";
import { Discipline, KHTN8_DISCIPLINES, getDisciplineBadge } from "../types";

interface DisciplineCardsProps {
  selectedDiscipline: Discipline | "all";
  onSelectDiscipline: (discipline: Discipline | "all") => void;
  completedLessonIds: number[];
}

export const DisciplineCards: React.FC<DisciplineCardsProps> = ({
  selectedDiscipline,
  onSelectDiscipline,
  completedLessonIds
}) => {
  // Count completed lessons per discipline
  const chemistryCompleted = completedLessonIds.filter(id => id >= 1 && id <= 12).length;
  const physicsCompleted = completedLessonIds.filter(id => id >= 13 && id <= 29).length;
  const biologyCompleted = completedLessonIds.filter(id => id >= 30 && id <= 47).length;

  const disciplinesList: {
    id: Discipline;
    icon: typeof Zap;
    completed: number;
    total: number;
    highlights: string[];
    gradientBorder: string;
    activeRing: string;
    iconBg: string;
    iconColor: string;
  }[] = [
    {
      id: "physics",
      icon: Zap,
      completed: physicsCompleted,
      total: 17,
      highlights: [
        "Khối lượng riêng & Áp suất (D = m/V, p = F/S)",
        "Lực đẩy Archimedes & Đòn bẩy (Moment lực)",
        "Mạch điện đơn giản, Cường độ I & Hiệu điện thế U",
        "Năng lượng nhiệt, Sự truyền nhiệt & Nở vì nhiệt"
      ],
      gradientBorder: "from-blue-500 to-cyan-500",
      activeRing: "ring-2 ring-blue-500 bg-blue-50/50",
      iconBg: "bg-blue-100 text-blue-700",
      iconColor: "text-blue-600"
    },
    {
      id: "chemistry",
      icon: FlaskConical,
      completed: chemistryCompleted,
      total: 12,
      highlights: [
        "Biến đổi hoá học, Định luật bảo toàn khối lượng",
        "Khái niệm Mol, Tỉ khối chất khí & Nồng độ dd (C%, CM)",
        "Tốc độ phản ứng & Chất xúc tác",
        "Acid, Base, Thang pH, Oxide, Muối, Phân bón"
      ],
      gradientBorder: "from-purple-500 to-amber-500",
      activeRing: "ring-2 ring-purple-500 bg-purple-50/50",
      iconBg: "bg-purple-100 text-purple-700",
      iconColor: "text-purple-600"
    },
    {
      id: "biology",
      icon: Dna,
      completed: biologyCompleted,
      total: 18,
      highlights: [
        "Giải phẫu & Sinh lý 8 hệ cơ quan người",
        "Dinh dưỡng, Tiêu hoá, Máu & Tuần hoàn, Hô hấp, Thần kinh",
        "Điều hoà thân nhiệt, Cân bằng môi trường trong",
        "Sinh vật & Môi trường, Quần thể, Quần xã, Hệ sinh thái"
      ],
      gradientBorder: "from-emerald-500 to-teal-500",
      activeRing: "ring-2 ring-emerald-500 bg-emerald-50/50",
      iconBg: "bg-emerald-100 text-emerald-700",
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-700" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            3 Lĩnh Vực Khoa Học Cốt Lõi (GDPT 2018):
          </h3>
        </div>

        <button
          onClick={() => onSelectDiscipline("all")}
          className={`text-xs px-3 py-1 rounded-lg font-semibold transition-all self-start sm:self-auto ${
            selectedDiscipline === "all"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-200 bg-slate-100"
          }`}
        >
          Xem tất cả 3 phân môn (47 bài)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {disciplinesList.map((disc) => {
          const info = KHTN8_DISCIPLINES[disc.id];
          const Icon = disc.icon;
          const isSelected = selectedDiscipline === disc.id;
          const percent = Math.round((disc.completed / disc.total) * 100);

          return (
            <div
              key={disc.id}
              onClick={() => onSelectDiscipline(isSelected ? "all" : disc.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden bg-white shadow-2xs hover:shadow-md ${
                isSelected
                  ? `${disc.activeRing} border-transparent`
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Top Accent Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${disc.gradientBorder}`}
              />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shadow-2xs ${disc.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">{info.name}</h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-bold">
                          {info.shortName}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {info.lessonRange} ({info.totalLessons} bài)
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
                  }`}>
                    {isSelected ? "Đang chọn" : "Bấm để lọc"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {info.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-1 mb-3">
                  {disc.highlights.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                      <span className="text-slate-400 mt-0.5">•</span>
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress & Chapters Count */}
              <div className="pt-2.5 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="text-slate-500">Tiến độ phân môn:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {disc.completed}/{disc.total} bài ({percent}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${disc.gradientBorder} transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
