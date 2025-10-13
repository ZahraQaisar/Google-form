import React, { useState, useRef } from 'react'
import Navbar from './Components/Navbar'
import Form1 from './Components/Form1'
import Sidebar from './Components/Sidebar';
import TemplateModal from './Components/Template';
import Responses from './Components/Responses'
import EmployeeFeedback from "./Components/Preview/EmpFDB";
import JobApplication from './Components/Preview/JobApp';
import EventFeedback from "./Components/Preview/EventFDB";
import CourseEvaluation from './Components/Preview/CourseEVL';
import CustomerSatisfaction from './Components/Preview/CustmrSatf';
import Quiz from './Components/Preview/Quiz';
import EventRegister from './Components/Preview/EventReg';
import LeadCapture from './Components/Preview/LeadCapture';
import RSVP from './Components/Preview/RSVP';
import BugReport from './Components/Preview/BugReport';
import Forms from './Components/Forms';
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";

// {/* ======================================================== Updated this part ======================================================== */}
import { templateMap } from "./Components/FormsTemplates";
import usePersistentState from "./hooks/usePersistentState";

const App = () => {
const [showPreview, setShowPreview] = usePersistentState("showPreview", false);
const [showTemplates, setShowTemplates] = usePersistentState("showTemplates", false);
const [currentView, setCurrentView] = usePersistentState("currentView", "builder");
const [selectedTemplate, setSelectedTemplate] = usePersistentState("selectedTemplate", null);
const [forms, setForms] = usePersistentState("forms", []);
const [selectedQuestion, setSelectedQuestion] = usePersistentState("selectedQuestion", null);
const addSectionRef = useRef(null);


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

    setForms((prev) => [...prev, ...newForms]);
  };

  // {/* ======================================================== Till this ======================================================== */}

//   return (
//     // 🔹 Add theme-aware background + text
//     <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
//       <Navbar
//         onPreviewClick={() => setShowPreview(true)}
//         currentView={currentView}
//         setCurrentView={setCurrentView}
//   // {/* ======================================================== Updated line 62 ======================================================== */}
//         selectedTemplate={selectedTemplate}
//       />

//                {/* ======================================================== Updated this part ======================================================== */}
//       <div className="flex flex-col lg:flex-row bg-base-100 text-base-content min-h-screen transition-colors duration-300">
//   {/* Main content */}
//   <div className="flex-1 order-1 lg:order-none overflow-y-auto max-h-screen scrollbar-none px-4 sm:px-6 lg:px-10 py-6">
//     {currentView === "builder" ? (
//       <>
//         {/* Centered and responsive wrapper */}
//         <div className="max-w-4xl mx-auto w-full">
//           <Form1 onAddSectionFromSidebar={addSectionRef} />
//           <Forms forms={forms} setForms={setForms} />
//         </div>
//       </>
//     ) : (
//       <Responses />
//     )}
//   </div>

//   {/* Sidebar */}
//   <Sidebar
//     onBrowseTemplatesClick={() => setShowTemplates(true)}
//     onAddSection={() => addSectionRef.current && addSectionRef.current()}
//     onSelectQuestion={(label) => {
//       setForms((prev) => [...prev, { type: label, id: Date.now() }]);
//     }}
//     onAiSuggestClick={handleAiSuggest}
//   />
// </div>

//       {/* ======================================================== Till this ======================================================== */}

//       {showPreview && (
//         <>
//           {selectedTemplate === "Job Application" && (
//             <JobApplication onClose={() => setShowPreview(false)} />
//           )}
//           {selectedTemplate === "Employee Feedback" && (
//             <EmployeeFeedback onClose={() => setShowPreview(false)} />
//           )}
//           {selectedTemplate === "Event Feedback" && (
//             <EventFeedback onClose={() => setShowPreview(false)} />
//           )}
//           {selectedTemplate === "Course Evaluation" && (
//             <CourseEvaluation onClose={() => setShowPreview(false)} />
//           )}
//           {selectedTemplate === "Customer Satisfaction (CSAT + NPS)" && (
//             <CustomerSatisfaction onClose={() => setShowPreview(false)} />
//           )}
//           {selectedTemplate === "Quiz (Multiple Choice)" && (
//             <Quiz onClose={() => setShowPreview(false)} />
//           )}
//           {selectedTemplate === "Event Registration" && (
//             <EventRegister onClose={() => setShowPreview(false)} />
//           )}
//           {selectedTemplate === "Lead Capture" && (
//             <LeadCapture onClose={() => setShowPreview(false)} />
//           )}
//           {selectedTemplate === "RSVP" && (
//             <RSVP onClose={() => setShowPreview(false)} />
//           )}
//           {selectedTemplate === "Bug Report" && (
//             <BugReport onClose={() => setShowPreview(false)} />
//           )}

//           {/* fallback → if no template selected */}
//           {!selectedTemplate && (
//             <EmployeeFeedback onClose={() => setShowPreview(false)} />
//           )}
//         </>
//       )}

//       {/* ======================================================== Updated this part ======================================================== */}


//       {showTemplates && (
//         <TemplateModal
//           isOpen={showTemplates}
//           onClose={() => setShowTemplates(false)}
//           onSelectTemplate={(templateName) => {
//             setSelectedTemplate(templateName);

//             if (templateMap[templateName]) {
//               const template = templateMap[templateName];
//               setSelectedTemplate(template.name);
//               setForms(template.forms);
//             }

//             setShowTemplates(false);
//           }}
//         />
//       )}

//       {/* ======================================================== Till this ======================================================== */}
//     </div>
//   );

return (
  <Routes>
    {/* Main App (Forms, Builder, etc.) */}
    <Route
      path="/"
      element={
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
                  <Forms forms={forms} setForms={setForms} />
                </div>
              ) : (
                <Responses />
              )}
            </div>

            <Sidebar
              onBrowseTemplatesClick={() => setShowTemplates(true)}
              onAddSection={() =>
                addSectionRef.current && addSectionRef.current()
              }
              onSelectQuestion={(label) => {
                setForms((prev) => [...prev, { type: label, id: Date.now() }]);
              }}
              onAiSuggestClick={handleAiSuggest}
            />
          </div>

          {/* Previews and templates */}
          {showPreview && (
            <>
              {selectedTemplate === "Job Application" && (
                <JobApplication onClose={() => setShowPreview(false)} />
              )}
              {selectedTemplate === "Employee Feedback" && (
                <EmployeeFeedback onClose={() => setShowPreview(false)} />
              )}
              {selectedTemplate === "Event Feedback" && (
                <EventFeedback onClose={() => setShowPreview(false)} />
              )}
              {selectedTemplate === "Course Evaluation" && (
                <CourseEvaluation onClose={() => setShowPreview(false)} />
              )}
              {selectedTemplate === "Customer Satisfaction (CSAT + NPS)" && (
                <CustomerSatisfaction onClose={() => setShowPreview(false)} />
              )}
              {selectedTemplate === "Quiz (Multiple Choice)" && (
                <Quiz onClose={() => setShowPreview(false)} />
              )}
              {selectedTemplate === "Event Registration" && (
                <EventRegister onClose={() => setShowPreview(false)} />
              )}
              {selectedTemplate === "Lead Capture" && (
                <LeadCapture onClose={() => setShowPreview(false)} />
              )}
              {selectedTemplate === "RSVP" && (
                <RSVP onClose={() => setShowPreview(false)} />
              )}
              {selectedTemplate === "Bug Report" && (
                <BugReport onClose={() => setShowPreview(false)} />
              )}
              {!selectedTemplate && (
                <EmployeeFeedback onClose={() => setShowPreview(false)} />
              )}
            </>
          )}

          {showTemplates && (
            <TemplateModal
              isOpen={showTemplates}
              onClose={() => setShowTemplates(false)}
              onSelectTemplate={(templateName) => {
                setSelectedTemplate(templateName);
                if (templateMap[templateName]) {
                  const template = templateMap[templateName];
                  setSelectedTemplate(template.name);
                  setForms(template.forms);
                }
                setShowTemplates(false);
              }}
            />
          )}
        </div>
      }
    />

    {/* Login Page */}
    <Route path="/login" element={<Login />} />

    {/* Signup Page */}
    <Route path="/signup" element={<Signup />} />
  </Routes>
);

};

export default App;
