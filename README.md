# Chinese Mission Việt 2.0

Ứng dụng mã nguồn mở luyện giao tiếp tiếng Trung theo nhiệm vụ thực tế, được phát triển từ Chinese Mission. Bản này giữ nguyên các luồng cũ và chuyển ngôn ngữ hướng dẫn mặc định sang tiếng Việt, đồng thời đổi giao diện sang tone xanh lá pastel.

## Tính năng được giữ nguyên

- 20 nhiệm vụ thuộc 6 nhóm tình huống: ăn uống, taxi, hỏi đường, tự giới thiệu, kết bạn và công việc.
- Khởi động bằng câu mẫu có chữ Hán, pinyin, tách cụm, nghĩa và ghi chú.
- Hội thoại bằng AI tương thích OpenAI hoặc rule engine cục bộ khi không có API.
- Nhập văn bản, nhận giọng nói, đọc câu tiếng Trung, gợi ý tăng dần.
- Chấm kết quả sau nhiệm vụ, lưu câu vào sổ câu, theo dõi tiến độ và giới hạn lượt học.
- Capacitor/iOS từ dự án gốc vẫn được giữ trong thư mục `ios`.

## Phần phát triển thêm

- Toàn bộ luồng học và phản hồi chính bằng tiếng Việt; bản dịch tiếng Anh có thể bật lại trong cài đặt.
- Giao diện xanh lá pastel, tối ưu điện thoại và máy tính.
- Cài đặt pinyin, nghĩa Việt, tách nghĩa, tự đọc, tốc độ đọc và số lần lặp.
- Luyện nghe lặp câu mẫu và đánh dấu đã luyện.
- Tìm kiếm bài học và sổ câu; tăng/giảm mức độ nhớ của từng câu.
- Chuỗi ngày học, sao lưu/khôi phục JSON.
- Supabase tùy chọn: magic-link email và đồng bộ bản sao nhiều thiết bị bằng Row Level Security.
- AI chờ tối đa 25 giây, thử lại một lần, đọc JSON dung sai và tự rơi về rule engine khi API lỗi.
- PWA manifest và GitHub Actions kiểm tra build.

## Chạy trên máy

Yêu cầu Node.js 22 trở lên.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`.

## Chế độ không dùng AI

Không cần cấu hình gì. Khi thiếu `AI_API_KEY`, ứng dụng tự dùng rule engine cục bộ. Có thể ép dùng rule engine:

```env
USE_RULE_ENGINE=true
```

## Bật AI

Ứng dụng dùng API theo chuẩn OpenAI Chat Completions. Ví dụ:

```env
AI_API_KEY=...
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
USE_RULE_ENGINE=false
```

Có thể thay bằng nhà cung cấp tương thích OpenAI. Không đưa khóa API vào mã nguồn hoặc commit lên GitHub.

## Bật Supabase

Supabase không bắt buộc. Nếu không cấu hình, mọi tính năng học vẫn hoạt động và dữ liệu lưu trong trình duyệt.

1. Tạo dự án Supabase.
2. Mở SQL Editor và chạy `supabase/schema.sql`.
3. Trong Authentication, bật Email OTP/Magic Link và thêm URL triển khai vào Redirect URLs.
4. Thêm biến môi trường:

```env
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Bảng `learner_backups` dùng RLS nên mỗi tài khoản chỉ truy cập bản sao của chính mình.

## Đưa mã nguồn lên GitHub

```bash
git init
git add .
git commit -m "Vietnamese learning release"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Workflow `.github/workflows/ci.yml` sẽ chạy kiểm tra TypeScript/build khi push hoặc tạo pull request.

## Triển khai

Khuyến nghị Vercel vì ứng dụng có Next.js API routes cho chat, chấm bài và TTS. Kết nối repository GitHub với Vercel, sau đó thêm biến môi trường trong Project Settings. GitHub Pages thuần tĩnh không chạy được các API routes này nếu không tách backend riêng.

## Lệnh hữu ích

```bash
npm run dev
npm run build
npm start
npx cap sync ios
```

## Bảo mật và dữ liệu

- Tiến độ mặc định chỉ ở `localStorage` trên thiết bị.
- Sao lưu JSON có thể chứa lịch sử học; nên lưu tại nơi riêng tư.
- Supabase chỉ lưu một payload sao lưu của người dùng đã đăng nhập.
- AI API nhận nội dung hội thoại để sinh phản hồi; cần xem chính sách dữ liệu của nhà cung cấp API đang dùng.
