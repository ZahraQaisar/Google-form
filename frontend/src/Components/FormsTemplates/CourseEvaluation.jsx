const CourseEvaluationTemplate = {
    name: "Course Evaluation",
    forms: [
        { id: Date.now() + Math.random(), type: "Linear scale",minLabel: "Poor", maxLabel: "Excellent", scale: 5, placeholder: "Rate the instructor" },
        { id: Date.now() + Math.random(), type: "Linear scale",minLabel: "Weak", maxLabel: "Strong", scale: 5, placeholder: "Rate the course content" },
        { id: Date.now() + Math.random(), type: "Paragraph", placeholder: "Most valuable part of the course?" },
        { id: Date.now() + Math.random(), type: "Paragraph", placeholder: "Suggestions for improvement" },
]};

export default CourseEvaluationTemplate;
