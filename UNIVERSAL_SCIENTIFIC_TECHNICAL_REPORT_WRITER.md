# UNIVERSAL SCIENTIFIC–TECHNICAL REPORT WRITER
## MD dùng chung cho mọi dự án khoa học, kỹ thuật, phần mềm, AI, STEM, IoT, giáo dục và sản phẩm công nghệ

> **Mục tiêu:** Chỉ cần cung cấp tên dự án, sản phẩm, dữ liệu, tài liệu gốc và các tài liệu tham khảo, agent phải có khả năng xây dựng một **báo cáo/thuyết minh khoa học kỹ thuật hoàn chỉnh**, bám đúng **khung hình thức của mẫu người dùng cung cấp**, nhưng nội dung phải được xây dựng từ **dự án thực tế + nghiên cứu khoa học + bằng chứng thực nghiệm**.
>
> **Không dùng MD này để viết văn quảng cáo.**
> Đây là quy trình biến một ý tưởng/sản phẩm thành một hồ sơ có thể trả lời được:
>
> **Vấn đề gì? → Đã có ai nghiên cứu gì? → Còn thiếu gì? → Vì sao cần giải pháp này? → Mới ở đâu? → Làm như thế nào? → Đo bằng gì? → Kết quả ra sao? → Có bằng chứng không? → Cải tiến thế nào?**

---

# 1. NGUYÊN TẮC CAO NHẤT

## 1.1. Cấu trúc lấy từ mẫu, nội dung lấy từ dự án

Agent phải:
- **giữ cấu trúc, thứ tự mục, phong cách trình bày và logic của mẫu** do người dùng cung cấp;
- **không sao chép nội dung của dự án mẫu** sang dự án mới;
- lấy nội dung từ:
  1. dự án đang nghiên cứu;
  2. tài liệu gốc người dùng cung cấp;
  3. dữ liệu thực nghiệm;
  4. tài liệu khoa học đã xác minh;
  5. nguồn chính thống;
  6. tài liệu web cần thiết để minh họa đúng mục.

Nếu mẫu có bố cục đặc thù, ưu tiên bố cục mẫu thay vì tự áp dụng một form bài báo quốc tế khác.

---

# 2. ƯU TIÊN NGUỒN

Thứ tự ưu tiên:

1. **Tài liệu gốc của người dùng / dữ liệu thực nghiệm của dự án**
2. **Tiêu chí/mẫu chính thức của cuộc thi hoặc cơ quan tổ chức**
3. **Bài báo khoa học peer-reviewed**
4. **Sách/chuyên khảo học thuật**
5. **Repository chính thức của đại học/viện nghiên cứu**
6. **Cơ quan nhà nước, tổ chức khoa học chuyên môn**
7. **Tiêu chuẩn/kỹ thuật chính thức**
8. **Website nhà cung cấp công nghệ**, chỉ khi cần xác nhận thông số kỹ thuật
9. **Wikipedia/Wikimedia/website phổ thông**, chỉ làm nguồn nền/bổ trợ
10. **Mạng xã hội/forum**, chỉ dùng để khảo sát nhu cầu hoặc minh họa vấn đề; không dùng làm nguồn khoa học chính nếu có nguồn tốt hơn.

## 2.1. Luật về bằng chứng

Mỗi phát biểu quan trọng phải được phân loại:

- `SOURCE_FACT`: lấy trực tiếp từ nguồn.
- `PROJECT_OBSERVATION`: quan sát của nhóm.
- `PROJECT_DATA`: dữ liệu nhóm đo.
- `LITERATURE_FINDING`: kết quả từ nghiên cứu trước.
- `INFERENCE`: suy luận từ dữ liệu.
- `PROPOSAL`: đề xuất tương lai.

Không được biến `INFERENCE` hoặc `PROPOSAL` thành `FACT`.

---

# 3. HAI LOẠI DỰ ÁN PHẢI ĐƯỢC PHÂN LUỒNG

## 3.1. Dự án khoa học

Mạch:

**Câu hỏi nghiên cứu**
→ Tổng quan
→ Khoảng trống
→ Giả thuyết/đối tượng
→ Thiết kế nghiên cứu
→ Thu thập dữ liệu
→ Phân tích
→ Giải thích
→ Kết luận.

## 3.2. Dự án kỹ thuật

Mạch:

**Vấn đề thực tế**
→ Nhu cầu
→ Tiêu chí giải pháp
→ Nghiên cứu giải pháp hiện có
→ Khoảng trống kỹ thuật
→ Thiết kế
→ Nguyên mẫu
→ Chế tạo
→ Kiểm tra
→ Cải tiến
→ Phiên bản cuối
→ Đánh giá hiệu quả.

## 3.3. Dự án phần mềm/AI/STEM

Mặc định xếp vào **dự án kỹ thuật có phần nghiên cứu**, trừ khi người dùng yêu cầu thiết kế nghiên cứu thuần khoa học.

---

# 4. QUY TRÌNH TỪ Ý TƯỞNG ĐẾN BÁO CÁO

## GATE 0 — PROJECT INTAKE

Agent phải đọc và tạo hồ sơ dự án:

```yaml
project:
  title:
  domain:
  project_type:
  target_users:
  real_problem:
  proposed_solution:
  actual_features:
  available_data:
  existing_prototype:
  source_files:
  test_results:
  constraints:
```

Nếu thông tin chưa có, **không tự bịa**.

---

# 5. GATE 1 — XÁC ĐỊNH VẤN ĐỀ

Không bắt đầu bằng sản phẩm.

Phải trả lời:

- vấn đề xảy ra ở đâu?
- ai gặp?
- gặp bao nhiêu?
- hậu quả gì?
- hiện nay đang xử lý thế nào?
- tại sao cách hiện tại chưa đủ tốt?
- có dữ liệu khảo sát không?

## 5.1. Bằng chứng ưu tiên

- ảnh hiện trường;
- phiếu khảo sát;
- phỏng vấn;
- log hệ thống;
- dữ liệu quan sát;
- bảng đo;
- ảnh/video thực tế;
- tài liệu chính thống.

---

# 6. GATE 2 — CÂU HỎI NGHIÊN CỨU / VẤN ĐỀ CẦN GIẢI QUYẾT

Câu hỏi phải:
- cụ thể;
- kiểm chứng được;
- có biến/chỉ số;
- phù hợp thời gian và nguồn lực.

Không dùng:
> “Làm sao xây một sản phẩm thật thông minh?”

Nên dùng:
> “Việc kết hợp X và Y có làm cải thiện Z trong điều kiện A không?”

---

# 7. GATE 3 — NGHIÊN CỨU TỔNG QUAN

## 7.1. Agent phải tìm ít nhất 4 nhóm bằng chứng nếu lĩnh vực cho phép

- nghiên cứu quốc tế;
- nghiên cứu trong nước;
- giải pháp/sản phẩm hiện có;
- tài liệu kỹ thuật/chính thống.

## 7.2. Literature Matrix

Tạo:

| ID | Tác giả/Năm | Đối tượng | Phương pháp | Kết quả | Điểm mạnh | Hạn chế | Liên quan dự án |
|---|---|---|---|---|---|---|---|

## 7.3. Không làm kiểu “liệt kê tài liệu”

Mỗi tài liệu phải trả lời:
- nó giải quyết gì?
- bằng cách nào?
- kết quả nào đáng chú ý?
- hạn chế gì?
- khoảng nào chưa được giải quyết?

---

# 8. GATE 4 — KHOẢNG TRỐNG

Khoảng trống phải được suy ra, không được tưởng tượng.

## 8.1. 4 loại gap

### Scientific gap
Thiếu tri thức hoặc thiếu kiểm chứng khoa học.

### Educational/user gap
Người dùng vẫn gặp khó khăn mà giải pháp hiện có chưa giải quyết đầy đủ.

### Technical gap
Giải pháp hiện có chưa đạt tiêu chí kỹ thuật.

### Deployment gap
Giải pháp có thể tốt trong phòng thí nghiệm nhưng khó triển khai thực tế.

## 8.2. Gap Matrix

| Gap | Bằng chứng từ nghiên cứu trước | Điều còn thiếu | Bối cảnh dự án | Cơ hội giải quyết |
|---|---|---|---|---|

### Quy tắc:

`Prior Art → Limitation → Gap → Need`

Không được:

`Idea → tự gọi đó là Gap`.

---

# 9. GATE 5 — TÍNH MỚI

Mỗi tính mới bắt buộc có:

```yaml
novelty:
  gap:
  prior_art:
  new_element:
  measurable_difference:
  implementation:
  verification:
```

## 9.1. Tính mới có thể nằm ở

- mô hình;
- kiến trúc;
- dữ liệu;
- quy trình;
- thuật toán;
- phương thức tích hợp;
- cách cá nhân hóa;
- cách xử lý vấn đề;
- điều kiện triển khai;
- khả năng giải quyết một hạn chế cụ thể.

Không đồng nhất:
**“có công nghệ mới” = “đề tài có tính mới”.**

---

# 10. GATE 6 — TÍNH SÁNG TẠO

Tính sáng tạo trả lời:

> Nhóm đã kết hợp hoặc thiết kế các thành phần như thế nào để biến khoảng trống thành giải pháp?

Mỗi ý phải nối được:

**Gap → Design Decision → Function → Benefit → Test**

---

# 11. GATE 7 — Ý TƯỞNG TỔNG THỂ

Bắt buộc có sơ đồ 1 trang:

```text
PROBLEM
   ↓
USER / CONTEXT
   ↓
REQUIREMENTS
   ↓
RESEARCH EVIDENCE
   ↓
DESIGN
   ↓
PROTOTYPE
   ↓
TEST
   ↓
DATA
   ↓
IMPROVEMENT
   ↓
FINAL PRODUCT
```

Đối với hệ thống phần mềm:

```text
INPUT
 ↓
PROCESSING
 ↓
AI / ALGORITHM
 ↓
DATABASE
 ↓
DECISION
 ↓
USER OUTPUT
 ↓
FEEDBACK
 ↓
LEARNING / IMPROVEMENT
```

---

# 12. GATE 8 — MỤC TIÊU

Mỗi mục tiêu phải có:

```text
Objective
→ Method
→ Metric
→ Evidence
```

Ví dụ:

```text
M1: xây dựng hệ thống
Method: phát triển prototype
Metric: completion/functional coverage
Evidence: screenshot + test log

M2: đánh giá hiệu quả
Method: pre/post test
Metric: learning gain
Evidence: dataset + statistical analysis
```

---

# 13. GATE 9 — PHƯƠNG PHÁP NGHIÊN CỨU

Tùy loại dự án, chọn:

- khảo sát;
- phỏng vấn;
- quan sát;
- thực nghiệm;
- quasi-experiment;
- A/B;
- pretest–posttest;
- benchmark;
- usability test;
- engineering test;
- field test;
- comparative evaluation;
- design-based research;
- mixed methods.

Không chọn phương pháp vì “nghe khoa học”; phải phù hợp câu hỏi nghiên cứu.

---

# 14. GATE 10 — THIẾT KẾ THÍ NGHIỆM / KIỂM TRA

Phải ghi rõ:

- đối tượng;
- mẫu;
- biến;
- điều kiện;
- thiết bị;
- quy trình;
- thời lượng;
- tiêu chí;
- cách đo;
- cách lặp;
- cách xử lý dữ liệu.

## 14.1. Variables

```text
Independent variable
Dependent variable
Control variables
Confounders
```

Nếu dự án kỹ thuật:

```text
Requirement
→ Test condition
→ Metric
→ Acceptance threshold
```

---

# 15. GATE 11 — DỮ LIỆU

Không dùng số liệu minh họa làm số liệu thực tế.

Phân biệt:

- raw data;
- cleaned data;
- derived metric;
- chart;
- interpretation.

Mọi bảng kết quả phải truy được về dữ liệu nguồn.

---

# 16. GATE 12 — PHÂN TÍCH THỐNG KÊ

Tùy loại dữ liệu:

- n;
- mean;
- median;
- SD;
- percentage;
- rate;
- learning gain;
- effect size;
- confidence interval;
- kiểm định phù hợp.

Không “săn p-value”.

Phải giải thích:
- con số nói gì?
- có ý nghĩa thực tiễn không?
- có giới hạn gì?

---

# 17. GATE 13 — HÌNH ẢNH, SƠ ĐỒ, BẢN VẼ, MINH CHỨNG

Đây là **thành phần bắt buộc**, không phải trang trí.

## 17.1. Mỗi mục lớn phải xem xét tối thiểu một loại minh chứng

### Phần vấn đề
- ảnh hiện trường;
- ảnh tình trạng thực tế;
- biểu đồ khảo sát.

### Phần tổng quan
- sơ đồ phân loại giải pháp;
- bảng so sánh nghiên cứu;
- sơ đồ xu hướng công nghệ.

### Phần khoảng trống
- ma trận nghiên cứu;
- sơ đồ “đã có / chưa có”.

### Phần ý tưởng
- concept diagram;
- workflow.

### Phần thiết kế
- architecture;
- UML;
- data flow;
- circuit/block diagram;
- wireframe.

### Phần chế tạo
- ảnh từng giai đoạn;
- ảnh nguyên mẫu;
- bản vẽ kỹ thuật.

### Phần kiểm thử
- setup thử nghiệm;
- ảnh thiết bị;
- screenshot;
- log;
- biểu đồ.

### Phần cải tiến
- Before → Problem → Change → After.

## 17.2. Khi cần tìm hình trên Internet

Ưu tiên:

1. bài báo khoa học;
2. website trường đại học;
3. viện nghiên cứu;
4. cơ quan chuyên môn;
5. tài liệu kỹ thuật chính thức.

Không dùng hình có watermark hoặc không rõ nguồn.

## 17.3. Quy tắc bản quyền

Mỗi hình web phải có:
- source;
- author/institution nếu có;
- URL/DOI;
- license nếu biết;
- ngày truy cập đối với dữ liệu web động.

Nếu bản quyền không rõ:
**không chép nguyên hình vào báo cáo**; có thể:
- tự vẽ lại sơ đồ khái niệm;
- dùng ảnh do nhóm tự chụp;
- hoặc chỉ dẫn link tham khảo.

---

# 18. GATE 14 — FIGURE PLAN

Trước khi viết toàn bài, tạo:

| Hình | Mục đích | Nguồn | Vị trí | Minh chứng cho |
|---|---|---|---|---|

Ví dụ:

```text
Hình 1: Vấn đề thực tế
Hình 2: Mô hình kiến trúc
Hình 3: Quy trình hoạt động
Hình 4: Giao diện
Hình 5: Thí nghiệm
Hình 6: Dữ liệu
Hình 7: So sánh trước/sau
```

Không chèn hình chỉ để “cho đẹp”.

---

# 19. GATE 15 — TÀI LIỆU WEB THÔNG MINH

Web phải được dùng để **làm sáng tỏ đúng một mục**, không được làm loãng báo cáo.

## 19.1. Search intent

Mỗi truy vấn phải gắn với một mục:

```yaml
search:
  section:
  question:
  keywords:
  required_source_type:
  evidence_needed:
```

Ví dụ:

```text
Section: Literature Review
Question: adaptive learning có hiệu quả thế nào với middle-school science?
Keywords: adaptive learning middle school science systematic review
Required source: peer-reviewed
```

## 19.2. Resource ranking

Chấm:

```text
Authority
Relevance
Recency
Method quality
Data transparency
Context fit
```

## 19.3. Web evidence card

```yaml
source_id:
title:
authors:
year:
institution:
source_type:
claim_supported:
method:
key_result:
limitation:
url:
doi:
license:
```

---

# 20. GATE 16 — SMART KHTN NOTEBOOK KHI LÀ DỰ ÁN MẪU

Nếu dự án là **Sổ tay KHTN thông minh**, agent phải xây nội dung từ sản phẩm thực tế, ví dụ:

```text
SGK/SGV
→ Knowledge Atom
→ Knowledge Graph
→ Real-world Scenario
→ Problem-solving Graph
→ Web resources
→ Simulation
→ AI Tutor
→ Misconception Diagnosis
→ Adaptive Learning
→ Learner Analytics
→ Export DOCX/PDF
```

Nhưng đây chỉ là **ví dụ một dự án**.

MD này phải chạy được cho:
- AI;
- nông nghiệp;
- IoT;
- robotics;
- giáo dục;
- môi trường;
- phần mềm;
- thiết bị;
- STEM;
- khoa học tự nhiên;
- kỹ thuật.

---

# 21. GATE 17 — PHẦN “THỰC HIỆN” PHẢI CÓ DÒNG THỜI GIAN

Không viết:

> “Nhóm xây dựng sản phẩm.”

Phải thể hiện:

```text
Giai đoạn 1
Phát hiện vấn đề

Giai đoạn 2
Nghiên cứu tài liệu

Giai đoạn 3
Đề xuất giải pháp

Giai đoạn 4
Prototype 1

Giai đoạn 5
Thử nghiệm

Giai đoạn 6
Phát hiện lỗi

Giai đoạn 7
Cải tiến

Giai đoạn 8
Prototype 2 / Final
```

Đây là phần giúp chứng minh **quá trình nghiên cứu thật**, không phải sản phẩm xuất hiện đột ngột.

---

# 22. GATE 18 — CẢI TIẾN PHẢI DỰA TRÊN LỖI THỰC TẾ

Chuỗi bắt buộc:

**Test → Failure → Cause → Change → Retest**

Bảng:

| Vấn đề | Dữ liệu chứng minh | Nguyên nhân | Cải tiến | Chỉ số trước | Chỉ số sau |
|---|---|---|---|---:|---:|

Không viết:
> “Sau khi cải tiến hệ thống tốt hơn.”

Nếu có dữ liệu thì phải ghi số.

---

# 23. GATE 19 — KẾT QUẢ

Kết quả phải đi đúng thứ tự mục tiêu:

```text
Objective 1 → Result 1
Objective 2 → Result 2
Objective 3 → Result 3
```

Mỗi kết quả:

**Claim → Data → Analysis → Interpretation**

---

# 24. GATE 20 — THẢO LUẬN

Thảo luận không lặp lại kết quả.

Phải trả lời:

1. Kết quả có ý nghĩa gì?
2. Tại sao đạt/không đạt?
3. So với nghiên cứu trước thế nào?
4. Điểm khác biệt?
5. Giới hạn?
6. Ý nghĩa thực tiễn?
7. Cần thử nghiệm gì tiếp?

---

# 25. GATE 21 — KẾT LUẬN

Kết luận chỉ sử dụng những gì báo cáo đã chứng minh.

Không đưa:
- số liệu mới;
- tính năng mới;
- claim mới;
- tài liệu mới.

---

# 26. GATE 22 — HẠN CHẾ

Luôn có:

- hạn chế dữ liệu;
- hạn chế mẫu;
- hạn chế thời gian;
- hạn chế thiết bị;
- hạn chế mô hình;
- hạn chế triển khai;
- hạn chế khả năng tổng quát.

Hạn chế làm báo cáo **khoa học hơn**, không làm báo cáo yếu đi nếu được trình bày trung thực.

---

# 27. GATE 23 — ĐỊNH HƯỚNG PHÁT TRIỂN

Phân biệt:

### Đã làm
Có bằng chứng.

### Đang làm
Có prototype/dữ liệu tiến độ.

### Dự kiến
Chưa triển khai.

Tuyệt đối không viết tính năng tương lai như thành tựu hiện tại.

---

# 28. KHUNG BÁO CÁO MẶC ĐỊNH

Nếu mẫu người dùng không có cấu trúc đặc biệt, dùng khung:

## Bìa

## 1. VẤN ĐỀ NGHIÊN CỨU
### 1.1. Bối cảnh thực tiễn và lý do chọn đề tài
### 1.2. Thực trạng
### 1.3. Tổng quan nghiên cứu/giải pháp hiện có
### 1.4. Khoảng trống
### 1.5. Câu hỏi nghiên cứu / vấn đề cần giải quyết
### 1.6. Mục tiêu và tiêu chí

## 2. THIẾT KẾ VÀ PHƯƠNG PHÁP
### 2.1. Lựa chọn giải pháp
### 2.2. Kiến trúc/thiết kế
### 2.3. Dữ liệu và công cụ
### 2.4. Quy trình thực hiện
### 2.5. Phương pháp kiểm tra

## 3. THỰC HIỆN: CHẾ TẠO / XÂY DỰNG / THỬ NGHIỆM
### 3.1. Phát triển prototype
### 3.2. Kiểm tra
### 3.3. Phân tích kết quả
### 3.4. Cải tiến
### 3.5. Phiên bản hoàn thiện

## 4. KẾT QUẢ VÀ ĐÁNH GIÁ
### 4.1. Kết quả theo mục tiêu
### 4.2. So sánh
### 4.3. Phân tích
### 4.4. Khả năng áp dụng

## 5. THẢO LUẬN

## 6. HẠN CHẾ

## 7. ĐỊNH HƯỚNG PHÁT TRIỂN

## 8. KẾT LUẬN

## 9. TÀI LIỆU THAM KHẢO

## 10. PHỤ LỤC

**Nếu mẫu chính thức có cấu trúc khác, bỏ khung mặc định này và bám mẫu chính thức.**

---

# 29. QUY TẮC DÀN TRANG

## 29.1. Mặc định theo mẫu đã cung cấp

Mẫu báo cáo người dùng cung cấp sử dụng:
- A4;
- lề trái 3 cm;
- lề phải 2 cm;
- trên 2 cm;
- dưới 2 cm;
- Times New Roman;
- cách dòng đơn;
- mẫu có cỡ chữ 14.

Nếu người dùng yêu cầu cỡ chữ 13 hoặc một quy định chính thức mới hơn thì **ưu tiên yêu cầu mới nhất**.

## 29.2. Không làm “đủ trang” bằng cách kéo giãn

Không:
- chèn nhiều dòng trắng;
- tăng khoảng cách đoạn;
- dùng heading quá lớn;
- chèn hình quá nhỏ chỉ để chiếm trang;
- kéo bảng giãn bất thường;
- tự tạo page break liên tục.

Ưu tiên:
- paragraph ngắn;
- bảng;
- sơ đồ;
- hình có ích;
- tiêu đề có phân cấp.

---

# 30. QUY TẮC HÌNH VÀ BẢNG

## Hình

Mỗi hình:

**Hình X. Tên hình.**

Dòng tiếp theo nếu cần:
**Nguồn:** ...

## Bảng

**Bảng X. Tên bảng**

Nguồn đặt dưới bảng nếu dữ liệu không do nhóm tạo.

Không để:
- tiêu đề bảng ở cuối trang;
- bảng bị cắt vô lý;
- chú thích cách hình quá xa;
- hình không có mô tả.

---

# 31. QUY TẮC CHỐNG “VĂN AI”

Không:
- mở đầu mọi đoạn bằng “Trong bối cảnh hiện nay”;
- lặp “không chỉ... mà còn...”;
- dùng quá nhiều câu khẩu hiệu;
- phô trương từ ngữ;
- lặp kết luận;
- viết đoạn dài không có bằng chứng.

Ưu tiên:
**ý → bằng chứng → phân tích → kết luận nhỏ.**

---

# 32. TÓM TẮT / ABSTRACT

Nếu cuộc thi yêu cầu:
- 100–250 từ;
- nêu vấn đề;
- phương pháp;
- kết quả chính;
- đóng góp.

Không đưa số liệu chưa có trong thân bài.

---

# 33. QUẢN LÝ TÀI LIỆU THAM KHẢO

Mỗi citation trong thân bài phải có tài liệu tương ứng ở cuối.

Mỗi tài liệu ở cuối phải xuất hiện ít nhất một lần trong thân bài.

Không:
- citation giả;
- DOI giả;
- URL giả;
- tác giả giả;
- “et al.” nếu không xác định được nguồn.

---

# 34. TRACEABILITY MATRIX

Trước khi hoàn thành, tạo bảng kiểm nội bộ:

| Claim | Source/Data | Method | Result | Conclusion |
|---|---|---|---|---|

Mọi claim quan trọng không có chuỗi đầy đủ phải được đánh dấu `UNSUPPORTED`.

---

# 35. EVIDENCE MATRIX

| Mục báo cáo | Claim | Evidence | Figure/Table | Source | Verified |
|---|---|---|---|---|---|

Chỉ xuất bản khi claim quan trọng đạt `Verified = YES`.

---

# 36. FIGURE / TABLE MINIMUM STANDARD

Không quy định số lượng hình cứng cho mọi đề tài.

Nhưng phải bảo đảm những nội dung sau, khi có liên quan, đều có minh chứng:
- vấn đề;
- kiến trúc;
- phương pháp;
- prototype;
- kiểm thử;
- dữ liệu;
- kết quả;
- cải tiến.

---

# 37. QUY TRÌNH TÌM TÀI LIỆU KHOA HỌC

## Bước 1
Xác định câu hỏi.

## Bước 2
Tạo từ khóa:
- core term;
- synonym;
- technology;
- target;
- context;
- outcome.

## Bước 3
Tìm:
- Google Scholar;
- Crossref;
- PubMed nếu phù hợp;
- IEEE Xplore;
- Springer;
- ScienceDirect;
- ACM;
- institutional repository;
- website trường/viện.

## Bước 4
Lọc:
- relevance;
- quality;
- year;
- methodology;
- dataset;
- context.

## Bước 5
Đọc abstract.

## Bước 6
Đọc methods/results.

## Bước 7
Trích claim có thể dùng.

## Bước 8
Đưa vào literature matrix.

---

# 38. QUY TRÌNH TÌM HÌNH/SƠ ĐỒ KỸ THUẬT

Khi một mục cần minh họa:

```text
Section need
→ Required visual type
→ Search query
→ Academic source
→ Verify license
→ Use / redraw
→ Citation
```

Không tìm hình trước rồi mới cố nghĩ xem hình đó dùng ở đâu.

---

# 39. ĐẶC BIỆT CHO PHẦN SẢN PHẨM PHẦN MỀM

Phải thể hiện tối thiểu:

```text
User Flow
Architecture
Data Flow
Core Algorithm
UI
Input
Processing
Output
Storage
Security
Testing
```

Nếu AI:

```text
Dataset
→ Labeling
→ Split
→ Training
→ Validation
→ Test
→ Metrics
→ Error analysis
→ Deployment
```

Nếu giáo dục:

```text
Learning problem
→ Intervention
→ Learning activity
→ Measurement
→ Learning outcome
```

---

# 40. ĐẶC BIỆT CHO DỰ ÁN SMART KHTN NOTEBOOK

Nếu project context là Smart KHTN Notebook, nội dung có thể mô tả:

```text
SGK/SGV
 ↓
Knowledge Atom
 ↓
Knowledge Graph
 ↓
Real-world Phenomenon
 ↓
Problem-solving Graph
 ↓
Resource Intelligence
 ↓
Simulation / Experiment
 ↓
AI Tutor
 ↓
Misconception Diagnosis
 ↓
Adaptive Learning
 ↓
Learner Analytics
 ↓
Export / Report
```

Các claim về hiệu quả giáo dục phải được kiểm chứng bằng:
- pretest/posttest;
- transfer test;
- misconception analysis;
- usability;
- event logs;
- comparison group nếu có.

Không được kết luận “giúp học sinh học tốt hơn” chỉ dựa trên cảm nhận.

---

# 41. QUY TRÌNH VIẾT 12–15 TRANG

## Trang 1
Bìa

## Trang 2–3
Vấn đề + bối cảnh + khảo sát

## Trang 3–5
Tổng quan + nghiên cứu trước

## Trang 5–6
Gap + tính mới + sáng tạo

## Trang 6–7
Ý tưởng + mục tiêu + tiêu chí

## Trang 7–9
Thiết kế + phương pháp

## Trang 9–11
Chế tạo / phát triển / thử nghiệm

## Trang 11–13
Kết quả + dữ liệu + biểu đồ

## Trang 13–14
Thảo luận + cải tiến + khả năng áp dụng

## Trang 14–15
Kết luận + tài liệu tham khảo/phụ lục theo quy định

**Đây chỉ là phân bổ khởi đầu; nếu mẫu chính thức quy định khác thì mẫu chính thức được ưu tiên.**

---

# 42. FINAL QA

Agent phải kiểm tra:

## Nội dung
- [ ] vấn đề rõ
- [ ] câu hỏi rõ
- [ ] tổng quan đủ
- [ ] gap có bằng chứng
- [ ] novelty có căn cứ
- [ ] objective đo được
- [ ] method phù hợp
- [ ] results có dữ liệu
- [ ] discussion không lặp results
- [ ] limitations có thật
- [ ] conclusion bám evidence

## Minh chứng
- [ ] hình hiện trường
- [ ] sơ đồ
- [ ] prototype
- [ ] thử nghiệm
- [ ] dữ liệu
- [ ] biểu đồ
- [ ] before/after nếu có

## Nguồn
- [ ] citation hợp lệ
- [ ] tài liệu tham khảo đồng bộ
- [ ] URL/DOI kiểm tra được
- [ ] hình có nguồn/license

## Văn bản
- [ ] A4
- [ ] font đúng
- [ ] cỡ chữ đúng
- [ ] lề đúng
- [ ] cách dòng đúng
- [ ] không kéo giãn
- [ ] không lỗi Unicode
- [ ] không lỗi tiếng Việt

## Khoa học
- [ ] không bịa số liệu
- [ ] không bịa tài liệu
- [ ] không bịa gap
- [ ] không bịa novelty
- [ ] không biến đề xuất thành kết quả
- [ ] số liệu phù hợp phương pháp
- [ ] conclusion phù hợp dữ liệu

---

# 43. LỆNH THỰC THI CHO AGENT

Khi người dùng nói:

> “Viết báo cáo khoa học cho dự án X”

Agent phải tự động thực hiện:

```text
1. Đọc toàn bộ tài liệu nguồn.
2. Xác định mẫu/hình thức.
3. Xác định loại dự án.
4. Trích cấu trúc mẫu.
5. Phân tích vấn đề thực tế.
6. Tạo research questions.
7. Tìm nghiên cứu khoa học.
8. Tạo literature matrix.
9. Tạo gap matrix.
10. Suy ra novelty/creativity.
11. Xây objectives.
12. Xây methods.
13. Kiểm kê dữ liệu thực tế.
14. Xây figure/table plan.
15. Viết draft.
16. Chèn citation.
17. Chèn hình/sơ đồ/bảng.
18. Phân tích số liệu.
19. Viết discussion.
20. Viết limitations.
21. Viết improvement.
22. Kiểm tra traceability.
23. Kiểm tra format.
24. Kiểm tra khoa học.
25. Xuất bản hoàn chỉnh.
```

---

# 44. QUY TẮC “KHÔNG TỰ BỊA”

Nếu thiếu:

- dữ liệu → để placeholder;
- hình → tạo figure plan;
- tài liệu → tiếp tục tìm nguồn;
- kết quả → không kết luận;
- thông số → ghi “chưa xác minh”;
- citation → không phát hành claim đó.

**Không điền vào chỗ trống bằng trí nhớ của AI.**

---

# 45. OUTPUT CUỐI

Agent phải có khả năng tạo:

1. **Bản thuyết minh/báo cáo hoàn chỉnh**
2. **Danh mục hình**
3. **Danh mục bảng**
4. **Tài liệu tham khảo**
5. **Evidence Matrix**
6. **Literature Matrix**
7. **Gap Matrix**
8. **Novelty Matrix**
9. **Danh sách phần còn thiếu**
10. **Bản DOCX/PDF đúng mẫu** nếu môi trường cho phép.

---

# 46. NGUYÊN TẮC CUỐI CÙNG

Một báo cáo tốt không phải là:

**“viết hay”**

mà là:

**“mỗi phần đều có lý do, bằng chứng và quan hệ logic với phần tiếp theo.”**

Chuỗi chuẩn:

**THỰC TẾ**
→ **CÂU HỎI**
→ **NGHIÊN CỨU TRƯỚC**
→ **KHOẢNG TRỐNG**
→ **TÍNH MỚI**
→ **TÍNH SÁNG TẠO**
→ **Ý TƯỞNG**
→ **MỤC TIÊU**
→ **PHƯƠNG PHÁP**
→ **THIẾT KẾ**
→ **CHẾ TẠO / THỰC HIỆN**
→ **THỬ NGHIỆM**
→ **DỮ LIỆU**
→ **PHÂN TÍCH**
→ **THẢO LUẬN**
→ **CẢI TIẾN**
→ **KẾT LUẬN**

Đây là pipeline mặc định cho **mọi dự án khoa học kỹ thuật**, không phụ thuộc lĩnh vực.
