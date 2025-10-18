const CustomerSatisfactionTemplate = {
    name: "Customer Satisfaction (CSAT + NPS)",
    forms: [
        { id: Date.now() + Math.random(), type: "Linear scale",minLabel: "Bad", maxLabel: "Great", scale: 5, placeholder: "Overall satisfaction" },
        { id: Date.now() + Math.random(),options: ["Daily", "Weekly", "Monthly", "Rarely"] , type: "Multiple choice", placeholder: "How often do you use the product?" },
        { id: Date.now() + Math.random(), type: "Short answer", placeholder: "How likely are you to recommend us? (0-10)" },
        { id: Date.now() + Math.random(), type: "Paragraph", placeholder: "What do you like most?" },
        { id: Date.now() + Math.random(), type: "Paragraph", placeholder: "What can we improve?" },
]};

export default CustomerSatisfactionTemplate;
