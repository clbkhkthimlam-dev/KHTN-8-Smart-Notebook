# 00_MASTER_ORCHESTRATOR_DEEP.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Mục tiêu
Xây Smart KHTN 8 theo mô hình:
`Hiện tượng thực tế -> câu hỏi -> kiến thức SGK/SGV -> bằng chứng -> mô phỏng/thí nghiệm -> dữ liệu -> AI suy luận -> chẩn đoán -> nhiệm vụ cá nhân hóa -> portfolio`.

## Phạm vi nguồn
- SGK người dùng cung cấp: 199 trang; nội dung gồm Bài 1 và 47 bài trong 8 chương.
- SGV người dùng cung cấp: 246 trang; dùng để đối chiếu mục tiêu, tiến trình hoạt động, thí nghiệm, câu hỏi, đánh giá, lưu ý sư phạm.
- Mục lục SGK xác nhận: Bài 1 + Chương I 2–7; Chương II 8–12; Chương III 13–17; Chương IV 18–19; Chương V 20–25; Chương VI 26–29; Chương VII 30–40; Chương VIII 41–47.

## 9 MD chuyên đề
1. 01_LAB_SAFETY_TOPIC.md — Bài 1
2. 02_CHEMICAL_REACTIONS_TOPIC.md — Bài 2–7
3. 03_COMMON_COMPOUNDS_TOPIC.md — Bài 8–12
4. 04_DENSITY_PRESSURE_TOPIC.md — Bài 13–17
5. 05_TORQUE_LEVERS_TOPIC.md — Bài 18–19
6. 06_ELECTRICITY_TOPIC.md — Bài 20–25
7. 07_HEAT_TOPIC.md — Bài 26–29
8. 08_HUMAN_BODY_TOPIC.md — Bài 30–40
9. 09_LIFE_ENVIRONMENT_TOPIC.md — Bài 41–47

## Quy trình thực thi
### Phase A — Book audit
- Kiểm từng trang SGK và SGV.
- Lập bảng `page -> lesson -> section -> activity -> knowledge_atom -> formula_atom`.
- Đối chiếu chéo SGK↔SGV; mọi sai lệch ghi `SOURCE_DISCREPANCY`.

### Phase B — Atomization
Không tách theo “một bài = một kiến thức”. Tách đến mức một khẳng định/quan hệ có thể được đánh giá độc lập.

### Phase C — Scenario expansion
Mỗi atom phải có ít nhất các lớp: gia đình, trường học, công nghệ, sản xuất/nông nghiệp, môi trường/cộng đồng, quyết định/giải quyết vấn đề. Có thể thêm sức khỏe-an toàn, địa phương, dữ liệu, bất thường, STEM.

### Phase D — Web intelligence
Web không chỉ là link. Tạo `resource_candidate` với: source_type, trust, grade_fit, language, license, freshness, query, evidence, relation_to_atom.

### Phase E — Data
Google Sheet/App Script là tầng ingest/analytics có contract; mọi lượt học, câu trả lời, hint, thời gian, thí nghiệm, kết quả, lỗi, mastery phải có event_id/request_id.

### Phase F — Release gates
Không release khi: thiếu coverage; công thức chưa kiểm chứng; link hỏng; citation thiếu; dữ liệu không idempotent; tính toán sai; không truy nguyên về nguồn.

## Module mới — Smart Knowledge Export
`15_KNOWLEDGE_EXPORT_ENGINE_DEEP.md` là module bắt buộc cho chức năng chọn Chương/Bài/Knowledge Atom và xuất gói kiến thức có liên kết thông minh.

Export phải lấy dữ liệu từ Knowledge Graph, không copy trực tiếp từ frontend. Gói có các tầng CORE → PREREQUISITE → PRACTICE → APPLICATION → TRANSFER → EXTENSION; có Formula Gate, Coverage Resolver, Exercise Relevance Engine, Provenance và Package Hash.

Không được coi export là “xuất text”. Export là một pipeline tạo `Knowledge Package` có thể tái lập và kiểm định.
