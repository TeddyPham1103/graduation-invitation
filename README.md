# 🎓 Website Thiệp Mời Tốt Nghiệp — Trải Nghiệm 3D (Graduation Invitation)

> **"A Journey to the Next Chapter"** — Website cá nhân cao cấp kết hợp thiệp mời tốt nghiệp với hiệu ứng Three.js 3D, timeline hành trình trưởng thành, đếm ngược thời gian thực, album ảnh kỷ niệm và xác nhận tham dự (RSVP).

---

## 🌟 Các Tính Năng Nổi Bật

1. **Màn hình 1 — Opening Experience (3D)**: Chiếc mũ tốt nghiệp 3D chuyển động trong không gian điện ảnh với các hạt bụi sáng vàng champagne, chuyển cảnh mượt mà khi nhấn "Bắt đầu hành trình".
2. **Màn hình 2 — Hero: The Graduate**: Khu vực chân dung nghệ thuật với hiệu ứng nghiêng 3D / parallax chuột, huy hiệu tốt nghiệp và thông tin cử nhân.
3. **Màn hình 3 — My Journey**: Dòng thời gian 5 giai đoạn đại học với các khung ảnh kỷ niệm có chiều sâu.
4. **Màn hình 4 — Thiệp Mời 3D Interactive**: Phong bì thư 3D với con dấu sáp vàng, mở ra thiệp mời kèm hiệu ứng pháo hoa, nút **Xác nhận tham dự (RSVP)**, **Xem vị trí Google Maps**, và **Thêm vào lịch (.ics & Google Calendar)**.
5. **Màn hình 5 — Đếm Ngược Realtime**: Bộ đếm ngược thời gian thực dạng glassmorphism 3D tự động chuyển sang chế độ chúc mừng khi đến ngày sự kiện.
6. **Màn hình 6 — Album Kỷ Niệm (Memories)**: Triển lãm ảnh nghệ thuật theo bộ lọc danh mục và chế độ xem toàn màn hình (Lightbox).
7. **Màn hình 7 — Lời Tri Ân (Thank You)**: Lời cảm ơn gia đình, thầy cô, bạn bè, thông tin liên hệ và nút chia sẻ website.
8. **Âm Thanh Nền**: Trình phát giai điệu tốt nghiệp êm dịu (Web Audio synthesizer hoặc hỗ trợ file mp3 tùy chỉnh), không tự phát khi chưa có tương tác.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Trên Máy Tính

### 1. Cài đặt thư viện:
```bash
npm install
```

### 2. Khởi chạy môi trường phát triển (Dev Server):
```bash
npm run dev
```
Mở trình duyệt truy cập: `http://localhost:5173/` (hoặc cổng được hiển thị trong terminal).

### 3. Build kiểm tra bản phát hành (Production):
```bash
npm run build
```

---

## 📸 Hướng Dẫn Tùy Chỉnh Thông Tin & Thêm Ảnh Của Bạn

Tất cả thông tin được quản lý tập trung tại duy nhất 1 file:
👉 **[`src/config/graduationData.ts`](file:///d:/Teddyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy/Graduation/src/config/graduationData.ts)**

### 1. Thay đổi thông tin cá nhân & buổi lễ:
- **Họ và tên**: `profile.name`
- **Trường đại học**: `profile.university`
- **Khoa / Ngành học**: `profile.faculty` & `profile.major`
- **Ngày giờ tổ chức**: `ceremony.dateIso` (ví dụ: `"2026-11-20T08:30:00"`) & `ceremony.dateDisplay`
- **Địa điểm & Địa chỉ**: `ceremony.venue` & `ceremony.address`
- **Đường dẫn Google Maps**: `ceremony.googleMapsUrl`

### 2. Thêm ảnh của bạn:
1. Sao chép các tệp ảnh của bạn vào thư mục: `public/assets/`
2. Cập nhật đường dẫn trong `graduationData.ts`:
   - Ảnh chân dung: `portraitUrl: "/assets/my-portrait.jpg"`
   - Ảnh các giai đoạn hành trình: `journey[i].imageUrl: "/assets/journey-1.jpg"`
   - Ảnh album kỷ niệm: `memories[i].imageUrl: "/assets/memory-1.jpg"`
3. *Lưu ý: Nếu bạn để trống `""`, website sẽ tự động hiển thị khung placeholder nghệ thuật cực đẹp mà không bị lỗi!*

---

## 🌐 Hướng Dẫn Đưa Website Lên Internet (Có Link Gửi Bạn Bè)

### Cách 1: Triển khai miễn phí qua Vercel (Khuyên dùng — 1 phút)
1. Đẩy mã nguồn lên GitHub theo hướng dẫn bên dưới.
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
3. Nhấn **"Add New..."** ➔ **"Project"** ➔ Chọn repository GitHub của bạn.
4. Giữ nguyên các cài đặt mặc định (Framework Preset: **Vite**) và nhấn **"Deploy"**.
5. Sau 1 phút, bạn sẽ nhận được đường link công khai dạng `https://ten-du-an.vercel.app` để gửi cho mọi người!

### Cách 2: Triển khai qua Netlify
1. Truy cập [netlify.com](https://netlify.com) và chọn **"Add new site"** ➔ **"Import an existing project"**.
2. Kết nối với GitHub và chọn repository của bạn.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Nhấn **"Deploy site"**.
