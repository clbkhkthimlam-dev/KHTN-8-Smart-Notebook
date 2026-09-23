# DATA CONTRACT + GOOGLE SHEETS + APPS SCRIPT + INPUT + BACKEND



---

# DATA CONTRACT — APP ↔ APPS SCRIPT ↔ GOOGLE SHEETS

## 1. Nguyên tắc
Tất cả request/response dùng JSON UTF-8 và có `schema_version`.

## 2. Request
```json
{
  "schema_version":"1.0",
  "action":"student_event|resource_sync|progress_upsert|query_lesson|submit_answer",
  "request_id":"uuid",
  "timestamp":"ISO-8601",
  "client_id":"web",
  "payload":{}
}
```

## 3. Response
```json
{
  "schema_version":"1.0",
  "request_id":"uuid",
  "ok":true,
  "error":null,
  "data":{}
}
```

## 4. Idempotency
Dùng `request_id` để tránh ghi trùng.

## 5. Error codes
`AUTH_REQUIRED`, `VALIDATION_ERROR`, `NOT_FOUND`, `RATE_LIMIT`, `SHEET_ERROR`, `SERVER_ERROR`.

## 6. Event
```json
{
 "event_id":"",
 "student_key":"",
 "lesson_id":"",
 "activity_id":"",
 "skill":"",
 "score":0,
 "max_score":1,
 "hints":0,
 "duration_seconds":0,
 "timestamp":""
}
```

Không gửi tên thật nếu không cần.


## V2 mandatory dependency
This agent MUST consume `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, and the applicable `02_KHTN8_47_LESSONS_COMPLETE.md` before producing final data.



---

# GOOGLE SHEETS SCHEMA

## Các sheet bắt buộc — tất cả nằm trong MỘT file Google Spreadsheet

### CONFIG
| Field | Value |
|---|---|
| API_VERSION | 1.0 |
| WEB_APP_URL | ... |
| API_TOKEN_HASH/KEY_REF | ... |
| ACTIVE_TERM | ... |
| SCHOOL_ID | ... |

### INPUT
Ô nhập dành cho giáo viên:
- B2: `student_key`
- B3: `lesson_id`
- B4: `activity_id`
- B5: `skill`
- B6: `score`
- B7: `max_score`
- B8: `hints`
- B9: `duration_seconds`
- B10: `teacher_note`
- B12: nút/trigger “GHI DỮ LIỆU”

### STUDENTS
`student_key, class_code, grade, status, created_at, updated_at`

### LESSONS
`lesson_id, chapter, title, core_concepts, yccd_ids, skill_ids, status`

### RESOURCES
`resource_id, title, type, provider, url, language, license, tier, status, last_verified`

### PHENOMENA
`phenomenon_id, name, context, lesson_ids, concept_ids, difficulty, status`

### ACTIVITIES
`activity_id, lesson_id, level, type, prompt, expected_evidence, rubric_id`

### EVENTS
`event_id, timestamp, student_key, lesson_id, activity_id, skill, score, max_score, hints, duration_seconds`

### MASTERY
`student_key, concept_id, attempts, correct, mastery, last_seen, misconception_code`

### AUDIT_LOG
`timestamp, request_id, action, actor_type, result, error_code`

## Quy tắc
- Hàng 1 là header.
- Không đổi tên cột trong production nếu chưa bump schema.
- Ngày giờ ISO 8601.
- Không dùng merged cells trong bảng dữ liệu.


## V2 mandatory dependency
This agent MUST consume `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, and the applicable `02_KHTN8_47_LESSONS_COMPLETE.md` before producing final data.



---

# GOOGLE APPS SCRIPT INTEGRATION

## Mục tiêu
Google Apps Script là lớp API nhẹ giữa web app và Google Sheets.

## Kiến trúc
Web App
→ HTTPS POST
→ Apps Script `doPost(e)`
→ validate/auth
→ route action
→ Sheet
→ JSON response.

## Endpoint actions
- `health`
- `getLesson`
- `getResources`
- `submitAnswer`
- `logEvent`
- `upsertMastery`
- `getStudentProgress`
- `writeInputRow`

## Pseudo implementation
```javascript
function doPost(e) {
  const body = JSON.parse(e.postData.contents || "{}");
  const result = route(body);
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function route(req) {
  validateSchema(req);
  validateAuth(req);
  switch (req.action) {
    case "health": return {ok:true, data:{status:"up"}};
    case "logEvent": return logEvent(req.payload);
    case "getLesson": return getLesson(req.payload.lesson_id);
    case "submitAnswer": return submitAnswer(req.payload);
    default: throw new Error("NOT_FOUND");
  }
}
```

## Production requirements
- `LockService` khi ghi dữ liệu.
- Cache cho dữ liệu đọc nhiều.
- Validate kiểu dữ liệu.
- Rate limiting.
- Không đưa secret API model vào client.
- Log request_id.
- Không dùng email học sinh làm primary key nếu không cần.

## Input cells
Đọc `INPUT!B2:B10`; sau khi ghi thành công trả `request_id` vào `INPUT!B14`.

## Kết nối
Web app phải có:
- URL cấu hình trong CONFIG;
- nút “Kiểm tra kết nối”;
- health check;
- hiển thị `last_sync`;
- retry có backoff;
- báo lỗi rõ cho giáo viên.

## Acceptance
1. Nhập dữ liệu vào INPUT.
2. Nhấn ghi.
3. EVENTS có thêm một dòng.
4. Mở app và đọc lại event.
5. Không ghi trùng khi retry cùng request_id.


## V2 mandatory dependency
This agent MUST consume `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, and the applicable `02_KHTN8_47_LESSONS_COMPLETE.md` before producing final data.



---

# INPUT FORM — Ô NHẬP & KẾT NỐI

## Mục tiêu
Có giao diện nhập đơn giản cho giáo viên và học sinh; dữ liệu cuối cùng vẫn đi qua Data Contract.

## Teacher input
- Mã học sinh
- Bài
- Hoạt động
- Kỹ năng
- Điểm
- Điểm tối đa
- Số hint
- Thời gian
- Ghi chú

## Student input
- câu trả lời;
- dự đoán;
- dữ liệu thí nghiệm;
- phản hồi;
- tự đánh giá.

## UX
- validation tại client;
- validation lại tại server;
- trạng thái `Đang gửi / Thành công / Thất bại`;
- offline queue nếu có thể;
- không mất dữ liệu khi refresh;
- không hiển thị secret/token.

## Connection panel
```text
API: ● Connected
Sheet: ● Writable
Last sync: 2026-...
Schema: 1.0
```

## Acceptance
Một giáo viên không biết kỹ thuật vẫn nhập và kiểm tra kết nối được.


## V2 mandatory dependency
This agent MUST consume `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, and the applicable `02_KHTN8_47_LESSONS_COMPLETE.md` before producing final data.



---

# BACKEND/API CONTRACT

## Mục tiêu
Cho phép sau này thay Apps Script bằng backend riêng mà không sửa frontend.

## Endpoints logic
`POST /events`
`GET /lessons/:id`
`GET /resources?lesson_id=`
`GET /students/:key/progress`
`POST /answers`
`POST /sync`

## Adapter
Frontend chỉ gọi interface:
```ts
ScienceDataProvider {
  health()
  getLesson(id)
  getResources(query)
  logEvent(event)
  submitAnswer(answer)
  getProgress(studentKey)
}
```

Apps Script, Supabase, PostgreSQL hoặc backend thương mại chỉ là implementation.

## Versioning
`/api/v1` và `schema_version`.


## V2 mandatory dependency
This agent MUST consume `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, and the applicable `02_KHTN8_47_LESSONS_COMPLETE.md` before producing final data.



---

# SHEET + APPS SCRIPT BUILD PLAN

## Phase 1 — Sheet
Tạo một Spreadsheet duy nhất với các tab:
CONFIG, INPUT, STUDENTS, LESSONS, RESOURCES, PHENOMENA, ACTIVITIES, EVENTS, MASTERY, AUDIT_LOG.

## Phase 2 — Input
Tạo ô B2:B10 + data validation.
B14 hiển thị request_id.
B15 hiển thị trạng thái kết nối.

## Phase 3 — Apps Script
Tạo:
`doGet()` → health/config UI nếu cần.
`doPost()` → API.
`route()`.
`validateRequest()`.
`appendEvent()`.
`getLesson()`.
`getResources()`.
`getProgress()`.
`upsertMastery()`.

## Phase 4 — Web app
Màn hình:
- Connect
- Student
- Lesson
- Activity
- Submit
- Progress

## Phase 5 — Sync
Client gửi event.
Apps Script xác thực.
Ghi EVENTS.
Cập nhật MASTERY.
Trả JSON.

## Phase 6 — Production hardening
LockService, CacheService, quota handling, retry, idempotency, audit.

## Quan trọng
Không phụ thuộc trực tiếp vào tên sheet trong frontend. Chỉ Apps Script biết mapping cột; mapping được version hóa.



---

# SHEET EVENT GOVERNANCE V2

Mọi tương tác phải tạo event có:
`event_id, request_id, timestamp, student_key, class_key, lesson_id, atom_id, activity_id, skill, input_type, score, max_score, hint_count, duration_sec, outcome, misconception_code, source_version`.

## Sheets tối thiểu
CONFIG, STUDENTS, LESSONS, KNOWLEDGE_ATOMS, PHENOMENA, RESOURCES, EVENTS, MASTERY, MISCONCEPTIONS, EXPERIMENTS, EXPERIMENT_DATA, REPORTS, AUDIT_LOG, SYNC_ERRORS.

## Ô nhập
Sheet INPUT dùng B2:B15 cho thao tác thủ công/test; Apps Script phải validate và trả trạng thái thành công/thất bại ngay trên sheet.



---

# APPS SCRIPT ACCEPTANCE V2

## API bắt buộc
`ping`, `readConfig`, `readLesson`, `readKnowledgeAtom`, `writeEvent`, `writeExperiment`, `getStudentMastery`, `getReport`, `healthCheck`.

## Chống lỗi
- request_id bắt buộc và idempotent.
- validate schema trước khi ghi.
- không ghi dữ liệu học sinh nếu thiếu identity/key.
- lỗi phải vào SYNC_ERRORS.
- audit log mọi thao tác ghi.

## Connectivity UI
Có ô trạng thái `ONLINE / DEGRADED / OFFLINE`, last_sync_at, pending_count, last_error.



---

# DATA DICTIONARY

## IDs
`student_key`: mã định danh tối thiểu, không chứa tên thật.
`lesson_id`: mã bài ổn định.
`concept_id`: mã khái niệm.
`activity_id`: mã hoạt động.
`resource_id`: mã tài nguyên.
`event_id`: mã sự kiện.
`request_id`: mã request để idempotency.

## Scores
`score`: điểm đạt.
`max_score`: điểm tối đa.
`mastery`: 0..1.
`difficulty`: 1..6.
`confidence`: 0..1.

## Time
Tất cả timestamp lưu ISO 8601 UTC; UI chuyển sang timezone người dùng.

