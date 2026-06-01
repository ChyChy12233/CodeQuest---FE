import React from 'react';

export default function ImprovementReport() {
  return (
    <div className="bg-[#151c2c] border border-gray-800 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-6">Weekly Improvement Report</h3>
      
      <div className="space-y-6">
        {/* Item 1 */}
        <div className="flex gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-white mb-1">Strong Progress in Arrays</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              You solved 5 array problems with 92% efficiency. Your time complexity analysis has improved significantly.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-white mb-1">Practice More: Linked Lists</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Struggled with pointer manipulation. Complete 3 more linked list problems to strengthen this skill.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-white mb-1">Thinking Score: Excellent</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your approach to breaking down problems is methodical. Keep focusing on optimization patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}