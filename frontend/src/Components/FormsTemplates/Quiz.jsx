const QuizTemplate = {
    name: "Quiz (Multiple Choice)",
    forms: [
        { id: Date.now() + Math.random(), type: "Multiple choice", placeholder: "Capital of France?", options: ["Paris", "Lyon", "Nice"] },
        { id: Date.now() + Math.random(), type: "Multiple choice", placeholder: "2 + 2?", options: ["5", "4", "3"] },
        { id: Date.now() + Math.random(), type: "Multiple choice", placeholder: "Largest planet?", options: ["Earth", "Jupiter", "Mars"] },
]};

export default QuizTemplate;
