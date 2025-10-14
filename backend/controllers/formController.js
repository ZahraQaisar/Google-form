// backend/controllers/formController.js
import FormResponse from "../models/FormResponse.js";

export const submitForm = async (req, res) => {
  try {
    const { formType, responses, userId } = req.body;

    // Validate input
    if (!formType || !responses) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new form entry
    const formResponse = new FormResponse({
      formType,          // Example: "Customer Satisfaction", "Job Application"
      responses,         // All form fields data
      user: userId || null,
    });

    await formResponse.save();
    res.status(201).json({ message: `${formType} form submitted successfully!` });
  } catch (err) {
    console.error("Error saving form:", err);
    res.status(500).json({ message: "Server error while saving form" });
  }
};
