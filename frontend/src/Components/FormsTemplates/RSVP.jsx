const RSVPTemplate = {
    name: "RSVP",
    forms: [
        { id: Date.now() + Math.random(), type: "Multiple choice", placeholder: "Will you attend?", options: ["Yes", "No", "Maybe"] },
        { id: Date.now() + Math.random(), type: "Dropdown", placeholder: "Meal preference", options: ["Veg", "Non Veg", "Vegan", "Halal"] },
        { id: Date.now() + Math.random(), type: "Short answer", placeholder: "Allergies (if any)" },
]};

export default RSVPTemplate;
