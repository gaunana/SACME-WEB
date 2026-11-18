"use client";

import { useState } from "react";
import Link from "next/link";

type QuizData = {
  skinTone: string;
  undertone: string;
  style: string;
  budget: string;
};

const RECOMMENDATIONS: Record<
  string,
  {
    season: string;
    palette: { name: string; hex: string }[];
    description: string;
    products: { name: string; brand: string; shade: string; price: string; reason: string }[];
  }
> = {
  warm: {
    season: "Nhóm Sắc Ấm (Warm & Autumn Glow)",
    palette: [
      { name: "Cam đất", hex: "#C86D51" },
      { name: "Đỏ gạch", hex: "#A8382B" },
      { name: "Hồng đào trầm", hex: "#D98276" },
      { name: "Nâu trà sữa", hex: "#B57863" },
    ],
    description:
      "Làn da mang sắc ấm của bạn cực kỳ tỏa sáng khi kết hợp với các tông màu có ánh cam, nâu hoặc đỏ gạch. Những sắc độ này giúp gương mặt bừng sáng, răng trắng hơn và tạo cảm giác gần gũi, sang trọng.",
    products: [
      {
        name: "Son Kem Lì Blur Fudge Tint",
        brand: "Rom&nd",
        shade: "#04 Radwood (Đỏ nâu gỗ ấm)",
        price: "185.000đ",
        reason: "Chất son mịn mượt che rãnh môi, tông đỏ nâu ấm tôn da cực đỉnh kể cả khi để mặt mộc.",
      },
      {
        name: "Son Thỏi Lì Powder Kiss Lipstick",
        brand: "MAC",
        shade: "#316 Devoted To Chili (Đỏ gạch)",
        price: "580.000đ",
        reason: "Màu son biểu tượng cho làn da châu Á, dễ đánh lòng môi lẫn full môi đi học, đi làm.",
      },
      {
        name: "Son Bóng Juicy Lasting Tint",
        brand: "Rom&nd",
        shade: "#23 Nucadamia (Đỏ nâu hạt dẻ)",
        price: "179.000đ",
        reason: "Tạo hiệu ứng môi căng mọng tự nhiên, sắc nâu đỏ nhẹ nhàng chuẩn gu Hàn Quốc.",
      },
    ],
  },
  cool: {
    season: "Nhóm Sắc Lạnh (Cool & Rose Elegance)",
    palette: [
      { name: "Hồng cánh khô", hex: "#C96A83" },
      { name: "Đỏ rượu vang", hex: "#8E243B" },
      { name: "Hồng dâu sữa", hex: "#E28CA3" },
      { name: "Đỏ lạnh thuần", hex: "#B81D3A" },
    ],
    description:
      "Sắc da ánh hồng/lạnh giúp bạn chinh phục trọn vẹn những gam màu có base hồng, tím mận hoặc đỏ lạnh. Các màu này tạo độ tương phản thanh thoát, giúp tổng thể gương mặt trông rạng rỡ và cuốn hút.",
    products: [
      {
        name: "Son Bóng Glasting Water Tint",
        brand: "Rom&nd",
        shade: "#04 Vintage Ocean (Đỏ nâu lạnh)",
        price: "185.000đ",
        reason: "Sắc đỏ lạnh thanh lịch không làm xỉn men răng, lớp bóng trong suốt nhẹ môi.",
      },
      {
        name: "Son Kem Nhung Velvet Lip Tint",
        brand: "3CE",
        shade: "#Speak Up (Đỏ mận trầm)",
        price: "320.000đ",
        reason: "Tông đỏ trầm quyến rũ, bám màu tốt và cực kỳ tôn nước da sáng hoặc trung bình lạnh.",
      },
      {
        name: "Son Dưỡng Có Màu Lip Glow",
        brand: "Dior",
        shade: "#001 Pink / #012 Rosewood",
        price: "890.000đ",
        reason: "Dưỡng ẩm sâu và tự điều chỉnh sắc hồng cánh sen/hồng gỗ theo độ pH đôi môi của riêng bạn.",
      },
    ],
  },
  neutral: {
    season: "Nhóm Trung Tính (Neutral & Soft Pastel)",
    palette: [
      { name: "Hồng đất", hex: "#C67D82" },
      { name: "Đỏ hồng tự nhiên", hex: "#C44D5E" },
      { name: "Cam san hô nhẹ", hex: "#E08479" },
      { name: "Hồng trà", hex: "#B96B73" },
    ],
    description:
      "Bạn sở hữu sắc da trung tính rất dễ chiều lòng mỹ phẩm! Các tông hồng đất, đỏ hồng hay cam san hô nhẹ nhàng sẽ giữ trọn nét nữ tính, thanh lịch mà không lo bị quá chói hay nhợt nhạt.",
    products: [
      {
        name: "Son Kem Lì Air Fit Velvet Tint",
        brand: "Black Rouge",
        shade: "#A12 Dashed Brown (Đỏ nâu hồng)",
        price: "159.000đ",
        reason: "Màu son quốc dân dễ dùng mỗi ngày, phù hợp với học sinh – sinh viên.",
      },
      {
        name: "Son Thỏi Lì Matte Lipstick",
        brand: "Merzy",
        shade: "#M13 Vapor Red (Đỏ trầm trung tính)",
        price: "169.000đ",
        reason: "Tông đỏ hài hòa giữa sắc ấm và lạnh, giúp gương mặt tươi tắn ngay lập tức.",
      },
      {
        name: "Son Kem Lì Blur Water Tint",
        brand: "3CE",
        shade: "#Laydown (Hồng đào trầm)",
        price: "340.000đ",
        reason: "Màu MLBB (màu môi tự nhiên) nhẹ nhàng, sang trọng chuẩn phong cách nàng thơ.",
      },
    ],
  },
};

export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [consent, setConsent] = useState<boolean>(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<QuizData>({
    skinTone: "",
    undertone: "",
    style: "",
    budget: "",
  });

  const [userName, setUserName] = useState("");
  const [satisfaction, setSatisfaction] = useState("90");
  const [issue, setIssue] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImg(url);
    }
  };

  const handleDeleteImage = () => {
    setPreviewImg(null);
    setConsent(false);
  };

  const getResultKey = () => {
    if (quiz.undertone === "warm") return "warm";
    if (quiz.undertone === "cool") return "cool";
    return "neutral";
  };

  const result = RECOMMENDATIONS[getResultKey()];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FFF9FA] text-[#4A2532] selection:bg-[#FAD2DC] selection:text-[#4A2532]">
      {/* Header */}
      <nav className="sticky top-0 z-50 w-full bg-[#FFF9FA]/80 backdrop-blur-md border-b border-[#F4D6DF]">
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
            <a href="#kham-pha-quiz" className="hover:text-[#D46A8C] transition-colors">
              Trải nghiệm Quiz
            </a>
            <a href="#bao-mat" className="hover:text-[#D46A8C] transition-colors">
              Cam kết bảo mật
            </a>
          </div>

          <div className="text-xs font-medium px-4 py-2 rounded-full bg-[#FCE8EE] text-[#B84D70]">
            ✨ MVP Test Mode
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 px-6 text-center">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FCE3EA] blur-3xl opacity-70 pointer-events-none" />
        <div className="absolute top-40 -left-24 w-80 h-80 rounded-full bg-[#FBEAEF] blur-3xl opacity-70 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE8EE] border border-[#F3C6D4] text-xs font-medium text-[#B84D70]">
            <span>✨ Nền tảng tư vấn sắc màu cá nhân hóa cho giới trẻ</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-[#3E1C28]">
            Tự tin tỏa sắc <br className="hidden sm:block" />
            <span className="italic font-normal text-[#C85A7C]">
              theo cách của riêng bạn
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-[#734C5A] leading-relaxed">
            Để mỗi bạn trẻ mua đúng thỏi son đầu tiên. Trải nghiệm ngay công cụ khảo sát bên dưới mà không cần đăng ký tài khoản!
          </p>

          <div className="pt-2">
            <a
              href="#kham-pha-quiz"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#D96B8D] to-[#E58AA6] text-white font-medium text-base shadow-lg shadow-[#E58AA6]/30 hover:shadow-xl hover:brightness-105 transition-all"
            >
              Bắt đầu Trải nghiệm Ngay ↓
            </a>
          </div>
        </div>
      </section>

      {/* QUIZ & KHẢO SÁT MVP */}
      <section id="kham-pha-quiz" className="py-12 px-6 max-w-3xl mx-auto w-full">
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#F4D6DF] shadow-sm space-y-8">
          
          <div>
            <div className="flex justify-between text-xs font-medium text-[#8A6270] mb-2">
              <span>Bước 1: Quyền riêng tư & Ảnh</span>
              <span>Bước 2: Khảo sát sắc da</span>
              <span>Bước 3: Kết quả & Đánh giá</span>
            </div>
            <div className="w-full h-2 bg-[#F6DCE4] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D96B8D] to-[#E58AA6] transition-all duration-500"
                style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
              />
            </div>
          </div>

          {/* BƯỚC 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A7C]">
                  Bước 1 / 3 • Minh bạch dữ liệu
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#3E1C28]">
                  Phân tích sắc màu an toàn & riêng tư
                </h2>
                <p className="text-sm text-[#734C5A]">
                  Tải lên ảnh selfie dưới ánh sáng tự nhiên (tùy chọn) hoặc bỏ qua để trả lời câu hỏi nhanh.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFF5F7] border border-[#F2CED9] space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#D96B8D]"
                  />
                  <span className="text-sm text-[#4A2532] leading-relaxed">
                    <strong>Tôi đồng ý</strong> cho phép SẮCME sử dụng ảnh khuôn mặt tạm thời trên trình duyệt để đối chiếu màu sắc. Ảnh không bị lưu trữ trái phép và tôi có thể xóa ngay lập tức.
                  </span>
                </label>

                {consent && (
                  <div className="pt-2">
                    {!previewImg ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#E8B4C4] rounded-2xl cursor-pointer bg-white hover:bg-[#FFF9FA] transition-colors">
                        <span className="text-2xl mb-1">📸</span>
                        <span className="text-xs font-medium text-[#B84D70]">Bấm để chọn ảnh khuôn mặt</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    ) : (
                      <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-[#F0C2D1]">
                        <img src={previewImg} alt="Selfie" className="w-14 h-14 rounded-xl object-cover" />
                        <span className="text-xs text-[#3E1C28] flex-1 font-medium">Đã tải ảnh lên thành công</span>
                        <button onClick={handleDeleteImage} className="text-xs text-[#B84D70] underline">
                          Xóa ảnh
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D96B8D] to-[#E58AA6] text-white font-medium text-sm shadow-md hover:brightness-105"
                >
                  Tiếp tục trả lời câu hỏi →
                </button>
              </div>
            </div>
          )}

          {/* BƯỚC 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A7C]">
                  Bước 2 / 3 • Khảo sát đặc điểm
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#3E1C28]">
                  Đặc điểm làn da của bạn
                </h2>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-sm text-[#3E1C28]">1. Sắc độ da hiện tại:</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "light", label: "Trắng sáng", color: "#FDE7DC" },
                    { id: "medium", label: "Trung bình", color: "#EBC3A8" },
                    { id: "tan", label: "Ngăm khỏe", color: "#C89675" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuiz({ ...quiz, skinTone: item.id })}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        quiz.skinTone === item.id ? "border-[#D96B8D] bg-[#FFF2F6]" : "border-[#F0D5DE]"
                      }`}
                    >
                      <span className="block w-5 h-5 rounded-full mb-1" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-sm text-[#3E1C28]">2. Mạch máu cổ tay dưới ánh sáng tự nhiên:</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: "warm", label: "Xanh lá (Ấm)" },
                    { id: "cool", label: "Xanh dương (Lạnh)" },
                    { id: "neutral", label: "Cả hai (Trung tính)" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuiz({ ...quiz, undertone: item.id })}
                      className={`p-3 rounded-2xl border text-xs font-medium text-left ${
                        quiz.undertone === item.id ? "border-[#D96B8D] bg-[#FFF2F6] text-[#B84D70]" : "border-[#F0D5DE]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-sm text-[#3E1C28]">3. Phong cách trang điểm yêu thích:</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { id: "natural", label: "Nhẹ nhàng tự nhiên" },
                    { id: "sweet", label: "Ngọt ngào, trong trẻo" },
                    { id: "bold", label: "Cá tính, sắc sảo" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setQuiz({ ...quiz, style: item.id })}
                      className={`p-3 rounded-2xl border text-xs font-medium text-left ${
                        quiz.style === item.id ? "border-[#D96B8D] bg-[#FFF2F6] text-[#B84D70]" : "border-[#F0D5DE]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-full border border-[#EFC9D5] text-sm text-[#6E4452]"
                >
                  ← Quay lại
                </button>
                <button
                  type="button"
                  disabled={!quiz.skinTone || !quiz.undertone || !quiz.style}
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D96B8D] to-[#E58AA6] text-white font-medium text-sm shadow-md disabled:opacity-40"
                >
                  Xem kết quả tư vấn ✨
                </button>
              </div>
            </div>
          )}

          {/* BƯỚC 3 */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="space-y-4 border-b border-[#F6DCE4] pb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A7C]">
                  Kết quả phân tích từ SẮCME
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#3E1C28]">
                  {result.season}
                </h2>
                <p className="text-sm text-[#6E4452] leading-relaxed">{result.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {result.palette.map((color) => (
                    <div key={color.name} className="p-3 rounded-2xl bg-[#FFF9FA] border border-[#F4D6DF] flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full shrink-0 border border-black/10" style={{ backgroundColor: color.hex }} />
                      <span className="text-xs font-medium">{color.name}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4">
                  <h3 className="font-serif text-lg font-semibold text-[#3E1C28]">Gợi ý thỏi son phù hợp:</h3>
                  {result.products.map((prod, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#FFF9FA] border border-[#F2CED9] flex flex-col sm:flex-row justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-[#B84D70]">{prod.brand} - {prod.name}</span>
                        <p className="text-xs font-medium text-[#3E1C28]">{prod.shade}</p>
                        <p className="text-xs text-[#734C5A] mt-1">{prod.reason}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-serif font-bold text-sm text-[#3E1C28] block">{prod.price}</span>
                        <a
                          href={`https://shopee.vn/search?keyword=${encodeURIComponent(prod.brand + " " + prod.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-1 px-3 py-1 rounded-full bg-white border border-[#E58AA6] text-[11px] text-[#B84D70]"
                        >
                          Xem nơi mua ↗
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#8A6270] underline pt-2 block"
                >
                  ↺ Làm lại bài kiểm tra
                </button>
              </div>

              {/* FORM GÓP Ý MVP */}
              <div id="bao-mat" className="bg-gradient-to-br from-[#FCE8EE] to-white p-6 rounded-3xl border border-[#F0C2D1]">
                <h3 className="font-serif text-lg font-bold text-[#3E1C28] mb-1">
                  Đóng góp ý kiến cho bản Test MVP (22/11)
                </h3>
                <p className="text-xs text-[#6E4452] mb-4">
                  Ý kiến của bạn cực kỳ quan trọng cho báo cáo của nhóm.
                </p>

                {!feedbackSent ? (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Tên của bạn..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-white border border-[#EBC0CE] text-xs"
                      />
                      <select
                        value={satisfaction}
                        onChange={(e) => setSatisfaction(e.target.value)}
                        className="px-3.5 py-2 rounded-xl bg-white border border-[#EBC0CE] text-xs"
                      >
                        <option value="100">100% - Rất hài lòng</option>
                        <option value="90">90% - Hài lòng, dễ dùng</option>
                        <option value="80">80% - Khá tốt</option>
                      </select>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Vấn đề gặp phải hoặc góp ý cải thiện..."
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#EBC0CE] text-xs"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-full bg-[#4A2532] text-white text-xs font-medium hover:bg-[#3E1C28]"
                    >
                      Gửi đánh giá trải nghiệm ✨
                    </button>
                  </form>
                ) : (
                  <div className="p-3 rounded-xl bg-white border border-[#EBC0CE] text-xs text-[#4A2532]">
                    🎉 Cảm ơn bạn <strong>{userName}</strong>! Đã ghi nhận mức độ hài lòng <strong>{satisfaction}%</strong>.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 px-6 border-t border-[#F4D6DF] bg-[#FFF5F7] text-center space-y-2">
        <p className="font-serif text-lg font-bold tracking-wider text-[#4A2532]">SẮCME</p>
        <p className="text-xs text-[#8A6270]">
          Để mỗi bạn trẻ mua đúng thỏi son đầu tiên • Dự án Khởi nghiệp Sáng tạo 2026
        </p>
      </footer>
    </main>
  );
}