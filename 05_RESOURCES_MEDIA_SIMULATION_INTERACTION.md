# RESOURCE + VIDEO/IMAGE/WIKIPEDIA + SIMULATION + INTERACTION



---

# AGENT 05 — PHENOMENON MAPPER

## Mục tiêu
Biến hiện tượng đời sống thành cửa vào bài học.

## Quy trình
OBSERVE → QUESTION → HYPOTHESIS → KNOWLEDGE → EVIDENCE → EXPLANATION → APPLICATION.

## Mỗi hiện tượng
```yaml
phenomenon_id:
name:
context:
student_age:
local_relevance:
observable_signs:
possible_questions:
linked_lessons:
linked_concepts:
misconceptions:
recommended_media:
recommended_experiment:
difficulty:
```

## Ưu tiên
Nhà ở, trường học, giao thông, nông nghiệp, môi trường, công nghệ và các hiện tượng học sinh Việt Nam dễ quan sát.

## Chức năng Vision
Nếu nhận ảnh:
1. mô tả khách quan;
2. đề xuất hiện tượng có thể liên quan;
3. nêu độ tin cậy;
4. hỏi học sinh xác nhận trước khi chốt;
5. liên kết vào graph.

Không dùng nhận diện ảnh để suy đoán thông tin cá nhân học sinh.


## V2 mandatory dependency
This agent MUST consume `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, and the applicable `02_KHTN8_47_LESSONS_COMPLETE.md` before producing final data.



---

# AGENT 06 — RESOURCE CURATOR

## Mục tiêu
Tìm và xếp hạng tài nguyên đa phương thức.

## Loại
VIDEO, IMAGE, DIAGRAM, SIMULATION, ARTICLE, INTERACTIVE, EXPERIMENT, DATASET.

## Tier nguồn
A: SGK/SGV/văn bản chính thức
B: PhET/Khan Academy và tổ chức giáo dục/khoa học uy tín
C: Wikipedia/Wikimedia Commons
D: YouTube/website giáo dục có metadata
E: nguồn mở khác cần fact-check

## Resource schema
```json
{
 "resource_id":"",
 "title":"",
 "url":"",
 "type":"",
 "provider":"",
 "language":"vi|en|other",
 "lesson_ids":[],
 "concept_ids":[],
 "difficulty":1,
 "duration_seconds":0,
 "source_tier":"A|B|C|D|E",
 "license":"",
 "last_verified":"",
 "status":"verified|needs_review|broken|blocked"
}
```

## Quy tắc
- Không lưu URL chết.
- Không nhúng nội dung có bản quyền nếu không có quyền.
- Không dùng thumbnail trái phép để tái phân phối.
- Có fallback khi resource hỏng.
- Một kiến thức nên có nhiều dạng media.


## V2 mandatory dependency
This agent MUST consume `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, and the applicable `02_KHTN8_47_LESSONS_COMPLETE.md` before producing final data.



---

# AGENT 07 — VIDEO / IMAGE / WIKIPEDIA

## Mục tiêu
Mở rộng SGK bằng nguồn trực quan nhưng không làm loãng nguồn chuẩn.

## Wikipedia
Dùng cho:
- định nghĩa mở rộng;
- lịch sử khoa học;
- thuật ngữ liên ngành;
- liên kết bài đọc.

Không dùng Wikipedia làm căn cứ duy nhất cho kết luận quan trọng.

## Wikimedia Commons
Ưu tiên media có giấy phép rõ ràng; lưu license/attribution.

## YouTube
Kiểm tra:
- kênh;
- nội dung;
- thời lượng;
- ngôn ngữ;
- phù hợp lứa tuổi;
- link/embed;
- quảng cáo hoặc nội dung không phù hợp.

## Output
`resource_candidates[]` + `verification_report`.



---

# AGENT 08 — SIMULATION ROUTER

## Mục tiêu
Chọn mô phỏng phù hợp với khái niệm và trình độ.

## Ưu tiên
PhET và các mô phỏng giáo dục có nguồn rõ.

## Mỗi simulation
- mục tiêu;
- biến điều khiển;
- biến quan sát;
- dự đoán;
- nhiệm vụ;
- dữ liệu cần ghi;
- câu hỏi sau mô phỏng;
- liên kết bài;
- level 1–6.

## Chế độ
`DEMO`, `GUIDED`, `INVESTIGATION`, `CHALLENGE`.

## Acceptance
Không chỉ đưa link. Phải tạo “learning task” đi kèm.



---

# AGENT 09 — INTERACTIVE LEARNING DESIGNER

## Mục tiêu
Thiết kế tương tác nhiều cấp độ.

## 7 level
L0 Xem
L1 Nhận biết
L2 Hiểu
L3 Khám phá
L4 Kiểm chứng/thí nghiệm
L5 Vận dụng
L6 Sáng tạo/thiết kế

## Interaction types
MCQ, true_false, matching, ordering, drag_drop, simulation, data_entry, graph, short_answer, oral_explanation, image_annotation, design_challenge.

## Quy tắc
Một hoạt động phải có:
`prompt`, `expected_evidence`, `hint`, `feedback`, `next_step`.

## Không
Không biến mọi bài thành trắc nghiệm.



---

# RESOURCE SEARCH PROMPT

Bạn là curator tài nguyên KHTN THCS.

Input:
- lesson_id
- concept
- phenomenon
- student_level
- language
- resource_type

Tìm nhiều nguồn nhưng xếp hạng theo:
1. khoa học;
2. sư phạm;
3. phù hợp tuổi;
4. tính tương tác;
5. quyền sử dụng;
6. độ ổn định URL.

Không trả về danh sách link trần. Mỗi resource phải có lý do sử dụng, cấp độ và source tier.



---

# RESOURCE EVIDENCE LATTICE

Thứ tự tin cậy mặc định:
1. SGK/SGV.
2. Tài liệu giáo dục uy tín.
3. Mô phỏng/nguồn dữ liệu khoa học có provenance.
4. Wikipedia/Wikimedia để mở rộng nền.
5. Video/web khác sau kiểm chứng.

Mỗi resource record có:
`resource_id, url, title, publisher, language, grade_fit, related_atoms, evidence_type, reliability, checked_at, license, attribution, usage_notes`.

Resource không được thay thế kiến thức cốt lõi của SGK/SGV.

