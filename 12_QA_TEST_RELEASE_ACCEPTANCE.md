# QA + TEST CASES + RELEASE + FINAL ACCEPTANCE



---

# AGENT 22 — QA / VALIDATION

## 7 tầng kiểm thử
1. Schema
2. Content
3. Pedagogy
4. Source/citation
5. Security
6. Integration
7. E2E

## Content tests
- lesson_id hợp lệ;
- concept có source;
- resource URL hợp lệ;
- activity có rubric/feedback;
- không có placeholder production.

## Integration E2E
INPUT Sheet
→ Apps Script
→ EVENTS
→ app read
→ dashboard update.

## Regression
Mỗi release chạy lại:
- health;
- auth;
- CRUD/read;
- duplicate request;
- bad input;
- broken resource;
- mobile layout;
- accessibility.

## Gate
Không release nếu có lỗi P0/P1.


## V2 mandatory dependency
This agent MUST consume `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, and the applicable `02_KHTN8_47_LESSONS_COMPLETE.md` before producing final data.



---

# TEST CASES — PRODUCTION

## TC01 Health
Expected: API + Sheet reachable.

## TC02 Input write
INPUT B2:B10 → EVENTS new row.

## TC03 Duplicate
Same request_id twice → one event.

## TC04 Invalid score
score > max_score → VALIDATION_ERROR.

## TC05 Lesson query
lesson_id valid → lesson + resources + activities.

## TC06 Adaptive
student mastery low → easier activity + prerequisite.

## TC07 Misconception
Wrong conceptual pattern → misconception tag + repair.

## TC08 Resource broken
URL unavailable → mark broken + fallback resource.

## TC09 Citation
AI output with external fact → source_refs non-empty.

## TC10 Security
Missing/invalid auth → reject.

## TC11 Offline
Temporary API failure → local queue/retry without duplicate.

## TC12 Analytics
Events → mastery update → dashboard.

## TC13 Accessibility
Keyboard, labels, contrast, screen-reader semantics.

## TC14 Mobile
Student flow usable on phone.

## TC15 Recovery
Apps Script exception → user sees actionable error; audit log recorded.



---

# RELEASE CHECKLIST

## Content
- [ ] SGK/SGV coverage audited
- [ ] lesson graph complete
- [ ] YCCD mapping reviewed
- [ ] phenomenon mapping reviewed
- [ ] resource verification complete
- [ ] citations/license complete

## Learning
- [ ] multi-level interaction
- [ ] adaptive hints
- [ ] misconception repair
- [ ] experiment notebook
- [ ] assessment rubric

## Data
- [ ] schema version
- [ ] INPUT cells
- [ ] EVENTS
- [ ] MASTERY
- [ ] AUDIT_LOG
- [ ] idempotency

## Apps Script
- [ ] deployment
- [ ] auth
- [ ] health check
- [ ] LockService
- [ ] error handling
- [ ] rate limit

## Product
- [ ] onboarding
- [ ] teacher dashboard
- [ ] student flow
- [ ] reports
- [ ] pricing
- [ ] support

## Scientific
- [ ] research protocol
- [ ] metrics definitions
- [ ] baseline
- [ ] pre/post test
- [ ] limitations

## Production
- [ ] security
- [ ] backup
- [ ] monitoring
- [ ] rollback
- [ ] privacy notice



---

# FINAL SYSTEM ACCEPTANCE

Sản phẩm đạt khi người dùng có thể:

1. Chọn bài KHTN 8.
2. Xem kiến thức nguồn.
3. Chọn một hiện tượng thực tế.
4. Xem hình/video/mô phỏng từ nhiều nguồn.
5. Tương tác ít nhất 4 cấp độ.
6. Làm thí nghiệm hoặc nhiệm vụ dữ liệu.
7. Nhận hint thích ứng.
8. Nhận chẩn đoán lỗi.
9. Thực hiện nhiệm vụ vận dụng.
10. Lưu portfolio.
11. Giáo viên nhập dữ liệu qua INPUT Sheet.
12. Apps Script nhận và ghi EVENTS.
13. App đọc lại tiến bộ.
14. Dashboard thống kê.
15. Mọi tài nguyên có source/license/status.
16. Có log/audit.
17. Có test E2E.
18. Có tài liệu triển khai.
19. Có cơ chế rollback.
20. Có bộ chỉ số để đánh giá khoa học hiệu quả giáo dục.

Không gọi là “sản phẩm thương mại hoàn chỉnh” nếu thiếu bất kỳ mục production-critical nào.


---

# FORMULA QA GATE — P0 CONTENT INTEGRITY

Công thức sai được xem là lỗi nội dung mức nghiêm trọng, không được phát hành.

## Mandatory tests

### F01 — Source fidelity
`verbatim_source` khớp ảnh trang nguồn.

### F02 — Symbol integrity
Không mất/chèn/thay ký hiệu.

### F03 — Unit integrity
Đơn vị của đại lượng và kết quả đúng theo nguồn; quy đổi phải có rule.

### F04 — Condition integrity
Công thức chỉ được hiển thị như công thức áp dụng khi điều kiện đã xác định.

### F05 — Algebra integrity
Các dạng biến đổi phải suy ra đúng từ công thức gốc.

### F06 — Numerical validation
Ít nhất một ví dụ số hợp lệ phải cho kết quả đúng và có kiểm tra ngược khi phù hợp.

### F07 — Render integrity
KaTeX/MathJax không lỗi, không tràn dòng, không mất phân số/chỉ số/mũ/ký hiệu.

### F08 — Cross-source integrity
SGK và SGV được đối chiếu. Khác biệt phải có `SOURCE_DISCREPANCY`, không tự hợp nhất.

### F09 — OCR integrity
Nếu công thức lấy từ OCR, phải đối chiếu ảnh trước khi nhập kho chính thức.

### F10 — Export integrity
Công thức đúng cả trên web, mobile và file xuất nếu có.

## Release blocker
```text
P0 = công thức sai hoặc làm thay đổi nghĩa khoa học.
P1 = công thức đúng nhưng hiển thị sai gây hiểu nhầm.
```
Cả P0 và P1 đều block release.
