# 09_LIFE_ENVIRONMENT_TOPIC.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Chủ đề
CHƯƠNG VIII — SINH VẬT VÀ MÔI TRƯỜNG

## Bài thuộc chủ đề
- Bài 41: Môi trường và các nhân tố sinh thái
- Bài 42: Quần thể sinh vật
- Bài 43: Quần xã sinh vật
- Bài 44: Hệ sinh thái
- Bài 45: Sinh quyển
- Bài 46: Cân bằng tự nhiên
- Bài 47: Bảo vệ môi trường

## Phạm vi SGK
SGK p.170–195
**SGV:** phải thực hiện crosswalk tới các trang tương ứng trong bản SGV người dùng cung cấp; không đoán số trang khi chưa trích xuất page anchor.

## Kiến trúc cải tiến cho chủ đề
### Bài 41 — Môi trường và nhân tố sinh thái
Coverage: 4 môi trường sống; nhân tố vô sinh/hữu sinh; tác động; giới hạn sinh thái.
Web link: dữ liệu nhiệt độ, mưa, nước, độ mặn, đất ở địa phương khi có nguồn đáng tin.

### Bài 42 — Quần thể
Coverage: khái niệm; số lượng; giới tính; lứa tuổi; phân bố; bảo vệ quần thể.
Tình huống: cá ao, lúa ruộng, chim, sâu hại, mật độ dân cư như analogy có kiểm soát.

### Bài 43 — Quần xã
Coverage: nhiều quần thể cùng tồn tại; độ đa dạng; thành phần; loài ưu thế/đặc trưng; bảo tồn.

### Bài 44 — Hệ sinh thái
Coverage: thành phần sống/không sống; quan hệ; dòng năng lượng/chuyển hóa vật chất theo phạm vi SGK; ví dụ hệ sinh thái.
Tình huống: ruộng lúa, ao cá, rừng ngập, vườn trường.

### Bài 45 — Sinh quyển
Coverage: sinh quyển; khu sinh học theo sách; quan hệ địa lí/sinh thái.

### Bài 46 — Cân bằng tự nhiên
Coverage: trạng thái cân bằng; biến động; vai trò quan hệ sinh thái; tác động khi một mắt xích thay đổi.
Tình huống: mất thiên địch, bùng phát sâu bệnh, phú dưỡng, cháy rừng, khai thác quá mức.

### Bài 47 — Bảo vệ môi trường
Coverage: tác động con người; suy thoái; ô nhiễm; biến đổi khí hậu; bảo vệ động vật hoang dã; điều tra môi trường địa phương. SGK yêu cầu điều tra hiện trạng ô nhiễm địa phương.

### Data web / GIS-lite
Cho phép nhập nhiệt độ, mưa, pH, độ mặn, chất lượng nước, số loài/cá thể; vẽ biểu đồ; so sánh với mốc nguồn; không gắn nhãn chẩn đoán môi trường nếu dữ liệu không đủ.
Sources: NASA/NOAA/World Meteorological Organization/official Vietnam environment sources/GBIF or equivalent biodiversity data when licensed and relevant.


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
