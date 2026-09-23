# 01_BOOK_AUDIT_AND_COVERAGE_DEEP.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Ma trận bắt buộc của mỗi bài
```yaml
lesson_id:
lesson_title:
source_sgk_pages:
source_sgv_pages:
objectives:
knowledge_atoms:
skills:
activities:
experiments:
questions:
misconceptions:
formulas:
real_world_phenomena:
applications:
web_resources:
assessment:
open_gaps:
status:
```

## Cách xác nhận “đủ kiến thức”
1. Đối chiếu mục lục -> 47 bài.
2. Đối chiếu từng tiêu đề mục/tiểu mục trong SGK.
3. Đối chiếu mục tiêu và hoạt động tương ứng trong SGV.
4. Tách từng định nghĩa, quy tắc, quan hệ nhân-quả, quy trình, phân loại, điều kiện, đơn vị, biểu diễn, thực hành thành atom.
5. Đánh dấu số trang/ảnh nguồn.
6. Reconcile bằng SGV; không dùng kiến thức ngoài để lấp gap.

## Định nghĩa “kiến thức hoàn thành”
`COMPLETE = SOURCE + SEMANTIC + CONTEXT + USE + MISCONCEPTION + ASSESSMENT + RESOURCE + TRACEABILITY`.

## Coverage ledger
Mỗi dòng phải có `source_anchor`, `atom_id`, `formula_ids[]`, `scenario_ids[]`, `resource_ids[]`, `assessment_ids[]`.

## Quy tắc web
- Dùng nguồn chính thức/giáo dục cho factual core.
- Wikipedia/Wikimedia dùng background/media; giữ attribution/license.
- YouTube chỉ dùng video đã kiểm metadata.
- PhET cho mô phỏng khi phù hợp; filter có Middle School và các nhóm môn Physics/Chemistry/Biology.
