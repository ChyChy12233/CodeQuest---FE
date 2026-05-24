import { Send } from "lucide-react";
import { Button } from "../../components/common/Button";
type ConfirmProps = {
  showConfirm: boolean;
  setshowConfirm: (showConfirm: boolean) => void;
  handleSubmit: () => void;
};

export default function Confirm({
  showConfirm,
  setshowConfirm,
  handleSubmit,
}: ConfirmProps) {
  if (!showConfirm) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0f1523] w-fit h-fit p-12 rounded-2xl border-(--border) shadow-[0_0_15px_rgba(255,255,255,0.15) flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-5">
          <Send className="w-8 h-8" />
          <h2 className="text-2xl text-white font-bold">Xác nhận nộp bài</h2>
        </div>
        <div className="flex justify-between gap-4">
          <Button variant="normal" onClick={() => setshowConfirm(false)}>
            Quay về
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}
