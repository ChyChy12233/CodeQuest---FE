import React from 'react';

interface ConsoleOutputProps {
  output: string;
  isError: boolean;
  onRunCode: () => void;
  onSubmitCode: () => void;
  isRunning: boolean;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  output,
  isError,
  onRunCode,
  onSubmitCode,
  isRunning,
}) => {
  return (
    <div className="h-full bg-[#050816] border-t border-zinc-800/80 flex flex-col justify-between">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="h-10 px-4 border-b border-zinc-900 bg-[#050816]/50 flex items-center justify-between select-none">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500"></span>
            Console Output
          </span>
        </div>

        <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-[#050816]/30 selection:bg-zinc-800">
          {output ? (
            <pre className={`whitespace-pre-wrap leading-relaxed ${isError ? 'text-rose-400' : 'text-zinc-300'}`}>
              {output}
            </pre>
          ) : (
            <span className="text-zinc-600 italic">Ấn "Chạy thử" sau khi bạn làm xong</span>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-zinc-900 bg-[#050816] flex items-center justify-end gap-3 select-none">
        <button
          onClick={onRunCode}
          disabled={isRunning}
          className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {isRunning ? 'Đang chạy...' : 'Chạy thử'}
        </button>
        
        <button
          onClick={onSubmitCode}
          disabled={isRunning}
          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-emerald-950/20 transition-colors disabled:opacity-50"
        >
          Nộp bài
        </button>
      </div>
    </div>
  );
};

export default ConsoleOutput;