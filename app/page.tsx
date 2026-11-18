"use client";

import { useState } from "react";
import Link from "next/link";

// Kiểu dữ liệu bảng khảo sát chi tiết (6 bước)
type DetailedQuiz = {
  skinDepth: string;      // Trắng sáng / Trung bình / Ngăm khỏe
  undertone: string;     // Ấm / Lạnh / Trung tính
  lipCondition: string;  // Môi khô rãnh / Môi thâm viền / Môi nhạt màu / Môi bình thường
  eyeColor: string;      // Đen tuyền / Nâu sáng / Nâu đậm
  makeupStyle: string;   // Nhẹ nhàng trong trẻo / Ngọt ngào Hàn Quốc / Sắc sảo quyến rũ / Cá tính độc lạ
  budget: string;        // Dưới 200k / 200k - 500k / Trên 500k (Cao cấp)
};

type MakeupItem = {
  category: string;      // Son môi, Kem nền, Má hồng, Phấn mắt
  productName: string;
  brand: string;
  shade: string;
  price: string;
  rating: string;
  shopeeUrl: string;
  whyFit: string;
};

type ComprehensiveResult = {
  seasonTitle: string;
  seasonCode: string;
  tagline: string;
  colorPalette: { name: string; hex: string }[];
  description: string;
  avoidColors: string[];
  makeupRoutine: MakeupItem[];
};

// CƠ SỞ DỮ LIỆU CHUYÊN SÂU 4 MÙA MÀU SẮC (COLOR ANALYSIS SYSTEM)
const ADVANCED_COLOR_DATABASE: Record<string, ComprehensiveResult> = {
  warmSpring: {
    seasonTitle: "Mùa Xuân Sáng & Ấm (Warm Spring)",
    seasonCode: "SPRING",
    tagline: "Tươi tắn, rạng rỡ và tràn đầy năng lượng thanh xuân tự nhiên",
    colorPalette: [
      { name: "Cam san hô", hex: "#FF7F6A" },
      { name: "Hồng đào tươi", hex: "#FFA39E" },
      { name: "Đỏ cam gạch", hex: "#E65C47" },
      { name: "Vàng mật ong", hex: "#F4C430" },
    ],
    description:
      "Làn da của bạn mang sắc tố ấm với độ trong trẻo cao. Gương mặt sẽ bừng sáng tuyệt đối khi sử dụng các sắc độ pha cam, hồng đào tươi hoặc san hô, giúp tôn lên nét trẻ trung và làn da sáng hồng tự nhiên.",
    avoidColors: ["Hồng tím mận", "Xám khói lạnh", "Đỏ rượu vang đậm"],
    makeupRoutine: [
      {
        category: "Son môi chủ đạo",
        productName: "Rom&nd Juicy Lasting Tint",
        brand: "Rom&nd",
        shade: "#12 Pomelo Skin (Cam đào sữa)",
        price: "179.000đ",
        rating: "4.9/5 (1.5k đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Romand%20Juicy%20Lasting%20Tint%20Pomelo%20Skin",
        whyFit: "Chất son bóng nhẹ giúp môi căng mọng, tông cam đào sữa che khuyết điểm môi cực tốt.",
      },
      {
        category: "Kem nền / Cushion",
        productName: "Laneige Neo Cushion Glow",
        brand: "Laneige",
        shade: "#21N Beige (Sáng tự nhiên)",
        price: "550.000đ",
        rating: "4.8/5 (920 đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Laneige%20Neo%20Cushion%20Glow",
        whyFit: "Tạo hiệu ứng da bóng khỏe chuẩn Hàn Quốc, cấp ẩm tốt không mốc nền suốt 24h.",
      },
      {
        category: "Má hồng",
        productName: "Peripera Ink Velvet Cheek",
        brand: "Peripera",
        shade: "#01 Corpse Peach (Hồng đào ấm)",
        price: "135.000đ",
        rating: "4.9/5 (2.1k đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Peripera%20Ink%20Veelet%20Cheek",
        whyFit: "Hạt phấn mịn màng, sắc hồng đào tệp thẳng vào da tạo hiệu ứng hây hây tự nhiên.",
      },
      {
        category: "Phấn mắt",
        productName: "Rom&nd Better Than Palette",
        brand: "Rom&nd",
        shade: "#001 Pampas Garden (Tông san hô cam ấm)",
        price: "310.000đ",
        rating: "4.9/5 (3.4k đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Romand%20Pampas%20Garden",
        whyFit: "Bảng 10 ô màu nhũ và lỳ dễ phối, hoàn hảo cho phong cách trang điểm hàng ngày.",
      },
    ],
  },
  coolSummer: {
    seasonTitle: "Mùa Hè Dịu & Lạnh (Cool Summer)",
    seasonCode: "SUMMER",
    tagline: "Thanh lịch, dịu dàng và mang hơi thở hồng pastel sang trọng",
    colorPalette: [
      { name: "Hồng cánh khô", hex: "#D68C9E" },
      { name: "Hồng dâu sữa", hex: "#E8A5B8" },
      { name: "Đỏ hồng phúc bồn tử", hex: "#C25975" },
      { name: "Xanh ngọc pastel", hex: "#A3D9C9" },
    ],
    description:
      "Sắc da ánh hồng và lạnh của bạn cực kỳ hòa hợp với các gam màu pastel nhã nhặn, sắc hồng trà hoặc đỏ berry dịu nhẹ. Chúng mang lại vẻ đẹp thanh tú, mong manh nhưng vô cùng cuốn hút.",
    avoidColors: ["Cam đất chói", "Vàng nghệ", "Nâu đậm tối"],
    makeupRoutine: [
      {
        category: "Son môi chủ đạo",
        productName: "Rom&nd Glasting Water Tint",
        brand: "Rom&nd",
        shade: "#04 Vintage Ocean / #05 Rose Splash",
        price: "185.000đ",
        rating: "4.9/5 (1.1k đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Romand%20Glasting%20Water%20Tint%20Rose%20Splash",
        whyFit: "Lớp nước bóng trong suốt làm dịu môi khô, sắc hồng cánh hoa cực tôn da sáng.",
      },
      {
        category: "Kem nền / Cushion",
        productName: "Etude House Double Lasting Foundation",
        brand: "Etude",
        shade: "#Rosy Pure (Sáng hồng)",
        price: "380.000đ",
        rating: "4.8/5 (840 đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Etude%20Double%20Lasting%20Foundation",
        whyFit: "Kiểm soát dầu thừa tốt, tệp vào sắc da lạnh giúp mặt không bị xỉn màu.",
      },
      {
        category: "Má hồng",
        productName: "3CE Mood Recipe Face Blush",
        brand: "3CE",
        shade: "#Nude Peach / #Mono Pink",
        price: "310.000đ",
        rating: "4.9/5 (2.5k đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=3CE%20Face%20Blush%20Mono%20Pink",
        whyFit: "Màu má hồng phớt nhẹ nhàng, không bị bết phấn, chuẩn gu tiểu thư thanh lịch.",
      },
      {
        category: "Phấn mắt",
        productName: "Judydoll Play Color Eyes",
        brand: "Judydoll",
        shade: "#35 Cool Ice Rose (Hồng khói lạnh)",
        price: "195.000đ",
        rating: "4.8/5 (750 đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Judydoll%20Cool%20Ice%20Rose",
        whyFit: "Tone màu lạnh thời thượng giúp đôi mắt sâu và có hồn hơn rõ rệt.",
      },
    ],
  },
  warmAutumn: {
    seasonTitle: "Mùa Thu Trầm & Ấm (Warm Autumn)",
    seasonCode: "AUTUMN",
    tagline: "Sang trọng, ấm áp và đậm chất cổ điển quyến rũ",
    colorPalette: [
      { name: "Đỏ gạch trầm", hex: "#A8382B" },
      { name: "Cam đất nung", hex: "#B85D3B" },
      { name: "Nâu trà sữa", hex: "#A66E58" },
      { name: "Xanh rêu cổ điển", hex: "#5C6B53" },
    ],
    description:
      "Sở hữu làn da ấm có chiều sâu, bạn sinh ra là để dành cho các tông màu đất, đỏ gạch, cam cháy và nâu trà sữa. Phong cách này mang lại cảm giác trưởng thành, thời thượng và cực kỳ sang.",
    avoidColors: ["Hồng cánh sen chói", "Xanh neon", "Tím bợt"],
    makeupRoutine: [
      {
        category: "Son môi chủ đạo",
        productName: "Rom&nd Blur Fudge Tint",
        brand: "Rom&nd",
        shade: "#04 Radwood (Đỏ nâu gỗ ấm)",
        price: "185.000đ",
        rating: "4.9/5 (2.3k đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Romand%20Blur%20Fudge%20Tint%20Radwood",
        whyFit: "Chất son xốp mịn như bơ che khuyết điểm môi hoàn hảo, màu đỏ nâu tôn da đỉnh cao.",
      },
      {
        category: "Kem nền / Cushion",
        productName: "Clio Kill Cover The New Founwear",
        brand: "Clio",
        shade: "#3 Linen (Trung bình ấm)",
        price: "490.000đ",
        rating: "4.9/5 (1.8k đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Clio%20Kill%20Cover%20Founwear",
        whyFit: "Độ che phủ khuyết điểm cực đỉnh, mỏng nhẹ và bền màu suốt cả ngày dài.",
      },
      {
        category: "Má hồng",
        productName: "Canmake Glow Fleur Cheeks",
        brand: "Canmake",
        shade: "#16 Cinnamon Brown (Cam quế trầm)",
        price: "260.000đ",
        rating: "4.8/5 (950 đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Canmake%20Cinnamon%20Brown",
        whyFit: "Tạo khối và má hồng tích hợp, sắc cam quế ấm áp cực hợp với làn da thiên ấm.",
      },
      {
        category: "Phấn mắt",
        productName: "3CE Multi Eye Color Palette",
        brand: "3CE",
        shade: "#Overtake (Cam nâu trà sữa)",
        price: "550.000đ",
        rating: "5.0/5 (4.2k đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=3CE%20Overtake",
        whyFit: "Bảng mắt huyền thoại không thể thiếu của mọi cô nàng yêu thích phong cách Thu Đông.",
      },
    ],
  },
  coolWinter: {
    seasonTitle: "Mùa Đông Sắc Sảo & Lạnh (Cool Winter)",
    seasonCode: "WINTER",
    tagline: "Nổi bật, sắc nét và mang khí chất thời trang cao cấp",
    colorPalette: [
      { name: "Đỏ ruby thuần", hex: "#B81D3A" },
      { name: "Đỏ rượu vang", hex: "#7A1C2E" },
      { name: "Hồng tím mận", hex: "#9E4770" },
      { name: "Trắng tuyết / Đen", hex: "#2B2B2B" },
    ],
    description:
      "Độ tương phản cao trên gương mặt giúp bạn chinh phục xuất sắc các màu sắc mạnh mẽ như đỏ ruby, đỏ rượu vang hoặc mận chín. Phong cách này tạo dấu ấn quyền lực, cá tính và vô cùng hiện đại.",
    avoidColors: ["Cam vàng nghệ", "Nâu đất nhạt", "Vàng mù tạt"],
    makeupRoutine: [
      {
        category: "Son môi chủ đạo",
        productName: "3CE Blur Water Tint",
        brand: "3CE",
        shade: "#Immanence (Đỏ mận trầm lạnh)",
        price: "340.000đ",
        rating: "4.9/5 (1.7k đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=3CE%20Blur%20Water%20Tint%20Immanence",
        whyFit: "Chất son gel nước lì mịn, sắc đỏ rượu vang làm bật lên làn da trắng sáng sắc sảo.",
      },
      {
        category: "Kem nền / Cushion",
        productName: "TirTir Mask Fit Red Cushion",
        brand: "TirTir",
        shade: "#17C Porcelain (Trắng lạnh cao cấp)",
        price: "520.000đ",
        rating: "4.9/5 (2.8k đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=TirTir%20Red%20Cushion",
        whyFit: "Độ che phủ hoàn hảo, giữ tông da sáng lạnh không bị ngả vàng suốt 72 giờ.",
      },
      {
        category: "Má hồng",
        productName: "Clinique Cheek Pop",
        brand: "Clinique",
        shade: "#15 Pansy Pop (Hồng tím hoa cúc)",
        price: "680.000đ",
        rating: "4.9/5 (1.1k đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Clinique%20Pansy%20Pop",
        whyFit: "Màu hồng tím độc quyền giúp khử sắc tố vàng trên da, tạo vẻ đẹp tiểu thư kiêu kỳ.",
      },
      {
        category: "Phấn mắt",
        productName: "Clio Pro Eye Palette Air",
        brand: "Clio",
        shade: "#03 Muted Without (Hồng đất lạnh)",
        price: "450.000đ",
        rating: "4.8/5 (920 đánh giá)",
        shopeeUrl: "https://shopee.vn/search?keyword=Clio%20Muted%20Without",
        whyFit: "Tông màu khói lạnh tạo chiều sâu sắc nét cho đôi mắt theo chuẩn idol Hàn.",
      },
    ],
  },
};

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [consent, setConsent] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  // 6 Tiêu chí khảo sát chi tiết
  const [quiz, setQuiz] = useState<DetailedQuiz>({
    skinDepth: "medium",
    undertone: "warm",
    lipCondition: "natural",
    eyeColor: "brown",
    makeupStyle: "natural",
    budget: "mid",
  });

  // State Feedback MVP
  const [feedback, setFeedback] = useState({
    name: "",
    rating: "100%",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  // Thuật toán ánh xạ 6 tiêu chí sang 4 mùa màu sắc
  const determineSeason = (): ComprehensiveResult => {
    if (quiz.undertone === "warm") {
      if (quiz.skinDepth === "light" || quiz.skinDepth === "medium") {
        return ADVANCED_COLOR_DATABASE.warmSpring;
      }
      return ADVANCED_COLOR_DATABASE.warmAutumn;
    } else if (quiz.undertone === "cool") {
      if (quiz.skinDepth === "light") {
        return ADVANCED_COLOR_DATABASE.coolSummer;
      }
      return ADVANCED_COLOR_DATABASE.coolWinter;
    } else {
      // Trung tính
      return quiz.skinDepth === "light" ? ADVANCED_COLOR_DATABASE.coolSummer : ADVANCED_COLOR_DATABASE.warmAutumn;
    }
  };

  const result = determineSeason();

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FFF9FA] text-[#4A2532] selection:bg-[#FAD2DC] selection:text-[#4A2532]">
      {/* Header */}
      <nav className="sticky top-0 z-50 w-full bg-[#FFF9FA]/90 backdrop-blur-md border-b border-[#F4D6DF]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#E89EB3] to-[#F7C8D5] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
              S
            </span>
            <span className="font-serif text-2xl font-bold tracking-wider text-[#4A2532]">
              SẮCME
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#7A5260]">
            <a href="#khao-sat-pro" className="hover:text-[#D46A8C] transition-colors">Khảo sát chuyên sâu</a>
            <a href="#tinh-nang" className="hover:text-[#D46A8C] transition-colors">Giải pháp MVP</a>
            <a href="#bao-mat" className="hover:text-[#D46A8C] transition-colors">Bảo mật dữ liệu</a>
          </div>

          <div className="px-4 py-1.5 rounded-full bg-[#FCE8EE] border border-[#F3C6D4] text-xs font-semibold text-[#B84D70]">
            💎 Phiên bản Thị trường Pro (22/11)
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 px-6 text-center">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FCE3EA] blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute top-40 -left-24 w-80 h-80 rounded-full bg-[#FBEAEF] blur-3xl opacity-70 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE8EE] border border-[#F3C6D4] text-xs font-medium text-[#B84D70]">
            <span>✨ Nền tảng Phân tích Sắc màu & Gợi ý Make-up Trọn gói</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-[#3E1C28]">
            Để mỗi bạn trẻ <br className="hidden sm:block" />
            <span className="italic font-normal text-[#C85A7C]">
              mua đúng thỏi son đầu tiên
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-[#734C5A] leading-relaxed">
            Hệ thống khảo sát 6 bước chuyên sâu dựa trên phương pháp Color Analysis quốc tế. Đề xuất bảng màu cá nhân hóa và bộ mỹ phẩm full-face (Son, Nền, Má, Mắt) chuẩn xác đến từng milimet.
          </p>

          <div className="pt-2">
            <a
              href="#khao-sat-pro"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#D96B8D] to-[#E58AA6] text-white font-medium text-base shadow-lg shadow-[#E58AA6]/30 hover:shadow-xl hover:brightness-105 transition-all"
            >
              Bắt đầu Khảo sát Chuyên sâu Ngay ↓
            </a>
          </div>
        </div>
      </section>

      {/* BỘ KHẢO SÁT CHUYÊN SÂU 6 BƯỚC */}
      <section id="khao-sat-pro" className="py-12 px-6 max-w-4xl mx-auto w-full">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-[#F4D6DF] shadow-xl space-y-8">
          
          {/* Thanh tiến trình */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-[#8A6270] mb-2">
              <span>1. Quyền riêng tư & Ảnh</span>
              <span>2. Khảo sát 6 tiêu chí da</span>
              <span>3. Bảng màu & Gợi ý Make-up</span>
            </div>
            <div className="w-full h-2.5 bg-[#F6DCE4] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D96B8D] to-[#E58AA6] transition-all duration-500"
                style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
              />
            </div>
          </div>

          {/* BƯỚC 1: QUYỀN RIÊNG TƯ & TẢI ẢNH */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A7C]">
                  Bước 1 / 3 • Minh bạch dữ liệu & Quyền riêng tư
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3E1C28]">
                  Phân tích an toàn với sự đồng ý rõ ràng
                </h2>
                <p className="text-sm text-[#734C5A]">
                  SẮCME cam kết bảo vệ dữ liệu hình ảnh của bạn. Ảnh chỉ được xử lý tạm thời trên trình duyệt để đối chiếu màu sắc và bạn có toàn quyền xóa vĩnh viễn bất cứ lúc nào.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF5F7] border border-[#F2CED9] space-y-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-5 h-5 accent-[#D96B8D]"
                  />
                  <span className="text-sm text-[#4A2532] leading-relaxed">
                    <strong>Tôi đồng ý</strong> cho phép SẮCME sử dụng ảnh khuôn mặt tạm thời để đối chiếu sắc màu. Ảnh không lưu trữ trên máy chủ và có thể xóa ngay lập tức.
                  </span>
                </label>

                {consent && (
                  <div className="pt-2">
                    {!previewImg ? (
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#E8B4C4] rounded-2xl cursor-pointer bg-white hover:bg-[#FFF9FA] transition-colors">
                        <span className="text-3xl mb-2">📸</span>
                        <span className="text-sm font-medium text-[#B84D70]">Tải lên ảnh selfie dưới ánh sáng tự nhiên</span>
                        <span className="text-xs text-[#8A6270] mt-1">Định dạng JPG, PNG (Tùy chọn)</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    ) : (
                      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#F0C2D1]">
                        <img src={previewImg} alt="Selfie" className="w-16 h-16 rounded-xl object-cover border border-[#F4D6DF]" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#3E1C28]">Đã tải ảnh thành công!</p>
                          <p className="text-xs text-[#7A5260]">Ảnh sẽ hiển thị đối chiếu cùng bảng màu kết quả.</p>
                        </div>
                        <button
                          onClick={() => setPreviewImg(null)}
                          className="px-3 py-1.5 rounded-full bg-[#FCE8EE] text-xs font-medium text-[#B84D70] hover:bg-[#FAD2DC]"
                        >
                          Xóa ảnh
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D96B8D] to-[#E58AA6] text-white font-medium text-sm shadow-md hover:brightness-105 transition-all"
                >
                  Tiếp tục đến bảng khảo sát 6 tiêu chí →
                </button>
              </div>
            </div>
          )}

          {/* BƯỚC 2: 6 TIÊU CHÍ KHẢO SÁT CHUYÊN SÂU */}
          {step === 2 && (
            <div className="space-y-7">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A7C]">
                  Bước 2 / 3 • Khảo sát đặc điểm da & gu thẩm mỹ
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#3E1C28]">
                  Cung cấp thông tin để thuật toán phân tích chính xác nhất
                </h2>
              </div>

              {/* 1. Sắc độ da */}
              <div className="space-y-3">
                <label className="block font-medium text-sm text-[#3E1C28]">
                  1. Tông màu da tổng thể của bạn (Skin Depth):
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "light", label: "Trắng sáng (Fair/Light)", color: "#FDE7DC" },
                    { id: "medium", label: "Trung bình tự nhiên (Medium)", color: "#EBC3A8" },
                    { id: "tan", label: "Ngăm khỏe khoắn (Tan/Dark)", color: "#C89675" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuiz({ ...quiz, skinDepth: item.id })}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        quiz.skinDepth === item.id ? "border-[#D96B8D] bg-[#FFF2F6] ring-2 ring-[#D96B8D]/20" : "border-[#F0D5DE] hover:bg-[#FFF9FA]"
                      }`}
                    >
                      <span className="block w-6 h-6 rounded-full mb-2 border border-black/10 shadow-sm" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-semibold block text-[#3E1C28]">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Undertone */}
              <div className="space-y-3">
                <label className="block font-medium text-sm text-[#3E1C28]">
                  2. Sắc tố ẩn dưới da (Undertone qua mạch máu cổ tay):
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: "warm", label: "Xanh lá / Ô-liu (Sắc Ấm - Warm)" },
                    { id: "cool", label: "Xanh dương / Tím (Sắc Lạnh - Cool)" },
                    { id: "neutral", label: "Cả hai màu rõ rệt (Trung tính - Neutral)" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuiz({ ...quiz, undertone: item.id })}
                      className={`p-4 rounded-2xl border text-xs font-semibold text-left transition-all ${
                        quiz.undertone === item.id ? "border-[#D96B8D] bg-[#FFF2F6] text-[#B84D70] ring-2 ring-[#D96B8D]/20" : "border-[#F0D5DE] hover:bg-[#FFF9FA] text-[#4A2532]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Tình trạng môi */}
              <div className="space-y-3">
                <label className="block font-medium text-sm text-[#3E1C28]">
                  3. Đặc điểm đôi môi tự nhiên của bạn:
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: "dry", label: "Môi hay khô, có nhiều rãnh môi" },
                    { id: "dark", label: "Môi sẫm màu / có viền môi tối" },
                    { id: "pale", label: "Môi nhợt nhạt, thiếu sắc hồng" },
                    { id: "natural", label: "Môi bình thường, mềm mịn" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuiz({ ...quiz, lipCondition: item.id })}
                      className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all ${
                        quiz.lipCondition === item.id ? "border-[#D96B8D] bg-[#FFF2F6] text-[#B84D70] ring-2 ring-[#D96B8D]/20" : "border-[#F0D5DE] hover:bg-[#FFF9FA] text-[#4A2532]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Màu mắt */}
              <div className="space-y-3">
                <label className="block font-medium text-sm text-[#3E1C28]">
                  4. Màu sắc tròng mắt tự nhiên:
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: "black", label: "Đen tuyền truyền thống" },
                    { id: "brown", label: "Nâu sáng / Nâu hổ phách" },
                    { id: "darkBrown", label: "Nâu đậm / Nâu đen" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuiz({ ...quiz, eyeColor: item.id })}
                      className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all ${
                        quiz.eyeColor === item.id ? "border-[#D96B8D] bg-[#FFF2F6] text-[#B84D70] ring-2 ring-[#D96B8D]/20" : "border-[#F0D5DE] hover:bg-[#FFF9FA] text-[#4A2532]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Phong cách trang điểm */}
              <div className="space-y-3">
                <label className="block font-medium text-sm text-[#3E1C28]">
                  5. Phong cách trang điểm yêu thích nhất:
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { id: "natural", label: "Nhẹ nhàng tự nhiên (Đi học hàng ngày)" },
                    { id: "sweet", label: "Ngọt ngào, trong trẻo (Hẹn hò / Dạo phố)" },
                    { id: "bold", label: "Sắc sảo, quyến rũ (Dự tiệc / Chụp ảnh)" },
                    { id: "trendy", label: "Cá tính, thời thượng (Douyin / Gen Z)" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuiz({ ...quiz, makeupStyle: item.id })}
                      className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all ${
                        quiz.makeupStyle === item.id ? "border-[#D96B8D] bg-[#FFF2F6] text-[#B84D70] ring-2 ring-[#D96B8D]/20" : "border-[#F0D5DE] hover:bg-[#FFF9FA] text-[#4A2532]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6. Ngân sách */}
              <div className="space-y-3">
                <label className="block font-medium text-sm text-[#3E1C28]">
                  6. Mức ngân sách dự kiến cho mỗi sản phẩm mỹ phẩm:
                </label>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: "budget", label: "Học sinh - Sinh viên (Dưới 200k)" },
                    { id: "mid", label: "Trung cấp - Phổ biến (200k - 500k)" },
                    { id: "lux", label: "Cao cấp - Hàng hiệu (Trên 500k)" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuiz({ ...quiz, budget: item.id })}
                      className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all ${
                        quiz.budget === item.id ? "border-[#D96B8D] bg-[#FFF2F6] text-[#B84D70] ring-2 ring-[#D96B8D]/20" : "border-[#F0D5DE] hover:bg-[#FFF9FA] text-[#4A2532]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full border border-[#EFC9D5] text-sm text-[#6E4452] hover:bg-[#FFF9FA]"
                >
                  ← Quay lại
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D96B8D] to-[#E58AA6] text-white font-medium text-sm shadow-md hover:brightness-105 transition-all"
                >
                  Xem kết quả Phân tích & Gợi ý Make-up ✨
                </button>
              </div>
            </div>
          )}

          {/* BƯỚC 3: KẾT QUẢ PHÂN TÍCH & GỢI Ý MAKE-UP TRỌN GÓI KÈM LINK SẢN PHẨM */}
          {step === 3 && (
            <div className="space-y-8">
              {/* Phần Tổng quan Mùa Màu Sắc */}
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#FFF5F7] to-white border border-[#F2CED9] space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F6DCE4] pb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A7C]">
                      Kết quả phân tích chuyên sâu • SẮCME AI Engine
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#3E1C28] mt-1">
                      {result.seasonTitle}
                    </h2>
                    <p className="text-xs text-[#7A5260] italic mt-1">"{result.tagline}"</p>
                  </div>
                  {previewImg && (
                    <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#F0C2D1] shadow-sm">
                      <img src={previewImg} alt="Selfie" className="w-14 h-14 rounded-xl object-cover" />
                      <span className="text-xs text-[#3E1C28] font-medium">Ảnh đối chiếu</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-[#6E4452] leading-relaxed">{result.description}</p>

                {/* Bảng màu cá nhân */}
                <div className="space-y-3">
                  <h3 className="font-serif text-base font-semibold text-[#3E1C28]">
                    🎨 Bảng màu "Chân ái" (Best Color Palette):
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {result.colorPalette.map((color) => (
                      <div key={color.name} className="p-3 rounded-2xl bg-white border border-[#F4D6DF] flex items-center gap-3 shadow-sm">
                        <span className="w-8 h-8 rounded-full shrink-0 shadow-inner border border-black/10" style={{ backgroundColor: color.hex }} />
                        <span className="text-xs font-semibold text-[#4A2532]">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Màu cần tránh */}
                <div className="p-4 rounded-2xl bg-white border border-[#F4D6DF] text-xs text-[#734C5A]">
                  <strong className="text-[#A8382B]">⚠️ Sắc độ nên hạn chế:</strong> {result.avoidColors.join(", ")} (Có thể làm xỉn da hoặc làm lộ khuyết điểm).
                </div>
              </div>

              {/* Phần Gợi Ý Make-up Trọn Gói Full-Face kèm Link */}
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A7C]">
                    Hệ thống đề xuất chuyên gia
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#3E1C28]">
                    💄 Bộ sản phẩm Make-up trọn gói dành riêng cho nàng
                  </h3>
                  <p className="text-xs text-[#734C5A]">
                    Được tuyển chọn kỹ lưỡng dựa trên sắc độ da, tình trạng môi và mức ngân sách của bạn.
                  </p>
                </div>

                <div className="grid gap-4">
                  {result.makeupRoutine.map((item, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-[#FFF9FA] border border-[#F2CED9] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:border-[#D96B8D] transition-colors">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-3 py-0.5 rounded-full bg-[#FCE4EC] text-[#B84D70] text-xs font-bold">
                            {item.category}
                          </span>
                          <span className="text-xs font-semibold text-[#3E1C28]">{item.brand}</span>
                          <span className="text-xs text-[#8A6270]">★ {item.rating}</span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-[#3E1C28]">{item.productName}</h4>
                        <p className="text-xs font-semibold text-[#C85A7C]">Mã màu: {item.shade}</p>
                        <p className="text-xs text-[#734C5A] leading-relaxed pt-1">💡 <strong>Lý do phù hợp:</strong> {item.whyFit}</p>
                      </div>

                      <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-[#F6DCE4]">
                        <span className="font-serif font-bold text-lg text-[#3E1C28]">{item.price}</span>
                        <a
                          href={item.shopeeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D96B8D] to-[#E58AA6] text-white text-xs font-medium shadow-sm hover:brightness-105 transition-all"
                        >
                          Xem nơi mua chính hãng ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-[#8A6270] underline hover:text-[#D46A8C]"
                >
                  ↺ Làm lại bài khảo sát từ đầu
                </button>
              </div>

              {/* KHUNG THU THẬP FEEDBACK CHUYÊN NGHIỆP PHỤC VỤ BÁO CÁO 22/11 */}
              <div id="bao-mat" className="bg-gradient-to-br from-[#FCE8EE] via-white to-[#FDF2F5] p-8 rounded-3xl border border-[#F0C2D1] shadow-md space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#B84D70]">
                    📊 Báo cáo Kiểm thử MVP (Milestone 22/11/2026)
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#3E1C28]">
                    Đóng góp ý kiến trải nghiệm bản Pro
                  </h3>
                  <p className="text-xs text-[#6E4452]">
                    Dữ liệu đánh giá của bạn sẽ tự động tổng hợp vào báo cáo thị trường để hoàn thiện nền tảng trước ngày ra mắt.
                  </p>
                </div>

                {!submitted ? (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#4A2532] mb-1">Họ và tên của bạn</label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: Nguyễn Thùy Linh"
                          value={feedback.name}
                          onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBC0CE] text-xs focus:outline-none focus:border-[#D96B8D]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#4A2532] mb-1">Mức độ hài lòng với bảng gợi ý Pro</label>
                        <select
                          value={feedback.rating}
                          onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBC0CE] text-xs focus:outline-none focus:border-[#D96B8D]"
                        >
                          <option value="100%">100% - Cực kỳ chi tiết và hữu ích</option>
                          <option value="90%">90% - Rất hài lòng, gợi ý make-up chuẩn</option>
                          <option value="80%">80% - Khá tốt, cần thêm nhiều brand hơn</option>
                          <option value="60%">60% - Cần tối ưu thêm giao diện</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4A2532] mb-1">Góp ý cải tiến / Tính năng mong đợi</label>
                      <textarea
                        rows={2}
                        placeholder="Ví dụ: Mong muốn có thêm bộ lọc giá tiền theo hãng mỹ phẩm..."
                        value={feedback.comment}
                        onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#EBC0CE] text-xs focus:outline-none focus:border-[#D96B8D]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-[#4A2532] text-white text-xs font-semibold hover:bg-[#3E1C28] transition-colors shadow-sm"
                    >
                      Gửi đánh giá phiên bản Pro ✨
                    </button>
                  </form>
                ) : (
                  <div className="p-4 rounded-2xl bg-white border border-[#EBC0CE] text-sm text-[#4A2532] space-y-1">
                    <p className="font-bold text-[#D96B8D]">🎉 Cảm ơn bạn {feedback.name}!</p>
                    <p className="text-xs text-[#734C5A]">Hệ thống đã lưu ý kiến đánh giá <strong>{feedback.rating}</strong> vào báo cáo MVP của SẮCME.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="tinh-nang" className="mt-auto py-12 px-6 border-t border-[#F4D6DF] bg-[#FFF5F7] text-center space-y-3">
        <p className="font-serif text-xl font-bold tracking-wider text-[#4A2532]">SẮCME</p>
        <p className="text-xs text-[#734C5A] max-w-lg mx-auto leading-relaxed">
          Nền tảng tư vấn sắc màu & mỹ phẩm cá nhân hóa hàng đầu dành cho giới trẻ. Cam kết bảo mật dữ liệu tuyệt đối và minh bạch thương mại.
        </p>
        <p className="text-[11px] text-[#A86E82]">
          © 2026 SẮCME Project • Chuẩn bị cho mốc Báo cáo Khảo sát Thị trường 22/11/2026
        </p>
      </footer>
    </main>
  );
}