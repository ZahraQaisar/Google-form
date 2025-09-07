import React from "react";
import {
  Type,
  FileText,
  List,
  CheckSquare,
  ChevronDown,
  Calendar,
  Clock,
  Upload,
  Sliders,
  Grid,
  Sparkles,
  FolderPlus,
  LayoutTemplate,
} from "lucide-react";

// yahan props destructure karo
const Sidebar = ({ onBrowseTemplatesClick, onAddSection, onSelectQuestion }) => {
  const questionTypes = [
    { label: "Short answer", icon: Type },
    { label: "Paragraph", icon: FileText },
    { label: "Multiple choice", icon: List },
    { label: "Checkboxes", icon: CheckSquare },
    { label: "Dropdown", icon: ChevronDown },
    { label: "Date", icon: Calendar },
    { label: "Time", icon: Clock },
    { label: "File upload", icon: Upload },
    { label: "Linear scale", icon: Sliders },
    { label: "Grid / Matrix", icon: Grid },
  ];

  return (
    <aside className="w-full max-w-md mx-auto order-2 lg:order-none bg-base-200 border border-base-300 rounded-xl p-4 sm:p-5 shadow-sm mt-4 lg:mt-6 lg:ml-6 h-auto self-start text-base-content">
      <div>
        <h2 className="text-xs font-semibold mb-3 uppercase tracking-wide opacity-70">
          Add a question
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {questionTypes.map(({ label, icon: Icon }, i) => (
            <button
              key={i}
              onClick={() => onSelectQuestion(label)}
              className="w-full flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 p-3 text-xs font-medium shadow-sm hover:border-purple-400 hover:text-purple-600 transition whitespace-nowrap"
            >
              <Icon className="w-5 h-5 text-purple-500" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI assist */}
      <div className="mt-8">
        <h2 className="text-xs font-semibold mb-2 uppercase tracking-wide opacity-70">
          AI assist
        </h2>
        <button className="w-full flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-4 py-3 text-sm font-medium shadow-sm hover:border-purple-400 hover:text-purple-600 transition">
          <Sparkles className="w-5 h-5 text-purple-500" />
          Suggest next questions
        </button>
      </div>

      {/* Structure */}
      <div className="mt-8">
        <h2 className="text-xs font-semibold mb-2 uppercase tracking-wide opacity-70">
          Structure
        </h2>
        <button
          onClick={onAddSection}
          className="w-full flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-4 py-3 text-sm font-medium shadow-sm hover:border-purple-400 hover:text-purple-600 transition"
        >
          <FolderPlus className="w-5 h-5 text-purple-500" />
          Add section
        </button>
      </div>

      {/* Templates section */}
      <div className="mt-8">
        <h2 className="text-xs font-semibold mb-2 uppercase tracking-wide opacity-70">
          Templates
        </h2>
        <button
          onClick={onBrowseTemplatesClick}
          className="w-full flex items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-4 py-3 text-sm font-medium shadow-sm hover:border-purple-400 hover:text-purple-600 transition"
        >
          <LayoutTemplate className="w-5 h-5 text-purple-500" />
          Browse templates
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
