import CodeEditor from "./CodeEditor";
import SidebarTask from "./SidebarTask";

export const CodeLayout = () => {
  return(
    <div className="grid grid-cols-1 md:grid-cols-10 min-h-screen gap-4">
      <div className="md:col-span-3">
        <SidebarTask />
      </div>
      <div className="md:col-span-7">
        <CodeEditor />
      </div>
    </div>
  )
}