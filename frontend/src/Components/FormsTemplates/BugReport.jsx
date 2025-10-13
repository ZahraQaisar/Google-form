const BugReportTemplate = {
    name: "Bug Report",
    forms: [
  { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Summary" },
  { id: Date.now() + Math.random(), type: "Paragraph", placeholder: "Steps to reproduce" },
  { id: Date.now() + Math.random(),options: ["Blocker", "Critical", "Major", "Minor"] , type: "Multiple choice", placeholder: "Severity" },
  { id: Date.now() + Math.random(), type: "File Upload", placeholder: "Screenshot / recording" },
]};

export default BugReportTemplate;
