# MASTER ORCHESTRATOR — KHTN8 SMART NOTEBOOK COMPACT

Bộ hợp nhất: giữ nguyên chức năng V2 nhưng gom nhiều agent/contract liên quan vào ít file hơn. Không chia thư mục con.



---

# MASTER ORCHESTRATOR V2 - KHTN8 SMART NOTEBOOK

## Mục tiêu
Xây một hệ thống học KHTN 8 dựa trên nguồn SGK + SGV người dùng cung cấp, trong đó **không được bỏ sót knowledge atom** và mỗi knowledge atom phải có lớp ngữ cảnh thực tiễn, hiện tượng, cách dùng, bằng chứng, tương tác và cá nhân hóa.

## Luật bất biến
1. SGK/SGV là nguồn nền tảng để quyết định *học gì*.
2. Mọi mở rộng từ web/phương tiện phải được gắn `external_context=true` và nguồn/citation riêng.
3. Không coi một bài đã xong nếu còn trường bắt buộc chưa có dữ liệu.
4. Mỗi knowledge atom phải qua 4 kiểm tra: source coverage, semantic correctness, application coverage, assessment coverage.
5. Không gộp các kiến thức khác bản chất thành một atom chỉ để giảm số lượng.
6. Không dùng AI để tự “điền thiếu” nội dung SGK/SGV mà không có cờ `needs_source_verification`.
7. Mọi thay đổi schema đều phải cập nhật DATA_CONTRACT, DATA_DICTIONARY và Apps Script contract.

## Chuỗi agent
SOURCE_AUDITOR → SOURCE_EXTRACTOR → KNOWLEDGE_COMPLETENESS → KNOWLEDGE_GRAPH → YCCD → PHENOMENON → RESOURCE → INTERACTION → TUTOR → MISCONCEPTION → LAB → SCIENTIFIC_REASONING → ASSESSMENT → STUDENT_ANALYTICS → SHEET → APPS_SCRIPT → UI → BACKEND → QA → SCIENTIFIC_EVALUATION → COMMERCIAL → RELEASE.

## Definition of Done
- 47/47 bài có lesson manifest.
- 100% trang nội dung của SGK/SGV được đánh dấu đã đọc/kiểm tra.
- 100% knowledge atom có source anchor.
- 100% atom có ≥ 6 context classes và ≥ 3 application modes.
- 100% atom có ít nhất 1 diagnostic question và 1 transfer task.
- 100% event học tập có schema và sync test vào Google Sheets.
- Có audit log, version, citation, license và change history.



---

# V2 EXECUTION PROTOCOL

## Phase 0 - source lock
Lock the two provided PDFs and record version/hash.

## Phase 1 - 47 lesson extraction
Process LESSON_01 through LESSON_47. For each page, mark inspected, extract atoms, and store anchors.

## Phase 2 - completeness
Run KNOWLEDGE_COMPLETENESS_AGENT. Any missing item blocks release.

## Phase 3 - context expansion
For every atom, apply MULTI_SCENARIO_ENGINE and PHENOMENON_COVERAGE_MATRIX.

## Phase 4 - learning system
Attach interaction, tutor, misconceptions, labs, assessment, and analytics.

## Phase 5 - data system
Validate DATA_CONTRACT, Sheets schema, Apps Script API, input sheet, retry/idempotency, audit logs.

## Phase 6 - research and commercialization
Run scientific evaluation, product QA, rights/citation review, cost/observability, release checklist.

## Stop conditions
Stop publication when source coverage <100%, unresolved citation gaps exist, schema contract fails, or sync tests fail.



---

# AGENT HANDOFF PROTOCOL

## Mục tiêu
Cho phép OpenCode → Antigravity → Codex hoặc agent khác tiếp tục dự án mà không mất kiến trúc.

## Handoff record
```yaml
agent:
date:
task:
status:
files_changed:
decisions:
tests_run:
failures:
known_risks:
next_action:
```

## Quy tắc
Agent sau phải đọc:
1. MASTER ORCHESTRATOR
2. relevant contract
3. handoff record
4. test cases

Không được tự ý đổi schema/API mà không cập nhật contract.

