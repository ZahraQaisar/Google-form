// backend/routes/formRoutes.js
import express from "express";
import FormResponse from "../models/FormResponse.js"; // ✅ Import correct model
import { submitForm } from "../controllers/formController.js";

const router = express.Router();

// Universal route
router.post("/submit", submitForm);

// ✅ Event Feedback route
router.post("/event-feedback", async (req, res) => {
  console.log("📩 Event feedback route hit:", req.body);

  try {
    const form = new FormResponse({
      formType: "Event Feedback",
      responses: req.body, // Store all answers
    });

    await form.save();
    res.status(200).json({ message: "Event feedback submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving form:", error);
    res.status(500).json({ error: "Failed to submit event feedback" });
  }
});

// ✅ Quiz route
router.post("/quiz", async (req, res) => {
  try {
    const form = new FormResponse({
      formType: "General Knowledge Quiz",
      responses: req.body,
    });

    await form.save();
    res.status(200).json({ message: "Quiz submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving quiz:", error);
    res.status(500).json({ error: "Failed to submit quiz" });
  }
});

// ✅ RSVP route
router.post("/rsvp", async (req, res) => {
  try {
    const form = new FormResponse({
      formType: "RSVP Form",
      responses: req.body,
    });

    await form.save();
    res.status(200).json({ message: "RSVP submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving RSVP:", error);
    res.status(500).json({ error: "Failed to submit RSVP" });
  }
});

// ✅ Get all form responses (for Responses.jsx)
router.get("/", async (req, res) => {
  try {
    const { searchText, startDate, endDate } = req.query;
    let filter = {};

    // Search and Date Filters
    if (searchText) {
      filter = {
        ...filter,
        $or: [
          { "responses": { $regex: searchText, $options: "i" } },
          { "formType": { $regex: searchText, $options: "i" } },
        ],
      };
    }

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // ✅ Use FormResponse model, not Form
    const forms = await FormResponse.find(filter).sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    console.error("❌ Error fetching responses:", error);
    res.status(500).json({ error: "Failed to fetch forms" });
  }
});



export default router;
