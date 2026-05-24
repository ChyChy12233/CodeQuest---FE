import { Button } from "../../components/common/Button";

type NavigatorProps = {
  totalquest: number;
  currentQuest: number;
  setCurrentQuest: (quest: number) => void;
  ans: Record<number, string>;
};

export default function Navigator({
  totalquest,
  currentQuest,
  setCurrentQuest,
  ans,
}: NavigatorProps) {
  return (
    <div className="grid grid-cols-5 gap-2 w-max justify-items-center">
      {[...Array(totalquest)].map((_, i) => {
        const questionNum = i + 1;
        let btnClass = "w-11 h-11 rounded-lg ";

        if (questionNum === currentQuest) {
          btnClass +=
            "border border-blue-600 bg-blue-950 text-blue-400 text-[14px] font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)]";
        } else if (questionNum in ans) {
          btnClass +=
            "bg-emerald-950 text-emerald-500 border border-emerald-800";
        } else {
          btnClass += "bg-slate-800 text-slate-500";
        }

        return (
          <Button
            variant="normal"
            key={questionNum}
            className={btnClass}
            onClick={() => setCurrentQuest(questionNum)}
            type="button"
          >
            {questionNum}
          </Button>
        );
      })}
    </div>
  );
}
