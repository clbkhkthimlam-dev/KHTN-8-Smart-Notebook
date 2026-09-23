# SECURITY + PRIVACY + RIGHTS + CITATIONS + CONTENT GOVERNANCE



---

# SECURITY / PRIVACY / CHILD-SAFE DESIGN

## Nguyên tắc
- Data minimization.
- Phân quyền teacher/student/admin.
- Token không nằm trong frontend source.
- HTTPS.
- Audit log.
- Backup.
- Xóa dữ liệu theo chính sách.
- Không thu thập dữ liệu nhạy cảm để phục vụ AI.
- Không cho AI suy luận/chẩn đoán sức khỏe, tâm lý hoặc hoàn cảnh gia đình học sinh.

## Threat model
- token leak;
- spam endpoint;
- duplicate event;
- prompt injection qua resource;
- malicious URL;
- XSS trong nội dung resource;
- dữ liệu học sinh bị lộ.

## Resource safety
Không render HTML/JS từ nguồn ngoài một cách không kiểm soát.



---

# AGENT 27 — CONTENT RIGHTS & CITATIONS

## Mục tiêu
Đảm bảo tài nguyên Internet có nguồn và quyền sử dụng phù hợp.

## Record
`source_url`, `publisher`, `author`, `license`, `retrieved_at`, `attribution`, `usage_mode`.

## Usage modes
- `LINK_ONLY`
- `EMBED_ALLOWED`
- `DOWNLOAD_ALLOWED`
- `REUSE_ALLOWED`
- `REVIEW_REQUIRED`

## Quy tắc
- SGK/SGV: sử dụng làm nguồn nội bộ theo phạm vi pháp lý/phê duyệt của đơn vị triển khai; không tự ý tái phân phối toàn văn.
- Wikipedia: link/summary, không sao chép nguyên văn dài.
- Wikimedia: lưu license và attribution.
- YouTube: ưu tiên link/embed theo điều khoản nền tảng, không tải lại trái phép.

## AI citation
Mỗi câu trả lời có nguồn phải có `source_refs[]`.



---

# CONTENT GOVERNANCE

## Roles
Author → Reviewer → Science Reviewer → Pedagogy Reviewer → Publisher.

## Status
DRAFT → REVIEW → APPROVED → PUBLISHED → DEPRECATED.

## Change control
Mỗi thay đổi content ghi:
- old_version;
- new_version;
- reason;
- reviewer;
- source refs.

## AI generated content
Luôn gắn `generated=true`; không publish tự động cho nội dung core.

