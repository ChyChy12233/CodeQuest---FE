import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Select } from '../../../components/common/Select';
import { Button } from '../../../components/common/Button';

const LANGUAGE_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'cpp', label: 'C++' },
  { value: 'java', label: 'Java' },
];

// code mẫu
const INITIAL_CODE: Record<string, string> = {
  javascript: `function twoSum(nums, target) {\n    // Think like a problem solver, not a copy-paster...\n    // Your solution here\n    \n}`,
  python: `def two_sum(nums, target):\n    # Think like a problem solver, not a copy-paster...\n    # Your solution here\n    pass`,
  cpp: `vector<int> twoSum(vector<int>& nums, int target) {\n    // Think like a problem solver, not a copy-paster...\n    // Your solution here\n    \n}`,
  java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Think like a problem solver, not a copy-paster...\n        // Your solution here\n        return new int[0];\n    }\n}`,
};

export const CodeEditor: React.FC = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(INITIAL_CODE['javascript']);

  // đổi ngôn ngữ
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(INITIAL_CODE[selectedLang]);
  };

  // submit code
  const handleRunCode = () => {
    console.log(`Đang chạy code ${language}:`, code);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d111c]/60 border border-gray-800/60 rounded-lg overflow-hidden">
      
      <div className="flex justify-between items-center px-4 py-2 bg-[#090d16] border-b border-gray-800/80">
        <div className="flex items-center gap-3">
          <Select 
            options={LANGUAGE_OPTIONS} 
            value={language} 
            onChange={handleLanguageChange}
            className="min-w-30 py-1! text-xs" 
          />
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => setCode(INITIAL_CODE[language])}
            className="text-xs"
          >
            Reset
          </Button>
          <Button 
            variant="success" 
            size="sm" 
            onClick={handleRunCode}
            className="text-xs font-semibold gap-1.5"
          >
            <svg className="w-3 h-3 fill-current text-white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Run Code
          </Button>
        </div>
      </div>

      <div className="flex-1 w-full pt-2 bg-[#0f1422]/40">
        <Editor
          height="100%"
          language={language}
          value={code}
          theme="vs-dark" 
          onChange={(value) => setCode(value || '')}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
            minimap: { enabled: false },     
            wordWrap: 'on',                  
            automaticLayout: true,           
            cursorBlinking: 'smooth',        
            lineNumbersMinChars: 3,          
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
            suggestOnTriggerCharacters: true,  
          }}
          loading={
            <div className="flex items-center justify-center h-full text-zinc-500 text-sm gap-2">
              <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <span>Đang kết nối môi trường VS Code...</span>
            </div>
          }
        />
      </div>
      
    </div>
  );
};

export default CodeEditor;