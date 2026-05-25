import React from 'react';

interface EditorHeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onResetCode: () => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onResetCode,
}) => {
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
  ];

  return (
    <div className="h-14 border-b border-zinc-800/80 bg-zinc-950 px-4 flex items-center justify-between select-none">
      <div className="flex items-center gap-3">
        <select
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onResetCode}
          className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition-colors"
          title="Reset code"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;