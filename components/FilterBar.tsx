
import { type FC } from 'react';

interface FilterBarProps {
  current: string;
  onChange: (framework: string) => void;
}

const frameworks = ['All', 'OpenClaw', 'CrewAI', 'LangChain', 'AutoGPT'];

const FilterBar: FC<FilterBarProps> = ({ current, onChange }) => {
  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      <span className="text-sm font-mono text-muted uppercase tracking-widest mr-4">Filter:</span>
      {frameworks.map((fw) => (
        <button
          key={fw}
          onClick={() => onChange(fw)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${current === fw
            ? 'bg-[#000000] border-[#000000] text-white shadow-lg shadow-black/20'
            : 'bg-white border-border text-muted hover:border-[#000000]/30 hover:text-[#000000] shadow-sm'
            }`}
        >
          {fw}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
