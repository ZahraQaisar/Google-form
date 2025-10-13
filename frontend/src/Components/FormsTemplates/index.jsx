
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
  "Bug Report": BugReportTemplate,
  "Job Application": JobApplicationTemplate,
  "Customer Satisfaction (CSAT + NPS)": CustomerSatisfactionTemplate,
  "Course Evaluation": CourseEvaluationTemplate,
  "Employee Feedback": EmployeeFeedbackTemplate,
  "Event Registration": EventRegistrationTemplate,
  "Lead Capture": LeadCaptureTemplate,
  "Quiz (Multiple Choice)": QuizTemplate,
  "RSVP": RSVPTemplate
};
