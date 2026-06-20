import { ArrowLeft, ArrowRight, Star, Target, Timer, Zap } from "lucide-react";
import { NavBar } from "../NavBar";
import Navigator from "./Navigator";
import { useEffect, useState } from "react";
import Question from "./Question";
import { Button } from "../../components/common/Button";
import Confirm from "./Confirm";
import { useNavigate, useSearchParams } from "react-router";
import { Badge } from "../../components/common/Badge";
import type { QuestionItem } from "./Question";
const API_URL = "Question.json";

export default function Asssessment() {
  const [currentQuest, setCurrentQuest] = useState(1);
  const [ans, setAns] = useState<Record<number, string>>({});
  const answeredCount = Object.keys(ans).length;
  const [quest, setQuest] = useState<QuestionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const XP = 50 * answeredCount;
  const navigate = useNavigate();
  const [loadError, setLoadError] = useState(false);
  const totalquest = quest.length;
  const activeQuest = quest[currentQuest - 1];
  /*Flag*/
  const [flag, setFlag] = useState<number[]>([]);

  const handleFlag = (id: number) => {
    setFlag((prev) => {
      if (prev.includes(id)) {
        return prev.filter((questId) => questId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  /*Popup xác nhận */
  const [showConfirm, setshowConfirm] = useState(false);
  const handleSubmit = async () => {
    const userCodeOutput = quest.map((_, index) => {
      const questNo = index + 1;
      return ans[questNo] || "";
    });
    const payload = {
      challengeId: challengeId,
      userCodeOutput: userCodeOutput,
    };
    const response = await fetch(`${API_URL}/assessment/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Lỗi nộp bài");
    setshowConfirm(false);
    navigate("/result", {
      state: {
        XP: XP,
      },
    });
  };

  /**Nút bấm */
  const handleSelect = (answer: string) => {
    setAns((prev) => ({
      ...prev,
      [activeQuest.id]: answer,
    }));
  };
  const handlePrev = () => {
    if (currentQuest > 1) {
      setCurrentQuest(currentQuest - 1);
    }
  };

  const handleNext = () => {
    if (currentQuest < totalquest) {
      setCurrentQuest(currentQuest + 1);
    }
  };

  const [searchParams] = useSearchParams();
  const challengeId = searchParams.get("challengeId");

  /*Lấy câu hỏi */
  useEffect(() => {
    const fetchQuest = async () => {
      // if (!challengeId) {
      //   console.error("Không tìm thấy mã bài thi (challengeId) trên URL!");
      //   setLoadError(true);
      //   setLoading(false);
      //   return;
      // }
      try {
        setLoading(true);
        const res = await fetch(
          API_URL,
          // `${API_URL}/assessment/questions?challengeId=${challengeId}`,
        );

        if (!res.ok) throw new Error("Lỗi khi tải dữ liệu từ Server");
        const data = await res.json();
        // const formattedQuest = data.questions.map((q: any, index: number) => ({
        //   id: q._id || index + 1,
        //   title: q.input || "Không có tiêu đề",
        //   type: q.type,
        //   options: q.options || [],
        //   code: "",
        // }));
        // setQuest(formattedQuest);
        setQuest(data);
      } catch (error) {
        console.error("Lỗi khi tải câu hỏi:", { error });
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchQuest();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="animate-pulse">Đang tải CodeQuest cho bạn...</div>
      </div>
    );
  }
  if (quest.length === 0) {
    return <div>Đang tìm kiếm câu hỏi</div>;
  }
  const isCompleted = answeredCount === totalquest;

  if (loadError) {
    return <Badge variant="error">Error when loading question.</Badge>;
  }

  return (
    <div className="w-full mx-auto min-h-screen flex flex-col bg-[#050b17]">
      <NavBar
        variant="quiz"
        totalquest={totalquest}
        answeredCount={answeredCount}
      />

      <main className="max-w-6xl p-5 flex flex-col gap-11 m-auto items-center">
        <div
          className="
  items-center
  bg-[radial-gradient(circle_at_center,#0b2530_0%,#060f1d_100%)]
  border border-[#18263d]
  rounded-3xl
  p-14
  flex
  gap-10
  shadow-[0_0_60px_rgba(59,130,246,0.08)]
"
        >
          <div className="flex-1 text-left w-40%">
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-white mb-5">
              Khám phá trình độ lập trình của bạn
            </h1>
            <p className="text-lg leading-8 text-slate-300 max-w-2xl">
              Trả lời một vài câu hỏi DSA và giải thuật để nhận được một lộ
              trình học tập cá nhân tạo bởi AI.
            </p>
          </div>
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-3xl p-5 min-w-[190px] hover:border-[#3b82f6] transition-all duration-300 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#13294b] flex items-center justify-center mb-4">
              <Timer className="text-[#60a5fa]" />
            </div>

            <div className="text-2xl font-bold text-white">10-15</div>

            <div className="text-slate-400 text-sm">phút hoàn thành</div>
          </div>
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-3xl p-5 min-w-[190px] hover:border-[#c084fc] transition-all duration-300 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-[#2a163d] flex items-center justify-center mb-4">
              <Target className="text-[#c084fc]" />
            </div>

            <div className="text-2xl font-bold text-white">Adaptive</div>

            <div className="text-slate-400 text-sm">Độ khó thích ứng</div>
          </div>
          <div
            className="
bg-[#0f172a]
border border-[#1e3a2a]
rounded-3xl
p-5
min-w-[190px]
hover:border-[#22c55e]
transition-all duration-300
shadow-lg
"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#14532d] flex items-center justify-center mb-4">
              <Zap className="text-[#22c55e]" />
            </div>
            <div className="text-3xl font-bold text-[#4ade80]">+500 XP</div>
            <div className="text-slate-400 text-sm">Phần thưởng hoàn thành</div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
          <div className="lg:col-span-2 min-w-0 w-full pt-1 rounded-2xl bg-linear-to-r from-[#2783ff] to-[#1fc366]">
            <div className="p-8 bg-[#0a101f] rounded-t-2xl flex flex-col gap-5">
              <Question
                selectedAns={ans[activeQuest.id] || ""}
                activeQuest={activeQuest}
                handleNext={handleNext}
                handleSelect={handleSelect}
                currentQuest={currentQuest}
                flag={flag.includes(activeQuest.id)}
                setFlag={() => handleFlag(activeQuest.id)}
              />
            </div>
            <div className="flex bg-[#0f1523] rounded-b-2xl justify-between items-center px-8 py-3">
              <div>
                <Button
                  variant={isCompleted ? "primary" : "normal"}
                  className="w-fit"
                  onClick={() => {
                    setshowConfirm(true);
                  }}
                >
                  <span>Nộp bài</span>
                </Button>
              </div>

              <div className="flex gap-3 text-[15px] font-bold">
                <Button
                  onClick={handlePrev}
                  disabled={currentQuest === 1}
                  variant="secondary"
                  className="flex gap-2 items-center px-3"
                >
                  <ArrowLeft className="w-4 h-4"></ArrowLeft>
                  <span className=" ">Trước</span>
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentQuest === totalquest}
                  variant="success"
                  className="flex gap-2 items-center text-black"
                >
                  <span>Sau</span>
                  <ArrowRight className="w-4 h-4"></ArrowRight>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-[#0b1220] p-5 rounded-2xl flex flex-col gap-3 ">
              <span className="text-[14px] font-bold text-[#fbfbfb] whitespace-nowrap text-left">
                Câu hỏi
              </span>
              <div className="w-fit">
                <Navigator
                  totalquest={totalquest}
                  currentQuest={currentQuest}
                  setCurrentQuest={setCurrentQuest}
                  ans={ans}
                  flag={flag}
                />
              </div>
            </div>
            <div className="flex items-center gap-5 p-5 bg-linear-to-br from-[#1a2b22] to-[#0d1621] rounded-2xl border border-[#1c492d] ">
              <div className="rounded-full bg-[#18442d] p-3 shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                <Star className="text-[#22c55e]"></Star>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#fbfbfb]">XP Nhận được</span>
                <div className="text-[#22c55e] text-left font-bold">+{XP}</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Confirm
        showConfirm={showConfirm}
        setshowConfirm={setshowConfirm}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
