# 12_FORMULA_AND_RENDER_INTEGRITY_DEEP.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Formula Atom
```yaml
formula_id:
source_anchor:
source_verbatim:
latex_exact:
plain_text_exact:
variables:
units:
conditions:
meaning:
allowed_transformations:
example_calculation:
validation_case:
render_cases:
status:
```

## Quy trình
`page image -> inspect -> source transcription -> LaTeX -> symbolic check -> unit check -> numerical check -> visual render -> regression`.

## Cấm
- Không tự đổi `m`, `M`, `V`, `d`, `D`, `p`, `S`, `F`, `I`, `U`,... chỉ vì quen dùng ký hiệu khác.
- Không tự đưa một định luật không có trong SGK/SGV vào bài cốt lõi.
- Không suy ra molar volume, hằng số, điều kiện nhiệt độ/áp suất từ trí nhớ nếu SGK không xác định.

## Frontend
- Markdown: không hiển thị công thức từ chuỗi text tự do.
- Render bằng MathJax/KaTeX từ trường `latex_exact` đã QA.
- Có fallback text; phải giữ đúng ký hiệu và đơn vị.

## Test bắt buộc
- Fraction, subscript, superscript, Greek symbols.
- Dấu âm, ngoặc, phân số kép.
- Công thức trên mobile.
- Sao chép công thức.
- Accessibility: MathML/alt text nếu dùng MathJax.
