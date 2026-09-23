import { Lesson, KnowledgeAtom } from "../types";
import { getEnhancedAtomsForLesson } from "./enhancedAtomsRegistry";

export const ALL_47_LESSONS: Lesson[] = [
  {
    id: 1,
    chapterId: "CH_INTRO",
    chapterName: "Bài mở đầu",
    title: "Sử dụng một số hoá chất, thiết bị cơ bản trong phòng thí nghiệm",
    sgkStartPage: 6,
    sgkEndPage: 10,
    sgvStartPage: 21,
    yccd: [
      "Nhận biết và sử dụng đúng cách các dụng cụ thuỷ tinh, pipet, buret, đèn cồn, ống nghiệm",
      "Tuân thủ các quy tắc an toàn khi tiếp xúc với hoá chất, nhiệt và thiết bị điện",
      "Biết cách xử lý sơ bộ khi xảy ra sự cố hoá chất tràn đổ hoặc bỏng nhiệt nhẹ"
    ],
    summary: "Trang bị cho học sinh kỹ năng thao tác chuẩn xác, nhận diện nhãn cảnh báo nguy hiểm (dễ cháy, ăn mòn, độc hại) và sử dụng thiết bị đo lường cơ bản trong phòng thí nghiệm KHTN.",
    coreConcepts: ["Dụng cụ thí nghiệm", "Hoá chất an toàn", "Biển cảnh báo", "Quy tắc an toàn", "Đèn cồn"],
    status: "PUBLISHED",
    atoms: [
      {
        atom_id: "ATOM_01_01",
        lesson_id: 1,
        topic: "Quy tắc an toàn hoá chất",
        statement: "Không bao giờ nếm, ngửi trực tiếp hoá chất; khi đun nóng ống nghiệm phải nghiêng miệng ống về phía không có người.",
        concept_type: "safety",
        source_anchors: ["SGK trang 6-7", "SGV trang 21-23"],
        terms: ["Hoá chất", "An toàn phòng thí nghiệm", "Biển báo nguy hiểm"],
        prerequisites: ["KHTN 6, 7"],
        related_atoms: [],
        misconceptions: [
          {
            code: "MIS_LAB_01",
            description: "Nghĩ rằng hoá chất gia dụng trong phòng lab đều an toàn như ở nhà",
            counterExample: "Giấm ăn ở nhà loãng, nhưng axit axetic đậm đặc trong phòng thí nghiệm gây bỏng da nghiêm trọng.",
            repairStrategy: "Cho học sinh quan sát biểu tượng ăn mòn và đối chiếu nồng độ hoá chất."
          }
        ],
        contexts: [
          {
            id: "CTX_01_01",
            contextClass: "home",
            title: "Bảo quản hoá chất tẩy rửa tại gia đình",
            phenomenon: "Các chai nước tẩy bồn cầu, nước lau kính đều có ký hiệu cảnh báo tương tự phòng thí nghiệm.",
            observation: "Chai tẩy rửa ghi cảnh báo 'Tránh xa tầm tay trẻ em, không để dính vào mắt'.",
            question: "Tại sao không được trộn lẫn nước tẩy javel với chất tẩy rửa có tính axit?",
            explanationRoute: "Phản ứng giữa javel và axit giải phóng khí clo độc hại gây ngạt thở.",
            evidenceSource: "textbook_context"
          },
          {
            id: "CTX_01_02",
            contextClass: "school",
            title: "Đun hoá chất bằng đèn cồn trong giờ thực hành",
            phenomenon: "Học sinh hơ đều đáy ống nghiệm trước khi đun tập trung một điểm.",
            observation: "Nếu đun ngay một điểm, ống nghiệm có thể bị nứt vỡ.",
            question: "Vì sao phải hơ nóng đều ống nghiệm trước khi đun cố định?",
            explanationRoute: "Hơ đều tránh sự giãn nở vì nhiệt không đồng đều gây vỡ thuỷ tinh.",
            evidenceSource: "sgv_context"
          }
        ],
        use_cases: ["Đọc nhãn cảnh báo", "Thao tác đun hoá chất an toàn", "Sơ cứu khi hoá chất dính vào da"],
        status: "PUBLISHED"
      }
    ]
  },
  {
    id: 2,
    chapterId: "CH_I_CHEM",
    chapterName: "Phản ứng hoá học",
    title: "Phản ứng hoá học",
    sgkStartPage: 11,
    sgkEndPage: 15,
    sgvStartPage: 26,
    yccd: [
      "Nêu được khái niệm phản ứng hoá học, chất phản ứng và sản phẩm",
      "Chỉ ra được các dấu hiệu chứng tỏ có phản ứng hoá học xảy ra",
      "Phân biệt phản ứng toả nhiệt và phản ứng thu nhiệt qua quan sát thực tế"
    ],
    summary: "Khám phá bản chất của phản ứng hoá học là sự sắp xếp lại các liên kết giữa các nguyên tử, dẫn đến sự tạo thành chất mới kèm theo biến đổi năng lượng.",
    coreConcepts: ["Phản ứng hoá học", "Chất phản ứng", "Sản phẩm", "Phản ứng toả nhiệt", "Phản ứng thu nhiệt"],
    status: "PUBLISHED",
    atoms: [
      {
        atom_id: "ATOM_02_01",
        lesson_id: 2,
        topic: "Dấu hiệu có phản ứng hoá học",
        statement: "Phản ứng hoá học xảy ra khi có sự tạo thành chất mới, biểu hiện qua: đổi màu sắc, xuất hiện chất kết tủa, giải phóng chất khí hoặc phát sinh nhiệt/ánh sáng.",
        concept_type: "phenomenon",
        source_anchors: ["SGK trang 11-13", "SGV trang 27"],
        terms: ["Chất mới", "Kết tủa", "Toả nhiệt", "Thu nhiệt"],
        prerequisites: ["Chất tinh khiết và hỗn hợp (lớp 6)"],
        related_atoms: ["ATOM_05_01", "ATOM_07_01"],
        misconceptions: [
          {
            code: "MIS_CHEM_CHANGE",
            description: "Cho rằng nước đá tan chảy hoặc nước sôi bốc hơi là phản ứng hoá học vì có biến đổi trạng thái.",
            counterExample: "Hơi nước ngưng tụ vẫn là nước lỏng (H2O), không tạo thành chất mới nào khác.",
            repairStrategy: "Phân biệt rõ hiện tượng vật lý (giữ nguyên phân tử) và hiện tượng hoá học (liên kết nguyên tử bị phá vỡ và tái sắp xếp)."
          }
        ],
        contexts: [
          {
            id: "CTX_02_01",
            contextClass: "home",
            title: "Đốt que diêm hoặc bếp ga",
            phenomenon: "Khi bật lửa, ngọn lửa bùng cháy, sinh ra nhiệt và khói mùi đặc trưng.",
            observation: "Khí metan cháy toả nhiều nhiệt dùng để đun nấu thức ăn.",
            question: "Quá trình đốt cháy ga là phản ứng toả nhiệt hay thu nhiệt?",
            explanationRoute: "Phản ứng giải phóng năng lượng nhiệt ra môi trường xung quanh là phản ứng toả nhiệt.",
            evidenceSource: "textbook_context"
          },
          {
            id: "CTX_02_02",
            contextClass: "health_safety",
            title: "Gói chườm lạnh y tế tức thì",
            phenomenon: "Khi bóp vỡ túi nước bên trong gói chườm thể thao, gói chườm lạnh ngắt ngay lập tức.",
            observation: "Nhiệt độ giảm mạnh mặc dù không để trong tủ lạnh.",
            question: "Tại sao muối amoni nitrat tan trong nước lại làm lạnh gói chườm?",
            explanationRoute: "Quá trình hoà tan hấp thu nhiệt lượng từ môi trường xung quanh (phản ứng thu nhiệt).",
            evidenceSource: "external_verified"
          }
        ],
        use_cases: ["Nhận biết sự tạo thành chất mới", "Ứng dụng phản ứng toả nhiệt để đun nấu", "Lựa chọn túi chườm y tế phù hợp"],
        status: "PUBLISHED"
      }
    ]
  },
  {
    id: 3,
    chapterId: "CH_I_CHEM",
    chapterName: "Phản ứng hoá học",
    title: "Mol và tỉ khối của chất khí",
    sgkStartPage: 16,
    sgkEndPage: 19,
    sgvStartPage: 32,
    yccd: [
      "Nêu được khái niệm về mol (lượng chất chứa 6,022 x 10^23 hạt)",
      "Tính được khối lượng mol (M), thể tích mol của chất khí ở điều kiện chuẩn (24,79 L)",
      "Tính được tỉ khối của khí A đối với khí B và đối với không khí"
    ],
    summary: "Cầu nối giữa thế giới vi mô của nguyên tử, phân tử và thế giới vĩ mô cân đo được trong phòng thí nghiệm; công thức tính tỉ khối so sánh độ nặng nhẹ của các chất khí.",
    coreConcepts: ["Mol", "Số Avogadro", "Khối lượng mol", "Thể tích mol khí ở đkc", "Tỉ khối chất khí"],
    status: "PUBLISHED",
    atoms: [
      {
        atom_id: "ATOM_03_01",
        lesson_id: 3,
        topic: "Công thức tính Mol và Khối lượng",
        statement: "Số mol chất n (mol) bằng khối lượng chất m (g) chia cho khối lượng mol M (g/mol): n = m / M.",
        concept_type: "formula",
        source_anchors: ["SGK trang 17", "SGV trang 33"],
        terms: ["n (mol)", "m (gam)", "M (g/mol)"],
        symbols: ["n", "m", "M"],
        units: ["mol", "g", "g/mol"],
        conditions: "Áp dụng cho mọi chất nguyên chất đã biết công thức hoá học.",
        prerequisites: ["Phân tử khối (lớp 7)"],
        related_atoms: ["ATOM_03_02", "ATOM_06_01"],
        misconceptions: [
          {
            code: "MIS_MOL_MASS",
            description: "Nhầm lẫn giữa 1 mol nguyên tử và 1 mol phân tử (ví dụ n(O) và n(O2)).",
            counterExample: "1 mol O nặng 16 g, nhưng 1 mol phân tử khí O2 nặng 32 g.",
            repairStrategy: "Yêu cầu ghi rõ đơn vị hạt: mol nguyên tử hay mol phân tử trước khi tính khối lượng mol."
          }
        ],
        formula: {
          formula_id: "FORMULA_03_01",
          source_anchor: "SGK KHTN 8 Kết nối tri thức trang 17",
          latex_display: "n = \\frac{m}{M}",
          plain_text: "n = m / M",
          variables: [
            { symbol: "n", name: "Số mol chất", unit: "mol", description: "Lượng chất chứa 6,022 x 10^23 hạt vi mô" },
            { symbol: "m", name: "Khối lượng chất", unit: "g", description: "Khối lượng của mẫu chất tính bằng gam" },
            { symbol: "M", name: "Khối lượng mol", unit: "g/mol", description: "Khối lượng của 1 mol chất đó" }
          ],
          conditions_of_validity: "Khối lượng m tính bằng gam (g); nếu đề cho kg cần đổi ra g.",
          derived_forms: [
            { latex: "m = n \\cdot M", targetVariable: "m", note: "Tính khối lượng khi biết số mol" },
            { latex: "M = \\frac{m}{n}", targetVariable: "M", note: "Xác định khối lượng mol của chất chưa biết" }
          ],
          example: {
            problem: "Tính số mol của 11,2 g sắt (Fe), biết khối lượng mol của Fe là 56 g/mol.",
            given: { "m": "11,2 g", "M": "56 g/mol" },
            solution: "Áp dụng công thức n = m / M = 11,2 / 56 = 0,2 (mol).",
            answer: "0,2 mol"
          },
          verification_status: "SGK_SGV_CROSSCHECKED"
        },
        contexts: [
          {
            id: "CTX_03_01",
            contextClass: "technology",
            title: "Bơm bóng bay khí Heli",
            phenomenon: "Bóng bay chứa khí Heli nhẹ hơn không khí nên bay vút lên trời.",
            observation: "Bóng chứa Heli bay cao, trong khi thổi bằng miệng (CO2, N2) lại rơi xuống đất.",
            question: "Tại sao khí Heli nhẹ hơn không khí?",
            explanationRoute: "Tỉ khối của Heli (M=4) so với không khí (M≈29) là 4/29 < 1, nên lực đẩy Archimedes của không khí nâng bóng lên.",
            evidenceSource: "textbook_context"
          }
        ],
        use_cases: ["Tính lượng chất tham gia phản ứng", "Chuyển đổi gam sang mol", "Đánh giá khí bay hay chìm trong không khí"],
        status: "PUBLISHED"
      }
    ]
  },
  {
    id: 4,
    chapterId: "CH_I_CHEM",
    chapterName: "Phản ứng hoá học",
    title: "Dung dịch và nồng độ",
    sgkStartPage: 20,
    sgkEndPage: 23,
    sgvStartPage: 37,
    yccd: [
      "Nêu được định nghĩa dung dịch, chất tan, dung môi, dung dịch bão hoà và chưa bão hoà",
      "Tính được nồng độ phần trăm (C%) của dung dịch theo khối lượng",
      "Tính được nồng độ mol (CM) của dung dịch theo thể tích"
    ],
    summary: "Học sinh hiểu cấu tạo của dung dịch, phân biệt chất tan và dung môi; làm chủ 2 công thức tính nồng độ cốt lõi của hoá học thực nghiệm: C% và CM.",
    coreConcepts: ["Chất tan", "Dung môi", "Dung dịch", "Nồng độ phần trăm C%", "Nồng độ mol CM"],
    status: "PUBLISHED",
    atoms: [
      {
        atom_id: "ATOM_04_01",
        lesson_id: 4,
        topic: "Nồng độ phần trăm C%",
        statement: "Nồng độ phần trăm (C%) của dung dịch cho biết số gam chất tan có trong 100 gam dung dịch: C% = (m_ct / m_dd) * 100%.",
        concept_type: "formula",
        source_anchors: ["SGK trang 21", "SGV trang 38"],
        terms: ["C%", "m_ct", "m_dd"],
        symbols: ["C%", "m_ct", "m_dd"],
        units: ["%", "g", "g"],
        conditions: "m_dd = m_ct + m_dm (khối lượng dung môi)",
        prerequisites: ["Phép tính tỉ lệ phần trăm"],
        related_atoms: ["ATOM_04_02"],
        misconceptions: [
          {
            code: "MIS_SOL_MASS",
            description: "Học sinh thường nhầm lẫn giữa khối lượng dung dịch (m_dd) và khối lượng dung môi (nước).",
            counterExample: "Hoà tan 10 g muối vào 90 g nước thì m_dd = 10 + 90 = 100 g, C% = 10%. Nếu chia cho 90 g nước sẽ sai.",
            repairStrategy: "Luôn viết rõ phương trình m_dd = m_ct + m_nước trước khi áp dụng công thức."
          }
        ],
        formula: {
          formula_id: "FORMULA_04_01",
          source_anchor: "SGK KHTN 8 Kết nối tri thức trang 21",
          latex_display: "C\\% = \\frac{m_{ct}}{m_{dd}} \\times 100\\%",
          plain_text: "C% = (m_ct / m_dd) * 100%",
          variables: [
            { symbol: "C%", name: "Nồng độ phần trăm", unit: "%", description: "Số gam chất tan trong 100 g dung dịch" },
            { symbol: "m_{ct}", name: "Khối lượng chất tan", unit: "g", description: "Khối lượng chất tan ban đầu" },
            { symbol: "m_{dd}", name: "Khối lượng dung dịch", unit: "g", description: "Tổng khối lượng chất tan và dung môi (m_ct + m_dm)" }
          ],
          conditions_of_validity: "m_{ct} và m_{dd} phải cùng đơn vị khối lượng (gam).",
          derived_forms: [
            { latex: "m_{ct} = \\frac{C\\% \\cdot m_{dd}}{100\\%}", targetVariable: "m_{ct}", note: "Tính khối lượng chất tan cần lấy" },
            { latex: "m_{dd} = \\frac{m_{ct} \\cdot 100\\%}{C\\%}", targetVariable: "m_{dd}", note: "Tính khối lượng dung dịch tạo thành" }
          ],
          example: {
            problem: "Hoà tan 20 g đường vào 80 g nước. Tính nồng độ phần trăm của dung dịch nước đường thu được.",
            given: { "m_ct": "20 g", "m_nước": "80 g" },
            solution: "Khối lượng dung dịch: m_dd = 20 + 80 = 100 (g). Nồng độ C% = (20 / 100) * 100% = 20%.",
            answer: "20%"
          },
          verification_status: "SGK_SGV_CROSSCHECKED"
        },
        contexts: [
          {
            id: "CTX_04_01",
            contextClass: "health_safety",
            title: "Nước muối sinh lý 0,9%",
            phenomenon: "Chai nước muối nhỏ mắt, súc họng ghi rõ nồng độ NaCl 0,9%.",
            observation: "Dung dịch có vị mặn vừa phải, không làm xót màng niêm mạc mắt.",
            question: "Con số 0,9% có ý nghĩa gì đối với 500 g nước muối sinh lý?",
            explanationRoute: "Trong 500 g dung dịch có m_ct = 500 * 0,9 / 100 = 4,5 g muối ăn tinh khiết.",
            evidenceSource: "textbook_context"
          }
        ],
        use_cases: ["Pha chế nước muối súc miệng", "Pha dung dịch dinh dưỡng cho cây", "Tính hàm lượng chất trong siro thuốc"],
        status: "PUBLISHED"
      }
    ]
  },
  {
    id: 5,
    chapterId: "CH_I_CHEM",
    chapterName: "Phản ứng hoá học",
    title: "Định luật bảo toàn khối lượng và phương trình hoá học",
    sgkStartPage: 24,
    sgkEndPage: 27,
    sgvStartPage: 44,
    yccd: [
      "Phát biểu được định luật bảo toàn khối lượng",
      "Giải thích được nguyên nhân bảo toàn khối lượng bằng sự bảo toàn số lượng nguyên tử",
      "Lập được phương trình hoá học bằng cách chọn hệ số cân bằng thích hợp"
    ],
    summary: "Nền tảng của định lượng hoá học: trong một phản ứng hoá học, tổng khối lượng của các chất sản phẩm bằng tổng khối lượng của các chất phản ứng.",
    coreConcepts: ["Định luật bảo toàn khối lượng", "Phương trình hoá học", "Hệ số cân bằng", "Bảo toàn nguyên tử"],
    status: "PUBLISHED",
    atoms: [
      {
        atom_id: "ATOM_05_01",
        lesson_id: 5,
        topic: "Định luật bảo toàn khối lượng",
        statement: "Trong một phản ứng hoá học: Tổng khối lượng của các chất tham gia phản ứng bằng tổng khối lượng của các chất sản phẩm tạo thành: m_A + m_B = m_C + m_D.",
        concept_type: "law",
        source_anchors: ["SGK trang 24-25", "SGV trang 44"],
        terms: ["Bảo toàn khối lượng", "m_chất tham gia", "m_sản phẩm"],
        symbols: ["m_A", "m_B", "m_C", "m_D"],
        units: ["g", "kg", "tấn"],
        conditions: "Phản ứng xảy ra trong hệ kín hoặc phải đo được cả khối lượng chất khí bay ra / hấp thụ.",
        prerequisites: ["Khái niệm phản ứng hoá học (Bài 2)"],
        related_atoms: ["ATOM_02_01", "ATOM_06_01"],
        misconceptions: [
          {
            code: "MIS_MASS_CONSERVATION",
            description: "Thấy đốt thanh củi thành đống tro nhẹ hơn, học sinh tưởng khối lượng bị mất đi.",
            counterExample: "Nếu gom lại toàn bộ khí CO2 và hơi nước thoát ra thì tổng khối lượng tro + khí bằng đúng khối lượng củi + khí oxi đã cháy.",
            repairStrategy: "Nhấn mạnh điều kiện hệ kín và sự tồn tại vô hình của chất khí."
          }
        ],
        contexts: [
          {
            id: "CTX_05_01",
            contextClass: "home",
            title: "Nung vôi trong lò thủ công",
            phenomenon: "Nung 100 kg đá vôi (CaCO3) chỉ thu được 56 kg vôi sống (CaO).",
            observation: "Khối lượng chất rắn giảm đi 44 kg.",
            question: "Có phải định luật bảo toàn khối lượng không đúng trong trường hợp này?",
            explanationRoute: "Định luật luôn đúng: 44 kg khí CO2 đã bay vào không khí (100 = 56 + 44).",
            evidenceSource: "textbook_context"
          }
        ],
        use_cases: ["Tính khối lượng chất còn lại", "Kiểm tra hệ số cân bằng phương trình", "Tính hiệu suất phản ứng"],
        status: "PUBLISHED"
      }
    ]
  },
  {
    id: 6,
    chapterId: "CH_I_CHEM",
    chapterName: "Phản ứng hoá học",
    title: "Tính theo phương trình hoá học",
    sgkStartPage: 28,
    sgkEndPage: 30,
    sgvStartPage: 48,
    yccd: [
      "Tính được lượng chất tham gia hoặc sản phẩm theo phương trình hoá học",
      "Tính được hiệu suất của phản ứng hoá học"
    ],
    summary: "Quy trình giải bài toán định lượng hoá học: chuyển đổi dữ kiện sang số mol -> lập tỉ lệ theo hệ số phương trình hoá học -> tính khối lượng hoặc thể tích theo yêu cầu.",
    coreConcepts: ["Tỉ lệ mol theo phương trình", "Hiệu suất phản ứng", "Lượng chất dư / thiếu"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 7,
    chapterId: "CH_I_CHEM",
    chapterName: "Phản ứng hoá học",
    title: "Tốc độ phản ứng và chất xúc tác",
    sgkStartPage: 31,
    sgkEndPage: 34,
    sgvStartPage: 51,
    yccd: [
      "Nêu được khái niệm tốc độ phản ứng",
      "Trình bày được các yếu tố ảnh hưởng đến tốc độ phản ứng (nồng độ, nhiệt độ, diện tích tiếp xúc, áp suất, chất xúc tác)",
      "Ứng dụng kiểm soát tốc độ phản ứng trong thực tiễn đời sống"
    ],
    summary: "Khám phá các yếu tố giúp tăng hoặc hãm tốc độ phản ứng hoá học; vai trò kỳ diệu của chất xúc tác trong công nghiệp và enzyme trong cơ thể sinh vật.",
    coreConcepts: ["Tốc độ phản ứng", "Nhiệt độ", "Nồng độ", "Diện tích tiếp xúc", "Chất xúc tác", "Enzyme"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 8,
    chapterId: "CH_II_COMPOUND",
    chapterName: "Một số hợp chất thông dụng",
    title: "Acid",
    sgkStartPage: 35,
    sgkEndPage: 38,
    sgvStartPage: 56,
    yccd: [
      "Nêu được khái niệm acid, công thức hoá học chung của acid",
      "Trình bày được tính chất hoá học của acid (làm quỳ tím hoá đỏ, tác dụng kim loại tạo khí H2)",
      "Nêu ứng dụng của một số acid thông dụng (HCl, H2SO4, CH3COOH)"
    ],
    summary: "Tìm hiểu hợp chất có vị chua đặc trưng, nguyên tử H liên kết gốc acid; tác dụng làm quỳ tím đổi màu và phản ứng ăn mòn kim loại.",
    coreConcepts: ["Acid", "Quỳ tím hoá đỏ", "Kim loại giải phóng H2", "HCl", "H2SO4"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 9,
    chapterId: "CH_II_COMPOUND",
    chapterName: "Một số hợp chất thông dụng",
    title: "Base. Thang pH",
    sgkStartPage: 39,
    sgkEndPage: 43,
    sgvStartPage: 60,
    yccd: [
      "Nêu được khái niệm base, phân loại base tan (kiềm) và base không tan",
      "Trình bày tính chất hoá học: làm quỳ tím hoá xanh, phenolphthalein hoá hồng",
      "Sử dụng thang pH để đánh giá độ acid, trung tính hoặc base của môi trường"
    ],
    summary: "Hợp chất chứa kim loại liên kết với nhóm hydroxide (-OH); ý nghĩa của chỉ số pH (1-14) đối với đất trồng, nước sinh hoạt và sức khoẻ con người.",
    coreConcepts: ["Base", "Kiềm (NaOH, Ca(OH)2)", "Quỳ tím hoá xanh", "Thang pH (0-14)", "Trung hoà"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 10,
    chapterId: "CH_II_COMPOUND",
    chapterName: "Một số hợp chất thông dụng",
    title: "Oxide",
    sgkStartPage: 44,
    sgkEndPage: 47,
    sgvStartPage: 65,
    yccd: [
      "Nêu được định nghĩa oxide",
      "Phân loại oxide: oxide acid, oxide base, oxide lưỡng tính, oxide trung tính",
      "Viết phương trình hoá học đặc trưng của oxide base và oxide acid"
    ],
    summary: "Hợp chất của hai nguyên tố trong đó có một nguyên tố là oxygen; cơ sở để tạo thành dung dịch acid hoặc dung dịch base khi tác dụng với nước.",
    coreConcepts: ["Oxide", "Oxide base (CaO, Na2O)", "Oxide acid (CO2, SO2)", "Oxide lưỡng tính"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 11,
    chapterId: "CH_II_COMPOUND",
    chapterName: "Một số hợp chất thông dụng",
    title: "Muối",
    sgkStartPage: 48,
    sgkEndPage: 52,
    sgvStartPage: 70,
    yccd: [
      "Nêu được khái niệm muối",
      "Trình bày tính chất hoá học của muối (tác dụng kim loại, acid, base, muối khác tạo kết tủa)",
      "Nêu các phương pháp điều chế muối và ứng dụng muối ăn NaCl trong đời sống"
    ],
    summary: "Hợp chất tạo bởi cation kim loại (hoặc amoni) và anion gốc acid; ứng dụng to lớn trong công nghiệp hoá chất, ẩm thực và y học.",
    coreConcepts: ["Muối", "Phản ứng trao đổi", "Điều kiện tạo kết tủa", "Muối ăn NaCl", "CaCO3"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 12,
    chapterId: "CH_II_COMPOUND",
    chapterName: "Một số hợp chất thông dụng",
    title: "Phân bón hoá học",
    sgkStartPage: 53,
    sgkEndPage: 55,
    sgvStartPage: 75,
    yccd: [
      "Nêu được vai trò của các nguyên tố N, P, K đối với cây trồng",
      "Phân loại phân đạm (N), phân lân (P), phân kali (K) và phân NPK",
      "Giải thích cách sử dụng phân bón an toàn, hiệu quả và bảo vệ môi trường đất, nước"
    ],
    summary: "Cung cấp dinh dưỡng khoáng thiết yếu cho nông nghiệp; tính toán hàm lượng dinh dưỡng và tác hại của việc lạm dụng phân bón gây chua đất, ô nhiễm nguồn nước.",
    coreConcepts: ["Phân đạm (N)", "Phân lân (P)", "Phân kali (K)", "Phân bón NPK", "Bảo vệ đất và nước"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 13,
    chapterId: "CH_III_DENSITY_PRESSURE",
    chapterName: "Khối lượng riêng và áp suất",
    title: "Khối lượng riêng",
    sgkStartPage: 56,
    sgkEndPage: 58,
    sgvStartPage: 80,
    yccd: [
      "Nêu được định nghĩa khối lượng riêng của một chất",
      "Viết được công thức tính khối lượng riêng D = m / V và đơn vị đo chuẩn (kg/m3, g/cm3)",
      "Tra cứu bảng khối lượng riêng và áp dụng tính khối lượng hoặc thể tích của vật"
    ],
    summary: "Đại lượng đặc trưng cho từng chất, cho biết khối lượng của một đơn vị thể tích chất đó; cơ sở để phân biệt chất nổi, chất chìm và chế tạo vật liệu.",
    coreConcepts: ["Khối lượng riêng (D hay rho)", "Thể tích (V)", "Khối lượng (m)", "Đơn vị kg/m3 và g/cm3"],
    status: "PUBLISHED",
    atoms: [
      {
        atom_id: "ATOM_13_01",
        lesson_id: 13,
        topic: "Công thức Khối lượng riêng",
        statement: "Khối lượng riêng của một chất được xác định bằng khối lượng của một đơn vị thể tích chất đó: D = m / V (hoặc rho = m / V).",
        concept_type: "formula",
        source_anchors: ["SGK trang 56-57", "SGV trang 80-81"],
        terms: ["Khối lượng riêng", "Thể tích", "Khối lượng"],
        symbols: ["D", "m", "V"],
        units: ["kg/m³", "g/cm³"],
        conditions: "Vật thể đồng chất, không có bọt khí hoặc lỗ rỗng bên trong.",
        prerequisites: ["Đo thể tích (lớp 6)", "Đo khối lượng (lớp 6)"],
        related_atoms: ["ATOM_14_01", "ATOM_17_01"],
        misconceptions: [
          {
            code: "MIS_DENSITY_INDEPENDENT",
            description: "Học sinh nghĩ rằng nếu cưa đôi một thanh sắt thì khối lượng riêng của thanh sắt sẽ giảm một nửa.",
            counterExample: "Khi cưa đôi thanh sắt, khối lượng giảm 2 lần nhưng thể tích cũng giảm 2 lần, tỉ số m / V không thay đổi.",
            repairStrategy: "Khối lượng riêng là thuộc tính bản chất của chất liệu, không phụ thuộc vào kích cỡ vật thể cụ thể."
          }
        ],
        formula: {
          formula_id: "FORMULA_13_01",
          source_anchor: "SGK KHTN 8 Kết nối tri thức trang 56",
          latex_display: "D = \\frac{m}{V}",
          plain_text: "D = m / V",
          variables: [
            { symbol: "D", name: "Khối lượng riêng", unit: "kg/m³ (hoặc g/cm³)", description: "Khối lượng của 1 đơn vị thể tích chất" },
            { symbol: "m", name: "Khối lượng", unit: "kg (hoặc g)", description: "Khối lượng của vật thể đồng chất" },
            { symbol: "V", name: "Thể tích", unit: "m³ (hoặc cm³)", description: "Thể tích không gian vật chiếm chỗ" }
          ],
          conditions_of_validity: "Nếu m dùng kg thì V phải dùng m³; nếu m dùng g thì V phải dùng cm³ (1 g/cm³ = 1000 kg/m³).",
          derived_forms: [
            { latex: "m = D \\cdot V", targetVariable: "m", note: "Tính khối lượng vật khi biết khối lượng riêng và thể tích" },
            { latex: "V = \\frac{m}{D}", targetVariable: "V", note: "Tính thể tích vật cần thiết" }
          ],
          example: {
            problem: "Một khối nhôm có thể tích 0,05 m³ và khối lượng 135 kg. Tính khối lượng riêng của nhôm.",
            given: { "m": "135 kg", "V": "0,05 m³" },
            solution: "Áp dụng D = m / V = 135 / 0,05 = 2700 (kg/m³).",
            answer: "2700 kg/m³"
          },
          verification_status: "SGK_SGV_CROSSCHECKED"
        },
        contexts: [
          {
            id: "CTX_13_01",
            contextClass: "technology",
            title: "Chọn vật liệu chế tạo vỏ máy bay",
            phenomenon: "Máy bay cần vừa nhẹ vừa bền chắc nên dùng hợp kim nhôm và titan thay vì thép nguyên chất.",
            observation: "Nhôm có D = 2700 kg/m³, trong khi sắt thép có D = 7800 kg/m³.",
            question: "Tại sao chế tạo phương tiện giao thông cần vật liệu có khối lượng riêng nhỏ?",
            explanationRoute: "Khối lượng riêng nhỏ giúp giảm tổng khối lượng phương tiện, tiết kiệm nhiên liệu và tăng hiệu suất vận tải.",
            evidenceSource: "textbook_context"
          }
        ],
        use_cases: ["Nhận biết chất liệu kim loại", "Tính trọng lượng công trình xây dựng", "Dự đoán hiện tượng chìm nổi"],
        status: "PUBLISHED"
      }
    ]
  },
  {
    id: 14,
    chapterId: "CH_III_DENSITY_PRESSURE",
    chapterName: "Khối lượng riêng và áp suất",
    title: "Thực hành xác định khối lượng riêng",
    sgkStartPage: 59,
    sgkEndPage: 63,
    sgvStartPage: 82,
    yccd: [
      "Sử dụng cân điện tử và bình chia độ để đo khối lượng và thể tích của vật rắn",
      "Thực hiện đo khối lượng riêng của chất lỏng bằng bình chia độ và cân",
      "Tính toán sai số thí nghiệm và lập báo cáo kết quả thực hành"
    ],
    summary: "Rèn luyện kỹ năng thực nghiệm đo đạc thực tế: đo thể tích vật có hình dạng hình học đều và hình dạng bất kỳ (bằng phương pháp chìm trong nước).",
    coreConcepts: ["Thực hành đo", "Bình chia độ", "Cân điện tử", "Xử lý sai số đo"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 15,
    chapterId: "CH_III_DENSITY_PRESSURE",
    chapterName: "Khối lượng riêng và áp suất",
    title: "Áp suất trên một bề mặt",
    sgkStartPage: 64,
    sgkEndPage: 66,
    sgvStartPage: 85,
    yccd: [
      "Nêu được khái niệm áp lực và áp suất",
      "Viết được công thức tính áp suất p = F / S và đơn vị Pascal (Pa, N/m2)",
      "Giải thích các biện pháp làm tăng, giảm áp suất trong đời sống và kỹ thuật"
    ],
    summary: "Tác dụng của áp lực phụ thuộc đồng thời vào độ lớn của lực và diện tích bề mặt bị ép; giải thích tại sao dao sắc thì dễ cắt gọt, bánh xích xe tăng không bị lún lầy.",
    coreConcepts: ["Áp lực (F)", "Diện tích bị ép (S)", "Áp suất (p = F/S)", "Đơn vị Pascal (Pa)"],
    status: "PUBLISHED",
    atoms: [
      {
        atom_id: "ATOM_15_01",
        lesson_id: 15,
        topic: "Công thức Áp suất bề mặt",
        statement: "Áp suất là độ lớn của áp lực trên một đơn vị diện tích bị ép: p = F / S.",
        concept_type: "formula",
        source_anchors: ["SGK trang 64", "SGV trang 85"],
        terms: ["Áp suất", "Áp lực", "Diện tích bị ép"],
        symbols: ["p", "F", "S"],
        units: ["Pa (N/m²)", "N", "m²"],
        conditions: "Lực ép F phải vuông góc với bề mặt tiếp xúc S.",
        prerequisites: ["Lực (lớp 6)"],
        related_atoms: ["ATOM_16_01"],
        misconceptions: [
          {
            code: "MIS_PRESSURE_FORCE",
            description: "Đồng nhất áp lực và áp suất, nghĩ rằng lực càng lớn thì áp suất luôn lớn.",
            counterExample: "Người đi giày cao gót nhọn tạo áp suất lên sàn nhà lớn hơn cả con voi lớn đứng bằng 4 bàn chân bè rộng.",
            repairStrategy: "Nhấn mạnh áp suất phụ thuộc vào tỉ số F / S, diện tích S càng nhỏ thì áp suất càng lớn."
          }
        ],
        formula: {
          formula_id: "FORMULA_15_01",
          source_anchor: "SGK KHTN 8 Kết nối tri thức trang 64",
          latex_display: "p = \\frac{F}{S}",
          plain_text: "p = F / S",
          variables: [
            { symbol: "p", name: "Áp suất", unit: "Pa (1 Pa = 1 N/m²)", description: "Áp suất tác dụng lên bề mặt" },
            { symbol: "F", name: "Áp lực", unit: "N (Newton)", description: "Lực nén vuông góc với mặt tiếp xúc" },
            { symbol: "S", name: "Diện tích bị ép", unit: "m²", description: "Diện tích bề mặt tiếp xúc vuông góc" }
          ],
          conditions_of_validity: "Diện tích S bắt buộc đổi ra mét vuông (m²). 1 cm² = 10^-4 m².",
          derived_forms: [
            { latex: "F = p \\cdot S", targetVariable: "F", note: "Tính áp lực tác dụng" },
            { latex: "S = \\frac{F}{p}", targetVariable: "S", note: "Tính diện tích tiếp xúc cần thiết để chịu tải" }
          ],
          example: {
            problem: "Một bao xi măng có trọng lượng 500 N đặt nằm trên sàn với diện tích tiếp xúc là 0,25 m². Tính áp suất tác dụng lên sàn.",
            given: { "F": "500 N", "S": "0,25 m²" },
            solution: "Áp suất: p = F / S = 500 / 0,25 = 2000 (Pa).",
            answer: "2000 Pa"
          },
          verification_status: "SGK_SGV_CROSSCHECKED"
        },
        contexts: [
          {
            id: "CTX_15_01",
            contextClass: "home",
            title: "Mài sắc lưỡi dao kéo",
            phenomenon: "Khi dao bị cùn thì thái thịt rất khó, nhưng mài sắc lưỡi mỏng thì cắt nhẹ nhàng.",
            observation: "Lưỡi dao mài mỏng có diện tích bề mặt S cực nhỏ.",
            question: "Tại sao cùng một lực ấn tay, dao sắc lại cắt đứt vật thể dễ hơn?",
            explanationRoute: "Diện tích S rất nhỏ làm áp suất p = F / S tăng vọt, vượt quá giới hạn chịu lực của vật liệu cần cắt.",
            evidenceSource: "textbook_context"
          }
        ],
        use_cases: ["Thiết kế móng nhà chịu lực", "Thiết kế lốp xe cát/bánh xích xe tăng", "Cắt gọt gia công vật liệu"],
        status: "PUBLISHED"
      }
    ]
  },
  {
    id: 16,
    chapterId: "CH_III_DENSITY_PRESSURE",
    chapterName: "Khối lượng riêng và áp suất",
    title: "Áp suất chất lỏng. Áp suất khí quyển",
    sgkStartPage: 67,
    sgkEndPage: 72,
    sgvStartPage: 88,
    yccd: [
      "Mô tả được áp suất chất lỏng tác dụng theo mọi phương và tăng theo độ sâu",
      "Viết được công thức tính áp suất chất lỏng p = d * h",
      "Nêu được bằng chứng chứng tỏ sự tồn tại của áp suất khí quyển và ứng dụng bình xịt, ống hút"
    ],
    summary: "Chất lỏng gây áp suất lên đáy bình, thành bình và các vật chìm trong nó theo mọi phương; lớp không khí bao quanh Trái Đất tạo nên áp suất khí quyển giữ cho nước trong ống hút không rơi xuống.",
    coreConcepts: ["Áp suất chất lỏng", "Độ sâu h", "Áp suất khí quyển", "Nguyên lý bình thông nhau"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 17,
    chapterId: "CH_III_DENSITY_PRESSURE",
    chapterName: "Khối lượng riêng và áp suất",
    title: "Lực đẩy Archimedes",
    sgkStartPage: 73,
    sgkEndPage: 75,
    sgvStartPage: 93,
    yccd: [
      "Nêu được phương, chiều và công thức tính độ lớn lực đẩy Archimedes: FA = d * V",
      "Giải thích được điều kiện chìm, lơ lửng, nổi của một vật trong chất lỏng",
      "Vận dụng nguyên lý lực đẩy Archimedes giải thích tàu ngầm lặn nổi và tàu thép nổi trên biển"
    ],
    summary: "Mọi vật nhúng trong chất lỏng đều chịu một lực đẩy hướng thẳng đứng từ dưới lên, có độ lớn đúng bằng trọng lượng phần chất lỏng bị vật chiếm chỗ.",
    coreConcepts: ["Lực đẩy Archimedes FA", "Thể tích chiếm chỗ V", "Trọng lượng riêng d", "Điều kiện chìm nổi"],
    status: "PUBLISHED",
    atoms: [
      {
        atom_id: "ATOM_17_01",
        lesson_id: 17,
        topic: "Công thức Lực đẩy Archimedes",
        statement: "Độ lớn lực đẩy Archimedes bằng trọng lượng phần chất lỏng bị vật chiếm chỗ: FA = d * V = rho * g * V.",
        concept_type: "formula",
        source_anchors: ["SGK trang 73-74", "SGV trang 93"],
        terms: ["Lực đẩy Archimedes", "Trọng lượng riêng chất lỏng", "Thể tích phần vật chìm"],
        symbols: ["F_A", "d", "V"],
        units: ["N", "N/m³", "m³"],
        conditions: "V là thể tích của phần vật chìm trong chất lỏng, không nhất thiết là toàn bộ thể tích vật.",
        prerequisites: ["Trọng lượng (lớp 6)", "Khối lượng riêng (Bài 13)"],
        related_atoms: ["ATOM_13_01", "ATOM_16_01"],
        misconceptions: [
          {
            code: "MIS_ARCHIMEDES_DEPTH",
            description: "Tưởng rằng càng lặn sâu xuống đáy nước thì lực đẩy Archimedes càng lớn.",
            counterExample: "Khi vật đã chìm hoàn toàn trong nước, thể tích V không đổi, d của nước xem như không đổi nên FA giữ nguyên dù ở độ sâu 2m hay 10m.",
            repairStrategy: "Phân biệt rõ: áp suất tăng theo độ sâu (p = d*h), nhưng lực đẩy Archimedes FA chỉ phụ thuộc thể tích phần chìm V."
          }
        ],
        formula: {
          formula_id: "FORMULA_17_01",
          source_anchor: "SGK KHTN 8 Kết nối tri thức trang 73",
          latex_display: "F_A = d \\cdot V",
          plain_text: "F_A = d * V",
          variables: [
            { symbol: "F_A", name: "Lực đẩy Archimedes", unit: "N", description: "Lực nâng hướng thẳng đứng lên trên" },
            { symbol: "d", name: "Trọng lượng riêng chất lỏng", unit: "N/m³", description: "Trọng lượng của 1 m³ chất lỏng (d = 10 * D)" },
            { symbol: "V", name: "Thể tích phần vật chìm", unit: "m³", description: "Thể tích phần chất lỏng bị vật chiếm chỗ" }
          ],
          conditions_of_validity: "V phải là thể tích phần ngập trong chất lỏng, đơn vị chuẩn là mét khối (m³).",
          derived_forms: [
            { latex: "V = \\frac{F_A}{d}", targetVariable: "V", note: "Xác định thể tích phần chìm của vật nổi" },
            { latex: "d = \\frac{F_A}{V}", targetVariable: "d", note: "Xác định trọng lượng riêng chất lỏng" }
          ],
          example: {
            problem: "Một quả cầu nhôm có thể tích 0,002 m³ nhúng chìm hoàn toàn trong nước có d = 10000 N/m³. Tính lực đẩy Archimedes tác dụng lên quả cầu.",
            given: { "V": "0,002 m³", "d": "10000 N/m³" },
            solution: "F_A = d * V = 10000 * 0,002 = 20 (N).",
            answer: "20 N"
          },
          verification_status: "SGK_SGV_CROSSCHECKED"
        },
        contexts: [
          {
            id: "CTX_17_01",
            contextClass: "technology",
            title: "Tàu ngầm lặn và nổi trên đại dương",
            phenomenon: "Tàu ngầm có thể nổi trên mặt biển, lơ lửng ở độ sâu mong muốn hoặc lặn sâu xuống đáy biển.",
            observation: "Tàu bơm nước biển vào khoang dằn để lặn, và dùng khí nén đẩy nước ra để nổi.",
            question: "Làm thế nào tàu ngầm thay đổi trạng thái chìm nổi mà kích thước vỏ tàu không đổi?",
            explanationRoute: "Thể tích V không đổi nên FA cố định. Bơm nước vào làm tăng trọng lượng P (P > FA -> chìm), đẩy nước ra làm giảm P (P < FA -> nổi).",
            evidenceSource: "textbook_context"
          }
        ],
        use_cases: ["Thiết kế tàu thuỷ, bè phao cứu sinh", "Nguyên lý lặn nổi của tàu ngầm", "Đo thể tích vật xốp nổi"],
        status: "PUBLISHED"
      }
    ]
  },
  {
    id: 18,
    chapterId: "CH_IV_ROTATION",
    chapterName: "Tác dụng làm quay của lực",
    title: "Tác dụng làm quay của lực. Moment lực",
    sgkStartPage: 76,
    sgkEndPage: 78,
    sgvStartPage: 98,
    yccd: [
      "Nêu được tác dụng làm quay của lực quanh một trục cố định",
      "Định nghĩa được moment lực đặc trưng cho tác dụng làm quay: M = F * d",
      "Xác định được giá của lực và cánh tay đòn d từ trục quay đến giá của lực"
    ],
    summary: "Lực tác dụng vào một vật có trục quay cố định có thể làm vật quay; tác dụng làm quay mạnh hay yếu phụ thuộc vào độ lớn của lực và khoảng cách từ trục quay đến giá của lực (cánh tay đòn).",
    coreConcepts: ["Trục quay", "Cánh tay đòn d", "Moment lực M = F * d", "Tác dụng làm quay"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 19,
    chapterId: "CH_IV_ROTATION",
    chapterName: "Tác dụng làm quay của lực",
    title: "Đòn bẩy và ứng dụng",
    sgkStartPage: 79,
    sgkEndPage: 83,
    sgvStartPage: 103,
    yccd: [
      "Nhận biết được điểm tựa (O), điểm đặt của lực tác dụng (O1) và lực nâng (O2) trên đòn bẩy",
      "Phân biệt 3 loại đòn bẩy: đòn bẩy cho lợi về lực và đòn bẩy cho lợi về đường đi",
      "Vận dụng quy tắc đòn bẩy giải thích hoạt động của bập bênh, kìm cắt, kéo, xà beng"
    ],
    summary: "Một máy cơ đơn giản cổ xưa và phổ biến nhất của nhân loại: điều kiện cân bằng đòn bẩy F1 * d1 = F2 * d2 giúp con người nâng vật nặng hàng tấn bằng lực tay.",
    coreConcepts: ["Điểm tựa O", "Cánh tay đòn", "Đòn bẩy loại 1, 2, 3", "Lợi về lực", "F1*d1 = F2*d2"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 20,
    chapterId: "CH_V_ELECTRICITY",
    chapterName: "Điện",
    title: "Hiện tượng nhiễm điện do cọ xát",
    sgkStartPage: 84,
    sgkEndPage: 87,
    sgvStartPage: 109,
    yccd: [
      "Mô tả được hiện tượng nhiễm điện do cọ xát",
      "Nêu được hai loại điện tích (dương và âm); các điện tích cùng loại đẩy nhau, khác loại hút nhau",
      "Giải thích nguyên nhân nhiễm điện do sự dịch chuyển của các hạt electron mang điện tích âm"
    ],
    summary: "Nguồn gốc của tĩnh điện: cọ xát làm electron di chuyển từ vật này sang vật khác; vật nhận thêm electron nhiễm điện âm, vật mất bớt electron nhiễm điện dương.",
    coreConcepts: ["Nhiễm điện cọ xát", "Điện tích dương (+)", "Điện tích âm (-)", "Electron dịch chuyển", "Hút đẩy tĩnh điện"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 21,
    chapterId: "CH_V_ELECTRICITY",
    chapterName: "Điện",
    title: "Dòng điện. Nguồn điện",
    sgkStartPage: 88,
    sgkEndPage: 90,
    sgvStartPage: 113,
    yccd: [
      "Nêu được định nghĩa dòng điện là dòng các điện tích dịch chuyển có hướng",
      "Nêu được vai trò của nguồn điện trong việc duy trì dòng điện trong mạch",
      "Phân biệt chất dẫn điện và chất cách điện thường gặp"
    ],
    summary: "Dòng điện thắp sáng và vận hành thế giới văn minh: bản chất là dòng electron tự do chạy trong kim loại dưới tác dụng lực của nguồn điện (pin, acquy).",
    coreConcepts: ["Dòng điện", "Dịch chuyển có hướng", "Nguồn điện (Pin)", "Chất dẫn điện", "Chất cách điện"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 22,
    chapterId: "CH_V_ELECTRICITY",
    chapterName: "Điện",
    title: "Mạch điện đơn giản",
    sgkStartPage: 91,
    sgkEndPage: 94,
    sgvStartPage: 118,
    yccd: [
      "Vẽ và nhận biết các ký hiệu quy ước của các phần tử trong sơ đồ mạch điện",
      "Lắp ráp được mạch điện đơn giản gồm nguồn điện, công tắc, bóng đèn và dây nối",
      "Giải thích được nguyên nhân mạch hở, ngắn mạch (đoản mạch) và vai trò của cầu chì"
    ],
    summary: "Ngôn ngữ kỹ thuật điện: đọc sơ đồ mạch, lắp ráp mạch điện kín, bảo vệ mạch điện an toàn bằng cầu chì hoặc aptomat tự động.",
    coreConcepts: ["Sơ đồ mạch điện", "Ký hiệu linh kiện", "Mạch kín / Mạch hở", "Đoản mạch", "Cầu chì an toàn"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 23,
    chapterId: "CH_V_ELECTRICITY",
    chapterName: "Điện",
    title: "Tác dụng của dòng điện",
    sgkStartPage: 95,
    sgkEndPage: 98,
    sgvStartPage: 121,
    yccd: [
      "Mô tả và nêu ví dụ về 5 tác dụng chính của dòng điện: nhiệt, phát sáng, hoá học, từ và sinh lý",
      "Ứng dụng tác dụng từ chế tạo nam châm điện; ứng dụng tác dụng hoá học trong mạ điện",
      "Nhận biết nguy hiểm của tác dụng sinh lý khi bị điện giật và quy tắc an toàn điện"
    ],
    summary: "Đa dạng ứng dụng năng lượng điện: từ làm nóng bàn là, thắp sáng đèn LED, mạ kim loại đến kích tim y tế và tác hại chết người của điện giật.",
    coreConcepts: ["Tác dụng nhiệt", "Tác dụng phát sáng", "Tác dụng từ", "Tác dụng hoá học (mạ điện)", "Tác dụng sinh lý"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 24,
    chapterId: "CH_V_ELECTRICITY",
    chapterName: "Điện",
    title: "Cường độ dòng điện và hiệu điện thế",
    sgkStartPage: 99,
    sgkEndPage: 101,
    sgvStartPage: 126,
    yccd: [
      "Nêu được khái niệm cường độ dòng điện đặc trưng cho độ mạnh yếu của dòng điện (kí hiệu I, đơn vị Ampe A)",
      "Nêu được khái niệm hiệu điện thế giữa hai cực của nguồn điện (kí hiệu U, đơn vị Vôn V)",
      "Mô tả cách mắc Ampe kế nối tiếp và Vôn kế song song trong mạch điện"
    ],
    summary: "Hai đại lượng cốt lõi đo lường điện năng: Cường độ I (Ampe) đo lưu lượng điện tích; Hiệu điện thế U (Volt) đo khả năng sinh công của nguồn điện.",
    coreConcepts: ["Cường độ I (Ampe)", "Hiệu điện thế U (Volt)", "Ampe kế (mắc nối tiếp)", "Vôn kế (mắc song song)"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 25,
    chapterId: "CH_V_ELECTRICITY",
    chapterName: "Điện",
    title: "Thực hành đo cường độ dòng điện và hiệu điện thế",
    sgkStartPage: 102,
    sgkEndPage: 104,
    sgvStartPage: 131,
    yccd: [
      "Lắp ráp dụng cụ và tiến hành đo cường độ dòng điện bằng Ampe kế",
      "Tiến hành đo hiệu điện thế hai đầu bóng đèn bằng Vôn kế",
      "Rút ra nhận xét về mối liên hệ giữa U và I đối với một vật dẫn"
    ],
    summary: "Thực hành phòng lab chuẩn xác: chọn thang đo, chỉnh kim về 0, mắc đúng cực dương (+) âm (-), đọc kết quả và bảo vệ thiết bị đo không bị cháy.",
    coreConcepts: ["Thực hành đo I", "Thực hành đo U", "Quy tắc chỉnh kim", "Tránh quá tải"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 26,
    chapterId: "CH_VI_HEAT",
    chapterName: "Nhiệt",
    title: "Năng lượng nhiệt và nội năng",
    sgkStartPage: 105,
    sgkEndPage: 108,
    sgvStartPage: 136,
    yccd: [
      "Nêu được khái niệm nội năng là tổng động năng và thế năng của các phân tử cấu tạo nên vật",
      "Nêu được hai cách làm thay đổi nội năng: thực hiện công và truyền nhiệt",
      "Định nghĩa nhiệt lượng là phần nhiệt năng mà vật nhận thêm hay mất bớt trong quá trình truyền nhiệt"
    ],
    summary: "Thế giới chuyển động hỗn loạn của phân tử: khi nhiệt độ tăng thì các phân tử chuyển động nhanh hơn, nội năng của vật tăng lên.",
    coreConcepts: ["Nội năng", "Năng lượng nhiệt", "Nhiệt lượng Q", "Thực hiện công", "Truyền nhiệt"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 27,
    chapterId: "CH_VI_HEAT",
    chapterName: "Nhiệt",
    title: "Thực hành đo năng lượng nhiệt bằng joulemeter",
    sgkStartPage: 109,
    sgkEndPage: 111,
    sgvStartPage: 142,
    yccd: [
      "Sử dụng joulemeter để đo năng lượng nhiệt cung cấp cho một khối lượng nước nhất định",
      "Xác định độ tăng nhiệt độ tương ứng bằng nhiệt kế",
      "Xử lý số liệu và rút ra kết luận về mối liên hệ giữa năng lượng nhiệt và độ biến thiên nhiệt độ"
    ],
    summary: "Sử dụng thiết bị đo năng lượng hiện đại (joulemeter) để định lượng chính xác số Joule nhiệt năng cần thiết để đun nóng chất lỏng.",
    coreConcepts: ["Joulemeter", "Đo nhiệt lượng Joule", "Nhiệt kế", "Độ tăng nhiệt độ"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 28,
    chapterId: "CH_VI_HEAT",
    chapterName: "Nhiệt",
    title: "Sự truyền nhiệt",
    sgkStartPage: 112,
    sgkEndPage: 117,
    sgvStartPage: 147,
    yccd: [
      "Mô tả được ba hình thức truyền nhiệt: dẫn nhiệt, đối lưu và bức xạ nhiệt",
      "Phân biệt vật dẫn nhiệt tốt (kim loại) và vật cách nhiệt tốt (gỗ, xốp, không khí)",
      "Giải thích hiện tượng gió biển, cấu tạo phích nước (bình giữ nhiệt) và hiệu ứng nhà kính"
    ],
    summary: "Nhiệt luôn tự truyền từ vật nóng hơn sang vật lạnh hơn qua 3 con đường: tiếp xúc phân tử (dẫn nhiệt), dòng chất lưu (đối lưu) và tia nhiệt hồng ngoại xuyên chân không (bức xạ nhiệt).",
    coreConcepts: ["Dẫn nhiệt", "Đối lưu", "Bức xạ nhiệt", "Bình giữ nhiệt", "Hiệu ứng nhà kính"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 29,
    chapterId: "CH_VI_HEAT",
    chapterName: "Nhiệt",
    title: "Sự nở vì nhiệt",
    sgkStartPage: 118,
    sgkEndPage: 122,
    sgvStartPage: 155,
    yccd: [
      "Mô tả được hiện tượng nở vì nhiệt của chất rắn, chất lỏng và chất khí",
      "So sánh sự nở vì nhiệt của các chất: khí nở nhiều nhất, rắn nở ít nhất",
      "Giải thích cấu tạo khe hở trên đường ray xe lửa, cầu cạn và nguyên lý hoạt động của băng kép"
    ],
    summary: "Khi nóng lên thì nở ra, khi lạnh đi thì co lại; lực sinh ra khi sự giãn nở vì nhiệt bị ngăn cản có thể làm cong đường ray thép hoặc kích hoạt rơ-le ngắt điện tự động trong bàn là.",
    coreConcepts: ["Nở vì nhiệt", "Chất rắn, lỏng, khí", "Băng kép rơ-le", "Khe hở đường ray", "Nhiệt kế thuỷ ngân"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 30,
    chapterId: "CH_VII_HUMAN_BIO",
    chapterName: "Sinh học cơ thể người",
    title: "Khái quát về cơ thể người",
    sgkStartPage: 123,
    sgkEndPage: 124,
    sgvStartPage: 161,
    yccd: [
      "Nêu được các phần của cơ thể người: đầu, thân và các chi",
      "Kể tên các hệ cơ quan chính trong cơ thể và vai trò phối hợp nhịp nhàng giữa chúng",
      "Nêu tế bào là đơn vị cấu tạo và chức năng của cơ thể sống"
    ],
    summary: "Bức tranh toàn cảnh về cỗ máy sinh học kỳ diệu: sự phối hợp chặt chẽ giữa hệ thần kinh, thể dịch và các hệ cơ quan để duy trì sự sống.",
    coreConcepts: ["Cơ thể người", "Hệ cơ quan", "Phối hợp hoạt động", "Đơn vị tế bào"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 31,
    chapterId: "CH_VII_HUMAN_BIO",
    chapterName: "Sinh học cơ thể người",
    title: "Hệ vận động ở người",
    sgkStartPage: 125,
    sgkEndPage: 127,
    sgvStartPage: 163,
    yccd: [
      "Mô tả được cấu tạo và chức năng của bộ xương và hệ cơ ở người",
      "Nêu nguyên nhân gây cong vẹo cột sống, tật gù lưng ở lứa tuổi học sinh",
      "Trình bày các biện pháp rèn luyện thể dục thể thao và tư thế ngồi học hợp lý để bảo vệ xương khớp"
    ],
    summary: "Bộ khung vững chắc và hệ thống cơ bắp tạo nên mọi vận động; phòng chống dị tật cột sống học đường và sơ cứu khi gãy xương.",
    coreConcepts: ["Bộ xương", "Hệ cơ", "Khớp xương", "Cong vẹo cột sống", "Tư thế ngồi học"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 32,
    chapterId: "CH_VII_HUMAN_BIO",
    chapterName: "Sinh học cơ thể người",
    title: "Dinh dưỡng và tiêu hoá ở người",
    sgkStartPage: 128,
    sgkEndPage: 134,
    sgvStartPage: 168,
    yccd: [
      "Nêu các nhóm chất dinh dưỡng cần thiết cho cơ thể (carbohydrate, lipid, protein, vitamin, khoáng chất)",
      "Mô tả đường đi và quá trình biến đổi cơ học, hoá học của thức ăn trong ống tiêu hoá",
      "Trình bày nguyên tắc xây dựng khẩu phần ăn hợp lý và phòng tránh bệnh về tiêu hoá"
    ],
    summary: "Hành trình biến đổi thức ăn thành các phân tử dinh dưỡng nuôi tế bào nhờ hệ thống enzyme tiêu hoá ở khoang miệng, dạ dày và ruột non.",
    coreConcepts: ["Ống tiêu hoá", "Enzyme tiêu hoá", "Hấp thụ dinh dưỡng", "Khẩu phần ăn cân đối", "Vệ sinh an toàn thực phẩm"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 33,
    chapterId: "CH_VII_HUMAN_BIO",
    chapterName: "Sinh học cơ thể người",
    title: "Máu và hệ tuần hoàn của cơ thể người",
    sgkStartPage: 135,
    sgkEndPage: 141,
    sgvStartPage: 176,
    yccd: [
      "Nêu thành phần của máu (huyết tương, hồng cầu, bạch cầu, tiểu cầu) và chức năng của từng thành phần",
      "Mô tả cấu tạo tim và hai vòng tuần hoàn (vòng tuần hoàn lớn và vòng tuần hoàn nhỏ)",
      "Nêu nguyên tắc truyền máu an toàn (nhóm máu ABO, Rh) và bảo vệ tim mạch"
    ],
    summary: "Dòng sông đỏ nuôi cơ thể: quả tim đập liên tục bơm máu giàu oxy đến từng tế bào; cơ chế đông máu tự nhiên và hệ thống miễn dịch bạch cầu bảo vệ cơ thể.",
    coreConcepts: ["Hồng cầu (Hb)", "Bạch cầu (miễn dịch)", "Tiểu cầu (đông máu)", "Tim 4 ngăn", "Nhóm máu ABO"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 34,
    chapterId: "CH_VII_HUMAN_BIO",
    chapterName: "Sinh học cơ thể người",
    title: "Hệ hô hấp ở người",
    sgkStartPage: 142,
    sgkEndPage: 145,
    sgvStartPage: 183,
    yccd: [
      "Mô tả cấu tạo hệ hô hấp (đường dẫn khí và phổi chứa phế nang)",
      "Giải thích cơ chế trao đổi khí ở phổi và ở tế bào dựa trên sự khuếch tán khí O2 và CO2",
      "Nêu tác hại của khói thuốc lá, bụi mịn và biện pháp bảo vệ lá phổi khoẻ mạnh"
    ],
    summary: "Hơi thở của sự sống: cơ chế hô hấp thông khí và trao đổi khí qua thành màng phế nang mỏng manh; cảnh báo khói thuốc lá tàn phá lá phổi.",
    coreConcepts: ["Đường dẫn khí", "Phế nang phổi", "Khuếch tán khí O2/CO2", "Tác hại khói thuốc", "Hít thở sâu"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 35,
    chapterId: "CH_VII_HUMAN_BIO",
    chapterName: "Sinh học cơ thể người",
    title: "Hệ bài tiết ở người",
    sgkStartPage: 146,
    sgkEndPage: 149,
    sgvStartPage: 189,
    yccd: [
      "Mô tả cấu tạo của hệ bài tiết nước tiểu gồm thận, ống dẫn nước tiểu, bóng đái và ống đái",
      "Trình bày quá trình lọc máu tạo thành nước tiểu ở các đơn vị chức năng nephron của thận",
      "Nêu các thói quen tốt để phòng chống sỏi thận và suy thận"
    ],
    summary: "Nhà máy thanh lọc chất độc nội sinh: thận lọc máu liên tục để loại bỏ urê, axit uric và cân bằng nồng độ muối khoáng trong huyết tương.",
    coreConcepts: ["Thận (nephron)", "Lọc máu", "Nước tiểu đầu và chính thức", "Sỏi thận", "Uống đủ nước"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 36,
    chapterId: "CH_VII_HUMAN_BIO",
    chapterName: "Sinh học cơ thể người",
    title: "Điều hoà môi trường trong của cơ thể người",
    sgkStartPage: 150,
    sgkEndPage: 151,
    sgvStartPage: 193,
    yccd: [
      "Nêu khái niệm môi trường trong của cơ thể (máu, dịch mô, bạch huyết)",
      "Giải thích cơ chế cân bằng nội môi: điều hoà lượng đường huyết, huyết áp và nồng độ muối",
      "Phân tích nguy cơ bệnh tiểu đường và tăng huyết áp khi mất cân bằng môi trường trong"
    ],
    summary: "Khái niệm Homeostasis: cơ thể duy trì nồng độ glucose, pH, nhiệt độ và áp suất thẩm thấu ổn định để tế bào hoạt động bình thường.",
    coreConcepts: ["Môi trường trong", "Cân bằng nội môi (Homeostasis)", "Đường huyết", "Huyết áp"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 37,
    chapterId: "CH_VII_HUMAN_BIO",
    chapterName: "Sinh học cơ thể người",
    title: "Hệ thần kinh và các giác quan ở người",
    sgkStartPage: 152,
    sgkEndPage: 156,
    sgvStartPage: 196,
    yccd: [
      "Mô tả cấu tạo hệ thần kinh trung ương (não bộ, tuỷ sống) và hệ thần kinh ngoại biên",
      "Phân biệt phản xạ không điều kiện và phản xạ có điều kiện",
      "Mô tả cấu tạo và chức năng của mắt, tai; giải thích tật cận thị và biện pháp bảo vệ thị lực"
    ],
    summary: "Trung tâm chỉ huy tối cao: nơron thần kinh dẫn truyền xung điện cực nhanh; cơ chế nhìn của mắt, nghe của tai và phòng tránh tật khúc xạ cận thị học đường.",
    coreConcepts: ["Não bộ & Tuỷ sống", "Nơron", "Phản xạ có/không điều kiện", "Cấu tạo mắt & tai", "Cận thị"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 38,
    chapterId: "CH_VII_HUMAN_BIO",
    chapterName: "Sinh học cơ thể người",
    title: "Hệ nội tiết ở người",
    sgkStartPage: 157,
    sgkEndPage: 159,
    sgvStartPage: 201,
    yccd: [
      "Phân biệt tuyến nội tiết và tuyến ngoại tiết",
      "Kể tên các tuyến nội tiết quan trọng: tuyến yên, tuyến giáp, tuyến tuỵ, tuyến trên thận, tuyến sinh dục",
      "Nêu vai trò của hormone trong điều hoà sinh trưởng và chuyển hoá (insulin, glucagon, thyroxin)"
    ],
    summary: "Hệ thống truyền tin hoá học: các hormone được tiết trực tiếp vào máu với lượng siêu nhỏ nhưng có tác dụng điều hoà sinh trưởng và chuyển hoá mạnh mẽ.",
    coreConcepts: ["Tuyến nội tiết", "Hormone", "Tuyến yên & Tuyến giáp", "Insulin và Glucagon", "Bướu cổ"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 39,
    chapterId: "CH_VII_HUMAN_BIO",
    chapterName: "Sinh học cơ thể người",
    title: "Da và điều hoà thân nhiệt ở người",
    sgkStartPage: 160,
    sgkEndPage: 164,
    sgvStartPage: 204,
    yccd: [
      "Mô tả cấu tạo của da gồm 3 lớp: biểu bì, bì và mỡ dưới da",
      "Giải thích cơ chế điều hoà thân nhiệt khi trời nóng (toát mồ hôi, giãn mạch) và trời lạnh (co mạch, run)",
      "Nêu biện pháp bảo vệ da, phòng tránh bỏng da và xử lý khi bị cảm nóng, cảm lạnh"
    ],
    summary: "Tấm áo giáp bảo vệ và điều nhiệt tự nhiên: da giữ thân nhiệt con người luôn ổn định ở mức xấp xỉ 37°C trước sự thay đổi khắc nghiệt của thời tiết.",
    coreConcepts: ["Lớp biểu bì / bì / mỡ", "Tuyến mồ hôi", "Thân nhiệt 37°C", "Toát mồ hôi giải nhiệt", "Chống say nắng"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 40,
    chapterId: "CH_VII_HUMAN_BIO",
    chapterName: "Sinh học cơ thể người",
    title: "Sinh sản ở người",
    sgkStartPage: 165,
    sgkEndPage: 169,
    sgvStartPage: 210,
    yccd: [
      "Mô tả cấu tạo cơ quan sinh dục nam và cơ quan sinh dục nữ",
      "Nêu hiện tượng dậy thì, thụ tinh, thụ thai và sự phát triển của thai nhi",
      "Hiểu biết về sức khoẻ sinh sản vị thành niên và phòng tránh các bệnh lây truyền qua đường tình dục"
    ],
    summary: "Khoa học về sự phát triển giới tính tuổi dậy thì, kiến thức bảo vệ sức khoẻ sinh sản vị thành niên văn minh và khoa học.",
    coreConcepts: ["Tuổi dậy thì", "Cơ quan sinh dục", "Thụ tinh & Thai nhi", "Sức khoẻ vị thành niên"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 41,
    chapterId: "CH_VIII_ECOLOGY",
    chapterName: "Sinh vật và môi trường",
    title: "Môi trường và các nhân tố sinh thái",
    sgkStartPage: 170,
    sgkEndPage: 173,
    sgvStartPage: 217,
    yccd: [
      "Nêu định nghĩa môi trường sống của sinh vật và phân loại 4 loại môi trường chính",
      "Phân biệt nhân tố sinh thái vô sinh (nhiệt độ, ánh sáng, nước) và hữu sinh (sinh vật khác, con người)",
      "Nêu khái niệm giới hạn sinh thái của sinh vật đối với một nhân tố sinh thái"
    ],
    summary: "Không gian sinh thái bao quanh sinh vật: quy luật giới hạn chịu đựng sinh thái quyết định sự phân bố của các loài động thực vật trên Trái Đất.",
    coreConcepts: ["Môi trường sống", "Nhân tố vô sinh", "Nhân tố hữu sinh", "Giới hạn sinh thái", "Ổ sinh thái"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 42,
    chapterId: "CH_VIII_ECOLOGY",
    chapterName: "Sinh vật và môi trường",
    title: "Quần thể sinh vật",
    sgkStartPage: 174,
    sgkEndPage: 176,
    sgvStartPage: 221,
    yccd: [
      "Nêu được định nghĩa quần thể sinh vật",
      "Trình bày các đặc trưng cơ bản của quần thể: tỉ lệ giới tính, nhóm tuổi, mật độ cá thể",
      "Giải thích hiện tượng biến động số lượng cá thể trong quần thể và ứng dụng trong nông nghiệp"
    ],
    summary: "Tập hợp các cá thể cùng loài cùng sinh sống trong một không gian xác định; cơ chế tự điều chỉnh số lượng cá thể để thích nghi với điều kiện môi trường.",
    coreConcepts: ["Quần thể sinh vật", "Mật độ cá thể", "Tháp tuổi", "Biến động số lượng"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 43,
    chapterId: "CH_VIII_ECOLOGY",
    chapterName: "Sinh vật và môi trường",
    title: "Quần xã sinh vật",
    sgkStartPage: 177,
    sgkEndPage: 179,
    sgvStartPage: 225,
    yccd: [
      "Nêu định nghĩa quần xã sinh vật",
      "Trình bày các đặc trưng của quần xã: thành phần loài (loài ưu thế, loài đặc trưng), phân tầng thẳng đứng",
      "Phân tích các mối quan hệ hỗ trợ (cộng sinh, hội sinh) và đối kháng (cạnh tranh, ký sinh, sinh vật ăn sinh vật khác)"
    ],
    summary: "Mạng lưới sống động giữa các loài cùng chung sống: sự phân tầng cây rừng để tận dụng ánh sáng và mối quan hệ cân bằng sinh học thiên địch.",
    coreConcepts: ["Quần xã sinh vật", "Loài ưu thế", "Phân tầng sinh thái", "Cộng sinh / Cạnh tranh", "Khống chế sinh học"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 44,
    chapterId: "CH_VIII_ECOLOGY",
    chapterName: "Sinh vật và môi trường",
    title: "Hệ sinh thái",
    sgkStartPage: 180,
    sgkEndPage: 184,
    sgvStartPage: 228,
    yccd: [
      "Nêu khái niệm hệ sinh thái gồm quần xã sinh vật và sinh cảnh",
      "Xây dựng được chuỗi thức ăn và lưới thức ăn trong một hệ sinh thái cụ thể",
      "Phân biệt sinh vật sản xuất, sinh vật tiêu thụ và sinh vật phân giải trong chu trình vật chất"
    ],
    summary: "Hệ thống tuần hoàn vật chất và năng lượng hoàn chỉnh: dòng năng lượng từ ánh sáng Mặt Trời đi qua sinh vật sản xuất (cây xanh) đến sinh vật tiêu thụ và phân giải.",
    coreConcepts: ["Hệ sinh thái", "Sinh cảnh", "Chuỗi thức ăn", "Lưới thức ăn", "Sinh vật sản xuất/tiêu thụ/phân giải"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 45,
    chapterId: "CH_VIII_ECOLOGY",
    chapterName: "Sinh vật và môi trường",
    title: "Sinh quyển",
    sgkStartPage: 185,
    sgkEndPage: 187,
    sgvStartPage: 232,
    yccd: [
      "Nêu được khái niệm sinh quyển là tầng sinh vật của Trái Đất",
      "Mô tả giới hạn của sinh quyển trong khí quyển, thuỷ quyển và thạch quyển",
      "Nêu các khu sinh học chính trên cạn và dưới nước (rừng nhiệt đới, sa mạc, biển khơi)"
    ],
    summary: "Lớp vỏ mỏng của sự sống bao bọc hành tinh: từ đáy vực biển sâu thẳm đến đỉnh núi tuyết cao ngất, kết nối các chu trình sinh địa hoá toàn cầu.",
    coreConcepts: ["Sinh quyển", "Thuỷ quyển & Thạch quyển", "Khu sinh học Biome", "Chu trình sinh địa hoá"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 46,
    chapterId: "CH_VIII_ECOLOGY",
    chapterName: "Sinh vật và môi trường",
    title: "Cân bằng tự nhiên",
    sgkStartPage: 188,
    sgkEndPage: 190,
    sgvStartPage: 235,
    yccd: [
      "Nêu được khái niệm trạng thái cân bằng tự nhiên của hệ sinh thái",
      "Giải thích cơ chế tự điều chỉnh của hệ sinh thái qua mối quan hệ dinh dưỡng",
      "Nêu các nguyên nhân làm mất cân bằng tự nhiên và biện pháp duy trì cân bằng sinh thái"
    ],
    summary: "Sự ổn định động của thiên nhiên: số lượng cá thể của các loài tự khống chế ở mức cân bằng; tác động can thiệp thô bạo của con người làm sụp đổ chuỗi thức ăn.",
    coreConcepts: ["Cân bằng tự nhiên", "Khống chế sinh học", "Mất cân bằng sinh thái", "Thiên địch"],
    status: "PUBLISHED",
    atoms: []
  },
  {
    id: 47,
    chapterId: "CH_VIII_ECOLOGY",
    chapterName: "Sinh vật và môi trường",
    title: "Bảo vệ môi trường",
    sgkStartPage: 191,
    sgkEndPage: 194,
    sgvStartPage: 239,
    yccd: [
      "Phân tích nguyên nhân gây ô nhiễm môi trường đất, nước và không khí",
      "Nêu các biện pháp giảm thiểu rác thải nhựa, tiết kiệm năng lượng và trồng rừng",
      "Đề xuất các hành động cụ thể của bản thân để bảo vệ môi trường học đường và địa phương"
    ],
    summary: "Bài học tổng kết trách nhiệm công dân: biến nhận thức khoa học tự nhiên thành hành động bảo vệ hành tinh xanh, ứng phó biến đổi khí hậu và phát triển bền vững.",
    coreConcepts: ["Ô nhiễm môi trường", "Biến đổi khí hậu", "Rác thải nhựa", "Năng lượng tái tạo", "Phát triển bền vững"],
    status: "PUBLISHED",
    atoms: []
  }
];

export const ALL_LESSONS: Lesson[] = ALL_47_LESSONS.map((lesson) => {
  const enhanced = getEnhancedAtomsForLesson(lesson.id);
  if (enhanced.length > 0) {
    const existing = lesson.atoms || [];
    const nonDuplicated = existing.filter(a => !enhanced.some(e => e.atom_id === a.atom_id));
    return {
      ...lesson,
      atoms: [...enhanced, ...nonDuplicated]
    };
  }
  if (!lesson.atoms || lesson.atoms.length === 0) {
    const primaryConcept = lesson.coreConcepts[0] || lesson.title;
    const fallbackAtom: KnowledgeAtom = {
      atom_id: `ATOM_${String(lesson.id).padStart(2, '0')}_01`,
      lesson_id: lesson.id,
      topic: primaryConcept,
      title: primaryConcept,
      concept_type: "definition",
      source_anchors: [`SGK KHTN 8 Kết nối tri thức tr.${lesson.sgkStartPage}-${lesson.sgkEndPage}`, `SGV tr.${lesson.sgvStartPage}`],
      statement: lesson.yccd[0] || lesson.summary,
      canonical_explanation: lesson.summary,
      terms: lesson.coreConcepts,
      conditions: "Áp dụng theo chuẩn kiến thức và năng lực KHTN 8 (GDPT 2018).",
      representations: ["text", "diagram"],
      prerequisites: [`KHTN 8 Bài ${lesson.id > 1 ? lesson.id - 1 : 1}`],
      related_atoms: [],
      misconceptions: [
        {
          code: `MIS_${lesson.id}_01`,
          description: `Lầm tưởng giữa hiện tượng quan sát cảm tính bên ngoài và bản chất khoa học của bài "${lesson.title}".`,
          counterExample: `Cần đối chiếu số liệu đo đạc thực nghiệm và định luật khoa học thay vì phán đoán chủ quan.`,
          repairStrategy: `Sử dụng quy trình thực nghiệm và kiểm chứng bằng bằng chứng thực tế theo SGK KHTN 8.`
        }
      ],
      contexts: [
        {
          id: `CTX_${lesson.id}_HOME`,
          contextClass: "home",
          title: `Hiện tượng liên quan đến ${lesson.title} trong đời sống gia đình`,
          phenomenon: `Các vật dụng và thói quen sinh hoạt phản ánh nguyên lý của ${primaryConcept}.`,
          observation: `Hiện tượng diễn ra tự nhiên trong sinh hoạt nhưng tuân theo quy luật khoa học chặt chẽ.`,
          question: `Vận dụng kiến thức bài học để giải thích hiện tượng quan sát được tại nhà?`,
          explanationRoute: lesson.summary,
          evidenceSource: "textbook_context"
        },
        {
          id: `CTX_${lesson.id}_SCHOOL`,
          contextClass: "school",
          title: `Thực hành và thảo luận nhóm trong giờ học KHTN`,
          phenomenon: `Học sinh cùng phân tích tranh ảnh và câu hỏi trong SGK tr.${lesson.sgkStartPage}.`,
          observation: `Các dấu hiệu thực nghiệm chứng minh cho các Yêu cầu cần đạt của bài học.`,
          question: `Phương pháp thực nghiệm nào giúp kiểm chứng nhận định khoa học này?`,
          explanationRoute: lesson.yccd.join("; "),
          evidenceSource: "sgv_context"
        },
        {
          id: `CTX_${lesson.id}_TECH`,
          contextClass: "technology",
          title: `Ứng dụng thiết bị và công nghệ hiện đại`,
          phenomenon: `Công nghệ ứng dụng nguyên lý ${primaryConcept} trong chế tạo thiết bị thông minh.`,
          observation: `Hệ thống cảm biến và bộ vi xử lý ghi nhận các thông số khoa học chuẩn xác.`,
          question: `Công nghệ đã biến đổi quy trình ứng dụng bài học vào thực tiễn ra sao?`,
          explanationRoute: `Chuyển hóa tín hiệu vật lý/sinh/hóa thành thông tin hữu ích hỗ trợ con người.`,
          evidenceSource: "external_verified"
        },
        {
          id: `CTX_${lesson.id}_PROD`,
          contextClass: "production_or_agriculture",
          title: `Ứng dụng trong nông nghiệp và sản xuất công nghiệp`,
          phenomenon: `Quy trình canh tác hoặc dây chuyền sản xuất ứng dụng quy luật ${lesson.title}.`,
          observation: `Tăng năng suất cây trồng/vật nuôi, giảm thiểu chi phí và bảo đảm an toàn lao động.`,
          question: `Tại sao người sản xuất bắt buộc phải nắm vững quy tắc khoa học này?`,
          explanationRoute: `Đảm bảo hiệu suất tối ưu và tránh lãng phí tài nguyên theo quy luật tự nhiên.`,
          evidenceSource: "textbook_context"
        },
        {
          id: `CTX_${lesson.id}_ENV`,
          contextClass: "environment_or_community",
          title: `Ý thức bảo vệ môi trường và trách nhiệm cộng đồng`,
          phenomenon: `Mối tương tác giữa hoạt động kinh tế - xã hội với môi trường sinh thái xung quanh.`,
          observation: `Chất lượng môi trường đất, nước, không khí chịu tác động trực tiếp từ hoạt động của con người.`,
          question: `Học sinh cần hành động gì để góp phần gìn giữ môi trường địa phương?`,
          explanationRoute: `Tuân thủ các nguyên tắc sinh thái và hóa học xanh để phát triển bền vững.`,
          evidenceSource: "external_verified"
        },
        {
          id: `CTX_${lesson.id}_DECISION`,
          contextClass: "decision_or_problem_solving",
          title: `Ra quyết định và giải quyết vấn đề thực tiễn`,
          phenomenon: `Tình huống bất ngờ đòi hỏi học sinh đưa ra giải pháp an toàn và khoa học.`,
          observation: `Các điều kiện biên và rủi ro nếu xử lý sai nguyên tắc khoa học.`,
          question: `Đâu là hướng xử lý tối ưu nhất dựa trên kiến thức khoa học đã học?`,
          explanationRoute: `Lập luận logic dựa trên bằng chứng khoa học để đưa ra quyết định chuẩn xác.`,
          evidenceSource: "sgv_context"
        }
      ],
      applications: [
        `Giải thích các hiện tượng tự nhiên và đời sống xung quanh.`,
        `Thực hiện các phép đo và thao tác thí nghiệm khoa học chuẩn xác.`,
        `Vận dụng vào bảo vệ sức khỏe cá nhân và môi trường sống.`
      ],
      use_cases: [`Giải thích hiện tượng`, `Làm bài tập vận dụng`, `Thực hành an toàn`],
      diagnostic_question: {
        question: `Nội dung nào sau đây là Yêu cầu cần đạt cốt lõi của bài "${lesson.title}"?`,
        options: [
          `A. ${lesson.yccd[0] || lesson.summary}`,
          `B. Hiện tượng chỉ là ngẫu nhiên và không tuân theo quy luật khoa học nào.`,
          `C. Các kết luận khoa học không cần dựa trên số liệu thực nghiệm hay bằng chứng.`,
          `D. Chỉ cần học vẹt lý thuyết mà không cần liên hệ với hiện tượng thực tế.`
        ],
        correctIndex: 0,
        commonWrongReason: "Chưa đối chiếu với mục tiêu YCCD ghi trong SGK.",
        socraticHint: `Đọc lại mục 'Em sẽ học được' ở đầu bài trang ${lesson.sgkStartPage} SGK KHTN 8.`
      },
      transfer_task: {
        title: `Vận Dụng Thực Tiễn Bài Học: ${lesson.title}`,
        context: `Một tình huống thực tiễn học đường hoặc đời sống liên quan đến chủ đề bài học.`,
        task: `Tìm một ví dụ thực tế tương tự, giải thích cơ chế khoa học và đề xuất 1 hành động cải tiến.`,
        deliverables: `Báo cáo ngắn gọn (150 từ) hoặc sơ đồ tư duy minh họa.`,
        evaluationCriteria: `Giải thích đúng kiến thức KHTN 8, có ví dụ thực tế và liên hệ bản thân.`
      },
      status: "PUBLISHED"
    };
    return {
      ...lesson,
      atoms: [fallbackAtom]
    };
  }
  return lesson;
});
