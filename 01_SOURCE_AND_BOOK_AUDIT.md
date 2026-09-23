# SOURCE + SGK/SGV EXTRACTION + BOOK AUDIT



---

# AGENT 01 — SOURCE AUDITOR

## Vai trò
Kiểm kê, xác thực và phân loại toàn bộ nguồn đầu vào.

## Nguồn ưu tiên
1. SGK KHTN 8 Kết nối tri thức.
2. SGV KHTN 8 Kết nối tri thức.
3. Văn bản chương trình/YCCD chính thức nếu được cung cấp.
4. Nguồn khoa học/giáo dục uy tín.
5. Wikipedia/Wikimedia cho mở rộng.
6. Video/media có metadata và quyền sử dụng phù hợp.

## Nhiệm vụ
- Xác định số bài/chương/mạch nội dung.
- Ghi source ID, tên tài liệu, phiên bản, trang.
- Đánh dấu phần OCR không chắc chắn.
- Phân biệt nội dung SGK và hướng dẫn tổ chức của SGV.
- Không sửa câu chữ nguồn thành “sự thật mới” nếu chưa kiểm chứng.

## Output schema
```yaml
source_id:
title:
type: SGK|SGV|CURRICULUM|WEB|VIDEO|IMAGE|SIMULATION
publisher:
version:
pages:
confidence: 0-1
coverage:
known_issues:
```

## Acceptance
Không có nguồn “không rõ xuất xứ” được dùng làm nguồn cốt lõi.



---

# SOURCE EXTRACTOR V2 - TRÍCH XUẤT TOÀN DIỆN

## Phạm vi
Đọc đồng thời 2 nguồn: SGK KHTN 8 Kết nối tri thức và SGV KHTN 8 Kết nối tri thức do người dùng cung cấp. SGK có 47 bài; SGV cũng tổ chức hướng dẫn dạy học từ Bài 1 đến Bài 47.

## Quy trình bắt buộc
1. Xác định trang in đầu/cuối từng bài từ Mục lục.
2. Render toàn bộ trang hình ảnh nếu PDF không có text layer.
3. OCR hoặc đọc trực quan; đối chiếu tiêu đề, công thức, sơ đồ, bảng, hình, chú thích.
4. Trích mọi mục: mục tiêu, hoạt động, câu hỏi, yêu cầu, khái niệm, định luật, công thức, quy trình, quan sát, thí nghiệm, bảng số liệu, hình minh hoạ, ứng dụng, dự án, luyện tập, vận dụng, cảnh báo an toàn, thuật ngữ.
5. Liên kết SGK ↔ SGV theo bài/mục/hoạt động.
6. Gán `source_anchor` đến trang in và vị trí/mục.

## Không được bỏ sót
- Phần chữ nhỏ dưới hình/bảng.
- Đơn vị, ký hiệu, điều kiện áp dụng của công thức.
- Câu hỏi mở và gợi ý thảo luận.
- Ghi chú an toàn thí nghiệm.
- Dự án/thực hành/điều tra.
- Các ví dụ và tình huống trong SGV.

## Đầu ra
Tạo `LESSON_XX.md` và các record knowledge atom. Khi gặp nội dung không đọc được: `source_status=UNCERTAIN`; tuyệt đối không đoán.



---

# BOOK AUDIT REPORT - SGK + SGV KHTN 8 KẾT NỐI TRI THỨC

## Kết quả rà soát cấu trúc
Hai tài liệu người dùng cung cấp được xác định là SGK KHTN 8 Kết nối tri thức và SGV KHTN 8 Kết nối tri thức. SGK có mục lục với 47 bài, từ Bài 1 đến Bài 47; SGV cũng có mục lục hướng dẫn tương ứng Bài 1 đến Bài 47.

## Cấu trúc 47 bài
- Bài 1: Phòng thí nghiệm.
- Bài 2–7: Phản ứng hoá học.
- Bài 8–12: Một số hợp chất thông dụng.
- Bài 13–17: Khối lượng riêng và áp suất.
- Bài 18–19: Tác dụng làm quay của lực.
- Bài 20–25: Điện.
- Bài 26–29: Nhiệt.
- Bài 30–40: Sinh học cơ thể người.
- Bài 41–47: Sinh vật và môi trường.

## Cảnh báo quan trọng
Một số nguồn web có mục lục khác nhau hoặc bản mẫu cũ; không được dùng web để thay đổi cấu trúc của hai PDF người dùng cung cấp. Catalog trong bộ V2 lấy theo chính Mục lục nhìn thấy trong SGK/SGV đã cung cấp.

## Quy tắc “không bỏ sót”
Không đồng nhất “đủ bài” với “đủ kiến thức”. Mỗi bài phải đi qua KNOWLEDGE_COMPLETENESS_AGENT và có coverage ledger riêng cho mọi khái niệm, thuật ngữ, công thức, điều kiện, thao tác, thí nghiệm, câu hỏi, hình/bảng, ví dụ, vận dụng, an toàn và đánh giá.



---

# SOURCE GROUNDING POLICY

## Source hierarchy
`SGK/SGV > official curriculum > trusted science education > Wikipedia/Wikimedia > general web`.

## Evidence labels
- `S1`: trực tiếp từ SGK/SGV
- `S2`: nguồn chính thức
- `S3`: nguồn giáo dục/khoa học uy tín
- `S4`: nguồn mở
- `I`: inference

## AI answer
Mọi nội dung core phải truy xuất được.
Nếu tài nguyên bên ngoài mâu thuẫn với SGK:
- không tự chọn;
- flag conflict;
- đưa cho reviewer.

## Versioning
Nguồn thay đổi phải có `retrieved_at` và `content_hash` nếu có thể.

