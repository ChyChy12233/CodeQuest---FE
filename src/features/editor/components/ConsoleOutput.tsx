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
  isError
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
            <span className="text-zinc-600 text-2xl italic">KẾt quả sẽ được hiển thị sau khi bạn ấn Run Code</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsoleOutput;