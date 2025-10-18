const EventRegistrationTemplate = {
    name: "Event Registration",
    forms: [
        { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Full Name" },
        { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Email" },
        { id: Date.now() + Math.random(), type: "Date", placeholder: "Preferred Date" },
        { id: Date.now() + Math.random(), type: "Time", placeholder: "Preferred Time" },
        { id: Date.now() + Math.random(), type: "Checkboxes", placeholder: "Topics of interest", options: ["Ai", "Web Dev", "Design", "Marketing"] },
]};

export default EventRegistrationTemplate;
