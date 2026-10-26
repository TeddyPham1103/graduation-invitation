import type { GraduationConfig } from '../types/graduation';

/**
 * =========================================================================
 * 🎓 CẤU HÌNH THÔNG TIN LỄ TỐT NGHIỆP CỦA BẠN
 * =========================================================================
 * Bạn có thể dễ dàng thay đổi tất cả thông tin, hình ảnh, ngày giờ, địa điểm
 * tại file này mà không cần can thiệp vào các component giao diện.
 * 
 * 📸 HƯỚNG DẪN THÊM ẢNH CỦA BẠN:
 * 1. Đặt ảnh của bạn vào thư mục: `public/assets/`
 * 2. Cập nhật đường dẫn tại các trường imageUrl (ví dụ: "/assets/my-photo.jpg")
 * 3. Nếu để trống `""`, website sẽ tự động hiển thị khung placeholder nghệ thuật!
 */

export const graduationConfig: GraduationConfig = {
  // -----------------------------------------------------------------------
  // 1. THÔNG TIN CÁ NHÂN & BẰNG CẤP
  // -----------------------------------------------------------------------
  profile: {
    // 👉 THAY HỌ VÀ TÊN CỦA BẠN TẠI ĐÂY
    name: "NGUYỄN VĂN AN",
    englishName: "Alex Nguyen",
    
    // Khẩu hiệu / Dòng thông điệp nghệ thuật
    tagline: "One journey ends. Another begins.",
    
    // 👉 THAY TÊN TRƯỜNG ĐẠI HỌC
    university: "ĐẠI HỌC BÁCH KHOA — ĐHQG TP.HCM",
    universityShort: "HCMUT",
    
    // 👉 THAY KHOA VÀ NGÀNH HỌC
    faculty: "Khoa Khoa Học & Kỹ Thuật Máy Tính",
    major: "Kỹ Thuật Phần Mềm & Trí Tuệ Nhân Tạo",
    degree: "Kỹ Sư Xuất Sắc",
    
    // 👉 THAY NIÊN KHÓA VÀ NĂM TỐT NGHIỆP
    cohort: "Khóa 2021 — 2025",
    graduationYear: "2025",
    
    // 👉 ĐƯỜNG DẪN ẢNH CHÂN DUNG TỐT NGHIỆP CỦA BẠN (để trống "" nếu muốn dùng khung ảnh nghệ thuật)
    portraitUrl: "", 
  },

  // -----------------------------------------------------------------------
  // 2. THÔNG TIN BUỔI LỄ TỐT NGHIỆP & ĐỊA ĐIỂM
  // -----------------------------------------------------------------------
  ceremony: {
    // 👉 ĐỊNH DẠNG ISO: YYYY-MM-DDTHH:mm:ss để đếm ngược chính xác
    dateIso: "2026-11-20T08:30:00", 
    
    // 👉 HIỂN THỊ TRÊN THIỆP MỜI
    dateDisplay: "Thứ Sáu, ngày 20 tháng 11 năm 2026",
    timeDisplay: "08:00 — 11:30 Sáng",
    venue: "Hội Trường Lớn A5 — Tòa Nhà Trung Tâm",
    address: "268 Lý Thường Kiệt, Phường 14, Quận 10, TP. Hồ Chí Minh",
    
    // 👉 ĐƯỜNG DẪN GOOGLE MAPS ĐẾN ĐỊA ĐIỂM
    googleMapsUrl: "https://maps.google.com/?q=268+Ly+Thuong+Kiet+Phuong+14+Quan+10+Ho+Chi+Minh",
    
    dressCode: "Trang phục lịch sự / Lễ phục / Áo dài",
    receptionTime: "Chụp ảnh lưu niệm cùng tân cử nhân: 10:30 — 12:00",
  },

  // -----------------------------------------------------------------------
  // 3. THÔNG ĐIỆP MỜI DỰ LỄ (Màn hình 4)
  // -----------------------------------------------------------------------
  invitationMessage: {
    greeting: "Thân gửi Gia đình, Thầy cô, Bạn bè và Những người thân yêu,",
    body: [
      "Sau những năm tháng học tập miệt mài, cùng nhau vượt qua những kỳ thi áp lực, những đêm thức trắng làm đồ án và tích lũy thật nhiều kỷ niệm vô giá, mình sắp chính thức bước sang một chương mới của cuộc đời.",
      "Mình rất mong được chia sẻ khoảnh khắc thiêng liêng và đáng nhớ này cùng những người đã luôn dõi theo, động viên và tạo nên thanh xuân tươi đẹp của mình trong suốt hành trình vừa qua.",
      "Sự hiện diện và những nụ cười của bạn sẽ khiến ngày tốt nghiệp của mình trở nên trọn vẹn và ý nghĩa hơn bao giờ hết!"
    ],
    closing: "Hẹn gặp bạn tại Lễ Tốt Nghiệp của mình!"
  },

  // -----------------------------------------------------------------------
  // 4. LỜI CẢM ƠN TRI ÂN (Màn hình 7)
  // -----------------------------------------------------------------------
  thankYouMessage: {
    title: "Tri Ân & Lời Cảm Ơn Chân Thành",
    body: [
      "Con xin gửi lời tri ân sâu sắc nhất đến Ba Mẹ và Gia Đình — điểm tựa vững chãi và nguồn động lực lớn lao nhất trong mọi bước đường con đi.",
      "Em xin chân thành cảm ơn các Thầy Cô giáo đã tận tâm chỉ dạy, truyền cảm hứng và trao cho em hành trang tri thức quý báu.",
      "Cảm ơn những người bạn đồng hành tuyệt vời — những người đã cùng mình chia sẻ từng bữa trưa vội vã, những lúc chán nản hay những tiếng cười giòn giã tại giảng đường.",
      "Cảm ơn vì đã là một phần không thể thiếu trong hành trình thanh xuân của tôi!"
    ],
    signatures: "With love & gratitude,\nNguyễn Văn An"
  },

  // -----------------------------------------------------------------------
  // 5. HÀNH TRÌNH ĐẠI HỌC (Màn hình 3 — 5 Giai đoạn)
  // -----------------------------------------------------------------------
  journey: [
    {
      id: "journey-1",
      phase: "Giai Đoạn 01",
      period: "Năm 2021",
      title: "Bước Chân Đầu Tiên Vào Giảng Đường",
      description: "Cảm giác bỡ ngỡ khi lần đầu bước qua cánh cổng đại học rộng lớn. Những ánh mắt xa lạ, tấm thẻ sinh viên còn thơm mùi nhựa mới và ngọn lửa hoài bão rực cháy trong tim.",
      quote: "Hành trình vạn dặm bắt đầu từ một bước chân.",
      highlights: ["Lễ khai giảng tân sinh viên", "Tuần sinh hoạt công dân đầu tiên", "Làm quen với giảng đường & bạn bè mới"],
      imageUrl: "", // 👉 Thêm ảnh của bạn vào đây (ví dụ: "/assets/journey-1.jpg")
      caption: "Ngày đầu tiên nhận thẻ sinh viên và bước vào giảng đường đại học."
    },
    {
      id: "journey-2",
      phase: "Giai Đoạn 02",
      period: "Năm 2022",
      title: "Những Đêm Thức Trắng & Đồ Án Đầu Tay",
      description: "Giai đoạn học kỳ chuyên ngành bùng nổ với hàng loạt deadline, hackathon và đồ án nhóm. Thư viện trở thành ngôi nhà thứ hai, nơi cà phê và màn hình máy tính thâu đêm suốt sáng.",
      quote: "Sự kiên trì biến những dòng code lỗi thành thành quả ngọt ngào.",
      highlights: ["Đồ án chuyên ngành đầu tiên đạt điểm A", "Tham gia cuộc thi sáng tạo công nghệ", "Thức trắng đêm chạy deadline cùng nhóm"],
      imageUrl: "", // 👉 Thêm ảnh của bạn vào đây (ví dụ: "/assets/journey-2.jpg")
      caption: "Góc học tập quen thuộc thâu đêm cùng những cốc cà phê thơm lừng."
    },
    {
      id: "journey-3",
      phase: "Giai Đoạn 03",
      period: "Năm 2023",
      title: "Thầy Cô, Bạn Bè & Kỷ Niệm Thanh Xuân",
      description: "Không chỉ có sách vở, giảng đường đại học lưu giữ những chuyến đi tình nguyện, những hoạt động câu lạc bộ sôi nổi và tình bạn tri kỷ sẽ theo mình suốt cuộc đời.",
      quote: "Thanh xuân đẹp nhất là khi có các bạn đồng hành.",
      highlights: ["Chiến dịch Mùa Hè Xanh ý nghĩa", "Hội trại truyền thống khoa", "Những chuyến dã ngoại gắn kết tình bạn"],
      imageUrl: "", // 👉 Thêm ảnh của bạn vào đây (ví dụ: "/assets/journey-3.jpg")
      caption: "Kỷ niệm chuyến đi dã ngoại cùng những người bạn tri kỷ thời đại học."
    },
    {
      id: "journey-4",
      phase: "Giai Đoạn 04",
      period: "Năm 2024",
      title: "Kỳ Thực Tập, Thử Thách & Trưởng Thành",
      description: "Bước ra môi trường doanh nghiệp thực tế, đối diện với những áp lực của thị trường lao động. Từng thất bại là một bài học đắt giá giúp bản lĩnh thêm vững vàng.",
      quote: "Áp lực tạo nên kim cương.",
      highlights: ["Thực tập sinh xuất sắc tại công ty công nghệ", "Bảo vệ thành công đề cương khóa luận", "Tích lũy kinh nghiệm làm việc thực tế"],
      imageUrl: "", // 👉 Thêm ảnh của bạn vào đây (ví dụ: "/assets/journey-4.jpg")
      caption: "Thời gian thực tập thực tế, học hỏi và áp dụng kiến thức vào dự án."
    },
    {
      id: "journey-5",
      phase: "Giai Đoạn 05",
      period: "Năm 2025",
      title: "Bảo Vệ Khóa Luận & Chạm Tay Đến Vạch Đích",
      description: "Giây phút đứng trước hội đồng giám khảo bảo vệ đồ án tốt nghiệp sau hàng tháng trời nghiên cứu. Nhận kết quả và nhận ra: Chúng ta đã làm được!",
      quote: "Khép lại một chặng đường tự hào để sẵn sàng cho tương lai rộng mở.",
      highlights: ["Bảo vệ khóa luận tốt nghiệp xuất sắc", "Nhận thông báo công nhận tốt nghiệp", "Chuẩn bị cho ngày khoác áo cử nhân"],
      imageUrl: "", // 👉 Thêm ảnh của bạn vào đây (ví dụ: "/assets/journey-5.jpg")
      caption: "Khoảnh khắc hoàn thành buổi bảo vệ khóa luận trước hội đồng."
    }
  ],

  // -----------------------------------------------------------------------
  // 6. ALBUM KỶ NIỆM (Màn hình 6 — Trưng bày ảnh triển lãm)
  // -----------------------------------------------------------------------
  memories: [
    {
      id: "mem-1",
      title: "Ngày Nhận Áo Cử Nhân",
      category: "ky-niem",
      categoryLabel: "Kỷ Niệm",
      imageUrl: "", // 👉 Thêm ảnh của bạn vào đây
      caption: "Cảm giác thiêng liêng khi khoác lên mình chiếc áo cử nhân.",
      date: "Tháng 10, 2025"
    },
    {
      id: "mem-2",
      title: "Hội Đồng Bảo Vệ Khóa Luận",
      category: "hoc-tap",
      categoryLabel: "Học Tập",
      imageUrl: "", // 👉 Thêm ảnh của bạn vào đây
      caption: "Bức ảnh kỷ niệm cùng Thầy Cô hướng dẫn sau buổi phản biện.",
      date: "Tháng 06, 2025"
    },
    {
      id: "mem-3",
      title: "Nhóm Bạn Thân 'Deadline 4 Giờ Sáng'",
      category: "ban-be",
      categoryLabel: "Bạn Bè",
      imageUrl: "", // 👉 Thêm ảnh của bạn vào đây
      caption: "Những người anh em đã cùng nhau 'gánh team' qua bao mùa đồ án.",
      date: "Tháng 04, 2024"
    },
    {
      id: "mem-4",
      title: "Chiến Dịch Tình Nguyện Mùa Hè Xanh",
      category: "hoat-dong",
      categoryLabel: "Hoạt Động",
      imageUrl: "", // 👉 Thêm ảnh của bạn vào đây
      caption: "Những ngày tháng nhiệt huyết cống hiến sức trẻ cho cộng đồng.",
      date: "Tháng 07, 2023"
    },
    {
      id: "mem-5",
      title: "Góc Thư Viện Thân Thương",
      category: "hoc-tap",
      categoryLabel: "Học Tập",
      imageUrl: "", // 👉 Thêm ảnh của bạn vào đây
      caption: "Nơi quen thuộc mỗi kỳ ôn thi cuối kỳ với núi giáo trình.",
      date: "Tháng 12, 2023"
    },
    {
      id: "mem-6",
      title: "Khoảnh Khắc Nụ Cười Tuổi Đôi Mươi",
      category: "ky-niem",
      categoryLabel: "Kỷ Niệm",
      imageUrl: "", // 👉 Thêm ảnh của bạn vào đây
      caption: "Thanh xuân rực rỡ dưới khoảng trời đại học ngập nắng vàng.",
      date: "Tháng 09, 2022"
    }
  ],

  // -----------------------------------------------------------------------
  // 7. THÔNG TIN LIÊN HỆ & MẠNG XÃ HỘI
  // -----------------------------------------------------------------------
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    email: "contact.alexnguyen@example.com",
    phone: "0901 234 567"
  },

  // -----------------------------------------------------------------------
  // 8. TÙY CHỌN ÂM THANH
  // -----------------------------------------------------------------------
  audio: {
    enabled: true,
    // customAudioUrl: "/assets/graduation-theme.mp3", // Tùy chọn đường dẫn file nhạc nền
    soundEffects: true
  }
};
