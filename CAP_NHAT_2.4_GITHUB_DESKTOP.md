# Cập nhật Chinese Mission Việt 2.4 bằng GitHub Desktop

## Nội dung
- Hệ thống ôn lặp ngắt quãng tại `/review`.
- 15 bài kiểm tra tổng hợp tại `/tests`.
- 5 chuyên đề kiến thức mới tại `/knowledge`.
- Giữ nguyên file `src/lib/data/lesson-guides.ts` và toàn bộ 15 bộ kiến thức cũ.
- Dữ liệu mới tự đi theo bản sao Supabase hiện có, không cần chạy lại SQL.

## Cách cập nhật
1. Giải nén gói cập nhật.
2. Mở GitHub Desktop và chọn repository `chinese-mission-viet`.
3. Chọn **Repository → Show in Explorer**.
4. Mở thư mục `chinese-mission-viet` trong gói cập nhật, sao chép toàn bộ nội dung vào repository và chọn ghi đè.
5. Trong GitHub Desktop, kiểm tra thay đổi rồi commit với nội dung `Nâng cấp 2.4 - SRS, kiểm tra nhóm và 5 chuyên đề mới`.
6. Bấm **Push origin**. Vercel sẽ tự triển khai.

## Kiểm tra sau triển khai
- Trang `/missions` có ba khối: Ôn lặp ngắt quãng, Kiểm tra theo nhóm, 5 chuyên đề mới.
- Trang `/review` tạo phiên 20 thẻ và lưu lịch riêng theo slot.
- Trang `/tests` có đủ 15 nhóm; mỗi nhóm 10 câu.
- Trang `/knowledge` có đúng 5 chuyên đề mới.
- Không cần thay đổi Supabase, biến môi trường hoặc Redirect URL.
