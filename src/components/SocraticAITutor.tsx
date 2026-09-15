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
  User
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "tutor";
  text: string;
  hintLevel?: number;
  time: string;
}

export const SocraticAITutor: React.FC<{ selectedLessonId?: number; selectedLessonTitle?: string }> = ({
  selectedLessonId = 13,
  selectedLessonTitle = "Bài 13: Khối lượng riêng"
}) => {
  const [activeMode, setActiveMode] = useState<"chat" | "diagnose">("chat");

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
    "Nếu cưa đôi một thanh sắt thì khối lượng riêng của nó có giảm một nửa không?"
  ];

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
      const res = await fetch("/api/tutor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6),
          lessonContext: { id: selectedLessonId, title: selectedLessonTitle },
          hintLevel: currentHintLevel
        })
      });
      const data = await res.json();
      if (data.ok) {
        const tutorMsg: Message = {
          id: `tut-${Date.now()}`,
          sender: "tutor",
          text: data.reply,
          hintLevel: data.hintLevel || currentHintLevel,
          time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, tutorMsg]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "tutor",
          text: "Thầy gặp chút trục trặc kết nối mạng. Em hãy kiểm tra lại câu hỏi hoặc công thức trong SGK nhé!",
          time: "Bây giờ"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiagnose = async () => {
    if (!studentAnswer.trim() || isDiagnosing) return;
    setIsDiagnosing(true);
    setDiagResult(null);
    try {
      const res = await fetch("/api/tutor/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: diagQuestion,
          studentAnswer,
          expectedConcept: "Lực đẩy Archimedes và Khối lượng riêng trung bình của vật rỗng",
          lessonId: selectedLessonId
        })
      });
      const data = await res.json();
      if (data.ok) {
        setDiagResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDiagnosing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[650px]">
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold">Gia Sư Socratic AI KHTN 8</h3>
              <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded-full font-mono font-semibold">
                Gợi Mở • Không Đưa Sẵn Đáp Án
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Đang gắn kết: <span className="text-cyan-400">{selectedLessonTitle}</span>
            </p>
          </div>
        </div>

        {/* Mode Switch */}
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
            Chẩn Đoán Lỗi Nhận Thức
          </button>
        </div>
      </div>

      {/* CHAT MODE */}
      {activeMode === "chat" && (
        <div className="flex-1 flex flex-col justify-between overflow-hidden p-4 bg-slate-50">
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
              <Lightbulb className="w-4 h-4" /> Hệ thống chẩn đoán quan niệm sai lầm (Misconception Diagnostic):
            </div>
            <p>
              Học sinh thường có các quan niệm ngây thơ bắt nguồn từ trực giác đời sống. Hệ thống sẽ phân tích xem cách giải thích của em có mắc bẫy nhận thức phổ biến nào không.
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
                      <AlertCircle className="w-4 h-4" /> Phát hiện điểm nhận thức cần hoàn thiện:
                    </span>
                  )}
                </span>
                {diagResult.misconceptionCode && (
                  <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
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
