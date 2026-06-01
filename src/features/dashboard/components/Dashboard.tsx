import React from 'react';
import { Flame, BarChart3, Award, CheckCircle2 } from 'lucide-react';
import StatCard from './StatCard';
import ThinkingScoreChart from './ThinkingScoreChart';
import SkillRadarChart from './SkillRadarChart';
import ImprovementReport from './ImprovementReport';

export default function Dashboard() {
  return (
    <div className="bg-[#0b0f19] min-h-screen text-gray-200 font-sans antialiased">
      {/* navigation bar */}
      <header className="border-b border-gray-800 bg-[#0b0f19]/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-blue-500 font-bold">&lt;/&gt; CodeQuest</span>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">Bảng điều khiển</span>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
          Học cú pháp tiếp theo
        </button>
      </header>

      {/* main content */}
      <main className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Chào mừng bạn mới, cùng gõ code nào!</h1>
          <p className="text-xs text-gray-400">Xem lại tiến độ làm chủ các cú pháp của bạn</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            icon={<Flame className="w-5 h-5 text-red-500" fill="currentColor" />} 
            value="14" 
            label="Ngày học liên tiếp" 
            subText="Keep it up bro!" 
            subColor="text-amber-500"
          />
          <StatCard 
            icon={<BarChart3 className="w-5 h-5 text-blue-500" />} 
            value="1,250" 
            label="Điểm tích lũy (XP)" 
            subText="+180 hôm nay" 
            subColor="text-emerald-500"
          />
          <StatCard 
            icon={<Award className="w-5 h-5 text-amber-500" />} 
            value="Cấp độ 3" 
            label="Đang quen tay" 
            subText="" 
            progress={65}
          />
          <StatCard 
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />} 
            value="23" 
            label="Cú pháp đã thuộc lòng" 
            subText="Mới học thêm 5 lệnh tuần này" 
            subColor="text-gray-500"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ThinkingScoreChart />
          <SkillRadarChart />
        </div>
        <ImprovementReport />
      </main>
    </div>
  );
}