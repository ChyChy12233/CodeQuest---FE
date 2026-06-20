import { Flag } from "lucide-react";
import { Badge } from "../../components/common/Badge";
export type OptionItem = {
  id: string;
  text: string;
};
export type QuestionItem = {
  id: number;
  level: string;
  title: string;
  code?: string;
  category: string;
  type?: "multiple-choice" | "essay";
  options?: OptionItem[];
};
type QuestionProps = {
  activeQuest: QuestionItem;
  handleSelect: (select: string) => void;
  handleNext: () => void;
  currentQuest: number;
  selectedAns: string;
};

export default function Question({
  activeQuest,
  handleSelect,
  handleNext,
  selectedAns,
  currentQuest,
}: QuestionProps) {
  if (!activeQuest) return null;

  const formatTitle = (title: string) => {
    if (!title) return "";
    const parts = title.split(/(\{[^}]+\})/g);
    return parts.map((part, index) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        const variable = part.slice(1, -1);
        return (
          <code
            key={index}
            className="text-[#20bd5b]! font-bold! text-[18px]! h-fit!"
          >
            {variable}
          </code>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };
  let levelClass: "warning" | "success" | "error" | "info" | undefined =
    undefined;
  if (activeQuest.level === "Vừa") {
    levelClass = "warning";
  } else if (activeQuest.level === "Dễ") {
    levelClass = "success";
  } else if (activeQuest.level === "Khó") {
    levelClass = "error";
  }

  const isEssay = activeQuest.type === "essay";
  return (
    <div className="flex flex-col gap-8">
      <div className="flex">
        <div className="flex flex-1 gap-4">
          <span className="font-bold text-[15px] text-[#c6cad1] px-2 py-1.5 bg-[#171c2b] h-fit leading-none rounded-lg border border-[#2e333f]">
            Câu {currentQuest}
          </span>
          <Badge variant={levelClass}>{activeQuest.level}</Badge>
          <span className="rounded-sm font-semibold text-[14px] px-2 py-px border border-[#1d395f] bg-[#111f35] text-[#4a94e9]">
            {activeQuest.category}
          </span>
        </div>
        <button>
          <Flag className="w-4 h-4"></Flag>
        </button>
      </div>
      <h2 className="text-left text-white">{formatTitle(activeQuest.title)}</h2>
      {activeQuest.code && (
        <pre className="codeblock">
          <code>{activeQuest.code}</code>
        </pre>
      )}
      {isEssay ? (
        <div className="flex flex-col gap-4">
          <textarea
            value={selectedAns}
            onChange={(e) => handleSelect(e.target.value)}
            placeholder="Nhập câu trả lời của bạn tại đây..."
            className="w-full min-h-37.5 p-4 rounded-xl border border-slate-800 bg-[#161f32]/50 text-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-y"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {activeQuest.options?.map((opt) => {
            const isSelected = selectedAns === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  handleSelect(opt.id);
                  handleNext();
                }}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left w-full
                ${
                  isSelected
                    ? "border-blue-500 bg-blue-950/40 text-blue-300"
                    : "border-slate-800 bg-[#161f32]/50 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs
                ${isSelected ? "bg-blue-500 text-white" : "bg-[#161f32] text-slate-400"}`}
                >
                  {opt.id}
                </div>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
