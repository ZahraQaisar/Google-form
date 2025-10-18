const JobApplicationTemplate = {
    name: "Job Application",
    forms: [
  { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Full Name" },
  { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Email" },
  { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Phone" },
  { id: Date.now() + Math.random(),options: ["Frontend Engineer", "Backend Engineer", "Designer", "PM"] , type: "Multiple choice", placeholder: "Role you are applying for" },
  { id: Date.now() + Math.random(), type: "File Upload", placeholder: "Resume(PDF)" },
  { id: Date.now() + Math.random(), type: "Paragraph", placeholder: "Why do you want to work here?" },
]};

export default JobApplicationTemplate;
