# 02_CHEMICAL_REACTIONS_TOPIC.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Chủ đề
CHƯƠNG I — PHẢN ỨNG HÓA HỌC

## Bài thuộc chủ đề
- Bài 2: Phản ứng hóa học
- Bài 3: Mol và tỉ khối chất khí
- Bài 4: Dung dịch và nồng độ
- Bài 5: Định luật bảo toàn khối lượng và phương trình hóa học
- Bài 6: Tính theo phương trình hóa học
- Bài 7: Tốc độ phản ứng và chất xúc tác

## Phạm vi SGK
SGK p.11–35
**SGV:** phải thực hiện crosswalk tới các trang tương ứng trong bản SGV người dùng cung cấp; không đoán số trang khi chưa trích xuất page anchor.

## Kiến trúc cải tiến cho chủ đề
### Bài 2 — Phản ứng hóa học
Coverage: biến đổi vật lí/hoá học; phản ứng; chất phản ứng/sản phẩm; biến đổi liên kết; dấu hiệu tạo chất mới; điều kiện phản ứng; năng lượng phản ứng; phản ứng tỏa nhiệt/thu nhiệt; ứng dụng.
Hiện tượng: nến cháy; than cháy; kim loại + acid; tạo kết tủa; đổi màu; khí thoát; nung đá vôi; đốt nhiên liệu.

### Bài 3 — Mol và tỉ khối chất khí
Coverage: lượng chất; mol; khối lượng mol; quan hệ giữa n, m, M; thể tích mol khí theo đúng điều kiện SGK; tỉ khối; suy luận/nhận biết khí.
Formula Gate: chỉ publish đúng biểu thức và điều kiện ghi trong SGK/SGV.
Tình huống: bóng bay, bình khí, khí thải, nấu ăn, xác định khí nhẹ/nặng hơn không khí.

### Bài 4 — Dung dịch và nồng độ
Coverage: dung môi/dung dịch/chất tan; độ tan (nếu nguồn nêu); nồng độ phần trăm; nồng độ mol; pha loãng/pha chế theo đúng dữ liệu nguồn.
Tình huống: nước muối; pha dung dịch sát khuẩn; phân bón hòa tan; xử lí mẫu; pha dung dịch trong lab.

### Bài 5 — Bảo toàn khối lượng + PTHH
Coverage: định luật; lập phương trình; hệ số; ý nghĩa; cân bằng nguyên tố.
Misconception: “chỉ cần số phân tử hai bên bằng nhau”; sửa thành bảo toàn số nguyên tử từng nguyên tố.

### Bài 6 — Tính theo PTHH
Coverage: đổi giữa khối lượng–mol–thể tích/đại lượng mà SGK quy định; tỉ lệ hệ số; dữ liệu dư/thiếu chỉ thêm nếu nguồn cho phép.

### Bài 7 — Tốc độ phản ứng và chất xúc tác
Coverage: nhanh/chậm; yếu tố ảnh hưởng theo thí nghiệm của sách; chất xúc tác; biểu diễn kết quả.
Tình huống: nghiền nhỏ chất rắn; nhiệt độ; nồng độ; xúc tác; bảo quản thực phẩm; cháy nổ.

### Engine liên kết
`atom -> phenomenon -> observation -> variable -> prediction -> data -> explanation -> application`.
Web: PhET Balancing Chemical Equations, Concentration, Acid-Base Solutions (khi phù hợp); Khan Academy chemistry; Wikipedia/Wikimedia background.


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
