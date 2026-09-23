# 15_KNOWLEDGE_EXPORT_ENGINE_DEEP.md

# KHTN 8 SMART NOTEBOOK — SMART KNOWLEDGE EXPORT ENGINE

## 1. MỤC ĐÍCH
Xây dựng chức năng cho phép người dùng chọn:
- một hoặc nhiều Chương;
- một hoặc nhiều Bài;
- một hoặc nhiều Knowledge Atom;
- một hoặc nhiều kỹ năng;
- hoặc tổ hợp các bộ lọc;
để hệ thống tự động **xuất đúng tập kiến thức tương ứng**.

Chức năng này không phải là export dữ liệu thô. Đây là **Knowledge Package Builder**: từ lựa chọn của người dùng, hệ thống truy xuất các Knowledge Atom có quan hệ trực tiếp, prerequisite, formula, examples, phenomena, scenarios, applications, experiments, resources, assessments và exercises liên quan.

## 2. NGUYÊN TẮC KHÔNG ĐƯỢC VI PHẠM
1. SGK + SGV là nguồn xác định phạm vi kiến thức.
2. Không được export kiến thức chưa có `source_anchor` hợp lệ nếu người dùng đang yêu cầu bản “chính thức theo SGK”.
3. Công thức chỉ được export từ `formula_atom` đã qua Formula Gate.
4. Không tự sinh công thức mới trong lúc export.
5. Không lấy bài tập Internet để gắn nhãn là bài tập SGK.
6. Mọi nội dung web phải giữ `external_context=true`, nguồn, URL, checked_at, source_type và license/status.
7. Không làm mất quan hệ giữa kiến thức và nguồn.
8. Không để kiến thức của bài được chọn kéo theo toàn bộ thư viện không liên quan.
9. Phần “liên quan” phải được phân tầng rõ: `CORE`, `PREREQUISITE`, `APPLICATION`, `TRANSFER`, `EXTENSION`, `WEB_CONTEXT`.
10. Export phải tái lập được: cùng selection + cùng dataset version phải cho ra cùng package hash.

## 3. CÁC CHẾ ĐỘ EXPORT
### 3.1 Chapter Export
Người dùng chọn một hoặc nhiều chương.

Ví dụ:
```text
Chương III + Chương V
```
Hệ thống lấy:
- tất cả bài thuộc chương;
- toàn bộ Knowledge Atom đã publish của các bài;
- công thức;
- định nghĩa;
- khái niệm liên quan;
- bài tập;
- tình huống;
- hiện tượng;
- ứng dụng;
- thí nghiệm;
- mô phỏng;
- tài nguyên web;
- prerequisites xuyên chương nếu được phép;
- assessment tương ứng.

### 3.2 Lesson Export
Người dùng chọn:
```text
Bài 13
Bài 16
Bài 17
```
Chỉ lấy dữ liệu liên quan trực tiếp, sau đó mở rộng theo quan hệ đã cấu hình.

### 3.3 Atom Export
Người dùng chọn một hoặc nhiều kiến thức cụ thể.

Ví dụ:
```text
atom: density.definition
atom: density.formula
atom: pressure.surface
```

### 3.4 Skill Export
Chọn kỹ năng, ví dụ:
```text
Tính toán
Đọc biểu đồ
Phân tích dữ liệu
Giải thích hiện tượng
Thiết kế thí nghiệm
```
Hệ thống trả các knowledge atom và bài tập rèn kỹ năng đó.

### 3.5 Review/Revision Export
Xuất gói ôn tập gồm:
- kiến thức cốt lõi;
- công thức;
- lỗi thường gặp;
- câu hỏi chẩn đoán;
- bài tập từ dễ đến khó;
- tình huống vận dụng;
- bài tập chuyển giao.

### 3.6 Teacher Pack
Gói dành cho giáo viên:
- mục tiêu/YCCD;
- kiến thức;
- hoạt động;
- thí nghiệm;
- bài tập;
- đáp án/rubric theo quyền;
- liên kết tài nguyên;
- thống kê coverage.

### 3.7 Student Pack
Gói dành cho học sinh:
- kiến thức;
- ví dụ;
- hình/hiện tượng;
- công thức;
- bài tập;
- gợi ý từng bước;
- tài nguyên học tập.
Không tự động đưa đáp án/rubric giáo viên vào Student Pack.

## 4. SMART SELECTION PIPELINE
```text
User Selection
  ↓
Selection Resolver
  ↓
Chapter/Lesson/Atom Resolver
  ↓
Knowledge Graph Traversal
  ↓
Relation Filter
  ↓
Rights + Source Filter
  ↓
Formula Integrity Gate
  ↓
Exercise Relevance Engine
  ↓
Ordering Engine
  ↓
Duplicate/Orphan Check
  ↓
Export Renderer
  ↓
Manifest + Provenance + Hash
```

## 5. QUY TẮC MỞ RỘNG THÔNG MINH
Khi chọn một Bài:

### Tầng 0 — CORE
Bắt buộc:
- atom thuộc bài;
- định nghĩa;
- thuật ngữ;
- mối quan hệ;
- điều kiện;
- công thức;
- ví dụ cốt lõi;
- bài tập trực tiếp.

### Tầng 1 — PREREQUISITE
Thêm kiến thức nền cần thiết từ bài trước hoặc chương trước.

### Tầng 2 — PRACTICE
Thêm:
- bài tập cùng dạng;
- bài tập biến đổi dữ liệu;
- bài tập đọc bảng/biểu đồ;
- bài tập tính toán;
- bài tập giải thích.

### Tầng 3 — APPLICATION
Thêm:
- hiện tượng;
- tình huống thực tế;
- cách dùng/ứng dụng;
- bài toán quyết định.

### Tầng 4 — TRANSFER
Thêm tình huống chưa từng xuất hiện ở Core, yêu cầu chuyển kiến thức sang bối cảnh mới.

### Tầng 5 — EXTENSION
Thêm:
- thí nghiệm;
- mô phỏng;
- STEM;
- web context;
- dữ liệu thực;
- nội dung mở rộng.

Người dùng có thể bật/tắt từng tầng.

## 6. EXERCISE RELEVANCE ENGINE
Mỗi bài tập phải có metadata:
```yaml
exercise_id:
source_type: [SGK, SGV, authored, web, generated]
source_anchor:
lesson_id:
chapter_id:
atom_ids: []
skill_ids: []
difficulty: 1-5
cognitive_level:
question_type:
required_formulas: []
prerequisites: []
scenario_id:
answer_key_ref:
rubric_ref:
license_status:
```

Điểm liên quan:
```text
relevance_score =
  0.35 * atom_match
+ 0.20 * lesson_match
+ 0.15 * skill_match
+ 0.10 * formula_match
+ 0.10 * prerequisite_match
+ 0.10 * context_match
```

Không dùng điểm này để thay thế kiểm duyệt; nó chỉ dùng để xếp hạng.

## 7. PHÂN LOẠI BÀI TẬP
Một Knowledge Package nên có đủ, khi nguồn dữ liệu cho phép:
```text
A. Nhận biết
B. Thông hiểu
C. Áp dụng trực tiếp
D. Áp dụng nhiều bước
E. Giải thích hiện tượng
F. Phân tích dữ liệu
G. Thực nghiệm
H. Vận dụng thực tế
I. Chuyển giao
J. STEM/thiết kế
```

## 8. CÔNG THỨC TRONG EXPORT
Công thức phải được lưu đồng thời:
```yaml
formula_id:
source_anchor:
source_verbatim:
latex:
plain_text:
variables: []
units: []
conditions: []
example_calculation:
validation_status:
render_status:
```

### Output render
Frontend ưu tiên:
```html
<span class="formula" data-formula-id="F001">...</span>
```
render bằng KaTeX hoặc MathJax.

Không dùng chuỗi LaTeX tự do do LLM sinh trực tiếp tại thời điểm export.

### Formula QA
Trước khi cho phép export:
- source tồn tại;
- LaTeX hợp lệ;
- biến đủ;
- đơn vị đủ;
- không sai dấu ngoặc/chỉ số/mũ;
- test numerical example;
- render screenshot/regression test;
- kiểm tra mobile;
- kiểm tra copy/paste.

Nếu không đạt: `EXPORT_BLOCKED_FORMULA_ERROR`.

## 9. CẤU TRÚC KNOWLEDGE PACKAGE
```yaml
package_id:
package_version:
created_at:
selection:
source_dataset_version:
content_scope:
chapters: []
lessons: []
atoms: []
formulas: []
exercises: []
scenarios: []
phenomena: []
applications: []
experiments: []
resources: []
prerequisites: []
cross_links: []
rights_manifest: []
quality_report:
  source_coverage:
  formula_coverage:
  exercise_coverage:
  scenario_coverage:
  citation_coverage:
  link_health:
export_hash:
```

## 10. GIAO DIỆN CHỌN NỘI DUNG
Đề xuất UI:
```text
XUẤT KIẾN THỨC

[ ] Chương I
[ ] Chương II
[✓] Chương III
[ ] Chương IV
[✓] Chương V
...

HOẶC CHỌN BÀI
[✓] Bài 13
[✓] Bài 16
[✓] Bài 17

MỞ RỘNG
[x] Kiến thức cốt lõi
[x] Công thức
[x] Bài tập
[x] Tình huống
[x] Hiện tượng
[x] Ứng dụng
[x] Thí nghiệm
[x] Mô phỏng
[x] Web/Data
[x] Kiến thức nền cần thiết
[ ] Mở rộng nâng cao

BÀI TẬP
[✓] Nhận biết
[✓] Thông hiểu
[✓] Vận dụng
[✓] Phân tích dữ liệu
[ ] STEM

ĐỊNH DẠNG
( ) Trang web
( ) Markdown
( ) PDF
( ) DOCX
( ) JSON
( ) CSV

[ XEM TRƯỚC ] [ XUẤT ]
```

## 11. PREVIEW TRƯỚC KHI EXPORT
Phải hiển thị:
- số chương;
- số bài;
- số knowledge atom;
- số công thức;
- số bài tập;
- số tình huống;
- số hiện tượng;
- số tài nguyên web;
- số kiến thức nền kéo theo;
- cảnh báo quyền nguồn;
- cảnh báo nội dung chưa verified.

Ví dụ:
```text
Bạn đang xuất:
3 bài
27 kiến thức
8 công thức
54 bài tập
38 tình huống
19 tài nguyên web
4 kiến thức tiên quyết

Cảnh báo: 2 tài nguyên web đã hết hạn kiểm tra.
```

## 12. CHỐNG BỎ SÓT
Export phải chạy `Coverage Resolver`:
```text
selected_chapters
→ expected_lessons
→ expected_sections
→ expected_atoms
→ expected_formulas
→ expected_exercises
```

Nếu có phần tử kỳ vọng nhưng không tìm thấy:
```text
EXPORT_WARNING_MISSING_CONTENT
```

Nếu thiếu nguồn SGK/SGV ở phạm vi bắt buộc:
```text
EXPORT_BLOCKED_INCOMPLETE_SOURCE
```

Không cho phép “export thành công” nhưng âm thầm bỏ mất kiến thức.

## 13. CHỐNG TRÙNG
Một atom có thể liên quan nhiều bài. Khi export nhiều bài/chương:
- xuất atom một lần;
- ghi `appears_in_lessons`;
- ở vị trí khác chỉ tạo cross-reference.

Bài tập tương tự cũng phải deduplicate theo:
```text
source_id + exercise_hash
```

## 14. SMART ORDERING
Thứ tự đề xuất:
```text
YCCD/Mục tiêu
→ Kiến thức nền
→ Định nghĩa
→ Quan hệ/đặc điểm
→ Công thức
→ Ví dụ
→ Hiện tượng
→ Tình huống
→ Thí nghiệm/mô phỏng
→ Bài tập cơ bản
→ Bài tập áp dụng
→ Phân tích dữ liệu
→ Chuyển giao
→ STEM
```

Nếu có dependency graph, ưu tiên topological order thay vì thứ tự alphabet.

## 15. LIÊN KẾT WEB TRONG PACKAGE
Không chỉ đưa URL. Resource phải giữ:
```yaml
resource_id:
url:
title:
source_type:
provider:
language:
checked_at:
freshness_days:
license:
grade_fit:
atom_ids: []
phenomenon_ids: []
evidence_summary:
```

Có thể dùng:
- PhET cho simulation;
- nguồn giáo dục/đại học;
- Wikimedia Commons cho media có license phù hợp;
- Wikipedia như nguồn đọc thêm/bối cảnh;
- nguồn dữ liệu khoa học/khí tượng/môi trường chính thức;
- YouTube khi video đạt kiểm định.

## 16. SHEET / APPS SCRIPT
Bổ sung sheet:
```text
EXPORT_REQUESTS
EXPORT_ITEMS
EXPORT_PACKAGES
EXPORT_AUDIT
```

### EXPORT_REQUESTS
```text
request_id
user_id
selection_type
selection_json
include_core
include_prereq
include_practice
include_application
include_transfer
include_extension
exercise_filters
output_format
status
created_at
completed_at
package_hash
```

### Apps Script endpoints
```text
POST /export/preview
POST /export/create
GET  /export/status?id=
GET  /export/package?id=
GET  /export/download?id=
```

Apps Script chỉ xử lý orchestration nhẹ; không đưa toàn bộ Knowledge Graph vào cell formulas.

## 17. API CONTRACT
Request:
```json
{
  "selection": {
    "chapters": ["CH03"],
    "lessons": ["L13", "L16", "L17"],
    "atoms": []
  },
  "layers": ["CORE", "PREREQUISITE", "PRACTICE", "APPLICATION", "TRANSFER"],
  "exercise_filters": {
    "difficulty": [1,2,3,4],
    "types": ["concept", "calculation", "phenomenon", "data"]
  },
  "output": {
    "format": "pdf"
  }
}
```

Response preview:
```json
{
  "request_id": "REQ-...",
  "counts": {
    "lessons": 3,
    "atoms": 27,
    "formulas": 8,
    "exercises": 54,
    "scenarios": 38,
    "resources": 19
  },
  "warnings": [],
  "can_export": true
}
```

## 18. AI HỖ TRỢ EXPORT
AI có thể:
- giải thích vì sao một atom liên quan đến bài đã chọn;
- đề xuất thêm/chỉ ra kiến thức tiên quyết;
- xếp hạng bài tập;
- đề xuất tình huống bổ sung;
- gợi ý tài nguyên web.

AI **không được**:
- thay nguồn SGK/SGV;
- tự sửa công thức;
- tự gắn nội dung web thành kiến thức chính thức;
- tự xóa nội dung bị thiếu để làm đẹp package.

## 19. CÁC BỘ EXPORT CHUYÊN DỤNG
### Quick Revision
Định nghĩa + công thức + 5–10 bài tập trọng tâm.

### Full Knowledge
Toàn bộ atom + scenarios + applications + resources + exercises.

### Formula Sheet
Chỉ công thức, đại lượng, đơn vị, điều kiện, ví dụ.

### Phenomenon Pack
Hiện tượng → câu hỏi → kiến thức → giải thích → bằng chứng → ứng dụng.

### Practice Pack
Bài tập phân tầng theo kỹ năng/difficulty.

### Teacher Intervention Pack
Chỉ các kiến thức học sinh yếu + prerequisite + misconception + bài tập phục hồi.

### Exam Preparation Pack
Lọc theo chương/bài + mức độ nhận thức + dạng bài + công thức + kỹ năng.

## 20. THỐNG KÊ SAU EXPORT
Mỗi package phải ghi:
```text
coverage_rate
source_verified_rate
formula_verified_rate
exercise_link_rate
scenario_link_rate
resource_valid_rate
duplicate_rate
orphan_atom_rate
```

## 21. ACCEPTANCE TEST
### AT-EXP-01
Chọn một chương → tất cả bài của chương xuất đủ.

### AT-EXP-02
Chọn 3 bài → chỉ kiến thức của 3 bài + prerequisite theo policy.

### AT-EXP-03
Chọn 1 atom → package có đúng atom và các exercise/scenario liên quan.

### AT-EXP-04
Chọn nhiều bài có cùng atom → atom không trùng.

### AT-EXP-05
Có công thức chưa Formula Gate → export bị chặn hoặc loại khỏi package theo policy, phải báo rõ.

### AT-EXP-06
Có resource web hết hạn → package vẫn truy được nhưng phải cảnh báo và không đánh dấu “verified current”.

### AT-EXP-07
Đổi output PDF/DOCX/Markdown → nội dung nguồn và công thức phải tương đương.

### AT-EXP-08
Cùng selection + cùng dataset version → package hash giống nhau.

### AT-EXP-09
Thử thay đổi selection sau preview → package hash thay đổi và không sử dụng package cũ.

### AT-EXP-10
Tài khoản Student không được lấy rubric/answer_key Teacher.

## 22. DEFINITION OF DONE
Tính năng chỉ được xem là hoàn thành khi:
- chọn được Chương;
- chọn được nhiều Chương;
- chọn được Bài;
- chọn được nhiều Bài;
- chọn được Atom;
- preview chính xác phạm vi;
- truy xuất đúng kiến thức;
- truy xuất đúng công thức;
- truy xuất đúng bài tập liên quan;
- truy xuất tình huống/hiện tượng/ứng dụng;
- kéo được prerequisite theo policy;
- không trùng atom;
- có provenance;
- Formula Gate hoạt động;
- source coverage hoạt động;
- web resource có citation/license/freshness;
- có Sheet/App Script logging;
- có QA regression;
- có ít nhất Markdown + JSON export;
- có thể mở rộng PDF/DOCX mà không thay đổi dữ liệu lõi.
