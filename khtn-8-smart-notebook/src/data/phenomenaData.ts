import { PhenomenonItem } from "../types";
import { SCENARIO_PACKS_DATABASE } from "./scenarioIntelligenceData";

export const PHENOMENA_CATALOG: PhenomenonItem[] = [
  {
    id: "PHENOM_01",
    name: "Tàu thép khổng lồ hàng vạn tấn vẫn nổi trên biển",
    lessonId: 17,
    lessonTitle: "Bài 17: Lực đẩy Archimedes",
    chapterId: "CH_III_DENSITY_PRESSURE",
    context: "technology",
    observableSigns: [
      "Một cái đinh sắt nhỏ thả vào nước thì chìm ngay xuống đáy",
      "Một con tàu khổng lồ làm bằng hàng nghìn tấn thép lại nổi bồng bềnh và chở được rất nhiều hàng hoá",
      "Vạch mớn nước Plimsoll chỉ mức chìm an toàn trong các vùng nước khác nhau"
    ],
    inquiryQuestion: "Tại sao cùng làm bằng sắt thép (D_thép ≈ 7800 kg/m³ > D_nước = 1000 kg/m³), đinh sắt lại chìm mà tàu biển lại nổi?",
    scientificExplanation: "Con tàu không phải là một khối sắt đặc mà được thiết kế rỗng bên trong chứa rất nhiều không khí. Khối lượng riêng trung bình của toàn bộ con tàu (m_tàu / V_chiếm chỗ) nhỏ hơn khối lượng riêng của nước, do đó lực đẩy Archimedes F_A = d_nước * V đủ sức cân bằng với trọng lượng P của tàu.",
    relevantAtomId: "ATOM_17_01",
    experimentSuggestion: "Lấy một miếng đất nặn vo tròn thả vào nước -> chìm. Nặn miếng đất đó thành hình chiếc thuyền lòng sâu -> nổi.",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&auto=format&fit=crop&q=80",
    safetyNote: "Cẩn thận khi thao tác với chậu nước lớn, tránh làm ướt sàn nhà trơn trượt.",
    scenarioPack: SCENARIO_PACKS_DATABASE[0]
  },
  {
    id: "PHENOM_LEVER",
    name: "Cờ lê nối dài ống tuýp mở bu lông bánh xe tải",
    lessonId: 18,
    lessonTitle: "Bài 18: Tác dụng làm quay của lực. Moment lực",
    chapterId: "CH_IV_ROTATION",
    context: "technology",
    observableSigns: [
      "Người thợ dùng cờ lê ngắn 25 cm dù dùng hết sức người vẫn không thể làm nhúc nhích ốc bánh xe tải",
      "Khi lồng thêm một ống tuýp thép dài 1 mét vào cán cờ lê, người thợ chỉ cần ấn nhẹ là ốc quay ra",
      "Tay cầm đặt càng xa tâm bu lông thì việc vặn ốc càng nhẹ nhàng"
    ],
    inquiryQuestion: "Tại sao lực tác dụng của cơ bắp không đổi nhưng nối dài cán cờ lê lại làm tăng khả năng vặn quay bu lông?",
    scientificExplanation: "Tác dụng làm quay của lực lên vật quanh một trục cố định được đặc trưng bởi mômen lực M = F · d. Khi tăng khoảng cách d từ trục quay đến giá của lực lên gấp 4 lần, mômen lực M tăng gấp 4 lần với cùng một lực F, tạo đủ mômen để vượt lực cản ma sát của ốc.",
    relevantAtomId: "ATOM_18_01",
    experimentSuggestion: "Dùng thước dẹt có gắn quả nặng ở các khoảng cách khác nhau so với trục quay để cảm nhận lực cản quay.",
    imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=900&auto=format&fit=crop&q=80",
    safetyNote: "Khi thử nghiệm với đòn bẩy dài, chú ý kiểm tra độ chắc chắn của ống thép để tránh trượt tay gãy cán.",
    scenarioPack: SCENARIO_PACKS_DATABASE[1]
  },
  {
    id: "PHENOM_MASS",
    name: "Thí nghiệm đốt nến trong bình kín trên cân điện tử",
    lessonId: 5,
    lessonTitle: "Bài 5: Định luật bảo toàn khối lượng và phương trình hóa học",
    chapterId: "CH_I_CHEM",
    context: "school",
    observableSigns: [
      "Nến sáp cháy một lúc rồi tắt trong bình thủy tinh đậy kín",
      "Xuất hiện các hạt sương nước li ti đọng trên thành trong của bình",
      "Số chỉ của cân điện tử trước và sau phản ứng không thay đổi dù chỉ 0.01 g (m = 350.28 g)"
    ],
    inquiryQuestion: "Cây nến bị cháy ngắn dần, tại sao tổng khối lượng của hệ bình và nến trên cân lại không hề suy suyển?",
    scientificExplanation: "Phản ứng đốt nến (Paraffin + Oxygen -> Carbon dioxide + Nước) diễn ra trong hệ kín. Các nguyên tử Carbon, Hydrogen và Oxygen chỉ tái sắp xếp lại liên kết hóa học để tạo chất mới chứ không mất đi hay sinh thêm. Do đó tổng khối lượng được bảo toàn nguyên vẹn: m_chất_tham_gia = m_sản_phẩm.",
    relevantAtomId: "ATOM_05_01",
    experimentSuggestion: "Đốt nến trong bình tam giác đậy nút cao su đặt trên cân điện tử; dẫn khí sau phản ứng qua nước vôi trong.",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&auto=format&fit=crop&q=80",
    safetyNote: "Chú ý khi dùng diêm thắp nến; để bình thủy tinh nguội hẳn trước khi cất dọn.",
    scenarioPack: SCENARIO_PACKS_DATABASE[2]
  },
  {
    id: "PHENOM_PH_SOIL",
    name: "Khử chua đất phèn bằng vôi bột dựa trên chỉ thị màu pH",
    lessonId: 9,
    lessonTitle: "Bài 9: Base. Thang pH",
    chapterId: "CH_II_COMPOUND",
    context: "production_or_agriculture",
    observableSigns: [
      "Đất ruộng phèn làm rễ lúa cháy đen, lá úa vàng do nồng độ acid quá cao",
      "Dải giấy chỉ thị màu vạn năng nhúng vào nước đất đổi sang màu cam đỏ (pH ≈ 4.2)",
      "Sau khi rải vôi bột (CaO) và thau rửa nước, đo lại thấy giấy chuyển sang màu vàng lục trung tính (pH ≈ 6.5)"
    ],
    inquiryQuestion: "Màu sắc của chất chỉ thị phản ánh tính chất gì của đất, và vôi bột đã trung hòa độ chua như thế nào?",
    scientificExplanation: "Màu cam đỏ cho biết dung dịch đất có pH = 4.2 < 7 mang tính acid chứa nhiều ion H+. Vôi sống CaO hoặc vôi tôi Ca(OH)2 hòa tan phân li ra ion OH- có tính base mạnh, thực hiện phản ứng trung hòa H+ + OH- -> H2O, nâng pH lên vùng thích hợp cho cây hấp thụ dinh dưỡng.",
    relevantAtomId: "ATOM_09_01",
    experimentSuggestion: "Lấy mẫu giấm ăn và baking soda thử với nước luộc bắp cải tím để quan sát dải đổi màu đỏ - tím - xanh.",
    imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=900&auto=format&fit=crop&q=80",
    safetyNote: "Vôi bột khi gặp nước tỏa nhiệt mạnh, cần đeo khẩu trang và găng tay khi bón vôi.",
    scenarioPack: SCENARIO_PACKS_DATABASE[3]
  },
  {
    id: "PHENOM_HEART",
    name: "Biến thiên nhịp tim và huyết áp học sinh sau khi chạy 100 mét",
    lessonId: 33,
    lessonTitle: "Bài 33: Máu và hệ tuần hoàn của cơ thể người",
    chapterId: "CH_VII_HUMAN_BIO",
    context: "health_safety",
    observableSigns: [
      "Sau khi chạy nhanh 100m, lồng ngực đập dồn dập, thở gấp, mồ hôi toát ra",
      "Màn hình máy đo huyết áp điện tử ghi nhận nhịp tim tăng vọt từ 72 lên 135 bpm",
      "Huyết áp tâm thu tăng từ 115 mmHg lên 140 mmHg để đáp ứng dòng máu áp lực cao"
    ],
    inquiryQuestion: "Tại sao tim lại phải đập nhanh và mạnh hơn khi các bó cơ chân tay vận động cường độ cao?",
    scientificExplanation: "Khi cơ bắp vận động mạnh, nhu cầu năng lượng ATP và khí Oxygen tăng vọt, đồng thời sản sinh lượng lớn khí CO2 và acid lactic. Tim bắt buộc phải tăng tần số và lực co bóp để luân chuyển máu nhanh qua vòng tuần hoàn lớn (cung cấp O2 cho cơ) và vòng tuần hoàn nhỏ (thải CO2 ở phổi).",
    relevantAtomId: "ATOM_33_01",
    experimentSuggestion: "Dùng ngón trỏ và ngón giữa bắt mạch quay ở cổ tay, đếm số nhịp đập trong 1 phút trước và sau khi nhảy dây 30 cái.",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900&auto=format&fit=crop&q=80",
    safetyNote: "Sau khi chạy gắng sức, không được ngồi bệt xuống ngay mà phải đi bộ thả lỏng hít thở sâu để tránh tụt huyết áp tư thế.",
    scenarioPack: SCENARIO_PACKS_DATABASE[4]
  },
  {
    id: "PHENOM_ECO_RICE",
    name: "Chuỗi thức ăn & cân bằng sinh thái trên cánh đồng lúa nước",
    lessonId: 44,
    lessonTitle: "Bài 44: Hệ sinh thái",
    chapterId: "CH_VIII_ECOLOGY",
    context: "environment_or_community",
    observableSigns: [
      "Ruộng lúa sau khi phun thuốc trừ sâu hóa học phổ rộng bị bùng phát dịch rầy nâu dữ dội hơn",
      "Các loài thiên địch như nhện giăng bẫy, bọ rùa và ếch nhái biến mất sau đợt phun thuốc",
      "Ruộng lúa áp dụng mô hình bờ hoa dẫn dụ thiên địch sinh trưởng xanh tốt mà không cần phun thuốc sâu"
    ],
    inquiryQuestion: "Tại sao việc tiêu diệt toàn bộ côn trùng lại khiến dịch sâu hại bùng phát mạnh mẽ hơn?",
    scientificExplanation: "Hệ sinh thái đồng ruộng duy trì cân bằng tự nhiên nhờ mạng lưới thức ăn: Lúa (sản xuất) -> Rầy nâu (tiêu thụ 1) -> Nhện/Bọ rùa (thiên địch, tiêu thụ 2). Thuốc hóa học tiêu diệt cả hai, nhưng thiên địch sinh sản chậm hơn rầy nâu nhiều lần. Khi mất thiên địch kiềm chế, rầy nâu sống sót hoặc di cư đến bùng nổ dân số thành đại dịch.",
    relevantAtomId: "ATOM_44_01",
    experimentSuggestion: "Điều tra thành phần sinh vật tại một góc vườn trường hoặc bờ ruộng: lập bảng đếm số loài sản xuất, tiêu thụ và phân giải.",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&auto=format&fit=crop&q=80",
    safetyNote: "Khi đi thực địa đồng ruộng, cần đi ủng bảo hộ để tránh vật sắc nhọn và côn trùng cắn.",
    scenarioPack: SCENARIO_PACKS_DATABASE[5]
  },
  {
    id: "PHENOM_02",
    name: "Cọ xát quả bóng bay vào tóc làm bóng hút được vụn giấy và dính vào tường",
    lessonId: 20,
    lessonTitle: "Bài 20: Hiện tượng nhiễm điện do cọ xát",
    chapterId: "CH_V_ELECTRICITY",
    context: "home",
    observableSigns: [
      "Sau khi chà xát bóng cao su vào tóc khô nhiều lần, đưa lại gần các mẩu giấy vụn thì giấy bị hút nhảy lên quả bóng",
      "Đặt quả bóng áp vào tường phẳng, quả bóng tự dính chặt vào tường mà không cần keo dán"
    ],
    inquiryQuestion: "Lực nào đã giữ các mẩu giấy vụn và giữ quả bóng dính vào tường?",
    scientificExplanation: "Khi cọ xát, các hạt electron tích điện âm bị bứt ra từ tóc và truyền sang quả bóng cao su. Quả bóng bị nhiễm điện âm. Vật nhiễm điện có khả năng hút các vật nhẹ (vụn giấy) và cảm ứng hút bề mặt tường trung hoà điện.",
    relevantAtomId: "ATOM_20_01",
    experimentSuggestion: "Dùng lược nhựa chải tóc khô rồi đưa lại gần dòng nước nhỏ chảy từ vòi -> dòng nước bị uốn cong.",
    safetyNote: "Thực hiện trong phòng khô ráo; nếu không khí ẩm ướt hơi nước sẽ làm điện tích nhanh tiêu tán."
  },
  {
    id: "PHENOM_04",
    name: "Xe tăng hạng nặng hàng chục tấn đi trên đầm lầy không bị lún",
    lessonId: 15,
    lessonTitle: "Bài 15: Áp suất trên một bề mặt",
    chapterId: "CH_III_DENSITY_PRESSURE",
    context: "technology",
    observableSigns: [
      "Một chiếc ô tô con 1,5 tấn đi vào bãi bùn lầy bị lún ngập bánh xe không thể di chuyển",
      "Một chiếc xe tăng nặng tới 40 tấn chạy băng băng qua bãi cát và đầm lầy mà chỉ để lại vệt xích mờ"
    ],
    inquiryQuestion: "Tại sao vật nặng hơn gấp 30 lần lại gây lún ít hơn vật nhẹ?",
    scientificExplanation: "Độ lún của mặt đất phụ thuộc vào áp suất p = F / S. Xe tăng sử dụng bản xích rất rộng với diện tích tiếp xúc S khổng lồ (vài mét vuông), khiến áp suất p tác dụng lên nền đất thậm chí còn nhỏ hơn áp suất dưới lốp cao su diện tích hẹp của xe con.",
    relevantAtomId: "ATOM_15_01",
    experimentSuggestion: "Dùng một khối gạch đặt lên khay cát mịn: đặt theo mặt có diện tích nhỏ nhất (lún sâu) và đặt theo mặt diện tích lớn nhất (lún nông).",
    safetyNote: "Quan sát cẩn thận và đo độ sâu vết lún bằng thước chia vạch."
  },
  {
    id: "PHENOM_05",
    name: "Thợ lặn biển sâu phải mặc đồ chịu áp suất cao và ngoi lên từ từ",
    lessonId: 16,
    lessonTitle: "Bài 16: Áp suất chất lỏng. Áp suất khí quyển",
    chapterId: "CH_III_DENSITY_PRESSURE",
    context: "health_safety",
    observableSigns: [
      "Càng lặn sâu xuống nước, tai càng có cảm giác đau tức khó chịu",
      "Thợ lặn dưới độ sâu hàng trăm mét bắt buộc phải dùng bộ đồ kim loại kín chịu áp lực và khi ngoi lên mặt nước phải dừng lại từng bậc"
    ],
    inquiryQuestion: "Tại sao áp suất chất lỏng lại tăng theo độ sâu và điều gì xảy ra với cơ thể người?",
    scientificExplanation: "Áp suất chất lỏng tuân theo công thức p = d * h. Càng xuống sâu, độ cao cột nước h phía trên càng lớn, áp suất nén lên cơ thể tăng cực nhanh (cứ mỗi 10m sâu tăng thêm xấp xỉ 1 atm). Khi ngoi lên đột ngột, khí nitơ hoà tan trong máu sẽ sủi bọt gây tắc mạch máu rất nguy hiểm (bệnh giảm áp).",
    relevantAtomId: "ATOM_16_01",
    experimentSuggestion: "Đục 3 lỗ nhỏ ở các độ cao khác nhau trên một chai nhựa chứa đầy nước -> tia nước ở lỗ đáy phun ra xa nhất.",
    safetyNote: "Thực hiện trên chậu hứng nước để không làm ướt sàn."
  },
  {
    id: "PHENOM_06",
    name: "Khe hở co giãn trên đường ray xe lửa và các nhịp cầu bê tông",
    lessonId: 29,
    lessonTitle: "Bài 29: Sự nở vì nhiệt",
    chapterId: "CH_VI_HEAT",
    context: "technology",
    observableSigns: [
      "Tại chỗ nối giữa hai thanh ray xe lửa luôn có một khe hở nhỏ vài milimet",
      "Trên các cây cầu thép, cầu bê tông lớn đều có các khe răng lược co giãn bằng kim loại"
    ],
    inquiryQuestion: "Nếu người thợ hàn kín các thanh ray sát vào nhau thì điều gì sẽ xảy ra vào mùa hè oi bức?",
    scientificExplanation: "Chất rắn nở ra khi nóng lên. Vào mùa hè nhiệt độ mặt ray có thể lên đến 50-60°C. Nếu không có khe hở, sự giãn nở bị ngăn cản sẽ sinh ra lực cực kỳ lớn làm cong vênh thanh ray, gây trật bánh lật tàu.",
    relevantAtomId: "ATOM_29_01",
    experimentSuggestion: "Dùng bộ thí nghiệm quả cầu kim loại và vòng kim loại: khi nguội quả cầu lọt qua vòng; sau khi hơ nóng bằng đèn cồn, quả cầu nở ra và không lọt qua vòng nữa.",
    safetyNote: "Quả cầu kim loại sau khi hơ đèn cồn rất nóng, không được chạm tay trực tiếp."
  }
];
