import React, { useRef } from "react";
import Navbar from "./Components/Navbar";
import Form1 from "./Components/Form1";
import Sidebar from "./Components/Sidebar";
import TemplateModal from "./Components/Template";
import Responses from "./Components/Responses";
import Forms from "./Components/Forms";
import { useFormContext } from "./context/FormContext";
import usePersistentState from "./hooks/usePersistentState";
import { templateMap } from "./Components/FormsTemplates";
import BugReportTemplate from "./Components/FormsTemplates/BugReport";
import BugReport from "./Components/Preview/BugReport";
import EmployeeFeedback from "./Components/Preview/EmpFDB";
import JobApplication from "./Components/Preview/JobApp";
import EventFeedback from "./Components/Preview/EventFDB";
import CourseEvaluation from "./Components/Preview/CourseEVL";
import CustomerSatisfaction from "./Components/Preview/CustmrSatf";
import Quiz from "./Components/Preview/Quiz";
import EventRegister from "./Components/Preview/EventReg";
import LeadCapture from "./Components/Preview/LeadCapture";
import RSVP from "./Components/Preview/RSVP";

const AppContent = () => {
  const [showPreview, setShowPreview] = usePersistentState("showPreview", false);
  const [showTemplates, setShowTemplates] = usePersistentState("showTemplates", false);
  const [currentView, setCurrentView] = usePersistentState("currentView", "builder");
  const [selectedTemplate, setSelectedTemplate] = usePersistentState("selectedTemplate", null);
  const [forms, setForms] = usePersistentState("forms", []);
  const addSectionRef = useRef(null);

  const { formQuestions, setQuestions } = useFormContext();

  const handleAiSuggest = () => {
    const aiQuestions = [
      "How satisfied are you overall?",
      "What did you like the most?",
      "What can we improve?",
      "How likely are you to recommend us?",
      "Any additional comments?"
    ];
    const newForms = aiQuestions.map((q) => ({
      id: Date.now() + Math.random(),
      type: "Ai Suggest",
      placeholder: q,
    }));
    setForms((prev) => [...(prev || []), ...newForms]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
      <Navbar
        onPreviewClick={() => setShowPreview(true)}
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedTemplate={selectedTemplate}
      />

      <div className="flex flex-col lg:flex-row bg-base-100 text-base-content min-h-screen transition-colors duration-300">
        <div className="flex-1 order-1 lg:order-none overflow-y-auto max-h-screen scrollbar-none px-4 sm:px-6 lg:px-10 py-6">
          {currentView === "builder" ? (
  <div className="max-w-4xl mx-auto w-full">
    <Form1 onAddSectionFromSidebar={addSectionRef} />
    <Forms
      selectedTemplate={selectedTemplate}
      forms={forms}
      setForms={setForms}
    />
  </div>
) : (
  <Responses />
)}

        </div>

        <Sidebar
          onBrowseTemplatesClick={() => setShowTemplates(true)}
          onAddSection={() => addSectionRef.current && addSectionRef.current()}
onSelectQuestion={(type) => {
  if (!selectedTemplate) return;

  let newQuestion = { id: Date.now() + Math.random(), type, required: false };

  // For different types, add properties
  if (type === "Short answer" || type === "Paragraph") {
    newQuestion.placeholder = "Enter your question here";
  } else if (type === "Multiple choice") {
    newQuestion.placeholder = "Enter your question here";
    newQuestion.options = ["Option 1", "Option 2"]; // default options
  } else if (type === "Linear scale") {
    newQuestion.placeholder = "Rate this question";
  } else if (type === "File Upload") {
    newQuestion.placeholder = "Upload file";
  }

  // Add to builder
  setForms((prev) => [...(prev || []), newQuestion]);

  // Sync to template context for preview
  setQuestions(selectedTemplate, [
    ...(formQuestions[selectedTemplate] || []),
    newQuestion,
  ]);
}}


          onAiSuggestClick={handleAiSuggest}
        />
      </div>

      {selectedTemplate === "Bug Report" && <BugReportTemplate setForms={setForms} />}
      

      {showPreview && (
        <>
          {selectedTemplate === "Job Application" && <JobApplication onClose={() => setShowPreview(false)} />}
          {selectedTemplate === "Employee Feedback" && <EmployeeFeedback onClose={() => setShowPreview(false)} />}
          {selectedTemplate === "Event Feedback" && <EventFeedback onClose={() => setShowPreview(false)} />}
          {selectedTemplate === "Course Evaluation" && <CourseEvaluation onClose={() => setShowPreview(false)} />}
          {selectedTemplate === "Customer Satisfaction (CSAT + NPS)" && <CustomerSatisfaction onClose={() => setShowPreview(false)} />}
          {selectedTemplate === "Quiz (Multiple Choice)" && <Quiz onClose={() => setShowPreview(false)} />}
          {selectedTemplate === "Event Registration" && <EventRegister onClose={() => setShowPreview(false)} />}
          {selectedTemplate === "Lead Capture" && <LeadCapture onClose={() => setShowPreview(false)} />}
          {selectedTemplate === "RSVP" && <RSVP onClose={() => setShowPreview(false)} />}
          {selectedTemplate === "Bug Report" && <BugReport onClose={() => setShowPreview(false)} />}
        </>
      )}

      {showTemplates && (
        <TemplateModal
          isOpen={showTemplates}
          onClose={() => setShowTemplates(false)}
          onSelectTemplate={(templateName) => {
  if (templateMap[templateName]) {
    const template = templateMap[templateName];
    setSelectedTemplate(template.name); // just once
    setForms(template.forms);           // load the forms into builder
  }
  setShowTemplates(false);
}}

        />
      )}
    </div>
  );
};

export default AppContent;
