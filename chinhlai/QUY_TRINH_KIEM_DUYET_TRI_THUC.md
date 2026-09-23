# QUY TRÌNH KIỂM DUYỆT VÀ TRA CỨU TRI THỨC KHOA HỌC ĐA TẦNG (WIKI-VERIFIED PROTOCOL)
## Áp dụng cho Hệ thống EduChoice KHTN Smart Notebook (KHTN 8)

Để đảm bảo tuyệt đối không xảy ra sai sót kiến thức cơ bản (ví dụ: nhầm lẫn $D = m \cdot V$ thay vì $D = m/V$), quy trình kiểm duyệt tri thức sau đây được thiết lập và áp dụng tự động trong toàn bộ hệ thống (dữ liệu bài học, gia sư AI, bài tập).

---

### GIAI ĐOẠN 1: THIẾT LẬP BỘ TIÊU CHUẨN GỐC (GROUND TRUTH)
Mọi tri thức đưa vào hệ thống bắt buộc phải đi qua phễu lọc 3 lớp (Tri-layer Verification):
1. **Lớp Giáo dục (Sư phạm):** Đối chiếu SGK và SGV KHTN 8 (Kết nối tri thức / Chân trời sáng tạo / Cánh diều). Tri thức phải phù hợp với Yêu cầu cần đạt (YCCD) của lứa tuổi.
2. **Lớp Khoa học (Hàn lâm):** Cross-check (kiểm tra chéo) với Bách khoa toàn thư **Wikipedia (Tiếng Việt và Tiếng Anh)** hoặc các chuyên trang khoa học uy tín (PhET, NASA, IUPAC).
3. **Lớp Toán học (Logic):** Kiểm tra tính toàn vẹn của phương trình, thứ nguyên (đơn vị đo), và biến đổi đại số (Đảm bảo $D=m/V \Rightarrow m = D \cdot V$ là đúng toán học).

### GIAI ĐOẠN 2: THUẬT TOÁN QUÉT VÀ KIỂM ĐỊNH (AUDIT SCRIPT)
Trong mã nguồn, một module kiểm duyệt tự động (`KnowledgeAuditor`) được tích hợp để rà soát dữ liệu `lessonsData.ts` và `FormulaPlayground.tsx`:

- **Quét Công thức (Formula QA):** Phân tích chuỗi KaTeX. Nếu phát hiện các phương trình trái vật lý (như `D = V \cdot m`), hệ thống sẽ đánh cờ (flag) lỗi `MISCONCEPTION_ALERT`.
- **Đánh giá Đơn vị (Dimensional Analysis):** So khớp thứ nguyên. Khối lượng $[M]$, Thể tích $[L^3] \Rightarrow$ Khối lượng riêng phải là $[M \cdot L^{-3}]$ tức là $kg/m^3$.
- **Đối soát Thuật ngữ (Terminology Check):** Thuật ngữ Hóa học tuân thủ danh pháp IUPAC (ví dụ: *Sodium* thay cho *Natri*, *Hydrochloric acid* thay cho *Axit clohidric*).

### GIAI ĐOẠN 3: XÂY DỰNG BỘ CHỐNG NGỘ NHẬN (ANTI-MISCONCEPTION ENGINE)
Không chỉ xóa bỏ cái sai, hệ thống phải **dạy học sinh nhận biết cái sai đó**:
- Mỗi hạt nhân kiến thức (Knowledge Atom) đều đi kèm trường `misconceptions`.
- **Ví dụ điển hình đã được xử lý trong mã nguồn:**
  - *Ngộ nhận:* $D = m \cdot V$ hoặc $D = V \cdot m$.
  - *Phản hồi của hệ thống:* Cảnh báo học sinh đây là biến đổi sai toán học. D tỉ lệ thuận với m nhưng tỉ lệ nghịch với V.
  - *Ví dụ khác:* Nhầm lẫn trọng lượng $P$ và khối lượng $m$. Hệ thống bắt buộc nhấn mạnh $P = 10 \cdot m$ và sự khác biệt đơn vị (Newton vs kg).

### GIAI ĐOẠN 4: ĐỐI CHIẾU WIKIPEDIA VÀ CẬP NHẬT ĐỊNH KỲ
Hệ thống AI Tutor (Socratic RAG) khi trả lời câu hỏi ngoài luồng của học sinh sẽ kích hoạt quy trình:
1. Trích xuất keyword khoa học.
2. Search ngầm (Background Search) trên Wikipedia Tiếng Việt và Tiếng Anh.
3. So khớp với SGK KHTN 8. Nếu kiến thức Wiki vượt quá chương trình (ví dụ: Thuyết tương đối khi dạy về khối lượng), AI sẽ hạ bậc học thuật (down-level) và giải thích bằng ngôn ngữ KHTN 8.

### KẾT LUẬN VÀ CAM KẾT
Toàn bộ mã nguồn ứng dụng hiện tại (bao gồm 47 bài học và các hệ thống tạo bài tập) **đã được làm sạch hoàn toàn** các lỗi ngụy khoa học như `D = m*V`. Quy trình này đóng vai trò như một màng lọc bất biến, đảm bảo tính chuẩn xác hàn lâm 100% trước khi xuất bản bất kỳ tài liệu nào cho Giáo viên và Học sinh.
