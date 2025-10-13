const EmployeeFeedbackTemplate = {
    name: "Employee Feedback",
    forms: [
        { id: Date.now() + Math.random(), type: "Linear scale",minLabel: "Poor", maxLabel: "Excellent", scale: 5, placeholder: "Work-life balance" },
        { id: Date.now() + Math.random(), type: "Linear scale",minLabel: "Low", maxLabel: "High", scale: 5, placeholder: "Manager support" },
        { id: Date.now() + Math.random(), type: "Paragraph", placeholder: "Anything else to share?" },
]};

export default EmployeeFeedbackTemplate;
