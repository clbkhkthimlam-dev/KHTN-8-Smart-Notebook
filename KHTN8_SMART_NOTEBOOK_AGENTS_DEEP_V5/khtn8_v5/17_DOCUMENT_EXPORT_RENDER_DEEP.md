# 17_DOCUMENT_EXPORT_RENDER_DEEP.md

# KHTN 8 SMART NOTEBOOK — DOCUMENT EXPORT + PRINT RENDER ENGINE

## 1. MỤC TIÊU
Sửa triệt để lỗi tiếng Việt khi in/xuất tài liệu và cho phép người dùng xuất nội dung kiến thức đã chọn thành:
- DOCX;
- PDF;
- bản in tối ưu A4;
- bản xem trước trước khi tải/xuất.

Phạm vi nội dung dùng chung với Smart Knowledge Export: Chương, Bài, Knowledge Atom, công thức, bài tập, tình huống, hình ảnh, thí nghiệm, tài nguyên web và dữ liệu liên quan.

## 2. LỖI TIẾNG VIỆT — NGUYÊN TẮC BẮT BUỘC
### 2.1 Chuỗi ký tự
Toàn bộ hệ thống phải thống nhất:
- UTF-8 cho source code, JSON, CSV, Markdown, API payload, database text và file tạm;
- HTTP response có charset UTF-8;
- không dùng Latin-1/Windows-1252 để đọc/ghi nội dung Unicode;
- không dùng bước chuyển đổi encode/decode không cần thiết;
- kiểm tra NFC normalization cho tiếng Việt trước khi render.

### 2.2 Font
Phải nhúng hoặc xác định font có đầy đủ glyph tiếng Việt.
Ưu tiên:
- Noto Sans / Noto Serif;
- Arial/Calibri nếu môi trường Word có sẵn và đã kiểm thử;
- font công thức Unicode/MathJax tương thích.

Không được dùng font chỉ có Latin cơ bản.
Không được phụ thuộc vào font riêng trên máy lập trình viên.

### 2.3 DOCX
Khi tạo DOCX:
- đặt font cho Normal, Heading 1-4, Caption, Table, Header/Footer;
- giữ text Unicode trực tiếp;
- không ghi HTML entity thay cho tiếng Việt;
- không lưu UTF-8 bytes vào run text theo cách làm mất Unicode;
- kiểm tra OOXML sau khi tạo.

### 2.4 PDF
PDF phải được tạo từ DOCX hoặc pipeline PDF có font embedding.
Font phải được embed hoặc pipeline đảm bảo font mapping ổn định.
Không raster hóa toàn bộ chữ chỉ để né lỗi font.

## 3. PIPELINE CHUẨN
```text
Selection
  ↓
Knowledge Package
  ↓
Document Model
  ↓
Vietnamese Unicode Normalize
  ↓
Formula Gate
  ↓
Image/Caption Rights Gate
  ↓
DOCX Renderer
  ↓
DOCX QA
  ↓
PDF Converter
  ↓
PDF Font/Unicode QA
  ↓
Page Image Render
  ↓
Visual QA
  ↓
Publish
```

Không cho phép xuất PDF trực tiếp từ dữ liệu chưa qua Document Model.

## 4. DOCUMENT MODEL
```yaml
document_id:
title:
language: vi-VN
encoding: UTF-8
normalization: NFC
paper: A4
orientation: portrait
margins_mm:
  top: 18
  right: 18
  bottom: 18
  left: 18
font_pack:
  body: Noto Sans
  heading: Noto Sans
  formula: KaTeX/MathJax compatible
sections: []
toc: true
page_numbers: true
source_notes: true
bibliography: true
exported_at:
dataset_version:
package_hash:
```

## 5. CẤU TRÚC TÀI LIỆU KIẾN THỨC
### Trang bìa
- tên gói kiến thức;
- Chương/Bài được chọn;
- phạm vi;
- phiên bản dữ liệu;
- ngày xuất.

### Mục lục
Tạo theo heading thực tế, không viết tay nếu pipeline có thể tạo TOC tự động.

### Mỗi Knowledge Atom
1. Tên kiến thức.
2. Định nghĩa/quan hệ.
3. Điều kiện áp dụng.
4. Công thức nếu có.
5. Ý nghĩa đại lượng/ký hiệu/đơn vị.
6. Ví dụ.
7. Phản ví dụ/cảnh báo nhầm lẫn.
8. Tình huống thực tế.
9. Hình ảnh cụ thể + caption + nguồn.
10. Thí nghiệm/mô phỏng.
11. Bài tập cơ bản.
12. Bài tập vận dụng.
13. Bài tập chuyển giao.
14. Gợi ý từng bước.
15. Liên kết web.
16. Nguồn SGK/SGV.

## 6. HÌNH ẢNH TRONG DOCX/PDF
Mỗi hình phải có:
- ảnh;
- chú thích;
- nguồn;
- license/attribution nếu cần;
- alt text;
- knowledge/scenario id.

Không được để ảnh tràn lề hoặc mất tỷ lệ.
Không chèn ảnh URL remote trực tiếp vào tài liệu; phải tải/đóng gói tài nguyên đã được kiểm duyệt.

## 7. CÔNG THỨC
Công thức trong DOCX/PDF phải được lấy từ `formula_atom.latex_exact` đã QA.

Ưu tiên hiển thị:
- phân số thật;
- chỉ số dưới/trên;
- ký hiệu Hy Lạp;
- dấu căn;
- ngoặc đúng;
- đơn vị đúng.

Fallback phải có dạng text có cấu trúc, không được làm mất nghĩa.

### Formula export check
- so khớp LaTeX nguồn với manifest;
- render PNG hoặc PDF preview;
- kiểm tra visually;
- kiểm tra copy/paste nếu nền tảng hỗ trợ.

## 8. BẢN IN "KIẾN THỨC"
Cung cấp preset:

### A. Tờ kiến thức
- định nghĩa;
- công thức;
- đơn vị;
- sơ đồ;
- lỗi thường gặp;
- ví dụ.

### B. Phiếu ôn tập
- kiến thức cốt lõi;
- câu hỏi tự kiểm tra;
- bài tập;
- đáp án ẩn hoặc gói giáo viên.

### C. Sổ tay đầy đủ
- toàn bộ Knowledge Atom;
- tình huống;
- hình ảnh;
- thí nghiệm;
- web resource;
- bài tập.

### D. Gói giáo viên
- YCCD;
- kiến thức;
- hoạt động;
- đáp án/rubric theo quyền;
- thống kê coverage.

## 9. TRẠNG THÁI XUẤT
```text
DRAFT
→ PREVIEW
→ CONTENT_VALIDATED
→ FORMULA_VALIDATED
→ DOCUMENT_RENDERED
→ DOCX_QA_PASS
→ PDF_QA_PASS
→ READY_TO_EXPORT
```

Nếu bất kỳ gate nào fail: không cho tải bản chính thức.

## 10. TÊN FILE
Tên file phải Unicode-safe nhưng slug ổn định:
```text
KHTN8_Chuong03_KhoiLuongRieng_ApSuat.docx
KHTN8_Chuong03_KhoiLuongRieng_ApSuat.pdf
```

Không dùng ký tự `/ \\ : * ? " < > |`.
Không đổi tên làm mất dataset version hoặc package id trong manifest.

## 11. API
```text
POST /export/document/preview
POST /export/document/docx
POST /export/document/pdf
GET  /export/document/status?id=
GET  /export/document/download?id=
```

Payload tối thiểu:
```yaml
package_id:
format: docx|pdf
print_preset: knowledge_sheet|revision|full_notebook|teacher_pack
language: vi-VN
include_images: true
include_web_links: true
include_answers: false
include_source_notes: true
```

## 12. UX
Nút xuất phải hiển thị rõ:
- Xuất DOCX;
- Xuất PDF;
- In A4;
- Xem trước.

Trước khi xuất hiển thị:
```text
47 knowledge atoms
12 formulas
86 exercises
42 scenarios
31 images
18 web resources
```

Cho phép bật/tắt:
- hình ảnh;
- lời giải;
- đáp án;
- nguồn;
- link web;
- mục lục.

## 13. TEST TIẾNG VIỆT BẮT BUỘC
Tạo fixture có:
```text
Khoa học tự nhiên
Khối lượng riêng
Áp suất chất lỏng
Hiệu điện thế
Năng lượng nhiệt
Hệ thần kinh
Quần thể sinh vật
Bảo vệ môi trường
```

và các ký tự:
```text
ă â ê ô ơ ư
Ă Â Ê Ô Ơ Ư
đ Đ
á à ả ã ạ
ấ ầ ẩ ẫ ậ
ế è ẻ ẽ ẹ
```

Phải kiểm:
- hiển thị trên browser;
- DOCX;
- PDF;
- trang in;
- copy/paste;
- tên file;
- bảng;
- header/footer.

## 14. REGRESSION TEST
Mỗi release phải render một tài liệu mẫu tối thiểu 5 trang có:
- tiếng Việt;
- bảng;
- ảnh;
- 5 công thức;
- liên kết;
- chú thích;
- header/footer;
- page number.

So sánh ảnh trang trước/sau và fail khi:
- mất dấu tiếng Việt;
- ô vuông glyph;
- chồng chữ;
- công thức sai;
- ảnh bị méo;
- cắt nội dung;
- font fallback bất thường.

## 15. ĐỀ XUẤT CẢI TIẾN UX
1. `Smart Print Preview`: xem trước đúng từng trang A4 trước khi xuất.
2. `Export Presets`: lưu mẫu xuất của giáo viên.
3. `Print by Selection`: chọn bài/atom ngay trên preview và cập nhật số trang tức thời.
4. `Teacher Answer Layer`: bật đáp án trong bản giáo viên nhưng không làm thay đổi bản học sinh.
5. `Citation Footnotes`: tự tạo chú thích nguồn cho từng hình/tài nguyên.
6. `QR Resource`: tạo QR cho video, mô phỏng hoặc web resource trong bản PDF giấy.
7. `Offline Print Pack`: đóng gói tài liệu + nguồn quan trọng để học sinh dùng khi không có mạng.
8. `Versioned Export`: lưu dataset version + package hash để tài liệu in có thể truy nguyên.
9. `Accessibility Print`: cỡ chữ, tương phản, heading, alt text và cấu trúc tài liệu rõ ràng.
10. `Export Audit`: lưu người xuất, selection, version, timestamp, format và trạng thái QA.

## 16. ACCEPTANCE CRITERIA
- 100% test strings tiếng Việt render đúng.
- 0 ký tự mojibake.
- 0 glyph vuông ở bộ font được hỗ trợ.
- 100% formula export từ formula atom đã QA.
- DOCX mở được bằng Microsoft Word/LibreOffice.
- PDF render được và đọc đúng Unicode.
- Hình ảnh/caption/source không bị tách sai.
- Không export nội dung ngoài selection do graph traversal ngoài phạm vi.
- Có provenance cho nội dung và resource.
