const LeadCaptureTemplate = {
    name: "Lead Capture",
    forms: [
        { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Full Name" },
        { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Email" },
        { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Company" },
        { id: Date.now() + Math.random(), type: "Paragraph", placeholder: "What are you looking for?" },
]};

export default LeadCaptureTemplate;
