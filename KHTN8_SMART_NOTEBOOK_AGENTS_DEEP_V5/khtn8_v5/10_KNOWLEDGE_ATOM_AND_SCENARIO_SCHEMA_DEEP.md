# 10_KNOWLEDGE_ATOM_AND_SCENARIO_SCHEMA_DEEP.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Knowledge Atom
```yaml
atom_id:
lesson_id:
topic_id:
source_anchor:
source_text:
canonical_explanation:
key_terms: []
relations: []
conditions: []
representations: [text, diagram, table, graph, formula, simulation]
prerequisites: []
postrequisites: []
examples: []
counterexamples: []
misconceptions: []
applications: []
scenarios: []
experiments: []
data_patterns: []
assessment_items: []
web_resources: []
formula_ids: []
status:
```

## Scenario object
```yaml
scenario_id:
atom_id:
context_class:
locality:
observation:
question:
known_data:
unknown:
student_action:
expected_reasoning:
evidence:
common_wrong_path:
feedback_hint:
transfer_variant:
resource_refs:
```

## 6 lớp tình huống tối thiểu
1. Gia đình.
2. Trường học.
3. Công nghệ.
4. Sản xuất/nông nghiệp.
5. Môi trường/cộng đồng.
6. Quyết định/giải quyết vấn đề.

## Mở rộng thông minh
- Không dùng 6 tình huống chỉ là 6 ví dụ đổi tên. Mỗi tình huống phải thay đổi ít nhất một biến, một mục tiêu hoặc một ràng buộc.
- Hệ thống phải tạo thêm biến thể “what-if”, dữ liệu thiếu, dữ liệu nhiễu, điều kiện biên, tình huống trái trực giác và tình huống mới hoàn toàn.
