import React, { useState } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  Lightbulb, 
  RotateCcw,
  User,
  Key,
  Settings,
  ShieldCheck,
  ChevronRight,
  BookOpen
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "tutor";
  text: string;
  hintLevel?: number;
  time: string;
  misconceptionCode?: string;
}

// Built-in Grounded Socratic Knowledge Base for KHTN 8
interface SocraticKnowledgeRule {
  keywords: string[];
  lessonId: number;
  topic: string;
  canonicalFormula?: string;
  hints: {
    level1: string; // Observational cue
    level2: string; // Quantitative / Conceptual cue
    level3: string; // Simplified isomorphic question
  };
  misconception?: {
    code: string;
    detectionKeywords: string[];
    diagnosis: string;
    counterExample: string;
    repairStrategy: string;
  };
}

const SOCRATIC_KNOWLEDGE_RULES: SocraticKnowledgeRule[] = [
  {
    keywords: ["tàu", "chìm", "nổi", "thép", "đinh", "khối lượng riêng", "sắt"],
    lessonId: 13,
    topic: "Khối lượng riêng & Vật nổi (Bài 13, 17)",
    canonicalFormula: "D = m / V, F_A = d · V",
    hints: {
      level1: "Em hãy quan sát: Chiếc đinh sắt là một khối sắt ĐẶC, còn chiếc tàu thủy bằng thép bên trong chứa những gì ngoài lớp vỏ thép?",
      level2: "Đúng rồi, bên trong thân tàu có các khoang rỗng chứa đầy không khí! Khi xét 'khối lượng riêng trung bình' của toàn bộ thân tàu (D_tb = M_toàn_bộ / V_toàn_bộ), theo em D_tb của tàu lớn hơn hay nhỏ hơn D của nước (1000 kg/m³)?",
      level3: "Chính xác! Thể tích khoang rỗng V quá lớn làm cho D_tb của tàu nhỏ hơn 1000 kg/m³, lực đẩy Archimedes F_A = d_nước · V_chìm cân bằng với trọng lượng P của tàu nên tàu nổi an toàn."
    },
    misconception: {
      code: "ERR_DENSITY_SOLID_VS_HOLLOW",
      detectionKeywords: ["nặng", "nhẹ", "sắt luôn chìm", "nước biển đẩy mạnh hơn"],
      diagnosis: "Em đang nhầm lẫn giữa khối lượng riêng của chất liệu sắt đặc (D = 7800 kg/m³) và khối lượng riêng trung bình của toàn bộ cấu trúc thân tàu rỗng chứa không khí.",
      counterExample: "Một quả bóng đá bằng da nặng hơn một chiếc kim khâu nhỏ xíu, nhưng quả bóng vẫn nổi bồng bềnh trên nước trong khi chiếc kim chìm ngay xuống đáy.",
      repairStrategy: "Hãy luôn tính khối lượng riêng trung bình: D_tb = (m_vỏ + m_hàng + m_khí) / V_toàn_bộ. Nếu D_tb < D_nước thì vật sẽ nổi!"
    }
  },
  {
    keywords: ["áp suất", "đáy", "thành bình", "hướng", "chất lỏng", "lặn", "đập"],
    lessonId: 16,
    topic: "Áp suất chất lỏng (Bài 16)",
    canonicalFormula: "p = d · h",
    hints: {
      level1: "Khi nhúng một quả bóng cao su hoặc màng cao su vào trong nước, em thấy màng cao su bị ép vào theo một hướng duy nhất hay bị ép từ mọi phía?",
      level2: "Chất lỏng có tính linh động, gây ra áp suất theo MỌI HƯỚNG lên đáy bình, thành bình và các vật trong lòng nó theo công thức p = d · h. Ở đây h là độ sâu tính từ đâu?",
      level3: "Rất chuẩn! h là độ sâu tính từ mặt thoáng thẳng đứng xuống điểm xét. Càng xuống sâu (h càng lớn), áp suất p càng mạnh, vì thế thợ lặn phải mặc đồ chịu áp và chân đập thủy điện luôn phải xây dày hơn đỉnh đập."
    },
    misconception: {
      code: "ERR_PRESSURE_DIRECTION",
      detectionKeywords: ["chỉ ép xuống", "chỉ đáy", "theo chiều dọc"],
      diagnosis: "Em đang ngộ nhận áp suất chất lỏng chỉ tác dụng theo chiều thẳng đứng nén xuống đáy bình.",
      counterExample: "Nếu đục các lỗ nhỏ ở thành bên của chai nước, tia nước sẽ bắn ra theo phương ngang từ thành chai, chứng minh chất lỏng nén cả vào thành bình theo mọi hướng.",
      repairStrategy: "Khác với vật rắn chỉ ép lên mặt đỡ, chất lỏng gây áp suất theo mọi phương hướng: lên trên, xuống dưới và sang các phía xung quanh."
    }
  },
  {
    keywords: ["cưa", "cắt đôi", "thanh sắt", "giảm một nửa", "khối lượng riêng"],
    lessonId: 13,
    topic: "Đặc tính của Khối lượng riêng (Bài 13)",
    canonicalFormula: "D = m / V",
    hints: {
      level1: "Khi em cưa đôi một thanh sắt, khối lượng m của mỗi nửa giảm đi một nửa. Vậy thể tích V của mỗi nửa có bị giảm đi một nửa không?",
      level2: "Cả khối lượng m và thể tích V đều giảm đi 2 lần. Khi lấy (m / 2) chia cho (V / 2), thương số D = m / V có bị thay đổi không?",
      level3: "Xuất sắc! Khối lượng riêng D = m / V là đại lượng đặc trưng cho chất liệu, không thay đổi khi chia nhỏ vật thể ở cùng nhiệt độ."
    },
    misconception: {
      code: "ERR_DENSITY_DIVISIBILITY",
      detectionKeywords: ["giảm một nửa", "bằng một nửa", "giảm đi"],
      diagnosis: "Em đang nhầm lẫn giữa khối lượng m (giảm khi chia đôi) và khối lượng riêng D (không đổi vì là đặc trưng chất liệu).",
      counterExample: "1 giọt nước và 1 xô nước đều là nước cất ở 4°C, chúng đều có cùng khối lượng riêng là 1000 kg/m³.",
      repairStrategy: "Khối lượng riêng là thuộc tính vật lý của chất liệu, không phụ thuộc vào kích thước hay hình dạng vật thể."
    }
  },
  {
    keywords: ["dao", "mài", "cắt", "sắc", "cùn", "áp lực", "áp suất"],
    lessonId: 15,
    topic: "Áp suất trên một bề mặt (Bài 15)",
    canonicalFormula: "p = F / S",
    hints: {
      level1: "Khi mài sắc dao, lưỡi dao mỏng hơn thì diện tích tiếp xúc S giữa lưỡi dao và thực phẩm tăng lên hay giảm đi?",
      level2: "Với cùng một lực ấn F của tay, diện tích bị ép S càng nhỏ thì áp suất p = F / S sẽ thay đổi thế nào (tỉ lệ thuận hay tỉ lệ nghịch)?",
      level3: "Đúng rồi! S nhỏ làm tăng áp suất p lên rất lớn, giúp lưỡi dao cắt ngọt qua bề mặt vật thể dễ dàng."
    }
  },
  {
    keywords: ["đòn bẩy", "cờ lê", "cánh tay đòn", "momen", "lực"],
    lessonId: 18,
    topic: "Tác dụng làm quay & Đòn bẩy (Bài 18, 19)",
    canonicalFormula: "M = F · d, F_1 · d_1 = F_2 · d_2",
    hints: {
      level1: "Khi mở cửa sổ, em đẩy ở mép xa bản lề dễ hơn hay đẩy sát bản lề dễ hơn?",
      level2: "Khoảng cách từ trục quay đến giá của lực gọi là cánh tay đòn d. Theo công thức M = F · d, muốn có cùng moment quay M mà giảm lực F thì cần tăng đại lượng nào?",
      level3: "Chính xác! Cánh tay đòn d càng dài thì lực tác dụng F cần thiết càng nhỏ, giúp ta được lợi về lực."
    }
  },
  {
    keywords: ["nung vôi", "hiệu suất", "bảo toàn", "phương trình", "khối lượng"],
    lessonId: 6,
    topic: "Tính theo phương trình hóa học & Hiệu suất (Bài 6)",
    canonicalFormula: "H = (m_tt / m_lt) * 100%",
    hints: {
      level1: "Trong thực tế nung vôi, lượng vôi sống CaO thu được trong lò có bao giờ nhiều hơn lượng tính toán lí thuyết trên giấy không?",
      level2: "Đúng vậy, do tạp chất, hao hụt nhiệt và phản ứng chưa hoàn toàn, lượng thực tế m_tt luôn nhỏ hơn hoặc bằng m_lt lí thuyết.",
      level3: "Từ đó ta có công thức hiệu suất phản ứng: H = (m_tt / m_lt) × 100% (luôn ≤ 100%)."
    }
  }
];

export const SocraticAITutor: React.FC<{ selectedLessonId?: number; selectedLessonTitle?: string }> = ({
  selectedLessonId = 13,
  selectedLessonTitle = "Bài 13: Khối lượng riêng"
}) => {
  const [activeMode, setActiveMode] = useState<"chat" | "diagnose">("chat");

  // API Key Settings State
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem("khtn8_tutor_api_key") || "");
  const [apiProvider, setApiProvider] = useState<"gemini" | "openai">("gemini");
  const [apiSaveStatus, setApiSaveStatus] = useState<string | null>(null);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "tutor",
      text: `Chào em! Thầy là Gia sư Socratic KHTN 8.
Thầy sẽ đồng hành cùng em tìm hiểu sâu bản chất các hiện tượng tự nhiên mà không bao giờ đưa sẵn đáp án.

Em hãy quan sát kỹ hiện tượng, nêu giả thuyết hoặc câu hỏi em đang thắc mắc nhé!`,
      hintLevel: 1,
      time: "Vừa xong"
    }
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(1);

  // Misconception Diagnostic state
  const [diagQuestion, setDiagQuestion] = useState<string>("Tại sao một khối sắt đặc thì chìm trong nước, nhưng chiếc tàu làm bằng hàng ngàn tấn sắt thép lại nổi trên biển?");
  const [studentAnswer, setStudentAnswer] = useState<string>("");
  const [diagResult, setDiagResult] = useState<any | null>(null);
  const [isDiagnosing, setIsDiagnosing] = useState<boolean>(false);

  const QUICK_QUESTIONS = [
    "Vì sao tàu thủy bằng thép nặng hàng ngàn tấn lại nổi trên nước?",
    "Tại sao mùa đông mặc nhiều áo mỏng ấm hơn một áo dày?",
    "Cọ xát thước nhựa vào tóc thì hút được mẩu giấy vụn vì sao?",
    "Tại sao dao mài sắc cắt đứt vật thể dễ dàng hơn dao cùn?",
    "Nếu cưa đôi một thanh sắt thì khối lượng riêng của nó có giảm một nửa không?",
    "Vì sao chân đập thủy điện luôn phải xây dày hơn mặt trên đập?"
  ];

  const handleSaveApiKey = () => {
    localStorage.setItem("khtn8_tutor_api_key", apiKey.trim());
    setApiSaveStatus("Đã lưu khóa API an toàn trong trình duyệt!");
    setTimeout(() => {
      setApiSaveStatus(null);
      setShowApiKeyModal(false);
    }, 1500);
  };

  // Local Grounded Socratic Engine
  const generateGroundedSocraticResponse = (userText: string, hintLvl: number): { reply: string; hintLevel: number; misconceptionCode?: string } => {
    const textLower = userText.toLowerCase();

    // Match rules
    for (const rule of SOCRATIC_KNOWLEDGE_RULES) {
      const matchCount = rule.keywords.filter(kw => textLower.includes(kw)).length;
      if (matchCount >= 1) {
        // Check for specific misconception
        if (rule.misconception && rule.misconception.detectionKeywords.some(dkw => textLower.includes(dkw))) {
          return {
            reply: `💡 **Thầy nhận thấy em đang gặp một điểm gài nhận thức thú vị!**\n\n${rule.misconception.diagnosis}\n\n👉 **Phản ví dụ:** ${rule.misconception.counterExample}\n\n❓ **Câu hỏi gợi mở cho em:** ${rule.hints.level1}`,
            hintLevel: 1,
            misconceptionCode: rule.misconception.code
          };
        }

        // Return appropriate hint level
        if (hintLvl === 1) {
          return {
            reply: `💡 **Gợi ý bước 1 (Quan sát hiện tượng):**\n${rule.hints.level1}\n\nEm hãy thử suy nghĩ xem điểm mấu chốt ở đây là gì nhé!`,
            hintLevel: 1
          };
        } else if (hintLvl === 2) {
          return {
            reply: `🔍 **Gợi ý bước 2 (Mối quan hệ định lượng & Công thức):**\n${rule.hints.level2}\n\n(${rule.canonicalFormula ? `Công thức liên quan trong SGK: ${rule.canonicalFormula}` : ""})`,
            hintLevel: 2
          };
        } else {
          return {
            reply: `🎯 **Gợi ý bước 3 (Tổng hợp & Kết luận):**\n${rule.hints.level3}\n\nChúc mừng em đã làm chủ được bản chất khoa học của bài học này!`,
            hintLevel: 3
          };
        }
      }
    }

    // Default Socratic fallback
    return {
      reply: `Thầy đã nhận được câu hỏi của em: "${userText}".\n\nĐể giải quyết câu hỏi này, em hãy liên hệ với các đại lượng trong **${selectedLessonTitle}**:\n1. Em đang quan sát hiện tượng gì trong thực tế?\n2. Công thức hay định luật nào trong SGK KHTN 8 liên quan đến hiện tượng này?\n\nEm hãy chia sẻ thêm suy nghĩ của mình để thầy hướng dẫn từng bước nhé!`,
      hintLevel: hintLvl
    };
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // 1. Try server API if available
      let serverReplied = false;
      try {
        const res = await fetch("/api/tutor/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: textToSend,
            history: messages.slice(-6),
            lessonContext: { id: selectedLessonId, title: selectedLessonTitle },
            hintLevel: currentHintLevel,
            apiKey: apiKey || undefined
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.ok && data.reply) {
            const tutorMsg: Message = {
              id: `tut-${Date.now()}`,
              sender: "tutor",
              text: data.reply,
              hintLevel: data.hintLevel || currentHintLevel,
              time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
              misconceptionCode: data.misconceptionCode
            };
            setMessages((prev) => [...prev, tutorMsg]);
            serverReplied = true;
          }
        }
      } catch {
        serverReplied = false;
      }

      // 2. Fallback to Grounded Local Socratic Engine
      if (!serverReplied) {
        // Small realistic thinking delay
        await new Promise(r => setTimeout(r, 450));
        const localResponse = generateGroundedSocraticResponse(textToSend, currentHintLevel);
        const tutorMsg: Message = {
          id: `tut-${Date.now()}`,
          sender: "tutor",
          text: localResponse.reply,
          hintLevel: localResponse.hintLevel,
          time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          misconceptionCode: localResponse.misconceptionCode
        };
        setMessages((prev) => [...prev, tutorMsg]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiagnose = async () => {
    if (!studentAnswer.trim() || isDiagnosing) return;
    setIsDiagnosing(true);
    setDiagResult(null);

    try {
      let diagResolved = false;
      try {
        const res = await fetch("/api/tutor/diagnose", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: diagQuestion,
            studentAnswer,
            expectedConcept: "Lực đẩy Archimedes và Khối lượng riêng trung bình của vật rỗng",
            lessonId: selectedLessonId,
            apiKey: apiKey || undefined
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.ok) {
            setDiagResult(data);
            diagResolved = true;
          }
        }
      } catch {
        diagResolved = false;
      }

      if (!diagResolved) {
        await new Promise(r => setTimeout(r, 500));
        const ansLower = studentAnswer.toLowerCase();
        const hasHollowConcept = ansLower.includes("rỗng") || ansLower.includes("không khí") || ansLower.includes("trung bình") || ansLower.includes("thể tích lớn");

        if (hasHollowConcept) {
          setDiagResult({
            isCorrect: true,
            misconceptionCode: null,
            diagnosis: "Lập luận của em rất chính xác! Em đã hiểu đúng bản chất khối lượng riêng trung bình của vỏ tàu rỗng nhỏ hơn khối lượng riêng của nước.",
            repairStrategy: "Xuất sắc! Hãy áp dụng nguyên lý này để giải thích các bài toán phao cứu sinh và tàu ngầm lặn nổi."
          });
        } else {
          setDiagResult({
            isCorrect: false,
            misconceptionCode: "ERR_DENSITY_SOLID_VS_HOLLOW",
            diagnosis: "Em đang giải thích dựa trên trực giác thông thường (nghĩ vật bằng sắt thép thì luôn chìm) mà chưa tính đến yếu tố khoang rỗng bên trong thân tàu.",
            counterExample: "Một quả bóng đá bằng da nặng hơn chiếc kim khâu bằng thép nhưng quả bóng vẫn nổi, kim vẫn chìm.",
            repairStrategy: "Khối lượng riêng trung bình D_tb = M_toàn_bộ / V_toàn_bộ. Vì thân tàu rỗng chứa không khí làm V_toàn_bộ rất lớn nên D_tb < 1000 kg/m³, tàu nổi an toàn."
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDiagnosing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[650px] relative">
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold">Gia Sư Socratic AI KHTN 8</h3>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full font-mono font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" /> Grounded 100% • 3 Bước Gợi Mở
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Đang gắn kết: <span className="text-cyan-400 font-semibold">{selectedLessonTitle}</span>
            </p>
          </div>
        </div>

        {/* Mode Switch & Settings */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800 p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveMode("chat")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeMode === "chat" ? "bg-cyan-500 text-slate-950 font-bold shadow" : "text-slate-300 hover:text-white"
              }`}
            >
              Hỏi Đáp Socratic
            </button>
            <button
              onClick={() => setActiveMode("diagnose")}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeMode === "diagnose" ? "bg-amber-400 text-slate-950 font-bold shadow" : "text-slate-300 hover:text-white"
              }`}
            >
              Chẩn Đoán Ngộ Nhận
            </button>
          </div>

          <button
            onClick={() => setShowApiKeyModal(true)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 rounded-xl transition-all border border-slate-700"
            title="Cấu hình API Key (Tùy chọn)"
          >
            <Key className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-600" /> Cấu Hình API Key Trợ Lý AI
              </h4>
              <button onClick={() => setShowApiKeyModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                ✕ Đóng
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Mặc định hệ thống sử dụng **Bộ máy Socratic Nội suy Grounded 100% SGK**. Nếu muốn kết nối trực tiếp với LLM đám mây (Google Gemini Studio / OpenAI), em có thể dán API Key tại đây:
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Google Gemini / OpenAI API Key:</label>
              <input
                type="password"
                placeholder="AIzaSy... hoặc sk-proj-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              />
            </div>

            {apiSaveStatus && (
              <div className="text-xs text-emerald-600 font-bold bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> {apiSaveStatus}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => {
                  setApiKey("");
                  localStorage.removeItem("khtn8_tutor_api_key");
                  setApiSaveStatus("Đã xóa API Key, dùng Socratic Nội suy!");
                  setTimeout(() => setApiSaveStatus(null), 1500);
                }}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Xóa Key
              </button>
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Lưu Cấu Hình
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHAT MODE */}
      {activeMode === "chat" && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden p-4 bg-slate-50">
          {/* Top Hint Level Progressor */}
          <div className="flex items-center justify-between bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs text-xs mb-2">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Tầng Gợi Mở Hiện Tại:
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setCurrentHintLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    currentHintLevel === lvl
                      ? "bg-cyan-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {lvl === 1 ? "1. Hiện tượng" : lvl === 2 ? "2. Công thức" : "3. Đẳng cấu"}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Questions Strip */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap text-[11px] bg-white hover:bg-cyan-50 text-slate-700 hover:text-cyan-800 border border-slate-200 px-3 py-1.5 rounded-full transition-all shadow-2xs font-medium"
              >
                💡 {q}
              </button>
            ))}
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 my-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    m.sender === "user" ? "bg-cyan-600 text-white" : "bg-slate-900 text-cyan-400"
                  }`}
                >
                  {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    m.sender === "user"
                      ? "bg-cyan-600 text-white rounded-tr-none"
                      : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>
                  <div
                    className={`text-[9px] mt-1.5 text-right ${
                      m.sender === "user" ? "text-cyan-200" : "text-slate-400"
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <div className="w-2 h-2 rounded-full bg-cyan-600 animate-ping" />
                <span>Thầy đang chuẩn bị câu hỏi gợi mở cho em...</span>
              </div>
            )}
          </div>

          {/* Input box */}
          <div className="pt-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập câu trả lời hoặc thắc mắc của em (Ví dụ: Em nghĩ là do thể tích...)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputText.trim()}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" /> Gửi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MISCONCEPTION DIAGNOSTIC MODE */}
      {activeMode === "diagnose" && (
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-800">
              <Lightbulb className="w-4 h-4" /> Hệ thống chẩn đoán ngộ nhận khoa học (Misconception Diagnostic):
            </div>
            <p>
              Học sinh thường có các ngộ nhận bắt nguồn từ trực giác đời sống. Hệ thống sẽ đối chiếu với Ma trận ngộ nhận KHTN 8 để phát hiện bẫy tư duy và đưa ra phản ví dụ gợi mở.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Tình huống khoa học cần giải thích:
              </label>
              <input
                type="text"
                value={diagQuestion}
                onChange={(e) => setDiagQuestion(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Câu trả lời / Lập luận của em:
              </label>
              <textarea
                rows={3}
                placeholder="Ví dụ: Em nghĩ chiếc tàu nổi được vì nó to và nước biển có lực đẩy rất mạnh..."
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              onClick={handleDiagnose}
              disabled={isDiagnosing || !studentAnswer.trim()}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs transition-all shadow disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {isDiagnosing ? "Đang chẩn đoán nhận thức..." : "🔍 Phân Tích Sai Lầm & Nhận Phản Ví Dụ"}
            </button>
          </div>

          {/* Diagnostic Result */}
          {diagResult && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-sm animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                  {diagResult.isCorrect ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Lập luận khoa học chính xác!
                    </span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> Phát hiện ngộ nhận cần khắc phục:
                    </span>
                  )}
                </span>
                {diagResult.misconceptionCode && (
                  <span className="text-[10px] font-mono bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded font-bold">
                    Mã: {diagResult.misconceptionCode}
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-700 space-y-2">
                <p><strong>Nhận xét:</strong> {diagResult.diagnosis}</p>
                {diagResult.counterExample && (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-950">
                    <strong>Phản ví dụ tư duy:</strong> {diagResult.counterExample}
                  </div>
                )}
                {diagResult.repairStrategy && (
                  <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200 text-cyan-950">
                    <strong>Gợi ý sửa sai lầm:</strong> {diagResult.repairStrategy}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
