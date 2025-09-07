import React, { useEffect } from 'react';

export default function Forms({ selectedQuestion, forms, setForms }) {
    useEffect(() => {
        if (selectedQuestion) {
            setForms((prev) => [
                ...prev,
                { id: Date.now(), type: selectedQuestion }
            ]);
        }
    }, [selectedQuestion, setForms]);

    const componentMap = {
        'Short answer': ShortAnswerComponent,
        'Paragraph': ParagraphComponent,
        'Multiple choice': MultipleChoiceComponent,
        'Checkboxes': CheckboxesComponent,
        'Dropdown': DropdownComponent,
        'Linear scale': LinearScaleComponent,
        'Grid / Matrix': GridComponent,
        'Date': DateComponent,
        'Time': TimeComponent,
        'File upload': FileUploadComponent,
    };

    const handleAddComponent = (componentType) => {
        const newComponent = {
            id: Date.now() + Math.random(),
            type: componentType,
        };
        setForms([...forms, newComponent]);
    };

    const handleCopyComponent = (id) => {
        const componentToCopy = forms.find(comp => comp.id === id);
        if (componentToCopy) {
            const newComponent = {
                id: Date.now() + Math.random(),
                type: componentToCopy.type,
            };
            setForms([...forms, newComponent]);
        }
    };

    const handleDeleteComponent = (id) => {
        setForms(forms.filter(comp => comp.id !== id));
    };

    const componentNames = Object.keys(componentMap);

    return (
        <div className="min-h-screen font-sans bg-base-200 w-[100%] p-6">
  <div className="max-w-4xl p-2 mx-auto ml-12 bg-base-100 shadow-lg rounded-xl">
    <div className="p-6 space-y-8 border border-base-300 rounded-lg">
      {forms.length > 0 ? (
        forms.map((form) => {
          const ComponentToRender = componentMap[form.type];
          return (
            <div
              key={form.id}
              className="relative p-4 border border-base-300 rounded-lg bg-base-200"
            >
              <ComponentToRender
                onCopy={() => handleCopyComponent(form.id)}
                onDelete={() => handleDeleteComponent(form.id)}
              />
            </div>
          );
        })
      ) : (
        <div className="text-center text-base-content/70">
          Click a button above to add your first form component.
        </div>
      )}
    </div>
  </div>
</div>


    );
}

// Short Answer Component
const ShortAnswerComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-base-content">Short Answer</h2>
    <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
      Short answer
    </span>
  </div>

  <input
    type="text"
    placeholder="Question title (use {{qid}} to reference answers)"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
               bg-base-100 text-base-content border-base-300"
  />

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Description / help (optional)"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 bg-base-100 text-base-content border-base-300"
    />
    <input
      type="text"
      placeholder="Prefill key (optional)"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 bg-base-100 text-base-content border-base-300"
    />
  </div>

  <div className="flex items-center gap-4">
    <select
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 bg-base-100 text-base-content border-base-300"
    >
      <option>Text</option>
    </select>
    <input
      type="text"
      placeholder="Regex pattern"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 bg-base-100 text-base-content border-base-300"
    />
    <input
      type="text"
      placeholder="Min length"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 bg-base-100 text-base-content border-base-300"
    />
  </div>

  <div className="mt-4">
    <span className="text-base-content/70">Conditional logic (show when...)</span>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center text-base-content">
      <input
        type="checkbox"
        className="mr-2 text-primary rounded form-checkbox"
      />
      Required
    </label>
    <div className="flex gap-4">
      <button onClick={onDelete} className="text-error hover:text-error/80">
        Delete
      </button>
      <button onClick={onCopy} className="text-primary hover:text-primary/80">
        Copy
      </button>
    </div>
  </div>
</div>


);

// Paragraph Component
const ParagraphComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-base-content">Paragraph</h2>
    <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
      Paragraph
    </span>
  </div>

  <input
    type="text"
    placeholder="Question title (use {{qid}} to reference answers)"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
               bg-base-100 text-base-content border-base-300"
  />

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Description / help (optional)"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 bg-base-100 text-base-content border-base-300"
    />
    <input
      type="text"
      placeholder="Prefill key (optional)"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 bg-base-100 text-base-content border-base-300"
    />
  </div>

  <textarea
    placeholder="Long answer text"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] 
               bg-base-100 text-base-content border-base-300"
  />

  <div className="mt-4">
    <span className="text-base-content/70">Conditional logic (show when...)</span>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center text-base-content">
      <input
        type="checkbox"
        className="mr-2 text-primary rounded form-checkbox"
      />
      Required
    </label>
    <div className="flex gap-4">
      <button onClick={onDelete} className="text-error hover:text-error/80">
        Delete
      </button>
      <button onClick={onCopy} className="text-primary hover:text-primary/80">
        Copy
      </button>
    </div>
  </div>
</div>


);

// Multiple Choice Component
const MultipleChoiceComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-base-content">Multiple Choice</h2>
    <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
      Multiple choice
    </span>
  </div>

  <input
    type="text"
    placeholder="Question title (use {{qid}} to reference answers)"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
               bg-base-100 text-base-content border-base-300"
  />

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Description / help (optional)"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 bg-base-100 text-base-content border-base-300"
    />
    <input
      type="text"
      placeholder="Prefill key (optional)"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 bg-base-100 text-base-content border-base-300"
    />
  </div>

  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <input type="radio" className="radio radio-primary" />
      <input
        type="text"
        placeholder="Option 1"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                   bg-base-100 text-base-content border-base-300"
      />
    </div>
    <div className="flex items-center gap-2">
      <input type="radio" className="radio radio-primary" />
      <input
        type="text"
        placeholder="Option 2"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                   bg-base-100 text-base-content border-base-300"
      />
    </div>
  </div>

  <button className="flex items-center gap-1 font-medium text-primary hover:text-primary/80">
    + Add option
  </button>

  <div className="mt-4">
    <span className="text-base-content/70">Conditional logic (show when...)</span>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center text-base-content">
      <input type="checkbox" className="mr-2 checkbox checkbox-primary" /> Required
    </label>
    <div className="flex gap-4">
      <button onClick={onDelete} className="text-error hover:text-error/80">
        Delete
      </button>
      <button onClick={onCopy} className="text-primary hover:text-primary/80">
        Copy
      </button>
    </div>
  </div>
</div>


);

// Checkboxes Component
const CheckboxesComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-base-content">Checkboxes</h2>
    <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
      Checkboxes
    </span>
  </div>

  <input
    type="text"
    placeholder="Question title (use {{qid}} to reference answers)"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
               bg-base-100 text-base-content border-base-300"
  />

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Description / help (optional)"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 bg-base-100 text-base-content border-base-300"
    />
    <input
      type="text"
      placeholder="Prefill key (optional)"
      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                 bg-base-100 text-base-content border-base-300"
    />
  </div>

  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <input type="checkbox" className="checkbox checkbox-primary" />
      <input
        type="text"
        placeholder="Option 1"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                   bg-base-100 text-base-content border-base-300"
      />
    </div>
    <div className="flex items-center gap-2">
      <input type="checkbox" className="checkbox checkbox-primary" />
      <input
        type="text"
        placeholder="Option 2"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary 
                   bg-base-100 text-base-content border-base-300"
      />
    </div>
  </div>

  <button className="flex items-center gap-1 font-medium text-primary hover:text-primary/80">
    + Add option
  </button>

  <div className="mt-4">
    <span className="text-base-content/70">Conditional logic (show when...)</span>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center text-base-content">
      <input type="checkbox" className="mr-2 checkbox checkbox-primary" /> Required
    </label>
    <div className="flex gap-4">
      <button onClick={onDelete} className="text-error hover:text-error/80">
        Delete
      </button>
      <button onClick={onCopy} className="text-primary hover:text-primary/80">
        Copy
      </button>
    </div>
  </div>
</div>


);

// Dropdown Component
const DropdownComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4 bg-base-100 border border-base-300 p-4 rounded-lg">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-base-content">Dropdown</h2>
    <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
      Dropdown
    </span>
  </div>

  <input
    type="text"
    placeholder="Question title (use {{qid}} to reference answers)"
    className="w-full px-4 py-2 border rounded-lg 
               bg-base-100 text-base-content border-base-300
               placeholder-base-content/50 
               focus:outline-none focus:ring-2 focus:ring-primary"
  />

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Description / help (optional)"
      className="flex-1 px-4 py-2 border rounded-lg 
                 bg-base-100 text-base-content border-base-300
                 placeholder-base-content/50 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <input
      type="text"
      placeholder="Prefill key (optional)"
      className="flex-1 px-4 py-2 border rounded-lg 
                 bg-base-100 text-base-content border-base-300
                 placeholder-base-content/50 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>

  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Option 1"
        className="flex-1 px-4 py-2 border rounded-lg 
                   bg-base-100 text-base-content border-base-300
                   placeholder-base-content/50 
                   focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Option 2"
        className="flex-1 px-4 py-2 border rounded-lg 
                   bg-base-100 text-base-content border-base-300
                   placeholder-base-content/50 
                   focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  </div>

  <button className="flex items-center gap-1 font-medium text-primary hover:text-primary/80">
    + Add option
  </button>

  <div className="mt-4">
    <span className="text-base-content/70">Conditional logic (show when...)</span>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center text-base-content">
      <input type="checkbox" className="mr-2 checkbox checkbox-primary" /> Required
    </label>
    <div className="flex gap-4">
      <button onClick={onDelete} className="text-error hover:text-error/80">
        Delete
      </button>
      <button onClick={onCopy} className="text-primary hover:text-primary/80">
        Copy
      </button>
    </div>
  </div>
</div>


);


// Linear Scale Component
const LinearScaleComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4 bg-base-100 border border-base-300 p-4 rounded-lg">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-base-content">Linear Scale</h2>
    <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
      Linear scale
    </span>
  </div>

  <input
    type="text"
    placeholder="Question title (use {{qid}} to reference answers)"
    className="w-full px-4 py-2 border border-base-300 rounded-lg 
               bg-base-100 text-base-content placeholder-base-content/50
               focus:outline-none focus:ring-2 focus:ring-primary"
  />

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Description / help (optional)"
      className="flex-1 px-4 py-2 border border-base-300 rounded-lg 
                 bg-base-100 text-base-content placeholder-base-content/50
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <input
      type="text"
      placeholder="Prefill key (optional)"
      className="flex-1 px-4 py-2 border border-base-300 rounded-lg 
                 bg-base-100 text-base-content placeholder-base-content/50
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>

  <div className="flex items-center gap-4">
    <input
      type="text"
      placeholder="Min label"
      className="flex-1 px-4 py-2 border border-base-300 rounded-lg 
                 bg-base-100 text-base-content placeholder-base-content/50
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <input
      type="text"
      placeholder="Max label"
      className="flex-1 px-4 py-2 border border-base-300 rounded-lg 
                 bg-base-100 text-base-content placeholder-base-content/50
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <select
      className="flex-1 px-4 py-2 border border-base-300 rounded-lg 
                 bg-base-100 text-base-content 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option>5</option>
    </select>
  </div>

  <div className="mt-4">
    <span className="text-base-content/70">Conditional logic (show when...)</span>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center text-base-content">
      <input type="checkbox" className="mr-2 checkbox checkbox-primary" /> Required
    </label>
    <div className="flex gap-4">
      <button onClick={onDelete} className="text-error hover:text-error/80">
        Delete
      </button>
      <button onClick={onCopy} className="text-primary hover:text-primary/80">
        Copy
      </button>
    </div>
  </div>
</div>


);

// Grid Component
const GridComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4 bg-base-100 border border-base-300 p-4 rounded-lg">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-base-content">Grid / Matrix</h2>
    <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
      Grid / Matrix
    </span>
  </div>

  <input
    type="text"
    placeholder="Question title (use {{qid}} to reference answers)"
    className="w-full px-4 py-2 border border-base-300 
               rounded-lg bg-base-100 text-base-content 
               placeholder-base-content/50 
               focus:outline-none focus:ring-2 focus:ring-primary"
  />

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Description / help (optional)"
      className="flex-1 px-4 py-2 border border-base-300 
                 rounded-lg bg-base-100 text-base-content 
                 placeholder-base-content/50 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <input
      type="text"
      placeholder="Prefill key (optional)"
      className="flex-1 px-4 py-2 border border-base-300 
                 rounded-lg bg-base-100 text-base-content 
                 placeholder-base-content/50 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>

  <div className="grid grid-cols-2 gap-4">
    <div>
      <h3 className="mb-2 text-sm font-semibold text-base-content/80">Rows</h3>
      <input
        type="text"
        placeholder="Row 1"
        className="w-full px-4 py-2 mb-2 border border-base-300 
                   rounded-lg bg-base-100 text-base-content 
                   placeholder-base-content/50 
                   focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        placeholder="Row 2"
        className="w-full px-4 py-2 border border-base-300 
                   rounded-lg bg-base-100 text-base-content 
                   placeholder-base-content/50 
                   focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
    <div>
      <h3 className="mb-2 text-sm font-semibold text-base-content/80">Columns</h3>
      <input
        type="text"
        placeholder="Col 1"
        className="w-full px-4 py-2 mb-2 border border-base-300 
                   rounded-lg bg-base-100 text-base-content 
                   placeholder-base-content/50 
                   focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        placeholder="Col 2"
        className="w-full px-4 py-2 border border-base-300 
                   rounded-lg bg-base-100 text-base-content 
                   placeholder-base-content/50 
                   focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  </div>

  <div className="mt-4">
    <span className="text-base-content/70">Conditional logic (show when...)</span>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center text-base-content">
      <input type="checkbox" className="mr-2 checkbox checkbox-primary" /> Required
    </label>
    <div className="flex gap-4">
      <button
        onClick={onDelete}
        className="text-error hover:text-error/80"
      >
        Delete
      </button>
      <button
        onClick={onCopy}
        className="text-primary hover:text-primary/80"
      >
        Copy
      </button>
    </div>
  </div>
</div>


);

// Date Component
const DateComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4 bg-base-100 border border-base-300 p-4 rounded-lg">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-base-content">Date</h2>
    <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
      Date
    </span>
  </div>

  <input
    type="text"
    placeholder="Question title (use {{qid}} to reference answers)"
    className="w-full px-4 py-2 border border-base-300 
               rounded-lg bg-base-100 text-base-content 
               placeholder-base-content/50 
               focus:outline-none focus:ring-2 focus:ring-primary"
  />

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Description / help (optional)"
      className="flex-1 px-4 py-2 border border-base-300 
                 rounded-lg bg-base-100 text-base-content 
                 placeholder-base-content/50 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <input
      type="text"
      placeholder="Prefill key (optional)"
      className="flex-1 px-4 py-2 border border-base-300 
                 rounded-lg bg-base-100 text-base-content 
                 placeholder-base-content/50 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>

  <div className="flex items-center gap-2">
    <span className="text-base-content/70">MM/DD/YYYY</span>
  </div>

  <div className="mt-4">
    <span className="text-base-content/70">Conditional logic (show when...)</span>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center text-base-content">
      <input type="checkbox" className="mr-2 checkbox checkbox-primary" /> Required
    </label>
    <div className="flex gap-4">
      <button
        onClick={onDelete}
        className="text-error hover:text-error/80"
      >
        Delete
      </button>
      <button
        onClick={onCopy}
        className="text-primary hover:text-primary/80"
      >
        Copy
      </button>
    </div>
  </div>
</div>


);

// Time Component
const TimeComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4 bg-base-100 border border-base-300 p-4 rounded-lg">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-base-content">Time</h2>
    <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
      Time
    </span>
  </div>

  <input
    type="text"
    placeholder="Question title (use {{qid}} to reference answers)"
    className="w-full px-4 py-2 border border-base-300 
               rounded-lg bg-base-100 text-base-content 
               placeholder-base-content/50 
               focus:outline-none focus:ring-2 focus:ring-primary"
  />

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Description / help (optional)"
      className="flex-1 px-4 py-2 border border-base-300 
                 rounded-lg bg-base-100 text-base-content 
                 placeholder-base-content/50 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <input
      type="text"
      placeholder="Prefill key (optional)"
      className="flex-1 px-4 py-2 border border-base-300 
                 rounded-lg bg-base-100 text-base-content 
                 placeholder-base-content/50 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>

  <div className="flex items-center gap-2">
    <span className="text-base-content/70">HH:MM</span>
  </div>

  <div className="mt-4">
    <span className="text-base-content/70">Conditional logic (show when...)</span>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center text-base-content">
      <input type="checkbox" className="mr-2 checkbox checkbox-primary" /> Required
    </label>
    <div className="flex gap-4">
      <button onClick={onDelete} className="text-error hover:text-error/80">
        Delete
      </button>
      <button onClick={onCopy} className="text-primary hover:text-primary/80">
        Copy
      </button>
    </div>
  </div>
</div>


);

// File Upload Component
const FileUploadComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4 bg-base-100 border border-base-300 p-4 rounded-lg">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-semibold text-base-content">File Upload</h2>
    <span className="px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full">
      File upload
    </span>
  </div>

  <input
    type="text"
    placeholder="Question title (use {{qid}} to reference answers)"
    className="w-full px-4 py-2 border border-base-300 
               rounded-lg bg-base-100 text-base-content 
               placeholder-base-content/50 
               focus:outline-none focus:ring-2 focus:ring-primary"
  />

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Description / help (optional)"
      className="flex-1 px-4 py-2 border border-base-300 
                 rounded-lg bg-base-100 text-base-content 
                 placeholder-base-content/50 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <input
      type="text"
      placeholder="Prefill key (optional)"
      className="flex-1 px-4 py-2 border border-base-300 
                 rounded-lg bg-base-100 text-base-content 
                 placeholder-base-content/50 
                 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  </div>

  <div className="flex items-center gap-2">
    <span className="text-base-content/70">Files accepted in preview</span>
  </div>

  <div className="mt-4">
    <span className="text-base-content/70">Conditional logic (show when...)</span>
  </div>

  <div className="flex items-center justify-between">
    <label className="flex items-center text-base-content">
      <input type="checkbox" className="mr-2 checkbox checkbox-primary" /> Required
    </label>
    <div className="flex gap-4">
      <button onClick={onDelete} className="text-error hover:text-error/80">
        Delete
      </button>
      <button onClick={onCopy} className="text-primary hover:text-primary/80">
        Copy
      </button>
    </div>
  </div>
</div>


);
