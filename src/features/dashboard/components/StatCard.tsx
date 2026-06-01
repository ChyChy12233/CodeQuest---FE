import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  subText: string;
  subColor?: string;
  progress?: number;
}

export default function StatCard({ icon, value, label, subText, subColor = "text-gray-400", progress }: StatCardProps) {
  return (
    <div className="bg-[#151c2c] border border-gray-800 rounded-xl p-5 flex flex-col justify-between h-36">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-white mb-1">{value}</span>
          <span className="text-sm text-gray-400">{label}</span>
        </div>
        <div className="p-2 rounded-lg bg-gray-800/50">
          {icon}
        </div>
      </div>
      
      <div className="mt-4">
        {progress !== undefined ? (
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${progress}%` }} />
          </div>
        ) : (
          <span className={`text-xs ${subColor}`}>{subText}</span>
        )}
      </div>
    </div>
  );
}