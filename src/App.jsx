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

const App = () => {
  // Dono states rakhi hain
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [currentView, setCurrentView] = useState('builder'); // 'builder' or 'responses'
  const addSectionRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [forms, setForms] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    // 🔹 Add theme-aware background + text
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content">
      <Navbar
        onPreviewClick={() => setShowPreview(true)}
        currentView={currentView}
        setCurrentView={setCurrentView}
        templateName={selectedTemplate}
      />

      {/* 🔹 Replace fixed bg-gray-100 with theme-aware */}
      <div className="flex flex-col flex-1 lg:flex-row bg-base-100 text-base-content">
        {/* main content */}
        <div className="flex-1 order-1 lg:order-none">
          {currentView === "builder" ? (
            <>
              <div className="mt-10 ml-10">
                <Form1 onAddSectionFromSidebar={addSectionRef} />
              </div>

              {/*  Forms.jsx show only if question selected */}
              {selectedQuestion && (
                <Forms
                  selectedQuestion={selectedQuestion}
                  forms={forms}
                  setForms={setForms}
                />
              )}
            </>
          ) : (
            <Responses />
          )}
        </div>

        {/* sidebar */}
        <Sidebar
          onBrowseTemplatesClick={() => setShowTemplates(true)}
          onAddSection={() =>
            addSectionRef.current && addSectionRef.current()
          }
          onSelectQuestion={(type) => setSelectedQuestion(type)}   // ✅ new prop
        />
      </div>

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

          {/* fallback → if no template selected */}
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
            setShowTemplates(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
