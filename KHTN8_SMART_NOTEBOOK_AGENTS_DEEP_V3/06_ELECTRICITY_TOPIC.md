# 06_ELECTRICITY_TOPIC.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Chủ đề
CHƯƠNG V — ĐIỆN

## Bài thuộc chủ đề
- Bài 20: Hiện tượng nhiễm điện do cọ xát
- Bài 21: Dòng điện, nguồn điện
- Bài 22: Mạch điện đơn giản
- Bài 23: Tác dụng của dòng điện
- Bài 24: Cường độ dòng điện và hiệu điện thế
- Bài 25: Thực hành đo cường độ dòng điện và hiệu điện thế

## Phạm vi SGK
SGK p.84–105
**SGV:** phải thực hiện crosswalk tới các trang tương ứng trong bản SGV người dùng cung cấp; không đoán số trang khi chưa trích xuất page anchor.

## Kiến trúc cải tiến cho chủ đề
### Bài 20 — Nhiễm điện do cọ xát
Coverage: vật nhiễm điện; hút vật khác; điện tích cùng/khác dấu; electron dịch chuyển theo giải thích của sách; điện nghiệm; sét và an toàn.
Tình huống: lược hút tóc; quần áo dính; bụi; sơn tĩnh điện; sét; linh kiện điện tử.

### Bài 21–22 — Dòng điện, nguồn điện, mạch đơn giản
Coverage: dòng điện; nguồn; cực; vật dẫn/cách điện; mạch kín; sơ đồ; công tắc; kiểm tra mạch.
Tình huống: pin, đèn, motor nhỏ, đồ chơi, mạch trên breadboard, lỗi đứt dây.

### Bài 23 — Tác dụng dòng điện
Coverage: nhiệt, phát sáng, hóa học, sinh lí theo SGK; ứng dụng và an toàn.

### Bài 24–25 — Cường độ dòng điện và hiệu điện thế
Coverage: ý nghĩa hai đại lượng; ampe kế/voltmeter; mắc đúng chốt/đầu; đọc số; so sánh trong mạch; thực hành đo.
Cấm thêm định luật ngoài phạm vi nếu SGK/SGV không dạy.

### Simulation
PhET Circuit Construction Kit: DC; Charges and Fields; Balloons and Static Electricity.
### Data
Mỗi phép đo lưu giá trị, đơn vị, vị trí đo, thiết bị, thời gian, lần đo, outlier flag.


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
