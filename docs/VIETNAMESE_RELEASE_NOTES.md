# Ghi chú phát hành 2.0 — bản tiếng Việt

## Mục tiêu

Giữ nguyên năng lực của Chinese Mission và bổ sung một lớp học dành cho người Việt, không biến ứng dụng thành bộ flashcard đơn giản.

## Thay đổi chính

- Tiếng Việt là ngôn ngữ hướng dẫn mặc định ở onboarding, danh sách bài, khởi động, hội thoại, gợi ý, chấm bài, sổ câu, hồ sơ, giới hạn lượt và đồng bộ.
- Nội dung nhiệm vụ, vai nhân vật, mục tiêu, slot và phần lớn câu mẫu có nghĩa Việt riêng.
- Người học vẫn thấy chữ Hán và pinyin; tiếng Anh là lớp hỗ trợ tùy chọn.
- Giao diện dùng nền mint, thẻ trắng, viền xanh nhạt và nút xanh lá.
- Thêm cài đặt hiển thị, tốc độ đọc, số lần lặp, chuỗi học, tìm kiếm, mức độ nhớ và JSON backup.
- Supabase là mô-đun tùy chọn, không phải điều kiện để ứng dụng chạy.
- AI lỗi hoặc quá thời gian sẽ tự dùng rule engine, tránh đứng màn hình.

## Điểm chưa thay đổi

- Dữ liệu 20 nhiệm vụ và 6 nhóm tình huống gốc.
- Hệ thống trạng thái/slot, warmup, chat, hints, debrief, phrasebook, quota, TTS/ASR và mã Capacitor iOS.

## Phiên bản 2.1 — 50 bài và 10 slot học
- Mở rộng từ 20 lên đúng 50 nhiệm vụ giao tiếp thực tế thuộc 15 nhóm tình huống.
- Thêm mua sắm, khách sạn, sân bay, tàu cao tốc, y tế, nhà thuốc, SIM/Wi-Fi, giao hàng, sửa chữa, hẹn gặp, báo cáo công việc và tình huống an toàn.
- Chuẩn hóa toàn bộ cách xưng hô hướng dẫn thành “Bạn”.
- Thêm 10 slot người học không cần tài khoản hoặc mật khẩu.
- Mỗi slot lưu độc lập hồ sơ, tiến độ, chuỗi học, sổ câu, cài đặt, lượt miễn phí và phiên hội thoại.
- Có đổi tên, chuyển slot và đặt lại riêng từng slot.
- Tự chuyển dữ liệu cũ sang Slot 1 để không mất tiến độ.
- Rule engine được mở rộng để toàn bộ 50 bài vẫn luyện được khi không cấu hình API AI.

## Phiên bản 2.2.0 — Âm thanh, micro và tự động đồng bộ
- Sửa lặp phát âm: mỗi lần đọc được chờ đến khi audio kết thúc, nghỉ 450 ms rồi mới đọc lần tiếp theo; có nút dừng và chỉ báo lần đang phát.
- Sửa nhận giọng nói tiếng Trung: bấm một lần để bắt đầu, bấm lại để dừng; chờ kết quả cuối từ trình duyệt trước khi điền vào ô nhập.
- Câu nhận dạng được đưa vào ô soạn thảo để người học kiểm tra rồi bấm Gửi, tránh nút Gửi bị mờ do kết quả đến trễ.
- Hiển thị lỗi micro bằng tiếng Việt và hướng dẫn dùng Chrome/Edge khi trình duyệt không hỗ trợ.
- Thêm CloudSyncProvider: sau khi đăng nhập Supabase bằng liên kết email một lần, dữ liệu cả 10 slot tự lưu sau mỗi thay đổi và tự khôi phục bản mới hơn khi mở lại.
- Cơ chế đồng bộ dùng mốc thời gian và ưu tiên bản mới hơn; vẫn giữ nút Lưu ngay/Khôi phục thủ công.
