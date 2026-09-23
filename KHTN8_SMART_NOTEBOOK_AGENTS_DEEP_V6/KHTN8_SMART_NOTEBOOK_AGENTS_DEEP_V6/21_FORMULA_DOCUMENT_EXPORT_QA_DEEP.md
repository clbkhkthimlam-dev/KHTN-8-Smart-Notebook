# KHTN 8 SMART NOTEBOOK — FORMULA DOCUMENT EXPORT QA V6

## 1. Mục tiêu
Bảo đảm công thức không sai hoặc lệch bố cục khi xuất:
- HTML/web;
- DOCX;
- PDF;
- bản in A4.

## 2. Golden Formula Set
Tạo một tập công thức đại diện gồm:
- phân số;
- căn;
- số mũ;
- chỉ số;
- dấu âm;
- dấu gần bằng;
- ký hiệu Greek;
- đơn vị có mũ;
- công thức nhiều vế;
- công thức có điều kiện;
- bài toán thay số.

Mỗi release phải render lại golden set.

## 3. Semantic Diff và Visual Diff
### Semantic diff
So sánh AST/MathML hoặc canonical LaTeX, không chỉ so chuỗi HTML.

### Visual diff
Render cùng viewport/khổ giấy rồi so sánh ảnh.
Phát hiện:
- thiếu ký tự;
- lệch baseline;
- công thức bị cắt;
- font fallback;
- thay đổi kích thước bất thường;
- overlap với caption/table.

## 4. DOCX QA
Kiểm tra:
- Unicode NFC;
- font chính và fallback;
- equation object/OMML nếu dùng;
- không chuyển `²` thành `2` cùng dòng;
- không biến fraction thành dấu `/` khi không được phép;
- không mất khoảng cách giữa công thức và biến;
- page break hợp lý;
- heading không nằm cuối trang một mình.

## 5. PDF QA
Kiểm tra:
- text extraction sau khi xuất;
- font embedding;
- glyph coverage;
- page images;
- crop box/media box;
- formula baseline;
- công thức không vượt lề;
- không bị font substitution.

## 6. Vietnamese + Formula joint test
Bắt buộc kiểm thử cùng trang có:
```text
Tiếng Việt có dấu
+ chữ Hy Lạp
+ chỉ số
+ số mũ
+ đơn vị
+ công thức
```

Ví dụ kiểm tra ký tự:
`ă â ê ô ơ ư đ Á À Ả Ã Ạ É È Ẻ Ẽ Ẹ Í Ì Ỉ Ĩ Ị Ó Ò Ỏ Õ Ọ Ú Ù Ủ Ũ Ụ Ý Ỳ Ỷ Ỹ Ỵ`

## 7. Print Layout Rules
- A4 portrait mặc định.
- Formula block không được tách giữa hai trang nếu còn lựa chọn bố cục khác.
- Tên công thức và công thức nên cùng khối.
- “Trong đó” phải đi sau công thức.
- Caption không đứng một mình cuối trang.

## 8. Release blocker
Nếu xuất DOCX/PDF gặp một trong các lỗi sau → `RELEASE_BLOCKED`:
- mất dấu tiếng Việt;
- ô vuông;
- mất chỉ số/số mũ;
- đổi dấu;
- sai fraction;
- sai đơn vị;
- công thức cắt một phần;
- công thức khác bản web;
- tài liệu nguồn bị thất lạc.

## 9. Automated QA record
```yaml
export_id:
document_id:
formula_count:
formula_checked:
formula_failed:
font_check:
unicode_check:
semantic_diff:
visual_diff:
docx_check:
pdf_check:
status: PASS|BLOCKED
```

## 10. Final checklist
Trước khi người dùng tải tài liệu:
- Preview giống bản xuất.
- Số lượng công thức đúng.
- Không có formula `UNVERIFIED`.
- Không có P0/P1.
- Có source/citation cho từng công thức.
- Có log export.
