import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import Form1 from './Components/Form1'
import EmployeeFeedback from "./Components/Preview";
import Sidebar from './Components/Sidebar';
import TemplateModal from './Components/Template';
import Responses from './Components/Responses'

const App = () => {
  // Dono states rakhi hain
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [currentView, setCurrentView] = useState('builder'); // 'builder' or 'responses'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar (dono props diye gaye) */}
      <Navbar
        onPreviewClick={() => setShowPreview(true)}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main content */}
      <div className="flex flex-1 bg-gray-100">
        <div className="flex-1">
          {currentView === 'builder' ? (
            <Form1 />
          ) : (
            <Responses />
          )}
        </div>

        {/* Sidebar */}
        <Sidebar onBrowseTemplatesClick={() => setShowTemplates(true)} />
      </div>

      {/* Preview overlay */}
      {showPreview && (
        <EmployeeFeedback onClose={() => setShowPreview(false)} />
      )}

      {/* Template overlay */}
      {showTemplates && (
        <TemplateModal
          isOpen={showTemplates}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </div>
  );
};

export default App;
