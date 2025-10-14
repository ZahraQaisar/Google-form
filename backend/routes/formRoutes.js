import express from "express";
import { submitForm } from "../controllers/formController.js";

const router = express.Router();

// POST route to submit form
router.post("/submit", submitForm);

export default router;
