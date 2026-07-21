# Cập nhật 2.2 bằng GitHub Desktop
## 1. Ghi đè mã nguồn
1. Giải nén gói cập nhật.
2. Mở GitHub Desktop, chọn repository `chinese-mission-viet`.
3. Chọn Repository > Show in Explorer.
4. Sao chép toàn bộ nội dung trong thư mục `chinese-mission-viet` của gói cập nhật vào repository và chọn Replace.
5. Commit với nội dung: `Sửa phát âm, micro và tự động đồng bộ Supabase`.
6. Push origin. Vercel sẽ tự deploy.

## 2. Cấu hình Supabase
1. Trong Supabase mở SQL Editor, dán và chạy lại `supabase/schema.sql`.
2. Trong Vercel > Project > Settings > Environment Variables thêm:
   - `NEXT_PUBLIC_SUPABASE_URL`: Project URL của Supabase.
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon/public hoặc publishable key của Supabase.
3. Chọn Production, Preview và Development rồi lưu.
4. Vào Supabase > Authentication > URL Configuration:
   - Site URL: địa chỉ Vercel chính thức.
   - Redirect URL: `https://TEN-DU-AN.vercel.app/cloud`.
5. Redeploy Vercel không dùng cache nếu cần.
6. Mở `/cloud`, nhập email và bấm liên kết Supabase gửi đến. Không cần mật khẩu.

## 3. Cách hoạt động sau cập nhật
- Âm thanh lặp sẽ chờ đọc xong hoàn toàn, nghỉ 450 ms rồi mới đọc lần tiếp theo.
- Micro đổi sang bấm một lần để bắt đầu, bấm lần nữa để dừng.
- Câu tiếng Trung nhận được sẽ điền vào ô nhập; người học kiểm tra rồi bấm Gửi.
- Sau khi đăng nhập Supabase một lần, mọi thay đổi của cả 10 slot tự lưu sau khoảng 1–2 giây.
- Khi mở lại, phần mềm so sánh thời gian và tự khôi phục bản mới hơn.
- Nút Lưu ngay và Khôi phục từ cloud vẫn có trong trang `/cloud`.

## 4. Kiểm tra nhanh
- Vào một bài, chọn nghe 3 lần: câu thứ hai chỉ bắt đầu sau khi câu thứ nhất kết thúc.
- Trong hội thoại, bấm micro, nói tiếng Trung, bấm micro lần nữa: chữ nhận dạng xuất hiện trong ô nhập và nút Gửi sáng lên.
- Vào `/cloud`, trạng thái phải hiện `Đã tự động lưu tiến độ của cả 10 slot` sau khi thay đổi tiến độ.
