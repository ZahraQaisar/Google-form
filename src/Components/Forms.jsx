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
        <div className="min-h-screen p-8 font-sans bg-gray-100">
            <div className="p-6 mx-auto bg-white shadow-lg max-w-7xl rounded-xl">


                <div className="p-6 space-y-8 border border-gray-200 rounded-lg">
                    {forms.length > 0 ? (
                        forms.map((form) => {
                            const ComponentToRender = componentMap[form.type];
                            return (
                                <div key={form.id} className="relative p-4 border border-gray-300 rounded-lg bg-gray-50">
                                    <ComponentToRender
                                        onCopy={() => handleCopyComponent(form.id)}
                                        onDelete={() => handleDeleteComponent(form.id)}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-gray-500">
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
            <h2 className="text-xl font-semibold text-gray-800">Short Answer</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">Short answer</span>
        </div>
        <input
            type="text"
            placeholder="Question title (use {{qid}} to reference answers)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
            <input
                type="text"
                placeholder="Description / help (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Prefill key (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="flex items-center gap-4">
            <select
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option>Text</option>
            </select>
            <input
                type="text"
                placeholder="Regex pattern"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Min length"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="mt-4">
            <span className="text-gray-500">Conditional logic (show when...)</span>
        </div>
        <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2 text-blue-600 rounded form-checkbox" /> Required
            </label>
            <div className="flex gap-4">
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={onCopy} className="text-blue-500 hover:text-blue-700">Copy</button>
            </div>
        </div>
    </div>
);

// Paragraph Component
const ParagraphComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Paragraph</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">Paragraph</span>
        </div>
        <input
            type="text"
            placeholder="Question title (use {{qid}} to reference answers)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
            <input
                type="text"
                placeholder="Description / help (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Prefill key (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <textarea
            placeholder="Long answer text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        />
        <div className="mt-4">
            <span className="text-gray-500">Conditional logic (show when...)</span>
        </div>
        <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2 text-blue-600 rounded form-checkbox" /> Required
            </label>
            <div className="flex gap-4">
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={onCopy} className="text-blue-500 hover:text-blue-700">Copy</button>
            </div>
        </div>
    </div>
);

// Multiple Choice Component
const MultipleChoiceComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Multiple Choice</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">Multiple choice</span>
        </div>
        <input
            type="text"
            placeholder="Question title (use {{qid}} to reference answers)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
            <input
                type="text"
                placeholder="Description / help (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Prefill key (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <input type="radio" className="text-blue-600 form-radio" />
                <input
                    type="text"
                    placeholder="Option 1"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex items-center gap-2">
                <input type="radio" className="text-blue-600 form-radio" />
                <input
                    type="text"
                    placeholder="Option 2"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
        <button className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800">
            + Add option
        </button>
        <div className="mt-4">
            <span className="text-gray-500">Conditional logic (show when...)</span>
        </div>
        <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2 text-blue-600 rounded form-checkbox" /> Required
            </label>
            <div className="flex gap-4">
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={onCopy} className="text-blue-500 hover:text-blue-700">Copy</button>
            </div>
        </div>
    </div>
);

// Checkboxes Component
const CheckboxesComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Checkboxes</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">Checkboxes</span>
        </div>
        <input
            type="text"
            placeholder="Question title (use {{qid}} to reference answers)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
            <input
                type="text"
                placeholder="Description / help (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Prefill key (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <input type="checkbox" className="text-blue-600 rounded form-checkbox" />
                <input
                    type="text"
                    placeholder="Option 1"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" className="text-blue-600 rounded form-checkbox" />
                <input
                    type="text"
                    placeholder="Option 2"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
        <button className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800">
            + Add option
        </button>
        <div className="mt-4">
            <span className="text-gray-500">Conditional logic (show when...)</span>
        </div>
        <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2 text-blue-600 rounded form-checkbox" /> Required
            </label>
            <div className="flex gap-4">
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={onCopy} className="text-blue-500 hover:text-blue-700">Copy</button>
            </div>
        </div>
    </div>
);

// Dropdown Component
const DropdownComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Dropdown</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">Dropdown</span>
        </div>
        <input
            type="text"
            placeholder="Question title (use {{qid}} to reference answers)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
            <input
                type="text"
                placeholder="Description / help (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Prefill key (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <input type="text" placeholder="Option 1" className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-center gap-2">
                <input type="text" placeholder="Option 2" className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
        </div>
        <button className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800">
            + Add option
        </button>
        <div className="mt-4">
            <span className="text-gray-500">Conditional logic (show when...)</span>
        </div>
        <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2 text-blue-600 rounded form-checkbox" /> Required
            </label>
            <div className="flex gap-4">
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={onCopy} className="text-blue-500 hover:text-blue-700">Copy</button>
            </div>
        </div>
    </div>
);

// Linear Scale Component
const LinearScaleComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Linear Scale</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">Linear scale</span>
        </div>
        <input
            type="text"
            placeholder="Question title (use {{qid}} to reference answers)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
            <input
                type="text"
                placeholder="Description / help (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Prefill key (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="flex items-center gap-4">
            <input
                type="text"
                placeholder="Min label"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Max label"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option>5</option>
            </select>
        </div>
        <div className="mt-4">
            <span className="text-gray-500">Conditional logic (show when...)</span>
        </div>
        <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2 text-blue-600 rounded form-checkbox" /> Required
            </label>
            <div className="flex gap-4">
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={onCopy} className="text-blue-500 hover:text-blue-700">Copy</button>
            </div>
        </div>
    </div>
);

// Grid Component
const GridComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Grid / Matrix</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">Grid / Matrix</span>
        </div>
        <input
            type="text"
            placeholder="Question title (use {{qid}} to reference answers)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
            <input
                type="text"
                placeholder="Description / help (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Prefill key (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Rows</h3>
                <input
                    type="text"
                    placeholder="Row 1"
                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Row 2"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Columns</h3>
                <input
                    type="text"
                    placeholder="Col 1"
                    className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Col 2"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
        <div className="mt-4">
            <span className="text-gray-500">Conditional logic (show when...)</span>
        </div>
        <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2 text-blue-600 rounded form-checkbox" /> Required
            </label>
            <div className="flex gap-4">
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={onCopy} className="text-blue-500 hover:text-blue-700">Copy</button>
            </div>
        </div>
    </div>
);

// Date Component
const DateComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Date</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">Date</span>
        </div>
        <input
            type="text"
            placeholder="Question title (use {{qid}} to reference answers)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
            <input
                type="text"
                placeholder="Description / help (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Prefill key (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="flex items-center gap-2">
            <span className="text-gray-500">MM/DD/YYYY</span>
        </div>
        <div className="mt-4">
            <span className="text-gray-500">Conditional logic (show when...)</span>
        </div>
        <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2 text-blue-600 rounded form-checkbox" /> Required
            </label>
            <div className="flex gap-4">
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={onCopy} className="text-blue-500 hover:text-blue-700">Copy</button>
            </div>
        </div>
    </div>
);

// Time Component
const TimeComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Time</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">Time</span>
        </div>
        <input
            type="text"
            placeholder="Question title (use {{qid}} to reference answers)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
            <input
                type="text"
                placeholder="Description / help (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Prefill key (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="flex items-center gap-2">
            <span className="text-gray-500">HH:MM</span>
        </div>
        <div className="mt-4">
            <span className="text-gray-500">Conditional logic (show when...)</span>
        </div>
        <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2 text-blue-600 rounded form-checkbox" /> Required
            </label>
            <div className="flex gap-4">
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={onCopy} className="text-blue-500 hover:text-blue-700">Copy</button>
            </div>
        </div>
    </div>
);

// File Upload Component
const FileUploadComponent = ({ onCopy, onDelete }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">File Upload</h2>
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">File upload</span>
        </div>
        <input
            type="text"
            placeholder="Question title (use {{qid}} to reference answers)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-4">
            <input
                type="text"
                placeholder="Description / help (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Prefill key (optional)"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="flex items-center gap-2">
            <span className="text-gray-500">Files accepted in preview</span>
        </div>
        <div className="mt-4">
            <span className="text-gray-500">Conditional logic (show when...)</span>
        </div>
        <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2 text-blue-600 rounded form-checkbox" /> Required
            </label>
            <div className="flex gap-4">
                <button onClick={onDelete} className="text-red-500 hover:text-red-700">Delete</button>
                <button onClick={onCopy} className="text-blue-500 hover:text-blue-700">Copy</button>
            </div>
        </div>
    </div>
);
