# LAB + EXPERIMENT + DATA + STUDENT ANALYTICS



---

# AGENT 12 — EXPERIMENT / LAB NOTEBOOK

## Mục tiêu
Biến bài thực hành thành quy trình khoa học có thể ghi dữ liệu.

## Template
1. Câu hỏi nghiên cứu
2. Dự đoán
3. Biến độc lập
4. Biến phụ thuộc
5. Biến kiểm soát
6. Dụng cụ
7. Quy trình
8. Dữ liệu
9. Biểu đồ
10. Phân tích
11. Kết luận
12. Sai số
13. Cải tiến

## Safety
Agent phải kiểm tra cảnh báo an toàn trước khi đề xuất thí nghiệm.

## Data
Mọi dữ liệu thực nghiệm có:
`timestamp`, `value`, `unit`, `instrument`, `trial`, `student/group`.

## Acceptance
Có thể xuất nhật ký thành PDF/CSV và ghi tóm tắt vào Sheet.


## V2 mandatory dependency
This agent MUST consume `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, and the applicable `02_KHTN8_47_LESSONS_COMPLETE.md` before producing final data.



---

# AGENT 15 — STUDENT PROFILE & LEARNING ANALYTICS

## Mục tiêu
Tạo hồ sơ học tập động, không phải hồ sơ cá nhân nhạy cảm.

## Metrics
- mastery_by_concept;
- skill_mastery;
- accuracy;
- completion;
- hint_dependency;
- retry_gain;
- time_on_task;
- evidence_quality;
- experiment_quality.

## Không dùng
Không suy luận IQ, bệnh lý, tính cách, hoàn cảnh gia đình.

## Recommendation
`next_activity = f(mastery, misconception, prerequisite, engagement, difficulty)`.

## Dashboard
Học sinh: tiến bộ và việc cần làm.
Giáo viên: lớp, nhóm, khái niệm khó.
Quản trị: usage, uptime, content quality.


## V2 mandatory dependency
This agent MUST consume `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, and the applicable `02_KHTN8_47_LESSONS_COMPLETE.md` before producing final data.



---

# AGENT 25 — ANALYTICS & REPORTING

## Dashboard giáo viên
- mastery theo bài;
- concept khó;
- misconception phổ biến;
- học sinh cần hỗ trợ;
- activity completion;
- learning gain.

## Dashboard học sinh
- tiến bộ;
- kỹ năng mạnh;
- kỹ năng cần luyện;
- nhiệm vụ tiếp theo;
- portfolio.

## Dashboard quản trị
- active users;
- uptime;
- API errors;
- resource failures;
- AI cost;
- content coverage.

## Export
CSV/XLSX/PDF.

## Quy tắc
Mọi biểu đồ phải có:
- thời gian;
- mẫu số;
- đơn vị;
- định nghĩa metric;
- cảnh báo sample size nếu nhỏ.



---

# SCIENCE SKILL CATALOG

## Core
1. concept_explainer
2. socratic_tutor
3. hint_engine
4. prerequisite_finder
5. misconception_detector
6. adaptive_learning
7. phenomenon_mapper
8. vision_to_science
9. resource_finder
10. video_finder
11. image_finder
12. simulation_router
13. experiment_builder
14. lab_notebook
15. data_analyzer
16. graph_interpreter
17. scientific_argumentation
18. model_builder
19. compare_contrast
20. predict_observe_explain
21. real_world_question_generator
22. project_builder
23. assessment_generator
24. rubric_grader
25. citation_checker
26. fact_checker
27. local_context_mapper
28. portfolio_builder
29. learning_analytics
30. teacher_reporter

## Skill routing
- ảnh → vision_to_science
- câu hỏi khái niệm → concept_explainer + prerequisite_finder
- sai nhiều lần → misconception_detector
- cần trải nghiệm → simulation_router/experiment_builder
- dữ liệu → data_analyzer/graph_interpreter
- lập luận → scientific_argumentation
- dự án → project_builder
- tài nguyên → resource_finder + citation_checker



---

# AGENT 40 — STEM PROJECT BUILDER

## Mục tiêu
Chuyển kiến thức thành nhiệm vụ thiết kế.

## Framework
Problem → Constraints → Ideation → Prototype → Test → Data → Iterate → Communicate.

## Rubric
- khoa học;
- kỹ thuật;
- dữ liệu;
- sáng tạo;
- khả thi;
- an toàn;
- trình bày.

## Output
Project brief + materials + milestones + data sheet + rubric + reflection.

