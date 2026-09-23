# KHTN 8 SMART NOTEBOOK — FORMULA UI RENDERING RULES V6

## 1. Nguyên tắc
Công thức là một đối tượng dữ liệu có cấu trúc, không phải đoạn văn thuần túy.

Không dùng:
```text
<p>p = F/S</p>
```
cho công thức học thuật đã khóa.

Phải dùng một component:
```json
{
  "type": "formula",
  "formula_id": "F15-001",
  "latex_exact": "...",
  "display": true,
  "source_anchor": "..."
}
```

## 2. Inline vs Display
### Inline
Chỉ dùng khi công thức rất ngắn và không có phân số/phân tích dài.

### Display
Bắt buộc cho:
- công thức chính của bài;
- công thức có phân số;
- công thức có nhiều vế;
- công thức biến đổi;
- công thức có điều kiện;
- bài giải thay số.

Không nhét công thức dài vào bảng hai cột.

## 3. Bố trí chuẩn
```text
Tên đại lượng / ý nghĩa

        [ CÔNG THỨC ]

Trong đó:
• symbol 1 — ý nghĩa — đơn vị
• symbol 2 — ý nghĩa — đơn vị

Điều kiện áp dụng: ...

Ví dụ: ...
```

Không đặt danh sách biến trên cùng dòng làm công thức bị dính.

## 4. MathJax/KaTeX
- Nguồn canonical: `latex_exact`.
- Renderer phải hỗ trợ fraction, sqrt, superscript, subscript, Greek, parentheses, matrices nếu nguồn có.
- MathML/accessibility nếu framework hỗ trợ.
- Không stringify HTML từ LaTeX.
- Không escape slash/backslash sai tầng.

## 5. Quy tắc tránh lỗi hiển thị
Không để:
- công thức bị wrap giữa tử/mẫu;
- dấu bằng ở cuối dòng nhưng vế kia sang dòng khác;
- chỉ số bị xuống hàng riêng;
- số mũ bị rơi;
- ký hiệu Greek thành ô vuông;
- công thức sát mép giấy;
- nền/ảnh che công thức;
- font công thức khác ngữ nghĩa.

## 6. Responsive
### Desktop
Kích thước đủ lớn để đọc rõ.

### Tablet
Cho phép cuộn ngang trong một component công thức cực dài; không wrap phá cấu trúc.

### Mobile
Công thức dài có container riêng, không tràn viewport.

## 7. Formula + Explanation binding
Ngay sau công thức chính phải có:
- `meaning`
- `variables`
- `units`
- `conditions`

Không để học sinh phải kéo qua trang mới để tìm biến của công thức.

## 8. Formula + Worked Example
Bài giải chuẩn:
```text
Dữ kiện
→ Đổi đơn vị
→ Chọn công thức
→ Thay số
→ Tính
→ Kiểm tra đơn vị
→ Kết luận
```

Tuyệt đối không đặt một chuỗi dài trong một dòng.

## 9. Formula card
Mọi formula card phải có:
- tiêu đề;
- formula;
- biến;
- đơn vị;
- điều kiện;
- “Dùng khi nào?”;
- “Không dùng khi nào?”;
- ví dụ;
- source.

## 10. Export preservation
Web → DOCX → PDF phải giữ cùng:
- formula_id;
- thứ tự vế;
- ký hiệu;
- dấu;
- chỉ số;
- số mũ;
- đơn vị.

Không rasterize công thức nếu DOCX/PDF còn có thể dùng math object; chỉ fallback thành ảnh khi renderer không hỗ trợ, và phải kiểm chứng ảnh đó bằng visual diff.
