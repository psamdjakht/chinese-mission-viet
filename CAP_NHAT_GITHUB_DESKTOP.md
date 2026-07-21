# Cập nhật Chinese Mission Việt 2.1 bằng GitHub Desktop

1. Mở repository `chinese-mission-viet` bằng GitHub Desktop.
2. Chọn **Repository → Show in Explorer**.
3. Giải nén gói cập nhật và sao chép toàn bộ nội dung bên trong thư mục `chinese-mission-viet` vào thư mục repository đang mở.
4. Khi Windows hỏi, chọn **Replace the files in the destination**.
5. Quay lại GitHub Desktop. Kiểm tra có các tệp mới `src/app/slots/page.tsx`, `src/lib/slots.ts` và `src/lib/data/extra-scenarios.ts`.
6. Nhập Summary: `Nâng cấp 2.1 - 50 bài và 10 slot`.
7. Chọn **Commit to main**, sau đó **Push origin**.
8. Mở Vercel và chờ deployment mới. Khi cần triển khai lại thủ công, chọn **Redeploy** và không dùng build cache cũ.

Không cần chạy thử local. Bản phát hành đã được chạy `npm run build` thành công trước khi đóng gói.
