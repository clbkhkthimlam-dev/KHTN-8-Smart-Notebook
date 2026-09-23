# 04_DENSITY_PRESSURE_TOPIC.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Chủ đề
CHƯƠNG III — KHỐI LƯỢNG RIÊNG VÀ ÁP SUẤT

## Bài thuộc chủ đề
- Bài 13: Khối lượng riêng
- Bài 14: Thực hành xác định khối lượng riêng
- Bài 15: Áp suất trên một bề mặt
- Bài 16: Áp suất chất lỏng. Áp suất khí quyển
- Bài 17: Lực đẩy Archimedes

## Phạm vi SGK
SGK p.56–76
**SGV:** phải thực hiện crosswalk tới các trang tương ứng trong bản SGV người dùng cung cấp; không đoán số trang khi chưa trích xuất page anchor.

## Kiến trúc cải tiến cho chủ đề
### Bài 13–14 — Khối lượng riêng + đo đạc
Coverage: ý nghĩa khối lượng riêng; quan hệ khối lượng–thể tích; đơn vị; xác định bằng thí nghiệm; vật đều/không đều; chất lỏng; sai số do đo.
Công thức cốt lõi phải lấy nguyên dạng từ SGK/SGV và Formula Gate mới render.
Tình huống: sắt/nhôm; vật liệu xây dựng; kiểm tra chất lượng; đo vật không đều; chất lỏng.

### Bài 15 — Áp suất trên bề mặt
Coverage: áp lực; diện tích bị ép; áp suất; yếu tố ảnh hưởng; ứng dụng/biện pháp thay đổi áp suất.
Tình huống: giày cao gót; dao kéo; xe công trình; móng nhà; tuyết/cát; đệm/đinh.

### Bài 16 — Áp suất chất lỏng và khí quyển
Coverage: áp suất chất lỏng; phụ thuộc độ sâu/đại lượng theo sách; áp suất khí quyển; thí nghiệm/ứng dụng; lịch sử Torricelli/Pascal khi SGK nêu.
Tình huống: bể nước; vòi; đập; ống hút; giác hút; thời tiết; máy đo áp suất.

### Bài 17 — Lực đẩy Archimedes
Coverage: lực đẩy; hướng/độ lớn; thể tích phần chất lỏng bị chiếm chỗ theo nguồn; nổi/chìm; ứng dụng tàu, phao, đo thể tích.
Tình huống: tàu, phao, tàu ngầm, áo phao, cá, hydrometer, đo vật.

### Simulation/Data
PhET Density, Buoyancy; tạo thí nghiệm nhập m/V, F, S, h và tự sinh biểu đồ.


## Knowledge Atom Matrix — bắt buộc triển khai
Với **mỗi kiến thức nhỏ**, tạo record theo mẫu:
```yaml
atom_id:
source_anchor:
knowledge_statement:
exact_terms:
conditions:
representations:
prerequisites:
examples: []
counterexamples: []
phenomena: []
scenarios: [gia_dinh, truong_hoc, cong_nghe, san_xuat, moi_truong, problem_solving]
applications: []
experiment:
data:
misconception:
diagnostic_question:
transfer_task:
web_resources: []
formula_ids: []
status:
```

## Quy tắc “nhiều tình huống”
Mỗi atom phải có tối thiểu 6 tình huống **khác nhau về bối cảnh và biến số**. Mỗi tình huống sinh ít nhất 3 mức: nhận diện -> giải thích -> chuyển giao. Ít nhất 1 tình huống phải có dữ liệu/biểu đồ; ít nhất 1 tình huống phải có phương án sai để AI chẩn đoán.

## Liên kết kiến thức
- `prerequisite`: kiến thức phải có trước.
- `same_phenomenon`: hiện tượng dùng được cho nhiều atom.
- `cross_topic`: kiến thức liên chương.
- `web_evidence`: nguồn ngoài giúp quan sát/bổ sung dữ liệu, không thay lõi SGK.

## AI behavior
1. Không đưa đáp án ngay.
2. Hỏi lại để xác định kiểu sai.
3. Nếu học sinh đúng nhưng không giải thích được, gắn `mastery_application_gap`.
4. Nếu làm sai do kiến thức nền, truy `prerequisite_finder`.
5. Chọn scenario tiếp theo theo lỗi và kỹ năng, không chọn ngẫu nhiên.

## Web resource behavior
Mỗi atom có thể gọi:
- 1 nguồn giải thích/giáo dục;
- 1 nguồn hình/video;
- 1 mô phỏng/thí nghiệm số nếu có;
- 1 nguồn dữ liệu/hiện tượng thực;
- 1 nguồn đọc thêm.
Tất cả phải qua registry và license check.

## Dữ liệu Sheet/App Script
Mỗi interaction của chủ đề phải ghi tối thiểu: `student_id, lesson_id, atom_id, scenario_id, action, response, score, hints, duration, resource_id, timestamp, request_id`.

## Definition of Done của chủ đề
- Tất cả bài trong danh sách đã được page-audited.
- Tất cả atom có source anchor.
- Không còn `NEEDS_SOURCE_VERIFICATION` trên phần publish.
- Tất cả formula đã qua Formula Gate.
- Coverage tình huống đạt chuẩn.
- Web resource registry có citation/license/freshness.
- Có ít nhất 1 lab/simulation/data workflow khi phù hợp.
- QA và scientific evaluation có dữ liệu để kiểm tra.
