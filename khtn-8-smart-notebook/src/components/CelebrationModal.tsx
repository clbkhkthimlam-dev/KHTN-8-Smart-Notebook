import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lesson } from "../types";
import { 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Zap, 
  FlaskConical, 
  Dna,
  RotateCcw
} from "lucide-react";
import { triggerLessonSuccessConfetti } from "../utils/confetti";

interface CelebrationModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onNextLesson?: () => void;
  totalCompleted: number;
  totalLessons: number;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  lesson,
  isOpen,
  onClose,
  onNextLesson,
  totalCompleted,
  totalLessons
}) => {
  if (!isOpen || !lesson) return null;

  const percent = Math.round((totalCompleted / totalLessons) * 100);

  const getDisciplineIcon = () => {
    switch (lesson.discipline) {
      case "physics": return <Zap className="w-4 h-4 text-blue-400" />;
      case "chemistry": return <FlaskConical className="w-4 h-4 text-purple-400" />;
      case "biology": return <Dna className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getDisciplineLabel = () => {
    switch (lesson.discipline) {
      case "physics": return "Phân môn Vật lí";
      case "chemistry": return "Phân môn Hóa học";
      case "biology": return "Phân môn Sinh học";
      default: return "Khoa học Tự nhiên 8";
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 rounded-3xl border border-cyan-500/40 shadow-2xl p-6 sm:p-7 text-white text-center overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800 transition-all z-10"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Glowing Animated Trophy Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
            className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/30 flex items-center justify-center"
          >
            <div className="w-full h-full bg-slate-900/90 rounded-[14px] flex items-center justify-center">
              <Trophy className="w-10 h-10 text-amber-400 drop-shadow-md" />
            </div>
            {/* Sparkle badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute -top-2 -right-2 text-yellow-300"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </motion.div>

          {/* Content Headings */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 space-y-1"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-bold text-cyan-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ĐÃ HOÀN THÀNH BÀI HỌC!
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
              Xuất Sắc! Chúc Mừng Em
            </h3>
            <p className="text-xs text-slate-300 line-clamp-2 px-2">
              Em đã chinh phục trọn vẹn mục tiêu và chuẩn YCCD của:
            </p>
            <div className="text-sm font-bold text-cyan-400 bg-slate-800/80 py-2 px-3 rounded-xl border border-slate-700/80 inline-block max-w-full truncate mt-1">
              {lesson.title}
            </div>
          </motion.div>

          {/* Gamification progress stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 grid grid-cols-2 gap-3 text-left"
          >
            <div>
              <span className="text-[11px] text-slate-400 font-medium">Tiến độ tích lũy</span>
              <div className="text-lg font-black text-white font-mono mt-0.5">
                {totalCompleted} <span className="text-xs text-slate-400 font-normal">/ {totalLessons} bài</span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-700" 
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 font-medium">Phân môn</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 mt-1">
                {getDisciplineIcon()}
                <span className="truncate">{getDisciplineLabel()}</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-mono mt-1 font-semibold">
                +10 Điểm Năng Lực KHTN
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5"
          >
            <button
              onClick={() => triggerLessonSuccessConfetti(0.5)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all active:scale-95"
              title="Bắn pháo hoa ăn mừng thêm một lần nữa!"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" /> Bắn pháo hoa 🎉
            </button>

            {onNextLesson && (
              <button
                onClick={() => {
                  onClose();
                  onNextLesson();
                }}
                className="w-full sm:w-auto flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-1.5 transition-all active:scale-95"
              >
                Học bài kế tiếp <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {!onNextLesson && (
              <button
                onClick={onClose}
                className="w-full sm:w-auto flex-1 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md transition-all active:scale-95"
              >
                Tiếp tục học tập
              </button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
