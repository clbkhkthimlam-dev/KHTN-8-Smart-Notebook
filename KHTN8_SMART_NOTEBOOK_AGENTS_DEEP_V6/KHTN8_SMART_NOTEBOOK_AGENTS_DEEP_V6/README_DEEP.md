# KHTN8_SMART_NOTEBOOK_AGENTS_DEEP

Bộ MD cải tiến theo yêu cầu: flat single directory, không thư mục con; giữ nguyên chức năng Smart Notebook + AI + web resources + lab + analytics + Sheets/App Script + scientific evaluation + commercial release.

## Trọng tâm nâng cấp
- 9 MD chuyên đề: Bài 1 + 8 chương.
- Mỗi kiến thức = knowledge atom có truy nguyên.
- Mỗi atom có nhiều hiện tượng/tình huống và ứng dụng.
- Web là resource intelligence layer, không trộn nguồn vào lõi SGK.
- Công thức có Formula Gate và render regression.
- Dữ liệu app ↔ Google Sheets ↔ Apps Script theo event contract.

## Nguồn web tham chiếu nền
- SGKVN/online book index để đối chiếu cấu trúc bài.
- PhET cho mô phỏng.
- Khan Academy cho tài nguyên học tập.
- Wikimedia Commons cho media theo license.
- Wikipedia cho background.

## Tính năng mới — Smart Knowledge Export
Bộ MD hiện hỗ trợ đặc tả chức năng chọn một/nhiều Chương, một/nhiều Bài hoặc Knowledge Atom rồi xuất gói kiến thức tương ứng gồm định nghĩa, công thức, bài tập liên quan, hiện tượng, tình huống, ứng dụng, thí nghiệm, mô phỏng, kiến thức tiên quyết và tài nguyên web.

Module: `15_KNOWLEDGE_EXPORT_ENGINE_DEEP.md`

## Nâng cấp tình huống thực tế bằng hình ảnh
Module `16_REAL_WORLD_SCENARIO_IMAGE_INTELLIGENCE_DEEP.md` biến mỗi tình huống thành một case study trực quan: hình ảnh cụ thể + bằng chứng + dữ liệu + câu hỏi + ứng dụng + what-if + chuyển giao. Hình ảnh phải có nguồn, quyền sử dụng, alt text, caption và quan hệ rõ với knowledge atom; không được dùng ảnh chỉ để trang trí.


## V4 — Xuất/In tài liệu
`17_DOCUMENT_EXPORT_RENDER_DEEP.md` bổ sung pipeline xuất DOCX/PDF và in A4, xử lý UTF-8/NFC, font tiếng Việt, nhúng hình ảnh, công thức, nguồn, QR/link web, preview và regression test. Mọi bản xuất chính thức phải vượt các gate Unicode + Formula + Layout + Provenance.

## V5 — LIÊN MÔN THEO MẠCH GIẢI QUYẾT VẤN ĐỀ
Bổ sung `18_INTERDISCIPLINARY_PROBLEM_SOLVING_GRAPH_DEEP.md`.

Điểm mới: sản phẩm không chỉ liên kết “kiến thức liên quan”, mà xây dựng **Problem Graph** song song với **Lesson Graph**. Một tình huống thực tế được phân rã thành các subproblem và hệ thống truy xuất **Minimal Sufficient Knowledge Path** — tập kiến thức nhỏ nhất nhưng đủ để học sinh giải quyết đúng nút thắt.

Mọi liên kết liên môn phải có vai trò cụ thể: prerequisite, explain, measure, calculate, constrain, evidence, decision, design hoặc validation.

## V6 — FORMULA RELIABILITY UPGRADE
Bản V6 bổ sung một Formula Integrity System độc lập nhằm xử lý các lỗi công thức và lỗi bố trí công thức đã phát hiện. Công thức được quản lý như dữ liệu có cấu trúc, có source anchor, version, semantic check và visual regression. Web, DOCX, PDF phải dùng cùng một `formula_id` canonical.
