import { FieldBinding, UserRole } from "../types";

export const KHTN8_DATA_DICTIONARY: FieldBinding[] = [
  // 00_CONFIG
  {
    fieldId: "config.schoolName",
    table: "00_CONFIG",
    column: "schoolName",
    type: "text",
    required: true,
    writableRoles: ["ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Tên trường THCS áp dụng chương trình KHTN 8"
  },
  {
    fieldId: "config.academicYear",
    table: "00_CONFIG",
    column: "academicYear",
    type: "text",
    required: true,
    writableRoles: ["ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Năm học hiện tại (ví dụ: 2026-2027)"
  },
  {
    fieldId: "config.aiTutorEnabled",
    table: "00_CONFIG",
    column: "aiTutorEnabled",
    type: "boolean",
    required: true,
    writableRoles: ["ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Bật/Tắt tính năng Gia sư Socratic AI trong lớp"
  },

  // 01_USERS & 03_STUDENT_PROFILES
  {
    fieldId: "student.studentKey",
    table: "03_STUDENT_PROFILES",
    column: "studentKey",
    type: "text",
    required: true,
    writableRoles: ["TEACHER", "ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Mã định danh duy nhất của học sinh (ví dụ: HS-8A-01)"
  },
  {
    fieldId: "student.fullName",
    table: "03_STUDENT_PROFILES",
    column: "fullName",
    type: "text",
    required: true,
    writableRoles: ["TEACHER", "ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Họ và tên học sinh lớp 8"
  },
  {
    fieldId: "student.classKey",
    table: "03_STUDENT_PROFILES",
    column: "classKey",
    type: "text",
    required: true,
    writableRoles: ["TEACHER", "ADMIN"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Lớp học (8A1, 8A2, 8A3...)"
  },

  // 04_GOALS
  {
    fieldId: "goal.goalTitle",
    table: "04_GOALS",
    column: "goalTitle",
    type: "text",
    required: true,
    writableRoles: ["STUDENT", "TEACHER"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Tiêu đề mục tiêu học tập KHTN 8 (chuẩn YCCD SGK)"
  },
  {
    fieldId: "goal.lessonId",
    table: "04_GOALS",
    column: "lessonId",
    type: "number",
    required: true,
    writableRoles: ["STUDENT", "TEACHER"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Mã bài học SGK KHTN 8 (1 đến 47)"
  },
  {
    fieldId: "goal.progressPercent",
    table: "04_GOALS",
    column: "progressPercent",
    type: "number",
    required: false,
    writableRoles: ["STUDENT", "TEACHER"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Mức độ hoàn thành mục tiêu (0 - 100%)"
  },
  {
    fieldId: "goal.status",
    table: "04_GOALS",
    column: "status",
    type: "text",
    required: true,
    writableRoles: ["STUDENT", "TEACHER"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Trạng thái mục tiêu: ACTIVE, COMPLETED, ARCHIVED"
  },

  // 08_LAB_RESULTS
  {
    fieldId: "lab.activityId",
    table: "08_LAB_RESULTS",
    column: "activityId",
    type: "text",
    required: true,
    writableRoles: ["STUDENT"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Mã thí nghiệm ảo (DENSITY_CALC, BUOYANCY_ARCHIMEDES, PH_INDICATOR, OHM_CIRCUIT)"
  },
  {
    fieldId: "lab.score",
    table: "08_LAB_RESULTS",
    column: "score",
    type: "number",
    required: true,
    writableRoles: ["STUDENT", "TEACHER"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Điểm định lượng quá trình thí nghiệm (thang 10)"
  },
  {
    fieldId: "lab.notes",
    table: "08_LAB_RESULTS",
    column: "notes",
    type: "text",
    required: false,
    writableRoles: ["STUDENT", "TEACHER"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Biện luận số liệu và kết luận khoa học theo mô hình CER"
  },

  // 12_INTERVENTIONS
  {
    fieldId: "intervention.misconception",
    table: "12_INTERVENTIONS",
    column: "misconception",
    type: "text",
    required: true,
    writableRoles: ["TEACHER"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Bẫy nhận thức KHTN 8 phát hiện ở học sinh"
  },
  {
    fieldId: "intervention.strategy",
    table: "12_INTERVENTIONS",
    column: "strategy",
    type: "text",
    required: true,
    writableRoles: ["TEACHER"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Chiến lược sư phạm can thiệp (phản ví dụ, thí nghiệm kiểm chứng...)"
  },
  {
    fieldId: "intervention.status",
    table: "12_INTERVENTIONS",
    column: "status",
    type: "text",
    required: true,
    writableRoles: ["TEACHER"],
    readableRoles: ["STUDENT", "TEACHER", "ADMIN"],
    description: "Trạng thái can thiệp: ASSIGNED, IN_PROGRESS, RESOLVED"
  }
];

export function checkFieldPermission(
  fieldId: string, 
  role: UserRole, 
  mode: "read" | "write"
): boolean {
  const binding = KHTN8_DATA_DICTIONARY.find(f => f.fieldId === fieldId);
  if (!binding) return false;
  return mode === "write" 
    ? binding.writableRoles.includes(role)
    : binding.readableRoles.includes(role);
}
