# 13_DATA_SHEET_APPSCRIPT_DEEP.md

# KHTN 8 SMART NOTEBOOK — BỘ MD CHUYÊN ĐỀ CẢI TIẾN

## Quy tắc nguồn bắt buộc
- SGK KHTN 8 Kết nối tri thức + SGV KHTN 8 Kết nối tri thức là **nguồn quyết định học gì**.
- Không được lấy web để thay thế, sửa, rút gọn hoặc “đoán” nội dung của SGK/SGV khi chưa có source anchor.
- Mọi mở rộng từ web phải mang `external_context=true`, có URL, tiêu đề nguồn, ngày kiểm tra, loại nguồn và độ tin cậy.
- Mỗi kiến thức phải được tách thành `knowledge_atom`; mỗi atom phải có: định nghĩa/quan hệ; điều kiện; dấu hiệu; ví dụ; phản ví dụ; tối thiểu 6 tình huống; tối thiểu 3 cách dùng/ứng dụng; 1 misconception; 1 diagnostic; 1 transfer task; liên kết prereq/postreq; resource links; assessment evidence.
- Nội dung chưa đối chiếu được với trang ảnh SGK/SGV phải ở trạng thái `NEEDS_SOURCE_VERIFICATION`, không publish.
- Công thức phải qua Formula Gate: ảnh trang -> nguyên văn nguồn -> LaTeX -> biến/đơn vị -> điều kiện -> tính toán kiểm tra -> render MathJax/KaTeX -> regression test.

## Mục tiêu
Google Sheets + Apps Script là tầng dữ liệu nhẹ, không phải nơi chứa logic học tập.

## Sheets tối thiểu
`CONFIG`, `USERS`, `STUDENTS`, `LESSONS`, `KNOWLEDGE_ATOMS`, `SCENARIOS`, `RESOURCES`, `EVENTS`, `MASTERY`, `MISCONCEPTIONS`, `LABS`, `ASSESSMENTS`, `AUDIT_LOG`, `INPUT`.

## INPUT
```text
B2 student_id
B3 lesson_id
B4 atom_id
B5 activity_id
B6 score
B7 max_score
B8 hints
B9 duration_seconds
B10 response_text
B11 resource_id
B12 request_id
B13 submit_status
```

## Apps Script API
- `GET /config`
- `GET /lesson?id=`
- `GET /atom?id=`
- `POST /event`
- `POST /lab-result`
- `POST /assessment`
- `GET /student-progress?id=`

## Tính chất bắt buộc
Auth -> validate -> idempotency -> write -> analytics -> response.

## Event
```yaml
event_id:
request_id:
student_id:
session_id:
lesson_id:
atom_id:
action:
payload:
score:
created_at:
client_version:
source:
```

## Từ Sheet ra app
App đọc dữ liệu đã chuẩn hóa; không hard-code danh sách bài, resource, scenario trong frontend.
