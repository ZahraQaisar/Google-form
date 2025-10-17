
import BugReportTemplate from "./BugReport";
import CourseEvaluationTemplate from "./CourseEvaluation";
import CustomerSatisfactionTemplate from "./CustomerSatisfaction";
import EventFeedbackTemplate from "./EventFeedback";
import JobApplicationTemplate from "./JobApplication";
import EmployeeFeedbackTemplate from "./EmployeeFeedback";
import EventRegistrationTemplate from "./EventRegistration";
import LeadCaptureTemplate from "./LeadCapture";
import QuizTemplate from "./Quiz";
import RSVPTemplate from "./RSVP";


export const templateMap = {
  "Event Feedback": EventFeedbackTemplate,
  "Bug Report": {
    name: "Bug Report",
    forms: [
      { id: 1, type: "Short answer", placeholder: "Summary" },
      { id: 2, type: "Paragraph", placeholder: "Steps to reproduce" },
      { id: 3, type: "Multiple choice", placeholder: "Severity" },
      { id: 4, type: "File Upload", placeholder: "Screenshot / recording" },
    ],
  },
  "Job Application": JobApplicationTemplate,
  "Customer Satisfaction (CSAT + NPS)": CustomerSatisfactionTemplate,
  "Course Evaluation": CourseEvaluationTemplate,
  "Employee Feedback": EmployeeFeedbackTemplate,
  "Event Registration": EventRegistrationTemplate,
  "Lead Capture": LeadCaptureTemplate,
  "Quiz (Multiple Choice)": QuizTemplate,
  "RSVP": RSVPTemplate
};
