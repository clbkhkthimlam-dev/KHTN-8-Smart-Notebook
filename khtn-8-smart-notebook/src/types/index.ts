/**
 * Core Types for KHTN 8 Smart Notebook
 * Aligned with MASTER ORCHESTRATOR & DATA CONTRACT
 */

export type ChapterId = 
  | "CH_INTRO"
  | "CH_I_CHEM"
  | "CH_II_COMPOUND"
  | "CH_III_DENSITY_PRESSURE"
  | "CH_IV_ROTATION"
  | "CH_V_ELECTRICITY"
  | "CH_VI_HEAT"
  | "CH_VII_HUMAN_BIO"
  | "CH_VIII_ECOLOGY";

export type Discipline = "physics" | "chemistry" | "biology";

export interface DisciplineInfo {
  id: Discipline;
  name: string;
  shortName: string;
  vietnameseName: string;
  lessonRange: string;
  lessonIds: [number, number];
  totalLessons: number;
  chaptersCount: number;
  description: string;
  coreBranches: string[];
  themeGradient: string;
  themeColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
}

export const KHTN8_DISCIPLINES: Record<Discipline, DisciplineInfo> = {
  physics: {
    id: "physics",
    name: "Vật lí",
    shortName: "Lí",
    vietnameseName: "Phân môn Vật lí",
    lessonRange: "Bài 13 - 29",
    lessonIds: [13, 29],
    totalLessons: 17,
    chaptersCount: 4,
    description: "Khối lượng riêng, áp suất, lực đẩy Archimedes, tác dụng làm quay của lực (đòn bẩy), hiện tượng điện & mạch điện, năng lượng nhiệt và truyền nhiệt.",
    coreBranches: ["Cơ học & Áp suất", "Cơ học làm quay (Đòn bẩy)", "Điện học cơ bản", "Nhiệt học"],
    themeGradient: "from-blue-600 via-cyan-600 to-indigo-700",
    themeColor: "text-blue-600",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    badgeBorder: "border-blue-200"
  },
  chemistry: {
    id: "chemistry",
    name: "Hóa học",
    shortName: "Hóa",
    vietnameseName: "Phân môn Hóa học",
    lessonRange: "Bài 1 - 12",
    lessonIds: [1, 12],
    totalLessons: 12,
    chaptersCount: 3,
    description: "An toàn hóa chất, phản ứng hóa học, định luật bảo toàn khối lượng, mol & tỉ khối, nồng độ dung dịch, tốc độ phản ứng, acid, base, thang pH, oxide, muối và phân bón hóa học.",
    coreBranches: ["An toàn phòng thí nghiệm", "Phản ứng hóa học & Mol", "Dung dịch & Nồng độ", "Hợp chất vô cơ & Thang pH"],
    themeGradient: "from-purple-600 via-violet-600 to-amber-600",
    themeColor: "text-purple-600",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-700",
    badgeBorder: "border-purple-200"
  },
  biology: {
    id: "biology",
    name: "Sinh học",
    shortName: "Sinh",
    vietnameseName: "Phân môn Sinh học",
    lessonRange: "Bài 30 - 47",
    lessonIds: [30, 47],
    totalLessons: 18,
    chaptersCount: 2,
    description: "Giải phẫu và sinh lý 8 hệ cơ quan cơ thể người (vận động, tiêu hóa, tuần hoàn, hô hấp, bài tiết, thần kinh, nội tiết, da, sinh sản) cùng sinh thái học, quần thể, quần xã, hệ sinh thái và bảo vệ môi trường.",
    coreBranches: ["Sinh học cơ thể người", "Vệ sinh & Sức khỏe học đường", "Sinh thái học & Quần thể", "Sinh quyển & Bảo vệ môi trường"],
    themeGradient: "from-emerald-600 via-green-600 to-teal-700",
    themeColor: "text-emerald-600",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200"
  }
};

export function getLessonDiscipline(lessonId: number): Discipline {
  if (lessonId <= 12) return "chemistry";
  if (lessonId <= 29) return "physics";
  return "biology";
}

export function getDisciplineBadge(discipline: Discipline) {
  switch (discipline) {
    case "physics":
      return {
        label: "Vật lí",
        short: "Lí",
        pillClass: "bg-blue-100 text-blue-800 border border-blue-300 font-bold",
        bgLight: "bg-blue-50/70 border-blue-200 text-blue-900",
        accent: "text-blue-600",
        gradient: "from-blue-600 to-cyan-600"
      };
    case "chemistry":
      return {
        label: "Hóa học",
        short: "Hóa",
        pillClass: "bg-purple-100 text-purple-800 border border-purple-300 font-bold",
        bgLight: "bg-purple-50/70 border-purple-200 text-purple-900",
        accent: "text-purple-600",
        gradient: "from-purple-600 to-amber-600"
      };
    case "biology":
      return {
        label: "Sinh học",
        short: "Sinh",
        pillClass: "bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold",
        bgLight: "bg-emerald-50/70 border-emerald-200 text-emerald-900",
        accent: "text-emerald-600",
        gradient: "from-emerald-600 to-teal-600"
      };
  }
}

export interface Chapter {
  id: ChapterId;
  code: string;
  name: string;
  discipline: Discipline;
  description: string;
  lessonRange: [number, number];
  themeColor: string;
}

export type ConceptType =
  | "definition"
  | "property"
  | "law"
  | "formula"
  | "procedure"
  | "classification"
  | "structure"
  | "process"
  | "phenomenon"
  | "safety"
  | "application";

export type ContextClass =
  | "home"
  | "school"
  | "technology"
  | "production_or_agriculture"
  | "environment_or_community"
  | "health_safety"
  | "counterexample"
  | "decision_or_problem_solving";

export interface ScenarioContext {
  id: string;
  contextClass: ContextClass;
  title: string;
  phenomenon: string;
  observation: string;
  question: string;
  explanationRoute: string;
  misconceptionRisk?: string;
  evidenceSource: "textbook_context" | "sgv_context" | "external_verified" | "teacher_created";
}

export interface FormulaAtom {
  formula_id: string;
  source_anchor: string;
  latex_display: string;
  plain_text: string;
  variables: { symbol: string; name: string; unit: string; description: string }[];
  conditions_of_validity: string;
  derived_forms: { latex: string; targetVariable: string; note: string }[];
  example: {
    problem: string;
    given: Record<string, string>;
    solution: string;
    answer: string;
  };
  verification_status: "UNVERIFIED" | "IMAGE_VERIFIED" | "SGK_SGV_CROSSCHECKED" | "QA_PASS";
}

export type Strand = "chat" | "nang_luong" | "vat_song" | "trai_dat";

export interface WebResourceItem {
  resource_id: string;
  url: string;
  title: string;
  source_type: "phet" | "khan_academy" | "wikimedia" | "wikipedia" | "official_gov" | "open_data";
  grade_fit: string;
  license: string;
  trust_score: number; // 0..100
  evidence_excerpt: string;
}

export interface DiagnosticItem {
  question: string;
  options: string[];
  correctIndex: number;
  commonWrongReason: string;
  socraticHint: string;
}

export interface TransferTask {
  title: string;
  task: string;
  context: string;
  deliverables: string;
  evaluationCriteria: string;
}

export interface KnowledgeAtom {
  atom_id: string;
  id?: string;
  lesson_id: number;
  topic: string;
  title?: string;
  statement: string;
  definition?: string;
  canonical_explanation?: string;
  concept_type: ConceptType;
  source_anchors: string[];
  terms: string[];
  symbols?: string[];
  units?: string[];
  conditions?: string;
  representations?: ("text" | "formula" | "diagram" | "simulation" | "table")[];
  prerequisites: string[];
  postrequisites?: string[];
  related_atoms: string[];
  examples?: string[];
  counterexamples?: string[];
  misconceptions: {
    code: string;
    description: string;
    counterExample: string;
    repairStrategy: string;
  }[];
  formula?: FormulaAtom;
  formulaLatex?: string;
  contexts: ScenarioContext[];
  realWorldApplication?: string;
  applications?: string[];
  use_cases: string[];
  diagnostic_question?: DiagnosticItem;
  transfer_task?: TransferTask;
  web_resources?: WebResourceItem[];
  status: "DRAFT" | "EXTRACTED" | "CROSSCHECKED" | "CONTEXT_EXPANDED" | "QA_PASS" | "PUBLISHED";
}

export interface Lesson {
  id: number;
  chapterId: ChapterId;
  chapterName: string;
  discipline?: Discipline;
  title: string;
  sgkStartPage: number;
  sgkEndPage: number;
  sgvStartPage: number;
  strand?: Strand;
  pages?: { sgk: string; sgv: string };
  yccd: string[];
  summary: string;
  coreConcepts: string[];
  atoms: KnowledgeAtom[];
  status: "PENDING" | "EXTRACTED" | "QA_PASS" | "PUBLISHED";
}

export interface ImageItem {
  image_id: string;
  image_type: "real_photo" | "diagram" | "microscopic" | "satellite" | "chart" | "screenshot" | "teacher_photo" | "student_photo" | "illustration";
  source_type: "official" | "education" | "wikimedia" | "open_data" | "user_upload" | "generated";
  source_url: string;
  creator: string;
  captured_at?: string;
  checked_at: string;
  license: string;
  attribution: string;
  alt_text: string;
  visual_evidence: string;
  crop_regions?: { label: string; x: number; y: number; width: number; height: number }[];
  rights_status: string;
}

export interface ImageEvidenceLayer {
  what_is_visible: string[];
  what_is_measurable: string[];
  what_can_be_inferred: string[];
  what_cannot_be_inferred: string[];
  atom_relation: string;
  question_targets: string[];
  source_provenance: string;
}

export interface FourLayerQuestions {
  layerA_observation: { question: string; answers: string[]; guide: string };
  layerB_concept: { question: string; related_concept: string; formula_latex?: string; guide: string };
  layerC_evidence: { question: string; supporting_data: string; validation_test: string };
  layerD_decision_transfer: { question: string; what_if_variant: string; decision_matrix: string };
}

export interface AntiHallucinationGrounding {
  observed: string[];
  measured: string[];
  inferred: string[];
  hypothesis: string[];
  unknown: string[];
}

export interface ScenarioQualityScore {
  visual_evidence: number; // 0..1
  curriculum_match: number;
  scientific_accuracy: number;
  authenticity: number;
  data_value: number;
  transfer_value: number;
  total: number;
}

export interface ScenarioPack {
  scenario_id: string;
  atom_id: string;
  lesson_id: number;
  lesson_title: string;
  chapter_id: ChapterId;
  title: string;
  context_class: ContextClass;
  location_context: string;
  real_world_problem: string;
  observation: string;
  image_set: ImageItem[];
  caption: string;
  visual_evidence_layer: ImageEvidenceLayer;
  four_layer_questions: FourLayerQuestions;
  known_data: Record<string, string | number>;
  unknown: string;
  student_action: string;
  expected_reasoning: string;
  evidence: string;
  claim: string;
  common_misconception: string;
  hints: [string, string, string];
  what_if_variants: { condition: string; consequence: string }[];
  local_variants: string[];
  related_atoms: string[];
  quality_score: ScenarioQualityScore;
  status: "DRAFT" | "NEEDS_REVIEW" | "PUBLISHED";
  tags: ("image_rich" | "data_rich" | "local_context" | "sequence" | "experiment")[];
}

export interface PhenomenonItem {
  id: string;
  name: string;
  lessonId: number;
  lessonTitle: string;
  chapterId: ChapterId;
  context: ContextClass;
  observableSigns: string[];
  inquiryQuestion: string;
  scientificExplanation: string;
  relevantAtomId: string;
  experimentSuggestion?: string;
  imageUrl?: string;
  safetyNote?: string;
  scenarioPack?: ScenarioPack;
}

export interface LearningEvent {
  event_id: string;
  request_id: string;
  timestamp: string;
  student_key: string;
  class_key?: string;
  lesson_id: string;
  atom_id?: string;
  activity_id: string;
  skill: string;
  score: number;
  max_score: number;
  hints: number;
  duration_seconds: number;
  notes?: string;
}

export interface StudentMastery {
  student_key: string;
  concept_id: string;
  attempts: number;
  correct: number;
  mastery_rate: number; // 0..1
  last_seen: string;
  misconception_code?: string;
}

export interface InputSheetData {
  student_key: string;
  lesson_id: string;
  activity_id: string;
  skill: string;
  score: number;
  max_score: number;
  hints: number;
  duration_seconds: number;
  teacher_note: string;
}

// ==================== SPEC V10 EXTENSIONS FOR KHTN 8 ====================

export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

export interface ApiResponse<T = any> {
  ok: boolean;
  requestId: string;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    version: string;
    timestamp: string;
  };
}

export interface FieldBinding {
  fieldId: string;
  table: string;
  column: string;
  type: "text" | "number" | "boolean" | "date" | "json";
  required: boolean;
  writableRoles: UserRole[];
  readableRoles: UserRole[];
  description: string;
}

export interface LearningGoal {
  goalId: string;
  studentKey: string;
  studentName?: string;
  lessonId: number;
  lessonTitle: string;
  goalTitle: string;
  targetDate: string;
  status: "ACTIVE" | "COMPLETED" | "ARCHIVED";
  progressPercent: number;
  createdAt: string;
  updatedAt: string;
  verifiedReadBack?: boolean;
}

export interface TeacherIntervention {
  interventionId: string;
  teacherKey: string;
  studentKey: string;
  studentName: string;
  lessonId: number;
  misconception: string;
  strategy: string;
  assignedTasks: string[];
  status: "ASSIGNED" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
  verifiedReadBack?: boolean;
}

export interface OfflineQueueItem {
  id: string;
  requestId: string;
  action: string;
  payload: any;
  createdAt: string;
  status: "queued" | "sending" | "accepted" | "failed" | "synced";
  retryCount: number;
  error?: string;
}

export interface SystemHealthReport {
  status: "healthy" | "degraded" | "error";
  appsScriptGateway: string;
  spreadsheetOperational: boolean;
  schemaVersion: string;
  totalEvents: number;
  totalGoals: number;
  totalInterventions: number;
  errorRate: number;
  duplicateSuppressionRate: number;
  avgLatencyMs: number;
  dataFreshness: string;
}

export interface SystemConfigKHTN8 {
  schoolName: string;
  academicYear: string;
  aiTutorEnabled: boolean;
  socraticStrictness: "moderate" | "strict" | "guided";
  offlineQueueEnabled: boolean;
  demoMode: boolean;
  autoSyncIntervalSec: number;
  allowedClasses: string[];
}

// ==================== SMART KNOWLEDGE EXPORT ENGINE TYPES (SPEC 15) ====================

export type CognitiveLevel = "recognition" | "comprehension" | "application" | "high_application";
export type QuestionType = 
  | "multiple_choice" 
  | "calculation" 
  | "phenomenon_explanation" 
  | "data_analysis" 
  | "experiment_design" 
  | "transfer";

export interface ExerciseItem {
  exercise_id: string;
  source_type: "SGK" | "SGV" | "authored" | "verified_curriculum";
  source_anchor: string;
  lesson_id: number;
  chapter_id: ChapterId;
  atom_ids: string[];
  skill_ids: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  cognitive_level: CognitiveLevel;
  question_type: QuestionType;
  prompt: string;
  options?: string[];
  correct_answer: string;
  detailed_solution: string;
  socratic_hint: string;
  required_formulas?: string[];
  scenario_ref?: string;
  skills: string[];
  relevance_score?: number;
}

export type ExportPackPreset = 
  | "custom" 
  | "quick_revision" 
  | "full_knowledge" 
  | "formula_sheet" 
  | "phenomenon_pack" 
  | "practice_pack" 
  | "teacher_intervention" 
  | "exam_prep" 
  | "teacher_pack" 
  | "student_pack";

export interface ExportSelection {
  chapters: string[];
  lessons: number[];
  atoms: string[];
  skills: string[];
  packTemplate?: ExportPackPreset;
}

export interface ExportLayerConfig {
  includeCore: boolean;         // Tầng 0 - CORE (Định nghĩa, quan hệ, YCCD)
  includePrereq: boolean;       // Tầng 1 - PREREQUISITE (Kiến thức nền cần thiết)
  includePractice: boolean;     // Tầng 2 - PRACTICE (Bài tập theo mức độ)
  includeApplication: boolean;  // Tầng 3 - APPLICATION (Hiện tượng & Tình huống 6 chiều)
  includeTransfer: boolean;     // Tầng 4 - TRANSFER (Nhiệm vụ chuyển giao)
  includeExtension: boolean;    // Tầng 5 - EXTENSION (Thí nghiệm, mô phỏng PhET, web)
}

export interface ExerciseFilterConfig {
  difficulties: number[];
  cognitiveLevels: CognitiveLevel[];
  questionTypes: QuestionType[];
  maxPerLesson: number;
}

export interface ExportQualityReport {
  source_coverage: number;       // Tỉ lệ có source_anchor hợp lệ (%)
  formula_coverage: number;      // Tỉ lệ công thức qua Formula Gate (%)
  exercise_count: number;
  scenario_count: number;
  citation_coverage: number;
  prerequisite_count: number;
  status: "QA_PASS" | "NEEDS_VERIFICATION";
}

export interface KnowledgePackage {
  package_id: string;
  package_version: string;
  created_at: string;
  selection: ExportSelection;
  layers: ExportLayerConfig;
  source_dataset_version: string;
  scope: {
    chapters: string[];
    lessons: number[];
    atoms: string[];
    disciplines: Discipline[];
  };
  content: {
    coreLessons: Lesson[];
    prerequisiteAtoms: KnowledgeAtom[];
    formulas: any[];
    exercises: ExerciseItem[];
    scenarios: ScenarioContext[];
    phenomena: PhenomenonItem[];
    transferTasks: TransferTask[];
    webResources: WebResourceItem[];
  };
  quality_report: ExportQualityReport;
  package_hash: string;
  provenance: string;
}

export interface ExportRequestRecord {
  requestId: string;
  userId: string;
  userRole: UserRole;
  selectionType: "chapter" | "lesson" | "atom" | "pack";
  selectionSummary: string;
  layersConfig: ExportLayerConfig;
  outputFormat: "web" | "markdown" | "json" | "print";
  createdAt: string;
  packageHash: string;
  counts: {
    lessons: number;
    atoms: number;
    formulas: number;
    exercises: number;
    scenarios: number;
    prerequisites: number;
  };
}

// ============================================================================
// SPEC 18: INTERDISCIPLINARY PROBLEM SOLVING GRAPH (V5)
// ============================================================================

export type InterdisciplinaryEdgeType =
  | "PREREQUISITE"
  | "EXPLAINS"
  | "MEASURES"
  | "CALCULATES"
  | "CONSTRAINS"
  | "CAUSES"
  | "INFLUENCES"
  | "EVIDENCE_FOR"
  | "CONTRADICTS"
  | "APPLIES_TO"
  | "TRANSFERS_TO"
  | "CROSS_DISCIPLINE_BRIDGE";

export interface KnowledgeGraphEdge {
  id: string;
  sourceAtomId: string;
  targetAtomId: string;
  edgeType: InterdisciplinaryEdgeType;
  description: string;
  evidenceBasis: string;
  curriculumRole: "primary" | "auxiliary" | "bridge";
}

export type VisionEvidenceStatus =
  | "observed"    // Nhìn thấy trực tiếp từ ảnh/thực tế
  | "measured"    // Có số liệu đo đạc cụ thể
  | "inferred"    // Suy luận logic có căn cứ
  | "hypothesis"  // Giả thuyết cần kiểm chứng
  | "unknown";    // Chưa xác định được

export interface ProblemEvidenceItem {
  id: string;
  claim: string;
  status: VisionEvidenceStatus;
  observableSource: string;
  connectedAtomId?: string;
  reasoningNote: string;
}

export interface SubProblem {
  id: string;
  order: number;
  question: string;
  tier: "A_IDENTIFY" | "B_EXPLAIN" | "C_DECIDE" | "D_VALIDATE";
  tierTitle: string;
  requiredAtomIds: string[];
  investigationSteps: string[];
  guidingQuestions: string[];
  expectedFinding: string;
}

export interface MinimalSufficientKnowledgePathItem {
  atomId: string;
  title: string;
  discipline: Discipline | "data";
  lessonId: number;
  lessonTitle: string;
  relevanceScore: number;
  dependencyScore: number;
  evidenceScore: number;
  transferScore: number;
  learnerNeedScore: number;
  compositeScore: number; // Formula: score = relevance * dependency * evidence_value * transfer_value * learner_need
  roleInProblem: string;
  sourceAnchor: string;
}

export interface ProblemSolutionOption {
  id: string;
  title: string;
  description: string;
  feasibility: "Cao" | "Trung bình" | "Thách thức";
  costBenefit: string;
  scientificBasis: string;
  pros: string[];
  cons: string[];
  score: number; // thang điểm 1-100
}

export interface InterdisciplinaryProblem {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  disciplines: (Discipline | "data")[];
  realWorldContext: string;
  locality: string;
  observedPhenomena: string[];
  centralQuestion: string;
  subproblems: SubProblem[];
  requiredKnowledgeAtomIds: string[];
  optionalKnowledgeAtomIds: string[];
  measurements: {
    parameter: string;
    symbol: string;
    value: string;
    unit: string;
    measurementTool: string;
    sourceOrLocation: string;
  }[];
  hypotheses: {
    id: string;
    statement: string;
    isSupported: boolean;
    verificationEvidence: string;
  }[];
  evidenceChain: ProblemEvidenceItem[];
  solutionOptions: ProblemSolutionOption[];
  decisionCriteria: string[];
  validationPlan: {
    experimentName: string;
    independentVariable: string;
    dependentVariable: string;
    controlVariables: string[];
    steps: string[];
    expectedMetric: string;
  };
  transferTask: {
    title: string;
    scenario: string;
    prompt: string;
    deliverable: string;
    rubricCriteria: string[];
  };
  sourceAnchors: string[];
  knowledgeEdges: KnowledgeGraphEdge[];
  imageEvidenceUrl?: string;
  imageEvidenceCaption?: string;
}

// ============================================================================
// SPEC 19, 20, 21: FORMULA MASTER AUDIT & INTEGRITY GATE (V6)
// ============================================================================

export interface CanonicalFormulaVariable {
  symbol: string;
  name: string;
  meaning: string;
  siUnit: string;
  sourceDefined: boolean;
  notes?: string;
}

export interface FormulaTransformation {
  latex: string;
  meaning: string;
  isAllowed: boolean;
  ruleExplanation: string;
}

export interface CanonicalWorkedExample {
  title: string;
  context: string;
  givenData: { symbol: string; value: number | string; unit: string; convertedValue?: string }[];
  unknownTarget: { symbol: string; meaning: string; requiredUnit: string };
  steps: {
    stepNumber: number;
    phase: "GIVEN" | "UNIT_CONVERT" | "SELECT_FORMULA" | "SUBSTITUTE" | "CALCULATE" | "UNIT_CHECK" | "CONCLUSION";
    phaseName: string;
    latexSnippet?: string;
    explanation: string;
  }[];
  finalResult: string;
}

export interface CanonicalFormulaRecord {
  formulaId: string;
  name: string;
  bookId: "SGK_KHTN8_KNTT" | "SGV_KHTN8_KNTT";
  printedPage: number;
  lessonId: number;
  lessonTitle: string;
  discipline: Discipline;
  knowledgeAtomId: string;
  sourceImageHash: string;
  sourceVerbatim: string;
  latexExact: string;
  plainTextExact: string;
  variables: CanonicalFormulaVariable[];
  conditions: string[];
  applicability: {
    whenToUse: string[];
    whenForbidden: string[];
  };
  knownRearrangements: FormulaTransformation[];
  workedExample: CanonicalWorkedExample;
  validation: {
    symbolic: "PASS" | "FAIL";
    dimensional: "PASS" | "FAIL";
    numerical: "PASS" | "FAIL";
    sourceVisual: "PASS" | "FAIL";
  };
  render: {
    inline: "PASS" | "FAIL";
    display: "PASS" | "FAIL";
    mobile: "PASS" | "FAIL";
    docx: "PASS" | "FAIL";
    pdf: "PASS" | "FAIL";
  };
  status: "DRAFT" | "VERIFIED" | "PUBLISHED" | "BLOCKED";
  verifiedAt: string;
}
