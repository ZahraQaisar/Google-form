import FormResponse from "../models/FormResponse.js";

export const submitForm = async (req, res) => {
  try {
    const { formType, responses, userId } = req.body;

    if (!formType || !responses) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const formResponse = new FormResponse({
      formType,
      responses,
      user: userId || null,
    });

    await formResponse.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error saving form:", err);
    res.status(500).json({ message: "Server error while saving form" });
  }
};
