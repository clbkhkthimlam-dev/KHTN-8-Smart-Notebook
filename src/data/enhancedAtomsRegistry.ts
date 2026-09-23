import { KnowledgeAtom, ContextClass } from "../types";

/**
 * KHTN 8 SMART NOTEBOOK — ENHANCED KNOWLEDGE ATOMS REGISTRY
 * Fully compliant with 00_MASTER_ORCHESTRATOR_DEEP.md and 01 to 09 TOPIC MD specifications.
 * Each atom contains:
 * - 6 Multidimensional Scenarios (home, school, technology, production/agriculture, environment, problem solving)
 * - Misconceptions & Counterexamples
 * - Diagnostic Question with Common Wrong Reasons & Socratic Hints
 * - Transfer Task with Deliverables & Evaluation Criteria
 * - Curated Web Resources (PhET, Khan Academy, Wikimedia Commons, Open Data)
 */

export const ENHANCED_ATOMS_MAP: Record<number, KnowledgeAtom[]> = {
  // ==========================================
  // CHUYÊN ĐỀ 1: 01_LAB_SAFETY_TOPIC (Bài 1)
  // ==========================================
  1: [
    {
      atom_id: "ATOM_01_SAFETY_SIGNS",
      lesson_id: 1,
      topic: "Nhãn cảnh báo và Quy tắc An toàn Phòng thí nghiệm",
      title: "Hệ thống nhãn cảnh báo GHS và An toàn hóa chất",
      concept_type: "safety",
      source_anchors: ["SGK KHTN 8 Kết nối tri thức tr.6-8", "SGV KHTN 8 tr.21-23"],
      statement: "Các biểu tượng cảnh báo nguy hiểm (chất ăn mòn, dễ cháy, độc hại, kích ứng) chỉ định chính xác mức độ rủi ro và trang bị bảo hộ cá nhân (PPE) bắt buộc khi thao tác.",
      canonical_explanation: "Hóa chất trong phòng thí nghiệm có nồng độ cao và hoạt tính mạnh hơn nhiều so với hóa chất gia dụng. Việc nhận diện đúng nhãn cảnh báo giúp người làm thí nghiệm lựa chọn đồ bảo hộ (kính mắt, găng tay cao su, áo blouse) và phương pháp xử lý sự cố tràn đổ phù hợp.",
      terms: ["GHS", "Chất ăn mòn", "Chất dễ cháy", "PPE", "Bỏng hóa chất", "Đèn cồn"],
      conditions: "Áp dụng cho 100% hóa chất, dụng cụ thủy tinh và nguồn nhiệt điện trong phòng thực hành KHTN.",
      representations: ["text", "diagram", "simulation"],
      prerequisites: ["Nội quy học sinh", "Quy tắc an toàn KHTN 6, 7"],
      postrequisites: ["ATOM_02_REACTIONS", "ATOM_08_ACID", "ATOM_09_BASE"],
      related_atoms: ["ATOM_08_ACID", "ATOM_09_BASE"],
      examples: [
        "Chai acid H2SO4 đặc có nhãn hình chất lỏng ăn mòn tay và kim loại.",
        "Lọ cồn 96 độ có biểu tượng ngọn lửa cảnh báo chất dễ cháy.",
        "Lọ muối CuSO4 có biểu tượng nguy hại môi trường nước."
      ],
      counterexamples: [
        "Nước cất và cồn sát khuẩn 70 độ đều là chất lỏng trong suốt không màu, nhưng cồn dễ cháy còn nước cất thì không.",
        "Giấm ăn 5% ở nhà có thể nếm được, nhưng dung dịch acetic acid trong phòng thí nghiệm tuyệt đối không được nếm hoặc hít trực tiếp."
      ],
      misconceptions: [
        {
          code: "MIS_LAB_01",
          description: "Cho rằng hóa chất không có màu và không có mùi thì vô hại như nước lọc.",
          counterExample: "Dung dịch acid loãng (HCl) hoặc base (NaOH) trong suốt không màu nhưng gây tổn thương niêm mạc mắt và da nếu tiếp xúc.",
          repairStrategy: "Yêu cầu học sinh đọc nhãn hoá chất và dùng phương pháp phẩy tay ngửi từ xa thay vì hít trực tiếp."
        }
      ],
      contexts: [
        {
          id: "CTX_01_HOME",
          contextClass: "home",
          title: "Đọc nhãn nước tẩy rửa bồn cầu gia đình",
          phenomenon: "Chai nước tẩy rửa gia đình chứa acid HCl có biểu tượng hình đôi bàn tay bị ăn mòn và cảnh báo 'Không tiếp xúc trực tiếp'.",
          observation: "Nếu không đeo găng tay khi cọ rửa, da tay sẽ bị rát đỏ và bong tróc.",
          question: "Tại sao không được đổ nước tẩy rửa bồn cầu chứa acid chung với nước tẩy javel chứa base/chlorine?",
          explanationRoute: "Phản ứng giữa dung dịch acid và dung dịch javel tạo ra khí chlorine (Cl2) màu vàng lục, rất độc hại cho đường hô hấp.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_01_SCHOOL",
          contextClass: "school",
          title: "Quy trình đun dung dịch trong ống nghiệm bằng đèn cồn",
          phenomenon: "Trong giờ thực hành, học sinh dùng kẹp gỗ nghiêng ống nghiệm 45 độ và hơ đều dọc thân ống trước khi đun tập trung ở đáy.",
          observation: "Nếu đun ngay vào một điểm ở đáy, chất lỏng sôi bùng bắn ra ngoài hoặc ống nghiệm bị nứt.",
          question: "Vì sao phải luôn hướng miệng ống nghiệm về phía không có người?",
          explanationRoute: "Hiện tượng sôi đột ngột có thể làm dung dịch nóng bắn ra khỏi miệng ống nghiệm gây bỏng hóa chất cho bạn học đối diện.",
          evidenceSource: "sgv_context"
        },
        {
          id: "CTX_01_TECH",
          contextClass: "technology",
          title: "Cảm biến rò rỉ khí gas và hóa chất thông minh",
          phenomenon: "Phòng thí nghiệm hiện đại lắp đặt các đầu dò cảm biến khí gas (MQ-2, MQ-135) nối với còi báo động tự động.",
          observation: "Khi có khí dễ cháy rò rỉ đạt nồng độ giới hạn dưới, hệ thống lập tức ngắt van điện tử và bật quạt hút thông gió.",
          question: "Cảm biến hoạt động dựa trên sự thay đổi tính chất vật lý nào của chất bán dẫn?",
          explanationRoute: "Khi phân tử khí khử tiếp xúc với oxit kim loại nung nóng, độ dẫn điện của cảm biến tăng lên, kích hoạt tín hiệu báo động.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_01_PRODUCTION",
          contextClass: "production_or_agriculture",
          title: "Bảo hộ lao động trong nhà máy pha chế thuốc bảo vệ thực vật",
          phenomenon: "Công nhân pha chế thuốc trừ sâu nông nghiệp bắt buộc phải mặc trang phục phòng độc chuyên dụng loại 4 và mặt nạ lọc than hoạt tính.",
          observation: "Thuốc trừ sâu hữu cơ có độc tính cao, có thể thẩm thấu qua da hoặc bay hơi vào phổi.",
          question: "Biểu tượng đầu lâu xương chéo trên bao bì thuốc trừ sâu mang ý nghĩa cảnh báo gì?",
          explanationRoute: "Cảnh báo độc tính cấp tính cao (Acute Toxicity), có thể gây tử vong hoặc ngộ độc nặng nếu nuốt, hít phải hoặc dính vào da.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_01_ENVIRONMENT",
          contextClass: "environment_or_community",
          title: "Thu gom và xử lý rác thải hóa chất phòng thí nghiệm trường học",
          phenomenon: "Sau giờ thực hành, dung dịch chứa ion kim loại nặng (Cu2+, Pb2+) được đổ vào bình chứa chất thải nguy hại riêng thay vì đổ thẳng vào bồn rửa.",
          observation: "Dung dịch đổ thẳng vào cống rãnh ngấm vào nguồn nước ngầm và đất vườn trường.",
          question: "Tại sao cấm tuyệt đối đổ hóa chất thí nghiệm chưa trung hòa vào cống thoát nước công cộng?",
          explanationRoute: "Hóa chất vô cơ và kim loại nặng không bị phân hủy sinh học, sẽ tích tụ sinh học trong chuỗi thức ăn gây hại sức khỏe cộng đồng.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_01_PROBLEM_SOLVING",
          contextClass: "decision_or_problem_solving",
          title: "Xử lý sự cố đổ tràn dung dịch acid sulfuric đặc ra bàn thực hành",
          phenomenon: "Một học sinh vô ý làm đổ 20 mL H2SO4 đậm đặc xuống mặt bàn gỗ phòng thí nghiệm.",
          observation: "Acid làm cháy xém mặt gỗ và bắt đầu bốc khói nhẹ.",
          question: "Hành động sơ cấp cứu nào sau đây là ĐÚNG ĐẮN NHẤT ngay tại thời điểm đó?",
          explanationRoute: "Rắc ngay bột sodium hydrogen carbonate (baking soda NaHCO3) hoặc cát khô để trung hòa acid, tuyệt đối không xối trực tiếp lượng nước nhỏ vì sẽ gây tỏa nhiệt sôi bắn acid.",
          evidenceSource: "sgv_context"
        }
      ],
      applications: [
        "Kiểm tra và dán nhãn an toàn chuẩn GHS cho toàn bộ hóa chất trong phòng thí nghiệm trường học.",
        "Xây dựng nội quy và sơ đồ thoát hiểm, vị trí bình chữa cháy CO2 và bồn rửa mắt khẩn cấp.",
        "Ứng dụng phân loại rác thải nguy hại và chất thải sinh hoạt tại gia đình và trường học."
      ],
      use_cases: ["Đọc nhãn cảnh báo", "Chọn trang bị bảo hộ PPE", "Sơ cứu khi hoá chất dính vào da"],
      diagnostic_question: {
        question: "Khi thực hiện đun nóng dung dịch trong ống nghiệm bằng ngọn lửa đèn cồn, thao tác nào sau đây là SAI?",
        options: [
          "A. Kẹp ống nghiệm ở khoảng 1/3 thân ống tính từ miệng ống xuống.",
          "B. Hơ đều toàn bộ ống nghiệm qua ngọn lửa trước khi đun tập trung tại đáy.",
          "C. Để đáy ống nghiệm chạm hẳn vào bấc đèn cồn để hấp thu nhiệt nhanh nhất.",
          "D. Hướng miệng ống nghiệm về phía tường hoặc nơi không có người."
        ],
        correctIndex: 2,
        commonWrongReason: "Học sinh lầm tưởng rằng để đáy ống chạm sát bấc đèn cồn sẽ nóng nhanh hơn.",
        socraticHint: "Hãy nhớ lại: Ngọn lửa đèn cồn có 3 vùng nhiệt độ khác nhau. Vùng nào có nhiệt độ cao nhất và không làm bám muội đen lên đáy ống nghiệm?"
      },
      transfer_task: {
        title: "Bản Kiểm Toán An Toàn Phòng Thí Nghiệm (Lab Safety Audit)",
        context: "Em được phân công làm Trưởng ban An toàn cho giờ thực hành Hóa học lớp 8.",
        task: "Hãy lập một checklist gồm 5 mục kiểm tra trước giờ học, 3 quy tắc trong giờ học và 2 quy trình xử lý sự cố (hóa chất dính da, hóa chất tràn đổ).",
        deliverables: "Bảng infographic hoặc phiếu kiểm toán an toàn chuẩn định dạng A4.",
        evaluationCriteria: "Đúng chuẩn SGK KHTN 8, có các biện pháp cụ thể, nêu rõ loại trang bị bảo hộ và nguyên tắc sơ cứu."
      },
      web_resources: [
        {
          resource_id: "RES_01_PHET_LAB",
          url: "https://phet.colorado.edu/en/simulations/filter?subjects=chemistry&type=html",
          title: "PhET Interactive Simulations - Chemistry Suite",
          source_type: "phet",
          grade_fit: "Middle School (Grade 8)",
          license: "CC-BY 4.0 Creative Commons",
          trust_score: 98,
          evidence_excerpt: "Phần mềm mô phỏng thí nghiệm trực tuyến chuẩn quốc tế do Đại học Colorado phát triển."
        },
        {
          resource_id: "RES_01_WIKI_GHS",
          url: "https://commons.wikimedia.org/wiki/Category:GHS_hazard_pictograms",
          title: "Wikimedia Commons: GHS Hazard Pictograms Vector Graphics",
          source_type: "wikimedia",
          grade_fit: "Middle School (Grade 8)",
          license: "Public Domain / CC-0",
          trust_score: 95,
          evidence_excerpt: "Bộ biểu tượng cảnh báo nguy hại toàn cầu chuẩn hóa GHS sắc nét cho giáo dục khoa học."
        }
      ],
      status: "PUBLISHED"
    }
  ],

  // ==========================================
  // CHUYÊN ĐỀ 2: 02_CHEMICAL_REACTIONS_TOPIC (Bài 2-7)
  // ==========================================
  2: [
    {
      atom_id: "ATOM_02_REACTION_ESSENCE",
      lesson_id: 2,
      topic: "Bản chất Phản ứng Hóa học và Năng lượng Phản ứng",
      title: "Phản ứng hóa học và Biến đổi năng lượng (Tỏa nhiệt / Thu nhiệt)",
      concept_type: "process",
      source_anchors: ["SGK KHTN 8 Kết nối tri thức tr.11-15", "SGV KHTN 8 tr.26-29"],
      statement: "Trong phản ứng hóa học, liên kết giữa các nguyên tử bị phá vỡ và các liên kết mới được hình thành, dẫn đến sự tạo thành chất mới kèm theo sự giải phóng hoặc hấp thu năng lượng.",
      canonical_explanation: "Phản ứng tỏa nhiệt là phản ứng giải phóng năng lượng dưới dạng nhiệt ra môi trường xung quanh (làm nhiệt độ môi trường tăng). Phản ứng thu nhiệt là phản ứng hấp thu năng lượng nhiệt từ môi trường (làm nhiệt độ môi trường giảm). Số lượng nguyên tử của mỗi nguyên tố được bảo toàn tuyệt đối trước và sau phản ứng.",
      terms: ["Chất phản ứng", "Sản phẩm", "Liên kết hóa học", "Phản ứng tỏa nhiệt", "Phản ứng thu nhiệt"],
      conditions: "Cần các điều kiện thích hợp: tiếp xúc bề mặt, nhiệt độ kích hoạt, chất xúc tác hoặc ánh sáng.",
      representations: ["text", "formula", "diagram", "simulation"],
      prerequisites: ["Nguyên tử, phân tử KHTN 7", "ATOM_01_SAFETY_SIGNS"],
      postrequisites: ["ATOM_03_MOL", "ATOM_05_CONSERVATION_MASS", "ATOM_07_RATE"],
      related_atoms: ["ATOM_05_CONSERVATION_MASS", "ATOM_07_RATE"],
      examples: [
        "Đốt cháy than củi (carbon + oxygen -> carbon dioxide) tỏa nhiệt lượng lớn để nấu chín thức ăn.",
        "Nung đá vôi (CaCO3 -> CaO + CO2) là phản ứng thu nhiệt, cần cung cấp nhiệt liên tục.",
        "Hòa tan viên sủi bọt vitamin C vào nước làm nước mát lạnh đi (phản ứng thu nhiệt)."
      ],
      counterexamples: [
        "Nước sôi bốc hơi thành hơi nước là biến đổi vật lý (chuyển thể), không phải phản ứng hóa học vì không sinh ra chất mới.",
        "Bẻ cong thanh sắt làm thay đổi hình dạng là biến đổi vật lý, trong khi thanh sắt bị gỉ sét biến thành gỉ sắt Fe2O3.nH2O là phản ứng hóa học."
      ],
      misconceptions: [
        {
          code: "MIS_CHEM_02",
          description: "Nghĩ rằng phản ứng hóa học làm biến mất các nguyên tử ban đầu và tạo ra các nguyên tử hoàn toàn mới.",
          counterExample: "Đốt cháy xăng dầu trong động cơ sinh ra CO2 và H2O: các nguyên tử C và H từ xăng kết hợp với O trong không khí, không có nguyên tử nào bị phá hủy.",
          repairStrategy: "Sử dụng mô hình phân tử ghép hạt để học sinh tự tháo liên kết và lắp ráp lại các phân tử sản phẩm."
        }
      ],
      contexts: [
        {
          id: "CTX_02_HOME",
          contextClass: "home",
          title: "Túi chườm nóng và túi chườm lạnh khẩn cấp",
          phenomenon: "Túi chườm nóng dã ngoại bóp mạnh sẽ tự nóng lên đến 50 độ C; túi chườm thể thao bóp ra lại lạnh buốt giảm đau.",
          observation: "Túi nóng dựa trên phản ứng oxy hóa bột sắt tỏa nhiệt; túi lạnh dựa trên sự hòa tan muối ammonium nitrate thu nhiệt.",
          question: "Tại sao sau khi bóp túi chườm lạnh đặt vào chỗ trẹo chân lại có cảm giác mát lạnh tức thì?",
          explanationRoute: "Quá trình hòa tan thu nhiệt mạnh từ vùng da tiếp xúc làm hạ nhiệt độ, co mạch máu giảm sưng đau tức thì.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_02_SCHOOL",
          contextClass: "school",
          title: "Thí nghiệm vôi sống tác dụng với nước (tôi vôi)",
          phenomenon: "Thầy giáo cho một mẩu vôi sống CaO vào cốc nước, nước bắt đầu sôi sùng sục và tỏa nhiều hơi khói nóng.",
          observation: "Đáy cốc thủy tinh nóng rực, thành cốc mờ sương do hơi nước bốc lên.",
          question: "Phản ứng tôi vôi là phản ứng tỏa nhiệt hay thu nhiệt? Hãy chỉ ra bằng chứng quan sát được.",
          explanationRoute: "Là phản ứng tỏa nhiệt mạnh vì nhiệt độ của hệ phản ứng tăng cao làm nước sôi bốc hơi mãnh liệt.",
          evidenceSource: "sgv_context"
        },
        {
          id: "CTX_02_TECH",
          contextClass: "technology",
          title: "Túi khí an toàn trên xe ô tô (Airbag)",
          phenomenon: "Khi xe ô tô va chạm mạnh ở tốc độ cao, túi khí bung ra chỉ trong 0.03 giây để bảo vệ tính mạng tài xế.",
          observation: "Túi phồng căng nhờ phản ứng phân hủy cực nhanh của hợp chất sodium azide (NaN3) tạo lượng lớn khí N2.",
          question: "Yếu tố nào chứng minh túi khí bung ra là kết quả của một phản ứng hóa học?",
          explanationRoute: "Từ chất rắn sodium azide đã sinh ra chất khí mới hoàn toàn là khí nitrogen (N2) không màu, không độc hại.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_02_PRODUCTION",
          contextClass: "production_or_agriculture",
          title: "Nung vôi công nghiệp trong lò thủ công và lò đứng",
          phenomenon: "Để sản xuất vôi tôi xây dựng, người ta phải đốt than liên tục suốt ngày đêm để nung đá vôi ở nhiệt độ trên 900 độ C.",
          observation: "Nếu ngừng cung cấp than (ngừng cung cấp nhiệt), phản ứng phân hủy đá vôi CaCO3 lập tức dừng lại.",
          question: "Tại sao quá trình nung vôi bắt buộc phải cung cấp nhiệt liên tục?",
          explanationRoute: "Vì phản ứng nhiệt phân CaCO3 là phản ứng thu nhiệt, hệ cần nhận năng lượng nhiệt từ bên ngoài để phá vỡ liên kết trong mạng tinh thể.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_02_ENVIRONMENT",
          contextClass: "environment_or_community",
          title: "Hiện tượng cháy rừng và phát thải khí nhà kính",
          phenomenon: "Cháy rừng vào mùa khô giải phóng lượng nhiệt khổng lồ kèm theo hàng triệu tấn tro bụi và khí CO2 vào bầu khí quyển.",
          observation: "Rừng bị thiêu rụi, nhiệt độ khu vực tăng cao, khói mù làm suy giảm chất lượng không khí.",
          question: "Dấu hiệu nào cho thấy cháy rừng là phản ứng hóa học tỏa nhiệt mãnh liệt?",
          explanationRoute: "Sự phát quang (ngọn lửa), tỏa nhiệt độ cao hàng nghìn độ C và tạo chất mới (khí CO2, hơi nước, tro than).",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_02_PROBLEM_SOLVING",
          contextClass: "decision_or_problem_solving",
          title: "Thiết kế bữa ăn tự sôi cho học sinh đi cắm trại vùng cao",
          phenomenon: "Học sinh đi dã ngoại không được dùng lửa nhưng cần hâm nóng hộp cơm thịt kho trong thời tiết 10 độ C.",
          observation: "Gói gia nhiệt chứa hỗn hợp bột nhôm, vôi sống và muối ăn khi gặp nước sẽ phản ứng tạo nhiệt độ sôi 100 độ C trong 15 phút.",
          question: "Em hãy giải thích cơ chế khoa học giúp hộp cơm tự sôi mà không cần đốt lửa hay cắm điện.",
          explanationRoute: "Tận dụng phản ứng tỏa nhiệt mạnh giữa vôi sống (CaO), bột Al với nước để làm nóng thức ăn nhanh chóng và an toàn.",
          evidenceSource: "sgv_context"
        }
      ],
      applications: [
        "Thiết kế gói tự sôi cho thực phẩm tiện lợi và khẩu phần dã chiến quân sự.",
        "Kiểm soát nhiệt độ trong các lò phản ứng công nghiệp hóa chất để tránh cháy nổ.",
        "Ứng dụng phản ứng thu nhiệt để chế tạo túi hạ sốt và bảo quản vắc xin trong vận chuyển."
      ],
      use_cases: ["Nhận diện dấu hiệu phản ứng", "Phân biệt tỏa nhiệt và thu nhiệt", "Giải thích cơ chế nấu ăn tự sôi"],
      diagnostic_question: {
        question: "Hiện tượng nào sau đây là biến đổi hóa học?",
        options: [
          "A. Cồn để trong lọ không đậy nắp bị bay hơi cạn dần.",
          "B. Đinh sắt để ngoài không khí ẩm lâu ngày bị phủ một lớp gỉ màu nâu đỏ.",
          "C. Hòa tan đường kính vào nước thu được dung dịch nước đường trong suốt.",
          "D. Nến parafin nóng chảy khi được đặt gần nguồn nhiệt."
        ],
        correctIndex: 1,
        commonWrongReason: "Học sinh dễ nhầm hiện tượng nến nóng chảy hoặc đường tan là biến đổi hóa học vì thấy trạng thái thay đổi.",
        socraticHint: "Hãy tự hỏi: Trong trường hợp nào thì bản chất chất bị thay đổi và sinh ra chất mới có tính chất khác hẳn chất ban đầu?"
      },
      transfer_task: {
        title: "Dự án STEM: Chế tạo Bình Giữ Nhiệt / Túi Sưởi Tự Phản Ứng",
        context: "Trường phát động cuộc thi 'Sáng tạo xanh: Năng lượng cho mùa đông vùng cao'.",
        task: "Lựa chọn 1 phản ứng hóa học tỏa nhiệt an toàn (từ các nguyên liệu nhà bếp: baking soda, giấm, vôi bột, muối ăn, oxy già) để thiết kế mô hình túi sưởi tay mini.",
        deliverables: "Bản vẽ thiết kế, video hoặc phiếu ghi nhận nhiệt độ trước và sau phản ứng kèm giải thích cơ chế.",
        evaluationCriteria: "Vật liệu an toàn, nhiệt độ tăng tối thiểu 15°C, giải thích đúng cơ chế liên kết hóa học và bảo toàn khối lượng."
      },
      web_resources: [
        {
          resource_id: "RES_02_PHET_REACT",
          url: "https://phet.colorado.edu/en/simulations/balancing-chemical-equations",
          title: "PhET Simulation: Cân Bằng Phương Trình Hóa Học",
          source_type: "phet",
          grade_fit: "Middle School (Grade 8)",
          license: "CC-BY 4.0",
          trust_score: 99,
          evidence_excerpt: "Công cụ trực quan hóa việc bảo toàn số nguyên tử và sắp xếp lại liên kết trong phản ứng hóa học."
        }
      ],
      status: "PUBLISHED"
    }
  ],

  // ==========================================
  // CHUYÊN ĐỀ 3: 03_COMMON_COMPOUNDS_TOPIC (Bài 8-12)
  // ==========================================
  8: [
    {
      atom_id: "ATOM_08_ACID_PROPERTIES",
      lesson_id: 8,
      topic: "Acid và Tính chất Hóa học Cốt lõi",
      title: "Khái niệm Acid, sự đổi màu chất chỉ thị và Tính chất hóa học",
      concept_type: "property",
      source_anchors: ["SGK KHTN 8 Kết nối tri thức tr.35-39", "SGV KHTN 8 tr.52-55"],
      statement: "Acid là những hợp chất mà phân tử gồm có một hay nhiều nguyên tử hydrogen liên kết với gốc acid. Khi tan trong nước, acid tạo ra ion H+ làm quỳ tím chuyển sang màu đỏ và tác dụng với kim loại đứng trước hydrogen giải phóng khí H2.",
      canonical_explanation: "Dung dịch acid làm quỳ tím chuyển sang màu đỏ; tác dụng với nhiều kim loại (như Mg, Al, Zn, Fe) giải phóng khí hydrogen; tác dụng với base tạo thành muối và nước; tác dụng với oxide base tạo muối và nước.",
      terms: ["Acid", "Ion H+", "Quỳ tím", "Gốc acid", "Kim loại giải phóng H2", "Ăn mòn"],
      conditions: "Kim loại phải đứng trước hydrogen trong dãy hoạt động hóa học. Kim loại đứng sau H (Cu, Ag, Au) không tác dụng với dung dịch HCl, H2SO4 loãng giải phóng H2.",
      representations: ["text", "formula", "diagram", "simulation"],
      prerequisites: ["ATOM_02_REACTION_ESSENCE", "KHTN 7 Đơn chất và hợp chất"],
      postrequisites: ["ATOM_09_BASE_PH", "ATOM_11_SALT"],
      related_atoms: ["ATOM_09_BASE_PH", "ATOM_10_OXIDE", "ATOM_11_SALT"],
      examples: [
        "Acid chlohydric HCl trong dịch vị dạ dày giúp tiêu hóa thức ăn và tiêu diệt vi khuẩn.",
        "Acid acetic CH3COOH trong giấm ăn có tính acid yếu làm đổi màu quỳ tím.",
        "Kẽm Zn tác dụng với dung dịch HCl tạo kẽm clorua ZnCl2 và sủi bọt khí hydrogen H2."
      ],
      counterexamples: [
        "Thau đồng (Cu) hoặc nhẫn bạc (Ag) thả vào dung dịch axit HCl không có hiện tượng sủi bọt khí vì Cu, Ag đứng sau H.",
        "Nước ngọt có ga chứa axit carbonic H2CO3 nhưng rất yếu, để lâu khí CO2 bay hơi mất tính acid."
      ],
      misconceptions: [
        {
          code: "MIS_ACID_01",
          description: "Nghĩ rằng mọi kim loại đều bị acid loãng ăn mòn và giải phóng khí H2.",
          counterExample: "Dây đồng (Cu) ngâm trong dung dịch H2SO4 loãng hoàn toàn không tan và không có bọt khí sinh ra.",
          repairStrategy: "Cho học sinh tiến hành thí nghiệm đối chứng: ống 1 thả lá nhôm Al (sủi bọt mạnh), ống 2 thả mẩu đồng Cu (không phản ứng)."
        }
      ],
      contexts: [
        {
          id: "CTX_08_HOME",
          contextClass: "home",
          title: "Tẩy cặn cặn vôi ở ấm đun nước bằng giấm ăn hoặc chanh",
          phenomenon: "Ấm đun nước dùng lâu ngày bám lớp cặn trắng CaCO3 ở đáy; khi đổ giấm ăn vào đun nhẹ thấy sủi bọt khí và cặn tan hết.",
          observation: "Acid acetic trong giấm phản ứng với cặn vôi tạo muối tan và khí CO2 thoát ra ngoài.",
          question: "Tại sao giấm ăn lại tẩy sạch được lớp cặn vôi cứng đầu mà nước rửa chén không làm được?",
          explanationRoute: "Vì cặn vôi là muối carbonate không tan trong nước nhưng tan được trong acid, sinh ra khí CO2 và muối tan.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_08_SCHOOL",
          contextClass: "school",
          title: "Thí nghiệm nhận biết acid bằng giấy chỉ thị quỳ tím",
          phenomenon: "Nhỏ một giọt dung dịch chanh hoặc dung dịch acid HCl loãng lên mẩu giấy quỳ tím.",
          observation: "Mẩu giấy quỳ tím lập tức chuyển sang màu đỏ tươi.",
          question: "Thành phần ion nào trong dung dịch acid chịu trách nhiệm làm giấy quỳ chuyển sang màu đỏ?",
          explanationRoute: "Chính sự phân ly của phân tử acid trong nước tạo ra các cation hydrogen (H+) làm biến đổi cấu trúc màu của chất chỉ thị.",
          evidenceSource: "sgv_context"
        },
        {
          id: "CTX_08_TECH",
          contextClass: "technology",
          title: "Bình ắc quy chì - acid trên xe máy và ô tô",
          phenomenon: "Ắc quy xe máy sử dụng dung dịch acid sulfuric (H2SO4) nồng độ khoảng 30-38% làm chất điện phân tích điện.",
          observation: "Khi ắc quy hoạt động, xảy ra phản ứng điện hóa giữa cực chì (Pb), cực oxit chì (PbO2) với dung dịch H2SO4 sinh ra dòng điện.",
          question: "Tại sao khi bảo dưỡng châm thêm ắc quy, thợ máy chỉ được châm nước cất mà không được tự ý đổ thêm acid đặc?",
          explanationRoute: "Vì trong quá trình sạc xả chỉ có nước bị bay hơi/điện phân, lượng acid vẫn còn nguyên; châm thêm acid đặc sẽ làm tăng nồng độ quá mức gây ăn mòn hỏng cực chì.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_08_PRODUCTION",
          contextClass: "production_or_agriculture",
          title: "Quá trình tẩy gỉ thép bằng acid trong công nghiệp luyện kim",
          phenomenon: "Thanh thép xây dựng bị gỉ sét được nhúng vào bể chứa acid HCl hoặc H2SO4 loãng trước khi đem mạ kẽm.",
          observation: "Lớp gỉ sắt Fe2O3 bên ngoài bị acid hòa tan hoàn toàn, để lộ bề mặt kim loại sáng bóng sạch sẽ.",
          question: "Phản ứng tẩy gỉ sắt thuộc loại phản ứng giữa acid với chất nào?",
          explanationRoute: "Phản ứng giữa acid và basic oxide: Fe2O3 + 6HCl -> 2FeCl3 + 3H2O tạo muối tan trong nước.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_08_ENVIRONMENT",
          contextClass: "environment_or_community",
          title: "Mưa acid và sự hủy hoại tượng đài đá vôi, rừng cây",
          phenomenon: "Khí thải công nghiệp SO2 và NOx hòa tan vào nước mưa tạo thành mưa acid có pH < 5.6.",
          observation: "Các công trình điêu khắc bằng đá vôi, đá cẩm thạch bị rỗ mòn, cây rừng rụng lá và héo úa.",
          question: "Cơ chế hóa học nào khiến mưa acid ăn mòn các công trình kiến trúc bằng đá cẩm thạch?",
          explanationRoute: "Acid trong nước mưa (H2SO4, HNO3) phản ứng với calcium carbonate (CaCO3) trong đá, biến đá cứng thành muối tan bị nước cuốn trôi.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_08_PROBLEM_SOLVING",
          contextClass: "decision_or_problem_solving",
          title: "Sơ cứu khi bị acid bắn vào da trong giờ thực hành",
          phenomenon: "Một học sinh làm vỡ ống nghiệm, dung dịch acid HCl loãng bắn vào mu bàn tay gây cảm giác xót rát.",
          observation: "Vùng da bị đỏ và có nguy cơ phồng rộp nếu không xử lý kịp thời.",
          question: "Thứ tự các bước sơ cứu chuẩn y tế học đường là gì?",
          explanationRoute: "1. Rửa ngay dưới vòi nước chảy liên tục ít nhất 15 phút để pha loãng và trôi acid. 2. Rửa lại bằng dung dịch NaHCO3 loãng (khoảng 2%) để trung hòa acid dư. 3. Báo ngay cho giáo viên và nhân viên y tế.",
          evidenceSource: "sgv_context"
        }
      ],
      applications: [
        "Ứng dụng acid hữu cơ (citric acid, acetic acid) trong công nghiệp chế biến và bảo quản thực phẩm.",
        "Sản xuất phân bón hóa học (supephosphate, ammonium nitrate) từ acid H2SO4 và HNO3.",
        "Xử lý bề mặt kim loại và sản xuất pin ắc quy trong công nghiệp ô tô xe máy."
      ],
      use_cases: ["Nhận biết acid bằng quỳ tím", "Giải thích tác dụng tẩy gỉ", "Sơ cứu bỏng acid chuẩn y tế"],
      diagnostic_question: {
        question: "Kim loại nào sau đây KHÔNG tác dụng với dung dịch acid HCl loãng để giải phóng khí hydrogen?",
        options: [
          "A. Kẽm (Zn)",
          "B. Sắt (Fe)",
          "C. Nhôm (Al)",
          "D. Đồng (Cu)"
        ],
        correctIndex: 3,
        commonWrongReason: "Học sinh thường quên dãy hoạt động hóa học và nghĩ rằng kim loại nào cũng tan trong acid.",
        socraticHint: "Hãy nhớ lại vị trí của kim loại Đồng (Cu) trong dãy hoạt động hóa học so với nguyên tố Hydrogen (H)."
      },
      transfer_task: {
        title: "Điều tra Hiện tượng Mưa Acid và Bảo vệ Di sản Văn hóa Địa phương",
        context: "Địa phương em có nhiều di tích lịch sử xây bằng đá vôi đang có dấu hiệu xuống cấp.",
        task: "Sử dụng giấy đo pH kiểm tra độ chua của 3 mẫu nước mưa tại các thời điểm khác nhau. Lập báo cáo đề xuất 3 biện pháp bảo vệ công trình kiến trúc khỏi sự ăn mòn của môi trường.",
        deliverables: "Báo cáo điều tra khoa học gồm bảng số liệu pH, hình ảnh hiện trạng và đề xuất giải pháp.",
        evaluationCriteria: "Đo đúng kỹ thuật, số liệu rõ ràng, giải thích bản chất ăn mòn acid chính xác theo kiến thức KHTN 8."
      },
      web_resources: [
        {
          resource_id: "RES_08_PHET_ACID",
          url: "https://phet.colorado.edu/en/simulations/acid-base-solutions",
          title: "PhET Simulation: Acid-Base Solutions Interactive",
          source_type: "phet",
          grade_fit: "Middle School (Grade 8)",
          license: "CC-BY 4.0",
          trust_score: 99,
          evidence_excerpt: "Mô phỏng mức độ phân ly ion H+ và OH- trong dung dịch acid mạnh và acid yếu."
        }
      ],
      status: "PUBLISHED"
    }
  ],

  // ==========================================
  // CHUYÊN ĐỀ 4: 04_DENSITY_PRESSURE_TOPIC (Bài 13-17)
  // ==========================================
  13: [
    {
      atom_id: "ATOM_13_DENSITY_DEFINITION",
      lesson_id: 13,
      topic: "Khối lượng riêng và Phương pháp đo",
      title: "Định nghĩa Khối lượng riêng và Công thức D = m/V",
      concept_type: "formula",
      source_anchors: ["SGK KHTN 8 Kết nối tri thức tr.56-59", "SGV KHTN 8 tr.82-85"],
      statement: "Khối lượng riêng của một chất là khối lượng của một đơn vị thể tích chất đó. Công thức tính: D = m / V, trong đó D là khối lượng riêng (kg/m³), m là khối lượng (kg) và V là thể tích (m³).",
      canonical_explanation: "Khối lượng riêng là một đặc tính vật lý đặc trưng cho từng chất tinh khiết ở điều kiện nhiệt độ và áp suất xác định. Khối lượng riêng không phụ thuộc vào kích thước hay hình dạng của vật thể.",
      terms: ["Khối lượng riêng", "Thể tích", "Khối lượng", "Đơn vị kg/m³", "g/cm³"],
      conditions: "Vật thể phải là vật đồng chất, không có bọt khí rỗng bên trong. Nhiệt độ và áp suất giữ không đổi.",
      representations: ["text", "formula", "diagram", "simulation"],
      prerequisites: ["Đo khối lượng bằng cân KHTN 6", "Đo thể tích bằng bình chia độ KHTN 6"],
      postrequisites: ["ATOM_14_EXP_DENSITY", "ATOM_16_LIQUID_PRESSURE", "ATOM_17_ARCHIMEDES"],
      related_atoms: ["ATOM_17_ARCHIMEDES", "ATOM_15_PRESSURE"],
      formulaLatex: "D = \\frac{m}{V}",
      examples: [
        "Khối lượng riêng của sắt là 7800 kg/m³, nghĩa là 1 m³ sắt nguyên khối có khối lượng 7800 kg.",
        "Khối lượng riêng của nước cất ở 4°C là 1000 kg/m³ (tương đương 1 g/cm³ hoặc 1 kg/Lít).",
        "Khối lượng riêng của không khí ở 0°C và 1 atm là khoảng 1.29 kg/m³."
      ],
      counterexamples: [
        "Một thanh sắt đặc 2 kg và một chiếc đinh sắt 2 g đều làm bằng sắt nên có cùng khối lượng riêng là 7800 kg/m³, mặc dù khối lượng chênh lệch nhau 1000 lần.",
        "Một khối gỗ đặc có D = 800 kg/m³, nhưng nếu khoét rỗng bên trong thì 'khối lượng riêng biểu kiến' của khối gỗ rỗng giảm xuống, giúp nó nổi dễ dàng hơn."
      ],
      misconceptions: [
        {
          code: "MIS_PHY_13",
          description: "Cho rằng cưa đôi một khối kim loại thì khối lượng riêng của mỗi nửa bị giảm đi một nửa.",
          counterExample: "Khi cắt đôi khối sắt: khối lượng giảm 1/2 nhưng thể tích cũng giảm 1/2, do đó tỉ số D = m/V không thay đổi.",
          repairStrategy: "Cho học sinh làm bài toán thực nghiệm với 2 mẩu nhôm kích thước khác nhau để tính D và rút ra kết luận."
        }
      ],
      contexts: [
        {
          id: "CTX_13_HOME",
          contextClass: "home",
          title: "Phân tầng dầu ăn và nước trong bát canh gia đình",
          phenomenon: "Dầu mỡ luôn nổi thành váng trên mặt bát nước canh nóng, dù khuấy mạnh thế nào một lúc sau vẫn nổi lên trên.",
          observation: "Dầu ăn nhẹ hơn nước và không tan trong nước.",
          question: "Dựa vào khối lượng riêng, hãy giải thích tại sao dầu ăn luôn nổi trên mặt nước?",
          explanationRoute: "Vì khối lượng riêng của dầu ăn (khoảng 800-900 kg/m³) nhỏ hơn khối lượng riêng của nước (1000 kg/m³).",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_13_SCHOOL",
          contextClass: "school",
          title: "Xác định hòn sỏi có phải quặng sắt thật bằng bình chia độ",
          phenomenon: "Học sinh nhặt được một hòn sỏi nặng màu xám đen, đem cân được 78 g và đo thể tích nước dâng lên trong ống đong là 10 cm³.",
          observation: "Tỉ số m/V = 78 g / 10 cm³ = 7.8 g/cm³ = 7800 kg/m³.",
          question: "Hòn sỏi này có khả năng làm từ chất gì?",
          explanationRoute: "Đối chiếu bảng khối lượng riêng trong SGK, giá trị 7800 kg/m³ khớp chính xác với khối lượng riêng của kim loại sắt (Fe).",
          evidenceSource: "sgv_context"
        },
        {
          id: "CTX_13_TECH",
          contextClass: "technology",
          title: "Vật liệu siêu nhẹ sợi carbon (Carbon Fiber) trong hàng không vũ trụ",
          phenomenon: "Thân máy bay Boeing 787 và xe đua F1 được chế tạo từ vật liệu composite sợi carbon thay thế thép hợp kim.",
          observation: "Sợi carbon có độ bền cơ học cao hơn thép nhưng khối lượng riêng chỉ khoảng 1750 kg/m³ (bằng 1/4 thép).",
          question: "Việc sử dụng vật liệu có khối lượng riêng thấp mang lại lợi ích công nghệ gì cho máy bay?",
          explanationRoute: "Giảm tổng trọng lượng cấu trúc máy bay, từ đó tiết kiệm nhiên liệu tiêu thụ và tăng tải trọng chở hành khách/hàng hóa.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_13_PRODUCTION",
          contextClass: "production_or_agriculture",
          title: "Kiểm tra độ nguyên chất của sữa tươi bằng tỷ trọng kế",
          phenomenon: "Trạm thu mua sữa tươi nhúng tỷ trọng kế vào thùng sữa để phát hiện người bán có pha loãng sữa với nước hay không.",
          observation: "Sữa bò nguyên chất có khối lượng riêng từ 1028 đến 1034 kg/m³. Nếu sữa bị pha thêm nước lã, tỷ trọng kế sẽ chìm sâu hơn bình thường.",
          question: "Tại sao pha thêm nước cất (D = 1000 kg/m³) lại làm giảm khối lượng riêng của sữa nguyên chất?",
          explanationRoute: "Dung dịch hỗn hợp có khối lượng riêng là trung bình có trọng số; pha nước có D thấp hơn sẽ kéo giảm D chung của cả thùng sữa.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_13_ENVIRONMENT",
          contextClass: "environment_or_community",
          title: "Sự cố tràn dầu trên biển và tác động sinh thái",
          phenomenon: "Khi tàu chở dầu bị nạn trên biển, dầu thô loang rộng trên hàng trăm km² mặt biển thành lớp màng màu cầu vồng.",
          observation: "Dầu thô có D < D_nước biển (1025 kg/m³) nên nổi trên mặt, ngăn cản sự trao đổi oxy giữa không khí và nước.",
          question: "Đặc tính khối lượng riêng của dầu ảnh hưởng thế nào đến phương pháp thu gom dầu tràn?",
          explanationRoute: "Vì dầu nổi trên mặt nước, lực lượng cứu hộ có thể dùng phao quây chuyên dụng gom dầu lại rồi dùng máy bơm hớt dầu trên bề mặt.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_13_PROBLEM_SOLVING",
          contextClass: "decision_or_problem_solving",
          title: "Truy tìm chiếc vương miện giả của vua Hiero (Giai thoại Archimedes)",
          phenomenon: "Nhà vua nghi ngờ thợ kim hoàn đã bớt vàng và pha thêm bạc vào vương miện, nhưng không được phép nấu chảy hay phá hỏng vương miện.",
          observation: "Archimedes cân vương miện rồi đo thể tích nước tràn ra khi nhúng chìm nó vào thùng nước đầy.",
          question: "Làm thế nào Archimedes chứng minh được vương miện có pha bạc bằng định luật khối lượng riêng?",
          explanationRoute: "Vì vàng có D = 19300 kg/m³ lớn hơn bạc (D = 10500 kg/m³), nếu vương miện có pha bạc thì với cùng khối lượng, thể tích của nó sẽ lớn hơn thể tích khối vàng nguyên chất cùng cân nặng.",
          evidenceSource: "sgv_context"
        }
      ],
      applications: [
        "Thiết kế kết cấu và lựa chọn vật liệu nhẹ trong ngành công nghiệp ô tô, đóng tàu và hàng không vũ trụ.",
        "Kiểm tra chất lượng và độ tinh khiết của kim hoàn (vàng 9999 vs vàng tây 18K/14K).",
        "Tính toán trọng tải hàng hóa và cân đối tải trọng tàu thủy khi xếp hàng vào khoang tàu."
      ],
      use_cases: ["Tính khối lượng từ thể tích", "Nhận biết kim loại dựa trên D", "Giải thích hiện tượng dầu nổi trên nước"],
      diagnostic_question: {
        question: "Một khối kim loại đồng chất có khối lượng 5.4 kg và thể tích 0.002 m³. Khối kim loại này làm bằng chất gì?",
        options: [
          "A. Sắt (D = 7800 kg/m³)",
          "B. Nhôm (D = 2700 kg/m³)",
          "C. Đồng (D = 8900 kg/m³)",
          "D. Chì (D = 11300 kg/m³)"
        ],
        correctIndex: 1,
        commonWrongReason: "Học sinh chia sai đơn vị hoặc nhầm lẫn giữa khối lượng và khối lượng riêng.",
        socraticHint: "Áp dụng công thức D = m / V = 5.4 / 0.002 = ? kg/m³. Sau đó đối chiếu giá trị tính được với danh sách kim loại."
      },
      transfer_task: {
        title: "Dự án Khoa học: Xác định Khối lượng Riêng của Các Vật Liệu Xung Quanh Em",
        context: "Em chuẩn bị tham gia hội đồng thẩm định vật liệu xây dựng trường học.",
        task: "Sử dụng cân điện tử mini và bình đong nước để đo khối lượng riêng của 3 vật thể bất kỳ (1 viên bi ve, 1 chiếc chìa khóa kim loại, 1 mẩu sáp nến). Trình bày bảng dữ liệu kèm sai số.",
        deliverables: "Bảng dữ liệu đo đạc thực tế gồm m, V, D tính toán và nhận xét độ nổi/chìm trong nước.",
        evaluationCriteria: "Đúng đơn vị SI (kg/m³ hoặc g/cm³), sai số dưới 5%, có ảnh chụp thí nghiệm thực tế."
      },
      web_resources: [
        {
          resource_id: "RES_13_PHET_DENSITY",
          url: "https://phet.colorado.edu/en/simulations/density",
          title: "PhET Interactive Simulation: Density Lab",
          source_type: "phet",
          grade_fit: "Middle School (Grade 8)",
          license: "CC-BY 4.0",
          trust_score: 99,
          evidence_excerpt: "Phòng thí nghiệm ảo tương tác thay đổi khối lượng và thể tích của các vật liệu khác nhau để quan sát hiện tượng nổi/chìm."
        }
      ],
      status: "PUBLISHED"
    }
  ],

  // ==========================================
  // CHUYÊN ĐỀ 5: 05_TORQUE_LEVERS_TOPIC (Bài 18-19)
  // ==========================================
  18: [
    {
      atom_id: "ATOM_18_TORQUE_MOMENT",
      lesson_id: 18,
      topic: "Tác dụng làm quay của lực và Moment lực",
      title: "Khái niệm Moment lực và Công thức M = F . d",
      concept_type: "formula",
      source_anchors: ["SGK KHTN 8 Kết nối tri thức tr.76-79", "SGV KHTN 8 tr.104-107"],
      statement: "Moment lực đối với một trục quay là đại lượng đặc trưng cho tác dụng làm quay của lực, được đo bằng tích của độ lớn lực với cánh tay đòn của nó: M = F . d, trong đó F là lực tác dụng (N) và d là cánh tay đòn (khoảng cách vuông góc từ trục quay đến giá của lực, đơn vị mét).",
      canonical_explanation: "Tác dụng làm quay của lực càng lớn khi độ lớn của lực càng lớn và cánh tay đòn càng dài. Đơn vị của moment lực là N.m (Newton mét). Nếu giá của lực đi qua trục quay thì cánh tay đòn d = 0, lực không có tác dụng làm quay vật.",
      terms: ["Moment lực", "Trục quay", "Giá của lực", "Cánh tay đòn d", "Đơn vị N.m"],
      conditions: "Vật thể có trục quay cố định hoặc trục quay tạm thời. Cánh tay đòn d bắt buộc là khoảng cách vuông góc từ trục quay đến giá của lực.",
      representations: ["text", "formula", "diagram", "simulation"],
      prerequisites: ["Khái niệm lực KHTN 6", "Lực tiếp xúc và không tiếp xúc KHTN 6"],
      postrequisites: ["ATOM_19_LEVER"],
      related_atoms: ["ATOM_19_LEVER"],
      formulaLatex: "M = F \\cdot d",
      examples: [
        "Vặn ốc bằng cờ lê dài sẽ nhẹ tay hơn cờ lê ngắn vì cánh tay đòn dài làm tăng moment lực.",
        "Tay nắm cửa luôn được bố trí ở mép xa bản lề nhất để tạo cánh tay đòn d lớn nhất, giúp mở cửa nhẹ nhàng.",
        "Hai người chơi bập bênh muốn cân bằng thì người nặng hơn phải ngồi gần trục quay hơn."
      ],
      counterexamples: [
        "Đẩy cửa bằng một lực vuông góc vào bản lề (giá của lực đi qua trục quay): d = 0 nên M = 0, cửa không thể quay được dù đẩy mạnh đến đâu.",
        "Kéo cửa theo phương song song với mặt cánh cửa: giá của lực cắt trục quay nên không làm cửa quay."
      ],
      misconceptions: [
        {
          code: "MIS_PHY_18",
          description: "Nhầm lẫn cánh tay đòn d là khoảng cách từ trục quay đến điểm đặt lực.",
          counterExample: "Nếu tác dụng lực xiên góc vào đầu mẩu que, cánh tay đòn d là đường vuông góc hạ từ trục quay xuống đường thẳng chứa vector lực, ngắn hơn khoảng cách từ trục đến điểm đặt lực.",
          repairStrategy: "Vẽ sơ đồ hình học minh họa rõ đường d vuông góc với giá của lực F bằng bút màu khác nhau."
        }
      ],
      contexts: [
        {
          id: "CTX_18_HOME",
          contextClass: "home",
          title: "Mở nắp hộp sơn cứng bằng tuốc nơ vít dài",
          phenomenon: "Dùng ngón tay không thể cạy nắp hộp sơn, nhưng dùng chiếc tuốc nơ vít dài luồn vào mép nắp bẩy nhẹ là nắp bật ra.",
          observation: "Cán tuốc nơ vít càng dài thì lực bẩy cần dùng ở tay càng nhỏ.",
          question: "Tại sao chiếc tuốc nơ vít dài lại giúp mở nắp hộp dễ dàng hơn ngón tay?",
          explanationRoute: "Vì chiều dài của tuốc nơ vít làm tăng cánh tay đòn d, tạo ra moment lực M lớn hơn nhiều lần so với khi dùng tay trực tiếp.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_18_SCHOOL",
          contextClass: "school",
          title: "Vị trí lắp tay nắm cửa lớp học",
          phenomenon: "Tất cả các cánh cửa lớp học đều có tay nắm cửa gắn ở mép ngoài cùng đối diện với bản lề.",
          observation: "Nếu thử đẩy cửa ở vị trí sát bản lề, ta phải dùng sức rất mạnh cửa mới nhúc nhích.",
          question: "Hãy vận dụng công thức M = F . d để giải thích thiết kế vị trí tay nắm cửa.",
          explanationRoute: "Đặt tay nắm ở mép xa bản lề giúp cánh tay đòn d đạt giá trị cực đại; để tạo cùng moment M cần thiết làm quay cửa, lực tác dụng F sẽ là nhỏ nhất.",
          evidenceSource: "sgv_context"
        },
        {
          id: "CTX_18_TECH",
          contextClass: "technology",
          title: "Thiết kế cờ lê chỉnh lực (Torque Wrench) trong sửa chữa ô tô",
          phenomenon: "Thợ cơ khí lắp bu-lông bánh xe ô tô phải dùng cờ lê lực chuyên dụng có đồng hồ chỉ số N.m.",
          observation: "Nếu siết quá lực bu-lông bị đứt ren, nếu siết thiếu lực bu-lông bị lỏng rơi bánh khi xe chạy.",
          question: "Đại lượng hiển thị trên cờ lê lực chính là đại lượng vật lý nào em đã học?",
          explanationRoute: "Chính là Moment lực (M = F . d tính bằng Newton mét N.m), đảm bảo lực siết chặt chính xác theo quy chuẩn nhà sản xuất.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_18_PRODUCTION",
          contextClass: "production_or_agriculture",
          title: "Cần cẩu tháp xây dựng nhà cao tầng và khối bê tông đối trọng",
          phenomenon: "Cần cẩu tháp vươn tay đòn dài hàng chục mét để cẩu khối thép nặng mà không bị lật đổ sang một bên.",
          observation: "Phía sau cần cẩu luôn có các khối bê tông đối trọng nặng hàng chục tấn.",
          question: "Nguyên lý cân bằng moment lực được ứng dụng như thế nào trong cần cẩu tháp?",
          explanationRoute: "Moment làm quay theo chiều kim đồng hồ do tải trọng nâng tạo ra được cân bằng chính xác với moment ngược chiều do khối bê tông đối trọng tạo ra.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_18_ENVIRONMENT",
          contextClass: "environment_or_community",
          title: "Cột điện gãy đổ trong bão do gió bão tác dụng vào biển quảng cáo trên cao",
          phenomenon: "Trong các trận bão lớn, các cột đèn hoặc cột cờ có treo biển pano quảng cáo lớn ở đỉnh thường bị uốn cong hoặc gãy ngang gốc.",
          observation: "Biển quảng cáo càng treo cao trên đỉnh cột thì cột càng dễ bị gãy ở sát chân đất.",
          question: "Tại sao biển quảng cáo treo càng cao thì cột điện càng dễ gãy?",
          explanationRoute: "Vì độ cao lớn làm tăng cánh tay đòn d tính từ chân cột (trục quay), lực gió F tác dụng lên biển sinh ra moment M cực lớn làm gãy gốc cột.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_18_PROBLEM_SOLVING",
          contextClass: "decision_or_problem_solving",
          title: "Cách tháo đai ốc gỉ sét khi cờ lê thông thường bị trượt",
          phenomenon: "Bác thợ sửa xe gặp một đai ốc bánh xe tải bị gỉ sét kẹt cứng, dùng hết sức bình sinh vẫn không mở được.",
          observation: "Bác lấy một đoạn ống tuýp sắt dài 1 mét luồn nối dài vào cán cờ lê rồi ấn nhẹ tay, ốc lập tức xoay ra.",
          question: "Giải thích cơ sở khoa học của mẹo nối dài cán cờ lê bằng ống tuýp.",
          explanationRoute: "Đoạn ống sắt làm tăng chiều dài cán cờ lê (tăng cánh tay đòn d lên 3-4 lần), giúp moment lực làm quay tăng vọt đủ để thắng ma sát gỉ sét.",
          evidenceSource: "sgv_context"
        }
      ],
      applications: [
        "Thiết kế các dụng cụ cơ học cầm tay: kìm bấm, kéo cắt cành, cờ lê, mở nắp chai bia.",
        "Thiết kế hệ thống cân bằng trong xây dựng: cần cẩu, cầu nâng ô tô, bập bênh công viên.",
        "Phân tích cơ học vận động của hệ cơ xương khớp ở người (tay, chân như những đòn bẩy)."
      ],
      use_cases: ["Tính toán moment lực", "Giải thích vị trí tay nắm cửa", "Ứng dụng ống nối cờ lê mở bu-lông"],
      diagnostic_question: {
        question: "Một lực F = 40 N tác dụng vuông góc vào một cờ lê có chiều dài cánh tay đòn d = 0.25 m. Moment của lực này là bao nhiêu?",
        options: [
          "A. 10 N.m",
          "B. 160 N.m",
          "C. 0.00625 N.m",
          "D. 100 N.m"
        ],
        correctIndex: 0,
        commonWrongReason: "Học sinh lấy F chia d (40 / 0.25 = 160) thay vì nhân F với d.",
        socraticHint: "Công thức tính Moment lực là tích hay thương giữa Lực F và Cánh tay đòn d? Hãy kiểm tra: M = F . d."
      },
      transfer_task: {
        title: "Dự án Thiết Kế Đòn Bẩy Tiết Kiệm Sức Lao Động trong Nông Nghiệp",
        context: "Bác nông dân gặp khó khăn khi bứng một gốc cây to nặng 200 kg trong vườn.",
        task: "Hãy vẽ phác thảo sơ đồ đòn bẩy (chỉ rõ điểm tựa O, điểm đặt lực O1, O2 và độ dài các cánh tay đòn) để người nặng 50 kg có thể nhổ bổng gốc cây lên một cách nhẹ nhàng.",
        deliverables: "Bản vẽ kỹ thuật có ghi chú thông số lực, cánh tay đòn và phương trình cân bằng moment.",
        evaluationCriteria: "Đảm bảo phương trình F1.d1 = F2.d2 cân bằng, an toàn cơ học, giải thích rõ ràng."
      },
      web_resources: [
        {
          resource_id: "RES_18_PHET_TORQUE",
          url: "https://phet.colorado.edu/en/simulations/balancing-act",
          title: "PhET Interactive Simulation: Balancing Act (Đòn Bẩy & Cân Bằng)",
          source_type: "phet",
          grade_fit: "Middle School (Grade 8)",
          license: "CC-BY 4.0",
          trust_score: 99,
          evidence_excerpt: "Mô phỏng bập bênh tương tác trực tiếp: đặt các khối vật nặng ở các vị trí khác nhau để tìm điểm cân bằng moment lực."
        }
      ],
      status: "PUBLISHED"
    }
  ],

  // ==========================================
  // CHUYÊN ĐỀ 8: 08_HUMAN_BODY_TOPIC (Bài 30-40)
  // ==========================================
  33: [
    {
      atom_id: "ATOM_33_CIRCULATION_SYSTEM",
      lesson_id: 33,
      topic: "Máu và Hệ Tuần Hoàn ở Người",
      title: "Cấu tạo Máu, Hệ mạch và Hai vòng tuần hoàn lớn nhỏ",
      concept_type: "structure",
      source_anchors: ["SGK KHTN 8 Kết nối tri thức tr.136-140", "SGV KHTN 8 tr.174-178"],
      statement: "Máu gồm huyết tương (chiếm khoảng 55%) và các tế bào máu (hồng cầu, bạch cầu, tiểu cầu). Tim hoạt động như một máy bơm đẩy máu lưu thông liên tục trong hai vòng tuần hoàn: vòng tuần hoàn phổi (vòng nhỏ) và vòng tuần hoàn cơ thể (vòng lớn).",
      canonical_explanation: "Hồng cầu chứa hemoglobin vận chuyển O2 và CO2. Bạch cầu tham gia bảo vệ cơ thể bằng cơ chế thực bào và tiết kháng thể. Tiểu cầu tham gia vào cơ chế đông máu chống mất máu. Vòng tuần hoàn nhỏ đưa máu từ tâm thất phải lên phổi để trao đổi khí và trở về tâm nhĩ trái. Vòng tuần hoàn lớn đưa máu giàu O2 từ tâm thất trái đi khắp các cơ quan cơ thể và trở về tâm nhĩ phải.",
      terms: ["Huyết tương", "Hồng cầu", "Bạch cầu", "Tiểu cầu", "Tâm thất", "Tâm nhĩ", "Vòng tuần hoàn lớn", "Vòng tuần hoàn nhỏ"],
      conditions: "Hệ tuần hoàn kín, dòng máu chảy một chiều nhờ hệ thống van tim (van nhĩ thất và van động mạch).",
      representations: ["text", "diagram", "simulation"],
      prerequisites: ["Tế bào và cơ thể KHTN 7", "ATOM_30_BODY_ORGANIZATION"],
      postrequisites: ["ATOM_34_RESPIRATORY", "ATOM_35_EXCRETORY"],
      related_atoms: ["ATOM_34_RESPIRATORY", "ATOM_36_HOMEOSTASIS"],
      examples: [
        "Vết đứt tay nhẹ chảy máu một lúc rồi tự đông lại nhờ mạng lưới tơ máu do tiểu cầu kích hoạt.",
        "Khi vận động chạy nhanh, tim đập nhanh hơn để cung cấp đủ oxy và glucose cho các cơ bắp.",
        "Người sống ở vùng cao nguyên có số lượng hồng cầu cao hơn người ở đồng bằng để thích nghi với nồng độ oxy loãng."
      ],
      counterexamples: [
        "Máu trong động mạch phổi là máu đỏ thẫm (nghèo oxy), không phải cứ máu trong động mạch là luôn đỏ tươi giàu oxy.",
        "Tiểu cầu không phải là một tế bào hoàn chỉnh mà là các mảnh tế bào chất không có nhân vỡ ra từ tế bào mẫu tiểu cầu."
      ],
      misconceptions: [
        {
          code: "MIS_BIO_33",
          description: "Nghĩ rằng động mạch luôn luôn chứa máu giàu oxy màu đỏ tươi, còn tĩnh mạch luôn chứa máu nghèo oxy màu đỏ thẫm.",
          counterExample: "Động mạch phổi mang máu đỏ thẫm nghèo oxy từ tâm thất phải lên phổi, trong khi tĩnh mạch phổi mang máu đỏ tươi giàu oxy từ phổi về tâm nhĩ trái.",
          repairStrategy: "Yêu cầu học sinh vẽ sơ đồ 2 vòng tuần hoàn và tô màu quy ước: đỏ tươi cho máu giàu O2, đỏ thẫm cho máu nghèo O2."
        }
      ],
      contexts: [
        {
          id: "CTX_33_HOME",
          contextClass: "home",
          title: "Đo nhịp tim và huyết áp cho ông bà bằng máy đo điện tử",
          phenomenon: "Máy đo huyết áp bắp tay hiển thị hai chỉ số: ví dụ 120/80 mmHg kèm nhịp tim 75 lần/phút.",
          observation: "Chỉ số 120 là huyết áp tối đa (khi tâm thất co), chỉ số 80 là huyết áp tối thiểu (khi tâm thất giãn).",
          question: "Tại sao khi nghỉ ngơi tĩnh dưỡng, huyết áp của người bình thường lại ổn định ở mức khoảng 120/80 mmHg?",
          explanationRoute: "Phản ánh áp lực của dòng máu tác dụng lên thành động mạch chủ ở hai thì co và giãn của quả tim khỏe mạnh.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_33_SCHOOL",
          contextClass: "school",
          title: "Đếm nhịp mạch đập ở cổ tay trước và sau khi chạy 100m",
          phenomenon: "Trong giờ Thể dục, học sinh đặt ngón tay vào cổ tay dưới ngón cái đếm nhịp mạch: lúc nghỉ là 75 nhịp/phút, sau khi chạy lên đến 130 nhịp/phút.",
          observation: "Tim đập dồn dập, thở gấp, mồ hôi vã ra nhiều.",
          question: "Tại sao tim phải đập nhanh gấp đôi sau khi chạy nước rút?",
          explanationRoute: "Cơ bắp hoạt động cường độ cao tiêu thụ lượng lớn O2 và ATP; tim phải co bóp nhanh để tăng lưu lượng máu đáp ứng nhu cầu năng lượng.",
          evidenceSource: "sgv_context"
        },
        {
          id: "CTX_33_TECH",
          contextClass: "technology",
          title: "Thiết bị đo độ bão hòa oxy trong máu SpO2 kẹp ngón tay",
          phenomenon: "Trong đại dịch, máy đo SpO2 kẹp ngón tay phát chùm ánh sáng đỏ và hồng ngoại xuyên qua móng tay hiển thị chỉ số 98%.",
          observation: "Hemoglobin kết hợp với O2 (HbO2) hấp thụ ánh sáng hồng ngoại khác với Hemoglobin không gắn O2 (Hb).",
          question: "Chỉ số SpO2 phản ánh chức năng của thành phần nào trong máu?",
          explanationRoute: "Phản ánh tỉ lệ phần trăm phân tử hemoglobin trong hồng cầu đang liên kết với oxy để đi nuôi tế bào.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_33_PRODUCTION",
          contextClass: "production_or_agriculture",
          title: "Quy tắc vàng trong hiến máu nhân đạo và truyền máu",
          phenomenon: "Trước khi truyền máu, bác sĩ bắt buộc phải xét nghiệm nhóm máu hệ ABO và làm phản ứng chéo tại giường.",
          observation: "Nếu truyền nhầm nhóm máu (ví dụ truyền máu A cho người nhóm O), hồng cầu người cho sẽ bị ngưng kết lập tức gây tắc mạch và tử vong.",
          question: "Nguyên nhân sinh học nào gây ra hiện tượng ngưng kết hồng cầu khi truyền nhầm nhóm máu?",
          explanationRoute: "Kháng nguyên trên bề mặt hồng cầu người cho gặp kháng thể tương ứng trong huyết tương người nhận (A gặp anti-A hoặc B gặp anti-B) gây kết dính hồng cầu thành cụm.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_33_ENVIRONMENT",
          contextClass: "environment_or_community",
          title: "Ngộ độc khí than CO (Carbon Monoxide) trong phòng kín mùa đông",
          phenomenon: "Đốt than củi sưởi ấm trong phòng ngủ đóng kín cửa khiến người nằm ngủ bị hôn mê sâu và có thể tử vong trong im lặng.",
          observation: "Khí CO không màu, không mùi, kết hợp với hemoglobin trong hồng cầu chặt hơn oxy gấp 250 lần.",
          question: "Tại sao hít phải khí CO lại làm cơ thể bị ngạt thở nghiêm trọng dù phổi vẫn hít thở không khí?",
          explanationRoute: "Khí CO chiếm chỗ của O2 gắn chặt với hemoglobin tạo carboxyhemoglobin, khiến hồng cầu mất hoàn toàn khả năng chở oxy đến các tế bào não và tim.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_33_PROBLEM_SOLVING",
          contextClass: "decision_or_problem_solving",
          title: "Sơ cứu băng bó garo cầm máu khi bị đứt động mạch ở cẳng tay",
          phenomenon: "Một nạn nhân tai nạn bị mảnh kính cắt vào cẳng tay, máu đỏ tươi phun thành tia mạnh theo từng nhịp đập của tim.",
          observation: "Máu phun thành tia chứng tỏ đứt động mạch, có thể mất máu nhanh chóng gây sốc trụy tim trong vài phút.",
          question: "Hành động garo cầm máu phải đặt ở vị trí nào so với vết thương?",
          explanationRoute: "Buộc garo ở vị trí phía trên vết thương (gần tim hơn) vì máu trong động mạch chảy từ tim ra ngoại vi; sau đó nới garo định kỳ 15 phút một lần và chuyển ngay tới bệnh viện.",
          evidenceSource: "sgv_context"
        }
      ],
      applications: [
        "Phòng ngừa các bệnh tim mạch học đường: chế độ ăn giảm muối, hạn chế dầu mỡ và tập luyện thể dục đều đặn.",
        "Ứng dụng xét nghiệm máu toàn phần để chẩn đoán tình trạng thiếu máu, nhiễm trùng bạch cầu và sốt xuất huyết giảm tiểu cầu.",
        "Kỹ thuật sơ cấp cứu tai nạn giao thông: phân biệt chảy máu mao mạch, tĩnh mạch và động mạch để cầm máu đúng cách."
      ],
      use_cases: ["Đọc chỉ số huyết áp", "Phân biệt máu giàu O2 và nghèo O2", "Quy trình sơ cứu vết thương đứt động mạch"],
      diagnostic_question: {
        question: "Phát biểu nào sau đây về hai vòng tuần hoàn ở người là ĐÚNG?",
        options: [
          "A. Vòng tuần hoàn lớn xuất phát từ tâm thất phải đưa máu lên phổi.",
          "B. Máu trong tĩnh mạch phổi là máu đỏ tươi giàu khí oxy.",
          "C. Vòng tuần hoàn nhỏ bắt đầu từ tâm thất trái đưa máu đi khắp cơ thể.",
          "D. Động mạch chủ nhận máu đỏ thẫm từ tâm nhĩ phải."
        ],
        correctIndex: 1,
        commonWrongReason: "Học sinh nghĩ rằng 'tĩnh mạch' thì luôn luôn chở máu đỏ thẫm nghèo oxy.",
        socraticHint: "Hãy theo dõi dòng máu từ phổi trở về tim: Máu sau khi nhận oxy tại phế nang phổi sẽ đi theo mạch máu nào về tâm nhĩ trái?"
      },
      transfer_task: {
        title: "Xây Dựng Sổ Tay Theo Dõi Sức Khỏe Tim Mạch Gia Đình",
        context: "Hưởng ứng Ngày Tim Mạch Thế Giới, lớp em phát động phong trào 'Bảo vệ trái tim người thân'.",
        task: "Lập bảng theo dõi nhịp tim lúc nghỉ ngơi và sau vận động của ít nhất 3 thành viên trong gia đình (ông bà, bố mẹ, bản thân). Đề xuất thực đơn dinh dưỡng 3 ngày có lợi cho tim mạch.",
        deliverables: "Sổ tay theo dõi điện tử hoặc bản giấy gồm biểu đồ nhịp tim, thực đơn ăn uống và 3 thói quen lành mạnh.",
        evaluationCriteria: "Dữ liệu đo chính xác, thực đơn cân đối ít muối mỡ, giải thích khoa học dựa trên kiến thức vòng tuần hoàn KHTN 8."
      },
      web_resources: [
        {
          resource_id: "RES_33_WIKI_HEART",
          url: "https://commons.wikimedia.org/wiki/Category:Human_heart_diagrams",
          title: "Wikimedia Commons: Cấu Tạo Giải Phẫu Tim và Vòng Tuần Hoàn",
          source_type: "wikimedia",
          grade_fit: "Middle School (Grade 8)",
          license: "CC-BY-SA 4.0",
          trust_score: 97,
          evidence_excerpt: "Sơ đồ động học giải phẫu tim 4 ngăn và chu trình van tim hoạt động đẩy máu một chiều."
        }
      ],
      status: "PUBLISHED"
    }
  ],

  // ==========================================
  // CHUYÊN ĐỀ 9: 09_LIFE_ENVIRONMENT_TOPIC (Bài 41-47)
  // ==========================================
  44: [
    {
      atom_id: "ATOM_44_ECOSYSTEM_FOOD_WEB",
      lesson_id: 44,
      topic: "Hệ Sinh Thái, Chuỗi và Lưới Thức Ăn",
      title: "Cấu trúc Hệ sinh thái, Dòng năng lượng và Quy luật 10%",
      concept_type: "structure",
      source_anchors: ["SGK KHTN 8 Kết nối tri thức tr.180-184", "SGV KHTN 8 tr.228-231"],
      statement: "Hệ sinh thái bao gồm quần xã sinh vật và sinh cảnh (môi trường sống vô sinh). Chuỗi thức ăn là một dãy gồm nhiều loài sinh vật có quan hệ dinh dưỡng với nhau; năng lượng truyền qua các bậc dinh dưỡng bị thất thoát khoảng 90%, chỉ có khoảng 10% năng lượng được truyền lên bậc kế tiếp.",
      canonical_explanation: "Hệ sinh thái gồm 3 nhóm sinh vật chính: Sinh vật sản xuất (thực vật quang hợp), Sinh vật tiêu thụ (động vật ăn cỏ, động vật ăn thịt) và Sinh vật phân giải (vi khuẩn, nấm, giun đất). Lưới thức ăn gồm nhiều chuỗi thức ăn có các mắt xích chung. Tháp năng lượng luôn có dạng đáy rộng đỉnh hẹp do quy luật hao hụt 10% năng lượng qua hô hấp, bài tiết và nhiệt lượng.",
      terms: ["Hệ sinh thái", "Sinh cảnh", "Chuỗi thức ăn", "Lưới thức ăn", "Sinh vật sản xuất", "Sinh vật tiêu thụ", "Sinh vật phân giải", "Tháp năng lượng"],
      conditions: "Hệ sinh thái là một hệ thống mở và tự điều chỉnh. Nguồn năng lượng sơ cấp duy nhất cung cấp cho hệ sinh thái trên Trái Đất là năng lượng ánh sáng Mặt Trời.",
      representations: ["text", "diagram", "simulation", "table"],
      prerequisites: ["Quang hợp ở thực vật KHTN 7", "ATOM_41_ENVIRONMENT_FACTORS", "ATOM_42_POPULATION"],
      postrequisites: ["ATOM_46_BALANCE", "ATOM_47_CONSERVATION"],
      related_atoms: ["ATOM_46_BALANCE", "ATOM_47_CONSERVATION"],
      examples: [
        "Chuỗi thức ăn ruộng lúa: Cây lúa -> Cào cào -> Ếch đồng -> Rắn nước -> Diều hâu.",
        "Hệ sinh thái ao nuôi cá: Tảo lục (sản xuất) -> Bọ gậy (tiêu thụ bậc 1) -> Cá rô phi (tiêu thụ bậc 2) -> Vi khuẩn đáy ao (phân giải).",
        "Tháp năng lượng: 10000 kcal cỏ -> 1000 kcal thỏ -> 100 kcal cáo -> 10 kcal đại bàng."
      ],
      counterexamples: [
        "Một chậu cây cảnh để trong phòng kín thiếu ánh sáng và không có sinh vật phân giải không thể coi là một hệ sinh thái bền vững vì chu trình vật chất bị gián đoạn.",
        "Năng lượng trong hệ sinh thái chỉ truyền theo một chiều từ mặt trời đến sinh vật sản xuất rồi lên các bậc tiêu thụ và mất dần ra môi trường, không thể tuần hoàn khép kín như chu trình vật chất (C, N, H2O)."
      ],
      misconceptions: [
        {
          code: "MIS_BIO_44",
          description: "Cho rằng năng lượng trong hệ sinh thái được tuần hoàn khép kín giống như chu trình tuần hoàn của nước hay carbon.",
          counterExample: "Năng lượng bị hao hụt tới 90% ở mỗi bậc dinh dưỡng dưới dạng nhiệt tỏa ra môi trường và không thể tái sử dụng; hệ sinh thái phải liên tục nhận năng lượng mới từ ánh sáng Mặt Trời.",
          repairStrategy: "Vẽ sơ đồ phân biệt rõ: mũi tên vật chất (khép kín thành vòng tròn) và mũi tên năng lượng (chỉ đi một chiều và tia nhiệt thoát ra ngoài)."
        }
      ],
      contexts: [
        {
          id: "CTX_44_HOME",
          contextClass: "home",
          title: "Bể cá cảnh thủy sinh mini trong phòng khách",
          phenomenon: "Một bể thủy sinh cân bằng sinh thái có cây thủy sinh, cá bảy màu, ốc dọn bể và lớp vi sinh đáy có thể sống khỏe mạnh cả tháng không cần thay nước.",
          observation: "Cây quang hợp nhả oxy cho cá, cá thải phân làm phân bón cho cây, vi khuẩn phân giải làm sạch đáy bể.",
          question: "Tại sao bể cá thủy sinh vẫn bắt buộc phải cắm đèn chiếu sáng hàng ngày?",
          explanationRoute: "Vì năng lượng ánh sáng Mặt Trời (hoặc đèn quang hợp) là nguồn năng lượng duy nhất duy trì dòng năng lượng cho sinh vật sản xuất (cây xanh) quang hợp.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_44_SCHOOL",
          contextClass: "school",
          title: "Khảo sát lưới thức ăn trong vườn trường học",
          phenomenon: "Học sinh ghi nhận các loài: cây bàng, sâu đo, chim sâu, bọ ngựa, mèo hoang và nấm mốc trên thân cây mục.",
          observation: "Chim sâu vừa ăn sâu đo, vừa ăn bọ ngựa; sâu đo vừa ăn lá bàng vừa ăn lá hoa hồng.",
          question: "Hãy chỉ ra một mắt xích chung trong lưới thức ăn vườn trường.",
          explanationRoute: "Chim sâu là mắt xích chung vì nó tham gia vào nhiều chuỗi thức ăn khác nhau (vừa ăn sâu đo, vừa ăn bọ ngựa).",
          evidenceSource: "sgv_context"
        },
        {
          id: "CTX_44_TECH",
          contextClass: "technology",
          title: "Mô hình Nông nghiệp tuần hoàn Aquaponics (Nuôi cá kết hợp trồng rau)",
          phenomenon: "Hệ thống Aquaponics thông minh kết hợp bể nuôi cá và khay trồng rau hữu cơ không cần dùng đất và phân bón hóa học.",
          observation: "Nước thải từ bể cá chứa chất thải hữu cơ được bơm lên khay rau; vi khuẩn chuyển hóa thành nitrat nuôi rau; nước được lọc sạch chảy ngược về bể cá.",
          question: "Thành phần sinh vật nào đóng vai trò sinh vật phân giải chuyển hóa chất thải trong hệ Aquaponics?",
          explanationRoute: "Hệ vi sinh vật nitrat hóa bám trên giá thể đất sét nung biến amoniac (độc hại cho cá) thành nitrat (dinh dưỡng cho rau hấp thụ).",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_44_PRODUCTION",
          contextClass: "production_or_agriculture",
          title: "Hạn chế thuốc trừ sâu hóa học bằng phương pháp Thiên địch sinh học",
          phenomenon: "Nhà vườn nuôi ong mắt đỏ để diệt sâu đục thân ngô thay vì phun thuốc trừ sâu hóa học độc hại.",
          observation: "Ong mắt đỏ đẻ trứng vào ổ trứng sâu, ấu trùng ong nở ra ăn trứng sâu làm sâu hại không thể phát triển.",
          question: "Ứng dụng mối quan hệ sinh thái nào trong chuỗi thức ăn để bảo vệ mùa màng?",
          explanationRoute: "Ứng dụng mối quan hệ khống chế sinh học giữa thiên địch (ong ký sinh) và con mồi (sâu hại), giữ số lượng sâu hại ở mức an toàn không gây dịch bệnh.",
          evidenceSource: "textbook_context"
        },
        {
          id: "CTX_44_ENVIRONMENT",
          contextClass: "environment_or_community",
          title: "Rừng ngập mặn Cần Giờ - Lá phổi xanh và lá chắn sóng biển",
          phenomenon: "Rừng ngập mặn Cần Giờ là khu dự trữ sinh quyển thế giới với hệ động thực vật vô cùng phong phú: cây đước, cua biển, cá thòi lòi, khỉ đuôi dài, chim di cư.",
          observation: "Hệ rễ cây đước dày đặc giữ lại phù sa, làm nơi sinh sản cho 80% loài tôm cá vùng cửa sông và bảo vệ đê biển khỏi bão lũ.",
          question: "Nếu phá hủy rừng đước để nuôi tôm tự phát thì toàn bộ hệ sinh thái ven biển sẽ bị ảnh hưởng thế nào?",
          explanationRoute: "Mất sinh vật sản xuất và sinh cảnh sống, lưới thức ăn ven bờ sụp đổ, xói lở bờ biển và nguồn lợi thủy sản tự nhiên cạn kiệt.",
          evidenceSource: "external_verified"
        },
        {
          id: "CTX_44_PROBLEM_SOLVING",
          contextClass: "decision_or_problem_solving",
          title: "Giải cứu hồ cá bị hiện tượng phú dưỡng (nở hoa tảo / thủy triều xanh)",
          phenomenon: "Nước hồ trong công viên bỗng chuyển sang màu xanh đặc quánh, bốc mùi tanh nồng và cá bắt đầu nổi đầu chết hàng loạt vào rạng sáng.",
          observation: "Nguyên nhân do nước thải sinh hoạt giàu photpho và nito chảy vào làm tảo lam bùng phát cực nhanh rồi chết phân hủy hàng loạt.",
          question: "Tại sao tảo phát triển dày đặc ban ngày nhưng ban đêm và sáng sớm cá lại chết vì ngạt khí?",
          explanationRoute: "Ban đêm tảo ngừng quang hợp chỉ hô hấp tiêu thụ oxy; khi tảo tàn, vi khuẩn phân giải tiêu thụ sạch oxy hòa tan trong nước làm cá chết ngạt.",
          evidenceSource: "sgv_context"
        }
      ],
      applications: [
        "Thiết kế mô hình kinh tế VAC (Vườn - Ao - Chuồng) và nông nghiệp hữu cơ không phát thải rác.",
        "Quy hoạch bảo tồn các khu bảo tồn thiên nhiên và vườn quốc gia dựa trên việc duy trì diện tích sinh cảnh tối thiểu.",
        "Xử lý nước thải sinh hoạt bằng phương pháp hồ sinh học và bãi lọc trồng cây tự nhiên."
      ],
      use_cases: ["Vẽ lưới thức ăn sinh thái", "Giải thích quy luật 10% năng lượng", "Ứng dụng thiên địch trừ sâu hại"],
      diagnostic_question: {
        question: "Trong một chuỗi thức ăn: Cỏ -> Thỏ -> Cáo -> Vi khuẩn phân giải, sinh vật sản xuất là:",
        options: [
          "A. Cỏ",
          "B. Thỏ",
          "C. Cáo",
          "D. Vi khuẩn phân giải"
        ],
        correctIndex: 0,
        commonWrongReason: "Học sinh nhầm lẫn giữa sinh vật sản xuất (tự dưỡng quang hợp) với sinh vật phân giải.",
        socraticHint: "Sinh vật nào trong chuỗi có khả năng quang hợp tự tổng hợp chất hữu cơ từ ánh sáng Mặt Trời?"
      },
      transfer_task: {
        title: "Dự Án Điều Tra Đa Dạng Sinh Học và Thiết Kế Chuỗi Thức Ăn Địa Phương",
        context: "Khu sinh thái hoặc công viên gần trường học đang có kế hoạch tôn tạo cảnh quan.",
        task: "Em hãy điều tra và lập danh sách ít nhất 10 loài sinh vật quan sát được. Xây dựng một lưới thức ăn gồm tối thiểu 3 chuỗi thức ăn lồng ghép và xác định các mắt xích chung.",
        deliverables: "Bản báo cáo điều tra có sơ đồ lưới thức ăn minh họa và kiến nghị bảo tồn 1 loài có nguy cơ biến mất.",
        evaluationCriteria: "Đúng quan hệ sinh thái, chỉ rõ chiều mũi tên dinh dưỡng, phân định chuẩn xác 3 nhóm sinh vật (sản xuất, tiêu thụ, phân giải)."
      },
      web_resources: [
        {
          resource_id: "RES_44_WIKI_FOODWEB",
          url: "https://commons.wikimedia.org/wiki/Category:Food_chains_and_webs",
          title: "Wikimedia Commons: Food Webs and Ecological Pyramids",
          source_type: "wikimedia",
          grade_fit: "Middle School (Grade 8)",
          license: "CC-BY-SA 4.0",
          trust_score: 96,
          evidence_excerpt: "Biểu đồ mạng lưới thức ăn sinh thái và tháp sinh khối, tháp năng lượng chuẩn GDPT 2018."
        }
      ],
      status: "PUBLISHED"
    }
  ]
};

/**
 * Helper to get enhanced atoms for a lesson or fallback gracefully
 */
export function getEnhancedAtomsForLesson(lessonId: number): KnowledgeAtom[] {
  return ENHANCED_ATOMS_MAP[lessonId] || [];
}
