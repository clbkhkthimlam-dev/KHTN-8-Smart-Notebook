import { ExerciseItem } from "../types";

export const EXERCISES_BANK: ExerciseItem[] = [
  // ================= BÀI 1: AN TOÀN PHÒNG THÍ NGHIỆM =================
  {
    exercise_id: "EX_01_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 Kết nối tri thức tr.6-10",
    lesson_id: 1,
    chapter_id: "CH_INTRO",
    atom_ids: ["ATOM_01_01", "ATOM_01_02"],
    skill_ids: ["SKILL_SAFETY", "SKILL_RECOGNITION"],
    difficulty: 1,
    cognitive_level: "recognition",
    question_type: "multiple_choice",
    prompt: "Khi làm việc với các hóa chất có nhãn cảnh báo 'Ăn mòn' (Corrosive) như dung dịch axit đặc, quy tắc an toàn bắt buộc nào sau đây phải tuân thủ nghiêm ngặt?",
    options: [
      "A. Đeo găng tay chống hóa chất, kính bảo hộ và mở cửa sổ/tủ hút thông gió",
      "B. Có thể dùng tay trần để rót nếu cẩn thận không để rớt ra ngoài",
      "C. Nếm thử một giọt nhỏ bằng đầu que thủy tinh để xác định nồng độ",
      "D. Đổ trực tiếp lượng hóa chất thừa trở lại chai hóa chất gốc ban đầu"
    ],
    correct_answer: "A",
    detailed_solution: "Hóa chất ăn mòn (như axit đặc, kiềm đặc) có khả năng phá hủy da và niêm mạc. Bắt buộc phải trang bị bảo hộ cá nhân (PPE) gồm găng tay, kính bảo hộ và thao tác trong khu vực thông gió tốt. Tuyệt đối không nếm hoặc đổ hóa chất thừa lại chai gốc.",
    socratic_hint: "Nhớ lại hình ảnh biểu tượng ăn mòn hình bàn tay hoặc kim loại bị nhỏ giọt chất lỏng ở Bài 1.",
    skills: ["Nhận thức an toàn", "Nhận biết biển cảnh báo"]
  },
  {
    exercise_id: "EX_01_02",
    source_type: "SGV",
    source_anchor: "SGV KHTN 8 tr.14-16",
    lesson_id: 1,
    chapter_id: "CH_INTRO",
    atom_ids: ["ATOM_01_01"],
    skill_ids: ["SKILL_PROBLEM_SOLVING"],
    difficulty: 3,
    cognitive_level: "application",
    question_type: "phenomenon_explanation",
    prompt: "Trong giờ thực hành, bạn Nam vô tình làm đổ một lượng nhỏ dung dịch axit clohiđric (HCl) ra mặt bàn gỗ thí nghiệm. Hãy đề xuất quy trình 3 bước xử lý an toàn và đúng chuẩn khoa học.",
    correct_answer: "Bước 1: Báo ngay cho giáo viên và cảnh báo các bạn xung quanh. Bước 2: Dùng bột NaHCO3 (hoặc vôi bột) rắc đều lên vết tràn để trung hòa axit cho đến khi hết sủi bọt khí CO2. Bước 3: Thu gom bã bằng khăn ẩm đeo găng tay cao su, lau sạch mặt bàn bằng nước sạch và bỏ rác thải vào xô chứa chất thải hóa học.",
    detailed_solution: "Axit tràn ra bề mặt cần được trung hòa bằng bazơ yếu/muối kiềm nhẹ an toàn như NaHCO3 trước khi lau dọn. Không dùng nước xối mạnh vì có thể làm bắn dung dịch axit sang các vị trí khác.",
    socratic_hint: "Nếu dội nước ngay, điều gì sẽ xảy ra với lượng axit đang đọng trên mặt bàn phẳng?",
    skills: ["Xử lý sự cố", "Ứng dụng hóa học"]
  },

  // ================= CHƯƠNG I: PHẢN ỨNG HÓA HỌC (BÀI 2 - 7) =================
  {
    exercise_id: "EX_02_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.13",
    lesson_id: 2,
    chapter_id: "CH_I_CHEM",
    atom_ids: ["ATOM_02_01"],
    skill_ids: ["SKILL_RECOGNITION"],
    difficulty: 2,
    cognitive_level: "comprehension",
    question_type: "multiple_choice",
    prompt: "Quá trình nào sau đây thể hiện một hiện tượng hóa học (có phản ứng hóa học xảy ra)?",
    options: [
      "A. Đốt cháy mẩu than tổ ong trong không khí sinh ra khí cacbonic và tỏa nhiệt",
      "B. Hòa tan đường kính vào nước thu được dung dịch nước đường",
      "C. Cồn etylic bay hơi khi mở nắp lọ để ngoài không khí",
      "D. Đập nhỏ viên đá vôi lớn thành các viên đá dăm nhỏ"
    ],
    correct_answer: "A",
    detailed_solution: "Đốt than (chủ yếu là Carbon) tạo ra chất mới là khí carbon dioxide (CO2) và tỏa nhiệt mạnh -> Đây là biến đổi hóa học. Các phương án B, C, D chỉ là biến đổi trạng thái hoặc kích thước (biến đổi vật lý).",
    socratic_hint: "Dấu hiệu phân biệt cốt lõi giữa biến đổi hóa học và biến đổi vật lý là có chất mới sinh ra hay không?",
    skills: ["Phân loại biến đổi", "Quan sát hiện tượng"]
  },
  {
    exercise_id: "EX_03_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.18",
    lesson_id: 3,
    chapter_id: "CH_I_CHEM",
    atom_ids: ["ATOM_03_01"],
    skill_ids: ["SKILL_CALCULATION"],
    difficulty: 3,
    cognitive_level: "application",
    question_type: "calculation",
    prompt: "Tính thể tích của 0,5 mol khí O2 ở điều kiện chuẩn (25 °C và 1 bar). Biết rằng ở điều kiện chuẩn này, 1 mol khí bất kỳ chiếm thể tích 24,79 lít.",
    correct_answer: "12,395 lít",
    detailed_solution: "Áp dụng công thức SGK KHTN 8: V = n × 24,79 (lít). Với n = 0,5 mol -> V = 0,5 × 24,79 = 12,395 (L).",
    socratic_hint: "SGK KHTN 8 chuẩn GDPT 2018 sử dụng thể tích mol chất khí ở điều kiện chuẩn 1 bar, 25°C là bao nhiêu lít?",
    required_formulas: ["V = n \\times 24{,}79"],
    skills: ["Tính toán mol", "Đổi đơn vị"]
  },
  {
    exercise_id: "EX_04_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.22",
    lesson_id: 4,
    chapter_id: "CH_I_CHEM",
    atom_ids: ["ATOM_04_01"],
    skill_ids: ["SKILL_CALCULATION"],
    difficulty: 3,
    cognitive_level: "application",
    question_type: "calculation",
    prompt: "Hòa tan hoàn toàn 15 g đường vào 135 g nước cất. Tính nồng độ phần trăm (C%) của dung dịch nước đường thu được.",
    correct_answer: "10%",
    detailed_solution: "Khối lượng dung dịch: m_dd = m_ct + m_dm = 15 + 135 = 150 (g). Nồng độ phần trăm: C% = (m_ct / m_dd) × 100% = (15 / 150) × 100% = 10%.",
    socratic_hint: "Khối lượng dung dịch bao gồm khối lượng của chất tan cộng với gì?",
    required_formulas: ["C\\% = \\frac{m_{ct}}{m_{dd}} \\times 100\\%"],
    skills: ["Tính nồng độ", "Pha chế dung dịch"]
  },
  {
    exercise_id: "EX_05_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.26",
    lesson_id: 5,
    chapter_id: "CH_I_CHEM",
    atom_ids: ["ATOM_05_01"],
    skill_ids: ["SKILL_CALCULATION", "SKILL_LAW_CONSERVATION"],
    difficulty: 3,
    cognitive_level: "application",
    question_type: "calculation",
    prompt: "Nung hoàn toàn 10 g đá vôi (chứa canxi cacbonat CaCO3) sinh ra 5,6 g canxi oxit (CaO) và khí cacbon đioxit (CO2). Theo định luật bảo toàn khối lượng, thể tích khí CO2 thoát ra ở điều kiện chuẩn (24,79 L/mol) là bao nhiêu?",
    correct_answer: "2,479 lít",
    detailed_solution: "Theo định luật bảo toàn khối lượng: m_CaCO3 = m_CaO + m_CO2 => m_CO2 = 10 - 5,6 = 4,4 g. Số mol CO2: n = 4,4 / 44 = 0,1 mol. Thể tích khí CO2 ở đkc: V = 0,1 × 24,79 = 2,479 lít.",
    socratic_hint: "Tổng khối lượng các chất sản phẩm luôn bằng tổng khối lượng các chất tham gia phản ứng.",
    required_formulas: ["m_A + m_B = m_C + m_D", "n = \\frac{m}{M}", "V = n \\times 24{,}79"],
    skills: ["Bảo toàn khối lượng", "Cân bằng phương trình"]
  },
  {
    exercise_id: "EX_07_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.33",
    lesson_id: 7,
    chapter_id: "CH_I_CHEM",
    atom_ids: ["ATOM_07_01"],
    skill_ids: ["SKILL_DATA_ANALYSIS"],
    difficulty: 3,
    cognitive_level: "comprehension",
    question_type: "data_analysis",
    prompt: "Để kiểm tra ảnh hưởng của diện tích tiếp xúc đến tốc độ phản ứng giữa kẽm (Zn) và dung dịch axit clohiđric (HCl), hai học sinh thực hiện hai thí nghiệm với cùng khối lượng kẽm và cùng thể tích, nồng độ axit. Thí nghiệm 1 dùng kẽm viên, Thí nghiệm 2 dùng kẽm bột. Kết quả khí thoát ra ở thí nghiệm nào nhanh hơn và vì sao?",
    correct_answer: "Thí nghiệm 2 (kẽm bột) thoát khí nhanh hơn nhiều vì dạng bột có diện tích bề mặt tiếp xúc với axit lớn hơn rất nhiều so với dạng viên, làm tăng tần số va chạm hiệu quả giữa các phân tử.",
    detailed_solution: "Khi tăng diện tích bề mặt tiếp xúc của chất rắn tham gia phản ứng, số va chạm giữa các chất phản ứng trong một đơn vị thời gian tăng lên, dẫn đến tốc độ phản ứng tăng.",
    socratic_hint: "Hãy so sánh tổng diện tích tiếp xúc của một khối lập phương nguyên vẹn và khi khối lập phương đó bị bẻ vụn ra thành hàng ngàn mảnh nhỏ.",
    skills: ["Phân tích dữ liệu thực nghiệm", "Tốc độ phản ứng"]
  },

  // ================= CHƯƠNG II: HỢP CHẤT THÔNG DỤNG (BÀI 8 - 12) =================
  {
    exercise_id: "EX_08_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.36",
    lesson_id: 8,
    chapter_id: "CH_II_COMPOUND",
    atom_ids: ["ATOM_08_01"],
    skill_ids: ["SKILL_RECOGNITION"],
    difficulty: 2,
    cognitive_level: "comprehension",
    question_type: "multiple_choice",
    prompt: "Dung dịch axit làm đổi màu giấy quỳ tím thành màu gì và phản ứng với kim loại nào sau đây giải phóng khí hiđro?",
    options: [
      "A. Màu đỏ; kim loại Kẽm (Zn)",
      "B. Màu xanh; kim loại Đồng (Cu)",
      "C. Mất màu; kim loại Vàng (Au)",
      "D. Màu tím không đổi; kim loại Bạc (Ag)"
    ],
    correct_answer: "A",
    detailed_solution: "Dung dịch acid làm quỳ tím chuyển sang màu đỏ. Các axit thông thường (như HCl, H2SO4 loãng) phản ứng với kim loại đứng trước hiđro trong dãy hoạt động hóa học (như Zn, Fe, Al) sinh ra muối và giải phóng khí H2.",
    socratic_hint: "Chất chỉ thị quỳ tím trong môi trường acid có màu gì? Đồng có tác dụng với HCl loãng không?",
    skills: ["Tính chất acid", "Chỉ thị màu"]
  },
  {
    exercise_id: "EX_09_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.40-43",
    lesson_id: 9,
    chapter_id: "CH_II_COMPOUND",
    atom_ids: ["ATOM_09_01", "ATOM_09_02"],
    skill_ids: ["SKILL_DATA_ANALYSIS", "SKILL_TRANSFER"],
    difficulty: 3,
    cognitive_level: "application",
    question_type: "data_analysis",
    prompt: "Một nông dân đo độ pH của đất ruộng trồng lúa và ghi nhận giá trị pH = 4,8. Đất này thuộc loại đất gì? Người nông dân nên bón chất nào sau đây để khử chua cải tạo đất?",
    options: [
      "A. Đất chua (axit); bón vôi bột (CaO hoặc Ca(OH)2)",
      "B. Đất kiềm; bón giấm ăn pha loãng",
      "C. Đất trung tính; không cần bón gì",
      "D. Đất mặn; bón muối ăn NaCl"
    ],
    correct_answer: "A",
    detailed_solution: "Môi trường có pH < 7 là môi trường axit (đất chua). Để khử chua đất nông nghiệp, biện pháp truyền thống và kinh tế nhất là bón vôi bột (CaO sẽ tác dụng với nước tạo Ca(OH)2 có tính bazơ để trung hòa lượng axit dư trong đất).",
    socratic_hint: "Đất có pH < 7 nghĩa là tính axit hay bazo mạnh hơn?",
    skills: ["Ứng dụng pH", "Nông nghiệp thực tế"]
  },

  // ================= CHƯƠNG III: KHỐI LƯỢNG RIÊNG VÀ ÁP SUẤT (BÀI 13 - 17) =================
  {
    exercise_id: "EX_13_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.56-59",
    lesson_id: 13,
    chapter_id: "CH_III_DENSITY_PRESSURE",
    atom_ids: ["ATOM_13_01"],
    skill_ids: ["SKILL_CALCULATION", "SKILL_PHYSICS_MEASURE"],
    difficulty: 2,
    cognitive_level: "comprehension",
    question_type: "calculation",
    prompt: "Một thanh nhôm nguyên chất có thể tích 0,002 m³ và khối lượng đo được là 5,4 kg. Tính khối lượng riêng của nhôm và cho biết ý nghĩa của con số đó.",
    correct_answer: "2700 kg/m³",
    detailed_solution: "Áp dụng công thức chuẩn: D = m / V = 5,4 / 0,002 = 2700 (kg/m³). Ý nghĩa: 1 mét khối nhôm nguyên chất có khối lượng là 2700 kg.",
    socratic_hint: "Công thức tính khối lượng riêng: D bằng khối lượng chia cho thể tích.",
    required_formulas: ["D = \\frac{m}{V}"],
    skills: ["Khối lượng riêng", "Đổi đơn vị SI"]
  },
  {
    exercise_id: "EX_15_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.64-67",
    lesson_id: 15,
    chapter_id: "CH_III_DENSITY_PRESSURE",
    atom_ids: ["ATOM_15_01"],
    skill_ids: ["SKILL_CALCULATION"],
    difficulty: 3,
    cognitive_level: "application",
    question_type: "calculation",
    prompt: "Một người có trọng lượng P = 600 N đứng thẳng bằng hai chân trên sàn nhà. Diện tích tiếp xúc của mỗi bàn chân với sàn là 150 cm². Tính áp suất mà người đó tác dụng lên sàn nhà theo đơn vị Pascal (Pa).",
    correct_answer: "20 000 Pa (hoặc N/m²)",
    detailed_solution: "Đổi đơn vị: S = 2 × 150 cm² = 300 cm² = 300 × 10⁻⁴ m² = 0,03 m². Áp lực: F = P = 600 N. Áp suất: p = F / S = 600 / 0,03 = 20 000 Pa.",
    socratic_hint: "Người này đứng bằng hai chân thì tổng diện tích tiếp xúc bằng bao nhiêu lần diện tích một bàn chân? Đừng quên đổi cm² ra m².",
    required_formulas: ["p = \\frac{F}{S}"],
    skills: ["Áp suất bề mặt", "Đổi đơn vị"]
  },
  {
    exercise_id: "EX_16_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.68-71",
    lesson_id: 16,
    chapter_id: "CH_III_DENSITY_PRESSURE",
    atom_ids: ["ATOM_16_01"],
    skill_ids: ["SKILL_PHENOMENON_EXPLANATION"],
    difficulty: 3,
    cognitive_level: "application",
    question_type: "phenomenon_explanation",
    prompt: "Tại sao ở các đập ngăn nước thủy điện, chân đập bê tông luôn được thiết kế xây dựng dày và bè rộng hơn rất nhiều so với đỉnh đập?",
    correct_answer: "Vì áp suất chất lỏng tăng tỉ lệ thuận với độ sâu (p = d × h). Càng xuống sâu đáy đập, độ sâu h càng lớn nên áp suất nước tác dụng vuông góc lên thân đập càng khổng lồ. Việc mở rộng và gia cố phần chân đập giúp thành đập đủ khả năng chịu được áp lực cực lớn đó để không bị vỡ.",
    detailed_solution: "Theo công thức áp suất chất lỏng p = d.h, đáy đập chịu áp lực lớn nhất nên bắt buộc phải thiết kế tiết diện chân đập dày nhất để đảm bảo an toàn kết cấu công trình.",
    socratic_hint: "Áp suất chất lỏng phụ thuộc vào độ sâu như thế nào?",
    required_formulas: ["p = d \\times h"],
    skills: ["Áp suất chất lỏng", "Giải thích kỹ thuật"]
  },
  {
    exercise_id: "EX_17_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.72-75",
    lesson_id: 17,
    chapter_id: "CH_III_DENSITY_PRESSURE",
    atom_ids: ["ATOM_17_01"],
    skill_ids: ["SKILL_CALCULATION", "SKILL_ARCHIMEDES"],
    difficulty: 3,
    cognitive_level: "application",
    question_type: "calculation",
    prompt: "Một khối kim loại có thể tích 0,0005 m³ được nhúng chìm hoàn toàn trong nước. Biết trọng lượng riêng của nước là d = 10 000 N/m³. Tính độ lớn lực đẩy Archimedes tác dụng lên khối kim loại.",
    correct_answer: "5 N",
    detailed_solution: "Áp dụng định luật Archimedes: F_A = d × V = 10 000 × 0,0005 = 5 (N). Hướng của lực đẩy là thẳng đứng từ dưới lên.",
    socratic_hint: "Khi vật chìm hoàn toàn, thể tích chất lỏng bị chiếm chỗ bằng đúng thể tích của vật.",
    required_formulas: ["F_A = d \\times V"],
    skills: ["Lực đẩy Archimedes", "Điều kiện nổi chìm"]
  },

  // ================= CHƯƠNG IV: TÁC DỤNG LÀM QUAY - ĐÒN BẨY (BÀI 18 - 19) =================
  {
    exercise_id: "EX_18_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.76-79",
    lesson_id: 18,
    chapter_id: "CH_IV_ROTATION",
    atom_ids: ["ATOM_18_01"],
    skill_ids: ["SKILL_TORQUE", "SKILL_COMPREHENSION"],
    difficulty: 2,
    cognitive_level: "comprehension",
    question_type: "multiple_choice",
    prompt: "Tác dụng làm quay của lực (moment lực) lên một vật có trục quay cố định phụ thuộc vào những yếu tố nào?",
    options: [
      "A. Độ lớn của lực tác dụng và khoảng cách từ trục quay đến giá của lực (cánh tay đòn)",
      "B. Chỉ phụ thuộc vào khối lượng của vật",
      "C. Chỉ phụ thuộc vào vận tốc chuyển động của vật",
      "D. Nhiệt độ môi trường xung quanh trục quay"
    ],
    correct_answer: "A",
    detailed_solution: "Moment lực đặc trưng cho tác dụng làm quay của lực. Độ lớn lực càng lớn và cánh tay đòn (khoảng cách vuông góc từ trục quay đến giá của lực) càng dài thì tác dụng làm quay càng mạnh.",
    socratic_hint: "Tại sao khi đẩy cửa, ta luôn đẩy vào mép cánh cửa xa bản lề thay vì đẩy gần sát bản lề?",
    required_formulas: ["M = F \\times d"],
    skills: ["Moment lực", "Tác dụng làm quay"]
  },
  {
    exercise_id: "EX_19_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.80-84",
    lesson_id: 19,
    chapter_id: "CH_IV_ROTATION",
    atom_ids: ["ATOM_19_01"],
    skill_ids: ["SKILL_LEVER_APPLICATION"],
    difficulty: 3,
    cognitive_level: "application",
    question_type: "phenomenon_explanation",
    prompt: "Để nhổ một chiếc đinh sắt cắm sâu vào thanh gỗ, người thợ mộc dùng một chiếc búa nhổ đinh. Hãy xác định điểm tựa (O), điểm đặt lực cản (O1) và điểm đặt lực kéo của tay (O2). Đòn bẩy này cho ta lợi về lực hay thiệt về lực?",
    correct_answer: "Điểm tựa O là điểm đầu búa tiếp xúc tì lên mặt gỗ. Điểm đặt lực cản O1 là đầu kẹp đinh. Điểm đặt lực tác dụng O2 là vị trí tay cầm cán búa. Do khoảng cách từ điểm tựa đến tay (cán búa) dài hơn rất nhiều so với khoảng cách từ điểm tựa đến đinh (OO2 > OO1), nên đòn bẩy này cho ta lợi rất nhiều về lực (lực tay tác dụng nhỏ hơn nhiều so với lực nhổ đinh).",
    detailed_solution: "Cơ cấu búa nhổ đinh là đòn bẩy loại 1 với cánh tay đòn của lực tác dụng lớn hơn cánh tay đòn của lực cản, giúp sinh ra lực nhổ cực lớn với lực tay vừa phải.",
    socratic_hint: "Xác định vị trí trục xoay của đầu búa khi tựa vào mặt gỗ phẳng.",
    skills: ["Phân tích đòn bẩy", "Ứng dụng cơ học"]
  },

  // ================= CHƯƠNG V: ĐIỆN (BÀI 20 - 25) =================
  {
    exercise_id: "EX_20_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.85",
    lesson_id: 20,
    chapter_id: "CH_V_ELECTRICITY",
    atom_ids: ["ATOM_20_01"],
    skill_ids: ["SKILL_RECOGNITION"],
    difficulty: 2,
    cognitive_level: "comprehension",
    question_type: "multiple_choice",
    prompt: "Khi cọ xát một thanh thủy tinh vào mảnh lụa, thanh thủy tinh bị nhiễm điện dương. Nguyên nhân bản chất vi mô là do:",
    options: [
      "A. Thanh thủy tinh đã bị mất bớt electron truyền sang mảnh lụa",
      "B. Thanh thủy tinh đã nhận thêm proton mang điện tích dương từ mảnh lụa",
      "C. Mảnh lụa đã biến mất điện tích âm",
      "D. Thanh thủy tinh tự sinh ra điện tích dương mới"
    ],
    correct_answer: "A",
    detailed_solution: "Nguyên tử trung hòa về điện. Khi cọ xát, các electron ở lớp ngoài cùng của nguyên tử trên thanh thủy tinh bị bứt ra và dịch chuyển sang mảnh lụa. Thanh thủy tinh mất bớt electron (thiếu âm) nên mang điện tích dương, mảnh lụa nhận thêm electron nên mang điện tích âm.",
    socratic_hint: "Chỉ có loại hạt mang điện nào có thể tự do dịch chuyển giữa các vật khi cọ xát?",
    skills: ["Nhiễm điện cọ xát", "Dịch chuyển electron"]
  },
  {
    exercise_id: "EX_24_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.99-102",
    lesson_id: 24,
    chapter_id: "CH_V_ELECTRICITY",
    atom_ids: ["ATOM_24_01"],
    skill_ids: ["SKILL_CIRCUIT_MEASURE"],
    difficulty: 2,
    cognitive_level: "comprehension",
    question_type: "multiple_choice",
    prompt: "Để đo cường độ dòng điện chạy qua một bóng đèn và hiệu điện thế giữa hai đầu bóng đèn đó, ta cần mắc ampe kế và vôn kế như thế nào vào mạch điện?",
    options: [
      "A. Ampe kế mắc nối tiếp với đèn; Vôn kế mắc song song với đèn",
      "B. Ampe kế mắc song song với đèn; Vôn kế mắc nối tiếp với đèn",
      "C. Cả hai dụng cụ đều mắc song song với đèn",
      "D. Cả hai dụng cụ đều mắc nối tiếp với đèn"
    ],
    correct_answer: "A",
    detailed_solution: "Quy tắc cơ bản: Ampe kế đo cường độ dòng điện (I) phải mắc nối tiếp với thiết bị cần đo sao cho dòng điện đi vào chốt dương (+) và ra chốt âm (-). Vôn kế đo hiệu điện thế (U) phải mắc song song giữa hai đầu thiết bị cần đo.",
    socratic_hint: "Dòng điện cần chạy xuyên qua dụng cụ nào để đo lượng điện tích truyền qua?",
    skills: ["Mắc mạch điện", "Quy tắc an toàn điện"]
  },

  // ================= CHƯƠNG VI: NHIỆT (BÀI 26 - 29) =================
  {
    exercise_id: "EX_26_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.106",
    lesson_id: 26,
    chapter_id: "CH_VI_HEAT",
    atom_ids: ["ATOM_26_01"],
    skill_ids: ["SKILL_HEAT_ENERGY"],
    difficulty: 2,
    cognitive_level: "comprehension",
    question_type: "multiple_choice",
    prompt: "Nội năng của một vật là gì và có những cách nào để làm biến đổi nội năng của vật?",
    options: [
      "A. Là tổng động năng và thế năng của các phân tử cấu tạo nên vật; có 2 cách là thực hiện công và truyền nhiệt",
      "B. Là nhiệt độ của vật đo bằng nhiệt kế điện tử; chỉ có cách đun nóng",
      "C. Là năng lượng cơ học khi vật bay trong không khí",
      "D. Là khối lượng của các hạt nhân nguyên tử"
    ],
    correct_answer: "A",
    detailed_solution: "Nội năng là tổng động năng chuyển động nhiệt và thế năng tương tác giữa các phân tử cấu tạo nên vật. Có hai cách làm thay đổi nội năng: Thực hiện công (ví dụ: cọ xát mẩu kim loại) hoặc Truyền nhiệt (cho tiếp xúc với vật có nhiệt độ cao hơn).",
    socratic_hint: "Khi em xoa hai bàn tay vào nhau vào mùa đông, lòng bàn tay nóng lên do cơ chế nào?",
    skills: ["Khái niệm nội năng", "Truyền nhiệt & thực hiện công"]
  },
  {
    exercise_id: "EX_28_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.114-118",
    lesson_id: 28,
    chapter_id: "CH_VI_HEAT",
    atom_ids: ["ATOM_28_01"],
    skill_ids: ["SKILL_HEAT_TRANSFER"],
    difficulty: 3,
    cognitive_level: "application",
    question_type: "phenomenon_explanation",
    prompt: "Chiếc phích giữ nhiệt (bình thủy) giữ cho nước sôi nóng được lâu là nhờ cấu tạo ngăn chặn những hình thức truyền nhiệt nào?",
    correct_answer: "Cấu tạo ruột phích gồm hai lớp thủy tinh có khoảng chân không ở giữa để ngăn chặn hoàn toàn sự dẫn nhiệt và đối lưu (chân không không có phân tử chất để dẫn truyền). Mặt trong của lớp thủy tinh được tráng gương bạc để phản xạ bức xạ nhiệt ngược trở lại vào trong nước. Nắp phích bằng vật liệu cách nhiệt tốt ngăn đối lưu không khí.",
    detailed_solution: "Bình giữ nhiệt ngăn chặn cả 3 hình thức truyền nhiệt: Dẫn nhiệt (nhờ chân không), Đối lưu (nhờ nắp kín và chân không) và Bức xạ nhiệt (nhờ lớp tráng bạc phản xạ tia nhiệt).",
    socratic_hint: "Chân không có thể dẫn nhiệt hoặc tạo dòng đối lưu được không?",
    skills: ["Dẫn nhiệt - Đối lưu - Bức xạ", "Vật liệu cách nhiệt"]
  },

  // ================= CHƯƠNG VII: SINH HỌC CƠ THỂ NGƯỜI (BÀI 30 - 40) =================
  {
    exercise_id: "EX_32_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.128-132",
    lesson_id: 32,
    chapter_id: "CH_VII_HUMAN_BIO",
    atom_ids: ["ATOM_32_01"],
    skill_ids: ["SKILL_DIGESTION"],
    difficulty: 2,
    cognitive_level: "comprehension",
    question_type: "multiple_choice",
    prompt: "Cơ quan nào trong hệ tiêu hóa của người là nơi diễn ra quá trình tiêu hóa hóa học và hấp thụ chất dinh dưỡng vào máu chủ yếu nhất?",
    options: [
      "A. Ruột non",
      "B. Dạ dày",
      "C. Khoang miệng",
      "D. Ruột già"
    ],
    correct_answer: "A",
    detailed_solution: "Ruột non có diện tích bề mặt hấp thụ khổng lồ nhờ các nếp gấp, lông ruột và vi lông nhung. Tại đây, nhờ các enzym tiêu hóa từ dịch tụy, dịch mật và dịch ruột, hầu hết thức ăn được phân giải thành các chất dinh dưỡng đơn giản và hấp thụ qua mao mạch máu, mao mạch bạch huyết.",
    socratic_hint: "Cấu trúc lông ruột và mạng lưới mao mạch dày đặc tập trung nhiều nhất ở đâu?",
    skills: ["Cơ quan tiêu hóa", "Hấp thụ dinh dưỡng"]
  },
  {
    exercise_id: "EX_33_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.135-139",
    lesson_id: 33,
    chapter_id: "CH_VII_HUMAN_BIO",
    atom_ids: ["ATOM_33_01"],
    skill_ids: ["SKILL_CIRCULATION"],
    difficulty: 3,
    cognitive_level: "application",
    question_type: "phenomenon_explanation",
    prompt: "Tại sao khi chạy nhanh hoặc hoạt động thể dục thể thao với cường độ cao, nhịp tim và nhịp thở của chúng ta lại tăng lên nhanh chóng?",
    correct_answer: "Khi vận động mạnh, các tế bào cơ bắp phải co duỗi liên tục nên tiêu tốn rất nhiều năng lượng. Quá trình hô hấp tế bào để giải phóng năng lượng đòi hỏi cung cấp nhiều khí O2 và sản sinh nhiều khí CO2. Do đó, tim phải đập nhanh hơn để tăng cường bơm máu mang O2 và chất dinh dưỡng đến cơ, đồng thời phổi phải thở nhanh và sâu hơn để trao đổi khí kịp thời duy trì cân bằng nội môi.",
    detailed_solution: "Sự phối hợp hoạt động nhịp nhàng giữa hệ vận động, hệ tuần hoàn và hệ hô hấp nhằm đáp ứng nhu cầu năng lượng tăng cao của cơ thể.",
    socratic_hint: "Tế bào cơ cần nguyên liệu gì để tạo ra ATP khi vận động?",
    skills: ["Phối hợp cơ quan", "Sinh lý học"]
  },

  // ================= CHƯƠNG VIII: SINH VẬT VÀ MÔI TRƯỜNG (BÀI 41 - 47) =================
  {
    exercise_id: "EX_41_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.171",
    lesson_id: 41,
    chapter_id: "CH_VIII_ECOLOGY",
    atom_ids: ["ATOM_41_01"],
    skill_ids: ["SKILL_ECOLOGY_FACTORS"],
    difficulty: 2,
    cognitive_level: "comprehension",
    question_type: "multiple_choice",
    prompt: "Nhân tố nào sau đây thuộc nhóm nhân tố sinh thái vô sinh (không sống) tác động lên đời sống sinh vật?",
    options: [
      "A. Ánh sáng, nhiệt độ, độ ẩm và nồng độ khí oxy",
      "B. Cây xanh quang hợp",
      "C. Vi khuẩn phân giải trong đất",
      "D. Động vật ăn thịt cạnh tranh thức ăn"
    ],
    correct_answer: "A",
    detailed_solution: "Nhân tố sinh thái vô sinh là các yếu tố vật lý và hóa học của môi trường xung quanh như ánh sáng, nhiệt độ, nước, không khí, đất đá. Các loài sinh vật khác (cây, vi khuẩn, thú) thuộc nhóm nhân tố hữu sinh.",
    socratic_hint: "Tiền tố 'vô sinh' nghĩa là không có đặc tính của sự sống.",
    skills: ["Nhân tố sinh thái", "Phân loại môi trường"]
  },
  {
    exercise_id: "EX_46_01",
    source_type: "SGK",
    source_anchor: "SGK KHTN 8 tr.188-191",
    lesson_id: 46,
    chapter_id: "CH_VIII_ECOLOGY",
    atom_ids: ["ATOM_46_01"],
    skill_ids: ["SKILL_ECOSYSTEM_BALANCE", "SKILL_TRANSFER"],
    difficulty: 4,
    cognitive_level: "high_application",
    question_type: "transfer",
    prompt: "Ở một vùng canh tác lúa, người dân lạm dụng thuốc trừ sâu hóa học phun trên diện rộng, tiêu diệt cả các loài ếch nhái, nhện bắt mồi và chim sâu (thiên địch). Hãy dự báo hậu quả sinh thái sau vài mùa vụ đối với quần thể sâu hại lúa và năng suất mùa màng.",
    correct_answer: "Hậu quả: Sau một thời gian, sâu hại lúa sẽ bùng phát dịch bệnh nghiêm trọng với mật độ cao hơn trước rất nhiều. Lý do: Thuốc trừ sâu tiêu diệt thiên địch tự nhiên vốn làm nhiệm vụ khống chế số lượng sâu. Sâu hại có vòng đời ngắn, dễ tiến hóa kháng thuốc trừ sâu. Mất đi mắt xích kìm hãm sinh thái, hệ sinh thái mất cân bằng, dẫn tới dịch hại tàn phá lúa và giảm sút năng suất mùa màng trầm trọng, gây ô nhiễm đất và nguồn nước.",
    detailed_solution: "Hiện tượng bùng phát dịch hại thứ phát do mất cân bằng tự nhiên và mất thiên địch là bài học điển hình của quản lý dịch hại tổng hợp (IPM) trong nông nghiệp sinh thái bền vững.",
    socratic_hint: "Chuỗi thức ăn: Lúa -> Sâu hại lúa -> Ếch nhái/Chim sâu. Nếu loại bỏ mắt xích cuối cùng, số lượng mắt xích ở giữa sẽ biến động thế nào?",
    skills: ["Cân bằng tự nhiên", "Bảo vệ môi trường nông nghiệp"]
  }
];

export function getExercisesForLesson(lessonId: number): ExerciseItem[] {
  return EXERCISES_BANK.filter(e => e.lesson_id === lessonId);
}

export function getExercisesForChapter(chapterId: string): ExerciseItem[] {
  return EXERCISES_BANK.filter(e => e.chapter_id === chapterId);
}

export function getExercisesForAtom(atomId: string): ExerciseItem[] {
  return EXERCISES_BANK.filter(e => e.atom_ids.includes(atomId));
}
