# 07_HEAT_TOPIC.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Chủ đề
CHƯƠNG VI — NHIỆT

## Bài thuộc chủ đề
- Bài 26: Năng lượng nhiệt và nội năng
- Bài 27: Thực hành đo năng lượng nhiệt bằng Joulemeter
- Bài 28: Sự truyền nhiệt
- Bài 29: Sự nở vì nhiệt

## Phạm vi SGK
SGK p.105–123
**SGV:** phải thực hiện crosswalk tới các trang tương ứng trong bản SGV người dùng cung cấp; không đoán số trang khi chưa trích xuất page anchor.

## Kiến trúc cải tiến cho chủ đề
### Bài 26 — Năng lượng nhiệt và nội năng
Coverage: chuyển động nhiệt; năng lượng nhiệt; nội năng; động năng/thế năng vi mô; làm tăng/giảm nội năng; truyền năng lượng. SGK mô tả khi làm nóng vật, chuyển động phân tử nhanh lên và nội năng tăng.
Tình huống: nước nóng, xoa tay, phanh xe, chà sát, nấu ăn, động cơ.

### Bài 27 — Joulemeter
Coverage: quy trình đo; nguồn điện/thiết bị; ghi năng lượng; xử lí số liệu; kiểm soát sai số.

### Bài 28 — Sự truyền nhiệt
Coverage: dẫn nhiệt, đối lưu, bức xạ; vật liệu; ứng dụng cách nhiệt/tản nhiệt.
Tình huống: nồi, phích, mái nhà, quạt, áo, bình giữ nhiệt, pin/thiết bị.

### Bài 29 — Sự nở vì nhiệt
Coverage: nở vì nhiệt; chất rắn/lỏng/khí; ứng dụng và phòng tránh.
Tình huống: khe co giãn cầu; đường ray; dây điện; nhiệt kế; nắp chai; bóng khí.

### Simulation/data
PhET Energy Forms and Changes và bộ ghi dữ liệu Joulemeter.


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
