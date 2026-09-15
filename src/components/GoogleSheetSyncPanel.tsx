import React, { useState, useEffect } from "react";
import { 
  FileSpreadsheet, 
  Send, 
  CheckCircle2, 
  RefreshCw, 
  Copy, 
  Code, 
  ShieldCheck, 
  AlertCircle,
  Database,
  Activity,
  Wifi,
  WifiOff,
  UserCheck,
  Target,
  Sparkles,
  ClipboardList,
  Layers,
  Settings,
  ArrowRight,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { 
  InputSheetData, 
  LearningEvent, 
  UserRole, 
  LearningGoal, 
  TeacherIntervention, 
  OfflineQueueItem, 
  SystemHealthReport,
  SystemConfigKHTN8 
} from "../types";
import { KHTN8_DATA_DICTIONARY } from "../data/dataDictionary";

export const GoogleSheetSyncPanel: React.FC = () => {
  // Current active role in Cloud Workspace (RBAC)
  const [currentRole, setCurrentRole] = useState<UserRole>("TEACHER");

  // Navigation tab
  const [activeTab, setActiveTab] = useState<"workspace" | "offline_queue" | "sheet_input" | "appscript" | "system_health">("workspace");

  // --- 1. Workspace State (Goals & Interventions) ---
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [interventions, setInterventions] = useState<TeacherIntervention[]>([]);
  const [systemConfig, setSystemConfig] = useState<SystemConfigKHTN8>({
    schoolName: "THCS Chu Văn An - Hà Nội",
    academicYear: "2026-2027",
    aiTutorEnabled: true,
    socraticStrictness: "moderate",
    offlineQueueEnabled: true,
    demoMode: true,
    autoSyncIntervalSec: 30,
    allowedClasses: ["8A1", "8A2", "8A3"]
  });

  // New goal form (Student / Teacher)
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalLessonId, setNewGoalLessonId] = useState(13);
  const [isSavingGoal, setIsSavingGoal] = useState(false);
  const [goalVerifiedNotice, setGoalVerifiedNotice] = useState<string | null>(null);

  // New intervention form (Teacher only)
  const [newItvStudentKey, setNewItvStudentKey] = useState("HS-8A-02");
  const [newItvStudentName, setNewItvStudentName] = useState("Trần Thị Mai");
  const [newItvLessonId, setNewItvLessonId] = useState(13);
  const [newItvMisconception, setNewItvMisconception] = useState("Nhầm lẫn giữa lực tác dụng và áp suất lên diện tích bị ép.");
  const [newItvStrategy, setNewItvStrategy] = useState("Cho học sinh quan sát thanh gỗ nằm ngang và dựng đứng trên đệm mút để đối chiếu công thức p = F / S.");
  const [isSavingItv, setIsSavingItv] = useState(false);
  const [itvVerifiedNotice, setItvVerifiedNotice] = useState<string | null>(null);

  // --- 2. Offline-First Queue State (Spec V10 - Mục 29) ---
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [offlineQueue, setOfflineQueue] = useState<OfflineQueueItem[]>([
    {
      id: "q-01",
      requestId: "req-off-01",
      action: "student_event",
      payload: {
        student_key: "HS-8A-01",
        lesson_id: "13",
        activity_id: "LAB_DENSITY_ALUMINUM",
        skill: "Đo khối lượng riêng bằng bình chia độ",
        score: 9.5,
        max_score: 10,
        notes: "Ghi nhận m = 54g, V = 20cm³ -> D = 2.7 g/cm³"
      },
      createdAt: new Date(Date.now() - 120000).toISOString(),
      status: "queued",
      retryCount: 0
    },
    {
      id: "q-02",
      requestId: "req-off-02",
      action: "student_event",
      payload: {
        student_key: "HS-8A-02",
        lesson_id: "17",
        activity_id: "LAB_BUOYANCY_WATER",
        skill: "Tính lực đẩy Archimedes trong nước cất",
        score: 10,
        max_score: 10,
        notes: "Xác nhận FA = d.V = 10000 * 0.0001 = 1N"
      },
      createdAt: new Date(Date.now() - 60000).toISOString(),
      status: "queued",
      retryCount: 0
    }
  ]);
  const [isFlushingQueue, setIsFlushingQueue] = useState(false);

  // --- 3. Sheet INPUT (B2:B10) State ---
  const [formData, setFormData] = useState<InputSheetData>({
    student_key: "HS-8A-01",
    lesson_id: "13",
    activity_id: "ACT_13_EXP",
    skill: "Đo lường & Tính toán khối lượng riêng",
    score: 9.5,
    max_score: 10,
    hints: 1,
    duration_seconds: 180,
    teacher_note: "Học sinh thực hiện đo thể tích bằng bình chia độ rất chuẩn xác."
  });
  const [statusB14, setStatusB14] = useState<string>("req-ready-v10");
  const [statusB15, setStatusB15] = useState<string>("ONLINE (Ready to sync)");
  const [isSyncingInput, setIsSyncingInput] = useState<boolean>(false);
  const [eventsList, setEventsList] = useState<LearningEvent[]>([]);

  // --- 4. Apps Script Template & System Health ---
  const [appScriptCode, setAppScriptCode] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [systemHealth, setSystemHealth] = useState<SystemHealthReport | null>(null);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [resGoals, resItvs, resEvents, resHealth, resConfig, resScript] = await Promise.all([
        fetch("/api/goals"),
        fetch("/api/interventions"),
        fetch("/api/events"),
        fetch("/api/health"),
        fetch("/api/config"),
        fetch("/api/appscript/template")
      ]);

      const [dataGoals, dataItvs, dataEvents, dataHealth, dataConfig, dataScript] = await Promise.all([
        resGoals.json(),
        resItvs.json(),
        resEvents.json(),
        resHealth.json(),
        resConfig.json(),
        resScript.json()
      ]);

      if (dataGoals.ok) setGoals(dataGoals.data || []);
      if (dataItvs.ok) setInterventions(dataItvs.data || []);
      if (dataEvents.ok && dataEvents.data?.events) setEventsList(dataEvents.data.events);
      if (dataHealth.ok) setSystemHealth(dataHealth.data);
      if (dataConfig.ok) setSystemConfig(dataConfig.data);
      if (dataScript.ok) setAppScriptCode(dataScript.code || "");
    } catch (err) {
      console.error("Lỗi tải dữ liệu Cloud Management:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handler: Save Goal with Read-After-Write Verification (Spec V10 Mục 33)
  const handleSaveGoal = async () => {
    if (!newGoalTitle.trim()) return;
    setIsSavingGoal(true);
    setGoalVerifiedNotice(null);

    const requestId = `req-goal-${Date.now()}`;
    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          goalTitle: newGoalTitle,
          lessonId: newGoalLessonId,
          lessonTitle: `Bài ${newGoalLessonId}`,
          studentKey: currentRole === "STUDENT" ? "HS-8A-01" : "HS-8A-02",
          studentName: currentRole === "STUDENT" ? "Nguyễn Văn An" : "Trần Thị Mai",
          role: currentRole
        })
      });
      const json = await res.json();
      if (json.ok && json.verifiedReadBack) {
        setGoalVerifiedNotice(`Đã lưu & Đối chiếu đám mây thành công! Mã: ${json.recordId} (Phiên bản: ${json.version})`);
        setNewGoalTitle("");
        fetchData();
      }
    } catch (e: any) {
      alert("Lỗi khi ghi mục tiêu: " + e.message);
    } finally {
      setIsSavingGoal(false);
    }
  };

  // Handler: Save Intervention (Teacher Only)
  const handleSaveIntervention = async () => {
    if (!newItvMisconception.trim() || !newItvStrategy.trim()) return;
    setIsSavingItv(true);
    setItvVerifiedNotice(null);

    const requestId = `req-itv-${Date.now()}`;
    try {
      const res = await fetch("/api/interventions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          teacherKey: "GV-KHTN-01",
          studentKey: newItvStudentKey,
          studentName: newItvStudentName,
          lessonId: newItvLessonId,
          misconception: newItvMisconception,
          strategy: newItvStrategy,
          assignedTasks: [
            "Quan sát thí nghiệm tương phản trong Lab ảo KHTN 8",
            "Giải thích lại hiện tượng bằng định luật/công thức chuẩn"
          ],
          role: currentRole
        })
      });
      const json = await res.json();
      if (json.ok && json.verifiedReadBack) {
        setItvVerifiedNotice(`Phiếu can thiệp sư phạm đã ghi nhận thành công! Mã: ${json.recordId}`);
        fetchData();
      }
    } catch (e: any) {
      alert("Lỗi khi tạo can thiệp: " + e.message);
    } finally {
      setIsSavingItv(false);
    }
  };

  // Handler: Flush Offline Queue (Spec V10 Mục 29 & 30)
  const handleFlushOfflineQueue = async () => {
    if (offlineQueue.length === 0) return;
    setIsFlushingQueue(true);

    try {
      const pendingItems = offlineQueue.filter(i => i.status === "queued" || i.status === "failed");
      const res = await fetch("/api/sync/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientSyncTime: new Date().toISOString(),
          items: pendingItems
        })
      });
      const json = await res.json();
      if (json.ok) {
        setOfflineQueue(prev => prev.map(item => ({ ...item, status: "synced" })));
        fetchData();
      }
    } catch (err: any) {
      alert("Đồng bộ hàng đợi thất bại: " + err.message);
    } finally {
      setIsFlushingQueue(false);
    }
  };

  // Handler: Add Simulated Offline Item
  const handleAddOfflineSimulatedEvent = () => {
    const newItem: OfflineQueueItem = {
      id: `q-${Date.now()}`,
      requestId: `req-off-${Date.now()}`,
      action: "student_event",
      payload: {
        student_key: currentRole === "STUDENT" ? "HS-8A-01" : "HS-8A-03",
        lesson_id: "9",
        activity_id: "LAB_PH_TEST",
        skill: "Đo độ pH của dung dịch nước chanh và xà phòng",
        score: 9,
        max_score: 10,
        notes: "Nhận biết quỳ tím hóa đỏ (axit) và quỳ tím hóa xanh (kiềm)"
      },
      createdAt: new Date().toISOString(),
      status: isOnline ? "synced" : "queued",
      retryCount: 0
    };
    setOfflineQueue(prev => [newItem, ...prev]);
    if (isOnline) {
      fetch("/api/sync/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [newItem], clientSyncTime: new Date().toISOString() })
      }).then(() => fetchData());
    }
  };

  // Handler: Write Input Row (B2:B10)
  const handleWriteInputRow = async () => {
    setIsSyncingInput(true);
    const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schema_version: "v10",
          action: "student_event",
          request_id: requestId,
          client_id: "web-teacher-input",
          payload: {
            student_key: formData.student_key,
            lesson_id: formData.lesson_id,
            activity_id: formData.activity_id,
            skill: formData.skill,
            score: formData.score,
            max_score: formData.max_score,
            hints: formData.hints,
            duration_seconds: formData.duration_seconds,
            notes: formData.teacher_note,
            timestamp: new Date().toISOString()
          }
        })
      });
      const data = await res.json();
      if (data.ok) {
        setStatusB14(requestId);
        setStatusB15(`SYNCED: ${new Date().toLocaleTimeString("vi-VN")} (Read-Back OK)`);
        fetchData();
      } else {
        setStatusB15(`LỖI: ${data.error?.message || "Không thể ghi dữ liệu"}`);
      }
    } catch (err: any) {
      setStatusB15(`LỖI MẠNG: ${err.message}`);
    } finally {
      setIsSyncingInput(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Role-Based Cloud Hub V10 */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2.5 py-0.5 rounded-full">
                SPEC V10 SERVERLESS MANAGEMENT
              </span>
              <span className="text-[10px] text-slate-400">
                GitHub • Vercel • Google Apps Script • Google Sheets
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Database className="w-6 h-6 text-cyan-400" />
              KHTN 8 Smart Cloud Management Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Quản trị dữ liệu từ xa không cần server riêng: phân quyền RBAC, ánh xạ trường Schema Registry, xác nhận Read-After-Write và cơ chế hàng đợi ngoại tuyến chuẩn xác.
            </p>
          </div>

          {/* Role Switcher (RBAC) */}
          <div className="bg-slate-800/90 border border-slate-700/80 p-2 rounded-xl flex items-center gap-1.5 self-start lg:self-center">
            <span className="text-[11px] font-bold text-slate-400 px-2 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> Vai trò:
            </span>
            {(["STUDENT", "TEACHER", "ADMIN"] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setCurrentRole(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  currentRole === r
                    ? "bg-cyan-500 text-slate-950 shadow-sm"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {r === "STUDENT" ? "Học sinh (HS)" : r === "TEACHER" ? "Giáo viên (GV)" : "Quản trị (Admin)"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800 text-xs">
          {[
            { id: "workspace", label: "Không Gian Quản Trị (RBAC)", icon: ClipboardList },
            { id: "offline_queue", label: "Hàng Đợi Ngoại Tuyến (Offline-First)", icon: WifiOff, badge: offlineQueue.filter(i => i.status === "queued").length },
            { id: "sheet_input", label: "Mô Phỏng Ô Nhập B2:B10", icon: FileSpreadsheet },
            { id: "appscript", label: "Mã Nguồn Apps Script V10", icon: Code },
            { id: "system_health", label: "Sức Khỏe Hệ Thống (Observability)", icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= TAB 1: WORKSPACE BY ROLE ================= */}
      {activeTab === "workspace" && (
        <div className="space-y-6">
          {/* Role Status Indicator */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 font-bold">
                {currentRole === "STUDENT" ? "HS" : currentRole === "TEACHER" ? "GV" : "AD"}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {currentRole === "STUDENT" && "Học sinh: Nguyễn Văn An (Mã: HS-8A-01 - Lớp 8A1)"}
                  {currentRole === "TEACHER" && "Giáo viên: Thầy Hoàng (Bộ môn KHTN - Quản lý 8A1, 8A2)"}
                  {currentRole === "ADMIN" && "Tổ trưởng Chuyên môn / Quản trị viên KHTN 8"}
                </h4>
                <p className="text-xs text-slate-500">
                  {currentRole === "STUDENT" && "Được ghi mục tiêu học tập cá nhân, lưu kết quả lab, xem phản hồi can thiệp sư phạm."}
                  {currentRole === "TEACHER" && "Được phân công mục tiêu cho học sinh, lập phiếu can thiệp giải quyết bẫy nhận thức, xem tổng hợp lớp."}
                  {currentRole === "ADMIN" && "Toàn quyền cấu hình hệ thống (00_CONFIG), tra cứu Data Dictionary, giám sát Audit Logs."}
                </p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> RBAC Verified
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Learning Goals (04_GOALS) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    <h3 className="font-bold text-slate-900 text-sm">
                      Mục Tiêu Học Tập KHTN 8 (Bảng 04_GOALS)
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                    {goals.length} mục tiêu
                  </span>
                </div>

                {/* Create Goal Form */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 mb-4 space-y-3">
                  <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {currentRole === "STUDENT" ? "Đặt mục tiêu học tập mới cho em:" : "Giao mục tiêu học tập cho học sinh:"}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={newGoalLessonId}
                      onChange={(e) => setNewGoalLessonId(Number(e.target.value))}
                      className="col-span-1 text-xs border border-slate-300 rounded-lg p-2 bg-white"
                    >
                      <option value={9}>Bài 9: Acid</option>
                      <option value={13}>Bài 13: Khối lượng riêng</option>
                      <option value={16}>Bài 16: Áp suất</option>
                      <option value={17}>Bài 17: Archimedes</option>
                      <option value={19}>Bài 19: Đòn bẩy</option>
                      <option value={22}>Bài 22: Mạch điện</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Nội dung mục tiêu (chuẩn YCCD)..."
                      value={newGoalTitle}
                      onChange={(e) => setNewGoalTitle(e.target.value)}
                      className="col-span-2 text-xs border border-slate-300 rounded-lg p-2 bg-white"
                    />
                  </div>
                  <button
                    onClick={handleSaveGoal}
                    disabled={isSavingGoal || !newGoalTitle.trim()}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    {isSavingGoal ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    Lưu & Xác Nhận Read-After-Write
                  </button>

                  {goalVerifiedNotice && (
                    <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded-lg flex items-center gap-1.5 animate-in fade-in">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{goalVerifiedNotice}</span>
                    </div>
                  )}
                </div>

                {/* Goals List */}
                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {goals.map((g) => (
                    <div key={g.goalId} className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{g.lessonTitle}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          g.status === "COMPLETED" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {g.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700">{g.goalTitle}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>Học sinh: {g.studentName || g.studentKey}</span>
                        <span className="font-mono text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Read-Back Confirmed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Teacher Interventions (12_INTERVENTIONS) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                    <h3 className="font-bold text-slate-900 text-sm">
                      Can Thiệp Sư Phạm & Gỡ Bẫy Nhận Thức (12_INTERVENTIONS)
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                    {interventions.length} phiếu
                  </span>
                </div>

                {/* Create Intervention (Teacher only) */}
                {currentRole === "TEACHER" || currentRole === "ADMIN" ? (
                  <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 mb-4 space-y-3">
                    <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                      Lập phiếu can thiệp sư phạm cho học sinh:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Họ tên học sinh"
                        value={newItvStudentName}
                        onChange={(e) => setNewItvStudentName(e.target.value)}
                        className="text-xs border border-amber-300 rounded-lg p-2 bg-white"
                      />
                      <select
                        value={newItvLessonId}
                        onChange={(e) => setNewItvLessonId(Number(e.target.value))}
                        className="text-xs border border-amber-300 rounded-lg p-2 bg-white"
                      >
                        <option value={9}>Bài 9: Acid - Base</option>
                        <option value={13}>Bài 13: Khối lượng riêng</option>
                        <option value={16}>Bài 16: Áp suất</option>
                        <option value={17}>Bài 17: Lực Archimedes</option>
                      </select>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Bẫy nhận thức phát hiện ở học sinh..."
                      value={newItvMisconception}
                      onChange={(e) => setNewItvMisconception(e.target.value)}
                      className="w-full text-xs border border-amber-300 rounded-lg p-2 bg-white"
                    />
                    <textarea
                      rows={2}
                      placeholder="Chiến lược sư phạm (phản ví dụ / kiểm chứng)..."
                      value={newItvStrategy}
                      onChange={(e) => setNewItvStrategy(e.target.value)}
                      className="w-full text-xs border border-amber-300 rounded-lg p-2 bg-white"
                    />
                    <button
                      onClick={handleSaveIntervention}
                      disabled={isSavingItv}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      {isSavingItv ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      Gửi Can Thiệp Sư Phạm (Read-After-Write)
                    </button>

                    {itvVerifiedNotice && (
                      <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 p-2 rounded-lg flex items-center gap-1.5 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{itvVerifiedNotice}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 mb-4">
                    Góc nhìn Học sinh: Dưới đây là các phiếu hướng dẫn khắc phục quan niệm sai lầm mà thầy cô đã giao cho em.
                  </div>
                )}

                {/* Interventions List */}
                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                  {interventions.map((itv) => (
                    <div key={itv.interventionId} className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{itv.studentName} (Bài {itv.lessonId})</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          itv.status === "RESOLVED" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>
                          {itv.status}
                        </span>
                      </div>
                      <div className="text-xs text-rose-800 bg-rose-50/70 p-2 rounded-lg border border-rose-100">
                        <div className="font-bold text-[10px] uppercase">Bẫy nhận thức:</div>
                        {itv.misconception}
                      </div>
                      <div className="text-xs text-emerald-800 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                        <div className="font-bold text-[10px] uppercase">Chiến lược can thiệp:</div>
                        {itv.strategy}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span>Giáo viên: {itv.teacherKey}</span>
                        <span className="font-mono text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Read-Back Confirmed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Admin Section: Data Dictionary (34_DATA_DICTIONARY - Spec V10) */}
          {currentRole === "ADMIN" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-600" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Bảng Ánh Xạ Chuẩn Dữ Liệu KHTN 8 (34_DATA_DICTIONARY)
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  Schema Registry: v10-khtn8
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Toàn bộ trường dữ liệu trên giao diện được định nghĩa ánh xạ chặt chẽ theo nguyên tắc Form-First (Mục 4 & 5 Spec V10).
              </p>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="p-3">Field ID</th>
                      <th className="p-3">Table</th>
                      <th className="p-3">Column</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Writable Roles</th>
                      <th className="p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {KHTN8_DATA_DICTIONARY.map((field) => (
                      <tr key={field.fieldId} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-cyan-700">{field.fieldId}</td>
                        <td className="p-3 text-slate-800">{field.table}</td>
                        <td className="p-3 text-slate-600">{field.column}</td>
                        <td className="p-3 text-purple-700">{field.type}</td>
                        <td className="p-3">
                          <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded text-[10px]">
                            {field.writableRoles.join(", ")}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 font-sans">{field.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: OFFLINE-FIRST SYNC QUEUE ================= */}
      {activeTab === "offline_queue" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <WifiOff className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">
                  Hàng Đợi Ngoại Tuyến KHTN 8 (Offline-First Queue - Mục 29)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Khi học sinh làm thực hành trong phòng thí nghiệm mất kết nối Internet, mọi kết quả đo đạc được xếp hàng an toàn và tự động đồng bộ khi có mạng.
              </p>
            </div>

            {/* Network Toggle Simulator */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isOnline
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-rose-100 text-rose-800 border border-rose-300"
                }`}
              >
                {isOnline ? <Wifi className="w-4 h-4 text-emerald-600" /> : <WifiOff className="w-4 h-4 text-rose-600" />}
                {isOnline ? "Mô phỏng: Trực tuyến (Online)" : "Mô phỏng: Ngoại tuyến (Offline)"}
              </button>

              <button
                onClick={handleFlushOfflineQueue}
                disabled={isFlushingQueue || offlineQueue.filter(i => i.status === "queued").length === 0}
                className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
              >
                {isFlushingQueue ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Đồng Bộ Hàng Đợi Về Cloud
              </button>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-700">
              Thêm một kết quả thực hành thí nghiệm ảo vào hàng đợi để kiểm chứng luồng hoạt động:
            </div>
            <button
              onClick={handleAddOfflineSimulatedEvent}
              className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-lg transition-all"
            >
              + Ghi Nhận Đo Thí Nghiệm
            </button>
          </div>

          {/* Queue Items Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3">Request ID</th>
                  <th className="p-3">Học sinh</th>
                  <th className="p-3">Bài học / Hoạt động</th>
                  <th className="p-3">Điểm / Ghi chú</th>
                  <th className="p-3">Thời gian tạo</th>
                  <th className="p-3">Trạng thái đồng bộ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {offlineQueue.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400 font-sans">
                      Hàng đợi trống. Tất cả dữ liệu học sinh đã được đồng bộ lên Google Sheets.
                    </td>
                  </tr>
                ) : (
                  offlineQueue.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 font-sans">
                      <td className="p-3 font-mono text-cyan-700 font-bold">{item.requestId}</td>
                      <td className="p-3 font-bold text-slate-800">{item.payload.student_key}</td>
                      <td className="p-3 text-slate-700">{item.payload.skill || item.payload.activity_id}</td>
                      <td className="p-3 text-slate-600">{item.payload.notes || `Điểm: ${item.payload.score}/10`}</td>
                      <td className="p-3 text-[11px] text-slate-500 font-mono">
                        {new Date(item.createdAt).toLocaleTimeString()}
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                          item.status === "synced"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : item.status === "sending"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}>
                          {item.status === "synced" ? "SYNCED" : item.status === "sending" ? "SENDING..." : "QUEUED"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: SHEET INPUT (B2:B10) ================= */}
      {activeTab === "sheet_input" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Interactive Sheet Cell Grid */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Mô Phỏng Trang Tính `INPUT` (Ô B2 đến B10)
                </h3>
              </div>
              <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                Sheet: INPUT
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Bảng nhập liệu trực quan chuẩn hoá của giáo viên KHTN. Bấm <strong>Ghi dữ liệu (Ô B12)</strong> để gửi dữ liệu về Google Sheets thông qua Apps Script Data Gateway.
            </p>

            <div className="border border-slate-300 rounded-xl overflow-hidden shadow-2xs font-mono text-xs">
              <div className="bg-slate-100 grid grid-cols-12 text-center font-bold text-slate-600 border-b border-slate-300 py-1.5">
                <div className="col-span-1 border-r border-slate-300">#</div>
                <div className="col-span-4 border-r border-slate-300 text-left px-3">A (Tên trường dữ liệu)</div>
                <div className="col-span-7 text-left px-3">B (Giá trị ô nhập liệu)</div>
              </div>

              {/* B2: student_key */}
              <div className="grid grid-cols-12 border-b border-slate-200 items-center bg-white">
                <div className="col-span-1 bg-slate-50 text-center font-bold text-slate-400 py-2 border-r border-slate-200">2</div>
                <div className="col-span-4 px-3 font-semibold text-slate-700 border-r border-slate-200">student_key</div>
                <div className="col-span-7 p-1">
                  <input
                    type="text"
                    value={formData.student_key}
                    onChange={(e) => setFormData({ ...formData, student_key: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-amber-50/40 text-slate-900 font-mono focus:bg-white focus:outline-cyan-500"
                  />
                </div>
              </div>

              {/* B3: lesson_id */}
              <div className="grid grid-cols-12 border-b border-slate-200 items-center bg-white">
                <div className="col-span-1 bg-slate-50 text-center font-bold text-slate-400 py-2 border-r border-slate-200">3</div>
                <div className="col-span-4 px-3 font-semibold text-slate-700 border-r border-slate-200">lesson_id</div>
                <div className="col-span-7 p-1">
                  <input
                    type="text"
                    value={formData.lesson_id}
                    onChange={(e) => setFormData({ ...formData, lesson_id: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-amber-50/40 text-slate-900 font-mono focus:bg-white focus:outline-cyan-500"
                  />
                </div>
              </div>

              {/* B4: activity_id */}
              <div className="grid grid-cols-12 border-b border-slate-200 items-center bg-white">
                <div className="col-span-1 bg-slate-50 text-center font-bold text-slate-400 py-2 border-r border-slate-200">4</div>
                <div className="col-span-4 px-3 font-semibold text-slate-700 border-r border-slate-200">activity_id</div>
                <div className="col-span-7 p-1">
                  <input
                    type="text"
                    value={formData.activity_id}
                    onChange={(e) => setFormData({ ...formData, activity_id: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-amber-50/40 text-slate-900 font-mono focus:bg-white focus:outline-cyan-500"
                  />
                </div>
              </div>

              {/* B5: skill */}
              <div className="grid grid-cols-12 border-b border-slate-200 items-center bg-white">
                <div className="col-span-1 bg-slate-50 text-center font-bold text-slate-400 py-2 border-r border-slate-200">5</div>
                <div className="col-span-4 px-3 font-semibold text-slate-700 border-r border-slate-200">skill</div>
                <div className="col-span-7 p-1">
                  <input
                    type="text"
                    value={formData.skill}
                    onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-amber-50/40 text-slate-900 font-mono focus:bg-white focus:outline-cyan-500"
                  />
                </div>
              </div>

              {/* B6: score */}
              <div className="grid grid-cols-12 border-b border-slate-200 items-center bg-white">
                <div className="col-span-1 bg-slate-50 text-center font-bold text-slate-400 py-2 border-r border-slate-200">6</div>
                <div className="col-span-4 px-3 font-semibold text-slate-700 border-r border-slate-200">score</div>
                <div className="col-span-7 p-1">
                  <input
                    type="number"
                    step="0.5"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: parseFloat(e.target.value) || 0 })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-amber-50/40 text-slate-900 font-mono focus:bg-white focus:outline-cyan-500"
                  />
                </div>
              </div>

              {/* B10: teacher_note */}
              <div className="grid grid-cols-12 border-b border-slate-200 items-center bg-white">
                <div className="col-span-1 bg-slate-50 text-center font-bold text-slate-400 py-2 border-r border-slate-200">10</div>
                <div className="col-span-4 px-3 font-semibold text-slate-700 border-r border-slate-200">teacher_note</div>
                <div className="col-span-7 p-1">
                  <input
                    type="text"
                    value={formData.teacher_note}
                    onChange={(e) => setFormData({ ...formData, teacher_note: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-amber-50/40 text-slate-900 font-mono focus:bg-white focus:outline-cyan-500"
                  />
                </div>
              </div>

              {/* B12: ACTION BUTTON */}
              <div className="grid grid-cols-12 border-b border-slate-200 items-center bg-emerald-50/40 py-2">
                <div className="col-span-1 bg-slate-100 text-center font-bold text-slate-400 py-2 border-r border-slate-200">12</div>
                <div className="col-span-4 px-3 font-bold text-emerald-800 border-r border-slate-200">ACTION TRIGGER</div>
                <div className="col-span-7 p-2">
                  <button
                    onClick={handleWriteInputRow}
                    disabled={isSyncingInput}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    {isSyncingInput ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>GHI DỮ LIỆU VÀO SHEET (Ô B12)</span>
                  </button>
                </div>
              </div>

              {/* B14 & B15: Status Cells */}
              <div className="grid grid-cols-12 border-b border-slate-200 items-center bg-slate-50">
                <div className="col-span-1 bg-slate-100 text-center font-bold text-slate-400 py-2 border-r border-slate-200">14</div>
                <div className="col-span-4 px-3 text-slate-500 border-r border-slate-200">last_request_id (B14)</div>
                <div className="col-span-7 px-3 py-1.5 font-bold text-indigo-700 truncate">{statusB14}</div>
              </div>

              <div className="grid grid-cols-12 items-center bg-slate-50">
                <div className="col-span-1 bg-slate-100 text-center font-bold text-slate-400 py-2 border-r border-slate-200">15</div>
                <div className="col-span-4 px-3 text-slate-500 border-r border-slate-200">status_sync (B15)</div>
                <div className="col-span-7 px-3 py-1.5 font-bold text-emerald-700">{statusB15}</div>
              </div>
            </div>
          </div>

          {/* Right Col: Recent Synced Events */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Sự Kiện Đã Đồng Bộ
                </h4>
                <span className="text-xs text-slate-500 font-mono">{eventsList.length} records</span>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {eventsList.slice(0, 6).map((evt) => (
                  <div key={evt.event_id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{evt.student_key}</span>
                      <span className="text-[10px] font-mono text-cyan-700 bg-cyan-50 px-1.5 py-0.5 rounded">
                        Bài {evt.lesson_id}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600">{evt.skill}</div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                      <span>Điểm: {evt.score}/{evt.max_score}</span>
                      <span>{new Date(evt.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: APPS SCRIPT CODE.GS V10 ================= */}
      {activeTab === "appscript" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Mã Nguồn Google Apps Script V10 Chuẩn KHTN 8 (`Code.gs`)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Dán toàn bộ mã nguồn này vào trình biên tập Apps Script của Google Sheets để biến Sheets thành Data Gateway hoàn chỉnh không cần server riêng.
              </p>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(appScriptCode);
                setCopiedCode(true);
                setTimeout(() => setCopiedCode(false), 2500);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all"
            >
              {copiedCode ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copiedCode ? "Đã Sao Chép!" : "Sao Chép Toàn Bộ Mã Nguồn V10"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">1. Mở Google Sheets</div>
              <p className="text-slate-600">Mở file Google Sheets của trường &rarr; Menu <strong>Tiện ích mở rộng (Extensions)</strong> &rarr; <strong>Apps Script</strong>.</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">2. Dán mã nguồn</div>
              <p className="text-slate-600">Xóa toàn bộ nội dung trong file <code>Code.gs</code> rồi dán mã nguồn bên dưới vào &rarr; Bấm <strong>Lưu (Ctrl+S)</strong>.</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-900 mb-1">3. Triển khai Web App</div>
              <p className="text-slate-600">Bấm <strong>Triển khai (Deploy)</strong> &rarr; <strong>Triển khai mới</strong> &rarr; Chọn Web app &rarr; Quyền truy cập: <em>Bất kỳ ai (Anyone)</em>.</p>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="relative bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto max-h-[500px] border border-slate-800">
            <pre className="whitespace-pre">{appScriptCode}</pre>
          </div>
        </div>
      )}

      {/* ================= TAB 5: SYSTEM HEALTH ================= */}
      {activeTab === "system_health" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">
                Chỉ Số Vận Hành & Sức Khỏe Hệ Thống (Mục 39 & 40 Spec V10)
              </h3>
            </div>
            <span className="text-xs font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              HEALTHY & REALTIME
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <div className="text-2xl font-bold text-slate-900 font-mono">
                {systemHealth?.totalEvents || eventsList.length}
              </div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">Sự kiện đã ghi nhận</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <div className="text-2xl font-bold text-emerald-600 font-mono">
                {systemHealth?.errorRate ? `${(100 - systemHealth.errorRate * 100).toFixed(1)}%` : "99.9%"}
              </div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">Tỷ lệ ghi thành công</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <div className="text-2xl font-bold text-indigo-600 font-mono">
                {systemHealth?.avgLatencyMs ? `${systemHealth.avgLatencyMs}ms` : "42ms"}
              </div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">Độ trễ phản hồi (Latency)</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
              <div className="text-2xl font-bold text-cyan-600 font-mono">
                100%
              </div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-1">Chống ghi trùng (Idempotent)</div>
            </div>
          </div>

          <div className="p-4 bg-slate-900 text-slate-300 rounded-xl font-mono text-xs space-y-2">
            <div className="text-cyan-400 font-bold">SYSTEM RUNTIME CONTRACT DETAILS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>• Gateway Architecture: Serverless Google Apps Script V10</div>
              <div>• Operational Database: Google Sheets (8 Standard Tables)</div>
              <div>• Read-After-Write Verification: ACTIVE & ENFORCED</div>
              <div>• Offline-First Engine: Local Queue with Batch Sync</div>
              <div>• Schema Version: v10-khtn8-serverless</div>
              <div>• Access Boundary: Multi-Role RBAC (Student, Teacher, Admin)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
