import React, { useState } from 'react';
import SidebarTask from "./SidebarTask";
import CodeEditor from "./CodeEditor";
import ConsoleOutput from "./ConsoleOutput";
import { INITIAL_CODE } from './constants';

export const CodeLayout: React.FC = () => {
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState<string>(INITIAL_CODE.javascript);
  const [output, setOutput] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleLanguageChange = (selectedLang: string) => {
    setLanguage(selectedLang);
    setCode(INITIAL_CODE[selectedLang]);
  };

  const handleResetCode = () => {
    setCode(INITIAL_CODE[language]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput("[\n\t{ id: 1, name: \"Bàn phím cơ\", price: 200 },\n\t{ id: 2, name: \"Chuột Gaming\", price: 100 }\n]");
      setIsError(false);
      setIsRunning(false);
    }, 1000);
  };

  const handleSubmitCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setOutput("Chúc mừng! Code của bạn đã vượt qua tất cả các test.\nLấy 1 li trà và take-a-break nào!");
      setIsError(false);
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 h-screen w-full bg-[#050816] overflow-hidden p-2 gap-2">
      <div className="md:col-span-3 bg-[#050816] border border-zinc-900 rounded-xl overflow-hidden flex flex-col h-full">
        <SidebarTask />
      </div>

      <div className="md:col-span-7 flex flex-col h-full overflow-hidden gap-2">
        <div className="flex-1 min-h-0">
          <CodeEditor 
            language={language}
            code={code}
            onCodeChange={setCode}
            onLanguageChange={handleLanguageChange}
            onResetCode={handleResetCode}
            onRunCode={handleRunCode}
            isRunning={isRunning}
          />
        </div>

        <div className="h-56 shrink-0 border border-[#050816] rounded-xl overflow-hidden">
          <ConsoleOutput 
            output={output}
            isError={isError}
            isRunning={isRunning}
            onRunCode={handleRunCode}
            onSubmitCode={handleSubmitCode}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeLayout;