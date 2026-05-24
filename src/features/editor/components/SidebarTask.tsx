import React, { useState } from 'react';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';

export const SidebarTask: React.FC = () => {
  const [showHint, setShowHint] = useState(false);

  // demo bằng bài two sum trước
  const taskData = {
    title: "Two Sum",
    difficulty: "success" as const,
    difficultyLabel: "Easy",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    examples: [
      {
        id: 1,
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    thinkingHint: "Thay vì dùng 2 vòng lặp lồng nhau với độ phức tạp O(n²), bạn có thể dùng một cấu trúc dữ liệu nào đó giúp lưu trữ các con số đã nhìn thấy và tìm kiếm chúng với độ phức tạp O(1) không? Hãy nghĩ về Hash Map."
  };

  return (
    <div className="p-6 h-full flex flex-col justify-between">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-zinc-100">{taskData.title}</h2>
          <Badge variant={taskData.difficulty}>{taskData.difficultyLabel}</Badge>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Problem Description</h3>
          <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
            {taskData.description}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Examples</h3>
          {taskData.examples.map((example) => (
            <div key={example.id} className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 space-y-2 text-xs font-mono">
              <div className="text-zinc-400"><span className="text-emerald-400 font-bold">Input:</span> {example.input}</div>
              <div className="text-zinc-400"><span className="text-rose-400 font-bold">Output:</span> {example.output}</div>
              {example.explanation && (
                <div className="text-zinc-500 italic mt-1"><span className="font-bold">Explanation:</span> {example.explanation}</div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Constraints</h3>
          <ul className="list-disc list-inside space-y-1 text-xs font-mono text-zinc-400 pl-1">
            {taskData.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-zinc-800/80 pt-4">
        {!showHint ? (
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => setShowHint(true)}
            className="w-full gap-1.5 text-xs text-amber-400 border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Hint (Try first!)
          </Button>
        ) : (
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 space-y-2 animate-fadeIn">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                💡 AI Thinking Nudge
              </span>
              <button 
                onClick={() => setShowHint(false)} 
                className="text-zinc-500 hover:text-zinc-300 text-xs font-mono"
              >
                [Ẩn]
              </button>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed italic">
              "{taskData.thinkingHint}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarTask;