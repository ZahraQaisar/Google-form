import FormResponse from "../models/FormResponse.js";

export const submitForm = async (req, res) => {
  try {
    // Extract user and the rest of the answers
    const { user, formType, ...responses } = req.body;

    if (!user) {
      return res.status(400).json({ error: "User not logged in" });
    }

    const form = new FormResponse({
      formType,
      user,        // top-level user
      responses,   // all answers go inside 'responses'
    });

    await form.save();
    res.json({ message: `${formType} submitted successfully!` });
  } catch (err) {
    console.error("Error saving form:", err);
    res.status(500).json({ error: "Failed to submit form" });
  }
};
