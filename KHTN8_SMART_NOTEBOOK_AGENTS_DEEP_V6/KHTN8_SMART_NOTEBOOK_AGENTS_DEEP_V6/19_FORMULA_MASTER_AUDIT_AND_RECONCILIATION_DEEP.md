# KHTN 8 SMART NOTEBOOK — FORMULA MASTER AUDIT & RECONCILIATION V6

## 0. Mục tiêu tuyệt đối
Mục tiêu của module này là loại bỏ tình trạng:
- sai công thức;
- thiếu thành phần công thức;
- đổi ký hiệu tùy tiện;
- nhầm đơn vị;
- nhầm điều kiện áp dụng;
- công thức đúng nhưng trình bày sai;
- công thức bị mất dấu, mất chỉ số, mất số mũ;
- công thức bị OCR sai;
- công thức bị AI diễn giải lại làm thay đổi nghĩa;
- công thức trong web khác công thức nguồn nhưng hệ thống không phát hiện;
- công thức ở bản in DOCX/PDF khác công thức trên web.

Đây là **P0 content integrity gate**. Chỉ cần một công thức chưa được kiểm chứng thì phần nội dung liên quan không được đóng gói `PUBLISHED`.

## 1. Nguồn pháp lý của công thức
Thứ tự ưu tiên:
1. Ảnh/trang SGK KHTN 8 được xác minh.
2. SGV KHTN 8 tương ứng.
3. Nếu SGK/SGV có khác biệt: ghi `SOURCE_DISCREPANCY`, không tự hòa giải.
4. Nguồn web chỉ để bổ sung/giải thích, không thay thế công thức nguồn chương trình.

Mỗi công thức bắt buộc có:
- `book_id`
- `page_number`
- `printed_page`
- `lesson_id`
- `formula_id`
- `source_image_hash`
- `source_verbatim`
- `latex_exact`
- `plain_text_exact`
- `variables`
- `units`
- `conditions`
- `meaning`
- `transformations_allowed`
- `transformations_forbidden`
- `validation_examples`
- `verified_by`
- `verified_at`
- `status`

## 2. Canonical Formula Record
```yaml
formula_id: F13-001
book:
printed_page:
lesson_id:
knowledge_atom_id:
source_image_hash:
source_verbatim: ""
latex_exact: ""
plain_text_exact: ""
variables:
  - symbol:
    name:
    meaning:
    SI_unit:
    source_defined: true|false
conditions: []
known_rearrangements: []
forbidden_rearrangements: []
worked_example:
  given: []
  substitutions: []
  result: ""
  unit_result: ""
validation:
  symbolic: PASS|FAIL
  dimensional: PASS|FAIL|NA
  numerical: PASS|FAIL|NA
  source_visual: PASS|FAIL
render:
  inline: PASS|FAIL
  display: PASS|FAIL
  mobile: PASS|FAIL
  docx: PASS|FAIL
  pdf: PASS|FAIL
status: DRAFT|VERIFIED|PUBLISHED|BLOCKED
```

## 3. Quy trình kiểm tra từng công thức
`source page image → transcription 2 lần → đối chiếu ký tự → semantic check → symbolic check → unit check → numerical test → render browser → render DOCX → render PDF → visual diff → publish`

### 3.1. Hai lần phiên âm độc lập
- Pass A: người/agent 1 chép nguyên văn.
- Pass B: agent 2 chép độc lập từ ảnh.
- Diff ký tự.
- Nếu khác ở `symbol`, `superscript`, `subscript`, fraction, sign, exponent, decimal comma: BLOCK.

### 3.2. Không được sửa “cho đẹp"
Không được biến công thức nguồn thành một công thức quen thuộc hơn nếu nguồn không viết như vậy.
Không được tự đổi:
- chữ thường/chữ hoa;
- ký hiệu Latin/Greek;
- tên đại lượng;
- đơn vị;
- số mũ/chỉ số;
- dấu xấp xỉ/dấu bằng;
- điều kiện.

## 4. Phân loại lỗi công thức
### P0 — Block release
- sai toán học/vật lí/hóa học/sinh học;
- sai dấu, hệ số, số mũ, chỉ số;
- sai biến;
- sai đơn vị;
- mất một vế;
- thay đổi điều kiện áp dụng;
- render tạo nghĩa khác nguồn;
- DOCX/PDF khác web.

### P1 — Block topic release
- căn giữa sai làm mất cấu trúc;
- công thức bị cắt;
- fraction/stack bị vỡ;
- ký hiệu bị thay bằng font không có glyph;
- chú thích biến nằm xa công thức gây hiểu nhầm.

### P2 — Có thể sửa trong vòng QA
- khoảng cách dòng chưa tối ưu;
- khoảng trắng thừa;
- size hơi nhỏ nhưng không ảnh hưởng nghĩa.

## 5. Kiểm tra toán học tối thiểu
Với mọi công thức có biến:
1. xác định domain của biến;
2. kiểm tra phép biến đổi tương đương;
3. kiểm tra trường hợp số đặc biệt;
4. kiểm tra dấu;
5. kiểm tra đơn vị/dimension nếu áp dụng;
6. kiểm tra một bộ dữ liệu dương;
7. kiểm tra một bộ dữ liệu biên an toàn phù hợp;
8. đối chiếu lại kết quả với ví dụ nguồn khi có.

## 6. Không cho AI tự sinh công thức cốt lõi
LLM chỉ được:
- lấy `latex_exact` đã VERIFIED;
- render;
- giải thích biến;
- thực hiện phép thay số theo công thức đã được khóa.

LLM không được:
- viết công thức cốt lõi trực tiếp từ trí nhớ;
- đổi công thức tương đương mà không được phép;
- suy ra công thức mới rồi gắn nhãn “SGK”.

## 7. Kho công thức phiên bản hóa
Mỗi sửa công thức phải tạo:
- `formula_version`;
- reason;
- source anchor;
- diff trước/sau;
- approver;
- regression cases.

Không overwrite im lặng.

## 8. Formula lineage
```text
SGK page image
   ↓
Source transcription
   ↓
Formula Atom
   ↓
Knowledge Atom
   ↓
Web UI representation
   ↓
DOCX representation
   ↓
PDF representation
```

Mọi bước phải truy ngược được về cùng `formula_id`.

## 9. Acceptance rule
Một chương chỉ đạt `READY` khi:
- 100% formulas có source anchor;
- 100% formulas có `latex_exact`;
- 100% formulas pass source visual check;
- 100% formulas pass render check;
- 100% formulas pass export check;
- không còn P0/P1;
- các công thức bị thiếu nguồn được liệt kê riêng.
