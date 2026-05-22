import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-1 bg-zinc-950/40 p-1 rounded-t-lg border-b border-zinc-800/80 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all duration-200 relative focus:outline-none
              ${isActive 
                ? 'bg-zinc-900 text-emerald-400 shadow-sm' 
                : 'text-zinc-500 hover:text-zinc-300'
              }
            `}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};