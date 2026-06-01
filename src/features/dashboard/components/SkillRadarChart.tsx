import React from 'react';

export default function SkillRadarChart() {
  return (
    <div className="bg-[#151c2c] border border-gray-800 rounded-xl p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-white font-semibold mb-2">Skill Breakdown</h3>
        <div className="relative w-full h-52 flex items-center justify-center">
          {/* Nhãn bao quanh Radar */}
          <span className="absolute top-1 text-[10px] text-gray-400">Arrays</span>
          <span className="absolute right-2 top-1/3 text-[10px] text-gray-400">Linked Lists</span>
          <span className="absolute right-4 bottom-1/4 text-[10px] text-gray-400">Stacks</span>
          <span className="absolute bottom-1 text-[10px] text-gray-400">Queues</span>
          <span className="absolute left-2 bottom-1/4 text-[10px] text-gray-400">Recursion</span>
          <span className="absolute left-6 top-1/3 text-[10px] text-gray-400">DP</span>

          {/* Vẽ Radar Mesh bằng SVG */}
          <svg className="w-40 h-40 overflow-visible opacity-80" viewBox="0 0 100 100">
            {/* Lưới đa giác vòng ngoài */}
            <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="#1e293b" strokeWidth="1" />
            <polygon points="50,25 76,40 76,60 50,75 24,60 24,40" fill="none" stroke="#1e293b" strokeWidth="1" />
            <polygon points="50,40 65,50 65,60 50,70 35,60 35,50" fill="none" stroke="#1e293b" strokeWidth="1" />
            
            {/* Các trục chéo */}
            <line x1="50" y1="10" x2="50" y2="90" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="15" y1="30" x2="85" y2="70" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="15" y1="70" x2="85" y2="30" stroke="#1e293b" strokeWidth="0.5" />

            {/* Vùng chỉ số xanh lam */}
            <polygon 
              points="50,20 80,35 70,65 50,80 30,55 35,32" 
              fill="#2563eb" 
              fillOpacity="0.4" 
              stroke="#3b82f6" 
              strokeWidth="1.5" 
            />
          </svg>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-800/50">
        Focus on Recursion and DP to balance your skills
      </p>
    </div>
  );
}