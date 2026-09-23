# KNOWLEDGE GRAPH + ATOMS + COMPLETENESS + SCENARIOS



---

# AGENT 03 — KNOWLEDGE GRAPH BUILDER

## Mục tiêu
Xây graph:
`Bài → Khái niệm → Kiến thức nền → Hiện tượng → Kỹ năng → Hoạt động → Tài nguyên → Đánh giá`.

## Node types
- lesson
- concept
- prerequisite
- phenomenon
- experiment
- simulation
- resource
- skill
- misconception
- assessment
- application

## Edge types
`TEACHES`, `REQUIRES`, `EXPLAINS`, `OBSERVED_IN`, `TESTED_BY`, `VISUALIZED_BY`, `ASSESSED_BY`, `COMMON_ERROR`, `APPLIES_TO`.

## Quy tắc
- Không tạo edge nếu không có bằng chứng hoặc quy tắc suy luận rõ.
- Edge suy luận phải có `confidence`.
- Cho phép một hiện tượng liên kết nhiều phân môn.

## Acceptance
Có thể truy vấn:
1. “Học sinh chưa hiểu X cần học gì trước?”
2. “Hiện tượng Y liên quan bài nào?”
3. “Bài X có mô phỏng/video/thí nghiệm nào?”
4. “Sai lầm Z thuộc khái niệm nào?”


## V2 mandatory dependency
This agent MUST consume `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, `04_KNOWLEDGE_GRAPH_AND_COMPLETENESS.md`, and the applicable `02_KHTN8_47_LESSONS_COMPLETE.md` before producing final data.



---

# KNOWLEDGE COMPLETENESS AGENT

## Nhiệm vụ
Phát hiện mọi khoảng trống giữa SGK/SGV và knowledge base.

## Coverage matrix cho từng bài
`concepts | definitions | properties | laws | equations | symbols | units | conditions | procedures | experiments | observations | figures | tables | examples | applications | misconceptions | questions | assessment | projects | safety | glossary`

## Tiêu chí pass
Một bài chỉ PASS khi tất cả trường phù hợp với bài đã có record hoặc có cờ N/A kèm lý do. Mỗi record phải truy ngược được về source anchor.

## Cross-check
- So sánh SGK và SGV.
- So sánh knowledge atom với câu hỏi/hoạt động trong bài.
- So sánh công thức với điều kiện áp dụng.
- Tìm các thuật ngữ xuất hiện nhưng chưa có atom.
- Tìm hình/bảng tham chiếu nhưng chưa có metadata.



---

# KNOWLEDGE ATOM SCHEMA

Mỗi đơn vị kiến thức là một object logic độc lập, không phải đoạn văn.

```yaml
atom_id:
lesson_id:
topic:
statement:
concept_type: [definition, property, law, relation, formula, procedure, classification, structure, process, phenomenon, safety, application]
source_anchors:
terms:
symbols:
units:
conditions:
prerequisites:
related_atoms:
misconceptions:
examples:
phenomena:
use_cases:
experiment_hooks:
data_hooks:
assessment_hooks:
interaction_levels:
external_contexts:
citation_requirements:
version:
status:
```

## Luật cardinality
- `source_anchors` ≥ 1.
- `prerequisites`: liệt kê nếu có.
- `phenomena`: ≥ 6 tình huống/hiện tượng khác loại.
- `use_cases`: ≥ 3 cách dùng/ứng dụng.
- `examples`: ≥ 3 ví dụ tính/giải thích/nhận diện phù hợp bản chất.
- `misconceptions`: ≥ 1 nếu tồn tại; nếu chưa xác định thì ghi `unknown` và giao agent khảo sát.
- `assessment_hooks`: ≥ 3 mức nhận biết → giải thích → vận dụng/chuyển giao.
- `experiment_hooks`: ≥ 1 nếu kiến thức có thể thực nghiệm.



---

# MULTI-SCENARIO ENGINE

## Mục tiêu
Không dừng ở một ví dụ. Mỗi knowledge atom được “đưa ra khỏi sách” qua nhiều bối cảnh.

## 8 lớp bối cảnh tối thiểu
1. Gia đình.
2. Trường học.
3. Công nghệ/thiết bị.
4. Sản xuất/nông nghiệp.
5. Môi trường.
6. Sức khoẻ/an toàn.
7. Hiện tượng bất thường/counter-example.
8. Tình huống ra quyết định.

## 6 góc biểu đạt
- Quan sát hiện tượng.
- Vì sao?
- Dự đoán.
- Đo đạc/số liệu.
- Giải thích bằng mô hình/công thức.
- Chuyển giao sang bài toán mới.

## Chống trùng lặp
Hai tình huống chỉ được coi là khác nhau nếu thay đổi ít nhất 2 yếu tố: đối tượng, môi trường, mục tiêu, biến số, dữ liệu hoặc quyết định.

## Nhãn nguồn
`textbook_context`, `sgv_context`, `external_verified`, `teacher_created`, `student_generated`.



---

# PHENOMENON COVERAGE MATRIX

Mỗi atom phải có bản đồ:
`phenomenon → observation → question → concept → evidence → explanation → application`.

## Mỗi hiện tượng cần
- tên hiện tượng;
- mô tả quan sát được;
- câu hỏi khơi gợi;
- knowledge atom liên quan;
- mức độ lớp 8;
- loại bằng chứng;
- hình/video/simulation có thể dùng;
- cách kiểm chứng;
- rủi ro hiểu sai;
- citation/license nếu từ ngoài.

## Không được gán hiện tượng chỉ bằng từ khóa
Phải có liên hệ nhân quả hoặc quan hệ khái niệm rõ ràng.



---

# SCIENCE CONTEXT PACKAGER

Chuyển mỗi knowledge atom thành gói học: `core → phenomena → examples → experiment → data → application → misconception → assessment → source`.

## Thứ tự hiển thị
1. Tình huống thực tế.
2. Điều học sinh quan sát được.
3. Câu hỏi.
4. Kiến thức SGK/SGV.
5. Mở rộng.
6. Thực hành/mô phỏng.
7. Kiểm tra hiểu.
8. Bài toán chuyển giao.


---

# FORMULA INTEGRITY STANDARD — BẮT BUỘC

Mục tiêu: không để sản phẩm hiển thị, lưu trữ hoặc giải thích một công thức KHTN 8 bị sai ký hiệu, sai biến, sai đơn vị, sai điều kiện áp dụng hoặc sai phép biến đổi.

## 1. Formula Atom
Mỗi công thức phải là một `formula_atom` độc lập:

```yaml
formula_id:
lesson_id:
source_anchor:
verbatim_source:
latex_display:
plain_text:
variables:
units:
meaning_of_each_symbol:
conditions_of_validity:
domain:
derived_forms:
unit_check:
example_from_source:
example_generated:
common_misconceptions:
verification_status: [UNVERIFIED, IMAGE_VERIFIED, SGK_SGV_CROSSCHECKED, QA_PASS]
render_status: [PENDING, PASS, FAIL]
```

## 2. Quy tắc nguồn — không được tự suy diễn
- `verbatim_source` phải lấy trực tiếp từ SGK/SGV hoặc ảnh trang tương ứng.
- Không thay `g`, `N`, `kg`, `m`, `V`, `p`, `I`, `U`, `Q`, `A`... theo “thói quen” của mô hình nếu sách dùng ký hiệu khác.
- Không hợp nhất hai công thức khác ngữ cảnh thành một công thức mới nếu SGK/SGV không trình bày như vậy.
- Nếu SGK/SGV có cách biểu diễn tương đương, lưu **cả dạng nguồn** và **dạng biến đổi**, ghi rõ dạng nào là nguồn.

## 3. Kiểm tra bắt buộc trước khi công thức được PUBLISHED
1. Đối chiếu ảnh trang SGK.
2. Đối chiếu phần hướng dẫn/giải thích tương ứng trong SGV.
3. Kiểm tra từng ký hiệu.
4. Kiểm tra đơn vị SI và đơn vị mà sách thực sự sử dụng.
5. Kiểm tra điều kiện áp dụng.
6. Kiểm tra thứ nguyên / tính nhất quán đơn vị khi phù hợp.
7. Thử công thức bằng ít nhất một bộ số liệu hợp lệ.
8. Kiểm tra các dạng biến đổi cần thiết.
9. Render công thức bằng KaTeX/MathJax và kiểm tra ảnh hiển thị.
10. Kiểm tra mobile, dấu âm, chỉ số, số mũ, phân số và ký hiệu Hy Lạp.

## 4. Chống lỗi hiển thị công thức
Không dùng công thức dạng văn bản mơ hồ như `m/V=d` nếu UI có thể render LaTeX. Dữ liệu chuẩn phải lưu:

```text
latex_display: $\rho=\frac{m}{V}$
```

và đồng thời có:

```text
plain_text: rho = m / V
```

Không đặt công thức chỉ trong ảnh nếu có thể lưu MathML/LaTeX.

## 5. Quy tắc ký hiệu và đơn vị
Mỗi ký hiệu có một record:

```text
symbol → meaning → SI unit → acceptable source units → conversion rules → misconception risk
```

Ví dụ chuyển đổi đơn vị phải được lưu thành rule riêng, không nhúng ngầm trong prompt.

## 6. Quy tắc công thức dẫn xuất
Chỉ được sinh `derived_form` khi:
- có thể suy ra bằng biến đổi đại số rõ ràng từ `verbatim_source`; hoặc
- SGK/SGV có trình bày trực tiếp.

Agent phải giữ liên kết:
`derived_form → parent_formula_id`.

## 7. Công thức theo từng loại kiến thức
Không bắt buộc mọi atom đều có formula. Với atom không có công thức:
`formula_required: false` + `reason`.

Các nhóm cần quét kỹ:
- khối lượng riêng;
- nồng độ và tính theo phương trình hoá học;
- áp suất;
- moment lực;
- điện;
- nhiệt / năng lượng nhiệt;
- các bài có tỉ lệ, hiệu suất, định lượng hoặc tính toán trong phần Hoá học.

Danh mục trên chỉ là nhóm kiểm tra ưu tiên, **không được dùng để kết luận rằng ngoài các nhóm này không còn công thức**.

## 8. Formula audit matrix
```text
formula_id | lesson | source_page | SGK_match | SGV_match | symbols_ok | units_ok | conditions_ok | algebra_ok | render_ok | test_ok | status
```

## 9. Không cho AI tự chữa công thức nguồn
Nếu SGK và SGV có sai khác:
- giữ nguyên cả hai biểu diễn;
- đánh dấu `SOURCE_DISCREPANCY`;
- không tự chọn một bên;
- đưa về agent/giáo viên thẩm định.

## 10. Formula Regression Suite
Mỗi lần thay đổi content/UI/Math renderer phải chạy lại:
- snapshot render;
- parse LaTeX;
- variable presence;
- unit consistency;
- numerical example;
- mobile rendering;
- PDF/export rendering nếu sản phẩm hỗ trợ.
