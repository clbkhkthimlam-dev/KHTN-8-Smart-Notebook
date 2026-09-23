# 11_WEB_DATA_RESOURCE_INTELLIGENCE_DEEP.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Vai trò
Kết nối từng `atom_id` với dữ liệu/tài nguyên mạng theo quan hệ ngữ nghĩa, không phải danh sách link tĩnh.

## Resource registry
```yaml
resource_id:
url:
title:
source_type: [official, textbook, education, simulation, wikipedia, wikimedia, video, open_data]
language:
grade_fit:
license:
checked_at:
freshness:
trust_score:
atom_ids: []
phenomena: []
query:
evidence_excerpt:
status:
```

## Nguồn ưu tiên
- PhET: mô phỏng tương tác; hiện có filter Middle School và nhóm Physics/Chemistry/Biology.
- Khan Academy: video/article/exercise/simulation/real-world learning.
- Wikimedia Commons: hình/diagram/media có giấy phép phù hợp.
- Wikipedia: background/thuật ngữ; không thay SGK/SGV.
- YouTube: video có metadata và kiểm tra chất lượng.
- Nguồn chính thức theo chủ đề: cơ quan khoa học, y tế, môi trường, khí tượng, dữ liệu mở.

## Query generation
Mỗi atom sinh 4 truy vấn:
1. `core concept + middle school`
2. `phenomenon + experiment`
3. `application + evidence/data`
4. `Vietnam/local context + topic`

## Không ingest trực tiếp
Không để LLM đọc web rồi trộn vào knowledge core. Web content phải qua `source_type`, `trust`, `license`, `citation`, `freshness`, `atom_relation`.

## Dynamic resource behavior
Khi trang nguồn thay đổi:
- lưu snapshot metadata;
- kiểm lại link;
- không sửa SGK knowledge atom;
- chỉ cập nhật resource layer;
- tạo change event trong audit log.
