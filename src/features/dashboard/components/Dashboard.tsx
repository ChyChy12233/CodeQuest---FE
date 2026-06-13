import React from "react";
import { Flame, BarChart3, Award, CheckCircle2 } from "lucide-react";
import StatCard from "./StatCard";
import ThinkingScoreChart from "./ThinkingScoreChart";
import SkillRadarChart from "./SkillRadarChart";
import ImprovementReport from "./ImprovementReport";

export default function Dashboard({ userName = "Dev" }) { //tạm gán cứng
  return (
    <div className="bg-[#0b0f19] min-h-screen text-gray-300 font-sans antialiased selection:bg-blue-500/30">
      <header className="border-b border-gray-800/60 bg-[#0b0f19]/90 backdrop-blur sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-xs tracking-wide uppercase font-mono">
          <span className="text-blue-500 font-bold tracking-normal">
            &lt;/&gt; CodeQuest
          </span>
          <span className="text-gray-700">/</span>
          <span className="text-gray-500">Bảng điều khiển</span>
        </div>

        <button className="bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white border-emerald-500/20 text-xs font-medium px-4 py-1.5 rounded transition-all duration-200">
          Bài kế tiếp →
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-10 space-y-10">
        <div className="border-l-2 border-blue-500 pl-4 py-1">
          <h1 className="text-xl font-semibold text-white tracking-tight">
            Chào mừng trở lại, <span className="text-blue-400">{userName}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            icon={
              <Flame className="w-4 h-4 text-orange-500" fill="currentColor" />
            }
            value="14"
            label="Chuỗi ngày học tập"
            subText="Duy trì phong độ nhé! 🔥"
            subColor="text-orange-400/80"
          />
          <StatCard
            icon={<BarChart3 className="w-4 h-4 text-blue-400" />}
            value="1,250"
            label="Tổng điểm kinh nghiệm (XP)"
            subText="+180 tuần này"
            subColor="text-emerald-400"
          />
          <StatCard
            icon={<Award className="w-4 h-4 text-amber-400" />}
            value="Cấp độ 3"
            label="Chuyên sâu"
            subText=""
            progress={65}
          />
          <StatCard
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            value="23"
            label="Bài toán đã giải quyết"
            subText="5 bài trong tuần này"
            subColor="text-gray-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#111625] border border-gray-800/80 rounded-lg p-1">
            <ThinkingScoreChart />
          </div>
          <div className="bg-[#111625] border border-gray-800/80 rounded-lg p-1">
            <SkillRadarChart />
          </div>
        </div>

        {/* Report Section */}
        <div className="bg-[#111625] border border-gray-800/80 rounded-lg">
          <ImprovementReport />
        </div>
      </main>
    </div>
  );
}
