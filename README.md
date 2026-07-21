# Chinese Mission Việt 2.4

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

## Phiên bản 2.1: 50 bài và 10 slot người học
- 50 nhiệm vụ giao tiếp thuộc 15 nhóm tình huống thực tế.
- Giao diện và nội dung hướng dẫn dùng cách xưng hô “Bạn”.
- 10 slot học không cần tài khoản hoặc mật khẩu.
- Mỗi slot lưu độc lập: mục tiêu, bài hoàn thành, sổ câu, cài đặt, chuỗi học, lượt học và phiên hội thoại.
- Có thể đổi tên, chuyển người học hoặc đặt lại riêng từng slot tại `/slots`.
- Dữ liệu phiên bản cũ được tự chuyển vào Slot 1 khi mở lần đầu.
- Supabase là tùy chọn; nếu bật thì bản sao chứa dữ liệu của cả 10 slot.

### Cập nhật repository đang chạy bằng GitHub Desktop
1. Sao lưu repository hiện tại hoặc tạo một nhánh mới.
2. Giải nén bản cập nhật vào đúng thư mục repository, cho phép ghi đè tệp cũ.
3. Không đưa `node_modules` hoặc `.next` lên GitHub.
4. Mở GitHub Desktop, kiểm tra danh sách thay đổi, ghi commit `Nâng cấp 2.1 - 50 bài và 10 slot` rồi bấm **Push origin**.
5. Vercel sẽ tự triển khai commit mới. Nếu không tự chạy, chọn **Redeploy** và bỏ dùng build cache cũ.

## Tự động lưu tiến độ Supabase (2.2)
1. Chạy `supabase/schema.sql` trong Supabase SQL Editor.
2. Trong Vercel thêm `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`, sau đó Redeploy.
3. Mở `/cloud`, nhập email và bấm liên kết Supabase gửi đến. Không cần mật khẩu.
4. Từ thời điểm đăng nhập, mọi thay đổi của cả 10 slot được tự lưu sau khoảng 1–2 giây. Khi mở lại hoặc đăng nhập trên thiết bị khác, ứng dụng so sánh thời gian và tự tải bản mới hơn.
5. Không dùng `service_role` key trong Vercel hoặc mã phía trình duyệt.

Nhận giọng nói trên web hoạt động tốt nhất bằng Chrome hoặc Edge qua HTTPS. Bấm micro một lần để bắt đầu, nói tiếng Trung, rồi bấm lại để kết thúc. Câu nhận dạng sẽ điền vào ô nhập để kiểm tra trước khi bấm Gửi.

## Chuẩn hóa chất lượng bài học (2.3)
- 15 bộ kiến thức chuyên sâu bao phủ toàn bộ 50 bài.
- Hơn 120 từ/cụm từ trọng tâm có pinyin, nghĩa Việt và nút phát âm.
- 60 khung câu tái sử dụng, 90 lượt hội thoại mẫu và thử thách riêng cho từng bài.
- Lưu ý về cách dùng thực tế, phép lịch sự, lỗi người Việt thường mắc và trọng điểm phát âm.
- Các phần mở rộng được bố trí dạng thu gọn, phù hợp học trên điện thoại.
- Cập nhật 2.3 không thay đổi cấu trúc Supabase; không cần chạy lại SQL nếu phiên bản 2.2 đã đồng bộ thành công.
## Ôn lặp ngắt quãng, kiểm tra nhóm và 5 chuyên đề mới (2.4)
- Thêm hệ thống ôn lặp ngắt quãng theo từng slot tại `/review`; thẻ quên quay lại sớm, thẻ nhớ tốt được giãn lịch dần.
- Tạo hơn 300 thẻ từ 15 bộ kiến thức cũ và 5 chuyên đề mới; không sửa nội dung của các bộ kiến thức cũ.
- Thêm 15 bài kiểm tra tổng hợp tại `/tests`, mỗi nhóm 10 câu bám sát từ vựng, khung câu, lỗi thường gặp, hội thoại, phép lịch sự và phát âm.
- Kết quả kiểm tra lưu theo slot, ghi nhận số lần làm, điểm gần nhất, điểm tốt nhất và trạng thái đạt từ 80%.
- Bổ sung 5 chuyên đề độc lập tại `/knowledge`: thanh điệu và biến điệu; số lượng và lượng từ; 了/过/在; nối ý; xử lý khi không nghe kịp.
- Lịch ôn, kết quả kiểm tra và trạng thái chuyên đề dùng các khóa `localStorage` theo slot, vì vậy được tự động đưa vào bản sao Supabase hiện có; không cần chạy lại SQL.

