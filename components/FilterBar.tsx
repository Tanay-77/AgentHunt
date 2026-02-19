
import { type FC } from 'react';

interface FilterBarProps {
  current: string;
  onChange: (framework: string) => void;
}

const frameworks = ['All', 'OpenClaw', 'CrewAI', 'LangChain', 'AutoGPT'];

const FilterBar: FC<FilterBarProps> = ({ current, onChange }) => {
  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-4">Filter:</span>
      {frameworks.map((fw) => (
        <button
          key={fw}
          onClick={() => onChange(fw)}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap border ${current === fw
            ? 'bg-black border-black text-white shadow-md'
            : 'bg-white border-gray-200 text-gray-600 hover:border-black hover:text-black'
            }`}
        >
          {fw}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
