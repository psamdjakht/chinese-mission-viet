# Kiểm tra bản dựng 2.4

- `npm ci --ignore-scripts --no-audit --no-fund`: thành công, 180 gói.
- `npm run build`: thành công với Next.js 16.2.10 và TypeScript.
- Route mới: `/review`, `/tests`, `/tests/[scenarioId]`, `/knowledge`, `/knowledge/[id]`.
- 5 chuyên đề mới được phát hiện.
- 15 bài kiểm tra được phát hiện; mỗi bài có đúng 10 câu.
- Hệ thống SRS tạo 330 thẻ, không trùng mã thẻ.
- Kiểm thử lịch SRS: thẻ đánh giá “Nhớ” được xếp lại sau 1 ngày.
- Kiểm thử lưu kết quả nhóm: điểm, số lần làm và trạng thái đạt được lưu đúng theo slot.
- Các route `/`, `/missions`, `/review`, `/tests`, `/knowledge`, `/knowledge/k16`, `/tests/s1`, `/cloud` trả HTTP 200 khi chạy production server.
- `src/lib/data/lesson-guides.ts` giữ nguyên SHA-256: `16e616f4428fbb1b4933df1b99ab765de64d90781ef981c7cb16eca22bbb7b87`.
- Không cần thay đổi `supabase/schema.sql`; dữ liệu mới nằm trong bản sao localStorage theo slot hiện có.
