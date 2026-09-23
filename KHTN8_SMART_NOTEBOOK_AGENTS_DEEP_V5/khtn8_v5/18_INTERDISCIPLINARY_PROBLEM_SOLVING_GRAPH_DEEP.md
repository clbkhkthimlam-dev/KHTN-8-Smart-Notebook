# 18_INTERDISCIPLINARY_PROBLEM_SOLVING_GRAPH_DEEP

## 1. Mục tiêu
Xây dựng cơ chế nối các đơn vị kiến thức KHTN 8 thành **mạch giải quyết vấn đề liên môn**, thay vì hiển thị kiến thức theo từng bài rời rạc.

Nguyên tắc cốt lõi:
> Vấn đề thực tế là trung tâm; kiến thức là các nút được gọi đúng lúc để giải quyết từng nút thắt của vấn đề.

Không tạo liên môn kiểu gắn nhãn “Vật lí + Hóa + Sinh” một cách hình thức. Chỉ liên kết khi kiến thức của môn/phân môn khác thực sự giúp quan sát, đo lường, giải thích, dự đoán, ra quyết định hoặc thiết kế giải pháp.

## 2. Hai chế độ kết nối
### 2.1. Knowledge Graph mode
Dùng cho học sinh tra cứu:
- kiến thức hiện tại;
- kiến thức tiên quyết;
- kiến thức liên quan;
- kiến thức mở rộng;
- hiện tượng và ứng dụng.

### 2.2. Problem Solving mode
Dùng cho tình huống thực tế:
`Bối cảnh → triệu chứng/dữ liệu → câu hỏi trung tâm → phân rã vấn đề → chọn knowledge atoms → evidence → giải thích → phương án → kiểm chứng → phản tư`.

## 3. Đơn vị liên môn: Problem Atom
Mỗi vấn đề liên môn phải có:
- `problem_id`
- `context`
- `observed_phenomena[]`
- `central_question`
- `subproblems[]`
- `required_knowledge_atoms[]`
- `optional_knowledge_atoms[]`
- `measurements[]`
- `data[]`
- `constraints[]`
- `hypotheses[]`
- `evidence[]`
- `reasoning_chain[]`
- `solution_options[]`
- `decision_criteria[]`
- `validation_plan`
- `transfer_task`
- `source_anchors[]`

## 4. Các loại cạnh liên kết giữa knowledge atoms
Không dùng một loại link duy nhất.

### PREREQUISITE
A phải có trước B.

### EXPLAINS
A dùng để giải thích hiện tượng B.

### MEASURES
A cung cấp đại lượng/phương pháp đo cho B.

### CALCULATES
A cung cấp công thức/quan hệ tính cho B.

### CONSTRAINS
A giới hạn phương án B.

### CAUSES
A là nguyên nhân hoặc tác động đến B.

### INFLUENCES
A làm thay đổi mức độ/kết quả của B nhưng không khẳng định là nguyên nhân duy nhất.

### EVIDENCE_FOR
A là bằng chứng hỗ trợ kết luận B.

### CONTRADICTS
A mâu thuẫn với giả thuyết/kết luận B.

### APPLIES_TO
A có ứng dụng trong bối cảnh B.

### TRANSFERS_TO
Kiến thức/kĩ năng A chuyển giao sang tình huống B.

### CROSS_DISCIPLINE_BRIDGE
Cầu nối có chủ đích giữa các mạch vật lí–hóa học–sinh học–môi trường.

## 5. Bộ định tuyến “trúng chỗ”
Khi học sinh gặp một vấn đề, hệ thống không mở toàn bộ Knowledge Graph. Hệ thống phải tìm **Minimal Sufficient Knowledge Path**:

`MSKP = tập knowledge atoms nhỏ nhất nhưng đủ để giải quyết subproblem hiện tại`.

### Điểm xếp hạng atom
`score = relevance × dependency × evidence_value × transfer_value × learner_need`

Trong đó:
- `relevance`: liên quan trực tiếp đến câu hỏi;
- `dependency`: cần thiết cho bước kế tiếp;
- `evidence_value`: giúp giải thích/kiểm chứng;
- `transfer_value`: có thể dùng ở nhiều bước/tình huống;
- `learner_need`: mức thiếu hụt của học sinh.

Không đưa kiến thức chỉ vì “cùng chủ đề”.

## 6. Phân rã vấn đề
Agent phải tách mỗi tình huống thành 5 lớp:

1. **What is happening?** – hiện tượng gì?
2. **What can be measured?** – đo cái gì?
3. **Why is it happening?** – giải thích bằng kiến thức nào?
4. **What can be changed?** – biến nào có thể can thiệp?
5. **How do we know it worked?** – tiêu chí kiểm chứng nào?

## 7. Luồng giải quyết liên môn chuẩn
```text
Real-world context
→ Observe
→ Identify phenomena
→ Form central question
→ Decompose problem
→ Retrieve minimum sufficient knowledge
→ Measure / collect evidence
→ Explain with discipline-specific concepts
→ Connect concepts across disciplines
→ Generate solution options
→ Compare constraints/cost/safety
→ Predict outcome
→ Test/experiment/simulate
→ Analyze data
→ Conclude with evidence
→ Transfer to new case
```

## 8. Mạch 4 tầng
### Tầng A — Nhận diện
Học sinh xác định hiện tượng, vật thể, biến số, dữ liệu.

### Tầng B — Giải thích
Mỗi hiện tượng được giải thích bằng đúng knowledge atoms cần thiết.

### Tầng C — Ra quyết định
Học sinh dùng kết quả định lượng/định tính để chọn phương án.

### Tầng D — Thiết kế/kiểm chứng
Học sinh thử nghiệm giải pháp, phân tích sai số và sửa phương án.

## 9. Mẫu Problem Route liên môn
### Ví dụ A — Vì sao một vật nổi/chìm?
Có thể kết nối:
- khối lượng và thể tích;
- khối lượng riêng;
- áp suất/lực trong chất lỏng;
- lực đẩy Archimedes;
- đo khối lượng, thể tích;
- xử lí dữ liệu;
- thiết kế vật nổi.

Mạch:
`Quan sát nổi/chìm → đo m, V → tính D → so sánh → dự đoán → kiểm chứng bằng thí nghiệm → giải thích bằng lực đẩy → thiết kế thay đổi vật → kiểm tra lại`.

### Ví dụ B — Vì sao một mạch điện không hoạt động?
Có thể kết nối:
- nguồn điện;
- dòng điện;
- mạch kín;
- vật dẫn/cách điện;
- tác dụng dòng điện;
- cường độ dòng điện và hiệu điện thế;
- đo kiểm;
- chẩn đoán lỗi.

Mạch:
`Triệu chứng → sơ đồ mạch → kiểm tra mạch kín → kiểm tra cực/nguồn → kiểm tra vật dẫn → đo U/I khi phù hợp → xác định điểm lỗi → sửa → kiểm chứng`.

### Ví dụ C — Vì sao cùng một lượng nước nhưng nhiệt độ thay đổi khác nhau?
Có thể kết nối:
- năng lượng nhiệt;
- nội năng;
- truyền nhiệt;
- các cách truyền nhiệt;
- đo nhiệt độ/năng lượng;
- dữ liệu theo thời gian;
- hiệu suất/điều kiện thí nghiệm ở mức phù hợp chương trình.

Mạch:
`Đặt hai mẫu cùng điều kiện khác nhau → đo theo thời gian → biểu diễn dữ liệu → nhận diện quy luật → giải thích cơ chế truyền nhiệt → đề xuất cách giảm/tăng truyền nhiệt → kiểm chứng`.

### Ví dụ D — Môi trường sống thay đổi ảnh hưởng sinh vật thế nào?
Có thể kết nối:
- môi trường và nhân tố sinh thái;
- quần thể;
- quần xã;
- hệ sinh thái;
- chuỗi/lưới quan hệ;
- biến đổi điều kiện môi trường;
- dữ liệu quan sát;
- phương án bảo vệ môi trường.

Mạch:
`Quan sát thay đổi → xác định nhân tố → thu thập dữ liệu → nhận diện tác động lên quần thể/quần xã → truy nguyên quan hệ → dự đoán → đề xuất can thiệp → đánh giá kết quả`.

Các ví dụ trên chỉ là **mẫu kiến trúc**. Knowledge atom và source anchor thực tế phải được agent đối chiếu lại từ SGK/SGV trước khi xuất bản nội dung.

## 10. Mẫu tình huống phải có “nút thắt”
Không chấp nhận tình huống chỉ hỏi “em có biết không?”.

Một tình huống đạt chuẩn phải có ít nhất một nút thắt:
- thiếu dữ liệu;
- dữ liệu mâu thuẫn;
- phải lựa chọn phương án;
- cần tính toán;
- cần giải thích nguyên nhân;
- cần thiết kế thí nghiệm;
- cần phát hiện lỗi;
- cần tối ưu giữa nhiều tiêu chí;
- cần chuyển kiến thức sang bối cảnh mới.

## 11. Evidence-first
Mọi cầu nối liên môn phải chỉ ra **bằng chứng nào kích hoạt cầu nối**.

Mẫu:
```text
Observation → Evidence → Knowledge Atom → Reasoning → Decision
```

Không được nối:
`Hóa học ↔ Sinh học` chỉ vì cả hai đều nói về nước.

Phải nối khi có chuỗi rõ:
`chất/biến đổi → tính chất/đại lượng → điều kiện môi trường → tác động sinh học → dữ liệu → quyết định`.

## 12. Bản đồ mức độ liên môn
### Level 0
Một knowledge atom, không liên môn.

### Level 1
Một atom + một ứng dụng ngoài lớp học.

### Level 2
Hai atom cùng phân môn.

### Level 3
Hai phân môn KHTN.

### Level 4
Ba phân môn KHTN hoặc KHTN + toán/dữ liệu/công nghệ.

### Level 5
Vấn đề mở có dữ liệu thực, ràng buộc và phải lựa chọn giải pháp.

## 13. AI Tutor trong mạch liên môn
AI không tự giải cả vấn đề.

AI phải:
1. hỏi học sinh hiện đang ở bước nào;
2. xác định subproblem;
3. đưa đúng knowledge atom;
4. hỏi học sinh tự nối bằng chứng với kiến thức;
5. kiểm tra lập luận;
6. chỉ đưa hint khi mắc;
7. chỉ giải mẫu khi đã đi qua các bước cần thiết.

### Chống “nhảy cóc kiến thức”
Nếu học sinh sử dụng công thức/khái niệm nhưng chưa đủ prerequisite:
`Detect gap → explain prerequisite → short check → return to problem`.

## 14. Web intelligence cho vấn đề liên môn
Web chỉ được dùng để bổ sung:
- ảnh hiện trường;
- dữ liệu mở;
- bài đọc;
- video;
- mô phỏng;
- thông số/quan sát thực tế;
- case study.

Mỗi resource phải có:
`URL + source_type + publisher + retrieval_date + license/usage + relevance + reliability + grade_fit + connected_atoms[] + evidence_role`.

Không lấy web làm nguồn thay thế SGK/SGV cho kiến thức cốt lõi nếu chưa có bước kiểm định.

## 15. Tiêu chí chọn dữ liệu web
Ưu tiên:
1. nguồn cơ quan/đại học/tổ chức khoa học;
2. dữ liệu công khai có phương pháp rõ;
3. nguồn giáo dục có kiểm duyệt;
4. Wikimedia/Wikipedia cho bối cảnh và tra cứu phụ trợ;
5. YouTube/video chỉ khi xác định được nguồn và nội dung phù hợp.

## 16. Tình huống địa phương
Có thể ưu tiên các vấn đề gần học sinh:
- chất lượng nước;
- ngập/thoát nước;
- nhiệt độ;
- điện năng;
- môi trường trường học;
- cây trồng;
- sinh vật quanh trường;
- chất thải;
- an toàn phòng thí nghiệm.

Đây là lớp ngữ cảnh mở rộng, **không được gán là nội dung SGK** nếu SGK/SGV không nêu.

## 17. Output của Problem Solving Graph
Khi học sinh hoàn thành, lưu:
- knowledge atoms đã dùng;
- thứ tự sử dụng;
- bước nào sai;
- bằng chứng nào đã dùng;
- kỹ năng nào được thể hiện;
- misconception;
- thời gian;
- hints;
- quyết định cuối cùng;
- kết quả kiểm chứng;
- knowledge transfer.

## 18. Bộ dữ liệu tối thiểu
```json
{
  "problem_id": "P-...",
  "central_question": "...",
  "disciplines": ["physics", "chemistry", "biology", "data"],
  "subproblems": [],
  "knowledge_path": [],
  "evidence": [],
  "decisions": [],
  "validation": {},
  "transfer_task": {}
}
```

## 19. QA bắt buộc
Một interdisciplinary route chỉ PASS khi:
- mọi knowledge atom đều có source anchor;
- không có cầu nối ngụy tạo;
- prerequisite không bị bỏ qua;
- công thức đi qua Formula Gate;
- dữ liệu có nguồn;
- kết luận phân biệt evidence và inference;
- có ít nhất một cơ chế kiểm chứng;
- nhiệm vụ chuyển giao khác bối cảnh nhưng giữ nguyên nguyên lí.

## 20. Tiêu chí thành công
Đánh giá hệ thống bằng:
- tỷ lệ giải quyết đúng vấn đề;
- số lượt mở kiến thức không cần thiết;
- thời gian đến knowledge atom đúng;
- tỷ lệ học sinh tự chọn đúng kiến thức;
- giảm repeated misconception;
- transfer score;
- evidence quality score;
- solution quality score.

## 21. Quy tắc kiến trúc quan trọng
`Lesson Graph` không bị thay thế bởi `Problem Graph`.

Hai graph phải cùng tồn tại:
- Lesson Graph = tổ chức theo chương/bài của SGK.
- Problem Graph = tổ chức theo vấn đề thực tế.

Cầu nối là `knowledge_atom_id`.

Nhờ vậy:
`Bài → kiến thức → nhiều vấn đề`
và đồng thời:
`Vấn đề → nhiều kiến thức từ nhiều bài/chương`.

## 22. Điều kiện để gọi là “trúng chỗ”
Một knowledge atom chỉ được đưa vào problem route khi nó giúp ít nhất một trong các việc sau:
- quan sát;
- đo;
- tính;
- giải thích;
- dự đoán;
- lựa chọn;
- thiết kế;
- kiểm chứng.

Nếu không đạt một trong tám vai trò trên, không đưa atom đó vào tuyến giải quyết vấn đề chính.
