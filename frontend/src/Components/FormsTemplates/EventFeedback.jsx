const EventFeedbackTemplate = {
  name: "Event Feedback",
  forms: [{ 
    id: Date.now() + Math.random(), 
    type: "Short answer", 
    placeholder: "Your name" 
  },
  { 
    id: Date.now() + Math.random(), 
    type: "Linear scale", 
    placeholder: "Rate the event" 
  },
  { 
    id: Date.now() + Math.random(), 
    type: "Multiple choice", 
    placeholder: "How did you hear about it?", 
    options: ["Social Media", "Friends", "Email", "Other"] 
  },
  { 
    id: Date.now() + Math.random(), 
    type: "Paragraph", 
    placeholder: "What did you like the most?" 
  },
  { 
    id: Date.now() + Math.random(), 
    type: "Paragraph", 
    placeholder: "What can we improve?" 
  },
]}

export default EventFeedbackTemplate;
