type ProgressBarProps = {
  answeredCount: number;
  totalquest: number;
};

export default function ProgressBar({
  answeredCount,
  totalquest,
}: ProgressBarProps) {
  const percentage =
    totalquest > 0 ? Math.min((answeredCount / totalquest) * 100, 100) : 0;

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex justify-between items-center w-full text-[14px] font-bold">
        <span className="">Assessment Progress</span>
        <span className="text-[#1fb558]">
          {answeredCount}/{totalquest} Questions
        </span>
      </div>
      <div className="w-full h-1.5 bg-(--code-bg) rounded-full overflow-hidden">
        <div
          className="h-full bg-[#4acf7b] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
