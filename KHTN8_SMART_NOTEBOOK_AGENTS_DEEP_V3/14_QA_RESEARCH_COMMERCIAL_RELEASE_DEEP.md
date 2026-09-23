# 14_QA_RESEARCH_COMMERCIAL_RELEASE_DEEP.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## QA gates
### Content
- 47/47 bài.
- 100% mục/tiểu mục có source anchor.
- Không có atom orphan.
- Không có công thức orphan.

### Scenario
- Mỗi atom >= 6 context classes.
- Mỗi atom >= 3 application modes.
- Có phản ví dụ/misconception khi kiến thức dễ nhầm.

### Web
- link check; citation; license; freshness; source trust.

### Data
- duplicate request test; retry; offline queue; conflict; unauthorized access.

### Scientific evaluation
Pre/post, control/experimental, effect size, repeated-error rate, application transfer, inquiry skill, data interpretation.

### Commercial
Privacy; terms; content rights; pricing; onboarding; analytics; cost per active user; incident response.

## Release blocker P0
Công thức sai; source không truy nguyên; dữ liệu học sinh lộ; API ghi sai; điểm số sai; link dẫn sang nội dung độc hại; nội dung ngoài nguồn bị trình bày như kiến thức sách.
