// frontend/src/context/FormContext.jsx
import React, { createContext, useState, useContext } from "react";

// Create Context
const FormContext = createContext();

// Custom Hook for easy usage
export const useFormContext = () => useContext(FormContext);

// Provider Component
export const FormProvider = ({ children }) => {
  // Shared state for all templates
  const [formQuestions, setFormQuestions] = useState({});

  // 🔹 Add a question for a specific template
  const addQuestion = (templateName, question) => {
    setFormQuestions((prev) => ({
      ...prev,
      [templateName]: [...(prev[templateName] || []), question],
    }));
  };

  // 🔹 Delete a question by ID for a specific template (updated)
  const deleteQuestion = (templateName, questionId) => {
    setFormQuestions((prev) => ({
      ...prev,
      [templateName]: prev[templateName]?.filter((q) => q.id !== questionId) || [],
    }));
  };

  // 🔹 Replace all questions (useful for initializing or resetting)
  const setQuestions = (templateName, questions) => {
    setFormQuestions((prev) => ({
      ...prev,
      [templateName]: questions,
    }));
  };

  return (
    <FormContext.Provider
      value={{ formQuestions, addQuestion, deleteQuestion, setQuestions }}
    >
      {children}
    </FormContext.Provider>
  );
};
