const CourseEvaluationTemplate = {
  name: "Course Evaluation",
  forms: [
    { id: 1, type: "Linear scale", minLabel: "Poor", maxLabel: "Excellent", scale: 5, placeholder: "Rate the instructor" },
    { id: 2, type: "Linear scale", minLabel: "Weak", maxLabel: "Strong", scale: 5, placeholder: "Rate the course content" },
    { id: 3, type: "Paragraph", placeholder: "Most valuable part of the course?" },
    { id: 4, type: "Paragraph", placeholder: "Suggestions for improvement" },
  ]
};

export default CourseEvaluationTemplate;
