import { InterdisciplinaryProblem } from "../types";

export const INTERDISCIPLINARY_PROBLEMS_DATABASE: InterdisciplinaryProblem[] = [
  // ==========================================================================
  // PROBLEM 1: Vật lí + Hóa học + Đo đạc số liệu
  // ==========================================================================
  {
    id: "PROB_01_FLOATING_BUOY",
    code: "PROB-PHY-CHEM-01",
    title: "Nghiên cứu Nghịch lý Nổi/Chìm & Thiết kế Phao Cứu sinh Thông minh Vùng Cửa Biển và Lũ lụt",
    subtitle: "Tích hợp Lực đẩy Archimedes, Khối lượng riêng & Nồng độ dung dịch muối NaCl (Độ mặn) thích ứng biến đổi khí hậu ĐBSCL",
    disciplines: ["physics", "chemistry", "data"],
    realWorldContext: "Tại các tỉnh ven biển Đồng bằng sông Cửu Long (Bến Tre, Trà Vinh, Sóc Trăng), vào mùa khô nước biển xâm nhập mặn sâu vào nội đồng, nhưng vào mùa lũ nước ngọt từ thượng nguồn đổ về ồ ạt. Ngư dân và đội cứu hộ nhận thấy các phao cứu sinh và thuyền ghe có độ chìm (mớn nước) thay đổi rõ rệt giữa nước ngọt thượng lưu (D ≈ 1000 kg/m³) và nước lợ/mặn ven biển (D ≈ 1015 - 1028 kg/m³). Đã có sự cố phao tải nặng bị chìm khi trôi từ cửa biển vào vùng nước ngọt.",
    locality: "Khu vực Cửa Tiểu, sông Tiền và Vịnh Rạch Giá, Kiên Giang, Việt Nam",
    imageEvidenceUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&auto=format&fit=crop&q=80",
    imageEvidenceCaption: "Phao nổi và tàu thuyền thay đổi vạch mớn nước Plimsoll khi di chuyển qua các vùng nước có độ mặn và khối lượng riêng khác nhau.",
    observedPhenomena: [
      "Quả trứng gà chìm trong cốc nước tinh khiết nhưng lại nổi bồng bềnh khi khuấy tan 4 thìa muối ăn NaCl.",
      "Thuyền máy và phao cứu hộ khi chạy từ biển vào cửa sông sâu thì vạch mớn nước bị ngập sâu thêm 4 - 6 cm.",
      "Người tắm biển ở Biển Chết (Israel, độ mặn 34%) hoặc hồ nước mặn nổi bồng bềnh không bao giờ chìm dù không biết bơi."
    ],
    centralQuestion: "Bằng chứng khoa học nào giải thích việc độ mặn dung dịch nước muối làm thay đổi lực nâng chất lỏng? Cần tính toán thể tích khoang rỗng và tỷ trọng phao cứu sinh như thế nào để đảm bảo nâng an toàn người 75 kg cả trong nước ngọt lẫn nước mặn?",
    subproblems: [
      {
        id: "SP_01_1",
        order: 1,
        question: "Phân tích điều kiện cân bằng lực tác dụng lên một vật nổi trên bề mặt chất lỏng đứng yên?",
        tier: "A_IDENTIFY",
        tierTitle: "Tầng A: Nhận diện hiện tượng & Lực cân bằng",
        requiredAtomIds: ["ATOM_17_01", "ATOM_15_01"],
        investigationSteps: [
          "Xác định hai lực trực đối tác dụng lên phao: Trọng lực P (hướng thẳng đứng xuống) và Lực đẩy Archimedes FA (hướng thẳng đứng lên).",
          "Khi phao đứng yên cân bằng trên mặt nước: P = F_A = d_chatlong * V_chim.",
          "Nếu chất lỏng có trọng lượng riêng d thay đổi, V_chìm sẽ biến thiên nghịch với d."
        ],
        guidingQuestions: [
          "Khi phao nổi cân bằng, độ lớn lực đẩy Archimedes bằng bao nhiêu?",
          "Tại sao vật thể không chìm nghỉm xuống đáy hoặc bay lên trời?"
        ],
        expectedFinding: "Vật nổi cân bằng khi P = FA; khi trọng lượng riêng chất lỏng d giảm (nước ngọt), thể tích phần chìm V_chìm bắt buộc phải tăng để duy trì FA = P, làm phao chìm sâu hơn."
      },
      {
        id: "SP_01_2",
        order: 2,
        question: "Độ tan của muối ăn NaCl và nồng độ phần trăm C% ảnh hưởng trực tiếp thế nào đến khối lượng riêng D của dung dịch?",
        tier: "B_EXPLAIN",
        tierTitle: "Tầng B: Cơ chế Hóa học - Vật lí liên môn",
        requiredAtomIds: ["ATOM_04_01", "ATOM_13_01", "ATOM_11_01"],
        investigationSteps: [
          "Pha các dung dịch NaCl với nồng độ phần trăm C% khác nhau (0%, 3.5%, 10%, 20%).",
          "Đo khối lượng m (bằng cân điện tử) của 100 mL dung dịch tương ứng.",
          "Tính khối lượng riêng D = m / V và thiết lập đồ thị quan hệ tuyến tính giữa độ mặn và khối lượng riêng dung dịch."
        ],
        guidingQuestions: [
          "Khi hòa tan muối vào nước, các phân tử nước và ion Na+, Cl- sắp xếp thế nào trong không gian?",
          "Khối lượng dung dịch tăng lên trong khi thể tích tăng không đáng kể thì khối lượng riêng D thay đổi ra sao?"
        ],
        expectedFinding: "Càng hòa tan nhiều muối NaCl (nồng độ C% tăng), khối lượng chất tan m_ct tăng làm khối lượng dung dịch m_dd tăng nhanh hơn độ giãn thể tích, khiến D dung dịch tăng từ 1000 kg/m³ lên tới 1150 kg/m³."
      },
      {
        id: "SP_01_3",
        order: 3,
        question: "Lựa chọn phương án tối ưu thể tích khoang rỗng và vật liệu chế tạo phao để luôn nổi an toàn (mớn nước dự trữ ≥ 30%) trong mọi điều kiện nguồn nước?",
        tier: "C_DECIDE",
        tierTitle: "Tầng C: Ra quyết định & So sánh giải pháp kỹ thuật",
        requiredAtomIds: ["ATOM_13_01", "ATOM_17_01"],
        investigationSteps: [
          "Tính toán cho trường hợp bất lợi nhất: Người nặng m_nguoi = 75 kg rơi vào nước ngọt sông Tiền (D_min = 1000 kg/m³).",
          "Tổng trọng lực hệ phao + người: P_tong = (75 + m_phao) * 10 N.",
          "Áp dụng điều kiện an toàn: V_phao phải lớn hơn V_chim tối thiểu ít nhất 40% làm thể tích dự trữ chống lật."
        ],
        guidingQuestions: [
          "Nên thiết kế phao nguyên khối xốp đặc EPS hay phao vỏ nhựa composite rỗng có van thở?",
          "Nếu có nước tràn vào một phần khoang rỗng thì hệ thống an toàn cần có vách ngăn độc lập nào?"
        ],
        expectedFinding: "Thiết kế khoang rỗng đa ngăn (multi-chamber) bằng nhựa polyethylene (D = 940 kg/m³ tự nổi) với tổng thể tích tối thiểu V = 0.12 m³ đảm bảo sức nổi an toàn 1200 N vượt tải trọng người 750 N."
      },
      {
        id: "SP_01_4",
        order: 4,
        question: "Thiết kế thực nghiệm và phương án kiểm chứng độ nổi cùng hệ thống cảm biến cảnh báo?",
        tier: "D_VALIDATE",
        tierTitle: "Tầng D: Thử nghiệm thực tế & Chuyển giao công nghệ",
        requiredAtomIds: ["ATOM_14_01", "ATOM_17_01", "ATOM_24_01"],
        investigationSteps: [
          "Chế tạo mẫu phao thu nhỏ tỷ lệ 1:5.",
          "Thả phao trong 3 bồn thử nghiệm: Bồn 1 (Nước máy D = 1000 kg/m³), Bồn 2 (Nước lợ nhân tạo D = 1015 kg/m³), Bồn 3 (Nước muối bão hòa D = 1180 kg/m³).",
          "Đo chiều sâu mớn nước h_chim bằng thước panme; kiểm tra mạch điện cảm biến tiếp xúc đáy phao kích hoạt đèn LED cảnh báo khi mực nước chạm vạch nguy hiểm."
        ],
        guidingQuestions: [
          "Sai số thực nghiệm giữa tính toán lý thuyết và đo đạc thực tế do nguyên nhân nào?",
          "Cảm biến điện tử trên phao cần được chống nước và chống ăn mòn muối biển như thế nào?"
        ],
        expectedFinding: "Thực nghiệm xác nhận độ chìm tăng thêm 3.2% trong nước ngọt so với nước lợ, ăn khớp với sai số < 2% so với công thức Archimedes F_A = d*V."
      }
    ],
    requiredKnowledgeAtomIds: ["ATOM_13_01", "ATOM_17_01", "ATOM_04_01", "ATOM_15_01"],
    optionalKnowledgeAtomIds: ["ATOM_11_01", "ATOM_14_01", "ATOM_22_01"],
    measurements: [
      { parameter: "Khối lượng riêng nước ngọt", symbol: "D_ngot", value: "1000", unit: "kg/m³", measurementTool: "Tỷ trọng kế hydrometer", sourceOrLocation: "Sông Tiền, Vĩnh Long" },
      { parameter: "Khối lượng riêng nước biển", symbol: "D_bien", value: "1028", unit: "kg/m³", measurementTool: "Tỷ trọng kế hydrometer", sourceOrLocation: "Biển Vũng Tàu" },
      { parameter: "Khối lượng người tải danh định", symbol: "m_tai", value: "75", unit: "kg", measurementTool: "Cân đồng hồ lò xo", sourceOrLocation: "Tiêu chuẩn cứu nạn Việt Nam" },
      { parameter: "Trọng lượng riêng chất lỏng ngọt", symbol: "d_ngot", value: "10000", unit: "N/m³", measurementTool: "Tính từ d = 10*D", sourceOrLocation: "SGK KHTN 8 Trang 68" },
      { parameter: "Thể tích phao cứu sinh yêu cầu", symbol: "V_min", value: "0.11", unit: "m³", measurementTool: "Đo kích thước hình học", sourceOrLocation: "Xưởng đóng thuyền cứu hộ" }
    ],
    hypotheses: [
      {
        id: "HYP_01_A",
        statement: "Phao chìm sâu hơn trong nước ngọt là vì nước ngọt loãng hơn, không có các hạt ion muối nâng đỡ vật chất.",
        isSupported: true,
        verificationEvidence: "Khoa học chứng minh: Nồng độ ion muối NaCl làm tăng mật độ khối lượng trên đơn vị thể tích, dẫn đến trọng lượng riêng d của chất lỏng tăng. Vì F_A = d * V_chìm = P (không đổi), nên khi d nhỏ hơn (nước ngọt), V_chìm bắt buộc phải lớn hơn."
      },
      {
        id: "HYP_01_B",
        statement: "Nếu vật nặng làm bằng kim loại đặc thì không thể chế tạo thành vật nổi được.",
        isSupported: false,
        verificationEvidence: "Bác bỏ bởi nguyên lí vỏ tàu rỗng: Thép có D = 7800 kg/m³, nhưng khi chế tạo thành khoang rỗng chứa không khí, khối lượng riêng trung bình của toàn khối D_tb = M_toàn_bộ / V_toàn_bộ giảm xuống dưới 1000 kg/m³, vật vẫn nổi bình thường."
      }
    ],
    evidenceChain: [
      {
        id: "EVID_01_1",
        claim: "Vạch mớn nước của thuyền phao dâng cao hơn 4 cm khi di chuyển từ biển vào sông",
        status: "observed",
        observableSource: "Quan sát trực tiếp tại cửa sông Cửa Tiểu",
        connectedAtomId: "ATOM_17_01",
        reasoningNote: "Bằng chứng thị giác xác nhận sự thay đổi thể tích phần chìm khi môi trường nước thay đổi."
      },
      {
        id: "EVID_01_2",
        claim: "Khối lượng 1 lít nước biển đo được là 1.028 kg, trong khi 1 lít nước ngọt chỉ nặng 1.000 kg",
        status: "measured",
        observableSource: "Cân điện tử phân tích phòng thí nghiệm nhà trường",
        connectedAtomId: "ATOM_13_01",
        reasoningNote: "Số liệu định lượng khẳng định D_biển > D_ngọt do chứa muối khoáng hòa tan."
      },
      {
        id: "EVID_01_3",
        claim: "Lực đẩy Archimedes trong nước ngọt nhỏ hơn nếu cùng một thể tích chìm V",
        status: "inferred",
        observableSource: "Suy luận từ công thức FA = d * V",
        connectedAtomId: "ATOM_17_01",
        reasoningNote: "Vì d_ngọt = 10000 N/m³ < d_biển = 10280 N/m³ nên ở cùng V_chìm, FA_ngọt < FA_biển."
      }
    ],
    solutionOptions: [
      {
        id: "OPT_01_A",
        title: "Phao xốp EPS đặc bọc bạt nhựa",
        description: "Dùng xốp Polystyrene nở ép khuôn nguyên khối, bọc vải chống rách màu cam.",
        feasibility: "Cao",
        costBenefit: "Giá thành rẻ, chế tạo nhanh, không sợ bị thủng rò nước vào trong.",
        scientificBasis: "Khối lượng riêng xốp EPS rất nhỏ (D ≈ 25 kg/m³), không thấm nước, độ nổi cực kỳ bền bỉ.",
        pros: ["Chi phí thấp", "Không chìm kể cả khi bị chém rách", "Trọng lượng phao rất nhẹ"],
        cons: ["Kém bền dưới ánh nắng mặt trời kéo dài", "Dễ bị gãy vỡ khi va chạm đá ngầm"],
        score: 84
      },
      {
        id: "OPT_01_B",
        title: "Phao nhựa HDPE rỗng 3 khoang tích hợp cảm biến nước mặn/ngọt",
        description: "Vỏ nhựa HDPE dày 4mm đúc rỗng 3 khoang kín khí độc lập, đáy gắn cảm biến dẫn điện đo độ mặn để điều chỉnh vạch cảnh báo an toàn.",
        feasibility: "Trung bình",
        costBenefit: "Chi phí vừa phải, tuổi thọ trên 10 năm, chịu va đập cực tốt.",
        scientificBasis: "Nhựa HDPE tự nổi (D = 950 kg/m³), chia 3 khoang đảm bảo nếu 1 khoang thủng thì 2 khoang còn lại vẫn giữ lực nổi 700 N.",
        pros: ["Độ bền cơ học vượt trội", "Không bị ăn mòn muối biển", "Tích hợp giám sát thông minh"],
        cons: ["Quy trình đúc khuôn phức tạp hơn xốp"],
        score: 95
      }
    ],
    decisionCriteria: [
      "Tổng lực nâng nổi dự trữ phải ≥ 1200 N (chịu tải người 75 kg + 45 kg dự phòng an toàn).",
      "Vật liệu chế tạo có khối lượng riêng D < 1000 kg/m³ và chịu được bức xạ tia cực tím, nước mặn ăn mòn.",
      "Hoạt động ổn định cả trong nước ngọt phù sa sông Tiền lẫn nước biển mặn đảo Phú Quốc."
    ],
    validationPlan: {
      experimentName: "Khảo sát lực đẩy và mớn nước của mẫu phao mô hình trong dung dịch NaCl biến thiên",
      independentVariable: "Nồng độ muối NaCl (0%, 3%, 6%, 10%) và tương ứng là khối lượng riêng D",
      dependentVariable: "Chiều sâu phần chìm của phao h_chìm (mm) và lực nâng đo bằng lực kế",
      controlVariables: ["Khối lượng tổng cộng của phao mô hình", "Tiết diện ngang của phao", "Nhiệt độ nước 25°C"],
      steps: [
        "Bước 1: Chuẩn bị ống đong 1000 mL và phao hình trụ có vạch chia milimet.",
        "Bước 2: Cho nước cất vào ống đong, thả phao, đọc vạch mớn nước h0.",
        "Bước 3: Lần lượt hòa tan các lượng muối cân chính xác để tăng nồng độ lên 3%, 6%, 10%.",
        "Bước 4: Ghi lại số liệu h_chìm sau mỗi lần hòa tan hoàn toàn.",
        "Bước 5: Vẽ đồ thị tương quan và tính sai số so với công thức lý thuyết."
      ],
      expectedMetric: "Độ chìm h_chìm giảm tỷ lệ nghịch với khối lượng riêng dung dịch, đúng theo phương trình h = m / (S * D)."
    },
    transferTask: {
      title: "Ứng dụng xác định độ tinh khiết của mật ong rừng nguyên chất bằng phương pháp tỷ trọng nổi",
      scenario: "Bà con nông dân vùng U Minh Cà Mau muốn kiểm tra xem mật ong mua về có bị pha loãng nước đường hay không bằng phương pháp thả nổi một que thử gỗ đã hiệu chuẩn.",
      prompt: "Hãy áp dụng nguyên lý khối lượng riêng và lực đẩy Archimedes đã học để giải thích vì sao que thử chìm sâu trong mật ong giả (pha nước) nhưng nổi cao trong mật ong nguyên chất (D ≈ 1420 kg/m³)?",
      deliverable: "Bản báo cáo quy trình thử nghiệm nhanh mật ong gồm sơ đồ lực, bảng đối chiếu tỷ trọng và khuyến nghị phòng ngừa gian lận thương mại.",
      rubricCriteria: [
        "Nêu đúng bản chất D_mat_ong_that (1400-1430 kg/m³) lớn hơn nhiều so với nước ngọt (1000 kg/m³).",
        "Vận dụng chính xác công thức FA = d * V và P = FA để giải thích que thử bị đẩy nổi cao hơn.",
        "Đề xuất được phương án dụng cụ đo định lượng đơn giản có độ tin cậy thực tế."
      ]
    },
    sourceAnchors: [
      "SGK KHTN 8 - Bài 13: Khối lượng riêng (Trang 56)",
      "SGK KHTN 8 - Bài 16: Áp suất chất lỏng (Trang 68)",
      "SGK KHTN 8 - Bài 17: Lực đẩy Archimedes (Trang 73)",
      "SGK KHTN 8 - Bài 4: Dung dịch và nồng độ (Trang 21)",
      "SGV KHTN 8 - Hoạt động thực hành đo lực đẩy và khối lượng riêng (Trang 85-92)"
    ],
    knowledgeEdges: [
      {
        id: "EDGE_01_1",
        sourceAtomId: "ATOM_04_01",
        targetAtomId: "ATOM_13_01",
        edgeType: "INFLUENCES",
        description: "Nồng độ chất tan muối NaCl trong dung dịch làm tăng khối lượng riêng của chất lỏng",
        evidenceBasis: "D = m_dungdich / V_dungdich; m_dungdich = m_nuoc + m_muoi",
        curriculumRole: "bridge"
      },
      {
        id: "EDGE_01_2",
        sourceAtomId: "ATOM_13_01",
        targetAtomId: "ATOM_17_01",
        edgeType: "CALCULATES",
        description: "Khối lượng riêng D của chất lỏng quyết định trọng lượng riêng d = 10*D, trực tiếp quyết định độ lớn lực đẩy Archimedes FA = d*V",
        evidenceBasis: "Biểu thức SGK KHTN 8 Trang 73",
        curriculumRole: "primary"
      },
      {
        id: "EDGE_01_3",
        sourceAtomId: "ATOM_17_01",
        targetAtomId: "ATOM_15_01",
        edgeType: "EXPLAINS",
        description: "Lực đẩy Archimedes thực chất là hợp lực của các lực áp suất chất lỏng tác dụng lên mặt dưới và mặt trên của vật chìm",
        evidenceBasis: "SGV KHTN 8 phân tích bản chất cơ học của FA",
        curriculumRole: "primary"
      }
    ]
  },

  // ==========================================================================
  // PROBLEM 2: Vật lí Điện + Hóa học + Kĩ thuật An toàn
  // ==========================================================================
  {
    id: "PROB_02_GAS_FIRE_ALARM",
    code: "PROB-ELEC-CHEM-02",
    title: "Chẩn đoán Lỗi Mạch Điện Cảm Biến Cảnh Báo Khí Gas & Cháy Nổ Trong Nhà Bếp Trường Học",
    subtitle: "Tích hợp Dòng điện trong mạch kín, Hiệu điện thế, Tác dụng hóa - nhiệt của dòng điện & Phản ứng oxy hóa khí hóa lỏng LPG",
    disciplines: ["physics", "chemistry", "data"],
    realWorldContext: "Nhà bếp bán trú trường THCS sử dụng hệ thống bình gas công nghiệp hóa lỏng LPG (chủ yếu là khí Butane C4H10 và Propane C3H8). Hệ thống trang bị cảm biến bán dẫn SnO2 (MQ-2) mắc nối tiếp trong mạch điện DC 12V để kích hoạt còi hú và van điện từ ngắt gas tự động khi phát hiện khí rò rỉ. Tuy nhiên sau đợt nồm ẩm kéo dài, hệ thống bị báo động giả liên tục hoặc khi thử xịt nhẹ bình bật lửa gas thì còi lại không kêu.",
    locality: "Bếp ăn tập thể trường học THCS, Hà Nội / Nam Định, Việt Nam",
    imageEvidenceUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=80",
    imageEvidenceCaption: "Sơ đồ mạch điện cảm biến báo cháy rò rỉ khí gas gồm cảm biến hóa học, nguồn pin DC, điện trở và còi báo động.",
    observedPhenomena: [
      "Khi có khí gas rò rỉ trong không khí, bề mặt cảm biến nung nóng đổi màu nhẹ và còi báo động kêu to.",
      "Vào ngày trời mưa nồm ẩm cao (độ ẩm 95%), còi tự động kêu dù khóa van gas chặt (báo động giả).",
      "Đo bằng đồng hồ vạn năng thấy điện áp ở hai đầu còi báo động giảm từ 12V xuống chỉ còn 4.2V."
    ],
    centralQuestion: "Nguyên nhân vật lí và hóa học nào khiến điện trở cảm biến khí gas thay đổi? Sự cố chập chờn điện áp do linh kiện bị ẩm hay do mạch điện bị sụt áp? Cần thiết kế quy trình đo đạc chẩn đoán lỗi như thế nào?",
    subproblems: [
      {
        id: "SP_02_1",
        order: 1,
        question: "Cơ chế nào làm thay đổi điện trở của cảm biến khi tiếp xúc với khí gas rò rỉ trong không khí?",
        tier: "B_EXPLAIN",
        tierTitle: "Tầng B: Cơ chế Hóa học bề mặt & Vật lí dẫn điện",
        requiredAtomIds: ["ATOM_02_01", "ATOM_21_01", "ATOM_23_01"],
        investigationSteps: [
          "Cảm biến có sợi dây nung đốt nóng lớp oxit thiếc SnO2.",
          "Trong không khí sạch, các phân tử Oxy bám trên SnO2 và bắt giữ electron tự do làm điện trở rất cao (hàng trăm kΩ), dòng điện qua còi rất nhỏ còi không kêu.",
          "Khi có khí gas C4H10 rò rỉ, khí khử phản ứng oxy hóa với oxy bám trên mặt oxit giải phóng electron trở lại dải dẫn, làm điện trở cảm biến giảm đột ngột, dòng điện I tăng vọt kích hoạt còi."
        ],
        guidingQuestions: [
          "Phản ứng giữa khí gas và oxy có phải là phản ứng tỏa nhiệt không?",
          "Khi số lượng hạt mang điện tích tự do trong vật liệu tăng lên thì khả năng dẫn điện thay đổi như thế nào?"
        ],
        expectedFinding: "Phản ứng hóa học khử oxy trên bề mặt oxit kim loại giải phóng electron tự do, làm tăng độ dẫn điện (giảm điện trở) của vật dẫn."
      },
      {
        id: "SP_02_2",
        order: 2,
        question: "Đo cường độ dòng điện I và hiệu điện thế U tại các điểm chốt trong mạch điện để tìm ra điểm nghẽn gây sụt áp?",
        tier: "A_IDENTIFY",
        tierTitle: "Tầng A: Kỹ năng đo kiểm vôn kế và ampe kế",
        requiredAtomIds: ["ATOM_24_01", "ATOM_25_01", "ATOM_22_01"],
        investigationSteps: [
          "Mắc vôn kế song song với nguồn DC: Đo được U_nguon = 12.1 V (nguồn tốt).",
          "Mắc vôn kế song song với hai chốt còi báo động: Khi kích hoạt chỉ đo được U_coi = 4.2 V (quá thấp để còi hú).",
          "Đo điện áp rơi trên đoạn dây nối và chốt công tắc bị rỉ sét: Đo được U_roi = 7.5 V (chốt tiếp xúc bị oxy hóa tạo điện trở tiếp xúc lớn)."
        ],
        guidingQuestions: [
          "Trong mạch điện mắc nối tiếp, tổng các hiệu điện thế thành phần quan hệ như thế nào với hiệu điện thế toàn mạch?",
          "Khi một điểm nối bị gỉ sét, điện trở của nó tăng hay giảm?"
        ],
        expectedFinding: "Trong đoạn mạch nối tiếp U_toanmach = U_1 + U_2 + ... Điểm nối bị gỉ sét ẩm tạo thành một điện trở phụ làm hao hụt mất 7.5V khiến còi chỉ nhận được 4.2V không thể phát âm thanh."
      },
      {
        id: "SP_02_3",
        order: 3,
        question: "Tại sao độ ẩm không khí cao lại gây hiện tượng báo động giả và cách xử lí triệt để?",
        tier: "C_DECIDE",
        tierTitle: "Tầng C: Đánh giá nguyên nhân & Chọn giải pháp kỹ thuật",
        requiredAtomIds: ["ATOM_01_01", "ATOM_21_01", "ATOM_28_01"],
        investigationSteps: [
          "Hơi nước ngưng tụ trên bề mặt bảng mạch đóng vai trò chất dẫn điện dung dịch yếu, tạo cầu nối dẫn điện rò rỉ giữa hai cực cảm biến.",
          "So sánh 3 giải pháp: (1) Sấy khô tạm thời; (2) Sơn phủ keo cách điện conformal coating chuyên dụng; (3) Tích hợp buồng sấy nhiệt tự động bằng dây điện trở."
        ],
        guidingQuestions: [
          "Nước tinh khiết và nước mưa/nước đọng trong không khí có dẫn điện giống nhau không?",
          "Làm thế nào để bảo vệ mạch điện khỏi tác động của hơi ẩm nhiệt đới?"
        ],
        expectedFinding: "Nước ngưng tụ chứa bụi bẩn dẫn điện tạo đường rò; giải pháp triệt để là phủ keo chống ẩm silicon và duy trì điện trở nung sấy sơ bộ liên tục giữ cảm biến khô ráo."
      },
      {
        id: "SP_02_4",
        order: 4,
        question: "Xây dựng quy trình thử nghiệm an toàn và kịch bản ứng phó sự cố rò rỉ khí gas cho nhà trường?",
        tier: "D_VALIDATE",
        tierTitle: "Tầng D: Quy trình an toàn & Diễn tập chuyển giao",
        requiredAtomIds: ["ATOM_01_01", "ATOM_02_01"],
        investigationSteps: [
          "Bước 1: Không được bật tắt bất kỳ công tắc điện hay thiết bị phát tia lửa nào trong phòng.",
          "Bước 2: Dùng khăn ướt bịt mũi miệng, mở toang tất cả các cửa sổ thông gió trên cao và sát sàn.",
          "Bước 3: Tiếp cận khóa van bình gas chính bằng găng tay cách nhiệt.",
          "Bước 4: Sơ tán học sinh ra sân trường và báo lực lượng cứu hỏa 114."
        ],
        guidingQuestions: [
          "Khí gas LPG nặng hơn hay nhẹ hơn không khí? Khi rò rỉ nó sẽ tụ ở đâu?",
          "Tại sao tuyệt đối không được bật quạt điện để thổi khí gas ra ngoài?"
        ],
        expectedFinding: "LPG có tỉ khối lớn hơn không khí (d_LPG/kk ≈ 1.5 - 2.0) nên chìm sát sàn nhà; bật công tắc quạt sinh tia lửa điện hồ quang có thể gây nổ tức thì theo phản ứng cháy C4H10 + O2."
      }
    ],
    requiredKnowledgeAtomIds: ["ATOM_21_01", "ATOM_22_01", "ATOM_24_01", "ATOM_01_01", "ATOM_02_01"],
    optionalKnowledgeAtomIds: ["ATOM_25_01", "ATOM_23_01", "ATOM_03_01"],
    measurements: [
      { parameter: "Điện áp nguồn danh định", symbol: "U_nguon", value: "12.0", unit: "V", measurementTool: "Vôn kế điện tử hiển thị số", sourceOrLocation: "Bộ chuyển đổi nguồn AC-DC" },
      { parameter: "Dòng điện kích hoạt còi báo động", symbol: "I_coi", value: "0.45", unit: "A", measurementTool: "Ampe kế một chiều", sourceOrLocation: "Nhãn thông số còi buzzer" },
      { parameter: "Điện trở cảm biến trong không khí sạch", symbol: "R_sach", value: "150", unit: "kΩ", measurementTool: "Ohm kế đa năng", sourceOrLocation: "Datasheet MQ-2" },
      { parameter: "Điện trở cảm biến khi có khí gas", symbol: "R_gas", value: "1.8", unit: "kΩ", measurementTool: "Ohm kế đa năng", sourceOrLocation: "Thực nghiệm bơm khí butane" }
    ],
    hypotheses: [
      {
        id: "HYP_02_A",
        statement: "Còi không kêu là do bình gas rò rỉ hết nhẵn khí gas rồi nên cảm biến không nhận được.",
        isSupported: false,
        verificationEvidence: "Đo áp suất bình gas bằng đồng hồ áp suất cho thấy bình gas vẫn còn 85% dung tích; nguyên nhân thực tế là do gỉ sét tại cọc nối tiếp xúc làm sụt áp."
      },
      {
        id: "HYP_02_B",
        statement: "Độ ẩm không khí ngưng tụ làm giảm điện trở bề mặt mạch in dẫn đến dòng điện rò kích hoạt còi giả.",
        isSupported: true,
        verificationEvidence: "Thực nghiệm kiểm chứng: Khi dùng máy sấy tóc thổi khô bảng mạch ở độ ẩm 50%, còi lập tức ngừng hú báo động giả."
      }
    ],
    evidenceChain: [
      {
        id: "EVID_02_1",
        claim: "Đo thấy hiệu điện thế trên hai cực còi chỉ đạt 4.2V thay vì 12V",
        status: "measured",
        observableSource: "Đồng hồ vạn năng DMM đo tại chân còi",
        connectedAtomId: "ATOM_24_01",
        reasoningNote: "Bằng chứng định lượng xác nhận sự cố sụt áp trong mạch nối tiếp."
      },
      {
        id: "EVID_02_2",
        claim: "Khí gas Butane nặng hơn không khí và chìm sát mặt sàn nhà bếp",
        status: "inferred",
        observableSource: "Tính toán tỉ khối hơi d = 58 / 29 = 2.0 theo Bài 3 Mol và tỉ khối",
        connectedAtomId: "ATOM_03_01",
        reasoningNote: "Giải thích tại sao cảm biến phải được lắp ở vị trí cách sàn nhà 20 - 30 cm thay vì gắn trên trần nhà."
      }
    ],
    solutionOptions: [
      {
        id: "OPT_02_A",
        title: "Vệ sinh đánh bóng lại các mối nối kim loại và bôi mỡ dẫn điện chống oxy hóa",
        description: "Làm sạch các chân ốc bắt dây dẫn, loại bỏ lớp gỉ sét oxy hóa oxit đồng, siết chặt tiếp xúc.",
        feasibility: "Cao",
        costBenefit: "Chi phí gần như 0 đồng, khắc phục ngay lập tức hiện tượng sụt áp.",
        scientificBasis: "Loại bỏ điện trở tiếp xúc phụ R_tiepxuc, đưa điện áp cung cấp cho còi về mức đủ 11.8V.",
        pros: ["Dễ làm", "Khắc phục triệt để lỗi sụt áp", "Không cần thay thế linh kiện đắt tiền"],
        cons: ["Phải bảo dưỡng định kỳ 6 tháng một lần"],
        score: 92
      },
      {
        id: "OPT_02_B",
        title: "Bọc kín toàn bộ hộp mạch trong túi nilon kín",
        description: "Bọc nilon để chống hơi ẩm mùa nồm xâm nhập.",
        feasibility: "Thách thức",
        costBenefit: "Rất nguy hiểm vì chặn luôn khí gas không thể tiếp xúc với cảm biến.",
        scientificBasis: "Vi phạm nguyên lý lấy mẫu khí của cảm biến khí gas.",
        pros: ["Chống ẩm"],
        cons: ["Làm vô hiệu hóa hoàn toàn chức năng báo cháy nổ của cảm biến"],
        score: 15
      }
    ],
    decisionCriteria: [
      "Khôi phục điện áp cấp cho còi đạt ≥ 11.0 V để đảm bảo độ vang âm thanh ≥ 85 dB.",
      "Triệt tiêu báo động giả do nồm ẩm mà không cản trở luồng khí gas tiếp xúc với bề mặt cảm biến.",
      "Tuân thủ nghiêm ngặt quy định PCCC và an toàn phòng thí nghiệm/bếp ăn trường học."
    ],
    validationPlan: {
      experimentName: "Đo đạc kiểm thử độ nhạy cảm biến và mạch ngắt gas sau bảo dưỡng",
      independentVariable: "Khoảng cách từ nguồn rò rỉ khí gas butane (bình bật lửa) đến cảm biến (10 cm, 30 cm, 50 cm)",
      dependentVariable: "Thời gian đáp ứng của còi hú t_phanung (giây) và điện áp U_coi (V)",
      controlVariables: ["Điện áp nguồn 12V", "Nhiệt độ phòng 28°C", "Tốc độ gió phòng kín"],
      steps: [
        "Bước 1: Cấp nguồn cho mạch và đợi cảm biến sấy ổn định 3 phút.",
        "Bước 2: Xịt một lượng khí gas butane 0.5 giây ở khoảng cách 30 cm.",
        "Bước 3: Bấm đồng hồ đo thời gian từ khi xịt đến khi còi hú to.",
        "Bước 4: Kiểm tra rơ-le ngắt van điện từ đóng chặt nguồn cấp giả định."
      ],
      expectedMetric: "Thời gian còi hú kích hoạt < 2.5 giây, điện áp còi duy trì ổn định > 11.5 V."
    },
    transferTask: {
      title: "Thiết kế mạch đèn báo mực nước tự động cảnh báo ngập tầng hầm trường học mùa bão",
      scenario: "Vào mùa mưa bão, tầng hầm để xe của trường thường bị ngập nước đột ngột gây hư hỏng xe và chập điện hệ thống máy bơm.",
      prompt: "Hãy vận dụng kiến thức về tính dẫn điện của nước mưa, mạch điện đơn giản nối tiếp và rơ-le điện từ để thiết kế một mạch cảnh báo ngập nước tự động ngắt cầu dao tổng khi nước dâng cao 20 cm.",
      deliverable: "Sơ đồ nguyên lý mạch điện (gồm nguồn điện, hai điện cực cắm nước, còi hú và rơ-le) kèm bản thuyết minh giải thích nguyên lý hoạt động bằng kiến thức KHTN 8.",
      rubricCriteria: [
        "Vẽ đúng ký hiệu nguồn điện, công tắc, còi hú và dây dẫn theo chuẩn SGK KHTN 8 Bài 22.",
        "Vận dụng đúng kiến thức chất dẫn điện: Nước ngập đóng vai trò đóng mạch kín.",
        "Đề xuất biện pháp an toàn điện chống giật cho học sinh và nhân viên nhà trường."
      ]
    },
    sourceAnchors: [
      "SGK KHTN 8 - Bài 1: Sử dụng hóa chất, thiết bị cơ bản & An toàn (Trang 6)",
      "SGK KHTN 8 - Bài 2: Phản ứng hóa học & Tỏa nhiệt (Trang 11)",
      "SGK KHTN 8 - Bài 3: Mol và tỉ khối chất khí (Trang 17)",
      "SGK KHTN 8 - Bài 21: Dòng điện, nguồn điện (Trang 88)",
      "SGK KHTN 8 - Bài 22: Mạch điện đơn giản (Trang 92)",
      "SGK KHTN 8 - Bài 24: Cường độ dòng điện và hiệu điện thế (Trang 98)"
    ],
    knowledgeEdges: [
      {
        id: "EDGE_02_1",
        sourceAtomId: "ATOM_02_01",
        targetAtomId: "ATOM_21_01",
        edgeType: "CAUSES",
        description: "Phản ứng hóa học khử oxit trên mặt cảm biến làm thay đổi nồng độ electron tự do, trực tiếp điều khiển dòng điện trong mạch",
        evidenceBasis: "Cơ chế dẫn điện chất bán dẫn oxit kim loại",
        curriculumRole: "bridge"
      },
      {
        id: "EDGE_02_2",
        sourceAtomId: "ATOM_24_01",
        targetAtomId: "ATOM_22_01",
        edgeType: "MEASURES",
        description: "Hiệu điện thế đo bằng vôn kế tại các điểm cho phép chẩn đoán chính xác vị trí điện trở tiếp xúc gỉ sét làm hở hoặc suy hao mạch",
        evidenceBasis: "Định luật phân bố hiệu điện thế mạch nối tiếp SGK KHTN 8 Trang 98",
        curriculumRole: "primary"
      }
    ]
  },

  // ==========================================================================
  // PROBLEM 3: Nhiệt học + Hóa học + Sinh học Nông nghiệp
  // ==========================================================================
  {
    id: "PROB_03_FRUIT_LOGISTICS",
    code: "PROB-HEAT-BIO-03",
    title: "Tối Ưu Hóa Truyền Nhiệt & Kiểm Soát Hóa Sinh Bảo Quản Nông Sản Nhiệt Đới Xuất Khẩu",
    subtitle: "Tích hợp Các hình thức truyền nhiệt, Sự nở vì nhiệt, Tốc độ phản ứng hóa học & Quá trình hô hấp tế bào ở quả thanh long / xoài",
    disciplines: ["physics", "chemistry", "biology"],
    realWorldContext: "Việt Nam là nước xuất khẩu trái cây nhiệt đới hàng đầu (thanh long Bình Thuận, xoài cát Hòa Lộc, sầu riêng Tiền Giang). Trong các chuyến vận chuyển đường biển dài ngày (15 - 25 ngày) sang thị trường châu Âu hoặc Đông Á, nếu nhiệt độ trong container lạnh không đồng đều hoặc bị thất thoát nhiệt qua thành thùng, quả sẽ tăng cường hô hấp tế bào, sinh khí ethylene kích thích chín nhanh, thối nhũn và bốc mùi chua.",
    locality: "Vùng trồng thanh long Hàm Thuận Nam, Bình Thuận & Cảng biển Cát Lái, TP.HCM",
    imageEvidenceUrl: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=900&auto=format&fit=crop&q=80",
    imageEvidenceCaption: "Thùng nông sản xuất khẩu cần kiểm soát nghiêm ngặt các con đường truyền nhiệt (dẫn nhiệt, đối lưu, bức xạ) và hô hấp sinh học.",
    observedPhenomena: [
      "Các thùng quả đặt ở sát vách ngoài container hoặc lớp trên cùng gần nóc thùng bị chín vàng và nhũn trước các thùng ở giữa.",
      "Quả thanh long sau khi hái để trong phòng kín tự sinh nhiệt làm nhiệt độ đống quả nóng lên từ 25°C lên 33°C sau 2 ngày.",
      "Quả bảo quản ở 5°C giữ được độ tươi xanh trên 20 ngày, nhưng nếu nhiệt độ giảm sâu xuống 0°C thì vỏ quả bị thâm đen do hiện tượng tổn thương lạnh tế bào."
    ],
    centralQuestion: "Nhiệt lượng truyền vào thùng quả qua những con đường nào (dẫn nhiệt, đối lưu, bức xạ)? Tại sao hạ nhiệt độ lại làm chậm quá trình chín và hỏng của quả? Làm thế nào để thiết kế lớp bao bì cách nhiệt thông minh tiết kiệm năng lượng lạnh?",
    subproblems: [
      {
        id: "SP_03_1",
        order: 1,
        question: "Phân tích 3 hình thức truyền nhiệt (dẫn nhiệt, đối lưu, bức xạ) từ môi trường nhiệt đới bên ngoài vào bên trong thùng nông sản?",
        tier: "A_IDENTIFY",
        tierTitle: "Tầng A: Phân loại cơ chế truyền nhiệt",
        requiredAtomIds: ["ATOM_28_01", "ATOM_26_01"],
        investigationSteps: [
          "Bức xạ nhiệt: Ánh nắng mặt trời gay gắt chiếu vào vỏ thép container hấp thụ nhiệt bức xạ làm vỏ nóng lên tới 55°C.",
          "Dẫn nhiệt: Nhiệt truyền từ vỏ thép nóng qua lớp cách nhiệt polyurethane vào vách trong của thùng xe.",
          "Đối lưu: Luồng không khí lạnh từ máy lạnh thổi tuần hoàn trong khoang, mang nhiệt nóng từ đống quả đi làm mát."
        ],
        guidingQuestions: [
          "Tại sao vỏ ngoài container thường sơn màu trắng sáng hoặc bạc phản quang?",
          "Hình thức truyền nhiệt nào có thể xảy ra mà không cần môi trường vật chất trung gian?"
        ],
        expectedFinding: "Vỏ container màu sáng giúp phản xạ bức xạ nhiệt mặt trời; lớp xốp xốp cách nhiệt bẫy không khí làm giảm sự dẫn nhiệt; luồng khí lạnh đối lưu cưỡng bức cuốn trôi nhiệt sinh học tỏa ra từ quả."
      },
      {
        id: "SP_03_2",
        order: 2,
        question: "Bản chất sinh học của quá trình hô hấp tế bào ở quả sau thu hoạch và mối quan hệ với tốc độ phản ứng hóa học theo nhiệt độ?",
        tier: "B_EXPLAIN",
        tierTitle: "Tầng B: Hô hấp tế bào & Tốc độ biến đổi sinh hóa",
        requiredAtomIds: ["ATOM_07_01", "ATOM_34_01", "ATOM_02_01"],
        investigationSteps: [
          "Hô hấp tế bào ở quả: Glucose C6H12O6 + 6O2 → 6CO2 + 6H2O + Năng lượng nhiệt Q.",
          "Năng lượng nhiệt Q tỏa ra tiếp tục nung nóng đống quả nếu không được tản nhiệt.",
          "Áp dụng quy tắc tốc độ phản ứng (Bài 7): Khi nhiệt độ hạ từ 30°C xuống 5°C, hoạt tính của enzyme phân giải tinh bột và pectin giảm mạnh từ 4 - 8 lần, làm chậm quá trình thối rữa."
        ],
        guidingQuestions: [
          "Quả sau khi hái khỏi cây có còn sống và thở không?",
          "Hạ nhiệt độ ảnh hưởng như thế nào đến tốc độ va chạm giữa các phân tử tham gia phản ứng hóa học?"
        ],
        expectedFinding: "Quả sau thu hoạch vẫn duy trì hô hấp tế bào tỏa nhiệt; hạ nhiệt độ lạnh làm giảm động năng phân tử và ức chế enzyme xúc tác sinh học, kéo dài tuổi thọ quả lên gấp 4 lần."
      },
      {
        id: "SP_03_3",
        order: 3,
        question: "Đánh giá và lựa chọn vật liệu cách nhiệt lót thùng carton kết hợp túi hút khí ethylene để bảo quản tối ưu?",
        tier: "C_DECIDE",
        tierTitle: "Tầng C: Lựa chọn vật liệu & Công nghệ bảo quản kết hợp",
        requiredAtomIds: ["ATOM_28_01", "ATOM_07_01"],
        investigationSteps: [
          "Thử nghiệm 3 phương án lót thùng: (1) Giấy báo cũ; (2) Màng xốp hơi bọt khí tráng màng nhôm phản xạ; (3) Khay xốp đục lỗ thông khí kết hợp gói thuốc tím KMnO4 hút khí ethylene.",
          "Đo nhiệt độ lõi quả và hàm lượng đường theo ngày bảo quản."
        ],
        guidingQuestions: [
          "Lớp màng nhôm bạc có tác dụng ngăn cản hình thức truyền nhiệt nào?",
          "Tại sao cần đục lỗ thông gió thay vì bịt kín mít thùng quả?"
        ],
        expectedFinding: "Thùng carton 5 lớp lót màng xốp bọt khí cách nhiệt phản xạ bức xạ, đục lỗ thông gió đối lưu 4% diện tích và kèm gói hút ethylene KMnO4 cho hiệu quả bảo quản 24 ngày không suy giảm chất lượng."
      },
      {
        id: "SP_03_4",
        order: 4,
        question: "Thiết kế thí nghiệm đo hệ số giữ nhiệt của các loại bao bì và xây dựng quy trình chuyển giao cho nông hộ?",
        tier: "D_VALIDATE",
        tierTitle: "Tầng D: Thực nghiệm Joulemeter & Chuyển giao",
        requiredAtomIds: ["ATOM_27_01", "ATOM_28_01"],
        investigationSteps: [
          "Dùng nhiệt lượng kế hoặc hộp xốp chuẩn có nhiệt kế điện tử đo tốc độ tăng nhiệt độ ΔT sau mỗi 30 phút dưới đèn hồng ngoại 100W.",
          "Tính nhiệt lượng truyền vào thùng theo công thức bảo toàn năng lượng nhiệt.",
          "Xây dựng cẩm nang hướng dẫn đóng gói cho bà con hợp tác xã thanh long."
        ],
        guidingQuestions: [
          "Thiết bị nào trong phòng thí nghiệm KHTN 8 đo được năng lượng nhiệt chính xác?",
          "Làm sao hạn chế sự chênh lệch nhiệt độ giữa các vị trí trong cùng một thùng quả?"
        ],
        expectedFinding: "Màng cách nhiệt bọt khí tráng nhôm làm giảm 68% nhiệt lượng bức xạ và dẫn nhiệt xâm nhập so với thùng carton thông thường."
      }
    ],
    requiredKnowledgeAtomIds: ["ATOM_28_01", "ATOM_26_01", "ATOM_07_01", "ATOM_34_01"],
    optionalKnowledgeAtomIds: ["ATOM_27_01", "ATOM_29_01", "ATOM_41_01"],
    measurements: [
      { parameter: "Nhiệt độ ngoài trời vỏ container trưa nắng", symbol: "T_ngoai", value: "52.5", unit: "°C", measurementTool: "Súng đo nhiệt độ hồng ngoại", sourceOrLocation: "Bãi cảng Cát Lái" },
      { parameter: "Nhiệt độ lạnh cài đặt buồng lạnh", symbol: "T_lanh", value: "5.0", unit: "°C", measurementTool: "Cảm biến nhiệt độ kỹ thuật số", sourceOrLocation: "Màn hình điều khiển container" },
      { parameter: "Độ ẩm tương đối trong khoang bảo quản", symbol: "RH", value: "90", unit: "%", measurementTool: "Ẩm kế điện tử", sourceOrLocation: "Khoang container lạnh" },
      { parameter: "Nhiệt sinh học tỏa ra từ 1 tấn quả", symbol: "q_sinh", value: "45", unit: "W/tấn", measurementTool: "Nhiệt lượng kế phân tích", sourceOrLocation: "Viện Cây ăn quả Miền Nam" }
    ],
    hypotheses: [
      {
        id: "HYP_03_A",
        statement: "Cứ làm nhiệt độ càng thấp càng tốt, nếu làm đông đá quả ở -5°C thì quả sẽ giữ tươi mãi mãi.",
        isSupported: false,
        verificationEvidence: "Bác bỏ bởi hiện tượng nở vì nhiệt của nước (Bài 29): Khi đóng băng dưới 0°C, nước trong tế bào quả nở thể tích phá vỡ màng tế bào. Khi rã đông, tế bào vỡ nát làm quả bị nhũn hỏng hoàn toàn."
      },
      {
        id: "HYP_03_B",
        statement: "Sơn vỏ ngoài container màu trắng làm giảm đáng kể nhiệt lượng hấp thụ từ mặt trời.",
        isSupported: true,
        verificationEvidence: "Vật lí bức xạ nhiệt khẳng định: Màu sáng có độ phản xạ bức xạ ánh sáng và nhiệt cao hơn 80%, giúp giảm nhiệt độ bề mặt vỏ kim loại xuống 15 - 18°C so với bề mặt màu đen/tối."
      }
    ],
    evidenceChain: [
      {
        id: "EVID_03_1",
        claim: "Nhiệt độ vỏ container màu trắng thấp hơn vỏ container màu xanh đen 14°C dưới cùng điều kiện nắng",
        status: "measured",
        observableSource: "Đo thực địa bằng súng nhiệt kế laser",
        connectedAtomId: "ATOM_28_01",
        reasoningNote: "Bằng chứng thực nghiệm khẳng định cơ chế phản xạ bức xạ nhiệt của vật màu sáng."
      },
      {
        id: "EVID_03_2",
        claim: "Hô hấp tế bào tiêu thụ oxy và thải nhiệt lượng làm đống quả tự nóng lên",
        status: "inferred",
        observableSource: "Suy luận từ phương trình phản ứng oxy hóa chất hữu cơ tỏa nhiệt",
        connectedAtomId: "ATOM_34_01",
        reasoningNote: "Giải thích nguồn gốc nhiệt bên trong thùng cần luồng đối lưu giải nhiệt liên tục."
      }
    ],
    solutionOptions: [
      {
        id: "OPT_03_A",
        title: "Bao gói thùng carton đục lỗ đối lưu kết hợp màng xốp bạc phản xạ bức xạ và gói hút ethylene",
        description: "Hệ thống bảo quản tích hợp 3 tác động: Phản xạ bức xạ nhiệt, thông gió đối lưu tản nhiệt sinh học và hấp phụ hóa học khí làm chín.",
        feasibility: "Cao",
        costBenefit: "Tăng chi phí đóng gói thêm 3.500 đ/thùng 10kg nhưng tỷ lệ quả hỏng giảm từ 18% xuống dưới 2%.",
        scientificBasis: "Đồng bộ giải quyết cả 3 con đường truyền nhiệt và chu trình hóa sinh ở quả.",
        pros: ["Hiệu quả cao", "Thân thiện môi trường", "Dễ áp dụng cho mọi hợp tác xã"],
        cons: ["Cần công nhân tập huấn đóng gói đúng kỹ thuật"],
        score: 96
      }
    ],
    decisionCriteria: [
      "Duy trì nhiệt độ ruột quả ở dải 5.5°C ± 1.5°C trong suốt 20 ngày vận chuyển.",
      "Không sử dụng hóa chất bảo quản tổng hợp cấm, an toàn thực phẩm chuẩn GlobalGAP.",
      "Vật liệu đóng gói có thể tái chế hoặc tự phân hủy sinh học."
    ],
    validationPlan: {
      experimentName: "Mô phỏng chu trình vận chuyển lạnh 15 ngày với thanh long Bình Thuận",
      independentVariable: "Loại bao bì đóng gói (Carton thường vs Carton cách nhiệt đối lưu)",
      dependentVariable: "Độ hao hụt khối lượng quả (%), độ cứng của vỏ quả (kg/cm²) và hàm lượng đường brix",
      controlVariables: ["Nhiệt độ phòng lạnh 6°C", "Cùng lô quả thu hoạch tại 1 vườn", "Độ chín ban đầu"],
      steps: [
        "Bước 1: Chọn 30 quả thanh long cùng độ chín, chia đều vào 2 thùng.",
        "Bước 2: Cắm đầu đo nhiệt độ ghi dữ liệu tự động (data logger) vào tâm 3 quả ở các vị trí khác nhau.",
        "Bước 3: Đặt thùng vào tủ lạnh kiểm soát 6°C trong 15 ngày.",
        "Bước 4: Định kỳ 3 ngày lấy mẫu đo độ cứng, nồng độ đường và kiểm tra thâm cuống."
      ],
      expectedMetric: "Thùng cách nhiệt đối lưu giữ được độ cứng vỏ > 3.2 kg/cm² và cuống quả tươi xanh sau 15 ngày."
    },
    transferTask: {
      title: "Ứng dụng thiết kế bình giữ nhiệt lưỡng dụng và áo tản nhiệt cho công nhân làm việc ngoài trời nắng nóng",
      scenario: "Công nhân làm đường và nông dân làm đồng tại các tỉnh miền Trung vào mùa gió Lào thường xuyên đối mặt với say nắng, kiệt sức vì nhiệt độ môi trường vượt quá 40°C.",
      prompt: "Hãy vận dụng các kiến thức về dẫn nhiệt, đối lưu, bức xạ nhiệt và thoát mồ hôi của da người (Bài 39) để thiết kế một chiếc áo bảo hộ chống nóng thông minh tích hợp quạt gió mini và lớp phản xạ nhiệt.",
      deliverable: "Bản vẽ sơ đồ cấu tạo áo bảo hộ đa lớp kèm giải thích nguyên lý chống truyền nhiệt và thúc đẩy bay hơi mồ hôi.",
      rubricCriteria: [
        "Chỉ rõ lớp ngoài phản xạ bức xạ nhiệt (vải tráng bạc sáng màu).",
        "Chỉ rõ lớp đệm rỗng tạo khoảng không khí dẫn nhiệt kém.",
        "Vận dụng đúng cơ chế sinh học điều hòa thân nhiệt qua tuyến mồ hôi của da (Bài 39) và quạt đối lưu hỗ trợ bay hơi tỏa nhiệt."
      ]
    },
    sourceAnchors: [
      "SGK KHTN 8 - Bài 7: Tốc độ phản ứng và chất xúc tác (Trang 31)",
      "SGK KHTN 8 - Bài 26: Năng lượng nhiệt và nội năng (Trang 106)",
      "SGK KHTN 8 - Bài 28: Sự truyền nhiệt (Trang 114)",
      "SGK KHTN 8 - Bài 29: Sự nở vì nhiệt (Trang 119)",
      "SGK KHTN 8 - Bài 34: Hệ hô hấp ở người & Trao đổi khí (Trang 140)",
      "SGK KHTN 8 - Bài 39: Da và điều hòa thân nhiệt (Trang 162)"
    ],
    knowledgeEdges: [
      {
        id: "EDGE_03_1",
        sourceAtomId: "ATOM_28_01",
        targetAtomId: "ATOM_26_01",
        edgeType: "EXPLAINS",
        description: "Các hình thức truyền nhiệt (dẫn nhiệt, đối lưu, bức xạ) là con đường làm biến đổi nội năng của vật thông qua thực hiện truyền nhiệt",
        evidenceBasis: "SGK KHTN 8 Bài 26 và 28",
        curriculumRole: "primary"
      },
      {
        id: "EDGE_03_2",
        sourceAtomId: "ATOM_07_01",
        targetAtomId: "ATOM_34_01",
        edgeType: "CONSTRAINS",
        description: "Nhiệt độ hạ thấp làm giảm tốc độ các phản ứng hóa sinh của quá trình hô hấp tế bào ở quả",
        evidenceBasis: "Quy tắc nhiệt độ làm chậm tốc độ phản ứng SGK Bài 7",
        curriculumRole: "bridge"
      }
    ]
  },

  // ==========================================================================
  // PROBLEM 4: Hóa học + Sinh thái học + Môi trường nước
  // ==========================================================================
  {
    id: "PROB_04_WATER_EUTROPHICATION",
    code: "PROB-CHEM-ECO-04",
    title: "Điều Tra Hiện Tượng Phú Dưỡng (Eutrophication), Cá Chết Hàng Loạt & Phục Hồi Sinh Thái Thủy Vực",
    subtitle: "Tích hợp Phân bón hóa học N-P-K dư thừa, Thang pH, Quần thể vi tảo nở hoa & Chu trình Oxy hòa tan trong hệ sinh thái hồ",
    disciplines: ["chemistry", "biology", "data"],
    realWorldContext: "Tại nhiều đầm phá, hồ chứa và kênh rạch thủy lợi ở vùng chuyên canh lúa và nuôi thủy sản (An Giang, Đồng Tháp, Hải Dương), vào mùa hè nước hồ chuyển màu xanh lục đặc quánh như cháo, bốc mùi hôi thối nồng nặc và lớp váng bọt dạt vào bờ. Vào rạng sáng, cá tôm nổi đầu hàng loạt đớp không khí rồi chết trắng mặt hồ. Người dân nghi ngờ có ai đổ thuốc trừ sâu độc hại hoặc hóa chất tẩy rửa.",
    locality: "Vùng đầm nuôi thủy sản và hồ cảnh quan Đan Phượng, Hà Nội & An Giang, Việt Nam",
    imageEvidenceUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80",
    imageEvidenceCaption: "Hiện tượng phú dưỡng do dư thừa đạm lân làm vi tảo bùng phát dữ dội gây suy giảm oxy hòa tan làm cá chết ngạt.",
    observedPhenomena: [
      "Nước hồ chuyển sang màu xanh lục đậm, độ trong nhìn sâu của đĩa Secchi giảm từ 80 cm xuống chỉ còn 12 cm.",
      "Vào lúc trưa nắng gắt (12h - 14h), nước hồ sủi nhiều bọt khí nhỏ li ti và cá bơi lội bình thường.",
      "Vào khoảng 3h - 5h sáng, cá rô phi, cá chép nổi đầu ngáp ngáp trên mặt nước rồi chết hàng loạt; đến khi mặt trời mọc hiện tượng cá chết mới giảm bớt."
    ],
    centralQuestion: "Nguồn gốc nguyên tố đạm (N) và lân (P) trong phân bón hóa học rửa trôi đã gây bùng phát quần thể sinh vật nào? Tại sao cá chỉ chết vào rạng sáng mà không chết vào buổi trưa nắng? Cần áp dụng giải pháp công nghệ sinh thái nào để làm sạch nước bền vững?",
    subproblems: [
      {
        id: "SP_04_1",
        order: 1,
        question: "Phân tích nguồn gốc phân bón hóa học dư thừa và kiểm tra các chỉ số hóa học nguồn nước (pH, nồng độ nitrate, phosphate)?",
        tier: "A_IDENTIFY",
        tierTitle: "Tầng A: Phân tích hóa học nguồn ô nhiễm",
        requiredAtomIds: ["ATOM_12_01", "ATOM_09_01", "ATOM_04_01"],
        investigationSteps: [
          "Bà con nông dân bón dư thừa phân đạm đạm urea (NH2)2CO và phân lân superphosphate Ca(H2PO4)2.",
          "Mưa lớn rửa trôi ion nitrate NO3- và phosphate PO4(3-) theo mương dẫn vào hồ tích tụ nồng độ cao (hiện tượng phú dưỡng - Eutrophication).",
          "Đo pH nước hồ bằng giấy thị hoặc bút đo pH điện tử: pH ban ngày tăng vọt lên 9.2 (môi trường kiềm do tảo hấp thụ hết CO2 có tính axit yếu)."
        ],
        guidingQuestions: [
          "Cây trồng có hấp thụ hết 100% lượng phân bón hóa học rải trên ruộng không?",
          "Khi khí CO2 trong nước bị tảo quang hợp lấy đi hết thì pH của nước tăng hay giảm?"
        ],
        expectedFinding: "Lượng phân bón N-P dư thừa rửa trôi làm nồng độ chất dinh dưỡng vô cơ trong hồ tăng gấp 15 lần ngưỡng cho phép, kích hoạt chuỗi phản ứng sinh thái phú dưỡng."
      },
      {
        id: "SP_04_2",
        order: 2,
        question: "Cơ chế biến động số lượng cá thể quần thể vi tảo (tảo nở hoa) và sự thay đổi chuỗi thức ăn trong hệ sinh thái hồ?",
        tier: "B_EXPLAIN",
        tierTitle: "Tầng B: Động thái quần thể sinh vật & Chuỗi thức ăn",
        requiredAtomIds: ["ATOM_42_01", "ATOM_43_01", "ATOM_44_01"],
        investigationSteps: [
          "Nguồn dinh dưỡng vô hạn N-P kết hợp ánh nắng mùa hè làm quần thể vi tảo lam (Cyanobacteria) sinh sản vô tính theo cấp số nhân (bùng nổ số lượng cá thể).",
          "Vi tảo sinh sản quá nhanh che khuất ánh sáng khiến các thực vật thủy sinh ở tầng đáy không quang hợp được và chết thối.",
          "Vòng đời vi tảo ngắn (vài ngày): Hàng tỷ xác tảo chết chìm xuống đáy kích hoạt quần thể vi khuẩn phân hủy hiếu khí tăng vọt."
        ],
        guidingQuestions: [
          "Điều gì quyết định sự tăng giảm số lượng cá thể trong một quần thể sinh vật (Bài 42)?",
          "Khi một mắt xích sản xuất trong chuỗi thức ăn bùng phát quá mức thì cân bằng tự nhiên bị ảnh hưởng ra sao?"
        ],
        expectedFinding: "Hiện tượng phú dưỡng phá vỡ trạng thái cân bằng tự nhiên của hệ sinh thái hồ, tạo nên hiện tượng 'tảo nở hoa' độc hại."
      },
      {
        id: "SP_04_3",
        order: 3,
        question: "Giải mã bí ẩn chu trình Oxy hòa tan (DO): Vì sao cá tôm chỉ chết ngạt vào lúc rạng sáng (3h - 5h sáng)?",
        tier: "B_EXPLAIN",
        tierTitle: "Tầng B: Đối chiếu chu trình Oxy ngày và đêm",
        requiredAtomIds: ["ATOM_44_01", "ATOM_46_01", "ATOM_34_01"],
        investigationSteps: [
          "Ban ngày có ánh nắng: Tảo quang hợp tạo lượng oxy khổng lồ (O2 hòa tan đạt bão hòa 12 mg/L), nước sủi bọt, cá bơi lội khỏe mạnh.",
          "Ban đêm không có ánh nắng: Tảo ngừng quang hợp và chuyển sang hô hấp tiêu thụ oxy. Đồng thời hàng triệu vi khuẩn đáy hồ phân hủy xác tảo cũng tiêu thụ lượng lớn oxy.",
          "Đến 4h sáng: Hàm lượng oxy hòa tan chạm đáy < 1.0 mg/L (ngưỡng chết ngạt của cá là < 2.5 mg/L), làm cá chết trắng mặt hồ do thiếu oxy chứ không phải do thuốc độc."
        ],
        guidingQuestions: [
          "Quang hợp và hô hấp ở thực vật diễn ra vào thời điểm nào trong ngày?",
          "Tại sao người nuôi tôm công nghiệp luôn phải chạy quạt nước sục khí vào ban đêm?"
        ],
        expectedFinding: "Nguyên nhân cá chết là do ngạt thở thiếu dưỡng khí O2 vào rạng sáng do sự cộng hưởng tiêu thụ oxy của tảo hô hấp và vi khuẩn phân hủy hiếu khí."
      },
      {
        id: "SP_04_4",
        order: 4,
        question: "Thiết kế hệ sinh thái bè thủy sinh phục hồi tự nhiên kết hợp sục khí vi bọt phân tán?",
        tier: "C_DECIDE",
        tierTitle: "Tầng C: Giải pháp công nghệ sinh thái bền vững",
        requiredAtomIds: ["ATOM_47_01", "ATOM_46_01"],
        investigationSteps: [
          "Bác bỏ giải pháp phun hóa chất diệt tảo CuSO4 (vì diệt tảo chết đồng loạt lại càng gây thối đáy và tồn dư kim loại nặng độc hại).",
          "Lựa chọn giải pháp sinh thái: Thả các bè thực vật thủy sinh nổi (cây sậy, thủy trúc, bèo tây) rễ chùm dày để hấp thụ triệt để ion N và P dư thừa.",
          "Lắp đặt hệ thống sục khí vi bọt đáy hồ chạy bằng pin năng lượng mặt trời để bù đắp oxy vào ban đêm từ 0h - 6h sáng."
        ],
        guidingQuestions: [
          "Làm thế nào để 'bỏ đói' vi tảo một cách tự nhiên mà không dùng hóa chất độc hại?",
          "Vai trò của rễ cây thủy sinh trong việc lọc nước và cung cấp giá thể vi sinh vật có lợi?"
        ],
        expectedFinding: "Bè thủy sinh sinh thái che mát cạnh tranh dinh dưỡng N-P triệt để làm vi tảo tự suy giảm số lượng, kết hợp sục khí đêm đưa DO lên > 5 mg/L duy trì hệ sinh thái hồ trong sạch."
      }
    ],
    requiredKnowledgeAtomIds: ["ATOM_12_01", "ATOM_42_01", "ATOM_44_01", "ATOM_46_01", "ATOM_47_01"],
    optionalKnowledgeAtomIds: ["ATOM_09_01", "ATOM_43_01", "ATOM_41_01"],
    measurements: [
      { parameter: "Hàm lượng Oxy hòa tan trưa nắng 13h", symbol: "DO_ngay", value: "12.4", unit: "mg/L", measurementTool: "Máy đo oxy hòa tan quang học", sourceOrLocation: "Mặt nước hồ tầng mặt" },
      { parameter: "Hàm lượng Oxy hòa tan rạng sáng 4h", symbol: "DO_dem", value: "0.8", unit: "mg/L", measurementTool: "Máy đo oxy hòa tan quang học", sourceOrLocation: "Tầng nước mặt và đáy hồ" },
      { parameter: "Độ pH nước hồ lúc trưa nắng", symbol: "pH_trua", value: "9.2", unit: "pH", measurementTool: "Bút đo pH điện tử", sourceOrLocation: "Hồ đầm nuôi cá" },
      { parameter: "Nồng độ Phosphate hòa tan", symbol: "P_PO4", value: "1.85", unit: "mg/L", measurementTool: "Bộ kit so màu quang phổ", sourceOrLocation: "Cửa cống thoát mương lúa" }
    ],
    hypotheses: [
      {
        id: "HYP_04_A",
        statement: "Cá chết là do ai đó đổ lén thuốc diệt cỏ hoặc thuốc trừ sâu vào hồ vào ban đêm.",
        isSupported: false,
        verificationEvidence: "Xét nghiệm độc chất thuốc bảo vệ thực vật cho kết quả âm tính; máy đo oxy hòa tan ghi nhận DO = 0.8 mg/L vào rạng sáng khẳng định nguyên nhân tử vong là ngạt khí cấp tính."
      },
      {
        id: "HYP_04_B",
        statement: "Bón dư thừa phân đạm và lân là nguyên nhân gốc rễ thúc đẩy vi tảo bùng phát làm sụt giảm oxy ban đêm.",
        isSupported: true,
        verificationEvidence: "Dữ liệu đối chiếu nguồn nước trước và sau vụ bón phân lúa cho thấy nồng độ phosphate và nitrate tăng vọt trùng khớp với biểu đồ bùng nổ mật độ tế bào tảo."
      }
    ],
    evidenceChain: [
      {
        id: "EVID_04_1",
        claim: "Đo nồng độ oxy hòa tan lúc 4h sáng chỉ đạt 0.8 mg/L, thấp hơn nhiều ngưỡng an toàn 4.0 mg/L",
        status: "measured",
        observableSource: "Máy đo DO quang học ghi dữ liệu liên tục 24h",
        connectedAtomId: "ATOM_44_01",
        reasoningNote: "Bằng chứng mấu chốt giải thích vì sao cá chỉ chết vào rạng sáng."
      },
      {
        id: "EVID_04_2",
        claim: "Mẫu nước soi kính hiển vi thấy mật độ vi khuẩn lam Microcystis đạt trên 2.000.000 tế bào/mL",
        status: "observed",
        observableSource: "Kính hiển vi quang học phòng thực hành sinh học",
        connectedAtomId: "ATOM_42_01",
        reasoningNote: "Bằng chứng hình ảnh trực tiếp xác nhận hiện tượng tảo nở hoa."
      }
    ],
    solutionOptions: [
      {
        id: "OPT_04_A",
        title: "Mô hình Bè thủy sinh sinh học kết hợp máy sục khí vi bọt hẹn giờ tự động ban đêm",
        description: "Lắp đặt 15% diện tích mặt hồ bằng các bè thủy sinh trồng cây sậy và bèo tây kết hợp 2 dàn quạt nước sục khí chạy từ 23h đến 6h sáng.",
        feasibility: "Cao",
        costBenefit: "Chi phí đầu tư thấp, xử lý bền vững lâu dài, không sinh chất thải thứ cấp.",
        scientificBasis: "Thực vật bậc cao hấp thu triệt để đạm lân loại bỏ dinh dưỡng nuôi tảo; máy sục khí cung cấp oxy cứu cá trong thời điểm nhạy cảm.",
        pros: ["Tự nhiên bền vững", "Tạo cảnh quan đẹp", "Cá tôm sinh trưởng khỏe mạnh"],
        cons: ["Cần định kỳ 2 tháng vớt tỉa bớt sinh khối bèo tây"],
        score: 97
      }
    ],
    decisionCriteria: [
      "Khôi phục và duy trì hàm lượng oxy hòa tan DO luôn ≥ 4.0 mg/L trong suốt 24 giờ.",
      "Đưa nồng độ nitrate và phosphate trong hồ về mức an toàn theo quy chuẩn QCVN 08-MT:2023/BTNMT.",
      "Tuyệt đối không sử dụng hóa chất diệt khuẩn có hại cho sức khỏe con người và gia súc."
    ],
    validationPlan: {
      experimentName: "Mô phỏng xử lý nước hồ phú dưỡng bằng bèo tây trong bể kính thực hành",
      independentVariable: "Sự có mặt của bè bèo tây (Bể 1: Có bèo; Bể 2: Đối chứng không có bèo)",
      dependentVariable: "Nồng độ ion NO3-, PO4(3-) và độ đục của nước sau 7 ngày",
      controlVariables: ["Cùng nguồn nước hồ ô nhiễm ban đầu", "Chiếu sáng 10h/ngày", "Nhiệt độ phòng 27°C"],
      steps: [
        "Bước 1: Lấy 40 lít nước hồ ô nhiễm chia đều vào 2 bể kính 20 lít.",
        "Bước 2: Bể A thả 3 cụm bèo tây rửa sạch rễ; Bể B để trống.",
        "Bước 3: Hàng ngày đo chỉ số pH, nồng độ đạm lân bằng que thử nhanh.",
        "Bước 4: Sau 7 ngày quan sát màu nước và chụp ảnh so sánh độ trong."
      ],
      expectedMetric: "Bể có bèo tây giảm trên 75% nồng độ đạm lân, nước trong trở lại và tảo lắng cặn tự nhiên."
    },
    transferTask: {
      title: "Xây dựng dự án 'Bảo vệ nguồn nước giếng khoan và ao làng' cho cộng đồng thôn xóm",
      scenario: "Nhiều giếng khoan gia đình gần khu vực chuồng trại chăn nuôi lợn và bãi rác có mùi tanh nồng, hàm lượng nitrate trong nước ngầm vượt ngưỡng cho phép gây hội chứng xanh da ở trẻ nhỏ.",
      prompt: "Hãy vận dụng kiến thức về ô nhiễm môi trường (Bài 47), phân bón hóa học và chu trình sinh thái để thiết kế một hệ thống lọc cát - than hoạt tính - bồn sỏi trồng cây sậy xử lý nước thải sinh hoạt trước khi ngấm vào lòng đất.",
      deliverable: "Bản sơ đồ mô hình lọc sinh thái gia đình kèm tờ rơi tuyên truyền nông dân sử dụng phân bón hữu cơ vi sinh thay thế phân bón hóa học.",
      rubricCriteria: [
        "Vận dụng đúng kiến thức phân bón dư thừa và sự thẩm thấu qua các tầng đất ngầm.",
        "Mô tả chính xác cơ chế lọc cơ học của cát sỏi và cơ chế hấp thụ sinh học của rễ cây sậy.",
        "Đưa ra các giải pháp hành vi thực tiễn cho bà con nông dân (bón phân theo nguyên tắc 4 đúng)."
      ]
    },
    sourceAnchors: [
      "SGK KHTN 8 - Bài 9: Base và Thang pH (Trang 41)",
      "SGK KHTN 8 - Bài 12: Phân bón hóa học (Trang 52)",
      "SGK KHTN 8 - Bài 41: Môi trường và các nhân tố sinh thái (Trang 171)",
      "SGK KHTN 8 - Bài 42: Quần thể sinh vật (Trang 176)",
      "SGK KHTN 8 - Bài 44: Hệ sinh thái (Trang 182)",
      "SGK KHTN 8 - Bài 46: Cân bằng tự nhiên (Trang 188)",
      "SGK KHTN 8 - Bài 47: Bảo vệ môi trường (Trang 191)"
    ],
    knowledgeEdges: [
      {
        id: "EDGE_04_1",
        sourceAtomId: "ATOM_12_01",
        targetAtomId: "ATOM_41_01",
        edgeType: "CAUSES",
        description: "Dư thừa phân bón hóa học N-P-K rửa trôi làm biến đổi nghiêm trọng nhân tố sinh thái vô sinh của môi trường nước",
        evidenceBasis: "SGK KHTN 8 Bài 12 và Bài 41",
        curriculumRole: "bridge"
      },
      {
        id: "EDGE_04_2",
        sourceAtomId: "ATOM_42_01",
        targetAtomId: "ATOM_44_01",
        edgeType: "INFLUENCES",
        description: "Sự bùng nổ số lượng cá thể quần thể vi tảo lam làm đảo lộn dòng năng lượng và chuỗi thức ăn trong hệ sinh thái hồ",
        evidenceBasis: "Quy luật tương tác quần thể và hệ sinh thái SGK Bài 42 và 44",
        curriculumRole: "primary"
      },
      {
        id: "EDGE_04_3",
        sourceAtomId: "ATOM_44_01",
        targetAtomId: "ATOM_46_01",
        edgeType: "CONSTRAINS",
        description: "Sự cạn kiệt oxy hòa tan ban đêm vượt quá giới hạn chịu đựng sinh thái khiến quần xã mất cân bằng tự nhiên",
        evidenceBasis: "Khái niệm giới hạn sinh thái và cân bằng tự nhiên Bài 46",
        curriculumRole: "primary"
      }
    ]
  }
];

/**
 * Calculates Minimal Sufficient Knowledge Path (MSKP) for a given problem and student state
 */
export function calculateMinimalSufficientKnowledgePath(
  problem: InterdisciplinaryProblem,
  knownAtomIds: string[] = []
) {
  const atomRegistry: Record<string, { title: string; discipline: any; lessonId: number; lessonTitle: string; sourceAnchor: string }> = {
    ATOM_13_01: { title: "Khối lượng riêng của một chất (D = m/V)", discipline: "physics", lessonId: 13, lessonTitle: "Bài 13: Khối lượng riêng", sourceAnchor: "SGK KHTN 8 Trang 56" },
    ATOM_14_01: { title: "Thực hành xác định khối lượng riêng", discipline: "physics", lessonId: 14, lessonTitle: "Bài 14: Thực hành đo D", sourceAnchor: "SGK KHTN 8 Trang 60" },
    ATOM_15_01: { title: "Áp suất trên một bề mặt (p = F/S)", discipline: "physics", lessonId: 15, lessonTitle: "Bài 15: Áp suất bề mặt", sourceAnchor: "SGK KHTN 8 Trang 64" },
    ATOM_16_01: { title: "Áp suất chất lỏng (p = d.h)", discipline: "physics", lessonId: 16, lessonTitle: "Bài 16: Áp suất chất lỏng", sourceAnchor: "SGK KHTN 8 Trang 68" },
    ATOM_17_01: { title: "Lực đẩy Archimedes (FA = d.V)", discipline: "physics", lessonId: 17, lessonTitle: "Bài 17: Lực đẩy Archimedes", sourceAnchor: "SGK KHTN 8 Trang 73" },
    ATOM_01_01: { title: "Sử dụng an toàn hóa chất & thiết bị phòng thí nghiệm", discipline: "chemistry", lessonId: 1, lessonTitle: "Bài 1: Sử dụng hóa chất", sourceAnchor: "SGK KHTN 8 Trang 6" },
    ATOM_02_01: { title: "Phản ứng hóa học & Phản ứng tỏa nhiệt", discipline: "chemistry", lessonId: 2, lessonTitle: "Bài 2: Phản ứng hóa học", sourceAnchor: "SGK KHTN 8 Trang 11" },
    ATOM_03_01: { title: "Mol và tỉ khối chất khí (d = M_A/M_B)", discipline: "chemistry", lessonId: 3, lessonTitle: "Bài 3: Mol và tỉ khối", sourceAnchor: "SGK KHTN 8 Trang 17" },
    ATOM_04_01: { title: "Dung dịch và nồng độ phần trăm C%", discipline: "chemistry", lessonId: 4, lessonTitle: "Bài 4: Dung dịch và nồng độ", sourceAnchor: "SGK KHTN 8 Trang 21" },
    ATOM_07_01: { title: "Tốc độ phản ứng hóa học và các yếu tố ảnh hưởng", discipline: "chemistry", lessonId: 7, lessonTitle: "Bài 7: Tốc độ phản ứng", sourceAnchor: "SGK KHTN 8 Trang 31" },
    ATOM_09_01: { title: "Base và Thang đo pH môi trường", discipline: "chemistry", lessonId: 9, lessonTitle: "Bài 9: Base & pH", sourceAnchor: "SGK KHTN 8 Trang 41" },
    ATOM_11_01: { title: "Muối và độ tan trong nước", discipline: "chemistry", lessonId: 11, lessonTitle: "Bài 11: Muối", sourceAnchor: "SGK KHTN 8 Trang 48" },
    ATOM_12_01: { title: "Phân bón hóa học N-P-K và sử dụng hợp lí", discipline: "chemistry", lessonId: 12, lessonTitle: "Bài 12: Phân bón hóa học", sourceAnchor: "SGK KHTN 8 Trang 52" },
    ATOM_21_01: { title: "Dòng điện, nguồn điện & vật dẫn/cách điện", discipline: "physics", lessonId: 21, lessonTitle: "Bài 21: Dòng điện, nguồn điện", sourceAnchor: "SGK KHTN 8 Trang 88" },
    ATOM_22_01: { title: "Mạch điện đơn giản và sơ đồ mạch", discipline: "physics", lessonId: 22, lessonTitle: "Bài 22: Mạch điện đơn giản", sourceAnchor: "SGK KHTN 8 Trang 92" },
    ATOM_23_01: { title: "Tác dụng nhiệt, phát sáng, hóa học của dòng điện", discipline: "physics", lessonId: 23, lessonTitle: "Bài 23: Tác dụng dòng điện", sourceAnchor: "SGK KHTN 8 Trang 95" },
    ATOM_24_01: { title: "Cường độ dòng điện I và hiệu điện thế U", discipline: "physics", lessonId: 24, lessonTitle: "Bài 24: I và U", sourceAnchor: "SGK KHTN 8 Trang 98" },
    ATOM_25_01: { title: "Thực hành đo cường độ dòng điện và hiệu điện thế", discipline: "physics", lessonId: 25, lessonTitle: "Bài 25: Đo I và U", sourceAnchor: "SGK KHTN 8 Trang 102" },
    ATOM_26_01: { title: "Năng lượng nhiệt và nội năng vật thể", discipline: "physics", lessonId: 26, lessonTitle: "Bài 26: Năng lượng nhiệt", sourceAnchor: "SGK KHTN 8 Trang 106" },
    ATOM_27_01: { title: "Đo năng lượng nhiệt bằng Joulemeter", discipline: "physics", lessonId: 27, lessonTitle: "Bài 27: Đo Joulemeter", sourceAnchor: "SGK KHTN 8 Trang 110" },
    ATOM_28_01: { title: "Sự truyền nhiệt: Dẫn nhiệt, đối lưu, bức xạ", discipline: "physics", lessonId: 28, lessonTitle: "Bài 28: Sự truyền nhiệt", sourceAnchor: "SGK KHTN 8 Trang 114" },
    ATOM_29_01: { title: "Sự nở vì nhiệt của chất rắn, lỏng, khí", discipline: "physics", lessonId: 29, lessonTitle: "Bài 29: Sự nở vì nhiệt", sourceAnchor: "SGK KHTN 8 Trang 119" },
    ATOM_34_01: { title: "Hệ hô hấp ở người & Quá trình trao đổi khí", discipline: "biology", lessonId: 34, lessonTitle: "Bài 34: Hệ hô hấp", sourceAnchor: "SGK KHTN 8 Trang 140" },
    ATOM_41_01: { title: "Môi trường sống và các nhân tố sinh thái", discipline: "biology", lessonId: 41, lessonTitle: "Bài 41: Môi trường sinh thái", sourceAnchor: "SGK KHTN 8 Trang 171" },
    ATOM_42_01: { title: "Quần thể sinh vật và biến động số lượng", discipline: "biology", lessonId: 42, lessonTitle: "Bài 42: Quần thể sinh vật", sourceAnchor: "SGK KHTN 8 Trang 176" },
    ATOM_43_01: { title: "Quần xã sinh vật và loài ưu thế", discipline: "biology", lessonId: 43, lessonTitle: "Bài 43: Quần xã sinh vật", sourceAnchor: "SGK KHTN 8 Trang 179" },
    ATOM_44_01: { title: "Hệ sinh thái và chuỗi thức ăn", discipline: "biology", lessonId: 44, lessonTitle: "Bài 44: Hệ sinh thái", sourceAnchor: "SGK KHTN 8 Trang 182" },
    ATOM_46_01: { title: "Cân bằng tự nhiên trong hệ sinh thái", discipline: "biology", lessonId: 46, lessonTitle: "Bài 46: Cân bằng tự nhiên", sourceAnchor: "SGK KHTN 8 Trang 188" },
    ATOM_47_01: { title: "Bảo vệ môi trường và điều tra địa phương", discipline: "biology", lessonId: 47, lessonTitle: "Bài 47: Bảo vệ môi trường", sourceAnchor: "SGK KHTN 8 Trang 191" }
  };

  const allAtomIds = Array.from(new Set([...problem.requiredKnowledgeAtomIds, ...problem.optionalKnowledgeAtomIds]));

  return allAtomIds.map((atomId) => {
    const info = atomRegistry[atomId] || {
      title: `Kiến thức ${atomId}`,
      discipline: "physics",
      lessonId: 1,
      lessonTitle: "KHTN 8",
      sourceAnchor: "SGK KHTN 8"
    };

    const isRequired = problem.requiredKnowledgeAtomIds.includes(atomId);
    const isLearnerKnown = knownAtomIds.includes(atomId);

    const relevanceScore = isRequired ? 0.95 : 0.70;
    const dependencyScore = isRequired ? 0.90 : 0.65;
    const evidenceScore = 0.85;
    const transferScore = 0.88;
    const learnerNeedScore = isLearnerKnown ? 0.50 : 0.95;

    // Spec 18 Formula: score = relevance * dependency * evidence_value * transfer_value * learner_need
    const compositeScore = Math.round(
      relevanceScore * dependencyScore * evidenceScore * transferScore * learnerNeedScore * 100
    );

    return {
      atomId,
      title: info.title,
      discipline: info.discipline,
      lessonId: info.lessonId,
      lessonTitle: info.lessonTitle,
      relevanceScore,
      dependencyScore,
      evidenceScore,
      transferScore,
      learnerNeedScore,
      compositeScore,
      roleInProblem: isRequired ? "Tri thức cốt lõi bắt buộc" : "Tri thức bổ trợ mở rộng",
      sourceAnchor: info.sourceAnchor
    };
  }).sort((a, b) => b.compositeScore - a.compositeScore);
}
