import { Code2, Save } from "lucide-react";
import React from "react";
import { Button } from "../../components/common/Button";
import ProgressBar from "./Progressbar";
import { Link } from "react-router";
type HeaderProps = {
  showProgressBar?: boolean;
  showSave?: boolean;
  totalquest?: number;
  answeredCount?: number;
};

export const Header: React.FC<HeaderProps> = ({
  showProgressBar = true,
  showSave = true,
  answeredCount = 0,
  totalquest = 10,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#050b17]/75 backdrop-blur-md border-b border-(--border) flex p-4">
      <Link to="/" className="flex-1 flex items-center w-fit gap-3">
        <div className="bg-[#0b2122] w-11 h-11 rounded-2xl flex items-center justify-center border border-[#113b2e]">
          <Code2 className="text-[#20bd5b]"></Code2>
        </div>
        <span className="text-2xl font-bold text-[#ffffff]">CodeQuest</span>
      </Link>
      {showProgressBar && (
        <ProgressBar answeredCount={answeredCount} totalquest={totalquest} />
      )}
      <div className="flex-1 flex gap-3 justify-end items-center">
        {showSave && (
          <Button variant="normal" className="flex gap-3 hover:text-white">
            <Save className="w-5 h-5"></Save>
            <span className="text-[16px] font-semibold">Lưu bài làm</span>
          </Button>
        )}
        <div className="avatar">
          <div className="w-11 h-11 rounded-full border-2 border-[#0fbb85] overflow-hidden">
            <img className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};
