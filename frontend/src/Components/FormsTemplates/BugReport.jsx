// const BugReportTemplate = {
//     name: "Bug Report",
//     forms: [
//   { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Summary" },
//   { id: Date.now() + Math.random(), type: "Paragraph", placeholder: "Steps to reproduce" },
//   { id: Date.now() + Math.random(),options: ["Blocker", "Critical", "Major", "Minor"] , type: "Multiple choice", placeholder: "Severity" },
//   { id: Date.now() + Math.random(), type: "File Upload", placeholder: "Screenshot / recording" },
// ]};

// export default BugReportTemplate;
// frontend/src/Components/FormsTemplates/BugReport.jsx
import React, { useEffect } from "react";
import { useFormContext } from "../../context/FormContext";

const BugReportTemplate = ({ setForms }) => {
  const { formQuestions, setQuestions } = useFormContext();

  useEffect(() => {
    const existing = formQuestions["Bug Report"];
    if (!existing || existing.length === 0) {
      const initialForms = [
  { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Summary", required: false },
  { id: Date.now() + Math.random(), type: "Paragraph", placeholder: "Steps to reproduce", required: false },
  { id: Date.now() + Math.random(), options: ["Blocker", "Critical", "Major", "Minor"], type: "Multiple choice", placeholder: "Severity", required: false },
  { id: Date.now() + Math.random(), type: "File Upload", placeholder: "Screenshot / recording", required: false },
];

      setQuestions("Bug Report", initialForms);
      setForms(initialForms); // ✅ Sync to builder
    } else {
      setForms(existing); // ✅ In case already exists, still sync
    }
  }, [formQuestions, setQuestions, setForms]);

  return null;
};

export default BugReportTemplate;

