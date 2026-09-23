# 08_HUMAN_BODY_TOPIC.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Chủ đề
CHƯƠNG VII — SINH HỌC CƠ THỂ NGƯỜI

## Bài thuộc chủ đề
- Bài 30: Khái quát về cơ thể người
- Bài 31: Hệ vận động ở người
- Bài 32: Dinh dưỡng và tiêu hóa ở người
- Bài 33: Máu và hệ tuần hoàn của cơ thể người
- Bài 34: Hệ hô hấp ở người
- Bài 35: Hệ bài tiết ở người
- Bài 36: Điều hòa môi trường trong của cơ thể người
- Bài 37: Hệ thần kinh và các giác quan ở người
- Bài 38: Hệ nội tiết ở người
- Bài 39: Da và điều hòa thân nhiệt ở người
- Bài 40: Sinh sản ở người

## Phạm vi SGK
SGK p.123–170
**SGV:** phải thực hiện crosswalk tới các trang tương ứng trong bản SGV người dùng cung cấp; không đoán số trang khi chưa trích xuất page anchor.

## Kiến trúc cải tiến cho chủ đề
### Bài 30 — Tổ chức cơ thể
Coverage: các phần cơ thể; tế bào -> mô -> cơ quan -> hệ cơ quan -> cơ thể; phối hợp hệ cơ quan.

### Bài 31 — Hệ vận động
Coverage: xương, khớp, cơ; vận động; tư thế; vệ sinh; chấn thương; luyện tập.
Tình huống: cặp sách, ngồi học, thể thao, gãy xương, ergonomics.

### Bài 32 — Dinh dưỡng và tiêu hóa
Coverage: chất dinh dưỡng; nhu cầu; ống tiêu hóa; cơ quan; tiêu hóa cơ học/hóa học; hấp thụ; vệ sinh.
Tình huống: bữa ăn, nhãn thực phẩm, năng lượng, béo phì/suy dinh dưỡng, an toàn thực phẩm.

### Bài 33 — Máu và tuần hoàn
Coverage: thành phần máu; chức năng; tim; mạch; vòng tuần hoàn; bảo vệ sức khỏe theo SGK.
Tình huống: vận động, mạch đập, mất máu, truyền máu (theo phạm vi sách), huyết áp như ngữ cảnh nếu nguồn cho phép.

### Bài 34 — Hô hấp
Coverage: cơ quan; đường đi không khí; trao đổi khí; thông khí; vệ sinh.
Tình huống: chạy, khói thuốc, bụi, khẩu trang, thông gió.

### Bài 35 — Bài tiết
Coverage: cơ quan bài tiết; vai trò; nước tiểu theo tiến trình sách; vệ sinh.

### Bài 36 — Môi trường trong và điều hòa
Coverage: cân bằng môi trường trong; phối hợp điều hòa; các yếu tố/ cơ chế theo SGK.

### Bài 37 — Thần kinh và giác quan
Coverage: hệ thần kinh; phản xạ; cơ quan cảm giác; bảo vệ mắt/tai; đáp ứng kích thích theo sách.
Tình huống: ánh sáng màn hình, phản xạ, tiếng ồn, cân bằng, học tập.

### Bài 38 — Nội tiết
Coverage: hormone, tuyến nội tiết, vai trò điều hòa theo SGK.

### Bài 39 — Da và điều hòa thân nhiệt
Coverage: cấu tạo/chức năng da; bảo vệ; cảm giác; điều hòa nhiệt.
Tình huống: nắng nóng, mồ hôi, bỏng, vệ sinh, chống nắng.

### Bài 40 — Sinh sản
Coverage: hệ sinh dục; thụ tinh; thụ thai; kinh nguyệt; tránh thai; bệnh lây truyền qua đường sinh dục; sức khỏe sinh sản vị thành niên. Nội dung sức khỏe nhạy cảm phải trình bày khoa học, an toàn, có kiểm soát độ tuổi.

### Web
Nguồn y tế/giáo dục chính thức làm external context; hình giải phẫu từ nguồn có license; dữ liệu sức khỏe chỉ ở mức giáo dục, không chẩn đoán.


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
