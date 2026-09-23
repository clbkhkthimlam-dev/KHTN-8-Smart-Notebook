# 16_REAL_WORLD_SCENARIO_IMAGE_INTELLIGENCE_DEEP.md

# KHTN 8 SMART NOTEBOOK — REAL-WORLD SCENARIO + CONCRETE IMAGE INTELLIGENCE

## 1. MỤC TIÊU
Biến phần “tình huống thực tế/thực tiễn” từ các ví dụ ngắn thành các **case study trực quan, có hình ảnh cụ thể, có dữ liệu và có nhiệm vụ học tập**.

Không được coi:
> “Hình ảnh minh họa + một câu chú thích”

là một tình huống hoàn chỉnh.

Một tình huống đạt chuẩn phải giúp học sinh:
`NHÌN THẤY → NHẬN RA → MÔ TẢ → ĐẶT CÂU HỎI → ĐOÁN → DÙNG KIẾN THỨC → ĐỌC BẰNG CHỨNG → GIẢI THÍCH → RA QUYẾT ĐỊNH → CHUYỂN GIAO`.

---

## 2. MỖI KNOWLEDGE ATOM PHẢI CÓ "SCENARIO PACK"
Mỗi `knowledge_atom` phải có:
- `scenario_count >= 6` đối với atom phù hợp với bối cảnh thực tế;
- tối thiểu 1 scenario có hình ảnh nguồn thật hoặc ảnh do giáo viên/cộng đồng cung cấp;
- tối thiểu 1 scenario có dữ liệu định lượng khi kiến thức cho phép;
- tối thiểu 1 scenario yêu cầu học sinh giải thích thay vì chỉ nhận diện;
- tối thiểu 1 scenario có biến thể `what_if`;
- tối thiểu 1 scenario ở bối cảnh Việt Nam/địa phương nếu có bằng chứng phù hợp;
- không tái sử dụng cùng một hình cho nhiều scenario nếu nó không mang thêm thông tin.

Nếu kiến thức không thích hợp với tình huống thực tiễn, phải ghi rõ `scenario_not_applicable_reason`, không ép tạo ví dụ giả.

---

## 3. CẤU TRÚC SCENARIO PACK
```yaml
scenario_id:
atom_id:
title:
context_class: [home, school, technology, agriculture, industry, health, environment, community, safety, local, decision]
location_context:
real_world_problem:
observation:
image_set:
  - image_id:
    image_type: [real_photo, diagram, microscopic, satellite, chart, screenshot, teacher_photo, student_photo, illustration]
    source_type: [official, education, wikimedia, open_data, user_upload, generated]
    source_url:
    creator:
    captured_at:
    checked_at:
    license:
    attribution:
    alt_text:
    visual_evidence:
    crop_regions:
    rights_status:

caption:
visual_question:
science_question:
known_data:
unknown:
student_action:
expected_reasoning:
evidence:
claim:
common_misconception:
hint_level_1:
hint_level_2:
hint_level_3:
what_if_variants: []
local_variants: []
related_atoms: []
resource_refs: []
assessment_refs: []
```

---

## 4. QUY TẮC "HÌNH ẢNH CỤ THỂ"
Hình phải chứa **bằng chứng nhìn thấy được** cho kiến thức đang học.

Ví dụ không đạt:
- ảnh chiếc xe + câu hỏi “lực là gì?”;
- ảnh bóng đèn + câu hỏi “dòng điện là gì?”.

Ví dụ đạt hơn:
- ảnh người dùng cờ-lê tác dụng lực ở các vị trí khác nhau, có đánh dấu khoảng cách đến trục → khai thác moment lực;
- ảnh hai vật có cùng thể tích nhưng khối lượng khác nhau trên cân + thông tin vật liệu → khai thác khối lượng riêng;
- ảnh bóng đèn sáng với ampe kế/vôn kế trên mạch → khai thác cường độ dòng điện/hiệu điện thế;
- ảnh nồi nước đang đun, kèm nhiệt độ theo thời gian → khai thác năng lượng nhiệt và truyền nhiệt;
- ảnh lá cây trong hai điều kiện ánh sáng khác nhau + số liệu đo → khai thác sinh học bằng bằng chứng.

Không được viết “ảnh có thể là...” rồi publish. Phải xác định chính xác ảnh, nguồn, nội dung nhìn thấy và kiến thức mà ảnh chứng minh.

---

## 5. IMAGE EVIDENCE LAYER
Mỗi ảnh phải có:
1. `what_is_visible` — nhìn thấy gì;
2. `what_is_measurable` — đo được gì;
3. `what_can_be_inferred` — suy luận gì;
4. `what_cannot_be_inferred` — không được kết luận gì;
5. `atom_relation` — liên hệ chính xác tới kiến thức nào;
6. `question_targets` — câu hỏi nào dùng được;
7. `source_provenance` — nguồn truy nguyên.

AI không được suy luận những đặc điểm không thể nhìn thấy trong ảnh.

---

## 6. NHIỀU HÌNH TRONG MỘT TÌNH HUỐNG
Ưu tiên một scenario dạng sequence khi hiện tượng có quá trình:

```text
Ảnh 1 — bối cảnh
↓
Ảnh 2 — chi tiết
↓
Ảnh 3 — biến đổi/thiết bị đo
↓
Ảnh 4 — kết quả
↓
Biểu đồ/bảng dữ liệu
↓
Kết luận
```

Ví dụ thí nghiệm:
```text
Thiết bị → thao tác → hiện tượng → số đo → bảng → đồ thị → giải thích
```

Ví dụ môi trường:
```text
Khu vực → dấu hiệu ô nhiễm → mẫu/đo đạc → dữ liệu → nguyên nhân khả dĩ → phương án xử lý
```

---

## 7. BẮT BUỘC CÓ CÂU HỎI "NHÌN HÌNH"
Mỗi scenario có hình phải sinh ít nhất 4 lớp câu hỏi:

### Lớp A — Quan sát
- Em thấy những gì?
- Có chi tiết nào bất thường?

### Lớp B — Kết nối kiến thức
- Hiện tượng này liên quan kiến thức nào?
- Đại lượng/biến nào có thể giải thích?

### Lớp C — Bằng chứng
- Chi tiết nào trong ảnh/dữ liệu ủng hộ nhận định?
- Cần đo thêm gì để kiểm chứng?

### Lớp D — Quyết định/chuyển giao
- Nếu thay đổi X thì điều gì xảy ra?
- Em sẽ chọn phương án nào? Vì sao?

---

## 8. IMAGE + WEB SEARCH INTELLIGENCE
Mỗi scenario cần chạy hai nhánh tìm kiếm:

```text
ATOM SEARCH
→ hình/diagram phù hợp kiến thức

PHENOMENON SEARCH
→ ảnh thật của hiện tượng
```

Tạo truy vấn có cấu trúc:
```text
[phenomenon] + [school level] + [country/locality]
[device/process] + [visible evidence]
[phenomenon] + data + chart
[phenomenon] + experiment + measurement
```

Không tìm một ảnh chỉ vì “đẹp”. Điểm ưu tiên là:
`evidence_value > educational_fit > source_trust > rights > resolution > aesthetics`.

---

## 9. NHIỀU LOẠI ẢNH PHẢI ĐƯỢC CÂN BẰNG
Tuỳ kiến thức, Resource Intelligence nên tìm:
- ảnh đời thực;
- ảnh thiết bị/dụng cụ;
- ảnh trước/sau;
- ảnh cận cảnh;
- sơ đồ;
- ảnh vi mô;
- ảnh vệ tinh/bản đồ;
- ảnh màn hình thiết bị đo;
- biểu đồ;
- bảng dữ liệu;
- ảnh thí nghiệm;
- ảnh địa phương.

Không thay ảnh thật bằng illustration nếu mục tiêu của bài là quan sát hiện tượng thực tế, trừ khi nguồn thật không phù hợp hoặc có vấn đề quyền sử dụng.

---

## 10. LOCAL CONTEXT
Mỗi chủ đề nên có một lớp địa phương khi có thể kiểm chứng:
- trường học;
- gia đình;
- nông nghiệp;
- nguồn nước;
- thời tiết;
- môi trường;
- sản xuất;
- giao thông;
- sức khỏe cộng đồng.

Đối với bối cảnh Việt Nam/ĐBSCL, có thể ưu tiên các hiện tượng phù hợp như nước, nhiệt, môi trường, nông nghiệp, điện, áp suất, sinh thái... nhưng chỉ dùng khi dữ liệu/ảnh có nguồn rõ ràng.

---

## 11. ẢNH DO NGƯỜI DÙNG CHỤP
Cho phép giáo viên/học sinh tải ảnh:
```text
Ảnh thực tế
→ Vision extraction
→ mô tả quan sát
→ gợi ý kiến thức liên quan
→ đề xuất câu hỏi
→ không khẳng định khoa học nếu bằng chứng không đủ
```

Dữ liệu ảnh phải có quyền riêng tư, không tự nhận diện danh tính học sinh, không công khai ảnh lên web nếu chưa có quyền.

---

## 12. AI VISION — QUY TẮC CHỐNG HALLUCINATION
AI phải phân tách:
- `observed` — nhìn thấy trực tiếp;
- `measured` — có số liệu;
- `inferred` — suy luận có căn cứ;
- `hypothesis` — giả thuyết;
- `unknown` — chưa xác định.

Không được biến `inferred` thành `observed`.

Ví dụ:
> Ảnh cho thấy dây tóc sáng.

Được phép:
> Có thể liên quan tới tác dụng phát sáng/tỏa nhiệt của dòng điện.

Không được tự kết luận:
> Dòng điện chính xác là 0,5 A.

nếu ảnh không có số đo.

---

## 13. TẠO TÌNH HUỐNG TỪ ẢNH
Có thể dùng một ảnh làm điểm khởi đầu:

```text
IMAGE
↓
OBJECTS
↓
VISIBLE PHENOMENA
↓
POSSIBLE CONCEPTS
↓
CURRICULUM MATCH
↓
QUESTION GENERATION
↓
EVIDENCE TASK
↓
APPLICATION TASK
```

Nhưng `possible_concepts` chỉ là candidate. Chỉ khi đối chiếu Knowledge Graph + source anchor thì mới được gắn atom chính thức.

---

## 14. CHUẨN CHẤT LƯỢNG HÌNH ẢNH
Mỗi ảnh phải kiểm:
- đủ độ phân giải;
- không watermark gây che bằng chứng;
- không mờ phần thiết bị/số liệu quan trọng;
- crop đúng vùng cần quan sát;
- alt text đầy đủ;
- caption không dẫn dắt sai;
- có license/permission phù hợp;
- không chứa dữ liệu cá nhân nhạy cảm;
- nếu là screenshot web thì lưu URL và ngày kiểm tra.

---

## 15. ẢNH + FORMULA
Nếu ảnh có bảng số đo để học sinh suy ra/calculate formula:
```text
IMAGE DATA
→ OCR/vision
→ manual verification
→ structured data
→ formula atom
→ calculation
→ answer
```

Không được dùng OCR tự động làm nguồn duy nhất cho một phép tính quan trọng.

---

## 16. SCENARIO QUALITY SCORE
```text
scenario_score =
  0.20 * visual_evidence
+ 0.15 * curriculum_match
+ 0.15 * scientific_accuracy
+ 0.10 * authenticity
+ 0.10 * data_value
+ 0.10 * interaction_value
+ 0.10 * transfer_value
+ 0.05 * source_trust
+ 0.05 * rights_quality
```

Ngưỡng publish đề xuất >= 0.80. Scenario dưới ngưỡng phải chỉnh sửa hoặc gắn `NEEDS_REVIEW`.

---

## 17. SCENARIO LIBRARY — KHÔNG TRÙNG LẶP
Một atom có thể có nhiều scenario nhưng phải đa dạng về:
- bối cảnh;
- vật thể;
- địa điểm;
- dữ liệu;
- mục tiêu;
- biến thay đổi;
- quyết định cần đưa ra.

Không chấp nhận:
```text
xe đạp → xe máy → ô tô
```
chỉ để tạo 3 scenario nếu cả ba đều đặt cùng một câu hỏi và không thay đổi năng lực cần đánh giá.

---

## 18. LIÊN KẾT VỚI KNOWLEDGE EXPORT
Khi người dùng chọn:
- Chương;
- Bài;
- Knowledge Atom;

Smart Knowledge Export phải cho phép:
```text
[✓] Kiến thức
[✓] Công thức
[✓] Ví dụ
[✓] Hình ảnh thực tế
[✓] Tình huống
[✓] Hiện tượng
[✓] Dữ liệu
[✓] Bài tập
[✓] Thí nghiệm
[✓] Mô phỏng
[✓] Web resources
```

Có bộ lọc riêng:
```text
Image-rich
Data-rich
Local context
Experiment-rich
Application-rich
```

---

## 19. GÓI XUẤT "PRACTICAL SCIENCE PACK"
Một export chuyên về thực tiễn có cấu trúc:

```text
1. Kiến thức cốt lõi
2. Hình ảnh 1 — bối cảnh
3. Hình ảnh 2 — bằng chứng
4. Câu hỏi quan sát
5. Câu hỏi khoa học
6. Dữ liệu/bảng/biểu đồ
7. Công thức liên quan
8. Bài tập áp dụng
9. What-if
10. Giải thích bằng bằng chứng
11. Ứng dụng đời sống
12. Thí nghiệm/mô phỏng tiếp nối
13. Nguồn web + bản quyền
```

---

## 20. ACCEPTANCE GATE
Một scenario có hình chỉ được `PUBLISHED` khi:
- [ ] liên kết đúng knowledge atom;
- [ ] ảnh thực sự cho thấy bằng chứng liên quan;
- [ ] nguồn/giấy phép xác định được;
- [ ] caption và alt text chính xác;
- [ ] không có suy diễn ngoài bằng chứng;
- [ ] có ít nhất 4 lớp câu hỏi;
- [ ] có ít nhất 1 nhiệm vụ áp dụng/chuyển giao;
- [ ] nếu có số liệu thì số liệu đã kiểm chứng;
- [ ] có khả năng truy nguyên về web/source;
- [ ] không vi phạm quyền riêng tư;
- [ ] không trùng với scenario khác về bản chất.

## 21. NGUYÊN TẮC CUỐI
**Hình ảnh không phải đồ trang trí. Hình ảnh là một phần của bằng chứng học tập.**

Mục tiêu cuối cùng:

```text
HỌC SINH NHÌN THẤY MỘT HIỆN TƯỢNG THẬT
        ↓
ĐẶT CÂU HỎI
        ↓
NHẬN RA KIẾN THỨC KHTN
        ↓
DÙNG HÌNH + DỮ LIỆU + THÍ NGHIỆM
        ↓
GIẢI THÍCH
        ↓
ĐƯA RA QUYẾT ĐỊNH
        ↓
CHUYỂN GIAO SANG TÌNH HUỐNG MỚI
```
