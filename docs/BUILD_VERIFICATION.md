# Xác nhận kiểm thử bản 2.0

Ngày kiểm thử: 2026-07-20.

- `npm install --no-audit --no-fund`: thành công, 175 gói.
- `npm run build`: thành công với Next.js 16.2.10.
- TypeScript: thành công.
- Tạo static/dynamic routes: thành công, gồm trang onboarding, missions, warmup, chat, debrief, phrasebook, profile, cloud và ba API routes.
- Chạy production server bằng `USE_RULE_ENGINE=true npm start`: thành công.
- HTTP smoke test `/onboarding` và `/missions`: thành công.
- POST `/api/chat` bằng rule engine: thành công, trả chữ Trung, nghĩa Việt, slot và trạng thái nhiệm vụ.

Chưa kiểm thử trực tiếp trong lần build này:

- AI thật vì không có khóa API của người dùng.
- Supabase thật vì chưa có URL/anon key của dự án.
- TTS Edge cần kết nối mạng tại môi trường triển khai.
- Build iOS cần macOS/Xcode.
