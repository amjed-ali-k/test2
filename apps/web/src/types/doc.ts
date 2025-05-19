import { UserType } from "./general";

export type DocumentInputType = {
  type: string;
  title: string;
  name: string;
  description: string;
  details?: { name: string; type: string; slug: string }[];
};

const diplomaCertificate: DocumentInputType = {
  type: "DIPLOMA",
  title: "Diploma Certificate",
  name: "diplomaCertificate",
  description:
    "Please upload a copy of your diploma certificate or educational transcripts related to your healthcare training or qualifications (e.g., Nursing Diploma, PSW Certificate). These documents are required to verify your educational background and ensure you meet the necessary educational requirements for the positions you apply for.",
  details: [{ name: "Date of completion", type: "date", slug: "documentDate" }],
};

const workHistory: DocumentInputType = {
  type: "WORK_HISTORY",
  title: "Work history",
  details: [{ name: "Document date", type: "date", slug: "documentDate" }],
  name: "workHistory",
  description:
    "Please provide a detailed work history or resume outlining your relevant professional experience, including job titles, employers, dates of employment, and key responsibilities. This information will help us understand your background and ensure you have the necessary experience for the positions you are applying for.",
};

const backgroundCheck: DocumentInputType = {
  type: "BACKGROUND_CHECK",
  title: "Background Check",
  details: [
    { name: "Document date", type: "date", slug: "documentDate" },
    {
      name: "First Name",
      type: "text",
      slug: "firstName",
    },
  ],
  name: "backgroundCheck",
  description:
    "You are required to submit a recent and clear background check or police clearance certificate. This document helps us verify your suitability for working in healthcare settings and ensures the safety of patients and staff. The background check should cover criminal records and any other relevant information.",
};

const references: DocumentInputType = {
  type: "REFERENCES",
  title: "References",
  details: [{ name: "Document date", type: "date", slug: "documentDate" }],
  name: "references",
  description:
    "Please provide contact information for professional references who can attest to your work experience, skills, and qualifications. These references should be individuals who have directly supervised or worked closely with you, such as former managers, supervisors, or colleagues. Their testimonials will aid in evaluating your suitability for various positions.",
};

const training: DocumentInputType = {
  type: "TRAINING",
  title: "Training",
  name: "training",
  description:
    "If you have completed any relevant training programs, courses, or certifications related to your healthcare role (e.g., CPR, First Aid, specialized care training), please upload copies of the training certificates or documents. These will help demonstrate your commitment to professional development and ensure you possess the necessary knowledge and skills for the positions you are interested in.",
};

const right_to_work: DocumentInputType = {
  type: "RIGHT_TO_WORK",
  title: "Right to work in Canada",
  details: [{ name: "Date on document", type: "date", slug: "documentDate" }],
  name: "right_to_work",
  description:
    "You must provide documentation that proves your legal right to work in Canada. This can include a copy of your Canadian citizenship certificate, permanent resident card, valid work permit, or any other relevant document issued by Immigration, Refugees and Citizenship Canada (IRCC) that grants you the right to work in the country.",
};

const addressProof: DocumentInputType = {
  type: "ADDRESS_PROOF",
  title: "Address Proof",
  details: [{ name: "Date on document", type: "date", slug: "documentDate" }],
  name: "addressProof",
  description:
    "Please add one of following documents, dated within the last three months. Insurance Card, Utility Bill, Bank Statement, Voter Registration, Credit Card statement",
};

const tbScreening: DocumentInputType = {
  type: "TB_SCREENING",
  title: "TB Screening Proof",
  details: [{ name: "Date on document", type: "date", slug: "documentDate" }],
  name: "tbScreening",
  description:
    "Plese upload proof of your TB screening. This should be a negative TB test within the last year, or a chest x-ray sshowing no sign of TB if the TB test is positive",
};

const imunizationProof: DocumentInputType = {
  type: "IMMUNIZATION_PROOF",
  title: "Immunization Proof",
  name: "imunizationProof",
  description:
    "Please upload your immunization records. This should include MMR, Varicella, Hepatitis B, and Tdap",
};

const covidProof: DocumentInputType = {
  type: "COVID_PROOF",
  title: "COVID-19 Vaccination Proof",
  details: [
    { name: "Date of last vaccinated", type: "date", slug: "documentDate" },
  ],
  name: "covidProof",
  description:
    "In accordance with healthcare facility policies and to ensure the safety of patients and staff, you are required to provide proof of your COVID-19 vaccination status. Please upload a copy of your COVID-19 vaccination record or certificate, indicating the dates and types of vaccines received.",
};

const defaultDocs = [
  right_to_work,
  addressProof,
  tbScreening,
  imunizationProof,
  covidProof,
  workHistory,
  backgroundCheck,
  // references,
  training,
];

export const docsRequired = {
  [UserType.REGISTERED_PRACTICAL_NURSE]: [...defaultDocs],
  [UserType.REGISTERED_NURSE]: [...defaultDocs],
  [UserType.DOCTOR_OF_SOCIAL_WORK]: [...defaultDocs],
  [UserType.DIETARY_AIDE]: [...defaultDocs],
  [UserType.PERSONAL_SUPPORT_WORKER]: [...defaultDocs],
  [UserType.CARER]: [...defaultDocs],
  [UserType.INTERNAL_STAFF]: [...defaultDocs],
};

export const allDocs = [
  right_to_work,
  addressProof,
  tbScreening,
  imunizationProof,
  covidProof,
  workHistory,
  backgroundCheck,
  diplomaCertificate,
  training,
];
