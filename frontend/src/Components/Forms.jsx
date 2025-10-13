import React, { useEffect, useState } from "react";
import ShortAnswerComponent from "./Forms/ShortAnswer";
import ParagraphComponent from "./Forms/Paragaph";
import MultipleChoiceComponent from "./Forms/MultipleChoice";
import CheckboxesComponent from "./Forms/Checkboxes";
import DropdownComponent from "./Forms/Dropdown";
import LinearScaleComponent from "./Forms/LinearScale";
import GridComponent from "./Forms/Grid";
import DateComponent from "./Forms/Date";
import TimeComponent from "./Forms/Time";
import FileUploadComponent from "./Forms/FileUpload";
import AiSuggestComponent from "./Forms/AiSuggest";

export default function Forms({ forms, setForms }) {
  const [theme, setTheme] = useState("light");

  // Sidebar-style dark theme detection
  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  const componentMap = {
    "Short answer": ShortAnswerComponent,
    "Paragraph": ParagraphComponent,
    "Multiple choice": MultipleChoiceComponent,
    "Checkboxes": CheckboxesComponent,
    "Dropdown": DropdownComponent,
    "Linear scale": LinearScaleComponent,
    "Grid / Matrix": GridComponent,
    "Date": DateComponent,
    "Time": TimeComponent,
    "File upload": FileUploadComponent,
    "Ai Suggest": AiSuggestComponent,
  };

  const handleCopyComponent = (id) => {
    const componentToCopy = forms.find((comp) => comp.id === id);
    if (componentToCopy) {
      const newComponent = {
        id: Date.now() + Math.random(),
        type: componentToCopy.type,
      };
      setForms((prev) => [...prev, newComponent]);
    }
  };

  const handleDeleteComponent = (id) => {
    setForms((prev) => prev.filter((comp) => comp.id !== id));
  };

  return (
    <div
      className={`min-h-screen font-sans w-full p-4 sm:p-6 transition-colors duration-300 ${
        isDark ? "bg-base-200" : "bg-gray-50"
      }`}
    >
      {/* Centered & responsive container */}
      <div className="w-full max-w-3xl mx-auto">
        <div
          className={`w-full shadow-lg rounded-xl transition-colors duration-300 ${
            isDark ? "bg-base-800" : "bg-white"
          }`}
        >
          <div
            className={`p-6 space-y-8 border rounded-lg transition-colors duration-300 ${
              isDark ? "border-white/20" : "border-gray-200"
            }`}
          >
            {forms.length > 0 ? (
              forms.map((form) => {
                const ComponentToRender = componentMap[form.type];
                if (!ComponentToRender) return null;
                return (
                  <div
                    key={form.id}
                    className={`relative p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200
                      ${isDark ? "bg-base-800 border-white/20" : "bg-gray-50 border-gray-300"}`}
                  >
                    <ComponentToRender
                      placeholder={form.placeholder}
                      value={form.value || ""}
                      description={form.description || ""}
                      prefill={form.prefill || ""}
                      regex={form.regex || ""}
                      minLength={form.minLength || ""}
                      required={form.required || false}
                      options={form.options}
                      minLabel={form.minLabel}
                      maxLabel={form.maxLabel}
                      scale={form.scale}
                      onChange={(field, newValue) => {
                        setForms((prev) =>
                          prev.map((f) =>
                            f.id === form.id ? { ...f, [field]: newValue } : f
                          )
                        );
                      }}
                      onCopy={() => handleCopyComponent(form.id)}
                      onDelete={() => handleDeleteComponent(form.id)}
                    />
                  </div>
                );
              })
            ) : (
              <div
                className={`text-center transition-colors duration-300 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Click a button in sidebar to add your first form component.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
